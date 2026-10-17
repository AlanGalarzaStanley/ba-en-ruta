import { codeId, deviceHash, generateCode, normalizeCode, signSession, verifySession, type SessionPayload } from "./crypto.js"
import { PreconditionFailed, type DocStore } from "./store.js"
import { isTourId, type TourId } from "./tours.js"

export interface CodeRecord {
  v: 1
  id: string
  tour: TourId
  status: "active" | "revoked"
  createdAt: number
  /** Fecha límite para el primer canje (ms). */
  redeemBy: number
  /** Duración de la sesión desde el primer canje (horas). */
  sessionHours: number
  /** Dispositivos que pueden usar el mismo código (1 por defecto). */
  maxDevices: number
  devices: { h: string; at: number }[]
  firstRedeemedAt: number | null
  /** Últimos 4 caracteres, para reconocer el código en el panel. */
  hint: string
  note: string
}

export interface Ctx {
  store: DocStore
  secret: string
  /** Prefijo por entorno (production / preview / local) para no mezclar datos. */
  prefix: string
  now: () => number
}

export type Result<T> = { ok: true; value: T } | { ok: false; status: number; error: string }
const fail = (status: number, error: string) => ({ ok: false as const, status, error })

const keyFor = (ctx: Ctx, id: string) => `${ctx.prefix}/codes/${id}.json`
const HOUR = 3_600_000
const DAY = 24 * HOUR

export function sessionEnd(rec: CodeRecord): number | null {
  return rec.firstRedeemedAt == null ? null : rec.firstRedeemedAt + rec.sessionHours * HOUR
}

function isValidDeviceId(x: unknown): x is string {
  return typeof x === "string" && /^[A-Za-z0-9_-]{16,64}$/.test(x)
}

export interface SessionInfo {
  token: string
  tour: TourId
  expiresAt: number
}

function issue(ctx: Ctx, rec: CodeRecord, dev: string): SessionInfo {
  const exp = sessionEnd(rec)!
  const p: SessionPayload = { v: 1, c: rec.id, t: rec.tour, d: dev, iat: ctx.now(), exp }
  return { token: signSession(ctx.secret, p), tour: rec.tour, expiresAt: exp }
}

/**
 * Canje: valida el código y vincula el dispositivo de forma atómica (ETag).
 * Volver a canjear desde el mismo dispositivo devuelve la misma sesión (recuperación).
 */
export async function redeem(ctx: Ctx, rawCode: unknown, deviceId: unknown): Promise<Result<SessionInfo>> {
  const code = normalizeCode(rawCode)
  if (!code) return fail(400, "invalid_code")
  if (!isValidDeviceId(deviceId)) return fail(400, "invalid_device")
  const id = codeId(ctx.secret, code)
  const dev = deviceHash(ctx.secret, deviceId)
  for (let attempt = 0; attempt < 4; attempt++) {
    const doc = await ctx.store.get<CodeRecord>(keyFor(ctx, id))
    if (!doc) return fail(404, "invalid_code")
    const rec = doc.data
    const now = ctx.now()
    if (rec.status === "revoked") return fail(403, "revoked")
    const end = sessionEnd(rec)
    if (end != null && now >= end) return fail(410, "expired")
    if (rec.devices.some((d) => d.h === dev)) return { ok: true, value: issue(ctx, rec, dev) }
    if (rec.firstRedeemedAt == null && now >= rec.redeemBy) return fail(410, "expired")
    if (rec.devices.length >= rec.maxDevices) return fail(409, "in_use")
    const next: CodeRecord = {
      ...rec,
      devices: [...rec.devices, { h: dev, at: now }],
      firstRedeemedAt: rec.firstRedeemedAt ?? now,
    }
    try {
      await ctx.store.put(keyFor(ctx, id), next, { ifMatch: doc.etag })
      return { ok: true, value: issue(ctx, next, dev) }
    } catch (e) {
      if (e instanceof PreconditionFailed) continue // otro canje ganó: releer y decidir
      throw e
    }
  }
  return fail(409, "busy")
}

/** Verifica una sesión guardada (al recargar o volver a abrir el navegador). */
export async function checkSession(ctx: Ctx, token: unknown, deviceId: unknown): Promise<Result<{ tour: TourId; expiresAt: number }>> {
  const p = verifySession(ctx.secret, token, ctx.now())
  if (!p || !isValidDeviceId(deviceId) || p.d !== deviceHash(ctx.secret, deviceId)) return fail(401, "invalid_session")
  const doc = await ctx.store.get<CodeRecord>(keyFor(ctx, p.c))
  if (!doc) return fail(401, "invalid_session")
  const rec = doc.data
  if (rec.status === "revoked") return fail(403, "revoked")
  if (!rec.devices.some((d) => d.h === p.d)) return fail(401, "device_released")
  const end = sessionEnd(rec)
  if (end == null || ctx.now() >= end) return fail(410, "expired")
  return { ok: true, value: { tour: rec.tour, expiresAt: end } }
}

/** Verificación sin lectura del almacenamiento (para servir narraciones sin gastar operaciones). */
export function verifySessionToken(ctx: Ctx, token: unknown, deviceId: unknown): SessionPayload | null {
  const p = verifySession(ctx.secret, token, ctx.now())
  if (!p || !isValidDeviceId(deviceId) || p.d !== deviceHash(ctx.secret, deviceId)) return null
  return p
}

// ---------- Administración ----------

export interface CreateInput {
  tour?: unknown
  count?: unknown
  redeemDays?: unknown
  sessionHours?: unknown
  maxDevices?: unknown
  note?: unknown
}

function int(x: unknown, def: number, min: number, max: number): number | null {
  if (x === undefined || x === null || x === "") return def
  const n = typeof x === "number" ? x : Number(x)
  if (!Number.isInteger(n) || n < min || n > max) return null
  return n
}

export type PublicCode = Omit<CodeRecord, "devices" | "v"> & { devicesUsed: number; sessionEndsAt: number | null }

const toPublic = (r: CodeRecord): PublicCode => {
  const { devices, v: _v, ...rest } = r
  return { ...rest, devicesUsed: devices.length, sessionEndsAt: sessionEnd(r) }
}

export async function createCodes(ctx: Ctx, input: CreateInput): Promise<Result<{ codes: { code: string; record: PublicCode }[] }>> {
  if (!isTourId(input.tour)) return fail(400, "invalid_tour")
  const count = int(input.count, 1, 1, 20)
  const redeemDays = int(input.redeemDays, 30, 1, 180)
  const sessionHours = int(input.sessionHours, 12, 1, 72)
  const maxDevices = int(input.maxDevices, 1, 1, 5)
  if (count == null || redeemDays == null || sessionHours == null || maxDevices == null) return fail(400, "invalid_params")
  const note = typeof input.note === "string" ? input.note.replace(/[\u0000-\u001f]/g, "").trim().slice(0, 80) : ""
  const out: { code: string; record: PublicCode }[] = []
  for (let i = 0; i < count; i++) {
    for (let attempt = 0; ; attempt++) {
      const code = generateCode()
      const norm = normalizeCode(code)!
      const now = ctx.now()
      const rec: CodeRecord = {
        v: 1,
        id: codeId(ctx.secret, norm),
        tour: input.tour,
        status: "active",
        createdAt: now,
        redeemBy: now + redeemDays * DAY,
        sessionHours,
        maxDevices,
        devices: [],
        firstRedeemedAt: null,
        hint: norm.slice(-4),
        note,
      }
      try {
        await ctx.store.put(keyFor(ctx, rec.id), rec, { create: true })
        out.push({ code, record: toPublic(rec) })
        break
      } catch (e) {
        if (e instanceof PreconditionFailed && attempt < 3) continue // colisión (prácticamente imposible)
        throw e
      }
    }
  }
  return { ok: true, value: { codes: out } }
}

export async function listCodes(ctx: Ctx, limit = 100): Promise<Result<{ codes: PublicCode[] }>> {
  const keys = await ctx.store.list(`${ctx.prefix}/codes/`, Math.min(Math.max(limit, 1), 200))
  const docs = await Promise.all(keys.map((k) => ctx.store.get<CodeRecord>(k.key)))
  const codes = docs.filter((d): d is NonNullable<typeof d> => !!d).map((d) => toPublic(d.data))
  codes.sort((a, b) => b.createdAt - a.createdAt)
  return { ok: true, value: { codes } }
}

/** Cambios administrativos con el mismo compare-and-swap que el canje. */
async function mutate(ctx: Ctx, id: unknown, fn: (r: CodeRecord) => CodeRecord): Promise<Result<{ code: PublicCode }>> {
  if (typeof id !== "string" || !/^[a-f0-9]{40}$/.test(id)) return fail(400, "invalid_id")
  for (let attempt = 0; attempt < 4; attempt++) {
    const doc = await ctx.store.get<CodeRecord>(keyFor(ctx, id))
    if (!doc) return fail(404, "not_found")
    const next = fn(doc.data)
    try {
      await ctx.store.put(keyFor(ctx, id), next, { ifMatch: doc.etag })
      return { ok: true, value: { code: toPublic(next) } }
    } catch (e) {
      if (e instanceof PreconditionFailed) continue
      throw e
    }
  }
  return fail(409, "busy")
}

export const revokeCode = (ctx: Ctx, id: unknown) => mutate(ctx, id, (r) => ({ ...r, status: "revoked" }))
/** Libera los dispositivos (p. ej. el pasajero cambió de teléfono). La ventana de la sesión no se reinicia. */
export const releaseDevices = (ctx: Ctx, id: unknown) => mutate(ctx, id, (r) => ({ ...r, devices: [] }))

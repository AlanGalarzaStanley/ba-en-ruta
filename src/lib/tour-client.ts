/**
 * Cliente del modo en ruta: identificador de dispositivo, canje de código,
 * recuperación de sesión y narraciones con caché para usar sin conexión.
 * No maneja ubicación: eso queda en el componente y nunca sale del dispositivo.
 */
import type { ItineraryId } from "./ba-config"

const K = {
  device: "baenruta:device",
  session: "baenruta:session",
  narr: "baenruta:narrations",
  progress: "baenruta:progress",
}

export interface StoredSession {
  token: string
  tour: ItineraryId
  expiresAt: number
}

export interface NarrationStop {
  placeId: string
  status: "borrador" | "revisado"
  reviewedAt: string
  text: Record<"es" | "en" | "pt", string>
  audio: Partial<Record<"es" | "en" | "pt", string>>
  sources: string[]
}

export type TourError =
  | "invalid_code"
  | "in_use"
  | "expired"
  | "revoked"
  | "device_released"
  | "invalid_session"
  | "busy"
  | "network"
  | "not_configured"
  | "server_error"

const ls = {
  get(k: string): string | null {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v)
    } catch {
      /* modo privado o sin espacio: la sesión dura lo que la pestaña */
    }
  },
  del(k: string) {
    try {
      localStorage.removeItem(k)
    } catch {
      /* ignore */
    }
  },
}

function randomId(): string {
  const b = new Uint8Array(16)
  crypto.getRandomValues(b)
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("")
}

/** Identificador aleatorio del navegador. No identifica a la persona; solo vincula el código a este dispositivo. */
export function getDeviceId(): string {
  let id = ls.get(K.device)
  if (!id || !/^[A-Za-z0-9_-]{16,64}$/.test(id)) {
    id = randomId()
    ls.set(K.device, id)
  }
  return id
}

/** Lee el id del código desde el token (sin verificar: la verificación la hace el servidor). */
export function sessionCodeId(token: string): string | null {
  try {
    const body = token.split(".")[1]
    const json = atob(body.replace(/-/g, "+").replace(/_/g, "/"))
    const p = JSON.parse(json) as { c?: string }
    return typeof p.c === "string" ? p.c : null
  } catch {
    return null
  }
}

async function post<T>(path: string, body: unknown): Promise<{ ok: true; data: T } | { ok: false; error: TourError; status: number }> {
  let res: Response
  try {
    res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      credentials: "same-origin",
    })
  } catch {
    return { ok: false, error: "network", status: 0 }
  }
  let data: unknown = null
  try {
    data = await res.json()
  } catch {
    /* respuesta no JSON (p. ej. HTML de un proxy) */
  }
  if (res.ok && data) return { ok: true, data: data as T }
  const err = (data as { error?: string } | null)?.error
  const known: TourError[] = ["invalid_code", "in_use", "expired", "revoked", "device_released", "invalid_session", "busy", "not_configured"]
  return { ok: false, status: res.status, error: known.includes(err as TourError) ? (err as TourError) : res.status >= 500 ? "server_error" : "invalid_code" }
}

export function loadStoredSession(now = Date.now()): StoredSession | null {
  const raw = ls.get(K.session)
  if (!raw) return null
  try {
    const s = JSON.parse(raw) as StoredSession
    if (typeof s.token !== "string" || typeof s.expiresAt !== "number") return null
    if (now >= s.expiresAt) {
      clearSession()
      return null
    }
    return s
  } catch {
    return null
  }
}

export function clearSession() {
  ls.del(K.session)
  ls.del(K.narr)
}

export async function redeemCode(code: string) {
  const r = await post<StoredSession>("/api/tour/redeem", { code, deviceId: getDeviceId() })
  if (r.ok) ls.set(K.session, JSON.stringify(r.data))
  return r
}

export type RestoreResult =
  | { status: "none" }
  | { status: "ok"; session: StoredSession; offline: boolean }
  | { status: "ended"; error: TourError }

/**
 * Recupera la sesión al recargar o volver a abrir el navegador.
 * Si no hay conexión, sigue con la sesión guardada hasta su vencimiento (los recorridos
 * pasan por zonas con mala señal); el servidor vuelve a validarla al recuperar la conexión.
 */
export async function restoreSession(): Promise<RestoreResult> {
  const s = loadStoredSession()
  if (!s) return { status: "none" }
  const r = await post<{ tour: ItineraryId; expiresAt: number }>("/api/tour/session", { token: s.token, deviceId: getDeviceId() })
  if (r.ok) {
    const next = { ...s, tour: r.data.tour, expiresAt: r.data.expiresAt }
    ls.set(K.session, JSON.stringify(next))
    return { status: "ok", session: next, offline: false }
  }
  if (r.error === "network" || r.error === "server_error" || r.error === "not_configured" || r.error === "busy") {
    return { status: "ok", session: s, offline: true }
  }
  clearSession()
  return { status: "ended", error: r.error }
}

export async function loadNarrations(s: StoredSession): Promise<{ stops: NarrationStop[]; cached: boolean } | null> {
  const cid = sessionCodeId(s.token)
  const r = await post<{ stops: NarrationStop[] }>("/api/tour/narration", { token: s.token, deviceId: getDeviceId() })
  if (r.ok) {
    ls.set(K.narr, JSON.stringify({ c: cid, stops: r.data.stops }))
    return { stops: r.data.stops, cached: false }
  }
  const raw = ls.get(K.narr)
  if (raw && (r.error === "network" || r.error === "server_error")) {
    try {
      const c = JSON.parse(raw) as { c: string; stops: NarrationStop[] }
      if (c.c === cid) return { stops: c.stops, cached: true }
    } catch {
      /* ignore */
    }
  }
  return null
}

export interface Progress {
  arrived: string[]
  current: number
}

export function loadProgress(s: StoredSession): Progress {
  const cid = sessionCodeId(s.token)
  try {
    const p = JSON.parse(ls.get(K.progress) ?? "null") as (Progress & { c: string }) | null
    if (p && p.c === cid && Array.isArray(p.arrived)) return { arrived: p.arrived.filter((x) => typeof x === "string"), current: Number(p.current) || 0 }
  } catch {
    /* ignore */
  }
  return { arrived: [], current: 0 }
}

export function saveProgress(s: StoredSession, p: Progress) {
  ls.set(K.progress, JSON.stringify({ c: sessionCodeId(s.token), arrived: p.arrived, current: p.current }))
}

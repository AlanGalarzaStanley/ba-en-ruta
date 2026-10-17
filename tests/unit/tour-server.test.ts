import { describe, expect, it } from "vitest"
import { CODE_ALPHABET, generateCode, normalizeCode, signSession, verifySession } from "../../server/crypto"
import { MemoryStore, PreconditionFailed } from "../../server/store"
import { checkSession, createCodes, listCodes, redeem, releaseDevices, revokeCode, verifySessionToken, type Ctx } from "../../server/service"
import { TOUR_PLACES } from "../../server/tours"
import { NARRATIONS, narrationsForTour } from "../../server/narrations"
import { handleApi } from "../../server/http"
import { loadConfig } from "../../server/env"
import { ITINERARIES, PLACES } from "../../src/lib/ba-config"

const SECRET = "test-secret-0123456789-0123456789-abcdef"
const DEV_A = "deviceAAAAAAAAAAAAAAAA"
const DEV_B = "deviceBBBBBBBBBBBBBBBB"

function makeCtx(start = Date.UTC(2026, 9, 17, 12)) {
  let now = start
  const ctx: Ctx = { store: new MemoryStore(), secret: SECRET, prefix: "tour/test", now: () => now }
  return { ctx, advance: (ms: number) => (now += ms) }
}

async function oneCode(ctx: Ctx, extra: Record<string, unknown> = {}) {
  const r = await createCodes(ctx, { tour: "clasica", ...extra })
  if (!r.ok) throw new Error(r.error)
  return r.value.codes[0]
}

describe("códigos", () => {
  it("genera 12 caracteres del alfabeto en grupos de 4", () => {
    for (let i = 0; i < 200; i++) {
      const c = generateCode()
      expect(c).toMatch(/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/)
      for (const ch of c.replace(/-/g, "")) expect(CODE_ALPHABET).toContain(ch)
    }
  })
  it("normaliza minúsculas, espacios y confusiones O/0 I/L/1", () => {
    expect(normalizeCode("7kq2 m9xa 3trd")).toBe("7KQ2M9XA3TRD")
    expect(normalizeCode("OIL0-0000-0000")).toBe("011000000000")
    expect(normalizeCode("ABC")).toBeNull()
    expect(normalizeCode("UUUU-UUUU-UUUU")).toBeNull()
    expect(normalizeCode(123)).toBeNull()
  })
})

describe("tokens de sesión", () => {
  it("rechaza firmas alteradas y vencidas", () => {
    const tok = signSession(SECRET, { v: 1, c: "a".repeat(40), t: "clasica", d: "d", iat: 0, exp: 1000 })
    expect(verifySession(SECRET, tok, 10)?.t).toBe("clasica")
    expect(verifySession(SECRET, tok, 1000)).toBeNull()
    expect(verifySession("otro-secreto-xxxxxxxxxxxxxxxxxxxxxxxx", tok, 10)).toBeNull()
    const [v, body, sig] = tok.split(".")
    const forged = Buffer.from(JSON.stringify({ v: 1, c: "a".repeat(40), t: "historica", d: "d", iat: 0, exp: 1000 })).toString("base64url")
    expect(verifySession(SECRET, `${v}.${forged}.${sig}`, 10)).toBeNull()
    expect(verifySession(SECRET, `${v}.${body}.${sig}x`, 10)).toBeNull()
  })
})

describe("canje", () => {
  it("canjea, vincula el dispositivo y no guarda el código en claro", async () => {
    const { ctx } = makeCtx()
    const { code } = await oneCode(ctx)
    const r = await redeem(ctx, code, DEV_A)
    expect(r.ok).toBe(true)
    const keys = await ctx.store.list("tour/test/", 10)
    const raw = JSON.stringify(await ctx.store.get(keys[0].key))
    expect(raw).not.toContain(code.replace(/-/g, ""))
    expect(raw).not.toContain(DEV_A)
  })
  it("impide reutilizar el código en otro dispositivo", async () => {
    const { ctx } = makeCtx()
    const { code } = await oneCode(ctx)
    expect((await redeem(ctx, code, DEV_A)).ok).toBe(true)
    const r = await redeem(ctx, code, DEV_B)
    expect(r).toEqual({ ok: false, status: 409, error: "in_use" })
  })
  it("el mismo dispositivo recupera la sesión (recarga o datos borrados del token)", async () => {
    const { ctx, advance } = makeCtx()
    const { code } = await oneCode(ctx)
    const a = await redeem(ctx, code, DEV_A)
    advance(60_000)
    const b = await redeem(ctx, code, DEV_A)
    expect(a.ok && b.ok && a.value.expiresAt === b.value.expiresAt).toBe(true)
  })
  it("canjes simultáneos desde 10 dispositivos: exactamente uno gana", async () => {
    const { ctx } = makeCtx()
    const { code } = await oneCode(ctx)
    const devs = Array.from({ length: 10 }, (_, i) => `concurrent-device-${String(i).padStart(4, "0")}`)
    const results = await Promise.all(devs.map((d) => redeem(ctx, code, d)))
    expect(results.filter((r) => r.ok)).toHaveLength(1)
    expect(results.filter((r) => !r.ok && (r.error === "in_use" || r.error === "busy"))).toHaveLength(9)
  })
  it("respeta maxDevices", async () => {
    const { ctx } = makeCtx()
    const { code } = await oneCode(ctx, { maxDevices: 2 })
    expect((await redeem(ctx, code, DEV_A)).ok).toBe(true)
    expect((await redeem(ctx, code, DEV_B)).ok).toBe(true)
    expect((await redeem(ctx, code, "deviceCCCCCCCCCCCCCCCC")).ok).toBe(false)
  })
  it("vence: sin canje antes de redeemBy y sesión después de sessionHours", async () => {
    const { ctx, advance } = makeCtx()
    const c1 = await oneCode(ctx, { redeemDays: 1, sessionHours: 2 })
    const c2 = await oneCode(ctx, { redeemDays: 1, sessionHours: 2 })
    const s = await redeem(ctx, c1.code, DEV_A)
    advance(2 * 3_600_000)
    expect(await redeem(ctx, c1.code, DEV_A)).toMatchObject({ ok: false, error: "expired" })
    if (s.ok) expect(await checkSession(ctx, s.value.token, DEV_A)).toMatchObject({ ok: false })
    advance(24 * 3_600_000)
    expect(await redeem(ctx, c2.code, DEV_A)).toMatchObject({ ok: false, error: "expired" })
  })
  it("código inexistente o mal formado", async () => {
    const { ctx } = makeCtx()
    expect(await redeem(ctx, "0000-0000-0000", DEV_A)).toMatchObject({ ok: false, status: 404 })
    expect(await redeem(ctx, "x", DEV_A)).toMatchObject({ ok: false, status: 400 })
    const { code } = await oneCode(ctx)
    expect(await redeem(ctx, code, "corto")).toMatchObject({ ok: false, error: "invalid_device" })
  })
})

describe("sesión y administración", () => {
  it("checkSession valida dispositivo, revocación y liberación", async () => {
    const { ctx } = makeCtx()
    const { code, record } = await oneCode(ctx)
    const r = await redeem(ctx, code, DEV_A)
    if (!r.ok) throw new Error("redeem")
    expect(await checkSession(ctx, r.value.token, DEV_A)).toMatchObject({ ok: true, value: { tour: "clasica" } })
    expect(await checkSession(ctx, r.value.token, DEV_B)).toMatchObject({ ok: false, status: 401 })
    expect(verifySessionToken(ctx, r.value.token, DEV_B)).toBeNull()

    await releaseDevices(ctx, record.id)
    expect(await checkSession(ctx, r.value.token, DEV_A)).toMatchObject({ ok: false, error: "device_released" })
    // Liberado: otro teléfono puede usarlo dentro de la misma ventana
    const b = await redeem(ctx, code, DEV_B)
    expect(b.ok && r.ok && b.value.expiresAt === r.value.expiresAt).toBe(true)

    await revokeCode(ctx, record.id)
    expect(await redeem(ctx, code, DEV_B)).toMatchObject({ ok: false, error: "revoked" })
  })
  it("lista sin exponer códigos ni dispositivos", async () => {
    const { ctx } = makeCtx()
    const r = await createCodes(ctx, { tour: "futbolera", count: 3, note: "Familia Pérez\n" })
    expect(r.ok && r.value.codes).toHaveLength(3)
    const l = await listCodes(ctx)
    if (!l.ok) throw new Error()
    expect(l.value.codes).toHaveLength(3)
    const s = JSON.stringify(l.value)
    if (r.ok) for (const c of r.value.codes) expect(s).not.toContain(c.code)
    expect(s).not.toContain('"devices"')
    expect(l.value.codes[0].note).toBe("Familia Pérez")
  })
  it("valida parámetros de creación", async () => {
    const { ctx } = makeCtx()
    expect(await createCodes(ctx, { tour: "inexistente" })).toMatchObject({ ok: false, error: "invalid_tour" })
    expect(await createCodes(ctx, { tour: "clasica", count: 50 })).toMatchObject({ ok: false })
    expect(await createCodes(ctx, { tour: "clasica", sessionHours: 0 })).toMatchObject({ ok: false })
  })
})

describe("almacenamiento en memoria", () => {
  it("ifMatch y create son condicionales", async () => {
    const s = new MemoryStore()
    const e1 = await s.put("k", { a: 1 }, { create: true })
    await expect(s.put("k", { a: 2 }, { create: true })).rejects.toBeInstanceOf(PreconditionFailed)
    await expect(s.put("k", { a: 2 }, { ifMatch: '"otro"' })).rejects.toBeInstanceOf(PreconditionFailed)
    await s.put("k", { a: 3 }, { ifMatch: e1 })
    expect((await s.get<{ a: number }>("k"))?.data.a).toBe(3)
  })
})

describe("API HTTP", () => {
  const cfg = () =>
    loadConfig({ TOUR_STORE: "memory", TOUR_AUTH_SECRET: SECRET, TOUR_ADMIN_TOKEN: "admin-token-for-tests-123456" })
  const post = (route: string, body: unknown, headers: Record<string, string> = {}) =>
    handleApi(new Request(`http://x.test/api/${route}`, { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json", ...headers } }), route, cfg())

  it("falla cerrado sin secreto ni almacenamiento", async () => {
    const r = await handleApi(new Request("http://x.test/api/tour/redeem", { method: "POST", body: "{}" }), "tour/redeem", loadConfig({ VERCEL: "1" }))
    expect(r.status).toBe(503)
  })
  it("admin requiere token", async () => {
    expect((await post("admin/codes", { action: "create", tour: "clasica" })).status).toBe(401)
    expect((await post("admin/codes", { action: "create", tour: "clasica" }, { authorization: "Bearer wrong" })).status).toBe(401)
  })
  it("flujo completo: crear → canjear → narración", async () => {
    const created = await post("admin/codes", { action: "create", tour: "historica" }, { authorization: "Bearer admin-token-for-tests-123456" })
    expect(created.status).toBe(200)
    expect(created.headers.get("cache-control")).toBe("no-store")
    const { codes } = (await created.json()) as { codes: { code: string }[] }
    const red = await post("tour/redeem", { code: codes[0].code, deviceId: DEV_A })
    expect(red.status).toBe(200)
    const { token } = (await red.json()) as { token: string }
    const nar = await post("tour/narration", { token, deviceId: DEV_A })
    const body = (await nar.json()) as { stops: { placeId: string; text: Record<string, string> }[] }
    expect(body.stops.map((s) => s.placeId)).toEqual(["san-telmo-plaza", "caminito", "bombonera"])
    expect((await post("tour/narration", { token, deviceId: DEV_B })).status).toBe(401)
  })
  it("rechaza otro origen y cuerpos grandes", async () => {
    expect((await post("tour/redeem", {}, { origin: "https://evil.example" })).status).toBe(403)
    expect((await post("tour/redeem", { code: "x".repeat(5000) })).status).toBe(400)
  })
})

describe("datos", () => {
  it("los recorridos del servidor coinciden con el catálogo del sitio", () => {
    const client = Object.fromEntries(ITINERARIES.map((i) => [i.id, i.placeIds]))
    expect(client).toEqual(TOUR_PLACES)
  })
  it("cada lugar tiene narración en los 3 idiomas, de 1 a 2 minutos, con fuentes oficiales", () => {
    for (const p of PLACES) {
      const n = NARRATIONS[p.id]
      expect(n, p.id).toBeTruthy()
      for (const l of ["es", "en", "pt"] as const) {
        const words = n.text[l].split(/\s+/).length
        // ~130–160 palabras por minuto leídas en voz alta
        expect(words, `${p.id}/${l}`).toBeGreaterThan(110)
        expect(words, `${p.id}/${l}`).toBeLessThan(260)
      }
      expect(n.sources.length).toBeGreaterThan(0)
      for (const s of n.sources) expect(s).toMatch(/^https:\/\/(turismo\.buenosaires\.gob\.ar|buenosaires\.gob\.ar|www\.bocajuniors\.com\.ar|www\.tigre\.gob\.ar|vivitigre\.gob\.ar)\//)
      expect(Object.keys(n.audio)).toHaveLength(0) // no hay grabaciones todavía: no inventar
    }
    expect(narrationsForTour("clasica").map((n) => n.placeId)).toEqual(["obelisco-colon", "recoleta", "palermo"])
  })
})

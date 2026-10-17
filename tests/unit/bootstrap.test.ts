import { describe, expect, it } from "vitest"
import { ADMIN_KEY, adminState, getOrCreateSecret, setupAdminPassword, verifyAdminPassword } from "../../server/bootstrap"
import { MemoryStore } from "../../server/store"
import { handleApi } from "../../server/http"
import { loadConfig, resetMemoryStore } from "../../server/env"

describe("configuración automática", () => {
  it("genera la clave interna una sola vez, también con pedidos simultáneos", async () => {
    const store = new MemoryStore()
    const all = await Promise.all(Array.from({ length: 5 }, () => getOrCreateSecret(store)))
    expect(new Set(all).size).toBe(1)
    expect(all[0].length).toBeGreaterThanOrEqual(32)
    expect(await getOrCreateSecret(store)).toBe(all[0])
  })

  it("contraseña del panel: se crea una vez, se guarda como hash y se verifica", async () => {
    const store = new MemoryStore()
    expect(await adminState(store, null)).toBe("setup_required")
    expect(await setupAdminPassword(store, null, "preview", "corta")).toBe("weak_password")
    expect(await setupAdminPassword(store, null, "preview", "mi-clave-larga-123")).toBe("ok")
    expect(await setupAdminPassword(store, null, "preview", "otra-clave-larga-456")).toBe("already_set")
    expect(await adminState(store, null)).toBe("ready")
    expect(JSON.stringify(await store.get(ADMIN_KEY))).not.toContain("mi-clave-larga-123")
    expect(await verifyAdminPassword(store, null, "mi-clave-larga-123")).toBe(true)
    expect(await verifyAdminPassword(store, null, "mi-clave-larga-124")).toBe(false)
    expect(await verifyAdminPassword(store, null, "")).toBe(false)
  })

  it("en producción no se puede crear la contraseña", async () => {
    const store = new MemoryStore()
    expect(await setupAdminPassword(store, null, "production", "mi-clave-larga-123")).toBe("not_allowed")
    expect(await adminState(store, null)).toBe("setup_required")
  })

  it("si existe TOUR_ADMIN_TOKEN, manda esa variable", async () => {
    const store = new MemoryStore()
    const tok = "variable-de-entorno-0123456789"
    expect(await adminState(store, tok)).toBe("env")
    expect(await setupAdminPassword(store, tok, "preview", "mi-clave-larga-123")).toBe("not_allowed")
    expect(await verifyAdminPassword(store, tok, tok)).toBe(true)
    expect(await verifyAdminPassword(store, tok, "otra")).toBe(false)
  })

  it("API: sin variables, el dueño crea la contraseña y opera el panel", async () => {
    resetMemoryStore()
    const cfg = loadConfig({ TOUR_STORE: "memory" }) // sin TOUR_AUTH_SECRET ni TOUR_ADMIN_TOKEN
    const call = (route: string, init: RequestInit = {}) => handleApi(new Request(`http://x.test/api/${route}`, init), route, cfg)
    const st = (await (await call("admin/status")).json()) as { state: string; setupAllowed: boolean }
    expect(st).toEqual({ state: "setup_required", setupAllowed: true })
    expect((await call("admin/codes", { headers: { authorization: "Bearer cualquiera" } })).status).toBe(401)
    expect((await call("admin/setup", { method: "POST", body: JSON.stringify({ password: "clave-del-duenio-2026" }) })).status).toBe(200)
    expect((await call("admin/setup", { method: "POST", body: JSON.stringify({ password: "intento-de-otro-2026" }) })).status).toBe(409)
    const created = await call("admin/codes", { method: "POST", headers: { authorization: "Bearer clave-del-duenio-2026" }, body: JSON.stringify({ action: "create", tour: "futbolera" }) })
    expect(created.status).toBe(200)
    const code = ((await created.json()) as { codes: { code: string }[] }).codes[0].code
    const red = await call("tour/redeem", { method: "POST", body: JSON.stringify({ code, deviceId: "dispositivo-de-prueba-01" }) })
    expect(red.status).toBe(200)
    resetMemoryStore()
  })

  it("API en producción sin contraseña: no permite crearla", async () => {
    resetMemoryStore()
    // VERCEL_ENV=production con memoria solo es posible en pruebas (en Vercel se exige Blob)
    const cfg = loadConfig({ TOUR_STORE: "memory", VERCEL_ENV: "production" })
    const st = (await (await handleApi(new Request("http://x.test/api/admin/status"), "admin/status", cfg)).json()) as { setupAllowed: boolean }
    expect(st.setupAllowed).toBe(false)
    const r = await handleApi(new Request("http://x.test/api/admin/setup", { method: "POST", body: JSON.stringify({ password: "clave-del-duenio-2026" }) }), "admin/setup", cfg)
    expect(r.status).toBe(409)
    resetMemoryStore()
  })
})

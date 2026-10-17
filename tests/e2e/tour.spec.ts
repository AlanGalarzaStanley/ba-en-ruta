import AxeBuilder from "@axe-core/playwright"
import type { APIRequestContext, BrowserContext } from "@playwright/test"
import { test, expect } from "./fixtures"

/**
 * Modo en ruta: activación por código, sesión, GPS simulado y panel de administración.
 * Corre contra `vite preview` con la API local en memoria (server/vite-plugin.ts).
 * Contra una URL externa (E2E_BASE_URL) se omite: requiere el token de administración.
 */
const ADMIN = process.env.E2E_ADMIN_TOKEN ?? "local-admin-token-0000000000"
test.skip(!!process.env.E2E_BASE_URL && !process.env.E2E_ADMIN_TOKEN, "requiere E2E_ADMIN_TOKEN contra un despliegue")

const RECOLETA = { latitude: -34.5875, longitude: -58.393 }
const FAR = { latitude: -34.65, longitude: -58.45 }
const serious = (v: { impact?: string | null }) => v.impact === "critical" || v.impact === "serious"

async function createCode(request: APIRequestContext, extra: Record<string, unknown> = {}) {
  const r = await request.post("/api/admin/codes", {
    headers: { Authorization: `Bearer ${ADMIN}` },
    data: { action: "create", tour: "clasica", note: "e2e", ...extra },
  })
  expect(r.status()).toBe(200)
  const body = (await r.json()) as { codes: { code: string; record: { id: string } }[] }
  return body.codes[0]
}

async function activate(page: import("@playwright/test").Page, code: string) {
  await page.goto(`/tour?codigo=${code}&lang=es`)
  await expect(page.getByLabel("Código de activación")).toHaveValue(code)
  // El código no queda en la barra de direcciones
  expect(new URL(page.url()).searchParams.get("codigo")).toBeNull()
  await page.getByRole("button", { name: "Activar" }).click()
  await expect(page.getByRole("heading", { level: 1, name: "Buenos Aires clásica" })).toBeVisible()
}

test.describe("modo en ruta", () => {
  test("activar con enlace, ver narración y recuperar la sesión al recargar", async ({ page }) => {
    const { code } = await createCode(page.request)
    await activate(page, code)
    const stop = page.getByTestId("current-stop")
    await expect(stop.getByRole("heading", { name: "Obelisco, 9 de Julio y Teatro Colón" })).toBeVisible()
    await expect(page.getByTestId("narration-text")).toContainText("Alberto Prebisch")
    await expect(page.getByRole("button", { name: /Comenzar recorrido/ })).toBeVisible()

    await page.reload()
    await expect(page.getByRole("heading", { level: 1, name: "Buenos Aires clásica" })).toBeVisible()
    await expect(page.getByLabel("Código de activación")).toHaveCount(0)

    // Cambio de idioma: la narración cambia sin volver a pedirla
    await page.getByRole("button", { name: "pt", exact: true }).click()
    await expect(page.getByTestId("narration-text")).toContainText("ícone da cidade")
  })

  test("el mismo código no se puede usar en otro teléfono", async ({ page, browser }) => {
    const { code } = await createCode(page.request)
    await activate(page, code)
    const other: BrowserContext = await browser.newContext()
    const p2 = await other.newPage()
    await p2.goto(`/tour?lang=es`)
    await p2.getByLabel("Código de activación").fill(code.toLowerCase().replace(/-/g, " "))
    await p2.getByRole("button", { name: "Activar" }).click()
    await expect(p2.getByRole("alert")).toContainText("ya se activó en otro teléfono")
    await other.close()
  })

  test("código inválido muestra un error claro", async ({ page }) => {
    await page.goto("/tour?lang=es")
    await page.getByLabel("Código de activación").fill("0000-0000-0000")
    await page.getByRole("button", { name: "Activar" }).click()
    await expect(page.getByRole("alert")).toContainText("no es válido")
  })

  test("canjes simultáneos: solo uno gana", async ({ request }) => {
    const { code } = await createCode(request)
    const devices = Array.from({ length: 6 }, (_, i) => `parallel-e2e-device-${i}-${Date.now()}`)
    const res = await Promise.all(devices.map((deviceId) => request.post("/api/tour/redeem", { data: { code, deviceId } })))
    expect(res.filter((r) => r.status() === 200)).toHaveLength(1)
    expect(res.filter((r) => r.status() === 409)).toHaveLength(5)
  })

  test("GPS: al acercarse a una parada se activa sola", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ baseURL, permissions: ["geolocation"], geolocation: { ...FAR, accuracy: 20 }, locale: "es-AR" })
    const page = await ctx.newPage()
    const { code } = await createCode(page.request)
    await activate(page, code)
    await page.getByRole("button", { name: /Comenzar recorrido/ }).click()
    await expect(page.getByTestId("gps-status")).toContainText("GPS activo")
    await expect(page.getByTestId("nearest")).toContainText(/^A [0-9.,]+ (m|km) de /)

    await ctx.setGeolocation({ ...RECOLETA, accuracy: 15 })
    await expect(page.getByTestId("current-stop").getByRole("heading", { name: /Recoleta/ })).toBeVisible()
    await expect(page.getByTestId("narration-text")).toContainText("Próspero Catelin")
    await expect(page.getByTestId("narration-mode")).toContainText(/Voz automática|Solo texto/)
    await expect(page.getByRole("button", { name: /Recoleta/ })).toContainText("visitada")

    // El progreso sobrevive a una recarga
    await page.reload()
    await expect(page.getByTestId("current-stop").getByRole("heading", { name: /Recoleta/ })).toBeVisible()
    await ctx.close()
  })

  test("sin permiso de ubicación: aviso y avance manual", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ baseURL, locale: "es-AR" }) // sin permiso de geolocalización
    const page = await ctx.newPage()
    const { code } = await createCode(page.request)
    await activate(page, code)
    await page.getByRole("button", { name: /Comenzar recorrido/ }).click()
    await expect(page.getByTestId("gps-status")).toContainText("Permiso de ubicación denegado")
    await page.getByRole("button", { name: "Siguiente parada" }).click()
    await expect(page.getByTestId("current-stop")).toContainText("Parada 2 de 5")
    await expect(page.getByTestId("current-stop")).toContainText("Café Tortoni")
    await page.getByRole("button", { name: "Siguiente parada" }).click()
    await expect(page.getByTestId("narration-text")).toContainText("Recoleta")
    await page.getByRole("button", { name: "Anterior" }).click()
    await expect(page.getByTestId("current-stop")).toContainText("Parada 2 de 5")
    await ctx.close()
  })

  test("sin conexión: sigue con la sesión y las narraciones guardadas", async ({ page }) => {
    const { code } = await createCode(page.request)
    await activate(page, code)
    await expect(page.getByTestId("narration-text")).toContainText("Prebisch")
    await page.route("**/api/tour/**", (r) => r.abort("internetdisconnected"))
    await page.reload()
    await expect(page.getByText("Sin conexión: seguís con tu recorrido")).toBeVisible()
    await expect(page.getByTestId("narration-text")).toContainText("Prebisch")
  })

  test("desactivar un código corta la sesión al recargar", async ({ page }) => {
    const { code, record } = await createCode(page.request)
    await activate(page, code)
    const r = await page.request.post("/api/admin/codes", { headers: { Authorization: `Bearer ${ADMIN}` }, data: { action: "revoke", id: record.id } })
    expect(r.status()).toBe(200)
    await page.reload()
    await expect(page.getByRole("alert")).toContainText("fue desactivado")
    await expect(page.getByLabel("Código de activación")).toBeVisible()
  })

  test("accesibilidad: activación y recorrido sin problemas graves", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/tour?lang=es")
    let r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()
    expect(r.violations.filter(serious).map((v) => v.id)).toEqual([])
    const { code } = await createCode(page.request)
    await activate(page, code)
    await expect(page.getByTestId("narration-text")).toBeVisible()
    r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()
    expect(r.violations.filter(serious).map((v) => `${v.id}: ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([])
  })
})

test.describe("panel de códigos", () => {
  test("token incorrecto, crear, listar y liberar", async ({ page }) => {
    await page.goto("/admin")
    await page.getByLabel("Token").fill("incorrecto")
    await page.getByRole("button", { name: "Entrar" }).click()
    await expect(page.getByRole("alert")).toContainText("incorrecto")

    await page.getByLabel("Token").fill(ADMIN)
    await page.getByRole("button", { name: "Entrar" }).click()
    await page.getByLabel("Recorrido").selectOption("futbolera")
    await page.getByLabel("Nota interna (cliente, fecha)").fill("Cliente prueba")
    await page.getByRole("button", { name: "Crear", exact: true }).click()
    const code = (await page.getByTestId("new-code").first().textContent())!.trim()
    expect(code).toMatch(/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/)
    const wa = page.getByRole("link", { name: "WhatsApp" }).first()
    await expect(wa).toHaveAttribute("href", new RegExp(`^https://wa\\.me/\\?text=.*${code}`))

    const row = page.getByTestId("code-row").filter({ hasText: "Cliente prueba" }).first()
    await expect(row.getByTestId("code-status")).toHaveText("Disponible")
    // La lista no muestra el código completo
    await expect(page.getByTestId("code-row").filter({ hasText: code })).toHaveCount(0)

    // Canje desde otro dispositivo y liberación desde el panel
    const red = await page.request.post("/api/tour/redeem", { data: { code, deviceId: `admin-e2e-device-${Date.now()}` } })
    expect(red.status()).toBe(200)
    await page.getByRole("button", { name: "Actualizar" }).click()
    await expect(row.getByTestId("code-status")).toHaveText("En uso (1/1)")
    page.once("dialog", (d) => d.accept())
    await row.getByRole("button", { name: "Liberar" }).click()
    await expect(row.getByTestId("code-status")).toHaveText("Disponible")
  })

  test("la API de administración rechaza sin token", async ({ request }) => {
    const r = await request.get("/api/admin/codes")
    expect(r.status()).toBe(401)
    expect(r.headers()["cache-control"]).toBe("no-store")
  })
})

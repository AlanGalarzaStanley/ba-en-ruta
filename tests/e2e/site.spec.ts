import { test, expect, trapWindowOpen } from "./fixtures"

test.describe("portada", () => {
  test("carga en español con metadatos y secciones clave", async ({ page }) => {
    await page.goto("/?lang=es")
    await expect(page.locator("h1")).toContainText("Buenos Aires")
    await expect(page).toHaveTitle(/BA en Ruta/)
    await expect(page.locator("html")).toHaveAttribute("lang", "es")
    for (const id of ["recorridos", "imperdibles", "mapa", "gastronomia", "reserva"]) {
      await expect(page.locator(`#${id}`), id).toHaveCount(1)
    }
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.jpg$/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://ba-en-ruta.vercel.app/?lang=es")
  })

  test("idiomas por URL: inglés y portugués", async ({ page }) => {
    await page.goto("/?lang=en")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(page.locator("#recorridos")).toContainText("Feel the route before you book it")
    await page.goto("/?lang=pt")
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR")
    await expect(page.locator("#recorridos h2")).not.toHaveText("")
  })

  test("sin desbordamiento horizontal", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle").catch(() => {})
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })
})

test.describe("simulador de recorrido", () => {
  test("enlace directo ?recorrido=historica, avance, retroceso y cierre", async ({ page }) => {
    await page.goto("/?recorrido=historica&lang=es")
    const dialog = page.getByRole("dialog", { name: /Buenos Aires histórica/ })
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText("Te paso a buscar")
    await dialog.getByRole("button", { name: "Siguiente" }).click()
    await expect(page).toHaveURL(/parada=1/)
    await expect(dialog.locator("h2, h3").first()).not.toContainText("Te paso a buscar")
    await dialog.getByRole("button", { name: "Siguiente" }).click()
    await expect(page).toHaveURL(/parada=2/)
    await dialog.getByRole("button", { name: "Anterior" }).click()
    await expect(page).toHaveURL(/parada=1/)
    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
    await expect(page).not.toHaveURL(/recorrido=|parada=/)
  })

  test("enlace directo a una parada (?parada=2)", async ({ page }) => {
    await page.goto("/?recorrido=historica&parada=2&lang=es")
    const dialog = page.getByRole("dialog")
    await expect(dialog.locator('[aria-current="step"]')).toHaveAttribute("aria-label", /^3\//)
  })

  test("los cinco recorridos abren y llegan al final", async ({ page }) => {
    for (const id of ["historica", "clasica", "gastronomica", "futbolera", "tigre-delta"]) {
      await page.goto(`/?recorrido=${id}&lang=es`)
      const dialog = page.getByRole("dialog")
      await expect(dialog, id).toBeVisible()
      const segments = await dialog.locator('[aria-current="step"], [role="group"] > button').count()
      expect(segments, id).toBeGreaterThan(2)
      await dialog.locator('[role="group"] > button').last().click()
      await expect(dialog, id).toContainText("Así sería tu día")
    }
  })

  test("avance automático cada 12 s, pausa que conserva el tiempo", async ({ page }) => {
    await page.clock.install()
    await page.goto("/?recorrido=clasica&lang=es")
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await page.clock.runFor(12_500)
    await expect(page).toHaveURL(/parada=1/)
    await page.clock.runFor(6_000)
    await dialog.getByRole("button", { name: "Pausar" }).click()
    await page.clock.runFor(20_000)
    await expect(page).toHaveURL(/parada=1/)
    await dialog.getByRole("button", { name: "Reproducir" }).click()
    await page.clock.runFor(6_500)
    await expect(page).toHaveURL(/parada=2/)
  })

  test("con movimiento reducido no avanza solo", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.clock.install()
    await page.goto("/?recorrido=clasica&lang=es")
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.clock.runFor(30_000)
    await expect(page).not.toHaveURL(/parada=/)
    await expect(page.getByRole("dialog").getByRole("button", { name: "Reproducir" })).toBeVisible()
  })

  test("un recorrido inexistente no abre nada", async ({ page }) => {
    await page.goto("/?recorrido=no-existe")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.getByRole("dialog")).toHaveCount(0)
  })

  test("reservar desde el simulador abre WhatsApp con el mensaje", async ({ page }) => {
    const opened = await trapWindowOpen(page)
    await page.goto("/?recorrido=futbolera&lang=es")
    await page.getByRole("dialog").getByRole("button", { name: "Quiero este recorrido" }).last().click()
    const urls = await opened()
    expect(urls.at(-1)).toMatch(/^https:\/\/wa\.me\/5491151448632\?text=.+/)
  })

  test("abrir desde la tarjeta y volver el foco al cerrar", async ({ page }) => {
    await page.goto("/?lang=es")
    const btn = page.getByRole("button", { name: "Vivir este recorrido" }).first()
    await btn.scrollIntoViewIfNeeded()
    await btn.click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole("button", { name: "Cerrar" })).toBeFocused()
    await dialog.getByRole("button", { name: "Cerrar" }).click()
    await expect(dialog).toBeHidden()
    await expect(btn).toBeFocused()
  })
})

test.describe("videos, gastronomía y enlaces", () => {
  test("el video de un imperdible se abre dentro del sitio y se cierra", async ({ page }) => {
    await page.goto("/?lang=es")
    const v = page.locator("#imperdibles").getByRole("button", { name: /^Ver video/ }).first()
    await v.scrollIntoViewIfNeeded()
    await v.click()
    const modal = page.getByRole("dialog")
    await expect(modal).toBeVisible()
    await expect(modal.locator('iframe[src^="https://www.youtube-nocookie.com/embed/"]')).toHaveCount(1)
    await page.keyboard.press("Escape")
    await expect(modal).toBeHidden()
  })

  test("buscador gastronómico filtra y los enlaces externos son seguros", async ({ page }) => {
    await page.goto("/?lang=es")
    const search = page.locator("#gastro-search")
    await search.scrollIntoViewIfNeeded()
    await search.fill("Tortoni")
    const section = page.locator("#gastronomia")
    await expect(section.getByText("Café Tortoni").first()).toBeVisible()
    await expect(section.getByText("Don Julio")).toHaveCount(0)
    const ext = page.locator('a[target="_blank"]')
    const n = await ext.count()
    expect(n).toBeGreaterThan(10)
    for (let i = 0; i < n; i++) {
      const rel = (await ext.nth(i).getAttribute("rel")) ?? ""
      expect(rel, await ext.nth(i).getAttribute("href") ?? "").toContain("noopener")
    }
  })
})

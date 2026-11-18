import { test, expect, trapWindowOpen } from "./fixtures"

test.describe("portada", () => {
  test("carga en español con metadatos y secciones clave", async ({ page }) => {
    await page.goto("/?lang=es")
    await expect(page.locator("h1")).toContainText("Buenos Aires")
    await expect(page).toHaveTitle(/BA en Ruta/)
    await expect(page.locator("html")).toHaveAttribute("lang", "es")
    for (const id of ["recorridos", "quien", "faq"]) {
      await expect(page.locator(`#${id}`), id).toHaveCount(1)
    }
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.jpg$/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://ba-en-ruta.vercel.app/?lang=es")
  })

  test("idiomas por URL: inglés y portugués", async ({ page }) => {
    await page.goto("/?lang=en")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await expect(page.locator("#recorridos")).toContainText("Preview the route before enquiring.")
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
    const dialog = page.getByRole("dialog", { name: /Historia, café y barrios del sur/ })
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText("Punto de partida")
    await dialog.getByRole("button", { name: "Siguiente" }).click()
    await expect(page).toHaveURL(/parada=1/)
    await expect(dialog.locator("h2, h3").first()).not.toContainText("Punto de partida")
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

  test("la introducción integra el hilo narrativo y permite saltar a una parada", async ({ page }) => {
    await page.goto("/?recorrido=historica&lang=es")
    const dialog = page.getByRole("dialog")
    await expect(dialog).toContainText("El hilo de este recorrido")
    await expect(dialog).toContainText("Café Tortoni")
    await expect(dialog).toContainText("Plaza de Mayo (contexto, no parada base)")
    await expect(dialog).toContainText("La línea conecta los puntos como secuencia ilustrativa")

    const planSummary = dialog.getByText("Cómo se organiza el día (orientativo)")
    await planSummary.focus()
    await page.keyboard.press("Space")
    await expect(dialog.locator("details").first()).toHaveAttribute("open", "")
    await expect(dialog.getByRole("button", { name: "Reproducir" })).toBeVisible()
    await expect(dialog.getByRole("button", { name: "Pausar" })).toHaveCount(0)
    await expect(dialog).toContainText("El guion incluye contexto y opciones; solo la lista numerada define la ruta base")
    await expect(dialog.locator(".line-clamp-4")).toHaveCount(0)

    const firstStop = dialog.getByRole("button", { name: "1 Café Tortoni" })
    await firstStop.focus()
    await expect(firstStop).toBeFocused()
    await page.keyboard.press("Enter")
    await expect(page).toHaveURL(/parada=1/)
    await expect(dialog.locator("h2, h3").first()).toContainText("Café Tortoni")
  })

  test("las etiquetas principales del simulador están traducidas en ES/EN/PT", async ({ page }) => {
    const labels = [
      { lang: "es", thread: "El hilo de este recorrido", plan: "Cómo se organiza el día (orientativo)", choose: "Elegí una parada para explorar" },
      { lang: "en", thread: "The thread running through this route", plan: "How the day may unfold (indicative)", choose: "Choose a stop to explore" },
      { lang: "pt", thread: "O fio condutor deste roteiro", plan: "Como o dia pode se organizar (orientativo)", choose: "Escolha uma parada para explorar" },
    ]
    for (const { lang, thread, plan, choose } of labels) {
      await page.goto(`/?recorrido=clasica&lang=${lang}`)
      const dialog = page.getByRole("dialog")
      await expect(dialog).toContainText(thread)
      await expect(dialog).toContainText(choose)
      await expect(dialog.getByText(plan)).toBeVisible()
    }
  })

  test("los controles táctiles conservan 44px y no desbordan a 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 })
    await page.goto("/?recorrido=historica&lang=es")
    const dialog = page.getByRole("dialog")
    const previous = await dialog.getByRole("button", { name: "Anterior", exact: true }).boundingBox()
    const next = await dialog.getByRole("button", { name: "Siguiente", exact: true }).boundingBox()
    const cta = await dialog.getByRole("button", { name: "Consultar este recorrido", exact: true }).boundingBox()
    expect(previous?.width).toBeGreaterThanOrEqual(44)
    expect(next?.width).toBeGreaterThanOrEqual(44)
    expect(cta && cta.x + cta.width).toBeLessThanOrEqual(320)
    const dimensions = await dialog.evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }))
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1)
  })

  test("el avance es manual por defecto; reproducir y pausar son acciones explícitas", async ({ page }) => {
    await page.clock.install()
    await page.goto("/?recorrido=clasica&lang=es")
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await page.clock.runFor(12_500)
    await expect(page).not.toHaveURL(/parada=/)
    await dialog.getByRole("button", { name: "Reproducir" }).click()
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

  test("Sabores Porteños permite elegir una mesa, sumar una pausa y consultar esa selección", async ({ page }) => {
    const opened = await trapWindowOpen(page)
    await page.goto("/?recorrido=gastronomica&lang=es")
    const dialog = page.getByRole("dialog")
    const laCrespo = dialog.getByRole("radio", { name: "Elegir como comida principal: La Crespo" })
    await laCrespo.check()
    await expect(page).toHaveURL(/mesa=la-crespo/)

    const cafe = dialog.getByRole("checkbox", { name: "Sumar una pausa en Café San Bernardo: Café San Bernardo" })
    await cafe.check()
    await expect(page).toHaveURL(/pausa=cafe-san-bernardo/)
    await expect(dialog.getByRole("button", { name: /1 La Crespo/ })).toBeVisible()
    await expect(dialog.getByRole("button", { name: /2 Café San Bernardo/ })).toBeVisible()

    await dialog.getByRole("button", { name: "Consultar este recorrido" }).last().click()
    const urls = await opened()
    const message = new URL(urls.at(-1)!).searchParams.get("text") ?? ""
    expect(message).toContain("La Crespo")
    expect(message).toContain("Café San Bernardo")
  })

  test("un enlace de Sabores Porteños restaura la mesa y la pausa elegidas", async ({ page }) => {
    await page.goto("/?recorrido=gastronomica&mesa=mercat-villa-crespo&pausa=cafe-san-bernardo&lang=es")
    const dialog = page.getByRole("dialog")
    await expect(dialog.getByRole("radio", { name: "Elegir como comida principal: Mercat Villa Crespo" })).toBeChecked()
    await expect(dialog.getByRole("checkbox", { name: "Sumar una pausa en Café San Bernardo: Café San Bernardo" })).toBeChecked()
  })

  test("el selector gastronómico conserva sus traducciones en inglés y portugués", async ({ page }) => {
    const locales = [
      { lang: "en", title: "Choose your food story", mealLabel: "Choose as the main meal: La Crespo" },
      { lang: "pt", title: "Escolha o fio gastronômico", mealLabel: "Escolher como refeição principal: La Crespo" },
    ]
    for (const locale of locales) {
      await page.goto(`/?recorrido=gastronomica&lang=${locale.lang}`)
      const dialog = page.getByRole("dialog")
      await expect(dialog.getByText(locale.title, { exact: true })).toBeVisible()
      await expect(dialog.getByRole("radio", { name: locale.mealLabel })).toBeVisible()
    }
  })

  test("consultar desde el simulador abre WhatsApp con el mensaje", async ({ page }) => {
    const opened = await trapWindowOpen(page)
    await page.goto("/?recorrido=futbolera&lang=es")
    await page.getByRole("dialog").getByRole("button", { name: "Consultar este recorrido" }).last().click()
    const urls = await opened()
    expect(urls.at(-1)).toMatch(/^https:\/\/wa\.me\/5491151448632\?text=.+/)
  })

  test("abrir desde la tarjeta y volver el foco al cerrar", async ({ page }) => {
    await page.goto("/?lang=es")
    const btn = page.getByRole("button", { name: "Ver el recorrido" }).first()
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

test.describe("página corta y conversión", () => {
  test("el CTA principal del hero abre WhatsApp con un mensaje contextual", async ({ page }) => {
    const opened = await trapWindowOpen(page)
    await page.goto("/?lang=es")
    await page.locator("#inicio").getByRole("button", { name: /WhatsApp/i }).click()
    const urls = await opened()
    expect(urls.at(-1)).toMatch(/^https:\/\/wa\.me\/5491151448632\?text=.+/)
  })

  test("la página corta mantiene el contacto y la FAQ visibles", async ({ page }) => {
    await page.goto("/?lang=es")
    await expect(page.locator("#quien")).toBeVisible()
    await expect(page.locator("#faq")).toBeVisible()
    await expect(page.locator("#faq")).toContainText(/cancel/i)
  })
})

import { test as base, expect, type Page } from "@playwright/test"

/** Registra errores de la página y violaciones de la CSP; falla la prueba si aparecen. */
export const test = base.extend<{ guard: { errors: string[] } }>({
  guard: [
    async ({ page }, use) => {
      const errors: string[] = []
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`))
      page.on("console", (m) => {
        if (m.type() !== "error") return
        const t = m.text()
        // Recursos de terceros que el entorno de prueba puede no alcanzar (sin relación con el código).
        if (/Failed to load resource|net::ERR_|status of 4\d\d|status of 5\d\d/.test(t)) return
        errors.push(`console: ${t}`)
      })
      await page.addInitScript(() => {
        // @ts-expect-error marcador de prueba
        window.__csp = []
        document.addEventListener("securitypolicyviolation", (e) => {
          // @ts-expect-error marcador de prueba
          window.__csp.push(`${e.violatedDirective} ${e.blockedURI}`)
        })
      })
      await use({ errors })
      const csp = await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? []).catch(() => [])
      expect(csp, "violaciones de Content-Security-Policy").toEqual([])
      expect(errors, "errores en consola").toEqual([])
    },
    { auto: true },
  ],
})

export { expect }

/** Captura las URLs que el sitio intenta abrir en otra pestaña (WhatsApp, etc.). */
export async function trapWindowOpen(page: Page) {
  await page.addInitScript(() => {
    // @ts-expect-error marcador de prueba
    window.__opened = []
    window.open = ((url?: string | URL) => {
      // @ts-expect-error marcador de prueba
      window.__opened.push(String(url))
      return null
    }) as typeof window.open
  })
  return () => page.evaluate(() => (window as unknown as { __opened: string[] }).__opened)
}

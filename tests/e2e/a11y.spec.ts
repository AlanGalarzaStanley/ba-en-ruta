import AxeBuilder from "@axe-core/playwright"
import { test, expect } from "./fixtures"

const serious = (v: { impact?: string | null }) => v.impact === "critical" || v.impact === "serious"

test("accesibilidad: portada sin problemas graves", async ({ page }) => {
  // Sin animaciones: axe mide el contraste final, no un fundido a mitad de camino.
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/?lang=es")
  await page.evaluate(() => document.querySelectorAll(".ba-reveal").forEach((el) => el.classList.add("is-visible")))
  await page.waitForTimeout(1200)
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()
  const bad = r.violations.filter(serious)
  expect(bad.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([])
})

test("accesibilidad: simulador sin problemas graves", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/?recorrido=historica&parada=1&lang=es")
  await expect(page.getByRole("dialog")).toBeVisible()
  const r = await new AxeBuilder({ page }).include('[role="dialog"]').withTags(["wcag2a", "wcag2aa"]).analyze()
  const bad = r.violations.filter(serious)
  expect(bad.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([])
})

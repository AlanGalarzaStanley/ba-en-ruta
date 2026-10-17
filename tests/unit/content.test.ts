import { describe, expect, it } from "vitest"
import { copy } from "../../src/lib/ba-copy"
import { ITINERARIES, PLACES, RESTAURANTS } from "../../src/lib/ba-config"
import { GASTRO_PLACES } from "../../src/lib/gastronomy"
import { collectCommonsFiles } from "../../scripts/sync-commons.mjs"
import META from "../../src/lib/commons-meta.json"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

/** Todo el código fuente salvo los archivos de textos: sirve para saber qué claves se usan. */
function sourceText(dir = join(__dirname, "../../src")): string {
  let out = ""
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) out += sourceText(p)
    else if (/\.(ts|tsx)$/.test(n) && !/copy/.test(n)) out += readFileSync(p, "utf8")
  }
  return out
}

describe("traducciones ES / EN / PT-BR", () => {
  const es = Object.keys(copy.es)
  it("inglés y portugués tienen exactamente las mismas claves que español", () => {
    for (const lang of ["en", "pt"] as const) {
      const keys = new Set(Object.keys(copy[lang]))
      const missing = es.filter((k) => !keys.has(k))
      const extra = [...keys].filter((k) => !(k in copy.es))
      expect(missing, `faltan en ${lang}`).toEqual([])
      expect(extra, `sobran en ${lang}`).toEqual([])
    }
  })
  it("no hay textos vacíos en las claves que usa la interfaz", () => {
    const src = sourceText()
    for (const lang of ["es", "en", "pt"] as const) {
      const empty = Object.entries(copy[lang]).filter(
        ([k, v]) => typeof v === "string" && !v.trim() && src.includes(`"${k}"`),
      )
      expect(empty.map(([k]) => k), lang).toEqual([])
    }
  })
  it("todas las claves usadas por lugares e itinerarios existen", () => {
    const used = [
      ...PLACES.flatMap((p) => [p.nameKey, p.descKey]),
      ...ITINERARIES.flatMap((i) => [i.nameKey, i.descKey, i.durationKey]),
    ]
    for (const k of used) expect(copy.es, k).toHaveProperty(k)
  })
})

describe("datos de lugares, itinerarios y gastronomía", () => {
  const placeIds = new Set(PLACES.map((p) => p.id))
  it("ids únicos", () => {
    expect(placeIds.size).toBe(PLACES.length)
    expect(new Set(ITINERARIES.map((i) => i.id)).size).toBe(ITINERARIES.length)
    expect(new Set(GASTRO_PLACES.map((g) => g.id)).size).toBe(GASTRO_PLACES.length)
  })
  it("los itinerarios apuntan a lugares y restaurantes existentes", () => {
    const restIds = new Set(RESTAURANTS.map((r) => r.id))
    for (const i of ITINERARIES) {
      for (const p of i.placeIds) expect(placeIds.has(p), `${i.id} → ${p}`).toBe(true)
      for (const r of i.restaurantIds ?? []) expect(restIds.has(r), `${i.id} → ${r}`).toBe(true)
    }
  })
  it("los enlaces externos son https y los de Instagram son perfiles", () => {
    const urls: string[] = []
    for (const p of PLACES) urls.push(...([p.officialUrl, p.ticketsUrl, p.instagramUrl].filter(Boolean) as string[]))
    for (const g of GASTRO_PLACES) urls.push(...([g.url, g.instagramUrl].filter(Boolean) as string[]))
    for (const u of urls) expect(u, u).toMatch(/^https:\/\//)
    const ig = urls.filter((u) => u.includes("instagram.com"))
    for (const u of ig) expect(u, u).toMatch(/^https:\/\/www\.instagram\.com\/[A-Za-z0-9._]+\/?$/)
  })
  it("toda foto mostrada tiene crédito", () => {
    for (const p of PLACES) for (const ph of p.photos ?? []) expect(ph.credit, `${p.id} ${ph.file}`).toBeTruthy()
    for (const g of GASTRO_PLACES) if (g.image) expect(g.imageCredit, g.id).toBeTruthy()
  })
  it("cada foto de Commons referenciada está en commons-meta.json", () => {
    const meta = META as Record<string, unknown>
    const missing = collectCommonsFiles().filter((f) => !meta[f])
    expect(missing, "correr: node scripts/sync-commons.mjs").toEqual([])
  })
})

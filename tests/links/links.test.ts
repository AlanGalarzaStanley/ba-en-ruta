/**
 * Revisión de enlaces oficiales (red real). No corre en `npm test`; lo ejecuta
 * el workflow semanal `links.yml` o `npm run test:links`.
 * Instagram y YouTube se excluyen: bloquean pedidos automáticos aunque el enlace sea válido.
 */
import { describe, expect, it } from "vitest"
import { PLACES, RESTAURANTS } from "../../src/lib/ba-config"
import { GASTRO_PLACES } from "../../src/lib/gastronomy"

const urls = [
  ...new Set(
    [
      ...PLACES.flatMap((p) => [p.officialUrl, p.ticketsUrl]),
      ...RESTAURANTS.map((r) => r.url),
      ...GASTRO_PLACES.map((g) => g.url),
    ].filter((u): u is string => !!u && !/instagram\.com|youtube\.com/.test(u)),
  ),
].sort()

async function status(url: string): Promise<number | string> {
  for (let i = 0; i < 2; i++) {
    try {
      const r = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; ba-en-ruta-linkcheck/1.0; +https://ba-en-ruta.vercel.app)" },
      })
      return r.status
    } catch (e) {
      if (i === 1) return (e as Error).message
    }
  }
  return "?"
}

describe("enlaces oficiales", () => {
  it.each(urls)("%s responde", { timeout: 60_000 }, async (url) => {
    const s = await status(url)
    // 403/429: el sitio bloquea robots pero existe; se informa sin fallar.
    if (s === 403 || s === 429) return
    expect(s, url).toBeTypeOf("number")
    expect(s as number, url).toBeLessThan(400)
  })
})

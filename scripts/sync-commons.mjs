// Genera src/lib/commons-meta.json: ruta de hash y ancho original de cada foto de Wikimedia Commons
// referenciada en src/. Permite usar miniaturas directas (sin redirecciones) en tamaños estándar.
// Uso: node scripts/sync-commons.mjs   (requiere red; no corre en el build)
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { createHash } from "node:crypto"

const SRC = new URL("../src/", import.meta.url).pathname
const OUT = join(SRC, "lib/commons-meta.json")

export function collectCommonsFiles(dir = SRC) {
  const files = new Set()
  const walk = (d) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n)
      if (statSync(p).isDirectory()) walk(p)
      else if (/\.(ts|tsx)$/.test(n)) {
        const s = readFileSync(p, "utf8")
        for (const re of [
          /commons(?:Url)?\(\s*"([^"]+\.(?:jpe?g|png|webp|gif|tiff?))"/gi,
          /file:\s*"([^"]+\.(?:jpe?g|png|webp|gif|tiff?))"/gi,
          /Special:FilePath\/([^"?`$]+\.(?:jpe?g|png|webp|gif|tiff?))/gi,
        ]) for (const m of s.matchAll(re)) files.add(decodeURIComponent(m[1]).replace(/ /g, "_"))
      }
    }
  }
  walk(dir)
  return [...files].sort()
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = collectCommonsFiles()
  const meta = {}
  for (let i = 0; i < files.length; i += 40) {
    const chunk = files.slice(i, i + 40)
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=size&titles=" +
      encodeURIComponent(chunk.map((f) => "File:" + f).join("|"))
    const r = await fetch(url, { headers: { "User-Agent": "ba-en-ruta-build/1.0 (https://ba-en-ruta.vercel.app)" } })
    const j = await r.json()
    const norm = Object.fromEntries((j.query.normalized ?? []).map((n) => [n.to, n.from]))
    for (const pg of Object.values(j.query.pages)) {
      const name = (norm[pg.title] ?? pg.title).replace(/^File:/, "").replace(/ /g, "_")
      if (!pg.imageinfo) { console.warn("NO ENCONTRADO en Commons:", name); continue }
      const canonical = pg.title.replace(/^File:/, "").replace(/ /g, "_")
      const h = createHash("md5").update(canonical).digest("hex")
      meta[name] = { p: `${h[0]}/${h.slice(0, 2)}`, n: canonical, w: pg.imageinfo[0].width }
    }
  }
  writeFileSync(OUT, JSON.stringify(meta, null, 1) + "\n")
  console.log(`${Object.keys(meta).length}/${files.length} archivos -> ${OUT}`)
}

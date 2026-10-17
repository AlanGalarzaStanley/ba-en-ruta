/**
 * Optimización de imágenes sin servicios pagos.
 *
 * Los datos guardan las fotos de Wikimedia Commons como `Special:FilePath/<archivo>?width=N`
 * (fácil de leer y auditar). Esa URL hace dos redirecciones y además Wikimedia solo sirve
 * miniaturas en tamaños estándar: pedir 1600 px termina descargando 1920 px.
 *
 * Acá la convertimos en la URL directa de upload.wikimedia.org en el tamaño estándar
 * adecuado, usando `commons-meta.json` (hash + ancho original, generado por
 * `scripts/sync-commons.mjs`). Si un archivo no está en el mapa, se usa la URL original.
 */
import META from "./commons-meta.json"

type Meta = { p: string; n: string; w: number }
const COMMONS_META = META as Record<string, Meta>

/** Tamaños de miniatura que Wikimedia sirve de forma directa. */
export const COMMONS_BUCKETS = [250, 330, 500, 960, 1280, 1920] as const

const FILEPATH_RE = /^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\/([^?#]+)/

export function commonsFileFromUrl(url: string): string | null {
  const m = FILEPATH_RE.exec(url)
  if (!m) return null
  try {
    return decodeURIComponent(m[1]).replace(/ /g, "_")
  } catch {
    return null
  }
}

export function commonsMeta(file: string): Meta | undefined {
  return COMMONS_META[file.replace(/ /g, "_")]
}

/** URL directa de Commons para un ancho dado (o null si el archivo no está mapeado). */
export function commonsDirect(file: string, width: number): string | null {
  const m = commonsMeta(file)
  if (!m) return null
  const enc = encodeURIComponent(m.n)
  const bucket = COMMONS_BUCKETS.find((b) => b >= width) ?? COMMONS_BUCKETS[COMMONS_BUCKETS.length - 1]
  if (bucket >= m.w) return `https://upload.wikimedia.org/wikipedia/commons/${m.p}/${enc}`
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${m.p}/${enc}/${bucket}px-${enc}`
}

/** Devuelve la mejor URL para mostrar `url` a `width` px de ancho. */
export function optimizeImage(url: string | undefined, width: number): string | undefined {
  if (!url) return url
  const file = commonsFileFromUrl(url)
  if (file) return commonsDirect(file, width) ?? url
  if (url.startsWith("https://images.pexels.com/")) {
    try {
      const u = new URL(url)
      u.searchParams.set("w", String(width))
      u.searchParams.set("auto", "compress")
      return u.toString()
    } catch {
      return url
    }
  }
  return url
}

/** `srcset` para imágenes de ancho fluido. Vacío si la fuente no admite tamaños. */
export function imageSrcSet(url: string | undefined, widths: readonly number[] = [500, 960, 1280, 1920]): string | undefined {
  if (!url) return undefined
  const file = commonsFileFromUrl(url)
  const isPexels = url.startsWith("https://images.pexels.com/")
  if (!(file && commonsMeta(file)) && !isPexels) return undefined
  const seen = new Set<string>()
  const parts: string[] = []
  for (const w of widths) {
    const u = optimizeImage(url, w)
    if (!u || seen.has(u)) continue
    seen.add(u)
    const real = file ? Math.min(COMMONS_BUCKETS.find((b) => b >= w) ?? w, commonsMeta(file)!.w) : w
    parts.push(`${u} ${real}w`)
  }
  return parts.length > 1 ? parts.join(", ") : undefined
}

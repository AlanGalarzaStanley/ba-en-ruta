/**
 * Fotos del carrusel principal alojadas en el propio sitio (public/hero/*.webp).
 * Origen: Pexels (obelisco-pexels) y Wikimedia Commons (resto, mismo archivo y crédito que PLACE_PHOTOS).
 * Motivo: la portada no depende de terceros (sin cookies ajenas, caché propia, LCP más rápido).
 * Para regenerar: descargar la foto original, redimensionar a estos anchos y exportar WebP (calidad 72).
 */
export const HERO_LOCAL: Record<string, number[]> = {
  "bombonera": [640, 960, 1280, 1920],
  "caminito": [640, 960, 1280, 1920],
  "obelisco-colon": [640, 960, 1280, 1920],
  "obelisco-pexels": [640, 960, 1280, 1920],
  "palermo": [640, 960, 1280, 1600],
  "puerto-madero": [640, 960, 1280, 1920],
  "recoleta": [640, 960, 1280, 1920],
  "san-telmo-plaza": [640, 960, 1280, 1920],
  "tigre": [640, 960, 1280, 1920],
}

const base = import.meta.env.BASE_URL || "/"

export function heroLocal(slug: string): { src: string; srcSet: string } | null {
  const widths = HERO_LOCAL[slug]
  if (!widths) return null
  const url = (w: number) => `${base}hero/${slug}-${w}.webp`
  const mid = widths.find((w) => w >= 1280) ?? widths[widths.length - 1]
  return { src: url(mid), srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", ") }
}

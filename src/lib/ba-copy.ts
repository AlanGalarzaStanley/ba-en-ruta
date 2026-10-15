/**
 * Textos multiidioma BA en Ruta (ES / EN / PT-BR)
 */
import { copyEs } from "./copy-es"
import { copyEn } from "./copy-en"
import { copyPt } from "./copy-pt"

export type Lang = "es" | "en" | "pt"

export const copy = {
  es: copyEs,
  en: copyEn,
  pt: copyPt,
} as const

export type CopyKey = keyof typeof copyEs

export function t(lang: Lang, key: CopyKey): string {
  const table = copy[lang] as Record<CopyKey, string>
  return table[key] ?? copyEs[key] ?? key
}

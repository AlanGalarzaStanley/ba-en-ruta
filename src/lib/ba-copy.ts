/**
 * Textos multiidioma BA en Ruta (ES / EN / PT-BR)
 */
import { copyEs } from "./copy-es"
import { copyEn } from "./copy-en"
import { copyPt } from "./copy-pt"
import { guidesEs, guidesEn, guidesPt } from "./guides-copy"
import { experienceEs, experienceEn, experiencePt } from "./experience-copy"

export type Lang = "es" | "en" | "pt"

export const copy = {
  es: { ...copyEs, ...guidesEs, ...experienceEs },
  en: { ...copyEn, ...guidesEn, ...experienceEn },
  pt: { ...copyPt, ...guidesPt, ...experiencePt },
} as const

export type CopyKey = keyof typeof copy.es

export function t(lang: Lang, key: CopyKey): string {
  const table = copy[lang] as Record<string, string>
  return table[key] ?? (copy.es as Record<string, string>)[key] ?? key
}

/**
 * Textos multiidioma BA en Ruta (ES / EN / PT-BR)
 */
import { copyEs } from "./copy-es"
import { copyEn } from "./copy-en"
import { copyPt } from "./copy-pt"
import { guidesEs, guidesEn, guidesPt } from "./guides-copy"
import { experienceEs, experienceEn, experiencePt } from "./experience-copy"
import { moodEs, moodEn, moodPt } from "./mood-copy"
import { immersiveEs, immersiveEn, immersivePt } from "./immersive-copy"
import { packagesEs, packagesEn, packagesPt } from "./packages-copy"

export type Lang = "es" | "en" | "pt"

export const copy = {
  es: { ...copyEs, ...guidesEs, ...experienceEs, ...moodEs, ...immersiveEs, ...packagesEs },
  en: { ...copyEn, ...guidesEn, ...experienceEn, ...moodEn, ...immersiveEn, ...packagesEn },
  pt: { ...copyPt, ...guidesPt, ...experiencePt, ...moodPt, ...immersivePt, ...packagesPt },
} as const

export type CopyKey = keyof typeof copy.es

export function t(lang: Lang, key: CopyKey): string {
  const table = copy[lang] as Record<string, string>
  return table[key] ?? (copy.es as Record<string, string>)[key] ?? key
}

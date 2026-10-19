/**
 * Catálogo comercial BA en Ruta.
 * Precios: TOUR-4 = USD 50 · TOUR-8 = USD 100 (dueño 2026-10-18).
 */
import type { ServiceId } from "./ba-config"

export type PackageId =
  | "tr"
  | "tour4"
  | "tour8"
  | "horas"
  | "hist"
  | "clas"
  | "gast"
  | "fut"
  | "tig"

export interface PackageDef {
  id: PackageId
  service: ServiceId
  titleKey: string
  descKey: string
  durationKey: string
  priceKey: string
  idealKey: string
  includeKeys: string[]
  excludeKeys: string[]
  group: "core" | "theme"
  code: string
}

export const PACKAGES: PackageDef[] = [
  {
    id: "tr",
    code: "TR",
    service: "airport",
    group: "core",
    titleKey: "packTrTitle",
    descKey: "packTrDesc",
    durationKey: "packTrDur",
    priceKey: "packTrPrice",
    idealKey: "packTrIdeal",
    includeKeys: ["packTrInc1", "packTrInc2", "packTrInc3"],
    excludeKeys: ["packTrExc1", "packTrExc2"],
  },
  {
    id: "tour4",
    code: "TOUR-4",
    service: "tours",
    group: "core",
    titleKey: "packTour4Title",
    descKey: "packTour4Desc",
    durationKey: "packTour4Dur",
    priceKey: "packTour4Price",
    idealKey: "packTour4Ideal",
    includeKeys: ["packTour4Inc1", "packTour4Inc2", "packTour4Inc3"],
    excludeKeys: ["packTour4Exc1", "packTour4Exc2"],
  },
  {
    id: "tour8",
    code: "TOUR-8",
    service: "tours",
    group: "core",
    titleKey: "packTour8Title",
    descKey: "packTour8Desc",
    durationKey: "packTour8Dur",
    priceKey: "packTour8Price",
    idealKey: "packTour8Ideal",
    includeKeys: ["packTour8Inc1", "packTour8Inc2", "packTour8Inc3"],
    excludeKeys: ["packTour8Exc1", "packTour8Exc2"],
  },
  {
    id: "horas",
    code: "HORAS",
    service: "private",
    group: "core",
    titleKey: "packHorasTitle",
    descKey: "packHorasDesc",
    durationKey: "packHorasDur",
    priceKey: "packHorasPrice",
    idealKey: "packHorasIdeal",
    includeKeys: ["packHorasInc1", "packHorasInc2", "packHorasInc3"],
    excludeKeys: ["packHorasExc1", "packHorasExc2"],
  },
  {
    id: "hist",
    code: "IT-HIST",
    service: "tours",
    group: "theme",
    titleKey: "packHistTitle",
    descKey: "packHistDesc",
    durationKey: "packHistDur",
    priceKey: "packHistPrice",
    idealKey: "packHistIdeal",
    includeKeys: ["packThemeInc1", "packThemeInc2"],
    excludeKeys: ["packThemeExc1", "packThemeExc2"],
  },
  {
    id: "clas",
    code: "IT-CLAS",
    service: "tours",
    group: "theme",
    titleKey: "packClasTitle",
    descKey: "packClasDesc",
    durationKey: "packClasDur",
    priceKey: "packClasPrice",
    idealKey: "packClasIdeal",
    includeKeys: ["packThemeInc1", "packThemeInc2"],
    excludeKeys: ["packThemeExc1", "packThemeExc2"],
  },
  {
    id: "gast",
    code: "IT-GAST",
    service: "tours",
    group: "theme",
    titleKey: "packGastTitle",
    descKey: "packGastDesc",
    durationKey: "packGastDur",
    priceKey: "packGastPrice",
    idealKey: "packGastIdeal",
    includeKeys: ["packThemeInc1", "packThemeInc2"],
    excludeKeys: ["packThemeExc1", "packThemeExc2"],
  },
  {
    id: "fut",
    code: "IT-FUT",
    service: "tours",
    group: "theme",
    titleKey: "packFutTitle",
    descKey: "packFutDesc",
    durationKey: "packFutDur",
    priceKey: "packFutPrice",
    idealKey: "packFutIdeal",
    includeKeys: ["packThemeInc1", "packThemeInc2"],
    excludeKeys: ["packThemeExc1", "packThemeExc2"],
  },
  {
    id: "tig",
    code: "IT-TIG",
    service: "tours",
    group: "theme",
    titleKey: "packTigTitle",
    descKey: "packTigDesc",
    durationKey: "packTigDur",
    priceKey: "packTigPrice",
    idealKey: "packTigIdeal",
    includeKeys: ["packThemeInc1", "packThemeInc2"],
    excludeKeys: ["packThemeExc1", "packThemeExc2"],
  },
]

export function getPackage(id: PackageId): PackageDef | undefined {
  return PACKAGES.find((p) => p.id === id)
}

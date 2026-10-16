/**
 * Guided interactive experiences for BA en Ruta.
 * Pilot: Casco Histórico. Scaffold ready for the eight imperdibles.
 */

import type { PlaceId } from "./ba-config"

export type ExperienceId = "casco-historico" | PlaceId

export interface ExperienceStop {
  id: string
  /** Translation keys in experience-copy */
  titleKey: string
  bodyKey: string
  lookForKey?: string
  tipKey?: string
  lat: number
  lng: number
  /** Optional image (Wikimedia or existing) */
  image?: string
  /** OpenStreetMap / Google Maps external link helper */
  mapLabel?: string
}

export interface GuidedExperience {
  id: ExperienceId
  /** Link to existing Place when this experience expands an imperdible */
  placeId?: PlaceId
  nameKey: string
  subtitleKey: string
  introKey: string
  durationKey: string
  /** Estimated walking distance note (not a guarantee) */
  distanceNoteKey?: string
  serviceModelKey: string
  limitsKey: string
  image: string
  stops: ExperienceStop[]
  relatedPlaceIds?: PlaceId[]
  /** Featured / pilot flag for UI priority */
  featured?: boolean
}

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1280`

/**
 * Casco Histórico: orígenes de Buenos Aires.
 * Sequence validated for a coherent pedestrian route ending at Café Tortoni.
 * Palacio Libertad omitted to avoid an unnecessary detour.
 * Durations/distances are orientative, not guarantees.
 */
export const EXPERIENCES: GuidedExperience[] = [
  {
    id: "casco-historico",
    placeId: "san-telmo-plaza",
    nameKey: "expCascoName",
    subtitleKey: "expCascoSubtitle",
    introKey: "expCascoIntro",
    durationKey: "expCascoDuration",
    distanceNoteKey: "expCascoDistance",
    serviceModelKey: "expCascoService",
    limitsKey: "expCascoLimits",
    image: commons("Casa_Rosada_2024.jpg"),
    featured: true,
    relatedPlaceIds: ["caminito", "obelisco-colon"],
    stops: [
      {
        id: "plaza-mayo",
        titleKey: "stopPlazaTitle",
        bodyKey: "stopPlazaBody",
        lookForKey: "stopPlazaLook",
        tipKey: "stopPlazaTip",
        lat: -34.6083,
        lng: -58.3712,
        image: commons("Plaza_de_Mayo_Buenos_Aires.jpg"),
        mapLabel: "Plaza de Mayo",
      },
      {
        id: "casa-rosada",
        titleKey: "stopRosadaTitle",
        bodyKey: "stopRosadaBody",
        lookForKey: "stopRosadaLook",
        tipKey: "stopRosadaTip",
        lat: -34.6081,
        lng: -58.3704,
        image: commons("Casa_Rosada_2024.jpg"),
        mapLabel: "Casa Rosada",
      },
      {
        id: "catedral",
        titleKey: "stopCatedralTitle",
        bodyKey: "stopCatedralBody",
        lookForKey: "stopCatedralLook",
        tipKey: "stopCatedralTip",
        lat: -34.6075,
        lng: -58.3733,
        image: commons("Catedral_Metropolitana_de_Buenos_Aires.jpg"),
        mapLabel: "Catedral Metropolitana",
      },
      {
        id: "cabildo",
        titleKey: "stopCabildoTitle",
        bodyKey: "stopCabildoBody",
        lookForKey: "stopCabildoLook",
        tipKey: "stopCabildoTip",
        lat: -34.6089,
        lng: -58.3736,
        image: commons("Cabildo_de_Buenos_Aires.jpg"),
        mapLabel: "Cabildo",
      },
      {
        id: "diagonal",
        titleKey: "stopDiagonalTitle",
        bodyKey: "stopDiagonalBody",
        lookForKey: "stopDiagonalLook",
        tipKey: "stopDiagonalTip",
        lat: -34.6058,
        lng: -58.3775,
        mapLabel: "Diagonal Norte",
      },
      {
        id: "tortoni",
        titleKey: "stopTortoniTitle",
        bodyKey: "stopTortoniBody",
        lookForKey: "stopTortoniLook",
        tipKey: "stopTortoniTip",
        lat: -34.6085,
        lng: -58.3783,
        image: commons("Cafe_Tortoni_Buenos_Aires.jpg"),
        mapLabel: "Café Tortoni",
      },
    ],
  },
]

export function getExperience(id: ExperienceId): GuidedExperience | undefined {
  return EXPERIENCES.find((e) => e.id === id)
}

export function getExperienceForPlace(placeId: PlaceId): GuidedExperience | undefined {
  return EXPERIENCES.find((e) => e.placeId === placeId)
}

export function externalMapUrl(lat: number, lng: number, label?: string): string {
  const q = label ? encodeURIComponent(label) : `${lat},${lng}`
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`
}

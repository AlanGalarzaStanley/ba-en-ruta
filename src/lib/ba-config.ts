/**
 * Configuración central de BA en Ruta
 * - WhatsApp: solo dígitos, sin + ni espacios
 * - Precios: no publicar tarifas inventadas
 */

export const WHATSAPP_NUMBER = "5491151448632"

export type ServiceId = "airport" | "private" | "tours" | "general"

export const SERVICES: { id: ServiceId; key: string }[] = [
  { id: "airport", key: "serviceAirport" },
  { id: "private", key: "servicePrivate" },
  { id: "tours", key: "serviceTours" },
  { id: "general", key: "serviceGeneral" },
]

export type InterestId =
  | "city"
  | "football"
  | "folklore"
  | "gastronomy"
  | "countryside"

export const INTERESTS: { id: InterestId; key: string }[] = [
  { id: "city", key: "interestCity" },
  { id: "football", key: "interestFootball" },
  { id: "folklore", key: "interestFolklore" },
  { id: "gastronomy", key: "interestGastronomy" },
  { id: "countryside", key: "interestCountryside" },
]

export type PlaceId =
  | "obelisco"
  | "recoleta"
  | "san-telmo"
  | "caminito"
  | "teatro-colon"
  | "puerto-madero"
  | "palermo"
  | "tigre"

export interface Place {
  id: PlaceId
  nameKey: string
  descKey: string
  durationKey?: string
  image?: string
  youtube?: {
    es?: string
    en?: string
    pt?: string
  }
}

/** Imperdibles configurados (8 lugares). URLs de video solo si son reales. */
export const PLACES: Place[] = [
  {
    id: "obelisco",
    nameKey: "placeObelisco",
    descKey: "placeObeliscoDesc",
    durationKey: "duration2h",
  },
  {
    id: "recoleta",
    nameKey: "placeRecoleta",
    descKey: "placeRecoletaDesc",
    durationKey: "duration3h",
  },
  {
    id: "san-telmo",
    nameKey: "placeSanTelmo",
    descKey: "placeSanTelmoDesc",
    durationKey: "duration3h",
  },
  {
    id: "caminito",
    nameKey: "placeCaminito",
    descKey: "placeCaminitoDesc",
    durationKey: "duration2h",
  },
  {
    id: "teatro-colon",
    nameKey: "placeColon",
    descKey: "placeColonDesc",
    durationKey: "duration2h",
  },
  {
    id: "puerto-madero",
    nameKey: "placeMadero",
    descKey: "placeMaderoDesc",
    durationKey: "duration2h",
  },
  {
    id: "palermo",
    nameKey: "placePalermo",
    descKey: "placePalermoDesc",
    durationKey: "duration3h",
  },
  {
    id: "tigre",
    nameKey: "placeTigre",
    descKey: "placeTigreDesc",
    durationKey: "durationHalf",
  },
]

export const YOUTUBE_CHANNEL = "https://www.youtube.com/user/visitarg"

export const CONTACT_EMAIL = "galarza.alan.g@gmail.com"

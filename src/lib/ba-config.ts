/**
 * Configuración central de BA en Ruta
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
  /** Cuando tengas los links: youtube.es / youtube.en / youtube.pt */
  youtube?: {
    es?: string
    en?: string
    pt?: string
  }
}

/** Fotos: Pexels/Unsplash de Buenos Aires (licencia libre comercial). */
export const PLACES: Place[] = [
  {
    id: "obelisco",
    nameKey: "placeObelisco",
    descKey: "placeObeliscoDesc",
    durationKey: "duration2h",
    image: "https://images.pexels.com/photos/22690635/pexels-photo-22690635.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "recoleta",
    nameKey: "placeRecoleta",
    descKey: "placeRecoletaDesc",
    durationKey: "duration3h",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "san-telmo",
    nameKey: "placeSanTelmo",
    descKey: "placeSanTelmoDesc",
    durationKey: "duration3h",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "caminito",
    nameKey: "placeCaminito",
    descKey: "placeCaminitoDesc",
    durationKey: "duration2h",
    image: "https://images.unsplash.com/photo-1612294037637-ec328d0e51a6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "teatro-colon",
    nameKey: "placeColon",
    descKey: "placeColonDesc",
    durationKey: "duration2h",
    image: "https://images.unsplash.com/photo-1555881403-646f3630e4e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "puerto-madero",
    nameKey: "placeMadero",
    descKey: "placeMaderoDesc",
    durationKey: "duration2h",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "palermo",
    nameKey: "placePalermo",
    descKey: "placePalermoDesc",
    durationKey: "duration3h",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tigre",
    nameKey: "placeTigre",
    descKey: "placeTigreDesc",
    durationKey: "durationHalf",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
]

export const HERO_IMAGE =
  "https://images.pexels.com/photos/22690635/pexels-photo-22690635.jpeg?auto=compress&cs=tinysrgb&w=1920"

export const EXP_IMAGES = {
  city: "https://images.unsplash.com/photo-1612294037637-ec328d0e51a6?auto=format&fit=crop&w=900&q=80",
  football: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80",
  folklore: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80",
  gastro: "https://images.unsplash.com/photo-1555935062-eca2db5e2c60?auto=format&fit=crop&w=900&q=80",
} as const

export const YOUTUBE_CHANNEL = "https://www.youtube.com/user/visitarg"

export const CONTACT_EMAIL = "galarza.alan.g@gmail.com"

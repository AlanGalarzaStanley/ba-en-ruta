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

/** Tipos de experiencia para consulta rápida por WhatsApp */
export type ExperienceType = "walk" | "private" | "photo" | "general"

export const EXPERIENCE_TYPES: { id: ExperienceType; key: string }[] = [
  { id: "walk", key: "expTypeWalk" },
  { id: "private", key: "expTypePrivate" },
  { id: "photo", key: "expTypePhoto" },
  { id: "general", key: "expTypeGeneral" },
]

export type PlaceId =
  | "caminito"
  | "bombonera"
  | "san-telmo-plaza"
  | "recoleta"
  | "palermo"
  | "puerto-madero"
  | "obelisco-colon"
  | "tigre"

export interface Place {
  id: PlaceId
  nameKey: string
  descKey: string
  durationKey?: string
  image?: string
  imageAltKey?: string
  attribution?: string
  youtube?: {
    es?: string
    en?: string
    pt?: string
  }
  lat: number
  lng: number
  historyKey: string
  tipKey: string
  logisticsKey: string
  nearbyKey: string
}

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1280`

export const PLACES: Place[] = [
  {
    id: "caminito",
    nameKey: "placeCaminito",
    descKey: "placeCaminitoDesc",
    durationKey: "duration2h",
    image: commons("Buenos_Aires_Caminito_4.jpg"),
    imageAltKey: "placeCaminitoAlt",
    attribution: "Andrzej Otrębski / CC BY-SA 4.0",
    lat: -34.6345,
    lng: -58.363,
    historyKey: "guideCaminitoHistory",
    tipKey: "guideCaminitoTip",
    logisticsKey: "guideCaminitoLogistics",
    nearbyKey: "guideCaminitoNearby",
    youtube: {
      es: "https://www.youtube.com/watch?v=7PWpMvnbQXY",
      en: "https://www.youtube.com/watch?v=vTzI97Hm6Rs",
      pt: "https://www.youtube.com/watch?v=t00XHCE4v8E",
    },
  },
  {
    id: "bombonera",
    nameKey: "placeBombonera",
    descKey: "placeBomboneraDesc",
    durationKey: "duration2h",
    image: commons("Bombonera_Boca_Juniors.JPG"),
    imageAltKey: "placeBomboneraAlt",
    attribution: "Massimo Finizio / CC BY-SA 2.0 IT",
    lat: -34.6355,
    lng: -58.3647,
    historyKey: "guideBomboneraHistory",
    tipKey: "guideBomboneraTip",
    logisticsKey: "guideBomboneraLogistics",
    nearbyKey: "guideBomboneraNearby",
    youtube: {
      es: "https://www.youtube.com/watch?v=nabRYZnDh_0",
      en: "https://www.youtube.com/watch?v=X2IfbY-YIk0",
      pt: "https://www.youtube.com/watch?v=nabRYZnDh_0",
    },
  },
  {
    id: "san-telmo-plaza",
    nameKey: "placeSanTelmoPlaza",
    descKey: "placeSanTelmoPlazaDesc",
    durationKey: "duration3h",
    image: commons("Casa_Rosada_2024.jpg"),
    imageAltKey: "placeSanTelmoPlazaAlt",
    attribution: "Casa Rosada / CC BY 2.5 AR",
    lat: -34.6083,
    lng: -58.3712,
    historyKey: "guideSanTelmoHistory",
    tipKey: "guideSanTelmoTip",
    logisticsKey: "guideSanTelmoLogistics",
    nearbyKey: "guideSanTelmoNearby",
    youtube: {
      es: "https://www.youtube.com/watch?v=oFif5l3DDjU",
      en: "https://www.youtube.com/watch?v=t4m8Di2x09A",
      pt: "https://www.youtube.com/watch?v=30_pv30Sva8",
    },
  },
  {
    id: "recoleta",
    nameKey: "placeRecoleta",
    descKey: "placeRecoletaDesc",
    durationKey: "duration3h",
    image: commons("Recoleta_Cemetery,_Buenos_Aires,_Argentina.jpg"),
    imageAltKey: "placeRecoletaAlt",
    attribution: "Wikimedia Commons",
    lat: -34.5875,
    lng: -58.393,
    historyKey: "guideRecoletaHistory",
    tipKey: "guideRecoletaTip",
    logisticsKey: "guideRecoletaLogistics",
    nearbyKey: "guideRecoletaNearby",
    youtube: {
      es: "https://www.youtube.com/watch?v=F7-ye591xvU",
      en: "https://www.youtube.com/watch?v=EJvI77M_r58",
      pt: "https://www.youtube.com/watch?v=EJvI77M_r58",
    },
  },
  {
    id: "palermo",
    nameKey: "placePalermo",
    descKey: "placePalermoDesc",
    durationKey: "duration3h",
    image: commons("El_Rosedal.jpg"),
    imageAltKey: "placePalermoAlt",
    attribution: "Wikimedia Commons",
    lat: -34.5703,
    lng: -58.4219,
    historyKey: "guidePalermoHistory",
    tipKey: "guidePalermoTip",
    logisticsKey: "guidePalermoLogistics",
    nearbyKey: "guidePalermoNearby",
    youtube: {
      es: "https://www.youtube.com/watch?v=jJGO3Y-bh3w",
      en: "https://www.youtube.com/watch?v=pvx0ThxFsRA",
      pt: "https://www.youtube.com/watch?v=Zs238FXKuTw",
    },
  },
  {
    id: "puerto-madero",
    nameKey: "placeMadero",
    descKey: "placeMaderoDesc",
    durationKey: "duration2h",
    image: commons("2011.10.17.151426_Puente_de_la_Mujer_Puerto_Madero_Buenos_Aires.jpg"),
    imageAltKey: "placeMaderoAlt",
    attribution: "Wikimedia Commons",
    lat: -34.608,
    lng: -58.3615,
    historyKey: "guideMaderoHistory",
    tipKey: "guideMaderoTip",
    logisticsKey: "guideMaderoLogistics",
    nearbyKey: "guideMaderoNearby",
    youtube: {
      es: "https://www.youtube.com/watch?v=vBRRdV0965A",
      en: "https://www.youtube.com/watch?v=Z7oweo9DlAQ",
      pt: "https://www.youtube.com/watch?v=PUmCdZeGMW4",
    },
  },
  {
    id: "obelisco-colon",
    nameKey: "placeObeliscoColon",
    descKey: "placeObeliscoColonDesc",
    durationKey: "duration3h",
    image: commons("Obelisco_Buenos_Aires.jpg"),
    imageAltKey: "placeObeliscoColonAlt",
    attribution: "Wikimedia Commons",
    lat: -34.6037,
    lng: -58.3816,
    historyKey: "guideObeliscoHistory",
    tipKey: "guideObeliscoTip",
    logisticsKey: "guideObeliscoLogistics",
    nearbyKey: "guideObeliscoNearby",
    youtube: {
      es: "https://www.youtube.com/watch?v=mhlr8Kc-skE",
      en: "https://www.youtube.com/watch?v=scu_tWHsshs",
      pt: "https://www.youtube.com/watch?v=cXYJ44RnJg8",
    },
  },
  {
    id: "tigre",
    nameKey: "placeTigre",
    descKey: "placeTigreDesc",
    durationKey: "durationHalf",
    image: commons("El_maravilloso_Delta_en_Tigre.jpg"),
    imageAltKey: "placeTigreAlt",
    attribution: "Tigre Municipio / CC BY 2.0",
    lat: -34.426,
    lng: -58.5796,
    historyKey: "guideTigreHistory",
    tipKey: "guideTigreTip",
    logisticsKey: "guideTigreLogistics",
    nearbyKey: "guideTigreNearby",
    youtube: {
      es: "https://www.youtube.com/watch?v=KkXUP9sFieU",
      en: "https://www.youtube.com/watch?v=C20NuCd0Tqg",
      pt: "https://www.youtube.com/watch?v=C20NuCd0Tqg",
    },
  },
]

export const HERO_IMAGE =
  "https://images.pexels.com/photos/22690635/pexels-photo-22690635.jpeg?auto=compress&cs=tinysrgb&w=1920"

export const EXP_IMAGES = {
  city: commons("Buenos_Aires_Caminito_4.jpg"),
  football: commons("Bombonera_Boca_Juniors.JPG"),
  folklore: commons("Buenos_Aires_Caminito_4.jpg"),
  gastro: "https://images.unsplash.com/photo-1555935062-eca2db5e2c60?auto=format&fit=crop&w=900&q=80",
} as const

export const YOUTUBE_CHANNEL = "https://www.youtube.com/user/visitarg"

export const CONTACT_EMAIL = "galarza.alan.g@gmail.com"

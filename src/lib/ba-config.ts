/**
 * Configuración central de BA en Ruta
 * Imágenes: preferimos fuentes estables (Pexels/Unsplash) para evitar 429 de Wikimedia.
 */

export const WHATSAPP_NUMBER = "5491151448632"
export const SITE_URL = "https://ba-en-ruta.vercel.app"

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

export type RestaurantId = "tortoni" | "preferido" | "cabrera" | "puerto-frutos"

export type ItineraryId = "historica" | "clasica" | "gastronomica" | "futbolera" | "tigre-delta"

/** Pexels/Unsplash: estables y aptas para web. */
const img = (url: string) => url

export interface Place {
  id: PlaceId
  nameKey: string
  descKey: string
  durationKey?: string
  image?: string
  imageAltKey?: string
  attribution?: string
  gallery?: { src: string; altKey: string; attribution?: string }[]
  youtube?: { es?: string; en?: string; pt?: string }
  lat: number
  lng: number
  historyKey: string
  tipKey: string
  logisticsKey: string
  nearbyKey: string
  seeDoKeys?: string[]
  detailKey?: string
}

export interface Restaurant {
  id: RestaurantId
  name: string
  categoryKey: string
  address: string
  descKey: string
  whyKey: string
  placeIds: PlaceId[]
  itineraryIds?: ItineraryId[]
  url?: string
  image?: string
}

export interface Itinerary {
  id: ItineraryId
  nameKey: string
  descKey: string
  durationKey: string
  placeIds: PlaceId[]
  restaurantIds?: RestaurantId[]
  image: string
}

export const PLACES: Place[] = [
  {
    id: "caminito",
    nameKey: "placeCaminito",
    descKey: "placeCaminitoDesc",
    durationKey: "duration2h",
    image: img("https://images.pexels.com/photos/1842332/pexels-photo-1842332.jpeg?auto=compress&cs=tinysrgb&w=1280"),
    imageAltKey: "placeCaminitoAlt",
    attribution: "Pexels",
    lat: -34.6345,
    lng: -58.363,
    historyKey: "guideCaminitoHistory",
    tipKey: "guideCaminitoTip",
    logisticsKey: "guideCaminitoLogistics",
    nearbyKey: "guideCaminitoNearby",
    seeDoKeys: ["seeCaminito1", "seeCaminito2", "seeCaminito3", "seeCaminito4"],
    detailKey: "detailCaminito",
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
    image: img("https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1280"),
    imageAltKey: "placeBomboneraAlt",
    attribution: "Pexels",
    lat: -34.6355,
    lng: -58.3647,
    historyKey: "guideBomboneraHistory",
    tipKey: "guideBomboneraTip",
    logisticsKey: "guideBomboneraLogistics",
    nearbyKey: "guideBomboneraNearby",
    seeDoKeys: ["seeBombonera1", "seeBombonera2", "seeBombonera3"],
    detailKey: "detailBombonera",
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
    image: img("https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1280"),
    imageAltKey: "placeSanTelmoPlazaAlt",
    attribution: "Pexels",
    lat: -34.6083,
    lng: -58.3712,
    historyKey: "guideSanTelmoHistory",
    tipKey: "guideSanTelmoTip",
    logisticsKey: "guideSanTelmoLogistics",
    nearbyKey: "guideSanTelmoNearby",
    seeDoKeys: ["seeSanTelmo1", "seeSanTelmo2", "seeSanTelmo3", "seeSanTelmo4"],
    detailKey: "detailSanTelmo",
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
    image: img("https://images.pexels.com/photos/163864/buenos-aires-argentina-cemetery-recoleta-163864.jpeg?auto=compress&cs=tinysrgb&w=1280"),
    imageAltKey: "placeRecoletaAlt",
    attribution: "Pexels",
    lat: -34.5875,
    lng: -58.393,
    historyKey: "guideRecoletaHistory",
    tipKey: "guideRecoletaTip",
    logisticsKey: "guideRecoletaLogistics",
    nearbyKey: "guideRecoletaNearby",
    seeDoKeys: ["seeRecoleta1", "seeRecoleta2", "seeRecoleta3"],
    detailKey: "detailRecoleta",
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
    image: img("https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1280"),
    imageAltKey: "placePalermoAlt",
    attribution: "Pexels",
    lat: -34.5703,
    lng: -58.4219,
    historyKey: "guidePalermoHistory",
    tipKey: "guidePalermoTip",
    logisticsKey: "guidePalermoLogistics",
    nearbyKey: "guidePalermoNearby",
    seeDoKeys: ["seePalermo1", "seePalermo2", "seePalermo3", "seePalermo4"],
    detailKey: "detailPalermo",
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
    image: img("https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1280"),
    imageAltKey: "placeMaderoAlt",
    attribution: "Pexels",
    lat: -34.608,
    lng: -58.3615,
    historyKey: "guideMaderoHistory",
    tipKey: "guideMaderoTip",
    logisticsKey: "guideMaderoLogistics",
    nearbyKey: "guideMaderoNearby",
    seeDoKeys: ["seeMadero1", "seeMadero2", "seeMadero3"],
    detailKey: "detailMadero",
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
    image: img("https://images.pexels.com/photos/22690635/pexels-photo-22690635.jpeg?auto=compress&cs=tinysrgb&w=1280"),
    imageAltKey: "placeObeliscoColonAlt",
    attribution: "Pexels",
    lat: -34.6037,
    lng: -58.3816,
    historyKey: "guideObeliscoHistory",
    tipKey: "guideObeliscoTip",
    logisticsKey: "guideObeliscoLogistics",
    nearbyKey: "guideObeliscoNearby",
    seeDoKeys: ["seeObelisco1", "seeObelisco2", "seeObelisco3"],
    detailKey: "detailObelisco",
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
    image: img("https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1280"),
    imageAltKey: "placeTigreAlt",
    attribution: "Pexels",
    lat: -34.426,
    lng: -58.5796,
    historyKey: "guideTigreHistory",
    tipKey: "guideTigreTip",
    logisticsKey: "guideTigreLogistics",
    nearbyKey: "guideTigreNearby",
    seeDoKeys: ["seeTigre1", "seeTigre2", "seeTigre3", "seeTigre4"],
    detailKey: "detailTigre",
    youtube: {
      es: "https://www.youtube.com/watch?v=KkXUP9sFieU",
      en: "https://www.youtube.com/watch?v=C20NuCd0Tqg",
      pt: "https://www.youtube.com/watch?v=C20NuCd0Tqg",
    },
  },
]

export const RESTAURANTS: Restaurant[] = [
  {
    id: "tortoni",
    name: "Café Tortoni",
    categoryKey: "restCatCafe",
    address: "Av. de Mayo 825, Monserrat, CABA",
    descKey: "restTortoniDesc",
    whyKey: "restTortoniWhy",
    placeIds: ["san-telmo-plaza", "obelisco-colon"],
    itineraryIds: ["historica", "clasica", "gastronomica"],
    url: "https://www.cafetortoni.com.ar/",
    image: img("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"),
  },
  {
    id: "preferido",
    name: "El Preferido de Palermo",
    categoryKey: "restCatClassic",
    address: "Jorge Luis Borges 2108, Palermo, CABA",
    descKey: "restPreferidoDesc",
    whyKey: "restPreferidoWhy",
    placeIds: ["palermo"],
    itineraryIds: ["clasica", "gastronomica"],
    url: "https://elpreferidodepalermo.com.ar/",
    image: img("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"),
  },
  {
    id: "cabrera",
    name: "La Cabrera",
    categoryKey: "restCatParrilla",
    address: "José Antonio Cabrera 5099, Palermo, CABA",
    descKey: "restCabreraDesc",
    whyKey: "restCabreraWhy",
    placeIds: ["palermo"],
    itineraryIds: ["gastronomica", "clasica"],
    url: "https://www.parrillalacabrera.com.ar/",
    image: img("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"),
  },
  {
    id: "puerto-frutos",
    name: "Puerto de Frutos",
    categoryKey: "restCatMarket",
    address: "Sarmiento y Río Luján, Tigre",
    descKey: "restFrutosDesc",
    whyKey: "restFrutosWhy",
    placeIds: ["tigre"],
    itineraryIds: ["tigre-delta"],
    image: img("https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80"),
  },
]

export const ITINERARIES: Itinerary[] = [
  {
    id: "historica",
    nameKey: "itinHistoricaName",
    descKey: "itinHistoricaDesc",
    durationKey: "itinHistoricaDur",
    placeIds: ["san-telmo-plaza", "caminito", "bombonera"],
    restaurantIds: ["tortoni"],
    image: PLACES[2].image!,
  },
  {
    id: "clasica",
    nameKey: "itinClasicaName",
    descKey: "itinClasicaDesc",
    durationKey: "itinClasicaDur",
    placeIds: ["obelisco-colon", "recoleta", "palermo"],
    restaurantIds: ["preferido"],
    image: PLACES[6].image!,
  },
  {
    id: "gastronomica",
    nameKey: "itinGastroName",
    descKey: "itinGastroDesc",
    durationKey: "itinGastroDur",
    placeIds: ["san-telmo-plaza", "palermo"],
    restaurantIds: ["tortoni", "preferido", "cabrera"],
    image: img("https://images.unsplash.com/photo-1555935062-eca2db5e2c60?auto=format&fit=crop&w=900&q=80"),
  },
  {
    id: "futbolera",
    nameKey: "itinFutbolName",
    descKey: "itinFutbolDesc",
    durationKey: "itinFutbolDur",
    placeIds: ["caminito", "bombonera"],
    image: PLACES[1].image!,
  },
  {
    id: "tigre-delta",
    nameKey: "itinTigreName",
    descKey: "itinTigreDesc",
    durationKey: "itinTigreDur",
    placeIds: ["tigre"],
    restaurantIds: ["puerto-frutos"],
    image: PLACES[7].image!,
  },
]

export const HERO_IMAGE =
  "https://images.pexels.com/photos/22690635/pexels-photo-22690635.jpeg?auto=compress&cs=tinysrgb&w=1920"

export const EXP_IMAGES = {
  city: PLACES[0].image!,
  football: PLACES[1].image!,
  folklore: PLACES[0].image!,
  gastro: "https://images.unsplash.com/photo-1555935062-eca2db5e2c60?auto=format&fit=crop&w=900&q=80",
} as const

export const YOUTUBE_CHANNEL = "https://www.youtube.com/user/visitarg"
export const CONTACT_EMAIL = "galarza.alan.g@gmail.com"

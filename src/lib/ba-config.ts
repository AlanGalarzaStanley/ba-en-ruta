/**
 * Configuración central de BA en Ruta
 * Official links verified 2026-10-17
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

export type InterestId = "city" | "football" | "folklore" | "gastronomy" | "countryside"
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

export type RestaurantId = string
export type ItineraryId = "historica" | "clasica" | "gastronomica" | "futbolera" | "tigre-delta"

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1280`

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
  officialUrl?: string
  ticketsUrl?: string
  instagramUrl?: string
  linksReviewedAt?: string
  linksSources?: string[]
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
    image: commons("Buenos_Aires_Caminito_4.jpg"),
    imageAltKey: "placeCaminitoAlt",
    attribution: "Andrzej Otrębski / CC BY-SA 4.0",
    lat: -34.6345, lng: -58.363,
    historyKey: "guideCaminitoHistory", tipKey: "guideCaminitoTip",
    logisticsKey: "guideCaminitoLogistics", nearbyKey: "guideCaminitoNearby",
    seeDoKeys: ["seeCaminito1", "seeCaminito2", "seeCaminito3", "seeCaminito4"],
    detailKey: "detailCaminito",
    officialUrl: "https://turismo.buenosaires.gob.ar/es/otros-establecimientos/caminito",
    linksReviewedAt: "2026-10-17",
    linksSources: ["turismo.buenosaires.gob.ar"],
  },
  {
    id: "bombonera",
    nameKey: "placeBombonera",
    descKey: "placeBomboneraDesc",
    durationKey: "duration2h",
    image: commons("Bombonera_Boca_Juniors.JPG"),
    imageAltKey: "placeBomboneraAlt",
    attribution: "Massimo Finizio / CC BY-SA 2.0 IT",
    lat: -34.6355, lng: -58.3647,
    historyKey: "guideBomboneraHistory", tipKey: "guideBomboneraTip",
    logisticsKey: "guideBomboneraLogistics", nearbyKey: "guideBomboneraNearby",
    seeDoKeys: ["seeBombonera1", "seeBombonera2", "seeBombonera3"],
    detailKey: "detailBombonera",
    officialUrl: "https://www.bocajuniors.com.ar/la-bombonera",
    ticketsUrl: "https://museoboquense.com/",
    linksReviewedAt: "2026-10-17",
    linksSources: ["bocajuniors.com.ar", "museoboquense.com"],
  },
  {
    id: "san-telmo-plaza",
    nameKey: "placeSanTelmoPlaza",
    descKey: "placeSanTelmoPlazaDesc",
    durationKey: "duration3h",
    image: commons("Casa_Rosada_2024.jpg"),
    imageAltKey: "placeSanTelmoPlazaAlt",
    attribution: "Casa Rosada / CC BY 2.5 AR",
    lat: -34.6083, lng: -58.3712,
    historyKey: "guideSanTelmoHistory", tipKey: "guideSanTelmoTip",
    logisticsKey: "guideSanTelmoLogistics", nearbyKey: "guideSanTelmoNearby",
    seeDoKeys: ["seeSanTelmo1", "seeSanTelmo2", "seeSanTelmo3", "seeSanTelmo4"],
    detailKey: "detailSanTelmo",
    officialUrl: "https://turismo.buenosaires.gob.ar/es/atractivo/plaza-de-mayo",
    linksReviewedAt: "2026-10-17",
    linksSources: ["turismo.buenosaires.gob.ar"],
  },
  {
    id: "recoleta",
    nameKey: "placeRecoleta",
    descKey: "placeRecoletaDesc",
    durationKey: "duration3h",
    image: commons("Recoleta_Cemetery,_Buenos_Aires,_Argentina.jpg"),
    imageAltKey: "placeRecoletaAlt",
    attribution: "Wikimedia Commons",
    lat: -34.5875, lng: -58.393,
    historyKey: "guideRecoletaHistory", tipKey: "guideRecoletaTip",
    logisticsKey: "guideRecoletaLogistics", nearbyKey: "guideRecoletaNearby",
    seeDoKeys: ["seeRecoleta1", "seeRecoleta2", "seeRecoleta3"],
    detailKey: "detailRecoleta",
    officialUrl: "https://buenosaires.gob.ar/gobierno/gestion-comunal/cementerios-de-la-ciudad/cementerio-de-la-recoleta",
    ticketsUrl: "https://buenosaires.gob.ar/gobierno/gestion-comunal/cementerios-de-la-ciudad/visitas-turisticas-al-cementerio-de-la-recoleta",
    linksReviewedAt: "2026-10-17",
    linksSources: ["buenosaires.gob.ar"],
  },
  {
    id: "palermo",
    nameKey: "placePalermo",
    descKey: "placePalermoDesc",
    durationKey: "duration3h",
    image: commons("El_Rosedal.jpg"),
    imageAltKey: "placePalermoAlt",
    attribution: "Wikimedia Commons",
    lat: -34.5703, lng: -58.4219,
    historyKey: "guidePalermoHistory", tipKey: "guidePalermoTip",
    logisticsKey: "guidePalermoLogistics", nearbyKey: "guidePalermoNearby",
    seeDoKeys: ["seePalermo1", "seePalermo2", "seePalermo3", "seePalermo4"],
    detailKey: "detailPalermo",
    officialUrl: "https://turismo.buenosaires.gob.ar/es/atractivo/bosques-de-palermo",
    linksReviewedAt: "2026-10-17",
    linksSources: ["turismo.buenosaires.gob.ar"],
  },
  {
    id: "puerto-madero",
    nameKey: "placeMadero",
    descKey: "placeMaderoDesc",
    durationKey: "duration2h",
    image: commons("2011.10.17.151426_Puente_de_la_Mujer_Puerto_Madero_Buenos_Aires.jpg"),
    imageAltKey: "placeMaderoAlt",
    attribution: "Wikimedia Commons",
    lat: -34.608, lng: -58.3615,
    historyKey: "guideMaderoHistory", tipKey: "guideMaderoTip",
    logisticsKey: "guideMaderoLogistics", nearbyKey: "guideMaderoNearby",
    seeDoKeys: ["seeMadero1", "seeMadero2", "seeMadero3"],
    detailKey: "detailMadero",
    officialUrl: "https://turismo.buenosaires.gob.ar/es/atractivo/puerto-madero",
    linksReviewedAt: "2026-10-17",
    linksSources: ["turismo.buenosaires.gob.ar"],
  },
  {
    id: "obelisco-colon",
    nameKey: "placeObeliscoColon",
    descKey: "placeObeliscoColonDesc",
    durationKey: "duration3h",
    image: commons("Obelisco_Buenos_Aires.jpg"),
    imageAltKey: "placeObeliscoColonAlt",
    attribution: "Wikimedia Commons",
    lat: -34.6037, lng: -58.3816,
    historyKey: "guideObeliscoHistory", tipKey: "guideObeliscoTip",
    logisticsKey: "guideObeliscoLogistics", nearbyKey: "guideObeliscoNearby",
    seeDoKeys: ["seeObelisco1", "seeObelisco2", "seeObelisco3"],
    detailKey: "detailObelisco",
    officialUrl: "https://teatrocolon.org.ar/",
    ticketsUrl: "https://teatrocolon.org.ar/entradas/",
    linksReviewedAt: "2026-10-17",
    linksSources: ["teatrocolon.org.ar"],
  },
  {
    id: "tigre",
    nameKey: "placeTigre",
    descKey: "placeTigreDesc",
    durationKey: "durationHalf",
    image: commons("El_maravilloso_Delta_en_Tigre.jpg"),
    imageAltKey: "placeTigreAlt",
    attribution: "Tigre Municipio / CC BY 2.0",
    lat: -34.426, lng: -58.5796,
    historyKey: "guideTigreHistory", tipKey: "guideTigreTip",
    logisticsKey: "guideTigreLogistics", nearbyKey: "guideTigreNearby",
    seeDoKeys: ["seeTigre1", "seeTigre2", "seeTigre3", "seeTigre4"],
    detailKey: "detailTigre",
    officialUrl: "https://vivitigre.gob.ar/",
    linksReviewedAt: "2026-10-17",
    linksSources: ["vivitigre.gob.ar", "tigre.gob.ar"],
  },
]

export const RESTAURANTS: Restaurant[] = [
  { id: "tortoni", name: "Café Tortoni", categoryKey: "restCatCafe", address: "Av. de Mayo 825, Monserrat, CABA", descKey: "restTortoniDesc", whyKey: "restTortoniWhy", placeIds: ["san-telmo-plaza", "obelisco-colon"], itineraryIds: ["historica", "clasica", "gastronomica"], url: "https://www.cafetortoni.com.ar/", image: commons("Cafe_Tortoni_Buenos_Aires.jpg") },
  { id: "preferido", name: "El Preferido de Palermo", categoryKey: "restCatClassic", address: "Jorge Luis Borges 2108, Palermo, CABA", descKey: "restPreferidoDesc", whyKey: "restPreferidoWhy", placeIds: ["palermo"], itineraryIds: ["clasica", "gastronomica"], url: "https://elpreferidodepalermo.com.ar/" },
  { id: "cabrera", name: "La Cabrera", categoryKey: "restCatParrilla", address: "José Antonio Cabrera 5099, Palermo, CABA", descKey: "restCabreraDesc", whyKey: "restCabreraWhy", placeIds: ["palermo"], itineraryIds: ["gastronomica", "clasica"], url: "https://www.parrillalacabrera.com.ar/" },
  { id: "puerto-frutos", name: "Puerto de Frutos", categoryKey: "restCatMarket", address: "Sarmiento y Río Luján, Tigre", descKey: "restFrutosDesc", whyKey: "restFrutosWhy", placeIds: ["tigre"], itineraryIds: ["tigre-delta"] },
]

export const ITINERARIES: Itinerary[] = [
  { id: "historica", nameKey: "itinHistoricaName", descKey: "itinHistoricaDesc", durationKey: "itinHistoricaDur", placeIds: ["san-telmo-plaza", "caminito", "bombonera"], restaurantIds: ["tortoni"], image: commons("Casa_Rosada_2024.jpg") },
  { id: "clasica", nameKey: "itinClasicaName", descKey: "itinClasicaDesc", durationKey: "itinClasicaDur", placeIds: ["obelisco-colon", "recoleta", "palermo"], restaurantIds: ["tortoni", "preferido"], image: commons("Obelisco_Buenos_Aires.jpg") },
  { id: "gastronomica", nameKey: "itinGastroName", descKey: "itinGastroDesc", durationKey: "itinGastroDur", placeIds: ["san-telmo-plaza", "palermo"], restaurantIds: ["tortoni", "preferido", "cabrera"], image: "https://images.unsplash.com/photo-1555935062-eca2db5e2c60?auto=format&fit=crop&w=900&q=80" },
  { id: "futbolera", nameKey: "itinFutbolName", descKey: "itinFutbolDesc", durationKey: "itinFutbolDur", placeIds: ["caminito", "bombonera"], image: commons("Bombonera_Boca_Juniors.JPG") },
  { id: "tigre-delta", nameKey: "itinTigreName", descKey: "itinTigreDesc", durationKey: "itinTigreDur", placeIds: ["tigre"], restaurantIds: ["puerto-frutos"], image: commons("El_maravilloso_Delta_en_Tigre.jpg") },
]

export const HERO_IMAGE = "https://images.pexels.com/photos/22690635/pexels-photo-22690635.jpeg?auto=compress&cs=tinysrgb&w=1920"
export const EXP_IMAGES = {
  city: commons("Buenos_Aires_Caminito_4.jpg"),
  football: commons("Bombonera_Boca_Juniors.JPG"),
  folklore: commons("Buenos_Aires_Caminito_4.jpg"),
  gastro: "https://images.unsplash.com/photo-1555935062-eca2db5e2c60?auto=format&fit=crop&w=900&q=80",
} as const
export const YOUTUBE_CHANNEL = "https://www.youtube.com/user/visitarg"
export const CONTACT_EMAIL = "galarza.alan.g@gmail.com"

export { GASTRO_PLACES, GASTRO_CATEGORIES, gastroSearch, getGastro } from "./gastronomy"
export type { GastroPlace, GastroCategory } from "./gastronomy"

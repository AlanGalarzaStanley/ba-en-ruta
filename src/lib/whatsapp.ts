import {
  WHATSAPP_NUMBER,
  SITE_URL,
  PLACES,
  RESTAURANTS,
  ITINERARIES,
  EXPERIENCE_TYPES,
  type ServiceId,
  type InterestId,
  type PlaceId,
  type ExperienceType,
  type RestaurantId,
  type ItineraryId,
} from "./ba-config"
import { t, type Lang, type CopyKey } from "./ba-copy"

export interface EnquiryPayload {
  name: string
  date: string
  passengers: number
  service: ServiceId | ""
  interests: InterestId[]
  place?: PlaceId | null
  message: string
  lang: Lang
  experienceType?: ExperienceType | ""
}

function serviceLabel(lang: Lang, id: ServiceId | ""): string {
  if (!id) return "—"
  const map: Record<ServiceId, string> = {
    airport: t(lang, "serviceAirport"),
    private: t(lang, "servicePrivate"),
    tours: t(lang, "serviceTours"),
    general: t(lang, "serviceGeneral"),
  }
  return map[id] ?? id
}

function interestLabels(lang: Lang, ids: InterestId[]): string {
  if (!ids.length) return "—"
  const map: Record<InterestId, string> = {
    city: t(lang, "interestCity"),
    football: t(lang, "interestFootball"),
    folklore: t(lang, "interestFolklore"),
    gastronomy: t(lang, "interestGastronomy"),
    countryside: t(lang, "interestCountryside"),
  }
  return ids.map((id) => map[id] ?? id).join(", ")
}

function placeLabel(lang: Lang, id: PlaceId): string {
  const place = PLACES.find((p) => p.id === id)
  if (!place) return id
  return t(lang, place.nameKey as CopyKey)
}

function expTypeLabel(lang: Lang, id: ExperienceType | ""): string {
  if (!id) return ""
  const found = EXPERIENCE_TYPES.find((e) => e.id === id)
  return found ? t(lang, found.key as CopyKey) : id
}

export function buildWhatsAppMessage(p: EnquiryPayload): string {
  const lines: string[] = []
  lines.push(
    p.lang === "en"
      ? "Hello! I'd like to enquire about BA en Ruta."
      : p.lang === "pt"
        ? "Olá! Gostaria de consultar sobre BA en Ruta."
        : "¡Hola! Quiero consultar sobre BA en Ruta.",
  )
  lines.push("")
  lines.push(`${t(p.lang, "formName")}: ${p.name}`)
  lines.push(`${t(p.lang, "formDate")}: ${p.date || "—"}`)
  lines.push(`${t(p.lang, "formPassengers")}: ${p.passengers}`)
  lines.push(`${t(p.lang, "formService")}: ${serviceLabel(p.lang, p.service)}`)
  lines.push(`${t(p.lang, "formInterests")}: ${interestLabels(p.lang, p.interests)}`)
  if (p.place) lines.push(`${t(p.lang, "navPlaces")}: ${placeLabel(p.lang, p.place)}`)
  if (p.experienceType) lines.push(`${t(p.lang, "formExpType")}: ${expTypeLabel(p.lang, p.experienceType)}`)
  if (p.message.trim()) {
    lines.push("")
    lines.push(`${t(p.lang, "formMessage")}:`)
    lines.push(p.message.trim())
  }
  lines.push("")
  lines.push(
    p.lang === "en"
      ? "This is an enquiry only — not a confirmed booking."
      : p.lang === "pt"
        ? "Isto é apenas uma consulta — não uma reserva confirmada."
        : "Esto es solo una consulta — no una reserva confirmada.",
  )
  lines.push(`Idioma / Language: ${p.lang.toUpperCase()}`)
  return lines.join("\n")
}

export function buildContextualMessage(opts: {
  lang: Lang
  placeId?: PlaceId | null
  date?: string
  experienceType?: ExperienceType | ""
}): string {
  const { lang, placeId, date, experienceType } = opts
  const placeName = placeId ? placeLabel(lang, placeId) : null
  const exp = experienceType ? expTypeLabel(lang, experienceType) : null

  if (lang === "en") {
    const lines = ["Hello! I'm looking at BA en Ruta."]
    if (placeName) lines.push(`I'm interested in learning more about ${placeName}.`)
    else lines.push("I'd like a general enquiry.")
    lines.push(`Preferred language: English.`)
    if (date) lines.push(`Estimated date: ${date}.`)
    if (exp) lines.push(`Experience: ${exp}.`)
    lines.push("Could you tell me about the available options?")
    return lines.join(" ")
  }

  if (lang === "pt") {
    const lines = ["Olá! Estou vendo o BA en Ruta."]
    if (placeName) lines.push(`Tenho interesse em saber mais sobre ${placeName}.`)
    else lines.push("Gostaria de uma consulta geral.")
    lines.push(`Idioma preferido: português.`)
    if (date) lines.push(`Data estimada: ${date}.`)
    if (exp) lines.push(`Experiência: ${exp}.`)
    lines.push("Podem me contar as opções disponíveis?")
    return lines.join(" ")
  }

  const lines = ["¡Hola! Estoy viendo BA en Ruta."]
  if (placeName) lines.push(`Me interesa conocer más sobre ${placeName}.`)
  else lines.push("Quisiera una consulta general.")
  lines.push(`Idioma preferido: español.`)
  if (date) lines.push(`Fecha estimada: ${date}.`)
  if (exp) lines.push(`Experiencia: ${exp}.`)
  lines.push("¿Podrían contarme las opciones disponibles?")
  return lines.join(" ")
}

export function buildTourWhatsAppMessage(opts: {
  lang: Lang
  placeIds: PlaceId[]
  restaurantIds: RestaurantId[]
  itineraryId?: ItineraryId | null
  date?: string
  experienceType?: ExperienceType | ""
}): string {
  const { lang, placeIds, restaurantIds, itineraryId, date, experienceType } = opts
  const placeNames = placeIds.map((id) => placeLabel(lang, id))
  const restNames = restaurantIds
    .map((id) => RESTAURANTS.find((r) => r.id === id)?.name)
    .filter(Boolean) as string[]
  const itin = itineraryId ? ITINERARIES.find((i) => i.id === itineraryId) : null
  const itinName = itin ? t(lang, itin.nameKey as CopyKey) : null

  if (lang === "en") {
    const lines = ["Hello! I'm looking at BA en Ruta and would like options for a custom route."]
    if (itinName) lines.push(`Suggested itinerary: ${itinName}.`)
    if (placeNames.length) lines.push(`Places: ${placeNames.join("; ")}.`)
    if (restNames.length) lines.push(`Food stops of interest: ${restNames.join("; ")}.`)
    if (date) lines.push(`Estimated date: ${date}.`)
    if (experienceType) lines.push(`Experience type: ${expTypeLabel(lang, experienceType)}.`)
    lines.push("Preferred language: English.")
    lines.push("This is an enquiry only, not a confirmed booking. Could you share available options?")
    return lines.join(" ")
  }
  if (lang === "pt") {
    const lines = ["Olá! Estou vendo o BA en Ruta e gostaria de opções para um roteiro personalizado."]
    if (itinName) lines.push(`Roteiro sugerido: ${itinName}.`)
    if (placeNames.length) lines.push(`Lugares: ${placeNames.join("; ")}.`)
    if (restNames.length) lines.push(`Paradas gastronômicas de interesse: ${restNames.join("; ")}.`)
    if (date) lines.push(`Data estimada: ${date}.`)
    if (experienceType) lines.push(`Tipo de experiência: ${expTypeLabel(lang, experienceType)}.`)
    lines.push("Idioma preferido: português.")
    lines.push("Isto é apenas uma consulta, não uma reserva confirmada. Podem compartilhar as opções disponíveis?")
    return lines.join(" ")
  }
  const lines = ["¡Hola! Estoy viendo BA en Ruta y me gustaría opciones para un recorrido a medida."]
  if (itinName) lines.push(`Itinerario sugerido: ${itinName}.`)
  if (placeNames.length) lines.push(`Lugares: ${placeNames.join("; ")}.`)
  if (restNames.length) lines.push(`Paradas gastronómicas de interés: ${restNames.join("; ")}.`)
  if (date) lines.push(`Fecha estimada: ${date}.`)
  if (experienceType) lines.push(`Tipo de experiencia: ${expTypeLabel(lang, experienceType)}.`)
  lines.push("Idioma preferido: español.")
  lines.push("Esto es solo una consulta, no una reserva confirmada. ¿Podrían contarme las opciones disponibles?")
  return lines.join(" ")
}

/** Mensaje precargado para el QR del conductor (pasajero guarda contacto). */
export function buildPassengerContactMessage(): string {
  return (
    "¡Hola! Viajé con vos y quiero guardar tu contacto para futuros traslados. " +
    "Te escribo desde BA en Ruta. Acá tengo tu página: " +
    SITE_URL
  )
}

/** URL wa.me del QR de contacto del conductor. null si el número no es válido. */
export function getDriverQrWhatsAppUrl(): string | null {
  return getWhatsAppUrl(buildPassengerContactMessage())
}

export function getWhatsAppUrl(message: string): string | null {
  if (!WHATSAPP_NUMBER || !/^\d{10,15}$/.test(WHATSAPP_NUMBER)) return null
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message: string): { opened: boolean; url: string | null } {
  const url = getWhatsAppUrl(message)
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer")
    return { opened: true, url }
  }
  return { opened: false, url: null }
}

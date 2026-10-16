import { WHATSAPP_NUMBER, PLACES, type ServiceId, type InterestId, type PlaceId } from "./ba-config"
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

export function buildWhatsAppMessage(p: EnquiryPayload): string {
  const lines: string[] = []
  lines.push(p.lang === "en" ? "Hello! I'd like to enquire about BA en Ruta." : p.lang === "pt" ? "Olá! Gostaria de consultar sobre BA en Ruta." : "¡Hola! Quiero consultar sobre BA en Ruta.")
  lines.push("")
  lines.push(`${t(p.lang, "formName")}: ${p.name}`)
  lines.push(`${t(p.lang, "formDate")}: ${p.date || "—"}`)
  lines.push(`${t(p.lang, "formPassengers")}: ${p.passengers}`)
  lines.push(`${t(p.lang, "formService")}: ${serviceLabel(p.lang, p.service)}`)
  lines.push(`${t(p.lang, "formInterests")}: ${interestLabels(p.lang, p.interests)}`)
  if (p.place) {
    lines.push(`${t(p.lang, "navPlaces")}: ${placeLabel(p.lang, p.place)}`)
  }
  if (p.message.trim()) {
    lines.push("")
    lines.push(`${t(p.lang, "formMessage")}:`)
    lines.push(p.message.trim())
  }
  lines.push("")
  lines.push(`Idioma / Language: ${p.lang.toUpperCase()}`)
  return lines.join("\n")
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

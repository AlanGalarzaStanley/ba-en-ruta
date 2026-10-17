/**
 * Motor del simulador de recorrido: arma las paradas de un itinerario,
 * estima distancias/tiempos en auto (orientativos) y resuelve videos por idioma.
 */
import {
  PLACES,
  RESTAURANTS,
  ITINERARIES,
  type Itinerary,
  type ItineraryId,
  type Place,
  type Restaurant,
} from "./ba-config"
import type { Photo } from "./media"
import type { Lang } from "./ba-copy"

export type RouteStep =
  | { kind: "pickup"; key: string }
  | {
      kind: "place"
      key: string
      place: Place
      lat: number
      lng: number
      visitMin: number
      driveMin: number
      driveKm: number
      clock: string
    }
  | {
      kind: "food"
      key: string
      rest: Restaurant
      lat: number
      lng: number
      visitMin: number
      driveMin: number
      driveKm: number
      clock: string
    }
  | { kind: "end"; key: string }

export type GeoStep = Extract<RouteStep, { kind: "place" | "food" }>

const START_MIN: Record<ItineraryId, number> = {
  historica: 9 * 60 + 30,
  clasica: 9 * 60 + 30,
  gastronomica: 10 * 60 + 30,
  futbolera: 10 * 60,
  "tigre-delta": 9 * 60,
}

/** Distancia en línea recta (km). */
export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

/** Estimación urbana: factor de calle 1,35; 20 km/h en ciudad, 40 km/h en tramos largos (autopista). */
export function estimateDrive(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const km = haversineKm(a, b) * 1.35
  const speed = km > 15 ? 40 : 20
  const min = Math.max(5, Math.round(((km / speed) * 60) / 5) * 5)
  return { km: Math.round(km * 10) / 10, min }
}

export function formatClock(totalMin: number): string {
  const h = Math.floor(totalMin / 60) % 24
  const m = totalMin % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

export function getItinerary(id: ItineraryId): Itinerary | undefined {
  return ITINERARIES.find((i) => i.id === id)
}

export function buildRoute(itin: Itinerary): RouteStep[] {
  const places = itin.placeIds.map((id) => PLACES.find((p) => p.id === id)).filter(Boolean) as Place[]
  const rests = (itin.restaurantIds ?? [])
    .map((id) => RESTAURANTS.find((r) => r.id === id))
    .filter((r): r is Restaurant => !!r && r.lat != null && r.lng != null)

  // Ordenar: cada parada gastronómica va después del primer lugar con el que se vincula;
  // las que no se vinculan quedan al final.
  const used = new Set<string>()
  const seq: ({ t: "place"; p: Place } | { t: "food"; r: Restaurant })[] = []
  for (const p of places) {
    seq.push({ t: "place", p })
    for (const r of rests) {
      if (!used.has(r.id) && r.placeIds.includes(p.id)) {
        seq.push({ t: "food", r })
        used.add(r.id)
      }
    }
  }
  for (const r of rests) if (!used.has(r.id)) seq.push({ t: "food", r })

  const steps: RouteStep[] = [{ kind: "pickup", key: "pickup" }]
  let clock = START_MIN[itin.id] ?? 9 * 60 + 30
  let prev: { lat: number; lng: number } | null = null
  for (const s of seq) {
    const pt = s.t === "place" ? { lat: s.p.lat, lng: s.p.lng } : { lat: s.r.lat!, lng: s.r.lng! }
    const drive = prev ? estimateDrive(prev, pt) : { km: 0, min: 0 }
    clock += drive.min
    const visitMin = s.t === "place" ? s.p.visitMinutes ?? 60 : 60
    if (s.t === "place") {
      steps.push({ kind: "place", key: s.p.id, place: s.p, ...pt, visitMin, driveMin: drive.min, driveKm: drive.km, clock: formatClock(clock) })
    } else {
      steps.push({ kind: "food", key: `food-${s.r.id}`, rest: s.r, ...pt, visitMin, driveMin: drive.min, driveKm: drive.km, clock: formatClock(clock) })
    }
    clock += visitMin
    prev = pt
  }
  steps.push({ kind: "end", key: "end" })
  return steps
}

export function routeTotals(steps: RouteStep[]) {
  const geo = steps.filter((s): s is GeoStep => s.kind === "place" || s.kind === "food")
  const km = geo.reduce((a, s) => a + s.driveKm, 0)
  const min = geo.reduce((a, s) => a + s.driveMin + s.visitMin, 0)
  return { stops: geo.length, km: Math.round(km), hours: Math.round((min / 60) * 2) / 2 }
}

export function stepPhotos(step: RouteStep): Photo[] {
  if (step.kind === "place") return step.place.photos ?? []
  return []
}

export function youtubeId(url?: string): string | null {
  if (!url) return null
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

export function placeVideo(place: Place, lang: Lang): string | null {
  const yt = place.youtube
  if (!yt) return null
  return yt[lang] ?? yt.es ?? yt.en ?? yt.pt ?? null
}

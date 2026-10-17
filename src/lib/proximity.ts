/**
 * Detección de llegada a paradas a partir de lecturas de GPS.
 * Todo ocurre en el dispositivo: las posiciones no se guardan ni se envían.
 */
export interface GeoStop {
  key: string
  lat: number
  lng: number
  /** Radio mínimo propio de la parada (p. ej. parques o Tigre, que son extensos). */
  minRadiusM?: number
}

export interface Fix {
  lat: number
  lng: number
  /** Precisión informada por el navegador, en metros. */
  accuracy: number
}

export interface ProximityState {
  arrived: string[]
  candidate: { key: string; hits: number } | null
}

export interface ProximityOptions {
  radiusM: number
  /** Lecturas con precisión peor que esto se ignoran. */
  maxAccuracyM: number
  /** Lecturas consecutivas dentro del radio para confirmar la llegada. */
  confirmHits: number
  /** Con precisión mejor que esto alcanza una sola lectura. */
  instantAccuracyM: number
}

export const DEFAULT_PROXIMITY: ProximityOptions = {
  radiusM: 300,
  maxAccuracyM: 200,
  confirmHits: 2,
  instantAccuracyM: 30,
}

export const emptyProximity = (arrived: string[] = []): ProximityState => ({ arrived, candidate: null })

export function distanceM(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6_371_000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

export const radiusFor = (stop: GeoStop, opts: ProximityOptions) => Math.max(opts.radiusM, stop.minRadiusM ?? 0)

export interface Evaluation {
  state: ProximityState
  /** Parada pendiente más cercana. */
  nearest: { key: string; distanceM: number } | null
  /** Clave de la parada a la que se acaba de llegar, si corresponde. */
  arrivedKey: string | null
  ignored: "low_accuracy" | null
}

export function evaluateFix(
  state: ProximityState,
  fix: Fix,
  stops: GeoStop[],
  opts: ProximityOptions = DEFAULT_PROXIMITY,
): Evaluation {
  const pending = stops.filter((s) => !state.arrived.includes(s.key))
  let nearest: Evaluation["nearest"] = null
  for (const s of pending) {
    const d = distanceM(fix, s)
    if (!nearest || d < nearest.distanceM) nearest = { key: s.key, distanceM: d }
  }
  if (!Number.isFinite(fix.accuracy) || fix.accuracy > opts.maxAccuracyM) {
    return { state, nearest, arrivedKey: null, ignored: "low_accuracy" }
  }
  // Paradas pendientes dentro de su radio, la más cercana primero.
  const inside = pending
    .map((s) => ({ s, d: distanceM(fix, s) }))
    .filter(({ s, d }) => d <= radiusFor(s, opts))
    .sort((a, b) => a.d - b.d)
  if (!inside.length) return { state: { ...state, candidate: null }, nearest, arrivedKey: null, ignored: null }

  const key = inside[0].s.key
  const hits = state.candidate?.key === key ? state.candidate.hits + 1 : 1
  if (hits >= opts.confirmHits || fix.accuracy <= opts.instantAccuracyM) {
    return { state: { arrived: [...state.arrived, key], candidate: null }, nearest, arrivedKey: key, ignored: null }
  }
  return { state: { ...state, candidate: { key, hits } }, nearest, arrivedKey: null, ignored: null }
}

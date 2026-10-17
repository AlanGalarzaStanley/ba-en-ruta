/**
 * Recorridos que se pueden vender con código.
 * Debe coincidir con ITINERARIES de src/lib/ba-config.ts (lo verifica tests/unit/tour-server.test.ts).
 * Se duplica a propósito: el servidor no importa el catálogo del cliente (fotos, textos, etc.).
 */
export const TOUR_PLACES = {
  historica: ["san-telmo-plaza", "caminito", "bombonera"],
  clasica: ["obelisco-colon", "recoleta", "palermo"],
  gastronomica: ["san-telmo-plaza", "palermo"],
  futbolera: ["caminito", "bombonera"],
  "tigre-delta": ["tigre"],
} as const satisfies Record<string, readonly string[]>

export type TourId = keyof typeof TOUR_PLACES
export const TOUR_IDS = Object.keys(TOUR_PLACES) as TourId[]

export function isTourId(x: unknown): x is TourId {
  return typeof x === "string" && Object.prototype.hasOwnProperty.call(TOUR_PLACES, x)
}

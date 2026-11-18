import { ITINERARIES, type Itinerary, type RestaurantId } from "./ba-config"

export const GASTRO_MEAL_IDS = ["los-bohemios", "la-crespo", "mercat-villa-crespo"] as const
export type GastroMealId = (typeof GASTRO_MEAL_IDS)[number]

export const GASTRO_OPTIONAL_CAFE_ID = "cafe-san-bernardo" as const

export type GastroRouteSelection = {
  meal: GastroMealId
  includeCafe: boolean
}

export const DEFAULT_GASTRO_SELECTION: GastroRouteSelection = {
  meal: "los-bohemios",
  includeCafe: false,
}

export function isGastroMealId(value: string | null): value is GastroMealId {
  return GASTRO_MEAL_IDS.some((id) => id === value)
}

export function readGastroSelection(search?: string): GastroRouteSelection {
  const query = search ?? (typeof window === "undefined" ? "" : window.location.search)
  const params = new URLSearchParams(query)
  const meal = params.get("mesa")
  return {
    meal: isGastroMealId(meal) ? meal : DEFAULT_GASTRO_SELECTION.meal,
    includeCafe: params.get("pausa") === GASTRO_OPTIONAL_CAFE_ID,
  }
}

export function buildGastroItinerary(selection: GastroRouteSelection): Itinerary {
  const base = ITINERARIES.find((itinerary) => itinerary.id === "gastronomica")
  if (!base) throw new Error("Falta el itinerario base de Sabores Porteños")

  const restaurantIds: RestaurantId[] = [selection.meal]
  if (selection.includeCafe) restaurantIds.push(GASTRO_OPTIONAL_CAFE_ID)

  return {
    ...base,
    placeIds: [],
    restaurantIds,
    sequence: restaurantIds.map((id) => ({ kind: "restaurant" as const, id })),
  }
}

export function syncGastroSelectionToUrl(url: URL, selection: GastroRouteSelection): void {
  if (selection.meal === DEFAULT_GASTRO_SELECTION.meal) url.searchParams.delete("mesa")
  else url.searchParams.set("mesa", selection.meal)

  if (selection.includeCafe) url.searchParams.set("pausa", GASTRO_OPTIONAL_CAFE_ID)
  else url.searchParams.delete("pausa")
}

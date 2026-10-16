import { MessageCircle, X } from "lucide-react"
import { PLACES, RESTAURANTS, ITINERARIES, type PlaceId, type RestaurantId, type ItineraryId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { buildTourWhatsAppMessage, openWhatsApp } from "../lib/whatsapp"

export type TourSelection = {
  placeIds: PlaceId[]
  restaurantIds: RestaurantId[]
  itineraryId: ItineraryId | null
}

type Props = {
  lang: Lang
  selection: TourSelection
  onClear: () => void
  onRemovePlace: (id: PlaceId) => void
  onRemoveRestaurant: (id: RestaurantId) => void
}

export function TourBar({ lang, selection, onClear, onRemovePlace, onRemoveRestaurant }: Props) {
  const has =
    selection.placeIds.length > 0 ||
    selection.restaurantIds.length > 0 ||
    selection.itineraryId

  if (!has) return null

  const enquire = () => {
    const msg = buildTourWhatsAppMessage({
      lang,
      placeIds: selection.placeIds,
      restaurantIds: selection.restaurantIds,
      itineraryId: selection.itineraryId,
    })
    openWhatsApp(msg)
  }

  const itin = selection.itineraryId
    ? ITINERARIES.find((i) => i.id === selection.itineraryId)
    : null

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-navy/10 bg-white/95 backdrop-blur shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-1">{t(lang, "tourLabel")}</p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {itin && (
              <span className="rounded-full bg-gold/15 text-navy px-2.5 py-1">
                {t(lang, "tourItinerary")}: {t(lang, itin.nameKey as CopyKey)}
              </span>
            )}
            {selection.placeIds.map((id) => {
              const p = PLACES.find((x) => x.id === id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onRemovePlace(id)}
                  className="inline-flex items-center gap-1 rounded-full bg-cream border border-navy/10 px-2.5 py-1 text-navy/80 hover:border-navy/30"
                >
                  {p ? t(lang, p.nameKey as CopyKey) : id}
                  <X className="w-3 h-3" aria-hidden />
                </button>
              )
            })}
            {selection.restaurantIds.map((id) => {
              const r = RESTAURANTS.find((x) => x.id === id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onRemoveRestaurant(id)}
                  className="inline-flex items-center gap-1 rounded-full bg-sky/15 border border-sky/30 px-2.5 py-1 text-navy/80"
                >
                  {r?.name ?? id}
                  <X className="w-3 h-3" aria-hidden />
                </button>
              )
            })}
          </div>
          <p className="mt-1 text-[10px] text-navy/40">{t(lang, "tourNote")}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={onClear} className="text-xs text-navy/50 hover:text-navy min-h-11 px-2">
            {t(lang, "tourClear")}
          </button>
          <button
            type="button"
            onClick={enquire}
            className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-light text-navy font-medium text-sm px-4 py-2.5 rounded-lg min-h-11"
          >
            <MessageCircle className="w-4 h-4" />
            {t(lang, "tourEnquire")}
          </button>
        </div>
      </div>
    </div>
  )
}

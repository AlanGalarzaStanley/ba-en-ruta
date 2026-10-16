import { ITINERARIES, PLACES, RESTAURANTS, type ItineraryId, type PlaceId, type RestaurantId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"

type Props = {
  lang: Lang
  onSelectItinerary: (id: ItineraryId, placeIds: PlaceId[], restaurantIds: RestaurantId[]) => void
  onCustomize: (placeIds: PlaceId[]) => void
}

/** Compact day plans — no large place photos (those live in Imperdibles). */
export function Itineraries({ lang, onSelectItinerary, onCustomize }: Props) {
  return (
    <section id="recorridos" className="py-14 sm:py-16 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "itinLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl mb-2">{t(lang, "itinTitle")}</h2>
        <p className="text-white/60 text-sm mb-8 max-w-2xl">{t(lang, "itinSubtitle")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ITINERARIES.map((itin) => {
            const stops = itin.placeIds
              .map((id) => PLACES.find((p) => p.id === id))
              .filter(Boolean)
            const foods = (itin.restaurantIds ?? [])
              .map((id) => RESTAURANTS.find((r) => r.id === id))
              .filter(Boolean)
            return (
              <article key={itin.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col">
                <h3 className="font-display text-lg text-white mb-1">{t(lang, itin.nameKey as CopyKey)}</h3>
                <p className="text-xs text-white/55 leading-relaxed mb-2 flex-1">{t(lang, itin.descKey as CopyKey)}</p>
                <p className="text-[10px] text-white/35 mb-2">{t(lang, itin.durationKey as CopyKey)}</p>
                <p className="text-[10px] text-white/45 mb-1">
                  {stops.map((p) => t(lang, p!.nameKey as CopyKey)).join(" · ")}
                </p>
                {foods.length > 0 && (
                  <p className="text-[10px] text-gold/70 mb-3">{foods.map((r) => r!.name).join(" · ")}</p>
                )}
                <div className="flex flex-wrap gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectItinerary(itin.id, itin.placeIds, itin.restaurantIds ?? [])}
                    className="text-sm font-medium text-gold hover:text-gold-light min-h-10"
                  >
                    {t(lang, "itinCta")} →
                  </button>
                  <button type="button" onClick={() => onCustomize(itin.placeIds)} className="text-sm text-white/45 hover:text-white min-h-10">
                    {t(lang, "itinCustomize")}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

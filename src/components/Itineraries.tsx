import { ITINERARIES, PLACES, RESTAURANTS, type ItineraryId, type PlaceId, type RestaurantId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"

type Props = {
  lang: Lang
  onSelectItinerary: (id: ItineraryId, placeIds: PlaceId[], restaurantIds: RestaurantId[]) => void
  onCustomize: (placeIds: PlaceId[]) => void
}

export function Itineraries({ lang, onSelectItinerary, onCustomize }: Props) {
  return (
    <section id="recorridos" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "itinLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-2">{t(lang, "itinTitle")}</h2>
        <p className="text-navy/60 text-sm mb-10 max-w-2xl">{t(lang, "itinSubtitle")}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITINERARIES.map((itin) => {
            const stops = itin.placeIds
              .map((id) => PLACES.find((p) => p.id === id))
              .filter(Boolean)
            const foods = (itin.restaurantIds ?? [])
              .map((id) => RESTAURANTS.find((r) => r.id === id))
              .filter(Boolean)
            return (
              <article key={itin.id} className="ba-card bg-white rounded-2xl border border-navy/5 overflow-hidden flex flex-col">
                <div className="aspect-[16/10] bg-navy/5 overflow-hidden">
                  <img src={itin.image} alt="" className="w-full h-full object-cover" loading="lazy" width={640} height={400} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-xl text-navy mb-2">{t(lang, itin.nameKey as CopyKey)}</h3>
                  <p className="text-sm text-navy/60 leading-relaxed mb-3 flex-1">{t(lang, itin.descKey as CopyKey)}</p>
                  <p className="text-[10px] text-navy/40 mb-2">{t(lang, itin.durationKey as CopyKey)}</p>
                  <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-1">{t(lang, "itinStops")}</p>
                  <ol className="text-xs text-navy/70 space-y-0.5 mb-3 list-decimal list-inside">
                    {stops.map((p) => (
                      <li key={p!.id}>{t(lang, p!.nameKey as CopyKey)}</li>
                    ))}
                  </ol>
                  {foods.length > 0 && (
                    <>
                      <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-1">{t(lang, "itinFood")}</p>
                      <p className="text-xs text-navy/60 mb-3">{foods.map((r) => r!.name).join(" · ")}</p>
                    </>
                  )}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <button
                      type="button"
                      onClick={() => onSelectItinerary(itin.id, itin.placeIds, itin.restaurantIds ?? [])}
                      className="text-sm font-medium text-navy hover:text-gold min-h-11"
                    >
                      {t(lang, "itinCta")} →
                    </button>
                    <button
                      type="button"
                      onClick={() => onCustomize(itin.placeIds)}
                      className="text-sm text-navy/50 hover:text-navy min-h-11"
                    >
                      {t(lang, "itinCustomize")}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Play } from "lucide-react"
import { ITINERARIES, PLACES, RESTAURANTS, type ItineraryId, type PlaceId, type RestaurantId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { fill } from "../lib/immersive-copy"
import { buildRoute, routeTotals } from "../lib/route"
import { optimizeImage, imageSrcSet } from "../lib/img"

type Props = {
  lang: Lang
  onSelectItinerary: (id: ItineraryId, placeIds: PlaceId[], restaurantIds: RestaurantId[]) => void
  onCustomize: (placeIds: PlaceId[]) => void
  onPlay: (id: ItineraryId) => void
}

/**
 * "Sentí el recorrido antes de contratarlo": cada itinerario se puede vivir
 * parada por parada en el simulador (RoutePlayer).
 */
export function Itineraries({ lang, onSelectItinerary, onCustomize, onPlay }: Props) {
  return (
    <section id="recorridos" className="relative py-16 sm:py-24 bg-[#070B16] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none ba-grain" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 ba-reveal">
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-3">{t(lang, "routeLabel")}</p>
          <h2 className="font-display text-3xl sm:text-5xl leading-[1.1] mb-4">{t(lang, "routeTitle")}</h2>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed">{t(lang, "routeSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
          {ITINERARIES.map((itin, i) => {
            const stops = itin.placeIds.map((id) => PLACES.find((p) => p.id === id)).filter(Boolean)
            const foods = (itin.restaurantIds ?? []).map((id) => RESTAURANTS.find((r) => r.id === id)).filter(Boolean)
            const totals = routeTotals(buildRoute(itin))
            const wide = i < 2
            return (
              <article
                key={itin.id}
                className={`group relative rounded-2xl overflow-hidden min-h-[460px] sm:min-h-[440px] flex flex-col justify-end ba-reveal ${
                  wide ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onPlay(itin.id)}
                  className="absolute inset-0 z-0"
                  aria-label={`${t(lang, "routePlay")}: ${t(lang, itin.nameKey as CopyKey)}`}
                >
                  <img
                    src={optimizeImage(itin.image, 960)}
                    srcSet={imageSrcSet(itin.image, [500, 960, 1280])}
                    sizes="(min-width: 1024px) 560px, 100vw"
                    decoding="async"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#070B16] from-30% via-[#070B16]/80 via-60% to-[#070B16]/5" />
                  <span className="absolute top-4 right-4 w-14 h-14 rounded-full bg-gold text-navy flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" aria-hidden />
                  </span>
                </button>
                <div className="relative z-10 p-5 sm:p-6 pointer-events-none">
                  <div className="flex flex-wrap gap-1.5 mb-3 text-[11px] text-white/80">
                    <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur">{fill(t(lang, "routeStops"), { n: totals.stops })}</span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur">{t(lang, itin.durationKey as CopyKey)}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl mb-2">{t(lang, itin.nameKey as CopyKey)}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-3 max-w-md">{t(lang, itin.descKey as CopyKey)}</p>
                  <ol className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-white/60 mb-4">
                    {stops.map((p, n) => (
                      <li key={p!.id} className="inline-flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-white/15 text-[9px] flex items-center justify-center">{n + 1}</span>
                        {t(lang, p!.nameKey as CopyKey)}
                      </li>
                    ))}
                    {foods.map((r) => (
                      <li key={r!.id} className="text-gold/85">· {r!.name}</li>
                    ))}
                  </ol>
                  <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => onPlay(itin.id)}
                      className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium text-sm px-4 py-2.5 rounded-xl min-h-11"
                    >
                      <Play className="w-4 h-4 fill-current" aria-hidden /> {t(lang, "routePlay")}
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectItinerary(itin.id, itin.placeIds, itin.restaurantIds ?? [])}
                      className="text-sm font-medium text-white/85 hover:text-white px-3 min-h-11"
                    >
                      {t(lang, "routeEnquire")}
                    </button>
                    <button
                      type="button"
                      onClick={() => onCustomize(itin.placeIds)}
                      className="text-sm text-white/55 hover:text-white px-2 min-h-11"
                    >
                      {t(lang, "routeCustomize")}
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

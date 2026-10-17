import { useState } from "react"
import { VideoModal } from "./VideoEmbed"
import { Plane, Car, Map, Play, ChevronDown, ChevronUp, MapPin, Plus, Check } from "lucide-react"
import {
  PLACES,
  EXP_IMAGES,
  RESTAURANTS,
  type ServiceId,
  type InterestId,
  type PlaceId,
  type Place,
  type RestaurantId,
} from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"

export function HowItWorks({ lang }: { lang: Lang }) {
  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-navy/40 text-xs tracking-[0.2em] uppercase mb-3">{t(lang, "howLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center text-navy mb-4">{t(lang, "howTitle")}</h2>
        <div className="ba-accent-line max-w-xs mx-auto mb-12" aria-hidden />
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {(
            [
              { n: "01", title: "howStep1Title" as CopyKey, desc: "howStep1Desc" as CopyKey },
              { n: "02", title: "howStep2Title" as CopyKey, desc: "howStep2Desc" as CopyKey },
              { n: "03", title: "howStep3Title" as CopyKey, desc: "howStep3Desc" as CopyKey },
            ] as const
          ).map((s) => (
            <div key={s.n} className="text-center">
              <p className="font-display text-4xl text-gold mb-3">{s.n}</p>
              <h3 className="font-medium text-navy mb-2">{t(lang, s.title)}</h3>
              <p className="text-sm text-navy/60 leading-relaxed">{t(lang, s.desc)}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-navy/40">{t(lang, "howNote")}</p>
      </div>
    </section>
  )
}

export function Services({ lang, onEnquire }: { lang: Lang; onEnquire: (service: ServiceId) => void }) {
  const items: { id: ServiceId; icon: typeof Plane; label: CopyKey; title: CopyKey; desc: CopyKey }[] = [
    { id: "airport", icon: Plane, label: "serviceAirportLabel", title: "serviceAirportTitle", desc: "serviceAirportDesc" },
    { id: "private", icon: Car, label: "servicePrivateLabel", title: "servicePrivateTitle", desc: "servicePrivateDesc" },
    { id: "tours", icon: Map, label: "serviceToursLabel", title: "serviceToursTitle", desc: "serviceToursDesc" },
  ]
  return (
    <section id="servicios" className="py-16 sm:py-20 bg-cream-dark/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "servicesLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-navy">{t(lang, "servicesTitle")}</h2>
          </div>
          <p className="text-sm text-navy/50 max-w-sm">{t(lang, "servicesSubtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.id} className="ba-card bg-cream rounded-2xl border border-navy/5 p-6 flex flex-col">
              <item.icon className="w-6 h-6 text-sky mb-4" />
              <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-1">{t(lang, item.label)}</p>
              <h3 className="font-display text-xl text-navy mb-2">{t(lang, item.title)}</h3>
              <p className="text-sm text-navy/60 leading-relaxed flex-1 mb-5">{t(lang, item.desc)}</p>
              <button type="button" onClick={() => onEnquire(item.id)} className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors min-h-11">
                {t(lang, "serviceCta")} <span aria-hidden>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Prices({ lang, onEnquire }: { lang: Lang; onEnquire: () => void }) {
  return (
    <section id="precios" className="bg-navy text-white py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "pricesLabel")}</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-3">{t(lang, "pricesTitle")}</h2>
          <p className="text-white/70 text-sm max-w-md leading-relaxed">{t(lang, "pricesDesc")}</p>
        </div>
        <div className="text-center md:text-right">
          <button type="button" onClick={onEnquire} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium px-5 py-3 rounded-lg transition-colors min-h-11">
            {t(lang, "pricesCta")} <span aria-hidden>→</span>
          </button>
          <p className="mt-3 text-xs text-white/40 max-w-xs md:ml-auto">{t(lang, "pricesNote")}</p>
        </div>
      </div>
    </section>
  )
}

export function MoodStrip({
  lang,
  onSelect,
  onExplore,
}: {
  lang: Lang
  onSelect: (interest: InterestId) => void
  onExplore: () => void
}) {
  const moods: { interest: InterestId; title: CopyKey; desc: CopyKey }[] = [
    { interest: "city", title: "expEssentialTitle", desc: "moodCityDesc" },
    { interest: "football", title: "expFootballTitle", desc: "moodFootballDesc" },
    { interest: "folklore", title: "expFolkloreTitle", desc: "moodFolkloreDesc" },
  ]
  return (
    <section id="experiencias" className="py-14 sm:py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "moodLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-3">{t(lang, "moodTitle")}</h2>
        <p className="text-navy/60 text-sm mb-8 max-w-2xl leading-relaxed">{t(lang, "moodSubtitle")}</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {moods.map((m) => (
            <button
              key={m.interest}
              type="button"
              onClick={() => onSelect(m.interest)}
              className="text-left rounded-xl border border-navy/10 bg-white px-4 py-3 hover:border-gold/50 transition-colors min-h-11 max-w-xs"
            >
              <span className="block font-medium text-navy text-sm">{t(lang, m.title)}</span>
              <span className="block text-xs text-navy/50 mt-0.5">{t(lang, m.desc)}</span>
            </button>
          ))}
        </div>
        <button type="button" onClick={onExplore} className="text-sm font-medium text-navy hover:text-gold min-h-11">
          {t(lang, "moodExplore")} →
        </button>
      </div>
    </section>
  )
}

function PlaceCard({
  place,
  index,
  lang,
  onSelect,
  onMapFocus,
  selected,
  onToggleTour,
}: {
  place: Place
  index: number
  lang: Lang
  onSelect: (id: PlaceId) => void
  onMapFocus?: (id: PlaceId) => void
  selected?: boolean
  onToggleTour?: (id: PlaceId) => void
}) {
  const [open, setOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [video, setVideo] = useState<{ url: string; label: string } | null>(null)
  const guideId = `guide-${place.id}`
  const nearbyRests = RESTAURANTS.filter((r) => r.placeIds.includes(place.id))
  const yt = place.youtube
  const videoLangs = [
    { code: "es" as Lang, label: "ES", url: yt?.es },
    { code: "en" as Lang, label: "EN", url: yt?.en },
    { code: "pt" as Lang, label: "PT", url: yt?.pt },
  ].filter((l) => l.url)

  return (
    <div id={`place-${place.id}`} className="ba-card ba-reveal bg-white rounded-xl border border-navy/5 overflow-hidden flex flex-col">
      {video && (
        <VideoModal
          url={video.url}
          lang={lang}
          title={`${t(lang, place.nameKey as CopyKey)} · ${video.label}`}
          onClose={() => setVideo(null)}
        />
      )}
      <div className="aspect-video relative bg-navy/10 overflow-hidden">
        {place.image && !imgError ? (
          <img
            src={place.image}
            alt={t(lang, (place.imageAltKey || place.nameKey) as CopyKey)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
            loading="lazy"
            width={640}
            height={360}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-navy/15 px-3">
            <span className="font-display text-navy/40 text-sm text-center">{t(lang, place.nameKey as CopyKey)}</span>
          </div>
        )}
        <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-navy/90 text-white text-xs font-medium flex items-center justify-center">
          {index + 1}
        </span>
        {videoLangs.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5 justify-center">
            {videoLangs.map((l) => (
              <button
                type="button"
                key={l.code}
                onClick={() => setVideo({ url: l.url!, label: l.label })}
                className="inline-flex items-center gap-1 min-h-9 px-2.5 rounded-full bg-navy/85 hover:bg-gold hover:text-navy text-white text-[11px] font-medium backdrop-blur-sm transition-colors"
                aria-label={`${t(lang, "placesVideo")} (${l.label})`}
              >
                <Play className="w-3 h-3 fill-current" aria-hidden />
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {place.attribution && (
          <p className="text-[9px] text-navy/35 mb-1.5 truncate" title={place.attribution}>
            {t(lang, "photoBy")}: {place.attribution}
          </p>
        )}
        <h3 className="font-medium text-navy text-sm mb-1">{t(lang, place.nameKey as CopyKey)}</h3>
        <p className="text-xs text-navy/55 leading-relaxed flex-1 mb-2">{t(lang, place.descKey as CopyKey)}</p>
        {place.durationKey && <p className="text-[10px] text-navy/40 mb-2">{t(lang, place.durationKey as CopyKey)}</p>}

        <div className="border-t border-navy/8 pt-2 mt-1">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between text-xs font-medium text-navy/70 hover:text-navy min-h-10 py-1"
            aria-expanded={open}
            aria-controls={guideId}
          >
            <span>{t(lang, "guideToggle")}</span>
            {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {open && (
            <div id={guideId} className="pb-2 space-y-3 text-xs text-navy/65 leading-relaxed">
              <div>
                <p className="font-medium text-navy/80 mb-0.5">{t(lang, "guideHistory")}</p>
                <p>{t(lang, place.historyKey as CopyKey)}</p>
              </div>
              {place.seeDoKeys && place.seeDoKeys.length > 0 && (
                <div>
                  <p className="font-medium text-navy/80 mb-0.5">{t(lang, "guideSeeDo")}</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {place.seeDoKeys.map((k) => (
                      <li key={k}>{t(lang, k as CopyKey)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {place.detailKey && (
                <div>
                  <p className="font-medium text-navy/80 mb-0.5">{t(lang, "guideDetail")}</p>
                  <p>{t(lang, place.detailKey as CopyKey)}</p>
                </div>
              )}
              <div>
                <p className="font-medium text-navy/80 mb-0.5">{t(lang, "guideTip")}</p>
                <p>{t(lang, place.tipKey as CopyKey)}</p>
              </div>
              <div>
                <p className="font-medium text-navy/80 mb-0.5">{t(lang, "guideLogistics")}</p>
                <p>{t(lang, place.logisticsKey as CopyKey)}</p>
              </div>
              <div>
                <p className="font-medium text-navy/80 mb-0.5">{t(lang, "guideNearby")}</p>
                <p>{t(lang, place.nearbyKey as CopyKey)}</p>
              </div>
              {nearbyRests.length > 0 && (
                <div>
                  <p className="font-medium text-navy/80 mb-0.5">{t(lang, "gastroNear")}</p>
                  <ul className="space-y-0.5">
                    {nearbyRests.map((r) => (
                      <li key={r.id}>
                        {r.name}
                        {r.address ? ` — ${r.address}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {onMapFocus && (
            <button type="button" onClick={() => onMapFocus(place.id)} className="inline-flex items-center gap-1 text-xs text-navy/60 hover:text-navy min-h-10">
              <MapPin className="w-3 h-3" />
              {t(lang, "guideShowOnMap")}
            </button>
          )}
          {onToggleTour && (
            <button
              type="button"
              onClick={() => onToggleTour(place.id)}
              className={`inline-flex items-center gap-1 text-xs font-medium min-h-10 ${selected ? "text-gold" : "text-navy hover:text-gold"}`}
            >
              {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {selected ? t(lang, "guideRemoveTour") : t(lang, "guideAddTour")}
            </button>
          )}
          {place.officialUrl && (
            <a
              href={place.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-sky-action hover:text-navy min-h-10 inline-flex items-center"
            >
              {lang === "en" ? "Official site" : lang === "pt" ? "Site oficial" : "Sitio oficial"}
            </a>
          )}
          {place.ticketsUrl && (
            <a
              href={place.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-sky-action hover:text-navy min-h-10 inline-flex items-center"
            >
              {lang === "en" ? "Buy tickets" : lang === "pt" ? "Comprar ingressos" : "Comprar entradas"}
            </a>
          )}
          <button type="button" onClick={() => onSelect(place.id)} className="text-xs font-medium text-navy hover:text-gold transition-colors min-h-10">
            {t(lang, "placesCta")} →
          </button>
        </div>
      </div>
    </div>
  )
}

export function Places({
  lang,
  onSelect,
  onMapFocus,
  selectedPlaces,
  onToggleTour,
}: {
  lang: Lang
  onSelect: (placeId: PlaceId) => void
  onMapFocus?: (id: PlaceId) => void
  selectedPlaces?: PlaceId[]
  onToggleTour?: (id: PlaceId) => void
}) {
  return (
    <section id="imperdibles" className="py-16 sm:py-20 bg-cream-dark/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "placesLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-2">{t(lang, "placesTitle")}</h2>
        <p className="text-navy/60 text-sm mb-10 max-w-xl">{t(lang, "placesSubtitle")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLACES.map((place, i) => (
            <PlaceCard
              key={place.id}
              place={place}
              index={i}
              lang={lang}
              onSelect={onSelect}
              onMapFocus={onMapFocus}
              selected={selectedPlaces?.includes(place.id)}
              onToggleTour={onToggleTour}
            />
          ))}
        </div>
        <p className="mt-6 text-[10px] text-navy/35 leading-relaxed">{t(lang, "placesPhotoCreditFix")}</p>
      </div>
    </section>
  )
}

import { useState } from "react"
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

export function Experiences({ lang, onSelect }: { lang: Lang; onSelect: (interest: InterestId) => void }) {
  const cards: { interest: InterestId; label: CopyKey; title: CopyKey; desc: CopyKey; chips?: CopyKey[]; note?: CopyKey; img: string }[] = [
    { interest: "city", label: "expEssentialLabel", title: "expEssentialTitle", desc: "expEssentialDesc", img: EXP_IMAGES.city },
    { interest: "football", label: "expFootballLabel", title: "expFootballTitle", desc: "expFootballDesc", chips: ["chipBombonera", "chipMonumental", "chipMuseums"], note: "expFootballNote", img: EXP_IMAGES.football },
    { interest: "folklore", label: "expFolkloreLabel", title: "expFolkloreTitle", desc: "expFolkloreDesc", chips: ["chipTango", "chipPena", "chipAsado", "chipMate", "chipCampo"], img: EXP_IMAGES.folklore },
  ]
  return (
    <section id="experiencias" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "expLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-2">{t(lang, "expTitle")}</h2>
        <p className="text-navy/60 text-sm mb-10 max-w-xl">{t(lang, "expSubtitle")}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <article key={c.interest} className="ba-card bg-white rounded-2xl border border-navy/5 overflow-hidden flex flex-col">
              <div className="aspect-[16/10] overflow-hidden bg-navy/5">
                <img src={c.img} alt="" className="w-full h-full object-cover" loading="lazy" width={900} height={560} />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-1">{t(lang, c.label)}</p>
                <h3 className="font-display text-xl text-navy mb-2">{t(lang, c.title)}</h3>
                <p className="text-sm text-navy/60 leading-relaxed mb-3 flex-1">{t(lang, c.desc)}</p>
                {c.chips && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {c.chips.map((ch) => (
                      <span key={ch} className="text-xs rounded-full bg-cream px-2.5 py-0.5 text-navy/70">{t(lang, ch)}</span>
                    ))}
                  </div>
                )}
                {c.note && <p className="text-xs text-navy/40 mb-3">{t(lang, c.note)}</p>}
                <button type="button" onClick={() => onSelect(c.interest)} className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors mt-auto min-h-11">
                  {t(lang, "expCta")} <span aria-hidden>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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
        <p className="text-navy/60 text-sm mb-10">{t(lang, "placesSubtitle")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLACES.map((place, i) => (
            <div key={place.id} id={`place-${place.id}`} className="ba-card bg-white rounded-xl border border-navy/5 overflow-hidden flex flex-col">
              <div className="aspect-video relative bg-navy/10">
                {place.image && (
                  <img src={place.image} alt={t(lang, (place.imageAltKey || place.nameKey) as CopyKey)} className="w-full h-full object-cover" loading="lazy" width={640} height={360} />
                )}
                <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-navy/90 text-white text-xs font-medium flex items-center justify-center">{i + 1}</span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-medium text-navy text-sm mb-1">{t(lang, place.nameKey as CopyKey)}</h3>
                <p className="text-xs text-navy/55 leading-relaxed flex-1 mb-2">{t(lang, place.descKey as CopyKey)}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {onMapFocus && (
                    <button type="button" onClick={() => onMapFocus(place.id)} className="inline-flex items-center gap-1 text-xs text-navy/60 hover:text-navy min-h-10">
                      <MapPin className="w-3 h-3" />{t(lang, "guideShowOnMap")}
                    </button>
                  )}
                  {onToggleTour && (
                    <button type="button" onClick={() => onToggleTour(place.id)} className={`inline-flex items-center gap-1 text-xs font-medium min-h-10 ${selectedPlaces?.includes(place.id) ? "text-gold" : "text-navy hover:text-gold"}`}>
                      {selectedPlaces?.includes(place.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {selectedPlaces?.includes(place.id) ? t(lang, "guideRemoveTour") : t(lang, "guideAddTour")}
                    </button>
                  )}
                  <button type="button" onClick={() => onSelect(place.id)} className="text-xs font-medium text-navy hover:text-gold transition-colors min-h-10">
                    {t(lang, "placesCta")} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[10px] text-navy/35 leading-relaxed">{t(lang, "placesPhotoCredit")}</p>
      </div>
    </section>
  )
}

export function Gastronomy({
  lang,
  onSelect,
  selectedRestaurants,
  onToggleRestaurant,
}: {
  lang: Lang
  onSelect: () => void
  selectedRestaurants?: RestaurantId[]
  onToggleRestaurant?: (id: RestaurantId) => void
}) {
  return (
    <section id="gastronomia" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-navy/5">
            <img src={EXP_IMAGES.gastro} alt="" className="w-full h-full object-cover" loading="lazy" width={900} height={675} />
          </div>
          <div>
            <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "gastroLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-navy mb-4">{t(lang, "gastroTitle")}</h2>
            <p className="text-navy/60 text-sm leading-relaxed mb-5">{t(lang, "gastroDesc")}</p>
            <ul className="space-y-2 text-sm text-navy/70 mb-5">
              <li>• {t(lang, "gastroParrilla")}</li>
              <li>• {t(lang, "gastroCafe")}</li>
              <li>• {t(lang, "gastroEmpanadas")}</li>
            </ul>
            <p className="text-xs text-navy/40 mb-5">{t(lang, "gastroNote")}</p>
            <button type="button" onClick={onSelect} className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors min-h-11">
              {t(lang, "gastroCta")} <span aria-hidden>→</span>
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESTAURANTS.map((r) => (
            <div key={r.id} className="ba-card bg-white rounded-xl border border-navy/5 p-4">
              <h3 className="font-medium text-navy text-sm mb-1">{r.name}</h3>
              <p className="text-[10px] text-navy/40 mb-1">{t(lang, r.categoryKey as CopyKey)}</p>
              <p className="text-xs text-navy/55 mb-2">{r.address}</p>
              {onToggleRestaurant && (
                <button type="button" onClick={() => onToggleRestaurant(r.id)} className="text-xs font-medium text-navy hover:text-gold min-h-10">
                  {selectedRestaurants?.includes(r.id) ? t(lang, "guideRemoveTour") : t(lang, "guideAddTour")}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

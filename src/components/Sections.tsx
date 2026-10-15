import { Plane, Car, Map } from "lucide-react"
import { PLACES, type ServiceId, type InterestId, type PlaceId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"

export function HowItWorks({ lang }: { lang: Lang }) {
  const steps = [
    { n: "01", title: "howStep1Title" as CopyKey, desc: "howStep1Desc" as CopyKey },
    { n: "02", title: "howStep2Title" as CopyKey, desc: "howStep2Desc" as CopyKey },
    { n: "03", title: "howStep3Title" as CopyKey, desc: "howStep3Desc" as CopyKey },
  ]
  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-navy/40 text-xs tracking-[0.2em] uppercase mb-3">{t(lang, "howLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center text-navy mb-12">{t(lang, "howTitle")}</h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((s) => (
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
            <div key={item.id} className="bg-cream rounded-2xl border border-navy/5 p-6 flex flex-col">
              <item.icon className="w-6 h-6 text-navy/40 mb-4" />
              <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-1">{t(lang, item.label)}</p>
              <h3 className="font-display text-xl text-navy mb-2">{t(lang, item.title)}</h3>
              <p className="text-sm text-navy/60 leading-relaxed flex-1 mb-5">{t(lang, item.desc)}</p>
              <button type="button" onClick={() => onEnquire(item.id)} className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors">
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
          <button type="button" onClick={onEnquire} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium px-5 py-3 rounded-lg transition-colors">
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
    { interest: "city", label: "expEssentialLabel", title: "expEssentialTitle", desc: "expEssentialDesc", img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80" },
    { interest: "football", label: "expFootballLabel", title: "expFootballTitle", desc: "expFootballDesc", chips: ["chipBombonera", "chipMonumental", "chipMuseums"], note: "expFootballNote", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80" },
    { interest: "folklore", label: "expFolkloreLabel", title: "expFolkloreTitle", desc: "expFolkloreDesc", chips: ["chipTango", "chipPena", "chipAsado", "chipMate", "chipCampo"], img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80" },
  ]
  return (
    <section id="experiencias" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "expLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-2">{t(lang, "expTitle")}</h2>
        <p className="text-navy/60 text-sm mb-10 max-w-xl">{t(lang, "expSubtitle")}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <article key={c.interest} className="bg-white rounded-2xl border border-navy/5 overflow-hidden flex flex-col">
              <div className="aspect-[16/10] overflow-hidden bg-navy/5">
                <img src={c.img} alt="" className="w-full h-full object-cover" loading="lazy" />
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
                <button type="button" onClick={() => onSelect(c.interest)} className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors mt-auto">
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

export function Places({ lang, onSelect }: { lang: Lang; onSelect: (placeId: PlaceId) => void }) {
  return (
    <section id="imperdibles" className="py-16 sm:py-20 bg-cream-dark/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "placesLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-2">{t(lang, "placesTitle")}</h2>
        <p className="text-navy/60 text-sm mb-10">{t(lang, "placesSubtitle")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLACES.map((place) => (
            <div key={place.id} className="bg-white rounded-xl border border-navy/5 p-4 flex flex-col">
              <div className="aspect-video rounded-lg bg-navy/10 mb-3 flex items-center justify-center">
                <span className="font-display text-navy/30 text-sm px-2 text-center">{t(lang, place.nameKey as CopyKey)}</span>
              </div>
              <h3 className="font-medium text-navy text-sm mb-1">{t(lang, place.nameKey as CopyKey)}</h3>
              <p className="text-xs text-navy/55 leading-relaxed flex-1 mb-2">{t(lang, place.descKey as CopyKey)}</p>
              {place.durationKey && (
                <p className="text-[10px] text-navy/40 mb-2">{t(lang, place.durationKey as CopyKey)}</p>
              )}
              <button type="button" onClick={() => onSelect(place.id)} className="text-xs font-medium text-navy hover:text-gold transition-colors text-left">
                {t(lang, "placesCta")} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Gastronomy({ lang, onSelect }: { lang: Lang; onSelect: () => void }) {
  return (
    <section id="gastronomia" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-navy/5">
          <img src="https://images.unsplash.com/photo-1555935062-eca2db5e2c60?auto=format&fit=crop&w=900&q=80" alt="" className="w-full h-full object-cover" loading="lazy" />
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
          <button type="button" onClick={onSelect} className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors">
            {t(lang, "gastroCta")} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

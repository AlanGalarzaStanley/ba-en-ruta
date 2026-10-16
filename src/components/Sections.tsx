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
  const steps = [
    { n: "01", title: "howStep1Title" as CopyKey, desc: "howStep1Desc" as CopyKey },
    { n: "02", title: "howStep2Title" as CopyKey, desc: "howStep2Desc" as CopyKey },
    { n: "03", title: "howStep3Title" as CopyKey, desc: "howStep3Desc" as CopyKey },
  ]
  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-navy/40 text-xs tracking-[0.2em] uppercase mb-3">{t(lang, "howLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-center text-navy mb-4">{t(lang, "howTitle")}</h2>
        <div className="ba-accent-line max-w-xs mx-auto mb-12" aria-hidden />
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

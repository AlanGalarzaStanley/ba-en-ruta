import { useState, useEffect } from "react"
import { MessageCircle, ChevronUp, ChevronDown } from "lucide-react"
import { CONTACT_EMAIL, YOUTUBE_CHANNEL, SERVICES, INTERESTS, PLACES, type ServiceId, type InterestId, type PlaceId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { buildWhatsAppMessage, openWhatsApp } from "../lib/whatsapp"

export function EnquiryForm({
  lang,
  initialService,
  initialInterests,
  initialPlace,
}: {
  lang: Lang
  initialService: ServiceId | ""
  initialInterests: InterestId[]
  initialPlace: PlaceId | null
}) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [service, setService] = useState<ServiceId | "">(initialService)
  const [interests, setInterests] = useState<InterestId[]>(initialInterests)
  const [place, setPlace] = useState<PlaceId | null>(initialPlace)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (initialService) setService(initialService)
  }, [initialService])
  useEffect(() => {
    if (initialInterests.length) setInterests(initialInterests)
  }, [initialInterests])
  useEffect(() => {
    if (initialPlace) setPlace(initialPlace)
  }, [initialPlace])

  const toggleInterest = (id: InterestId) => {
    setInterests((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setPreview(null)
    if (!name.trim() || !date || !service) {
      setError(t(lang, "formErrorRequired"))
      return
    }
    const msg = buildWhatsAppMessage({
      name: name.trim(),
      date,
      passengers,
      service,
      interests,
      place,
      message,
      lang,
    })
    const { opened } = openWhatsApp(msg)
    if (!opened) setPreview(msg)
  }

  return (
    <section id="reserva" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-navy/65 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "formLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-navy mb-3">{t(lang, "formTitle")}</h2>
            <p className="text-navy/60 text-sm leading-relaxed mb-6">{t(lang, "formSubtitle")}</p>
            <p className="text-amber-700 italic font-display text-sm">{t(lang, "heroTagline")}</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-navy/5 p-6 sm:p-8 space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">{t(lang, "formName")} *</label>
                <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={t(lang, "formNamePh")} className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2.5 text-sm text-navy placeholder:text-navy/50 focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-navy mb-1.5">{t(lang, "formDate")} *</label>
                <input id="date" name="date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2.5 text-sm text-navy focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium text-navy mb-1.5">{t(lang, "formPassengers")} *</label>
                <input id="passengers" name="passengers" type="number" min={1} max={20} required value={passengers} onChange={(e) => setPassengers(Number(e.target.value) || 1)} className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2.5 text-sm text-navy focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-navy mb-1.5">{t(lang, "formService")} *</label>
                <select id="service" name="service" required value={service} onChange={(e) => setService(e.target.value as ServiceId | "")} className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2.5 text-sm text-navy focus:border-gold focus:ring-1 focus:ring-gold outline-none">
                  <option value="">{t(lang, "formServicePh")}</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{t(lang, s.key as CopyKey)}</option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset>
              <legend className="block text-sm font-medium text-navy mb-2">{t(lang, "formInterests")}</legend>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((item) => (
                  <label key={item.id} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm cursor-pointer transition-colors ${interests.includes(item.id) ? "border-gold bg-gold/10 text-navy" : "border-navy/15 text-navy/70 hover:border-navy/30"}`}>
                    <input type="checkbox" className="sr-only" checked={interests.includes(item.id)} onChange={() => toggleInterest(item.id)} />
                    {t(lang, item.key as CopyKey)}
                  </label>
                ))}
              </div>
            </fieldset>
            {place && (
              <p className="text-xs text-navy/65">
                {t(lang, "navPlaces")}:{" "}
                <strong>
                  {(() => {
                    const p = PLACES.find((x) => x.id === place)
                    return p ? t(lang, p.nameKey as CopyKey) : place
                  })()}
                </strong>
                <button type="button" className="ml-2 underline" onClick={() => setPlace(null)} aria-label="Remove">
                  ×
                </button>
              </p>
            )}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">{t(lang, "formMessage")}</label>
              <textarea id="message" name="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t(lang, "formMessagePh")} className="w-full rounded-lg border border-navy/15 bg-cream/50 px-3 py-2.5 text-sm text-navy placeholder:text-navy/50 focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-y" />
            </div>
            {error && <p className="text-sm text-red-700">{error}</p>}
            {preview && (
              <div className="rounded-lg bg-cream border border-navy/10 p-4 text-sm">
                <p className="font-medium text-navy mb-2">{t(lang, "formNoWhatsApp")}</p>
                <pre className="whitespace-pre-wrap text-navy/70 text-xs mb-3">{preview}</pre>
                <button type="button" className="text-sm font-medium text-navy underline" onClick={() => navigator.clipboard?.writeText(preview)}>
                  {t(lang, "copyMessage")}
                </button>
              </div>
            )}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium py-3 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" />{t(lang, "formSubmit")}<span aria-hidden>→</span>
            </button>
            <p className="text-center text-xs text-navy/65">{t(lang, "formPrivacy")}</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export function FAQ({ lang }: { lang: Lang }) {
  const items = [
    { q: "faq1q" as CopyKey, a: "faq1a" as CopyKey },
    { q: "faq2q" as CopyKey, a: "faq2a" as CopyKey },
    { q: "faq3q" as CopyKey, a: "faq3a" as CopyKey },
    { q: "faq4q" as CopyKey, a: "faq4a" as CopyKey },
    { q: "faq5q" as CopyKey, a: "faq5a" as CopyKey },
    { q: "faq6q" as CopyKey, a: "faq6a" as CopyKey },
    { q: "faq7q" as CopyKey, a: "faq7a" as CopyKey },
    { q: "faq8q" as CopyKey, a: "faq8a" as CopyKey },
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-16 sm:py-20 bg-cream-dark/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-navy/65 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "faqLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-navy">{t(lang, "faqTitle")}</h2>
          </div>
          <div>
            {items.map((item, i) => (
              <div key={item.q} className="border-b border-navy/10">
                <button type="button" className="w-full flex items-center justify-between py-4 text-left text-navy font-medium text-sm sm:text-base" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  {t(lang, item.q)}
                  {open === i ? <ChevronUp className="w-4 h-4 shrink-0 text-navy/65" /> : <ChevronDown className="w-4 h-4 shrink-0 text-navy/65" />}
                </button>
                {open === i && <p className="pb-4 text-sm text-navy/60 leading-relaxed pr-8">{t(lang, item.a)}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer({ lang, onNav }: { lang: Lang; onNav: (id: string) => void }) {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-xl font-semibold">BA</span>
              <span className="h-4 w-px bg-white/20" />
              <span className="text-sm">en Ruta<span className="block text-[10px] uppercase tracking-widest text-white/55">Buenos Aires</span></span>
            </div>
            <p className="text-white/50 text-sm italic font-display mb-2">{t(lang, "footerTagline")}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-white/60 hover:text-gold transition-colors">{CONTACT_EMAIL}</a>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            {([["como-funciona", "navHow"], ["quien", "aboutLabel"], ["servicios", "navServices"], ["paquetes", "packsLabel"], ["experiencias", "navExperiences"], ["gastronomia", "navGastronomy"], ["imperdibles", "navPlaces"], ["mapa", "mapLabel"], ["mi-qr", "navQr"], ["precios", "navPrices"], ["faq", "navFaq"]] as const).map(([id, key]) => (
              <button key={id} type="button" onClick={() => onNav(id)} className="hover:text-white transition-colors">{t(lang, key)}</button>
            ))}
            <button type="button" onClick={() => onNav("reserva")} className="hover:text-white transition-colors">{t(lang, "navCta")} →</button>
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/55">
          <p>{t(lang, "footerRights")}</p>
          <p>{t(lang, "footerRole")}</p>
          <div className="flex items-center gap-4">
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{t(lang, "footerVideos")}</a>
            <button type="button" onClick={() => onNav("inicio")} className="hover:text-white">{t(lang, "footerTop")} ↑</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

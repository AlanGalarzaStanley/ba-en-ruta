import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { CONTACT_EMAIL, YOUTUBE_CHANNEL } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"

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
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-12 sm:py-16 bg-cream-dark/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-navy/65 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "faqLabel")}</p>
            <h2 className="font-display text-2xl sm:text-3xl text-navy">{t(lang, "faqTitle")}</h2>
          </div>
          <div>
            {items.map((item, i) => (
              <div key={item.q} className="border-b border-navy/10">
                <button type="button" className="w-full flex items-center justify-between py-3.5 text-left text-navy font-medium text-sm sm:text-base" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  {t(lang, item.q)}
                  {open === i ? <ChevronUp className="w-4 h-4 shrink-0 text-navy/65" /> : <ChevronDown className="w-4 h-4 shrink-0 text-navy/65" />}
                </button>
                {open === i && <p className="pb-3.5 text-sm text-navy/60 leading-relaxed pr-8">{t(lang, item.a)}</p>}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
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
            <button type="button" onClick={() => onNav("recorridos")} className="hover:text-white transition-colors">{t(lang, "heroCtaLive")}</button>
            <button type="button" onClick={() => onNav("quien")} className="hover:text-white transition-colors">{t(lang, "aboutLabel")}</button>
            <button type="button" onClick={() => onNav("faq")} className="hover:text-white transition-colors">{t(lang, "navFaq")}</button>
          </nav>
        </div>
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/55">
          <p>{t(lang, "footerRights")}</p>
          <div className="flex items-center gap-4">
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{t(lang, "footerVideos")}</a>
            <button type="button" onClick={() => onNav("inicio")} className="hover:text-white">{t(lang, "footerTop")} ↑</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

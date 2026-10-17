import { useEffect, useState, useCallback } from "react"
import { MessageCircle, ChevronDown, Menu, X } from "lucide-react"
import { HERO_IMAGE } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"

function detectBrowserLang(): Lang {
  try {
    const list = navigator.languages?.length ? navigator.languages : [navigator.language]
    for (const raw of list) {
      const code = (raw || "").toLowerCase()
      if (code.startsWith("pt")) return "pt"
      if (code.startsWith("en")) return "en"
      if (code.startsWith("es")) return "es"
    }
  } catch { /* ignore */ }
  return "es"
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem("ba-lang") as Lang | null
      if (stored === "es" || stored === "en" || stored === "pt") return stored
    } catch { /* ignore */ }
    return detectBrowserLang()
  })
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem("ba-lang", l) } catch { /* ignore */ }
    document.documentElement.lang = l === "pt" ? "pt-BR" : l
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang
    try {
      document.title = t(lang, "siteTitle")
      const desc = t(lang, "siteDescription")
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute("content", desc)
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute("content", t(lang, "siteTitle"))
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute("content", desc)
    } catch { /* ignore */ }
  }, [lang])
  return [lang, setLang]
}

export function Header({
  lang,
  setLang,
  onNav,
  tenantName,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  onNav: (id: string) => void
  tenantName?: string
}) {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const nav = [
    { id: "servicios", key: "navServices" as CopyKey },
    { id: "imperdibles", key: "navPlaces" as CopyKey },
    { id: "mapa", key: "mapLabel" as CopyKey },
    { id: "gastronomia", key: "navGastronomy" as CopyKey },
    { id: "reserva", key: "navCta" as CopyKey },
  ]
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-navy/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
        <button type="button" onClick={() => onNav("inicio")} className="flex items-center gap-2" aria-label={tenantName || "BA en Ruta"}>
          <span className="font-display text-2xl font-semibold text-navy tracking-tight">BA</span>
          <span className="h-5 w-px bg-navy/20" />
          <span className="text-left leading-tight">
            <span className="block text-sm font-medium text-navy">{tenantName || "en Ruta"}</span>
            <span className="block text-[10px] uppercase tracking-widest text-navy/50">Buenos Aires</span>
          </span>
        </button>
        <nav className="hidden lg:flex items-center gap-5 text-sm text-navy/80">
          {nav.map((item) => (
            <button key={item.id} type="button" onClick={() => onNav(item.id)} className="hover:text-navy transition-colors whitespace-nowrap">{t(lang, item.key)}</button>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button type="button" onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1 text-sm font-medium text-navy/70 hover:text-navy px-2 py-1.5 rounded-md" aria-haspopup="listbox" aria-expanded={langOpen}>
              <span className="sr-only">Language</span>
              {lang === "es" ? "ES" : lang === "en" ? "EN" : "PT"}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {langOpen && (
              <ul role="listbox" className="absolute right-0 top-full mt-1 bg-white border border-navy/10 rounded-lg shadow-lg py-1 min-w-[4.5rem] z-50">
                {(["es", "en", "pt"] as Lang[]).map((l) => (
                  <li key={l}>
                    <button type="button" role="option" aria-selected={lang === l} className={`w-full text-left px-3 py-1.5 text-sm ${lang === l ? "bg-cream font-medium text-navy" : "text-navy/70 hover:bg-cream"}`} onClick={() => { setLang(l); setLangOpen(false) }}>
                      {l === "es" ? "ES" : l === "en" ? "EN" : "PT"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" onClick={() => onNav("reserva")} className="hidden sm:inline-flex items-center gap-1.5 bg-gold hover:bg-gold-light text-navy font-medium text-sm px-4 py-2 rounded-lg transition-colors">
            {t(lang, "navCta")} <span aria-hidden>→</span>
          </button>
          <button type="button" className="lg:hidden p-2 text-navy" onClick={() => setOpen((v) => !v)} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-navy/5 bg-cream px-4 py-4 space-y-1">
          {nav.map((item) => (
            <button key={item.id} type="button" onClick={() => { onNav(item.id); setOpen(false) }} className="block w-full text-left py-2.5 text-navy/80 hover:text-navy font-medium">{t(lang, item.key)}</button>
          ))}
        </div>
      )}
    </header>
  )
}

export function Hero({ lang, onNav }: { lang: Lang; onNav: (id: string) => void }) {
  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-end">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Obelisco de Buenos Aires al atardecer" className="w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/30" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 pt-32">
        <p className="text-gold/90 text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 font-medium">— {t(lang, "heroBadge")}</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] max-w-3xl">
          {t(lang, "heroTitle1")}<br /><em className="text-gold not-italic font-medium">{t(lang, "heroTitle2")}</em>
        </h1>
        <p className="mt-5 text-white/85 text-base sm:text-lg max-w-xl leading-relaxed">{t(lang, "heroSubtitle")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => onNav("reserva")} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium px-5 py-3 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4" />{t(lang, "heroCtaWhatsApp")}<span aria-hidden>→</span>
          </button>
          <button type="button" onClick={() => onNav("imperdibles")} className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium px-5 py-3">
            {t(lang, "heroCtaExperiences")}<span aria-hidden>→</span>
          </button>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white/60 text-sm">
          <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gold" />{t(lang, "heroLocation")}</p>
          <p className="italic font-display text-white/70">{t(lang, "heroTagline")}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-cream/95 backdrop-blur border-t border-navy/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-navy/70">
          <p className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-gold shrink-0" />{t(lang, "valueDirect")}</p>
          <p className="flex items-center gap-2"><span className="text-gold">◇</span>{t(lang, "valueCustom")}</p>
          <p className="flex items-center gap-2"><span className="text-sky">○</span>{t(lang, "valueLocal")}</p>
        </div>
      </div>
    </section>
  )
}

export function Passion({ lang }: { lang: Lang }) {
  return (
    <section className="bg-navy text-white py-14 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">{t(lang, "passionLabel")}</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-snug">{t(lang, "passionTitle")}</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
          <span>{t(lang, "passionStadiums")}</span><span className="hidden sm:inline">·</span>
          <span>{t(lang, "passionFire")}</span><span className="hidden sm:inline">·</span>
          <span>{t(lang, "passionTango")}</span>
        </div>
      </div>
    </section>
  )
}

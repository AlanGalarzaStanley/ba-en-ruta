import { useEffect, useState, useCallback } from "react"
import { MessageCircle, ChevronDown, Menu, X, Play } from "lucide-react"
import { HERO_IMAGE, PLACES } from "../lib/ba-config"
import { commonsUrl } from "../lib/media"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { optimizeImage, imageSrcSet } from "../lib/img"
import { heroLocal } from "../lib/hero-images"

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
      // Un enlace compartido con ?lang= manda sobre la preferencia guardada.
      const fromUrl = new URLSearchParams(window.location.search).get("lang")
      if (fromUrl === "es" || fromUrl === "en" || fromUrl === "pt") return fromUrl
      const stored = localStorage.getItem("ba-lang") as Lang | null
      if (stored === "es" || stored === "en" || stored === "pt") return stored
    } catch { /* ignore */ }
    return detectBrowserLang()
  })
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem("ba-lang", l) } catch { /* ignore */ }
    try {
      const u = new URL(window.location.href)
      if (u.searchParams.has("lang")) {
        u.searchParams.set("lang", l)
        window.history.replaceState(null, "", u)
      }
    } catch { /* ignore */ }
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
      const ogLocale = document.querySelector('meta[property="og:locale"]')
      if (ogLocale) ogLocale.setAttribute("content", lang === "pt" ? "pt_BR" : lang === "en" ? "en_US" : "es_AR")
      // Canonical coherente con hreflang: cada idioma explícito (?lang=) apunta a sí mismo.
      const canonical = document.querySelector('link[rel="canonical"]')
      const hasLang = new URLSearchParams(window.location.search).has("lang")
      if (canonical) canonical.setAttribute("href", hasLang ? `https://ba-en-ruta.vercel.app/?lang=${lang}` : "https://ba-en-ruta.vercel.app/")
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
    { id: "recorridos", key: "heroCtaLive" as CopyKey },
    { id: "servicios", key: "navServices" as CopyKey },
    { id: "imperdibles", key: "navPlaces" as CopyKey },
    { id: "mapa", key: "mapLabel" as CopyKey },
    { id: "gastronomia", key: "navGastronomy" as CopyKey },
    { id: "reserva", key: "navCta" as CopyKey },
  ]
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-navy/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
        <button type="button" onClick={() => onNav("inicio")} className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold text-navy tracking-tight">BA</span>
          <span className="h-5 w-px bg-navy/20" />
          <span className="text-left leading-tight">
            <span className="block text-sm font-medium text-navy">{tenantName || "en Ruta"}</span>
            <span className="block text-[10px] uppercase tracking-widest text-navy/65">Buenos Aires</span>
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

const HERO_SLIDES: { src: string; srcSet?: string; placeId?: string; credit: string }[] = [
  { src: HERO_IMAGE, credit: "Pexels", ...(heroLocal("obelisco-pexels") ?? {}) },
  ...PLACES.filter((p) => p.photos?.length).map((p) => ({
    src: commonsUrl(p.photos![0].file, 1920),
    ...(heroLocal(p.id) ?? {}),
    placeId: p.id,
    credit: p.photos![0].credit,
  })),
]
const slideSrc = (s: (typeof HERO_SLIDES)[number]) => (s.srcSet ? s.src : optimizeImage(s.src, 1280))
const slideSrcSet = (s: (typeof HERO_SLIDES)[number]) => s.srcSet ?? imageSrcSet(s.src, [500, 960, 1280, 1920])

export function Hero({ lang, onNav }: { lang: Lang; onNav: (id: string) => void }) {
  const [i, setI] = useState(0)
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setI((n) => (n + 1) % HERO_SLIDES.length), 6500)
    return () => window.clearInterval(id)
  }, [reduce])
  useEffect(() => {
    const next = HERO_SLIDES[(i + 1) % HERO_SLIDES.length]
    const im = new Image()
    im.sizes = "100vw"
    im.srcset = slideSrcSet(next) ?? ""
    im.src = slideSrc(next) ?? next.src
  }, [i])
  const slide = HERO_SLIDES[i]
  const place = slide.placeId ? PLACES.find((p) => p.id === slide.placeId) : null
  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-end overflow-hidden bg-navy">
      <div className="absolute inset-0" aria-hidden>
        {HERO_SLIDES.map((s, n) => (
          <img
            key={s.src}
            src={n === 0 || Math.abs(n - i) <= 1 || n === (i + 1) % HERO_SLIDES.length ? slideSrc(s) : undefined}
            srcSet={n === 0 || Math.abs(n - i) <= 1 || n === (i + 1) % HERO_SLIDES.length ? slideSrcSet(s) : undefined}
            sizes="100vw"
            decoding="async"
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
              n === i ? "opacity-100" : "opacity-0"
            } ${n === i && !reduce ? "ba-kenburns" : ""}`}
            fetchPriority={n === 0 ? "high" : "low"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-44 sm:pb-28 pt-32">
        <p className="text-gold/90 text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 font-medium">— {t(lang, "heroBadge")}</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] max-w-3xl">
          {t(lang, "heroTitle1")}<br /><em className="text-gold not-italic font-medium">{t(lang, "heroTitle2")}</em>
        </h1>
        <p className="mt-5 text-white/85 text-base sm:text-lg max-w-xl leading-relaxed">{t(lang, "heroSubtitle")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => onNav("recorridos")} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium px-5 py-3 rounded-lg transition-colors min-h-11">
            <Play className="w-4 h-4 fill-current" />{t(lang, "heroCtaLive")}<span aria-hidden>→</span>
          </button>
          <button type="button" onClick={() => onNav("reserva")} className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium px-5 py-3 rounded-lg transition-colors min-h-11">
            <MessageCircle className="w-4 h-4" />{t(lang, "heroCtaWhatsApp")}
          </button>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white/60 text-sm">
          <p className="flex items-center gap-2" aria-live="polite">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {place ? (
              <span>
                <span className="text-white/55 uppercase tracking-widest text-[10px] mr-2">{t(lang, "heroNow")}</span>
                <span className="text-white/85">{t(lang, place.nameKey as CopyKey)}</span>
              </span>
            ) : (
              t(lang, "heroLocation")
            )}
          </p>
          <div className="flex items-center gap-1.5" aria-hidden>
            {HERO_SLIDES.map((s, n) => (
              <span key={s.src} className={`h-1 rounded-full transition-all duration-500 ${n === i ? "w-6 bg-gold" : "w-1.5 bg-white/35"}`} />
            ))}
          </div>
        </div>
        <p className="mt-3 text-[10px] text-white/55">{t(lang, "photoBy")}: {slide.credit}{slide.placeId ? " · Wikimedia Commons" : ""}</p>
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

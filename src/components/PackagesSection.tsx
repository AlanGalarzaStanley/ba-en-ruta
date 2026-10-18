import { Plane, Clock, Map, Landmark, Camera, Utensils, Trophy, Waves } from "lucide-react"
import type { Lang, CopyKey } from "../lib/ba-copy"
import { t } from "../lib/ba-copy"
import { PACKAGES, type PackageDef, type PackageId } from "../lib/packages"
import { openWhatsAppPackage, openWhatsAppAbout } from "../lib/whatsapp"

const ICONS: Record<PackageId, typeof Plane> = {
  tr: Plane,
  tour4: Map,
  tour8: Map,
  horas: Clock,
  hist: Landmark,
  clas: Camera,
  gast: Utensils,
  fut: Trophy,
  tig: Waves,
}

function PackageCard({ lang, pack }: { lang: Lang; pack: PackageDef }) {
  const Icon = ICONS[pack.id]
  return (
    <article className="ba-card bg-cream rounded-2xl border border-navy/5 p-5 sm:p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Icon className="w-6 h-6 text-sky shrink-0" aria-hidden />
        <span className="text-[10px] font-mono uppercase tracking-wider text-navy/45">{pack.code}</span>
      </div>
      <h3 className="font-display text-lg sm:text-xl text-navy mb-2">{t(lang, pack.titleKey as CopyKey)}</h3>
      <p className="text-sm text-navy/60 leading-relaxed mb-4 flex-1">{t(lang, pack.descKey as CopyKey)}</p>
      <dl className="text-xs text-navy/70 space-y-1.5 mb-4">
        <div className="flex gap-2">
          <dt className="font-medium shrink-0">{t(lang, "packsDuration")}:</dt>
          <dd>{t(lang, pack.durationKey as CopyKey)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium shrink-0">{t(lang, "packsIdeal")}:</dt>
          <dd>{t(lang, pack.idealKey as CopyKey)}</dd>
        </div>
      </dl>
      <div className="grid sm:grid-cols-2 gap-3 text-xs mb-5">
        <div>
          <p className="font-medium text-navy mb-1">{t(lang, "packsIncludes")}</p>
          <ul className="list-disc pl-4 text-navy/60 space-y-0.5">
            {pack.includeKeys.map((k) => (
              <li key={k}>{t(lang, k as CopyKey)}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-navy mb-1">{t(lang, "packsExcludes")}</p>
          <ul className="list-disc pl-4 text-navy/60 space-y-0.5">
            {pack.excludeKeys.map((k) => (
              <li key={k}>{t(lang, k as CopyKey)}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        onClick={() => openWhatsAppPackage(lang, pack)}
        className="mt-auto inline-flex items-center justify-center gap-1 text-sm font-medium text-navy hover:text-gold transition-colors min-h-11 rounded-lg border border-navy/10 hover:border-gold/40 px-3"
      >
        {t(lang, "packsCta")} <span aria-hidden>→</span>
      </button>
    </article>
  )
}

export function AboutDriver({ lang }: { lang: Lang }) {
  return (
    <section id="quien" className="py-14 sm:py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-navy/10 bg-white/80 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <p className="text-navy/65 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "aboutLabel")}</p>
            <h2 className="font-display text-2xl sm:text-3xl text-navy mb-3">{t(lang, "aboutTitle")}</h2>
            <p className="text-navy/70 text-sm sm:text-base leading-relaxed mb-3">{t(lang, "aboutBody")}</p>
            <p className="text-navy/55 text-xs sm:text-sm">{t(lang, "aboutLangs")}</p>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openWhatsAppAbout(lang)}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium px-5 py-3 rounded-lg transition-colors min-h-11"
            >
              {t(lang, "aboutCta")} <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Packages({ lang }: { lang: Lang }) {
  const core = PACKAGES.filter((p) => p.group === "core")
  const theme = PACKAGES.filter((p) => p.group === "theme")
  return (
    <section id="paquetes" className="py-16 sm:py-20 bg-cream-dark/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="text-navy/65 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "packsLabel")}</p>
          <h2 className="font-display text-3xl sm:text-4xl text-navy mb-3">{t(lang, "packsTitle")}</h2>
          <p className="text-sm text-navy/65 leading-relaxed">{t(lang, "packsSubtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {core.map((p) => (
            <PackageCard key={p.id} lang={lang} pack={p} />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {theme.map((p) => (
            <PackageCard key={p.id} lang={lang} pack={p} />
          ))}
        </div>
        <p className="mt-8 text-xs text-navy/50 max-w-xl">{t(lang, "packsNote")}</p>
      </div>
    </section>
  )
}

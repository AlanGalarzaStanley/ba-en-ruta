import { useState, useEffect, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  List,
  X,
  Check,
} from "lucide-react"
import {
  EXPERIENCES,
  getExperience,
  externalMapUrl,
  type ExperienceId,
  type GuidedExperience,
} from "../lib/experiences"
import { PLACES, type PlaceId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { buildExperienceWhatsAppMessage, openWhatsApp } from "../lib/whatsapp"

function progressLabel(lang: Lang, n: number, total: number): string {
  return t(lang, "guidedProgress" as CopyKey)
    .replace("{n}", String(n))
    .replace("{total}", String(total))
}

function ExperienceCard({
  exp,
  lang,
  onStart,
}: {
  exp: GuidedExperience
  lang: Lang
  onStart: (id: ExperienceId) => void
}) {
  return (
    <article className="ba-card bg-white rounded-2xl border border-navy/5 overflow-hidden flex flex-col">
      <div className="aspect-[16/10] overflow-hidden bg-navy/5">
        <img
          src={exp.image}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          width={900}
          height={560}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        {exp.featured && (
          <p className="text-[10px] uppercase tracking-widest text-gold mb-1">
            {t(lang, "guidedLabel" as CopyKey)}
          </p>
        )}
        <h3 className="font-display text-xl text-navy mb-1">
          {t(lang, exp.nameKey as CopyKey)}
        </h3>
        <p className="text-xs text-navy/50 mb-2">{t(lang, exp.subtitleKey as CopyKey)}</p>
        <p className="text-sm text-navy/60 leading-relaxed mb-3 flex-1">
          {t(lang, exp.introKey as CopyKey)}
        </p>
        <p className="text-[11px] text-navy/40 mb-3">{t(lang, exp.durationKey as CopyKey)}</p>
        <p className="text-[11px] text-navy/45 mb-4">
          {exp.stops.length} {lang === "en" ? "stops" : lang === "pt" ? "paradas" : "paradas"}
        </p>
        <button
          type="button"
          onClick={() => onStart(exp.id)}
          className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors min-h-11"
        >
          {t(lang, "guidedStart" as CopyKey)}
          <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  )
}

function Player({
  exp,
  lang,
  onClose,
  onSelectPlace,
}: {
  exp: GuidedExperience
  lang: Lang
  onClose: () => void
  onSelectPlace?: (id: PlaceId) => void
}) {
  const [idx, setIdx] = useState(0)
  const [overview, setOverview] = useState(false)
  const [finished, setFinished] = useState(false)
  const total = exp.stops.length
  const stop = exp.stops[idx]

  useEffect(() => {
    setIdx(0)
    setOverview(false)
    setFinished(false)
  }, [exp.id])

  const goNext = () => {
    if (idx < total - 1) setIdx((i) => i + 1)
    else setFinished(true)
  }
  const goPrev = () => {
    if (finished) setFinished(false)
    else if (idx > 0) setIdx((i) => i - 1)
  }

  const enquire = () => {
    const msg = buildExperienceWhatsAppMessage({
      lang,
      experienceId: exp.id,
      experienceName: t(lang, exp.nameKey as CopyKey),
      stopTitle: stop ? t(lang, stop.titleKey as CopyKey) : undefined,
    })
    openWhatsApp(msg)
  }

  if (finished) {
    return (
      <div className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-lg">
        <div className="bg-navy text-white px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-gold text-[10px] uppercase tracking-widest">{t(lang, "guidedFinish" as CopyKey)}</p>
            <h3 className="font-display text-lg">{t(lang, exp.nameKey as CopyKey)}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-navy/70 text-sm leading-relaxed">{t(lang, "guidedFinishCta" as CopyKey)}</p>
          <div className="rounded-xl bg-cream p-4 text-xs text-navy/65 leading-relaxed space-y-2">
            <p className="font-medium text-navy/80">{t(lang, "guidedService" as CopyKey)}</p>
            <p>{t(lang, exp.serviceModelKey as CopyKey)}</p>
            <p className="font-medium text-navy/80 pt-1">{t(lang, "guidedLimits" as CopyKey)}</p>
            <p>{t(lang, exp.limitsKey as CopyKey)}</p>
          </div>
          <button
            type="button"
            onClick={enquire}
            className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium px-4 py-3 rounded-lg min-h-11"
          >
            <MessageCircle className="w-4 h-4" />
            {t(lang, "guidedEnquire" as CopyKey)}
          </button>
          {exp.relatedPlaceIds && exp.relatedPlaceIds.length > 0 && (
            <div>
              <p className="text-xs font-medium text-navy/70 mb-2">{t(lang, "guidedRelated" as CopyKey)}</p>
              <div className="flex flex-wrap gap-2">
                {exp.relatedPlaceIds.map((pid) => {
                  const place = PLACES.find((p) => p.id === pid)
                  if (!place) return null
                  return (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => {
                        onClose()
                        onSelectPlace?.(pid)
                        document.getElementById(`place-${pid}`)?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="text-xs px-3 py-1.5 rounded-full bg-cream border border-navy/10 text-navy/70 hover:text-navy hover:border-gold"
                    >
                      {t(lang, place.nameKey as CopyKey)}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          <button type="button" onClick={onClose} className="text-sm text-navy/50 hover:text-navy min-h-10">
            {t(lang, "guidedBackList" as CopyKey)}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-navy text-white px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-gold text-[10px] uppercase tracking-widest truncate">
            {t(lang, exp.subtitleKey as CopyKey)}
          </p>
          <h3 className="font-display text-base sm:text-lg truncate">{t(lang, exp.nameKey as CopyKey)}</h3>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setOverview((v) => !v)}
            className="p-2 rounded-lg hover:bg-white/10"
            aria-label={t(lang, overview ? "guidedCloseOverview" : "guidedOverview" as CopyKey)}
          >
            <List className="w-5 h-5" />
          </button>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 sm:px-6 pt-3 pb-1">
        <div className="flex items-center justify-between text-[11px] text-navy/50 mb-1.5">
          <span>{progressLabel(lang, idx + 1, total)}</span>
          <span>{t(lang, exp.durationKey as CopyKey)}</span>
        </div>
        <div className="h-1.5 rounded-full bg-cream-dark overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-300"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {overview ? (
        <div className="p-4 sm:p-6 space-y-2 max-h-[60vh] overflow-y-auto">
          <p className="text-xs font-medium text-navy/70 mb-2">{t(lang, "guidedOverview" as CopyKey)}</p>
          {exp.stops.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setIdx(i)
                setOverview(false)
              }}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-colors ${i === idx ? "border-gold bg-cream" : "border-navy/8 hover:border-navy/20"}`}
            >
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${i === idx ? "bg-navy text-white" : i < idx ? "bg-gold/20 text-navy" : "bg-cream-dark text-navy/50"}`}
              >
                {i < idx ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className="text-sm text-navy pt-0.5">{t(lang, s.titleKey as CopyKey)}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOverview(false)}
            className="text-sm text-navy/50 hover:text-navy mt-2 min-h-10"
          >
            {t(lang, "guidedCloseOverview" as CopyKey)}
          </button>
        </div>
      ) : (
        <>
          {stop.image && (
            <div className="aspect-[16/9] sm:aspect-[21/9] bg-navy/5 overflow-hidden">
              <img
                src={stop.image}
                alt={t(lang, stop.titleKey as CopyKey)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-4 sm:p-6 space-y-3">
            <h4 className="font-display text-xl sm:text-2xl text-navy">
              {t(lang, stop.titleKey as CopyKey)}
            </h4>
            <p className="text-sm text-navy/70 leading-relaxed">{t(lang, stop.bodyKey as CopyKey)}</p>
            {stop.lookForKey && (
              <div className="rounded-lg bg-cream px-3 py-2.5">
                <p className="text-[11px] font-medium text-navy/70 mb-0.5">{t(lang, "guidedLookFor" as CopyKey)}</p>
                <p className="text-xs text-navy/60 leading-relaxed">{t(lang, stop.lookForKey as CopyKey)}</p>
              </div>
            )}
            {stop.tipKey && (
              <div className="rounded-lg border border-navy/8 px-3 py-2.5">
                <p className="text-[11px] font-medium text-navy/70 mb-0.5">{t(lang, "guidedTip" as CopyKey)}</p>
                <p className="text-xs text-navy/60 leading-relaxed">{t(lang, stop.tipKey as CopyKey)}</p>
              </div>
            )}
            <a
              href={externalMapUrl(stop.lat, stop.lng, stop.mapLabel)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-action hover:text-navy min-h-10"
            >
              <MapPin className="w-3.5 h-3.5" />
              {t(lang, "guidedMap" as CopyKey)}
              {stop.mapLabel ? ` — ${stop.mapLabel}` : ""}
            </a>
          </div>
        </>
      )}

      {/* Controls */}
      <div className="border-t border-navy/8 px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2 justify-between bg-cream/50">
        <button
          type="button"
          onClick={goPrev}
          disabled={idx === 0 && !finished}
          className="inline-flex items-center gap-1 text-sm font-medium text-navy/70 hover:text-navy disabled:opacity-30 disabled:pointer-events-none min-h-11 px-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {t(lang, "guidedPrev" as CopyKey)}
        </button>
        <button
          type="button"
          onClick={enquire}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-navy hover:text-gold min-h-11 px-2"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t(lang, "guidedEnquire" as CopyKey)}</span>
          <span className="sm:hidden">WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={goNext}
          className="inline-flex items-center gap-1 bg-navy hover:bg-navy-light text-white text-sm font-medium px-4 py-2 rounded-lg min-h-11"
        >
          {idx < total - 1 ? t(lang, "guidedNext" as CopyKey) : t(lang, "guidedFinish" as CopyKey)}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function GuidedExperiences({
  lang,
  activeId,
  onStart,
  onClose,
  onSelectPlace,
}: {
  lang: Lang
  activeId: ExperienceId | null
  onStart: (id: ExperienceId) => void
  onClose: () => void
  onSelectPlace?: (id: PlaceId) => void
}) {
  const active = activeId ? getExperience(activeId) : null

  return (
    <section id="guiadas" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "guidedLabel" as CopyKey)}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-2">{t(lang, "guidedTitle" as CopyKey)}</h2>
        <p className="text-navy/60 text-sm mb-10 max-w-2xl">{t(lang, "guidedSubtitle" as CopyKey)}</p>

        {active ? (
          <div className="max-w-2xl mx-auto">
            <Player exp={active} lang={lang} onClose={onClose} onSelectPlace={onSelectPlace} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} lang={lang} onStart={onStart} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/** Hook helper: start experience and scroll to player */
export function useExperienceNav() {
  const startAndScroll = useCallback((id: ExperienceId) => {
    const el = document.getElementById("guiadas")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    return id
  }, [])
  return { startAndScroll }
}

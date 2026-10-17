import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Clock,
  Car,
  MapPin,
  Video,
  ImageIcon,
  MessageCircle,
  RotateCcw,
  SlidersHorizontal,
  Instagram,
} from "lucide-react"
import { HERO_IMAGE, type ItineraryId, type PlaceId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { fill } from "../lib/immersive-copy"
import { commonsUrl } from "../lib/media"
import {
  buildRoute,
  getItinerary,
  placeVideo,
  routeTotals,
  type GeoStep,
  type RouteStep,
} from "../lib/route"
import { buildTourWhatsAppMessage, openWhatsApp } from "../lib/whatsapp"
import { VideoEmbed } from "./VideoEmbed"

const STEP_MS = 12000
const PHOTO_MS = 4000

type Props = {
  itineraryId: ItineraryId
  lang: Lang
  onClose: () => void
  onCustomize?: (placeIds: PlaceId[]) => void
}

function stepTitle(lang: Lang, s: RouteStep): string {
  if (s.kind === "place") return t(lang, s.place.nameKey as CopyKey)
  if (s.kind === "food") return s.rest.name
  if (s.kind === "pickup") return t(lang, "playerPickup")
  return t(lang, "playerEndTitle")
}

function stepImages(s: RouteStep): { src: string; credit?: string }[] {
  if (s.kind === "place") {
    const ph = s.place.photos ?? []
    if (ph.length) return ph.map((p) => ({ src: commonsUrl(p.file, 1600), credit: p.credit }))
    return s.place.image ? [{ src: s.place.image, credit: s.place.attribution }] : []
  }
  if (s.kind === "food") return s.rest.image ? [{ src: s.rest.image.replace(/width=\d+/, "width=1600"), credit: s.rest.imageCredit }] : []
  return [{ src: HERO_IMAGE, credit: "Pexels" }]
}

/* ---------------------------------- Mapa ---------------------------------- */

function RouteMap({ geo, current, lang }: { geo: GeoStep[]; current: number; lang: Lang }) {
  const elRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{
    L: typeof import("leaflet")
    map: import("leaflet").Map
    done: import("leaflet").Polyline
    car: import("leaflet").Marker
    markers: import("leaflet").Marker[]
    last: number
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")
      if (cancelled || !elRef.current || stateRef.current) return
      const map = L.map(elRef.current, {
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
        dragging: true,
      })
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)
      const pts = geo.map((g) => L.latLng(g.lat, g.lng))
      L.polyline(pts, { color: "#ffffff", weight: 2, opacity: 0.45, dashArray: "4 8" }).addTo(map)
      const done = L.polyline([], { color: "#F59E0B", weight: 4, opacity: 0.95 }).addTo(map)
      const markers = geo.map((g, i) =>
        L.marker([g.lat, g.lng], {
          icon: L.divIcon({
            className: "",
            html: `<div class="ba-route-marker${g.kind === "food" ? " is-food" : ""}">${i + 1}</div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          }),
          keyboard: false,
        }).addTo(map),
      )
      const car = L.marker(pts[0] ?? [-34.6, -58.4], {
        icon: L.divIcon({ className: "", html: `<div class="ba-route-car" aria-hidden="true"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] }),
        keyboard: false,
        zIndexOffset: 1000,
      }).addTo(map)
      const fit = () => {
        map.invalidateSize()
        if (pts.length > 1) map.fitBounds(L.latLngBounds(pts), { padding: [28, 28], maxZoom: 15 })
        else if (pts.length === 1) map.setView(pts[0], 14)
      }
      fit()
      stateRef.current = { L, map, done, car, markers, last: -1 }
      setTimeout(fit, 120)
      setTimeout(fit, 600)
    })()
    return () => {
      cancelled = true
      stateRef.current?.map.remove()
      stateRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Animar el auto hasta la parada actual y pintar el tramo recorrido
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const st = stateRef.current
      if (!st) {
        raf = requestAnimationFrame(tick)
        return
      }
      const { L, done, car, markers } = st
      const target = Math.max(0, Math.min(current, geo.length - 1))
      markers.forEach((m, i) => {
        const el = m.getElement()?.firstElementChild
        if (el) {
          el.classList.toggle("is-active", i === current)
          el.classList.toggle("is-done", i < current)
        }
      })
      if (current < 0) {
        done.setLatLngs([])
        car.setLatLng([geo[0].lat, geo[0].lng])
        st.last = -1
        return
      }
      const from = st.last >= 0 ? geo[Math.min(st.last, geo.length - 1)] : geo[target]
      const to = geo[target]
      const base = geo.slice(0, target).map((g) => L.latLng(g.lat, g.lng))
      const t0 = performance.now()
      const dur = from === to ? 1 : 1400
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur)
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
        const lat = from.lat + (to.lat - from.lat) * e
        const lng = from.lng + (to.lng - from.lng) * e
        car.setLatLng([lat, lng])
        done.setLatLngs(target > (st.last ?? 0) ? [...base, L.latLng(lat, lng)] : [...base, L.latLng(to.lat, to.lng)])
        if (k < 1) raf = requestAnimationFrame(step)
        else st.last = target
      }
      raf = requestAnimationFrame(step)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [current, geo])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-navy">
      <div ref={elRef} className="ba-dark-map h-44 sm:h-56 w-full" role="img" aria-label={t(lang, "playerMap")} />
      <p className="absolute top-2 left-3 z-[500] text-[10px] uppercase tracking-[0.2em] text-white/70 pointer-events-none">
        {t(lang, "playerMap")}
      </p>
    </div>
  )
}

/* -------------------------------- Reproductor ------------------------------- */

export function RoutePlayer({ itineraryId, lang, onClose, onCustomize }: Props) {
  const itin = getItinerary(itineraryId)!
  const steps = useMemo(() => buildRoute(itin), [itin])
  const geo = useMemo(() => steps.filter((s): s is GeoStep => s.kind === "place" || s.kind === "food"), [steps])
  const totals = useMemo(() => routeTotals(steps), [steps])
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [photoIdx, setPhotoIdx] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  )

  const step = steps[idx]
  const images = stepImages(step)
  const geoIndex = step.kind === "place" || step.kind === "food" ? geo.indexOf(step) : step.kind === "end" ? geo.length - 1 : -1
  const isLast = idx === steps.length - 1
  const video = step.kind === "place" ? placeVideo(step.place, lang) : null

  const go = useCallback(
    (n: number) => {
      setIdx((i) => Math.max(0, Math.min(steps.length - 1, i + n)))
      setShowVideo(false)
      setPhotoIdx(0)
    },
    [steps.length],
  )
  const jump = (n: number) => {
    setIdx(n)
    setShowVideo(false)
    setPhotoIdx(0)
  }

  // Bloqueo de scroll, foco y teclado
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
      else if (e.key === " " && (e.target as HTMLElement)?.tagName !== "BUTTON") {
        e.preventDefault()
        setPlaying((p) => !p)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, onClose])

  // Rotación de fotos dentro de la parada
  useEffect(() => {
    if (!playing || showVideo || images.length < 2) return
    const id = window.setInterval(() => setPhotoIdx((p) => (p + 1) % images.length), PHOTO_MS)
    return () => window.clearInterval(id)
  }, [playing, showVideo, images.length, idx])

  // Precarga de la siguiente parada
  useEffect(() => {
    const next = steps[idx + 1]
    if (!next) return
    stepImages(next).slice(0, 1).forEach((im) => {
      const i = new Image()
      i.src = im.src
    })
  }, [idx, steps])

  const effectivePlaying = playing && !showVideo && !isLast
  const book = () =>
    openWhatsApp(
      buildTourWhatsAppMessage({
        lang,
        placeIds: itin.placeIds,
        restaurantIds: itin.restaurantIds ?? [],
        itineraryId: itin.id,
      }),
    )

  const img = images[photoIdx % Math.max(1, images.length)]

  return createPortal(
    <div
      className="fixed inset-0 z-[90] bg-[#070B16] text-white flex flex-col ba-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${t(lang, "playerDialog")}: ${t(lang, itin.nameKey as CopyKey)}`}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
      }}
    >
      {/* Fondo: foto con efecto Ken Burns */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {img && (
          <img
            key={`${step.key}-${photoIdx}`}
            src={img.src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${reduceMotion ? "" : "ba-kenburns"} ba-fade-in`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B16] via-[#070B16]/70 to-[#070B16]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B16]/90 via-[#070B16]/55 to-[#070B16]/10" />
      </div>

      {/* Barra superior: progreso */}
      <div className="relative z-10 px-4 sm:px-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-3">
          <p className="font-display text-base sm:text-lg truncate flex-1">{t(lang, itin.nameKey as CopyKey)}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0"
            aria-label={t(lang, "playerClose")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3 flex gap-1.5" role="tablist" aria-label={t(lang, "playerDialog")}>
          {steps.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === idx}
              aria-label={stepTitle(lang, s)}
              onClick={() => jump(i)}
              className="relative flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden"
            >
              <span
                key={i === idx ? `run-${idx}` : `static-${i}`}
                className="absolute inset-y-0 left-0 bg-gold rounded-full"
                style={
                  i < idx
                    ? { width: "100%" }
                    : i === idx
                      ? effectivePlaying
                        ? { width: "100%", animation: `ba-progress ${STEP_MS}ms linear forwards` }
                        : { width: isLast ? "100%" : "12%" }
                      : { width: "0%" }
                }
                onAnimationEnd={() => i === idx && go(1)}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto">
        <div className="min-h-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-10">
          <div key={step.key} className="flex-1 max-w-2xl ba-rise mt-auto pt-[22vh] lg:pt-0">
            {step.kind === "pickup" && (
              <>
                <p className="text-gold text-xs tracking-[0.25em] uppercase mb-3">{t(lang, itin.durationKey as CopyKey)}</p>
                <h2 className="font-display text-4xl sm:text-6xl leading-[1.05] mb-4">{t(lang, "playerPickup")}</h2>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">{t(lang, "playerPickupBody")}</p>
                <p className="mt-4 text-white/60 text-sm">{t(lang, itin.descKey as CopyKey)}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                  <span className="px-3 py-1.5 rounded-full bg-white/10">{fill(t(lang, "routeStops"), { n: totals.stops })}</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10">{fill(t(lang, "routeHours"), { h: String(totals.hours).replace(".", lang === "en" ? "." : ",") })}</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10">{totals.km} km</span>
                </div>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="mt-8 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium px-6 py-3.5 rounded-xl"
                >
                  {t(lang, "playerStart")} <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {(step.kind === "place" || step.kind === "food") && (
              <>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                  <span className="text-gold text-xs tracking-[0.25em] uppercase">
                    {step.kind === "food"
                      ? t(lang, "playerFood")
                      : fill(t(lang, "playerStop"), { n: geoIndex + 1, total: geo.length })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white/85 text-sm">
                    <Clock className="w-4 h-4 text-gold" aria-hidden />
                    <span className="font-display text-xl tabular-nums">{step.clock}</span>
                    <span className="text-white/45 text-xs">{t(lang, "playerTime")}</span>
                  </span>
                </div>
                <h2 className="font-display text-4xl sm:text-6xl leading-[1.05] mb-3">{stepTitle(lang, step)}</h2>
                {step.driveMin > 0 && (
                  <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/75 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full mb-4">
                    <Car className="w-4 h-4 text-gold" aria-hidden />
                    {fill(t(lang, "playerDrive"), { min: step.driveMin, km: String(step.driveKm).replace(".", lang === "en" ? "." : ",") })}
                  </p>
                )}
                {step.kind === "place" ? (
                  <>
                    <p className="text-white/85 text-base sm:text-lg leading-relaxed">{t(lang, step.place.descKey as CopyKey)}</p>
                    <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-white/70 leading-relaxed">
                      <div>
                        <p className="text-white/90 font-medium mb-1">{t(lang, "playerHistory")}</p>
                        <p className="line-clamp-4 sm:line-clamp-5">{t(lang, step.place.historyKey as CopyKey)}</p>
                      </div>
                      <div>
                        {step.place.seeDoKeys && step.place.seeDoKeys.length > 0 && (
                          <>
                            <p className="text-white/90 font-medium mb-1">{t(lang, "playerSee")}</p>
                            <ul className="space-y-0.5 mb-3">
                              {step.place.seeDoKeys.slice(0, 3).map((k) => (
                                <li key={k} className="flex gap-2">
                                  <span className="text-gold" aria-hidden>·</span>
                                  {t(lang, k as CopyKey)}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                        <p className="text-white/90 font-medium mb-1">{t(lang, "playerTip")}</p>
                        <p>{t(lang, step.place.tipKey as CopyKey)}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-white/85 text-base sm:text-lg leading-relaxed">{t(lang, step.rest.descKey as CopyKey)}</p>
                    <p className="mt-3 text-sm text-white/70">{t(lang, step.rest.whyKey as CopyKey)}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/60">
                      <MapPin className="w-4 h-4 text-gold" aria-hidden />
                      {step.rest.address}
                    </p>
                    {step.rest.instagramUrl && (
                      <a
                        href={step.rest.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white min-h-10"
                      >
                        <Instagram className="w-4 h-4" aria-hidden /> Instagram
                      </a>
                    )}
                  </>
                )}
                <p className="mt-4 text-xs text-white/45">{fill(t(lang, "playerVisit"), { min: step.visitMin })}</p>
              </>
            )}

            {step.kind === "end" && (
              <>
                <p className="text-gold text-xs tracking-[0.25em] uppercase mb-3">{t(lang, "playerEndLabel")}</p>
                <h2 className="font-display text-4xl sm:text-6xl leading-[1.05] mb-4">{t(lang, "playerEndTitle")}</h2>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
                  {fill(t(lang, "playerEndBody"), {
                    stops: totals.stops,
                    hours: String(totals.hours).replace(".", lang === "en" ? "." : ","),
                    km: totals.km,
                  })}
                </p>
                <ol className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {geo.map((g, i) => {
                    const im = stepImages(g)[0]
                    return (
                      <li key={g.key}>
                        <button type="button" onClick={() => jump(steps.indexOf(g))} className="group block w-full text-left">
                          <span className="block aspect-[4/3] rounded-lg overflow-hidden bg-white/10">
                            {im && <img src={im.src.replace(/width=\d+/, "width=480")} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />}
                          </span>
                          <span className="mt-1 block text-xs text-white/75 truncate">
                            <span className="text-gold tabular-nums">{g.clock}</span> · {stepTitle(lang, g)}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={book}
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium px-6 py-3.5 rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4" /> {t(lang, "playerBook")}
                  </button>
                  {onCustomize && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        window.setTimeout(() => onCustomize(itin.placeIds), 60)
                      }}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3.5 rounded-xl"
                    >
                      <SlidersHorizontal className="w-4 h-4" /> {t(lang, "playerCustomize")}
                    </button>
                  )}
                  <button type="button" onClick={() => jump(0)} className="inline-flex items-center gap-2 text-white/70 hover:text-white px-3 py-3.5">
                    <RotateCcw className="w-4 h-4" /> {t(lang, "playerReplay")}
                  </button>
                </div>
                <p className="mt-3 text-xs text-white/45">{t(lang, "playerDisclaimer")}</p>
              </>
            )}
          </div>

          {/* Columna lateral: mapa, video y galería */}
          <aside className="w-full lg:w-[380px] shrink-0 space-y-3">
            {showVideo && video && step.kind === "place" ? (
              <VideoEmbed url={video} lang={lang} title={t(lang, step.place.nameKey as CopyKey)} autoplay />
            ) : (
              <RouteMap geo={geo} current={geoIndex} lang={lang} />
            )}
            <div className="flex flex-wrap items-center gap-2">
              {video && (
                <button
                  type="button"
                  onClick={() => setShowVideo((v) => !v)}
                  className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full min-h-11"
                  aria-pressed={showVideo}
                >
                  {showVideo ? <ImageIcon className="w-4 h-4" /> : <Video className="w-4 h-4 text-gold" />}
                  {showVideo ? t(lang, "playerHideVideo") : t(lang, "playerWatch")}
                </button>
              )}
              {images.length > 1 && !showVideo && (
                <div className="flex gap-1.5 ml-auto">
                  {images.map((im, i) => (
                    <button
                      key={im.src}
                      type="button"
                      onClick={() => setPhotoIdx(i)}
                      className={`w-12 h-9 rounded-md overflow-hidden border ${i === photoIdx ? "border-gold" : "border-white/20 opacity-70 hover:opacity-100"}`}
                      aria-label={`${t(lang, "photoBy")} ${i + 1}`}
                    >
                      <img src={im.src.replace(/width=\d+/, "width=160")} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            {img?.credit && !showVideo && (
              <p className="text-[10px] text-white/45">
                {t(lang, "photoBy")}: {img.credit} · Wikimedia Commons
              </p>
            )}
          </aside>
        </div>
      </div>

      {/* Controles */}
      <div className="relative z-10 border-t border-white/10 bg-[#070B16]/80 backdrop-blur px-3 sm:px-8 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={idx === 0}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center"
            aria-label={t(lang, "playerPrev")}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            disabled={isLast}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-sm"
            aria-pressed={playing}
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden sm:inline">{playing ? t(lang, "playerPause") : t(lang, "playerAuto")}</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={isLast}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center"
            aria-label={t(lang, "playerNext")}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="hidden md:block text-xs text-white/40 ml-3">{t(lang, "playerSwipe")}</p>
          <button
            type="button"
            onClick={book}
            className="ml-auto inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-medium text-[13px] sm:text-sm px-3.5 sm:px-5 h-11 rounded-full whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{t(lang, "playerBook")}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  LogOut,
  MapPin,
  Navigation,
  Pause,
  Play,
  RotateCcw,
  Settings2,
  Sun,
  Utensils,
  Volume2,
  WifiOff,
} from "lucide-react"
import type { ItineraryId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { buildRoute, getItinerary, type GeoStep } from "../lib/route"
import { DEFAULT_PROXIMITY, emptyProximity, evaluateFix, type GeoStop, type ProximityState } from "../lib/proximity"
import { Narrator, type NarratorMode, type NarratorState } from "../lib/narrator"
import {
  clearSession,
  loadNarrations,
  loadProgress,
  redeemCode,
  restoreSession,
  saveProgress,
  type NarrationStop,
  type StoredSession,
  type TourError,
} from "../lib/tour-client"
import { tt, type TourKey } from "../lib/tour-copy"

type Props = { lang: Lang; setLang: (l: Lang) => void }

/** Paradas extensas: radio mínimo propio (m). */
const MIN_RADIUS: Record<string, number> = { tigre: 800, palermo: 600 }
const RADIUS_OPTIONS = [200, 300, 500, 800]
const SETTINGS_KEY = "baenruta:tour-settings"

type GpsStatus = "off" | "searching" | "ok" | "weak" | "denied" | "unavailable" | "insecure" | "unsupported"

function readCodeFromUrl(): string {
  try {
    const u = new URL(window.location.href)
    const c = u.searchParams.get("codigo") ?? u.searchParams.get("code") ?? ""
    if (c) {
      // No dejar el código en el historial ni en la barra de direcciones.
      u.searchParams.delete("codigo")
      u.searchParams.delete("code")
      window.history.replaceState(null, "", u)
    }
    return c.slice(0, 20)
  } catch {
    return ""
  }
}

function formatDistance(m: number, lang: Lang) {
  if (m < 1000) return `${Math.round(m / 10) * 10} m`
  return `${(m / 1000).toLocaleString(lang === "pt" ? "pt-BR" : lang, { maximumFractionDigits: 1 })} km`
}

function formatTime(ms: number, lang: Lang) {
  return new Date(ms).toLocaleString(lang === "pt" ? "pt-BR" : lang === "en" ? "en-US" : "es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function loadSettings(): { radiusM: number; autoplay: boolean } {
  try {
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "null") as { radiusM?: number; autoplay?: boolean } | null
    return {
      radiusM: RADIUS_OPTIONS.includes(Number(s?.radiusM)) ? Number(s!.radiusM) : DEFAULT_PROXIMITY.radiusM,
      autoplay: s?.autoplay !== false,
    }
  } catch {
    return { radiusM: DEFAULT_PROXIMITY.radiusM, autoplay: true }
  }
}

function LangSwitch({ lang, setLang }: Props) {
  return (
    <div className="flex rounded-full border border-white/15 p-0.5" role="group" aria-label="Idioma / Language">
      {(["es", "en", "pt"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase ${lang === l ? "bg-gold text-navy" : "text-white/80 hover:text-white"}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

// ---------------- Activación ----------------

function Activation({ lang, onActivated }: { lang: Lang; onActivated: (s: StoredSession) => void }) {
  const [code, setCode] = useState(readCodeFromUrl)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<TourError | null>(null)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (busy || !code.trim()) return
    setBusy(true)
    setError(null)
    const r = await redeemCode(code)
    setBusy(false)
    if (r.ok) onActivated(r.data)
    else setError(r.error)
  }
  return (
    <form onSubmit={submit} className="w-full max-w-md mx-auto bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8" noValidate>
      <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mb-5" aria-hidden>
        <KeyRound className="w-6 h-6" />
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white">{tt(lang, "activateTitle")}</h1>
      <p className="mt-3 text-white/75 text-[15px] leading-relaxed">{tt(lang, "activateText")}</p>
      <label htmlFor="tour-code" className="block mt-6 text-sm font-medium text-white/90">
        {tt(lang, "codeLabel")}
      </label>
      <input
        id="tour-code"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder={tt(lang, "codePh")}
        autoComplete="one-time-code"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        maxLength={20}
        aria-invalid={!!error}
        aria-describedby={error ? "tour-code-error" : undefined}
        className="mt-2 w-full rounded-xl bg-white text-navy px-4 py-3.5 text-lg font-mono tracking-[0.15em] placeholder:text-navy/35 focus:outline-none focus:ring-4 focus:ring-gold/50"
      />
      {error && (
        <p id="tour-code-error" role="alert" className="mt-3 text-sm text-red-200 bg-red-500/15 border border-red-400/30 rounded-xl px-3 py-2">
          {tt(lang, `err_${error}` as TourKey)}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !code.trim()}
        className="mt-5 w-full rounded-xl bg-gold text-navy font-semibold py-3.5 text-base disabled:opacity-50 hover:bg-gold-light transition-colors"
      >
        {busy ? tt(lang, "activating") : tt(lang, "activate")}
      </button>
      <p className="mt-5 text-xs text-white/60 leading-relaxed">{tt(lang, "privacy")}</p>
    </form>
  )
}

// ---------------- Recorrido ----------------

type Stop = {
  key: string
  step: GeoStep
  name: string
  narration: NarrationStop | null
}

function useWakeLock(active: boolean) {
  const [on, setOn] = useState(false)
  const ref = useRef<WakeLockSentinel | null>(null)
  useEffect(() => {
    if (!active) return
    let cancelled = false
    const request = async () => {
      if (!("wakeLock" in navigator) || document.visibilityState !== "visible") return
      try {
        const s = await navigator.wakeLock.request("screen")
        if (cancelled) {
          void s.release()
          return
        }
        ref.current = s
        setOn(true)
        s.addEventListener("release", () => setOn(false))
      } catch {
        setOn(false)
      }
    }
    void request()
    const onVis = () => document.visibilityState === "visible" && void request()
    document.addEventListener("visibilitychange", onVis)
    return () => {
      cancelled = true
      document.removeEventListener("visibilitychange", onVis)
      void ref.current?.release().catch(() => undefined)
      ref.current = null
      setOn(false)
    }
  }, [active])
  return on
}

function Tour({ lang, session, offline, onExit }: { lang: Lang; session: StoredSession; offline: boolean; onExit: () => void }) {
  const itin = getItinerary(session.tour as ItineraryId)
  const [narr, setNarr] = useState<{ stops: NarrationStop[]; cached: boolean } | null>(null)
  const [narrError, setNarrError] = useState(false)
  useEffect(() => {
    let alive = true
    void loadNarrations(session).then((r) => {
      if (!alive) return
      if (r) setNarr(r)
      else setNarrError(true)
    })
    return () => {
      alive = false
    }
  }, [session])

  const stops: Stop[] = useMemo(() => {
    if (!itin) return []
    return buildRoute(itin)
      .filter((s): s is GeoStep => s.kind === "place" || s.kind === "food")
      .map((step) => ({
        key: step.key,
        step,
        name: step.kind === "place" ? t(lang, step.place.nameKey as CopyKey) : step.rest.name,
        narration: step.kind === "place" ? narr?.stops.find((n) => n.placeId === step.place.id) ?? null : null,
      }))
  }, [itin, lang, narr])

  const geoStops: GeoStop[] = useMemo(
    () => stops.map((s) => ({ key: s.key, lat: s.step.lat, lng: s.step.lng, minRadiusM: MIN_RADIUS[s.key] })),
    [stops],
  )

  const initial = useMemo(() => loadProgress(session), [session])
  const [current, setCurrent] = useState(initial.current)
  const [prox, setProx] = useState<ProximityState>(() => emptyProximity(initial.arrived))
  const proxRef = useRef(prox)
  proxRef.current = prox
  useEffect(() => saveProgress(session, { arrived: prox.arrived, current }), [session, prox.arrived, current])

  const [settings, setSettings] = useState(loadSettings)
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      /* ignore */
    }
  }, [settings])

  const [running, setRunning] = useState(false)
  const [gps, setGps] = useState<GpsStatus>("off")
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [nearest, setNearest] = useState<{ key: string; distanceM: number } | null>(null)
  const [hiddenPause, setHiddenPause] = useState(false)
  const [announce, setAnnounce] = useState("")
  const wakeOn = useWakeLock(running)

  const [nState, setNState] = useState<NarratorState>("idle")
  const [nMode, setNMode] = useState<NarratorMode>("text")
  const narrator = useMemo(() => new Narrator((s, m) => {
    setNState(s)
    setNMode(m)
  }), [])
  useEffect(() => () => narrator.stop(), [narrator])

  const stop = stops[Math.min(current, Math.max(stops.length - 1, 0))]
  const finished = stops.length > 0 && prox.arrived.length >= stops.length && current >= stops.length - 1

  const playStop = useCallback(
    (s: Stop | undefined) => {
      if (!s?.narration) return
      void narrator.play(s.narration.text[lang], lang, s.narration.audio[lang])
    },
    [narrator, lang],
  )

  const goTo = useCallback(
    (idx: number, opts: { autoplay: boolean }) => {
      const i = Math.max(0, Math.min(stops.length - 1, idx))
      setCurrent(i)
      const s = stops[i]
      if (!s) return
      setAnnounce(tt(lang, "arrivedAt", { name: s.name }))
      if (opts.autoplay) playStop(s)
      else narrator.stop()
    },
    [stops, lang, playStop, narrator],
  )

  // Seguimiento de ubicación: solo mientras el modo está activo y la pestaña visible.
  const settingsRef = useRef(settings)
  settingsRef.current = settings
  const goToRef = useRef(goTo)
  goToRef.current = goTo
  const stopsRef = useRef(stops)
  stopsRef.current = stops
  useEffect(() => {
    if (!running) return
    if (!window.isSecureContext) {
      setGps("insecure")
      return
    }
    if (!("geolocation" in navigator)) {
      setGps("unsupported")
      return
    }
    setGps("searching")
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const fix = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }
        setAccuracy(Math.round(fix.accuracy))
        const ev = evaluateFix(proxRef.current, fix, geoStops, { ...DEFAULT_PROXIMITY, radiusM: settingsRef.current.radiusM })
        setGps(ev.ignored ? "weak" : "ok")
        setNearest(ev.nearest)
        proxRef.current = ev.state
        setProx(ev.state)
        if (ev.arrivedKey) {
          const idx = stopsRef.current.findIndex((s) => s.key === ev.arrivedKey)
          if (idx >= 0) goToRef.current(idx, { autoplay: settingsRef.current.autoplay })
        }
        // La posición no se guarda: solo se usa para esta comparación.
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setGps("denied")
        else setGps("unavailable")
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [running, geoStops])

  // Pausa al pasar a segundo plano (los navegadores también suspenden el GPS).
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "hidden" && narrator.state === "playing") {
        narrator.pause()
        setHiddenPause(true)
      }
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [narrator])

  const start = () => {
    narrator.unlock() // dentro del gesto: habilita el audio en móviles
    setRunning(true)
  }
  const halt = () => {
    setRunning(false)
    setGps("off")
    setAccuracy(null)
    narrator.stop()
  }
  const manualNext = () => {
    if (!stop) return
    const arrived = prox.arrived.includes(stop.key) ? prox.arrived : [...prox.arrived, stop.key]
    const next = Math.min(stops.length - 1, current + 1)
    const nextKey = stops[next]?.key
    const withNext = nextKey && !arrived.includes(nextKey) ? [...arrived, nextKey] : arrived
    const st = { arrived: withNext, candidate: null }
    proxRef.current = st
    setProx(st)
    goTo(next, { autoplay: settings.autoplay && running })
  }
  const manualPrev = () => goTo(current - 1, { autoplay: false })

  const gpsText = (() => {
    switch (gps) {
      case "ok":
        return tt(lang, "gpsOk", { m: accuracy ?? "?" })
      case "weak":
        return tt(lang, "gpsWeak", { m: accuracy ?? "?" })
      case "searching":
        return tt(lang, "gpsSearching")
      case "denied":
        return tt(lang, "gpsDenied")
      case "unavailable":
        return tt(lang, "gpsUnavailable")
      case "insecure":
        return tt(lang, "gpsInsecure")
      case "unsupported":
        return tt(lang, "gpsUnsupported")
      default:
        return tt(lang, "gpsOff")
    }
  })()
  const gpsProblem = gps === "denied" || gps === "unavailable" || gps === "insecure" || gps === "unsupported"
  const nearestStop = nearest ? stops.find((s) => s.key === nearest.key) : null

  const modeLabel = nMode === "audio" ? tt(lang, "modeAudio") : nState === "unsupported" ? tt(lang, "modeText") : tt(lang, "modeVoice")
  const hasAudio = !!stop?.narration?.audio[lang]

  if (!itin) return null

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="sr-only" aria-live="polite">{announce}</div>
      {(offline || narr?.cached) && (
        <p className="flex items-center gap-2 text-sm text-amber-100 bg-amber-500/15 border border-amber-400/30 rounded-xl px-3 py-2">
          <WifiOff className="w-4 h-4 shrink-0" aria-hidden />
          {offline ? tt(lang, "offlineBanner") : tt(lang, "cachedBanner")}
        </p>
      )}

      <section className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 sm:p-6">
        <p className="text-gold text-xs font-semibold uppercase tracking-[0.18em]">{tt(lang, "title")}</p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-1">{t(lang, itin.nameKey as CopyKey)}</h1>
        <p className="text-white/60 text-sm mt-1">
          {tt(lang, "validUntil")} {formatTime(session.expiresAt, lang)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs" data-testid="tour-status">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${gpsProblem ? "bg-red-500/15 text-red-100" : gps === "ok" ? "bg-emerald-500/15 text-emerald-100" : "bg-white/10 text-white/80"}`} data-testid="gps-status">
            <Navigation className="w-3.5 h-3.5" aria-hidden />
            {gpsText}
          </span>
          {running && (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-white/10 text-white/80">
              <Sun className="w-3.5 h-3.5" aria-hidden />
              {wakeOn ? tt(lang, "wakeOn") : tt(lang, "wakeOff")}
            </span>
          )}
        </div>

        {!running ? (
          <div className="mt-5">
            <button type="button" onClick={start} className="w-full rounded-xl bg-gold text-navy font-semibold py-3.5 text-base hover:bg-gold-light transition-colors inline-flex items-center justify-center gap-2">
              <Navigation className="w-5 h-5" aria-hidden />
              {tt(lang, "start")}
            </button>
            <p className="mt-3 text-xs text-white/60 leading-relaxed">{tt(lang, "startHint")} {tt(lang, "privacy")}</p>
          </div>
        ) : (
          <button type="button" onClick={halt} className="mt-4 text-sm text-white/70 underline underline-offset-4 hover:text-white">
            {tt(lang, "stop")}
          </button>
        )}
        {running && nearestStop && nearest && gps === "ok" && (
          <p className="mt-3 text-sm text-white/80" data-testid="nearest">
            {tt(lang, "distanceTo", { d: formatDistance(nearest.distanceM, lang), name: nearestStop.name })}
          </p>
        )}
      </section>

      {stop && (
        <section className="bg-white rounded-3xl p-5 sm:p-6 text-navy shadow-xl" aria-labelledby="stop-title" data-testid="current-stop">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy/70">
            {tt(lang, "stopOf", { n: current + 1, total: stops.length })}
          </p>
          <h2 id="stop-title" className="font-display text-2xl font-semibold mt-1 flex items-center gap-2">
            {stop.step.kind === "food" ? <Utensils className="w-5 h-5 text-gold shrink-0" aria-hidden /> : <MapPin className="w-5 h-5 text-gold shrink-0" aria-hidden />}
            {stop.name}
          </h2>

          {stop.step.kind === "food" ? (
            <p className="mt-3 text-navy/75">
              {tt(lang, "foodStop")} · {stop.step.rest.address}
            </p>
          ) : stop.narration ? (
            <>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {nState === "playing" ? (
                  <button type="button" onClick={() => narrator.pause()} className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-4 py-2.5 text-sm font-semibold">
                    <Pause className="w-4 h-4" aria-hidden /> {tt(lang, "pause")}
                  </button>
                ) : nState === "paused" ? (
                  <button type="button" onClick={() => { setHiddenPause(false); narrator.resume() }} className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-4 py-2.5 text-sm font-semibold">
                    <Play className="w-4 h-4" aria-hidden /> {tt(lang, "resume")}
                  </button>
                ) : (
                  <button type="button" onClick={() => playStop(stop)} className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-4 py-2.5 text-sm font-semibold">
                    <Volume2 className="w-4 h-4" aria-hidden /> {tt(lang, "listen")}
                  </button>
                )}
                <button type="button" onClick={() => playStop(stop)} className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-4 py-2.5 text-sm font-semibold">
                  <RotateCcw className="w-4 h-4" aria-hidden /> {tt(lang, "replay")}
                </button>
              </div>
              <p className="mt-2 text-xs text-navy/70" data-testid="narration-mode">
                {hasAudio ? tt(lang, "modeAudio") : modeLabel}
              </p>
              {nState === "blocked" && <p role="alert" className="mt-2 text-sm text-red-700">{tt(lang, "blocked")}</p>}
              {hiddenPause && nState === "paused" && <p className="mt-2 text-sm text-navy/70">{tt(lang, "pausedHidden")}</p>}
              <p className="mt-4 text-[17px] leading-relaxed text-navy/90" data-testid="narration-text" lang={lang === "pt" ? "pt-BR" : lang}>
                {stop.narration.text[lang]}
              </p>
              {stop.narration.status === "borrador" && <p className="mt-3 text-xs text-navy/70">{tt(lang, "draftNote")}</p>}
              <details className="mt-2 text-xs text-navy/70">
                <summary className="cursor-pointer">{tt(lang, "sources")}</summary>
                <ul className="mt-1 space-y-1 break-all">
                  {stop.narration.sources.map((s) => (
                    <li key={s}>
                      <a href={s} target="_blank" rel="noopener noreferrer" className="underline">{s.replace(/^https:\/\//, "")}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </>
          ) : narrError ? (
            <p className="mt-3 text-navy/70">{tt(lang, "err_server_error")}</p>
          ) : (
            <p className="mt-3 text-navy/70">…</p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" onClick={manualPrev} disabled={current === 0} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy/20 py-3 text-sm font-semibold disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" aria-hidden /> {tt(lang, "prev")}
            </button>
            <button type="button" onClick={manualNext} disabled={current >= stops.length - 1 && prox.arrived.includes(stop.key)} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gold py-3 text-sm font-semibold disabled:opacity-40">
              {tt(lang, "next")} <ChevronRight className="w-4 h-4" aria-hidden />
            </button>
          </div>
          {finished && (
            <div className="mt-5 rounded-2xl bg-navy/5 p-4">
              <p className="font-semibold">{tt(lang, "endTitle")}</p>
              <p className="text-sm text-navy/70 mt-1">{tt(lang, "endText")}</p>
            </div>
          )}
        </section>
      )}

      <section className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 sm:p-6">
        <h2 className="text-white font-semibold">{tt(lang, "stops")}</h2>
        <ol className="mt-3 space-y-2">
          {stops.map((s, i) => {
            const visited = prox.arrived.includes(s.key)
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => goTo(i, { autoplay: false })}
                  aria-current={i === current ? "step" : undefined}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left ${i === current ? "bg-gold/15 text-white" : "text-white/80 hover:bg-white/5"}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${visited ? "bg-emerald-500 text-white" : "bg-white/10"}`}>
                    {visited ? <Check className="w-4 h-4" aria-hidden /> : i + 1}
                  </span>
                  <span className="flex-1">{s.name}</span>
                  <span className="text-xs text-white/50">{visited ? tt(lang, "visited") : i === current ? tt(lang, "current") : ""}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 sm:p-6 text-white/85">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <Settings2 className="w-4 h-4" aria-hidden /> {tt(lang, "settings")}
        </h2>
        <label className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span>{tt(lang, "autoplay")}</span>
          <input type="checkbox" checked={settings.autoplay} onChange={(e) => setSettings((s) => ({ ...s, autoplay: e.target.checked }))} className="w-5 h-5 accent-amber-500" />
        </label>
        <label className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span>{tt(lang, "radius")}</span>
          <select value={settings.radiusM} onChange={(e) => setSettings((s) => ({ ...s, radiusM: Number(e.target.value) }))} className="rounded-lg bg-white text-navy px-2 py-1.5">
            {RADIUS_OPTIONS.map((r) => (
              <option key={r} value={r}>{r} m</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(tt(lang, "exitConfirm"))) {
              halt()
              onExit()
            }
          }}
          className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <LogOut className="w-4 h-4" aria-hidden /> {tt(lang, "exit")}
        </button>
      </section>
    </div>
  )
}

// ---------------- Página ----------------

type Phase = { k: "restoring" } | { k: "activate"; error?: TourError } | { k: "tour"; session: StoredSession; offline: boolean }

export function TourMode({ lang, setLang }: Props) {
  const [phase, setPhase] = useState<Phase>({ k: "restoring" })
  useEffect(() => {
    let alive = true
    void restoreSession().then((r) => {
      if (!alive) return
      if (r.status === "ok") setPhase({ k: "tour", session: r.session, offline: r.offline })
      else setPhase({ k: "activate", error: r.status === "ended" ? r.error : undefined })
    })
    return () => {
      alive = false
    }
  }, [])

  // Al volver la conexión, el servidor revalida la sesión (revocada, liberada o vencida).
  useEffect(() => {
    if (phase.k !== "tour" || !phase.offline) return
    const onOnline = () =>
      void restoreSession().then((r) => {
        if (r.status === "ok") setPhase({ k: "tour", session: r.session, offline: r.offline })
        else if (r.status === "ended") setPhase({ k: "activate", error: r.error })
      })
    window.addEventListener("online", onOnline)
    return () => window.removeEventListener("online", onOnline)
  }, [phase])

  // Vencimiento durante el recorrido.
  useEffect(() => {
    if (phase.k !== "tour") return
    const ms = phase.session.expiresAt - Date.now()
    const id = window.setTimeout(() => {
      clearSession()
      setPhase({ k: "activate", error: "expired" })
    }, Math.max(0, Math.min(ms, 2_147_000_000)))
    return () => window.clearTimeout(id)
  }, [phase])

  useEffect(() => {
    document.title = `${tt(lang, "title")} · BA en Ruta`
    const robots = document.createElement("meta")
    robots.name = "robots"
    robots.content = "noindex"
    document.head.appendChild(robots)
    return () => robots.remove()
  }, [lang])

  return (
    <div className="min-h-screen bg-[#070B16] text-white">
      <header className="sticky top-0 z-10 bg-[#070B16]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <a href="/" className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white">
            <ArrowLeft className="w-4 h-4" aria-hidden /> {tt(lang, "backToSite")}
          </a>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
      </header>
      <main className="px-4 py-6 sm:py-10">
        {phase.k === "restoring" && (
          <p role="status" className="text-center text-white/70 mt-16">{tt(lang, "restoring")}</p>
        )}
        {phase.k === "activate" && (
          <div className="space-y-4">
            {phase.error && phase.error !== "invalid_code" && (
              <p role="alert" className="max-w-md mx-auto text-sm text-amber-100 bg-amber-500/15 border border-amber-400/30 rounded-xl px-3 py-2">
                {tt(lang, `err_${phase.error}` as TourKey)}
              </p>
            )}
            <Activation lang={lang} onActivated={(s) => setPhase({ k: "tour", session: s, offline: false })} />
          </div>
        )}
        {phase.k === "tour" && (
          <Tour
            key={phase.session.token}
            lang={lang}
            session={phase.session}
            offline={phase.offline}
            onExit={() => setPhase({ k: "activate" })}
          />
        )}
      </main>
    </div>
  )
}

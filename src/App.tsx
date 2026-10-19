import { useState, useCallback, useEffect, useMemo, lazy, Suspense } from "react"
import type { PlaceId, RestaurantId, ItineraryId } from "./lib/ba-config"
import {
  resolveTenantFromPath,
  setActiveTenant,
  getActiveTenant,
  type TenantConfig,
} from "./lib/tenant"
import { useLang, Header, Hero, Passion } from "./components/HeaderHero"
import { AboutDriver } from "./components/PackagesSection"
import { Itineraries } from "./components/Itineraries"
import { FAQ, Footer } from "./components/FormFaq"
import { ITINERARIES } from "./lib/ba-config"

const loadRoutePlayer = () => import("./components/RoutePlayer")
const RoutePlayer = lazy(() => loadRoutePlayer().then((m) => ({ default: m.RoutePlayer })))

function readInitialStep(): number {
  if (typeof window === "undefined") return 0
  const n = Number(new URLSearchParams(window.location.search).get("parada"))
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
}

function PlayerFallback() {
  return (
    <div className="fixed inset-0 z-[90] bg-[#070B16] flex items-center justify-center" role="status" aria-live="polite">
      <span className="w-10 h-10 rounded-full border-2 border-white/20 border-t-gold animate-spin" aria-hidden />
      <span className="sr-only">…</span>
    </div>
  )
}

function useScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const root = document.documentElement
    root.classList.add("ba-js-reveal")
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )
    const scan = () => document.querySelectorAll(".ba-reveal:not(.is-visible)").forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    const safety = window.setTimeout(() => document.querySelectorAll(".ba-reveal").forEach((el) => el.classList.add("is-visible")), 4000)
    return () => {
      io.disconnect()
      mo.disconnect()
      window.clearTimeout(safety)
    }
  }, [])
}

/** Página corta: hero + experiencias (+ simulador) + quién + FAQ. El resto era scroll infinito. */
export default function App() {
  const [lang, setLang] = useLang()
  useScrollReveal()
  const [playing, setPlaying] = useState<ItineraryId | null>(() => {
    if (typeof window === "undefined") return null
    const q = new URLSearchParams(window.location.search).get("recorrido")
    return ITINERARIES.some((i) => i.id === q) ? (q as ItineraryId) : null
  })
  const [initialStep, setInitialStep] = useState(readInitialStep)
  useEffect(() => {
    const warm = () => void loadRoutePlayer()
    const el = document.getElementById("recorridos")
    el?.addEventListener("pointerenter", warm, { once: true })
    el?.addEventListener("touchstart", warm, { once: true, passive: true })
    return () => {
      el?.removeEventListener("pointerenter", warm)
      el?.removeEventListener("touchstart", warm)
    }
  }, [])
  const syncStep = useCallback((idx: number) => {
    try {
      const u = new URL(window.location.href)
      if (idx > 0) u.searchParams.set("parada", String(idx))
      else u.searchParams.delete("parada")
      window.history.replaceState(null, "", u)
    } catch { /* ignore */ }
  }, [])
  const openPlayer = useCallback((id: ItineraryId) => {
    setInitialStep(0)
    setPlaying(id)
    try {
      const u = new URL(window.location.href)
      u.searchParams.set("recorrido", id)
      window.history.replaceState(null, "", u)
    } catch { /* ignore */ }
  }, [])
  const closePlayer = useCallback(() => {
    setPlaying(null)
    try {
      const u = new URL(window.location.href)
      u.searchParams.delete("recorrido")
      u.searchParams.delete("parada")
      window.history.replaceState(null, "", u)
    } catch { /* ignore */ }
  }, [])
  const [tenant, setTenant] = useState<TenantConfig>(() => {
    if (typeof window === "undefined") return getActiveTenant()
    const t = resolveTenantFromPath(window.location.pathname)
    setActiveTenant(t)
    return t
  })

  useEffect(() => {
    const t = resolveTenantFromPath(window.location.pathname)
    setActiveTenant(t)
    setTenant(t)
  }, [])

  const isDemo = tenant.slug !== "ba-en-ruta"
  const f = tenant.features

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const customizeItinerary = (_placeIds: PlaceId[]) => {
    /* personalizar ya no abre catálogo largo; el CTA va a WhatsApp vía tarjeta */
  }

  const tenantLabel = useMemo(() => tenant.publicName, [tenant.publicName])

  return (
    <div className="min-h-screen flex flex-col">
      {isDemo && (
        <div className="bg-gold text-navy text-center text-xs sm:text-sm font-medium py-2 px-4">
          Vista de demostración: <strong>{tenantLabel}</strong> ·{" "}
          <code className="font-mono">/c/{tenant.slug}</code>
        </div>
      )}
      <Header lang={lang} setLang={setLang} onNav={scrollTo} tenantName={isDemo ? tenant.publicName : undefined} />
      <main>
        <Hero lang={lang} onNav={scrollTo} />
        {f.itineraries && (
          <Itineraries
            lang={lang}
            onSelectItinerary={() => scrollTo("quien")}
            onCustomize={customizeItinerary}
            onPlay={openPlayer}
          />
        )}
        <AboutDriver lang={lang} />
        <FAQ lang={lang} />
        <Passion lang={lang} />
      </main>
      <Footer lang={lang} onNav={scrollTo} />
      {playing && (
        <Suspense fallback={<PlayerFallback />}>
          <RoutePlayer
            itineraryId={playing}
            lang={lang}
            onClose={closePlayer}
            onCustomize={customizeItinerary}
            initialStep={initialStep}
            onStepChange={syncStep}
          />
        </Suspense>
      )}
    </div>
  )
}

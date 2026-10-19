import { useState, useCallback, useEffect, useMemo, lazy, Suspense } from "react"
import type { ServiceId, InterestId, PlaceId, RestaurantId, ItineraryId } from "./lib/ba-config"
import {
  resolveTenantFromPath,
  setActiveTenant,
  getActiveTenant,
  type TenantConfig,
} from "./lib/tenant"
import { useLang, Header, Hero, Passion } from "./components/HeaderHero"
import { HowItWorks, Services, Prices, Places } from "./components/Sections"
import { AboutDriver } from "./components/PackagesSection"
import { VidaPorteña } from "./components/VidaPorteña"
import { Gastronomy } from "./components/GastronomySection"
import { PlacesMap } from "./components/PlacesMap"
import { Itineraries } from "./components/Itineraries"
import { TourBar, type TourSelection } from "./components/TourBar"
import { EnquiryForm, FAQ, Footer } from "./components/FormFaq"
import { MiQr } from "./components/MiQr"
import { DriverSignup } from "./components/DriverSignup"
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

  const [formService, setFormService] = useState<ServiceId | "">("")
  const [formInterests, setFormInterests] = useState<InterestId[]>([])
  const [formPlace, setFormPlace] = useState<PlaceId | null>(null)
  const [mapHighlight, setMapHighlight] = useState<PlaceId | null>(null)
  const [tour, setTour] = useState<TourSelection>({
    placeIds: [],
    restaurantIds: [],
    itineraryId: null,
  })

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const enquireService = (service: ServiceId) => {
    setFormService(service)
    scrollTo("reserva")
  }
  const selectPlace = (placeId: PlaceId) => {
    setFormPlace(placeId)
    setFormService("tours")
    setFormInterests((prev) => (prev.includes("city") ? prev : [...prev, "city"]))
    setMapHighlight(placeId)
    scrollTo("reserva")
  }
  const selectGastro = () => {
    setFormInterests((prev) => (prev.includes("gastronomy") ? prev : [...prev, "gastronomy"]))
    setFormService("tours")
    scrollTo("reserva")
  }
  const focusOnMap = (placeId: PlaceId) => {
    setMapHighlight(placeId)
    scrollTo("mapa")
  }

  const togglePlace = (id: PlaceId) => {
    setTour((prev) => ({
      ...prev,
      placeIds: prev.placeIds.includes(id) ? prev.placeIds.filter((x) => x !== id) : [...prev.placeIds, id],
    }))
  }
  const toggleRestaurant = (id: RestaurantId) => {
    setTour((prev) => ({
      ...prev,
      restaurantIds: prev.restaurantIds.includes(id)
        ? prev.restaurantIds.filter((x) => x !== id)
        : [...prev.restaurantIds, id],
    }))
  }
  const selectItinerary = (id: ItineraryId, placeIds: PlaceId[], restaurantIds: RestaurantId[]) => {
    setTour({
      itineraryId: id,
      placeIds: [...new Set(placeIds)],
      restaurantIds: [...new Set(restaurantIds)],
    })
    setFormService("tours")
  }
  const customizeItinerary = (placeIds: PlaceId[]) => {
    setTour((prev) => ({
      ...prev,
      placeIds: [...new Set([...prev.placeIds, ...placeIds])],
    }))
    scrollTo("imperdibles")
  }

  const tenantLabel = useMemo(() => tenant.publicName, [tenant.publicName])

  return (
    <div className="min-h-screen flex flex-col pb-24">
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
            onSelectItinerary={(id, p, r) => {
              selectItinerary(id, p, r)
              scrollTo("reserva")
            }}
            onCustomize={customizeItinerary}
            onPlay={openPlayer}
          />
        )}
        <AboutDriver lang={lang} />
        <HowItWorks lang={lang} />
        <VidaPorteña lang={lang} />
        <Services lang={lang} onEnquire={enquireService} />
        <Prices lang={lang} onEnquire={() => scrollTo("reserva")} />

        {f.places && (
          <Places
            lang={lang}
            onSelect={selectPlace}
            onMapFocus={focusOnMap}
            selectedPlaces={tour.placeIds}
            onToggleTour={togglePlace}
          />
        )}

        {f.map && <PlacesMap lang={lang} highlightId={mapHighlight} onSelectPlace={selectPlace} />}

        {f.gastronomy && (
          <Gastronomy
            lang={lang}
            onSelect={selectGastro}
            selectedRestaurants={tour.restaurantIds}
            onToggleRestaurant={toggleRestaurant}
          />
        )}

        <EnquiryForm lang={lang} initialService={formService} initialInterests={formInterests} initialPlace={formPlace} />
        {f.miQr && <MiQr lang={lang} />}
        <FAQ lang={lang} />
        {f.driverSignup && <DriverSignup lang={lang} />}
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
      <TourBar
        lang={lang}
        selection={tour}
        onClear={() => setTour({ placeIds: [], restaurantIds: [], itineraryId: null })}
        onRemovePlace={(id) => setTour((p) => ({ ...p, placeIds: p.placeIds.filter((x) => x !== id) }))}
        onRemoveRestaurant={(id) => setTour((p) => ({ ...p, restaurantIds: p.restaurantIds.filter((x) => x !== id) }))}
      />
    </div>
  )
}

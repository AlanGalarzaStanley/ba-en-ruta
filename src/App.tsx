import { useState, useCallback, useEffect, useMemo } from "react"
import type { ServiceId, InterestId, PlaceId, RestaurantId, ItineraryId } from "./lib/ba-config"
import type { ExperienceId } from "./lib/experiences"
import {
  resolveTenantFromPath,
  setActiveTenant,
  getActiveTenant,
  type TenantConfig,
} from "./lib/tenant"
import { useLang, Header, Hero, Passion } from "./components/HeaderHero"
import { HowItWorks, Services, Prices, Places, Gastronomy } from "./components/Sections"
import { PlacesMap } from "./components/PlacesMap"
import { Itineraries } from "./components/Itineraries"
import { TourBar, type TourSelection } from "./components/TourBar"
import { EnquiryForm, FAQ, Footer } from "./components/FormFaq"
import { MiQr } from "./components/MiQr"
import { GuidedExperiences } from "./components/ExperiencePlayer"
import { DriverSignup } from "./components/DriverSignup"

/**
 * Narrative (no repeated destination galleries):
 * Hero → Passion → How → Services → Prices
 * → Guided walk (Casco) → Places (deep + video) → Map
 * → Day plans (text only) → Food → Form → QR → FAQ → Drivers
 */
export default function App() {
  const [lang, setLang] = useLang()
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
  const [activeExperience, setActiveExperience] = useState<ExperienceId | null>(null)

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

  const startExperience = (id: ExperienceId) => {
    setActiveExperience(id)
    scrollTo("guiadas")
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
        <Passion lang={lang} />
        <HowItWorks lang={lang} />
        <Services lang={lang} onEnquire={enquireService} />
        <Prices lang={lang} onEnquire={() => scrollTo("reserva")} />

        {f.guidedExperiences && (
          <GuidedExperiences
            lang={lang}
            activeId={activeExperience}
            onStart={startExperience}
            onClose={() => setActiveExperience(null)}
            onSelectPlace={selectPlace}
          />
        )}

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

        {f.itineraries && (
          <Itineraries lang={lang} onSelectItinerary={selectItinerary} onCustomize={customizeItinerary} />
        )}

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
      </main>
      <Footer lang={lang} onNav={scrollTo} />
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

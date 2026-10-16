import { useState, useCallback } from "react"
import type { ServiceId, InterestId, PlaceId, RestaurantId, ItineraryId } from "./lib/ba-config"
import type { ExperienceId } from "./lib/experiences"
import { getExperienceForPlace } from "./lib/experiences"
import { useLang, Header, Hero, Passion } from "./components/HeaderHero"
import { HowItWorks, Services, Prices, Experiences, Places, Gastronomy } from "./components/Sections"
import { PlacesMap } from "./components/PlacesMap"
import { Itineraries } from "./components/Itineraries"
import { TourBar, type TourSelection } from "./components/TourBar"
import { EnquiryForm, FAQ, Footer } from "./components/FormFaq"
import { MiQr } from "./components/MiQr"
import { GuidedExperiences } from "./components/ExperiencePlayer"

export default function App() {
  const [lang, setLang] = useLang()
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
  const selectInterest = (interest: InterestId) => {
    setFormInterests((prev) => (prev.includes(interest) ? prev : [...prev, interest]))
    if (interest === "city" || interest === "football" || interest === "folklore" || interest === "gastronomy") setFormService("tours")
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
  const focusOnMap = (placeId: PlaceId) => setMapHighlight(placeId)

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

  const startExperienceForPlace = (placeId: PlaceId) => {
    const exp = getExperienceForPlace(placeId)
    if (exp) {
      setActiveExperience(exp.id)
      scrollTo("guiadas")
    } else {
      selectPlace(placeId)
    }
  }

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Header lang={lang} setLang={setLang} onNav={scrollTo} />
      <main>
        <Hero lang={lang} onNav={scrollTo} />
        <Passion lang={lang} />
        <HowItWorks lang={lang} />
        <Services lang={lang} onEnquire={enquireService} />
        <Prices lang={lang} onEnquire={() => scrollTo("reserva")} />
        <Experiences lang={lang} onSelect={selectInterest} />
        <GuidedExperiences
          lang={lang}
          activeId={activeExperience}
          onStart={startExperience}
          onClose={() => setActiveExperience(null)}
          onSelectPlace={selectPlace}
        />
        <Places
          lang={lang}
          onSelect={selectPlace}
          onMapFocus={focusOnMap}
          selectedPlaces={tour.placeIds}
          onToggleTour={togglePlace}
          onStartExperience={startExperienceForPlace}
        />
        <PlacesMap lang={lang} highlightId={mapHighlight} onSelectPlace={selectPlace} />
        <Itineraries lang={lang} onSelectItinerary={selectItinerary} onCustomize={customizeItinerary} />
        <Gastronomy
          lang={lang}
          onSelect={selectGastro}
          selectedRestaurants={tour.restaurantIds}
          onToggleRestaurant={toggleRestaurant}
        />
        <MiQr lang={lang} />
        <EnquiryForm lang={lang} initialService={formService} initialInterests={formInterests} initialPlace={formPlace} />
        <FAQ lang={lang} />
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

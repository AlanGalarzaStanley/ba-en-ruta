import { useState, useCallback } from "react"
import type { ServiceId, InterestId, PlaceId } from "./lib/ba-config"
import { useLang, Header, Hero, Passion } from "./components/HeaderHero"
import { HowItWorks, Services, Prices, Experiences, Places, Gastronomy } from "./components/Sections"
import { PlacesMap } from "./components/PlacesMap"
import { EnquiryForm, FAQ, Footer } from "./components/FormFaq"

export default function App() {
  const [lang, setLang] = useLang()
  const [formService, setFormService] = useState<ServiceId | "">("")
  const [formInterests, setFormInterests] = useState<InterestId[]>([])
  const [formPlace, setFormPlace] = useState<PlaceId | null>(null)
  const [mapHighlight, setMapHighlight] = useState<PlaceId | null>(null)

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} onNav={scrollTo} />
      <main>
        <Hero lang={lang} onNav={scrollTo} />
        <Passion lang={lang} />
        <HowItWorks lang={lang} />
        <Services lang={lang} onEnquire={enquireService} />
        <Prices lang={lang} onEnquire={() => scrollTo("reserva")} />
        <Experiences lang={lang} onSelect={selectInterest} />
        <Places lang={lang} onSelect={selectPlace} />
        <PlacesMap lang={lang} highlightId={mapHighlight} onSelectPlace={selectPlace} />
        <Gastronomy lang={lang} onSelect={selectGastro} />
        <EnquiryForm lang={lang} initialService={formService} initialInterests={formInterests} initialPlace={formPlace} />
        <FAQ lang={lang} />
      </main>
      <Footer lang={lang} onNav={scrollTo} />
    </div>
  )
}

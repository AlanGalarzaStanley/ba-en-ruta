import { describe, expect, it } from "vitest"
import { ITINERARIES, PLACES } from "../../src/lib/ba-config"
import { buildRoute, estimateDrive, formatClock, haversineKm, placeVideo, routeTotals, youtubeId } from "../../src/lib/route"

describe("motor del simulador de recorrido", () => {
  it("cada itinerario empieza con el punto de encuentro y termina con el cierre", () => {
    for (const itin of ITINERARIES) {
      const steps = buildRoute(itin)
      expect(steps[0].kind, itin.id).toBe("pickup")
      expect(steps.at(-1)!.kind, itin.id).toBe("end")
      const places = steps.filter((s) => s.kind === "place")
      expect(places.length, itin.id).toBe(itin.placeIds.length)
    }
  })

  it("los horarios avanzan y los trayectos son razonables", () => {
    for (const itin of ITINERARIES) {
      const geo = buildRoute(itin).filter((s) => s.kind === "place" || s.kind === "food")
      let prev = -1
      for (const s of geo) {
        const [h, m] = s.clock.split(":").map(Number)
        const min = h * 60 + m
        expect(min, `${itin.id} ${s.key}`).toBeGreaterThan(prev)
        prev = min
        expect(s.driveKm).toBeGreaterThanOrEqual(0)
        expect(s.driveKm, `${itin.id} ${s.key}`).toBeLessThan(60)
        expect(s.lat).toBeGreaterThan(-35)
        expect(s.lat).toBeLessThan(-34)
      }
      const totals = routeTotals(buildRoute(itin))
      expect(totals.stops).toBe(geo.length)
      expect(totals.hours).toBeGreaterThan(0)
      expect(totals.hours).toBeLessThan(14)
    }
  })

  it("distancias y tiempos de manejo", () => {
    const obelisco = { lat: -34.6037, lng: -58.3816 }
    const caminito = { lat: -34.6393, lng: -58.3628 }
    const km = haversineKm(obelisco, caminito)
    expect(km).toBeGreaterThan(3.5)
    expect(km).toBeLessThan(5)
    const d = estimateDrive(obelisco, caminito)
    expect(d.min).toBeGreaterThan(5)
    expect(d.min).toBeLessThan(40)
    expect(haversineKm(obelisco, obelisco)).toBe(0)
  })

  it("formato de hora", () => {
    expect(formatClock(9 * 60 + 5)).toBe("09:05")
    expect(formatClock(13 * 60 + 30)).toBe("13:30")
  })

  it("extrae el id de YouTube y resuelve el video por idioma", () => {
    expect(youtubeId("https://www.youtube.com/watch?v=7PWpMvnbQXY")).toBe("7PWpMvnbQXY")
    expect(youtubeId("https://youtu.be/7PWpMvnbQXY")).toBe("7PWpMvnbQXY")
    expect(youtubeId(undefined)).toBeNull()
    const withVideo = PLACES.filter((p) => p.youtube)
    expect(withVideo.length).toBeGreaterThanOrEqual(8)
    for (const p of withVideo) {
      for (const lang of ["es", "en", "pt"] as const) {
        const v = placeVideo(p, lang)
        expect(v, `${p.id}/${lang}`).toBeTruthy()
        expect(youtubeId(v!), `${p.id}/${lang}`).toMatch(/^[\w-]{11}$/)
      }
    }
  })
})

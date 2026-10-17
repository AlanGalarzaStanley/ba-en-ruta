import { describe, expect, it } from "vitest"
import { DEFAULT_PROXIMITY, distanceM, emptyProximity, evaluateFix, type GeoStop } from "../../src/lib/proximity"

const OBELISCO = { lat: -34.6037, lng: -58.3816 }
const RECOLETA = { lat: -34.5875, lng: -58.393 }
const stops: GeoStop[] = [
  { key: "obelisco-colon", ...OBELISCO },
  { key: "recoleta", ...RECOLETA },
  { key: "tigre", lat: -34.426, lng: -58.5796, minRadiusM: 800 },
]
// Desplaza unos metros hacia el norte (1° lat ≈ 111 km)
const north = (p: { lat: number; lng: number }, m: number) => ({ lat: p.lat + m / 111_000, lng: p.lng })

describe("proximidad", () => {
  it("distanceM es razonable", () => {
    const d = distanceM(OBELISCO, RECOLETA)
    expect(d).toBeGreaterThan(1900)
    expect(d).toBeLessThan(2200)
  })
  it("confirma la llegada con 2 lecturas dentro del radio", () => {
    let s = emptyProximity()
    const fix = { ...north(OBELISCO, 120), accuracy: 60 }
    const a = evaluateFix(s, fix, stops)
    expect(a.arrivedKey).toBeNull()
    s = a.state
    const b = evaluateFix(s, fix, stops)
    expect(b.arrivedKey).toBe("obelisco-colon")
    // no vuelve a dispararse
    const c = evaluateFix(b.state, fix, stops)
    expect(c.arrivedKey).toBeNull()
    expect(c.nearest?.key).toBe("recoleta")
  })
  it("una lectura muy precisa alcanza", () => {
    const r = evaluateFix(emptyProximity(), { ...north(OBELISCO, 50), accuracy: 10 }, stops)
    expect(r.arrivedKey).toBe("obelisco-colon")
    expect(r.nearest?.key).toBe("recoleta") // la siguiente pendiente, no la recién visitada
  })
  it("ignora lecturas imprecisas y lejanas", () => {
    expect(evaluateFix(emptyProximity(), { ...OBELISCO, accuracy: 900 }, stops).ignored).toBe("low_accuracy")
    const far = evaluateFix(emptyProximity(), { ...north(OBELISCO, 600), accuracy: 10 }, stops)
    expect(far.arrivedKey).toBeNull()
    expect(far.state.candidate).toBeNull()
  })
  it("una lectura fuera del radio reinicia la confirmación", () => {
    const a = evaluateFix(emptyProximity(), { ...north(OBELISCO, 100), accuracy: 80 }, stops)
    const b = evaluateFix(a.state, { ...north(OBELISCO, 900), accuracy: 80 }, stops)
    const c = evaluateFix(b.state, { ...north(OBELISCO, 100), accuracy: 80 }, stops)
    expect(c.arrivedKey).toBeNull()
  })
  it("respeta el radio mínimo de paradas extensas y el radio configurable", () => {
    const fix = { lat: -34.426 + 600 / 111_000, lng: -58.5796, accuracy: 10 }
    expect(evaluateFix(emptyProximity(), fix, stops).arrivedKey).toBe("tigre")
    const fix2 = { ...north(OBELISCO, 400), accuracy: 10 }
    expect(evaluateFix(emptyProximity(), fix2, stops).arrivedKey).toBeNull()
    expect(evaluateFix(emptyProximity(), fix2, stops, { ...DEFAULT_PROXIMITY, radiusM: 500 }).arrivedKey).toBe("obelisco-colon")
  })
  it("permite cambiar el orden: llega a la parada que esté cerca", () => {
    const r = evaluateFix(emptyProximity(), { ...RECOLETA, accuracy: 5 }, stops)
    expect(r.arrivedKey).toBe("recoleta")
  })
})

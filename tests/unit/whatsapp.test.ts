import { describe, expect, it } from "vitest"
import { buildTourWhatsAppMessage, getWhatsAppUrl } from "../../src/lib/whatsapp"
import { ITINERARIES } from "../../src/lib/ba-config"

describe("WhatsApp", () => {
  it("arma una URL wa.me válida con el número del negocio", () => {
    const url = getWhatsAppUrl("Hola")!
    expect(url).toMatch(/^https:\/\/wa\.me\/5491151448632\?text=Hola$/)
  })
  it("el mensaje del recorrido nombra el itinerario en cada idioma", () => {
    const itin = ITINERARIES.find((i) => i.id === "historica")!
    for (const lang of ["es", "en", "pt"] as const) {
      const msg = buildTourWhatsAppMessage({ lang, placeIds: itin.placeIds, restaurantIds: itin.restaurantIds ?? [], itineraryId: itin.id })
      expect(msg.length, lang).toBeGreaterThan(30)
      expect(msg, lang).not.toMatch(/undefined|\[object/)
    }
  })
})

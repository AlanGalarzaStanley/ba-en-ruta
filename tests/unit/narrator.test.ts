import { describe, expect, it } from "vitest"
import { chunkText, pickVoice } from "../../src/lib/narrator"

describe("narrador", () => {
  it("divide en frases sin perder texto", () => {
    const t = "Primera frase. Segunda frase, más larga que la anterior! ¿Tercera? Última sin punto"
    const parts = chunkText(t, 30)
    expect(parts.join(" ").replace(/\s+/g, " ")).toBe(t)
    for (const p of parts) expect(p.length).toBeLessThanOrEqual(60)
  })
  it("elige la voz preferida por idioma", () => {
    const v = (lang: string) => ({ lang, name: lang }) as SpeechSynthesisVoice
    const voices = [v("en-GB"), v("es-ES"), v("es-AR"), v("pt-PT")]
    expect(pickVoice(voices, "es")?.lang).toBe("es-AR")
    expect(pickVoice(voices, "en")?.lang).toBe("en-GB")
    expect(pickVoice(voices, "pt")?.lang).toBe("pt-PT")
    expect(pickVoice([v("fr-FR")], "es")).toBeNull()
  })
})

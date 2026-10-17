import { describe, expect, it } from "vitest"
import { commonsDirect, imageSrcSet, optimizeImage } from "../../src/lib/img"

const fp = (f: string, w = 1280) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=${w}`

describe("optimización de imágenes", () => {
  it("convierte Special:FilePath en miniatura directa de tamaño estándar", () => {
    expect(optimizeImage(fp("Buenos_Aires_Caminito_4.jpg"), 1600)).toBe(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Buenos_Aires_Caminito_4.jpg/1920px-Buenos_Aires_Caminito_4.jpg",
    )
    expect(optimizeImage(fp("Buenos_Aires_Caminito_4.jpg"), 400)).toContain("/500px-")
  })
  it("nunca pide una miniatura más grande que el original", () => {
    const u = commonsDirect("Bombonera_Boca_Juniors.JPG", 1920) // original de 2048 px
    expect(u).toContain("/1920px-")
    const big = commonsDirect("Bombonera_Boca_Juniors.JPG", 4000)
    expect(big).toContain("/1920px-")
  })
  it("codifica nombres con acentos y comas", () => {
    const u = optimizeImage(fp("Café_Tortoni,_Buenos_Aires_-Argentina_-_panoramio.jpg"), 500)!
    expect(u).toMatch(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\//)
    expect(u).toContain("Caf%C3%A9_Tortoni%2C_")
  })
  it("deja intactas las URLs desconocidas y ajusta Pexels", () => {
    expect(optimizeImage("https://example.com/a.jpg", 500)).toBe("https://example.com/a.jpg")
    expect(optimizeImage(fp("Archivo_inexistente.jpg"), 500)).toBe(fp("Archivo_inexistente.jpg"))
    const px = optimizeImage("https://images.pexels.com/photos/1/p.jpeg?auto=compress&cs=tinysrgb&w=1920", 960)
    expect(px).toContain("w=960")
  })
  it("arma srcset con anchos reales", () => {
    const s = imageSrcSet(fp("Buenos_Aires_Caminito_4.jpg"), [500, 960, 1280])!
    expect(s.split(", ")).toHaveLength(3)
    expect(s).toMatch(/500px-.* 500w/)
    expect(imageSrcSet("https://example.com/a.jpg")).toBeUndefined()
  })
})

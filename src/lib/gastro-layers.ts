/**
 * Capas comerciales de gastronomía (no reemplazan el catálogo completo).
 * layer:
 *  - classic: iconos de alta demanda turística
 *  - driver: recomendación personal del propietario (experiencia directa)
 *  - barrio: bodegones / clubes / parrillas populares verificadas
 * No inventar precios ni horarios no confirmados.
 */

export type GastroLayer = "classic" | "driver" | "barrio"

/** IDs del catálogo existente marcados como clásicos */
export const CLASSIC_IDS = ["don-julio", "cabrera", "preferido", "tortoni"] as const

/**
 * Fichas adicionales (recomendados personales y barrio).
 * Fuentes verificadas 2026-10-18; sin fotos Commons inventadas.
 */
export interface DriverGastroCard {
  id: string
  layer: GastroLayer
  name: string
  category: "parrilla" | "bodegon" | "tango-dinner"
  neighborhood: string
  locality: string
  address: string
  descEs: string
  whyEs: string
  /** Etiqueta visible: personal vs verificable */
  badgeEs: string
  badgeEn: string
  badgePt: string
  url?: string
  instagramUrl?: string
  sources: string[]
  reviewedAt: string
  confidence: "verified" | "listed"
  statusNoteEs?: string
}

export const DRIVER_GASTRO: DriverGastroCard[] = [
  {
    id: "caminito-tango-show",
    layer: "driver",
    name: "Caminito Tango Show",
    category: "tango-dinner",
    neighborhood: "La Boca",
    locality: "CABA",
    address: "Dr. del Valle Iberlucea 1151",
    descEs:
      "Restaurante en La Boca con propuesta de almuerzo y show de tango. Horario habitual de día (aprox. 11–18); confirmar antes de ir.",
    whyEs:
      "Recomendación personal del chofer: conoce el lugar de cerca (trabajó allí). Ambiente limpio, atención cuidada y comida sólida para combinar con Caminito.",
    badgeEs: "Recomendado por el chofer",
    badgeEn: "Driver’s pick",
    badgePt: "Recomendado pelo motorista",
    sources: ["broccolino.com.ar", "restaurantguru / fichas públicas 2026"],
    reviewedAt: "2026-10-18",
    confidence: "listed",
    statusNoteEs: "No es acuerdo comercial publicado; es recomendación personal. Confirmá horarios el día del servicio.",
  },
  {
    id: "los-bohemios",
    layer: "barrio",
    name: "Los Bohemios",
    category: "bodegon",
    neighborhood: "Villa Crespo",
    locality: "CABA",
    address: "Humboldt 538 (predio Club Atlético Atlanta)",
    descEs:
      "Bodegón del Club Atlanta: porciones abundantes, ambiente de club de barrio y cocina para compartir.",
    whyEs:
      "Fútbol de barrio y mesa larga en el mismo predio. Ideal si quieren algo genuino fuera del circuito solo-turista de Palermo.",
    badgeEs: "Club de barrio",
    badgeEn: "Neighborhood club",
    badgePt: "Clube de bairro",
    url: "https://caatlanta.com.ar/los-bohemios-restaurante/",
    instagramUrl: "https://www.instagram.com/losbohemios.bodegon/",
    sources: ["caatlanta.com.ar", "prensa local 2025–2026"],
    reviewedAt: "2026-10-18",
    confidence: "verified",
  },
  {
    id: "el-tano-avellaneda",
    layer: "barrio",
    name: "Parrilla El Tano",
    category: "parrilla",
    neighborhood: "Wilde / Avellaneda",
    locality: "GBA Sur",
    address: "Zona Avellaneda–Wilde (confirmar sucursal al cotizar)",
    descEs:
      "Parrilla libre clásica del sur del GBA: carnes, pastas y formato generoso. Ambiente muy porteño de conurbano.",
    whyEs:
      "Para quien quiere parrilla libre con clima popular, no solo la postal de Palermo. Hay más de una sucursal histórica; coordinamos la dirección exacta por WhatsApp.",
    badgeEs: "Parrilla libre (GBA)",
    badgeEn: "All-you-can-eat grill (GBA)",
    badgePt: "Churrasco livre (GBA)",
    sources: ["prensa local Avellaneda/Wilde 2024–2026"],
    reviewedAt: "2026-10-18",
    confidence: "listed",
    statusNoteEs: "Sucursal a confirmar (Wilde u otra activa). No publicar precio fijo aquí.",
  },
]

export const LAYER_LABELS = {
  classic: { es: "Clásicos", en: "Classics", pt: "Clássicos" },
  driver: { es: "Del chofer", en: "Driver’s picks", pt: "Do motorista" },
  barrio: { es: "Barrio y clubes", en: "Neighborhood", pt: "Bairro e clubes" },
  all: { es: "Catálogo", en: "Full list", pt: "Catálogo" },
} as const

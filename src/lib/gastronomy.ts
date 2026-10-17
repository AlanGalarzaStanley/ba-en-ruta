/**
 * Catálogo gastronómico BA en Ruta
 * Fuentes: GCBA Bares Notables, sitios oficiales, turismo.buenosaires.gob.ar
 * confidence: verified = oficial/GCBA; listed = fuente confiable sin web propia confirmada
 * No inventar teléfonos, horarios ni precios sin fuente.
 */

export type GastroCategory =
  | "cafe"
  | "parrilla"
  | "bodegon"
  | "pizza"
  | "market"
  | "contemporary"
  | "sweets"

export type GastroConfidence = "verified" | "listed"

export interface GastroPlace {
  id: string
  name: string
  category: GastroCategory
  neighborhood: string
  locality: string
  address: string
  descEs: string
  whyEs: string
  url?: string
  reserveUrl?: string
  image?: string
  placeIds?: string[]
  confidence: GastroConfidence
  sources: string[]
}

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=900`

export const GASTRO_CATEGORIES: { id: GastroCategory | "all"; labelEs: string; labelEn: string; labelPt: string }[] = [
  { id: "all", labelEs: "Todos", labelEn: "All", labelPt: "Todos" },
  { id: "cafe", labelEs: "Cafés y bares notables", labelEn: "Notable cafés & bars", labelPt: "Cafés e bares notáveis" },
  { id: "parrilla", labelEs: "Parrillas y asado", labelEn: "Steak houses", labelPt: "Churrascarias" },
  { id: "bodegon", labelEs: "Bodegones y clásicos", labelEn: "Classic bodegones", labelPt: "Bodegones clássicos" },
  { id: "pizza", labelEs: "Pizzerías y empanadas", labelEn: "Pizza & empanadas", labelPt: "Pizzarias e empanadas" },
  { id: "market", labelEs: "Mercados", labelEn: "Markets", labelPt: "Mercados" },
  { id: "contemporary", labelEs: "Cocina contemporánea", labelEn: "Contemporary", labelPt: "Contemporânea" },
  { id: "sweets", labelEs: "Dulces y helados", labelEn: "Sweets & ice cream", labelPt: "Doces e sorvetes" },
]

export const GASTRO_PLACES: GastroPlace[] = [
  {
    id: "tortoni",
    name: "Café Tortoni",
    category: "cafe",
    neighborhood: "Monserrat",
    locality: "CABA",
    address: "Av. de Mayo 825",
    descEs: "El café más icónico de la ciudad, fundado en 1858. Mármol, espejos y memoria cultural porteña.",
    whyEs: "Parada obligada del centro histórico; chocolate con churros y ambiente de otro siglo.",
    url: "https://www.cafetortoni.com.ar/",
    image: commons("Cafe_Tortoni_Buenos_Aires.jpg"),
    placeIds: ["obelisco-colon", "san-telmo-plaza"],
    confidence: "verified",
    sources: ["cafetortoni.com.ar", "turismo.buenosaires.gob.ar"],
  },
  {
    id: "las-violetas",
    name: "Confitería Las Violetas",
    category: "cafe",
    neighborhood: "Almagro",
    locality: "CABA",
    address: "Av. Rivadavia 3899",
    descEs: "Confitería notable de 1884, vidrieras y pastelería clásica en la esquina de Medrano.",
    whyEs: "Té de la tarde, masas y la estética más fotogénica del oeste porteño.",
    url: "https://www.lasvioletas.com/",
    placeIds: ["palermo"],
    confidence: "verified",
    sources: ["lasvioletas.com", "GCBA Bares Notables"],
  },
  {
    id: "el-federal",
    name: "Bar El Federal",
    category: "cafe",
    neighborhood: "San Telmo",
    locality: "CABA",
    address: "Carlos Calvo 599",
    descEs: "Bar notable en esquina histórica de San Telmo; mostrador de madera y clima de almacén.",
    whyEs: "Picada, vermut y el ambiente de barrio que define el sur de la ciudad.",
    placeIds: ["san-telmo-plaza"],
    confidence: "verified",
    sources: ["GCBA Bares Notables", "turismo.buenosaires.gob.ar"],
  },
  {
    id: "bar-britanico",
    name: "Bar Británico",
    category: "cafe",
    neighborhood: "San Telmo",
    locality: "CABA",
    address: "Brasil 399 (Parque Lezama)",
    descEs: "Esquina frente al Parque Lezama; casi un siglo de café y encuentro de barrio.",
    whyEs: "Desayuno o vermut con vista al parque y ritmo porteño auténtico.",
    placeIds: ["san-telmo-plaza"],
    confidence: "verified",
    sources: ["GCBA Bares Notables", "turismo.buenosaires.gob.ar"],
  },
  {
    id: "los-laureles",
    name: "Los Laureles",
    category: "cafe",
    neighborhood: "Barracas",
    locality: "CABA",
    address: "Av. Gral. Iriarte 2300",
    descEs: "Bar notable de Barracas con historia de tango y mesa de vecinos.",
    whyEs: "Fuera del circuito turístico típico; sabor de barrio del sur.",
    confidence: "verified",
    sources: ["GCBA Bares Notables"],
  },
  {
    id: "la-biela",
    name: "La Biela",
    category: "cafe",
    neighborhood: "Recoleta",
    locality: "CABA",
    address: "Av. Quintana 596",
    descEs: "Café notable junto a la Recoleta; terraza bajo los árboles y tradición de pilotos y escritores.",
    whyEs: "Después del cementerio o del museo, un café con historia en pleno Recoleta.",
    url: "https://labiela.com/",
    placeIds: ["recoleta"],
    confidence: "verified",
    sources: ["labiela.com", "GCBA Bares Notables"],
  },
  {
    id: "la-poesia",
    name: "Bar La Poesía",
    category: "cafe",
    neighborhood: "San Telmo",
    locality: "CABA",
    address: "Chile 502",
    descEs: "Bar notable con librería y homenaje a la cultura escrita de Buenos Aires.",
    whyEs: "Café, lectura y clima de San Telmo sin la multitud de la feria.",
    placeIds: ["san-telmo-plaza"],
    confidence: "verified",
    sources: ["GCBA Bares Notables"],
  },
  {
    id: "el-gato-negro",
    name: "El Gato Negro",
    category: "cafe",
    neighborhood: "Balvanera",
    locality: "CABA",
    address: "Av. Corrientes 1669",
    descEs: "Casa de café y especias en Corrientes; aroma a tostado y vitrinas de otro tiempo.",
    whyEs: "Parada entre teatros; café y especias en la avenida que nunca duerme.",
    confidence: "verified",
    sources: ["GCBA Bares Notables"],
  },
  {
    id: "36-billares",
    name: "Los 36 Billares",
    category: "cafe",
    neighborhood: "Monserrat",
    locality: "CABA",
    address: "Av. de Mayo 1265",
    descEs: "Café y billar histórico en Avenida de Mayo desde fines del siglo XIX.",
    whyEs: "Mesas de billar, café y la avenida más española de Buenos Aires.",
    placeIds: ["obelisco-colon"],
    confidence: "verified",
    sources: ["GCBA Bares Notables"],
  },
  {
    id: "la-giralda",
    name: "La Giralda",
    category: "cafe",
    neighborhood: "Balvanera",
    locality: "CABA",
    address: "Av. Corrientes 1453",
    descEs: "Clásico de Corrientes famoso por el chocolate con churros.",
    whyEs: "Parada nocturna entre cines y teatros; chocolate espeso de leyenda.",
    confidence: "verified",
    sources: ["GCBA Bares Notables"],
  },
  {
    id: "homero-manzi",
    name: "Esquina Homero Manzi",
    category: "cafe",
    neighborhood: "Boedo",
    locality: "CABA",
    address: "San Juan 3601",
    descEs: "Esquina de tango y café notable en Boedo, ligada a Homero Manzi.",
    whyEs: "Tango, historia del sur y un café fuera del centro turístico.",
    confidence: "verified",
    sources: ["GCBA Bares Notables"],
  },
  {
    id: "florida-garden",
    name: "Florida Garden",
    category: "cafe",
    neighborhood: "Retiro",
    locality: "CABA",
    address: "Florida 899",
    descEs: "Confitería notable en la peatonal Florida; clásico del centro.",
    whyEs: "Café y medialunas en el corazón comercial de la ciudad.",
    confidence: "verified",
    sources: ["GCBA Bares Notables"],
  },
  {
    id: "don-julio",
    name: "Don Julio",
    category: "parrilla",
    neighborhood: "Palermo",
    locality: "CABA",
    address: "Guatemala 4699",
    descEs: "Parrilla de referencia mundial en Palermo; carnes y bodega argentina de alto nivel.",
    whyEs: "La experiencia de asado más premiada de la ciudad; conviene reservar con anticipación.",
    url: "https://www.parrilladonjulio.com/",
    placeIds: ["palermo"],
    confidence: "verified",
    sources: ["parrilladonjulio.com", "Latin America's 50 Best"],
  },
  {
    id: "cabrera",
    name: "La Cabrera",
    category: "parrilla",
    neighborhood: "Palermo",
    locality: "CABA",
    address: "José Antonio Cabrera 5099",
    descEs: "Parrilla icónica de Palermo Soho; porciones generosas y guarniciones de la casa.",
    whyEs: "Asado generoso y ambiente de barrio en el corazón de Palermo.",
    url: "https://www.parrillalacabrera.com.ar/",
    placeIds: ["palermo"],
    confidence: "verified",
    sources: ["parrillalacabrera.com.ar"],
  },
  {
    id: "preferido",
    name: "El Preferido de Palermo",
    category: "bodegon",
    neighborhood: "Palermo",
    locality: "CABA",
    address: "Jorge Luis Borges 2108",
    descEs: "Almacén-restaurante restaurado; cocina porteña y clima de esquina de Palermo.",
    whyEs: "Clásico renovado: buena carta, vinos y la esquina más fotogénica del barrio.",
    url: "https://elpreferidodepalermo.com.ar/",
    placeIds: ["palermo"],
    confidence: "verified",
    sources: ["elpreferidodepalermo.com.ar"],
  },
  {
    id: "lo-de-jesus",
    name: "Lo de Jesús",
    category: "parrilla",
    neighborhood: "Palermo",
    locality: "CABA",
    address: "Gurruchaga 1406",
    descEs: "Parrilla de barrio en Palermo con reputación sólida entre locales y visitantes.",
    whyEs: "Alternativa a las parrillas más mediáticas, con buen fuego y clima informal.",
    placeIds: ["palermo"],
    confidence: "listed",
    sources: ["Time Out Buenos Aires"],
  },
  {
    id: "el-sanjuanino",
    name: "El Sanjuanino",
    category: "bodegon",
    neighborhood: "Recoleta",
    locality: "CABA",
    address: "Posadas 1515",
    descEs: "Casa de empanadas y cocina regional cerca de Recoleta.",
    whyEs: "Empanadas y platos de provincia a pasos de los museos del norte.",
    placeIds: ["recoleta"],
    confidence: "listed",
    sources: ["guías locales"],
  },
  {
    id: "el-cuartito",
    name: "El Cuartito",
    category: "pizza",
    neighborhood: "Recoleta",
    locality: "CABA",
    address: "Talcahuano 937",
    descEs: "Pizzería histórica de Buenos Aires; pizza al molde y ambiente de época.",
    whyEs: "La pizza porteña de toda la vida, cerca del centro y Recoleta.",
    placeIds: ["recoleta", "obelisco-colon"],
    confidence: "listed",
    sources: ["tradición gastronómica porteña"],
  },
  {
    id: "guerrin",
    name: "Güerrín",
    category: "pizza",
    neighborhood: "San Nicolás",
    locality: "CABA",
    address: "Av. Corrientes 1368",
    descEs: "Pizzería de Corrientes abierta casi todo el día; porciones al paso o mesa.",
    whyEs: "Pizza de medianoche en la avenida de los teatros.",
    placeIds: ["obelisco-colon"],
    confidence: "listed",
    sources: ["tradición porteña"],
  },
  {
    id: "la-mezzetta",
    name: "La Mezzetta",
    category: "pizza",
    neighborhood: "Villa Crespo",
    locality: "CABA",
    address: "Av. Álvarez Thomas 1300",
    descEs: "Pizzería de culto en Villa Crespo; porción al mostrador.",
    whyEs: "Ritual porteño: pizza de pie en la vereda.",
    confidence: "listed",
    sources: ["guías locales"],
  },
  {
    id: "mercado-san-telmo",
    name: "Mercado de San Telmo",
    category: "market",
    neighborhood: "San Telmo",
    locality: "CABA",
    address: "Defensa 963",
    descEs: "Mercado histórico de 1897; antigüedades, puestos de comida y arquitectura de hierro y vidrio.",
    whyEs: "Recorrido sensorial del barrio más antiguo: café, empanadas y curiosidades bajo la cúpula.",
    url: "https://mercadosantelmo.com.ar/",
    placeIds: ["san-telmo-plaza"],
    confidence: "verified",
    sources: ["mercadosantelmo.com.ar", "turismo.buenosaires.gob.ar"],
  },
  {
    id: "mercat-villa-crespo",
    name: "Mercat Villa Crespo",
    category: "market",
    neighborhood: "Villa Crespo",
    locality: "CABA",
    address: "Thames 747",
    descEs: "Mercado gastronómico contemporáneo en tres plantas; cocina diversa y ambiente urbano.",
    whyEs: "Muchas opciones en un solo lugar; ideal para ir sin plan fijo.",
    url: "https://mercatmercado.com/",
    placeIds: ["palermo"],
    confidence: "verified",
    sources: ["mercatmercado.com", "turismo.buenosaires.gob.ar"],
  },
  {
    id: "mercado-progreso",
    name: "Mercado del Progreso",
    category: "market",
    neighborhood: "Caballito",
    locality: "CABA",
    address: "Av. Rivadavia 5200",
    descEs: "Mercado de barrio en Caballito con puestos de frescos y gastronomía.",
    whyEs: "Vida cotidiana porteña fuera del circuito turístico del centro.",
    url: "https://www.mercadodelprogreso.com/",
    confidence: "verified",
    sources: ["mercadodelprogreso.com"],
  },
  {
    id: "puerto-frutos",
    name: "Puerto de Frutos",
    category: "market",
    neighborhood: "Tigre",
    locality: "Tigre (GBA)",
    address: "Sarmiento y Río Luján, Tigre",
    descEs: "Mercado ribereño de artesanías y comida junto al Delta.",
    whyEs: "Parada natural en una escapada a Tigre; paseo y algo para picar.",
    placeIds: ["tigre"],
    confidence: "listed",
    sources: ["turismo Tigre"],
  },
  {
    id: "fogon-asado",
    name: "Fogón Asado Experience",
    category: "contemporary",
    neighborhood: "San Telmo",
    locality: "CABA",
    address: "San Telmo (consultar sede)",
    descEs: "Experiencia de asado contemporáneo reconocida en rankings internacionales.",
    whyEs: "Para quienes buscan asado con formato de experiencia.",
    placeIds: ["san-telmo-plaza"],
    confidence: "listed",
    sources: ["prensa gastronómica"],
  },
  {
    id: "cadore",
    name: "Heladería Cadore",
    category: "sweets",
    neighborhood: "San Nicolás",
    locality: "CABA",
    address: "Av. Corrientes 1695",
    descEs: "Heladería clásica de Corrientes; dulce de leche y sabores argentinos de referencia.",
    whyEs: "Cierre dulce después del teatro o de una parrilla.",
    placeIds: ["obelisco-colon"],
    confidence: "listed",
    sources: ["tradición heladera porteña"],
  },
  {
    id: "scuzo",
    name: "Scuzo",
    category: "sweets",
    neighborhood: "Palermo",
    locality: "CABA",
    address: "Palermo",
    descEs: "Helados artesanales muy valorados en el circuito de Palermo.",
    whyEs: "Pausa dulce entre paseos por Soho o Hollywood.",
    placeIds: ["palermo"],
    confidence: "listed",
    sources: ["guías gastronómicas"],
  },
]

export function gastroByCategory(cat: GastroCategory | "all"): GastroPlace[] {
  if (cat === "all") return GASTRO_PLACES
  return GASTRO_PLACES.filter((g) => g.category === cat)
}

export function gastroSearch(q: string, cat: GastroCategory | "all" = "all"): GastroPlace[] {
  const base = gastroByCategory(cat)
  const s = q.trim().toLowerCase()
  if (!s) return base
  return base.filter(
    (g) =>
      g.name.toLowerCase().includes(s) ||
      g.neighborhood.toLowerCase().includes(s) ||
      g.locality.toLowerCase().includes(s) ||
      g.address.toLowerCase().includes(s) ||
      g.descEs.toLowerCase().includes(s),
  )
}

export function getGastro(id: string): GastroPlace | undefined {
  return GASTRO_PLACES.find((g) => g.id === id)
}

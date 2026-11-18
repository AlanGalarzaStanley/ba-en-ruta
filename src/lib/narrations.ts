import type { PlaceId, RestaurantId } from "./ba-config"

export type NarrationEntry = {
  script: string
  /** Ruta pública del audio cuando el dueño grabe y lo suba. Se deja vacío hasta entonces. */
  audioSrc?: string
  /** Estado editorial: guion listo, audio pendiente o audio publicado. */
  audioStatus: "script-ready" | "audio-pending" | "published"
  /** Texto breve de costo para completar con fuente y fecha antes de publicar un importe. */
  costStatus: "free-exterior" | "paid-pending" | "observed-reconfirm" | "not-included"
  costNote: string
}

export const PLACE_NARRATIONS: Partial<Record<PlaceId, NarrationEntry>> = {
  "san-telmo-plaza": {
    audioStatus: "script-ready",
    costStatus: "free-exterior",
    costNote: "Recorrido exterior sin costo de acceso. Mercado, comidas, compras o visitas internas se confirman aparte.",
    script: "Mirá San Telmo más allá de la feria. En Defensa, las casas bajas, los patios y el empedrado cuentan cómo se habitó Buenos Aires. Plaza Dorrego y el Mercado no son sólo lugares para sacar fotos: nacieron ligados al comercio, la inmigración y la conexión con el puerto. Si paramos a comer, elegimos según el día; no hace falta convertir cada parada en una obligación.",
  },
  caminito: {
    audioStatus: "script-ready",
    costStatus: "free-exterior",
    costNote: "Caminito y Vuelta de Rocha: recorrido exterior sin costo de acceso. Consumos, fotos, artesanías y espectáculos son opcionales.",
    script: "Antes de mirar los colores, mirá el suelo y la curva de la calle. Por acá pasó un arroyo y después funcionó un ramal ferroviario. Caminito se recuperó con vecinos y artistas, pero La Boca no termina en la postal. La calle es la puerta; el barrio, el puerto, el trabajo y la gente son el contexto.",
  },
  recoleta: {
    audioStatus: "script-ready",
    costStatus: "paid-pending",
    costNote: "La visita exterior y los guiados oficiales pueden tener condiciones distintas. Entrada y modalidad se reconfirman antes de reservar.",
    script: "No vengas a Recoleta solamente a buscar la tumba de Evita. Mirá los pasajes, las puertas, los mármoles y las esculturas: este cementerio se lee como una ciudad pequeña, construida por familias que querían dejar una marca. La historia está también en los detalles que quedan fuera de la foto rápida.",
  },
  palermo: {
    audioStatus: "script-ready",
    costStatus: "free-exterior",
    costNote: "Rosedal, lagos y paseos públicos: sin costo de acceso. Botes, bicicletas, comidas o actividades privadas se confirman aparte.",
    script: "Acá el plan no es correr detrás de otro monumento. Caminamos por el Rosedal, seguimos hacia los lagos y dejamos que el día baje un cambio. Si pinta, una pelota, unos mates o un picnic pueden explicar Buenos Aires mejor que otra foto apurada. Lo porteño también es saber quedarse.",
  },
  "obelisco-colon": {
    audioStatus: "script-ready",
    costStatus: "free-exterior",
    costNote: "Obelisco y exterior del Colón: sin costo de acceso. Visita guiada del Teatro Colón y mirador se confirman por canal oficial.",
    script: "El Obelisco no se entiende sólo de frente. Mirá cómo Corrientes corta la 9 de Julio y buscá la única puerta del monumento. Después, en el Colón, si entramos, no mires sólo la sala: escaleras, vitrales, bustos y el Salón Dorado cuentan otra ciudad, la que quiso construir una capital monumental.",
  },
  tigre: {
    audioStatus: "script-ready",
    costStatus: "paid-pending",
    costNote: "Caminar es gratuito; embarque, recreos, parrilla, comidas y compras requieren operador, tarifa y condiciones confirmadas.",
    script: "Tigre se entiende desde la Estación Fluvial. Mirá quiénes esperan y qué muelles usan: la lancha no es sólo paseo, también es transporte. En el Delta fijate en las casas, las escuelas, los clubes de remo y los servicios que llegan por agua. No es naturaleza vacía: es una ciudad con calles de río.",
  },
}

export const RESTAURANT_NARRATIONS: Partial<Record<RestaurantId, NarrationEntry>> = {
  "los-bohemios": {
    audioStatus: "script-ready",
    costStatus: "paid-pending",
    costNote: "Consumo y acceso sujetos a apertura, menú, reserva y precio confirmados con el local.",
    script: "Esta mesa no aparece por casualidad. Los Bohemios está en el entorno de Atlanta y conecta comida abundante, fútbol y Villa Crespo. Si está abierto y la operación está confirmada, comemos; si no, el barrio igual cuenta su historia desde la vereda.",
  },
  "el-tano": {
    audioStatus: "script-ready",
    costStatus: "paid-pending",
    costNote: "Variante fuera de La Boca: no vender hasta confirmar dirección, horario, menú, precio, estacionamiento y disponibilidad.",
    script: "El Tano sólo entra como extensión confirmada. La idea es terminar el día con una parrilla popular del sur, después de haber recorrido el fútbol de La Boca. Primero estacionamos y verificamos que el lugar esté operando; cualquier bebida queda para después, con consumo responsable y sin volver a conducir.",
  },
}

export function getPlaceNarration(id: PlaceId): NarrationEntry | undefined {
  return PLACE_NARRATIONS[id]
}

export function getRestaurantNarration(id: RestaurantId): NarrationEntry | undefined {
  return RESTAURANT_NARRATIONS[id]
}

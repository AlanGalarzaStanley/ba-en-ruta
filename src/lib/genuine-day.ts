/**
 * Días porteños diseñados como experiencias reales: ritmo local + comida según la hora.
 * Los consumos, entradas y navegación son aparte; no se inventa que el chofer provea comida.
 */
import type { ItineraryId } from "./ba-config"
import type { Lang } from "./ba-copy"

export type DayBeat = {
  when: string
  what: string
}

type Day = { lead: string; beats: DayBeat[]; foodNote: string }

const daysEs: Record<ItineraryId, Day> = {
  historica: {
    lead: "La ciudad se entiende caminándola y comiéndola a su hora: café temprano, adoquines, color y un cierre junto al río.",
    beats: [
      { when: "09:00 · desayuno porteño", what: "Café con leche y medialunas, tostadas con dulce de leche o un alfajor en Café Tortoni, según carta y disponibilidad. La mesa la paga el viajero." },
      { when: "09:45 · Plaza de Mayo", what: "Casa Rosada, Cabildo y Catedral desde el exterior: el centro político de la ciudad contado sin apuro, con espacio para conversar sobre cómo se vive Buenos Aires hoy." },
      { when: "10:40 · San Telmo", what: "Defensa, Plaza Dorrego y adoquines. Mate como costumbre social: cómo se ceba, por qué se comparte y por qué no hace falta convertirlo en una degustación armada." },
      { when: "11:45 · Caminito y La Boca", what: "Caminata por la calle museo, Vuelta de Rocha y la historia de Quinquela Martín. Pausa opcional en La Perla de Caminito para café, empanada o bebida." },
      { when: "13:00 · almuerzo y cierre", what: "Almuerzo opcional en La Boca o regreso por Puerto Madero, según energía y horario. La variante corta termina tras Caminito; la larga suma mesa y margen de tráfico." },
    ],
    foodNote: "Incluye el traslado y la coordinación del tiempo, no comidas, propinas, entradas ni reservas. La Perla y cualquier parrilla se confirman según el día.",
  },
  clasica: {
    lead: "La postal clásica funciona mejor cuando deja de correr: café, patrimonio, una mesa de bodegón y el verde del Rosedal.",
    beats: [
      { when: "09:00 · desayuno", what: "Café con leche y medialunas o tostadas en Café Tortoni, si el punto de salida y la disponibilidad lo permiten. Alternativa: comenzar directo por el centro." },
      { when: "09:45 · Obelisco y Colón", what: "Corrientes, 9 de Julio y Teatro Colón: escala urbana, vida porteña y una visita interior solo si existe entrada y cupo oficial para ese día." },
      { when: "11:30 · Recoleta", what: "Cementerio de la Recoleta con respeto, arquitectura y la historia de Eva Perón. No se promete visita guiada ni horario especial: se confirma antes de salir." },
      { when: "13:00 · almuerzo de bodegón", what: "Bar Los Galgos como mesa concreta para empanadas, carne, café y flan con dulce de leche, siempre sujeto a carta, reserva y disponibilidad." },
      { when: "14:15 · Rosedal y lagos", what: "Caminata digestiva por los Bosques de Palermo, el lago y el Rosedal. Es el cierre verde que diferencia esta ruta de las del sur y de la gastronómica." },
    ],
    foodNote: "Comidas, entradas y propinas no están incluidas. El Rosedal es un paseo público; Colón y Recoleta dependen de horarios y condiciones oficiales.",
  },
  gastronomica: {
    lead: "No es una lista de restaurantes: es un día alrededor de sabores que explican Argentina, del café y la medialuna al asado y el dulce de leche.",
    beats: [
      { when: "09:00 · café y medialunas", what: "Desayuno porteño en Café Tortoni: café con leche, medialunas, tostadas con dulce de leche o chocolate con churros, según carta vigente." },
      { when: "10:00 · San Telmo y el mate", what: "Plaza Dorrego, Defensa y Mercado de San Telmo. El mate aparece como conversación y ritual social; el viajero compra o lleva lo que quiera consumir." },
      { when: "11:45 · puente salado", what: "Empanada opcional para llegar al almuerzo con el ritmo local, sin convertir cada parada en una obligación gastronómica." },
      { when: "12:30 · Palermo de barrio", what: "Plaza Cortázar, calles de Palermo Soho y después una mesa en El Preferido de Palermo o una parrilla como La Cabrera, elegida según presupuesto, disponibilidad y reserva." },
      { when: "15:00 · verde y cierre dulce", what: "Bosques de Palermo/Rosedal para caminar y un alfajor de dulce de leche o merienda pequeña para llevar. La marca, el precio y el local se eligen el día del servicio." },
    ],
    foodNote: "El precio del recorrido es el trabajo del chofer y la coordinación. Cada consumo, reserva, propina y entrada se paga aparte; no se promete comida ni mate incluidos.",
  },
  futbolera: {
    lead: "Un solo núcleo futbolero, bien contado: Boca, barrio, inmigración, camiseta, Messi y una mesa real en La Boca.",
    beats: [
      { when: "09:00 · desayuno", what: "Café con leche, medialunas, tostadas, alfajor o dulce de leche antes de ir al sur. Es una experiencia de desayuno, no una vianda provista por el chofer." },
      { when: "10:15 · Caminito y Vuelta de Rocha", what: "Chapa, color, Quinquela Martín, inmigración genovesa y el tango Caminito. Mirar el barrio antes de hablar del estadio evita reducir La Boca a una foto." },
      { when: "11:15 · La Bombonera", what: "Museo de la Pasión Boquense y Estadio Tour o Visita Express solo con entrada oficial disponible. Si no hay cupo, se hace el entorno exterior sin prometer acceso a tribunas, vestuarios o jugadores." },
      { when: "13:00 · conversación de fútbol", what: "Boca como identidad de barrio, camisetas, cantos, días de partido y la conversación argentina sobre Messi. No se vende partido, hinchada ni encuentro con futbolistas." },
      { when: "13:30 · almuerzo en conventillo", what: "El Gran Paraíso, frente a Caminito: empanadas, achuras, provoleta o parrilla según carta y disponibilidad. Después, regreso con margen de tráfico." },
    ],
    foodNote: "Entradas, comida y propinas son aparte. Los días de partido, entrenamiento o corte pueden cambiar por completo el recorrido y se replanifica antes de confirmarlo.",
  },
  "tigre-delta": {
    lead: "Tigre no es una excursión genérica: es río, clubes de remo, casas isleñas, mercado y la logística de una ciudad que también se mueve en lancha.",
    beats: [
      { when: "09:00 · salida con margen", what: "Desayuno en la ciudad o en Tigre, con café, medialunas o tostadas según hora. La navegación depende del prestador, clima y cupo del día." },
      { when: "10:00 · Delta y clubes de remo", what: "Paseo de 5, 3 o 6 ríos según la duración elegida. Se conversa sobre arroyos, muelles, casas isleñas, escuelas y supermercados que funcionan con lanchas." },
      { when: "12:30 · historia o mercado", what: "Elegir una identidad: MAT/Casa Museo Sarmiento y vida isleña, o Puerto de Frutos para artesanías, dulce de leche y alfajores. No se suman todas las paradas por inercia." },
      { when: "14:00 · mesa junto al río", what: "Chapaleo en Paseo Victorica para empanadas, provoleta, carnes, pacú o café, si la carta y el horario encajan. Navegación y comida tienen presupuesto separado." },
      { when: "15:30 · regreso", what: "Tiempo de muelle, compras o merienda y vuelta con margen. Si hay vuelo el mismo día, esta ruta se vende solo con una ventana horaria segura." },
    ],
    foodNote: "La navegación, museos, comidas, compras y propinas no están incluidas. El prestador, la tarifa y la política climática se confirman antes de ofrecer una variante.",
  },
}

const daysEn: Record<ItineraryId, Day> = {
  historica: {
    lead: "Read the city by walking and eating on local time: early coffee, cobbles, colour and a riverfront finish.",
    beats: [
      { when: "09:00 · porteño breakfast", what: "Café con leche and medialunas, toast with dulce de leche or an alfajor at Café Tortoni, subject to the current menu. The traveller pays the table." },
      { when: "09:45 · Plaza de Mayo", what: "Casa Rosada, Cabildo and Cathedral from outside, with a local conversation about the city today." },
      { when: "10:40 · San Telmo", what: "Defensa, Plaza Dorrego and cobbles. Mate as a social ritual, explained without pretending it is included as a tasting." },
      { when: "11:45 · Caminito and La Boca", what: "The open-air museum, Vuelta de Rocha and Quinquela Martín. Optional coffee, empanada or drink at La Perla de Caminito." },
      { when: "13:00 · lunch and close", what: "Optional La Boca lunch or Puerto Madero return, depending on time and energy. Short and long versions are possible." },
    ],
    foodNote: "Transport and timing are included; food, tips, tickets and reservations are not. La Perla and any grill are confirmed for the day.",
  },
  clasica: {
    lead: "The classic postcard works better without rushing: coffee, heritage, a bodegón table and the Rosedal.",
    beats: [
      { when: "09:00 · breakfast", what: "Coffee and medialunas or toast at Café Tortoni when pickup and availability fit." },
      { when: "09:45 · Obelisk and Colón", what: "Corrientes, 9 de Julio and Teatro Colón. Interior visits require official tickets and availability." },
      { when: "11:30 · Recoleta", what: "Recoleta Cemetery, architecture and Eva Perón's story, with respect and no invented special access." },
      { when: "13:00 · bodegón lunch", what: "Bar Los Galgos for empanadas, meat, coffee and flan with dulce de leche, subject to menu and availability." },
      { when: "14:15 · Rosedal and lakes", what: "A digestive walk through Palermo's parks and lake: the green ending that distinguishes this route." },
    ],
    foodNote: "Meals, tickets and tips are separate. Rosedal is a public park; Colón and Recoleta depend on official schedules.",
  },
  gastronomica: {
    lead: "Not a restaurant list: a day built around flavours that explain Argentina, from coffee and medialunas to grill and dulce de leche.",
    beats: [
      { when: "09:00 · coffee and medialunas", what: "Porteño breakfast at Café Tortoni, subject to the current menu." },
      { when: "10:00 · San Telmo and mate", what: "Plaza Dorrego, Defensa and the market. Mate is explained as a social ritual; travellers buy or bring what they want to drink." },
      { when: "11:45 · savoury bridge", what: "Optional empanada before lunch, keeping a local rhythm without making every stop compulsory." },
      { when: "12:30 · Palermo", what: "Palermo Soho and lunch at El Preferido or a grill such as La Cabrera, chosen around budget, availability and reservations." },
      { when: "15:00 · green and sweet close", what: "Palermo parks and an alfajor or small sweet stop to take away." },
    ],
    foodNote: "The route price covers the driver's work and timing. Every meal, reservation, tip and ticket is separate; food and mate are not provided.",
  },
  futbolera: {
    lead: "One football core, properly told: Boca, neighbourhood, immigration, shirts, Messi and a real La Boca table.",
    beats: [
      { when: "09:00 · breakfast", what: "Coffee, medialunas, toast, alfajor or dulce de leche before heading south. No food is provided by the driver." },
      { when: "10:15 · Caminito and Vuelta de Rocha", what: "Colour, Quinquela Martín, Genoese immigration and the tango Caminito." },
      { when: "11:15 · La Bombonera", what: "Museum and stadium visit only with official availability. Otherwise we keep the exterior route; no stands, dressing rooms or players are promised." },
      { when: "13:00 · football conversation", what: "Boca as neighbourhood identity, shirts, chants, match days and the Argentine conversation about Messi." },
      { when: "13:30 · conventillo lunch", what: "El Gran Paraíso opposite Caminito: empanadas, achuras, provoleta or grill according to menu and availability." },
    ],
    foodNote: "Tickets, food and tips are separate. Match and training days can change access and timing.",
  },
  "tigre-delta": {
    lead: "Tigre is river, rowing clubs, island homes, market and the logistics of a city that also moves by boat.",
    beats: [
      { when: "09:00 · leave with margin", what: "Breakfast in the city or Tigre. Boating depends on the operator, weather and capacity." },
      { when: "10:00 · Delta and rowing clubs", what: "Choose a 5-, 3- or 6-river ride according to the time available, with a local explanation of island life." },
      { when: "12:30 · history or market", what: "Choose MAT/Casa Sarmiento and island history, or Puerto de Frutos for crafts, dulce de leche and alfajores." },
      { when: "14:00 · riverside table", what: "Chapaleo for empanadas, provoleta, meat, pacú or coffee when menu and timing fit." },
      { when: "15:30 · return", what: "Dock time, shopping or a snack, then return with margin. Same-day flights require a safe window." },
    ],
    foodNote: "Boating, museums, food, shopping and tips are separate. Operator, fare and weather policy are confirmed before selling a variant.",
  },
}

const daysPt: Record<ItineraryId, Day> = {
  historica: {
    lead: "A cidade se entende caminhando e comendo no horário local: café cedo, paralelepípedos, cores e um final junto ao rio.",
    beats: [
      { when: "09:00 · café da manhã", what: "Café com leite e medialunas, torradas com doce de leite ou alfajor no Café Tortoni, conforme o cardápio. A mesa é paga pelo viajante." },
      { when: "09:45 · Plaza de Mayo", what: "Casa Rosada, Cabildo e Catedral por fora, com conversa sobre a cidade atual." },
      { when: "10:40 · San Telmo", what: "Defensa, Plaza Dorrego e paralelepípedos. Mate como ritual social, sem fingir que é degustação incluída." },
      { when: "11:45 · Caminito e La Boca", what: "Museu a céu aberto, Vuelta de Rocha e Quinquela Martín. Café, empanada ou bebida opcional na La Perla de Caminito." },
      { when: "13:00 · almoço e final", what: "Almoço opcional em La Boca ou retorno por Puerto Madero, conforme tempo e energia." },
    ],
    foodNote: "Transporte e organização do tempo incluídos; comida, gorjetas, ingressos e reservas não. La Perla e qualquer parrilla devem ser confirmadas.",
  },
  clasica: {
    lead: "O cartão-postal funciona melhor sem pressa: café, patrimônio, bodegón e o Rosedal.",
    beats: [
      { when: "09:00 · café da manhã", what: "Café com leite e medialunas ou torradas no Café Tortoni, quando o horário e a disponibilidade permitirem." },
      { when: "09:45 · Obelisco e Colón", what: "Corrientes, 9 de Julio e Teatro Colón. A visita interna exige ingresso e disponibilidade oficial." },
      { when: "11:30 · Recoleta", what: "Cemitério da Recoleta, arquitetura e a história de Eva Perón, com respeito." },
      { when: "13:00 · almoço de bodegón", what: "Bar Los Galgos para empanadas, carne, café e flan com doce de leite, conforme cardápio e disponibilidade." },
      { when: "14:15 · Rosedal e lagos", what: "Caminhada digestiva pelos Bosques de Palermo e pelo lago." },
    ],
    foodNote: "Refeições, ingressos e gorjetas à parte. Rosedal é parque público; Colón e Recoleta dependem dos horários oficiais.",
  },
  gastronomica: {
    lead: "Não é uma lista de restaurantes: é um dia em torno dos sabores que explicam a Argentina.",
    beats: [
      { when: "09:00 · café e medialunas", what: "Café da manhã porteño no Café Tortoni, conforme o cardápio vigente." },
      { when: "10:00 · San Telmo e mate", what: "Plaza Dorrego, Defensa e Mercado. Mate como ritual social; o viajante compra ou leva o que quiser beber." },
      { when: "11:45 · ponte salgada", what: "Empanada opcional antes do almoço, mantendo o ritmo local." },
      { when: "12:30 · Palermo", what: "Palermo Soho e almoço no El Preferido ou em uma parrilla como La Cabrera, escolhidos por orçamento e disponibilidade." },
      { when: "15:00 · verde e doce", what: "Bosques de Palermo e um alfajor ou pequena merenda para levar." },
    ],
    foodNote: "O preço do roteiro cobre o trabalho do motorista e a coordenação. Cada consumo, reserva, gorjeta e ingresso é separado.",
  },
  futbolera: {
    lead: "Um núcleo de futebol bem contado: Boca, bairro, imigração, camisa, Messi e uma mesa real em La Boca.",
    beats: [
      { when: "09:00 · café da manhã", what: "Café, medialunas, torradas, alfajor ou doce de leite antes de ir ao sul. O motorista não fornece comida." },
      { when: "10:15 · Caminito e Vuelta de Rocha", what: "Cores, Quinquela Martín, imigração genovesa e o tango Caminito." },
      { when: "11:15 · La Bombonera", what: "Museu e visita ao estádio apenas com disponibilidade oficial. Sem prometer arquibancada, vestiário ou jogadores." },
      { when: "13:00 · conversa de futebol", what: "Boca como identidade de bairro, camisas, cantos, dias de jogo e a conversa argentina sobre Messi." },
      { when: "13:30 · almoço em conventillo", what: "El Gran Paraíso: empanadas, achuras, provoleta ou parrilla conforme cardápio e disponibilidade." },
    ],
    foodNote: "Ingressos, comida e gorjetas à parte. Dias de jogo e treino podem mudar acessos e horários.",
  },
  "tigre-delta": {
    lead: "Tigre é rio, clubes de remo, casas nas ilhas, mercado e a logística de uma cidade que também se move de barco.",
    beats: [
      { when: "09:00 · saída com margem", what: "Café na cidade ou em Tigre. A navegação depende do operador, clima e lotação." },
      { when: "10:00 · Delta e remo", what: "Passeio de 5, 3 ou 6 rios conforme o tempo, com conversa sobre a vida nas ilhas." },
      { when: "12:30 · história ou mercado", what: "Escolher MAT/Casa Sarmiento e história das ilhas, ou Puerto de Frutos para artesanato, doce de leite e alfajores." },
      { when: "14:00 · mesa junto ao rio", what: "Chapaleo para empanadas, provoleta, carnes, pacu ou café, conforme cardápio e horário." },
      { when: "15:30 · retorno", what: "Tempo de cais, compras ou merenda e volta com margem. Voos no mesmo dia exigem janela segura." },
    ],
    foodNote: "Navegação, museus, comida, compras e gorjetas não estão incluídos. Operador, tarifa e política de clima são confirmados antes.",
  },
}

export function getGenuineDay(lang: Lang, id: ItineraryId) {
  if (lang === "en") return daysEn[id]
  if (lang === "pt") return daysPt[id]
  return daysEs[id]
}

/**
 * Día porteño genuino por experiencia: ritmo local + comida según la hora.
 * Consumos aparte; no se inventan locales sin verificación.
 */
import type { ItineraryId } from "./ba-config"
import type { Lang } from "./ba-copy"

export type DayBeat = {
  when: string
  what: string
}

const daysEs: Record<ItineraryId, { lead: string; beats: DayBeat[]; foodNote: string }> = {
  historica: {
    lead: "Un sur con ritmo de barrio: caminar, charlar y comer a la hora en que come la ciudad.",
    beats: [
      {
        when: "9–11 · desayuno",
        what: "En Argentina el desayuno vive a la mañana: café con leche, medialunas (dulce de leche o jamón y queso) o tostadas con manteca y mermelada. Si arrancamos temprano por el casco, Café Tortoni o un café de barrio antes de Plaza de Mayo.",
      },
      {
        when: "Casco + San Telmo",
        what: "Plaza de Mayo con calma, después San Telmo: adoquines, Defensa, y si hay ganas el mercado o una empanada a media mañana. El recorrido de historietas o las calles a pie, sin apuro.",
      },
      {
        when: "~10–15 min en auto",
        what: "Subimos y vamos a Caminito. Tráfico real, charla en el auto.",
      },
      {
        when: "Caminito + La Boca",
        what: "Bajamos, vueltita por las fachadas. Choripán si hace falta un antojo de calle. La Bombonera si el tiempo y las ganas dan; museo solo con entrada oficial.",
      },
      {
        when: "13–15 · almuerzo",
        what: "Almuerzo porteño más tarde que en muchos países: parrilla de barrio (por ejemplo zona La Boca) o lo que armamos según el día. La mesa la pagan ustedes; yo coordinamos tiempos y el lugar.",
      },
    ],
    foodNote: "Comidas y bebidas no están incluidas. La hora de salida define desayuno, picada o almuerzo.",
  },
  clasica: {
    lead: "La postal de Buenos Aires con pausas para bajar del auto y comer como acá.",
    beats: [
      {
        when: "9–11 · desayuno",
        what: "Café y medialunas o tostadas antes o entre Obelisco y Colón. Si el día arranca temprano, desayuno primero; después fachadas y fotos sin correr.",
      },
      {
        when: "Centro → Recoleta",
        what: "Obelisco y entorno del Colón (visita interior solo con entrada). Cementerio de la Recoleta con respeto y horario oficial.",
      },
      {
        when: "Palermo",
        what: "Cierre en verdes o Soho según energía. Tiempo para caminar o una mesa cerca.",
      },
      {
        when: "13–15 · almuerzo",
        what: "Parrilla o café en Palermo cuando toca almorzar. Reserva y consumo aparte.",
      },
    ],
    foodNote: "Entradas (Colón, cementerio guiado) y comidas no incluidas.",
  },
  gastronomica: {
    lead: "El eje es la mesa: el auto une barrios y horarios reales de desayuno y almuerzo.",
    beats: [
      {
        when: "9–11",
        what: "Desayuno porteño fuerte: café con leche, medialunas, tostadas. San Telmo o un café de confianza según pick-up.",
      },
      {
        when: "Entre mesas",
        what: "Tramos cortos a pie o en auto. Empanada o picada si hace falta puente hasta el almuerzo.",
      },
      {
        when: "13–15",
        what: "Almuerzo en parrilla o lugar acordado (consumo aparte). Después, tiempo para digerir y seguir o volver.",
      },
    ],
    foodNote: "Yo llevo y armo tiempos; la cuenta de cada mesa es de ustedes.",
  },
  futbolera: {
    lead: "Caminito, el entorno de la Bombonera y el barrio con algo para picar.",
    beats: [
      {
        when: "Llegada",
        what: "Caminito a pie; choripán o algo de calle si hay hambre. No dejar cosas a la vista en el auto.",
      },
      {
        when: "Bombonera",
        what: "Fachada y entorno. Museo o visita solo con disponibilidad oficial del club.",
      },
      {
        when: "Comida",
        what: "Si coincide con almuerzo, parrilla de zona o vuelta al hotel con tiempo.",
      },
    ],
    foodNote: "Día de partido cambia todo: horarios, accesos y comidas se replanifican.",
  },
  "tigre-delta": {
    lead: "Salida de la ciudad: otro paisaje, mismo criterio de horarios y mesa.",
    beats: [
      {
        when: "Ida",
        what: "Salida con margen. Desayuno en la ciudad o algo simple en el camino según horario.",
      },
      {
        when: "Tigre",
        what: "Puerto de Frutos, paseo, navegación si la coordinan aparte.",
      },
      {
        when: "Almuerzo",
        what: "Comer en Tigre o al volver; lo definimos con el reloj y el clima.",
      },
    ],
    foodNote: "Navegación y comidas aparte. Volver con holgura si hay vuelo.",
  },
}

const daysEn: typeof daysEs = {
  historica: {
    lead: "A south-side day at city pace: walk, talk, eat when Buenos Aires eats.",
    beats: [
      {
        when: "9–11 · breakfast",
        what: "Local breakfast is a morning thing: café con leche, medialunas (dulce de leche or ham & cheese) or toast with butter and jam. Early start near the centre? Tortoni or a neighbourhood café before Plaza de Mayo.",
      },
      {
        when: "Centre + San Telmo",
        what: "Plaza de Mayo at ease, then San Telmo streets. Market or an empanada mid-morning if you want. Comic-strip walk or cobbles on foot—no rush.",
      },
      {
        when: "~10–15 min by car",
        what: "To Caminito with real traffic and time to talk.",
      },
      {
        when: "Caminito + La Boca",
        what: "Facades, a short stroll, choripán if street food calls. Bombonera if time allows; museum only with official tickets.",
      },
      {
        when: "13–15 · lunch",
        what: "Lunch runs later here. Neighbourhood grill or whatever fits the day—you pay the table; I handle timing.",
      },
    ],
    foodNote: "Food and drinks not included. Start time decides breakfast, snack or lunch.",
  },
  clasica: {
    lead: "Postcard Buenos Aires with time to step out and eat on local hours.",
    beats: [
      {
        when: "9–11 · breakfast",
        what: "Coffee and medialunas or toast before or between Obelisk and Colón.",
      },
      {
        when: "Centre → Recoleta",
        what: "Obelisk and Colón exterior (inside only with tickets). Recoleta Cemetery on official hours.",
      },
      {
        when: "Palermo",
        what: "Parks or Soho to close. Walk or a table nearby.",
      },
      {
        when: "13–15 · lunch",
        what: "Grill or café in Palermo when it’s lunchtime. Table separate.",
      },
    ],
    foodNote: "Tickets and meals not included.",
  },
  gastronomica: {
    lead: "The table is the point; the car links neighbourhoods and real meal times.",
    beats: [
      {
        when: "9–11",
        what: "Proper porteño breakfast, then short hops between stops.",
      },
      {
        when: "Between tables",
        what: "Empanada or light bite if you need a bridge to lunch.",
      },
      {
        when: "13–15",
        what: "Lunch at an agreed spot (you pay). Time to digest after.",
      },
    ],
    foodNote: "I drive and time the day; each bill is yours.",
  },
  futbolera: {
    lead: "Caminito, the Bombonera area, and something to bite on.",
    beats: [
      {
        when: "Arrival",
        what: "Caminito on foot; choripán if you’re hungry. Nothing visible left in the car.",
      },
      {
        when: "Bombonera",
        what: "Outside and neighbourhood. Museum only with official availability.",
      },
      {
        when: "Food",
        what: "If it’s lunchtime, a local grill or back with time to spare.",
      },
    ],
    foodNote: "Match days change access, timing and food plans.",
  },
  "tigre-delta": {
    lead: "Out of the city: different landscape, same sense of timing.",
    beats: [
      {
        when: "Outbound",
        what: "Leave with margin. Breakfast in town or something simple on the way.",
      },
      {
        when: "Tigre",
        what: "Puerto de Frutos, walk, boat only if arranged separately.",
      },
      {
        when: "Lunch",
        what: "Eat in Tigre or on the way back—clock and weather decide.",
      },
    ],
    foodNote: "Boats and meals separate. Buffer time if you have a flight.",
  },
}

const daysPt: typeof daysEs = {
  historica: {
    lead: "O sul no ritmo do bairro: caminhar, conversar e comer na hora em que a cidade come.",
    beats: [
      {
        when: "9–11 · café da manhã",
        what: "Aqui o café da manhã é de manhã: café com leite, medialunas (doce de leite ou presunto e queijo) ou torradas. Saída cedo no centro? Tortoni ou um café de bairro antes da Plaza de Mayo.",
      },
      {
        when: "Centro + San Telmo",
        what: "Plaza de Mayo com calma, depois San Telmo. Mercado ou empanada no meio da manhã. Ruas a pé, sem pressa.",
      },
      {
        when: "~10–15 min de carro",
        what: "Até o Caminito, com trânsito real e papo no caminho.",
      },
      {
        when: "Caminito + La Boca",
        what: "Fachadas, volta a pé, choripán se der vontade. Bombonera se der tempo; museu só com ingresso oficial.",
      },
      {
        when: "13–15 · almoço",
        what: "Almoço mais tarde. Parrilla de bairro ou o que combinarmos—a mesa é de vocês; eu cuido dos horários.",
      },
    ],
    foodNote: "Comidas não inclusas. O horário de saída define café, lanche ou almoço.",
  },
  clasica: {
    lead: "O cartão-postal com tempo para descer e comer no horário local.",
    beats: [
      {
        when: "9–11 · café da manhã",
        what: "Café e medialunas ou torradas antes ou entre Obelisco e Colón.",
      },
      {
        when: "Centro → Recoleta",
        what: "Obelisco e Colón por fora (dentro só com ingresso). Cemitério no horário oficial.",
      },
      {
        when: "Palermo",
        what: "Parques ou Soho. Caminhada ou mesa perto.",
      },
      {
        when: "13–15 · almoço",
        what: "Parrilla ou café em Palermo na hora do almoço. Conta à parte.",
      },
    ],
    foodNote: "Ingressos e refeições não inclusos.",
  },
  gastronomica: {
    lead: "O eixo é a mesa; o carro liga bairros e horários reais.",
    beats: [
      {
        when: "9–11",
        what: "Café da manhã porteño de verdade, depois trechos curtos.",
      },
      {
        when: "Entre mesas",
        what: "Empanada ou algo leve até o almoço.",
      },
      {
        when: "13–15",
        what: "Almoço no lugar combinado (vocês pagam). Tempo para digerir depois.",
      },
    ],
    foodNote: "Eu levo e marco o tempo; cada conta é de vocês.",
  },
  futbolera: {
    lead: "Caminito, entorno da Bombonera e algo para petiscar.",
    beats: [
      {
        when: "Chegada",
        what: "Caminito a pé; choripán se houver fome. Nada à vista no carro.",
      },
      {
        when: "Bombonera",
        what: "Fachada e bairro. Museu só com disponibilidade oficial.",
      },
      {
        when: "Comida",
        what: "Se for hora de almoço, parrilla da zona ou volta com folga.",
      },
    ],
    foodNote: "Dia de jogo muda acesso, horários e comida.",
  },
  "tigre-delta": {
    lead: "Fora da capital: outra paisagem, mesmo critério de horário.",
    beats: [
      {
        when: "Ida",
        what: "Sair com margem. Café na cidade ou algo simples no caminho.",
      },
      {
        when: "Tigre",
        what: "Puerto de Frutos, passeio; navegação só se combinada à parte.",
      },
      {
        when: "Almoço",
        what: "Comer em Tigre ou na volta—relógio e clima decidem.",
      },
    ],
    foodNote: "Navegação e refeições à parte. Folga se houver voo.",
  },
}

export function getGenuineDay(lang: Lang, id: ItineraryId) {
  if (lang === "en") return daysEn[id]
  if (lang === "pt") return daysPt[id]
  return daysEs[id]
}

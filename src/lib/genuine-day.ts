/**
 * Secuencias editoriales aprobadas para BA en Ruta.
 * Son propuestas orientativas: disponibilidad, tiempos, reservas, comidas,
 * entradas y navegación se confirman por separado; no representan una reserva.
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
    lead: "Café histórico, memoria cívica y barrios del sur: una secuencia para leer distintas capas de Buenos Aires, ajustada al ritmo y las condiciones del día.",
    beats: [
      { when: "Café histórico", what: "Café Tortoni es la parada de café distintiva de esta experiencia. Puede servir para empezar conversando sobre los cafés porteños y Avenida de Mayo; horarios, acceso y mesa deben comprobarse para la fecha." },
      { when: "Plaza de Mayo (contexto, no parada base)", what: "Plaza de Mayo, la Casa Rosada, el Cabildo y la Catedral aportan contexto para la historia cívica; este punto no es una parada base independiente del simulador y no presupone ingresos a edificios. Si el recorrido acordado pasa por la zona, la observación es desde el espacio público." },
      { when: "San Telmo", what: "Leer el ritmo de calle y el patrimonio del barrio. Acordar cuánto caminar y si interesa acercarse al Mercado o a Plaza Dorrego; no hace falta sumar ambos por obligación." },
      { when: "Caminito y La Boca", what: "Mirar el paseo como una puerta de entrada a La Boca: arte, historia e inmigración, sin tomar una postal turística como representación de todo el barrio." },
      { when: "Pausa opcional", what: "La Perla de Caminito puede ser una pausa si el pasajero la elige. Confirmar apertura, carta y posibilidad de atención directamente; una recomendación no es una reserva." },
      { when: "Bombonera exterior (opcional)", what: "Si el contexto y el interés lo permiten, cerrar hablando del vínculo entre Boca y el barrio desde el exterior. Museo y visita al estadio dependen de la modalidad y disponibilidad oficiales." },
    ],
    foodNote: "La secuencia es orientativa y no fija horario ni duración de servicio. Comidas, bebidas, entradas, reservas, peajes, estacionamiento, esperas y propinas se pagan aparte salvo acuerdo explícito; la consulta por WhatsApp no confirma una reserva.",
  },
  clasica: {
    lead: "Del centro monumental a la memoria de Recoleta y una pausa verde en Palermo. El valor está en el contraste y en dejar tiempo, no en acumular paradas.",
    beats: [
      { when: "Centro y Corrientes", what: "Empezar por el Obelisco y el entorno de Corrientes y 9 de Julio como lectura exterior de la ciudad en movimiento." },
      { when: "Teatro Colón", what: "Mirar el edificio desde la ciudad. Una visita interior es opcional y solo se considera tras consultar entradas, cupo y condiciones oficiales para la fecha." },
      { when: "Recoleta", what: "Recorrer el Cementerio de la Recoleta con respeto, atendiendo a su arquitectura y memoria pública. La visita guiada oficial no se considera incluida." },
      { when: "Pausa en Los Galgos (opcional)", what: "Bar Los Galgos puede ser una pausa para comer o tomar algo si el pasajero la elige. Confirmar apertura, carta y mesa directamente; no se asegura disponibilidad." },
      { when: "Palermo sin apuro", what: "Cerrar con una caminata o descanso en el entorno de los lagos y el Rosedal, según clima, horario y ganas. No presupone picnic, mate ni actividades provistas." },
    ],
    foodNote: "Sin horario ni duración operativa garantizados. Comidas, entradas, propinas, peajes, estacionamiento y esperas adicionales no se presuponen incluidos; horarios y accesos de terceros deben verificarse para el día.",
  },
  gastronomica: {
    lead: "Una experiencia gastronómica de barrio alrededor de Villa Crespo y una comida principal. Elegir un foco y dejar margen es mejor que encadenar restaurantes.",
    beats: [
      { when: "Villa Crespo", what: "Orientarse por el barrio y conversar sobre el ritmo local. El paseo se ajusta al interés de la persona; no se presenta como una visita guiada formal ni promete acceso a instalaciones del club." },
      { when: "Los Bohemios", what: "Se propone como ancla para una comida principal. Confirmar directamente apertura, horario, carta, precio y disponibilidad antes de salir; no se presume reserva ni acuerdo comercial." },
      { when: "Después de comer", what: "Dejar una pausa flexible. Palermo Soho puede ser una extensión tranquila si el pasajero la elige, sin añadir otra comida por defecto." },
      { when: "Alternativa de enfoque", what: "Si el interés principal es un mercado y la historia urbana, San Telmo puede reemplazar a Villa Crespo en otra variante; no se apilan automáticamente ambos barrios." },
      { when: "Fuera de la ruta base", what: "Café Tortoni no es una parada automática de este recorrido. El Tano de Avellaneda queda como posible salida sur aparte, pendiente de confirmar sucursal, operación y logística." },
    ],
    foodNote: "Los Bohemios y la comida son opciones externas sujetas a confirmación directa; consumos, reservas, entradas, estacionamiento, peajes, esperas y propinas no se presuponen incluidos. No se cambia ni promete una tarifa del chofer.",
  },
  futbolera: {
    lead: "Un recorrido con núcleo claro en La Boca: barrio, Caminito y cultura futbolera. La visita interior y la comida son elecciones sujetas a confirmación, no componentes garantizados.",
    beats: [
      { when: "Caminito y Vuelta de Rocha", what: "Recorrer el paseo y su entorno conversando sobre arte, historia e inmigración; Caminito es una puerta al barrio, no una representación completa de La Boca." },
      { when: "Bombonera exterior", what: "Usar la cercanía del estadio para hablar del vínculo entre club e identidad barrial. No se promete entrada, partido, jugadores, vestuarios ni acceso a sectores restringidos." },
      { when: "Museo o visita al estadio (opcional)", what: "Si el pasajero quiere entrar, comprobar en los canales oficiales la modalidad, entradas y disponibilidad del día. El contexto deportivo puede modificar el acceso." },
      { when: "Comida opcional", what: "El Gran Paraíso puede considerarse por su cercanía a Caminito, tras confirmar directamente su operación y disponibilidad. Comida, mesa y reserva no se dan por hechas." },
      { when: "Variante extendida, no base", what: "El Tano de Avellaneda solo se evalúa como desvío separado si el pasajero lo elige y el dueño confirma sucursal, recorrido, operación y cotización." },
    ],
    foodNote: "La secuencia y los traslados son orientativos. Entradas, comidas, reservas, propinas, peajes, estacionamiento y esperas no están incluidos salvo acuerdo explícito; no se garantiza acceso ni una salida deportiva.",
  },
  "tigre-delta": {
    lead: "Una salida ribereña para observar el paisaje y la movilidad por agua. Elegir una actividad ancla y no acumular barco, mercado, museo y comida por inercia.",
    beats: [
      { when: "Elegir el foco del día", what: "Antes de salir, definir si el interés principal es el Delta, la cultura ribereña o una visita cultural. La secuencia depende de fecha, horarios, clima y preferencias." },
      { when: "Navegación (si se confirma)", what: "La propuesta pone una navegación panorámica como ancla cuando el operador confirma salida, ruta y cupo. No se presume proveedor, entrada, bajada en una isla ni política por clima." },
      { when: "Paseo Victorica", what: "Desde el espacio público, observar el río y los edificios de los clubes de remo. No se promete acceso a clubes ni participación en actividades." },
      { when: "MAT (opcional)", what: "El Museo de Arte Tigre puede ser una alternativa cultural si el pasajero lo elige y el horario real encaja. Si no, se omite; no se acumulan museos." },
      { when: "Comida ribereña (opcional)", what: "Chapaleo u otro local solo se propone después de confirmar directamente apertura, carta, mesa, precio y conexión con el resto del día." },
      { when: "Regreso", what: "Dejar margen y adaptar la secuencia a la operación del prestador y al tránsito. No se garantiza horario de regreso ni duración puerta a puerta." },
    ],
    foodNote: "Navegación, entradas, comidas, reservas, estacionamiento, peajes, esperas y propinas no se presuponen incluidos. Operador, cupo, ruta y cambios por clima requieren confirmación para la fecha.",
  },
}

const daysEn: Record<ItineraryId, Day> = {
  historica: {
    lead: "Historic coffee, civic memory and the southern neighbourhoods: a way to read different layers of Buenos Aires, adapted to the day's pace and conditions.",
    beats: [
      { when: "Historic café", what: "Café Tortoni is the distinctive café stop for this experience. It can open a conversation about porteño cafés and Avenida de Mayo; hours, access and seating must be checked for the date." },
      { when: "Plaza de Mayo (context, not a base stop)", what: "Plaza de Mayo, the Casa Rosada, Cabildo and Cathedral add context for civic history; this point is not a separate base stop in the simulator and does not imply entry to any building. If the agreed route passes through the area, viewing is from public space." },
      { when: "San Telmo", what: "Read the street rhythm and the neighbourhood's heritage. Agree how much to walk and whether the market or Plaza Dorrego is of interest; there is no need to make both compulsory." },
      { when: "Caminito and La Boca", what: "See the promenade as a gateway to La Boca: art, history and immigration, not a tourist postcard that represents the whole neighbourhood." },
      { when: "Optional pause", what: "La Perla de Caminito can be a stop if the traveller chooses. Check opening, menu and service directly; a recommendation is not a reservation." },
      { when: "La Bombonera exterior (optional)", what: "If context and interest allow, close with a conversation about Boca and the neighbourhood from outside. Museum and stadium visits depend on the official option and availability." },
    ],
    foodNote: "The sequence is indicative and does not set a service schedule or duration. Food, drinks, tickets, reservations, tolls, parking, extra waiting and tips are separate unless explicitly agreed; a WhatsApp enquiry is not a confirmed booking.",
  },
  clasica: {
    lead: "From the monumental centre to Recoleta's memory and a green pause in Palermo. The point is contrast and time to look, not accumulating stops.",
    beats: [
      { when: "Downtown and Corrientes", what: "Start around the Obelisk and Corrientes/9 de Julio as an outdoor reading of the city in motion." },
      { when: "Teatro Colón", what: "Take in the building from the city. An interior visit is optional and only considered after checking official tickets, capacity and conditions for the date." },
      { when: "Recoleta", what: "Visit Recoleta Cemetery respectfully, noticing its architecture and public memory. Official guided visits are not included by default." },
      { when: "Optional pause at Los Galgos", what: "Bar Los Galgos may be a meal or coffee pause if the traveller chooses. Check opening, menu and seating directly; availability is not guaranteed." },
      { when: "Unhurried Palermo", what: "Finish with a walk or rest around the lakes and Rose Garden, depending on weather, hours and preference. No picnic, mate or supplied activity is implied." },
    ],
    foodNote: "No operating schedule or duration is guaranteed. Meals, tickets, tips, tolls, parking and extra waiting are not assumed included; third-party hours and access must be checked for the day.",
  },
  gastronomica: {
    lead: "A neighbourhood food experience centred on Villa Crespo and one main meal. Choose one focus and leave room rather than stacking restaurants.",
    beats: [
      { when: "Villa Crespo", what: "Get oriented in the neighbourhood and talk about its local rhythm. The walk adapts to the traveller's interest; it is not presented as a formal guided tour or access to club facilities." },
      { when: "Los Bohemios", what: "Proposed as the anchor for one main meal. Check opening, hours, menu, prices and availability directly before departure; no reservation or commercial agreement is assumed." },
      { when: "After the meal", what: "Leave a flexible pause. Palermo Soho can be a relaxed extension if the traveller chooses, without adding another meal by default." },
      { when: "Alternative focus", what: "If the main interest is a market and urban history, San Telmo can replace Villa Crespo in a different version; the neighbourhoods are not automatically combined." },
      { when: "Outside the base route", what: "Café Tortoni is not an automatic stop on this route. El Tano in Avellaneda remains a possible separate southern outing pending branch, operation and logistics checks." },
    ],
    foodNote: "Los Bohemios and the meal are external options subject to direct confirmation; food, reservations, tickets, parking, tolls, extra waiting and tips are not assumed included. No driver fare is changed or promised here.",
  },
  futbolera: {
    lead: "A route with a clear La Boca core: neighbourhood, Caminito and football culture. An interior visit and a meal are choices subject to confirmation, not guaranteed components.",
    beats: [
      { when: "Caminito and Vuelta de Rocha", what: "Walk the promenade and its surroundings while discussing art, history and immigration; Caminito is a gateway to the neighbourhood, not the whole of La Boca." },
      { when: "La Bombonera exterior", what: "Use the stadium's proximity to talk about the link between club and neighbourhood identity. No entry, match, players, dressing rooms or restricted access is promised." },
      { when: "Museum or stadium visit (optional)", what: "If the traveller wants to go inside, check the official channels for the visit option, tickets and availability on the day. Sporting activity can change access." },
      { when: "Optional meal", what: "El Gran Paraíso may be considered because it is close to Caminito, after checking its operation and availability directly. A meal, table or reservation is not assumed." },
      { when: "Extended option, not the base route", what: "El Tano in Avellaneda is considered only as a separate detour if the traveller chooses it and the owner confirms branch, route, operation and quote." },
    ],
    foodNote: "The sequence and transport are indicative. Tickets, meals, reservations, tips, tolls, parking and waiting are separate unless explicitly agreed; stadium access or a sporting event is not guaranteed.",
  },
  "tigre-delta": {
    lead: "A riverside outing to observe the landscape and water-based mobility. Choose one anchor activity instead of automatically stacking a boat, market, museum and meal.",
    beats: [
      { when: "Choose the day's focus", what: "Before departure, decide whether the main interest is the Delta, riverside culture or a cultural visit. The sequence depends on date, hours, weather and preferences." },
      { when: "Boat trip (if confirmed)", what: "The proposal uses a panoramic boat trip as its anchor when the operator confirms departure, route and capacity. No provider, ticket, island stop or weather policy is assumed." },
      { when: "Paseo Victorica", what: "From public space, observe the river and the rowing-club buildings. Entry to clubs or participation in activities is not promised." },
      { when: "MAT (optional)", what: "Museo de Arte Tigre can be a cultural alternative if the traveller chooses it and actual hours fit. Otherwise leave it out; do not stack museums." },
      { when: "Riverside meal (optional)", what: "Chapaleo or another venue is suggested only after directly confirming opening, menu, seating, prices and how it fits the day." },
      { when: "Return", what: "Leave a buffer and adapt the sequence to the operator and traffic. No return time or door-to-door duration is guaranteed." },
    ],
    foodNote: "Boat trips, tickets, meals, reservations, parking, tolls, extra waiting and tips are not assumed included. Operator, capacity, route and weather changes require confirmation for the date.",
  },
}

const daysPt: Record<ItineraryId, Day> = {
  historica: {
    lead: "Café histórico, memória cívica e bairros do sul: uma forma de ler diferentes camadas de Buenos Aires, adaptada ao ritmo e às condições do dia.",
    beats: [
      { when: "Café histórico", what: "O Café Tortoni é a parada de café característica desta experiência. Pode abrir uma conversa sobre cafés porteños e a Avenida de Mayo; horário, acesso e mesa devem ser verificados para a data." },
      { when: "Plaza de Mayo (contexto, não é parada-base)", what: "A Plaza de Mayo, a Casa Rosada, o Cabildo e a Catedral dão contexto à história cívica; este ponto não é uma parada-base independente do simulador e não pressupõe entrada nos edifícios. Se a rota combinada passar pela área, a observação será a partir do espaço público." },
      { when: "San Telmo", what: "Perceber o ritmo das ruas e o patrimônio do bairro. Combinar quanto caminhar e se há interesse pelo Mercado ou pela Plaza Dorrego; não é preciso tornar ambos obrigatórios." },
      { when: "Caminito e La Boca", what: "Ver o passeio como uma porta de entrada para La Boca: arte, história e imigração, sem tomar o cartão-postal turístico como representação de todo o bairro." },
      { when: "Pausa opcional", what: "A La Perla de Caminito pode ser uma parada se o viajante escolher. Confirmar diretamente funcionamento, cardápio e atendimento; uma recomendação não é uma reserva." },
      { when: "Exterior da Bombonera (opcional)", what: "Se o contexto e o interesse permitirem, terminar conversando sobre a relação entre Boca e o bairro do lado de fora. Museu e visita ao estádio dependem da opção oficial e da disponibilidade." },
    ],
    foodNote: "A sequência é orientativa e não define horário nem duração do serviço. Comidas, bebidas, ingressos, reservas, pedágios, estacionamento, espera adicional e gorjetas ficam à parte salvo acordo explícito; uma consulta pelo WhatsApp não confirma reserva.",
  },
  clasica: {
    lead: "Do centro monumental à memória da Recoleta e a uma pausa verde em Palermo. A ideia é criar contraste e tempo para olhar, não acumular paradas.",
    beats: [
      { when: "Centro e Corrientes", what: "Começar pelo Obelisco e o entorno de Corrientes e 9 de Julio como leitura externa da cidade em movimento." },
      { when: "Teatro Colón", what: "Observar o edifício a partir da cidade. A visita interna é opcional e só deve ser considerada após verificar ingressos, capacidade e condições oficiais para a data." },
      { when: "Recoleta", what: "Visitar o Cemitério da Recoleta com respeito, observando arquitetura e memória pública. Visitas guiadas oficiais não estão incluídas por padrão." },
      { when: "Pausa opcional no Los Galgos", what: "O Bar Los Galgos pode ser uma pausa para comer ou tomar café se o viajante escolher. Confirmar diretamente funcionamento, cardápio e mesa; não há disponibilidade garantida." },
      { when: "Palermo sem pressa", what: "Terminar com uma caminhada ou descanso perto dos lagos e do Rosedal, conforme clima, horário e vontade. Não implica piquenique, mate ou atividade fornecida." },
    ],
    foodNote: "Não há horário operacional nem duração garantidos. Refeições, ingressos, gorjetas, pedágios, estacionamento e espera adicional não são presumidos incluídos; horários e acessos de terceiros devem ser verificados para o dia.",
  },
  gastronomica: {
    lead: "Uma experiência gastronômica de bairro centrada em Villa Crespo e uma refeição principal. Escolher um foco e deixar espaço é melhor do que encadear restaurantes.",
    beats: [
      { when: "Villa Crespo", what: "Conhecer a orientação do bairro e conversar sobre seu ritmo local. A caminhada se adapta ao interesse da pessoa; não é apresentada como visita guiada formal nem promete acesso às instalações do clube." },
      { when: "Los Bohemios", what: "Proposto como ponto central para uma refeição principal. Confirmar diretamente funcionamento, horário, cardápio, preços e disponibilidade antes de sair; não se presume reserva nem acordo comercial." },
      { when: "Depois da refeição", what: "Deixar uma pausa flexível. Palermo Soho pode ser uma extensão tranquila se o viajante escolher, sem acrescentar outra refeição por padrão." },
      { when: "Foco alternativo", what: "Se o interesse principal for mercado e história urbana, San Telmo pode substituir Villa Crespo em outra versão; os bairros não são combinados automaticamente." },
      { when: "Fora do roteiro base", what: "O Café Tortoni não é uma parada automática deste roteiro. El Tano, em Avellaneda, fica como possível saída separada para o sul, pendente de confirmação de filial, funcionamento e logística." },
    ],
    foodNote: "Los Bohemios e a refeição são opções externas sujeitas a confirmação direta; consumos, reservas, ingressos, estacionamento, pedágios, espera adicional e gorjetas não são presumidos incluídos. Nenhuma tarifa do motorista é alterada ou prometida aqui.",
  },
  futbolera: {
    lead: "Um roteiro com núcleo claro em La Boca: bairro, Caminito e cultura do futebol. Visita interna e refeição são escolhas sujeitas a confirmação, não componentes garantidos.",
    beats: [
      { when: "Caminito e Vuelta de Rocha", what: "Percorrer o passeio e o entorno conversando sobre arte, história e imigração; Caminito é uma porta de entrada para o bairro, não o retrato completo de La Boca." },
      { when: "Exterior da Bombonera", what: "Usar a proximidade do estádio para conversar sobre a relação entre clube e identidade do bairro. Não se promete ingresso, jogo, jogadores, vestiário ou acesso restrito." },
      { when: "Museu ou visita ao estádio (opcional)", what: "Se o viajante quiser entrar, verificar nos canais oficiais a modalidade, os ingressos e a disponibilidade do dia. A atividade esportiva pode mudar o acesso." },
      { when: "Refeição opcional", what: "O El Gran Paraíso pode ser considerado por ficar perto de Caminito, depois de confirmar diretamente o funcionamento e a disponibilidade. Não se presume refeição, mesa ou reserva." },
      { when: "Extensão separada, fora do roteiro base", what: "El Tano, em Avellaneda, só deve ser avaliado como desvio separado se o viajante escolher e o responsável confirmar filial, trajeto, funcionamento e cotação." },
    ],
    foodNote: "A sequência e os traslados são orientativos. Ingressos, refeições, reservas, gorjetas, pedágios, estacionamento e espera ficam à parte salvo acordo explícito; não há garantia de acesso ao estádio ou de evento esportivo.",
  },
  "tigre-delta": {
    lead: "Uma saída ribeirinha para observar a paisagem e a mobilidade pela água. Escolher uma atividade central em vez de somar barco, mercado, museu e refeição automaticamente.",
    beats: [
      { when: "Escolher o foco do dia", what: "Antes de sair, definir se o interesse principal é o Delta, a cultura ribeirinha ou uma visita cultural. A sequência depende da data, dos horários, do clima e das preferências." },
      { when: "Navegação (se confirmada)", what: "A proposta usa um passeio panorâmico de barco como atividade central quando o operador confirma saída, rota e vagas. Não se presume operador, ingresso, parada em ilha ou política climática." },
      { when: "Paseo Victorica", what: "Do espaço público, observar o rio e os edifícios dos clubes de remo. Não se promete entrada nos clubes nem participação em atividades." },
      { when: "MAT (opcional)", what: "O Museu de Arte Tigre pode ser uma alternativa cultural se o viajante escolher e o horário real for compatível. Caso contrário, deixar de fora; não acumular museus." },
      { when: "Refeição ribeirinha (opcional)", what: "Chapaleo ou outro local só é sugerido depois de confirmar diretamente funcionamento, cardápio, mesa, preços e como se encaixa no dia." },
      { when: "Retorno", what: "Deixar margem e adaptar a sequência ao operador e ao trânsito. Não se garante horário de retorno nem duração porta a porta." },
    ],
    foodNote: "Navegação, ingressos, refeições, reservas, estacionamento, pedágios, espera adicional e gorjetas não são presumidos incluídos. Operador, vagas, rota e mudanças por clima precisam de confirmação para a data.",
  },
}

export function getGenuineDay(lang: Lang, id: ItineraryId) {
  if (lang === "en") return daysEn[id]
  if (lang === "pt") return daysPt[id]
  return daysEs[id]
}

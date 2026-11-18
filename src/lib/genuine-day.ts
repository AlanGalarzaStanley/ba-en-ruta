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
    lead: "Un recorrido gastronómico completo dentro de Villa Crespo: leer el barrio, elegir una sola mesa principal —bodegón de club, cocina judía porteña o mercado gastronómico— y sumar una pausa opcional de café y juegos. Sin desvíos automáticos a Palermo o San Telmo.",
    beats: [
      { when: "Llegada: leer Villa Crespo", what: "Orientarse y percibir la vida comercial y los ritmos locales del barrio. El punto exacto de encuentro se acuerda por separado; el mapa es una referencia, no navegación." },
      { when: "Elegí la mesa principal", what: "Una sola elección: Los Bohemios, ligado al Club Atlético Atlanta; La Crespo, con cocina judía de Europa oriental en clave porteña; o Mercat, un mercado con cocinas variadas. Abrí los sitios oficiales para revisar menú y condiciones actuales antes de salir." },
      { when: "Pausa opcional en Café San Bernardo", what: "Si el ritmo da, sumá un café de barrio con pool, ping-pong y juegos de mesa. Es una pausa opcional, no otra comida obligatoria; confirmá apertura y servicio para la fecha." },
      { when: "Cierre sin desvíos automáticos", what: "Después de la comida o del café, cerrar el recorrido dentro de Villa Crespo. Una extensión a otro barrio se conversa aparte y no forma parte de esta experiencia." },
    ],
    foodNote: "El reloj, los tiempos y el mapa del simulador son ilustrativos. Una opción no reserva mesa ni confirma apertura, precios actuales o menú: verificar directamente para la fecha. Comidas, bebidas, reservas, entradas, peajes, estacionamiento, esperas adicionales y propinas no se presuponen incluidos.",
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
    foodNote: "Sin horario ni duración operativa garantizados. Comidas, entradas, propinas, peajes, estacionamiento y esperas adicionales no se presuponen incluidos; horarios y accesos de terceros deben verificarse para el día.",
  },
  gastronomica: {
    lead: "A complete food route within Villa Crespo: read the neighbourhood, choose one main table—club bodegón, porteño Jewish cooking or food hall—and add an optional café-and-games pause. No automatic detour to Palermo or San Telmo.",
    beats: [
      { when: "Arrival: read Villa Crespo", what: "Get oriented and notice the neighbourhood's commercial life and local rhythms. The exact meeting point is agreed separately; the map is a reference, not navigation." },
      { when: "Choose the main table", what: "Choose one: Los Bohemios, associated with Club Atlético Atlanta; La Crespo, with porteño-style Eastern European Jewish cooking; or Mercat, a food hall with varied cuisines. Check each official site for its current menu and conditions before setting out." },
      { when: "Optional pause at Café San Bernardo", what: "If the pace allows, add a neighbourhood café with pool, ping-pong and board games. This is an optional pause, not another required meal; check opening and service for the date." },
      { when: "Close without an automatic detour", what: "Finish after the meal or café within Villa Crespo. An extension to another neighbourhood is discussed separately and is not drawn as part of this experience." },
    ],
    foodNote: "The simulator's clock, durations and map are illustrative. A choice does not reserve a table or confirm opening, current prices or menu; check directly for the date. Food, drinks, reservations, tickets, tolls, parking, extra waiting and tips are not assumed included.",
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
    lead: "Um percurso gastronômico completo dentro de Villa Crespo: conhecer o bairro, escolher uma refeição principal — bodegón de clube, cozinha judaica porteña ou mercado gastronômico — e acrescentar uma pausa opcional em café e jogos. Sem desvio automático para Palermo ou San Telmo.",
    beats: [
      { when: "Chegada: ler Villa Crespo", what: "Conhecer a orientação do bairro e perceber seu comércio e ritmo local. O ponto exato de encontro é combinado à parte; o mapa é uma referência, não navegação." },
      { when: "Escolha a refeição principal", what: "Escolha uma opção: Los Bohemios, ligado ao Club Atlético Atlanta; La Crespo, com cozinha judaica do Leste Europeu em versão porteña; ou Mercat, um mercado gastronômico de várias cozinhas. Consulte os sites oficiais para conferir cardápio e condições atuais antes de sair." },
      { when: "Pausa opcional no Café San Bernardo", what: "Se o ritmo permitir, acrescente um café de bairro com mesas de sinuca, pingue-pongue e jogos de tabuleiro. É uma pausa opcional, não outra refeição obrigatória; confirme funcionamento e atendimento para a data." },
      { when: "Fechar sem desvio automático", what: "Terminar depois da refeição ou do café dentro de Villa Crespo. Uma extensão para outro bairro é conversada à parte e não aparece como parte desta experiência." },
    ],
    foodNote: "O relógio, os tempos e o mapa do simulador são ilustrativos. Uma escolha não reserva mesa nem confirma funcionamento, preços atuais ou cardápio; verifique diretamente para a data. Comidas, bebidas, reservas, ingressos, pedágios, estacionamento, espera adicional e gorjetas não são presumidos incluídos.",
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

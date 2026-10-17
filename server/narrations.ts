/**
 * Guiones de narración por parada (1–2 min de lectura en voz alta).
 *
 * Reglas:
 * - Solo datos presentes en las fuentes listadas en `sources` (consultadas el 2026-10-17).
 * - Estado "borrador": el dueño los revisa y los graba con su voz.
 * - Se sirven desde el servidor solo con una sesión válida; no forman parte del sitio público.
 * - `audio`: URL de la grabación propia cuando exista. Vacío = no hay grabación (no inventar).
 */
import type { TourId } from "./tours.js"
import { TOUR_PLACES } from "./tours.js"

export type NarrationLang = "es" | "en" | "pt"

export interface Narration {
  placeId: string
  status: "borrador" | "revisado"
  reviewedAt: string
  text: Record<NarrationLang, string>
  audio: Partial<Record<NarrationLang, string>>
  sources: string[]
}

export const NARRATIONS: Record<string, Narration> = {
  caminito: {
    placeId: "caminito",
    status: "borrador",
    reviewedAt: "2026-10-17",
    sources: ["https://turismo.buenosaires.gob.ar/es/otros-establecimientos/caminito"],
    audio: {},
    text: {
      es: "Llegamos a Caminito, en La Boca. Esta calle museo, de casi 150 metros, es uno de los lugares más fotografiados del mundo. Su trazado curvo tiene una explicación: hasta principios del siglo veinte, por acá pasaba el cauce de un arroyo. Después, este tramo formó parte del ferrocarril a Ensenada, hasta que en 1928 el ramal se cerró y la vía quedó como un callejón abandonado. La zona se conocía como «Puntín», el diminutivo de puente en dialecto genovés: la colectividad genovesa le dio su impronta al barrio. En 1959, por iniciativa de vecinos y con donaciones de artistas, el terreno se recuperó como paseo peatonal y museo a cielo abierto. Uno de sus grandes impulsores fue el pintor Benito Quinquela Martín, que creció en La Boca, y fue él quien propuso bautizar la calle con el nombre del tango «Caminito», de Juan de Dios Filiberto y Gabino Coria Peñaloza. Un detalle curioso: la letra no habla de La Boca. Nació como un poema de 1903 dedicado a un sendero de Olta, en La Rioja. Mirá las fachadas de chapa pintada y buscá la réplica del retrato de Quinquela que hizo su amigo, el escultor Luis Perlotti.",
      en: "We're arriving at Caminito, in La Boca. This street-museum, almost 150 metres long, is one of the most photographed places in the world. Its curving path has an explanation: until the early twentieth century, a stream ran right here. Later, this stretch was part of the railway to Ensenada, until the line closed in 1928 and the tracks became an abandoned alley. The area was known as «Puntín», the diminutive of bridge in the Genoese dialect: the Genoese community shaped the character of the neighbourhood. In 1959, thanks to local residents and donations from artists, the land was recovered as a pedestrian walk and open-air museum. One of its great promoters was the painter Benito Quinquela Martín, who grew up in La Boca, and it was he who proposed naming the street after the tango «Caminito», by Juan de Dios Filiberto and Gabino Coria Peñaloza. A curious detail: the lyrics are not about La Boca. They began as a 1903 poem dedicated to a path in Olta, in the province of La Rioja. Look at the painted sheet-metal façades and find the replica of Quinquela's portrait made by his friend, the sculptor Luis Perlotti.",
      pt: "Estamos chegando ao Caminito, em La Boca. Esta rua-museu, com quase 150 metros, é um dos lugares mais fotografados do mundo. O traçado curvo tem explicação: até o começo do século vinte, passava por aqui o leito de um riacho. Depois, este trecho fez parte da ferrovia para Ensenada, até que em 1928 o ramal foi fechado e a via virou um beco abandonado. A região era conhecida como «Puntín», o diminutivo de ponte no dialeto genovês: a comunidade genovesa deu sua marca ao bairro. Em 1959, por iniciativa de moradores e com doações de artistas, o terreno foi recuperado como passeio para pedestres e museu a céu aberto. Um dos grandes impulsionadores foi o pintor Benito Quinquela Martín, que cresceu em La Boca, e foi ele quem propôs batizar a rua com o nome do tango «Caminito», de Juan de Dios Filiberto e Gabino Coria Peñaloza. Um detalhe curioso: a letra não fala de La Boca. Nasceu como um poema de 1903 dedicado a uma trilha de Olta, na província de La Rioja. Repare nas fachadas de chapa pintada e procure a réplica do retrato de Quinquela feita por seu amigo, o escultor Luis Perlotti.",
    },
  },
  bombonera: {
    placeId: "bombonera",
    status: "borrador",
    reviewedAt: "2026-10-17",
    sources: [
      "https://turismo.buenosaires.gob.ar/es/otros-establecimientos/estadio-de-boca-juniors-la-bombonera",
      "https://turismo.buenosaires.gob.ar/en/node/49508",
      "https://www.bocajuniors.com.ar/la-bombonera",
    ],
    audio: {},
    text: {
      es: "Este es el estadio de Boca Juniors. Oficialmente se llama Alberto J. Armando, pero todos lo conocen como La Bombonera. Su estructura en forma de herradura, con tres bandejas superpuestas y una inclinación muy empinada, lo asemeja a una caja de bombones: de ahí su nombre popular. Se inauguró el 25 de mayo de 1940, con un triunfo de Boca dos a cero frente a San Lorenzo. Antes, el club jugaba de local en una cancha con tribunas de madera. Lo que lo vuelve único es la poca distancia entre las tribunas y el campo de juego, que acerca a los hinchas a los equipos. Tiene una capacidad aproximada de 54 mil espectadores. En el hall de entrada hay un mural de Benito Quinquela Martín, y en el exterior, obras de Pérez Celis y Rómulo Macció. Debajo de una de las tribunas funciona el Museo de la Pasión Boquense, que repasa más de cien años de historia del club.",
      en: "This is the Boca Juniors stadium. Its official name is Alberto J. Armando, but everyone knows it as La Bombonera. Its horseshoe structure, with three stacked tiers and a very steep incline, resembles a box of chocolates: hence its popular name. It opened on 25 May 1940, with Boca beating San Lorenzo two–nil. Before that, the club played its home games at a ground with wooden stands. What makes it unique is how close the stands are to the pitch, bringing fans right next to the teams. It holds roughly 54,000 spectators. In the entrance hall there is a mural by Benito Quinquela Martín, and outside, works by Pérez Celis and Rómulo Macció. Beneath one of the stands is the Museo de la Pasión Boquense, which covers more than a hundred years of the club's history.",
      pt: "Este é o estádio do Boca Juniors. O nome oficial é Alberto J. Armando, mas todos o conhecem como La Bombonera. A estrutura em forma de ferradura, com três anéis sobrepostos e uma inclinação bem íngreme, lembra uma caixa de bombons: daí o apelido. Foi inaugurado em 25 de maio de 1940, com vitória do Boca por dois a zero sobre o San Lorenzo. Antes, o clube jogava em casa num campo com arquibancadas de madeira. O que o torna único é a pouca distância entre as arquibancadas e o gramado, que aproxima a torcida dos times. Tem capacidade aproximada para 54 mil espectadores. No saguão de entrada há um mural de Benito Quinquela Martín e, do lado de fora, obras de Pérez Celis e Rómulo Macció. Embaixo de uma das arquibancadas funciona o Museo de la Pasión Boquense, que percorre mais de cem anos de história do clube.",
    },
  },
  "san-telmo-plaza": {
    placeId: "san-telmo-plaza",
    status: "borrador",
    reviewedAt: "2026-10-17",
    sources: ["https://turismo.buenosaires.gob.ar/es/atractivo/plaza-de-mayo"],
    audio: {},
    text: {
      es: "Llegamos a Plaza de Mayo, donde ocurrieron casi todos los acontecimientos políticos más importantes de la historia argentina. Su nombre homenajea la Revolución del 25 de Mayo de 1810, que sucedió en esta misma plaza. Aquí también fue fundada por segunda vez la ciudad, el 11 de junio de 1580, por Juan de Garay. Alrededor están el Cabildo, la Catedral Metropolitana, la Casa de Gobierno —la Casa Rosada, sede del Gobierno nacional—, el antiguo Palacio del Gobierno de la Ciudad, bancos y ministerios. En el centro se levanta la Pirámide de Mayo, construida en 1811 para celebrar el primer aniversario de la Revolución y reformada en 1856 por el artista y arquitecto Prilidiano Pueyrredón. Entre la Pirámide y la Casa Rosada está el monumento a Manuel Belgrano, creador de la bandera nacional. Desde 1890, cuando se realizó el primer acto político de masas, la plaza es escenario de grandes manifestaciones. Y desde 1977, los jueves, se reúnen aquí las Madres de Plaza de Mayo para reclamar por sus hijos desaparecidos durante la última dictadura.",
      en: "We've arrived at Plaza de Mayo, where almost all of the most important political events in Argentine history took place. Its name honours the Revolution of 25 May 1810, which happened in this very square. This is also where the city was founded for the second time, on 11 June 1580, by Juan de Garay. Around it stand the Cabildo, the Metropolitan Cathedral, the Government House —the Casa Rosada, seat of the national government—, the former City Government Palace, banks and ministries. In the centre rises the Pirámide de Mayo, built in 1811 to celebrate the first anniversary of the Revolution and remodelled in 1856 by the artist and architect Prilidiano Pueyrredón. Between the Pyramid and the Casa Rosada is the monument to Manuel Belgrano, creator of the national flag. Since 1890, when the first mass political rally was held, the square has been the stage for major demonstrations. And since 1977, every Thursday, the Mothers of Plaza de Mayo gather here to demand answers about their children who disappeared during the last military dictatorship.",
      pt: "Chegamos à Plaza de Mayo, onde aconteceram quase todos os fatos políticos mais importantes da história argentina. O nome homenageia a Revolução de 25 de Maio de 1810, que aconteceu nesta mesma praça. Aqui também a cidade foi fundada pela segunda vez, em 11 de junho de 1580, por Juan de Garay. Ao redor estão o Cabildo, a Catedral Metropolitana, a Casa de Governo —a Casa Rosada, sede do Governo nacional—, o antigo Palácio do Governo da Cidade, bancos e ministérios. No centro fica a Pirámide de Mayo, construída em 1811 para celebrar o primeiro aniversário da Revolução e reformada em 1856 pelo artista e arquiteto Prilidiano Pueyrredón. Entre a Pirâmide e a Casa Rosada está o monumento a Manuel Belgrano, criador da bandeira nacional. Desde 1890, quando foi realizado o primeiro ato político de massas, a praça é palco de grandes manifestações. E desde 1977, às quintas-feiras, as Mães da Plaza de Mayo se reúnem aqui para reclamar por seus filhos desaparecidos durante a última ditadura militar.",
    },
  },
  recoleta: {
    placeId: "recoleta",
    status: "borrador",
    reviewedAt: "2026-10-17",
    sources: ["https://buenosaires.gob.ar/gobierno/gestion-comunal/cementerios-de-la-ciudad/cementerio-de-la-recoleta"],
    audio: {},
    text: {
      es: "Estamos en la Recoleta. Su cementerio fue construido en 1822 como el primer cementerio público de la ciudad, y su trazado es obra del ingeniero francés Próspero Catelin. Es el más visitado de Buenos Aires y se lo considera una gran obra de arte y arquitectura. En sus cinco hectáreas hay más de 4.500 bóvedas de estilos muy variados, desde templos griegos hasta pirámides egipcias, y más de 90 fueron declaradas Monumento Histórico Nacional. Aquí descansan muchos protagonistas de la historia argentina: líderes políticos, ex presidentes, escritores, premios Nobel, deportistas y empresarios. Entre las tumbas más visitadas están las de Eva Perón, Luis Federico Leloir y Adolfo Bioy Casares. Adentro, seguí las indicaciones del propio cementerio para ubicarlas, y evitá el mediodía en los días de mucho calor.",
      en: "We're in Recoleta. Its cemetery was built in 1822 as the city's first public cemetery, and its layout is the work of the French engineer Próspero Catelin. It is the most visited cemetery in Buenos Aires and is considered a great work of art and architecture. Across its five hectares there are more than 4,500 vaults in very different styles, from Greek temples to Egyptian pyramids, and more than 90 have been declared National Historic Monuments. Many key figures of Argentine history rest here: political leaders, former presidents, writers, Nobel Prize winners, athletes and business people. Among the most visited tombs are those of Eva Perón, Luis Federico Leloir and Adolfo Bioy Casares. Inside, follow the cemetery's own signs to find them, and avoid midday on very hot days.",
      pt: "Estamos na Recoleta. O cemitério foi construído em 1822 como o primeiro cemitério público da cidade, e o traçado é obra do engenheiro francês Próspero Catelin. É o mais visitado de Buenos Aires e é considerado uma grande obra de arte e arquitetura. Em seus cinco hectares há mais de 4.500 jazigos de estilos muito variados, de templos gregos a pirâmides egípcias, e mais de 90 foram declarados Monumento Histórico Nacional. Aqui descansam muitos protagonistas da história argentina: líderes políticos, ex-presidentes, escritores, ganhadores do Prêmio Nobel, esportistas e empresários. Entre os túmulos mais visitados estão os de Eva Perón, Luis Federico Leloir e Adolfo Bioy Casares. Lá dentro, siga a sinalização do próprio cemitério para encontrá-los e evite o meio-dia nos dias muito quentes.",
    },
  },
  palermo: {
    placeId: "palermo",
    status: "borrador",
    reviewedAt: "2026-10-17",
    sources: ["https://turismo.buenosaires.gob.ar/es/atractivo/bosques-de-palermo"],
    audio: {},
    text: {
      es: "Entramos a los Bosques de Palermo. Su nombre oficial es Parque Tres de Febrero, en homenaje a la Batalla de Caseros. Fue inaugurado el 11 de noviembre de 1875 por iniciativa del entonces presidente Domingo Faustino Sarmiento. El proyecto original estuvo a cargo de los arquitectos Ernesto Oldendorf, Fernando Mauduit y Jordan Wysocky, y lo terminó Jules Dormal, uno de los constructores del Teatro Colón y del Congreso Nacional. Entre 1892 y 1913, el paisajista francés Carlos Thays hizo ampliaciones; él también diseñó el Jardín Botánico y el Parque Centenario. Hoy el parque se extiende por 370 hectáreas, con cuatro lagos y 29 plazas. En la Plaza Holanda está El Rosedal, con más de 93 especies de rosas y 12 mil rosales. Su diseño fue premiado en 2012 con el Garden Excellence Award de la Federación Mundial de las Sociedades de Rosas. Es el espacio verde más emblemático de la ciudad.",
      en: "We're entering the Bosques de Palermo, the Palermo Woods. Its official name is Parque Tres de Febrero, honouring the Battle of Caseros. It was opened on 11 November 1875 at the initiative of then-president Domingo Faustino Sarmiento. The original project was led by the architects Ernesto Oldendorf, Fernando Mauduit and Jordan Wysocky, and it was completed by Jules Dormal, one of the builders of the Teatro Colón and the National Congress. Between 1892 and 1913, the French landscape architect Carlos Thays extended it; he also designed the Botanical Garden and Parque Centenario. Today the park covers 370 hectares, with four lakes and 29 squares. In Plaza Holanda you'll find El Rosedal, with more than 93 species of roses and 12,000 rose bushes. Its design won the Garden Excellence Award from the World Federation of Rose Societies in 2012. It is the city's most emblematic green space.",
      pt: "Estamos entrando nos Bosques de Palermo. O nome oficial é Parque Tres de Febrero, em homenagem à Batalha de Caseros. Foi inaugurado em 11 de novembro de 1875 por iniciativa do então presidente Domingo Faustino Sarmiento. O projeto original ficou a cargo dos arquitetos Ernesto Oldendorf, Fernando Mauduit e Jordan Wysocky, e foi concluído por Jules Dormal, um dos construtores do Teatro Colón e do Congresso Nacional. Entre 1892 e 1913, o paisagista francês Carlos Thays fez ampliações; ele também projetou o Jardim Botânico e o Parque Centenario. Hoje o parque se estende por 370 hectares, com quatro lagos e 29 praças. Na Plaza Holanda fica El Rosedal, com mais de 93 espécies de rosas e 12 mil roseiras. O projeto recebeu em 2012 o Garden Excellence Award da Federação Mundial das Sociedades de Rosas. É o espaço verde mais emblemático da cidade.",
    },
  },
  "puerto-madero": {
    placeId: "puerto-madero",
    status: "borrador",
    reviewedAt: "2026-10-17",
    sources: [
      "https://turismo.buenosaires.gob.ar/es/atractivo/puerto-madero-0",
      "https://turismo.buenosaires.gob.ar/es/otros-establecimientos/puente-de-la-mujer",
      "https://buenosaires.gob.ar/puente-de-la-mujer",
    ],
    audio: {},
    text: {
      es: "Llegamos a Puerto Madero, uno de los barrios más jóvenes de la ciudad. A fines del siglo diecinueve se debatieron dos proyectos para darle a Buenos Aires un puerto adecuado: el del ingeniero Luis Huergo y el del comerciante Eduardo Madero. El Congreso aprobó en 1882 la propuesta de Madero, junto a Plaza de Mayo, y las obras se inauguraron en 1897. A principios del siglo veinte se construyeron los depósitos de ladrillo rojo que hoy son la imagen del barrio. Pero el puerto quedó obsoleto muy pronto, porque no contemplaba el tamaño creciente de los buques: entre 1911 y 1930 se construyó Puerto Nuevo y esta zona quedó abandonada durante más de cincuenta años. En 1989 se decidió recuperarla para integrar la ciudad al río: fueron 170 hectáreas para viviendas y espacio público. Sus calles rinden homenaje a mujeres destacadas de la historia argentina. El ícono es el Puente de la Mujer, primera obra en América Latina del arquitecto español Santiago Calatrava, inaugurado en diciembre de 2001. Es un puente peatonal giratorio que se abre para dejar pasar a los veleros, y su forma representa a una pareja que baila tango.",
      en: "We've arrived at Puerto Madero, one of the city's youngest neighbourhoods. In the late nineteenth century, two projects competed to give Buenos Aires a proper port: one by the engineer Luis Huergo and one by the merchant Eduardo Madero. In 1882 Congress approved Madero's plan, next to Plaza de Mayo, and the works opened in 1897. In the early twentieth century the red-brick warehouses that define the neighbourhood today were built. But the port soon became obsolete, because it had not allowed for the growing size of cargo ships: between 1911 and 1930 Puerto Nuevo was built to replace it, and this area was left abandoned for more than fifty years. In 1989 it was decided to recover it and reconnect the city with the river: 170 hectares for housing and public space. Its streets are named after outstanding women in Argentine history. The landmark is the Puente de la Mujer, the first work in Latin America by the Spanish architect Santiago Calatrava, officially opened in December 2001. It is a rotating footbridge that swings open to let sailing boats through, and its shape represents a couple dancing tango.",
      pt: "Chegamos a Puerto Madero, um dos bairros mais jovens da cidade. No fim do século dezenove, dois projetos disputavam dar a Buenos Aires um porto adequado: o do engenheiro Luis Huergo e o do comerciante Eduardo Madero. Em 1882 o Congresso aprovou a proposta de Madero, junto à Plaza de Mayo, e as obras foram inauguradas em 1897. No começo do século vinte foram construídos os depósitos de tijolo vermelho que hoje são a imagem do bairro. Mas o porto logo ficou obsoleto, porque não previa o tamanho crescente dos navios: entre 1911 e 1930 foi construído o Puerto Nuevo e esta área ficou abandonada por mais de cinquenta anos. Em 1989 decidiu-se recuperá-la para integrar a cidade ao rio: foram 170 hectares para moradias e espaço público. As ruas homenageiam mulheres de destaque na história argentina. O ícone é a Puente de la Mujer, primeira obra na América Latina do arquiteto espanhol Santiago Calatrava, inaugurada oficialmente em dezembro de 2001. É uma ponte para pedestres giratória que se abre para dar passagem aos veleiros, e sua forma representa um casal dançando tango.",
    },
  },
  "obelisco-colon": {
    placeId: "obelisco-colon",
    status: "borrador",
    reviewedAt: "2026-10-17",
    sources: [
      "https://turismo.buenosaires.gob.ar/es/atractivo/obelisco",
      "https://turismo.buenosaires.gob.ar/es/atractivo/teatro-colon",
    ],
    audio: {},
    text: {
      es: "Frente a nosotros, el Obelisco, ícono de la ciudad. Fue inaugurado el 23 de mayo de 1936 para recordar el cuarto centenario de la primera fundación de Buenos Aires, y se alza exactamente donde se izó por primera vez la bandera nacional en la ciudad. Es obra del arquitecto Alberto Prebisch, uno de los principales exponentes del modernismo argentino y autor también del vecino Teatro Gran Rex. Mide 67,5 metros de altura, tiene una base de 6,8 metros por lado y pesa alrededor de 170 toneladas. Domina el cruce de dos avenidas emblemáticas: la 9 de Julio, conocida como la más ancha del mundo, y Corrientes, epicentro de la cultura y el entretenimiento. Muy cerca está el Teatro Colón, inaugurado el 25 de mayo de 1908 con una función de Aida, de Giuseppe Verdi. Es obra de los arquitectos Francesco Tamburini, Victor Meano y Jules Dormal, y su sala en herradura es reconocida en todo el mundo por su acústica. Si querés conocerlo por dentro, las visitas guiadas se reservan en la boletería o en la web del teatro.",
      en: "In front of us is the Obelisk, the symbol of the city. It was inaugurated on 23 May 1936 to mark the four-hundredth anniversary of the first founding of Buenos Aires, and it stands exactly where the national flag was first raised in the city. It is the work of the architect Alberto Prebisch, one of the leading figures of Argentine modernism, who also designed the nearby Teatro Gran Rex. It is 67.5 metres tall, with a base of 6.8 metres per side, and weighs around 170 tonnes. It presides over the crossing of two emblematic avenues: 9 de Julio, known as the widest in the world, and Corrientes, the heart of culture and entertainment. Very close by is the Teatro Colón, inaugurated on 25 May 1908 with a performance of Aida, by Giuseppe Verdi. It was designed by the architects Francesco Tamburini, Victor Meano and Jules Dormal, and its horseshoe-shaped hall is renowned worldwide for its acoustics. If you'd like to see the inside, guided tours can be booked at the box office or on the theatre's website.",
      pt: "À nossa frente está o Obelisco, ícone da cidade. Foi inaugurado em 23 de maio de 1936 para lembrar o quarto centenário da primeira fundação de Buenos Aires, e fica exatamente onde a bandeira nacional foi hasteada pela primeira vez na cidade. É obra do arquiteto Alberto Prebisch, um dos principais nomes do modernismo argentino e autor também do vizinho Teatro Gran Rex. Tem 67,5 metros de altura, base de 6,8 metros de lado e pesa cerca de 170 toneladas. Domina o cruzamento de duas avenidas emblemáticas: a 9 de Julio, conhecida como a mais larga do mundo, e a Corrientes, centro da cultura e do entretenimento. Bem perto fica o Teatro Colón, inaugurado em 25 de maio de 1908 com uma récita de Aida, de Giuseppe Verdi. É obra dos arquitetos Francesco Tamburini, Victor Meano e Jules Dormal, e sua sala em ferradura é reconhecida no mundo inteiro pela acústica. Se quiser conhecê-lo por dentro, as visitas guiadas são reservadas na bilheteria ou no site do teatro.",
    },
  },
  tigre: {
    placeId: "tigre",
    status: "borrador",
    reviewedAt: "2026-10-17",
    sources: [
      "https://www.tigre.gob.ar/tigre/delta",
      "https://www.tigre.gob.ar/tigre/historia",
      "https://vivitigre.gob.ar/circuitos-turisticos/",
    ],
    audio: {},
    text: {
      es: "Llegamos a Tigre, puerta de entrada al Delta del Paraná. El río Paraná arrastra un gran volumen de sedimentos que, a lo largo de milenios, formaron islas: así nació el Delta, que abarca unos 14.000 kilómetros cuadrados. Es el quinto delta más grande del mundo y el único que desemboca en un estuario de agua dulce. Solo el Delta de Tigre tiene más de 350 ríos y arroyos. El nombre de la ciudad viene del yaguareté, al que los conquistadores llamaron «tigre». Este lugar tiene un papel en la historia nacional: el 4 de agosto de 1806, Santiago de Liniers desembarcó aquí con sus tropas, se sumaron los vecinos, y el 12 de agosto recuperaron Buenos Aires de la invasión inglesa. Por eso el 4 de agosto es el Día de Tigre. En 1938 abrió el Mercado de Frutos, donde se comercializaban los productos del Delta. Hoy el Puerto de Frutos es conocido por sus artesanías y su mimbre. Las lanchas colectivas y las excursiones por las islas salen de la Estación Fluvial; conviene confirmar salidas y clima el mismo día.",
      en: "We've arrived in Tigre, the gateway to the Paraná Delta. The Paraná River carries a huge volume of sediment that, over thousands of years, formed islands: that is how the Delta was born, covering about 14,000 square kilometres. It is the fifth-largest delta in the world and the only one that flows into a freshwater estuary. The Tigre Delta alone has more than 350 rivers and streams. The town's name comes from the jaguar, which the Spanish conquerors called «tigre». This place also plays a part in national history: on 4 August 1806, Santiago de Liniers landed here with his troops, local residents joined them, and on 12 August they took Buenos Aires back from the British invasion. That is why 4 August is Tigre Day. In 1938 the Fruit Market opened, where the Delta's produce was sold. Today the Puerto de Frutos is known for its crafts and wickerwork. Shared river boats and island excursions leave from the Estación Fluvial; it's best to confirm departures and the weather on the day.",
      pt: "Chegamos a Tigre, porta de entrada do Delta do Paraná. O rio Paraná arrasta um enorme volume de sedimentos que, ao longo de milênios, formaram ilhas: assim nasceu o Delta, que abrange cerca de 14.000 quilômetros quadrados. É o quinto maior delta do mundo e o único que desemboca num estuário de água doce. Só o Delta de Tigre tem mais de 350 rios e arroios. O nome da cidade vem da onça-pintada, que os conquistadores chamaram de «tigre». Este lugar também tem papel na história nacional: em 4 de agosto de 1806, Santiago de Liniers desembarcou aqui com suas tropas, os moradores se juntaram a elas e, em 12 de agosto, recuperaram Buenos Aires da invasão inglesa. Por isso o 4 de agosto é o Dia de Tigre. Em 1938 abriu o Mercado de Frutos, onde se vendiam os produtos do Delta. Hoje o Puerto de Frutos é conhecido pelo artesanato e pelo vime. As lanchas coletivas e as excursões pelas ilhas saem da Estación Fluvial; é melhor confirmar saídas e clima no mesmo dia.",
    },
  },
}

export function narrationsForTour(tour: TourId): Narration[] {
  return TOUR_PLACES[tour].map((id) => NARRATIONS[id]).filter((n): n is Narration => !!n)
}

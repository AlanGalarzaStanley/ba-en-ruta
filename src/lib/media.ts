/**
 * Media verificada (Wikimedia Commons) — auditoría 2026-10-17.
 * Cada foto incluye su crédito obligatorio (autor / licencia).
 * No usar fotos de Instagram sin autorización del titular.
 */

export interface Photo {
  file: string
  credit: string
}

export function commonsUrl(file: string, width = 1280): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`
}

export function commonsPage(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`
}

export const PLACE_PHOTOS: Record<string, Photo[]> = {
  "caminito": [
    { file: "Buenos_Aires_Caminito_4.jpg", credit: "Andrzej Otrębski / CC BY-SA 4.0" },
    { file: "Casa_en_Caminito,_La_Boca,_Buenos_Aires.jpg", credit: "Sombra Inquieta / CC BY-SA 4.0" },
    { file: "Buenos_Aires_-_La_Boca_-_Caminito_-_200807i.jpg", credit: "Luis Argerich / CC BY 2.0" },
  ],
  "bombonera": [
    { file: "Estadio_Alberto_J._Armando_field_view.jpg", credit: "Ministerio de Cultura de la Nación / CC BY-SA 2.0" },
    { file: "La_Bombonera_-_Buenos_Aires_-_Argentina.jpg", credit: "Diego Delso / CC BY-SA 3.0" },
    { file: "Vista_aérea_del_Estadio_Alberto_J._Armando_\"La_Bombonera\"_08.jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
  ],
  "san-telmo-plaza": [
    { file: "San_Telmo_Plaza_Dorrego.JPG", credit: "Helge Høifødt / CC BY-SA 3.0" },
    { file: "Plaza_Dorrego_(5458709871).jpg", credit: "Leandro Neumann Ciuffo / CC BY 2.0" },
    { file: "Tango_in_Plaza_Dorrego.jpg", credit: "Brian Barbutti / CC BY 2.0" },
  ],
  "recoleta": [
    { file: "Cementerio_recoleta.jpg", credit: "Jose Cubillos / CC BY-SA 4.0" },
    { file: "Recoleta_Cemetery_-_Mausoleum_64.jpg", credit: "Godot13 / CC BY-SA 4.0" },
    { file: "Vista_desde_el_aire_del_Cementerio_de_la_Recoleta_01.jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
  ],
  "palermo": [
    { file: "El_Rosedal.jpg", credit: "Rcidte / Dominio público" },
    { file: "A_cobblestoned_street_in_Palermo_Soho.jpg", credit: "Brian Barbutti / CC BY 2.0" },
    { file: "Palermo_Soho,_Buenos_Aires,_Argentina.jpg", credit: "OneEuropeanHeart / CC BY 3.0" },
  ],
  "puerto-madero": [
    { file: "2011.10.17.151426_Puente_de_la_Mujer_Puerto_Madero_Buenos_Aires.jpg", credit: "Hermann Luyken / CC0" },
    { file: "Puente_de_la_Mujer_de_Puerto_Madero_-_Noviembre_2018.jpg", credit: "Misionmedia / CC BY-SA 4.0" },
    { file: "Buenos_Aires_Puente_de_la_Mujer_1030985.jpg", credit: "Ermell / CC BY-SA 4.0" },
  ],
  "obelisco-colon": [
    { file: "Obelisco_Buenos_Aires.jpg", credit: "Guillermina Monisteri / CC BY-SA 4.0" },
    { file: "Teatro_Colón,_Buenos_Aires_01.jpg", credit: "Bernard Gagnon / CC BY-SA 4.0" },
    { file: "(Teatro_Colón)_Sala_Principal_(1).JPG", credit: "Mauricio V. Genta / CC BY-SA 4.0" },
  ],
  "tigre": [
    { file: "El_maravilloso_Delta_en_Tigre.jpg", credit: "Tigre Municipio / CC BY 2.0" },
    { file: "Delta_del_Tigre_1.jpg", credit: "Javier Vidal / CC BY 2.0" },
    { file: "Por_El_Rio_Lujan_Tigre_(191498651).jpeg", credit: "Aldo Arnez / CC0" },
  ],
}

export const STOP_PHOTOS: Record<string, Photo[]> = {
  "plaza-mayo": [
    { file: "2018-10-19_Plaza_de_Mayo,_Buenos_Aires,_Argentina_(Martin_Rulsch)_02.jpg", credit: "Martin Rulsch / CC BY-SA 4.0" },
    { file: "PlazadeMayo-nov2019.jpg", credit: "Ezarate / CC BY-SA 4.0" },
    { file: "Plaza_de_Mayo_from_the_Cabildo.jpg", credit: "The Cosmonaut / CC BY-SA 2.5 ca" },
  ],
  "casa-rosada": [
    { file: "Casa_Rosada_2024.jpg", credit: "Casa Rosada / CC BY 2.5 ar" },
  ],
  "catedral": [
    { file: "Catedral_metropolitana_de_Buenos_Aires_(1),_AA_2014.jpg", credit: "Green Mostaza / CC BY 4.0" },
    { file: "Catedral_Metropolitana_-_Buenos_Aires.jpg", credit: "The Cosmonaut / CC BY-SA 2.5 ca" },
  ],
  "cabildo": [
    { file: "Cabildo_de_Buenos_Aires.jpg", credit: "Alix21170 / CC BY-SA 3.0" },
    { file: "Cabildo_Plaza_de_Mayo_Buenos_Aires_5_de_Agosto_2023.jpg", credit: "Crazychubut / CC0" },
    { file: "Cabildo_de_la_ciudad_de_Buenos_Aires_2023.jpg", credit: "Ministerio de Cultura de la Nación / CC BY-SA 2.0" },
  ],
  "diagonal": [
    { file: "Avenida_Roque_Sáenz_Peña_(Diagonal_Norte)_Obelisco_Buenos_Aires.JPG", credit: "Roberto Fiadone / CC BY-SA 4.0" },
    { file: "Avenida_Roque_Sáenz_Peña_(8081427914).jpg", credit: "Jorge Láscar / CC BY 2.0" },
    { file: "Avenida_Roque_Sáenz_Peña_(Diagonal_Norte).jpg", credit: "jglsongs (Flickr) / CC BY 2.0" },
  ],
}

export const GASTRO_PHOTOS: Record<string, Photo[]> = {
  "tortoni": [
    { file: "Cafe_Tortoni_vitrales.jpg", credit: "Ramon Corvera / CC BY-SA 3.0" },
    { file: "Café_Tortoni,_Buenos_Aires_-Argentina_-_panoramio.jpg", credit: "Paulo JC Nogueira / CC BY-SA 3.0" },
    { file: "Interior_del_Café_Tortoni_2025_02.jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
  ],
  "las-violetas": [
    { file: "Las_Violetas_-_Plano_general.JPG", credit: "Gelpgim22 (Sergio Panei Pitrau) / CC BY 3.0" },
    { file: "Las_Violetas_-_Vitral.JPG", credit: "Gelpgim22 (Sergio Panei Pitrau) / CC BY 3.0" },
    { file: "Las_Violetas_Medrano.JPG", credit: "Autor anónimo / Dominio público" },
  ],
  "el-federal": [
    { file: "Bar_El_Federal,_Carlos_Calvo_599.jpg", credit: "Roberto Fiadone / CC BY-SA 4.0" },
    { file: "Bar_El_Federal_-_Buenos_Aires.JPG", credit: "Jrivell / CC BY-SA 3.0" },
    { file: "Post_safari_fotografico_en_el_Bar_el_Federal.jpg", credit: "Juandedeboca / CC0" },
  ],
  "bar-britanico": [
    { file: "Bar_Británico_San_Telmo.JPG", credit: "Roberto Fiadone / CC BY-SA 4.0" },
    { file: "Bar_Britanico_San_Telmo.JPG", credit: "Viviana Cachambi / CC BY-SA 3.0" },
    { file: "BarBritanico.JPG", credit: "Claudio Elias / Dominio público" },
  ],
  "los-laureles": [
    { file: "Interior_del_bar_Los_Laureles.jpg", credit: "GCBA / CC BY 2.5" },
  ],
  "la-biela": [
    { file: "La_Biela_Recoleta.jpg", credit: "Jrivell / CC BY-SA 3.0" },
    { file: "Argentina-02034_-_La_Biela_(49016900993).jpg", credit: "Dennis G. Jarvis / CC BY-SA 2.0" },
    { file: "La_Biela_Bar.jpg", credit: "Kaled Naya / CC BY-SA 3.0" },
  ],
  "la-poesia": [
    { file: "Café_Bar_La_Poesía.jpg", credit: "Roberto Fiadone / CC BY 4.0" },
    { file: "Kafejo_La_Poesía,_Bonaero.jpg", credit: "RG72 / CC BY-SA 4.0" },
  ],
  "el-gato-negro": [
    { file: "El_Gato_Negro_mostrador.jpg", credit: "Roberto Fiadone / CC BY-SA 3.0" },
    { file: "El_gato_negro_especias_vidriera.jpg", credit: "Roberto Fiadone / CC BY-SA 3.0" },
  ],
  "36-billares": [
    { file: "Los_36_Billares_1.JPG", credit: "Musicajamasoida / CC BY-SA 3.0" },
    { file: "Avenida_de_Mayo_café_36_Billares.jpg", credit: "Roberto Fiadone / Dominio público" },
    { file: "Interior_de_36_Billares_I.jpg", credit: "Robert2183 / CC BY-SA 3.0" },
  ],
  "la-giralda": [
    { file: "La_Giralda,_Avenida_Corrientes.jpg", credit: "Roberto Fiadone / CC BY-SA 4.0" },
    { file: "Buenos_Aires_-_Avenida_Corrientes_-_La_Giralda_-_20071215a.jpg", credit: "Barcex / CC BY-SA 3.0" },
  ],
  "homero-manzi": [
    { file: "Bar_Esquina_Homero_Manzi.jpg", credit: "Roberto Fiadone / CC BY 4.0" },
    { file: "Esquina_Homero_Manzi.jpg", credit: "Jrivell / CC BY-SA 3.0" },
    { file: "DefPuebloCABA_-_Esquina_Homero_Manzi_Boedo.jpg", credit: "Defensoría del Pueblo de la Ciudad de Buenos Aires / CC BY-SA 4.0" },
  ],
  "florida-garden": [
    { file: "Florida_Garden.jpg", credit: "GCBA / CC BY-SA 2.5" },
    { file: "Florida_Garden_-_fachada.jpg", credit: "GCBA / CC BY-SA 2.5" },
  ],
  "don-julio": [
    { file: "Don_Julio_Grill_dining_room_Buenos_Aires_Argentina.jpg", credit: "amanderson2 / CC BY 2.0" },
    { file: "Don_Julio_01.jpg", credit: "Roberto Fiadone / CC BY 4.0" },
    { file: "Steaks_at_Don_Julio_Buenos_Aires_Argentina.jpg", credit: "amanderson2 / CC BY 2.0" },
  ],
  "cabrera": [
    { file: "Parilla_La_Cabrera.jpg", credit: "Madeleine Holland / CC BY 2.0" },
  ],
  "preferido": [
    { file: "El_Preferido-closeup-TM.jpg", credit: "HalloweenHJB / CC BY-SA 3.0" },
    { file: "BarElPreferido-CABA-jul2024-1.jpg", credit: "Ezarate / CC BY-SA 4.0" },
    { file: "Bar_El_Preferido_de_Palermo1.jpg", credit: "Ezarate / CC BY-SA 4.0" },
  ],
  "el-cuartito": [
    { file: "Fugazzetta_pizza_served_at_\"El_Cuartito\"_Pizzería_(Buenos_Aires,_Argentina).jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
    { file: "Pizzería_El_Cuartito_02.jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
    { file: "Pizzería_El_Cuartito_12.jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
  ],
  "guerrin": [
    { file: "Pizzería_Güerrín.jpg", credit: "Roberto Fiadone / CC BY-SA 4.0" },
    { file: "Pizzería_Güerrín_de_noche,_Corrientes_1368.jpg", credit: "Roberto Fiadone / CC BY-SA 4.0" },
    { file: "Fugazzetta_en_Pizzería_Guerrin,_Buenos_Aires.jpg", credit: "Aleposta / CC BY-SA 3.0" },
  ],
  "la-mezzetta": [
    { file: "LaMezzetta_marzo2016.JPG", credit: "Marianobarraco / CC BY-SA 4.0" },
  ],
  "mercado-san-telmo": [
    { file: "Mercado_de_San_Telmo_2025_02.jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
    { file: "Mercado_de_San_Telmo_2025_01.jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
    { file: "Mercado_San_Telmo_0020087.jpg", credit: "Matias Garabedian / CC BY-SA 2.0" },
  ],
  "mercado-progreso": [
    { file: "Mercado_del_Progreso_-_Interior_5.jpg", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
    { file: "DefPuebloCABA_-_Mercado_del_Progreso_(2).jpg", credit: "Defensoría del Pueblo de la Ciudad de Buenos Aires / CC BY-SA 4.0" },
    { file: "Mercado_del_Progreso_-_fachada.JPG", credit: "ProtoplasmaKid / CC BY-SA 4.0" },
  ],
  "puerto-frutos": [
    { file: "J34_889_Puerto_de_Frutos.jpg", credit: "Falk2 / CC BY-SA 4.0" },
    { file: "Mercado_de_Los_frutos,_Tigre_2023.jpg", credit: "ElGuruCesar / CC BY-SA 4.0" },
    { file: "Rio_Lujan_-_Puerto_de_frutos_(Localidad_de_Tigre)_(4729504486).jpg", credit: "Jorge Láscar / CC BY 2.0" },
  ],
  "cadore": [
    { file: "Heladería_Cadore,_Avenida_Corrientes.jpg", credit: "Roberto Fiadone / CC BY-SA 4.0" },
  ],
}

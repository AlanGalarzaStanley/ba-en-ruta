import type { Lang } from "../lib/ba-copy"

const PIECES = [
  {
    id: "mate",
    title: { es: "El mate", en: "Mate", pt: "O mate" },
    body: {
      es: "A veces circula el mate en el auto. No es un show: es costumbre. Se ceba, se pasa, se espera el turno. Si no tomás, no pasa nada.",
      en: "Sometimes mate goes around in the car. It’s not a show—it’s custom. You brew, pass, wait your turn. If you don’t drink it, that’s fine.",
      pt: "Às vezes o mate circula no carro. Não é show: é costume. Ceba, passa, espera a vez. Se não tomar, tudo bem.",
    },
  },
  {
    id: "desayuno",
    title: { es: "Desayuno", en: "Breakfast", pt: "Café da manhã" },
    body: {
      es: "Café con leche, pan, dulce de leche, medialuna. No es brunch: es el empujón de la mañana, antes de que la ciudad se llene.",
      en: "Coffee with milk, bread, dulce de leche, medialuna. Not brunch—just the morning push before the city fills up.",
      pt: "Café com leite, pão, doce de leite, medialuna. Não é brunch: é o empurrão da manhã antes da cidade encher.",
    },
  },
  {
    id: "ritmo",
    title: { es: "Ritmo del día", en: "Daily rhythm", pt: "Ritmo do dia" },
    body: {
      es: "Colegios a la mañana, hora pico a la tarde. Un recorrido a las 10 no es el mismo que a las 18. Por eso “cinco minutos” a veces son veinte.",
      en: "Schools in the morning, rush hour in the evening. A 10 a.m. route is not a 6 p.m. route—so “five minutes” can mean twenty.",
      pt: "Escolas de manhã, pico à tarde. Um roteiro às 10 não é o das 18. Por isso “cinco minutos” às vezes são vinte.",
    },
  },
  {
    id: "clubes",
    title: { es: "Clubes de barrio", en: "Neighborhood clubs", pt: "Clubes de bairro" },
    body: {
      es: "Además de los estadios grandes hay clubes donde se come y se discute. Un bodegón en el predio no es decorado: es el mismo lugar de siempre.",
      en: "Beyond the big stadiums, local clubs are where people eat and argue. A canteen on club grounds isn’t décor—it’s the usual place.",
      pt: "Além dos estádios grandes há clubes onde se come e se discute. Um bodegón no predio não é decoração: é o lugar de sempre.",
    },
  },
] as const

export function VidaPorteña({ lang }: { lang: Lang }) {
  const label = lang === "en" ? "Daily life" : lang === "pt" ? "Vida portenha" : "Vida porteña"
  const title =
    lang === "en"
      ? "How the city actually runs."
      : lang === "pt"
        ? "Como a cidade funciona de verdade."
        : "Cómo late la ciudad de verdad."
  const sub =
    lang === "en"
      ? "Short notes any local driver can share—customs, timing, and neighborhood life. Not a museum script."
      : lang === "pt"
        ? "Notas curtas que qualquer motorista local pode contar—costumes, horários e vida de bairro. Não é roteiro de museu."
        : "Notas cortas que cualquier chofer local puede contar: costumbres, horarios y barrio. No es libreto de museo."

  return (
    <section id="vida" className="py-14 sm:py-16 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">{label}</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 max-w-xl">{title}</h2>
        <p className="text-white/65 text-sm leading-relaxed max-w-2xl mb-8">{sub}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {PIECES.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5"
            >
              <h3 className="font-display text-lg text-gold mb-2">{p.title[lang]}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{p.body[lang]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

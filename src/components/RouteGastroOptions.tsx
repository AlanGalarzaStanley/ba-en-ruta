import { useMemo } from "react"
import { MapPin, Utensils } from "lucide-react"
import type { ItineraryId } from "../lib/ba-config"
import type { Lang } from "../lib/ba-copy"
import { gastroForRoute } from "../lib/gastro-layers"

export function RouteGastroOptions({ lang, itineraryId }: { lang: Lang; itineraryId: Exclude<ItineraryId, "gastronomica"> }) {
  const options = useMemo(() => gastroForRoute(itineraryId).slice(0, 4), [itineraryId])
  if (!options.length) return null
  const text = lang === "en"
    ? { label: "Local flavour, on this route", title: "Add a table or a local stop", note: "Food, drinks and reservations are separate. We confirm the place, menu and timing before the day." }
    : lang === "pt"
      ? { label: "Sabor local neste roteiro", title: "Adicione uma mesa ou parada local", note: "Comidas, bebidas e reservas são à parte. Confirmamos local, cardápio e horário antes do dia." }
      : { label: "Sabor local en este recorrido", title: "Sumá una mesa o una parada de barrio", note: "Comidas, bebidas y reservas van aparte. Confirmamos el lugar, la carta y el horario antes del día." }

  return (
    <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-4">
      <div className="flex items-start gap-3 mb-3">
        <span className="mt-0.5 w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0"><Utensils className="w-4 h-4" aria-hidden /></span>
        <div>
          <p className="text-gold text-[10px] tracking-[0.2em] uppercase">{text.label}</p>
          <h4 className="font-display text-lg text-white">{text.title}</h4>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((place) => (
          <article key={place.id} className="rounded-lg bg-white/5 border border-white/10 p-3">
            <p className="text-sm text-white font-medium">{place.name}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/55"><MapPin className="w-3 h-3" aria-hidden />{place.neighborhood}</p>
            <p className="mt-2 text-xs leading-relaxed text-white/65">{lang === "en" ? place.whyEs.replace("Confirmá", "Confirm") : lang === "pt" ? place.whyEs : place.whyEs}</p>
            <p className="mt-2 text-[10px] text-gold/85">{place.statusNoteEs ?? (lang === "en" ? "Confirm details before visiting." : lang === "pt" ? "Confirme os detalhes antes de ir." : "Confirmá los detalles antes de ir.")}</p>
          </article>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-white/50">{text.note}</p>
    </div>
  )
}

import { useState, useMemo } from "react"
import {
  GASTRO_CATEGORIES,
  gastroSearch,
  type GastroCategory,
} from "../lib/gastronomy"
import type { RestaurantId } from "../lib/ba-config"
import { t, type Lang } from "../lib/ba-copy"

export function Gastronomy({
  lang,
  onSelect,
  selectedRestaurants,
  onToggleRestaurant,
}: {
  lang: Lang
  onSelect: () => void
  selectedRestaurants?: RestaurantId[]
  onToggleRestaurant?: (id: RestaurantId) => void
}) {
  const [cat, setCat] = useState<GastroCategory | "all">("all")
  const [q, setQ] = useState("")
  const [openId, setOpenId] = useState<string | null>(null)

  const catLabel = (c: (typeof GASTRO_CATEGORIES)[number]) =>
    lang === "en" ? c.labelEn : lang === "pt" ? c.labelPt : c.labelEs

  const list = useMemo(() => gastroSearch(q, cat), [q, cat])

  return (
    <section id="gastronomia" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-8">
          <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "gastroLabel")}</p>
          <h2 className="font-display text-3xl sm:text-4xl text-navy mb-3">{t(lang, "gastroTitle")}</h2>
          <p className="text-navy/60 text-sm leading-relaxed">{t(lang, "gastroDesc")}</p>
          <p className="text-xs text-navy/40 mt-3">{t(lang, "gastroNote")}</p>
        </div>

        <div className="mb-4">
          <label className="sr-only" htmlFor="gastro-search">
            {lang === "en" ? "Search" : lang === "pt" ? "Buscar" : "Buscar"}
          </label>
          <input
            id="gastro-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={
              lang === "en"
                ? "Search by name, neighborhood…"
                : lang === "pt"
                  ? "Buscar por nome, bairro…"
                  : "Buscar por nombre, barrio…"
            }
            className="w-full max-w-md rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-11"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {GASTRO_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`text-xs sm:text-sm px-3 py-2 rounded-full border min-h-10 transition-colors ${
                cat === c.id
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy/70 border-navy/10 hover:border-gold/50"
              }`}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="text-sm text-navy/50 py-8">
            {lang === "en"
              ? "No places match your search."
              : lang === "pt"
                ? "Nenhum lugar corresponde à busca."
                : "No hay lugares que coincidan con la búsqueda."}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {list.map((r) => {
              const isOpen = openId === r.id
              const selected = selectedRestaurants?.includes(r.id)
              const catMeta = GASTRO_CATEGORIES.find((c) => c.id === r.category)
              return (
                <article
                  key={r.id}
                  className="ba-card bg-white rounded-xl border border-navy/5 overflow-hidden flex flex-col"
                >
                  {r.image ? (
                    <div className="aspect-[16/10] bg-navy/5">
                      <img
                        src={r.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-navy/10 flex items-center justify-center">
                      <span className="text-navy/30 text-xs font-display px-3 text-center">{r.name}</span>
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-0.5">
                      {catMeta ? catLabel(catMeta) : r.category}
                    </p>
                    <h3 className="font-medium text-navy text-sm mb-0.5">{r.name}</h3>
                    <p className="text-xs text-navy/50 mb-1">
                      {r.neighborhood}, {r.locality}
                    </p>
                    <p className="text-[11px] text-navy/45 mb-2">{r.address}</p>
                    <p className="text-xs text-navy/60 leading-relaxed flex-1 mb-2">{r.descEs}</p>
                    {isOpen && (
                      <div className="text-xs text-navy/55 leading-relaxed mb-2 space-y-1 border-t border-navy/8 pt-2">
                        <p>{r.whyEs}</p>
                        {r.confidence === "listed" && (
                          <p className="text-[10px] text-navy/40 italic">
                            {lang === "en"
                              ? "Listed from trusted guides; confirm details before visiting."
                              : lang === "pt"
                                ? "Listado em guias confiáveis; confirme detalhes antes de ir."
                                : "Listado en guías confiables; confirmá detalles antes de ir."}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-auto pt-1">
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : r.id)}
                        className="text-xs font-medium text-navy/70 hover:text-navy min-h-10"
                      >
                        {isOpen
                          ? lang === "en"
                            ? "Less"
                            : lang === "pt"
                              ? "Menos"
                              : "Menos"
                          : lang === "en"
                            ? "More"
                            : lang === "pt"
                              ? "Mais"
                              : "Más"}
                      </button>
                      {r.url && (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-sky-action hover:text-navy min-h-10 inline-flex items-center"
                        >
                          {lang === "en" ? "Official site" : lang === "pt" ? "Site oficial" : "Sitio oficial"}
                        </a>
                      )}
                      {onToggleRestaurant && (
                        <button
                          type="button"
                          onClick={() => onToggleRestaurant(r.id)}
                          className={`text-xs font-medium min-h-10 ${selected ? "text-gold" : "text-navy hover:text-gold"}`}
                        >
                          {selected ? t(lang, "guideRemoveTour") : t(lang, "guideAddTour")}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <p className="text-[10px] text-navy/35 mb-4">
          {list.length}{" "}
          {lang === "en" ? "places" : lang === "pt" ? "lugares" : "lugares"}
          {" · "}
          {lang === "en"
            ? "Sources: GCBA Notable Bars, official sites, city tourism."
            : lang === "pt"
              ? "Fontes: GCBA Bares Notáveis, sites oficiais, turismo da cidade."
              : "Fuentes: GCBA Bares Notables, sitios oficiales, turismo de la Ciudad."}
        </p>
        <button
          type="button"
          onClick={onSelect}
          className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold min-h-11"
        >
          {t(lang, "gastroCta")} <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  )
}

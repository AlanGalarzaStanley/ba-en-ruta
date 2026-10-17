import { useState, useMemo } from "react"
import {
  GASTRO_CATEGORIES,
  gastroSearch,
  type GastroCategory,
  type GastroPlace,
} from "../lib/gastronomy"
import type { RestaurantId } from "../lib/ba-config"
import { t, type Lang } from "../lib/ba-copy"
import { optimizeImage, imageSrcSet } from "../lib/img"

function linkLabel(lang: Lang, kind: "site" | "reserve" | "tickets" | "ig"): string {
  if (kind === "site") return lang === "en" ? "Official site" : lang === "pt" ? "Site oficial" : "Sitio oficial"
  if (kind === "reserve") return lang === "en" ? "Reserve" : lang === "pt" ? "Reservar" : "Reservar"
  if (kind === "tickets") return lang === "en" ? "Buy tickets" : lang === "pt" ? "Comprar ingressos" : "Comprar entradas"
  return "Instagram"
}

function GastroLinks({ r, lang }: { r: GastroPlace; lang: Lang }) {
  const links: { href: string; kind: "site" | "reserve" | "tickets" | "ig" }[] = []
  if (r.url) links.push({ href: r.url, kind: "site" })
  if (r.reserveUrl) links.push({ href: r.reserveUrl, kind: "reserve" })
  if (r.ticketsUrl) links.push({ href: r.ticketsUrl, kind: "tickets" })
  if (r.instagramUrl) links.push({ href: r.instagramUrl, kind: "ig" })
  if (links.length === 0) return null
  return (
    <>
      {links.map((l) => (
        <a
          key={l.kind + l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-sky-action hover:text-navy min-h-10 inline-flex items-center"
        >
          {linkLabel(lang, l.kind)}
        </a>
      ))}
    </>
  )
}

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
          <p className="text-navy/65 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "gastroLabel")}</p>
          <h2 className="font-display text-3xl sm:text-4xl text-navy mb-3">{t(lang, "gastroTitle")}</h2>
          <p className="text-navy/60 text-sm leading-relaxed">{t(lang, "gastroDesc")}</p>
          <p className="text-xs text-navy/65 mt-3">{t(lang, "gastroNote")}</p>
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
            className="w-full max-w-md rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/50 focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-11"
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
          <p className="text-sm text-navy/65 py-8">
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
                  className="ba-card ba-reveal bg-white rounded-xl border border-navy/5 overflow-hidden flex flex-col"
                >
                  {r.image ? (
                    <div className="aspect-[16/10] bg-navy/5 relative overflow-hidden">
                      <img
                        src={optimizeImage(r.image, 500)}
                        srcSet={imageSrcSet(r.image, [330, 500, 960])}
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        alt={r.name}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                      {r.imageCredit && (
                        <span className="absolute bottom-0 left-0 right-0 px-2 py-1 text-[9px] text-white/80 bg-gradient-to-t from-black/60 to-transparent truncate">
                          {t(lang, "photoBy")}: {r.imageCredit}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-navy to-[#1E293B] flex flex-col items-center justify-center gap-2 px-4">
                      <span className="text-gold text-[10px] uppercase tracking-[0.25em]">{r.neighborhood}</span>
                      <span className="text-white font-display text-xl text-center leading-tight">{r.name}</span>
                      {r.instagramUrl && (
                        <a
                          href={r.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-white/70 hover:text-white underline underline-offset-4 min-h-8 inline-flex items-center"
                        >
                          {lang === "en" ? "See photos on Instagram" : lang === "pt" ? "Ver fotos no Instagram" : "Ver fotos en Instagram"}
                        </a>
                      )}
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-navy/65 mb-0.5">
                      {catMeta ? catLabel(catMeta) : r.category}
                    </p>
                    <h3 className="font-medium text-navy text-sm mb-0.5">{r.name}</h3>
                    <p className="text-xs text-navy/65 mb-1">
                      {r.neighborhood}, {r.locality}
                    </p>
                    <p className="text-[11px] text-navy/65 mb-2">{r.address}</p>
                    <p className="text-xs text-navy/60 leading-relaxed flex-1 mb-2">{r.descEs}</p>
                    {r.statusNoteEs && (
                      <p className="text-[11px] text-amber-700 bg-amber-50 rounded-md px-2 py-1 mb-2">
                        {lang === "en"
                          ? "Status changing in 2026: check it is open before going."
                          : lang === "pt"
                            ? "Situação em mudança em 2026: confirme se está aberto antes de ir."
                            : r.statusNoteEs}
                      </p>
                    )}
                    {isOpen && (
                      <div className="text-xs text-navy/65 leading-relaxed mb-2 space-y-1 border-t border-navy/8 pt-2">
                        <p>{r.whyEs}</p>
                        {r.confidence === "listed" && (
                          <p className="text-[10px] text-navy/65 italic">
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
                      <GastroLinks r={r} lang={lang} />
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

        <p className="text-[10px] text-navy/65 mb-4">
          {list.length}{" "}
          {lang === "en" ? "places" : lang === "pt" ? "lugares" : "lugares"}
          {" · "}
          {lang === "en"
            ? "Links verified 2026-10-17. Only official destinations are shown."
            : lang === "pt"
              ? "Links verificados em 2026-10-17. Só destinos oficiais são exibidos."
              : "Enlaces verificados 2026-10-17. Solo se muestran destinos oficiales."}
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

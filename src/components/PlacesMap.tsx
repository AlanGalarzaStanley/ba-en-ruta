import { useEffect, useRef } from "react"
import { PLACES, type PlaceId } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"

type Props = {
  lang: Lang
  highlightId?: PlaceId | null
  onSelectPlace?: (id: PlaceId) => void
}

export function PlacesMap({ lang, highlightId, onSelectPlace }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<{ map: import("leaflet").Map; markers: Map<PlaceId, import("leaflet").Marker> } | null>(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || loadedRef.current) return

    let cancelled = false
    let observer: IntersectionObserver | null = null

    const init = async () => {
      if (cancelled || loadedRef.current) return
      loadedRef.current = true

      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const map = L.map(el, {
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([-34.58, -58.42], 11)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      const markers = new Map<PlaceId, import("leaflet").Marker>()

      PLACES.forEach((place, i) => {
        const num = i + 1
        const icon = L.divIcon({
          className: "",
          html: `<div class="ba-map-marker" aria-hidden="true">${num}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })
        const name = t(lang, place.nameKey as CopyKey)
        const marker = L.marker([place.lat, place.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<strong>${num}. ${name}</strong><br/><button type="button" data-place="${place.id}" class="ba-map-popup-btn" style="margin-top:6px;font-size:12px;text-decoration:underline;background:none;border:none;cursor:pointer;color:#0F172A">${t(lang, "guideShowOnMap")}</button>`,
          )
        marker.on("click", () => onSelectPlace?.(place.id))
        markers.set(place.id, marker)
      })

      el.addEventListener("click", (e) => {
        const target = e.target as HTMLElement
        const btn = target.closest("[data-place]") as HTMLElement | null
        if (btn?.dataset.place) {
          onSelectPlace?.(btn.dataset.place as PlaceId)
          const card = document.getElementById(`place-${btn.dataset.place}`)
          card?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      })

      mapRef.current = { map, markers }

      const group = L.featureGroup([...markers.values()])
      map.fitBounds(group.getBounds().pad(0.15))
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer?.disconnect()
          init()
        }
      },
      { rootMargin: "200px" },
    )
    observer.observe(el)

    return () => {
      cancelled = true
      observer?.disconnect()
      if (mapRef.current) {
        mapRef.current.map.remove()
        mapRef.current = null
        loadedRef.current = false
      }
    }
  }, [lang, onSelectPlace])

  useEffect(() => {
    const ctx = mapRef.current
    if (!ctx || !highlightId) return
    const marker = ctx.markers.get(highlightId)
    if (marker) {
      marker.openPopup()
      ctx.map.panTo(marker.getLatLng(), { animate: true })
    }
  }, [highlightId])

  return (
    <section id="mapa" className="py-12 sm:py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "mapLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-2">{t(lang, "mapTitle")}</h2>
        <p className="text-navy/60 text-sm mb-6 max-w-xl">{t(lang, "mapSubtitle")}</p>
        <div className="ba-accent-line mb-6 max-w-xs" aria-hidden />
        <div
          ref={containerRef}
          className="ba-map border border-navy/10 shadow-sm"
          role="region"
          aria-label={t(lang, "mapTitle")}
        />
        <p className="mt-3 text-[10px] text-navy/40">{t(lang, "mapAttribution")}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {PLACES.map((p, i) => (
            <li key={p.id}>
              <a
                href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=15/${p.lat}/${p.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs rounded-full border border-navy/15 bg-white px-3 py-1.5 text-navy/70 hover:border-sky hover:text-navy transition-colors min-h-10"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-navy text-white text-[10px] font-semibold">
                  {i + 1}
                </span>
                {t(lang, p.nameKey as CopyKey)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

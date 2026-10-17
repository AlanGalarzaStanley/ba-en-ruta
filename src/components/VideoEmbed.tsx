import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Play, X, ExternalLink } from "lucide-react"
import { t, type Lang } from "../lib/ba-copy"
import { youtubeId } from "../lib/route"

/**
 * Reproductor liviano: muestra la miniatura de YouTube y recién al tocar carga el iframe
 * (youtube-nocookie). Así la página sigue rápida y el video se ve dentro del sitio.
 */
export function VideoEmbed({
  url,
  lang,
  title,
  autoplay = false,
  className = "",
}: {
  url: string
  lang: Lang
  title: string
  autoplay?: boolean
  className?: string
}) {
  const id = youtubeId(url)
  const [active, setActive] = useState(autoplay)
  if (!id) return null
  return (
    <div className={`relative w-full aspect-video bg-black overflow-hidden rounded-xl ${className}`}>
      {active ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 w-full h-full"
          aria-label={`${t(lang, "videoPlay")}: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-gold text-navy flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              <Play className="w-7 h-7 fill-current translate-x-0.5" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export function VideoModal({
  url,
  lang,
  title,
  onClose,
}: {
  url: string
  lang: Lang
  title: string
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-navy/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8 ba-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${t(lang, "videoTitle")}: ${title}`}
      onClick={onClose}
    >
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 mb-3 text-white">
          <p className="font-display text-lg sm:text-xl truncate">{title}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            aria-label={t(lang, "playerClose")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <VideoEmbed url={url} lang={lang} title={title} autoplay />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/55">
          <p>{t(lang, "videoNote")}</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/75 hover:text-white min-h-10">
            {t(lang, "videoOpenYoutube")} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}

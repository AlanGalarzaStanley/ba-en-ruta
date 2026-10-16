import { useMemo, useState } from "react"
import { Download, Share2, QrCode } from "lucide-react"
import { WHATSAPP_NUMBER } from "../lib/ba-config"
import { t, type Lang } from "../lib/ba-copy"
import { getDriverQrWhatsAppUrl, buildPassengerContactMessage } from "../lib/whatsapp"

type Props = { lang: Lang }

/**
 * «Mi QR» — minimal: title, QR, brief WhatsApp note.
 * No step-by-step instructions (product decision).
 */
export function MiQr({ lang }: Props) {
  const numberOk = /^\d{10,15}$/.test(WHATSAPP_NUMBER)
  const waUrl = useMemo(() => (numberOk ? getDriverQrWhatsAppUrl() : null), [numberOk])
  const message = useMemo(() => buildPassengerContactMessage(), [])
  const [dlError, setDlError] = useState("")

  const qrSrc = waUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=16&ecc=M&data=${encodeURIComponent(waUrl)}`
    : null

  const downloadPng = async () => {
    setDlError("")
    if (!qrSrc) return
    try {
      const res = await fetch(qrSrc)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "ba-en-ruta-mi-qr.png"
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setDlError(t(lang, "qrDownloadError"))
    }
  }

  const share = async () => {
    if (!waUrl) return
    try {
      if (navigator.share) {
        await navigator.share({ title: "BA en Ruta", text: message, url: waUrl })
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(waUrl)
        alert(t(lang, "qrCopied"))
      }
    } catch {
      /* cancelled */
    }
  }

  return (
    <section id="mi-qr" className="py-14 sm:py-16 bg-cream-dark/20">
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-2xl sm:text-3xl text-navy mb-2">{t(lang, "qrTitle")}</h2>
        <p className="text-sm text-navy/55 mb-8 max-w-sm mx-auto leading-relaxed">{t(lang, "qrSubtitleShort")}</p>

        {!numberOk || !waUrl || !qrSrc ? (
          <div className="ba-card bg-white rounded-2xl border border-navy/5 p-8">
            <QrCode className="w-12 h-12 text-navy/25 mx-auto mb-4" aria-hidden />
            <p className="text-sm text-navy/70">{t(lang, "qrMissingNumber")}</p>
          </div>
        ) : (
          <div className="ba-card bg-white rounded-2xl border border-navy/5 p-6 sm:p-8 inline-flex flex-col items-center w-full">
            <div className="bg-white p-3 rounded-xl border border-navy/10 shadow-sm">
              <img
                src={qrSrc}
                alt={t(lang, "qrAlt")}
                width={320}
                height={320}
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-xs text-navy/45 max-w-xs">{t(lang, "qrHint")}</p>
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              <button
                type="button"
                onClick={downloadPng}
                className="inline-flex items-center gap-1.5 min-h-11 px-4 rounded-lg border border-navy/15 text-sm font-medium text-navy hover:border-navy/30 transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden />
                {t(lang, "qrDownload")}
              </button>
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-1.5 min-h-11 px-4 rounded-lg bg-gold hover:bg-gold-light text-navy text-sm font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" aria-hidden />
                {t(lang, "qrShare")}
              </button>
            </div>
            {dlError && <p className="mt-3 text-xs text-red-700">{dlError}</p>}
          </div>
        )}
      </div>
    </section>
  )
}

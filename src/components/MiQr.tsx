import { useMemo, useRef, useState } from "react"
import { Download, Share2, QrCode } from "lucide-react"
import { WHATSAPP_NUMBER, SITE_URL } from "../lib/ba-config"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { getDriverQrWhatsAppUrl, buildPassengerContactMessage } from "../lib/whatsapp"

type Props = { lang: Lang }

/**
 * «Mi QR» — código para que el pasajero escanee y abra WhatsApp
 * con un mensaje precargado hacia el conductor.
 * El pasajero debe tocar «Enviar» en WhatsApp; el envío no es automático.
 */
export function MiQr({ lang }: Props) {
  const numberOk = /^\d{10,15}$/.test(WHATSAPP_NUMBER)
  const waUrl = useMemo(() => (numberOk ? getDriverQrWhatsAppUrl() : null), [numberOk])
  const message = useMemo(() => buildPassengerContactMessage(), [])
  const [dlError, setDlError] = useState("")
  const imgRef = useRef<HTMLImageElement>(null)

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
        await navigator.share({
          title: "BA en Ruta",
          text: message,
          url: waUrl,
        })
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(waUrl)
        setDlError("")
        alert(t(lang, "qrCopied"))
      }
    } catch {
      /* user cancelled share */
    }
  }

  return (
    <section id="mi-qr" className="py-16 sm:py-20 bg-cream-dark/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-navy/40 text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "qrLabel")}</p>
        <h2 className="font-display text-3xl sm:text-4xl text-navy mb-2">{t(lang, "qrTitle")}</h2>
        <p className="text-navy/60 text-sm mb-10 max-w-2xl leading-relaxed">{t(lang, "qrSubtitle")}</p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="ba-card bg-white rounded-2xl border border-navy/5 p-6 sm:p-8 flex flex-col items-center">
            {!numberOk || !waUrl || !qrSrc ? (
              <div className="text-center py-8">
                <QrCode className="w-12 h-12 text-navy/25 mx-auto mb-4" aria-hidden />
                <p className="text-sm text-navy/70 leading-relaxed max-w-sm">{t(lang, "qrMissingNumber")}</p>
                <p className="mt-3 text-xs text-navy/45 font-mono">src/lib/ba-config.ts → WHATSAPP_NUMBER</p>
              </div>
            ) : (
              <>
                <div className="bg-white p-3 rounded-xl border border-navy/10 shadow-sm">
                  <img
                    ref={imgRef}
                    src={qrSrc}
                    alt={t(lang, "qrAlt")}
                    width={320}
                    height={320}
                    className="w-64 h-64 sm:w-72 sm:h-72 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-center text-xs text-navy/50 max-w-xs leading-relaxed">{t(lang, "qrHint")}</p>
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
              </>
            )}
          </div>

          <div className="space-y-4 text-sm text-navy/70 leading-relaxed">
            <div className="ba-card bg-white rounded-2xl border border-navy/5 p-5">
              <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-2">{t(lang, "qrHowLabel")}</p>
              <ol className="list-decimal list-inside space-y-2 text-navy/70">
                <li>{t(lang, "qrStep1")}</li>
                <li>{t(lang, "qrStep2")}</li>
                <li>{t(lang, "qrStep3")}</li>
              </ol>
            </div>
            <div className="ba-card bg-white rounded-2xl border border-navy/5 p-5">
              <p className="text-[10px] uppercase tracking-widest text-navy/40 mb-2">{t(lang, "qrMsgLabel")}</p>
              <p className="text-xs text-navy/60 whitespace-pre-wrap break-words bg-cream/60 rounded-lg p-3 border border-navy/5">
                {message}
              </p>
              <p className="mt-3 text-[10px] text-navy/40">
                {t(lang, "qrSiteRef")}: {SITE_URL}
              </p>
            </div>
            <p className="text-xs text-navy/45">{t(lang, "qrPrivacy")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

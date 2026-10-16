import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { t, type Lang, type CopyKey } from "../lib/ba-copy"
import { getWhatsAppUrl, openWhatsApp } from "../lib/whatsapp"

type Props = { lang: Lang }

function buildDriverSignupMessage(opts: {
  lang: Lang
  name: string
  commercialName: string
  whatsapp: string
  zone: string
  pageType: string
  notes: string
}): string {
  const { lang, name, commercialName, whatsapp, zone, pageType, notes } = opts
  if (lang === "en") {
    return [
      "Hello! I'm interested in having my own professional page like BA en Ruta.",
      `Name: ${name}`,
      commercialName ? `Commercial name: ${commercialName}` : "",
      `WhatsApp: ${whatsapp}`,
      zone ? `Work zone: ${zone}` : "",
      pageType ? `Page type of interest: ${pageType}` : "",
      notes ? `Notes: ${notes}` : "",
      "This is an enquiry only — not a confirmed service.",
    ]
      .filter(Boolean)
      .join("\n")
  }
  if (lang === "pt") {
    return [
      "Olá! Tenho interesse em ter minha própria página profissional como a BA en Ruta.",
      `Nome: ${name}`,
      commercialName ? `Nome comercial: ${commercialName}` : "",
      `WhatsApp: ${whatsapp}`,
      zone ? `Zona de trabalho: ${zone}` : "",
      pageType ? `Tipo de página: ${pageType}` : "",
      notes ? `Observações: ${notes}` : "",
      "Isto é apenas uma consulta — não um serviço confirmado.",
    ]
      .filter(Boolean)
      .join("\n")
  }
  return [
    "¡Hola! Me interesa tener mi propia página profesional como BA en Ruta.",
    `Nombre: ${name}`,
    commercialName ? `Nombre comercial: ${commercialName}` : "",
    `WhatsApp: ${whatsapp}`,
    zone ? `Zona de trabajo: ${zone}` : "",
    pageType ? `Tipo de página de interés: ${pageType}` : "",
    notes ? `Comentarios: ${notes}` : "",
    "Esto es solo una consulta — no un servicio confirmado.",
  ]
    .filter(Boolean)
    .join("\n")
}

export function DriverSignup({ lang }: Props) {
  const [name, setName] = useState("")
  const [commercialName, setCommercialName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [zone, setZone] = useState("")
  const [pageType, setPageType] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name.trim() || !whatsapp.trim()) {
      setError(t(lang, "formErrorRequired"))
      return
    }
    const msg = buildDriverSignupMessage({
      lang,
      name: name.trim(),
      commercialName: commercialName.trim(),
      whatsapp: whatsapp.trim(),
      zone: zone.trim(),
      pageType: pageType.trim(),
      notes: notes.trim(),
    })
    const { opened, url } = openWhatsApp(msg)
    if (!opened && url) {
      window.location.href = url
    } else if (!opened) {
      setError(t(lang, "formNoWhatsApp"))
    }
  }

  return (
    <section id="para-choferes" className="py-16 sm:py-20 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">{t(lang, "driverLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl mb-4">{t(lang, "driverTitle")}</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-md">{t(lang, "driverDesc")}</p>
            <ul className="space-y-2 text-sm text-white/65 mb-6">
              <li>• {t(lang, "driverBenefit1")}</li>
              <li>• {t(lang, "driverBenefit2")}</li>
              <li>• {t(lang, "driverBenefit3")}</li>
            </ul>
            <p className="text-xs text-white/40">{t(lang, "driverNote")}</p>
          </div>

          <form onSubmit={submit} className="ba-card bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1" htmlFor="drv-name">
                {t(lang, "driverName")} *
              </label>
              <input
                id="drv-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
                placeholder={t(lang, "driverNamePh")}
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1" htmlFor="drv-commercial">
                {t(lang, "driverCommercial")}
              </label>
              <input
                id="drv-commercial"
                value={commercialName}
                onChange={(e) => setCommercialName(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
                placeholder={t(lang, "driverCommercialPh")}
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1" htmlFor="drv-wa">
                {t(lang, "driverWhatsApp")} *
              </label>
              <input
                id="drv-wa"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
                placeholder="54911..."
                inputMode="tel"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1" htmlFor="drv-zone">
                {t(lang, "driverZone")}
              </label>
              <input
                id="drv-zone"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
                placeholder={t(lang, "driverZonePh")}
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1" htmlFor="drv-type">
                {t(lang, "driverPageType")}
              </label>
              <select
                id="drv-type"
                value={pageType}
                onChange={(e) => setPageType(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
              >
                <option value="">{t(lang, "driverPageTypePh")}</option>
                <option value="basica">{t(lang, "driverPageBasic")}</option>
                <option value="completa">{t(lang, "driverPageFull")}</option>
                <option value="consultar">{t(lang, "driverPageConsult")}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1" htmlFor="drv-notes">
                {t(lang, "driverNotes")}
              </label>
              <textarea
                id="drv-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold resize-y"
                placeholder={t(lang, "driverNotesPh")}
              />
            </div>
            {error && <p className="text-xs text-gold">{error}</p>}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 min-h-11 rounded-lg bg-gold hover:bg-gold-light text-navy font-medium text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t(lang, "driverSubmit")}
            </button>
            <p className="text-[10px] text-white/40 text-center">{t(lang, "driverPrivacy")}</p>
          </form>
        </div>
      </div>
    </section>
  )
}

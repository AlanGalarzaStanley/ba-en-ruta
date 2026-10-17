import { useCallback, useEffect, useState, type FormEvent } from "react"
import { Copy, KeyRound, LogOut, MessageCircle, RefreshCw, ShieldOff, Smartphone } from "lucide-react"
import { ITINERARIES, type ItineraryId } from "../lib/ba-config"
import { t, type CopyKey } from "../lib/ba-copy"

/**
 * Panel del dueño: crear, listar, revocar y liberar códigos.
 * El token de administrador se guarda solo en esta pestaña (sessionStorage) y viaja en un
 * encabezado Authorization; nunca va en la URL.
 */

const TOKEN_KEY = "baenruta:admin-token"

interface PublicCode {
  id: string
  tour: ItineraryId
  status: "active" | "revoked"
  createdAt: number
  redeemBy: number
  sessionHours: number
  maxDevices: number
  devicesUsed: number
  firstRedeemedAt: number | null
  sessionEndsAt: number | null
  hint: string
  note: string
}

const ERRORS: Record<string, string> = {
  unauthorized: "Token de administrador incorrecto.",
  admin_not_configured: "Falta configurar TOUR_ADMIN_TOKEN en Vercel.",
  not_configured: "Falta configurar TOUR_AUTH_SECRET o el almacenamiento (Blob) en Vercel.",
  invalid_params: "Revisá los valores del formulario.",
  invalid_tour: "Recorrido inválido.",
  busy: "Otro cambio ocurrió al mismo tiempo. Probá de nuevo.",
  network: "Sin conexión.",
  server_error: "Error del servidor. Probá de nuevo en unos minutos.",
}

const fmt = (ms: number | null) =>
  ms == null ? "—" : new Date(ms).toLocaleString("es-AR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })

const tourName = (id: ItineraryId) => {
  const it = ITINERARIES.find((i) => i.id === id)
  return it ? t("es", it.nameKey as CopyKey) : id
}

function readToken(): string {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? ""
  } catch {
    return ""
  }
}

async function api<T>(token: string, method: "GET" | "POST", body?: unknown): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/admin/codes", {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    })
    const data = (await res.json().catch(() => null)) as (T & { error?: string }) | null
    if (res.ok && data) return { ok: true, data }
    return { ok: false, error: data?.error ?? (res.status >= 500 ? "server_error" : "unauthorized") }
  } catch {
    return { ok: false, error: "network" }
  }
}

function activationLink(code: string) {
  return `${window.location.origin}/tour?codigo=${encodeURIComponent(code)}`
}

function whatsappText(code: string, tour: ItineraryId) {
  return `Hola. Este es tu código para el modo en ruta de BA en Ruta (${tourName(tour)}): ${code}\nActivalo desde tu teléfono en: ${activationLink(code)}\nEl código queda vinculado al teléfono donde lo actives.`
}

export function AdminCodes() {
  const [token, setToken] = useState(readToken)
  const [input, setInput] = useState("")
  const [codes, setCodes] = useState<PublicCode[] | null>(null)
  const [created, setCreated] = useState<{ code: string; record: PublicCode }[]>([])
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [form, setForm] = useState({ tour: ITINERARIES[0].id as ItineraryId, count: 1, redeemDays: 30, sessionHours: 12, maxDevices: 1, note: "" })

  useEffect(() => {
    document.title = "Códigos · BA en Ruta"
    const robots = document.createElement("meta")
    robots.name = "robots"
    robots.content = "noindex, nofollow"
    document.head.appendChild(robots)
    return () => robots.remove()
  }, [])

  const refresh = useCallback(async (tk = token) => {
    if (!tk) return
    setBusy(true)
    const r = await api<{ codes: PublicCode[] }>(tk, "GET")
    setBusy(false)
    if (r.ok) {
      setCodes(r.data.codes)
      setError(null)
    } else {
      setError(r.error)
      if (r.error === "unauthorized") {
        setToken("")
        try {
          sessionStorage.removeItem(TOKEN_KEY)
        } catch {
          /* ignore */
        }
      }
    }
  }, [token])

  useEffect(() => {
    if (token) void refresh(token)
  }, [token, refresh])

  const login = (e: FormEvent) => {
    e.preventDefault()
    const tk = input.trim()
    if (!tk) return
    try {
      sessionStorage.setItem(TOKEN_KEY, tk)
    } catch {
      /* ignore */
    }
    setInput("")
    setToken(tk)
  }
  const logout = () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY)
    } catch {
      /* ignore */
    }
    setToken("")
    setCodes(null)
    setCreated([])
  }

  const create = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    const r = await api<{ codes: { code: string; record: PublicCode }[] }>(token, "POST", { action: "create", ...form })
    setBusy(false)
    if (r.ok) {
      setCreated(r.data.codes)
      setError(null)
      void refresh()
    } else setError(r.error)
  }

  const act = async (action: "revoke" | "release", c: PublicCode) => {
    const msg =
      action === "revoke"
        ? `¿Desactivar el código …${c.hint}? No se puede deshacer.`
        : `¿Liberar el código …${c.hint}? El teléfono actual pierde el acceso y se puede activar en otro dentro de la misma ventana.`
    if (!window.confirm(msg)) return
    setBusy(true)
    const r = await api(token, "POST", { action, id: c.id })
    setBusy(false)
    if (!r.ok) setError(r.error)
    void refresh()
  }

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      window.setTimeout(() => setCopied(null), 2000)
    } catch {
      window.prompt("Copiá el texto:", text)
    }
  }

  const now = Date.now()
  const statusOf = (c: PublicCode) => {
    if (c.status === "revoked") return "Desactivado"
    if (c.sessionEndsAt != null && now >= c.sessionEndsAt) return "Vencido"
    if (c.firstRedeemedAt == null && now >= c.redeemBy) return "Vencido sin usar"
    if (c.devicesUsed > 0) return `En uso (${c.devicesUsed}/${c.maxDevices})`
    return "Disponible"
  }

  return (
    <div className="min-h-screen bg-slate-50 text-navy">
      <header className="bg-navy text-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold">BA en Ruta · Códigos del modo en ruta</span>
          {token && (
            <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white">
              <LogOut className="w-4 h-4" aria-hidden /> Salir
            </button>
          )}
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
            {ERRORS[error] ?? error}
          </p>
        )}

        {!token ? (
          <form onSubmit={login} className="max-w-md bg-white rounded-2xl shadow p-6">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-gold" aria-hidden /> Acceso de administración
            </h1>
            <p className="text-sm text-navy/70 mt-2">Pegá el token de administrador (variable TOUR_ADMIN_TOKEN en Vercel). Se guarda solo en esta pestaña.</p>
            <label htmlFor="admin-token" className="block text-sm font-medium mt-4">Token</label>
            <input id="admin-token" type="password" autoComplete="current-password" value={input} onChange={(e) => setInput(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5" />
            <button type="submit" className="mt-4 rounded-lg bg-navy text-white px-4 py-2.5 font-semibold">Entrar</button>
          </form>
        ) : (
          <>
            <form onSubmit={create} className="bg-white rounded-2xl shadow p-6" aria-labelledby="create-title">
              <h1 id="create-title" className="text-xl font-semibold">Crear códigos</h1>
              <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
                <label className="block">
                  <span className="font-medium">Recorrido</span>
                  <select value={form.tour} onChange={(e) => setForm({ ...form, tour: e.target.value as ItineraryId })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
                    {ITINERARIES.map((i) => (
                      <option key={i.id} value={i.id}>{tourName(i.id)}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="font-medium">Cantidad (1–20)</span>
                  <input type="number" min={1} max={20} value={form.count} onChange={(e) => setForm({ ...form, count: Number(e.target.value) })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                </label>
                <label className="block">
                  <span className="font-medium">Días para activarlo (1–180)</span>
                  <input type="number" min={1} max={180} value={form.redeemDays} onChange={(e) => setForm({ ...form, redeemDays: Number(e.target.value) })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                </label>
                <label className="block">
                  <span className="font-medium">Horas de uso desde la activación (1–72)</span>
                  <input type="number" min={1} max={72} value={form.sessionHours} onChange={(e) => setForm({ ...form, sessionHours: Number(e.target.value) })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                </label>
                <label className="block">
                  <span className="font-medium">Teléfonos por código (1–5)</span>
                  <input type="number" min={1} max={5} value={form.maxDevices} onChange={(e) => setForm({ ...form, maxDevices: Number(e.target.value) })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                </label>
                <label className="block">
                  <span className="font-medium">Nota interna (cliente, fecha)</span>
                  <input type="text" maxLength={80} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                </label>
              </div>
              <button type="submit" disabled={busy} className="mt-5 rounded-lg bg-gold text-navy px-4 py-2.5 font-semibold disabled:opacity-50">Crear</button>
            </form>

            {created.length > 0 && (
              <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6" aria-labelledby="new-title" data-testid="created-codes">
                <h2 id="new-title" className="text-lg font-semibold">Códigos nuevos</h2>
                <p className="text-sm text-navy/70 mt-1">Se muestran una sola vez: el servidor no guarda el código en claro. Copialos o enviálos ahora.</p>
                <ul className="mt-4 space-y-3">
                  {created.map(({ code, record }) => (
                    <li key={record.id} className="bg-white rounded-xl p-4 flex flex-wrap items-center gap-3">
                      <code className="font-mono text-lg tracking-wider" data-testid="new-code">{code}</code>
                      <span className="text-sm text-navy/60">{tourName(record.tour)}</span>
                      <span className="flex-1" />
                      <button type="button" onClick={() => copy(code, `c-${record.id}`)} className="inline-flex items-center gap-1.5 text-sm rounded-lg border border-slate-300 px-3 py-1.5">
                        <Copy className="w-4 h-4" aria-hidden /> {copied === `c-${record.id}` ? "Copiado" : "Copiar"}
                      </button>
                      <button type="button" onClick={() => copy(activationLink(code), `l-${record.id}`)} className="inline-flex items-center gap-1.5 text-sm rounded-lg border border-slate-300 px-3 py-1.5">
                        <Copy className="w-4 h-4" aria-hidden /> {copied === `l-${record.id}` ? "Copiado" : "Copiar enlace"}
                      </button>
                      <a href={`https://wa.me/?text=${encodeURIComponent(whatsappText(code, record.tour))}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm rounded-lg bg-[#25D366] text-white px-3 py-1.5">
                        <MessageCircle className="w-4 h-4" aria-hidden /> WhatsApp
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="bg-white rounded-2xl shadow p-6" aria-labelledby="list-title">
              <div className="flex items-center justify-between">
                <h2 id="list-title" className="text-lg font-semibold">Códigos ({codes?.length ?? 0})</h2>
                <button type="button" onClick={() => void refresh()} disabled={busy} className="inline-flex items-center gap-1.5 text-sm rounded-lg border border-slate-300 px-3 py-1.5">
                  <RefreshCw className="w-4 h-4" aria-hidden /> Actualizar
                </button>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-navy/60">
                    <tr>
                      <th className="py-2 pr-3">Código</th>
                      <th className="py-2 pr-3">Recorrido</th>
                      <th className="py-2 pr-3">Nota</th>
                      <th className="py-2 pr-3">Estado</th>
                      <th className="py-2 pr-3">Activar antes de</th>
                      <th className="py-2 pr-3">Vence la sesión</th>
                      <th className="py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codes?.map((c) => (
                      <tr key={c.id} className="border-t border-slate-100" data-testid="code-row">
                        <td className="py-2 pr-3 font-mono">…{c.hint}</td>
                        <td className="py-2 pr-3">{tourName(c.tour)}</td>
                        <td className="py-2 pr-3">{c.note || "—"}</td>
                        <td className="py-2 pr-3" data-testid="code-status">{statusOf(c)}</td>
                        <td className="py-2 pr-3">{fmt(c.redeemBy)}</td>
                        <td className="py-2 pr-3">{fmt(c.sessionEndsAt)}</td>
                        <td className="py-2 whitespace-nowrap">
                          {c.status === "active" && c.devicesUsed > 0 && (
                            <button type="button" onClick={() => act("release", c)} className="inline-flex items-center gap-1 text-xs rounded-lg border border-slate-300 px-2 py-1 mr-2" title="Liberar teléfono">
                              <Smartphone className="w-3.5 h-3.5" aria-hidden /> Liberar
                            </button>
                          )}
                          {c.status === "active" && (
                            <button type="button" onClick={() => act("revoke", c)} className="inline-flex items-center gap-1 text-xs rounded-lg border border-red-200 text-red-700 px-2 py-1">
                              <ShieldOff className="w-3.5 h-3.5" aria-hidden /> Desactivar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

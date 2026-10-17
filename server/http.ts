import { safeEqual } from "./crypto.js"
import type { ServerConfig } from "./env.js"
import { narrationsForTour } from "./narrations.js"
import { checkSession, createCodes, listCodes, redeem, releaseDevices, revokeCode, verifySessionToken, type Result } from "./service.js"
import { isTourId } from "./tours.js"

const MAX_BODY = 4096

const baseHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex",
}

export function json(status: number, body: unknown, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...baseHeaders, ...extra } })
}

type Fail = Extract<Result<unknown>, { ok: false }>
// Sin depender del estrechamiento de tipos: Vercel compila api/ con su propia configuración (no estricta).
const fromResult = <T>(r: Result<T>) =>
  r.ok === true ? json(200, (r as { value: T }).value) : json((r as Fail).status, { error: (r as Fail).error })

async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  const len = Number(req.headers.get("content-length") ?? "0")
  if (len > MAX_BODY) return null
  const text = await req.text()
  if (text.length > MAX_BODY) return null
  try {
    const v = JSON.parse(text || "{}")
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null
  } catch {
    return null
  }
}

function bearer(req: Request): string {
  const h = req.headers.get("authorization") ?? ""
  return h.startsWith("Bearer ") ? h.slice(7).trim() : ""
}

/** Las llamadas deben venir del propio sitio (defensa extra contra CSRF en navegadores). */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin")
  if (!origin) return true // fetch del mismo origen sin Origin, curl, pruebas
  try {
    return new URL(origin).host === new URL(req.url).host
  } catch {
    return false
  }
}

/**
 * Ruteo de la API: /api/tour/{redeem|session|narration} y /api/admin/codes.
 * `route` llega sin el prefijo /api/.
 */
export async function handleApi(req: Request, route: string, cfg: ServerConfig): Promise<Response> {
  try {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { Allow: "GET, POST" } })
    if (!sameOrigin(req)) return json(403, { error: "forbidden_origin" })
    if (route === "tour/health") return json(200, { ok: !cfg.problem, problem: cfg.problem, admin: !!cfg.adminToken })
    if (!cfg.ctx) return json(503, { error: "not_configured" })
    const ctx = cfg.ctx

    if (route === "tour/redeem") {
      if (req.method !== "POST") return json(405, { error: "method_not_allowed" })
      const body = await readJson(req)
      if (!body) return json(400, { error: "bad_request" })
      return fromResult(await redeem(ctx, body.code, body.deviceId))
    }

    if (route === "tour/session") {
      if (req.method !== "POST") return json(405, { error: "method_not_allowed" })
      const body = await readJson(req)
      if (!body) return json(400, { error: "bad_request" })
      return fromResult(await checkSession(ctx, body.token, body.deviceId))
    }

    if (route === "tour/narration") {
      if (req.method !== "POST") return json(405, { error: "method_not_allowed" })
      const body = await readJson(req)
      if (!body) return json(400, { error: "bad_request" })
      const p = verifySessionToken(ctx, body.token, body.deviceId)
      if (!p || !isTourId(p.t)) return json(401, { error: "invalid_session" })
      return json(200, { tour: p.t, expiresAt: p.exp, stops: narrationsForTour(p.t) })
    }

    if (route === "admin/codes") {
      if (!cfg.adminToken) return json(503, { error: "admin_not_configured" })
      if (!safeEqual(bearer(req), cfg.adminToken)) return json(401, { error: "unauthorized" })
      if (req.method === "GET") return fromResult(await listCodes(ctx))
      if (req.method !== "POST") return json(405, { error: "method_not_allowed" })
      const body = await readJson(req)
      if (!body) return json(400, { error: "bad_request" })
      switch (body.action) {
        case "create":
          return fromResult(await createCodes(ctx, body))
        case "revoke":
          return fromResult(await revokeCode(ctx, body.id))
        case "release":
          return fromResult(await releaseDevices(ctx, body.id))
        default:
          return json(400, { error: "unknown_action" })
      }
    }
    return json(404, { error: "not_found" })
  } catch (e) {
    // Sin detalles al cliente; el error queda en los registros de la función.
    console.error("api_error", route, e instanceof Error ? e.message : e)
    return json(500, { error: "server_error" })
  }
}

/** Extrae la ruta: /api/tour/redeem → "tour/redeem" (o ?route= si viene de un rewrite). */
export function routeOf(req: Request): string {
  const u = new URL(req.url)
  const r = u.searchParams.get("route") ?? u.pathname.replace(/^\/api\/?/, "")
  return r.replace(/^\/+|\/+$/g, "")
}

/**
 * Función única de Vercel para la API del modo en ruta (ver docs/MODO-EN-RUTA.md).
 * vercel.json reescribe /api/:path* → /api?route=:path*.
 */
import { loadConfig } from "../server/env.js"
import { handleApi, routeOf } from "../server/http.js"

export default {
  async fetch(request: Request): Promise<Response> {
    return handleApi(request, routeOf(request), loadConfig())
  },
}

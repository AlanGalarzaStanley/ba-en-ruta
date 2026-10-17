/**
 * Monta la API (/api/*) dentro de `vite dev` y `vite preview` con almacenamiento en memoria,
 * para desarrollar y correr las pruebas E2E sin Vercel ni credenciales.
 * Nunca se usa en Vercel: allí responde api/index.ts.
 */
import type { IncomingMessage, ServerResponse } from "node:http"
import type { Plugin } from "vite"
import { loadConfig } from "./env.js"
import { handleApi } from "./http.js"

const LOCAL_ENV = {
  TOUR_STORE: "memory",
  // Valores solo para uso local y pruebas; en Vercel se configuran como variables secretas.
  TOUR_AUTH_SECRET: process.env.TOUR_AUTH_SECRET ?? "local-only-secret-do-not-use-in-production-000",
  TOUR_ADMIN_TOKEN: process.env.TOUR_ADMIN_TOKEN ?? "local-admin-token-0000000000",
}

async function toRequest(req: IncomingMessage): Promise<Request> {
  const chunks: Buffer[] = []
  for await (const c of req) chunks.push(c as Buffer)
  const headers = new Headers()
  for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v)
  const url = `http://${req.headers.host ?? "localhost"}${req.url ?? "/"}`
  const hasBody = req.method !== "GET" && req.method !== "HEAD"
  return new Request(url, { method: req.method, headers, body: hasBody ? Buffer.concat(chunks) : undefined })
}

function middleware() {
  const cfg = loadConfig({ ...LOCAL_ENV })
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const path = (req.url ?? "").split("?")[0]
    if (!path.startsWith("/api/")) return next()
    const request = await toRequest(req)
    const response = await handleApi(request, path.replace(/^\/api\//, ""), cfg)
    res.statusCode = response.status
    response.headers.forEach((v, k) => res.setHeader(k, v))
    res.end(Buffer.from(await response.arrayBuffer()))
  }
}

export function localApi(): Plugin {
  return {
    name: "ba-local-api",
    configureServer(server) {
      server.middlewares.use(middleware())
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware())
    },
  }
}

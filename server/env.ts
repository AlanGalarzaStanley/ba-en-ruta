import { getOrCreateSecret } from "./bootstrap.js"
import { BlobStore, MemoryStore, type DocStore } from "./store.js"
import type { Ctx } from "./service.js"

export interface ServerConfig {
  store: DocStore | null
  /** TOUR_AUTH_SECRET si está cargada; si no, se genera y guarda en el almacenamiento. */
  envSecret: string | null
  /** TOUR_ADMIN_TOKEN si está cargada; si no, se usa la contraseña creada en /admin. */
  adminToken: string | null
  vercelEnv: string | undefined
  prefix: string
  /** Motivo por el que el servicio no está disponible (sin revelar valores). */
  problem: string | null
  getCtx(): Promise<Ctx>
}

let memory: MemoryStore | null = null

/**
 * Lee la configuración del entorno. Falla cerrado: sin almacenamiento la API responde 503.
 * En Vercel nunca usa la memoria.
 */
export function loadConfig(env: Record<string, string | undefined> = process.env): ServerConfig {
  const envSecret = (env.TOUR_AUTH_SECRET ?? "").length >= 32 ? env.TOUR_AUTH_SECRET! : null
  const adminToken = (env.TOUR_ADMIN_TOKEN ?? "").length >= 24 ? env.TOUR_ADMIN_TOKEN! : null
  let store: DocStore | null = null
  if (env.TOUR_STORE === "memory" && !env.VERCEL) {
    store = memory ??= new MemoryStore()
  } else if (env.BLOB_STORE_ID || env.BLOB_READ_WRITE_TOKEN) {
    store = new BlobStore()
  }
  const prefix = `tour/${env.VERCEL_ENV ?? (env.TOUR_STORE === "memory" ? "local" : "development")}`
  return {
    store,
    envSecret,
    adminToken,
    vercelEnv: env.VERCEL_ENV,
    prefix,
    problem: store ? null : "store_missing",
    async getCtx() {
      if (!store) throw new Error("store_missing")
      const secret = envSecret ?? (await getOrCreateSecret(store))
      return { store, secret, prefix, now: () => Date.now() }
    },
  }
}

/** Solo para pruebas: reinicia el almacenamiento en memoria. */
export function resetMemoryStore() {
  memory = null
}

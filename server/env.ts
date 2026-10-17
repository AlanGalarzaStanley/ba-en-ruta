import { BlobStore, MemoryStore, type DocStore } from "./store.js"
import type { Ctx } from "./service.js"

export interface ServerConfig {
  ctx: Ctx | null
  adminToken: string | null
  /** Motivo por el que el servicio no está disponible (sin revelar valores). */
  problem: string | null
}

let memory: MemoryStore | null = null

/**
 * Lee la configuración del entorno. Falla cerrado: si falta un secreto o el almacenamiento,
 * la API responde 503 en lugar de funcionar sin protección.
 */
export function loadConfig(env: Record<string, string | undefined> = process.env): ServerConfig {
  const secret = env.TOUR_AUTH_SECRET ?? ""
  const admin = env.TOUR_ADMIN_TOKEN ?? ""
  let store: DocStore | null = null
  if (env.TOUR_STORE === "memory" && !env.VERCEL) {
    store = memory ??= new MemoryStore()
  } else if (env.BLOB_STORE_ID || env.BLOB_READ_WRITE_TOKEN) {
    store = new BlobStore()
  }
  const problem =
    secret.length < 32 ? "auth_secret_missing" : !store ? "store_missing" : null
  const prefix = `tour/${env.VERCEL_ENV ?? (env.TOUR_STORE === "memory" ? "local" : "development")}`
  return {
    ctx: problem ? null : { store: store!, secret, prefix, now: () => Date.now() },
    adminToken: admin.length >= 24 ? admin : null,
    problem,
  }
}

/** Solo para pruebas: reinicia el almacenamiento en memoria. */
export function resetMemoryStore() {
  memory = null
}

/**
 * Configuración automática, para no depender de variables cargadas a mano en Vercel:
 * - Clave interna (firma de códigos y sesiones): si no existe TOUR_AUTH_SECRET, se genera una
 *   vez al azar y se guarda en el almacenamiento privado (solo la lee el servidor).
 * - Contraseña del panel: si no existe TOUR_ADMIN_TOKEN, el dueño la elige la primera vez que
 *   entra a /admin desde una vista previa (las vistas previas de Vercel exigen su inicio de sesión).
 *   Se guarda solo un hash scrypt. En producción no se puede crear: solo usar.
 */
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"
import { PreconditionFailed, type DocStore } from "./store.js"

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>

export const SECRET_KEY = "tour/_system/secret.json"
export const ADMIN_KEY = "tour/_system/admin.json"

interface SecretDoc {
  v: 1
  secret: string
  createdAt: number
}
interface AdminDoc {
  v: 1
  salt: string
  hash: string
  createdAt: number
}

const cache = new WeakMap<DocStore, string>()

export async function getOrCreateSecret(store: DocStore): Promise<string> {
  const hit = cache.get(store)
  if (hit) return hit
  for (let attempt = 0; attempt < 3; attempt++) {
    const doc = await store.get<SecretDoc>(SECRET_KEY)
    if (doc?.data.secret && doc.data.secret.length >= 32) {
      cache.set(store, doc.data.secret)
      return doc.data.secret
    }
    try {
      const secret = randomBytes(48).toString("base64url")
      await store.put<SecretDoc>(SECRET_KEY, { v: 1, secret, createdAt: Date.now() }, { create: true })
      cache.set(store, secret)
      return secret
    } catch (e) {
      if (e instanceof PreconditionFailed) continue // otra instancia la creó primero: leer la suya
      throw e
    }
  }
  throw new Error("secret_bootstrap_failed")
}

export type AdminState = "env" | "ready" | "setup_required"

export async function adminState(store: DocStore, envToken: string | null): Promise<AdminState> {
  if (envToken) return "env"
  return (await store.get<AdminDoc>(ADMIN_KEY)) ? "ready" : "setup_required"
}

export async function verifyAdminPassword(store: DocStore, envToken: string | null, given: string): Promise<boolean> {
  if (!given || given.length > 200) return false
  if (envToken) {
    const a = Buffer.from(given)
    const b = Buffer.from(envToken)
    return a.length === b.length && timingSafeEqual(a, b)
  }
  const doc = await store.get<AdminDoc>(ADMIN_KEY)
  if (!doc) return false
  const expected = Buffer.from(doc.data.hash, "base64url")
  const got = await scrypt(given, Buffer.from(doc.data.salt, "base64url"), expected.length)
  return timingSafeEqual(expected, got)
}

export const MIN_ADMIN_PASSWORD = 10

/** Crea la contraseña una sola vez. Devuelve el motivo si no se puede. */
export async function setupAdminPassword(
  store: DocStore,
  envToken: string | null,
  vercelEnv: string | undefined,
  password: unknown,
): Promise<"ok" | "not_allowed" | "already_set" | "weak_password"> {
  if (envToken || vercelEnv === "production") return "not_allowed"
  if (typeof password !== "string" || password.length < MIN_ADMIN_PASSWORD || password.length > 200) return "weak_password"
  const salt = randomBytes(16)
  const hash = await scrypt(password, salt, 32)
  try {
    await store.put<AdminDoc>(ADMIN_KEY, { v: 1, salt: salt.toString("base64url"), hash: hash.toString("base64url"), createdAt: Date.now() }, { create: true })
    return "ok"
  } catch (e) {
    if (e instanceof PreconditionFailed) return "already_set"
    throw e
  }
}

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto"

/** Alfabeto Crockford base32: sin I, L, O ni U para evitar confusiones al dictar el código. */
export const CODE_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
export const CODE_LENGTH = 12 // 60 bits de entropía

/** Genera un código como "7KQ2-M9XA-3TRD". 256 es múltiplo de 32: sin sesgo. */
export function generateCode(): string {
  const bytes = randomBytes(CODE_LENGTH)
  let raw = ""
  for (let i = 0; i < CODE_LENGTH; i++) raw += CODE_ALPHABET[bytes[i] % 32]
  return formatCode(raw)
}

export function formatCode(raw: string): string {
  return raw.match(/.{1,4}/g)!.join("-")
}

/** Acepta minúsculas, espacios, guiones y las confusiones típicas (O→0, I/L→1). Devuelve null si no es válido. */
export function normalizeCode(input: unknown): string | null {
  if (typeof input !== "string" || input.length > 40) return null
  const s = input.toUpperCase().replace(/[\s\-_.]/g, "").replace(/O/g, "0").replace(/[IL]/g, "1")
  if (s.length !== CODE_LENGTH) return null
  for (const ch of s) if (!CODE_ALPHABET.includes(ch)) return null
  return s
}

export function hmacHex(secret: string, label: string, value: string): string {
  return createHmac("sha256", secret).update(`${label}\u0000${value}`).digest("hex")
}

/** Identificador del código en el almacenamiento: nunca se guarda el código en claro. */
export function codeId(secret: string, normalized: string): string {
  return hmacHex(secret, "code", normalized).slice(0, 40)
}

export function deviceHash(secret: string, deviceId: string): string {
  return hmacHex(secret, "device", deviceId).slice(0, 32)
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) {
    // Comparación de igual duración para no filtrar la longitud por tiempos.
    timingSafeEqual(ab, ab)
    return false
  }
  return timingSafeEqual(ab, bb)
}

const b64u = (b: Buffer) => b.toString("base64url")

export interface SessionPayload {
  v: 1
  /** id del código (40 hex) */
  c: string
  /** recorrido */
  t: string
  /** hash del dispositivo */
  d: string
  /** emitido (ms) */
  iat: number
  /** vence (ms) */
  exp: number
}

export function signSession(secret: string, p: SessionPayload): string {
  const body = b64u(Buffer.from(JSON.stringify(p)))
  const sig = b64u(createHmac("sha256", secret).update(`session\u0000${body}`).digest())
  return `v1.${body}.${sig}`
}

export function verifySession(secret: string, token: unknown, now: number): SessionPayload | null {
  if (typeof token !== "string" || token.length > 2000) return null
  const parts = token.split(".")
  if (parts.length !== 3 || parts[0] !== "v1") return null
  const expected = b64u(createHmac("sha256", secret).update(`session\u0000${parts[1]}`).digest())
  if (!safeEqual(expected, parts[2])) return null
  try {
    const p = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as SessionPayload
    if (p.v !== 1 || typeof p.exp !== "number" || typeof p.c !== "string" || typeof p.d !== "string") return null
    if (now >= p.exp) return null
    return p
  } catch {
    return null
  }
}

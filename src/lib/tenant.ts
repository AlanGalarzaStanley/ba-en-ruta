/**
 * Multi-tenant foundation: shared SPA + per-driver config.
 * Resolve via path /c/:slug (see resolveTenantFromPath).
 */

export type TenantStatus = "draft" | "active" | "suspended" | "preview"

export interface TenantConfig {
  id: string
  slug: string
  status: TenantStatus
  publicName: string
  commercialName?: string
  whatsappNumber: string
  contactEmail?: string
  languages: ("es" | "en" | "pt")[]
  tagline?: string
  description?: string
  heroImage?: string
  logoUrl?: string
  primaryColor?: string
  accentColor?: string
  features: {
    places: boolean
    map: boolean
    itineraries: boolean
    gastronomy: boolean
    guidedExperiences: boolean
    miQr: boolean
    airport: boolean
    privateTransfers: boolean
    tours: boolean
    driverSignup: boolean
  }
  createdAt?: string
  domain?: string
  subdomain?: string
}

export const DEFAULT_TENANT: TenantConfig = {
  id: "ba-en-ruta",
  slug: "ba-en-ruta",
  status: "active",
  publicName: "BA en Ruta",
  commercialName: "BA en Ruta",
  whatsappNumber: "5491151448632",
  contactEmail: "galarza.alan.g@gmail.com",
  languages: ["es", "en", "pt"],
  tagline: "Buenos Aires se vive con pasión. Yo te llevo.",
  description:
    "Chofer privado y experiencias en Buenos Aires. Traslados, recorridos locales, fútbol, tradición y gastronomía.",
  features: {
    places: true,
    map: true,
    itineraries: true,
    gastronomy: true,
    guidedExperiences: true,
    miQr: true,
    airport: true,
    privateTransfers: true,
    tours: true,
    driverSignup: true,
  },
}

/**
 * Demo tenant — proves config isolation (different name/tagline).
 * Same operator WhatsApp for enquiries until a real second driver is onboarded.
 * Visible only at /c/demo-chofer
 */
export const DEMO_TENANT: TenantConfig = {
  id: "demo-chofer",
  slug: "demo-chofer",
  status: "active",
  publicName: "Demo Chofer BA",
  commercialName: "Demo Chofer",
  whatsappNumber: "5491151448632",
  languages: ["es", "en"],
  tagline: "Ejemplo de página de chofer — plantilla BA en Ruta.",
  description: "Sitio de demostración del replicador. No es un servicio comercial independiente.",
  features: {
    places: true,
    map: true,
    itineraries: true,
    gastronomy: false,
    guidedExperiences: true,
    miQr: true,
    airport: true,
    privateTransfers: true,
    tours: true,
    driverSignup: false,
  },
}

export const TENANTS: Record<string, TenantConfig> = {
  "ba-en-ruta": DEFAULT_TENANT,
  "demo-chofer": DEMO_TENANT,
}

export function getTenant(slug: string): TenantConfig | null {
  const t = TENANTS[slug]
  if (!t) return null
  if (t.status === "suspended" || t.status === "draft") return null
  return t
}

export function listActiveTenants(): TenantConfig[] {
  return Object.values(TENANTS).filter((t) => t.status === "active" || t.status === "preview")
}

/** Path /c/:slug → tenant; otherwise default BA en Ruta. */
export function resolveTenantFromPath(pathname: string): TenantConfig {
  const m = pathname.match(/\/c\/([a-z0-9-]+)/i)
  if (m) {
    const found = getTenant(m[1].toLowerCase())
    if (found) return found
  }
  return DEFAULT_TENANT
}

let activeTenant: TenantConfig = DEFAULT_TENANT

export function setActiveTenant(t: TenantConfig) {
  activeTenant = t
}

export function getActiveTenant(): TenantConfig {
  return activeTenant
}

/** WhatsApp del tenant activo (usado por enlaces wa.me). */
export function getActiveWhatsAppNumber(): string {
  return activeTenant.whatsappNumber || DEFAULT_TENANT.whatsappNumber
}

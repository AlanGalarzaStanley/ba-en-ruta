/**
 * Multi-tenant foundation for BA en Ruta replicator.
 * One shared template + per-driver config. No runtime backend yet:
 * configs can live as static modules or later in a store.
 *
 * Future: /c/:slug or subdomain routing loads config by slug.
 * Admin creates config → publish → site uses same SPA shell.
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
  }
  createdAt?: string
  domain?: string
  subdomain?: string
}

/** Default site: BA en Ruta (Alan). */
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
  },
}

/** Registry of tenants. Extend by adding configs; routing can resolve by slug later. */
export const TENANTS: Record<string, TenantConfig> = {
  "ba-en-ruta": DEFAULT_TENANT,
}

export function getTenant(slug: string): TenantConfig | null {
  return TENANTS[slug] ?? null
}

export function listActiveTenants(): TenantConfig[] {
  return Object.values(TENANTS).filter((t) => t.status === "active")
}

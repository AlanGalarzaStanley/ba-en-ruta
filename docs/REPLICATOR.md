# Replicador BA en Ruta — arquitectura

## Objetivo

Plantilla SPA compartida + configuración por chofer, sin clonar el proyecto por cliente.

## Estado implementado

| Pieza | Estado |
|-------|--------|
| Producto turismo (BA en Ruta) | Activo en `/` |
| `TenantConfig` + registro | `src/lib/tenant.ts` |
| Resolución por ruta | `/c/:slug` → `resolveTenantFromPath` |
| Tenant demo | `/c/demo-chofer` (nombre y features distintas; banner de demo) |
| WhatsApp por tenant | `getActiveWhatsAppNumber()` en `whatsapp.ts` / Mi QR |
| Formulario comercial choferes | `#para-choferes` → WhatsApp |
| Features flags | Ocultan gastronomía / driverSignup / etc. por tenant |
| SPA rewrites Vercel | `vercel.json` |
| Vista previa automática | **Diseño solo** (ver abajo) |

## Cómo dar de alta un chofer (proceso manual actual)

1. Recibir solicitud por el formulario o WhatsApp.
2. Acordar alcance y condiciones (fuera del código).
3. En `src/lib/tenant.ts`, agregar una entrada en `TENANTS`:

```ts
"juan-perez": {
  id: "juan-perez",
  slug: "juan-perez",
  status: "active",
  publicName: "Juan Pérez Transfers",
  whatsappNumber: "54911XXXXXXXX",
  languages: ["es", "en"],
  tagline: "…",
  features: { /* copiar de DEFAULT_TENANT y ajustar */ },
},
```

4. Commit + push a `main` → deploy Vercel.
5. URL del sitio: `https://ba-en-ruta.vercel.app/c/juan-perez`

El sitio principal `/` no se ve afectado. El demo `/c/demo-chofer` prueba el aislamiento de config (nombre, banner, features).

## Publicación

1. **Rutas en el mismo dominio** (actual): `/c/:slug`
2. **Subdominios** (`slug.dominio.com`): requiere DNS wildcard + dominios en Vercel (posterior).
3. **Dominio propio**: CNAME al proyecto; mapear en config (posterior).

## Vista previa automática (futuro — no implementado)

1. Formulario → config `status: "preview"` + slug temporal.
2. Enlace `/c/:previewSlug` con vencimiento.
3. CTA WhatsApp para contratar; admin activa o suspende.
4. Sin pago automático ni servicio permanente al generar la preview.

Dependencias: almacenamiento de configs, tokens, rate-limit, notificación al admin.

## Principios

- Una plantilla; datos y marca por tenant.
- WhatsApp como canal de alta hasta validar el negocio.
- No hardcodear precios comerciales en el frontend.

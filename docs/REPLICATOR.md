# Replicador BA en Ruta — arquitectura

## Objetivo

Una plantilla SPA compartida + configuración por chofer, para publicar sitios independientes sin duplicar el proyecto.

## Estado actual (implementado)

- **Producto A (turismo):** sitio único en `https://ba-en-ruta.vercel.app`.
- **Config base:** `src/lib/tenant.ts` — tipo `TenantConfig`, registro `TENANTS`, tenant por defecto `ba-en-ruta`.
- **Formulario comercial:** sección `#para-choferes` → WhatsApp con mensaje estructurado (sin persistencia en DB).
- **Sin backend multi-tenant aún:** un solo deploy, un solo WhatsApp de operación.

## Modelo de configuración por chofer

Campos previstos en `TenantConfig`:

| Campo | Uso |
|-------|-----|
| `id`, `slug` | Identificador y ruta/subdominio |
| `status` | `draft` \| `active` \| `suspended` \| `preview` |
| `publicName`, `commercialName` | Identidad |
| `whatsappNumber` | Contacto del chofer |
| `languages` | ES / EN / PT |
| `features.*` | Secciones habilitadas |
| `domain` / `subdomain` | Publicación |

Una mejora en la plantilla beneficia a todos los sitios compatibles; el cambio de nombre/WhatsApp de un chofer no afecta a otro.

## Estrategia de publicación (Fase 1 viable)

1. **Rutas en el mismo dominio** (recomendado al inicio): `ba-en-ruta.vercel.app/c/:slug`  
   - Vite SPA + rewrite a `index.html`; el shell lee `slug` y carga `getTenant(slug)`.
2. **Subdominios** (`juan.ba-en-ruta.vercel.app`): requiere configuración en Vercel (wildcard DNS + project domains). Más tarde.
3. **Dominio propio del chofer:** CNAME al deploy; mapping en config. Coste y setup por cliente.

No comprar dominios ni contratar servicios sin autorización.

## Flujo comercial actual

1. Chofer ve «Para choferes».
2. Completa formulario breve.
3. Se abre WhatsApp con el mensaje (el interesado debe enviar).
4. Operador acuerda precio/alcance de forma manual.
5. Operador agrega un `TenantConfig` (hoy: editar `tenant.ts` o futuro panel) y publica.

Precios y planes **no** se hardcodean en el frontend comercial como oferta fija.

## Generación automática de vista previa (futuro — diseño, no implementado)

Flujo deseado:

1. Formulario → genera config `status: "preview"` con slug temporal.
2. Enlace único `/c/:previewSlug` (o token firmado con vencimiento).
3. Visitante ve plantilla con sus datos; CTA WhatsApp para contratar.
4. Admin recibe aviso (WhatsApp/email) y puede activar, suspender o borrar.
5. Previews caducan (p. ej. 7–14 días); no implican pago ni servicio permanente.

Requisitos de seguridad: rate-limit del formulario, tokens no adivinables, sin exposición de datos de otros tenants, separación preview vs active.

**Dependencias para implementarlo:** almacenamiento de configs (archivo versionado, KV o DB), routing por slug, política de caducidad, notificación al admin. Reutilizar `TenantConfig` y el shell actual; no clonar repos por chofer.

## Administración mínima (siguiente paso técnico)

- Herramienta interna o script: `createTenant(config)` → escribe registro + commit/deploy.
- Panel privado solo con autenticación (no ocultar botones en el frontend como “seguridad”).
- Export/backup de la config de cada sitio.

## Principios

- No sobreingenierizar: configs + rutas antes que microservicios.
- Plantilla única; datos y marca por tenant.
- WhatsApp como canal de alta hasta validar el modelo de negocio.

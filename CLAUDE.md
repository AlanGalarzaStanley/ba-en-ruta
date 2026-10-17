# BA en Ruta — guía técnica para agentes y colaboradores

Sitio de chofer privado y experiencias turísticas en Buenos Aires.
Producción: https://ba-en-ruta.vercel.app · Repo: AlanGalarzaStanley/ba-en-ruta (público).

## Stack y despliegue
- Vite 7 + React 19 + TypeScript 5.8 (strict) + Tailwind v4 + Leaflet (OSM) + lucide-react.
- Vercel (plan Free) despliega `main` a producción y cada rama a una preview. Sin backend, sin base de datos.
- `vercel.json`: cabeceras de seguridad (CSP, HSTS, nosniff, Referrer/Permissions-Policy), caché inmutable en `/assets/`, rewrite SPA.
  `vite preview` replica las mismas cabeceras (ver `vite.config.ts`), así las pruebas detectan recursos bloqueados por la CSP.
- Si agregás un origen externo nuevo (imágenes, iframes, fetch), sumalo a la CSP de `vercel.json` o se bloqueará en producción.
- GitHub Actions (`.github/workflows/ci.yml`): `npm ci`, audit, typecheck, unit tests, build y E2E. Gratis por ser repo público.

## Comandos
- `npm run dev` · `npm run build` (incluye `tsc -b`; un error de tipos frena el deploy) · `npm run preview`
- `npm test` (Vitest, `tests/unit`) · `npm run test:e2e` (Playwright, `tests/e2e`, desktop + Pixel 7)
- `E2E_BASE_URL=https://ba-en-ruta.vercel.app npx playwright test` corre las E2E contra producción.
- `npm run sync:commons` regenera `src/lib/commons-meta.json` cuando agregás una foto de Wikimedia Commons (una prueba unitaria falla si falta).

## Módulos
- `src/App.tsx`: orden de secciones, estado del recorrido armado, carga diferida del simulador (`React.lazy`).
- `src/lib/ba-config.ts`: lugares (8 imperdibles), itinerarios (historica, clasica, gastronomica, futbolera, tigre-delta), restaurantes, enlaces oficiales/entradas, videos ES/EN/PT.
- `src/lib/gastronomy.ts`: catálogo gastronómico con enlaces verificados, Instagram, notas de estado.
- `src/lib/media.ts`: fotos de Commons con crédito/licencia obligatorios. `src/lib/img.ts`: convierte a miniaturas directas de tamaño estándar + `srcset` (evita 2 redirecciones y descargas de 1920 px en celulares).
- `src/lib/route.ts`: motor del simulador (paradas, km y minutos orientativos, horarios, video por idioma).
- `src/lib/ba-copy.ts` + `copy-*.ts`, `guides-copy.ts`, `experience-copy.ts`, `mood-copy.ts`, `immersive-copy.ts`: textos ES/EN/PT-BR. Las tres tablas deben tener las mismas claves (lo verifica una prueba).
- `src/lib/whatsapp.ts` / `tenant.ts`: mensajes y número de WhatsApp (5491151448632).
- `src/components/RoutePlayer.tsx`: simulador "Sentí el recorrido antes de contratarlo". `VideoEmbed.tsx`: YouTube nocookie liviano.
- `ExperiencePlayer.tsx` no está montado en la app (código previo conservado).

## URLs compartibles
- `?lang=es|en|pt` fija el idioma (tiene prioridad sobre la preferencia guardada). hreflang + sitemap apuntan a estas URLs.
- `?recorrido=<id>` abre el simulador; `&parada=N` abre en el paso N (0 = punto de encuentro). La URL se actualiza al avanzar y el botón Compartir la copia o usa el menú nativo del teléfono.

## Reglas de contenido
- No inventar enlaces, cuentas de Instagram, horarios, precios ni datos históricos. Si algo no se puede confirmar, marcarlo como pendiente.
- No usar fotos de Instagram ni de terceros sin permiso. Commons/Pexels solo con crédito visible.
- Auditoría de imágenes e Instagram: `docs/auditoria-2026-10-17/`.

## Respaldo
- Tag `respaldo-pre-inmersiva-2026-10-17` (ec2bae9): estado previo a la experiencia inmersiva.
- Para revertir un cambio puntual: `git revert <sha>` y push a `main`.

## Estado y pendientes
Ver `docs/ESTADO.md` (último commit verificado, pruebas ejecutadas y limitaciones).

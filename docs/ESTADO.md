# Estado verificado de BA en Ruta

Última actualización: 2026-10-17.

## Producción
- URL: https://ba-en-ruta.vercel.app (Vercel Free, despliegue automático desde `main`).
- Commit de la aplicación verificado en producción: `0a3016558b69ba06b4a0f35490cdeb6db6695c57`.
  Los commits posteriores en `main` que solo tocan `docs/` no cambian la aplicación.
- Verificación: cabeceras de seguridad presentes (CSP, HSTS, nosniff, Referrer/Permissions-Policy, X-Frame-Options), `og-image.jpg` responde 200
  y `E2E_BASE_URL=https://ba-en-ruta.vercel.app npx playwright test` dio 30/30 en Chromium escritorio y Pixel 7 emulado.

## Lighthouse (producción, perfil móvil con 4G lenta simulada)
| Métrica | Antes (4a7cd40) | Ahora (0a30165) |
|---|---|---|
| Rendimiento | 83 | 88 |
| Accesibilidad | — | 100 |
| Buenas prácticas | 79 | 79 (solo cookie WMF-Uniq de Wikimedia en fotos debajo del pliegue) |
| SEO | 100 | 100 |
| First Contentful Paint | 3,0 s | 1,6 s |
| Largest Contentful Paint | 3,8 s | 2,5 s |
| CLS | 0 | 0 |
Una sola corrida por versión: los valores varían unos puntos entre ejecuciones.

## Pruebas
| Capa | Herramienta | Cobertura | Resultado |
|---|---|---|---|
| Tipos | `tsc -b` (strict) | todo `src/` + configs | 0 errores (antes 10) |
| Unitarias | Vitest, `tests/unit` | motor de rutas, imágenes, paridad ES/EN/PT, ids y enlaces, créditos, mapa de Commons, fotos locales, WhatsApp | 22/22 |
| Enlaces | `npm run test:links` (semanal en CI) | sitios oficiales, entradas y restaurantes | 26/27 desde este entorno; La Biela falla solo aquí por TLS, verificada por otra vía |
| E2E | Playwright, `tests/e2e` | portada, idiomas por URL, `?recorrido`, `?parada`, avance/pausa, movimiento reducido, WhatsApp, foco, videos, buscador gastronómico, `rel=noopener`, desbordes, axe WCAG A/AA, violaciones de CSP | 30/30 local, CI y producción |
| CI | GitHub Actions `ci.yml` | `npm ci`, audit, typecheck, unit, build, E2E | verde en PR #1 |
| Dependencias | `npm audit` | todas | 0 vulnerabilidades |
| Fotos | curl a upload.wikimedia.org | 80 archivos distintos, 1 tamaño c/u | 80/80 OK (Wikimedia limita con 429 si se piden todas las variantes juntas) |

No se probó en dispositivos físicos ni en Safari/iOS ni en Firefox: solo en Chromium (escritorio y Android emulado).

## Decisiones técnicas
- Fotos de Commons: se guardan como `Special:FilePath` en los datos y se convierten en tiempo de ejecución a miniaturas directas
  de tamaño estándar (250/330/500/960/1280/1920) con `srcset`. Wikimedia rechaza tamaños no estándar (por ejemplo, 1600 px da 400 en acceso directo).
- Mapa oscuro: teselas de OpenStreetMap con filtro CSS (CARTO exige clave de API).
- Simulador: avance con temporizador JS (no con `animationend`). Con `prefers-reduced-motion` arranca en pausa.
- Sin analítica, sin cookies propias, sin backend. Los únicos datos personales viajan cuando la persona abre WhatsApp.

## Limitaciones conocidas
- Las fotos de Commons debajo del pliegue siguen cargando desde upload.wikimedia.org (cookie WMF-Uniq).
- SPA sin prerender: los buscadores que no ejecutan JavaScript solo ven los metadatos de `index.html` (en español).
- Fotos de Lo de Jesús, El Sanjuanino, Mercat y Fogón: no hay imágenes libres. Hace falta permiso de cada local.
- Los Laureles (estado contradictorio en medios) y Esquina Homero Manzi (riesgo de cierre): requieren confirmación periódica.
- Las descripciones gastronómicas largas solo están en español.
- Hay claves `exp*` vacías en `copy-es.ts` que no usa ningún componente (no se ven en pantalla).
- El código QR depende de api.qrserver.com (servicio externo gratuito).
- No se pudo abrir la URL de vista previa de Vercel desde el entorno de trabajo: la validación previa se hizo con CI y E2E locales.

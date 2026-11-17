# Estado verificado de BA en Ruta

Última actualización: 2026-11-17.

## Producción
- URL: https://ba-en-ruta.vercel.app (Vercel Free, despliegue automático desde `main`).
- Último deployment de producción confirmado por el check de Vercel: commit `582b56bef167660edbc27df91dd9f7abc6d1efc4` (PR #9); estado `Deployment has completed` el 2026-11-17 a las 17:55 UTC. La URL pública respondió HTTP 200.
- El producto vigente es una página corta orientada a consulta por WhatsApp: hero, manifiesto, cinco recorridos, quién conduce, FAQ y cierre; no muestra la grilla del catálogo de paquetes.
- La PR #9 quedó integrada en `main` el 2026-11-17 a las 17:54:52 UTC. Actualiza las cinco experiencias y el orden del simulador sin horarios fijos ni garantías de reserva, y mantiene como opcionales las inclusiones no confirmadas.
- El CI de `main` sobre `582b56b` pasó typecheck, 25 unitarias, build y E2E 30/30 en la ejecución `44142165161`; la prueba E2E cubre Chromium de escritorio y Android emulado.
- La solución mantiene el job E2E en `ubuntu-24.04` por incompatibilidad de Playwright 1.59.1 con el runner anterior Ubuntu 26.04.
- Verificaciones previas de cabeceras de seguridad (CSP, HSTS, nosniff, Referrer/Permissions-Policy, X-Frame-Options) y `og-image.jpg` respondieron correctamente; repetir si se modifican las reglas o los metadatos.

Los resultados Lighthouse y las auditorías de abajo son mediciones históricas de 2026-11-14, no una nueva medición de esta actualización.

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
| Unitarias | Vitest, `tests/unit` | motor de rutas, orden aprobado, imágenes, paridad ES/EN/PT, ids y enlaces, créditos, mapa de Commons, fotos locales, WhatsApp | 25/25 |
| Enlaces | `npm run test:links` (semanal en CI) | sitios oficiales, entradas y restaurantes | 26/27 desde este entorno; La Biela falla solo aquí por TLS, verificada por otra vía |
| E2E | Playwright, `tests/e2e` | portada, idiomas por URL, `?recorrido`, `?parada`, cinco recorridos, avance/pausa, movimiento reducido, WhatsApp, foco, anchors de la página corta, desbordes, axe WCAG A/AA | 30/30 escritorio y Android emulado en local y CI |
| CI | GitHub Actions `ci.yml` | `npm ci`, audit, typecheck, unit, build, E2E | verde en `main`, run `44142165161`, SHA `582b56b` |
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
- SPA sin prerender: los buscadores que no ejecutan JavaScript solo ven los metadatos de `index.html` (en español); se mantiene como deuda SEO hasta decidir páginas indexables separadas.
- Fotos de Lo de Jesús, El Sanjuanino, Mercat y Fogón: no hay imágenes libres. Hace falta permiso de cada local.
- Los Laureles (estado contradictorio en medios) y Esquina Homero Manzi (riesgo de cierre): requieren confirmación periódica.
- Las descripciones gastronómicas largas solo están en español.
- Hay claves `exp*` vacías en `copy-es.ts` que no usa ningún componente (no se ven en pantalla).
- El código QR depende de api.qrserver.com (servicio externo gratuito).
- No se pudo abrir la URL de vista previa de Vercel desde el entorno de trabajo: la validación previa se hizo con CI y E2E locales.

# Estado verificado de BA en Ruta

Última actualización: 2026-11-18.

## Producción

- URL: https://ba-en-ruta.vercel.app (Vercel Free, despliegue automático desde `main`).
- Último cambio de código de la aplicación en producción: PR #14, merge commit `63b4790bc6dafcfac12a5fabe038b016be95957a`, integrado el 2026-11-18 a las 17:45:27 UTC. Completa Sabores Porteños como arco de Villa Crespo, con una comida principal elegible y una pausa opcional; no añade reservas, consumos incluidos ni condiciones comerciales nuevas.
- Vercel Production confirmó `Deployment has completed` para GitHub deployment `7891390898` a las 17:45:48 UTC. `https://ba-en-ruta.vercel.app` respondió HTTP 200.
- Prueba de humo E2E sobre el dominio público: 6/6 en Chromium escritorio y Android emulado; verifica selección de comida, pausa, enlace compartible y textos de ES/EN/PT.
- El producto conserva una home corta orientada a consulta por WhatsApp: hero, manifiesto, cinco recorridos, quién conduce, FAQ y cierre; no muestra la grilla del catálogo de paquetes. El simulador apoya la imaginación del recorrido, no confirma reserva ni reemplaza al chofer.
- La PR #9 (2026-11-17) diferenció las cinco experiencias y ordenó el simulador; la PR #12 suma una exploración narrativa a ritmo de la persona. Se mantienen los precios públicos existentes sin cambios, sin validación nueva de su vigencia o aplicación a cada secuencia.
- Vercel Preview y CI de PR #14 terminaron correctamente: checks `CI/check`, `CI/e2e` y Preview en verde; el E2E completo pasó 42/42 en escritorio y Android emulado. El CI de `main` para `63b4790` también terminó en verde (workflow `44362193726`); [ver workflow](https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/44362193726). El smoke test de producción pasó 6/6.
- El job E2E permanece fijado a `ubuntu-24.04` por compatibilidad de Playwright/Chromium. GitHub emitió anotaciones no bloqueantes sobre las acciones `actions/checkout@v4` y `actions/setup-node@v4` (runtime Node 20 forzado a Node 24) y la migración de `ubuntu-latest` a Ubuntu 26; ambos jobs pasaron. Revisar esas advertencias en una tarea separada de mantenimiento de CI.
- Verificaciones previas de cabeceras de seguridad (CSP, HSTS, nosniff, Referrer/Permissions-Policy, X-Frame-Options) y `og-image.jpg` respondieron correctamente; repetir si se modifican las reglas o los metadatos.

Los resultados Lighthouse y las auditorías históricas siguientes corresponden a 2026-11-14; no se repitieron para la PR #12.

## Lighthouse (producción, perfil móvil con 4G lenta simulada)

| Métrica | Antes (4a7cd40) | Medición histórica (0a30165) |
|---|---:|---:|
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
| Tipos | `tsc -b` (strict) | todo `src/` + configs | 0 errores |
| Unitarias | Vitest, `tests/unit` | motor de rutas, selección gastronómica, orden aprobado, imágenes, paridad ES/EN/PT, ids y enlaces, créditos, mapa de Commons, fotos locales, WhatsApp | 26/26 |
| Enlaces | `npm run test:links` (semanal en CI) | sitios oficiales, entradas y restaurantes | 33/33 en la última ejecución local; incluye los enlaces oficiales agregados para Villa Crespo. |
| E2E | Playwright, `tests/e2e` | portada, idiomas, enlaces `?recorrido`/`?parada`/`mesa`/`pausa`, cinco recorridos, selección gastronómica, avance/pausa manual, movimiento reducido, hilo narrativo, mapa ilustrativo, WhatsApp, foco, teclado, viewport de 320px, desbordes y axe WCAG A/AA | 42/42 en Chromium escritorio y Android emulado, local y en CI de PR #14; 6/6 en el smoke E2E de producción |
| CI | GitHub Actions `ci.yml` | `npm ci`, audit de producción, typecheck, unit, build, E2E | CI de PR #14 y `main` en verde; workflow de `main` `44362193726`, con E2E 42/42 sobre SHA `63b4790` |
| Dependencias | `npm audit` | todas (auditoría anterior) | 0 vulnerabilidades reportadas en la última auditoría completa |
| Fotos | curl a upload.wikimedia.org | 80 archivos distintos, 1 tamaño c/u | 80/80 OK (Wikimedia limita con 429 si se piden todas las variantes juntas) |

No se probó en dispositivos físicos ni en Safari/iOS ni en Firefox: solo en Chromium (escritorio y Android emulado).

## Decisiones técnicas

- Fotos de Commons: se guardan como `Special:FilePath` en los datos y se convierten en tiempo de ejecución a miniaturas directas de tamaño estándar (250/330/500/960/1280/1920) con `srcset`. Wikimedia rechaza tamaños no estándar (por ejemplo, 1600 px da 400 en acceso directo).
- Mapa oscuro: teselas de OpenStreetMap con filtro CSS (CARTO exige clave de API). La línea del simulador une paradas como secuencia ilustrativa; no representa navegación vial en vivo, y tiempos/distancias son estimaciones.
- El simulador arranca pausado en todos los recorridos; solo reproduce o avanza cuando la persona lo solicita. `prefers-reduced-motion` sigue respetado.
- Sin analítica, sin cookies propias, sin backend. Los únicos datos personales viajan cuando la persona abre WhatsApp.

## Limitaciones conocidas

- La investigación internacional de inmersión está en `docs/INVESTIGACION-REFERENTES-INMERSIVOS-TURISMO-2026-11-18.md` como inspiración no normativa. Esta entrega reutiliza texto, fotografías y medios presentes en el repositorio; no incorpora 3D, 360°, audio publicado, GPS ni seguimiento.
- Las fotos de Commons debajo del pliegue siguen cargando desde upload.wikimedia.org (cookie WMF-Uniq).
- SPA sin prerender: los buscadores que no ejecutan JavaScript solo ven los metadatos de `index.html` (en español); se mantiene como deuda SEO hasta decidir páginas indexables separadas.
- Fotos de Lo de Jesús, El Sanjuanino, Mercat y Fogón: no hay imágenes libres. Hace falta permiso de cada local.
- Los Laureles (estado contradictorio en medios) y Esquina Homero Manzi (riesgo de cierre): requieren confirmación periódica.
- Las descripciones gastronómicas largas solo están en español.
- Hay claves `exp*` vacías en `copy-es.ts` que no usa ningún componente (no se ven en pantalla).
- El código QR depende de api.qrserver.com (servicio externo gratuito).

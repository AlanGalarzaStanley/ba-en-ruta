# Estado verificado de BA en Ruta

Última actualización: 2026-11-18.

## Producción

- URL: https://ba-en-ruta.vercel.app (Vercel Free, despliegue automático desde `main`).
- Último cambio de código de la aplicación en producción: PR #12, merge commit `0e38a194ef049c9c2d4639ac3e4479af5cf1cfb5`, integrado el 2026-11-18 a las 16:07:51 UTC. Actualiza el simulador para presentar el hilo narrativo y el plan orientativo de cada recorrido, lista numerada de paradas con salto directo, contenido completo y reproducción manual. No añade activos, dependencias, tarifas, reservas, audio, GPS ni promesas operativas.
- Vercel marcó el deployment asociado al commit como `Deployment has completed`: [ver deployment](https://vercel.com/galarzaalang-3494/ba-en-ruta/gVW61FbEsjqyP5LX9kQ7DDp1f5qp). La URL pública respondió HTTP 200 y el bundle servido contiene las etiquetas nuevas en español, inglés y portugués de Brasil.
- El deployment más reciente de `main` es `ac703d7fe6381059370754e91372d3b21461f1f3` (`docs: update relay handoff - PR form for packages catalog ready`), que solo modifica `docs/RELAY.md`; GitHub deployment `7890015731` finalizó en `success` el 2026-11-18 a las 16:51:54 UTC. `https://ba-en-ruta.vercel.app` respondió HTTP 200; el último cambio de código de aplicación sigue siendo PR #12.
- El producto conserva una home corta orientada a consulta por WhatsApp: hero, manifiesto, cinco recorridos, quién conduce, FAQ y cierre; no muestra la grilla del catálogo de paquetes. El simulador apoya la imaginación del recorrido, no confirma reserva ni reemplaza al chofer.
- La PR #9 (2026-11-17) diferenció las cinco experiencias y ordenó el simulador; la PR #12 suma una exploración narrativa a ritmo de la persona. Se mantienen los precios públicos existentes sin cambios, sin validación nueva de su vigencia o aplicación a cada secuencia.
- Vercel Preview de la PR #12 terminó correctamente. CI de la rama (`44342325664`) y CI de `main` (`44343608234`) terminaron en verde. La ejecución de `main` comprobó `npm ci`, audit de producción, typecheck, unitarias, build y E2E 36/36; [workflow de main](https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/44343608234).
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
| Unitarias | Vitest, `tests/unit` | motor de rutas, orden aprobado, imágenes, paridad ES/EN/PT, ids y enlaces, créditos, mapa de Commons, fotos locales, WhatsApp | 25/25 |
| Enlaces | `npm run test:links` (semanal en CI) | sitios oficiales, entradas y restaurantes | 26/27 desde este entorno; La Biela falla solo aquí por TLS, verificada por otra vía. No se cambiaron URLs en PR #12. |
| E2E | Playwright, `tests/e2e` | portada, idiomas, enlaces `?recorrido`/`?parada`, cinco recorridos, avance/pausa manual, movimiento reducido, hilo narrativo, plan orientativo, salto a paradas, mapa ilustrativo, WhatsApp, foco, teclado, viewport de 320px, desbordes y axe WCAG A/AA | 36/36 en Chromium escritorio y Android emulado, local y en CI (`44343608234`) |
| CI | GitHub Actions `ci.yml` | `npm ci`, audit de producción, typecheck, unit, build, E2E | Verde en PR #12 y en `main`; workflow de `main` `44343608234` |
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

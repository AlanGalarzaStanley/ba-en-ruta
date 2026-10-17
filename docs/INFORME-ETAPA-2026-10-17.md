# Informe de etapa — 17/10/2026

Estado de cada punto: **implementado** (código en una rama), **probado** (pruebas ejecutadas), **desplegado** (en producción), **verificado** (comprobado en producción). Nada de esta etapa está desplegado.

## 1. Tokens SEO (punto 1 del orden)

- Rama `chore/seo-verificacion`, PR en borrador. Implementado y probado (22/22 pruebas unitarias y build OK). No está desplegado.
- Los marcadores `PEGAR_TOKEN_AQUI` estaban dentro de un comentario HTML, así que no se activaban, pero se publicaban en el código fuente del sitio. Ahora quedan fuera de `index.html`.
- Las instrucciones para Google Search Console (propiedad por prefijo de URL, etiqueta o archivo HTML, sitemap) y Bing (importar desde Search Console o etiqueta `msvalidate.01`) están en `docs/SEO-VERIFICACION.md`.
- No se inventó ningún token.

## 2. Hosting comercial (punto 2 del orden)

Situación actual: el sitio está en Vercel Hobby (gratis). Las [Fair Use Guidelines de Vercel](https://vercel.com/docs/limits/fair-use-guidelines) limitan Hobby a uso personal no comercial, y cuentan como comercial promocionar la venta de un servicio. Vercel [puede bloquear despliegues](https://vercel.com/kb/guide/why-is-my-account-deployment-blocked) que no cumplan. Este sitio promociona un servicio pago, así que está en riesgo.

| Opción | Costo | Uso comercial | HTTPS | Deploy desde GitHub | Cabeceras / CSP | Esfuerzo de mudanza |
|---|---|---|---|---|---|---|
| Vercel Hobby (actual) | US$ 0 | No permitido ([Vercel](https://vercel.com/docs/limits/fair-use-guidelines)) | Sí | Sí | `vercel.json` (ya hecho) | — |
| Vercel Pro | US$ 20/mes por miembro ([Vercel](https://vercel.com/pricing)) | Sí | Sí | Sí | `vercel.json` (sin cambios) | Ninguno: se cambia el plan |
| Netlify Free | US$ 0, tope fijo de 300 créditos/mes ([Netlify](https://www.netlify.com/pricing/)) | Sí, explícito ([Netlify](https://www.netlify.com/blog/introducing-netlify-free-plan/)) | Sí, con dominio propio | Sí | `_headers` o `netlify.toml` | Bajo: traducir `vercel.json` y la regla de SPA |
| Cloudflare Workers (archivos estáticos) / Pages Free | US$ 0; pedidos estáticos gratis e ilimitados ([Cloudflare](https://developers.cloudflare.com/pages/functions/pricing/)); 500 builds/mes ([Cloudflare](https://developers.cloudflare.com/pages/platform/limits/)) | Los términos no lo prohíben, pero tampoco lo permiten por escrito ([análisis de Theodore HQ](https://www.theodorehq.com/docket/blog/posts/netlify-vercel-cloudflare-pages)). La [página de planes](https://www.cloudflare.com/plans/) describe el Free como "para proyectos personales o hobby que no son críticos para el negocio". | Sí | Sí | `_headers` | Bajo a medio: `wrangler.jsonc` con `not_found_handling: "single-page-application"` ([Cloudflare](https://developers.cloudflare.com/workers/static-assets/)) |
| GitHub Pages | US$ 0 | No permitido para un negocio en línea ([GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)) | Sí | Sí | No permite cabeceras propias (se pierde la CSP) | Descartado |

### Letra chica

- **Netlify:** cada publicación a producción cuesta 15 créditos, cada GB transferido 20 y cada 10.000 pedidos 2 ([Netlify Docs](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)). Con 300 créditos, eso da como máximo unas 20 publicaciones por mes, y menos si hay tráfico.
  - Si se terminan los créditos, el sitio se pausa hasta el mes siguiente; no hay cobro ([Netlify](https://www.netlify.com/pricing/pro-vs-free/)).
  - Con 4 o 5 IAs subiendo cambios, conviene publicar por tandas.
- **Cloudflare:** recomienda Workers en lugar de Pages para proyectos nuevos ([Cloudflare](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)).
- **Todas las opciones:** cambiar de proveedor cambia el subdominio (`*.netlify.app` o `*.workers.dev`), salvo que se use un dominio propio. Un dominio propio también evita repetir la verificación de Search Console en cada mudanza.

### Recomendación (decisión tuya; no se migró nada)

1. Si querés cero costo con uso comercial explícito, la opción es **Netlify Free**, publicando por tandas.
2. Si preferís no tocar nada, la opción es **Vercel Pro**, a US$ 20 por mes.
3. Antes de cualquiera de las dos, conviene decidir el nombre y el dominio (punto 3), para hacer una sola mudanza.

## 3. Nombre: "Mi Buenos Aires" / "Mi Buenos Aires querido"

Búsqueda hecha el 17/10/2026 en el [buscador público de marcas del INPI](https://portaltramites.inpi.gob.ar/MarcasConsultas/ConsultaTuMarca) y en la web. Esto no reemplaza la opinión de un agente de la propiedad industrial.

### Registros en el INPI

| Denominación | Clase | Titular | Estado | Datos |
|---|---|---|---|---|
| MI BUENOS AIRES QUERIDO | **39** (transporte; organización de viajes) | Burak, Alan | Concedida (C) | Acta 3724232, ingreso 13/07/2018, resolución 3048226, vence 15/07/2028. Es la renovación del acta 2580745 (misma marca, mismo titular). |
| MI BUENOS AIRES QUERIDO Y DERIVADOS | 30 y 43 | Batalla, C. G. y Batalla, G. N. | C | Actas 3329425 y 3329426 |
| MI BUENOS AIRES QUERIDO LA CAPITAL DEL TANGO | 16 | Ferrantelli, P. R. | C | Acta 2784281 |
| MI BUENOS AIRES AMADO | 41 | Medvedoff, L. E. | A | Acta 3069837 |
| EN RUTA VIAJES | 39 | Enrutaviajes S.A.S. | C | Acta 4429151 |

Notas sobre las consultas:

- "BA EN RUTA" no arrojó registros vigentes.
- Solo "MI BUENOS AIRES" (sin "querido") no figura como marca aislada.
- El buscador público parece buscar por comienzo del nombre. La búsqueda fonética del INPI es paga y la hace el propio INPI ([instructivo INPI](https://portaltramites.inpi.gob.ar/Instructivos/Marcas/BuscadorDeMarcas_JUL-26.pdf)).

### Uso en el mercado

- [mibuenosairesquerido.com](https://mibuenosairesquerido.com/guia/) es una guía de viajes en portugués, con Instagram @mibaquerido y reservas a través de socios (GetYourGuide). No se sabe quién la opera.
- Una agencia de viajes ofrece "Mi Buenos Aires Querido (circuitos culturales)" desde 2016, según el [perfil de LinkedIn de su titular](https://www.linkedin.com/in/maria-julia-ramirez-41b43a110).
- [El Viejo Almacén](https://www.grayline.com/tours/traditional-dinner-show-at-el-viejo-almacen/) tiene un salón "Mi Buenos Aires Querido" que se vende en paquetes turísticos.
- "miBA" es la [identidad digital oficial del Gobierno de la Ciudad](https://buenosaires.gob.ar/innovacionytransformaciondigital/login-miba). "Mi Buenos Aires" abreviado como "Mi BA" se confundiría con ella.
- Dominios: `mibuenosaires.com`, `mibuenosaires.com.ar`, `mibuenosairesquerido.com` y `mibuenosairesquerido.com.ar` ya están registrados (responden en DNS). El dominio `.ar` de "mibuenosairesquerido" hoy muestra un casino en línea.
- "Mi Buenos Aires querido" es un tango de Gardel y Le Pera de 1934 ([Wikipedia](https://en.wikipedia.org/wiki/Mi_Buenos_Aires_querido_(song))). Usar el título como nombre es una cuestión de marcas, no de derechos de autor; usar la letra o la grabación sí requiere licencia.

### Conclusión

- **"Mi Buenos Aires querido": no recomendable.** Hay una marca concedida y renovada, a nombre de un tercero, en la misma clase de servicios (39), vigente hasta 2028.
- **"Mi Buenos Aires": riesgo alto.** Comparte la parte distintiva con esa marca de la clase 39, choca con "miBA" del Gobierno de la Ciudad y los dominios principales están tomados. Antes de invertir en branding, hace falta la búsqueda fonética del INPI o un agente.
- **"BA en Ruta":** sin registros vigentes con ese comienzo. Existe "EN RUTA VIAJES" en la clase 39, que conviene incluir en la búsqueda fonética.
- No se renombró nada. Un cambio de nombre afecta el dominio, la verificación de Search Console, la imagen para compartir (`og-image`), los textos ES/EN/PT, el JSON-LD y el nombre del repositorio.

## Pendiente de tu confirmación

- Cambio de `Permissions-Policy` (`geolocation=()` → `geolocation=(self)`) y spec del modo en ruta (puntos 3 y siguientes).
- Decisión de hosting y de nombre.
- Fusionar el PR de SEO.

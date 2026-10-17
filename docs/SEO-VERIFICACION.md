# Verificación en Google Search Console y Bing Webmaster Tools

El sitio no tiene tokens de verificación cargados. No se inventan: los genera cada cuenta.

## Google Search Console
1. Entrar a https://search.google.com/search-console con la cuenta del negocio.
2. Agregar propiedad → **Prefijo de URL** → `https://ba-en-ruta.vercel.app/`
   (la opción "Dominio" exige DNS, que en un subdominio `vercel.app` no controlamos).
3. Método **Etiqueta HTML**: Google muestra `<meta name="google-site-verification" content="XXXX" />`.
4. Pegar esa línea en `index.html`, dentro de `<head>`, en el lugar del comentario
   `Verificación de Search Console / Bing`.
5. Publicar y recién entonces tocar **Verificar** en Search Console.
6. Enviar el sitemap: `https://ba-en-ruta.vercel.app/sitemap.xml`.

Alternativa: método **Archivo HTML** → descargar `googleXXXX.html` y copiarlo a `public/` (queda en la raíz del sitio).

## Bing Webmaster Tools
1. https://www.bing.com/webmasters → Agregar sitio → `https://ba-en-ruta.vercel.app/`.
2. Lo más simple: **Importar desde Google Search Console** (sin token).
3. Si no: método **Etiqueta meta** → `<meta name="msvalidate.01" content="XXXX" />` en el mismo lugar de `index.html`.

## Notas
- El token es público por diseño (va en el HTML); no es una credencial secreta.
- Si el sitio cambia de dominio o de nombre, hay que verificar la propiedad nueva.
- La CSP no afecta a estas etiquetas.

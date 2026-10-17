import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'
import { localApi } from './server/vite-plugin'

// Mismas cabeceras de seguridad que Vercel (vercel.json), para que `vite preview`
// y las pruebas E2E detecten cualquier recurso bloqueado por la CSP antes de publicar.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8')) as {
  headers: { source: string; headers: { key: string; value: string }[] }[]
}
const securityHeaders = Object.fromEntries(
  (vercel.headers.find((h) => h.source === '/(.*)')?.headers ?? [])
    // En local se sirve por http: sin HSTS ni upgrade-insecure-requests.
    .filter((h) => h.key !== 'Strict-Transport-Security')
    .map((h) => [h.key, h.value.replace('; upgrade-insecure-requests', '')]),
)

export default defineConfig({
  plugins: [react(), tailwindcss(), localApi()],
  // GitHub Pages: https://alangalarzastanley.github.io/ba-en-ruta/
  // Vercel/Netlify: leave BASE_PATH empty or unset
  base: process.env.BASE_PATH || '/',
  preview: { headers: securityHeaders },
  build: {
    rollupOptions: {
      output: {
        // React en un archivo propio: cambia poco y queda en caché entre despliegues.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
        },
      },
    },
  },
})

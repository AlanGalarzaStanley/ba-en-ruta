import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages: https://alangalarzastanley.github.io/ba-en-ruta/
  // Vercel/Netlify: leave BASE_PATH empty or unset
  base: process.env.BASE_PATH || '/',
})

# BA en Ruta — instrucciones para Claude / Vercel

## Estado del repo

Ya están en GitHub:
- package.json, vite.config.ts, tsconfigs
- index.html, src/main.tsx, src/index.css
- src/lib/ba-config.ts (WhatsApp vacío — completar)
- src/lib/whatsapp.ts
- README.md, roadmap.md

## Archivos críticos que pueden faltar

Si `src/App.tsx` o `src/lib/ba-copy.ts` no existen, el build falla.

Deben existir y exportar:

### ba-copy.ts
- `export type Lang = "es" | "en" | "pt"`
- `export type CopyKey = keyof typeof copy.es`
- `export function t(lang: Lang, key: CopyKey): string`
- Objeto `copy` con textos ES / EN / PT para toda la UI

### App.tsx
- `export default function App`
- Secciones: Hero, Cómo funciona, Servicios, Precios, Experiencias, Imperdibles, Gastronomía, Formulario, FAQ, Footer
- Selector de idioma ES/EN/PT
- Formulario que usa `buildWhatsAppMessage` / `openWhatsApp` de `./lib/whatsapp`
- Diseño: navy `#10263d`, cream, gold; tipografías DM Sans + Fraunces

## Deploy en Vercel
1. Import Project → repo `AlanGalarzaStanley/ba-en-ruta`
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Node 20+

## WhatsApp (obligatorio para producción)
En `src/lib/ba-config.ts`:
```ts
export const WHATSAPP_NUMBER = "54911XXXXXXXX" // solo dígitos, sin + ni espacios
```

Si está vacío, el formulario muestra el mensaje preparado y permite copiarlo (no abre WhatsApp).

## Referencia visual
https://buenos-aires-voyage.lovable.app

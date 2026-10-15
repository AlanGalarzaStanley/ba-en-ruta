# BA en Ruta

Sitio comercial premium de **traslados privados y experiencias turísticas** en Buenos Aires.

**Vos elegís el destino; yo me ocupo del camino.**

- Live original (Lovable): https://buenos-aires-voyage.lovable.app  
- Repo: https://github.com/AlanGalarzaStanley/ba-en-ruta

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS 4
- Lucide React
- Multiidioma: Español / English / Português (BR)
- Formulario → WhatsApp (sin backend)

## Desarrollo

```bash
npm install
npm run dev
```

## Configurar WhatsApp

En `src/lib/ba-config.ts`:

```ts
export const WHATSAPP_NUMBER = "54911XXXXXXXX" // solo dígitos
```

Ver `roadmap.md` para el estado completo.

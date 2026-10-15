# Roadmap — BA en Ruta

## Inspección

- Origen: https://buenos-aires-voyage.lovable.app (Lovable)
- Repo: https://github.com/AlanGalarzaStanley/ba-en-ruta
- Código Lovable no accesible; se implementó el sitio completo basándose en la página pública y el blueprint maestro.

## Completado

- App multiidioma ES/EN/PT
- Formulario → WhatsApp (fallback si no hay número)
- Imperdibles (8 lugares)
- Servicios, experiencias, gastronomía, FAQ
- Identidad visual navy/cream/gold
- Responsive y SEO básico

## Datos pendientes

1. Número WhatsApp en `src/lib/ba-config.ts` (WHATSAPP_NUMBER)
2. Tarifas propias (cuando estén)
3. Videos Meta AI
4. Dominio definitivo

## Cómo poner WhatsApp

```ts
export const WHATSAPP_NUMBER = "54911XXXXXXXX"
```

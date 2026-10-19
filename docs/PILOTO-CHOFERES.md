# Piloto escalable — choferes y QR

## Base ya en repo

- `tenant.ts` + rutas `/c/{slug}`
- `MiQr` + mensaje de contacto pasajero
- Features por tenant (itineraries, map, gastro, miQr, driverSignup)

## Piloto (pequeño, sin cobros automáticos)

1. **1–3 choferes** con slug propio (`/c/nombre`).
2. Cada uno: `publicName`, WhatsApp, foto opcional, `features` iguales al core.
3. QR físico en asiento → URL del tenant o `?ref=asiento`.
4. Atribución: query `ref` o `utm_source=qr_flota` en el primer WhatsApp (texto prearmado), **sin** guardar GPS del pasajero.
5. Medición: conteo de aperturas de WA desde ese mensaje (manual o contador simple en admin si Blob está activo).

## No hacer aún

- Suscripciones masivas
- Pagos online
- Copia manual de decenas de sitios

## Flota ~50 / taxis Caminito-Recoleta

Oportunidad comercial futura. El valor es el **contenido compartido** (guiones, tiempos, vida porteña) + perfil propio. Acuerdo no confirmado.

## Códigos de recorrido (modo en ruta)

Sigue en `feat/modo-en-ruta`: validación servidor, un canje, geo solo al iniciar recorrido con permiso. Coordinar merge con esta rama de producto sin dos UIs incompatibles.

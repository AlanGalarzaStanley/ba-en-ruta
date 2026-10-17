# Modo en ruta: activación por código, GPS y narraciones

Estado al 17/10/2026, rama `feat/modo-en-ruta`. **No está en producción.**

Convención: **implementado** = código en la rama. **Probado** = pruebas automáticas ejecutadas y aprobadas. **Parcial** = probado con una alternativa porque falta un recurso real. **Pendiente** = falta hacerlo.

## Qué hace

1. **Crear el código.** El dueño genera un código en `/admin`, vinculado a un recorrido (`historica`, `clasica`, `gastronomica`, `futbolera` o `tigre-delta`), y se lo manda al pasajero por WhatsApp. El mensaje lleva el código y el enlace `/tour?codigo=…`.
2. **Activarlo.** El pasajero abre `/tour`, ingresa el código y el servidor lo canjea:
   - El código queda vinculado a ese teléfono.
   - Si se usa en otro teléfono, el servidor responde "ya se activó en otro teléfono".
   - Si dos personas lo canjean al mismo tiempo, solo una gana.
3. **Recuperar la sesión.** Si el pasajero cierra o recarga el navegador, la sesión se recupera sola. Sin conexión, sigue con la sesión y las narraciones guardadas hasta que la sesión venza.
4. **Recorrer.** "Comenzar recorrido" pide el permiso de ubicación (solo con ese toque) y mantiene la pantalla encendida si el navegador lo permite:
   - Al acercarse a una parada (radio configurable, 300 m por defecto), la muestra y la narra.
   - Hay botones de Anterior, Siguiente, Escuchar, Pausa y Repetir.
5. **Narración.** Hay tres niveles: la grabación propia (cuando exista), la voz automática del dispositivo (marcada "provisoria") o, si no hay voz, solo el texto. Si el navegador bloquea el audio, aparece el aviso "Tocá Escuchar".
6. **Segundo plano.** Al pasar a segundo plano, la narración se pausa. Los navegadores también suspenden el GPS.

## Arquitectura

| Pieza | Archivo | Notas |
|---|---|---|
| API (función única) | `api/index.ts` | `vercel.json` reescribe `/api/:path*` → `/api?route=…` y saca `/api` del fallback de la SPA. |
| Ruteo HTTP | `server/http.ts` | `tour/redeem`, `tour/session`, `tour/narration`, `tour/health`, `admin/codes`. Respuestas `no-store` y `noindex`. Rechaza otro `Origin` y cuerpos de más de 4 KB. |
| Lógica | `server/service.ts` | Canje, sesión, crear, listar, revocar y liberar. |
| Criptografía | `server/crypto.ts` | Ver "Modelo de seguridad". |
| Almacenamiento | `server/store.ts` | `BlobStore` (Vercel Blob privado) y `MemoryStore` (local y pruebas). |
| Configuración | `server/env.ts` | Falla cerrado: sin secreto o sin almacenamiento responde 503. En Vercel nunca usa la memoria. |
| Narraciones | `server/narrations.ts` | Solo en el servidor; no están en el código público del sitio. |
| Desarrollo local | `server/vite-plugin.ts` | La misma API en `vite dev` y `vite preview`, con memoria y secretos locales de prueba. |
| Cliente | `src/lib/tour-client.ts` | Identificador aleatorio del dispositivo, sesión, caché y progreso en `localStorage`. |
| Proximidad | `src/lib/proximity.ts` | Ver "Detección de llegada". |
| Narrador | `src/lib/narrator.ts` | Audio → Web Speech API → texto. Divide el texto en frases porque algunos navegadores cortan las locuciones largas. |
| Pantallas | `src/components/TourMode.tsx` (`/tour`), `src/components/AdminCodes.tsx` (`/admin`) | Se cargan aparte; no pesan en la portada. |

### Modelo de seguridad

- **Código:** 12 caracteres del alfabeto Crockford base32 (60 bits), en formato `XXXX-XXXX-XXXX`. Al validar se toleran minúsculas, espacios y las confusiones O/0 e I/L/1.
- **Lo que se guarda:** solo un HMAC del código, con `TOUR_AUTH_SECRET`. El panel muestra los últimos 4 caracteres; el código completo se ve una sola vez, al crearlo.
- **Canje atómico:** se lee el registro con su ETag y se escribe con `ifMatch`, la escritura condicional de Vercel Blob ([documentación](https://vercel.com/docs/vercel-blob/using-blob-sdk)). Si dos canjes compiten, el perdedor relee y recibe `in_use`. En memoria se probó con 10 canjes simultáneos (prueba unitaria) y con 6 por HTTP (prueba E2E).
- **Sesión:** token firmado con HMAC-SHA256 que incluye el id del código, el recorrido, el hash del dispositivo y el vencimiento. `tour/session` lo revalida contra el registro, así que revocar o liberar un código corta la sesión.
- **Narraciones:** `tour/narration` verifica la firma sin leer el almacenamiento, para ahorrar operaciones.
- **Administración:** el token `TOUR_ADMIN_TOKEN` (24 caracteres o más) viaja en `Authorization` y se compara en tiempo constante. En el navegador queda solo en la pestaña (`sessionStorage`), nunca en la URL.
- **Fuerza bruta:** con 60 bits de entropía, adivinar un código no es viable. No se agregó límite de intentos porque gastaría operaciones de Blob.

### Privacidad

- La ubicación se procesa solo en el teléfono, dentro de `evaluateFix`. No se envía, no se guarda y no hay analítica.
- Se guarda en el teléfono la lista de paradas visitadas, no las posiciones.
- El identificador del dispositivo es aleatorio y el servidor guarda solo su HMAC.
- `Permissions-Policy` pasa de `geolocation=()` a `geolocation=(self)`: el sitio puede pedir ubicación, pero los iframes de YouTube no.

### Detección de llegada

- Ignora lecturas con precisión peor que 200 m.
- Confirma la llegada con 2 lecturas seguidas dentro del radio, o con 1 si la precisión es de 30 m o mejor.
- Tigre y Palermo tienen radio mínimo propio (800 m y 600 m) porque son extensos.
- No vuelve a disparar una parada ya visitada y permite cambiar el orden del recorrido.

## Costo y límites (presupuesto cero)

- **Almacenamiento:** Vercel Blob es gratis en Hobby dentro de los límites, y Vercel aclara que "no vas a pagar por uso adicional". Si se superan, Blob queda bloqueado hasta 30 días ([Vercel Blob, uso y precios](https://vercel.com/docs/vercel-blob/usage-and-pricing)).
- **Consumo estimado:**
  - Crear: 1 operación avanzada por código.
  - Canjear: 1 simple más 1 avanzada.
  - Revalidar la sesión: 1 simple.
  - Listar en el panel: 1 avanzada más 1 simple por código.
  - Con decenas de recorridos por mes queda muy por debajo de lo incluido.
- **Funciones:** la API es una sola, incluida en Hobby.
- **Dependencia nueva:** `@vercel/blob` (SDK oficial). `npm audit`: 0 vulnerabilidades.
- **Aviso:** el uso comercial en Hobby sigue siendo el riesgo documentado en `docs/INFORME-ETAPA-2026-10-17.md`. Por decisión del dueño, el proyecto sigue en Vercel.

## Configuración en Vercel (pendiente, la hace el dueño)

La credencial de Vercel del agente solo tiene permisos de lectura: crear el almacenamiento y las variables respondió 403. Sin estos pasos, la API responde 503 "El servicio de activación todavía no está habilitado" y el resto del sitio funciona igual.

1. **Storage:**
   - Vercel → proyecto `ba-en-ruta` → Storage → Create → **Blob**.
   - Nombre `ba-en-ruta-codigos`, acceso **Private**.
   - Conectarlo al proyecto en Preview (y Production cuando se apruebe). Vercel agrega solo las variables del Blob.
2. **Variables:** Settings → Environment Variables, tipo **Sensitive**:
   - `TOUR_AUTH_SECRET`: 32 caracteres aleatorios o más. Se puede generar con `openssl rand -base64 48`. Si se cambia, se invalidan todos los códigos y sesiones.
   - `TOUR_ADMIN_TOKEN`: 24 caracteres aleatorios o más. Es la clave para entrar a `/admin`; guardarla en un gestor de contraseñas.
3. **Probar la vista previa:** volver a desplegar y abrir `…vercel.app/api/tour/health`. Debe responder `{"ok":true,…}`.
4. **Datos por entorno:** se separan por prefijo (`tour/preview/…` y `tour/production/…`), así que se puede usar el mismo almacenamiento.

## Pruebas

| Qué | Cómo | Estado |
|---|---|---|
| Lógica de códigos, firma, canje, concurrencia (10 simultáneos), vencimientos, revocar y liberar, validación de parámetros | `tests/unit/tour-server.test.ts` | Probado |
| API HTTP: falla cerrado, token de administración, origen, tamaño de cuerpo, flujo completo | ídem | Probado |
| Recorridos del servidor = catálogo del sitio; narraciones en 3 idiomas, 110–260 palabras, con fuentes oficiales | ídem | Probado |
| Proximidad (precisión, confirmación, radio, orden libre) | `tests/unit/proximity.test.ts` | Probado |
| Narrador (división en frases, elección de voz) | `tests/unit/narrator.test.ts` | Probado |
| E2E escritorio y Pixel 7: activación por enlace, recarga, idioma, segundo teléfono, código inválido, 6 canjes HTTP simultáneos, GPS simulado, permiso denegado y avance manual, sin conexión, revocación, accesibilidad (axe), panel completo | `tests/e2e/tour.spec.ts` | Probado (22/22) |
| Función compilada por Vercel (`vercel build`) ejecutada con Node: 503 sin configuración, flujo completo en memoria, carga del SDK de Blob | manual, ver informe del PR | Parcial |
| Canje atómico contra un Blob real | — | Pendiente (falta el almacenamiento) |
| Voz automática y bloqueo de audio en un teléfono real | — | Pendiente (Chromium sin interfaz no reproduce voz) |
| Pantalla encendida (Wake Lock) en un teléfono real | — | Pendiente |
| Recorrido real con GPS | ver checklist | Pendiente |

## Checklist de prueba en ruta real (para el dueño)

Antes de manejar:

1. Crear un código de prueba en `/admin` de la vista previa, con la nota "prueba".
2. En un Android con Chrome y en un iPhone con Safari, abrir el enlace, activar y elegir el idioma.

Durante el recorrido (la tablet o el teléfono, en el soporte):

3. Tocar "Comenzar recorrido" y aceptar el permiso de ubicación. Confirmar que se ve "GPS activo · ±X m".
4. Revisar si aparece "Pantalla siempre encendida". Si dice "manualmente", subir el tiempo de apagado de pantalla del teléfono.
5. Al llegar a cada parada, anotar:
   - ¿se activó sola?
   - ¿a qué distancia aproximada?
   - ¿se escuchó la voz o hubo que tocar "Escuchar"?
6. Si una parada no se activa, probar con el radio en 500 m (Ajustes) y usar "Siguiente parada".
7. Bloquear y desbloquear la pantalla: la narración debe quedar en pausa y el GPS debe volver.
8. Cortar los datos un minuto y recargar: debe seguir el recorrido con el aviso "Sin conexión".

Después:

9. En `/admin`: liberar el código, activarlo en el otro teléfono y luego desactivarlo. Recargar el primer teléfono: debe pedir el código.
10. Mandar las anotaciones para ajustar radios y textos.

## Smoke test iOS (15 minutos)

- La ubicación solo funciona en https y la pide Safari al tocar "Comenzar".
- Si se deniega, se vuelve a habilitar en Ajustes → Safari → Ubicación.
- iOS suspende el GPS con la pantalla bloqueada; mantener la pantalla encendida.
- Wake Lock requiere iOS 16.4 o posterior. En versiones anteriores, configurar "Bloqueo automático: Nunca" durante el recorrido.
- La voz automática depende de las voces instaladas (Ajustes → Accesibilidad → Contenido leído).

## Narraciones

- Hay 8 guiones en `server/narrations.ts`, en estado **borrador**. El dueño los revisa y los graba.
- Cada uno tiene 1–2 minutos de lectura y sus fuentes oficiales, consultadas el 17/10/2026: turismo.buenosaires.gob.ar, buenosaires.gob.ar, bocajuniors.com.ar y tigre.gob.ar / vivitigre.gob.ar.
- No se incluyeron datos que esas fuentes no confirman. Por ejemplo, el origen del primer Teatro Colón quedó afuera.
- Puerto Madero tiene guion, pero no figura en ningún recorrido actual.

Para cargar una grabación:

1. Subir el archivo a `public/audio/<placeId>-<idioma>.mp3`.
2. Completar `audio: { es: "/audio/<placeId>-es.mp3" }`.
3. Pasar `status` a `"revisado"`.

La CSP ya permite `media-src 'self'`.

## Pendiente o fuera de alcance

- Configuración de Vercel (arriba) y prueba con un Blob real.
- Grabaciones propias.
- Mapa dentro del modo en ruta: se reutilizaría Leaflet del simulador.
- Funcionamiento sin conexión desde el inicio (service worker): hoy hace falta abrir la página con conexión al menos una vez.
- Límite de intentos de canje (no necesario con 60 bits de entropía).

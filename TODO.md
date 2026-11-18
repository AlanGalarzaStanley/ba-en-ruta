# TODO — implementación de experiencias aprobadas

Este plan ejecuta la aprobación del dueño recibida el 17-11-2026 para los cambios documentales de la PR #8 y la continuidad indicada. La PR #8 quedó integrada. Este TODO registra la implementación de la dirección editorial aprobada, sin inferir condiciones comerciales que no se confirmaron.

## Resultado 1 — Actualizar las cinco experiencias públicas

- [x] Reflejar en las tarjetas de recorridos las identidades aprobadas para `historica`, `clasica`, `gastronomica`, `futbolera` y `tigre-delta`.
- [x] Mantener secuencias claras y orientativas, sin cronogramas fijos ni duración de operación garantizada.
- [x] Asignar Tortoni como parada distintiva de `historica`; no incluirlo automáticamente en Clásica, Gastronómica o Futbolera.
- [x] Dar a Clásica el eje centro monumental → Recoleta → pausa verde opcional en Palermo/Rosedal; Los Galgos solo es una parada opcional.
- [x] Dar a Gastronómica el eje Villa Crespo/Los Bohemios y una comida principal; Palermo puede ser extensión tranquila, San Telmo alternativa; no sumar restaurantes como obligación.
- [x] Dar a Futbolera el eje Caminito/La Boca → Bombonera exterior; visita interior y El Gran Paraíso dependen de confirmación concreta. El Tano no es parada de la ruta base y requiere definición/cotización separada.
- [x] Dar a Tigre/Delta un eje ribereño con navegación como ancla solo si operador, horario y cupo se confirman; MAT y comida son opciones condicionadas, no una acumulación fija.
- [x] Mantener paridad semántica en español, inglés y portugués de Brasil.
- [x] Comunicar comidas, entradas, navegación, reservas y disponibilidad como externas/no incluidas salvo acuerdo explícito; no inventar precios, horarios, cupos, traslados, duración, seguridad ni proveedores.
- [x] Mantener WhatsApp como consulta; nunca indicar que la reserva queda confirmada.
- [x] Preservar las tarifas públicas existentes: USD 50 (media jornada) y USD 100 (día completo), registradas como indicadas por el dueño el 18-10-2026. No se cambiaron ni se extendieron; su vigencia y aplicación a estas secuencias no se revalidaron.

## Resultado 2 — Publicar los documentos y actualizar la memoria canónica

- [x] Integrar la PR #8 con propuesta de recorridos, sistema de narración y hoja de operación/costos/roadmap. CI, E2E y Preview de Vercel pasaron.
- [x] Actualizar el estado de los documentos para indicar que el dueño aprobó la dirección editorial el 17-11-2026; no afirmar que audio, operación externa o condiciones comerciales estén implementados.
- [x] Actualizar `AGENTS.md` con la decisión aprobada, el precio histórico publicado y el alcance de esta implementación, conservando los límites de evidencia y las decisiones comerciales pendientes.

## Resultado 3 — Validar la implementación y dejar la PR lista

- [x] Añadir pruebas que comprueben la secuencia ordenada de cada itinerario, la separación entre ruta base y opciones y la existencia de textos ES/EN/PT sin horas fijas.
- [x] Ejecutar `npm run check`: typecheck, 25 pruebas unitarias y build pasan. `npm run test:e2e`: 30/30 pasan en Chromium escritorio y Android emulado. No se cambiaron URLs de proveedores, por lo que `npm run test:links` no es necesario en esta entrega.
- [x] Revisar mediante E2E el contenido ES/EN/PT, las cinco tarjetas y el simulador en escritorio y móvil emulado; el suite de accesibilidad también pasa.
- [x] Abrir e integrar la PR #9 a `main` después de que CI y Vercel Preview pasaran. Confirmar CI de `main` en el SHA `582b56bef167660edbc27df91dd9f7abc6d1efc4`, status de Vercel `Deployment has completed` y respuesta HTTP 200 en la URL pública.

## Resultado 4 — Hacer del simulador una experiencia narrativa explorable

- [x] Al abrir cualquiera de los cinco recorridos, presentar su introducción narrativa específica y la secuencia real de paradas configurada, usando contenido existente verificado; no convertir la página de inicio en un catálogo largo.
- [x] Ofrecer acceso visible a los capítulos/paradas con nombre y orden, permitir saltar directamente a una parada desde el resumen, y conservar la navegación anterior/siguiente, teclado, táctil, enlaces compartibles y foco accesible.
- [x] Mostrar el día orientativo de la experiencia desde el simulador, incluidos sus matices opcionales y externos, y mantener visibles las condiciones de confirmación; se distingue el contexto/opciones de la ruta base.
- [x] Dejar la exploración a ritmo de la persona por defecto: no avanzar ni rotar imágenes automáticamente hasta que la persona elija reproducir; el control de reproducción es explícito y `prefers-reduced-motion` se respeta.
- [x] Mostrar el contexto disponible completo de cada parada, incluidos todos los datos históricos y puntos de observación existentes; no truncar los textos aprobados por límites visuales arbitrarios.
- [x] Aclarar que las líneas del mapa unen puntos para ilustrar una secuencia y no son navegación vial en vivo; conservar tiempos/distancias como estimaciones simuladas, no como horario o duración del servicio.
- [x] Mantener créditos de foto, atribución de video externo, soporte ES/EN/PT-BR, contraste, navegación por teclado, diseño móvil y alternativa textual si un medio no carga.
- [x] Reutilizar estructura y activos ya presentes; no incorporar una escena 3D ficticia, un origen externo nuevo, GPS, audio publicado, seguimiento, tarifas, reservas o inclusiones no confirmadas.
- [x] `npm run check` pasa (typecheck, 25 unitarias y build); `npm run test:e2e` pasa 36/36 en desktop y Android emulado, incluidos teclado Space/Enter, tres idiomas, viewport 320px y checks de accesibilidad. PR #12 quedó integrada en `main` (`0e38a194ef049c9c2d4639ac3e4479af5cf1cfb5`); CI `44343608234` pasó 36/36, Vercel confirmó `Deployment has completed` y la producción respondió HTTP 200 con los nuevos textos ES/EN/PT en el bundle.

## Resultado 5 — Preservar la investigación como contexto, no como autorización

- [x] Incluir `docs/INVESTIGACION-REFERENTES-INMERSIVOS-TURISMO-2026-11-18.md` con los diez referentes y la verificación de Claude Fable 5.2, y enlazarlo desde el mapa documental de `AGENTS.md` como investigación de inspiración, no como decisión de producto ni autorización para incorporar 360°, WebGL, audio, GPS o nuevas funciones.

## Pendiente fuera de esta entrega

- [ ] Confirmar con el dueño vigencia y alcance de las tarifas existentes, además de cobertura, inclusiones, vehículo, duración comercial, esperas, peajes, estacionamiento, suplementos, reserva/cancelación y proveedores autorizados.
- [ ] Revalidar precios, horarios, menú, reserva, cupo, acceso y condiciones de terceros para la fecha de cada salida antes de prometerlos.
- [ ] El audio sigue en borrador: elegir voz real, validar/editar cada guion, obtener consentimiento explícito para grabación/uso y cotejar transcripciones antes de producir o publicar audio. No se crea un reproductor de audio en esta implementación.
- [ ] No activar rutas nocturnas, El Tano como parada base, reservas, checkout, pagos ni nuevas operaciones hasta acordar responsables y condiciones.

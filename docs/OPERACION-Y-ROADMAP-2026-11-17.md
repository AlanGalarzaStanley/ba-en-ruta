# Operación, costos y roadmap — BA en Ruta

**Fecha:** 17 de noviembre de 2026
**Estado:** documento de trabajo para decisión del dueño. No modifica tarifas, políticas comerciales, copy público ni producto vigente. Los importes externos que siguen son una transcripción de la investigación de recorridos fechada 15-11-2026; no fueron revalidados en vivo para este documento y deben actualizarse directamente antes de comunicarlos a un pasajero.

## Separar tres tipos de datos

**Costo externo observado:** valor que un proveedor publicó o que una investigación capturó en una fecha concreta. Puede cambiar, no es el precio de BA en Ruta y no implica compra, cupo, reserva ni inclusión.

**Decisión del dueño:** tarifa, alcance y reglas del servicio de traslado. Ninguna fuente de un restaurante, museo o navegación puede confirmar estas condiciones por el dueño.

**Costo operativo del negocio:** combustible, tiempo, espera, peajes, estacionamiento, mantenimiento, impuestos, comisiones y margen. No hay datos suficientes en el repo para calcular ni recomendar una tarifa rentable.

La evidencia detallada, las fuentes de la investigación y los límites de cada precio se mantienen en [`INVESTIGACION-RECORRIDOS-2026-11-15.md`](INVESTIGACION-RECORRIDOS-2026-11-15.md), sección «Política de costos para producto». Usar ese documento como registro histórico de observaciones, no como catálogo vigente.

## Precios externos observados en la investigación del 15-11-2026

**No publicar estos valores como actuales sin reconfirmarlos.** Son importes en ARS observados por categoría, modalidad o artículo; no constituyen un total de experiencia ni se suman a la tarifa del chofer por inferencia.

- **Teatro Colón:** observaciones desde $8.000 para algunas categorías residentes hasta $37.000 general; $18.000 para residente adulto según el relevamiento. La visita y categoría dependen de la disponibilidad oficial.
- **Museo Boquense:** observaciones de $33.000–$47.000 según modalidad y categoría; los importes originales distinguen Museo + Visita Express de Museo + Estadio Tour y residente de entrada general.
- **Navegación en Tigre:** observaciones de $26.000–$33.000 para adulto general y $12.000 para menores según paseo, duración y operador.
- **La Cabrera:** precios observados por ítem —cubierto, platos y entradas—, no un paquete ni un total comparable. Solo aplicar si el dueño aprueba esta alternativa y se vuelve a consultar la carta.
- **Bar Los Galgos:** valores observados para bebidas, empanadas, platos y postre. Son artículos sueltos; no equivalen a un menú ni a un consumo incluido.
- **Chapaleo:** valores observados para artículos de carta. No asumir apertura, reserva, conexión con navegación ni precio vigente.

La investigación no encontró base actual suficiente para cotizar Café Tortoni, La Perla de Caminito, El Preferido, El Gran Paraíso, Los Bohemios, El Tano, alfajores, dulce de leche, almuerzos genéricos en La Boca, recreos isleños, propinas o servicio de chofer. No completar esos huecos con promedios, precios viejos, conversiones ni supuestos.

## Datos que solo el dueño puede decidir

Completar estas respuestas antes de vender o publicar condiciones de un recorrido. «A confirmar» es preferible a inventar.

1. **Servicio base:** ¿traslado punto a punto, chofer disponible por horas, recorrido con conversación local, acompañamiento a pie u otra combinación? Indicar exactamente qué está incluido.
2. **Cobertura y vehículo:** zonas de recogida/regreso, capacidad real, equipaje, accesibilidad, sillas infantiles y restricciones del vehículo.
3. **Tarifa:** el sitio conserva los valores de tarifa publicados `USD 50` (media jornada) y `USD 100` (día completo), registrados en `src/lib/packages.ts` como indicados por el dueño el 18-10-2026. Esta continuación no los cambia ni los extiende a extras o nuevas condiciones. Su vigencia y aplicabilidad a las cinco secuencias actuales no se revalidaron; confirmar alcance, moneda, pasajeros incluidos, diferenciación por fecha/recorrido y quién aprueba el precio final. No reutilizar importes externos como tarifa del conductor.
4. **Tiempo y gastos:** espera incluida y costo adicional; tratamiento de peajes, estacionamiento, combustible, suplementos, desvíos, tiempo muerto y cambios de ruta.
5. **Reserva y cancelación:** si existe anticipo, cómo se paga, plazo de confirmación, cambios, cancelaciones, demoras y qué ocurre si un proveedor externo no puede recibir al pasajero.
6. **Proveedores:** cuáles son sugerencias neutrales y cuáles —si alguno— son proveedores preferidos, coordinados o comisionados. Declarar cualquier relación económica; no recomendar por una comisión oculta.
7. **Comidas, entradas y navegación:** confirmar si siempre se pagan aparte o si el dueño desea ofrecer algún add-on con precio, responsable y condiciones explícitas. Hasta entonces, se consideran excluidos por defecto.
8. **Adaptación y operación:** días/horarios reales, idiomas efectivamente disponibles, margen para cambiar por tráfico/clima/agenda, protocolos para partido o corte, y límites de acompañamiento.
9. **Identidad editorial:** dirección aprobada por el dueño el 17-11-2026: Tortoni es principal en `historica` y no una parada automática de las demás; `gastronomica` se centra en Villa Crespo/Los Bohemios; El Tano permanece como variante separada pendiente de validación operativa.
10. **Audio:** decidir si se desea producir narraciones, quién aporta la voz, aprobar cada guion y autorizar explícitamente la grabación y uso de esa voz. No hay audio ni interfaz de reproducción aprobados o implementados.

## Qué falta confirmar con terceros

Estas comprobaciones son para una fecha, servicio y grupo concretos; no se resuelven con una ficha turística genérica:

- Horarios, carta, precios, restricciones alimentarias, mesa y política de reserva de cada establecimiento elegido.
- Disponibilidad, categoría, precio y condiciones de acceso del Teatro Colón, Museo Boquense y cualquier otro lugar pago.
- Operador, salida, ruta, cupo y política por clima/cambio de la navegación de Tigre. La investigación previa encontró una discrepancia entre cinco y seis ríos nombrados en una página del operador; resolverla directamente antes de narrar el itinerario.
- Sucursal/dirección aplicable, operación, espera y logística real de El Tano; no hay verificación suficiente para cotizarlo como variante.
- Ruta, tránsito y tiempos para la fecha y hora de salida; no prometer minutos fijos de traslado.

## Roadmap con puertas de decisión

### Fase 0 — Hecho en esta continuación

- Se documentó una propuesta de identidad, secuencias orientativas, diferenciadores y dudas para los cinco itinerarios en [`PROPUESTA-EXPERIENCIAS-GENUINAS-2026-11-17.md`](PROPUESTA-EXPERIENCIAS-GENUINAS-2026-11-17.md).
- Se propuso un formato de narración a demanda y se prepararon seis guiones de muestra con texto equivalente y notas de accesibilidad en [`SISTEMA-NARRACIONES-BA-EN-RUTA-2026-11-17.md`](SISTEMA-NARRACIONES-BA-EN-RUTA-2026-11-17.md).
- La PR #8 integró documentos solamente; esta continuación implementa el copy/secuencia aprobado en una rama de código aparte. No altera reservas, tarifas ni audio.

### Fase 1 — Dirección editorial aprobada; operación todavía pendiente

- El dueño aprobó el 17-11-2026 la dirección editorial y los cambios documentales de la PR #8; se puede implementar copy/secuencia de los cinco recorridos en ES/EN/PT.
- Resolver las decisiones comerciales del bloque anterior —alcance, cobertura, tarifa, gastos, inclusiones, proveedores— antes de anunciar condiciones no confirmadas.
- La aprobación de borradores de narración no selecciona ni autoriza una voz concreta ni aprueba grabación/publicación de audio.

**Puerta:** los nombres y enfoques editoriales aprobados pueden describir recorridos orientativos. No publicar precios de terceros, inclusiones, reservas, accesos, horarios o disponibilidad como garantizados sin confirmación para el caso aplicable.

### Fase 2 — Revalidación de información externa

- Consultar directamente proveedores y organismos para la fecha prevista.
- Registrar enlace, categoría/unidad, moneda, fecha de consulta, restricción y qué no incluye cada dato.
- Marcar todo importe externo como sujeto a cambio; no combinarlo con la cotización del chofer.

**Puerta:** si no se puede confirmar una tarifa, disponibilidad o condición, omitir el dato o presentarlo como pendiente; nunca completar por estimación.

### Fase 3 — Implementar el contenido aprobado

- La PR #9, integrada en `main`, actualiza las cinco tarjetas y el orden del simulador, deja las alternativas externas condicionadas y no presenta horarios fijos.
- Se mantuvo paridad semántica ES/EN/PT y se añadieron pruebas de orden y límites; typecheck, 25 unitarias, build y E2E (30/30 en Chromium escritorio/Android emulado) pasan localmente.
- Los cinco checks remotos de la PR (CI y Vercel Preview) pasaron. CI de `main` pasó en el SHA `582b56bef167660edbc27df91dd9f7abc6d1efc4` (run `44142165161`); Vercel confirmó el deployment de producción y `https://ba-en-ruta.vercel.app/` respondió HTTP 200.

### Fase 4 — Prototipo de narraciones (opcional)

- Solo tras aprobar guiones y voz, evaluar un botón manual de play/pause, duración visible y transcripción equivalente.
- Diseñar controles accesibles por teclado/lector de pantalla, no usar autoplay y no reproducir ni descargar audio antes de una acción explícita.
- Probar con móvil y conexión limitada; conservar texto utilizable sin sonido.

**Puerta:** consentimiento de voz, transcripción cotejada con audio y revisión accesible antes de publicar. Los guiones del documento de narraciones son borradores, no aprobación de producción.

### Fase 5 — Piloto operativo antes de escalar

- Probar una o dos experiencias aprobadas con pasajeros reales, registrar consultas y problemas operativos sin recolectar ubicación del pasajero por defecto.
- Revisar si la secuencia es viable, si las condiciones se entienden y si la tarifa cubre costos reales.
- Solo con evidencia y decisión del dueño, considerar variantes, proveedores coordinados, páginas por chofer, QR o nuevas funciones.

## Regla de publicación

Un precio observado de un tercero no es precio de BA en Ruta. Una parada sugerida no es reserva. Un itinerario orientativo no es una salida confirmada. Un guion escrito no es una experiencia de audio publicada. Publicar solo después de que el dueño confirme la condición concreta y se haya verificado la información variable para el caso correspondiente.

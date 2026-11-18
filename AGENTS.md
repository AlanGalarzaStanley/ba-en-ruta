# BA en Ruta — blueprint del proyecto e instrucciones para agentes

**Este archivo es la memoria canónica de producto para agentes y colaboradores.** Existe para que cada sesión —aunque cambie de agente, cuenta o contexto— entienda qué producto está construyendo, por qué se toman sus decisiones y qué no debe asumir. No es una lista automática de tareas ni una autorización para cambiar el alcance.

## Entrada obligatoria para una sesión nueva

1. Leer este archivo completo antes de proponer o hacer cambios.
2. Leer `CLAUDE.md` para el mapa técnico del código y los comandos vigentes.
3. Revisar `docs/ESTADO.md` y `docs/RELAY.md` solo para conocer el estado operativo reciente; ambos son registros que pueden quedar desactualizados.
4. Leer las fuentes de detalle de la sección «Mapa de documentos» cuando la tarea las toque y comprobar el código actual en `main`.
5. Antes de actuar, revisar la petición actual del dueño, la rama y el estado de Git. La tarea presente manda sobre el backlog; no continuar trabajo ajeno por inercia.

## Qué es el producto

BA en Ruta ofrece **traslados privados y recorridos personales por Buenos Aires**, coordinados directamente con un chofer local. Su valor no es el asiento, los kilómetros, una lista de monumentos ni una aplicación que reemplaza a la persona. El vehículo hace posible la experiencia; la diferencia es que alguien local responde, interpreta el contexto, explica lo que importa y adapta el día al pasajero.

La idea que debe guiar el producto es **«un amigo local en Buenos Aires»**: una presencia humana, confiable y concreta que lleva, cuenta y ayuda a armar el día con criterio local. No significa fingir amistad, intimidad o una relación previa. Es una forma de expresar cercanía, confianza, lectura del contexto y trato directo, sin intermediarios.

**Promesa de marca:** «Tu destino. Tu ritmo. Mi Buenos Aires.» La persona visitante debería pensar «quiero conocer Buenos Aires con este tipo», no «quiero contratar otro tour genérico».

## Por qué existe esta dirección

El viajero puede conseguir un traslado genérico, abrir un mapa o sumarse a un tour masivo. Lo que le cuesta resolver es cómo moverse con confianza, qué secuencia tiene sentido para ese día, qué depende del tráfico o del clima y qué vale la pena según su energía e intereses. BA en Ruta convierte ese criterio local y la conversación directa en una propuesta útil.

La página tiene que reducir incertidumbre y facilitar una primera conversación real. Enumerar todas las funciones, paradas, servicios y paquetes de una vez genera carga administrativa y esconde la persona que da valor al servicio. Por eso la home actual es breve y orientada a conversión; no debe volver a convertirse en un catálogo extenso sin una decisión explícita del dueño.

La guía, los mapas, las rutas y la tecnología preparan y amplifican la relación humana; no deben sugerir que una pantalla sustituye al chofer, garantiza una experiencia espontánea o ya confirma una reserva.

## Experiencia pública vigente

En `/`, la experiencia principal es una página corta: hero con la promesa, manifiesto de vida porteña, cinco recorridos diferenciados, presentación de quién conduce, FAQ y cierre/contacto. Los llamados a la acción llevan a una consulta por WhatsApp. La app también permite explorar un simulador de recorrido; `?recorrido=<id>` abre un itinerario y `&parada=N` enlaza a una parada. El simulador es apoyo para imaginar el trayecto, no una compra ni una garantía del itinerario real.

La web ofrece español, inglés y portugués de Brasil (`?lang=es|en|pt`). Debe conservarse el mismo significado comercial en los tres idiomas. Cuando se agregue o cambie texto visible, actualizar las tres variantes y mantener las pruebas de paridad. El idioma indicado por URL prevalece sobre la preferencia guardada.

La estructura y el texto exactos de la home viven en `src/App.tsx` y sus componentes/copy actuales. La decisión editorial más reciente está en `docs/DIRECCION-2026-11-17.md` y complementa este blueprint.

### Catálogo no equivale a oferta pública

El repositorio conserva un catálogo de nueve paquetes y contenido más amplio (`src/lib/packages.ts`, `packages-copy.ts` y documentos de investigación), pero la grilla de paquetes fue retirada de la home para priorizar los recorridos y la conversación. No volver a montarla, añadir una sección larga ni presentar el catálogo de código como oferta vigente solo porque exista. Una página comercial nueva requiere una decisión del dueño y datos operativos confirmados.

Las cinco propuestas actuales son `historica`, `clasica`, `gastronomica`, `futbolera` y `tigre-delta`. Deben conservar propósitos distintos; no apilar las mismas postales en cada una ni convertir variantes en recorridos nuevos sin una razón de producto. `docs/INVESTIGACION-RECORRIDOS-2026-11-15.md` contiene el detalle investigado y sus incertidumbres, no una autorización automática para publicar todos sus datos.

## Cómo funciona el servicio y qué significa una consulta

1. El visitante conoce el enfoque y compara recorridos orientativos.
2. Elige un recorrido o pide una adaptación mediante un CTA.
3. WhatsApp abre un mensaje contextual para iniciar la conversación directa.
4. El dueño confirma por separado disponibilidad, condiciones, inclusiones, monto y reserva.

Los mensajes de la web deben describir el contacto como **consulta/cotización**, nunca como reserva confirmada. No inventar confirmaciones, cobros o capacidades de agenda que el sistema no implementa. El modelo actual no tiene backend ni base de datos: la web estática inicia el contacto externo de WhatsApp.

### Frontera comercial obligatoria

Separar con claridad lo que aporta el servicio del chofer y lo que el pasajero consume o compra. Comidas, bebidas, mate, entradas, navegación, propinas, reservas, estacionamiento, peajes, esperas adicionales y suplementos **no están incluidos por defecto**; solo pueden describirse de otra manera cuando exista una política del dueño confirmada y aplicable. Una recomendación de restaurante no significa que haya reserva, mesa, precio o disponibilidad garantizados.

La web conserva los precios `USD 50` para media jornada y `USD 100` para día completo, registrados en `src/lib/packages.ts` como indicados por el dueño el 18-10-2026. Esta continuación los mantiene sin cambios y no los extiende a otras duraciones o extras; su vigencia y aplicación exacta a las nuevas secuencias no se revalidaron. No alterarlos ni extrapolarlos sin decisión del dueño. Radio y horarios de operación, capacidad/equipaje, política de espera, peajes y estacionamiento, anticipo, cancelación, acompañamiento a pie y servicios adicionales siguen siendo decisiones comerciales del dueño. Mantener vacíos o indicar «a confirmar» antes que inventar. No convertir precios observados de proveedores en precio del servicio, y fechar/etiquetar cualquier precio externo que se publique.

## Verdad editorial, seguridad y confianza

- No inventar precios, horarios, enlaces, cuentas, biografías, datos históricos, licencias, reservas, entradas, disponibilidad, servicios o resultados de búsqueda. Para datos variables, comprobar fuentes oficiales/directas y dejar fecha y límites claros.
- Las escenas locales —fútbol, mate, asado, tango, clubes, barrios y vida cotidiana— son señales de una mirada porteña, no espectáculos garantizados ni estereotipos sobre toda la ciudad o sus habitantes.
- Lo espontáneo depende de clima, hora, seguridad, tránsito, disponibilidad, contexto y decisión del pasajero. Ofrecer opciones, explicar alternativas y respetar un «no».
- Nunca asociar alcohol con conducir. Si se menciona, que sea después de estacionar y con consumo responsable.
- No prometer acceso a vestuarios, jugadores, hinchadas, entradas, mesas, navegación, reservas o zonas restringidas sin confirmación explícita del proveedor.
- Usar imágenes con licencia y atribución visible cuando corresponda. No tomar fotos de Instagram ni imágenes de terceros sin permiso. Si una imagen concreta no está disponible con derechos, dejar el pendiente en vez de sustituirla engañosamente.
- En narración, tono humano, local y conciso: contexto útil, no una clase leída ni una voz que pretenda representar a todos.

## Marca y experiencia de interfaz

La identidad vigente combina navy, crema y dorado, con Fraunces y DM Sans en el código. Debe sentirse cálida, editorial, porteña y confiable, no como una plantilla de agencia masiva ni como un dashboard. Mantener foco en lectura rápida, móvil, jerarquía clara, CTA visible y poca carga cognitiva.

El lenguaje es directo, cercano y concreto. Preferir «traslado», «recorrido», «parada», «consulta» y «cotización». Evitar hipérboles, urgencia falsa, tecnicismos al visitante y frases que oculten exclusiones. Decir qué se sabe, qué es orientativo y qué hay que confirmar.

La interacción debe servir al viajero y respetar accesibilidad: foco visible, navegación entendible, diseño responsive, movimiento reducido y estados legibles. No agregar seguimiento, recolección de datos personales o dependencias de terceros innecesarias. Hoy los datos de la consulta solo se envían cuando el visitante elige abrir WhatsApp; una propuesta que cambie esa frontera requiere diseño y decisión explícitos.

## Qué está dentro y qué no es automáticamente el producto

**Núcleo actual:** página pública de BA en Ruta, cinco recorridos, contacto por WhatsApp, contenido trilingüe, presentación del conductor, FAQ y simulador de recorrido asociado a los itinerarios.

El código también contiene paquetes, gastronomía, mapa, tenants `/c/:slug`, QR de chofer, inscripción de conductores, reproductor de experiencias y otros experimentos. Su existencia en una rama, documento o módulo no implica que estén activos en la home, listos para operar, aprobados comercialmente o autorizados para priorizarse. Verificar `src/App.tsx`, `src/lib/tenant.ts`, `docs/REPLICATOR.md` y `docs/PILOTO-CHOFERES.md` para cada petición. `ExperiencePlayer.tsx` puede estar conservado sin estar montado. No reactivar un módulo oculto, una rama vieja o una propuesta de automatización por iniciativa propia.

La expansión a otros choferes/tenants, QR, modo en ruta, pagos, administración, reservas, analítica, dominio propio o sitios replicados es una línea potencial, no la promesa vigente de la home. Antes de iniciar, confirmar que el dueño lo pide y que el modelo operativo, los datos y los responsables están definidos.

## Principios para decidir cambios

Antes de construir una función, responder: **¿refuerza el valor humano que seguirá siendo diferencial —confianza, criterio local, conversación o adaptación— o solo maquilla el traslado con más pantallas?** Si solo añade complejidad, filtros, GPS, animaciones o catálogo sin reducir una fricción humana, no es prioridad por defecto.

Para copy, una persona debe poder entender antes de escribir: qué hace el chofer, qué tipo de recorrido puede pedir, qué es orientativo y qué debe pagar/confirmar aparte. Para una experiencia nueva, explicar a quién ayuda, qué incertidumbre elimina y qué promesa nueva introduce.

Priorizar, en este orden: verdad y confianza comercial; claridad de la primera conversación; calidad del criterio local; usabilidad móvil/accesible; estabilidad, rendimiento y mantenibilidad; expansión solo cuando haya demanda y operación confirmadas.

## Contrato técnico del repositorio

- Frontend estático: Vite 7, React 19, TypeScript estricto, Tailwind CSS 4; Leaflet/OpenStreetMap para mapas cuando estén activos; dependencias declaradas en `package.json`.
- Sin backend ni base de datos en el modelo actual. WhatsApp es una salida externa iniciada por el usuario.
- Vercel despliega `main` a producción; los branches/PRs producen previews. No confundir un preview con producción.
- GitHub Actions ejecuta instalación reproducible, auditoría de dependencias, typecheck, unit tests, build y E2E. El job E2E usa `ubuntu-24.04` para compatibilidad de Playwright/Chromium; no volver a `ubuntu-latest` sin verificar que la versión de Playwright soporte la imagen actual del runner.
- La CSP y las cabeceras están en `vercel.json` y se reproducen en `vite.config.ts`; al añadir un host externo necesario (imagen, iframe o fetch), revisar y ajustar ambas configuraciones según corresponda.
- Cambios de ruta deben mantener `public/manus-routes.json` sincronizado y probarlo cuando aplique. Cambios de traducción deben mantener paridad ES/EN/PT.
- Fuentes técnicas y mapa de módulos: `CLAUDE.md`. Los detalles de implementación del día están en el código actual, no en un resumen antiguo.

Comandos de referencia: `npm ci`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`; `npm run test:links` cuando se cambien enlaces o información de proveedores. Confirmar los scripts actuales en `package.json` antes de asumir que existen.

## Mapa de documentos y precedencia

Usar los documentos por función y fecha; no mezclarlos como si todos fueran órdenes vigentes:

- `AGENTS.md` (este archivo): intención del producto, decisiones no negociables, lectura obligatoria y reglas para agentes.
- `CLAUDE.md`: guía técnica/módulos y comandos; debe apuntar a este blueprint.
- `docs/DIRECCION-2026-11-17.md`: decisión más reciente sobre la home corta y el criterio editorial actual.
- `docs/POSICIONAMIENTO-VALOR-HUMANO.md`: tesis de diferenciación y experiencia del servicio; contexto estratégico.
- `docs/INVESTIGACION-RECORRIDOS-2026-11-15.md`: propuesta detallada de recorridos, fuentes y límites; revisar vigencia, permisos y datos antes de publicar.
- `docs/INVESTIGACION-REFERENTES-INMERSIVOS-TURISMO-2026-11-18.md`: comparación internacional y propuestas de interacción/medios; contexto de inspiración, no decisión de producto ni autorización para incorporar 360°, WebGL, audio, GPS o nuevas funciones.
- `docs/PROPUESTA-EXPERIENCIAS-GENUINAS-2026-11-17.md`: dirección editorial de los cinco recorridos aprobada por el dueño el 17-11-2026; es una guía para copy y secuencias, no confirma disponibilidad, reservas, accesos, precios ni operación de terceros.
- `docs/SISTEMA-NARRACIONES-BA-EN-RUTA-2026-11-17.md`: formato y seis guiones aceptados como borradores por el dueño; no implica audio o controles implementados, autorización para grabar una voz específica ni aprobación de cada locución final.
- `docs/OPERACION-Y-ROADMAP-2026-11-17.md`: separación entre precios externos observados, decisiones del dueño y etapas de trabajo; los importes allí citados requieren revalidación antes de usarse. La aprobación editorial no resuelve datos comerciales u operativos pendientes.
- `docs/ESTADO.md`: fotografía verificable de producción y pruebas a la fecha indicada; al cambiar la fecha, actualización, deployment o CI, actualizarlo.
- `docs/RELAY.md`: handoff de un loop de agentes/automatización. Sirve para saber cuál tarea estaba en curso; no define el producto ni sustituye instrucciones del dueño. Verificar el estado real en GitHub/Vercel.
- `docs/PRODUCTO-END-TO-END.md`, `docs/ARQUITECTURA-INFO.md` y `roadmap.md`: documentos anteriores/propuestas con partes que pueden contradecir la dirección de noviembre de 2026. Son archivo de contexto, no backlog ejecutable. Revalidar cada idea con este blueprint y la petición actual.
- `docs/PAQUETES.md`, `docs/PILOTO-CHOFERES.md`, `docs/REPLICATOR.md`, `docs/VIDA-PORTENA.md`, `docs/AUDIO-GUIONES.md` y auditorías: detalles temáticos; no convierten una idea o investigación en disponibilidad comercial confirmada.

Si dos documentos discrepan, aplicar este orden: (1) instrucción explícita actual del dueño; (2) este blueprint y decisiones posteriores aprobadas por el dueño; (3) dirección de producto fechada más reciente; (4) comportamiento del código en `main` y el deployment de producción para describir lo que existe; (5) documentos operativos por su fecha; (6) propuestas y notas antiguas. El código muestra qué se implementó, no necesariamente qué se debe vender. Si una contradicción cambia una promesa comercial o la experiencia central, detenerse y preguntar al dueño en vez de elegir en silencio.

## Protocolo de trabajo de agentes

- Ser autónomo en diagnóstico, cambios acotados, pruebas y PRs dentro de la petición. No transformar una solicitud puntual en un rediseño o en una expansión del negocio.
- Leer el estado real de GitHub/Vercel antes de repetir trabajo. No asumir que una nota RELAY vieja está todavía pendiente ni que un archivo local equivale a un checkpoint remoto.
- Preferir un branch y una PR pequeña; nunca force-push ni reescribir historia. Integrar/publicar solo dentro de la autorización de la petición actual y después de validar los checks pertinentes.
- No hacer cambios destructivos, cambios de permisos/costos, migraciones con efectos reales ni acciones comerciales en nombre del dueño sin autorización explícita.
- Al terminar un cambio de producto, validar typecheck, pruebas, build y E2E afectadas; verificar deployment si la tarea incluye publicación. Actualizar `docs/ESTADO.md` cuando cambie un hecho operativo verificable. Actualizar este blueprint solo cuando haya una decisión duradera del dueño, no para cada detalle de implementación.
- Entregar un resumen claro: qué cambió, qué queda pendiente y qué fue verificado. No decir que está publicado hasta confirmar Vercel `READY` sobre el commit esperado.

## Decisiones que pertenecen al dueño

No completar por inferencia: tarifa del chofer; espera, peajes y suplementos; capacidad/vehículo y zonas; cancelación, anticipo y forma de pago; nombre/foto y biografía real; idiomas de servicio; qué incluye el acompañamiento; reservas o proveedores; permisos de imágenes; dominio; y si los paquetes/tenants/automatizaciones deben convertirse en producto visible. Una opción técnica puede prepararse como propuesta, pero no presentarse como política acordada.

---

**Regla de memoria:** cuando el dueño cambie una decisión que afecte el producto, actualizar aquí la regla y, si corresponde, el documento detallado que la fundamenta. Mantener las notas históricas para trazabilidad y rotularlas como históricas; no permitir que compitan silenciosamente con este blueprint.

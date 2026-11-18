# Informe final: modelos de movilidad, control del conductor y canales directos

**Para:** dueño de BA en Ruta
**Fecha de corte de la comparación:** 18 de noviembre de 2026
**Propósito:** decidir si BA en Ruta y DriverAI deben fusionarse y qué experimento de bajo riesgo puede validar una vía de demanda directa.

## Conclusión ejecutiva

**Recomendación: no fusionar BA en Ruta y DriverAI como un único producto, negocio o app.** Mantenerlos como proyectos separados, con una interfaz limitada de colaboración: BA en Ruta puede explorar si sus consultas editoriales/directas generan demanda de traslados que operadores identificados puedan atender; DriverAI puede seguir evaluándose como herramienta de apoyo a decisiones del chofer, sin asumir que ya es un canal de reservas o despacho. Esta separación refleja la diferencia funcional descrita en el encargo: BA en Ruta es un canal editorial y de consultas por WhatsApp, mientras DriverAI es un copiloto que no acepta ni despacha viajes y aún no ha validado en teléfono real la lectura de ofertas de Uber y la voz TTS. [1]

Los casos comparados no demuestran que una app de chofer, por sí sola, cree clientela propia. Los SaaS white-label facilitan que un operador gestione su marca, reservas y despacho, pero las fuentes revisadas no acreditan que esos proveedores entreguen demanda generalizada; los marketplaces sí conectan o agregan oferta y solicitudes, pero normalmente retienen el canal, la interfaz y parte del control de asignación; y los operadores/cooperativas que conservan su marca también asumen la operación y la tarea de captar pasajeros. [2][3][4][5][6][7][8]

El planteo de “evitar parte de las comisiones” debe dividirse en dos preguntas: qué cargos se evitan al captar y cobrar una reserva directa, y qué nuevos costos aparecen por marketing, atención, pagos, seguros, cumplimiento, seguridad y operación. La investigación comparativa no publica una economía unitaria trasladable a BA en Ruta; tampoco aporta una tasa local verificable que permita calcular cuánto ahorraría un chofer argentino. [1][6][7][8]

## Comparación compacta de los doce casos

“Control del chofer” distingue la agencia individual del conductor de la propiedad colectiva de una organización; “cliente” señala quién parece controlar el canal o la relación comercial según la evidencia disponible, no una conclusión universal sobre titularidad jurídica de datos. El estado y los importes son los publicados o reportados en las fuentes citadas, no auditorías independientes salvo que así se indique. [2][3][4][5][6][7][8][9][10][11][12][13][14][15][16][17][18][19][20][21][22][23][24][25][26]

| Caso (arquetipo) | Control del chofer | Relación con el cliente | Monetización publicada | Evidencia / límite principal |
|---|---|---|---|---|
| **The Drivers Cooperative / Co-op Ride** — cooperativa que combina app de viajes, despacho y líneas especializadas | Propiedad cooperativa y voto formal por miembro; no prueba control individual de precio, app o datos. | El viaje se pide por Co-op Ride/TDC; no se documenta que cada chofer retenga su cartera. | Comisión cooperativa publicada del 15%; existen además líneas de contratos/paratránsito, sin economía desglosada. | Sitio y app enlazados muestran oferta vigente, pero persiste incertidumbre pública sobre control de software/datos y escala efectiva; la investigación académica documenta una ruptura tecnológica previa. [2][3][4] |
| **Eva** — cooperativa histórica de ride-hailing, hoy entregas B2B y software de flota | El repartidor actual puede conectarse y aceptar/rechazar; el acuerdo vigente no demuestra derechos de voto o propiedad cooperativa. | En entregas, el comercio origina el pedido y retiene el canal de compra; Eva despacha. | Entrega con tarifa fija anunciada, 0% de comisión sobre ventas y sin suscripción mensual según su web; software de flota, precio posterior no publicado. | La operación actual no debe confundirse con su etapa histórica de viajes; no se publica el momento exacto en que terminó el ride-hailing. [5][6][7] |
| **Union Cab** — cooperativa operadora de taxi con marca, flota y despacho | Propiedad colectiva declarada de trabajadores; no hay evidencia de cartera individual por chofer. | Reserva y servicio son de Union Cab, por teléfono, web o app; no es un software neutral para choferes sueltos. | Tarifas de taxi, chárter, mensajería y cuentas; reparto, comisión y margen no publicados. | Evidencia de operación reciente y canales propios; los datos disponibles no detallan gobernanza vigente ni economía unitaria. [8][9] |
| **Taxis Libres** — red local de taxis, canales propios y movilidad corporativa | Autonomía contractual de horarios descrita, pero marca, canales y tarifas reguladas no son control individual del conductor. | Marca y reservas de Taxis Libres; combina app, teléfono, WhatsApp, web y demanda corporativa. | Rodamiento y servicios B2B; se halló una comisión histórica del 10% en app de conductor, pero no se verifica vigencia actual. | La alianza con Yango añade un canal, sin que la evidencia aportada confirme el alcance final de la integración a noviembre de 2026. [10][11][12] |
| **Curb** — red híbrida de taxis regulados, despacho y marketplace/API | El chofer elige disponibilidad y acepta; Curb/flota organizan oferta y cargos del canal. | Curb o la app asociada pueden controlar la interfaz de solicitud; el taxi/flota presta el transporte. | Cargos de servicio y reserva posibles; incluye comisiones Curb/flota en total al chofer, sin porcentajes publicados; también vende soluciones B2B. | Agrega demanda propia y de socios en una red habilitada; datos y escala son en buena parte declaraciones de la empresa. [13][14][15] |
| **inDrive** — marketplace bilateral de solicitud y negociación | Agencia acotada: aceptar, rechazar y contraofertar; no controla marca o reglas del mercado. | El usuario solicita y negocia dentro de inDrive; el proveedor presta el viaje según el aviso de plataforma. | Cargo al conductor como porcentaje variable por ubicación; la tasa argentina no se publica. | La negociación es verificable como mecánica de producto, pero no equivale a cartera propia ni hay desglose económico local. [16][17][18] |
| **Moovs** — SaaS para operadores de transporte con chofer | El operador fija precios, asigna y gestiona; la app del chofer ejecuta viajes y estados. | Portal/widget con marca del operador; Moovs vende software y marketing, no se presenta como marketplace general. | Suscripción y módulos publicados; también cargos de procesamiento y servicios de marketing. | Tablas públicas de precios presentan duplicaciones/inconsistencias; no prueban resultados ni derechos completos de datos. [19][20] |
| **Limo Anywhere** — SaaS vertical de reservas, dispatch y red B2B de afiliados | El operador controla marca, reservas y configuración; el chofer recibe viajes, ubicación y estados. | Cliente reserva con el operador en su canal; integraciones pueden incorporar pedidos externos, sin demostrar demanda general propia. | Suscripción, cargos por viaje y módulos; por ejemplo, se publica USD 1 por viaje nuevo de la integración Holiday Taxis. | El acuerdo de 2026 describe licencias y tratamiento de datos; tarifas y volumen efectivo no permiten inferir margen ni adopción independiente. [21][22] |
| **TaxiCaller** — SaaS B2B de despacho con apps de marca blanca | Control principalmente del operador; este puede limitar cambios de tarifa del chofer. | App rebranded, web y canales de reserva del operador; no se documenta demanda garantizada por TaxiCaller. | Precio publicado en EE. UU. de USD 28 por vehículo/mes; app rebranded tiene costo adicional no cuantificado allí. | Buen ejemplo de separar software del marketplace: el operador aporta la marca y debe captar la demanda. [23][24] |
| **Onde** — SaaS white-label para que un operador lance app y despacho | El operador administra precios, servicios y asignaciones; el chofer elige preferencias y acepta pedidos, con discreción tarifaria individual no plenamente especificada. | Marca y relación de servicio son del operador; Onde licencia software y conserva ciertos derechos sobre datos operativos/derivados. | Cuota inicial y mensual más revenue share no publicado; Onde.Light publica USD 12/mes y 1,9% por viaje sobre el límite incluido. | Paquetes de instalaciones/marketing son promocionales y no demuestran clientes activos ni reservas. [25][26][27] |
| **Juno** — marketplace privado histórico, cerrado | Incentivo en RSUs no equivalía a propiedad cooperativa, voto o control de plataforma. | Juno controlaba app y canal; al cerrar invitó a usuarios a Lyft, sin evidencia de transferencia de cuentas. | En su etapa temprana se reportó comisión anunciada del 10% y 100% de propinas; cifras históricas. | Gett anunció el cierre de Juno en NYC el 18-11-2019; el caso no sirve como modelo operativo vigente. [28][29] |
| **RideAustin** — marketplace local nonprofit histórico, cerrado | No hay prueba de propiedad o voto de los conductores; nonprofit no significa cooperativa. | Marca local asignaba viajes en sus apps; el código abierto posterior no transfirió la clientela. | Cobro de viajes y redondeo voluntario para donaciones; las fuentes reportan pagos históricos, no una economía vigente. | Anunció el fin de operaciones en junio de 2020; los registros tributarios posteriores no prueban reanudación del servicio. [30][31] |

### Lectura por arquetipo y decisión de diseño

**Cooperativa.** TDC y Union Cab muestran dos diseños distintos bajo una etiqueta común: TDC combina marca/app con despacho y servicios contratados, mientras Union Cab es un operador local que conserva servicio y canales propios. La propiedad formal puede dar voz colectiva, pero no prueba que cada chofer sea dueño de sus pasajeros, precio o datos. Los problemas de gobernanza y continuidad tecnológica reportados para TDC refuerzan que los derechos, el control del código y los acuerdos con proveedores deben documentarse, no presumirse. [2][3][4][8][9]

**SaaS white-label.** Moovs, Limo Anywhere, TaxiCaller y Onde venden infraestructura para operadores: reservas, apps, despacho y, en ciertos casos, branding y captación/marketing opcional. El operador puede retener la marca y configurar el flujo comercial, pero debe traer pasajeros o pagar por servicios de marketing/afiliación; eso no crea automáticamente demanda. El SaaS es la opción más cercana a “mi propia app”, pero normalmente la “propiedad” es de marca y relación comercial del operador, no del conductor individual, y el software sigue licenciado por un proveedor. [19][20][21][22][23][24][25][26][27]

**Storefront directo.** Una página o app con marca propia, formulario de reserva y WhatsApp permite convertir una consulta directa, pero es un canal, no una red de demanda. Para BA en Ruta, el storefront puede ser su web editorial y su atención directa; para un operador o chofer, sería un canal propio de reserva y seguimiento, sujeto a consentimiento y condiciones claras. Los casos de software muestran que se puede personalizar el canal, pero no acreditan que la personalización por sí sola genere solicitudes o resuelva despacho, pagos y cumplimiento. [1][19][20][23][24][25]

**Marketplace.** inDrive representa el modelo de negociación y matching; Curb añade una red de taxis habilitados y fuentes externas de demanda; Juno y RideAustin ilustran plataformas locales que dejaron de operar. El marketplace puede aportar solicitudes, pero también concentra la interfaz, las reglas de asignación y la relación de plataforma; tener la app de chofer no otorga control del cliente ni elimina costos de adquisición. No hay una tasa de comisión de Argentina en el material de inDrive que permita cuantificar un ahorro local. [13][14][15][16][17][18][28][29][30]

**Diferencia crucial:** “que los choferes creen una app propia” puede significar que cada uno venda su servicio en un storefront individual, que un operador compre SaaS white-label, que un grupo gobierne una cooperativa con despacho, o que se construya un marketplace que compita por ambos lados. Son productos y responsabilidades diferentes; no conviene llamar a todos “app propia” ni comparar solamente la comisión visible. [2][3][8][19][21][23][25]

## Aplicación a BA en Ruta y DriverAI

No fusionar ahora. **Compartible:** una hipótesis y medición de derivación de consultas de BA en Ruta hacia un servicio de traslado; un registro consentido de consultas y reservas; y una prueba de si DriverAI resulta útil al chofer como apoyo operativo, una vez validado en teléfono real. **Separado:** marca y contenido turístico de BA en Ruta; lógica y datos de DriverAI; cualquier despacho/aceptación de viajes, cartera de pasajeros o pagos, que no existen en el alcance actual de DriverAI según el contexto entregado. No presentar DriverAI como sustituto de Uber/Cabify/DiDi ni como vía ya disponible para captar o retener pasajeros. [1]

La decisión sobre comisiones debe esperar una contabilidad comparativa por viaje. Registrar, para un mismo servicio, cobro bruto, tarifa/cargo de plataforma, costos de adquisición, tiempo de gestión, procesamiento de pago, soporte, seguro/cumplimiento y monto neto al operador/chofer. En el contexto disponible no hay cifras de esos conceptos para BA en Ruta/DriverAI, ni base para afirmar ahorro neto o demanda garantizada. [1]

## BA en Ruta: completar “Sabores porteños” sin dispersar la propuesta

**“Sabores porteños” está incompleta si mezcla un ancla aún no validada con alternativas dispersas:** no se demuestra todavía que exista una experiencia coherente que conecte la promesa culinaria, el traslado y la consulta directa; sumar opciones heterogéneas no resuelve esa incertidumbre. Esta evaluación se limita al estado descrito en el encargo; el paquete no incluye el detalle del informe de inmersión ni la evidencia de validación del ancla, por lo que no se atribuyen preferencias o resultados a viajeros. [1]

Recomendación: investigar **un único arco culinario** antes de ampliar la página o promocionar alternativas. Definir una secuencia narrativa y geográfica con un comienzo, un momento gastronómico central y un cierre; validar con entrevistas o consultas reales si el arco se entiende, si el traslado agrega valor y si la gente pregunta/reserva. No inventar proveedores, disponibilidad, horarios, platos, duración ni modificar tarifas. Mantener alternativas fuera de la propuesta principal hasta que exista evidencia de que forman parte de un mismo recorrido vendible. [1]

**Conexión con el informe de inmersión existente:** usar este informe como capa de decisión de modelo y operación que se agrega al diagnóstico de inmersión, sin volver a narrarlo ni atribuirle hallazgos no incluidos aquí. El informe de inmersión debe seguir siendo la referencia para el conocimiento de cliente/territorio que ya haya levantado; en esta síntesis se propone convertirlo en una hipótesis comprobable: ¿un arco culinario único produce consultas calificadas de traslado y puede atenderse con una operación clara? El texto del informe de inmersión no fue adjuntado al conjunto de investigación recibido, así que no puedo citar ni verificar sus hallazgos específicos. [1]

## Piloto recomendado: validar canal directo, no lanzar marketplace

**Diseño de bajo riesgo:** probar una sola experiencia/arco culinario, con consultas por los canales actuales de BA en Ruta y coordinación manual con un operador/chofer que cumpla los requisitos aplicables. No construir todavía app de reservas, despacho, pagos propios ni cartera de pasajeros; no cambiar tarifas publicadas. En paralelo, mantener DriverAI en una prueba técnica separada y controlada, sin usar ofertas reales para decisiones operativas hasta validar lectura y TTS en teléfono real y aprobar controles de seguridad y privacidad. [1]

Antes de iniciar, documentar un **baseline y criterios go/no-go**, sin fijar ahora umbrales ficticios:

- **Demanda y adquisición:** número de consultas calificadas, origen del contacto, conversión consulta→cotización→reserva, costo de adquisición por consulta/reserva y repetición/referidos. Registrar periodo y denominador; no confundir clics o consultas con viajes pagados. [1]
- **Economía y operación:** ingreso cobrado, costo de vehículo/tiempo, costo de pago, horas de coordinación/soporte, margen neto por reserva completada, cancelaciones, demoras e incidencias. Comparar sólo servicios equivalentes y no inferir ahorro por comisión a partir de tarifas brutas. [1]
- **Valor para chofer y vínculo directo:** neto por hora de trabajo, proporción de solicitudes aceptadas, satisfacción de operador/chofer y pasajero, y proporción que acepta comunicaciones posteriores con consentimiento. No recopilar contactos para reuso sin base y permiso adecuados. [1]
- **DriverAI (track separado):** tasa de lectura correcta de ofertas, falsos positivos/negativos, latencia, claridad de voz, estabilidad y evaluación de usuario en teléfono real; empezar con datos de prueba/simulados y sin aceptar o despachar viajes. [1]

### Gates pendientes antes de ampliar

1. **Demanda:** validar que hay consultas suficientes y repetibles; la investigación de casos no valida la demanda de Buenos Aires ni del arco culinario. [1]
2. **Soporte:** asignar responsable, horario, canal de contingencia y capacidad para cambios/cancelaciones antes de prometer disponibilidad. [1]
3. **Seguros y regulación:** verificar con asesoría competente las condiciones aplicables a transporte, experiencias, habilitaciones, seguros y responsabilidades; no extrapolar legislación de Nueva York, Canadá, Colombia o EE. UU. a Argentina. [2][8][10][13]
4. **Pagos:** definir quién cobra, emite comprobantes, gestiona reembolsos/contracargos y soporta comisiones; los casos SaaS y de plataformas no proporcionan una tarifa local aplicable a BA en Ruta. [19][21][23][25]
5. **Seguridad:** definir verificación de prestadores, comunicación de datos del viaje, incidentes y escalamiento; no asumir que DriverAI tiene funciones de seguridad o despacho. [1]
6. **Privacidad:** especificar datos mínimos, finalidad, acceso, retención, eliminación, exportación y consentimiento para contactos posteriores; los ejemplos comparados muestran que roles y derechos dependen del canal y el contrato. [3][6][10][15][21][24][25]
7. **Adquisición de clientes:** decidir quién paga y ejecuta promoción, cómo se atribuye cada consulta y qué canal consigue al pasajero; ningún resultado de las páginas promocionales citadas sustituye la medición local. [1][20][25]

**Regla de decisión propuesta:** ampliar sólo si hay señales repetibles de consultas que se convierten en reservas, una operación atendible, margen calculable después de costos y todos los gates anteriores resueltos; si falla demanda o soporte, conservar BA en Ruta como canal editorial y no invertir en un marketplace. Esta es una recomendación de proceso, no una previsión de resultados. [1]

## Siguiente acción concreta

Preparar una ficha de piloto de una página para **un solo arco culinario**, y revisar en una sesión el informe de inmersión existente para completar sus incógnitas: ancla por validar, alternativa que encaja en el arco, responsable de atención, tarifa vigente sin cambios, requisitos de operador/seguro, mecanismo de pago, texto de consentimiento y tabla de métricas. No publicar ni prometer el piloto hasta cerrar los gates de demanda, soporte, seguros/regulación, pagos, seguridad, privacidad y adquisición. [1]

## Nota de implementación editorial — 18-11-2026

La rama de trabajo materializa ese arco como una sola ruta de Villa Crespo con una comida principal a elección entre tres locales del mismo barrio y una pausa de café opcional. Esto no significa que haya tres paquetes comerciales validados, que la demanda prefiera alguna alternativa o que la prueba piloto haya comenzado. La elección amplía el contexto para explorar el mismo recorrido; antes de promocionar una oferta concreta, el dueño debe elegir y validar un ancla, la operación, la disponibilidad y los criterios go/no-go descritos arriba.

## References

[1]: URL no disponible (contexto interno aportado para esta síntesis) "Brief BA en Ruta y DriverAI; el informe de inmersión existente no fue adjuntado".

[2]: https://drivers.coop/dfaq/who-owns-the-drivers-cooperative "Who owns The Drivers Cooperative?"

[3]: https://policyreview.info/articles/analysis/drivers-cooperative-new-york-city "The Blown Head Gasket Effect: Rise and struggles of The Drivers Cooperative in New York City"

[4]: https://drivers.coop/pricing "Pricing and fees"

[5]: https://eva.coop/ "Eva — sitio oficial"

[6]: https://eva.coop/driver-agreement "Entente des membres livreurs"

[7]: https://eva.coop/merchant "Livraison sur demande — página para comercios"

[8]: https://www.unioncab.com/About "About — Union Cab of Madison Cooperative"

[9]: https://www.unioncab.com/Featured-Services "Featured Services — Union Cab of Madison Cooperative"

[10]: https://www.taxislibres.com.co/doc-taxislibres/politica-de-terminos-y-uso-legales.pdf "Política de Términos y Uso Legales"

[11]: https://www.taxislibres.com.co/doc-taxislibres/politica-tratamiento-datos-taxis-libres.html "Política de Tratamiento de Datos — Taxis Libres App Conductor y Viajero"

[12]: https://www.forbes.co/negocios/taxis-libres-deja-atras-su-guerra-legal-con-plataformas-de-transporte-y-se-une-a-una-de-ellas "Taxis Libres deja atrás su guerra legal con plataformas de transporte y se une a una de ellas"

[13]: https://www.gocurb.com/post/curb-flow-more-trips-for-licensed-drivers "Curb Flow: More Trips for Licensed Drivers"

[14]: https://www.gocurb.com/faq-drivers "Frequently Asked Questions – Driver App"

[15]: https://www.gocurb.com/terms "Terms of Use | Curb"

[16]: https://indrive.com/en-ar/driver "Drive with us on your terms — inDrive Argentina"

[17]: https://indrive.com/en-in/help/passengers/how-fares-are-calculated "How fares are calculated?"

[18]: https://indrive.com/en-in/help/drivers/what-are-the-charges-and-service-payments "What are the charges and service payments?"

[19]: https://www.moovsapp.com/ "Moovs — Your All-in-One Transportation Software"

[20]: https://www.moovsapp.com/pricing "Moovs Pricing Plans for Transportation Operators"

[21]: https://www.limoanywhere.com/wp-content/uploads/2026/06/New-MSA_Limo-Anywhere-Software_03.05.2026-UPDATED-06.03.2026.pdf "Master Services Agreement"

[22]: https://www.limoanywhere.com/2026/10/21/holiday-taxis-integration/ "Holiday Taxis Integration"

[23]: https://www.taxicaller.com/us/en/pricing "Pricing | Dispatch software for taxi, limo and NEMT"

[24]: https://www.taxicaller.com/intl/en/features/passenger-app "Your own booking app for your customers"

[25]: https://onde.app/onde-terms-and-conditions "Standard Terms"

[26]: https://onde.app/pricing "Plans & Pricing"

[27]: https://light.onde.app/landing/ondelight-a-risk-free-dispatch-solution-for-your-taxi-business "Onde.Light: the best low-cost dispatch software"

[28]: https://www.prnewswire.com/il/news-releases/gett-announces-closure-of-juno-and-strategic-partnership-with-lyft-300960004.html "Gett Announces Closure of Juno and Strategic Partnership With Lyft"

[29]: https://techcrunch.com/2017/04/26/on-demand-ride-service-gett-confirms-acquisition-of-juno-for-200m/ "On-demand ride service Gett confirms acquisition of Juno for $200M"

[30]: https://www.statesman.com/story/special/2020/06/14/ride-hailing-nonprofit-rideaustin-to-shut-down/113739252/ "Ride-hailing nonprofit RideAustin to shut down"

[31]: https://projects.propublica.org/nonprofits/organizations/812765068 "Ride Share Austin — Nonprofit Explorer"

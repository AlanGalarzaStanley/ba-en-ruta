# BA en Ruta — Producto end-to-end

Generado 2026-10-18 a partir del repo (`feat/paquetes-marca` + `feat/modo-en-ruta`) y fuentes oficiales / tiempos de traslado verificables.  
Sin precios inventados. Sin rediseño de UI.

---

## 1. Estado actual vs pendiente

| Frente | Qué hay en el repo | Qué falta | Prioridad | Quién |
|--------|--------------------|-----------|-----------|-------|
| Paquetes comerciales (9) | `packages.ts`, `packages-copy.ts`, `PackagesSection.tsx`, FAQ 6–8, nav header/footer | Montos USD/ARS | P0 | Dueño |
| Quién te lleva | Bloque `#quien` + CTA WhatsApp | Nombre real + foto | P0 | Dueño |
| WhatsApp | Enquiry, tour, experience, **package**, about (fix en branch) | — | — | YA EN REPO |
| FAQ | 8 ítems (espera, idiomas, pago/cancelación genérica) | Ventana numérica de cancelación | P1 | Dueño |
| Guiones audio | `docs/AUDIO-GUIONES.md` (9 paradas) | Grabar voz | P0 | Dueño |
| Modo en ruta / Admin / Blob | Branch `feat/modo-en-ruta` (TourMode, AdminCodes, API) | Token R/W Blob + redeploy | P0 | Técnico / Dueño |
| Mapa / puntos | 8 places en `ba-config` con coords, visitMinutes, links oficiales | — | — | YA EN REPO |
| Branding / tono | Copy ES/EN/PT coherente; paquetes humanizados | Manual formal (abajo) | P1 | IA (este doc) |
| Deploy / merge | `main` = prod; paquetes solo en branch | Merge paquetes + modo-en-ruta → main | P0 | Técnico |
| Dominio propio | vercel.app | Opcional post-comercial | P2 | Dueño |

**Branches:** `main` · `feat/paquetes-marca` (HEAD con paquetes + fix WA + nav) · `feat/modo-en-ruta`.

---

## 2. Matriz de recorridos y tiempos

Tiempos de **auto particular** en CABA (estimado; hora pico +30–60 %). Fuentes: distancias locales, Rome2Rio, guías de traslado Ezeiza 2025–2026, Ruta0 Tigre.

### Transfer aeropuerto (paquete TR)

| Tramo | Distancia | Tiempo normal | Hora pico / lluvia | Nota |
|-------|-----------|---------------|--------------------|------|
| Ezeiza → Microcentro / Puerto Madero | ~33 km | 45–55 min | hasta 1 h 30 | Peajes incluidos en cotización |
| Ezeiza → Palermo / Recoleta | ~35 km | 50–60 min | hasta 1 h 30 | |
| Ezeiza → La Boca / San Telmo | ~30–35 km | 45–60 min | hasta 1 h 20 | |
| Aeroparque → centro | ~7–10 km | 20–35 min | 40–55 min | Más corto |

Espera incluida en copy del sitio: **60 min aeropuerto** desde aterrizaje efectivo · **15 min hotel**.

### Itinerario histórico (San Telmo → Caminito → Bombonera)

| Tramo | Traslado auto | Parada a pie sugerida | No perder | Nota |
|-------|---------------|----------------------|-----------|------|
| Hotel centro → Plaza de Mayo / San Telmo | 10–20 min | 45–90 min | Casa Rosada, Cabildo; domingo feria | Domingo: más gente y cortes |
| San Telmo → Caminito | 10–15 min | 45–60 min | Calle museo ~150 m, fachadas | Cuidar pertenencias |
| Caminito → Bombonera | **3–8 min** (casi a pie) | 45–75 min (museo si hay entrada) | Entorno Brandsen; museo oficial | Día de partido: planificar con anticipación |

Duración total orientativa del bloque sur: **3,5–5 h** (paquete IT-HIST / futbolera).

### Itinerario clásico (Obelisco/Colón → Recoleta → Palermo)

| Tramo | Traslado auto | Parada a pie | No perder | Nota |
|-------|---------------|--------------|-----------|------|
| Centro → Obelisco / Colón | 5–15 min | 20–40 min | Fachada Colón; foto Obelisco | Entradas Colón: canal oficial |
| Obelisco → Recoleta | 10–15 min | 45–60 min | Cementerio (Evita + arquitectura) | Visitas turísticas: lun–dom ~9–17 (GCBA) |
| Recoleta → Palermo (Bosques / Soho) | 10–20 min | 45–75 min | Rosedal / lagos o gastronomía | Cierre suave del día |

Duración orientativa: **4–5,5 h** (IT-CLAS).

### City tour 4 h / 8 h

- **4 h:** 3–4 paradas (ej. Plaza de Mayo + San Telmo + Caminito **o** Obelisco + Recoleta + Palermo). Ritmo apretado.
- **8 h:** 5–6 paradas + pausa comida (pago del pasajero). Incluye margen de tráfico y fotos.

### Tigre y Delta (IT-TIG)

| Tramo | Distancia | Tiempo normal | Pico | Nota |
|-------|-----------|---------------|------|------|
| Centro CABA → Tigre | ~35–45 km | 30–45 min | 50–70 min | Peajes posibles |
| Estancia en Tigre | — | 2–4 h | — | Navegación = prestador local (aparte) |
| Regreso | igual | igual | — | Si hay vuelo el mismo día: salir con margen |

Día completo ida y vuelta: **6–8 h** de servicio.

### visitMinutes del repo (simulador)

caminito 60 · bombonera 75 · san-telmo-plaza 90 · recoleta 60 · palermo 75 · puerto-madero 45 · obelisco-colon 45 · tigre 180.

---

## 3. Guiones de audio a bordo (60–90 s)

Alineados a `docs/AUDIO-GUIONES.md` + fuentes oficiales (turismo BA, GCBA, Infobae/historia Caminito). Tono local, sin marketing vacío.

### Caminito — [LISTO PARA GRABAR]
Llegamos a Caminito, en La Boca. Esta calle museo de casi ciento cincuenta metros es de las más fotografiadas de la ciudad. El trazado curvo viene de un antiguo arroyo y, después, de un ramal ferroviario que dejó de usarse. La puesta en valor, con vecinos y artistas, tuvo un impulsor clave: Benito Quinquela Martín, que propuso el nombre del tango Caminito. Curiosidad: la letra del tango no habla de La Boca; nació como poema de un sendero en La Rioja. Mirá las fachadas de chapa de colores y el ambiente de conventillo. Tip: cuidá pertenencias en la zona más concurrida; de día es el momento más cómodo.

### Plaza de Mayo — [LISTO PARA GRABAR]
Esta es la Plaza de Mayo, el centro histórico del poder y de la vida pública argentina. Alrededor tenés la Casa Rosada, el Cabildo y la Catedral. No hace falta un discurso largo: en unas pocas cuadras se leen siglos de historia política. Si hay acto o corte, adaptamos la ruta. Tip: la foto clásica suele ser hacia la Casa Rosada; si hay vallas, buscamos el mejor ángulo sin forzar.

### San Telmo — [LISTO PARA GRABAR]
San Telmo concentra el casco antiguo: calles angostas, balcones y, los domingos, la feria. Es buen lugar para bajar del auto y caminar una cuadra con calma. Si buscan tango de esquina o anticuarios, digan y ajustamos el tiempo; si prefieren seguir hacia La Boca, estamos a pocos minutos. Tip: el domingo la feria llena las calles; conviene llegar temprano o aceptar el ritmo más lento.

### La Bombonera — [LISTO PARA GRABAR]
El entorno de la Bombonera es identidad de barrio y de club. Boca Juniors no es solo un estadio: es una marca cultural de Buenos Aires. Para entrar al museo o a una visita oficial hace falta disponibilidad y entradas del prestador oficial; nosotros acercamos y coordinamos tiempos. Tip: los días de partido el tránsito cambia por completo; lo planificamos con anticipación. Desde Caminito estamos a pocos minutos a pie o en auto.

### Cementerio de la Recoleta — [LISTO PARA GRABAR]
El Cementerio de la Recoleta se abrió en mil ochocientos veintidós como primer cementerio público de la ciudad. Más de noventa bóvedas son Monumento Histórico Nacional. La visita más buscada es la de Eva Perón, pero el valor también es arquitectónico: mármoles y panteones de cuando las familias competían por dejar huella. Es un lugar de respeto: voz baja, sin picnics. Tip: las visitas turísticas suelen ser de mañana a tarde; confirmamos el horario del día del servicio con la información oficial de la Ciudad.

### Obelisco / Teatro Colón — [LISTO PARA GRABAR]
El Obelisco marca el cruce simbólico de la ciudad sobre la Nueve de Julio. A pocas cuadras, el Teatro Colón es una de las grandes salas líricas del mundo y un patrimonio arquitectónico con agenda propia. Las entradas al Colón se gestionan por canales oficiales; desde el auto alcanza para ubicar el edificio y decidir si quieren bajar. Tip: si hay tiempo, una foto del Colón de frente vale más que forzar una visita sin entrada.

### Palermo — [LISTO PARA GRABAR]
Palermo es el gran pulmón verde y el barrio de la vida cotidiana a cielo abierto: parques, lagos y, hacia Soho u Hollywood, gastronomía y diseño. Sirve de cierre suave después del centro o de pausa si el día vino intenso. Tip: si quieren solo foto en los bosques o también una parada para comer, lo definimos sobre la marcha; el tráfico interno de Palermo cambia mucho entre semana y fin de semana.

### Puerto Madero — [LISTO PARA GRABAR]
Puerto Madero es la reconversión del viejo puerto en barrio de diques y torres. El contraste con el centro histórico se ve en pocos minutos. El Puente de la Mujer es el ícono visual más buscado. Tip: es un tramo cómodo para circular y para bajar el ritmo del tour; si el día está ventoso, el puente se siente más.

### Tigre / Delta — [LISTO PARA GRABAR]
Tigre y el Delta cambian el paisaje: ríos e islas a poca distancia de la capital. El traslado ida y vuelta lo hacemos nosotros; si quieren navegación, se coordina con prestadores locales. Tip: conviene salir temprano y mirar el clima. Si hay vuelo el mismo día, el regreso se agenda con margen generoso.

---

## 4. Mapa de puntos imperdibles

Todos ya existen en `ba-config` (PlaceId). Prioridad comercial:

| id | Nombre | Por qué imperdible | Paquetes |
|----|--------|--------------------|----------|
| caminito | Caminito | Postal más reconocible del sur | hist, fut, tour4/8 |
| bombonera | La Bombonera | Identidad futbolera / barrio | fut, hist |
| san-telmo-plaza | Plaza de Mayo / eje histórico* | Poder + historia en un punto | hist, clas, tour |
| recoleta | Cementerio Recoleta | Arquitectura + Evita | clas, tour |
| obelisco-colon | Obelisco / Teatro Colón | Ícono + patrimonio lírico | clas, tour |
| palermo | Palermo | Verde + gastronomía | clas, gast, tour8 |
| puerto-madero | Puerto Madero | Contraste moderno | tour, clas |
| tigre | Tigre | Cambio de paisaje / día completo | tig |

\*En el repo el id `san-telmo-plaza` concentra el eje histórico (coords y copy orientados a Plaza de Mayo / casco); San Telmo barrio se trabaja en el mismo bloque del itinerario histórico.

---

## 5. Manual de marca (corto)

**Promesa:** Traslados y recorridos privados en Buenos Aires, coordinados directo por WhatsApp, con ritmo local y sin intermediarios.

**Qué somos:** Chofer particular + experiencia de ciudad a medida.  
**Qué no somos:** Agencia masiva, bus turístico, app de taxi genérica, guía oficial de museo.

**Tono:** Claro, cercano, concreto. Sin hipérboles (“la mejor experiencia del mundo”). Sí: fechas, tiempos, qué incluye / no incluye.

**Do (ejemplos WhatsApp buenos)**  
1. “Hola, soy [Nombre]. Para el transfer del viernes 24 desde Ezeiza a Palermo: ¿cuántos pasajeros y cuántas valijas?”  
2. “El city de 4 h puede ser sur (San Telmo–Caminito) o norte (Recoleta–Palermo). ¿Qué prefieren?”  
3. “Incluye vehículo, peajes del trayecto y hasta 60 min de espera en aeropuerto. Entradas al museo van aparte.”  
4. “Confirmado por escrito: fecha, horario, punto de encuentro y monto. Esto cierra la reserva.”  
5. “Si el vuelo se demora, avisame y espero dentro de la franquicia; después acordamos.”

**Don’t (malos)**  
1. “¡La experiencia única e inolvidable de tu vida en BA!”  
2. Precios publicados sin fecha ni condiciones.  
3. “Garantizamos entrada al museo” sin disponibilidad oficial.

**Vocabulario preferido (ES):** traslado, recorrido, parada, cotización, consulta (no “booking” hasta confirmar), peajes, espera, idioma a bordo.

**CTAs:** Cotizar este paquete · Escribime por WhatsApp · Consulta (no reserva confirmada).

**Quién te lleva (plantilla):**  
“Soy [NOMBRE], chofer en Buenos Aires. Coordino traslados y recorridos privados por WhatsApp: sin intermediarios y con el ritmo que ustedes elijan. Contame la fecha y lo armamos.” + foto profesional simple.

---

## 6. Plantillas WhatsApp operativas

### Cotización de paquete (ES)
```
¡Hola! Quiero cotizar el paquete: [CÓDIGO] — [TÍTULO].
Fecha:
Hotel / zona de pick-up:
Pasajeros:
Idioma: ES
Esto es solo una consulta — no una reserva confirmada.
```
(EN/PT ya en `whatsapp.ts`.)

### Consulta general
```
¡Hola! Vi BA en Ruta y quiero consultar por un traslado o recorrido privado. Idioma: ES. Esto es solo una consulta.
```

### Confirmación de reserva (dueño completa montos)
```
Confirmamos:
- Servicio: [paquete/código]
- Fecha y hora:
- Punto de encuentro:
- Pasajeros / equipaje:
- Incluye: […]
- No incluye: […]
- Monto total: [A COMPLETAR] (ARS/USD)
- Forma de pago: [A COMPLETAR]
- Cancelación: aviso con al menos [X] horas; si no, [condición]
Queda reservado al confirmar este mensaje.
```

### Reprogramación / cancelación
```
Hola, necesito reprogramar / cancelar el servicio del [fecha].
Motivo (opcional):
Nueva fecha preferida (si aplica):
```

---

## 7. Checklist técnico de cierre

1. [ ] Vercel → Storage → Blob del proyecto `ba-en-ruta`: conectar con **Add read-write token** y Preview + Production.  
2. [ ] Redeploy de `feat/modo-en-ruta` (o merge primero y redeploy main).  
3. [ ] Probar `/admin` y flujo de códigos GPS.  
4. [ ] Merge `feat/paquetes-marca` → `main` (PR o merge local).  
5. [ ] Smoke test prod: home, `#paquetes`, `#quien`, CTA WhatsApp, idiomas `?lang=en|pt`.  
6. [ ] Variables: número WhatsApp (`WHATSAPP_NUMBER` / tenant) verificado.  
7. [ ] (Opcional) Dominio propio + DNS a Vercel.

---

## 8. Lista final del dueño

- [ ] Definir precios (USD y/o ARS) por paquete TR, TOUR-4, TOUR-8, HORAS, IT-HIST, IT-CLAS, IT-GAST, IT-FUT, IT-TIG  
- [ ] Definir ventana de cancelación (ej. 24 h / 48 h) y escribirla en FAQ + confirmación WA  
- [ ] Nombre real + foto en bloque Quién te lleva  
- [ ] Grabar audios (prioridad: Caminito, Recoleta, Bombonera)  
- [ ] Conectar Blob R/W y redeploy modo en ruta  
- [ ] Merge a main / publicar paquetes  
- [ ] (Opcional) Dominio propio  

---

## 9. Roadmap 7 días

| Día | Acción |
|-----|--------|
| 1 | Completar checklist dueño: precios + cancelación + nombre/foto (aunque sea borrador) |
| 2 | Grabar 3 audios prioritarios; subir a Blob cuando esté conectado |
| 3 | Conectar Blob R/W; redeploy `feat/modo-en-ruta`; probar /admin |
| 4 | Merge `feat/paquetes-marca` → main; smoke test prod |
| 5 | Merge o integrar modo en ruta si estable; prueba en calle de 1 transfer real |
| 6 | Ajustar copy de preciosNote cuando haya montos; revisar FAQ |
| 7 | (Opcional) dominio; segundo lote de audios; mensaje de lanzamiento a contactos |

---

## Próximo paso (3 datos del dueño)

1. **Precios orientativos** por paquete (aunque sea “desde X USD”).  
2. **Ventana de cancelación** en horas.  
3. **Nombre** para el bloque Quién te lleva (y si hay foto lista).

Con esos tres se puede cerrar copy público y confirmaciones WhatsApp sin placeholders.

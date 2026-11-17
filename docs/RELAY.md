# Multi-Agent Relay — BA en Ruta

Este archivo es la **fuente de verdad** del loop.

Cualquier agente (Grok u otro) que se dispare por Automation, evento de GitHub o chat debe leer este archivo y continuar desde el último `### RELAY HANDOFF`.

## Lógica lateral (cómo está pensado el sistema)

```
Evento de GitHub (CI fail, push, PR, comment…)
        ↓
Automation de Grok se dispara (gratis)
        ↓
Agente lee docs/RELAY.md + contexto del evento
        ↓
Ejecuta UNA acción de alto impacto
        ↓
Actualiza este archivo (nuevo handoff)
        ↓
Eso puede generar otro evento → el ciclo sigue
```

No depende de que alguien esté chateando. El chat es solo una forma más de entrar al mismo loop.

## Goal

Llevar BA en Ruta a un **sistema óptimo**:
- CI verde y estable
- Producto comercial listo para vender
- Calidad técnica alta (tests, a11y, performance, SEO)
- Deuda conocida, priorizada y controlada

## Estado actual (2026-11-17)

### Bloqueante activo
- **CI en main**: resuelto. PR #6 mergeado, CI verde en main (run 44024025261).
- No hay bloqueantes de CI conocidos.

### Frentes prioritarios (orden de impacto)
1. **CI reliability** — desbloqueado (pin OS)
2. **Producto comercial** — paquetes visibles en página, dominio, videos adicionales si hacen falta
3. **Calidad técnica** — mantener y subir la vara
4. **Contenido & assets** — fotos/licencias, multi-idioma, datos verificados
5. **Operación** — este archivo + `docs/ESTADO.md` siempre al día

## Protocolo para cualquier agente (turno)

1. Leé este archivo completo (especialmente el último `### RELAY HANDOFF`).
2. Leé también `docs/ESTADO.md`, `CLAUDE.md` y `roadmap.md` si hace falta contexto.
3. Ejecutá **una sola acción de alto impacto** (la del Next Action, o mejor si descubrís algo más urgente).
4. Actualizá este archivo reemplazando el bloque `### RELAY HANDOFF` con el nuevo estado.
5. Si el evento que te disparó trae información útil (logs de CI, PR, etc.), usala.

### Autonomía
- **Permitido**: leer, crear branches, crear/actualizar archivos, abrir PRs, crear issues, comentar, diagnosticar, proponer upgrades.
- **Requiere humano**: force-push, merge arriesgado a `main`, borrar valor, billing/permisos.
- Preferí PRs pequeños.
- Nunca dejes el CI peor.

### Circuit breakers
- ~7-10 turnos por ciclo sin revisión humana.
- 2 turnos seguidos sin progreso real → parar y pedir humano.
- Respetá Stop Conditions del handoff.

## Handoff actual

### RELAY HANDOFF
**Goal**: Llevar BA en Ruta a sistema óptimo (CI fiable + producto comercial listo + calidad técnica alta + deuda controlada)

**Status**: partial

**Progress**:
- CI en main verde post-merge de PR #6 (commit e7cb026, run https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/44024025261 success).
- WhatsApp configurado (5491151448632).
- Paquetes comerciales definidos con precios de referencia (TOUR-4 USD 50, TOUR-8 USD 100; resto a cotizar) y CTAs de WhatsApp.
- PR abierto (o en proceso) en branch feat/show-commercial-packages: monta la sección Packages en la página corta para hacer las ofertas visibles.

**Next Action**:
Esperar CI del PR feat/show-commercial-packages. Si verde, mergear (humano o auto si está claro) y verificar en preview/producción que los paquetes se ven y los CTAs funcionan. Luego avanzar a dominio personalizado o actualización de docs/ESTADO.md + roadmap.md.

**Context**:
- Repo: AlanGalarzaStanley/ba-en-ruta
- CI main success: https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/44024025261
- Branch: feat/show-commercial-packages (commit c713d373)
- Producción: https://ba-en-ruta.vercel.app
- Paquetes: src/lib/packages.ts, src/lib/packages-copy.ts, src/components/PackagesSection.tsx
- Archivos clave: docs/ESTADO.md, CLAUDE.md, roadmap.md

**Constraints**:
- Una acción de alto impacto por turno
- Este archivo es la fuente de verdad del handoff
- Autonomía con límites claros (ver arriba)

**Stop Conditions**:
- Sistema óptimo alcanzado, o
- 2 turnos consecutivos sin progreso real, o
- El dueño detiene el loop

**Suggested Trigger**:
- Automation con `workflow_run_completed` o `pull_request` en este repo
- O cualquier agente que lea este archivo ahora

---

*Última actualización del handoff: 2026-11-17 (CI main verde, PR de paquetes comerciales en curso)*

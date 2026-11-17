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
- **CI en main**: resuelto. PR #6 (fix/ci-playwright-ubuntu-24) mergeado con CI verde. Job e2e ahora usa ubuntu-24.04.
- No hay bloqueantes de CI conocidos.

### Frentes prioritarios (orden de impacto)
1. **CI reliability** — desbloqueado (pin OS)
2. **Producto comercial** — tarifas, dominio, videos, paquetes
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
- CI en main confirmado verde post-PR #6 (ver docs/ESTADO.md: run 44024025261).
- PR #7 "docs: add canonical BA en Ruta agent blueprint" mergeado a main (CI success: https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/44026088703, commit d0ba6ee).
- Blueprint canónico AGENTS.md ahora en main; CI reliability desbloqueado.

**Next Action**:
Avanzar al frente comercial: revisar pendientes de tarifas, dominio, videos y paquetes en roadmap.md y docs/ESTADO.md. Crear issue o PR de propuesta acotada (sin inventar datos del dueño) listando lo que requiere decisión humana y lo que se puede preparar técnicamente. Priorizar claridad comercial en la home actual.

**Context**:
- Repo: AlanGalarzaStanley/ba-en-ruta
- main @ e440b17e9d0c45a1158b9d76d1c3c3d8bd7eaa5c (post PR #7)
- CI main verde confirmado
- Producción: https://ba-en-ruta.vercel.app
- Archivos clave: AGENTS.md, docs/ESTADO.md, roadmap.md, docs/DIRECCION-2026-11-17.md
- Pendientes comerciales: WhatsApp number, tarifas, videos Meta AI, dominio (roadmap.md)

**Constraints**:
- Una acción de alto impacto por turno
- Este archivo es la fuente de verdad del handoff
- Autonomía con límites claros (ver arriba); no inventar datos comerciales del dueño

**Stop Conditions**:
- Sistema óptimo alcanzado, o
- 2 turnos consecutivos sin progreso real, o
- El dueño detiene el loop

**Suggested Trigger**:
- Automation con `workflow_run_completed` en este repo (success o failure)
- O cualquier agente que lea este archivo ahora

---

*Última actualización del handoff: 2026-11-17 (CI verde confirmado, PR #7 mergeado, avanzando a comercial)*

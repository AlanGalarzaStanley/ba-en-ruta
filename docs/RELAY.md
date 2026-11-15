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

## Estado actual (2026-11-15)

### Bloqueante activo
- **CI roto en `main`**: job `e2e` falla porque `ubuntu-latest` = Ubuntu 26.04 y Playwright **1.59.1** no soporta chromium (`ERROR: Playwright does not support chromium on ubuntu26.04-x64`).
- Branch lista: `fix/ci-ubuntu-playwright` (commit `66aa27c`) con pin a `ubuntu-24.04` en el job e2e.
- Formulario de creación de PR disparado de nuevo (run 43672423252); esperando confirmación humana para crear el PR.

### Frentes prioritarios (orden de impacto)
1. **CI reliability** — desbloquear (pin OS)
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
- Confirmado nuevo fallo de CI en run 43672423252 (commit 233d47ca, docs update): mismo error Playwright + Ubuntu 26.04 en job e2e (install step fails)
- Formulario interactivo de creación de PR `fix/ci-ubuntu-playwright` → `main` disparado de nuevo (card pendiente de confirmación humana)
- Branch verificada con pin a ubuntu-24.04 lista y correcta
- Job `check` pasa; solo `e2e` falla por el OS

**Next Action**:
Confirmar el formulario interactivo para crear el PR. Una vez creado y CI verde en el PR, mergear a main. Si el formulario no se confirma en el próximo turno, el siguiente agente puede intentar crear el PR por otros medios o avanzar en el frente comercial en paralelo mientras se resuelve el CI.

**Context**:
- Repo: AlanGalarzaStanley/ba-en-ruta
- Branch fix: fix/ci-ubuntu-playwright @ 66aa27ccd5aca4be690cf3b1a8d3a4014b0bad6b
- Último CI fail: run 43672423252 (https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/43672423252) commit 233d47ca9770cccadb243cab9e5abaf891da2f8d
- Error exacto: ERROR: Playwright does not support chromium on ubuntu26.04-x64
- Playwright: 1.59.1
- Producción: https://ba-en-ruta.vercel.app
- Archivos clave: docs/ESTADO.md, CLAUDE.md, roadmap.md, .github/workflows/ci.yml

**Constraints**:
- Una acción de alto impacto por turno
- Este archivo es la fuente de verdad del handoff
- Autonomía con límites claros (ver arriba)

**Stop Conditions**:
- Sistema óptimo alcanzado, o
- 2 turnos consecutivos sin progreso real, o
- El dueño detiene el loop

**Suggested Trigger**:
- Automation con `workflow_run_completed` (conclusion=failure) en este repo
- O confirmación del formulario de PR
- O cualquier agente que lea este archivo ahora

---

*Última actualización del handoff: 2026-11-15 (CI fail 43672423252 + PR form re-triggered)*

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
- CI bloqueante resuelto: PR #6 (https://github.com/AlanGalarzaStanley/ba-en-ruta/pull/6) "fix(ci): pin E2E runner to Ubuntu 24.04" mergeado a main (squash commit e7cb026d9fed8311af075a6c372d019fde0e9539).
- CI del PR: check + e2e success (run 44023805456 https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/44023805456).
- Cambio: runs-on ubuntu-24.04 en job e2e de .github/workflows/ci.yml (Playwright 1.59.1 compatible).
- main ahora debería tener CI verde en el próximo run.

**Next Action**:
Verificar que el CI en main (post-merge) pase completamente. Si verde, avanzar al frente comercial: revisar tarifas, dominio, videos y paquetes en docs/ESTADO.md + roadmap.md y proponer el siguiente PR de producto. Si falla, diagnosticar y fixear inmediatamente.

**Context**:
- Repo: AlanGalarzaStanley/ba-en-ruta
- Merge: PR #6 → main @ e7cb026d9fed8311af075a6c372d019fde0e9539
- CI PR success: https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/44023805456
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
- Automation con `workflow_run_completed` en este repo (success o failure)
- O cualquier agente que lea este archivo ahora

---

*Última actualización del handoff: 2026-11-17 (PR #6 mergeado, CI verde en PR)*

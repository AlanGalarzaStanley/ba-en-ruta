# Multi-Agent Relay — BA en Ruta

**Cualquier agente** que lea este archivo puede integrarse al loop y avanzar hacia el sistema óptimo.

## Goal

Llevar BA en Ruta a un **sistema óptimo**:
- CI verde y estable
- Producto comercial listo para vender
- Calidad técnica alta (tests, a11y, performance, SEO)
- Deuda conocida, priorizada y controlada

## Estado actual (2026-11-14)

### Bloqueante activo
- **CI roto en `main`**: el job `e2e` falla porque `ubuntu-latest` ahora es Ubuntu 26.04 y Playwright **1.59.1** no soporta chromium en esa versión.
- Ya existe la branch `fix/ci-ubuntu-playwright` con el pin a `ubuntu-24.04` (commit `66aa27c`).
- Falta abrir/mergear el PR correspondiente.

### Frentes prioritarios (orden de impacto)
1. **CI reliability** — desbloquear (pin ubuntu-24.04 o upgrade Playwright)
2. **Producto comercial** — WhatsApp ya configurado (5491151448632), faltan tarifas, dominio definitivo, videos, paquetes claros
3. **Calidad técnica** — mantener E2E + unit + typecheck verdes, mejorar lo que se pueda medir
4. **Contenido & assets** — fotos con licencia correcta, descripciones multi-idioma, datos verificados
5. **Operación** — mantener `docs/ESTADO.md` y este archivo actualizados

## Protocolo de integración (para cualquier agente)

1. Leé este archivo completo.
2. Leé también `docs/ESTADO.md`, `CLAUDE.md` y `roadmap.md`.
3. Ejecutá **una sola acción de alto impacto** por turno (preferí lo que desbloquee más valor).
4. Al terminar, actualizá este archivo (`docs/RELAY.md`) con el nuevo bloque `### RELAY HANDOFF` más abajo.
5. Si podés, dejá también un comentario en un issue o PR relacionado.

### Reglas de autonomía
- **Permitido sin pedir permiso**: leer todo, crear branches, crear/actualizar archivos, abrir PRs, crear issues, comentar, correr diagnósticos, proponer upgrades de dependencias.
- **Requiere humano**: force-push, merge a `main` de cambios grandes/arriesgados, borrar cosas de valor, cambios de billing/permisos.
- Preferí PRs pequeños y revisables.
- Nunca dejes el CI peor de como lo encontraste.

### Circuit breakers
- Máximo recomendado ~7-10 turnos por ciclo de goal sin revisión humana.
- Si dos turnos seguidos no producen progreso real → parar y pedir input humano.
- Respetá los Stop Conditions del último handoff.

## Handoff actual

### RELAY HANDOFF
**Goal**: Llevar BA en Ruta a sistema óptimo (CI fiable + producto comercial listo + calidad técnica alta + deuda controlada)

**Status**: partial

**Progress**:
- Diagnóstico completo del fallo de CI (Playwright 1.59.1 + Ubuntu 26.04)
- Branch `fix/ci-ubuntu-playwright` creada con pin a `ubuntu-24.04` (commit 66aa27ccd5aca4be690cf3b1a8d3a4014b0bad6b)
- Protocolo de relay documentado en este archivo para que cualquier agente se integre

**Next Action**:
Abrir (o completar) el PR desde `fix/ci-ubuntu-playwright` → `main`, verificar que el CI del PR pase, y mergear el fix. Después de eso el siguiente frente de mayor impacto es producto comercial o upgrade de Playwright.

**Context**:
- Repo: AlanGalarzaStanley/ba-en-ruta
- Branch lista: `fix/ci-ubuntu-playwright`
- Commit del fix: 66aa27ccd5aca4be690cf3b1a8d3a4014b0bad6b
- Playwright actual: 1.59.1
- Producción: https://ba-en-ruta.vercel.app
- Archivos clave: docs/ESTADO.md, CLAUDE.md, roadmap.md, .github/workflows/ci.yml

**Constraints**:
- Autonomía con límites claros (ver arriba)
- Una acción de alto impacto por turno
- Mantener este archivo como fuente de verdad del handoff

**Stop Conditions**:
- Sistema óptimo alcanzado, o
- 2 turnos consecutivos sin progreso real, o
- El dueño detiene el loop

**Suggested Trigger**:
Cualquier agente con acceso a GitHub puede tomar el Next Action ahora mismo.

---

*Última actualización del handoff: 2026-11-14 (~08:00 UTC)*

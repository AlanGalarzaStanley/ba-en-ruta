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

## Estado actual (2026-11-18)

### Bloqueante activo
- **CI en main**: verde. Confirmado tras merge de PR #13 (docs update, run 44346351589) y post-#12.
- No hay bloqueantes de CI conocidos.

### Frentes prioritarios (orden de impacto)
1. **CI reliability** — desbloqueado
2. **Producto comercial** — tarifas visibles (paquetes), dominio, videos
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
- PR #13 (docs: record immersive route release) CI success (run 44346351589) y mergeado a main.
- Branch feat/surface-packages-catalog listo (App.tsx incluye <Packages />).
- Formulario de creación de PR para packages mostrado (card_id JU3Ze). Título: feat: surface packages catalog on homepage. CI en main verde.

**Next Action**:
Submit el PR de feat/surface-packages-catalog usando el formulario interactivo (card_id JU3Ze). Una vez creado, verificar CI verde, luego mergear y actualizar docs/ESTADO.md con paquetes visibles en homepage.

**Context**:
- Repo: AlanGalarzaStanley/ba-en-ruta
- Latest CI: https://github.com/AlanGalarzaStanley/ba-en-ruta/actions/runs/44346351589
- Branch packages: feat/surface-packages-catalog
- Producción: https://ba-en-ruta.vercel.app
- Paquetes listos: src/components/PackagesSection.tsx exporta Packages, datos en src/lib/packages.ts
- WhatsApp: 5491151448632
- PR form card_id: JU3Ze

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

*Última actualización del handoff: 2026-11-18 (packages PR form shown with JU3Ze, CI green on PR #13)*

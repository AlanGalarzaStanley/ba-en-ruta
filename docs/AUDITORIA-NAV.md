# Auditoría de navegación — BA en Ruta

Fecha: 2026-10-18 · Base: `feat/paquetes-marca`.

## Orden actual (scroll único)

1. Header sticky (Recorridos, Servicios, Imperdibles, Mapa, Gastronomía, Paquetes, Reservar)
2. Hero
3. Passion
4. Itineraries
5. HowItWorks
6. AboutDriver (#quien)
7. Services
8. Packages (#paquetes)
9. Prices
10. Places (Imperdibles)
11. PlacesMap
12. Gastronomy (~25 fichas en grid)
13. EnquiryForm
14. MiQr
15. FAQ
16. DriverSignup
17. Footer + TourBar

## Problemas

| Problema | Impacto |
|----------|---------|
| Scroll excesivo en móvil | Abandono antes de cotizar |
| Nav con 7 ítems | No prioriza valor comercial ni “vida porteña” |
| Gastro muestra todo | Difícil distinguir clásicos vs recomendados del chofer |
| Services + Packages + Prices | Solape conceptual |
| Sin ancla Vida porteña | Diferencial genuino sin hogar |

## Conservar

Hero + WhatsApp · multi-idioma · Paquetes · Quién te lleva · player `?recorrido` · tenant `/c/{slug}` · TourBar · búsqueda gastro.

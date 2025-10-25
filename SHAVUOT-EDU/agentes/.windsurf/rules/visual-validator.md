---
trigger: model_decision
description: Real-time UI validation via Playwright MCP. Runs visual regression and interaction checks, computes uniqueness.
---

# Role
Validate each iteration visually and interactively.

## Procedure
1. Launch Playwright MCP: `npx @playwright/mcp@latest`
2. Visual regression: screenshots and diffs; responsive breakpoints.
3. Interaction: hover/focus/scroll/micro-interactions; animation timings.
4. Scoring: uniqueness (0–100), memorability, brand alignment.

## Outputs
- reports/visual_diff/*.png
- reports/validation.md

## Fallback Mode (sin Playwright MCP)
- Navegación y captura con Bright Data MCP:
  - `scraping_browser_navigate`, `scraping_browser_screenshot`
  - `scraping_browser_get_text`/`get_html` para validar contenido
  - `links`, `wait_for`, `scroll`, `click`, `type` si es necesario
- Enriquecimiento con `fetch_markdown`/`fetch_html`.
- Genera igualmente `reports/validation.md` con checklist.

## Validation Checklist
- Locale: respeta `Locale` de `.claude/memory/project_context.json` (no traducciones no solicitadas).
- CTAs: ≥3 por variante, visibles y con affordance clara; presencia de micro-interacciones básicas (hover/focus).
- Responsividad: capturas en breakpoints clave (sm/md/lg).
- Uniqueness ≥ 75: si no, pedir revisión al `design-builder`.
- Accesibilidad básica: contrastes evidentes para CTAs y texto clave.

## Permissions
- Requiere permisos MCP para Bright Data y Fetch si se usa el fallback.
- Pedir permiso de forma concisa y continuar automáticamente al concederse.
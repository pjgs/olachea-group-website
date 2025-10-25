---
trigger: model_decision
description: Tunes performance for premium UIs. Keeps speed and interactivity high despite rich visuals.
---

# Role
Optimize for production without sacrificing distinctiveness.

## Strategy
- Critical CSS; avoid layout thrash; use transform/opacity animations
- Image optimization (WebP/AVIF), responsive images
- Code splitting; lazy loading heavy sections

## Targets
- LCP < 2.5s, CLS < 0.1, FID < 100ms, TTI < 3.5s

## Outputs
- reports/perf.md
- optimized assets/code suggestions
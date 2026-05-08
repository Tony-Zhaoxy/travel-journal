# Codex Guide

This is a code-first Chinese travel photography journal. Keep edits direct, readable, and friendly to future automation.

## Core Workflow

- Use `data/travels.ts` as the source of truth for visited countries, regions, copy, and image paths.
- Keep reusable UI in `components/`.
- Keep route data helpers in `lib/`.
- Use App Router conventions under `app/`.
- Prefer small data-driven changes before adding new page-specific code.

## Design Direction

- Chinese-first interface with a calm East Asian editorial feeling.
- Minimal, cinematic, photography-forward.
- Dark neutral base with restrained warm, ink, and coastal accents.
- Avoid heavy map libraries unless the map needs real geographic boundaries later.
- Keep cards sharp and quiet; use 8px radius or less.
- Use Framer Motion only inside client components.

## Checks

Run these before pushing changes:

```bash
npm run typecheck
npm run lint
npm run build
```

If the environment has no package manager installed, note that in the handoff and run `git diff --check` at minimum.

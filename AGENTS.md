# Repository Guidelines

## Structure
- Next.js app in `src/app`; `page.tsx` renders chat, `layout.tsx` wires globals; API logic in `src/app/api/chat` (`services`, `tools`, `types`, `systemPrompts.ts`); themes in `src/theme.ts`; assets in `public/`.

## Commands
- `pnpm install` (Node >=20), `pnpm dev`, `pnpm build`/`pnpm start`, `pnpm lint`, `pnpm format:fix`.

## Style
- TypeScript + hooks; keep components small. Filenames: `PascalCase.tsx` components, `camelCase.ts` utils, `Component.module.scss` styles. 2-space indent, trailing commas, double quotes; use `@/` imports.

## Testing
- Minimal `node:test` specs live in `tests/`; colocate new tests near code. Focus on services/tools and sanity-check `/api/chat` with a valid `.env`. Run with a TS-aware runner (e.g., `pnpm dlx tsx tests/*.test.ts`) until a test script lands.

## Security & Config
- Copy `.env.example` → `.env`; set `THESYS_API_KEY`, `GOOGLE_API_KEY`, `GOOGLE_CX`, `GEMINI_API_KEY`. Keep Neon/Stack/Minimax/Wavespeed/Gemini keys in env only; never commit secrets.
- `/api/chat` auth via `CHAT_API_KEY` (Bearer or `x-api-key`); model override via `C1_MODEL`. Message store: `MESSAGE_STORE_DRIVER` (`memory` default, `postgres` optional with `DATABASE_URL`), TTL `MESSAGE_TTL_MS`.

## Design Reference
- Follow palette/layout cues from `https://media.istockphoto.com/id/1982641784/vector/abstract-brochure-design-geometric-business-presentation-layout-creative-background-template.jpg`; tokens adjusted in `src/theme.ts`.

## Tools & Media Gen
- Tools centralized via `createTools`; system prompt prepended. Web search + image/weather + Minimax/Wavespeed/Gemini tools auto-register when keys exist.
- Media services in `src/app/api/chat/services` with timeouts (`MINIMAX_TIMEOUT_MS`, `WAVESPEED_TIMEOUT_MS`, `GEMINI_TIMEOUT_MS`); validate prompt/size/ratio/duration; return signed URL/base64 or structured errors.

## Analytics
- UTM helpers in `src/lib/analytics.ts`; hook GA4/Meta when IDs are provided in layout.

## Product Requirements (PRD.md)
- Phases: 1) landing/CTAs/forms; 2) packages/case studies/FAQ/calendar; 3) intake branching + localization + UTM + automation; 4) A/B hero + analytics/export + ad library; 5) media-gen endpoints wired to chat.

## Implementation Plan
- Phase 1: publish hero + reel embed + CTAs + contact; link portfolio/social.
- Phase 2: add packages, case studies, FAQ, calendar.
- Phase 3: intake branching, localization hooks, analytics/UTM helpers.
- Phase 4: A/B hero, automate lead logging/confirmations, publish export.

## Codex Cloud Workflow
- Environment: Node >=20 with pnpm; set env vars per `.env.example` via platform secrets (THESYS_API_KEY, GOOGLE_API_KEY, GOOGLE_CX, GEMINI_API_KEY, CHAT_API_KEY, MINIMAX_API_KEY, WAVESPEED_API_KEY, DATABASE_URL if using Postgres).
- Install deps: `pnpm install`; dev server: `pnpm dev`; production check: `pnpm build` then `pnpm start`.
- Tests: `pnpm dlx tsx tests/*.test.ts` (until a package script is added).
- Auth for git is stored in `~/.git-credentials` (token-based); avoid committing secrets.
- For Postgres, set `MESSAGE_STORE_DRIVER=postgres` and `DATABASE_SSL=false` if required by the cloud runtime; otherwise default memory store.

# Repository Guidelines

## Project Structure & Module Organization
- Next.js app in `src/app`; `page.tsx` renders chat; `layout.tsx` applies globals.
- Chat backend in `src/app/api/chat` with helpers in `services`, `tools`, `types`, `systemPrompts.ts`.
- Styling: `globals.css` + `*.module.scss`; themes in `src/theme.ts`.
- Assets in `public/`; root configs: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.

## Build, Test, and Development Commands
- `pnpm install` (Node >= 20.9) — install deps.
- `pnpm dev` — dev server (Turbopack).
- `pnpm build` / `pnpm start` — prod build and serve.
- `pnpm lint` — lint rules.
- `pnpm format:fix` — Prettier (Tailwind/SCSS).

## Coding Style & Naming Conventions
- TypeScript-first; functional components/hooks; keep components small.
- Filenames: components `PascalCase.tsx`, utilities `camelCase.ts`; CSS modules `Component.module.scss`.
- Formatting: 2-space indent, trailing commas, double quotes per Prettier; prefer explicit return types for API handlers.
- Imports: favor `@/` absolute paths; group externals above internals.

## Testing Guidelines
- No runner yet; if adding tests, colocate `*.test.ts`/`*.test.tsx` or module `__tests__`.
- Target `src/app/api/chat/services` with unit tests; hit API routes via `fetch` for integration checks.
- Sanity-check `/api/chat` locally and confirm UI renders with a valid `.env`.

## Commit & Pull Request Guidelines
- Commits: short, imperative subjects (<=72 chars); group related changes per commit.
- PRs: concise summary, linked issue/ticket, screenshots/GIFs for UI, and notes on env/migration changes. Mention testing (dev server, lint, tests).
- Do not commit `.env*` files or keys; rely on `.env.example`.

## Security & Configuration Tips
- Copy `.env.example` to `.env`; set `THESYS_API_KEY`, `GOOGLE_API_KEY`, `GOOGLE_CX`, `GEMINI_API_KEY` before `pnpm dev`.
- Review third-party calls in `src/app/api/chat/tools` and `services`; scrub responses.
- For database/auth, keep Neon/Stack keys in `.env` (`NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`, `STACK_SECRET_SERVER_KEY`, `DATABASE_URL`); never hardcode.

## Design Reference
- Use the palette, type, and layout cues from the reference image at `https://media.istockphoto.com/id/1982641784/vector/abstract-brochure-design-geometric-business-presentation-layout-creative-background-template.jpg`; ignore the sample content.

## Media Generation (Minimax, Wavespeed, Gemini)
- Keep provider keys in `.env` (`MINIMAX_API_KEY`, `WAVESPEED_API_KEY`, `GEMINI_API_KEY`).
- Add typed clients under `src/app/api/chat/services`; expose tools via `src/app/api/chat/tools`; keep schemas in `types`.
- Flow: validate prompt/size/ratio/duration, call provider (Minimax images, Wavespeed video, Gemini prompts/upscale), stream or buffer, return signed URL/base64, handle timeouts/errors.

## Product Requirements
- Full PRD lives in `PRD.md`; keep it updated when scope changes. Implement in phases (landing → offers → automation/localization → analytics/A/B → media gen).
- Design against the brochure reference; align tokens in `src/theme.ts` and section layouts with the PRD milestones.

## Implementation Plan (Phased)
- Phase 1: Publish landing sections (hero, reel embed, CTAs, contact form) and link portfolio/social profiles.
- Phase 2: Add packages, case studies, FAQ, calendar embed.
- Phase 3: Expand intake branching, add localization hooks, wire analytics/UTM helpers.
- Phase 4: Enable A/B hero variants, automate lead logging/confirmations, publish export.

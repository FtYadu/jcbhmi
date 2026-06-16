# C1 App Template

Template repository for a generative UI chat client, powered by [C1 by Thesys](https://thesys.dev), and bootstrapped with `create-next-app`

[![Built with Thesys](https://thesys.dev/built-with-thesys-badge.svg)](https://thesys.dev)

## Getting Started

### Setup

1) Install dependencies
   ```bash
   pnpm install
   ```

2) Copy env template and set secrets (use Codex cloud secrets or local .env)
   ```bash
   cp .env.example .env
   ```
   Required keys:
   - `THESYS_API_KEY`
   - `GOOGLE_API_KEY`, `GOOGLE_CX`
   - `GEMINI_API_KEY`
   - `CHAT_API_KEY` (for `/api/chat` auth)
   - Optional media: `MINIMAX_API_KEY`, `WAVESPEED_API_KEY`
   - Optional storage: `DATABASE_URL`, `MESSAGE_STORE_DRIVER=postgres`
   - Landing page (public, `NEXT_PUBLIC_*`): `BRAND_NAME`, `SITE_URL`, `WHATSAPP_NUMBER`, `BOOKING_URL`, `FORMSPREE_ID`, `YOUTUBE_REEL_ID`, and social URLs. Content/links are centralized in `src/config/site.ts`.

## Routes
- `/` — marketing landing page (hero, value props, showreel, portfolio, contact form, CTAs).
- `/chat` — the C1 generative-UI chat assistant.
- `/api/chat` — streaming chat API (auth via `CHAT_API_KEY`).

3) Run dev server
   ```bash
   pnpm dev
   ```
   Open http://localhost:3000

### Production / Codex Cloud
- Build: `pnpm build`, then `pnpm start`
- Set env secrets in the cloud runtime (same keys as above); `C1_MODEL` can override the default model.
- Message store: default memory; switch to Postgres with `MESSAGE_STORE_DRIVER=postgres` and `DATABASE_URL` (set `DATABASE_SSL=false` if your host requires).

### Tests
- Minimal `node:test` specs live in `tests/`; run with a TS-aware runner:
  ```bash
  pnpm dlx tsx tests/*.test.ts
  ```
  (Add a package script if desired.)

## Learn More
- Docs: [C1 Documentation](https://docs.thesys.dev)
- Internal guides: see `AGENTS.md` (dev guidelines) and `PRD.md` (full scope/phases).

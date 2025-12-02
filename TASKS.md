# Task & Subtask Plan (Production Readiness)

## Global Goals & Rules
- Goal: ship a production-ready full-stack app with lead-gen landing, AI chat, media generation, automation, and analytics.
- Use sub-agents/parallel work for independent streams (UI, API/tools, infra/analytics, content).
- Rules: keep secrets in env; small PRs per feature; add/adjust docs; run checks per section; prefer pnpm; validate inputs on all APIs; log without leaking secrets.

## Phase 1: Landing + CTAs
- Tasks: hero/value props, reel embed (Playbook/YouTube), WhatsApp + booking CTAs, contact form (Formspree), portfolio/social links.
- Debug steps: open page on desktop/mobile; verify CTA links; submit contact form and confirm Formspree receipt; check Lighthouse >85 mobile.

## Phase 2: Offers + Case Studies
- Tasks: 3-tier packages, 3–5 case studies (goal/approach/outcome), FAQ, calendar embed, blog/updates feed.
- Debug steps: validate JSON/MDX content loads; ensure calendar embed renders; check responsive layout; confirm nav routes work.

## Phase 3: Intake, Localization, Automation
- Tasks: branched intake fields (niche/budget/timeline), localization toggle (EN/HI/ML), UTM helper integration, automation (Formspree → Sheet + email).
- Debug steps: submit form variants and verify branching; inspect Sheet row + email; toggle languages and confirm strings swap; check UTM params append correctly.

## Phase 4: Analytics, A/B, Reporting
- Tasks: GA4 + Meta pixel wiring, hero A/B toggle via config, weekly CSV/Sheets export endpoint or script, ad asset library page.
- Debug steps: verify tags fire (debug mode); switch variants and confirm variant logging; run export and open CSV; smoke ad asset page links.

## Phase 5: Media Generation & Chat
- Tasks: implement Minimax image, Wavespeed video, Gemini prompt refine tools; ensure tool registration; auth + validation on `/api/chat`; system prompt applied; message store driver (memory/postgres) with TTL.
- Debug steps: call tools with good/bad inputs; check timeout handling; run `/api/chat` with and without `CHAT_API_KEY`; confirm system prompt present; persist/reload thread when using Postgres driver.

## Phase 6: Infra Hardening
- Tasks: env audit (`.env.example`), add healthcheck, error logging/redaction, rate limiting on API routes, consider queue for long media jobs, address dependency vulnerabilities.
- Debug steps: run `pnpm lint` + `pnpm build`; simulate missing envs; confirm 429/401 responses; scan dependency advisories and upgrade.

## Tests & QA
- Add unit tests for services/tools; integration smoke for `/api/chat`; visual QA on key breakpoints.
- Debug steps: run `pnpm dlx tsx tests/*.test.ts`; curl `/api/chat` with sample payload; manual UI walkthrough; monitor logs for errors.

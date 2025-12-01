# Product Requirements Document — Multimedia Portfolio & Lead Engine

## 1. Objective & Success
- Build a lead-generating site that showcases reels/case studies, provides AI chat support, and offers image/video generation services.
- KPIs: ≥3 qualified inquiries/week, ≥40% form completion, ≥25% CTA click-through, ≥1 booked intro/week, publish new case study <1 day.

## 2. Scope (Phased)
- Phase 1: Landing (hero + niche value props), reel embed (Playbook/YouTube), CTAs (WhatsApp, booking, contact form), portfolio/social links; mobile-first, SEO/OG basics.
- Phase 2: Offer clarity with 3-tier packages, 3–5 case studies (goal/approach/outcome), FAQ, calendar embed, blog/updates feed; privacy notice.
- Phase 3: Intake branching (niche/budget/timeline), Formspree → Sheet + confirmation email, asset delivery template link, UTM-tagged outbound links, localization toggle (EN/HI/ML).
- Phase 4: A/B hero variants, GA4 + Meta pixel, weekly CSV/Sheets export, ad asset library (hooks/offers), simple CRM handoff.
- Phase 5: Media generation endpoints (Minimax images, Wavespeed video, Gemini prompts/upscale) exposed to the chat UX and API consumers.

## 3. Users & Jobs
- Prospective clients (hospitality/auto/event/fashion marketers): view proof, understand offers, get quick pricing signals, book a call, message instantly.
- Creator (you): publish fast, reuse templates, automate lead capture and reporting, deliver AI-generated media where needed.

## 4. Functional Requirements
- Content: hero, niche value props, reels embed, gallery grid, packages, case studies, FAQ, blog list/detail.
- CTAs: WhatsApp deep link, booking (Google Appointments) embed + fallback link, Formspree contact with required fields (name, email, company, niche, budget band, timeline, message).
- Localization: copy/captions toggle (EN/HI/ML); store strings in config.
- Analytics: GA4 + Meta pixel; UTM helper for outbound links; weekly export (CSV/Sheets).
- Automation: Formspree payload → Sheet + email confirmation; folder template link for delivery.
- Media APIs: endpoints for image (Minimax) and video (Wavespeed) generation; Gemini for prompt assist/upscales; rate-limit and timeout guards; signed URL/base64 responses.
- Chat: `/api/chat` remains modular; add tools for media generation/localization within `src/app/api/chat/tools`; system prompt prepended; auth via `CHAT_API_KEY`; model configurable via `C1_MODEL`.
- Storage: message store abstraction with TTL (`MESSAGE_TTL_MS`); drivers for memory (default) and optional Postgres (`MESSAGE_STORE_DRIVER`, `DATABASE_URL`).
- Codex Cloud: run pnpm (Node >=20); set env secrets (`THESYS_API_KEY`, `GOOGLE_API_KEY`, `GOOGLE_CX`, `GEMINI_API_KEY`, `CHAT_API_KEY`, `MINIMAX_API_KEY`, `WAVESPEED_API_KEY`, `DATABASE_URL` if Postgres). Build check with `pnpm build`; tests via `pnpm dlx tsx tests/*.test.ts` until scripts are added.

## 5. Non-Functional
- Performance: Lighthouse >85 mobile; fast LCP; optimized embeds.
- Accessibility: WCAG AA; focus management; aria labels for form fields/buttons.
- Security: no secret leakage; env-only keys; input validation on all API routes; error redaction.
- Deployment: Vercel-ready; envs documented in `.env.example`.

## 6. Content/Assets Needed
- 5–8 top reels/clips; 3–5 case studies (goal/approach/outcome + before/after grades); package details/pricing bands; FAQs; bio/headshot; testimonials if available; LUT/palette; logo/wordmark.

## 7. Technical Approach
- Frontend: Next.js App Router; sections as components; styling via CSS modules + theme tokens from `src/theme.ts`; design reference from the provided brochure image for palette/type/layout cues.
- Data/config: packages, CTAs, localization strings in config files; content (case studies/blog) as MDX/Markdown.
- Media: service clients in `src/app/api/chat/services`; tool wrappers in `src/app/api/chat/tools`; schemas in `types`.
- Analytics: GA4/Meta tags in `layout.tsx`; UTM helper for outbound links; weekly export via script/endpoint.
- Automation: Formspree → Google Sheet via webhook/Apps Script/n8n; email confirmation template.

## 8. Milestones & Acceptance
- M1: Phase 1 live; CTAs and contact form working; PageSpeed >85 mobile.
- M2: Packages, case studies, FAQ, calendar, blog feed live; privacy notice present.
- M3: Branched intake, automation to Sheet/email, localization toggle, UTM tagging.
- M4: A/B hero enabled; GA4 + Meta firing; weekly export available; ad asset library page.
- M5: Media generation APIs live with documented inputs/outputs; chat tools invoke them; timeouts and error handling verified.

## 9. Risks & Mitigations
- Missing assets/case data → collect/stage early; placeholder blocks until ready.
- Tracking consent needs → add notice/opt-in where required.
- API limits/latency → add rate limits, retries with backoff, and timeout fallbacks.

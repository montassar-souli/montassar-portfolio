# Montassar Souli — Portfolio

Personal portfolio built with Next.js (App Router) showcasing projects, experience, and a production-ready set of backend features: streaming AI chat, contact form email delivery, and newsletter subscriptions.

Live URL (configured in metadata): https://montassar-portfolio.vercel.app

## What’s Implemented

### Pages

- Home (`/`): Hero + About recap + Projects recap
- Projects (`/projects`): Filterable project list
- Project details (`/project/[name]`): Dynamic route with SEO metadata generation
- About (`/about`)
- Contact (`/contact`): Validated contact form
- Chat (`/chat`): Streaming AI chat UI

### Backend APIs (Route Handlers)

All API routes run on the Node.js runtime.

- `POST /api/chat`

  - Streams plain text responses from OpenRouter.
  - Abuse protection:
    - Per-IP rate limiting (Upstash Redis sliding window)
    - Daily token quota (Upstash Redis)
    - User-Agent signal logging + optional allowlist
    - Optional CORS allowlist via `ALLOWED_ORIGIN`
  - Streaming safety:
    - Inactivity timeout
    - Token “reservation” + commit based on final usage (best-effort)

- `POST /api/contact`

  - Validates input with Zod.
  - Sends email using EmailJS (server-side REST call) and includes metadata (IP, source URL, timestamp).
  - Protected by rate limiting + optional origin checks.

- `POST /api/newsletter`
  - Validates email with Zod.
  - Persists subscribers into Firestore (`newsletterSubscribers` collection).
  - Protected by rate limiting + optional origin checks.

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 + PostCSS
- Framer Motion (UI animation)
- Zod + React Hook Form (form validation)
- OpenRouter SDK (LLM gateway)
- Upstash Redis + `@upstash/ratelimit` (rate limiting + quotas)
- Firebase Admin SDK (Firestore)
- ESLint (Next.js config)

## Project Structure

- `src/app`: Routes, layouts, and API route handlers
- `src/components`: UI components (navigation, footer, project detail, home sections)
- `src/lib`: Integrations and shared logic
  - `config.ts`: Centralized env config
  - `limits.ts`: Upstash rate limit + daily token quota
  - `abuse.ts`: Origin checks + IP extraction + UA signal
  - `openrouter.ts`: OpenRouter client
  - `firebaseAdmin.ts`: Firestore admin client
  - `projectsData.ts`: Portfolio projects data and helpers

## Getting Started (Local)

This repo includes a `pnpm-lock.yaml`, so pnpm is the recommended package manager.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

### Useful Scripts

- `pnpm dev` — Start the dev server (Turbopack enabled)
- `pnpm build` — Production build (Turbopack enabled)
- `pnpm start` — Run the production server
- `pnpm lint` — Lint the codebase

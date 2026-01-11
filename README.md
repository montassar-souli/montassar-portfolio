# Montassar Souli — Portfolio

Personal portfolio built with Next.js (App Router) showcasing projects, experience, and a small set of production-minded features (AI chat, contact form, newsletter signup).

Live URL (configured in metadata): https://montassar-portfolio.vercel.app

## What’s Implemented

- Responsive portfolio UI (home, about, projects listing, project details)
- Project details with SEO-friendly metadata
- Contact form with client-side validation and server-side email delivery
- Newsletter signup persisted to a database
- AI chat experience with streaming responses
- Basic abuse protection patterns (rate limiting / quotas)

## Tech Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 + PostCSS
- Framer Motion (UI animation)
- Zod + React Hook Form (form validation)
- OpenRouter SDK (LLM gateway)
- Upstash Redis + `@upstash/ratelimit` (rate limiting + quotas)
- Firebase Admin SDK (Firestore)
- ESLint (Next.js config)

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

# Haru — your skincare routine, decoded

Haru analyzes the products you already own, flags ingredient conflicts
(over-exfoliation, actives that deactivate each other, useless
duplicates) and builds your ideal AM/PM routine.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS v4, hand-rolled shadcn/ui-style components (Radix primitives + CVA)
- Framer Motion for micro-animations
- [next-intl](https://next-intl.dev) — English + Korean, locale-aware routing (`/en`, `/ko`)
- next-themes — light/dark/system, real toggle
- PWA: installable, manifest + icons generated via `next/og` (no external assets needed)
- Postgres + [Prisma 7](https://www.prisma.io) (driver adapter, `@prisma/adapter-pg`)
- [Auth.js v5](https://authjs.dev) (Credentials provider, JWT sessions, bcrypt password hashing)
- Own rule engine (`src/lib/routine-engine.ts`) — no external AI/API required for the
  ingredient-conflict logic itself

## Local setup

1. **Database** — point `DATABASE_URL` at a Postgres instance (see `.env.example`).
   Locally you can use anything (Postgres.app, Docker, `apt install postgresql`).
2. **Secret** — generate one: `openssl rand -base64 32`, put it in `AUTH_SECRET`.
3. Copy `.env.example` to `.env` and fill in both values.

```bash
npm install                        # also runs `prisma generate` (postinstall)
npx prisma migrate dev --name init # creates the users / shelf_items tables
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

## Structure

```
prisma/schema.prisma       User + ShelfItem models
src/
  proxy.ts                 next-intl locale routing (Next 16 "proxy", formerly middleware)
  i18n/                    routing.ts, request.ts, navigation.ts
  app/
    [locale]/
      page.tsx              landing page
      sign-in/, sign-up/    auth pages
      app/shelf/            "My shelf" — product management
      app/scan/             scan flow (mocked for the MVP)
      app/routine/          AM/PM routine + detected conflicts
      app/conflict/[id]/    conflict detail
      app/profile/          account, language, theme, delete account
    api/
      auth/[...nextauth]/    Auth.js handlers
      auth/register/         signup (rate-limited, zod-validated)
      shelf/                 DB-backed shelf CRUD (signed-in users)
      shelf/import/          migrates a guest's localStorage shelf on first sign-in
      account/                account deletion
    icon.tsx, apple-icon.tsx, icon-maskable.png/, manifest.ts   PWA assets
  components/
    ui/                   design system (button, card, dialog, tabs...)
    marketing/            landing page sections
  data/
    ingredients.ts         ingredient/rule structural data (text lives in messages/*.json)
    catalog.ts              product catalog for the demo/scan flow
  lib/
    routine-engine.ts       rule engine (routine + conflicts)
    shelf-store.tsx          useShelf(): localStorage for guests, DB-backed once signed in
    auth.ts, db.ts, env.ts, rate-limit.ts, validation.ts
messages/en.json, messages/ko.json   all UI + product copy, translated
```

## Security notes

- Passwords hashed with bcrypt (cost 12); generic "invalid credentials" error
  (no user enumeration on login).
- Zod validation on every write endpoint.
- In-memory rate limiting on login/register/shelf writes — fine for a single
  instance; swap `src/lib/rate-limit.ts` for a shared store (e.g. Upstash Redis)
  before running multiple instances in production.
- Security headers + a same-origin CSP set in `next.config.ts`.
- `src/lib/env.ts` fails fast on boot if `DATABASE_URL` / `AUTH_SECRET` are missing.

## Deploying

The app needs a real Postgres instance in production (a local file-based DB
won't survive Vercel's serverless/ephemeral filesystem). Easiest path:
Vercel dashboard → Storage → Create Database → Postgres — this injects
`DATABASE_URL` automatically. Then set `AUTH_SECRET` (a *different* one from
local dev) as a project env var.

## Possible next steps

- Real OCR of the ingredient list (product scan) instead of the mocked flow
- Widen the conflict rule base (currently ~12 actives)
- Severity scoring / before-after estimate per conflict
- Shared rate-limit store for multi-instance deployments

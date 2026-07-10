# Haru — your skincare routine, decoded

Haru analyzes the products you already own, flags ingredient conflicts
(over-exfoliation, actives that deactivate each other, useless
duplicates), and builds your personalized AM/PM routine based on your
actual skin profile — not a generic one.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS v4, hand-rolled shadcn/ui-style components (Radix primitives + CVA)
- Framer Motion for micro-animations
- [next-intl](https://next-intl.dev) — English + Korean, locale-aware routing (`/en`, `/ko`)
- next-themes — light/dark/system, real toggle
- PWA: installable, manifest + icons generated via `next/og` (no external assets needed)
- Postgres + [Prisma 7](https://www.prisma.io) (driver adapter, `@prisma/adapter-pg`)
- [Auth.js v5](https://authjs.dev) (Credentials provider, JWT sessions, bcrypt password hashing)
- [Stripe](https://stripe.com) for the Premium subscription (checkout, webhook, billing portal)
- [Resend](https://resend.com) for the newsletter
- Own rule + audit engine (`src/lib/routine-engine.ts`, `src/lib/audit-engine.ts`) — no
  external AI/API required for the ingredient-conflict logic itself

## Local setup

1. **Database** — point `DATABASE_URL` at a Postgres instance (see `.env.example`).
   Locally you can use anything (Postgres.app, Docker, `apt install postgresql`).
2. **Secret** — generate one: `openssl rand -base64 32`, put it in `AUTH_SECRET`.
3. Copy `.env.example` to `.env` and fill in both values. Everything else in
   `.env.example` (Stripe, Resend) is optional — those features degrade to a
   clear "not configured" state without them.

```bash
npm install                          # also runs `prisma generate` (postinstall)
npx prisma migrate dev --name init   # creates all tables
npm run seed                         # seeds 22 real, researched products
npm run seed:news                    # seeds 19 real beauty news items
npm run seed:test-accounts           # creates the two test accounts below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

### Test accounts

Created by `npm run seed:test-accounts` — **change or remove these before a
real production launch**, they're for local testing only:

| Account | Email | Password | Access |
|---|---|---|---|
| Admin | `admin@haru.app` | `HaruAdmin!2026` | Full `/admin` backend |
| Premium tester | `premium-tester@haru.app` | `HaruPremium!2026` | Active subscription, skin profile + shelf pre-filled, so quiz/audit/premium features are immediately testable |

## Structure

```
prisma/
  schema.prisma            All models: User, SkinProfile, Product, ShelfItem,
                           NewsItem, Newsletter(Subscriber), SeoMeta, Event, AuditRun
  seed.ts                  22 real products (researched, not fabricated)
  seed-news.ts             19 real beauty news items, categorized
  seed-test-accounts.ts    Admin + premium test accounts
src/
  proxy.ts                 next-intl locale routing (Next 16 "proxy", formerly middleware)
  i18n/                    routing.ts, request.ts, navigation.ts
  app/
    [locale]/
      page.tsx              landing page (news section, feature demo, etc.)
      sign-in/, sign-up/    auth pages
      app/shelf/            "My shelf" — product management
      app/scan/             product scan flow (mocked for the MVP)
      app/face-scan/        face-scan capture flow (scaffold — no AI analysis wired
                             in yet; shows an honest "coming soon" state)
      app/quiz/             skin profile questionnaire
      app/audit/            personalized routine audit (Premium) — missing steps,
                             skin-profile mismatches, product alternatives
      app/routine/          AM/PM routine + detected conflicts (free)
      app/conflict/[id]/    conflict detail
      app/product/[slug]/   full product sheet (origin, usage steps, INCI, conflict
                             preview against your current shelf)
      app/profile/          account, language, theme, delete account
      app/upgrade/          Premium plans + Stripe checkout / billing portal
      admin/                admin-only backend (see below)
    api/
      auth/, shelf/, products/, skin-profile/, news/, newsletter/, stripe/,
      admin/                REST endpoints backing all of the above
    icon.tsx, apple-icon.tsx, icon-maskable.png/, manifest.ts   PWA assets
  components/
    ui/                   design system (button, card, dialog, tabs...)
    marketing/            landing page sections (incl. beauty news)
    admin/                admin backend components (forms, tables, delete dialogs)
  data/
    ingredients.ts         ingredient/rule structural data (text lives in messages/*.json)
  lib/
    routine-engine.ts       conflict/routine engine
    audit-engine.ts         personalized audit (missing steps, skin-profile fit)
    products.ts             DB-backed product queries
    shelf-store.tsx          useShelf(): localStorage for guests, DB-backed once signed in
    entitlements.ts          Premium/admin access checks
    stripe.ts, mail.ts       Stripe + Resend clients (no-op until keys are set)
    analytics.ts             admin dashboard stats
    auth.ts, db.ts, env.ts, rate-limit.ts, validation.ts, admin-guard.ts
messages/en.json, messages/ko.json   all UI + product copy, translated
```

## Admin backend

Sign in with an `ADMIN`-role account and visit `/admin`:

- **Overview** — users, premium users, products, news, signups/activity charts
- **Users** — search, change role/subscription, delete
- **Products** — full CRUD (ingredients, origin, usage steps, pricing, images)
- **News** — full CRUD for the home page's beauty news section
- **Newsletter** — compose drafts, send via Resend, subscriber count
- **SEO** — per-page title/description overrides (wired into the home page;
  follow the same pattern in `src/lib/seo.ts` for other pages)

## Personalization

- **Skin quiz** (`/app/quiz`) — skin type, concerns, age range, sensitivities,
  climate, budget — saved per user.
- **Routine audit** (`/app/audit`, Premium) — flags missing essential steps
  (cleanser/moisturizer/SPF), products that don't fit the user's skin profile,
  and suggests matched alternatives from the catalog.
- Free vs. Premium is enforced server-side via `src/lib/entitlements.ts`
  (`hasPremiumAccess` — admins always pass, for support/testing).

## Security notes

- Passwords hashed with bcrypt (cost 12); generic "invalid credentials" error
  (no user enumeration on login).
- Zod validation on every write endpoint, including admin ones.
- Admin routes/APIs re-check the caller's role server-side on every request
  (`requireAdmin()` / `isAdmin()`) — never trust the client.
- In-memory rate limiting on login/register/shelf writes — fine for a single
  instance; swap `src/lib/rate-limit.ts` for a shared store (e.g. Upstash Redis)
  before running multiple instances in production.
- Security headers + a same-origin CSP set in `next.config.ts`.
- `src/lib/env.ts` fails fast on boot if `DATABASE_URL` / `AUTH_SECRET` are missing.
- Stripe webhook signature verification (`STRIPE_WEBHOOK_SECRET`) before trusting
  any subscription-status update.

## Deploying

The app needs a real Postgres instance in production (a local file-based DB
won't survive Vercel's serverless/ephemeral filesystem). Easiest path:
Vercel dashboard → Storage → Create Database → Postgres — this injects
`DATABASE_URL` automatically. Then set, as project env vars:

- `AUTH_SECRET` — a *different* one from local dev
- `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` — to enable
  Premium billing (register the webhook endpoint as `/api/stripe/webhook`)
- `RESEND_API_KEY`, `NEWSLETTER_FROM_EMAIL` — to enable newsletter sending
- `NEXT_PUBLIC_APP_URL` — your production URL (used in Stripe redirect URLs)

Run `npx prisma migrate deploy` (not `migrate dev`) against the production
database, then the three `npm run seed*` scripts if you want the same starter
content as local dev.

## Possible next steps

- Real OCR of the ingredient list (product scan) instead of the mocked flow
- Face-scan AI analysis (scaffold is ready; needs a vision API decision —
  Claude Vision, or a dedicated skin-analysis provider)
- Widen the conflict rule base (currently ~12 actives)
- Weekly automated news refresh (the schema/admin CRUD is ready; wire a
  scheduled job that researches and populates `NewsItem` — e.g. a Friday
  morning cron)
- Shared rate-limit store for multi-instance deployments

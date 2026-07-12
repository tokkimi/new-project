# Haru Improvements Plan

## Current Architecture
- Public home: `src/app/[locale]/page.tsx`, with product highlights, news, premium messaging, and public calls to action.
- Connected app shell: `src/app/[locale]/app/layout.tsx`, with sticky top header and mobile bottom navigation.
- Existing app routes: shelf, products, product scan, face scan, audit, profile, quiz, upgrade.
- Auth: NextAuth-backed session helpers in `src/lib/auth.ts`; app shelf and audit data are user-scoped.
- Data: Prisma models for products, shelf items, skin profile, subscriptions and related user data.
- Translations: English and Korean JSON files in `messages/`.

## Features To Preserve
- Public product catalog and product detail pages.
- Beauty news and product highlights on the public home.
- Existing shelf, profile, audit, product scan, checkout and premium flows.
- Product images, official source cleanup, and current catalog improvements.

## New Routes
- `/[locale]/app/today`: daily connected dashboard.
- `/[locale]/app/progress`: scan history and progress overview.
- `/[locale]/app/wellness`: stress, sleep, breathing, meditation and sounds.
- `/[locale]/app/wellness/face-care`: face massage, face yoga and gentle mobility library.

## Navigation
- Main app navigation should stay focused on: Today, Shelf, Scan, Audit, Profile.
- Wellness and Progress should be visible from Today and Profile without overloading the bottom bar.
- Product scan remains available, but the main Scan entry should prioritize the Face Scan experience.

## Face Scan Improvements
- Show one full mobile-first result section per analyzed skin module.
- Include visible result, confidence, practical gestures, and product recommendations inside each module.
- Allow adding recommended products directly to the routine/shelf from each module.
- Keep clear disclaimers: photo analysis is guidance, not a medical diagnosis.

## Wellness Scope
- Add integrated breathing, sound and relaxation tools without exposing external-source details.
- Present frequencies only as relaxation supports, with no therapeutic claims.
- Add face-care content with goal, duration, difficulty, zones, frequency, precautions and evidence level.

## Free And Premium
- Free: product base, simple profile, simple scan preview, basic routine, short audit, basic wellness exercises.
- Premium: complete Face Scan, unlimited history, global audit, detailed progress, full wellness library and exportable reports.
- Premium checks must remain server-side for paid-only actions.

## Database Notes
- Current changes should avoid destructive schema changes.
- Future scan history needs additive models for stored scan metadata, consented images, module scores and recommendations.
- User media must remain private and user-scoped.

## Regression Risks
- App shell changes can affect mobile spacing and bottom navigation.
- Scan result redesign can affect catalog loading and shelf add actions.
- New routes need translation coverage for English and Korean.
- Build may depend on production database and payment environment variables.

## Implementation Order
1. Stabilize app navigation and mobile header.
2. Redesign Face Scan result flow with module-level advice and product actions.
3. Add Today, Progress and Wellness routes.
4. Improve audit discoverability and mobile readability.
5. Run lint, typecheck, and build where environment allows.

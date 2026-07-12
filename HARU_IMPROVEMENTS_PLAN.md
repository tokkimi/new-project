# Haru Improvements Plan

## Current Architecture

- Next.js App Router with localized public routes under `/[locale]`.
- Public Home at `/[locale]` with marketing sections, recent products, beauty news, good habits, and Premium CTA.
- Connected app under `/[locale]/app/*` with product scan, face scan, shelf/routine workspace, audit, profile, quiz, products, and upgrade.
- Authentication uses NextAuth and server-side session checks.
- Premium access is checked server-side through the entitlement helper and subscription status.
- Data is stored in PostgreSQL through Prisma.
- Product data includes name, brand, origin, category, composition notes, usage steps, image, official URL, skin types, and concerns.
- Admin routes already exist for products, news, newsletter, SEO, users, and logs.
- Translations currently exist for English and Korean.

## Existing Pages To Preserve

- `/[locale]` public Home.
- `/[locale]/app/scan` product scan.
- `/[locale]/app/face-scan` face scan.
- `/[locale]/app/shelf` routine/product workspace.
- `/[locale]/app/audit` routine audit.
- `/[locale]/app/profile` account/profile settings.
- `/[locale]/app/products` product database.
- `/[locale]/app/upgrade` Premium presentation.
- Admin routes under `/[locale]/admin/*`.
- Legal page under `/[locale]/legal`.

## Must Keep On The Public Home

- General Haru Skin presentation.
- Face Scan as the main product signal.
- How Haru works.
- Audit presentation without showing personal user data.
- Latest products.
- Beauty news and articles.
- Premium benefits.
- Footer with legal/navigation links.

## New Or Improved Routes

- `/[locale]/app/progress`: scan history, comparison over time, visual evolution, user notes, and confidence-aware progress.
- `/[locale]/app/today`: personal daily dashboard with routine reminders, next action, recent scan, and audit shortcut.
- `/[locale]/app/wellness`: stress, sleep, breathing, meditation, and relaxation sounds.
- `/[locale]/app/wellness/face-care`: face massage, Gua Sha, Kobido-style massage, lymphatic drainage, scalp massage, and gentle face yoga.

## Data Changes Needed Later

- Additive scan history tables for saved scan metadata, consent, visible observations, confidence, recommendations, and comparison snapshots.
- Additive wellness content tables for breathing, meditation, sounds, sleep, and face-care exercises.
- Additive audit history table if audit reports should be saved and compared.
- No destructive table or route changes.

## Free And Premium Boundaries

Free:
- Product database.
- Product scan.
- Basic profile.
- Basic routine workspace.
- Limited or summary audit.
- Beauty news.
- General good habits.

Premium:
- Full face scan.
- Unlimited scan history.
- Complete shelf, routine, product, and global skin audit.
- Progress tracking.
- Advanced incompatibility detection.
- Personalized multi-week plan.
- Full wellness and face-care library.
- Exportable reports.

## Regression Risks

- Home must not become a personal dashboard.
- Face Scan claims must stay non-medical and avoid impossible measurements.
- Premium checks must remain server-side.
- User photos and personal skin data must stay private.
- Product imports must not reintroduce sets, bundles, promos, or fake duplicates.
- English and Korean translations must stay valid.

## Implementation Order

1. Strengthen public Home: Face Scan, audit presentation, latest products, news, Premium.
2. Improve Profile as a skin dossier.
3. Store scan history securely and add Progress.
4. Expand Product, Shelf, Routine, and Global Skin Audit.
5. Add Today dashboard.
6. Add Wellness: stress, breathing, meditation, sounds, sleep.
7. Add Face Care: massage, Gua Sha, Kobido-style, scalp, and face yoga.


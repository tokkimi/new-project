# Haru — ta routine skincare, décodée

Haru analyse les produits que tu possèdes déjà, détecte les conflits
d'ingrédients (sur-exfoliation, actifs qui se désactivent entre eux,
doublons inutiles) et construit ta routine matin/soir idéale.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS v4
- Composants UI façon shadcn/ui écrits à la main (Radix primitives + CVA)
- Framer Motion pour les micro-animations
- Moteur de règles maison (`src/lib/routine-engine.ts`) — pas d'IA/API
  externe requise pour le MVP, tout tourne côté client

## Démarrer

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/
    page.tsx              landing page
    app/shelf/            "Mon étagère" — gestion des produits
    app/scan/             flow de scan (mocké pour le MVP)
    app/routine/          routine AM/PM + conflits détectés
    app/conflict/[id]/    détail d'un conflit d'ingrédients
  components/
    ui/                   design system (button, card, dialog, tabs...)
    marketing/            sections de la landing page
  data/
    ingredients.ts         base d'ingrédients + règles de conflit
    catalog.ts              catalogue de produits pour la démo
  lib/
    routine-engine.ts       moteur de règles (routine + conflits)
    shelf-store.tsx          état de l'étagère (persisté en localStorage)
```

## Prochaines étapes possibles

- OCR réel de la liste INCI (scan de produit) au lieu du flow mocké
- Backend + comptes utilisateurs pour synchroniser l'étagère
- Élargir la base de règles de conflit (actuellement ~12 actifs)
- Score de gravité / estimation avant-après pour chaque conflit

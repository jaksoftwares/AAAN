# AAAN website

Informational website for the African Agricultural Advancement Network (AAAN).
Next.js (App Router, TypeScript, Tailwind CSS), with Supabase for enquiries and Cloudinary for media.

## Project layout

| Path | Contents |
| --- | --- |
| `app/` | Routes and global styles (brand tokens in `app/globals.css`) |
| `components/` | Shared UI |
| `lib/` | Server helpers: Supabase, Cloudinary, validation |
| `content/` | Site copy and facts, kept apart from layout |
| `supabase/migrations/` | Database schema |
| `assets/brand/` | Generated brand library (logos, icons, colours, fonts) |
| `brand/` | Brand master files and the generator script |
| `docs/` | Brand guidelines, website specification and copy |
| `scripts/sync-brand.mjs` | Copies `assets/brand` into `public/brand` before each dev and build |

## Getting started

```
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Syncs brand assets, then starts the dev server |
| `npm run build` | Syncs brand assets, then builds for production |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint (Next.js rules) |
| `npm run typecheck` | TypeScript check, no emit |

## Environment variables

All variables are listed in `.env.example`. Never commit `.env.local`.

- `NEXT_PUBLIC_SITE_URL`: public origin, for canonical URLs and the sitemap
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: media
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public Supabase access
- `SUPABASE_SERVICE_ROLE_KEY`: server-only, used to store form submissions

## Brand

Colours, type and logo use follow `docs/AAAN Brand Guidelines.md`. Do not restyle the logo or introduce new brand colours.

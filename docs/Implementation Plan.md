# AAAN Website: End-to-End Implementation Plan

Version 1.1 · 12 November 2026 · Status: draft for approval

> **Current structure (12 Nov 2026):** the work is split into Phase 1 (public website, English, hardcoded content, forms saved to Supabase) and Phase 2 (dynamic content, Cloudinary, French). The detailed Phase 1 plan is in `docs/Phase 1 Plan - Public Website (English).md`. The phases below are the longer-term reference. The staff panel, admin and third-party integrations are later work, outside Phases 1 and 2.

Written for: the AAAN project sponsor, the web and communications team, and the engineering team who will build and run the site.

This plan takes the AAAN website from the current setup to launch and four weeks of hypercare. It is organised in phases. Each phase has a goal, tasks, deliverables, an owner and an exit gate. A phase is not complete until its exit gate is met and recorded.

Sources: `docs/AAAN Website Design Specification.md`, `docs/AAAN Website Content (English).md`, `docs/AAAN Brand Guidelines.md`, `docs/AAAN — Company Profile & Brand Concept.md`, `docs/AAAN Photo & Video Asset Library.xlsx`, `docs/AAAN Leadership Team.xlsx`, and the media in `assets/`.

---

## 1. Scope

**In scope**

- A bilingual (English and French) informational website of about 45 pages per language: home, about, what we do, crops and products, where we operate, sustainability, quality, partners and buyers, farmer sign-up, contact, careers, news, and legal pages.
- Backend functions at launch: enquiries and quote requests, farmer sign-ups and newsletter subscribers, stored in Supabase.
- Hardcoded at launch: news, job listings, leadership profiles, statistics and partners (decision D3). A staff editing area follows after launch.
- Media delivery through Cloudinary: photographs, the brand film and other videos, and captions.
- Supabase for data, authentication for staff, and storage for gated documents.
- Search engine optimisation, accessibility, performance, security, privacy and analytics with consent.
- Deployment, monitoring, documentation and staff handover.

**Out of scope for launch** (candidates for a later release)

- An online shop or payments.
- A farmer portal with logins and farm records (the farmer app is an internal product).
- A traceability lookup for buyers, unless the data model is agreed in Phase 0.
- A native mobile app.

---

## 2. Current state (what is already done)

| Area | Status | Where |
| --- | --- | --- |
| Brand kit: logos, icons, colour, type, rules | Complete | `brand/`, `assets/brand/`, `docs/AAAN Brand Guidelines.md` |
| Brand asset generator and showcase page | Complete | `brand/scripts/generate-brand-assets.mjs` |
| Website copy (English), all pages | Drafted, needs approval and reconciliation (see decision D1) | `docs/AAAN Website Content (English).md` |
| Project setup: Next.js 16, TypeScript, Tailwind v4, ESLint, Zod, Supabase client | Complete; typecheck, lint and build pass | root |
| Brand tokens in Tailwind | Complete | `app/globals.css` |
| Environment template | Complete | `.env.example` |
| Brand sync to `public/` | Complete | `scripts/sync-brand.mjs` |
| Media inventory | Complete (section 6) | `assets/media`, `assets/directors` |
| Leadership and photo-library spreadsheets | Complete as source data | `docs/` |
| Git repository | Not started (decision D6) | root |
| Supabase project, Cloudinary account, hosting, domain | Not provisioned | Phase 0 |
| French copy (full) | Not started; headings and menus only | Phase 4 |
| Feature pages, forms, backend | Not started | Phases 3 to 9 |

---

## 3. Decisions required before Phase 1

These decisions change the build. Each row shows its status. The blocking decisions (D1 to D4) were recorded on 12 November 2026, so Phase 1 can start. Deferred items are built after launch, as noted in each row.

| ID | Decision | Recommendation | Blocks |
| --- | --- | --- | --- |
| **D1 decided** | **Which facts?** The website copy says 12,000+ farmers, 15 export countries, Nairobi head office, 55,000 tonnes, 6 nurseries, 5 processing facilities and 420+ staff. The Company Profile says 25,000+ farmers, 32 countries, Ol Kalou head office, 120,000 tonnes, 12 nurseries, 7 processing facilities and 850+ staff. | **Decided (12 Nov 2026): the website copy figures.** Store every figure once in `content/facts.ts`. Update the brand guidelines key facts and the Company Profile to match, so that no document disagrees with the site. | Phase 0 action only |
| **D2 decided** | **AI-generated imagery.** The 80 PNGs in `assets/media` were generated from the prompts in the photo library. They are 1392 × 1040 px, below the 6,000 px RAW spec, and the library records 0 photos approved. The brand guidelines require real AAAN people, farms and plants. | **Decided (12 Nov 2026): generated images are used at launch.** To confirm: no generated image of a real person, and no generated image in the shots the library marks "real photo only" (P008 head office, P009 leadership portraits). Real photography replaces generated images as it is shot. The brand guidelines' imagery section needs a matching note. | Phase 2 |
| **D3 decided** | **Content editing model.** The specification proposes Sanity as the CMS. The brief specifies Supabase. | **Decided (12 Nov 2026): all content is hardcoded for launch.** News, jobs, leadership, statistics and partners live in `content/` files, changed through pull requests. Only enquiries, sign-ups and newsletter sign-ups use Supabase. The staff editing area (Supabase Auth, MFA, approval step) is a post-launch phase (Phase 9). | Phase 3 |
| **D4 decided** | **French launch.** Only headings and menus are translated. The body text is not. | **Decided (12 Nov 2026): the `/fr` routes launch with French interface text and English body copy until the professional translation is delivered.** The translation is then replaced page by page. Phase 4 treats full French copy as a launch target, and the translation deadline is tracked as a risk (section 11). | Phase 4 |
| **D5 deferred** | **Enquiry handling.** The specification assumes HubSpot or Zoho CRM. | No CRM for now. Every enquiry is stored in Supabase with its routed team, and the teams review it there. A CRM connector can follow after launch. | After launch |
| D6 | **Version control.** The project has no git repository. | **Decided (12 Nov 2026): not yet.** When AAAN asks, initialise git with `main` (production), `staging` and feature branches, and protect `main` with required review. Until then, Phase 0 work is tracked by the decision log and the change log. | Phase 0 (deferred) |
| **D7 deferred** | **Transactional email** | No email provider at launch. Confirmations and team alerts are added after launch (Resend recommended, with SPF, DKIM and DMARC on the AAAN domain). | After launch |
| **D8 deferred** | **Bot protection on forms** | At launch: honeypot field and server-side rate limits. Cloudflare Turnstile is added after launch. | After launch |
| **D9 deferred** | **Analytics and consent** | No analytics or third-party scripts at launch. GA4 in Consent Mode v2, with an EN/FR consent banner, is added after launch. | After launch |
| **D10 open** | **Hosting and DNS** | Not chosen yet. Vercel is recommended for the Next.js app, with the domain and DNS set up before launch. Staging and production are separate projects with separate keys. Must be decided before Phase 13. | Before Phase 13 |
| **D11 accepted** | **Map** | A brand-styled SVG map of the three countries with site pins, at launch. A MapLibre map can follow when a tile provider is chosen. | Phase 8 |
| **D12 partly deferred** | **Public documents** | At launch: public policies and the press kit in `public/downloads/`. Gated specification-sheet downloads (Supabase Storage) are added after launch. | Phase 8 |
| D13 | **Office contacts, domain and WhatsApp numbers** | AAAN to provide by end of Phase 1. The site shows placeholders in staging only. | Phase 5 |
| D14 | **Legal review** of privacy notice, cookie policy, terms, and data-protection requirements in Kenya (Data Protection Act 2019), Ghana (Data Protection Act 2012) and Côte d'Ivoire (Law 2013-450). | Engage counsel in Phase 0. Confirm data controller and retention periods. | Phase 4 |
| D15 | **Claims substantiation.** Several claims need evidence before publication: "deforestation-free", "every farm GPS-mapped", "no child labour", "Ghana FDA registered", "HACCP-based food-safety systems in every plant", and the certifications on the quality page. | Build a claims register in Phase 4. Each claim gets a source document. Remove any claim that cannot be evidenced. Show only certificates AAAN holds. | Phase 4 |

---

## 4. Architecture

### 4.1 Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16, App Router, React 19, TypeScript | Server components by default. Client components only for interaction. |
| Styling | Tailwind CSS v4, tokens in `app/globals.css` | Brand tokens mirror `assets/brand/colour/brand-tokens.css`. |
| Fonts | `next/font/google`: Fraunces (400, 600), Manrope (400 to 700) | Self-hosted by Next at build time. |
| Validation | Zod 4 | Shared schemas for forms, server actions and environment variables. |
| Data | Supabase (Postgres, row-level security) for enquiries, sign-ups and newsletter | Service-role key on the server only. Auth and storage come with the post-launch editing area and gated downloads. |
| Media | Cloudinary (images, video with adaptive streaming, captions) | Delivered through a Next.js image loader. |
| Email | Deferred (D7) | Added after launch. |
| Bot protection | Honeypot and rate limits at launch (D8) | Turnstile added after launch. |
| Analytics | Deferred (D9) | None at launch. |
| Hosting | Open (D10) | Chosen before launch. |
| Testing | Vitest (units), Playwright (end-to-end, axe for accessibility), Supabase CLI (local database tests) | See section 9. |

### 4.2 Folder structure (target)

```
app/
  [lang]/                    English and French routes (en, fr)
    layout.tsx               header, footer, skip link, locale data
    page.tsx                 home
    about/  what-we-do/ [slug]/  crops/ [slug]/  where-we-operate/
    sustainability/  partners/  join/  contact/  careers/
    news/ [slug]/  privacy/  cookies/  terms/  search/
    not-found.tsx
  admin/                     staff area (Supabase Auth, MFA, role checks)
  api/                       health check (provider webhooks are added when providers are chosen)
  actions/                   server actions: enquiries, sign-ups, newsletter
  layout.tsx, globals.css, robots.ts, sitemap.ts, manifest.ts
components/
  brand/                     logo, icon, mark, lockups
  layout/                    header, mega menu, footer, language switch, skip link
  ui/                        button, link, card, stat, eyebrow, section, tag, form controls
  media/                     image, video player, caption track, gallery, brand panel
  forms/                     enquiry, quote, sign-up, newsletter, search
  sections/                  home and page sections (hero, value chain, crop grid, map, etc.)
content/
  facts.ts                   every figure, once (decision D1)
  crops.ts  what-we-do.ts  offices.ts  leadership.ts  partners.ts  certifications.ts
  copy/en/*.ts  copy/fr/*.ts copy for each page, one file per page group
  media.ts                   generated manifest: media key to Cloudinary public ID, alt text (EN and FR)
lib/
  i18n.ts  cloudinary.ts  supabase/server.ts  supabase/browser.ts  env.ts  validation.ts
  rate-limit.ts  seo.ts  email.ts  turnstile.ts  logger.ts
supabase/
  migrations/                schema and row-level security, versioned
  tests/                     database tests
scripts/
  sync-brand.mjs             copies brand static files into public/ (already in place)
  media/                     Cloudinary upload, manifest build, audit tools
  content/                   content checks: broken links, missing translations, banned phrases
e2e/                         Playwright tests
docs/                        plans, guidelines, specs, decision log, runbook
assets/                      source archive (not deployed): brand, media, directors
brand/                       brand masters and generator
public/                      only static files that must be served from the site root (section 5)
```

### 4.3 Routing and language

- Every public URL carries its language: `/en/...` and `/fr/...`. The root path redirects to `/en`, with a later option to redirect by browser language (the visitor's choice always wins).
- The language switch goes to the same page in the other language, using a mapping of slugs in `content/`.
- `hreflang` tags and a canonical URL on every page. The sitemap lists both languages.
- Known issue to resolve in Phase 3: the root layout currently sets `lang="en"` for every route. The `<html lang>` value must match the URL language, so the locale must be set per route.

### 4.4 Data model

At launch, only the first four tables below are created. The rest (news, jobs, people, statistics, partners, documents and the audit log) are created with the post-launch editing area (Phase 9), because their content is hardcoded until then.

| Table | Purpose | Key fields |
| --- | --- | --- |
| `enquiries` | Quote, partnership, investor, media and general enquiries | id, created_at, type, lang, name, email, phone, company, country, crop, quantity, destination, message, consent_at, status, routed_to |
| `farmer_signups` | Farmer and cooperative sign-ups | id, created_at, lang, full_name, phone, country, hub_id, crops (text array), farm_size, unit, is_cooperative_member, consent_at, status |
| `newsletter_subscribers` | Monthly updates | id, email (unique), lang, created_at, confirmed_at, unsubscribed_at |
| `news_articles` | News and insights, EN and FR | id, slug, category, published_at, title_en, title_fr, summary_en, summary_fr, body_en, body_fr, cover_media_key, status |
| `job_postings` | Careers | id, title, country, department, job_type, description_en, description_fr, apply_url, closes_at, status |
| `people` | Leadership and team | id, name, role_en, role_fr, group, country, qualification, bio_en, bio_fr, photo_media_key, display_order, status |
| `statistics` | Figures reused across pages | key, value, label_en, label_fr, updated_at |
| `partners` | Partner logos (with permission only) | id, name, type, logo_media_key, permission_on_file, display_order |
| `documents` | Downloads (specification sheets, reports, policies) | id, title, storage_path, gated (bool), language, published_at |
| `consent_log` | Record of consent given with each form | id, created_at, purpose, lang, version, source |
| `audit_log` | Staff changes to published content | id, created_at, actor, table_name, row_id, action |

Row-level security is on for every table. Public visitors can insert into the enquiry, sign-up, newsletter and consent tables through server actions only, never directly from the browser. Public reads go through views that expose only published rows.

---

## 5. Public folder and media strategy

### 5.1 Principle

- **Cloudinary holds all photographs and videos** that the site publishes. Its delivery is optimised automatically (AVIF and WebP, responsive sizes, adaptive video streaming), and the files stay out of the deployed bundle.
- **`public/` holds only static files that must be served from the site root or are small brand files.** Anything large or editable does not go there.
- **`assets/` is the source archive** and is not deployed. It stays on the team's drives or in Git LFS. Cloudinary is the system of record for published media.

### 5.2 Items that move to `public/`

| Item | Source | Destination | Why |
| --- | --- | --- | --- |
| Logo SVGs (horizontal, stacked, mark, wordmark, reversed, mono) | `assets/brand/logos/svg/` | `public/brand/logos/svg/` (via sync) | Used in the header, footer and SEO |
| Icon SVGs and the sprite | `assets/brand/icons/` | `public/brand/icons/` (via sync) | Used across pages |
| Favicon set | `assets/brand/favicon/` | `public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png` (copied to the root) | Browsers request these from the root path |
| Web manifest | new, `app/manifest.ts` | generated | Installable icon and theme colour |
| Default share image (EN and FR) | `assets/brand/social/` | `public/brand/social/` (via sync) | Fallback Open Graph image |
| Brand asset ZIP | `assets/brand/AAAN-brand-assets.zip` | `public/brand/` (via sync) | Press kit download |
| Published policies and press kit | to be supplied | `public/downloads/` | Public documents with stable links |
| `robots.txt` | generated | `app/robots.ts` (not in public) | Generated per environment |

Changes to the sync script, to make in Phase 3:
- Exclude `fonts/`. Fonts are self-hosted by `next/font`, so the TTF copies are not needed at runtime.
- Keep `index.html` and `brand-manifest.json` out of the build, as now.
- Copy the favicon set to the root path.

### 5.3 Items that do not go to `public/`

- `assets/media/` (80 PNG, 5 JPEG, 29 MP4) and `assets/directors/` (9 portraits): archive only, uploaded to Cloudinary when approved.
- `brand/source/`, `docs/`, the brand generator and its `node_modules`.
- Any unapproved or generated image (decision D2).

### 5.4 Cloudinary structure

Folders mirror the photo library so that the team can find assets the same way they are filed:

```
aaan/
  library/
    kenya/   ol-kalou/ nairobi/ kinangop/ kitale/ meru-kirinyaga/ ...
    ghana/   kumasi/ sefwi-wiawso/ techiman/ tema/ ...
    cote-d-ivoire/  abidjan/ san-pedro/ bouake/ korhogo/ ...
  people/    leadership/ farmers/ staff/ (with signed releases recorded)
  video/     films/ loops/ testimonials/ reels/ clips/
  captions/  vtt files for each video
  site/      page-specific compositions (approved, derived)
```

Public IDs follow the library's file-name rule: `AAAN_[HUB]_[Category]_[ID]_v[version]`, for example `AAAN_KE-OLK_Nursery_P002_v1`. Each asset carries tags for its status (`approved`, `on-website`), country, page usage, and language.

### 5.5 How media reaches the pages

1. Each approved asset has an entry in `content/media.ts`, generated by the media script. It holds the Cloudinary public ID, dimensions, focal point, alt text in English and French, and the pages that use it.
2. Pages refer to media by key, never by URL. A key that is missing from the manifest fails the build, so a broken image cannot ship.
3. The image component builds `srcset` from the Cloudinary loader, with `f_auto` and `q_auto`. Images below the fold use lazy loading. The hero uses priority loading.
4. Videos use Cloudinary's adaptive streaming profile with a poster frame. The hero loop is muted, under 6 MB, and paused when the visitor prefers reduced motion. The brand film opens in a dialog with English or French captions.

---

## 6. Media audit (current `assets/` contents)

| Group | Files | Size | Finding | Action |
| --- | --- | --- | --- | --- |
| Photographs, generated | 80 PNG | about 134 MB | Filenames match the generation prompts in the library. 1392 × 1040 px, below the 6,000 px spec. 7 are named placeholder or real-photo-only. | Hold outside launch (D2). Keep as staging placeholders only, labelled "placeholder", until replaced. |
| Photographs, JPEG | 5 JPEG (director portraits) | small | Portraits for Aaron Appiagyei (2), Antwi Kingsley (2) and Margaret Paula (1). | Confirm they are real photographs and that each person has agreed to use them (section 6.1). |
| Director portraits | 9 files | small | Includes "joseph-kariuki", "Grace", "KoffiYaoKouassi" and "Esi Mensah-Boateng". The leadership sheet lists "James Kariuki Njoroge" as Kenya country manager. Filename "joseph-kariuki" needs confirming. | Match each file to a person in the leadership sheet. Rename to the library convention. |
| Videos | 29 MP4 | about 70 MB, mostly 2 to 5 MB | Several versions of one clip: "Kenya Highland Sunrise" (three files), "Cocoa Seedling Nursery" and "-2". "Farmer Planting Seedling..mp4" has a double dot. Titles include timestamps, so these are working drafts. | Choose one version of each clip. Map each clip to a video ID (V01 to V11). Re-encode for delivery in Cloudinary. |
| Video IDs | V01 to V11 (library) | not yet filmed in full | The library lists 15 planned videos, with series counts. Current files are raw clips, not finished films. | Use the raw clips as background loops and b-roll. Film the outstanding scenes listed in the library. |

### 6.1 Consent and rights

- Every person shown in a photograph or video needs a signed model release (English and French), recorded against the Cloudinary asset.
- Children are not photographed or filmed while working (library direction). No exceptions.
- Leadership portraits must come from AAAN with the person's agreement. Do not use generated portraits for people.
- The leadership sheet contains email addresses with a placeholder domain. Only publish the contact details AAAN confirms in writing (D13).

### 6.2 Launch policy for imagery

- **Launch set:** approved, real media with releases. The library's priority-high shots first, then the rest by country.
- **Fallback:** where a page has no approved photograph, use a brand panel (forest green or ivory with the logo mark). Never use a generated image as a stand-in on the public site.
- **Staging:** placeholder images may appear, labelled "placeholder" in alt text and in the media manifest, so reviewers can see the layout.

---

## 7. Delivery phases

Sixteen weeks from kick-off to launch, then four weeks of hypercare. Some phases run in parallel; the dependencies column shows what each phase waits for.

### Phase 0: Mobilise and provision (week 1)

**Goal:** a working project, accounts and decisions in place before any feature work.

**Tasks**
- Record decisions D1 to D15 in `docs/Decision Log.md` with the approver and date.
- Git (D6, deferred by AAAN): when approved, initialise the repository with `main`, `staging` and protected branch rules, a pull request template and a commit convention. Until then, keep the change log current.
- Create the Supabase projects (staging and production) and the Cloudinary account (one cloud, with staging and production folders). Store secrets in the hosting platform, never in the repository. The hosting provider is chosen before Phase 13 (D10). Resend, Turnstile and analytics are deferred (D5, D7, D8, D9).
- Set up environment variable validation in `lib/env.ts` (zod) that fails the build when a required variable is missing.
- Engage counsel for legal review (D14).
- Confirm the team, owners and approval routes (section 10).

**Deliverables:** decision log; repository with branch protection; provisioned accounts for staging and production; env validation.

**Exit gate:** D2 and D3 recorded as decided (D1 and D4 are already decided, D6 is deferred). Staging deploys with no errors.

### Phase 1: Design system and templates (weeks 1 to 2)

**Goal:** every page type designed once, so that the build in later phases is assembly, not invention.

**Tasks**
- Review the brand tokens against the guidelines and the website specification's visual section. Confirm the type scale, spacing, radii and shadows, and the light-only decision.
- Specify the component library (section 4.2) with props, states (default, hover, focus, disabled, error), and responsive behaviour at 375, 768, 1024 and 1440 px.
- Design the page templates: home, inner page hero (three variants: standard, reversed on forest green, and photo with text panel), crop page, news article, careers list, form page, legal page.
- Design the section patterns: seed-to-shelf value chain, crop filter grid, country cards, value addition, impact figures, quality steps, partner logo wall, testimonial, two-path call to action, and newsletter band.
- Design the header: the mega menu for each main section, the utility bar on desktop, the mobile menu, and the transparent-to-solid behaviour on scroll.
- Define motion rules: short, purposeful, and disabled under reduced-motion preferences.
- Build a dev-only style guide route (`/dev/components`, blocked in production) to review the components in both languages.

**Deliverables:** component inventory; template designs reviewed on the style guide; motion and accessibility notes.

**Exit gate:** AAAN signs off the home page, one crop page and the contact page on the style guide.

**Depends on:** Phase 0 (D1, D2).

### Phase 2: Media pipeline (weeks 1 to 3, parallel with Phase 1)

**Goal:** every publishable asset in Cloudinary, with a manifest, rights recorded and nothing unapproved in the build.

**Tasks**
- Audit the files in section 6. Classify each as launch-approved, placeholder (staging only), generated (not for launch), duplicate, or archive. Keep the list in `docs/Media Audit.md`.
- Match each director portrait to a person in the leadership sheet. Confirm consent.
- Normalise file names: remove spaces, dashes and accented characters from public IDs. Keep the original name in metadata.
- Write `scripts/media/upload.ts`. It uploads by folder, uses signed uploads with the API secret, tags each asset, skips files already uploaded (matched by checksum), and writes the result to `scripts/media/out/upload-log.json`.
- Write `scripts/media/build-manifest.ts`. It reads the upload log and the alt-text file, and writes `content/media.ts`. The build fails if a page refers to a key that does not exist.
- Set up video: one encoded streaming version, a poster frame, caption tracks (English and French, WebVTT), and a muted, under-6 MB version for the home loop.
- Confirm the Cloudinary plan limits for storage, bandwidth and transformations, and set a usage alert.

**Deliverables:** media audit; upload and manifest scripts; manifest for the launch set; caption files; signed releases on file.

**Exit gate:** every launch-approved asset has a manifest entry, alt text in English and French, a focal point, and a release reference. The public build contains no `assets/media` files.

**Depends on:** D2, D3 (Cloudinary structure agreed).

### Phase 3: Foundation engineering (weeks 2 to 4)

**Goal:** the shared technical base that every page depends on.

**Tasks**
- Root and locale layouts: `<html lang>` set per route (section 4.3), skip link, header and footer shells, metadata defaults.
- Locale routing in `middleware.ts`: `/en` and `/fr`, root redirect, and the language switch that keeps the current page.
- Dictionaries for interface text (`lib/i18n.ts`): navigation, buttons, forms, errors, cookie banner, 404. French interface text is reviewed by the translator in Phase 4.
- Content model in `content/`: facts, crops, what-we-do pages, offices, leadership, partners, certifications. Every figure is read from `content/facts.ts`.
- Media components: image (Cloudinary loader, srcset, lazy loading), video (poster, captions, reduced-motion handling), and the brand panel fallback.
- Supabase clients: `lib/supabase/server.ts` (service role, server-only, imported only from server modules) and `lib/supabase/browser.ts` (public key).
- Server action scaffold with zod validation, honeypot check and rate limiting (`lib/rate-limit.ts`). Turnstile verification is added after launch (D8).
- Error handling: `error.tsx`, `not-found.tsx` (copy from the specification), and a loading state. Structured logging with no personal data in logs.
- Security headers in `next.config.ts`: a content security policy (allowing only the approved script, image and frame sources), HSTS, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`.
- SEO helpers (`lib/seo.ts`): titles and descriptions from the specification's section 11, canonical and hreflang tags, JSON-LD builders.

**Deliverables:** running shell with both languages; media, content and data layers; security headers.

**Exit gate:** a placeholder page renders in both languages with correct `lang`, titles, and hreflang tags. Typecheck, lint and build pass. The header and footer pass axe with no serious issues.

**Depends on:** Phase 0; Phase 1 for the header design.

### Phase 4: Content, translation and claims (weeks 2 to 8, in parallel)

**Goal:** approved copy in both languages for every page, with every claim evidenced.

**Tasks**
- Load the decided figures (D1: website copy figures) into `content/facts.ts`. Update the brand guidelines' key facts and the Company Profile's figures in the same piece of work, so no document disagrees with the site.
- Build the claims register: each claim, its source document, its owner, and its status. Remove any claim that cannot be evidenced (D15). Include the certification list and the badges shown.
- Write the complete French copy through a professional translator (D4). Keep the French tagline exactly as the brand kit gives it. The translator checks the terms "seed", "nursery", "cooperative", "offtake" and "Incoterms".
- Write alt text for every launch image, in English and French.
- Write the privacy notice, cookie policy, terms, and the notice for each form (purpose, retention, controller), reviewed by counsel (D14).
- Confirm the leadership bios, offices, WhatsApp numbers and email addresses (D13).
- Run the content checks in `scripts/content/`: missing translations, broken internal links, banned phrases (section 8.1 of the brand guidelines), and figures that differ from `facts.ts`.

**Deliverables:** approved copy (EN and FR); claims register with evidence; legal texts approved; content check report with zero errors.

**Exit gate:** AAAN approves the copy for every page in writing. The content check passes for both languages.

**Depends on:** D1, D4, D13, D14, D15.

### Phase 5: Core pages (weeks 4 to 8)

**Goal:** every public page built from the templates, in both languages.

**Build order** (highest value first)

| Order | Page | Key content | Depends on |
| --- | --- | --- | --- |
| 1 | Header and footer | Mega menu, utility bar, language switch, office cards, certifications strip | Phase 3 |
| 2 | Home | Hero, proof in numbers, who we are, seed-to-shelf chain, crop filter, where we operate, value addition, impact, quality steps, partners strip, latest news, two paths | Phases 1, 2, 3, 4 |
| 3 | Crops index and the 12 crop pages | Hero, sub-line, at-a-glance panel, from our farms, products, responsibility note, request a quote | Phase 4 |
| 4 | About | Hero, story, vision and mission, values, milestones timeline, leadership, numbers, closing band | Phase 2 (portraits), Phase 4 |
| 5 | What we do and five sub-pages | Overview, and seedlings, farming and technology, value addition, export and trade, farmer network | Phase 4 |
| 6 | Where we operate | Map (D11), site cards by country, export reach table | Phase 4 |
| 7 | Sustainability and impact; quality and certifications | Impact figures, five themes, responsible sourcing, SDG list, checkpoints, certificates, specification-sheet request | Phase 4, D15 |
| 8 | Partners and buyers | Why source, how ordering works, quote link, partner models, logo wall (with permission), investor block | Phase 4 |
| 9 | Join the network | Benefits, how to join, hub finder, sign-up form (Phase 6), story | Phase 6 |
| 10 | Contact | Reason selector, enquiry form (Phase 6), offices, opening hours, WhatsApp | Phase 6 |
| 11 | News list and article pages | Filters, three launch stories, newsletter, press kit | Phase 6 |
| 12 | Careers | Why AAAN, open roles (from the job table), graduate programme, empty state | Phase 6 |
| 13 | Legal pages and 404 | Privacy, cookies, terms, sitemap; 404 with links | Phase 4 |
| 14 | Search | Index of pages, crops and articles in the current language | Phase 5 pages |

**Tasks for each page:** build from its template; set metadata from the specification; add structured data (section 10); check keyboard use, focus order and headings; check both languages; add the page to the sitemap.

**Deliverables:** all pages in both languages, in staging.

**Exit gate:** every page passes the page QA checklist (section 9.3) in both languages, and AAAN's content owner signs off each page group.

### Phase 6: Backend, forms and notifications (weeks 5 to 8)

**Goal:** every form stores its submissions securely, sends the right confirmations and reaches the right team.

**Tasks**
- Write the Supabase migrations for the tables in section 4.4, with indexes on the fields the team filters by.
- Write row-level security policies. Public access is only through server actions. Add database tests that prove an anonymous client cannot read or write the protected tables.
- Build the forms with zod schemas shared between browser and server:
  - Quote request: the fields in the partners page (crop, product, quantity and unit, destination, delivery period, name, company, email, phone optional, message).
  - Farmer and cooperative sign-up: the fields in the join page, including hub selection.
  - Contact and enquiry: reason selector, general fields, consent line.
  - Specification-sheet request: product, name, company, email.
  - Newsletter: email, language, double opt-in.
  - Each form has the EN and FR error messages from the content file, and a consent record in `consent_log`.
- Routing rules (from the specification's enquiry table): each enquiry type sends an alert to the right team with the reply target. Teams and addresses are confirmed by AAAN (D13).

| Enquiry type | Team | Reply target |
| --- | --- | --- |
| Quote, international | Trade and Export, Abidjan | 1 business day |
| Quote, East Africa | Nairobi trade office | 1 business day |
| Farmer or cooperative sign-up | Country office for the hub | 2 business days |
| Partnership | Partnerships and Sustainability | 3 business days |
| Investor | Finance and Investment | 3 business days |
| Media | Communications, head office | 1 business day |
| Careers | HR, through the job board or the careers inbox | automatic acknowledgement |

- Routing: each enquiry is saved with the team it is routed to and its reply target. Teams and addresses are confirmed by AAAN (D13). The teams review open enquiries in Supabase until email alerts are added after launch (D7).
- Retention: a scheduled job that removes or anonymises records after the retention period in the privacy notice.
- Spam controls at launch: honeypot and rate limits per IP and per email address. Turnstile follows after launch (D8).
- Not in the launch scope: confirmation emails, the reply-target monitor and the CRM connector (D5, D7).

**Deliverables:** migrations; RLS tests; forms; routing field and team review view in Supabase.

**Exit gate:** every form passes end-to-end tests in both languages (valid, invalid, duplicate and rate-limited cases). A test enquiry is saved in staging with the correct team routing.

**Depends on:** Phase 3 (server scaffold), Phase 4 (form copy and notices).

### Phase 7: Media experiences (weeks 6 to 9)

**Goal:** the film, the imagery and the farmer voices present AAAN well, and load quickly on slow mobile networks.

**Tasks**
- Home hero: the loop (under 6 MB, muted, reduced-motion fallback to a still), with the brand panel as fallback.
- Brand film (V01): a dialog player with poster, captions in the visitor's language, transcript link, and keyboard controls.
- Farmer voices (V08): a series page with 16:9 and 9:16 versions, captions in English and French.
- Image galleries for crop, country and value-addition pages, with keyboard navigation and alt text.
- Impact page: the photographs and the figures in one layout.
- Check every media element on a 3G-equivalent network profile.

**Deliverables:** hero loop, film player, farmer voice series, galleries.

**Exit gate:** each video has captions in the required languages; no media element causes layout shift above 0.1 CLS; reduced-motion users see stills.

**Depends on:** Phase 2 (encoded videos and captions), Phase 5 (pages).

### Phase 8: Integrations (weeks 8 to 9)

**Goal:** WhatsApp, consent-based analytics, the newsletter, the map and the document downloads work.

**Tasks**
- WhatsApp click-to-chat, one number per country, pre-filled with the page's language and topic. Numbers from D13.
- No analytics, cookie banner or third-party scripts at launch (D9). The privacy notice states this. The consent banner in EN and FR is built with analytics after launch.
- Newsletter at launch: a sign-up form that stores the address, language and consent in Supabase. Double opt-in emails are added with the email provider after launch (D7).
- Map: brand-styled SVG of the three countries with site pins and filters (D11). Each pin links to its site card.
- Document downloads at launch: public policies and the press kit from `public/downloads/` (D12). Gated specification sheets through Supabase Storage are added after launch.
- Certification badges: shown only for certificates in the claims register, each linked to its certificate.

**Deliverables:** integrations, each with its tests.

**Exit gate:** newsletter sign-ups stored with their consent record; public downloads open in both languages; no third-party script loads on any page.

**Depends on:** Phase 6, D11, D12.

### Phase 9: Staff editing area (post-launch, not in the launch timeline)

**Status:** deferred by decision D3. News, jobs, leadership, statistics and partners are hardcoded for launch. This phase is planned now so that its scope is known, and it starts after the hypercare period (Phase 14) unless AAAN asks for it sooner. Until it ships, content changes are sent to the web team (section 10).

**Goal:** AAAN staff can publish news, jobs, people, figures and partner logos without a developer, with an approval step.

**Tasks**
- Supabase Auth with MFA for all staff accounts. Roles: Admin (web team), Editor (head office communications), Country contributor (draft only, for Kenya, Ghana and Côte d'Ivoire), and Approver (Partnerships and Sustainability office). Roles are stored in a table and checked in row-level security and in the server.
- Admin screens: news (EN and FR, with a preview), job postings, people, statistics (one place, reused across pages), partners (publish only where permission is on file), and documents.
- Approval workflow: a draft becomes published only after an Approver accepts it. Each change writes to `audit_log`.
- Enquiry inbox: a read-only view of enquiries and sign-ups for the teams, filtered by routing and status, with export to CSV.
- Editor guide: a short written guide, with screenshots, for each role.

**Deliverables:** admin area; approval workflow; audit log; enquiry inbox; editor guide.

**Exit gate:** a Contributor cannot publish; an Approver can; every change in the audit log; MFA is enforced for every staff account; the enquiry inbox reads only what the role allows.

**Depends on:** Phase 6 (tables), D3.

### Phase 10: Search engine, performance and accessibility (weeks 11 to 12)

**Goal:** the site is found, fast and usable by everyone.

**Tasks**
- Metadata for every page from the specification's section 11, under 60 characters for titles and under 155 for descriptions.
- Structured data: Organization (with logo, addresses and social links) on every page; Product on crop pages; Article on news; BreadcrumbList on inner pages; JobPosting on careers.
- Sitemap with both languages and hreflang; `robots.txt` per environment (staging blocked from indexing).
- Open Graph and LinkedIn share images from the brand templates, generated for each news article and crop.
- Performance budgets: largest contentful paint under 2.5 s on mobile, interaction to next paint under 200 ms, cumulative layout shift under 0.1, JavaScript under 170 KB compressed on the home page. Images in AVIF or WebP. Fonts with `display: swap`.
- Accessibility: WCAG 2.2 AA. Contrast checks on every token pair (the token notes already record them). Keyboard and screen-reader testing of the mega menu, the forms, the map and the dialog player.
- Lighthouse CI on every pull request, with the budgets as failing thresholds.

**Deliverables:** SEO and structured data; sitemap; performance report; accessibility report.

**Exit gate:** Lighthouse performance and accessibility at or above 90 on home and crop pages (mobile); no axe serious or critical issue; structured data validated.

**Depends on:** Phase 5.

### Phase 11: Security and privacy (weeks 11 to 12, in parallel with Phase 10)

**Goal:** the site and the data are protected, and the privacy commitments are met.

**Tasks**
- Threat model for the forms, the staff area, the storage and the media uploads. Record the mitigations.
- Dependency audit (`npm audit` and a software bill of materials). Pin versions. Enable automatic security updates.
- Secrets review: no secrets in the repository or the browser bundle; the service-role key used only on the server; key rotation schedule.
- Row-level security review and tests (Phase 6) repeated after all the page work.
- Content security policy review. Test that it blocks an injected script.
- Rate limits and the honeypot tested under load.
- Backups: daily Supabase backups with point-in-time recovery; a restore test on staging; Cloudinary asset backup policy confirmed.
- Privacy review against the notices in Phase 4: data controller named, retention applied, consent recorded, access and deletion requests handled through a named contact.

**Deliverables:** threat model; audit report; restore test record; privacy compliance checklist.

**Exit gate:** no critical or high findings open; a restore test passes; the privacy checklist is signed by AAAN and counsel.

**Depends on:** Phases 6 and 9.

### Phase 12: Quality assurance and user acceptance (weeks 12 to 14)

**Goal:** the site works for real visitors in both languages on the devices they use.

**Test strategy**

| Level | What | Tool | When |
| --- | --- | --- | --- |
| Unit | Validation schemas, formatters, facts, media manifest, i18n helpers | Vitest | Every pull request |
| Integration | Server actions against a local Supabase, RLS policies | Supabase CLI, Vitest | Every pull request |
| End-to-end | Navigation, language switch, each form, consent, staff workflow | Playwright (Chromium, Firefox, WebKit) | Every pull request for critical paths; nightly for all |
| Accessibility | Automated checks on every page; manual screen-reader checks on key flows | axe, NVDA and VoiceOver | Each page group; before launch |
| Visual | Screenshots of templates and key pages at four widths, both themes disabled (light only) | Playwright snapshots | Every pull request for templates |
| Performance | Lighthouse CI budgets | Lighthouse CI | Every pull request |
| Devices | Real phones (Android and iOS) on mobile data | manual | Before launch |

**Page QA checklist (applies to every page, both languages)**
- Title, description, canonical and hreflang are correct.
- Every figure matches `content/facts.ts`.
- Every image has alt text; decorative images are hidden from assistive technology.
- Every link works; external links open with `rel="noopener"`.
- Headings step down in order; one `h1` per page.
- Keyboard: every control reachable; focus visible; no keyboard trap.
- Works at 375 px wide with no horizontal scroll.
- Text meets contrast requirements in the light theme.
- The language switch goes to the same page in the other language.
- No placeholder text, no "lorem", no generated image.

**User acceptance testing**
- Five sessions with AAAN staff: two from Kenya, two from Ghana or Côte d'Ivoire, one from the Partnerships office. Each runs scripted tasks: find a crop and request a quote; join the network; find the nearest hub; send a partnership enquiry; find a job.
- Results go into the defect log with severity: critical (blocks a task or breaks a language), high (wrong fact or broken form), medium (layout or wording), low (polish).
- Critical and high defects are fixed before launch. Medium defects are scheduled. Low defects are logged.

**Deliverables:** test reports; defect log; UAT sign-off.

**Exit gate:** zero open critical or high defects; end-to-end suite passing on all three browsers; UAT signed by AAAN.

### Phase 13: Deployment and launch (weeks 14 to 16)

**Goal:** the site goes live safely, with monitoring and a rollback plan.

**Tasks**
- Staging sign-off: the same release candidate that will go to production, with production-like data volumes and keys.
- Production environment variables set in the chosen hosting platform (D10); the Supabase production project migrated with the reviewed migrations only.
- Domain and DNS in Cloudflare; HTTPS, HSTS preload where appropriate; redirects from any previous URLs to the new pages.
- Turn on Cloudinary and Supabase usage alerts; uptime monitoring on the home page, a form, and the health check route.
- Error tracking with no personal data in reports; alerts routed to the web team.
- Runbook: deploy, roll back, rotate keys, restore from backup, add a page, add a news article, and handle an urgent takedown.
- Soft launch: a short period on the production domain before public announcement, with a check that every form saves its submission in production.
- Public launch and announcement: the news article "AAAN launches its new website" published in both languages.

**Deliverables:** production site; runbook; monitoring; launch record.

**Exit gate:** launch checklist (appendix A) complete; a test enquiry from production reaches the right inbox; rollback tested on staging.

### Phase 14: Hypercare and handover (weeks 16 to 20)

**Goal:** the site runs well after launch, and AAAN's team can maintain it.

**Tasks**
- Four weeks of close monitoring: error rates, form completion, email delivery, uptime and performance. A daily review for the first two weeks, then weekly.
- Fix defects by severity. Hold changes to content and the site to a weekly release.
- Measure against the goals in the specification's section 1 (form submissions, quote requests, farmer sign-ups, time on the crop pages, and language mix). Report at week 20.
- Handover of content changes: a short session with the content owners on how to request a change, how the web team applies it, and how it is checked before it goes live. Staff training for the editing area follows when Phase 9 ships.
- Handover pack: architecture, environment inventory, runbook, decision log, media manifest process, and the content backlog.

**Deliverables:** hypercare reports; training records; handover pack.

**Exit gate:** no open critical defects; all roles trained; AAAN accepts the handover in writing.

---

## 8. Timeline and milestones

| Week | Phases in progress | Milestone |
| --- | --- | --- |
| 1 | 0, 1, 2 | **M1 Decisions locked and accounts provisioned** |
| 2 | 1, 2, 3, 4 | |
| 3 | 1, 2, 3, 4, 5 starts | **M2 Design approved and media manifest for launch set** |
| 4 | 3, 4, 5, 6 starts | |
| 5 | 4, 5, 6 | |
| 6 | 4, 5, 6, 7 | |
| 7 | 4, 5, 6, 7 | |
| 8 | 4, 5, 6, 7, 8 starts | **M3 Content and forms complete** |
| 9 | 5, 7, 8 | |
| 10 | 5, 10 | |
| 11 | 10, 11 | **M4 Feature complete** |
| 12 | 10, 11, 12 | |
| 13 | 12 | |
| 14 | 12, 13 | **M5 UAT signed and release candidate approved** |
| 15 | 13 | |
| 16 | 13 | **M6 Public launch** |
| 17 to 20 | 14 (hypercare) | **M7 Hypercare closed and handover accepted** |

The timeline matches the specification's delivery plan: 16 weeks from kick-off to launch, with four weeks of monitoring after it. A slip of more than one week on Phase 4 (content) or Phase 2 (media approvals) moves M3 and M6 by the same amount. Those two phases depend on AAAN's people, so AAAN's owners are asked to hold their review dates.

---

## 9. Quality and verification

### 9.1 Definition of done (every feature)

- Acceptance criteria met in English and French.
- Unit and end-to-end tests written and passing.
- Accessibility checks pass (no serious or critical axe issues).
- Reviewed by a second engineer; approved on the staging deployment.
- Content and figures checked against `content/facts.ts`.
- No new console errors or warnings in the browser.
- Logged in the change log, with any new environment variable added to `.env.example` and the README.

### 9.2 Continuous integration

Every pull request runs: typecheck, lint, unit tests, database tests, build, end-to-end tests on critical paths, Lighthouse CI, and the content check. A failing check blocks the merge.

### 9.3 Page QA checklist

Listed in Phase 12. Each page group is checked by the web team, then by the content owner, before sign-off.

### 9.4 Browser and device matrix

| Platform | Versions |
| --- | --- |
| Desktop Chrome, Edge | Latest two major versions |
| Desktop Firefox | Latest two major versions |
| Desktop Safari | Latest two major versions |
| Android Chrome | Latest, on a mid-range phone |
| iOS Safari | Latest two major versions, on an iPhone |
| Slow network | 3G-equivalent throttling in tests |

---

## 10. Roles and approvals

| Role | Responsible for | Who (AAAN) |
| --- | --- | --- |
| Project sponsor | Decisions D1 to D15; launch approval | Managing Director |
| Brand and content owner | Copy approval; brand compliance; media selection | Head office communications |
| Content approver | Approval of impact, sustainability and partner content | Partnerships and Sustainability office |
| Finance owner | Facts and figures (D1) | Finance and Investment |
| Trade owner | Quote and export content; enquiry routing | Trade and Export, Abidjan |
| Country contributors | Local hub content and farmer stories, sent to the web team as change requests until the editing area ships (Phase 9) | Country managers, Kenya, Ghana and Côte d'Ivoire |
| Legal | Privacy, cookies, terms, consent (D14) | Counsel, to be appointed |
| Translator | French copy and terminology (D4) | Professional translator, to be appointed |
| Photographer and videographer | Shoots per the library, with releases | To be appointed |
| Web team | Build, deployment, security, support | Engineering lead, frontend, backend, QA, product owner |

Approvals are recorded in `docs/Decision Log.md` and in the content tracker. Nothing is published without the approver's named sign-off.

---

## 11. Risk register

| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Figures stay inconsistent across documents | High | High | Single source in `facts.ts` (D1); content check in CI | Finance owner |
| Generated images misrepresent AAAN, or stand in for real people | Medium | High | No generated image of a real person; real photography replaces generated images as shot; generated images labelled in the media manifest (D2) | Brand owner |
| Real photography delayed | High | High | Generated images at launch (D2) are replaced as real shoots complete; prioritised shot list | Brand owner, photographer |
| French translation late | Medium | High | Translator appointed in Phase 0; `/fr` held back if not ready (D4) | Project sponsor |
| Unverified claims published | Medium | High | Claims register (D15); remove claims without evidence | Content approver |
| Personal data exposed through the service key | Low | Critical | Server-only key; secret scanning; RLS tests | Engineering lead |
| Spam or abuse on forms, with no Turnstile at launch | High | Medium | Honeypot and rate limits at launch; Turnstile added soon after launch (D8) | Backend engineer |
| Video size slows the site on mobile | Medium | Medium | Adaptive streaming; loop under 6 MB; budgets in CI | Frontend engineer |
| Cloudinary or Supabase usage limits reached | Low | High | Usage alerts; plan review in Phase 2 | Engineering lead |
| Legal requirements not met in one country | Medium | High | Counsel review (D14); retention and consent records | Legal |
| Content changes wait on developers until the editing area ships | High | Medium | Changes batched through the web team; editing area planned as Phase 9 after launch | Project sponsor |
| Launch slips past week 16 | Medium | Medium | Phase 4 and Phase 2 owners hold review dates; scope cut list agreed in advance | Project sponsor |

**Scope cut list** (agreed now, used only if the timeline slips): the news search filter; the crop filter animation; the map upgrade (keep the SVG map); the admin export; the Clarity heatmaps. Launch-critical features are not on the cut list.

---

## 12. Appendix A: launch checklist

- [ ] D1 to D15 recorded in the decision log
- [ ] Facts reconciled; brand guidelines updated to match
- [ ] Copy approved in English and French for every page
- [ ] Claims register complete; unevidenced claims removed
- [ ] Legal texts approved by counsel
- [ ] Launch imagery approved, with releases; no generated images on the public site
- [ ] Videos captioned in the required languages
- [ ] All forms tested end to end in both languages, including spam and rate-limit cases
- [ ] Enquiries saved in production and visible to the named team members
- [ ] No analytics or third-party scripts on the site at launch (D9 deferred)
- [ ] Sitemap, robots and hreflang correct; staging not indexed
- [ ] Redirects from previous URLs in place
- [ ] Lighthouse and accessibility thresholds met
- [ ] Security headers verified on the production domain
- [ ] Backups confirmed; restore test passed
- [ ] Monitoring and alerts live
- [ ] Runbook and content-change guide published
- [ ] Rollback tested
- [ ] UAT signed by AAAN; release approved in writing by the project sponsor

---

## 13. Appendix B: items to confirm with AAAN

1. The correct figures (D1), and the source each one comes from.
2. Whether the leadership portraits are real photographs, and whether each person has agreed to use them. Confirm the identity of "joseph-kariuki.png".
3. The public contact details for each office, and the WhatsApp numbers.
4. Which certificates AAAN holds today, with the certificate documents for each.
5. The CRM, if any, and the email addresses that receive each enquiry type.
6. The translator, counsel and photographer, and their start dates.
7. The domain name and the email domain.
8. Whether partner logos may be shown, and for which partners.
9. Whether `assets/media` should stay in the repository (Git LFS) or move to a shared drive.
10. Whether the video clips are final edits or working drafts, and which version of each clip is the one to use.

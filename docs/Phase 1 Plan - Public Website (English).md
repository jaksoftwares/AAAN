# Phase 1: Public Website (English)

Version 1.0 · 12 November 2026 · Status: draft for approval

Written for: the AAAN project sponsor, the communications team, and the engineers building the site.

---

## 1. Phase structure

| Phase | Name | What it delivers | Status |
| --- | --- | --- | --- |
| **1** | **Public website, English** | Every public page in English, with every public workflow working end to end. Content is hardcoded in the codebase. Forms save their submissions. Media is referenced directly. | This plan |
| **2** | **Dynamic content and French** | Content moves into Supabase and is read from the database. Cloudinary becomes the media source. The French version is built. | Planned after Phase 1 exit |
| Later | Staff panel and admin, then integrations | Editing area with roles and approval. Email, CRM, bot protection, analytics, gated downloads. | Not in Phases 1 or 2 |

Phase 1 is complete when the English site works from start to finish on staging, the workflows in section 6 pass, and AAAN approves the content in writing. It does not require production launch, which needs the hosting decision (D10) and legal review (D14).

---

## 2. Decisions for Phase 1

These follow from your instructions. Items marked **confirm** need your yes or no before build.

| ID | Decision | Detail |
| --- | --- | --- |
| P1 | Facts | The website copy figures (decided 12 Nov 2026). Stored once in `content/facts.ts`. |
| P2 | English only | Phase 1 has English routes only. French is not built, and no French link is shown. |
| P3 | URL structure | **Confirm:** English pages sit under `/en/...` from day one, so that French can be added under `/fr/...` in Phase 2 without changing any English URL. The root `/` redirects to `/en`. |
| P4 | Content is hardcoded | News, jobs, team, partners, crops and offices come from files in `content/`. No database reads for content in Phase 1. |
| P5 | Forms are saved | **Confirm:** every form saves its submission to Supabase in Phase 1, so that each public workflow is complete end to end. Nothing is emailed yet (D7 deferred). |
| P6 | Gateways | Each content list and each form has a single gateway function. Phase 1 gateways read from code or write to Supabase. Phase 2 replaces the implementation, not the calling code. |
| P7 | Media is referenced directly | Web-ready copies of the files in `assets/media` and `assets/directors` are placed in `public/media/`. Pages refer to them by path. No Cloudinary in Phase 1. |
| P8 | Generated images | Used as decided (D2). No generated image is shown as a real person. Where a page has no suitable image, the brand panel is used. **Confirm** (see section 9). |
| P9 | Testimonial | **Confirm:** no testimonial on the home page. The copy's quote is marked as example text, pending the filmed interview (V08). |
| P10 | Download links | Specification sheets, the impact report and the policies do not exist as files yet. Their links are not shown. The press kit (brand asset ZIP) is shown. |
| P11 | Partners | **Confirm:** the institutions in section 9 are shown as text names only, with no logos, and are released only after AAAN confirms each one in writing (see section 9). |
| P12 | Staging host | A place to review the site is needed for acceptance. **Confirm:** a staging deployment on Vercel, with the domain decision (D10) left open for production. |

---

## 3. Scope

### 3.1 Included

- Every public English page in the sitemap: home, about (including leadership), what we do and its five sub-pages, crops and products (index and twelve crop pages), where we operate, sustainability and impact, quality and certifications, partners and buyers, join the network, contact, request a quote, careers, news (list and three articles), search, privacy, cookies, terms, and a 404 page.
- The header with the mega menu, the mobile menu, the utility bar and the footer.
- Forms (section 6) with validation, error and success states, and saved submissions.
- Newsletter sign-up in the footer and on the news page.
- Search over the English content.
- Metadata, structured data, sitemap, robots and share images for each page.
- Accessibility, performance and security baselines.
- Automated tests and a manual acceptance review.

### 3.2 Not included in Phase 1

- French pages, language switch and translation.
- Supabase-driven content, Cloudinary delivery, and any admin or staff panel.
- Email confirmations, bot protection (Turnstile), analytics, consent banner, CRM.
- Gated downloads and the specification-sheet request.
- Production launch, domain and DNS, production monitoring.

---

## 4. Architecture for Phase 1

### 4.1 Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 with the brand tokens already in `app/globals.css` |
| Fonts | Fraunces and Manrope via `next/font` |
| Validation | Zod, shared between the form and the server |
| Data | Supabase (Postgres) for form submissions only |
| Media | Static files in `public/media/`, prepared by a script (section 5) |
| Icons | The brand sprite at `/brand/icons/sprite.svg` |
| Testing | Vitest for logic, Playwright for the public workflows, axe for accessibility |

### 4.2 Folder layout

```
app/
  page.tsx                   redirect to /en
  en/
    layout.tsx               header, footer, skip link, metadata defaults
    page.tsx                 home
    about/page.tsx
    about/leadership/page.tsx
    what-we-do/page.tsx
    what-we-do/[slug]/page.tsx        five sub-pages
    crops/page.tsx
    crops/[slug]/page.tsx             twelve crop pages
    where-we-operate/page.tsx
    sustainability/page.tsx
    quality/page.tsx
    partners/page.tsx
    join/page.tsx
    contact/page.tsx
    request-a-quote/page.tsx
    careers/page.tsx
    news/page.tsx
    news/[slug]/page.tsx              three articles
    search/page.tsx
    privacy/page.tsx  cookies/page.tsx  terms/page.tsx
    not-found.tsx
  not-found.tsx
  sitemap.ts  robots.ts  manifest.ts
  actions/
    enquiry.ts  farmer-signup.ts  newsletter.ts
components/
  layout/    header, mega menu, mobile menu, footer, skip link, utility bar
  ui/        button, link, card, eyebrow, section, stat, tag, form controls
  media/     image, video, brand panel
  forms/     enquiry form, quote form, farmer sign-up form, newsletter form, search box
  sections/  home and page sections
content/
  facts.ts            figures, used everywhere
  site.ts             navigation, footer, offices, contact routes
  crops.ts            twelve crops
  what-we-do.ts       overview and five sub-pages
  team.ts             leadership (from the team spreadsheet)
  partners.ts         institutions (section 9, pending confirmation)
  certifications.ts   certifications (pending evidence, see section 9)
  news.ts             three launch stories, with bodies
  jobs.ts             open roles (empty at launch)
  pages/*.ts          copy for the other pages
  media.ts            media map: key to file path, alt text, page usage
lib/
  gateways/
    content.ts        read functions: getCrops, getTeam, getNews, getJobs, getPartners ...
    enquiries.ts      saves enquiries
    farmer-signups.ts saves sign-ups
    newsletter.ts     saves subscribers
  supabase/server.ts  service-role client, server only
  validation.ts       Zod schemas for every form
  seo.ts              metadata and structured data builders
  rate-limit.ts      simple per-IP and per-email limits
supabase/migrations/  tables for enquiries, farmer_signups, newsletter_subscribers
scripts/media/        prepare-web.mjs (section 5)
e2e/                  Playwright tests for the workflows in section 6
```

### 4.3 Gateways

The gateways are the seam between the pages and the data. Pages never import from `content/` or from Supabase directly. They call a gateway.

- **Read gateways** (`getCrops()`, `getTeam()`, `getNews()`, `getJobs()`, `getPartners()`): return typed data. In Phase 1 they return the arrays from `content/`. In Phase 2 they query Supabase. The return types do not change.
- **Write gateways** (`saveEnquiry()`, `saveFarmerSignup()`, `saveSubscriber()`): validate with Zod, check the honeypot and the rate limit, insert one row, and return `{ ok: true }` or a typed error. They are server-only.

### 4.4 Database for Phase 1

Three tables only.

| Table | Fields |
| --- | --- |
| `enquiries` | id, created_at, type (quote, partnership, investor, media, careers, general), reason, lang, name, email, phone, company, country, crop, product, quantity, unit, destination, delivery_period, message, consent_text_version, consent_at, routed_to, status |
| `farmer_signups` | id, created_at, full_name, phone, country, hub, crops (text array), farm_size, farm_unit, cooperative_member, consent_text_version, consent_at, status |
| `newsletter_subscribers` | id, created_at, email (unique), lang, consent_text_version, consent_at, status |

Row-level security is on. The browser has no direct access. Only the server actions write, with the service-role key.

---

## 5. Media in Phase 1

### 5.1 What is available

| Group | Files | Use in Phase 1 |
| --- | --- | --- |
| Photographs (generated, PNG) | 80 in `assets/media` | Page imagery, as decided (P8). Each is mapped to the page it suits. |
| Photographs (JPEG) | 5 in `assets/directors` | Leadership portraits for Aaron Appiagyei and Antwi Kingsley, and Margaret Paula. |
| Portraits (PNG) | 4 in `assets/directors` | Esi Mensah-Boateng, Grace, Koffi Yao Kouassi and "joseph-kariuki" (see section 9 on identity). |
| Videos | 29 MP4 in `assets/media` | Hero loop, and clips for crop, value-addition and operations sections. Film V01 is not yet made, so the film block uses a clip and is labelled as a preview. |

### 5.2 Preparation

A script, `scripts/media/prepare-web.mjs`, writes web versions into `public/media/`. It keeps the originals in `assets/`.

- Images: AVIF and WebP at 1200, 1800 and 2400 px wide, plus the source JPEG for the fallback. Original file names are kept, so mapping stays simple.
- Videos: H.264 MP4 at 720p and 1080p, with a poster frame. The home loop is muted, looped, and kept under 6 MB.
- Duplicates are resolved before preparation. Where the files are named "(1)", "-2" or "- 12 Nov 2026", one version is chosen and recorded in `docs/Media Audit.md`.
- Names with spaces, accents or dashes are converted to lowercase with hyphens for the public path.

### 5.3 Media map

`content/media.ts` maps every page image to its file and its alt text. Each entry records the page that uses it. A missing file fails the build, so a broken image cannot ship.

Page use is taken from the photo library's "Website use" column. For example P002 (nursery interior) goes to What we do > Seedlings, and P004 (seed potato harvest) goes to the Irish potatoes crop page.

### 5.4 Public folder

Phase 1 adds these to `public/`:

- `public/media/` (images and video, as above)
- `public/downloads/press-kit.zip` (the brand asset ZIP)
- `public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png` (copied from the brand set to the root)
- `public/brand/` (generated by `scripts/sync-brand.mjs`, already in place; the fonts folder is excluded because the fonts are loaded by `next/font`)

Source archives stay in `assets/` and are not deployed.

---

## 6. Public workflows (end to end)

Each workflow is tested in a browser from the first page to the confirmation, on desktop and mobile.

| ID | Workflow | Steps | Saves to |
| --- | --- | --- | --- |
| W1 | Request a quote | Home or crop page → Request a quote → choose crop, product, quantity and unit, destination, delivery period, details → submit → thank-you page | `enquiries` (type quote) |
| W2 | Join the network | Home or Join → read benefits → find your hub → sign-up form → submit → thank-you page | `farmer_signups` |
| W3 | Partnership or investor enquiry | Partners and buyers → Start a partnership or Contact investor relations → contact form with the matching reason → submit → thank-you page | `enquiries` (partnership or investor) |
| W4 | General enquiry | Contact → choose reason → form → submit → thank-you page | `enquiries` (matching type) |
| W5 | Newsletter | Footer or news page → email → subscribe → confirmation message | `newsletter_subscribers` |
| W6 | Find a country or site | Where we operate → choose country → site cards → link to the crop or contact page | none |
| W7 | Explore crops | Home → crop filter → crop page → at-a-glance details → request a quote | none (quote form saves through W1) |
| W8 | Read news | News → article → back to news → subscribe | none |
| W9 | Careers | Careers → open roles (empty state at launch) → send a CV through the careers reason in the contact form | `enquiries` (careers) |
| W10 | Search | Header search → type a term → results grouped by page, crop and article | none |
| W11 | Leadership | About → Leadership → person card → bio | none |
| W12 | Errors | Unknown URL → 404 page with links; form errors shown in place with clear messages | none |

### 6.1 Form rules (apply to every form)

- Each field has a visible label, and required fields are marked in text as well as visually.
- Validation runs on submit. Errors use the messages in the content file, and each error is linked to its field.
- A honeypot field is hidden from people and ignored by the server.
- The server rejects more than a set number of submissions per IP per hour and per address per day.
- Consent text is shown above the submit button, with a link to the privacy notice. The version of the consent text is saved with each submission.
- The submit button is disabled while sending. A failed save shows the error message from the content file, and the entered data is kept.
- The thank-you message is shown on a page of its own, so that a refresh does not resubmit.

---

## 7. Pages: content, components and media

| Route | Source | Components | Media (Phase 1) |
| --- | --- | --- | --- |
| `/en` Home | Website content §2 | Hero, proof numbers, who we are, seed-to-shelf, crop filter grid, where we operate, value addition, impact figures, quality steps, partner categories strip (names only after G1 is confirmed), latest news, two paths | Hero loop (muted, under 6 MB); crop tiles use the crop images; value addition uses the processing images |
| `/en/about` | §3 | Hero, story (four paragraphs), vision and mission, values, milestones timeline, numbers, leadership preview, closing band | Founders' portraits; operations photos |
| `/en/about/leadership` | Team spreadsheet | Person cards: photo, name, role, qualification, bio. Groups: Board of Directors, Country management | Director portraits from `assets/directors` |
| `/en/what-we-do` | §4 overview | Intro, five cards | Imagery per card |
| `/en/what-we-do/seedlings` | §4 Seedlings | Problem, how we do it (numbered), proof strip, call to action | Nursery images |
| `/en/what-we-do/farming-and-technology` | §4 | As above | Soil, drip irrigation, app images |
| `/en/what-we-do/value-addition` | §4 | Five facilities list with locations, proof, call to action | Processing images |
| `/en/what-we-do/export-and-trade` | §4 | Sourcing, specifications, logistics, documentation, proof | Port and container images |
| `/en/what-we-do/farmer-network` | §4 | Field schools, inputs on credit, guaranteed buyer, cooperatives | Field school images |
| `/en/crops` | §5 index | Filter tabs, twelve crop cards with tags (fresh, processed, both) | Crop images |
| `/en/crops/[slug]` ×12 | §5 and §6 | Hero with sub-line, at-a-glance panel, from our farms, products list, responsibility note where present, request-a-quote panel | Crop images from the library |
| `/en/where-we-operate` | §7 | Intro, country sections with site lists, export reach table | Site images |
| `/en/sustainability` | §8 | Headline, figures, five themes, responsible sourcing, SDG list | Farmer and field images |
| `/en/quality` | §8 | Five checkpoints, certifications grid (pending evidence, section 9) | Lab and grading images |
| `/en/partners` | §9 | Buyers (why, ordering steps, quote link), partners (models, institution names), investors | Warehouse and port images |
| `/en/join` | §9 | Benefits, how to join, hub finder (country → hub), sign-up form | Farmer images |
| `/en/contact` | §10 | Reason selector, form, offices (city and country), opening hours, WhatsApp block (hidden until numbers are supplied) | Office image |
| `/en/request-a-quote` | §9 quote form | Form, short note on response time (1 business day) | none |
| `/en/careers` | §10 | Why AAAN, open roles (empty state), graduate programme, apply link | Team images |
| `/en/news` | §10 | Filter tabs, three stories, newsletter, press kit | Story images |
| `/en/news/[slug]` ×3 | §10 and section 9 below | Article layout: date, category, body, related stories | Story images |
| `/en/search` | Site-wide copy | Search box, results | none |
| `/en/privacy`, `/en/cookies`, `/en/terms` | Legal drafts | Long-form text layout | none |
| 404 | §1 | Headline and three links | none |

Every page uses the Section, Eyebrow and Heading components from the design system, so that the layout is consistent throughout.

---

## 8. Quality bar

### 8.1 Brand

- Headlines use Fraunces. Body and interface text use Manrope. No text below 13 px.
- Colours come from the brand tokens only. Harvest gold is never used for text on light backgrounds.
- The logo is used only as a file from the brand set, at the sizes and grounds in the guidelines.
- Each page has one `h1`, and headings step down in order.
- Copy follows the voice rules: "we" and "you", sentence case, no emoji, no exclamation marks in headlines, and none of the banned phrases.

### 8.2 Accessibility (WCAG 2.2 AA)

- Keyboard reaches every control, with a visible focus ring.
- A skip link is the first focusable element.
- The mega menu and the mobile menu can be used with the keyboard alone and close on Escape.
- Images have alt text, and decorative images are hidden from assistive technology.
- Video has captions in English before it is shown. Where captions do not exist yet, the video is not shown.
- Reduced-motion preference stops the hero loop and turns off the menu animation.
- Contrast is checked for every text and background pair in the token notes.

### 8.3 Performance

- Largest contentful paint under 2.5 s on a mid-range phone with a fast connection, and under 4 s on a slow one.
- Cumulative layout shift under 0.1.
- The home page loads no more than 170 KB of JavaScript (compressed).
- Images are served as AVIF or WebP at the size the screen needs. The hero image is loaded first; everything else is lazy.
- The hero loop is loaded only after the page is interactive, and never on mobile data saver.

### 8.4 Search engine and sharing

- Each page has a unique title (under 60 characters) and description (under 155), from the specification's section 11.
- Canonical link on every page. The sitemap lists every page. `robots.txt` blocks indexing on staging.
- Structured data: Organization on every page, Product on crop pages, Article on news, BreadcrumbList on inner pages, JobPosting when a job is listed.
- Share images for the home page, crop pages and each article, built from the brand share template.

### 8.5 Security

- Security headers in `next.config.ts`: content security policy, HSTS, no sniffing, referrer policy, and permissions policy.
- Forms validate on the server. Input is never trusted from the browser.
- The service-role key is used only in server code. A build check confirms that it does not appear in the browser bundle.
- No third-party scripts. No analytics, no embedded maps from external providers.

---

## 9. Content gaps and risks

These must be closed before the affected page can be approved. The team is asked to decide in the order shown.

| # | Gap | Affects | Proposed handling | Owner |
| --- | --- | --- | --- | --- |
| G1 | **Partner names.** Section 9 of the Company Profile lists government ministries, regulators, research institutes, universities and international organisations. Naming them on the site implies a working relationship. | Partners page; home strip | Show names as text only, no logos. Each name is released only after AAAN confirms in writing that it may be shown. Until then, the partners block shows the three named partner categories without names. | Partnerships and Sustainability office |
| G2 | **Certifications.** The copy lists twelve certifications. Only those held can be shown, with evidence on file. | Quality page; footer | Build the page with the list. Publish only the certifications AAAN confirms, with a certificate reference for each. | Partnerships and Sustainability office |
| G3 | **Testimonial.** The copy's quote is marked as example text. | Home (impact section) | Omitted (P9). Added when the filmed interview is approved. | Communications |
| G4 | **Office details.** Addresses, phone numbers and email addresses are not supplied. | Contact; footer; where we operate | Show city and country only. The WhatsApp block is hidden until numbers are supplied. Enquiries use the form. | Communications, country managers |
| G5 | **Ghana and Côte d'Ivoire country managers.** Only the Kenya country manager is on the team spreadsheet. | About > Leadership | Show the three board directors and the Kenya country manager. Add the others when confirmed. | Communications |
| G6 | **Identity of "joseph-kariuki.png".** The team sheet lists James Kariuki Njoroge as Kenya country manager. | Leadership | Confirm the person, and rename the file. Used only after confirmation. | Communications |
| G7 | **News article bodies.** The copy gives summaries for the three launch stories, not full articles. | News pages | Draft each article from the summary and the facts file, for AAAN to approve. | Communications |
| G8 | **Privacy notice, cookie policy and terms.** Not drafted. | Legal pages; form consent text | Draft texts for counsel to review (D14). Phase 1 can show the draft, marked as a draft on staging only. | Counsel |
| G9 | **Specification sheets, impact report, policies.** Files do not exist. | Sustainability page; quote and specification flows | Links hidden (P10). Specification request form not shown. | Operations |
| G10 | **Brand film (V01).** Not yet made. | Home; about | Use a clip labelled "Preview" until V01 is approved. | Communications |
| G11 | **Generated imagery of people.** Some generated images show people. | Any page with a person in the image | Confirm (P8): generated images of people are not used. Brand panels are used instead. | Project sponsor |
| G12 | **Claims.** The copy includes claims that need evidence: "deforestation-free", "every farm GPS-mapped", "no child labour", "Ghana FDA registered", "HACCP-based food-safety systems in every plant", "Organic" and "EUDR-ready". | Crop pages; sustainability; quality | Claims register built with the content owner. Any claim without evidence is removed from the page before staging approval. | Content approver |

---

## 10. Build plan and timeline

Eight weeks from the start of the build. Each week ends with a working staging deployment.

| Week | Work | Exit |
| --- | --- | --- |
| 1 | Confirm P3, P5, P8, P9, P11 and P12. Prepare media (`prepare-web.mjs`) and the media map. Build the design-system components and the page shell (header, footer, mega menu, mobile menu, utility bar). Set up the Supabase tables for the three forms. | Shell and components in staging. Media map for the launch set. |
| 2 | Home page. Content gateways and content files for crops, team and news. | Home complete. |
| 3 | About, leadership, what we do and its five sub-pages. | Pages reviewed in staging. |
| 4 | Crops index and twelve crop pages. Where we operate. | Crop pages reviewed. |
| 5 | Sustainability, quality, partners, join the network, contact, request a quote. Form gateways and validation. | All forms save; rules in section 6.1 pass. |
| 6 | Careers, news and articles, search, legal pages, 404. Metadata, structured data, sitemap. | All pages present. |
| 7 | Automated tests for workflows W1 to W12. Accessibility, performance and security passes. Fixes. | Test suite green; budgets met. |
| 8 | Content approval walkthrough with AAAN. Defect fixes by severity. Staging sign-off. | Phase 1 exit. |

### 10.1 Phase 1 exit criteria

- All twelve workflows in section 6 pass end to end on staging, on desktop and on a mobile viewport, in Chromium and WebKit.
- Every form saves its submission to the correct table, and the database test confirms that the public role cannot read those tables.
- Every page passes the page checklist in section 10.2.
- No critical or serious accessibility issues on any page (axe).
- Lighthouse on the home page and one crop page, mobile: performance and accessibility of 90 or more.
- Every figure on every page matches `content/facts.ts`.
- Gaps G1 to G12 are each closed, or are shown as deliberately omitted.
- AAAN's content owner approves each page group in writing.

### 10.2 Page checklist

- Title, description, canonical and structured data correct.
- Every figure matches the facts file.
- Every image has alt text, and no image is generated to look like a real person.
- Every link goes somewhere. External links open with `rel="noopener"`.
- Headings in order, one `h1`.
- Works at 375 px with no horizontal scroll.
- The keyboard can reach every control.
- No placeholder text, no "lorem", no "[Name]".

---

## 11. Phase 2 outline (for planning only)

Phase 2 is not started until Phase 1 is accepted. The outline is here so that Phase 1 is built in a way that Phase 2 can extend without rework.

1. Move the content files to Supabase tables, behind the same gateway functions.
2. Cloudinary as the media source, through a loader, with the `content/media.ts` keys unchanged.
3. French: translate all copy, add `/fr` routes, the language switch, `hreflang` and the French sitemap entries.
4. Turn on the integrations deferred from Phase 1 when AAAN chooses them: email confirmations, bot protection, analytics with consent.
5. Staff panel and admin: planned separately, after Phase 2.

---

## 12. What I need from you

1. Confirm **P3** (English under `/en` from day one), **P5** (forms save to Supabase in Phase 1), **P8** (generated images, no people), **P9** (no testimonial), **P11** (partners as text, pending confirmation) and **P12** (a staging host).
2. Decide G1 to G12, starting with **G1** (partner names) and **G2** (certifications), which affect the public pages most.
3. Confirm that "joseph-kariuki.png" is James Kariuki Njoroge (G6).
4. Supply office details and WhatsApp numbers when available (G4). Phase 1 works without them.

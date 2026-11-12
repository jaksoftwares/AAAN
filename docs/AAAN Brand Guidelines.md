# AAAN Brand Guidelines

Version 1.0 · November 2026 · Source: AAAN Brand Kit v1 (Claude Design System) and the AAAN Company Profile & Brand Concept.

Every AAAN surface (website, trade-fair stand, product label, investor deck, letterhead, social post) follows this document. The downloadable files that implement it are in `assets/brand/`, and `assets/brand/index.html` is the browsable library.

---

## 1. Brand essence

**Name.** African Agricultural Advancement Network, written **AAAN**. Use the short form after the first full mention.

**Tagline.** *From African Soil to Global Tables.*
French: *Du sol africain aux tables du monde.*
Set it in display type, never reword it.

**Supporting lines**

| Line | Use for |
| --- | --- |
| *Advancing Africa's Harvest* | Corporate and investor material |
| *Seed to Shelf. Africa to the World.* | Export and buyer pages |
| *Better Seeds. Better Harvests. Better Lives.* | Farmer network pages |

**Positioning.** AAAN is a pan-African agribusiness network that controls quality from seedling to export, across Kenya, Ghana and Côte d'Ivoire. Unlike traders who only buy and sell, AAAN improves what is grown, how it is grown and what it becomes.

**Personality.** Confident, warm, expert, proudly African, globally fluent.

**Core values** (the brand's promises): quality from the root · safe and sustainable · innovation · partnership · integrity · African pride, global standard.

**Key facts** (use these exact figures; do not round them up):

- Founded 2015, head office Ol Kalou, Nyandarua County, Kenya
- 25,000+ farmers in the network, 42% women
- 32 million+ seedlings distributed since 2015; 5 million+ a year
- 120,000+ tonnes handled a year; 65,000+ tonnes exported a year
- 32 export countries; 7 processing and packing facilities; 12 nurseries

---

## 2. Voice and content

- Write as **"we"** (AAAN) to **"you"** (buyer, partner or farmer).
- Short sentences. Concrete facts. Active verbs.
- **Lead with proof:** write "25,000+ farmers in 3 countries", not "many farmers across Africa".
- **Sentence case** for headings and buttons ("Source from AAAN", "Join our network"). Only the eyebrow label style is uppercase.
- **Numbers:** commas, and a plus for floors (25,000+). Write units in full on first use.
- **Places:** always precise: "Ol Kalou, Nyandarua", "Kumasi, Ghana", "San-Pédro, Côte d'Ivoire".
- **Languages:** every public item exists in English and French. Translate meaning, not word for word. The French tagline never changes.
- **Never use:** emoji, exclamation marks in headlines, "small-scale", "trying to", "hope to".

---

## 3. Logo

### 3.1 The primary logo: the rising seedling

A Forest Green disc (the globe) holds two Harvest Gold furrow arcs (the field and the curve of the earth), an ivory stem, a gold left leaf and a Leaf Green right leaf reaching higher (growth). The wordmark **AAAN** is custom-drawn geometric capitals, and the descriptor *AFRICAN AGRICULTURAL ADVANCEMENT NETWORK* sits beneath in tracked capitals.

The logo is supplied as outlined artwork. Do not rebuild it from fonts.

### 3.2 Logo variations

| File (in `assets/brand/logos/svg/`) | Use it for |
| --- | --- |
| `aaan-logo-horizontal.svg` | **Default.** Website header, documents, signage, email signatures |
| `aaan-logo-stacked.svg` | Square or narrow spaces: social banners, packaging fronts, merchandise |
| `aaan-mark-primary.svg` | The mark alone, once the name is already on the page: footers, loaders, watermarks |
| `aaan-wordmark.svg` | Name-only uses where the mark already appears nearby |
| `aaan-app-icon.svg` | Favicon, app icon, social avatar |
| `aaan-logo-horizontal-reversed.svg` | Forest green bands, dark photography, the dark theme |
| `aaan-logo-horizontal-mono-green.svg`, `aaan-mark-mono-green.svg` | One-colour print: stamps, embossing, single-ink packaging |
| `aaan-logo-horizontal-white.svg`, `aaan-mark-white.svg` | One-colour white on photographs, vehicles, sacks, containers |

PNG versions (transparent, several widths) are in `logos/png/`. Presentation files with clear space already applied are in `logos/on-ground/`.

### 3.3 Clear space

Keep empty space around the logo of **at least half the mark's diameter on every side**. For the horizontal lockup and the mark, that is half the height of the mark. Nothing else enters this zone: no text, photographs or page edges.

### 3.4 Minimum size

| Logo | On screen | In print |
| --- | --- | --- |
| Horizontal lockup | 140 px wide | 35 mm wide |
| Mark alone | 24 px | 10 mm |

Below these sizes, use `aaan-app-icon.svg`.

### 3.5 Backgrounds

| Ground | Logo to use |
| --- | --- |
| `surface` (white), `surface-ivory`, `surface-sand` | Full colour |
| `surface-brand` (Forest Green) and dark photography | Reversed |
| Busy photography | One-colour white |

### 3.6 Logo don'ts

- Do not recolour, stretch, rotate, skew or outline the logo.
- Do not rebuild the wordmark in a font.
- Do not place the full-colour logo on Forest Green or on Harvest Gold.
- Do not add effects, shadows or gradients.
- Do not separate the descriptor line from the wordmark and use it alone.
- Do not use the alternate concepts (network leaf, triple A). They are kept for reference only, unless the board chooses one over the rising seedling.

---

## 4. Colour

### 4.1 Palette

| Token | Hex | Role |
| --- | --- | --- |
| `brand-forest-green` | **#0E4D2C** | Primary. Logo disc, primary buttons, hero and footer bands |
| `brand-harvest-gold` | **#E2A529** | Accent. Key numbers, highlights, calls to action with `on-gold` text |
| `brand-cocoa-brown` | **#5B3A24** | Secondary. Export, product and premium content; the descriptor line |
| `brand-leaf-green` | **#7DB33F** | Support. Icons, charts, sustainability content. Fills and illustration only, never text on light grounds |
| `brand-savanna-ivory` | **#F8F4EA** | Background. Section grounds, documents, reversed marks |
| `brand-charcoal` | **#1F2622** | Body text in print |

Neutral and text tokens (light / dark theme): `surface` #FFFFFF / #0F1A14 · `surface-ivory` #F8F4EA / #16261D · `surface-sand` #EFE8D8 / #1E3127 · `ink` #1F2622 / #F3EFE4 · `ink-muted` #56605A / #B5BDB7 · `ink-brand` #0E4D2C / #9CCB63 · `ink-gold` #8A5A12 / #E2A529 · `on-brand` #F8F4EA · `on-gold` #1F2622 · `line` #DDD6C6 / #2C3D33 · `line-strong` #5B7A66 / #8C9A90 · `focus-ring` #0E4D2C / #E2A529 · status: success #1F7A3A, warning #9A5B00, danger #B3261E (light theme).

Full values with usage notes: `assets/brand/colour/brand-palette.json`. CSS variables: `assets/brand/colour/brand-tokens.css`.

### 4.2 Proportions on a page

- **60%** light grounds (`surface`, `surface-ivory`)
- **25%** Forest Green
- **10%** Harvest Gold
- **5%** Cocoa Brown and Leaf Green

### 4.3 Colour rules

- Forest Green is the brand. Use it for the logo disc, primary buttons, hero and footer bands, and large statements.
- Harvest Gold is the spark. **Never use it as text on light surfaces** (2.2:1 contrast). For gold words on light grounds, use `ink-gold`.
- Text on light grounds is `ink` or `ink-muted`. Text on Forest Green is `on-brand`. Links and eyebrow labels are `ink-brand`.
- Never use gradients between brand colours. Use flat fields and real photography.
- Colours that must be told apart differ in lightness, not hue alone. Blue and orange are preferred to red and green pairs.

### 4.4 Accessibility

Text meets WCAG AA contrast (4.5:1) in both themes. Icons and control borders meet 3:1. Examples from the token notes: `ink` on `surface` is 12.6:1 or more; `on-brand` on Forest Green is 9.0:1; `on-gold` on Harvest Gold is 7.1:1; `ink-brand` on `surface-ivory` is 9.0:1 or more (light).

---

## 5. Typography

| Role | Typeface | Weights | Where |
| --- | --- | --- | --- |
| Display | **Fraunces** (serif, Google Fonts) | 400, 600 | Headlines, taglines, large figures |
| Text | **Manrope** (sans-serif, Google Fonts) | 400, 500, 600, 700 | Body, labels, buttons, captions, all interface text |

Both are free, licensed under the SIL Open Font License, and cover French accents. Font files are in `assets/brand/fonts/`.

### 5.1 Type scale

| Style | Font | Size / line height | Weight | Use |
| --- | --- | --- | --- | --- |
| `display-xl` | Fraunces | 64 / 68 px | 600 | Home page hero headline. One per page |
| `display-lg` | Fraunces | 48 / 54 px | 600 | Inner page heroes |
| `stat-number` | Fraunces | 56 / 60 px | 600 | Key figures, in `ink-brand` or `ink-gold` |
| `heading-1` | Fraunces | 36 / 44 px | 600 | Section titles |
| `heading-2` | Fraunces | 28 / 36 px | 600 | Sub-section titles |
| `heading-3` | Manrope | 22 / 30 px | 700 | Card titles, crop names |
| `heading-4` | Manrope | 18 / 26 px | 700 | Small headings, table groups |
| `body-lg` | Manrope | 18 / 30 px | 400 | Lead paragraphs |
| `body` | Manrope | 16 / 26 px | 400 | All running text |
| `body-strong` | Manrope | 16 / 26 px | 600 | Emphasis inside body text |
| `small` | Manrope | 14 / 22 px | 500 | Metadata, form help, footer links |
| `caption` | Manrope | 13 / 18 px | 500 | Photo captions, chart labels. **Minimum size** |
| `eyebrow` | Manrope | 12 / 16 px | 700, +0.14em tracking | Uppercase labels above section titles |
| `button` | Manrope | 15 / 20 px | 700 | Button and link labels |

### 5.2 Type rules

- Use one `display-xl` per page. Headings step down in order and never skip a level.
- Never set body text below `caption` (13 px).
- Fraunces is limited to two weights (400 and 600) for web performance.

---

## 6. Iconography

- **24 custom line icons**, in the Icons group: crops (cocoa, cashew, palm oil, cassava, yam, banana, pineapple, maize, potato, dairy, vegetables) and activities (seedling, nursery, smart farming, irrigation, organic, processing, quality, traceability, export, shipping, logistics, farmer network, training).
- Drawn on a 24 px grid, 1.75 stroke, round caps and joins, no fills.
- Forest green on light grounds. Ivory on Forest Green. Files are in `assets/brand/icons/svg/` (use the `-ivory` variants on green) and `icons/sprite.svg` for websites.
- Show at 24, 32 or 48 px (feature cards).
- **Always pair an icon with a text label.** Never use emoji in place of an icon.

---

## 7. Imagery

- Real AAAN people, farms, nurseries and plants. Examples: hands holding seedlings, cocoa pods being split, sorted cashew kernels, milk at the Kinangop centre, containers at Tema or Mombasa.
- Warm natural light, true colours, eye-level framing.
- People appear as capable professionals, never as objects of pity.
- Use full-bleed photographs, or photographs with `radius-lg` or `radius-xl` corners.
- Text over a photograph sits on a `surface-brand` panel or a dark band, never directly on a busy image.

---

## 8. Layout, shape and detail

- **Spacing:** the `space-*` steps. Use `space-24` (96 px) between desktop sections and `space-16` (64 px) on mobile. Use `space-8` (32 px) between cards.
- **Corners:** `radius-md` (8 px) for buttons and inputs; `radius-lg` (16 px) for cards and images; `radius-xl` (28 px) for hero panels; `radius-pill` for chips.
- **Shadows:** `shadow-card` only for cards on white. `shadow-raised` for menus and dialogs. Prefer flat cards on `surface-ivory`.
- **Focus:** a 2 px solid `focus-ring` outline, offset 2 px, on every interactive element.
- **Borders:** `line` for dividers. `line-strong` for form controls.

---

## 9. Applications

### 9.1 Share images and banners

| Asset | Size | File |
| --- | --- | --- |
| Open Graph share image, English | 1200 × 630 | `social/og-image-en-1200x630.png` |
| Open Graph share image, French | 1200 × 630 | `social/og-image-fr-1200x630.png` |
| LinkedIn company banner | 1584 × 396 | `social/linkedin-banner-1584x396.png` |
| Social profile picture | 400 × 400 | `social/avatar-400.png` |

### 9.2 Favicons and app icons

| Asset | File |
| --- | --- |
| Favicon, vector | `favicon/favicon.svg` |
| Favicon for legacy browsers (16, 32, 48 px) | `favicon/favicon.ico` |
| Apple touch icon, 180 px (full-bleed square) | `favicon/apple-touch-icon-180.png` |
| Android and PWA icons, 192 and 512 px | `favicon/icon-192.png`, `favicon/icon-512.png` |

### 9.3 Print and documents

- Letterheads, reports and product labels use `logos/svg/aaan-logo-horizontal.svg` on `surface` or `surface-ivory`.
- Use Cocoa Brown for product and export sections, and Forest Green for headers.
- One-colour jobs (stamps, embossing, single-ink packaging) use the `mono-green` files.
- Print colour: the palette above is the RGB and screen reference. Confirm CMYK values with a printer proof before a print run, because the kit does not yet list CMYK values.

### 9.4 Digital and website

The website follows the brand kit tokens directly. For the English and French site, see `docs/AAAN Website Design Specification.md`.

---

## 10. Partners, certifications and logos

- Certification badges and partner logos appear **only** where AAAN holds a valid certificate or has written permission from the partner.
- Do not place a partner's logo in a way that suggests endorsement without that permission.
- Certifications are listed in the company profile (section 7). Do not claim one that is not held.

---

## 11. Source files and how to regenerate

| What | Where |
| --- | --- |
| Master logo and icon artwork (from the Brand Kit) | `brand/source/logos/`, `brand/source/icons/` |
| Design tokens (colour, type, spacing, radius, shadow) | `brand/source/tokens.json` |
| Font files | `brand/source/fonts/` |
| Generator script | `brand/scripts/generate-brand-assets.mjs` |
| Generated assets | `assets/brand/` (includes `index.html`, `brand-manifest.json` and `AAAN-brand-assets.zip`) |

**To regenerate** (requires Node.js 22.2 or later):

```
cd brand/scripts
npm install
npm run check    # verify master files and tokens
npm run build    # generate every asset into assets/brand/
```

Edit a colour in `brand/source/tokens.json`, then run `npm run build`. Every CSS variable, palette file and rendered share image updates together.

**Keep in sync:** when the brand kit is updated, replace the master files in `brand/source/` and rebuild. Do not edit generated files by hand.

---

## 12. Open items

1. **CMYK values** for print are not yet in the kit. Confirm with a printer proof.
2. **Alternate logo concepts** are kept for reference. The board confirms the rising seedling as final.
3. **Photography and video** are still being produced. Imagery rules apply once the asset library is in place.
4. **Office contacts** (addresses, phone numbers, country managers) will be added once domain and email are set up.

---

## Appendix: quick checklist before publishing anything

- [ ] Logo is an approved file, unaltered, with clear space and a minimum size respected
- [ ] Logo sits on an approved ground
- [ ] Tagline is exact, in English or French
- [ ] Headline uses Fraunces; body uses Manrope; no text below 13 px
- [ ] Colours come from the palette; Harvest Gold is not used as light-ground text
- [ ] Text contrast is at least 4.5:1
- [ ] Figures match the key facts in section 1
- [ ] Every public item has an English and a French version
- [ ] No emoji, no exclamation marks in headlines, no banned phrases
- [ ] Photographs are real AAAN content, with alt text in both languages

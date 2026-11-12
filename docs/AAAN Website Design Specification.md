# AAAN Website Design Specification

Nov 12, 2026 · @Jak Softwares

The AAAN website must present the company as a pan-African agribusiness with global reach. It must also turn visits into buyer enquiries, partner conversations and farmer sign-ups, in English and French. This specification covers everything the site holds and how it looks, behaves and is built. It draws on the AAAN Company Profile, the AAAN Brand Kit and the AAAN Photo & Video Asset Library.

## 1. Purpose, goals and audiences

**Goals**

1. **Credibility at first glance:** within five seconds, a visitor understands that AAAN works in three countries and 32 export markets, across the whole value chain.
2. **Generate trade:** buyers find products, specifications and certifications, and send a quote request.
3. **Grow the network:** farmers and cooperatives learn how to join, and contact the nearest hub.
4. **Attract partners and investors:** governments, research institutes, development partners and financiers see impact, leadership and governance.
5. **Recruit talent:** job seekers see the company's scale and culture, and open roles.

**Audiences and what each needs**

| Audience | Arrives looking for | Key pages | Main call to action |
| --- | --- | --- | --- |
| International buyers and importers | Products, volumes, quality, certifications, reliability | Crops and products, Quality, Export and trade | Request a quote |
| Regional and local buyers (supermarkets, processors, hotels) | Availability, consistent supply, local contacts | Crops and products, Where we operate | Contact the nearest hub |
| Farmers and cooperatives | Seedlings, training, a guaranteed buyer | Farmer network, Seedlings, Where we operate | Join the network (form or WhatsApp) |
| Government, research and development partners | Impact, partnerships, sustainability | Impact, Partners, About | Partner with us |
| Investors and financiers | Scale, growth, leadership, governance | About, Impact, News | Contact the investor relations office |
| Job seekers | Culture, roles, locations | Careers, About | Apply |
| Media | Story, facts, images, contacts | News, About, press kit | Download the press kit |

**Success measures (first 12 months after launch)**

| Measure | Target |
| --- | --- |
| Quote requests from buyers | 40+ a month |
| Farmer and cooperative sign-ups | 300+ a month |
| Average engagement time | 1 min 30 s or more |
| Visits in French | 30%+ of all visits |
| Mobile page load (Largest Contentful Paint on 4G) | Under 2.5 s |
| Accessibility | WCAG 2.2 AA on every page |

## 2. Sitemap and navigation

The site has six main sections in the menu. Two actions, Join the network and Request a quote, are always one click away, and every page exists in English and French.

&#91;embedded content: AAAN sitemap · 6 main sections, header actions, footer\]

In total that is about 45 pages per language: 6 section pages, about 20 sub-pages, 12 crop pages, and the news, careers, contact and legal pages.

**Header (all pages)**

- **Left:** the horizontal logo (`aaan-logo-horizontal.svg`). It switches to the reversed version on transparent hero headers.
- **Centre:** the six main menu items.
- **Right:** search icon, EN / FR switch, "Join the network" (ghost button), "Request a quote" (primary gold button).
- **Utility bar above (desktop only, 32 px tall, Forest Green):** News · Careers · Contact on the left; country phone numbers and a WhatsApp icon on the right.
- 80 px tall on desktop and 64 px on mobile. Transparent over the home hero, solid ivory with a hairline once scrolled.

**Mega menu**

- Each main item opens a full-width panel on an ivory ground.
- **Left:** the section's pages as links, each with a one-line description.
- **Right:** a featured card with a photo and a call to action. For example, the Crops panel shows a crop-icon grid of all 12 crops, and the Where we operate panel shows a mini-map with the three countries.

**Footer (all pages, Forest Green, ivory text)**

1. The reversed logo, the tagline in English or French, and social icons (LinkedIn, Facebook, Instagram, YouTube, X).
2. Link columns: Company, What we do, Crops, Work with us.
3. Office cards: Ol Kalou (head office), Kumasi and Abidjan, each with address, phone and email.
4. Newsletter sign-up with language choice.
5. Certifications strip, showing only the certificates AAAN holds.
6. Bottom bar: © 2026 African Agricultural Advancement Network, privacy, cookies, terms, sitemap, EN / FR.

**Language switch**

Shown as "EN | FR" in the header and footer, with the current language bold. It leads to the same page in the other language.

## 3. Home page

The home page has one job: prove scale in the first screen, show the full value chain, then send each visitor down their own path. Sections alternate between white, ivory and Forest Green grounds, so the page has a clear rhythm as it scrolls.

&#91;embedded content: Home page layout · 13 sections, top to bottom\]

| Section | Content | Assets |
| --- | --- | --- |
| 1. Hero | Eyebrow: "Pan-African agribusiness · Since 2015". Headline: "From African Soil to Global Tables." Sub-line: "We grow, process and export quality produce from Kenya, Ghana and Côte d'Ivoire to 32 countries." Buttons: Request a quote (gold) and Discover our work (ghost, ivory). A small strip at the bottom: Kenya · Ghana · Côte d'Ivoire, with a scroll cue. | V02 loop, P001 as fallback |
| 2. Proof in numbers | 25,000+ farmers · 32 million seedlings since 2015 · 120,000 tonnes a year · 32 export countries. Gold numbers on green, counting up. | Figures from the CMS |
| 3. Who we are | Eyebrow "Who we are". Two-paragraph summary of the founding story and the network idea, with an "Our story" link. Large photo on the right with `radius-xl`. | P061 or P007 |
| 4. Seed to shelf | Title "From seed to shelf, with value added in Africa". Five cards in a row (Seedlings, Farming, Harvest, Value addition, Markets), each with an icon, two lines and a link. Value addition is highlighted. On mobile they scroll sideways. | Brand icons |
| 5. Our crops | Title "What we grow and supply". Filter tabs (All, Tree crops, Root crops, Fruit, Grains, Highland and dairy, Vegetables) and crop cards. Eight show at first, with a "See all 12 crops" button. | P063 crop images |
| 6. Where we operate | Split layout: an interactive Africa map with 17 pins on the left; on the right, three country cards with a hub count and main crops. Underneath, a thin world map with export routes and the line "Shipped to 32 countries on 5 continents". | Mapbox map, SVG world map |
| 7. Brand film | Full-width video poster with a play button. Title: "See how a seed becomes a global product." Opens in a lightbox with captions in the page's language. | V01, poster frame from P036 |
| 8. Value addition | Four pairs showing a raw crop becoming a product (cocoa beans to cocoa butter, raw cashew to kernels, cassava to gari and attieké, milk to yoghurt), with "7 processing facilities" and a link. | P037→P050, P020→P053, P031, P015 |
| 9. Impact | Left: three impact figures (42% women farmers, 45% average yield increase, 4,000+ seasonal jobs). Right: testimonial carousel with portrait, quote, name and hub. Link to Sustainability and impact. | V08 stills, P007 |
| 10. Quality you can trust | Certification badges (only those held) and three steps: mapped farms → tested lots → traced shipments. Link to Quality. | Certification logos |
| 11. Partners | "Working with Africa's leading institutions": greyscale logos that turn colour on hover, shown only with permission. | Partner logos |
| 12. Latest news | Three news cards and a "All news" link. | CMS |
| 13. Two paths | A split green band. Left: "Buying?" with Request a quote. Right: "Farming?" with Join the network and a WhatsApp button. | P016, P005 |

On mobile, the hero is shorter (85% of the screen height), the counters form a 2 × 2 grid, the crops become a swipeable carousel, and the map comes before the country cards.

## 4. Inner pages

Every inner page follows the same rhythm. A page hero (title, one-line intro, photo) comes first, then three to six content sections that alternate between `surface` and `surface-ivory` backgrounds, then a closing call-to-action band in Forest Green. The asset IDs (P001, V03 and so on) refer to the Photo & Video Asset Library.

### About AAAN

1. **Hero:** "Advancing Africa's Harvest since 2015", with photo P001.
2. **Our story:** the founding story in three short paragraphs, the founders' film V05 and photo P009.
3. **Vision, mission and values:** vision and mission as two large statements, and six value cards with icons.
4. **Milestones:** a horizontal timeline from 2015 to 2026 that scrolls sideways on mobile.
5. **Leadership:** the board (three portrait cards with qualification and role, click for a bio) and the executive offices.
6. **AAAN in numbers:** the eight headline figures in a stat band.
7. **Call to action:** "Work with us", with buttons to Partners and Careers.

### What we do (overview, plus five sub-pages)

The overview shows the value-chain diagram (Seedlings → Farming → Harvest → Value addition → Markets) as five large linked cards. Each sub-page uses one template:

- **Hero:** service name, one-line promise and a photo.
- **The problem we solve:** two sentences.
- **How we do it:** three to five steps with icons.
- **Proof:** two or three stats, plus a case story with a photo or a short video.
- **Where it happens:** a mini-map of the hubs involved.
- **Related crops:** product cards.
- **Call to action.**

| Sub-page | Promise | Proof stats | Media |
| --- | --- | --- | --- |
| Seedlings and nurseries | Clean, high-yield planting material | 12 nurseries; 5 million+ seedlings a year | P002, P003, P021, P029, V06 |
| Farming and technology | Better methods, bigger harvests | 45% average yield increase | P011, P038, V09 |
| Value addition and processing | More value kept in Africa | 7 processing and packing facilities | P031, P049, P052, V04 |
| Export and trade | Reliable supply to 32 countries | 65,000+ tonnes exported a year | P016, P019, P046, V10 |
| Farmer network and training | Growing together | 25,000+ farmers; 60,000+ trained | P005, P033, V14 |

### Crops and products (index, plus 12 crop pages)

The index page has a filter bar (All, Tree crops, Root crops, Fruit, Grains, Highland and dairy, Vegetables) and a grid of 12 crop cards. Each card shows a photo, the crop name, the countries it comes from and a "Fresh and processed" tag.

Every crop page uses one template:

1. **Hero:** crop name, a one-line positioning statement, a large photo and the sourcing countries as chips.
2. **At a glance:** sourcing hubs, season or harvest months, main markets and certifications, as four icon facts.
3. **From our farms:** a short story of how AAAN grows or sources the crop (seedlings, farmer groups, quality checks), with a photo gallery.
4. **Products:** fresh and value-added product cards. Each card has a photo, a product name, two or three specification lines (grade, packaging, minimum order) and a "Request specification sheet" link.
5. **Quality and traceability:** certifications for this crop and how a lot is traced.
6. **Where it comes from:** a map highlighting the hubs.
7. **Quote request:** a short inline form with the crop pre-selected.

The 12 crop pages: Cocoa, Cashew nuts, Oil palm, Cassava, Yams, Plantains, Bananas, Pineapples, Maize, Irish potatoes, Dairy, Vegetables.

### Where we operate

- **Hero:** an interactive map of Africa with the three countries highlighted and all 17 sites as pins.
- **Map filters:** by country and by activity (office, nursery, farm network, processing, port).
- **Pin card:** clicking a pin opens a card with the site name, role, crops, a photo and a contact link.
- **Below the map:** one section per country with a short overview, a list of hubs, the country office's contact and a photo strip.
- **Export reach:** a world map with routes from Mombasa, Tema, Abidjan and San-Pédro to the seven export regions.

### Sustainability and impact

1. Hero: "Growing better. Feeding further."
2. Impact numbers: farmers, share who are women, jobs, yield increase, tonnes handled.
3. Five impact themes (Farmers, Food security, Jobs, Value in Africa, Environment) as alternating image-and-text rows.
4. Farmer voices: the V08 testimonial carousel.
5. Responsible sourcing: our approach to deforestation-free sourcing, child-labour prevention and the EUDR.
6. Alignment with the UN Sustainable Development Goals: icons for SDGs 2, 5, 8, 12 and 13.
7. Downloads: impact report (PDF) and sustainability policy.

### Quality and certifications

- Our quality promise and how it works: seed to shipment in five checkpoints.
- A certification grid with each logo, what it covers and the crops it applies to. Each badge links to the certificate PDF.
- Lab and testing (P014, P065, V15).
- Traceability explained: farm mapping, lot codes and documents.
- Downloadable specification sheets per product, behind a short form that captures the lead.

### Partners and buyers

- **For buyers:** why source from AAAN (four reasons), the product range, how ordering works (enquiry → specs and samples → contract → shipment), Incoterms offered, and the quote form.
- **For partners:** a partner logo wall grouped by government, research, universities and international; partnership models (research, development programmes, finance, offtake); and a partnership enquiry form.
- **For investors:** a short growth story, key figures, leadership, and a contact for the investor relations office.

### Farmer network ("Join the network")

- Written for farmers, in plain words. English and French, with key lines also in Swahili and Twi.
- What you get: certified seedlings, training, inputs on credit, a guaranteed buyer.
- How to join, in three steps, with the nearest hub finder (pick a country, then a hub).
- A WhatsApp button per country, a phone number and a short sign-up form.
- Farmer success stories.

### News and insights

- A listing with filters (Company news, Harvest updates, Events, Insights), a featured story at the top, and cards with an image, date and category.
- Article page: headline, date, author, a hero image, body with pull quotes and images, share buttons, related stories and a newsletter sign-up.
- Press kit: logo pack, fact sheet, leadership photos and a media contact.

### Careers

- Why work at AAAN: culture, growth and locations, with photo series P064.
- Open roles: a filterable list by country, department and type, linked to an applicant tracking tool or an apply form with CV upload.
- Internships and graduate programme.

### Contact

- Choose your reason: Buy products, Join as a farmer, Partner with us, Media, Careers, Other. Each reason shows its own form and routes it to the right team.
- Office cards for Ol Kalou (head office), Nairobi, Kumasi, Accra and Abidjan, each with address, phone, email, map and opening hours.
- WhatsApp, LinkedIn and email links.

### Legal and utility pages

Privacy policy (Kenya Data Protection Act, Ghana Data Protection Act, Côte d'Ivoire data protection law, GDPR for EU visitors), cookie policy, terms of use, sitemap, and a 404 page that offers a search box and links to the main sections.

## 5. Visual design

The site should feel like a premium global agribusiness with African warmth: generous space, large real photography, confident serif headlines, and calm green and ivory grounds with gold accents. Every value below comes from the AAAN Brand Kit tokens.

**Grid and layout**

| Screen | Columns | Gutter | Side margin | Content max width |
| --- | --- | --- | --- | --- |
| Desktop (1280 px and up) | 12 | 32 px | 64 px | 1,280 px (text blocks 720 px) |
| Tablet (768 to 1279 px) | 8 | 24 px | 40 px | Full width |
| Mobile (up to 767 px) | 4 | 16 px | 20 px | Full width |

- Vertical rhythm: `space-24` (96 px) between sections on desktop, `space-16` (64 px) on mobile.
- Hero images and maps run full bleed. Text stays in the content width.

**Colour use on the page**

- About 60% light grounds (`surface` white and `surface-ivory`), alternating section by section.
- About 25% Forest Green: the header on scroll, call-to-action bands, the footer, stat bands, primary buttons.
- About 10% Harvest Gold: key numbers, highlights, secondary buttons (with `on-gold` text), active states.
- About 5% Cocoa Brown and Leaf Green: export and premium sections (cocoa), sustainability accents (leaf).
- Text only in `ink`, `ink-muted`, `ink-brand` or `ink-gold` on light grounds, and `on-brand` on green. No gold text on white.

**Typography on the page**

| Element | Style | Desktop | Mobile |
| --- | --- | --- | --- |
| Home hero headline | `display-xl` (Fraunces 600) | 64 px | 40 px |
| Page hero headline | `display-lg` | 48 px | 34 px |
| Section title | `heading-1` | 36 px | 28 px |
| Sub-section title | `heading-2` | 28 px | 24 px |
| Card title | `heading-3` (Manrope 700) | 22 px | 20 px |
| Lead paragraph | `body-lg` | 18 px | 17 px |
| Body | `body` | 16 px | 16 px |
| Eyebrow label | `eyebrow`, uppercase, `ink-brand` | 12 px | 12 px |
| Counters | `stat-number` | 56 px | 40 px |

**Imagery**

- Every hero uses a real or approved photo from the asset library, never generic stock.
- Text over photos sits on a Forest Green panel or a dark gradient band at the bottom third. Contrast is checked at 4.5:1.
- Corners: `radius-lg` (16 px) on cards and inline images, `radius-xl` (28 px) on feature images and hero panels.
- Icons come from the AAAN set of 24, at 24 or 32 px, in `ink-brand` on light and `on-brand` on green.

**Core components**

| Component | Look | Used on |
| --- | --- | --- |
| Primary button | Forest Green fill, ivory text, `radius-md`, 48 px tall; darker on hover | Main calls to action |
| Secondary button | Harvest Gold fill, charcoal text | Second call to action on green bands |
| Ghost button | 1.5 px Forest Green outline, green text | Tertiary actions |
| Text link | `ink-brand`, underline on hover, arrow icon for "Learn more" | Cards, body text |
| Crop card | Photo on top (4:3), name, origin chips, arrow; lifts 4 px on hover | Home, Crops index |
| Stat counter | `stat-number` in gold on green, or green on ivory, with a label under it | Home, About, Impact |
| Service card | Icon, title, two lines, link; ivory ground | What we do |
| Testimonial card | Portrait, quote in Fraunces italic, name, hub, crop | Impact, Home |
| News card | Image (16:9), category tag, date, title | Home, News |
| Map pin card | Photo, site name, role, crops, contact link | Where we operate |
| Form fields | 48 px tall, `line-strong` border, `radius-md`, label above, help text under, inline errors in `status-danger` with an icon | All forms |
| Call-to-action band | Full-width Forest Green, headline, one or two buttons, faint furrow-line pattern | End of every page |
| Certification badge | Logo on white, name, crops covered, link to the PDF | Quality, Footer |

## 6. User experience and interactions

Interactions should feel calm and assured. Motion supports reading and never shows off.

**Motion**

- Sections fade up 16 px as they enter the screen (300 ms, ease-out), once per page view.
- Counters count up from zero over 1.2 s when they first appear, and show the final number straight away for anyone who prefers reduced motion.
- Card hover: lift 4 px and slightly deepen the shadow (200 ms). The image zooms to 103% inside its frame.
- The header turns from transparent to solid Forest Green after 80 px of scrolling, and hides when scrolling down and returns when scrolling up on mobile.
- The hero video loop (V02) plays muted, has a pause button, and is replaced by a still image when the visitor prefers reduced motion or the connection is slow.
- With "reduce motion" switched on, all animation is off.

**Navigation behaviour**

- The mega menu opens on hover (with a 150 ms delay) and on click or Enter, and closes with Esc. Focus moves inside it in a logical order.
- Every page has breadcrumbs, except the home page.
- A "Back to top" button appears after two screen heights.
- Search sits in the header and covers pages, crops, products and news, with suggestions as you type.

**Forms**

- Short forms: at most six fields to start, with more details asked for later in the conversation.
- The quote request asks for crop, product, quantity and unit, destination country, name, company, email and phone (optional). The crop is pre-filled when the form is opened from a crop page.
- Fields are checked inline when the visitor leaves them, with plain-language error messages.
- After sending, a thank-you screen says who will reply and when ("Our export team replies within one business day") and offers WhatsApp.
- Spam protection: Cloudflare Turnstile, which needs no puzzle.

**Maps**

- Interactive maps are built with Mapbox or MapLibre using brand-styled tiles: ivory land, green highlights for the three countries, gold pins.
- Pins are keyboard-reachable. The same information also appears as a list under the map.
- The world export map is an animated SVG with routes drawn once on scroll.

**Mobile behaviour**

- Built mobile-first: most visitors from Kenya, Ghana and Côte d'Ivoire will be on phones.
- A sticky bottom bar on mobile has three actions: Request a quote, WhatsApp, and Call.
- The menu becomes a full-screen panel with accordion sections and the language switch at the top.
- Tap targets are at least 44 × 44 px. Tables of specifications become stacked cards.
- Carousels can be swiped and also have visible arrow buttons and dots.

**Content-first loading**

- Images load as visitors scroll to them, with a blurred low-resolution preview first.
- The hero loop video starts loading only after the headline, image and buttons have appeared.

## 7. Bilingual site, accessibility, performance and SEO

**English and French**

- Every page, form, email reply and PDF exists in both languages. URLs are separate: /en/… and /fr/… on the chosen domain, with translated page addresses (for example /en/crops/cocoa and /fr/cultures/cacao).
- The first visit takes the language from the browser: French for Côte d'Ivoire and French-speaking visitors, English otherwise. The switch in the header remembers the choice.
- The switch keeps the visitor on the same page in the other language, not the home page.
- Translations are written by a professional translator, not machine-only, and checked by the Abidjan team. The French tagline is fixed: "Du sol africain aux tables du monde."
- Each page carries hreflang tags (en, fr, x-default) and its own titles and descriptions in each language.
- Dates, numbers and currencies follow each language's format: "12 November 2026" and 25,000 in English; "12 novembre 2026" and 25 000 in French.

**Accessibility: WCAG 2.2 AA**

- Text contrast at least 4.5:1 (the brand tokens are already checked), and 3:1 for icons and control borders.
- The whole site works by keyboard, with a visible 2 px focus ring (`focus-ring`) and a "Skip to content" link.
- Correct heading order, landmarks (header, nav, main, footer) and labelled form fields.
- Alt text in both languages on every image. Captions in English and French on every video, and a transcript for the brand film.
- Respect for "reduce motion". No information carried by colour alone.
- Tested with NVDA, VoiceOver and keyboard only before launch.

**Performance (many visitors are on mobile data)**

| Measure | Target |
| --- | --- |
| Largest Contentful Paint on 4G mobile | Under 2.5 s |
| Interaction to Next Paint | Under 200 ms |
| Cumulative Layout Shift | Under 0.1 |
| Home page total weight (before video) | Under 1.5 MB |
| Lighthouse performance score | 90+ on mobile |

- Images are served as AVIF or WebP in several sizes. Fonts are self-hosted subsets loaded with font-display swap, with Fraunces limited to two weights.
- A CDN serves the site from edge locations close to Nairobi, Lagos and Europe.

**SEO**

- Key search phrases per page in both languages, for example "cocoa supplier Ghana", "raw cashew nuts Côte d'Ivoire", "certified seed potatoes Kenya", "fournisseur de cacao Côte d'Ivoire", "noix de cajou export".
- Structured data: Organization (with logo, addresses and social links), Product on crop pages, Article on news, BreadcrumbList and JobPosting on careers.
- An XML sitemap per language, a clean robots.txt and canonical URLs.
- Google Business Profiles for each office, matching the contact page.
- Every page gets a unique title (under 60 characters) and description (under 155 characters), plus Open Graph and LinkedIn share images built from brand templates.

## 8. Technology

The recommended setup is a fast, modern site that AAAN's own team can update in both languages without a developer.

| Layer | Recommendation | Why |
| --- | --- | --- |
| Front end | Next.js (React), static pages with incremental updates | Very fast pages, strong SEO, room to grow into portals later |
| Content management (CMS) | Sanity, with side-by-side English and French fields | Easy editing, image cropping, roles and approval workflow |
| Hosting | Vercel, with Cloudflare for DNS and protection | Global CDN, automatic HTTPS, preview links for every change |
| Images | The CMS image pipeline (automatic AVIF and WebP, responsive sizes) | Light pages on mobile data |
| Video | Mux or Vimeo Pro, adaptive streaming, no ads or branding | Smooth playback on slow connections |
| Maps | Mapbox (or MapLibre) with a custom AAAN map style | Branded, interactive, light |
| Forms and CRM | Forms send to HubSpot CRM (or Zoho CRM), with an email alert to the right team | Every lead is tracked and followed up |
| Email | Transactional emails through Brevo or Resend, from addresses on the AAAN domain | Reliable delivery |
| WhatsApp | WhatsApp Business click-to-chat, one number per country | The channel farmers and local buyers prefer |
| Search | Algolia, or the CMS's own search for launch | Instant results in both languages |
| Careers | Workable or BambooHR job board, embedded | Job posts managed by HR |
| Analytics | Google Analytics 4 with a consent banner, plus Microsoft Clarity for heatmaps | Measures the goals in section 1 |
| Newsletter | Brevo, with separate English and French lists | Buyer and partner updates |

A simpler alternative: WordPress with WPML for both languages and a custom theme built from the brand kit. It costs less to start, but is slower and needs more security upkeep.

**CMS content types:** Page, Crop, Product, Hub or site, Country, News article, Person, Partner, Certification, Testimonial, Job, Download, Statistic. Statistics are kept in one place and reused across pages, so the counters always match.

**Editor roles:** Admin (web team), Editor (head office communications), Country contributors (Kenya, Ghana and Côte d'Ivoire, who draft only), and Approver (Partnerships and Sustainability office). Nothing is published without approval.

**Security and privacy**

- HTTPS everywhere, security headers (Content Security Policy, HSTS), Cloudflare firewall and bot protection.
- Two-factor login for all CMS users. Daily content backups kept for 30 days.
- A cookie consent banner in both languages, and no analytics before consent where the law requires it.
- Form data is stored only in the CRM. Privacy notices name the data controller and retention period.

**Enquiry handling**

| Enquiry type | Goes to | Reply target |
| --- | --- | --- |
| Quote request (international) | Trade and Export team, Abidjan, plus the CRM | 1 business day |
| Quote request (East Africa) | Nairobi trade office | 1 business day |
| Farmer or cooperative sign-up | The country office for the chosen hub, plus a WhatsApp follow-up | 2 business days |
| Partnership | Partnerships and Sustainability office | 3 business days |
| Investor | Finance and Investment office | 3 business days |
| Media | Communications, head office | 1 business day |
| Careers | HR, through the job board | Automatic acknowledgement |

Every form sends an instant confirmation email in the visitor's language. The CRM flags any enquiry still unanswered after its reply target.

## 9. Delivery plan

The site can launch 16 weeks after kick-off, with four weeks of close monitoring afterwards. Each phase ends with a sign-off by AAAN before the next one starts.

&#91;embedded content: Website delivery roadmap · 5 phases, 4 gates, 20 weeks\]

Content, photography and translation run alongside design and build. The asset library's high-priority shots are needed by week 10.

**Who does what**

| Role | Responsible for |
| --- | --- |
| AAAN project owner (Partnerships and Sustainability office) | Decisions, sign-offs, coordinating the country offices |
| Web team (design and development) | Wireframes, designs, build, CMS, integrations, QA |
| Content lead (AAAN communications) | Page text, figures, approvals |
| Translator and Abidjan reviewer | French versions of all pages, forms and emails |
| Photography and video team | The Photo & Video Asset Library |
| Country offices | Hub details, contacts, local photos, farmer stories |
| Trade, HR and partnerships teams | Answering enquiries from launch day |

**Launch checklist**

- [ ] Every page complete in English and French, and approved
- [ ] All high-priority photos and the brand film (V01) and hero loop (V02) in place
- [ ] Every form tested end to end: CRM entry, team alert, confirmation email in both languages
- [ ] WhatsApp numbers and office contacts checked for all three countries
- [ ] Accessibility audit passed (WCAG 2.2 AA)
- [ ] Lighthouse mobile score 90+ on Home, a crop page and Contact
- [ ] SEO: titles, descriptions, hreflang, sitemaps, structured data and redirects in place
- [ ] Analytics, consent banner and goal tracking working
- [ ] Privacy policy, cookie policy and terms published
- [ ] Certificates and partner logos used only with valid certificates or written permission
- [ ] Domain, HTTPS, email sending (SPF, DKIM, DMARC) and backups configured
- [ ] CMS training given to editors and country contributors
- [ ] Launch announcement ready: press release, LinkedIn, newsletter, WhatsApp broadcast

**After launch**

- Weekly for the first month: review enquiries, page speed, errors and search terms.
- Monthly: publish at least two news stories and update the key figures.
- Quarterly: review the goals in section 1 and plan improvements, such as a buyer portal with order tracking or a farmer portal.

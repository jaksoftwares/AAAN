#!/usr/bin/env node
/**
 * AAAN brand asset generator
 * ---------------------------------------------------------------------------
 * Builds every brand asset from the master files in brand/source/ and writes
 * them to assets/brand/:
 *
 *   logos/svg/        master vector logos (approved variants only)
 *   logos/png/        transparent PNGs at several widths
 *   logos/on-ground/  logos shown with brand clear space on approved grounds
 *   icons/svg/        24 crop and activity icons, forest green and ivory
 *   icons/png/        icons at 48 and 96 px
 *   icons/sprite.svg  one SVG sprite containing every icon
 *   favicon/          favicon.ico, PNG sizes, Apple touch icon, PWA icons
 *   social/           avatar, Open Graph images (EN and FR), LinkedIn banner
 *   colour/           brand-tokens.css, brand-palette.json, brand-tokens.json
 *   fonts/            Fraunces and Manrope (SIL Open Font License)
 *   index.html        brand showcase page with download links (works offline)
 *   brand-manifest.json   every generated file, with size and description
 *   AAAN-brand-assets.zip the whole pack in one download
 *
 * Usage (from brand/scripts/):
 *   npm install
 *   npm run build      generate everything
 *   npm run check      verify the master sources and tokens, write nothing
 *
 * Every colour comes from brand/source/tokens.json (the AAAN Brand Kit), so
 * changing a token and rerunning the script updates every asset.
 * ---------------------------------------------------------------------------
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

// ---------------------------------------------------------------- paths -----

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const SRC = path.join(ROOT, 'brand', 'source');
const OUT = path.join(ROOT, 'assets', 'brand');
const CHECK_ONLY = process.argv.includes('--check');
const NOW = new Date();
const ZIP_NAME = 'AAAN-brand-assets.zip';

const FONT_FILES = [
  path.join(SRC, 'fonts', 'Fraunces-Variable.ttf'),
  path.join(SRC, 'fonts', 'Manrope-Variable.ttf'),
];

// ------------------------------------------------------------- tokens -------

const tokens = JSON.parse(fs.readFileSync(path.join(SRC, 'tokens.json'), 'utf8'));

/** Resolve a colour token name to its light-theme hex value (aliases followed). */
function colour(name, theme = 'light', depth = 0) {
  const token = tokens.color.tokens.find((t) => t.name === name);
  if (!token) throw new Error(`Unknown colour token: ${name}`);
  const raw = token.value[theme] ?? token.value.light;
  const alias = /^\{(.+)\}$/.exec(raw);
  if (alias && depth < 5) return colour(alias[1], theme, depth + 1);
  return raw;
}

const PALETTE = {
  forest: colour('brand-forest-green'),
  gold: colour('brand-harvest-gold'),
  cocoa: colour('brand-cocoa-brown'),
  leaf: colour('brand-leaf-green'),
  ivory: colour('brand-savanna-ivory'),
  charcoal: colour('brand-charcoal'),
  surface: colour('surface'),
  surfaceIvory: colour('surface-ivory'),
  ink: colour('ink'),
  inkMuted: colour('ink-muted'),
};

// ------------------------------------------------------- catalogue ----------

/** Approved logo files, with their use and the raster widths to export. */
const LOGOS = [
  {
    src: 'aaan-logo-horizontal',
    title: 'Primary horizontal lockup',
    use: 'Default. Website header, documents, signage, email signatures.',
    widths: [512, 1024, 2048],
    clear: 50,
  },
  {
    src: 'aaan-logo-stacked',
    title: 'Stacked lockup',
    use: 'Square or narrow spaces: social banners, packaging fronts, merchandise.',
    widths: [512, 1024, 2048],
    clear: 45,
  },
  {
    src: 'aaan-mark-primary',
    title: 'Brand mark',
    use: 'The mark alone, once the name is already on the page: footers, loaders, watermarks.',
    widths: [256, 512, 1024],
    clear: 50,
  },
  {
    src: 'aaan-wordmark',
    title: 'Wordmark',
    use: 'Name-only uses where the mark already appears nearby.',
    widths: [512, 1024, 2048],
    clear: null,
  },
  {
    src: 'aaan-app-icon',
    title: 'App icon',
    use: 'Favicon, app icon and social avatar. Use below 140 px wide.',
    widths: [128, 256, 512, 1024],
    clear: null,
  },
  {
    src: 'aaan-logo-horizontal-reversed',
    title: 'Reversed horizontal lockup',
    use: 'Forest green bands, dark photography and the dark theme.',
    widths: [512, 1024, 2048],
    clear: 50,
  },
  {
    src: 'aaan-logo-horizontal-mono-green',
    title: 'One-colour horizontal lockup (forest green)',
    use: 'One-colour print: stamps, embossing, single-ink packaging.',
    widths: [512, 1024, 2048],
    clear: null,
  },
  {
    src: 'aaan-logo-horizontal-white',
    title: 'One-colour horizontal lockup (white)',
    use: 'White on photographs, vehicles, sacks and containers.',
    widths: [512, 1024, 2048],
    clear: null,
  },
  {
    src: 'aaan-mark-mono-green',
    title: 'One-colour mark (forest green)',
    use: 'One-colour print of the mark alone.',
    widths: [256, 512, 1024],
    clear: null,
  },
  {
    src: 'aaan-mark-white',
    title: 'One-colour mark (white)',
    use: 'White mark on photographs and dark grounds.',
    widths: [256, 512, 1024],
    clear: null,
  },
];

/**
 * Ready-made presentation files: each logo on a ground the brand guidelines
 * approve, with the clear space applied. Full colour never goes on forest
 * green, and the reversed logo never goes on light grounds.
 */
const ON_GROUND = [
  { src: 'aaan-logo-horizontal', ground: PALETTE.surface, label: 'white', pad: 50, width: 2400 },
  { src: 'aaan-logo-horizontal', ground: PALETTE.surfaceIvory, label: 'ivory', pad: 50, width: 2400 },
  { src: 'aaan-logo-stacked', ground: PALETTE.surfaceIvory, label: 'ivory', pad: 45, width: 1600 },
  { src: 'aaan-mark-primary', ground: PALETTE.surfaceIvory, label: 'ivory', pad: 50, width: 1200 },
  { src: 'aaan-logo-horizontal-reversed', ground: PALETTE.forest, label: 'forest-green', pad: 50, width: 2400 },
  { src: 'aaan-mark-white', ground: PALETTE.forest, label: 'forest-green', pad: 50, width: 1200 },
];

/** The 24 line icons, grouped as in the brand kit. */
const ICONS = {
  crops: ['cocoa', 'cashew', 'palm-oil', 'cassava', 'yam', 'banana', 'pineapple', 'maize', 'potato', 'dairy', 'vegetables'],
  activities: ['seedling', 'nursery', 'smart-farming', 'irrigation', 'organic', 'processing', 'quality', 'traceability', 'export', 'shipping', 'logistics', 'farmer-network', 'training'],
};
const ICON_NAMES = [...ICONS.crops, ...ICONS.activities];

const OG_TEXT = {
  en: { tagline: ['From African Soil', 'to Global Tables.'], sub: 'Seed to Shelf. Africa to the World.', file: 'og-image-en-1200x630.png' },
  fr: { tagline: ['Du sol africain', 'aux tables du monde.'], sub: null, file: 'og-image-fr-1200x630.png' },
};

// ------------------------------------------------------------ helpers -------

const manifest = [];
const stats = { files: 0, bytes: 0 };

function write(rel, data) {
  const abs = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, data);
  stats.files += 1;
  stats.bytes += data.length;
  return rel.split(path.sep).join('/');
}

function record(group, rel, description, extra = {}) {
  const abs = path.join(OUT, rel);
  const bytes = fs.statSync(abs).size;
  const entry = { group, file: rel.split(path.sep).join('/'), bytes, description, ...extra };
  if (rel.endsWith('.png')) Object.assign(entry, pngSize(fs.readFileSync(abs)));
  manifest.push(entry);
  return entry;
}

function pngSize(buf) {
  // IHDR width and height sit at bytes 16-23 of a PNG.
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function readSource(folder, name) {
  const file = path.join(SRC, folder, `${name}.svg`);
  if (!fs.existsSync(file)) throw new Error(`Missing master file: brand/source/${folder}/${name}.svg`);
  return fs.readFileSync(file, 'utf8');
}

function recolour(svg, fromHex, toHex) {
  return svg.replace(new RegExp(fromHex, 'gi'), toHex);
}

function viewBoxOf(svg) {
  const [x, y, w, h] = /viewBox="([^"]+)"/.exec(svg)[1].trim().split(/\s+/).map(Number);
  return { x, y, w, h };
}

function innerOf(svg) {
  const start = svg.indexOf('>', svg.indexOf('<svg')) + 1;
  return svg.slice(start, svg.lastIndexOf('</svg>'));
}

/** Render an SVG string to PNG. Fonts come from brand/source/fonts only. */
function renderPng(svg, { width, background } = {}) {
  const options = {
    font: { loadSystemFonts: false, fontFiles: FONT_FILES, defaultFontFamily: 'Manrope' },
  };
  if (background) options.background = background;
  if (width) options.fitTo = { mode: 'width', value: Math.round(width) };
  return Buffer.from(new Resvg(svg, options).render().asPng());
}

/** Wrap a logo in a canvas with the brand clear space on every side. */
function onGroundSvg(logoSvg, { ground, pad }) {
  const vb = viewBoxOf(logoSvg);
  const W = vb.w + pad * 2;
  const H = vb.h + pad * 2;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    `<rect width="${W}" height="${H}" fill="${ground}"/>`,
    `<svg x="${pad}" y="${pad}" width="${vb.w}" height="${vb.h}" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}" overflow="visible">`,
    innerOf(logoSvg),
    `</svg></svg>`,
  ].join('');
}

/** Build a Windows ICO file from PNG buffers (PNG-compressed entries). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = header.length + dir.length;
  images.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir[o] = size >= 256 ? 0 : size;
    dir[o + 1] = size >= 256 ? 0 : size;
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

/** Build a store-only (uncompressed) ZIP. PNG and SVG are already compact. */
function buildZip(entries) {
  const dosTime = (NOW.getHours() << 11) | (NOW.getMinutes() << 5) | Math.floor(NOW.getSeconds() / 2);
  const dosDate = ((NOW.getFullYear() - 1980) << 9) | ((NOW.getMonth() + 1) << 5) | NOW.getDate();
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8');
    const crc = zlib.crc32(data) >>> 0;

    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    lh.writeUInt16LE(0x0800, 6); // UTF-8 names
    lh.writeUInt16LE(0, 8); // stored
    lh.writeUInt16LE(dosTime, 10);
    lh.writeUInt16LE(dosDate, 12);
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(data.length, 18);
    lh.writeUInt32LE(data.length, 22);
    lh.writeUInt16LE(nameBuf.length, 26);
    lh.writeUInt16LE(0, 28);
    locals.push(lh, nameBuf, data);

    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0);
    ch.writeUInt16LE(20, 4);
    ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(0x0800, 8);
    ch.writeUInt16LE(0, 10);
    ch.writeUInt16LE(dosTime, 12);
    ch.writeUInt16LE(dosDate, 14);
    ch.writeUInt32LE(crc, 16);
    ch.writeUInt32LE(data.length, 20);
    ch.writeUInt32LE(data.length, 24);
    ch.writeUInt16LE(nameBuf.length, 28);
    ch.writeUInt32LE(offset, 42);
    centrals.push(ch, nameBuf);

    offset += lh.length + nameBuf.length + data.length;
  }

  const centralSize = centrals.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, ...centrals, end]);
}

// ----------------------------------------------------------- check ----------

function check() {
  const problems = [];
  const need = (folder, names) =>
    names.forEach((n) => {
      if (!fs.existsSync(path.join(SRC, folder, `${n}.svg`))) problems.push(`brand/source/${folder}/${n}.svg`);
    });
  need('logos', [...LOGOS.map((l) => l.src), 'aaan-logo-horizontal-mono-green', 'aaan-mark-mono-green']);
  need('icons', ICON_NAMES);
  FONT_FILES.forEach((f) => {
    if (!fs.existsSync(f)) problems.push(path.relative(ROOT, f));
  });
  if (!fs.existsSync(path.join(SRC, 'tokens.json'))) problems.push('brand/source/tokens.json');
  if (problems.length) {
    console.error('Missing sources:\n  ' + problems.join('\n  '));
    process.exit(1);
  }
  console.log(`OK: ${LOGOS.length} logo masters, ${ICON_NAMES.length} icons, fonts and tokens present.`);
  console.log(`Brand kit: ${tokens.name} v${tokens.version}, ${tokens.color.tokens.length} colour tokens.`);
}

// ------------------------------------------------------------ build ---------

function clean() {
  for (const d of ['logos', 'icons', 'favicon', 'social', 'colour', 'fonts']) {
    fs.rmSync(path.join(OUT, d), { recursive: true, force: true });
  }
  for (const f of ['index.html', 'brand-manifest.json', ZIP_NAME]) {
    fs.rmSync(path.join(OUT, f), { force: true });
  }
}

function buildLogos() {
  for (const logo of LOGOS) {
    const svg = readSource('logos', logo.src);
    const svgRel = write(path.join('logos', 'svg', `${logo.src}.svg`), svg);
    record('logos', svgRel, `${logo.title} (vector master)`, { set: logo.src, format: 'svg', title: logo.title, use: logo.use });

    for (const w of logo.widths) {
      const rel = write(path.join('logos', 'png', `${logo.src}-${w}.png`), renderPng(svg, { width: w }));
      record('logos', rel, `${logo.title}, PNG ${w} px wide, transparent`, { set: logo.src, format: 'png', width_request: w, title: logo.title });
    }
  }

  for (const g of ON_GROUND) {
    const logo = LOGOS.find((l) => l.src === g.src);
    const svg = readSource('logos', g.src);
    const name = `${g.src}_on-${g.label}`;
    const rel = write(path.join('logos', 'on-ground', `${name}.png`), renderPng(onGroundSvg(svg, g), { width: g.width }));
    record('logos', rel, `${logo.title} on ${g.label}, with clear space`, { set: g.src, format: 'png', title: `${logo.title} on ${g.label}`, use: 'Presentation file with brand clear space applied.' });
  }
}

function buildIcons() {
  const forest = PALETTE.forest;
  const ivory = PALETTE.ivory;
  const symbols = [];

  for (const name of ICON_NAMES) {
    const master = readSource('icons', name);
    const group = ICONS.crops.includes(name) ? 'crop' : 'activity';
    const label = name.replace(/-/g, ' ');

    const forestSvg = master;
    const ivorySvg = recolour(master, forest, ivory);
    const fRel = write(path.join('icons', 'svg', `${name}.svg`), forestSvg);
    const iRel = write(path.join('icons', 'svg', `${name}-ivory.svg`), ivorySvg);
    record('icons', fRel, `${label} icon, forest green (${group})`, { set: name, format: 'svg', title: label, variant: 'forest' });
    record('icons', iRel, `${label} icon, ivory for green backgrounds (${group})`, { set: name, format: 'svg', title: label, variant: 'ivory' });

    for (const size of [48, 96]) {
      const r1 = write(path.join('icons', 'png', `${name}-${size}.png`), renderPng(forestSvg, { width: size }));
      const r2 = write(path.join('icons', 'png', `${name}-ivory-${size}.png`), renderPng(ivorySvg, { width: size }));
      record('icons', r1, `${label} icon, forest green, ${size} px`, { set: name, format: 'png', title: label, variant: 'forest', width_request: size });
      record('icons', r2, `${label} icon, ivory, ${size} px`, { set: name, format: 'png', title: label, variant: 'ivory', width_request: size });
    }

    const inner = innerOf(master);
    symbols.push(`<symbol id="aaan-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`);
  }

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join('')}</svg>\n`;
  const spriteRel = write(path.join('icons', 'sprite.svg'), sprite);
  record('icons', spriteRel, 'All 24 icons as one SVG sprite. Use <svg><use href="icons/sprite.svg#aaan-seedling"/></svg>, colour set by CSS.', { format: 'svg', title: 'Icon sprite' });
}

function buildFavicons() {
  const appIcon = readSource('logos', 'aaan-app-icon');

  const svgRel = write(path.join('favicon', 'favicon.svg'), appIcon);
  record('favicon', svgRel, 'Favicon, vector (modern browsers)', { format: 'svg', title: 'Favicon (vector)' });

  const ico = [];
  for (const size of [16, 32, 48]) {
    const buf = renderPng(appIcon, { width: size });
    ico.push({ size, buf });
    const rel = write(path.join('favicon', `favicon-${size}.png`), buf);
    record('favicon', rel, `Favicon, PNG ${size} px`, { format: 'png', title: `Favicon ${size}`, width_request: size });
  }
  const icoRel = write(path.join('favicon', 'favicon.ico'), buildIco(ico));
  record('favicon', icoRel, 'Favicon for legacy browsers (16, 32 and 48 px in one file)', { format: 'ico', title: 'favicon.ico' });

  // Apple icons must be full-bleed squares, so the rounded corners are removed.
  const square = appIcon.replace('rx="26"', 'rx="0"');
  const appleRel = write(path.join('favicon', 'apple-touch-icon-180.png'), renderPng(square, { width: 180 }));
  record('favicon', appleRel, 'Apple touch icon, 180 px, full-bleed square', { format: 'png', title: 'Apple touch icon', width_request: 180 });

  for (const size of [192, 512]) {
    const rel = write(path.join('favicon', `icon-${size}.png`), renderPng(appIcon, { width: size }));
    record('favicon', rel, `App icon, PNG ${size} px (Android and PWA)`, { format: 'png', title: `App icon ${size}`, width_request: size });
  }
}

function buildSocial() {
  const avatarRel = write(path.join('social', 'avatar-400.png'), renderPng(readSource('logos', 'aaan-app-icon'), { width: 400 }));
  record('social', avatarRel, 'Social media profile picture, 400 px', { format: 'png', title: 'Social avatar', width_request: 400 });

  const horizontalReversed = readSource('logos', 'aaan-logo-horizontal-reversed');
  const banner = bannerSvg(horizontalReversed);
  const bannerRel = write(path.join('social', 'linkedin-banner-1584x396.png'), renderPng(banner, { width: 1584 }));
  record('social', bannerRel, 'LinkedIn company banner, 1584 x 396 px', { format: 'png', title: 'LinkedIn banner', width_request: 1584 });

  const mark = readSource('logos', 'aaan-mark-primary');
  for (const lang of ['en', 'fr']) {
    const svg = ogSvg(lang, mark);
    const rel = write(path.join('social', OG_TEXT[lang].file), renderPng(svg, { width: 1200 }));
    record('social', rel, `Open Graph share image, ${lang === 'en' ? 'English' : 'French'}, 1200 x 630 px`, {
      format: 'png',
      title: `Share image (${lang.toUpperCase()})`,
      width_request: 1200,
    });
  }
}

function textLines(x, y, lines, { size, weight, family, fill, lineHeight }) {
  return lines
    .map((line, i) => `<text x="${x}" y="${y + i * lineHeight}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(line)}</text>`)
    .join('');
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** 1200 x 630 share card: ivory field, lockup, tagline in Fraunces, mark on the right. */
function ogSvg(lang, markSvg) {
  const { tagline, sub } = OG_TEXT[lang];
  const logo = readSource('logos', 'aaan-logo-horizontal');
  const lvb = viewBoxOf(logo);
  const logoW = 420;
  const logoH = (lvb.h / lvb.w) * logoW;
  const markSize = 250;
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">`,
    `<rect width="1200" height="630" fill="${PALETTE.surfaceIvory}"/>`,
    `<rect y="606" width="1200" height="24" fill="${PALETTE.forest}"/>`,
    `<svg x="80" y="80" width="${logoW}" height="${logoH}" viewBox="${lvb.x} ${lvb.y} ${lvb.w} ${lvb.h}" overflow="visible">${innerOf(logo)}</svg>`,
    `<svg x="900" y="190" width="${markSize}" height="${markSize}" viewBox="0 0 100 100" overflow="visible">${innerOf(markSvg)}</svg>`,
    textLines(80, 300, tagline, { size: 84, weight: 600, family: 'Fraunces', fill: PALETTE.forest, lineHeight: 96 }),
  ];
  if (sub) {
    parts.push(textLines(80, 500, [sub], { size: 30, weight: 600, family: 'Manrope', fill: PALETTE.inkMuted, lineHeight: 36 }));
  }
  parts.push(`</svg>`);
  return parts.join('');
}

/** 1584 x 396 LinkedIn banner: forest green field, reversed lockup, tagline. */
function bannerSvg(reversedLogo) {
  const lvb = viewBoxOf(reversedLogo);
  const logoW = 560;
  const logoH = (lvb.h / lvb.w) * logoW;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396">`,
    `<rect width="1584" height="396" fill="${PALETTE.forest}"/>`,
    `<svg x="110" y="${(396 - logoH) / 2}" width="${logoW}" height="${logoH}" viewBox="${lvb.x} ${lvb.y} ${lvb.w} ${lvb.h}" overflow="visible">${innerOf(reversedLogo)}</svg>`,
    textLines(760, 186, ['From African Soil to Global Tables.'], { size: 68, weight: 600, family: 'Fraunces', fill: PALETTE.ivory, lineHeight: 80 }),
    textLines(760, 252, ['Seed to Shelf. Africa to the World.'], { size: 30, weight: 600, family: 'Manrope', fill: PALETTE.gold, lineHeight: 36 }),
    `</svg>`,
  ].join('');
}

function buildFonts() {
  fs.mkdirSync(path.join(OUT, 'fonts'), { recursive: true });
  for (const f of FONT_FILES) {
    const rel = write(path.join('fonts', path.basename(f)), fs.readFileSync(f));
    record('fonts', rel, `${path.basename(f, '.ttf').split('-')[0]} variable font (SIL Open Font License 1.1)`, { format: 'ttf', title: path.basename(f) });
  }
  const readme = [
    '# AAAN brand fonts',
    '',
    'Fraunces (display serif) and Manrope (sans-serif) are free Google Fonts,',
    'licensed under the SIL Open Font License 1.1. Both cover French accents.',
    '',
    'Web: the brand site loads them from Google Fonts (Fraunces 400 and 600,',
    'Manrope 400, 500, 600 and 700). Install the .ttf files here for print and',
    'desktop design.',
    '',
  ].join('\n');
  const rel = write(path.join('fonts', 'README.md'), readme);
  record('fonts', rel, 'Font licence and usage note', { format: 'md', title: 'Font notes' });
}

function buildColour() {
  // CSS custom properties: light theme, dark theme by system preference, and an explicit data-theme switch.
  const light = [];
  const dark = [];
  for (const t of tokens.color.tokens) {
    light.push(`  --aaan-${t.name}: ${colour(t.name, 'light')};`);
    dark.push(`  --aaan-${t.name}: ${colour(t.name, 'dark')};`);
  }
  const spacing = tokens.spacing.tokens.map((t) => `  --aaan-${t.name}: ${t.value};`);
  const radius = tokens.radius.tokens.map((t) => `  --aaan-${t.name}: ${t.value};`);
  const families = Object.entries(tokens.type.families).map(([k, v]) => `  --aaan-font-${k}: ${v};`);
  const shadows = (tokens.shadow?.tokens ?? []).flatMap((t) => [
    `  --aaan-${t.name}: ${t.value.light};`,
  ]);
  const shadowsDark = (tokens.shadow?.tokens ?? []).map((t) => `  --aaan-${t.name}: ${t.value.dark};`);

  const css = [
    `/* ${tokens.name} brand tokens, v${tokens.version}. Generated by brand/scripts/generate-brand-assets.mjs. Do not edit by hand. */`,
    `:root {`,
    ...light,
    ...spacing,
    ...radius,
    ...families,
    ...shadows,
    `}`,
    `@media (prefers-color-scheme: dark) {`,
    `  :root:not([data-theme="light"]) {`,
    ...dark.map((l) => '  ' + l),
    ...shadowsDark.map((l) => '  ' + l),
    `  }`,
    `}`,
    `:root[data-theme="dark"] {`,
    ...dark,
    ...shadowsDark,
    `}`,
    '',
  ].join('\n');
  record('colour', write(path.join('colour', 'brand-tokens.css'), css), 'Colour, spacing, radius, shadow and font tokens as CSS custom properties (light and dark)', { format: 'css', title: 'brand-tokens.css' });

  const palette = tokens.color.tokens.map((t) => ({
    name: t.name,
    light: colour(t.name, 'light'),
    dark: colour(t.name, 'dark'),
    usage: t.usage,
  }));
  record('colour', write(path.join('colour', 'brand-palette.json'), JSON.stringify(palette, null, 2) + '\n'), 'Every colour token with light and dark values and usage notes', { format: 'json', title: 'brand-palette.json' });

  record('colour', write(path.join('colour', 'brand-tokens.json'), fs.readFileSync(path.join(SRC, 'tokens.json'))), 'Full design tokens (colour, type, spacing, radius, shadow) as published in the brand kit', { format: 'json', title: 'brand-tokens.json' });
}

// ------------------------------------------------------ showcase page ------

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function findEntry(set, format, width) {
  return manifest.find((e) => e.set === set && e.format === format && (width === undefined || e.width_request === width));
}

function chip(entry, label) {
  if (!entry) return '';
  return `<a class="chip" href="${esc(entry.file)}" download>${esc(label)}<span>${formatBytes(entry.bytes)}</span></a>`;
}

function formatBytes(n) {
  if (n >= 1048576) return `${(n / 1048576).toFixed(1)} MB`;
  if (n >= 1024) return `${Math.round(n / 1024)} KB`;
  return `${n} B`;
}

function logoCard(logo) {
  const svg = findEntry(logo.src, 'svg');
  const chips = [
    chip(svg, 'SVG'),
    ...logo.widths.filter((w) => w >= 512).map((w) => chip(findEntry(logo.src, 'png', w), `PNG ${w}`)),
  ].join('');
  const ground = logo.src.includes('reversed') || logo.src.includes('white') ? 'var(--aaan-brand-forest-green)' : 'var(--aaan-surface)';
  return `
    <article class="card">
      <div class="preview" style="background:${ground}">
        <img src="${esc(svg.file)}" alt="${esc(logo.title)}" loading="lazy">
      </div>
      <div class="card-body">
        <h3>${esc(logo.title)}</h3>
        <p class="muted">${esc(logo.use)}</p>
        <div class="chips">${chips}</div>
      </div>
    </article>`;
}

function onGroundCard(g) {
  const logo = LOGOS.find((l) => l.src === g.src);
  const entry = manifest.find((e) => e.file === `logos/on-ground/${g.src}_on-${g.label}.png`);
  const bg = g.label === 'forest-green' ? 'var(--aaan-brand-forest-green)' : g.label === 'white' ? 'var(--aaan-surface)' : 'var(--aaan-surface-ivory)';
  return `
    <article class="card">
      <div class="preview" style="background:${bg}">
        <img src="${esc(entry.file)}" alt="${esc(logo.title)} on ${esc(g.label)}" loading="lazy">
      </div>
      <div class="card-body">
        <h3>${esc(logo.title)} on ${esc(g.label.replace('-', ' '))}</h3>
        <p class="muted">Clear space applied on every side.</p>
        <div class="chips">${chip(entry, 'PNG 2400')}</div>
      </div>
    </article>`;
}

function swatchGrid() {
  const names = [
    'brand-forest-green', 'brand-harvest-gold', 'brand-cocoa-brown', 'brand-leaf-green', 'brand-savanna-ivory', 'brand-charcoal',
    'surface', 'surface-ivory', 'surface-sand', 'ink', 'ink-muted', 'ink-brand', 'ink-gold', 'on-brand', 'on-gold',
  ];
  return names
    .map((n) => {
      const t = tokens.color.tokens.find((x) => x.name === n);
      const hex = colour(n, 'light');
      const dark = colour(n, 'dark');
      const isDark = dark !== hex ? ` (dark ${dark})` : '';
      return `
      <article class="swatch">
        <div class="chip-colour" style="background:var(--aaan-${n})"></div>
        <div class="swatch-body">
          <h3>${esc(n)}</h3>
          <p class="mono">${esc(hex)}${esc(isDark)}</p>
          <p class="muted small">${esc(t.usage)}</p>
          <button type="button" class="btn btn-small" data-copy="${esc(hex)}">Copy hex</button>
        </div>
      </article>`;
    })
    .join('');
}

function typeTable() {
  return tokens.type.groups
    .flatMap((grp) =>
      grp.styles.map(
        (s) => `<tr>
          <td><code>${esc(s.name)}</code></td>
          <td>${esc(grp.family)}</td>
          <td>${esc(s.fontSize)} / ${esc(s.lineHeight)}</td>
          <td>${esc(s.fontWeight)}</td>
          <td class="muted">${esc(s.usage ?? '')}</td>
        </tr>`,
      ),
    )
    .join('');
}

function iconCard(name) {
  const f = findEntry(name, 'svg');
  const iv = manifest.find((e) => e.file === `icons/svg/${name}-ivory.svg`);
  const label = name.replace(/-/g, ' ');
  const group = ICONS.crops.includes(name) ? 'Crop' : 'Activity';
  return `
    <article class="icon-card">
      <div class="icon-tiles">
        <div class="tile"><img src="${esc(f.file)}" alt="" width="48" height="48"></div>
        <div class="tile tile-green"><img src="${esc(iv.file)}" alt="" width="48" height="48"></div>
      </div>
      <h3>${esc(label)}</h3>
      <p class="muted small">${group}</p>
      <div class="chips">
        ${chip(f, 'SVG')}
        ${chip(findEntry(name, 'png', 96), 'PNG 96')}
        ${chip(manifest.find((e) => e.file === `icons/png/${name}-ivory-96.png`), 'Ivory PNG')}
      </div>
    </article>`;
}

function buildHtml() {
  const primary = LOGOS[0];
  const primaryFile = findEntry(primary.src, 'svg').file;
  const smallMark = findEntry('aaan-mark-primary', 'svg').file;
  const faviconFiles = [16, 32, 48, 180, 192, 512];
  const favicons = faviconFiles
    .map((w) => {
      const e = manifest.find((m) => m.file === (w === 180 ? 'favicon/apple-touch-icon-180.png' : w === 192 || w === 512 ? `favicon/icon-${w}.png` : `favicon/favicon-${w}.png`));
      return `<figure class="fav"><div class="fav-img"><img src="${esc(e.file)}" alt="AAAN icon ${w} px" width="${Math.min(w, 128)}" height="${Math.min(w, 128)}"></div><figcaption>${w} px</figcaption>${chip(e, 'PNG')}</figure>`;
    })
    .join('');

  const social = [
    manifest.find((m) => m.file === 'social/avatar-400.png'),
    manifest.find((m) => m.file === 'social/linkedin-banner-1584x396.png'),
    manifest.find((m) => m.file === 'social/og-image-en-1200x630.png'),
    manifest.find((m) => m.file === 'social/og-image-fr-1200x630.png'),
  ]
    .map((e) => {
      const label = e.description.split(',')[0];
      return `<article class="card">
        <div class="preview preview-wide"><img src="${esc(e.file)}" alt="${esc(label)}" loading="lazy"></div>
        <div class="card-body"><h3>${esc(label)}</h3><p class="muted small">${esc(e.width)} × ${esc(e.height)} px</p>
        <div class="chips">${chip(e, 'Download PNG')}</div></div></article>`;
    })
    .join('');

  const logoCards = LOGOS.filter((l) => l.src !== 'aaan-app-icon').map(logoCard).join('');
  const onGround = ON_GROUND.map(onGroundCard).join('');
  const crops = ICONS.crops.map(iconCard).join('');
  const activities = ICONS.activities.map(iconCard).join('');
  const totalFiles = manifest.length;
  const stamp = NOW.toISOString().slice(0, 10);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AAAN brand assets</title>
<meta name="description" content="Logos, icons, colours, fonts and social templates for AAAN, generated from the AAAN Brand Kit.">
<link rel="icon" href="favicon/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="colour/brand-tokens.css">
<style>
  @font-face { font-family: "Fraunces"; src: url("fonts/Fraunces-Variable.ttf") format("truetype"); font-weight: 100 900; font-display: swap; }
  @font-face { font-family: "Manrope"; src: url("fonts/Manrope-Variable.ttf") format("truetype"); font-weight: 200 800; font-display: swap; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--aaan-surface); color: var(--aaan-ink); font-family: var(--aaan-font-sans); font-size: 16px; line-height: 26px; }
  img { display: block; max-width: 100%; height: auto; }
  a { color: var(--aaan-ink-brand); }
  code, .mono { font-family: ui-monospace, "Cascadia Mono", Consolas, monospace; font-size: 14px; }
  .wrap { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
  section { padding: 64px 0; border-top: 1px solid var(--aaan-line); }
  section.alt { background: var(--aaan-surface-ivory); }
  .eyebrow { font-size: 12px; line-height: 16px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--aaan-ink-brand); margin: 0 0 8px; }
  h1, h2 { font-family: var(--aaan-font-display); font-weight: 600; line-height: 1.1; margin: 0 0 16px; }
  h1 { font-size: 64px; }
  h2 { font-size: 36px; }
  h3 { font-size: 22px; line-height: 30px; font-weight: 700; margin: 0 0 6px; }
  p { margin: 0 0 12px; max-width: 68ch; }
  .lead { font-size: 18px; line-height: 30px; color: var(--aaan-ink-muted); }
  .muted { color: var(--aaan-ink-muted); }
  .small { font-size: 14px; line-height: 22px; }
  /* header */
  header.top { position: sticky; top: 0; z-index: 10; background: var(--aaan-surface); border-bottom: 1px solid var(--aaan-line); }
  header.top .wrap { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; flex-wrap: wrap; }
  header.top img { height: 40px; width: auto; }
  nav.links { display: flex; gap: 16px; flex-wrap: wrap; font-size: 14px; font-weight: 600; }
  nav.links a { text-decoration: none; color: var(--aaan-ink); }
  nav.links a:hover { color: var(--aaan-ink-brand); text-decoration: underline; }
  /* hero */
  .hero { padding: 88px 0 72px; background: var(--aaan-surface-ivory); border-top: 0; }
  .hero-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: center; }
  .hero-logo { background: var(--aaan-surface); border-radius: var(--aaan-radius-xl); padding: 56px 40px; display: flex; align-items: center; justify-content: center; }
  .hero-logo img { width: 100%; max-width: 440px; }
  .tagline { font-family: var(--aaan-font-display); font-size: 40px; line-height: 46px; font-weight: 600; color: var(--aaan-brand-forest-green); margin: 0 0 16px; }
  .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
  .btn { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 12px 20px; border-radius: var(--aaan-radius-md); background: var(--aaan-brand-forest-green); color: var(--aaan-on-brand); font: 700 15px/20px var(--aaan-font-sans); text-decoration: none; border: 2px solid transparent; cursor: pointer; }
  .btn:hover { background: var(--aaan-brand-forest-green-hover); }
  .btn-ghost { background: transparent; color: var(--aaan-brand-forest-green); border-color: var(--aaan-brand-forest-green); }
  .btn-ghost:hover { background: var(--aaan-surface); }
  .btn-small { min-height: 36px; padding: 6px 12px; font-size: 14px; margin-top: 8px; }
  button.btn, a.btn, .chip, a { outline-offset: 2px; }
  :focus-visible { outline: 2px solid var(--aaan-focus-ring); outline-offset: 2px; }
  /* cards and grids */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; margin-top: 32px; }
  .card { background: var(--aaan-surface); border: 1px solid var(--aaan-line); border-radius: var(--aaan-radius-lg); overflow: hidden; display: flex; flex-direction: column; }
  .section.alt .card { background: var(--aaan-surface); }
  .preview { aspect-ratio: 4 / 3; display: flex; align-items: center; justify-content: center; padding: 28px; border-bottom: 1px solid var(--aaan-line); }
  .preview img { max-height: 100%; width: auto; max-width: 100%; }
  .preview-wide { aspect-ratio: 16 / 9; }
  .card-body { padding: 20px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 12px; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: var(--aaan-radius-pill); border: 1px solid var(--aaan-line-strong); color: var(--aaan-ink-brand); text-decoration: none; font-size: 13px; font-weight: 600; background: transparent; }
  .chip span { color: var(--aaan-ink-muted); font-weight: 500; }
  .chip:hover { background: var(--aaan-surface-ivory); }
  /* clear space */
  .clear-demo { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; margin-top: 32px; }
  .clear-box { position: relative; background: var(--aaan-surface); border: 1px solid var(--aaan-line); border-radius: var(--aaan-radius-lg); padding: 24px; display: flex; align-items: center; justify-content: center; }
  .clear-box .frame { outline: 1px dashed var(--aaan-brand-cocoa-brown); outline-offset: 0; padding: 0; }
  .clear-box .frame img { width: 300px; }
  .clear-box .frame .clear-zone { padding: 32px; background: rgba(126, 179, 63, 0.12); }
  .clear-box img { width: 280px; }
  .min-row { display: flex; gap: 32px; align-items: flex-end; flex-wrap: wrap; }
  .min-row figure { margin: 0; }
  .min-row img { border: 1px dashed var(--aaan-line-strong); }
  figcaption { font-size: 13px; color: var(--aaan-ink-muted); margin-top: 6px; }
  /* colour */
  .swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-top: 32px; }
  .swatch { border: 1px solid var(--aaan-line); border-radius: var(--aaan-radius-lg); overflow: hidden; background: var(--aaan-surface); }
  .chip-colour { height: 96px; border-bottom: 1px solid var(--aaan-line); }
  .swatch-body { padding: 14px 16px 16px; }
  .swatch-body h3 { font-size: 16px; line-height: 22px; font-family: var(--aaan-font-sans); }
  /* type */
  .type-sample { background: var(--aaan-surface); border: 1px solid var(--aaan-line); border-radius: var(--aaan-radius-lg); padding: 40px; margin-top: 32px; }
  .type-sample .display { font-family: var(--aaan-font-display); font-size: 64px; line-height: 68px; font-weight: 600; letter-spacing: -0.01em; color: var(--aaan-brand-forest-green); margin: 0 0 16px; }
  .type-sample .body { font-size: 18px; line-height: 30px; color: var(--aaan-ink-muted); }
  table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 14px; background: var(--aaan-surface); }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--aaan-line); vertical-align: top; }
  th { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--aaan-ink-muted); }
  .table-wrap { overflow-x: auto; }
  /* icons */
  .icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin-top: 24px; }
  .icon-card { background: var(--aaan-surface); border: 1px solid var(--aaan-line); border-radius: var(--aaan-radius-lg); padding: 16px; display: flex; flex-direction: column; }
  .icon-card h3 { font-size: 16px; line-height: 22px; font-family: var(--aaan-font-sans); text-transform: capitalize; }
  .icon-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
  .tile { height: 88px; border-radius: var(--aaan-radius-md); background: var(--aaan-surface-ivory); display: flex; align-items: center; justify-content: center; }
  .tile-green { background: var(--aaan-brand-forest-green); }
  .subhead { font-size: 22px; font-family: var(--aaan-font-display); font-weight: 600; margin: 48px 0 0; }
  /* favicons */
  .fav-row { display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-end; margin-top: 24px; }
  .fav { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .fav-img { width: 128px; height: 128px; display: flex; align-items: center; justify-content: center; background: var(--aaan-surface); border: 1px solid var(--aaan-line); border-radius: var(--aaan-radius-lg); }
  footer { padding: 40px 0 56px; border-top: 1px solid var(--aaan-line); background: var(--aaan-brand-forest-green); color: var(--aaan-on-brand); }
  footer a { color: var(--aaan-on-brand); }
  footer .chip { color: var(--aaan-on-brand); border-color: var(--aaan-on-brand); }
  footer .chip span { color: var(--aaan-on-brand); opacity: .8; }
  footer .muted { color: var(--aaan-on-brand); opacity: .85; }
  @media (max-width: 860px) {
    h1 { font-size: 44px; line-height: 48px; }
    h2 { font-size: 30px; }
    .hero-grid, .clear-demo { grid-template-columns: 1fr; }
    .hero { padding: 56px 0; }
    .tagline { font-size: 30px; line-height: 36px; }
    .type-sample .display { font-size: 44px; line-height: 48px; }
    section { padding: 48px 0; }
  }
  @media (max-width: 520px) {
    .wrap { padding: 0 16px; }
    nav.links { gap: 10px; font-size: 13px; }
  }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>
</head>
<body>

<header class="top">
  <div class="wrap">
    <img src="${esc(primaryFile)}" alt="AAAN">
    <nav class="links" aria-label="Sections">
      <a href="#logos">Logos</a>
      <a href="#clear-space">Clear space</a>
      <a href="#icons-app">Favicons</a>
      <a href="#colour">Colour</a>
      <a href="#type">Type</a>
      <a href="#icons">Icons</a>
      <a href="#social">Social</a>
      <a href="${esc(ZIP_NAME)}" download>Download all (ZIP)</a>
    </nav>
  </div>
</header>

<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Brand asset library</p>
      <h1>Every AAAN logo, icon and colour, ready to download.</h1>
      <p class="tagline">From African Soil to Global Tables.</p>
      <p class="lead">Built from the AAAN Brand Kit. Each file is generated from the kit's master artwork and colour tokens, so every download matches the guidelines. For French, the tagline is <em>Du sol africain aux tables du monde.</em></p>
      <div class="actions">
        <a class="btn" href="${esc(ZIP_NAME)}" download>Download full kit (ZIP)</a>
        <a class="btn btn-ghost" href="${esc(primaryFile)}" download>Primary logo (SVG)</a>
      </div>
    </div>
    <div class="hero-logo"><img src="${esc(primaryFile)}" alt="AAAN, African Agricultural Advancement Network"></div>
  </div>
</section>

<section id="logos">
  <div class="wrap">
    <p class="eyebrow">Logo system</p>
    <h2>Logo variations</h2>
    <p class="lead">Use the primary horizontal lockup by default. Choose the version that matches the ground you are printing or publishing on. Vector SVG is best for web and print; PNG is for slides, email and social.</p>
    <div class="grid">${logoCards}</div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <p class="eyebrow">Ready to use</p>
    <h2>Logos with clear space</h2>
    <p class="lead">Each presentation file has the brand clear space applied (half the mark's diameter on every side) on a ground the guidelines approve.</p>
    <div class="grid">${onGround}</div>
  </div>
</section>

<section id="clear-space">
  <div class="wrap">
    <p class="eyebrow">Usage rules</p>
    <h2>Clear space and minimum size</h2>
    <div class="clear-demo">
      <div class="clear-box">
        <div class="frame"><div class="clear-zone"><img src="${esc(primaryFile)}" alt="Primary lockup with clear space"></div></div>
      </div>
      <div>
        <p><strong>Clear space.</strong> Keep empty space around the logo of at least half the mark's diameter on every side. Nothing else enters this zone: no text, photos or edges.</p>
        <p><strong>Minimum size.</strong> Horizontal lockup 140 px wide on screen (35 mm in print). Mark alone 24 px on screen (10 mm in print). Below these sizes, use the app icon.</p>
        <div class="min-row" style="margin-top:20px">
          <figure><img src="${esc(primaryFile)}" alt="" width="140"><figcaption>140 px minimum</figcaption></figure>
          <figure><img src="${esc(smallMark)}" alt="" width="24" height="24"><figcaption>24 px minimum (mark)</figcaption></figure>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="icons-app" class="alt">
  <div class="wrap">
    <p class="eyebrow">App and browser</p>
    <h2>Favicons and app icons</h2>
    <p class="lead">The app icon is the rising seedling on a forest green rounded square. Use it for favicons, app icons and anywhere the full lockup will not fit.</p>
    <div class="fav-row">${favicons}</div>
    <p class="small muted" style="margin-top:24px">Downloads: <a href="favicon/favicon.ico" download>favicon.ico</a> (16, 32, 48 px), <a href="favicon/favicon.svg" download>favicon.svg</a> (vector).</p>
  </div>
</section>

<section id="colour">
  <div class="wrap">
    <p class="eyebrow">Colour</p>
    <h2>Palette and tokens</h2>
    <p class="lead">Forest green is the brand. Harvest gold is the spark. About 60% of any page should be light grounds, 25% forest green, 10% gold and 5% cocoa brown and leaf green. Tokens are in <a href="colour/brand-tokens.css">brand-tokens.css</a> and <a href="colour/brand-palette.json">brand-palette.json</a>.</p>
    <div class="swatches">${swatchGrid()}</div>
  </div>
</section>

<section id="type" class="alt">
  <div class="wrap">
    <p class="eyebrow">Typography</p>
    <h2>Fraunces and Manrope</h2>
    <p class="lead">Fraunces carries the brand voice in headlines and figures. Manrope carries information: body text, labels and buttons. Both are free Google Fonts and support French accents.</p>
    <div class="type-sample">
      <p class="display">From African Soil to Global Tables</p>
      <p class="body">AAAN advances African agriculture from seed to shelf, growing, processing and exporting quality produce from Kenya, Ghana and Côte d'Ivoire.</p>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Style</th><th>Family</th><th>Size / line</th><th>Weight</th><th>Use</th></tr></thead>
        <tbody>${typeTable()}</tbody>
      </table>
    </div>
    <p class="small muted" style="margin-top:16px">Font files: <a href="fonts/README.md">licence and usage</a> · <a href="fonts/Fraunces-Variable.ttf" download>Fraunces (.ttf)</a> · <a href="fonts/Manrope-Variable.ttf" download>Manrope (.ttf)</a></p>
  </div>
</section>

<section id="icons">
  <div class="wrap">
    <p class="eyebrow">Iconography</p>
    <h2>24 line icons</h2>
    <p class="lead">Drawn on a 24 px grid with a 1.75 stroke and round joins. Use forest green on light grounds and ivory on forest green. Always pair an icon with a text label.</p>
    <h3 class="subhead">Crops</h3>
    <div class="icon-grid">${crops}</div>
    <h3 class="subhead">Activities</h3>
    <div class="icon-grid">${activities}</div>
    <p class="small muted" style="margin-top:24px">All icons together: <a href="icons/sprite.svg" download>icons/sprite.svg</a> (SVG sprite for websites).</p>
  </div>
</section>

<section id="social" class="alt">
  <div class="wrap">
    <p class="eyebrow">Social and marketing</p>
    <h2>Share images and banners</h2>
    <p class="lead">Share images carry the tagline in both languages. Every public page exists in English and French, so use the matching share image.</p>
    <div class="grid">${social}</div>
  </div>
</section>

<footer>
  <div class="wrap">
    <p class="muted" style="margin:0 0 8px">AAAN · From African Soil to Global Tables · Du sol africain aux tables du monde.</p>
    <p class="small" style="margin:0 0 8px">${totalFiles} files, generated ${esc(stamp)} from the AAAN Brand Kit v${esc(tokens.version)} by <code>brand/scripts/generate-brand-assets.mjs</code>.</p>
    <p class="small" style="margin:0"><a href="${esc(ZIP_NAME)}" download>Download the full kit (ZIP)</a></p>
  </div>
</footer>

<script>
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var label = btn.textContent;
    btn.addEventListener('click', function () {
      try {
        navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = label; }, 1400);
        }, function () { btn.textContent = 'Copy failed'; });
      } catch (e) {
        btn.textContent = 'Copy failed';
      }
    });
  });
</script>
</body>
</html>
`;
}

// ------------------------------------------------------------- main --------

function main() {
  console.log(`AAAN brand asset generator (${tokens.name} v${tokens.version})`);
  clean();

  buildColour();
  buildFonts();
  buildLogos();
  buildIcons();
  buildFavicons();
  buildSocial();

  const manifestDoc = {
    brand: tokens.name,
    version: tokens.version,
    generated: NOW.toISOString(),
    generator: 'brand/scripts/generate-brand-assets.mjs',
    files: manifest,
  };
  write('brand-manifest.json', JSON.stringify(manifestDoc, null, 2) + '\n');

  fs.writeFileSync(path.join(OUT, 'index.html'), buildHtml());

  // The ZIP is built last so it contains every file, including the page and manifest.
  const zipEntries = listFiles(OUT)
    .filter((f) => f !== ZIP_NAME)
    .map((rel) => ({ name: `AAAN-brand-assets/${rel}`, data: fs.readFileSync(path.join(OUT, rel)) }));
  fs.writeFileSync(path.join(OUT, ZIP_NAME), buildZip(zipEntries));

  const zipSize = fs.statSync(path.join(OUT, ZIP_NAME)).size;
  console.log(`Done: ${manifest.length} catalogued assets, ${listFiles(OUT).length} files in assets/brand/, ${formatBytes(zipSize)} ZIP.`);
  console.log(`Open ${path.relative(ROOT, path.join(OUT, 'index.html'))} in a browser to browse and download.`);
}

function listFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const abs = path.join(dir, d.name);
    if (d.isDirectory()) return listFiles(abs, base);
    return [path.relative(base, abs).split(path.sep).join('/')];
  });
}

if (CHECK_ONLY) {
  check();
} else {
  check();
  main();
}

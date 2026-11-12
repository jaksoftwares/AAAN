#!/usr/bin/env node
// Copies the generated brand library (assets/brand) into public/brand so the
// site can serve logos, icons, favicons and downloads from /brand/...
// Runs before every dev and build. The copy is generated, so it is git-ignored.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "assets", "brand");
const TARGET = path.join(ROOT, "public", "brand");
// The standalone brand page is for the design team, not the public site.
const SKIP = new Set(["index.html", "brand-manifest.json"]);

if (!fs.existsSync(SOURCE)) {
  console.warn(`[sync-brand] ${path.relative(ROOT, SOURCE)} not found. Run the brand generator first.`);
  process.exit(0);
}

fs.rmSync(TARGET, { recursive: true, force: true });

let copied = 0;
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP.has(entry.name) && src === SOURCE) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else {
      fs.copyFileSync(from, to);
      copied += 1;
    }
  }
}

copyDir(SOURCE, TARGET);
console.log(`[sync-brand] ${copied} brand files copied to public/brand/`);

// Root-level files browsers request by fixed path.
const ROOT_COPIES = [
  ["favicon/favicon.ico", "favicon.ico"],
  ["favicon/apple-touch-icon-180.png", "apple-touch-icon.png"],
  ["favicon/icon-192.png", "icon-192.png"],
  ["favicon/icon-512.png", "icon-512.png"],
];
for (const [from, to] of ROOT_COPIES) {
  const src = path.join(TARGET, from);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(ROOT, "public", to));
}
// The brand asset ZIP is internal, so it is not copied into public/. Only the logos used by the site are.

#!/usr/bin/env node
// Copies the source media in assets/media and assets/directors into public/media
// with web-safe file names (lowercase, ASCII, hyphens). Originals are not changed.
// Prints a table of source name -> public path, which content/media.ts uses.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SOURCES = [path.join(ROOT, "assets", "media"), path.join(ROOT, "assets", "directors")];
const TARGET = path.join(ROOT, "public", "media");
const EXT = new Set([".png", ".jpg", ".jpeg", ".mp4"]);

export function slugName(file) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, path.extname(file))
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}${ext === ".jpeg" ? ".jpg" : ext}`;
}

fs.rmSync(TARGET, { recursive: true, force: true });
fs.mkdirSync(TARGET, { recursive: true });

const rows = [];
for (const dir of SOURCES) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!EXT.has(path.extname(file).toLowerCase())) continue;
    const out = slugName(file);
    fs.copyFileSync(path.join(dir, file), path.join(TARGET, out));
    rows.push({ source: path.relative(ROOT, path.join(dir, file)), publicPath: `/media/${out}` });
  }
}

fs.writeFileSync(path.join(ROOT, "scripts", "media", "media-index.json"), JSON.stringify(rows, null, 2));
console.log(`[import-media] ${rows.length} files copied to public/media/`);
for (const r of rows) console.log(r.publicPath.padEnd(90), r.source);

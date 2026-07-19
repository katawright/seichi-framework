// Rule A — anchor & relative-link integrity (inventory category A).
// Every internal markdown link and every bare *.md path in an HTML comment must
// resolve: the target file must exist, and any #fragment must match a real
// GitHub heading slug in that file.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { minimatch } from "minimatch";
import {
  stripCode,
  headingSlugs,
  extractLinks,
  extractCommentMdPaths,
  lineOf,
} from "./lib.mjs";

function splitAnchor(target) {
  const i = target.indexOf("#");
  if (i === -1) return [target, null];
  return [target.slice(0, i), target.slice(i + 1)];
}

export function runAnchors(repoRoot, files, allowlist = []) {
  const allowed = (p) => allowlist.some((pat) => minimatch(p, pat));
  const issues = [];
  const contentCache = new Map();
  const slugCache = new Map();

  const read = (abs) => {
    if (contentCache.has(abs)) return contentCache.get(abs);
    let c = null;
    try {
      c = readFileSync(abs, "utf8");
    } catch {
      c = null;
    }
    contentCache.set(abs, c);
    return c;
  };
  const slugsFor = (abs) => {
    if (slugCache.has(abs)) return slugCache.get(abs);
    const c = read(abs);
    const s = c == null ? null : headingSlugs(c);
    slugCache.set(abs, s);
    return s;
  };

  for (const file of files) {
    const abs = join(repoRoot, file);
    const raw = read(abs);
    if (raw == null) continue;
    const stripped = stripCode(raw);
    const ownSlugs = headingSlugs(raw);

    for (const { target, index } of extractLinks(stripped)) {
      if (/^(https?:|mailto:|tel:)/i.test(target)) continue;
      const [pathPart, anchor] = splitAnchor(target);
      const ln = lineOf(stripped, index);

      if (pathPart === "") {
        // same-file anchor
        if (anchor && !ownSlugs.has(anchor)) {
          issues.push(
            `ANCHOR  ${file}:${ln}  (${target}) → no heading '#${anchor}'`,
          );
        }
        continue;
      }
      // v1 scope: only cross-check .md document references (skip images/assets)
      if (!pathPart.endsWith(".md")) continue;
      // intentional illustrative example paths (don't exist in the repo by design)
      if (allowed(pathPart)) continue;

      const targetAbs = resolve(dirname(abs), pathPart);
      if (!existsSync(targetAbs)) {
        issues.push(`LINK  ${file}:${ln}  (${target}) → missing path`);
        continue;
      }
      if (anchor) {
        const s = slugsFor(targetAbs);
        if (s && !s.has(anchor)) {
          issues.push(
            `ANCHOR  ${file}:${ln}  (${target}) → no heading '#${anchor}' in ${pathPart}`,
          );
        }
      }
    }

    // Bare *.md paths in HTML comments — existence only (the R3 m6 dead-path class)
    for (const { path: p, index } of extractCommentMdPaths(raw)) {
      if (allowed(p)) continue;
      const targetAbs = resolve(dirname(abs), p);
      if (!existsSync(targetAbs)) {
        issues.push(
          `LINK  ${file}:${lineOf(raw, index)}  <!-- … ${p} --> → missing path`,
        );
      }
    }
  }
  return issues;
}

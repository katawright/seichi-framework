// Rule C — retired-vocabulary linter (inventory category C).
// Flags terms from retired-vocab.json used as LIVE guidance — i.e. outside
// `## Notes` change-history, migration callouts ("If you used v0.48…"), and
// code spans/fences. The single biggest source of Majors across the v0.49 runs.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { stripFences, stripCode } from "./lib.mjs";

const require = createRequire(import.meta.url);
const VOCAB = require("./retired-vocab.json").map((v) => ({
  re: new RegExp(v.regex, v.flags || "g"),
  replacement: v.replacement,
}));

// An ATX heading of level 1 or 2, captured as (hashes, title). A `## Notes`
// section runs until the next heading at this level — H3+ are subsections of it
// and do not end it.
// The trailing `\s*` (not `[ \t]*`) is load-bearing: the working tree checks out
// CRLF, so a heading line still carries `\r` after the split. Anchoring with
// `[ \t]*$` would leave the `\r` inside the captured title, and the exact-match
// test below would then never fire on any file in the repo.
const HEADING = /^(#{1,2})[ \t]+(.+?)[ \t]*#*\s*$/;

/** Line indices (0-based) excluded from live-guidance scanning. */
function excludedLines(fencedContent) {
  const lines = fencedContent.split("\n");
  const ex = new Set();
  let inNotes = false;
  let inMigration = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // The Notes exclusion is a SECTION, not a latch: it opens on an exact
    // `## Notes` heading and closes at the next H1/H2. The previous
    // `/^##[ \t]+Notes\b/` both never cleared and matched any heading merely
    // starting with the word (the \b is satisfied by the following space), so
    // `## Notes Section Format` in STYLE_GUIDE.md excluded everything after it
    // — 398 of 482 lines, including the Front Matter, Checklist, and
    // Record-Template authoring conventions.
    const h = HEADING.exec(line);
    if (h) inNotes = h[1] === "##" && h[2] === "Notes";
    if (inNotes) {
      ex.add(i);
      continue;
    }
    // migration callout: "If you used v0.48 …" through the next blank line
    if (/\bIf you used\b.*v0?\.?\d/i.test(line)) inMigration = true;
    if (inMigration) {
      ex.add(i);
      if ((lines[i + 1] ?? "").trim() === "") inMigration = false;
    }
  }
  return ex;
}

// A line describing a CHANGE (naming the retired term to explain its retirement)
// rather than giving live guidance — e.g. 'the old "autonomy tier"', 'replaces
// the v0.48 "AI Autonomy" dimension'. Such a mention is conformant per standing
// reconciliation caveat 3.
const TRANSITION =
  /\bv\d|\b(old|former|formerly|previous|previously|renamed|replaces?|replaced|retired|no longer|used to)\b/i;

/** Character ranges inside double quotes (straight or curly) on a line. */
function quotedRanges(line) {
  const ranges = [];
  const positions = [];
  const q = /["“”]/g;
  let m;
  while ((m = q.exec(line)) !== null) positions.push(m.index);
  for (let i = 0; i + 1 < positions.length; i += 2) {
    ranges.push([positions[i], positions[i + 1]]);
  }
  return ranges;
}

export function findRetired(content) {
  const ex = excludedLines(stripFences(content));
  const codeLines = stripCode(content).split("\n");
  const hits = [];
  for (let i = 0; i < codeLines.length; i++) {
    if (ex.has(i)) continue;
    const line = codeLines[i];
    if (TRANSITION.test(line)) continue; // change-explanation, not live guidance
    const quoted = quotedRanges(line);
    for (const v of VOCAB) {
      v.re.lastIndex = 0;
      let m;
      while ((m = v.re.exec(line)) !== null) {
        const inQuote = quoted.some(([a, b]) => m.index >= a && m.index <= b);
        if (!inQuote) {
          hits.push({ line: i + 1, term: m[0], replacement: v.replacement });
        }
        if (!v.re.global) break;
      }
    }
  }
  return hits;
}

export function runRetiredVocab(repoRoot, files) {
  const issues = [];
  for (const file of files) {
    let c;
    try {
      c = readFileSync(join(repoRoot, file), "utf8");
    } catch {
      continue;
    }
    for (const h of findRetired(c)) {
      issues.push(
        `VOCAB  ${file}:${h.line}  "${h.term}" as live guidance (retired → ${h.replacement})`,
      );
    }
  }
  return issues;
}

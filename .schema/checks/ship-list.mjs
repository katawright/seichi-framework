// Rule I-ship — shipped-layer enumeration vs FRAMEWORK_INCLUDES (category I).
// `FRAMEWORK_INCLUDES` in scripts/release/index.ts is the only machine-readable
// definition of what ships; every prose enumeration of the shipped surface is a
// restatement of it. A tagged ships-list whose layer tokens diverge from the
// array is drift (R13: CONTRIBUTING.md omitted `spec/`). Detection is *marked*,
// not guessed: tag the canonical sentence with `<!-- ships-list -->` and the
// check set-compares its backtick-quoted layer tokens against the array.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import fg from "fast-glob";
import { stripFences } from "./lib.mjs";

const INDEX_TS = "scripts/release/index.ts";
const SENTINEL = "<!-- ships-list -->";

// Parse the flat string-array literal:
//   const FRAMEWORK_INCLUDES = [ "guides", "spec", … ];
// Returns the token list, or null if the literal can't be found.
export function parseFrameworkIncludes(tsSource) {
  const m = tsSource.match(/FRAMEWORK_INCLUDES\s*=\s*\[([\s\S]*?)\]/);
  if (!m) return null;
  const tokens = [...m[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((x) => x[1]);
  return tokens.length ? tokens : null;
}

// The markdown list item (bullet) that contains line `idx`. Walks up to the
// bullet marker and down to the next blank line or sibling bullet, so a ships-list
// sentinel anywhere in the bullet scopes extraction to that bullet only (and not,
// e.g., the `scripts/` exclusion mentioned in a different bullet).
function enclosingBlock(lines, idx) {
  let start = idx;
  while (
    start > 0 &&
    lines[start].trim() !== "" &&
    !/^\s*[-*+]\s/.test(lines[start])
  ) {
    start--;
  }
  if (lines[start].trim() === "") start++;
  let end = idx;
  while (
    end + 1 < lines.length &&
    lines[end + 1].trim() !== "" &&
    !/^\s*[-*+]\s/.test(lines[end + 1])
  ) {
    end++;
  }
  return lines.slice(start, end + 1).join("\n");
}

// Layer tokens named in a tagged block: backtick-quoted single-segment path
// tokens — a top-level dir (`guides/`) or a top-level file (`INDEX.md`,
// `VERSION`), trailing slash normalized away. Multi-segment paths
// (`dist/framework-vX.Y.Z.zip`) and the generated `manifest.json` are excluded.
export function shipsListTokens(block) {
  const out = new Set();
  for (const m of block.matchAll(/`([^`]+)`/g)) {
    const tok = m[1].trim().replace(/\/$/, "");
    if (!tok || tok.includes("/")) continue; // multi-segment path → not a layer
    if (tok === "manifest.json") continue; // generated at build → allowed extra
    out.add(tok);
  }
  return out;
}

// `files`: [{ file, content }]. Returns { fatal, warn }. A layer set that differs
// from FRAMEWORK_INCLUDES is fatal; an unparseable array or a missing sentinel is
// an operational warning (a tooling refactor must not break the doc build).
export function shipListIssues(tsSource, files) {
  const fatal = [];
  const warn = [];
  const expected = parseFrameworkIncludes(tsSource);
  if (!expected) {
    warn.push(
      `SHIP  ${INDEX_TS}  FRAMEWORK_INCLUDES not parseable — skipping ship-list check`,
    );
    return { fatal, warn };
  }
  const expectedSet = new Set(expected.map((t) => t.replace(/\/$/, "")));

  let found = false;
  for (const { file, content } of files) {
    const lines = stripFences(content).split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].includes(SENTINEL)) continue;
      found = true;
      const got = shipsListTokens(enclosingBlock(lines, i));
      const missing = [...expectedSet].filter((t) => !got.has(t));
      const extra = [...got].filter((t) => !expectedSet.has(t));
      if (missing.length || extra.length) {
        const parts = [];
        if (missing.length) parts.push(`missing: ${missing.join(", ")}`);
        if (extra.length) parts.push(`extra: ${extra.join(", ")}`);
        fatal.push(
          `SHIP  ${file}:${i + 1}  ships-list {${[...got].sort().join(",")}} ≠ FRAMEWORK_INCLUDES — ${parts.join("; ")}`,
        );
      }
    }
  }
  if (!found) {
    warn.push(
      `SHIP  no ${SENTINEL} sentinel found — tag the canonical shipped-surface enumeration so it is guarded`,
    );
  }
  return { fatal, warn };
}

export function runShipList(repoRoot) {
  let tsSource;
  try {
    tsSource = readFileSync(join(repoRoot, INDEX_TS), "utf8");
  } catch {
    return {
      fatal: [],
      warn: [`SHIP  ${INDEX_TS}  not readable — skipping ship-list check`],
    };
  }
  // Scan the whole tree for the sentinel (independent of the pre-commit file list)
  // so the guard is deterministic regardless of which files a commit touches.
  const mdFiles = fg.sync("**/*.md", {
    cwd: repoRoot,
    ignore: ["node_modules/**"],
  });
  const docs = [];
  for (const f of mdFiles) {
    try {
      docs.push({ file: f, content: readFileSync(join(repoRoot, f), "utf8") });
    } catch {
      /* unreadable — skip */
    }
  }
  return shipListIssues(tsSource, docs);
}

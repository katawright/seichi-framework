// Rule O — INDEX table sort-order (inventory category G/I, structural).
// INDEX.md declares (### Sort Order): "Entries within each table are sorted
// alphabetically by file path." This asserts that invariant per table — the
// class behind the cold-review finding where a re-emitted row (e.g.
// `guides/bootstrap.md`) landed out of alphabetical position and the COUNT
// check, which validates counts but not ordering, could not see it.
//
// Comparator — matched to the on-disk INDEX, not invented:
//   * Compare by file path with the trailing `.md` stripped, so a base file
//     sorts before its hyphen-suffixed siblings (`brownfield.md` before
//     `brownfield-approach.md`). With the extension present, '.' (46) > '-' (45)
//     would invert that pair and the real, intended order would look "wrong."
//   * Compare case-insensitively (the only mixed-case basenames are README.md,
//     exempt below, and the lone QUICKSTART.md row).
//   * README.md rows are EXEMPT from the sequence. The on-disk INDEX places the
//     section README inconsistently — first in the Spec table, but in alphabetical
//     position (after `checklist.md`) in the per-stage tables — so checking its
//     order would force a false positive on one table or the other. Every other
//     entry is checked.
//   * Each markdown table is checked independently, so the per-stage subsection
//     tables under "## Stage Artifacts" are each validated while the pipeline
//     order across stages (Initiation → Closure, deliberately not alphabetical)
//     is never flagged.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { stripFences } from "./lib.mjs";

const SEPARATOR = /^\|[\s:|-]+\|?\s*$/;
const README = /(^|\/)readme\.md$/i;
const sortKey = (p) => p.replace(/\.md$/i, "").toLowerCase();

/**
 * Markdown tables in document order. Each table is a `header | separator | rows`
 * block; for every data row we capture the first-column file path (unwrapped
 * from its `\`backticks\``) and its 1-based line number.
 */
export function parseIndexTables(content) {
  const lines = stripFences(content).split("\n");
  const isPipe = (l) => l != null && l.trimStart().startsWith("|");
  const tables = [];
  let i = 0;
  while (i < lines.length) {
    if (
      isPipe(lines[i]) &&
      i + 1 < lines.length &&
      SEPARATOR.test(lines[i + 1].trim())
    ) {
      const rows = [];
      let j = i + 2;
      for (; j < lines.length && isPipe(lines[j]); j++) {
        if (SEPARATOR.test(lines[j].trim())) continue;
        const first = lines[j].trim().replace(/^\|/, "").split("|")[0].trim();
        const m = first.match(/`([^`]+)`/);
        rows.push({ line: j + 1, path: (m ? m[1] : first).trim() });
      }
      tables.push({ rows });
      i = j;
    } else {
      i++;
    }
  }
  return tables;
}

/** Pure: sort-order issues for an INDEX content string. */
export function indexOrderIssues(content, indexFile = "INDEX.md") {
  const issues = [];
  for (const table of parseIndexTables(content)) {
    const paths = table.rows.filter((r) => /\.md$/i.test(r.path));
    if (paths.length < 2) continue;
    const checked = paths.filter((r) => !README.test(r.path));
    for (let k = 1; k < checked.length; k++) {
      if (sortKey(checked[k].path) < sortKey(checked[k - 1].path)) {
        issues.push(
          `ORDER  ${indexFile}:${checked[k].line}  ${checked[k].path} out of file-path sort order (after ${checked[k - 1].path})`,
        );
      }
    }
  }
  return issues;
}

export function runIndexOrder(repoRoot, indexFile = "INDEX.md") {
  let content;
  try {
    content = readFileSync(join(repoRoot, indexFile), "utf8");
  } catch {
    return [];
  }
  return indexOrderIssues(content, indexFile);
}

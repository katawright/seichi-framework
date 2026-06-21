// Rule B — INDEX count self-consistency (inventory category B).
// For each `## <Name> (N)` section in INDEX.md: the declared N must equal the
// table-row count, the disk file count (where a glob is known), and any
// Notes-narrative count for that section.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import fg from "fast-glob";
import { stripFences } from "./lib.mjs";

const SECTION_GLOBS = {
  Guides: "guides/*.md",
  Spec: "spec/*.md",
  Templates: "templates/*.md",
  "Stage Artifacts": "stages/*/*.md",
};

const SEPARATOR = /^\|[\s:|-]+\|?\s*$/;

export function parseIndexSections(content) {
  const lines = stripFences(content).split("\n");
  const h2 = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^##[ \t]/.test(lines[i])) h2.push(i);
  }
  const sections = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##[ \t]+(.+?)\s*\((\d+)\)\s*$/);
    if (!m) continue;
    const start = i;
    const next = h2.find((x) => x > start);
    const body = lines.slice(start + 1, next === undefined ? lines.length : next);
    const pipe = body.filter((l) => l.trimStart().startsWith("|"));
    const seps = pipe.filter((l) => SEPARATOR.test(l.trim()));
    sections.push({
      name: m[1].trim(),
      declared: Number(m[2]),
      rows: pipe.length - 2 * seps.length, // each table: 1 header + 1 separator
    });
  }
  return sections;
}

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function runIndexCounts(repoRoot, indexFile = "INDEX.md") {
  const issues = [];
  let content;
  try {
    content = readFileSync(join(repoRoot, indexFile), "utf8");
  } catch {
    return issues;
  }
  const stripped = stripFences(content);
  const notesIdx = stripped.search(/^##[ \t]+Notes\b/m);
  const notes = notesIdx === -1 ? "" : stripped.slice(notesIdx);

  for (const s of parseIndexSections(content)) {
    if (s.rows !== s.declared) {
      issues.push(`COUNT  ${indexFile}  ${s.name}: heading(${s.declared}) ≠ table rows(${s.rows})`);
    }
    const glob = SECTION_GLOBS[s.name];
    if (glob) {
      const disk = fg.sync(glob, { cwd: repoRoot }).length;
      if (disk !== s.declared) {
        issues.push(
          `COUNT  ${indexFile}  ${s.name}: heading(${s.declared}) ≠ disk files(${disk}) [${glob}]`,
        );
      }
    }
    const nm = notes.match(new RegExp(`\\b${escapeReg(s.name)}\\s+(\\d+)\\b`));
    if (nm && Number(nm[1]) !== s.declared) {
      issues.push(
        `COUNT  ${indexFile}  ${s.name}: heading(${s.declared}) ≠ Notes narrative(${nm[1]})`,
      );
    }
  }
  return issues;
}

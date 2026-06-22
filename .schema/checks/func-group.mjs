// Rule H-funcgroup — standing-function grouping: operator table vs spec
// (inventory category H). spec/operating-model.md's Procedure marks
// {evidence capture, stop enforcement} ALWAYS required and {orchestration,
// run continuity} conditional. guides/operating-model.md's operator orientation
// table restates this in the "Operator configures?" cell: the two always-required
// standing rows carry a bare `No — standing`; the two conditional rows carry a
// qualifier `(parallel batches)` / `(delegated runs)`. A parenthetical on an
// always-required row (R15: stop enforcement tagged "(unattended runs)", framing
// an always function as conditional) — or a bare cell on a conditional row — is
// drift. This is floor-table.mjs's cell-diff applied to a second normative
// reproduction; the always/conditional split is read FROM the spec so the guard
// tracks the source of truth rather than hardcoding it.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { stripFences } from "./lib.mjs";

const SPEC_FILE = "spec/operating-model.md";
const GUIDE_FILE = "guides/operating-model.md";

// Canonical standing-function keys + how to recognize each in spec prose and in a
// table row label. Order matters: classify() returns the first match.
const FUNC_MATCHERS = [
  { key: "evidence", re: /evidence/i },
  { key: "stop", re: /stop enforcement|escalation/i },
  { key: "orchestration", re: /orchestration/i },
  { key: "continuity", re: /continuity|completion/i },
];

function classify(text) {
  for (const { key, re } of FUNC_MATCHERS) if (re.test(text)) return key;
  return null;
}

// The set of standing functions the spec Procedure marks ALWAYS required, read
// from the "… MUST always be treated as required" sentence. Returns null if the
// sentence isn't found (→ caller skips with a warning).
export function specAlwaysSet(specContent) {
  const stripped = stripFences(specContent);
  const m = stripped.match(/([^.]*?)\bMUST always be treated as required/i);
  if (!m) return null;
  const set = new Set();
  for (const { key, re } of FUNC_MATCHERS) if (re.test(m[1])) set.add(key);
  return set.size ? set : null;
}

// The operator orientation table's standing rows. The table is the unique one
// whose header names "Operator configures"; a standing row is one whose last cell
// mentions "standing". Returns [{ fn, key, cell, line }].
export function operatorStandingRows(guideContent) {
  const lines = stripFences(guideContent).split("\n");
  let inTable = false;
  const rows = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.startsWith("|")) {
      const cells = t
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      if (!inTable) {
        if (cells.join(" ").toLowerCase().includes("operator configures")) {
          inTable = true;
        }
        continue; // header row not compared
      }
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue; // separator
      const fn = cells[0];
      const cell = cells[cells.length - 1];
      if (/standing/i.test(cell)) {
        rows.push({ fn, key: classify(fn), cell, line: i + 1 });
      }
    } else if (inTable) {
      break; // table ended
    }
  }
  return rows;
}

export function funcGroupIssues(specContent, guideContent) {
  const fatal = [];
  const warn = [];
  const always = specAlwaysSet(specContent);
  if (!always) {
    warn.push(
      `FUNCGROUP  ${SPEC_FILE}  "always required" grouping sentence not found — skipping`,
    );
    return { fatal, warn };
  }
  const rows = operatorStandingRows(guideContent);
  if (!rows.length) {
    warn.push(
      `FUNCGROUP  ${GUIDE_FILE}  operator table not found — skipping`,
    );
    return { fatal, warn };
  }
  for (const { fn, key, cell, line } of rows) {
    if (!key) continue; // unrecognized standing row — leave to a human
    const paren = /\([^)]*\)/.test(cell);
    if (always.has(key) && paren) {
      fatal.push(
        `FUNCGROUP  ${GUIDE_FILE}:${line}  "${fn}" cell "${cell}" carries a conditional qualifier — spec marks it always-required (expect bare "No — standing")`,
      );
    } else if (!always.has(key) && !paren) {
      fatal.push(
        `FUNCGROUP  ${GUIDE_FILE}:${line}  "${fn}" cell "${cell}" is bare — spec marks it conditional (expect a qualifier, e.g. "(parallel batches)")`,
      );
    }
  }
  return { fatal, warn };
}

export function runFuncGroup(repoRoot) {
  let specContent, guideContent;
  try {
    specContent = readFileSync(join(repoRoot, SPEC_FILE), "utf8");
  } catch {
    return { fatal: [], warn: [`FUNCGROUP  ${SPEC_FILE}  not readable — skipping`] };
  }
  try {
    guideContent = readFileSync(join(repoRoot, GUIDE_FILE), "utf8");
  } catch {
    return { fatal: [], warn: [`FUNCGROUP  ${GUIDE_FILE}  not readable — skipping`] };
  }
  return funcGroupIssues(specContent, guideContent);
}

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

// Sentinel that marks WHICH list item states the always-required set. The guard
// reads the set from the item this marker opens, so the coupling is explicit in
// the spec source rather than being an invisible regex match against prose
// wording. Renaming or removing it is fatal (see funcGroupIssues) — the previous
// prose match degraded to warn-only, which meant innocuous rewording of the
// sentence silently disarmed the whole check while CI stayed green.
export const ANCHOR_RE = /<!--\s*anchor:\s*always-required-functions\s*-->/g;

// The set of standing functions the spec Procedure marks ALWAYS required, read
// from the anchored list item. Returns null if the anchor is absent, or an empty
// Set if it is present but names no recognized function — both fatal upstream.
export function specAlwaysSet(specContent) {
  const lines = stripFences(specContent).split("\n");
  const marked = lines.flatMap((l, i) => {
    ANCHOR_RE.lastIndex = 0;
    return ANCHOR_RE.test(l) ? [i] : [];
  });
  if (marked.length !== 1) return null; // absent, or ambiguous (duplicated)
  const start = marked[0];
  // The anchored span is the list item the marker opens: its own line plus any
  // continuation lines, ending at the next list item, a blank line, or EOF.
  const parts = [lines[start].replace(ANCHOR_RE, " ")];
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].trim() === "" || /^\s*[-*+]\s/.test(lines[i])) break;
    parts.push(lines[i]);
  }
  // Collapse whitespace before matching: the item is prose-wrapped, so a phrase
  // like "stop enforcement" routinely straddles a line break and would other-
  // wise fail a single-space pattern purely because of where prettier wrapped.
  const text = parts.join(" ").replace(/\s+/g, " ");
  const set = new Set();
  for (const { key, re } of FUNC_MATCHERS) if (re.test(text)) set.add(key);
  return set;
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
  // Both inputs missing is FATAL, not a warn-skip. A check that quietly stops
  // checking when it cannot find what it compares reports green on exactly the
  // drift it exists to catch; the invariant register lists FUNCGROUP as fatal.
  const always = specAlwaysSet(specContent);
  if (always === null) {
    fatal.push(
      `FUNCGROUP  ${SPEC_FILE}  the <!-- anchor: always-required-functions --> marker is missing or duplicated — the always-required standing-function set is read from the list item it opens, so the check cannot run without exactly one`,
    );
    return { fatal, warn };
  }
  if (!always.size) {
    fatal.push(
      `FUNCGROUP  ${SPEC_FILE}  the anchored list item names no recognized standing function — expected the always-required set (evidence capture, stop enforcement)`,
    );
    return { fatal, warn };
  }
  const rows = operatorStandingRows(guideContent);
  if (!rows.length) {
    fatal.push(
      `FUNCGROUP  ${GUIDE_FILE}  operator orientation table (header cell "Operator configures") has no standing rows — the guide-side half of the comparison is missing`,
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
    return {
      fatal: [`FUNCGROUP  ${SPEC_FILE}  not readable — cannot compare`],
      warn: [],
    };
  }
  try {
    guideContent = readFileSync(join(repoRoot, GUIDE_FILE), "utf8");
  } catch {
    return {
      fatal: [`FUNCGROUP  ${GUIDE_FILE}  not readable — cannot compare`],
      warn: [],
    };
  }
  return funcGroupIssues(specContent, guideContent);
}

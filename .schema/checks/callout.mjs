// Rule G-callout — stage parallel-callout uniformity (inventory category G).
// Three near-verbatim families recur once per stage:
//   1. "Required gates" callout (`> **Required gates:**`) — 8 stage READMEs
//   2. "How AI Helps" de-staging (`## How AI Helps` + the "How autonomously this
//      stage runs…" sentence routed to the Operating Model Guide) — 8 READMEs
//   3. "Oversight at this stage." paragraph — 7 stage reference.md (Closure has no
//      reference.md; its coverage is the README "How AI Helps", so do NOT flag the
//      absence)
//
// Presence/uniformity is FATAL — a dropped member (R6 m3: Closure once lacked
// "## How AI Helps") breaks the build. The two semantic axes are heuristic, so
// they WARN: (a) an execution verb whose subject is a human in the gates callout
// (R14: "humans … execute deployment steps", pinning Work Execution to a role —
// while "AI … executes within the pre-authorized path" conforms), and (b) an
// autonomy/oversight member that is not routed to operating-model.md.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import fg from "fast-glob";
import { stripCode, lineOf } from "./lib.mjs";

const OM_LINK = /operating-model\.md/;

// --- family-member extractors (pure: string in → { text, line } | null) ---

// The "Required gates" blockquote (its contiguous `>` lines).
export function requiredGatesCallout(content) {
  const lines = stripCode(content).split("\n");
  const start = lines.findIndex((l) => /^>\s*\*\*Required gates:\*\*/.test(l));
  if (start === -1) return null;
  let end = start;
  while (end + 1 < lines.length && /^>/.test(lines[end + 1])) end++;
  return { text: lines.slice(start, end + 1).join("\n"), line: start + 1 };
}

// The "## How AI Helps" section body (until the next H2).
export function howAiHelpsSection(content) {
  const lines = stripCode(content).split("\n");
  const start = lines.findIndex((l) => /^##\s+How AI Helps\s*$/.test(l));
  if (start === -1) return null;
  let end = start + 1;
  while (end < lines.length && !/^##\s/.test(lines[end])) end++;
  return { text: lines.slice(start, end).join("\n"), line: start + 1 };
}

// The "Oversight at this stage." paragraph (until a blank line).
export function oversightPara(content) {
  const stripped = stripCode(content);
  const idx = stripped.search(/\*\*Oversight at this stage\.\*\*/);
  if (idx === -1) return null;
  const para = stripped.slice(idx).split(/\n\s*\n/)[0];
  return { text: para, line: lineOf(stripped, idx) };
}

// Execution-pin: an execution verb whose NEAREST preceding subject is a human.
// "humans execute" → hit; "AI … executes" → no hit (subject is AI). Plus the
// literal "Human execution required" (R14's exact phrasing).
const EXEC_VERB = /\b(execut\w*|perform\w*|carr(?:y|ies|ied)\s+out)\b/gi;
const SUBJECT = /\b(ai|agent|agents|pipeline|humans?)\b/gi;

export function executionPinHits(text) {
  const hits = [];
  if (/human execution required/i.test(text)) hits.push("Human execution required");
  let m;
  EXEC_VERB.lastIndex = 0;
  while ((m = EXEC_VERB.exec(text)) !== null) {
    const before = text.slice(0, m.index);
    let subj = null;
    let s;
    SUBJECT.lastIndex = 0;
    while ((s = SUBJECT.exec(before)) !== null) subj = s[1].toLowerCase();
    if (subj && /^humans?$/.test(subj)) hits.push(`${subj} ${m[0]}`);
  }
  return hits;
}

export function runCallout(repoRoot) {
  const fatal = [];
  const warn = [];

  const readmes = fg.sync("stages/*/README.md", { cwd: repoRoot }).sort();
  for (const file of readmes) {
    let content;
    try {
      content = readFileSync(join(repoRoot, file), "utf8");
    } catch {
      continue;
    }
    const gates = requiredGatesCallout(content);
    const helps = howAiHelpsSection(content);

    if (!gates) {
      fatal.push(
        `CALLOUT  ${file}  missing "Required gates" callout (every stage README carries one)`,
      );
    }
    if (!helps) {
      fatal.push(
        `CALLOUT  ${file}  missing "## How AI Helps" section (every stage README carries one)`,
      );
    }

    if (gates) {
      for (const h of executionPinHits(gates.text)) {
        warn.push(
          `CALLOUT  ${file}:${gates.line}  "Required gates" pins work execution to a human ("${h}") — constrain decision/authority only`,
        );
      }
    }
    if (helps && /how autonomously this stage runs/i.test(helps.text) && !OM_LINK.test(helps.text)) {
      warn.push(
        `CALLOUT  ${file}:${helps.line}  "How AI Helps" asserts per-stage autonomy with no operating-model.md link (un-routed)`,
      );
    }
  }

  // Oversight family: the reference.md files that exist (Closure has none).
  const refs = fg.sync("stages/*/reference.md", { cwd: repoRoot }).sort();
  for (const file of refs) {
    let content;
    try {
      content = readFileSync(join(repoRoot, file), "utf8");
    } catch {
      continue;
    }
    const ov = oversightPara(content);
    if (!ov) {
      fatal.push(
        `CALLOUT  ${file}  missing "Oversight at this stage." paragraph (every stage reference.md carries one)`,
      );
    } else if (!OM_LINK.test(ov.text)) {
      warn.push(
        `CALLOUT  ${file}:${ov.line}  "Oversight at this stage." not routed to operating-model.md (un-routed)`,
      );
    }
  }

  return { fatal, warn };
}

// Guard CKPT — checkpoint-outcome vocabulary restatements.
// CP-001 closes the per-type outcome sets (spec/vocabulary/checkpoints.yaml,
// bodies in spec/checkpoints.md); canonical-state.md § Decision Records
// forbids a status axis on gate/checkpoint decision records. Artifacts
// restate the outcome sets as `**Decision:**` lines and checkbox blocks —
// the surface three v0.64 sweep-1 majors (invented Gate 1 vocabulary, a
// five-value status axis, a Review outcome collapsed into the lifecycle
// terminal) all landed on. Detection is *marked*, not guessed (the
// ship-list pattern): each restating line or block carries an inline
// `<!-- checkpoint-outcome: gate|review|alignment -->` sentinel and the
// check set-compares its values against the tagged set.
//
// Untagged restatements are errors in their own right, so a new one cannot
// land unguarded. Sweep 2 found the first trigger too narrow — it matched
// only a line-initial `**Decision:**`, and two majors shipped through the
// gap (M-10, an `_Example (Review, Ready with conditions):_` label; M-17, a
// `| **Gate Status** |` table cell). The trigger now covers four shapes:
//
//   1. a labeled restatement — `**Decision:**` / `**Outcome:**` /
//      `**… recommendation:**`, at line start, as a list item, or as a
//      table cell — carrying a `/`-separated value set;
//   2. an `_Example (Type, Outcome):_` label, whose parenthetical names a
//      checkpoint type and is therefore checked against that type's set
//      directly (no sentinel needed — the type is already declared);
//   3. a status axis on a gate or checkpoint decision, in any covered file
//      (`**Gate Status**`, `**Checkpoint status:**`, …), not merely a
//      line-initial `**Status:**` in the decision-record templates;
//   4. the pre-existing `## Decision:` heading form.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import fg from "fast-glob";
import yaml from "js-yaml";
import { stripFences } from "./lib.mjs";

const VOCAB_FILE = "spec/vocabulary/checkpoints.yaml";
const GLOBS = ["stages/*/checklist.md", "templates/*.md"];
const SENTINEL_RE = /<!--\s*checkpoint-outcome:\s*([a-z]+)\s*-->/;
const NO_STATUS_AXIS = [
  "templates/gate-decision.md",
  "templates/checkpoint-decision.md",
  "templates/brownfield-preparation-decision.md",
];
/** A label naming a checkpoint decision *and* a status axis — forbidden on
 *  any surface, not only the decision-record templates (M-17). `**Gate
 *  decision**` is deliberately not matched: a held/not-held tracker carries
 *  no outcome vocabulary and is the sanctioned form. */
const STATUS_AXIS_LABEL_RE = /\b(gate|checkpoint)\b.*\bstat(?:us|e)\b/;
/** Labels that restate an outcome set. `decision` alone is strict (one value
 *  is already a restatement); the wider endings need a two-or-more value list
 *  so a prose gloss — `**Recommendation:** (the next step this routes to)` —
 *  is not mistaken for one. */
const STRICT_LABEL_RE = /^decision$/;
const WIDE_LABEL_RE = /(?:^|\s)(?:decision|outcome|recommendation)$/;
/** `_Example (Review, Ready):_` — the parenthetical declares the checkpoint
 *  type, so the outcome beside it is checked against that type's set with no
 *  sentinel required. */
const EXAMPLE_RE = /Example\s*\(([^)]+)\)\s*:/;
/** Outcome-token shape after normalization: a short kebab identifier. Real
 *  outcomes (`stop`, `proceed-with-conditions`) match; a prose gloss does not,
 *  because it keeps its parentheses or runs past four segments. */
const VALUE_SHAPED_RE = /^[a-z0-9]+(?:-[a-z0-9]+){0,3}$/;
const TYPE_ALIAS_RE = /^(gate|review|alignment)\b/;

/** The three per-type outcome sets from checkpoints.yaml, keyed by type. */
export function outcomeSets(yamlSource) {
  const doc = yaml.load(yamlSource);
  const v = (doc && doc.vocabularies) || {};
  const sets = {};
  for (const [key, name] of [
    ["gate_outcome", "gate"],
    ["review_outcome", "review"],
    ["alignment_outcome", "alignment"],
  ]) {
    if (Array.isArray(v[key]?.values)) sets[name] = new Set(v[key].values);
  }
  return sets;
}

/** "Not Ready — [reason]" → "not-ready"; "[Ready]" → "ready". */
export function normalizeValue(raw) {
  return raw
    .split(" — ")[0]
    .replace(/[[\]*_]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

/**
 * Candidate outcome values on a labeled line: the text after the last `:**`
 * (bold label) or after a `## Decision:` heading label, split on ` / `.
 * Returns [] when the label carries no same-line values (block form — the
 * caller consumes the checkbox list that follows), or null when the line has
 * no recognizable label.
 */
export function lineValues(line) {
  const stripped = line.replace(SENTINEL_RE, "");
  const m =
    stripped.match(/:\*\*(.*)$/) || stripped.match(/^#{2,}\s+Decision:(.*)$/);
  if (!m) return null;
  const rest = m[1].trim();
  if (!rest) return [];
  return rest.split(" / ").map(normalizeValue).filter(Boolean);
}

/** The bold labels on a line, normalized: `**Decision (Review):**` →
 *  "decision", `| **Gate Status** |` → "gate status". */
export function boldLabels(line) {
  return [...line.matchAll(/\*\*([^*]+?)\*\*/g)].map((m) =>
    m[1]
      .replace(/\s*\([^)]*\)\s*/g, " ")
      .replace(/\s*:\s*$/, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " "),
  );
}

/**
 * Values enumerated in a table cell that carries no bold label —
 * `| Gate 1 | Proceed / Revise / Pivot |`. Only the status-axis cell form was
 * covered before, so this shape restated an outcome set unguarded.
 *
 * A cell is a restatement only when its values OVERLAP a known outcome set.
 * That discriminator is the point: a value list in a cell is as often a
 * tracker as an outcome, and the corpus has real ones —
 * `Open / Satisfied / Blocked / Withdrawn` on a conditions table — which must
 * stay silent. Shape alone would flag those.
 */
export function tableCellValues(line, sets) {
  if (!sets || !/^\s*\|/.test(line)) return null;
  for (const cell of line.split("|").slice(1, -1)) {
    if (!cell.includes(" / ")) continue;
    const values = cell.split(" / ").map(normalizeValue).filter(Boolean);
    if (values.length < 2) continue;
    if (!values.every((v) => VALUE_SHAPED_RE.test(v))) continue;
    if (Object.values(sets).some((s) => values.some((v) => s.has(v)))) {
      return values;
    }
  }
  return null;
}

/**
 * The outcome values an untagged line restates, or null when it restates
 * none. Covers the labeled forms (line-initial, list item, or nested), the
 * `## Decision:` heading, and an unlabeled value-enumerating table cell.
 */
export function untaggedRestatement(line, sets) {
  const values = lineValues(line);
  // null means "no recognizable label" — the table-cell shape lives here.
  // An empty array means "label present, values are in the block below".
  if (values === null) return tableCellValues(line, sets);
  if (!values.length) return null;
  if (/^#{2,}\s+Decision:/.test(line)) return values;
  const labels = boldLabels(line);
  if (labels.some((l) => STRICT_LABEL_RE.test(l))) return values;
  if (!labels.some((l) => WIDE_LABEL_RE.test(l))) return null;
  // A two-or-more list is unambiguously a restatement. A SINGLE value under a
  // wide label used to be waved through, which let an invented outcome pass
  // untagged (`**Outcome:** Pivot`). The `>= 2` was guarding against a prose
  // gloss being read as a value — so admit single values only when they are
  // outcome-SHAPED. `(the next step this routes to)` normalizes to a
  // paren-led, six-segment string and is still correctly ignored.
  if (values.length >= 2) return values;
  return values.every((v) => VALUE_SHAPED_RE.test(v)) ? values : null;
}

/**
 * `[type, value]` for an example label that declares a checkpoint type, or
 * null. `_Example (Deployment):_` and `_Example (Go):_` declare no type and
 * are skipped; `_Example (Gate 1, Proceed):_` reads as the gate set.
 */
export function exampleTypeOutcome(line) {
  const m = line.match(EXAMPLE_RE);
  if (!m) return null;
  const parts = m[1].split(",");
  if (parts.length < 2) return null;
  const type = parts[0].trim().toLowerCase().match(TYPE_ALIAS_RE);
  if (!type) return null;
  const value = normalizeValue(parts.slice(1).join(","));
  return value ? [type[1], value] : null;
}

/** Blank `<!-- … -->` spans, preserving offsets (sentinels are matched on the
 *  raw text before this is applied). */
function stripComments(content) {
  return content.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
}

/** First non-blank line index at or after `idx` — where blockValues actually
 *  starts reading. Section 2 records this so the untagged-block scan knows a
 *  sentinel already covers that block. */
function blockStart(lines, idx) {
  let i = idx;
  while (i < lines.length && lines[i].trim() === "") i++;
  return i;
}

/** Checkbox values of the block starting at or after line `idx`: each
 *  `- [ ] Value — …` item's text before its em-dash annotation. */
function blockValues(lines, idx) {
  const values = [];
  let i = idx;
  while (i < lines.length && lines[i].trim() === "") i++;
  for (; i < lines.length; i++) {
    // `[X]` as well as `[x]`: a capital tick is valid GFM and appears in the
    // corpus, and rejecting it did not merely skip that item — it fell through
    // to the `else break` below and TRUNCATED the block, so every value after
    // the capital checkbox went uncompared.
    const m = lines[i].match(/^\s*- \[[ xX]\] (.*)$/);
    if (m) {
      values.push(normalizeValue(m[1]));
    } else if (/^\s+\S/.test(lines[i])) {
      continue; // wrapped continuation of the previous item
    } else {
      break;
    }
  }
  return values;
}

/** All CKPT issues for one file. Pure — unit-testable. */
export function checkpointOutcomeIssues(file, content, sets) {
  const issues = [];
  // Split on either line ending: `core.autocrlf` leaves part of a Windows
  // working tree CRLF, and every value-extracting regex here is `$`-anchored,
  // so a stray `\r` would make the guard silently pass the whole file.
  const fenced = stripFences(content);
  const lines = fenced.split(/\r?\n/);

  // 1. No status axis on a gate/checkpoint decision. Bare `**Status:**` is an
  // error in the decision-record templates, where the whole artifact is the
  // decision; elsewhere the label has to name the decision it is putting a
  // status on (`**Gate Status**`) for the axis to be unambiguous.
  lines.forEach((line, i) => {
    const bare = NO_STATUS_AXIS.includes(file) && /^\*\*Status:\*\*/.test(line);
    if (bare || boldLabels(line).some((l) => STATUS_AXIS_LABEL_RE.test(l))) {
      issues.push(
        `CKPT  ${file}:${i + 1}  gate and checkpoint decisions carry no ` +
          `status axis (canonical-state.md § Decision Records) — record the ` +
          `outcome in its decision record, or track only whether the ` +
          `decision has been held`,
      );
    }
  });

  // 2. Every sentinel-tagged line/block set-compares against its named set.
  // The sentinel rides its target line inline, or sits alone adjacent to it:
  // on the line below when the line above carries the labeled values (the
  // wrap form — prettier moves an inline sentinel to a continuation line),
  // otherwise on the line above the target (the heading form — an inline
  // comment would disturb the heading's anchor slug).
  const tagged = new Set();
  lines.forEach((line, i) => {
    const tag = line.match(SENTINEL_RE);
    if (!tag) return;
    tagged.add(i);
    let target = i;
    if (line.replace(SENTINEL_RE, "").trim() === "") {
      let up = i - 1;
      while (up >= 0 && lines[up].trim() === "") up--;
      const above = up >= 0 ? lineValues(lines[up]) : null;
      if (above && above.length) {
        target = up;
      } else {
        target = i + 1;
        while (target < lines.length && lines[target].trim() === "") target++;
      }
      tagged.add(target);
    }
    const type = tag[1];
    const set = sets[type];
    if (!set) {
      issues.push(
        `CKPT  ${file}:${i + 1}  unknown checkpoint-outcome type "${type}" ` +
          `(expected: ${Object.keys(sets).join(" | ")})`,
      );
      return;
    }
    let values = lineValues(lines[target] ?? "");
    if (values === null) {
      // A sentinel may also sit directly above the checkbox block it tags —
      // the form the stage checklists use, where the block follows a
      // blockquote rather than a bold label.
      values = blockValues(lines, target);
      if (values.length) tagged.add(blockStart(lines, target));
      if (values.length === 0) {
        issues.push(
          `CKPT  ${file}:${i + 1}  sentinel on a line with no recognizable ` +
            `label (expected a **Label:** line, a ## Decision: heading, or a ` +
            `checkbox block)`,
        );
        return;
      }
    }
    if (values.length === 0) {
      values = blockValues(lines, target + 1);
      if (values.length) tagged.add(blockStart(lines, target + 1));
    }
    if (values.length === 0) {
      issues.push(
        `CKPT  ${file}:${i + 1}  sentinel with no values to check ` +
          `(no same-line list and no checkbox block follows)`,
      );
      return;
    }
    const offenders = values.filter((v) => !set.has(v));
    if (offenders.length) {
      issues.push(
        `CKPT  ${file}:${i + 1}  off-canon ${type} outcome value(s): ` +
          `${offenders.join(", ")} (closed set: ${[...set].join(" / ")})`,
      );
    }
    // Omission is drift too. A restatement reproduces a CLOSED set, so a gate
    // block offering only Proceed and Revise silently narrows what the deciding
    // party may choose — no less a defect than inventing a value. Testing
    // membership alone is `⊆`; the invariant register promises `↔`.
    const missing = [...set].filter((v) => !values.includes(v));
    if (missing.length) {
      issues.push(
        `CKPT  ${file}:${i + 1}  incomplete ${type} outcome set — missing: ` +
          `${missing.join(", ")} (closed set: ${[...set].join(" / ")})`,
      );
    }
  });

  // 3. An untagged value-carrying outcome line is an unguarded restatement.
  const netLines = stripComments(fenced).split(/\r?\n/);
  netLines.forEach((line, i) => {
    if (tagged.has(i)) return;
    if (untaggedRestatement(line, sets)) {
      issues.push(
        `CKPT  ${file}:${i + 1}  untagged checkpoint-outcome restatement — ` +
          `tag the line with <!-- checkpoint-outcome: gate|review|alignment ` +
          `--> so its values are checked, or rename the label if it is not ` +
          `a checkpoint outcome`,
      );
    }
  });

  // 4. An untagged outcome-shaped checkbox block is an unguarded restatement.
  // blockValues was reachable ONLY after a sentinel was found, so there was no
  // untagged-block detector at all — and the checkbox-pair form is the majority
  // form in the guarded corpus (6 of the 8 stage checklists), which made its
  // coverage opt-in via a deletable HTML comment.
  //
  // STYLE_GUIDE.md § Final Decision requires the sentinel on either
  // presentation, so an untagged outcome-shaped block is itself the violation.
  // Its intended type is deliberately NOT inferred — the sentinel is what
  // declares that, and guessing would re-create the ambiguity the sentinel
  // exists to remove.
  //
  // Outcome-shaped means the values overlap a known set. The same discriminator
  // as the table-cell branch, and for the same reason: the corpus has genuine
  // non-outcome `- [ ]` blocks (Deployment's and Closure's readiness/floor
  // items) that must stay silent.
  for (let i = 0; i < netLines.length; i++) {
    if (!/^\s*- \[[ xX]\] /.test(netLines[i])) continue;
    const start = i;
    const values = blockValues(netLines, start);
    while (
      i < netLines.length &&
      (/^\s*- \[[ xX]\] /.test(netLines[i]) || /^\s+\S/.test(netLines[i]))
    ) {
      i++;
    }
    i--; // the outer loop's i++ resumes at the first line past the block
    if (values.length < 2 || tagged.has(start)) continue;
    if (!Object.values(sets).some((s) => values.some((v) => s.has(v))))
      continue;
    issues.push(
      `CKPT  ${file}:${start + 1}  untagged checkpoint-outcome block — this ` +
        `checkbox block restates an outcome set; tag it with ` +
        `<!-- checkpoint-outcome: gate|review|alignment --> so its values are ` +
        `checked (STYLE_GUIDE.md § Final Decision)`,
    );
  }

  // 5. An example label that names a checkpoint type is checked against that
  // type's set directly — the type is declared, so no sentinel is needed.
  netLines.forEach((line, i) => {
    const pair = exampleTypeOutcome(line);
    if (!pair) return;
    const [type, value] = pair;
    const set = sets[type];
    if (set && !set.has(value)) {
      issues.push(
        `CKPT  ${file}:${i + 1}  off-canon ${type} outcome value in an ` +
          `example label: ${value} (closed set: ${[...set].join(" / ")})`,
      );
    }
  });

  return issues;
}

export function runCheckpointOutcomes(repoRoot) {
  let vocabSource;
  try {
    vocabSource = readFileSync(join(repoRoot, VOCAB_FILE), "utf8");
  } catch {
    return [`CKPT  ${VOCAB_FILE}  not readable`];
  }
  const sets = outcomeSets(vocabSource);
  if (!Object.keys(sets).length) {
    return [`CKPT  ${VOCAB_FILE}  no outcome sets parsed`];
  }
  const files = fg.sync(GLOBS, { cwd: repoRoot });
  const issues = [];
  for (const file of files.sort()) {
    const content = readFileSync(join(repoRoot, file), "utf8");
    issues.push(...checkpointOutcomeIssues(file, content, sets));
  }
  return issues;
}

// Guard CKPT — checkpoint-outcome vocabulary restatements.
// CP-001 closes the per-type outcome sets (spec/vocabulary/checkpoints.yaml,
// bodies in spec/checkpoints.md); canonical-state.md § Decision Records
// forbids a status axis on gate/checkpoint decision records. Artifacts
// restate the outcome sets as `**Decision:**` lines and checkbox blocks —
// the surface three v0.64 sweep majors (invented Gate 1 vocabulary, a
// five-value status axis, a Review outcome collapsed into the lifecycle
// terminal) all landed on. Detection is *marked*, not guessed (the
// ship-list pattern): each restating line or block carries an inline
// `<!-- checkpoint-outcome: gate|review|alignment -->` sentinel and the
// check set-compares its values against the tagged set. An untagged
// value-carrying Decision line in the covered globs is itself an error, so
// a new restatement cannot land unguarded; a `**Status:**` axis in the two
// decision-record templates is an error outright.

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
];

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

/** Blank `<!-- … -->` spans, preserving offsets (sentinels are matched on the
 *  raw text before this is applied). */
function stripComments(content) {
  return content.replace(/<!--[\s\S]*?-->/g, (m) =>
    m.replace(/[^\n]/g, " "),
  );
}

/** Checkbox values of the block after line `idx`: each `- [ ] Value — …`
 *  item's text before its em-dash annotation. */
function blockValues(lines, idx) {
  const values = [];
  let i = idx + 1;
  while (i < lines.length && lines[i].trim() === "") i++;
  for (; i < lines.length; i++) {
    const m = lines[i].match(/^\s*- \[[ x]\] (.*)$/);
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
  const fenced = stripFences(content);
  const lines = fenced.split("\n");

  // 1. No status axis on a gate/checkpoint decision record.
  if (NO_STATUS_AXIS.includes(file)) {
    lines.forEach((line, i) => {
      if (/^\*\*Status:\*\*/.test(line)) {
        issues.push(
          `CKPT  ${file}:${i + 1}  decision records carry no status axis ` +
            `(canonical-state.md § Decision Records) — record the outcome, ` +
            `delete the Status line`,
        );
      }
    });
  }

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
      const above = i > 0 ? lineValues(lines[i - 1]) : null;
      if (above && above.length) {
        target = i - 1;
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
      issues.push(
        `CKPT  ${file}:${i + 1}  sentinel on a line with no recognizable ` +
          `label (expected a **Label:** or ## Decision: line)`,
      );
      return;
    }
    if (values.length === 0) values = blockValues(lines, target);
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
  });

  // 3. An untagged value-carrying Decision line is an unguarded restatement.
  const netLines = stripComments(fenced).split("\n");
  netLines.forEach((line, i) => {
    if (tagged.has(i)) return;
    if (!/^(\*\*Decision:\*\*|#{2,}\s+Decision:)/.test(line)) return;
    const values = lineValues(line);
    if (values && values.length) {
      issues.push(
        `CKPT  ${file}:${i + 1}  untagged checkpoint-outcome restatement — ` +
          `tag the line with <!-- checkpoint-outcome: gate|review|alignment ` +
          `--> so its values are checked, or rename the label if it is not ` +
          `a checkpoint outcome`,
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

// Rule-marker + citation checks (Phase 3 Wave 0 — migration plan Decision
// P3-2; the C11 item deferred from Phase 2):
//
//   MARKER — span integrity across the whole corpus: every marker pair is
//     well-formed (flat, matched open/close), every marker ID resolves to a
//     registry row, and every marker sits in its rule's one normative home
//     (the registry `source`) — a marked span anywhere else is a stray.
//     Cross-file duplicate spans surface here (single-home made structural);
//     the in-home coupling (representation ⇔ exactly one pair, plus the
//     visible-ID-heading rider) is enforced by the KERNEL source checks.
//   CITE — C11 guide-citation resolution: every rule-ID-shaped token whose
//     prefix the registry uses (CS-030, DR-005a, …) resolves to a registered
//     ID, wherever it appears — prose, inline code, or fenced examples.
//     Unregistered prefixes (INC-001, AES-256) are out of scope by
//     construction, so template placeholders never false-positive.
//   LINKS — registry `links` targets exist and their #fragments match a real
//     GitHub heading slug (same resolution as the ANCHOR check).
//
// Like the KERNEL check, this scans the corpus itself (fast-glob minus the
// checkExclude patterns) rather than the staged-file list: single-home and
// citation resolution are global invariants, and a partial file list would
// silently under-check them.

import { readFileSync } from "node:fs";
import { join } from "node:path";

import fg from "fast-glob";
import yaml from "js-yaml";
import { minimatch } from "minimatch";

import {
  extractIdTokens,
  parseRuleSpans,
  registryPrefixes,
} from "../../scripts/release/kernel/markers.mjs";
import { headingSlugs, lineOf } from "./lib.mjs";

export function runRuleMarkers(repoRoot, excludePatterns = []) {
  const issues = [];

  let rules;
  try {
    rules = yaml.load(
      readFileSync(join(repoRoot, "spec/rules/index.yaml"), "utf8"),
    ).rules;
  } catch (err) {
    return [`MARKER  spec/rules/index.yaml unreadable: ${err.message}`];
  }
  const ruleById = new Map(rules.map((r) => [r.id, r]));
  const prefixes = registryPrefixes([...ruleById.keys()]);

  const files = fg
    .sync("**/*.md", { cwd: repoRoot, ignore: ["node_modules/**"] })
    .map((f) => f.replace(/\\/g, "/"))
    .filter((f) => !excludePatterns.some((p) => minimatch(f, p)))
    .sort();

  const spansById = new Map(); // id -> [{ file, openLine }]
  for (const file of files) {
    let raw;
    try {
      raw = readFileSync(join(repoRoot, file), "utf8").replace(/\r\n/g, "\n");
    } catch {
      continue;
    }

    const { spans, issues: spanIssues } = parseRuleSpans(raw);
    for (const issue of spanIssues) {
      issues.push(`MARKER  ${file}: ${issue}`);
    }
    for (const span of spans) {
      const rule = ruleById.get(span.id);
      if (!rule) {
        issues.push(
          `MARKER  ${file}:${span.openLine}  marker for ${span.id} has no registry row in spec/rules/index.yaml`,
        );
        continue;
      }
      if (!minimatch(file, rule.source)) {
        issues.push(
          `MARKER  ${file}:${span.openLine}  marker for ${span.id} is outside its normative home (${rule.source}) — one home per rule`,
        );
      }
      if (!spansById.has(span.id)) spansById.set(span.id, []);
      spansById.get(span.id).push({ file, openLine: span.openLine });
    }

    // C11 — every registered-prefix ID-shaped token resolves.
    for (const { token, index } of extractIdTokens(raw, prefixes)) {
      if (!ruleById.has(token)) {
        issues.push(
          `CITE  ${file}:${lineOf(raw, index)}  ${token} does not resolve to a registered rule ID`,
        );
      }
    }
  }

  // Cross-file duplicates (the same rule marked in more than one file).
  for (const [id, occurrences] of spansById) {
    const filesWithSpan = [...new Set(occurrences.map((o) => o.file))];
    if (filesWithSpan.length > 1) {
      issues.push(
        `MARKER  rule ${id} is marker-anchored in ${filesWithSpan.length} files (${filesWithSpan.join(", ")}) — single-home requires exactly one`,
      );
    }
  }

  // Registry `links` resolve: target exists, fragment matches a heading slug.
  for (const rule of rules) {
    for (const link of rule.links ?? []) {
      if (typeof link !== "string") continue; // shape errors are KERNEL's
      const [path, fragment] = link.split("#");
      let content;
      try {
        content = readFileSync(join(repoRoot, path), "utf8");
      } catch {
        issues.push(
          `LINKS  spec/rules/index.yaml  ${rule.id}: links target missing: ${path}`,
        );
        continue;
      }
      if (fragment && !headingSlugs(content).has(fragment)) {
        issues.push(
          `LINKS  spec/rules/index.yaml  ${rule.id}: (${link}) → no heading '#${fragment}' in ${path}`,
        );
      }
    }
  }

  return issues;
}

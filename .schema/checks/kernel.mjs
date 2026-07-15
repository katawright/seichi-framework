// Kernel checks (Phase 2 skeleton — ADR Decision 2.3's structural duplicate
// detection plus the generated-export freshness gate):
//
//   1. Duplicate rule-ID + broken-reference checks over the kernel sources
//      (spec/vocabulary/*.yaml, spec/rules/index.yaml): every rule ID unique
//      and well-formed, every owning_rule resolves, every rule source file
//      exists, machine/terminal/edge/reason-state references consistent.
//   2. Freshness: spec/generated/* regenerated in-memory from the sources
//      and byte-compared to the committed files — a stale export (source
//      changed, exports not regenerated) and a hand-edited export both fail.
//   3. The generated manifest validates against spec/schemas/manifest.schema.json.
//
// The generator itself is plain ESM (scripts/release/kernel/) precisely so
// this suite can import it directly — one generator, no duplicated logic.

import { readFileSync } from "node:fs";
import { join } from "node:path";

import Ajv2020 from "ajv/dist/2020.js";

import {
  checkKernelFreshness,
  generateKernel,
} from "../../scripts/release/kernel/generate.mjs";
import { loadKernelSources } from "../../scripts/release/kernel/sources.mjs";
import { validateKernelSources } from "../../scripts/release/kernel/generate.mjs";

export function runKernel(repoRoot) {
  // Source-level checks first: if the sources are inconsistent, report those
  // issues directly (generateKernel would throw the same list less readably).
  let sources;
  try {
    sources = loadKernelSources(repoRoot);
  } catch (err) {
    return [`KERNEL  sources unreadable: ${err.message}`];
  }
  const issues = validateKernelSources(repoRoot, sources);
  if (issues.length > 0) return issues;

  issues.push(...checkKernelFreshness(repoRoot));

  // Validate the committed manifest against the kernel manifest schema.
  try {
    const schema = JSON.parse(
      readFileSync(join(repoRoot, "spec", "schemas", "manifest.schema.json"), "utf8"),
    );
    const manifest = JSON.parse(
      readFileSync(join(repoRoot, "spec", "generated", "manifest.json"), "utf8"),
    );
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    if (!validate(manifest)) {
      for (const e of validate.errors ?? []) {
        issues.push(
          `KERNEL  spec/generated/manifest.json  ${e.instancePath || "/"} ${e.message}`,
        );
      }
    }
  } catch (err) {
    issues.push(`KERNEL  manifest schema validation failed to run: ${err.message}`);
  }

  // Guard against a silently-empty generation (regressions in source loading
  // would otherwise produce a small-but-fresh manifest).
  try {
    const files = generateKernel(repoRoot);
    const manifest = JSON.parse(files["spec/generated/manifest.json"]);
    if (Object.keys(manifest.rules).length < 80) {
      issues.push(
        `KERNEL  rule registry suspiciously small (${Object.keys(manifest.rules).length} rules)`,
      );
    }
  } catch {
    // Already reported through checkKernelFreshness.
  }

  return issues;
}

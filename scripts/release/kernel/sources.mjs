// Kernel source loading + the source-hash contract.
//
// Plain ESM (no TypeScript) by design: the .schema validation suite runs
// under plain Node and imports this module directly, so the freshness check
// regenerates the kernel exports in-memory and byte-compares them against
// the committed files — full stale and hand-edit detection with one
// generator, no duplicated logic.
//
// source_hash covers the canonical kernel sources ONLY — vocabulary/*.yaml
// and rules/index.yaml whole (every byte of those files is kernel source),
// plus the EXTRACTED stage front-matter values (the exact parsed objects the
// manifest embeds, canonically serialized) — and explicitly excludes the
// meta stamp fields. Stage front matter is a shared home carrying fields the
// kernel does not extract, so hashing the extracted values (not the raw
// blocks) keeps the signal true to its contract: source_hash moves iff
// kernel content changes, and stays identical across framework-only
// releases. Because the hashed objects are the same objects the manifest
// embeds, the hash and the manifest cannot drift. The whole manifest stays a
// pure function of its inputs (generated_at is source-derived from INDEX.md,
// never wall-clock).

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";
import yaml from "js-yaml";

export const VOCABULARY_FILES = [
  "spec/vocabulary/concurrency.yaml",
  "spec/vocabulary/config.yaml",
  "spec/vocabulary/grades.yaml",
  "spec/vocabulary/reasons.yaml",
  "spec/vocabulary/statuses.yaml",
];

export const RULES_FILE = "spec/rules/index.yaml";
export const STAGES_GUIDE_FILE = "guides/stages.md";

/** Read a repo file as UTF-8 with line endings normalized to LF. */
export function readLf(repoRoot, relPath) {
  return readFileSync(join(repoRoot, relPath), "utf8").replace(/\r\n/g, "\n");
}

export function sha256Hex(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

/** Canonical JSON: object keys sorted recursively, no whitespace. */
export function canonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(",")}]`;
  }
  if (value !== null && typeof value === "object") {
    const keys = Object.keys(value).sort();
    return `{${keys
      .map((k) => `${JSON.stringify(k)}:${canonicalJson(value[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

/** Extract the raw front-matter block (between the --- fences) of a file. */
export function frontMatterBlock(repoRoot, relPath) {
  const text = readLf(repoRoot, relPath);
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!m) {
    throw new Error(`No front matter found in ${relPath}`);
  }
  return m[1];
}

export function listStageReadmes(repoRoot) {
  const stagesRoot = join(repoRoot, "stages");
  return readdirSync(stagesRoot)
    .filter((name) => statSync(join(stagesRoot, name)).isDirectory())
    .sort()
    .map((name) => `stages/${name}/README.md`);
}

/**
 * Load every kernel source: parsed YAML vocabularies, the rule registry,
 * stage front matter (pipeline + per-stage), version/stamp inputs, and the
 * computed source hash.
 */
export function loadKernelSources(repoRoot) {
  const vocab = {};
  const hashedInputs = {};

  for (const relPath of VOCABULARY_FILES) {
    const raw = readLf(repoRoot, relPath);
    hashedInputs[relPath] = sha256Hex(raw);
    const name = relPath.replace(/^spec\/vocabulary\//, "").replace(/\.yaml$/, "");
    vocab[name] = yaml.load(raw);
  }

  const rulesRaw = readLf(repoRoot, RULES_FILE);
  hashedInputs[RULES_FILE] = sha256Hex(rulesRaw);
  const rulesDoc = yaml.load(rulesRaw);

  const stageReadmes = listStageReadmes(repoRoot);
  const pipelineBlock = frontMatterBlock(repoRoot, STAGES_GUIDE_FILE);
  const pipeline = yaml.load(pipelineBlock).pipeline;
  // Hash the extracted values, not the raw block: edits to front matter the
  // kernel does not extract must not move source_hash.
  hashedInputs[STAGES_GUIDE_FILE] = sha256Hex(canonicalJson(pipeline));

  const stageMetadata = {};
  for (const relPath of stageReadmes) {
    const block = frontMatterBlock(repoRoot, relPath);
    const fm = matter(`---\n${block}\n---\n`).data;
    stageMetadata[fm.id] = {
      working_location: fm.working_location ?? null,
      outputs: fm.outputs ?? [],
      checkpoints: fm.checkpoints ?? [],
      checklist: fm.checklist ?? null,
      reference: fm.reference ?? null,
    };
    // The extracted `id` is the manifest's stage_metadata map key — embedded
    // data, so it is part of the hash domain (verify-fixes re-check R1).
    hashedInputs[relPath] = sha256Hex(
      canonicalJson({ id: fm.id, metadata: stageMetadata[fm.id] }),
    );
  }

  const sourceHash = `sha256:${sha256Hex(canonicalJson(hashedInputs))}`;

  const frameworkVersion = readLf(repoRoot, "VERSION").trim();
  const indexText = readLf(repoRoot, "INDEX.md");
  const stampMatch = /\*\*Last Updated:\*\*\s+(\d{4}-\d{2}-\d{2})/.exec(indexText);
  if (!stampMatch) {
    throw new Error("Could not find `**Last Updated:** YYYY-MM-DD` in INDEX.md");
  }
  const generatedAt = `${stampMatch[1]}T00:00:00Z`;

  return {
    vocab,
    rules: rulesDoc.rules,
    pipeline,
    stageMetadata,
    sourceHash,
    frameworkVersion,
    generatedAt,
  };
}

/** Sort key for kernel rule IDs: (PREFIX asc, NNN asc, suffix asc). */
export function ruleIdSortKey(id) {
  const m = /^([A-Z]+)-(\d+)([a-z]?)$/.exec(id);
  if (!m) return [id, 0, ""];
  return [m[1], Number(m[2]), m[3]];
}

export function compareRuleIds(a, b) {
  const [pa, na, sa] = ruleIdSortKey(a);
  const [pb, nb, sb] = ruleIdSortKey(b);
  if (pa !== pb) return pa < pb ? -1 : 1;
  if (na !== nb) return na - nb;
  if (sa !== sb) return sa < sb ? -1 : 1;
  return 0;
}

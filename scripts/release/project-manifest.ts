import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";

import { deriveDisplayName } from "./derive-display-name";
import type {
  FrameworkManifest,
  ManifestArtifact,
  ManifestCheckpoint,
  ManifestStage,
} from "./manifest-schema";
import { parseStageFrontmatter } from "./parse-frontmatter";

// Stage order and execution pattern come from the one normative home for
// both: the `guides/stages.md` pipeline front matter (schema-validated by
// .schema/schemas/stages-guide.schema.json). The projector consumes it and
// carries no parallel copy — the pre-kernel hard-coded STAGE_PATTERN /
// STAGE_DISPLAY_ORDER constants are retired. The projector throws on a stage
// id absent from the pipeline so a mismatch fails loudly.
const FRONTMATTER_TO_MANIFEST_PATTERN: Record<string, ManifestStage["pattern"]> = {
  foundational: "Foundational",
  iterative: "Iterative",
  terminal: "Terminal",
};

interface PipelineStage {
  id: string;
  stage_number: number;
  execution_pattern: string;
}

function readPipeline(frameworkDir: string): Map<string, PipelineStage> {
  const guidePath = join(frameworkDir, "guides", "stages.md");
  const text = readFileSync(guidePath, "utf8");
  const pipeline = (matter(text).data as { pipeline?: PipelineStage[] }).pipeline;
  if (!Array.isArray(pipeline) || pipeline.length === 0) {
    throw new Error(`No \`pipeline\` front matter found in ${guidePath}`);
  }
  return new Map(pipeline.map((stage) => [stage.id, stage]));
}

// Frontmatter checkpoint `type:` values map to the manifest checkpoint
// `type` enum. The frontmatter uses `gate` for investment gates; the
// manifest spells it `investment_gate` to match the schema's enum.
const FRONTMATTER_TO_MANIFEST_CHECKPOINT_TYPE: Record<
  string,
  ManifestCheckpoint["type"]
> = {
  gate: "investment_gate",
  review: "review",
  alignment: "alignment",
};

// Allowed `condition:` values on a frontmatter checkpoint. A condition names
// a project-level fact gating whether the checkpoint applies; an absent
// `condition` means the checkpoint always applies.
const CHECKPOINT_CONDITIONS = new Set(["compliance"]);

const WORKING_LOCATION_VALUES = new Set(["artifacts", "source-code"]);

function readVersion(frameworkDir: string): string {
  const versionPath = join(frameworkDir, "VERSION");
  return readFileSync(versionPath, "utf8").trim();
}

function readGeneratedAt(frameworkDir: string): string {
  const indexPath = join(frameworkDir, "INDEX.md");
  const text = readFileSync(indexPath, "utf8");
  const match = /\*\*Last Updated:\*\*\s+(\d{4}-\d{2}-\d{2})/.exec(text);
  if (!match) {
    throw new Error(
      `Could not find \`**Last Updated:** YYYY-MM-DD\` header in ${indexPath}`,
    );
  }
  return `${match[1]}T00:00:00Z`;
}

function listStageDirs(frameworkDir: string): string[] {
  const stagesRoot = join(frameworkDir, "stages");
  return readdirSync(stagesRoot)
    .filter((name) => statSync(join(stagesRoot, name)).isDirectory())
    .sort();
}

function projectArtifact(
  raw: { artifact: string; template?: string; embedded_in?: string },
  index: number,
): ManifestArtifact {
  return {
    name: raw.artifact,
    display_name: deriveDisplayName(raw.artifact),
    display_order: index + 1,
    template_path: raw.template ?? null,
    embedded_in: raw.embedded_in ?? null,
    required: true,
  };
}

function projectCheckpoint(
  raw: { type?: string; name?: string; condition?: string },
  index: number,
  stageId: string,
): ManifestCheckpoint {
  const type =
    raw.type === undefined
      ? undefined
      : FRONTMATTER_TO_MANIFEST_CHECKPOINT_TYPE[raw.type];
  if (type === undefined) {
    throw new Error(
      `Stage ${stageId}: invalid or missing \`checkpoints[${index}].type\`: ${String(raw.type)}`,
    );
  }
  if (typeof raw.name !== "string" || raw.name.length === 0) {
    throw new Error(
      `Stage ${stageId}: \`checkpoints[${index}].name\` is empty or missing.`,
    );
  }
  if (raw.condition !== undefined && !CHECKPOINT_CONDITIONS.has(raw.condition)) {
    throw new Error(
      `Stage ${stageId}: invalid \`checkpoints[${index}].condition\`: ${raw.condition}`,
    );
  }
  return {
    name: raw.name,
    type,
    is_hard_gate: type === "investment_gate",
    condition: (raw.condition as ManifestCheckpoint["condition"]) ?? null,
  };
}

function pickEnum<T extends string>(
  value: string | undefined,
  allowed: ReadonlySet<string>,
  field: string,
  stageId: string,
): T {
  if (value === undefined || !allowed.has(value)) {
    throw new Error(
      `Stage ${stageId}: invalid or missing \`${field}\` value: ${String(value)}`,
    );
  }
  return value as T;
}

function projectStage(
  frameworkDir: string,
  stageDirName: string,
  pipeline: Map<string, PipelineStage>,
): ManifestStage {
  const readmePath = join(frameworkDir, "stages", stageDirName, "README.md");
  const fm = parseStageFrontmatter(readmePath);

  const pipelineStage = pipeline.get(fm.id);
  if (!pipelineStage) {
    throw new Error(
      `Stage ${fm.id}: not in the guides/stages.md pipeline front matter.`,
    );
  }
  const pattern = FRONTMATTER_TO_MANIFEST_PATTERN[pipelineStage.execution_pattern];
  if (!pattern) {
    throw new Error(
      `Stage ${fm.id}: invalid pipeline \`execution_pattern\`: ${String(pipelineStage.execution_pattern)}`,
    );
  }
  const displayOrder = pipelineStage.stage_number;
  if (!Number.isInteger(displayOrder) || displayOrder < 1) {
    throw new Error(
      `Stage ${fm.id}: invalid pipeline \`stage_number\`: ${String(pipelineStage.stage_number)}`,
    );
  }

  // Manifest carries the full within-stage checkpoint sequence as an
  // ordered array, in the same order as the stage README `checkpoints[]`
  // frontmatter. `is_hard_gate` is derived per checkpoint; `condition`
  // (when present) names a project-level condition gating whether the
  // checkpoint applies.
  const rawCheckpoints = fm.checkpoints ?? [];
  if (rawCheckpoints.length === 0) {
    throw new Error(`Stage ${fm.id}: \`checkpoints\` is empty or missing.`);
  }
  const checkpoints = rawCheckpoints.map((raw, i) =>
    projectCheckpoint(raw, i, fm.id),
  );

  const outputs = fm.outputs ?? [];
  if (outputs.length === 0) {
    throw new Error(`Stage ${fm.id}: \`outputs\` is empty or missing.`);
  }
  const artifacts = outputs.map((raw, i) => projectArtifact(raw, i));

  // embedded_in must reference a sibling artifact's name within this stage.
  const artifactNames = new Set(artifacts.map((a) => a.name));
  for (const artifact of artifacts) {
    if (artifact.embedded_in !== null && !artifactNames.has(artifact.embedded_in)) {
      throw new Error(
        `Stage ${fm.id}: artifact \`${artifact.name}\` embedded_in references unknown artifact \`${artifact.embedded_in}\`.`,
      );
    }
  }

  return {
    name: fm.id,
    display_name: deriveDisplayName(fm.id),
    display_order: displayOrder,
    default_sequence: displayOrder,
    pattern,
    working_location: pickEnum<ManifestStage["working_location"]>(
      fm.working_location,
      WORKING_LOCATION_VALUES,
      "working_location",
      fm.id,
    ),
    checkpoints,
    artifacts,
  };
}

/**
 * Walk a framework directory and project its content into a
 * `FrameworkManifest`.
 *
 * The manifest is the single input to the seed function (see
 * `manifest-schema.ts`). The result is sorted deterministically (stages
 * by `display_order`, artifacts by their frontmatter `outputs` index) so
 * two runs against the same source produce equal values.
 */
export function buildManifest(frameworkDir: string): FrameworkManifest {
  const pipeline = readPipeline(frameworkDir);
  const stages = listStageDirs(frameworkDir)
    .map((name) => projectStage(frameworkDir, name, pipeline))
    .sort((a, b) => a.display_order - b.display_order);

  return {
    framework_version: readVersion(frameworkDir),
    generated_at: readGeneratedAt(frameworkDir),
    stages,
  };
}

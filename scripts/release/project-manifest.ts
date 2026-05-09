import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { deriveDisplayName } from "./derive-display-name";
import type {
  FrameworkManifest,
  ManifestArtifact,
  ManifestStage,
} from "./manifest-schema";
import { parseStageFrontmatter } from "./parse-frontmatter";

// Stage-pattern map for v0.44.x. The framework's stage patterns are not
// carried in the stage README frontmatter today — adding a `pattern:` field
// is a future framework cut concern (Increment Design brief §7 Q3). For
// now, the mapping is fixed; the projector throws if it encounters a stage
// id outside this map so a future mismatch fails loudly.
const STAGE_PATTERN: Record<string, ManifestStage["pattern"]> = {
  initiation: "Foundational",
  requirements: "Foundational",
  "system-design": "Foundational",
  "increment-design": "Iterative",
  implementation: "Iterative",
  verification: "Iterative",
  deployment: "Continuous",
  support: "Continuous",
};

const STAGE_DISPLAY_ORDER: Record<string, number> = {
  initiation: 1,
  requirements: 2,
  "system-design": 3,
  "increment-design": 4,
  implementation: 5,
  verification: 6,
  deployment: 7,
  support: 8,
};

// Frontmatter checkpoint `type:` values map to manifest schema's
// `checkpoint_type` enum. The frontmatter uses `gate` for investment gates;
// the manifest spells it `investment_gate` to match the schema's enum
// (System Design §4.2, locked at Gate 2).
const FRONTMATTER_TO_MANIFEST_CHECKPOINT_TYPE: Record<string, ManifestStage["checkpoint_type"]> = {
  gate: "investment_gate",
  review: "review",
  alignment: "alignment",
};

const AUTONOMY_VALUES = new Set(["human-led", "collaborative", "ai-led"]);

const OVERSIGHT_VALUES = new Set(["active", "passive", "minimal"]);

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

function projectStage(frameworkDir: string, stageDirName: string): ManifestStage {
  const readmePath = join(frameworkDir, "stages", stageDirName, "README.md");
  const fm = parseStageFrontmatter(readmePath);

  const pattern = STAGE_PATTERN[fm.id];
  if (!pattern) {
    throw new Error(
      `Stage ${fm.id}: not in v0.44.x stage-pattern map. Add an explicit \`pattern:\` frontmatter field, or extend the projector map.`,
    );
  }
  const displayOrder = STAGE_DISPLAY_ORDER[fm.id];
  if (!displayOrder) {
    throw new Error(
      `Stage ${fm.id}: not in v0.44.x stage display-order map. Extend the projector map.`,
    );
  }

  // Manifest carries a single primary checkpoint per stage, which is the
  // first `checkpoints[]` entry in the frontmatter. `is_hard_gate` is true
  // if *any* checkpoint in the list is a `gate` (handles System Design's
  // alignment + gate pair, where the manifest's checkpoint_name reflects
  // the alignment review but the stage still has an investment gate).
  const checkpoints = fm.checkpoints ?? [];
  const primary = checkpoints[0];
  let checkpointType: ManifestStage["checkpoint_type"] = null;
  if (primary?.type !== undefined) {
    const mapped = FRONTMATTER_TO_MANIFEST_CHECKPOINT_TYPE[primary.type];
    if (!mapped) {
      throw new Error(
        `Stage ${fm.id}: invalid \`checkpoints[0].type\` value: ${primary.type}`,
      );
    }
    checkpointType = mapped;
  }
  const checkpointName = primary?.name ?? null;
  const hasInvestmentGate = checkpoints.some((c) => c.type === "gate");

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
    checkpoint_name: checkpointName,
    checkpoint_type: checkpointType,
    is_hard_gate: hasInvestmentGate,
    default_autonomy: pickEnum<ManifestStage["default_autonomy"]>(
      fm.default_autonomy,
      AUTONOMY_VALUES,
      "default_autonomy",
      fm.id,
    ),
    default_oversight_intensity: pickEnum<ManifestStage["default_oversight_intensity"]>(
      fm.default_oversight_intensity,
      OVERSIGHT_VALUES,
      "default_oversight_intensity",
      fm.id,
    ),
    working_location: pickEnum<ManifestStage["working_location"]>(
      fm.working_location,
      WORKING_LOCATION_VALUES,
      "working_location",
      fm.id,
    ),
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
  const stages = listStageDirs(frameworkDir)
    .map((name) => projectStage(frameworkDir, name))
    .sort((a, b) => a.display_order - b.display_order);

  return {
    framework_version: readVersion(frameworkDir),
    generated_at: readGeneratedAt(frameworkDir),
    stages,
  };
}

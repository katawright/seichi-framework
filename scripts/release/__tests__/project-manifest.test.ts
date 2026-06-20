import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { manifestSchema } from "../manifest-schema";
import { buildManifest } from "../project-manifest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..", "..");

describe("buildManifest against the framework source at repo root", () => {
  const manifest = buildManifest(REPO_ROOT);

  it("produces a manifest that passes the locked schema", () => {
    const result = manifestSchema.safeParse(manifest);
    expect(result.success).toBe(true);
  });

  it("projects exactly 8 stages", () => {
    expect(manifest.stages).toHaveLength(8);
  });

  it("projects one artifact per frontmatter `outputs` entry, per stage", () => {
    // Cross-check against an independent count of `- artifact:` entries in
    // each stage README's frontmatter, so the expectation tracks the source
    // instead of pinning a total that rots when stage outputs change.
    for (const stage of manifest.stages) {
      const readme = readFileSync(
        join(REPO_ROOT, "stages", stage.name, "README.md"),
        "utf8",
      );
      const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(readme)?.[1] ?? "";
      const declared = frontmatter.match(/^\s*-\s+artifact:/gm)?.length ?? 0;
      expect(declared).toBeGreaterThan(0);
      expect(stage.artifacts).toHaveLength(declared);
    }
  });

  it("orders stages by display_order (Initiation first, Closure last)", () => {
    expect(manifest.stages[0].name).toBe("initiation");
    expect(manifest.stages[manifest.stages.length - 1].name).toBe("closure");
  });

  it("derives display_name for stages and artifacts", () => {
    const requirements = manifest.stages.find((s) => s.name === "requirements");
    expect(requirements?.display_name).toBe("Requirements");
    const successCriteria = requirements?.artifacts.find(
      (a) => a.name === "success-criteria-register",
    );
    expect(successCriteria?.display_name).toBe("Success Criteria Register");
  });

  it("projects Initiation's single checkpoint as an investment gate", () => {
    const initiation = manifest.stages.find((s) => s.name === "initiation");
    expect(initiation?.checkpoints).toEqual([
      {
        name: "Gate 1 (Investment Decision)",
        type: "investment_gate",
        is_hard_gate: true,
        condition: null,
      },
    ]);
  });

  it("projects System Design's two checkpoints in sequence (Architecture Review then Gate 2)", () => {
    const systemDesign = manifest.stages.find((s) => s.name === "system-design");
    expect(systemDesign?.checkpoints).toEqual([
      {
        name: "Architecture Review",
        type: "alignment",
        is_hard_gate: false,
        condition: null,
      },
      {
        name: "Gate 2 (Investment Decision)",
        type: "investment_gate",
        is_hard_gate: true,
        condition: null,
      },
    ]);
  });

  it("projects Requirements' single checkpoint as a non-gate review", () => {
    const requirements = manifest.stages.find((s) => s.name === "requirements");
    expect(requirements?.checkpoints).toHaveLength(1);
    expect(requirements?.checkpoints[0].type).toBe("review");
    expect(requirements?.checkpoints[0].is_hard_gate).toBe(false);
  });

  it("projects Deployment as Iterative with a conditional Compliance checkpoint", () => {
    const deployment = manifest.stages.find((s) => s.name === "deployment");
    expect(deployment?.pattern).toBe("Iterative");
    expect(deployment?.checkpoints).toEqual([
      {
        name: "Production Deployment Approval",
        type: "review",
        is_hard_gate: false,
        condition: null,
      },
      {
        name: "Compliance Approval",
        type: "review",
        is_hard_gate: false,
        condition: "compliance",
      },
    ]);
  });

  it("emits same-name artifacts in two stages as independent rows", () => {
    const initiation = manifest.stages.find((s) => s.name === "initiation");
    const requirements = manifest.stages.find((s) => s.name === "requirements");
    const inInitiation = initiation?.artifacts.find(
      (a) => a.name === "success-criteria-register",
    );
    const inRequirements = requirements?.artifacts.find(
      (a) => a.name === "success-criteria-register",
    );
    expect(inInitiation).toBeDefined();
    expect(inRequirements).toBeDefined();
  });

  it("reads generated_at from the INDEX.md `Last Updated:` header", () => {
    const index = readFileSync(join(REPO_ROOT, "INDEX.md"), "utf8");
    const date = /\*\*Last Updated:\*\*\s+(\d{4}-\d{2}-\d{2})/.exec(index)?.[1];
    expect(date).toBeDefined();
    expect(manifest.generated_at).toBe(`${date}T00:00:00Z`);
  });

  it("reads framework_version from the VERSION file", () => {
    const version = readFileSync(join(REPO_ROOT, "VERSION"), "utf8").trim();
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(manifest.framework_version).toBe(version);
  });

  it("is deterministic (two runs return deeply-equal values)", () => {
    const second = buildManifest(REPO_ROOT);
    expect(second).toEqual(manifest);
  });
});

describe("buildManifest error paths", () => {
  function makeFixture(stageReadme: string): string {
    const root = mkdtempSync(join(tmpdir(), "release-test-"));
    writeFileSync(join(root, "VERSION"), "9.9.9\n");
    writeFileSync(
      join(root, "INDEX.md"),
      "# Test\n\n**Last Updated:** 2026-05-04 | **Framework Version:** 9.9.9\n",
    );
    const stagesDir = join(root, "stages", "initiation");
    mkdirSync(stagesDir, { recursive: true });
    writeFileSync(join(stagesDir, "README.md"), stageReadme);
    return root;
  }

  it("throws when embedded_in references a non-sibling artifact", () => {
    const root = makeFixture(
      `---
id: initiation
default_autonomy: collaborative
default_oversight_intensity: active
working_location: artifacts
checkpoints:
  - type: review
    name: "Test Checkpoint"
outputs:
  - artifact: alpha
    embedded_in: ghost
---
body
`,
    );
    expect(() => buildManifest(root)).toThrow(/embedded_in references unknown artifact/);
  });

  it("throws when stage frontmatter is missing the id field", () => {
    const root = makeFixture(`---
default_autonomy: collaborative
default_oversight_intensity: active
working_location: artifacts
outputs:
  - artifact: alpha
---
body
`);
    expect(() => buildManifest(root)).toThrow(/missing required `id`/);
  });

  it("throws when an enum value is invalid", () => {
    const root = makeFixture(`---
id: initiation
default_autonomy: super-led
default_oversight_intensity: active
working_location: artifacts
checkpoints:
  - type: review
    name: "Test Checkpoint"
outputs:
  - artifact: alpha
---
body
`);
    expect(() => buildManifest(root)).toThrow(/invalid or missing `default_autonomy`/);
  });

  it("throws when a stage has no checkpoints", () => {
    const root = makeFixture(`---
id: initiation
default_autonomy: collaborative
default_oversight_intensity: active
working_location: artifacts
outputs:
  - artifact: alpha
---
body
`);
    expect(() => buildManifest(root)).toThrow(/`checkpoints` is empty or missing/);
  });
});

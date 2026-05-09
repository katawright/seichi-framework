import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
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

  it("projects 54 artifacts in total across all 8 stages", () => {
    // initiation 3, requirements 6, system-design 9, increment-design 5,
    // implementation 7, verification 8, deployment 11, support 5.
    const total = manifest.stages.reduce((sum, s) => sum + s.artifacts.length, 0);
    expect(total).toBe(54);
  });

  it("orders stages by display_order (Initiation first, Support last)", () => {
    expect(manifest.stages[0].name).toBe("initiation");
    expect(manifest.stages[manifest.stages.length - 1].name).toBe("support");
  });

  it("derives display_name for stages and artifacts", () => {
    const requirements = manifest.stages.find((s) => s.name === "requirements");
    expect(requirements?.display_name).toBe("Requirements");
    const successCriteria = requirements?.artifacts.find(
      (a) => a.name === "success-criteria-register",
    );
    expect(successCriteria?.display_name).toBe("Success Criteria Register");
  });

  it("flags Initiation as a hard gate (Gate 1 = investment_gate)", () => {
    const initiation = manifest.stages.find((s) => s.name === "initiation");
    expect(initiation?.is_hard_gate).toBe(true);
    expect(initiation?.checkpoint_type).toBe("investment_gate");
  });

  it("flags System Design as a hard gate (alignment + gate pair)", () => {
    const systemDesign = manifest.stages.find((s) => s.name === "system-design");
    expect(systemDesign?.is_hard_gate).toBe(true);
    expect(systemDesign?.checkpoint_type).toBe("alignment");
    expect(systemDesign?.checkpoint_name).toBe("Architecture Review");
  });

  it("does not flag Requirements as a hard gate (review checkpoint)", () => {
    const requirements = manifest.stages.find((s) => s.name === "requirements");
    expect(requirements?.is_hard_gate).toBe(false);
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
    expect(manifest.generated_at).toBe("2026-05-04T00:00:00Z");
  });

  it("reads framework_version from the VERSION file", () => {
    expect(manifest.framework_version).toBe("0.44.1");
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
outputs:
  - artifact: alpha
---
body
`);
    expect(() => buildManifest(root)).toThrow(/invalid or missing `default_autonomy`/);
  });
});

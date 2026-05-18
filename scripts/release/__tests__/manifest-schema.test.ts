import { describe, expect, it } from "vitest";

import {
  manifestArtifactSchema,
  manifestCheckpointSchema,
  manifestSchema,
  manifestStageSchema,
} from "../manifest-schema";

const validArtifact = {
  name: "requirements-brief",
  display_name: "Requirements Brief",
  display_order: 1,
  template_path: "templates/requirements-brief.md",
  embedded_in: null,
  required: true,
};

const validCheckpoint = {
  name: "Requirements Readiness",
  type: "review",
  is_hard_gate: false,
  condition: null,
};

const validStage = {
  name: "requirements",
  display_name: "Requirements",
  display_order: 2,
  default_sequence: 2,
  pattern: "Foundational",
  default_autonomy: "collaborative",
  default_oversight_intensity: "active",
  working_location: "artifacts",
  checkpoints: [validCheckpoint],
  artifacts: [validArtifact],
};

const validManifest = {
  framework_version: "0.44.1",
  generated_at: "2026-05-04T00:00:00Z",
  stages: [validStage],
};

describe("manifestSchema", () => {
  it("accepts a valid manifest", () => {
    expect(manifestSchema.safeParse(validManifest).success).toBe(true);
  });

  it("rejects a manifest with missing framework_version", () => {
    const { framework_version, ...rest } = validManifest;
    void framework_version;
    const result = manifestSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "framework_version")).toBe(true);
    }
  });

  it("rejects a manifest_version that isn't semver-shaped", () => {
    const result = manifestSchema.safeParse({ ...validManifest, framework_version: "0.44" });
    expect(result.success).toBe(false);
  });

  it("rejects a manifest with no stages", () => {
    const result = manifestSchema.safeParse({ ...validManifest, stages: [] });
    expect(result.success).toBe(false);
  });
});

describe("manifestStageSchema", () => {
  it("rejects an uppercase stage name (slug regex)", () => {
    const result = manifestStageSchema.safeParse({ ...validStage, name: "Requirements" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join(".") === "name")).toBe(true);
    }
  });

  it("rejects a missing display_name", () => {
    const { display_name, ...rest } = validStage;
    void display_name;
    const result = manifestStageSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "display_name")).toBe(true);
    }
  });

  it("rejects an invalid pattern enum", () => {
    const result = manifestStageSchema.safeParse({ ...validStage, pattern: "Other" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid default_autonomy enum", () => {
    const result = manifestStageSchema.safeParse({ ...validStage, default_autonomy: "auto" });
    expect(result.success).toBe(false);
  });

  it("rejects a stage whose checkpoint has an invalid type", () => {
    const result = manifestStageSchema.safeParse({
      ...validStage,
      checkpoints: [{ ...validCheckpoint, type: "audit" }],
    });
    expect(result.success).toBe(false);
  });

  it("requires at least one checkpoint", () => {
    const result = manifestStageSchema.safeParse({ ...validStage, checkpoints: [] });
    expect(result.success).toBe(false);
  });

  it("requires at least one artifact", () => {
    const result = manifestStageSchema.safeParse({ ...validStage, artifacts: [] });
    expect(result.success).toBe(false);
  });
});

describe("manifestCheckpointSchema", () => {
  it("accepts a checkpoint with a null condition", () => {
    expect(manifestCheckpointSchema.safeParse(validCheckpoint).success).toBe(true);
  });

  it("accepts a checkpoint with a compliance condition", () => {
    const result = manifestCheckpointSchema.safeParse({
      ...validCheckpoint,
      condition: "compliance",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid checkpoint type", () => {
    const result = manifestCheckpointSchema.safeParse({ ...validCheckpoint, type: "audit" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown condition", () => {
    const result = manifestCheckpointSchema.safeParse({ ...validCheckpoint, condition: "legal" });
    expect(result.success).toBe(false);
  });
});

describe("manifestArtifactSchema", () => {
  it("rejects a missing display_name", () => {
    const { display_name, ...rest } = validArtifact;
    void display_name;
    const result = manifestArtifactSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "display_name")).toBe(true);
    }
  });

  it("rejects a missing required flag", () => {
    const { required, ...rest } = validArtifact;
    void required;
    const result = manifestArtifactSchema.safeParse(rest);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "required")).toBe(true);
    }
  });

  it("accepts a null template_path (non-template artifacts)", () => {
    const result = manifestArtifactSchema.safeParse({ ...validArtifact, template_path: null });
    expect(result.success).toBe(true);
  });

  it("accepts an embedded_in slug", () => {
    const result = manifestArtifactSchema.safeParse({
      ...validArtifact,
      embedded_in: "requirements-brief",
    });
    expect(result.success).toBe(true);
  });
});

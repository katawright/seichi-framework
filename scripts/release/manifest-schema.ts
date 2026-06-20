// Canonical Zod schema for the AI-Assisted SDLC framework manifest.
//
// This is the source of truth. Downstream consumers (e.g., theia-platform)
// vendor a copy of this file. Keep the byte representation stable so the
// vendored copy can be diff-checked verbatim.

import { z } from "zod";

const slugSchema = z.string().regex(/^[a-z0-9-]+$/);

export const manifestStagePatternSchema = z.enum([
  "Foundational",
  "Iterative",
  "Terminal",
]);

export const manifestCheckpointTypeSchema = z.enum([
  "investment_gate",
  "review",
  "alignment",
]);

export const manifestCheckpointConditionSchema = z.enum(["compliance"]);

export const manifestWorkingLocationSchema = z.enum([
  "artifacts",
  "source-code",
]);

export const manifestArtifactSchema = z.object({
  name: slugSchema,
  display_name: z.string().min(1),
  display_order: z.number().int().positive(),
  template_path: z.string().nullable(),
  embedded_in: slugSchema.nullable(),
  required: z.boolean(),
});

export const manifestCheckpointSchema = z.object({
  name: z.string().min(1),
  type: manifestCheckpointTypeSchema,
  is_hard_gate: z.boolean(),
  condition: manifestCheckpointConditionSchema.nullable(),
});

export const manifestStageSchema = z.object({
  name: slugSchema,
  display_name: z.string().min(1),
  display_order: z.number().int().positive(),
  default_sequence: z.number().int().positive(),
  pattern: manifestStagePatternSchema,
  working_location: manifestWorkingLocationSchema,
  checkpoints: z.array(manifestCheckpointSchema).min(1),
  artifacts: z.array(manifestArtifactSchema).min(1),
});

export const manifestSchema = z.object({
  framework_version: z.string().regex(/^\d+\.\d+\.\d+$/),
  generated_at: z.string().datetime(),
  stages: z.array(manifestStageSchema).min(1),
});

export type FrameworkManifest = z.infer<typeof manifestSchema>;
export type ManifestStage = z.infer<typeof manifestStageSchema>;
export type ManifestCheckpoint = z.infer<typeof manifestCheckpointSchema>;
export type ManifestArtifact = z.infer<typeof manifestArtifactSchema>;

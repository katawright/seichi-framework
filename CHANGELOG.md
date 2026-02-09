# Changelog

All notable changes to the AI-Assisted SDLC Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Established checkpoint taxonomy: Gates, Quality Checkpoints, Deployment Approvals, Alignment Reviews, Compliance Approvals
- Clarified Gate 1 = End of Initiation (investment decision), Gate 2 = End of Requirements/Design (build/no-build decision)
- Renamed `initiation-brief.md` → `initiation-brief-template.md` to clarify it's a template, not project output
- Updated Initiation stage to emphasize democratization ("anyone with an idea can start")
- Added explicit AI validation guidance at all checkpoint types
- Removed "(1 page)" from brief title and section numbering format

### Added
- "Decision Points and Checkpoints" section in STAGES.md explaining the 5 checkpoint types
- "Stage Checkpoints" section in Initiation README documenting Gate 1
- "Starting Point" and "Stage Outputs" sections in Initiation README clarifying framework tools vs. project outputs
- AI validation requirements at each checkpoint type

## [0.2.0] - 2026-02-08

### Added
- Complete Initiation stage artifacts (Stage 1 of 7):
  - `framework/initiation/README.md` - Stage overview and workflow guidance
  - `framework/initiation/initiation-brief-template.md` - One-page project summary template
  - `framework/initiation/initiation-checklist.md` - 60-90 second readiness checklist
  - `framework/initiation/initiation-reference.md` - Detailed guidance, definitions, and examples
  - `framework/initiation/initiation-ai-agent-prompt.md` - AI agent prompt for stage execution
- Measurement throughline concept emphasized across Initiation artifacts
- Framework version management strategy (version per stage)
- CHANGELOG.md to track framework changes

### Changed
- Updated versioning approach: single framework version, tracked in root README.md
- Updated PROJECT_PLAN.md to mark Initiation stage complete
- Reorganized root README.md with framework version and stage artifacts section

## [0.1.0] - 2026-02-08

### Added
- Initial framework structure and core documents:
  - `STAGES.md` - Authoritative definition of 7 SDLC stages with inputs, outputs, and exit criteria
  - `AI_AUTONOMY_SCORECARD.md` - Operational guidance on AI autonomy levels per stage
  - `PROJECT_CONTEXT.md` - Complete project vision, design principles, and execution model
  - `PROJECT_PLAN.md` - Phased development approach with model selection strategy
  - `CLAUDE.md` - Project instructions and standards
- 7-stage SDLC model: Initiation, Requirements, Design, Implementation, Verification, Deployment, Support
- AI autonomy levels: AI assist only, AI co-pilot, AI agent with approval, AI agent autonomous
- Framework design principles: practical, non-threatening, cross-functional, methodology-agnostic
- Measurement philosophy with framework-agnostic approach

[0.2.0]: https://github.com/yourusername/ai-assisted-sdlc/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yourusername/ai-assisted-sdlc/releases/tag/v0.1.0

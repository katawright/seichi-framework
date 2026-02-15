# Changelog

All notable changes to the AI-Assisted SDLC Framework will be documented in this
file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-02-09

### Added

- Complete Requirements stage artifacts (Stage 2 of 7):
  - `framework/requirements/README.md` - Stage overview with checkpoint guidance
    (261 lines)
  - `framework/requirements/requirements-brief-template.md` - Requirements
    document template with full MoSCoW prioritization (230 lines)
  - `framework/requirements/requirements-checklist.md` - Readiness checklist
    with 12 validation items (110 lines)
  - `framework/requirements/requirements-reference.md` - Comprehensive reference
    with definitions, rationale, examples (456 lines)
  - `framework/requirements/requirements-ai-agent-prompt.md` - AI agent prompt
    for drafting requirements (99 lines)
- Full MoSCoW prioritization method (Must Have / Should Have / Could Have /
  Won't Have)
- "Iteration plan" terminology for Design stage deliverable (maps MoSCoW
  priorities to increments)
- Alignment Reviews checkpoint type integrated in Requirements stage
- Comprehensive MoSCoW-to-increments mapping guidance

### Changed

- Implemented full 4-tier MoSCoW prioritization (previously 2-tier "MVP vs.
  Later")
- Changed "slice plan" to "iteration plan" throughout Requirements artifacts (13
  occurrences)
- Updated Requirements stage to emphasize Business Analyst/PM primary audience
- Clarified Gate 2 timing (end of Requirements + Design foundational pass)
- Enhanced measurement throughline from Initiation metrics → Requirements NFRs
- Removed parenthetical text from checklist titles (cleaner presentation)
- Updated `framework/initiation/initiation-checklist.md` title (removed "(60-90
  seconds)")

### Key Concepts

- **MoSCoW prioritization**: Industry-standard 4-tier method with clear
  distinction between committed (Should Have) and aspirational (Could Have)
  requirements
- **Iteration plan**: Created by Design stage to map coarse MoSCoW priorities to
  specific increments
- **Coarse prioritization**: Requirements stage categorizes by commitment level;
  Design stage assigns to increments
- **Could Have requirements**: Opportunistic ("build if easy, skip if hard"),
  evaluated during implementation

## [0.2.0] - 2026-02-08

### Added

- Complete Initiation stage artifacts (Stage 1 of 7):
  - `framework/initiation/README.md` - Stage overview and workflow guidance
  - `framework/initiation/initiation-brief-template.md` - One-page project
    summary template
  - `framework/initiation/initiation-checklist.md` - 60-90 second readiness
    checklist
  - `framework/initiation/initiation-reference.md` - Detailed guidance,
    definitions, and examples
  - `framework/initiation/initiation-ai-agent-prompt.md` - AI agent prompt for
    stage execution
- Measurement throughline concept emphasized across Initiation artifacts
- Framework version management strategy (version per stage)
- CHANGELOG.md to track framework changes

### Changed

- Updated versioning approach: single framework version, tracked in root
  README.md
- Updated PROJECT_PLAN.md to mark Initiation stage complete
- Reorganized root README.md with framework version and stage artifacts section

## [0.1.0] - 2026-02-08

### Added

- Initial framework structure and core documents:
  - `STAGES.md` - Authoritative definition of 7 SDLC stages with inputs,
    outputs, and exit criteria
  - `AI_AUTONOMY_SCORECARD.md` - Operational guidance on AI autonomy levels per
    stage
  - `PROJECT_CONTEXT.md` - Complete project vision, design principles, and
    execution model
  - `PROJECT_PLAN.md` - Phased development approach with model selection
    strategy
  - `CLAUDE.md` - Project instructions and standards
- 7-stage SDLC model: Initiation, Requirements, Design, Implementation,
  Verification, Deployment, Support
- AI autonomy levels: AI assist only, AI co-pilot, AI agent with approval, AI
  agent autonomous
- Framework design principles: practical, non-threatening, cross-functional,
  methodology-agnostic
- Measurement philosophy with framework-agnostic approach

[0.3.0]:
  https://github.com/yourusername/ai-assisted-sdlc/compare/v0.2.0...v0.3.0
[0.2.0]:
  https://github.com/yourusername/ai-assisted-sdlc/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yourusername/ai-assisted-sdlc/releases/tag/v0.1.0

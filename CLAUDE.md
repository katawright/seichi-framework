# AI-Assisted SDLC Framework

## Project Overview
This project develops a practical framework for integrating AI assistance across all SDLC stages. The framework is designed to:
- Guide both technical and non-technical stakeholders through software development
- Make AI adoption less threatening to skeptical engineers
- Democratize project initiation for business stakeholders
- Support iterative delivery with adaptive feedback loops

See PROJECT_CONTEXT.md for full details.

## Quick Context
- **Phase:** Phase 1 - Framework Development
- **Goal:** Create complete, standardized SDLC stage documentation
- **Reference Materials:** ../ai-assisted-sdlc-reference/ contains prior work from ChatGPT
- **Target Audience:** Engineers (primary), Product Managers, Business Analysts, Executives (secondary)

## Key Documents
- **PROJECT_CONTEXT.md** - Complete project vision, design principles, execution model, measurement philosophy
- **PROJECT_PLAN.md** - Phased development approach with model selection strategy (Sonnet vs Opus)
- **STAGES.md** - Authoritative definition of the 7 SDLC stages with inputs, outputs, and criteria

## Design Principles
1. AI as assistant, not replacement - non-threatening language
2. Practical over theoretical - lightweight, actionable
3. Cross-functional accessibility - business and technical stakeholders
4. Role-appropriate guidance - tailor language to primary role
5. Methodology-agnostic - works for agile, waterfall, and hybrid teams

## SDLC Execution Model
- **Foundational stages** (once per project, revisitable): Initiation, Analysis, High-Level Design
- **Iterative stages** (per increment): Low-Level Design, Implementation, Testing, Deployment
- **Continuous stages**: Maintenance
- **Increment** = neutral term mapping to epic/feature/sprint/milestone/deliverable

## Standards
- **Versioning:** Semantic Versioning (MAJOR.MINOR.PATCH)
  - Framework and application versions stay synchronized
- **Commits:** Conventional Commits (type(scope): description)
  - Types: feat, fix, docs, refactor, test, chore, style
  - Scopes: stage names, framework, application, ci
  - Breaking changes: Use `!` or `BREAKING CHANGE:` in body
- **File Versioning:**
  - README.md files: Include `**Framework Version:** X.X.X` (CURRENT framework, update ALL READMEs per release) and `**Last Updated:** YYYY-MM-DD` at top
  - Individual artifacts: Include `**Last Updated:** YYYY-MM-DD` at top, version note at bottom ("Added to framework in vX.X.X")
  - When releasing new version: Update Framework Version in ALL README files
  - See PROJECT_CONTEXT.md for detailed file-level versioning conventions

## Workflow
1. Review reference materials in ../ai-assisted-sdlc-reference/ before creating new artifacts
2. Maintain consistency across all stage artifacts
3. Tailor language to role (business language for PM/BA stages, technical for engineering stages)
4. Each stage needs: brief, checklist, reference, AI agent prompt, README
5. Include role metadata and execution pattern (foundational/iterative/continuous) in each stage
6. Create feature branch, commit with conventional commits, create PR (main branch is protected)

## Framework-Application Synchronization
When building the application (Phase 3+):
- Framework artifacts (markdown files) are single source of truth
- Application reads framework files (runtime or build-time)
- Both released together with aligned version numbers
- Framework changes require application updates in same commit

## Important
Read PROJECT_CONTEXT.md at session start for complete understanding of:
- Target audiences and their concerns
- SDLC stage execution model with feedback loops
- Artifact structure template
- Measurement philosophy (optional feedback in application)
- Success criteria
- Questions to address when building framework

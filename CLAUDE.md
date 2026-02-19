# AI-Assisted SDLC Framework

## Project Overview

This project develops a practical framework for integrating AI assistance across
all SDLC stages. The framework is designed to:

- Fully integrate AI into the software development process
- Guide both technical and non-technical stakeholders through software
  development
- Make AI adoption less threatening to skeptical engineers
- Democratize project initiation for business stakeholders
- Support iterative delivery with adaptive feedback loops

See PROJECT_CONTEXT.md for full details.

## Quick Context

- **Phase:** Phase 2 - Framework Refinement
- **Goal:** Review and refine framework for completeness and usability
- **Target Audience:** Engineers (primary), Product Managers, Business Analysts,
  Executives (secondary)

## Key Documents

- **PROJECT_CONTEXT.md** - Complete project vision, design principles, execution
  model, measurement philosophy
- **framework/framework-stages.md** - Authoritative definition of the 8 SDLC
  stages with inputs, outputs, and criteria

## Design Principles

1. AI as assistant, not replacement - non-threatening language
2. Practical over theoretical - lightweight, actionable
3. Cross-functional accessibility - business and technical stakeholders
4. Role-appropriate guidance - tailor language to primary role
5. Methodology-agnostic - works for agile, waterfall, and hybrid teams

## SDLC Execution Model

- **Foundational stages** (once per project, revisitable): Initiation,
  Requirements, System Design
- **Iterative stages** (per increment): Increment Design, Implementation,
  Verification, Deployment
- **Continuous stages**: Support
- **Increment** = neutral term mapping to
  epic/feature/sprint/milestone/deliverable

## Standards

- **Versioning:** Semantic Versioning (MAJOR.MINOR.PATCH)
  - `framework/VERSION` is the canonical source of truth for the
    framework version
  - Framework and application versions stay synchronized
- **Commits:** Conventional Commits (type(scope): description)
  - Types: feat, fix, docs, refactor, test, chore, style
  - Scopes: stage names, framework, application, ci
  - Breaking changes: Use `!` or `BREAKING CHANGE:` in body
- **File Versioning:**
  - README.md files: Include `**Framework Version:** X.X.X` (CURRENT framework,
    update ALL READMEs per release) and `**Last Updated:** YYYY-MM-DD` at bottom
  - Individual artifacts: Include `**Last Updated:** YYYY-MM-DD`, version note
    at bottom ("Added to framework in vX.X.X")
  - When releasing new version: Update Framework Version in ALL README files
  - See PROJECT_CONTEXT.md for detailed file-level versioning conventions
- **Markdown Formatting:**
  - Maximum line length: 80 characters
  - Break lines at natural points (sentence boundaries, clauses, list items)
  - Preserve markdown structure (headers, lists, code blocks, tables)
  - Improves readability in text editors and code reviews
  - When linking to files use the file title as the link text, not the file name

## Workflow

1. Maintain consistency across all stage artifacts
2. Tailor language to role (business language for PM/BA stages, technical for
   engineering stages)
3. Each stage needs: brief, checklist, reference, AI agent prompt, README
4. Include role metadata and execution pattern
   (foundational/iterative/continuous) in each stage
5. Create feature branch, commit with conventional commits, create PR (main
   branch is protected)
6. Only commit changes when explicitly directed by the user

## Cross-Cutting Refinement Patterns

When refining any stage's artifacts, apply these patterns established during
Initiation refinement:

1. **README "How AI Helps" section** — Add after Starting Point, before
   Artifacts. Include 3-4 stage-appropriate bullets describing how AI assists,
   linking to the AI Assistance Scorecard.
2. **README measurement throughline callout** — Add a blockquote after Stage
   Outputs pointing to Framework Guide: Measurement Throughline, describing that
   stage's measurement role.
3. **Gate decision template references** — Any artifact mentioning a gate
   decision should reference the Gate Decision Template rather than embedding
   decision criteria inline.
4. **No DRI jargon** — Use "project lead" if ownership is referenced.
5. **Link text convention** — Use file title as link text, not the filename
   (e.g., `[Initiation Guide](initiation-guide.md)` not
   `**initiation-guide.md**`).

See the Initiation stage artifacts for reference implementations of these
patterns.

## Framework-Application Synchronization

When building the application (Phase 4):

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

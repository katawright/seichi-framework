# AI-Assisted SDLC Framework

## Purpose

This file gives AI coding assistants project-specific working instructions for
this repository.

It is agent-agnostic and complements:

- `README.md` for project overview
- `PROJECT_CONTEXT.md` for full framework context
- `CLAUDE.md` for Claude-specific guidance

## Project Overview

This project develops a practical framework for integrating AI assistance across
all SDLC stages. The framework is designed to:

- Fully integrate AI into the software development process
- Guide both technical and non-technical stakeholders through software
  development
- Make AI adoption less threatening to skeptical engineers
- Democratize project initiation for business stakeholders
- Support iterative delivery with adaptive feedback loops

See `PROJECT_CONTEXT.md` for full details.

## Quick Context

- Phase: Phase 2 - Framework Refinement
- Goal: Review and refine framework for completeness and usability
- Target audience: Engineers (primary), Product Managers, Business Analysts,
  Executives (secondary)

## Key Documents

- `PROJECT_CONTEXT.md`: Complete project vision, design principles, execution
  model, and measurement philosophy
- `framework/framework-stages.md`: Authoritative definition of the 8 SDLC stages
  with inputs, outputs, and criteria
- `framework/STYLE_GUIDE.md`: Source of truth for document style, organization,
  and formatting — read before creating or editing framework files

## Design Principles

1. AI as assistant, not replacement (non-threatening language)
2. Practical over theoretical (lightweight, actionable)
3. Cross-functional accessibility (business and technical stakeholders)
4. Role-appropriate guidance
5. Methodology-agnostic (agile, waterfall, hybrid)

## SDLC Execution Model

- Foundational stages (once per project, revisitable): Initiation, Requirements,
  System Design
- Iterative stages (per increment): Increment Design, Implementation,
  Verification, Deployment
- Continuous stage: Support
- Increment = neutral term mapping to epic/feature/sprint/milestone/deliverable

## Standards

- Versioning: Semantic Versioning (MAJOR.MINOR.PATCH)
  - `framework/VERSION` is the canonical framework version
  - Framework and application versions stay synchronized
- Commits: Conventional Commits (`type(scope): description`)
  - Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`
  - Scopes: stage names, framework, application, ci
  - Breaking changes: `!` or `BREAKING CHANGE:` in commit body
- File versioning:
  - `README.md` files include `Framework Version` and `Last Updated`
  - Stage artifacts include `Last Updated` and version-introduction note
  - On each release, update framework version in all README files
- Markdown formatting: follow `framework/STYLE_GUIDE.md`

## Workflow

1. Maintain consistency across stage artifacts
2. Tailor language to role (business-first in PM/BA stages, technical in
   engineering stages)
3. Each stage directory should include: README (stage guide), checklist,
   reference (if needed). Templates live in `framework/templates/`
4. Include role metadata and execution pattern
   (foundational/iterative/continuous) in each stage
5. Use feature branches and PRs (main branch is protected)
6. Only commit changes when explicitly directed by the user

## Cross-Cutting Refinement Patterns

When refining stage artifacts, apply these patterns:

1. README "How AI Helps" section after Starting Point, before Artifacts
2. README measurement-throughline callout after Stage Outputs
3. Gate decision references should point to the Gate Decision Template
4. Avoid "DRI" jargon; prefer "project lead"

Use Initiation stage artifacts as reference implementations.

## Framework-Application Synchronization

When building the application:

- Markdown framework artifacts are the source of truth
- Application reads framework files (runtime or build-time)
- Framework and application release together with aligned version numbers
- Framework changes require application updates in the same commit

## Agent Execution Rules

These rules apply to AI coding assistants working in this repository.

1. Read `PROJECT_CONTEXT.md` at session start for full context.
2. Follow `framework/STYLE_GUIDE.md` for all document formatting, structure, and
   style decisions.
3. Prefer minimal, targeted edits; preserve existing voice and structure.
4. Do not invent process details not grounded in current framework documents.
5. When changing one stage artifact, check related artifacts for consistency
   drift.
6. Before finalizing changes, run lightweight repository checks where relevant:
   - Search for broken references or renamed files
   - Confirm expected files still exist
   - Review diffs for formatting and consistency
7. Do not commit or create tags unless the user explicitly requests it.

## Notes

Last Updated: 2026-02-26

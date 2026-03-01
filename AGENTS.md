# AI-Assisted SDLC Framework

## Purpose

This file gives AI coding assistants project-specific working instructions for
this repository.

It is agent-agnostic and complements:

- `README.md` for project overview
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

## Target Audience

- **Primary:** Engineers — may be skeptical about AI tools or concerned about AI
  as a threat to their roles
- **Secondary:** Non-technical stakeholders (Product Managers, Business
  Analysts, Executives) who need to initiate and plan software projects
- **Tertiary:** Other organizations seeking structured AI integration across
  their product development lifecycle

## Document Hierarchy

Canonical sources — other docs should link here, not re-explain. Read
`guides/stages.md` and `STYLE_GUIDE.md` first when creating or editing files.

- **Stage definitions:** `guides/stages.md`
- **Stage execution guidance:** `stages/[stage]/README.md`
- **Cross-cutting concepts and governance:** `guides/framework.md`
- **AI autonomy and scoring:** `guides/ai-assistance.md`
- **Agentic workflow and stage routing:** `guides/agentic-workflow.md`
- **Right-sizing tiers:** `guides/right-sizing.md`
- **Deep-dive best practices:** `stages/[stage]/reference.md`
- **Document style and formatting:** `STYLE_GUIDE.md`

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
  - `VERSION` is the canonical framework version
- Commits: Conventional Commits (`type(scope): description`)
  - Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`
  - Scopes: stage names, framework, ci
  - Breaking changes: `!` or `BREAKING CHANGE:` in commit body
- File versioning:
  - `README.md` files include `Framework Version` and `Last Updated`
  - Stage artifacts include `Last Updated` and version-introduction note
  - When `VERSION` is bumped, update the `Framework Version` field in all README
    files to match
  - Update `**Last Updated:** YYYY-MM-DD` in the Notes section of every modified
    framework file before finishing a change
- Markdown formatting: follow `STYLE_GUIDE.md`

## Workflow

1. Maintain consistency across stage artifacts
2. Tailor language to role (business-first in PM/BA stages, technical in
   engineering stages)
3. Each stage directory should include: README (stage guide), checklist,
   reference (if needed). Templates live in `templates/`. Stage directories are
   under `stages/`
4. Include role metadata and execution pattern
   (foundational/iterative/continuous) in each stage
5. Use feature branches and PRs (main branch is protected)

## Cross-Cutting Refinement Patterns

When refining stage artifacts, apply these patterns:

1. README "How AI Helps" section after Starting Point, before Artifacts
2. README measurement-throughline callout after Stage Outputs
3. Gate decision references should point to the Gate Decision Template
4. Avoid "DRI" jargon; prefer "project lead"

Use Initiation stage artifacts as reference implementations.

## Measurement Philosophy

Projects should define measurable success criteria during Initiation, tracked
through all subsequent stages. Each stage integrates measurement differently:

- **Initiation** — Define objectives with measurable success criteria
- **Requirements** — Capture instrumentation needs as NFRs
- **System Design** — Design measurement infrastructure
- **Increment Design** — Plan metrics collection for increment
- **Implementation** — Implement metrics collection
- **Verification** — Test measurement systems
- **Deployment** — Capture baseline measurements
- **Support** — Monitor and validate success criteria

The framework is agnostic to goal-setting methodology (OKRs, SMART, KPIs, etc.)
— what matters is that criteria are clearly defined, measurable, and trackable.

## Excluded Directories

Do not read or reference files in these directories:

- `.ignore/` — personal scratch work and draft notes
- `.obsidian/` — Obsidian vault configuration

## Front Matter Convention

Framework files use YAML front matter (`---` delimited block above the H1 title)
as a dual-audience convention:

- **Front matter (agent fast path):** structured, machine-parseable metadata —
  stage routing, inputs/outputs, gates, dependencies. Agents read this first to
  orient and make programmatic decisions.
- **Body (human + agent deep path):** prose, tables, and narrative providing
  rationale, examples, and guidance. Both humans and agents read the body for
  context that doesn't reduce to structured fields.

The front matter answers _what do I need, what do I produce, what gates apply_.
The body answers _why this approach, what are the tradeoffs, how do I handle
edge cases_. See `STYLE_GUIDE.md` for the front matter schema and formatting
rules.

## Agent Execution Rules

These rules apply to AI coding assistants working in this repository.

1. Follow `STYLE_GUIDE.md` for all document formatting, structure, and style
   decisions.
2. Prefer minimal, targeted edits; preserve existing voice and structure.
3. Do not invent process details not grounded in current framework documents.
4. When changing one stage artifact, check related artifacts for consistency
   drift.
5. Before finalizing changes, run lightweight repository checks where relevant:
   - Search for broken references or renamed files
   - Confirm expected files still exist
   - Review diffs for formatting and consistency
6. Do not commit or create tags unless the user explicitly requests it.

## Notes

Last Updated: 2026-03-01

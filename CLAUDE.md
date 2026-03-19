# CLAUDE.md

## Purpose

Project working instructions for AI coding assistants in this repository. This
is the single source of truth for conventions, rules, and execution guidance.

---

## Project Overview

This project develops a practical framework for integrating AI assistance across
all SDLC stages. The framework is designed to:

- Fully integrate AI into the software development process
- Guide both technical and non-technical stakeholders through software
  development
- Make AI adoption less threatening to skeptical engineers
- Democratize project initiation for business stakeholders
- Support iterative delivery with adaptive feedback loops

---

## Target Audience

- **Primary:** Engineers — may be skeptical about AI tools or concerned about AI
  as a threat to their roles
- **Secondary:** Non-technical stakeholders (Product Managers, Business
  Analysts, Project Managers / Delivery Leads, Executives) who need to initiate,
  plan, and coordinate software projects
- **Tertiary:** Other organizations seeking structured AI integration across
  their product development lifecycle

---

## Document Hierarchy

Read `guides/stages.md` and `STYLE_GUIDE.md` first when creating or editing
files. See `INDEX.md` for the full file inventory and canonical sources.

---

## Design Principles

1. AI as assistant, not replacement (non-threatening language)
2. Practical over theoretical (lightweight, actionable)
3. Cross-functional accessibility (business and technical stakeholders)
4. Role-appropriate guidance
5. Methodology-agnostic (agile, waterfall, hybrid)

---

## SDLC Execution Model

- Foundational stages (once per project, revisitable): Initiation, Requirements,
  System Design
- Iterative stages (per increment): Increment Design, Implementation,
  Verification, Deployment
- Continuous stage: Support
- Increment = neutral term mapping to epic/feature/sprint/milestone/deliverable

---

## Standards

- Versioning: Semantic Versioning (MAJOR.MINOR.PATCH)
  - `VERSION` is the canonical framework version
- Commits: Conventional Commits (`type(scope): description`)
  - Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`
  - Scopes: stage names, framework, ci
  - Breaking changes: `!` or `BREAKING CHANGE:` in commit body
- File versioning:
  - Stage artifacts include `Last Updated` and version-introduction note
  - Update `**Last Updated:** YYYY-MM-DD` in the Notes section of every modified
    framework file before finishing a change
- Markdown formatting: follow `STYLE_GUIDE.md`

---

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

---

## Excluded Directories

Do not read or reference files in these directories:

- `.ignore/` — personal scratch work and draft notes
- `.obsidian/` — Obsidian vault configuration
- `.evaluation/` — contributor-facing evaluation tooling (rubrics, simulation
  plans); not framework guidance

---

## Front Matter Convention

Framework files use YAML front matter as a dual-audience convention. Agents must
read front matter first to orient and preserve it when editing. Front matter
answers _what do I need, what do I produce, what gates apply_; the body answers
_why this approach, what are the tradeoffs, how do I handle edge cases_. See
`STYLE_GUIDE.md` for the front matter schema and formatting rules.

---

## Measurement Philosophy

Projects should define measurable success criteria during Initiation, tracked
through all subsequent stages. The framework is agnostic to goal-setting
methodology (OKRs, SMART, KPIs, etc.) — what matters is that criteria are
clearly defined, measurable, and trackable. See `guides/stages.md` for how each
stage integrates measurement.

---

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
   - If files were added, removed, or renamed, update `INDEX.md`
6. Do not commit or create tags unless the user explicitly requests it.
7. Never commit directly to main; always use a feature branch.

For the recommended agent execution workflow (Orient → Locate → Check → Execute
→ Gate → Log), see `guides/agentic-workflow.md`.

---

## Claude Code Specific Rules

- Keep responses concise and execution-focused.
- Reference files with explicit paths when summarizing changes.

---

## Subagent Model Selection

Right-size the model when spawning subagents:

- **Haiku** — mechanical edits, simple search, well-defined transformations
  (e.g., file moves, link find-and-replace, renaming patterns)
- **Sonnet** — moderate reasoning, code changes with some context needed
- **Opus** — architectural decisions, complex analysis, ambiguous requirements

---

## Notes

**Last Updated:** 2026-03-18

Added to framework in v0.9.0.

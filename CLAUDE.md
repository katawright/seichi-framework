# CLAUDE.md

## Purpose

Project working instructions for AI coding assistants in this repository. This
is the single source of truth for conventions, rules, and execution guidance.

---

## Project Overview

This project develops an SDLC framework for agent-executed software delivery:
right-sized governance, human-owned decisions, and verifiable autonomy from
supervised to lights-out. The framework is designed to:

- Govern agent-executed delivery across the full lifecycle: three work-shapes
  (Project · Flow · Operations), one operating model
- Keep decisions human-owned at a non-delegable floor while execution shifts
  toward agents
- State its contracts in a normative spec layer that agents and conforming tools
  can execute directly
- Guide both technical and non-technical stakeholders through software
  development
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

## Key References

Read `guides/agentic-workflow.md`, `guides/stages.md`, `guides/roles.md`, and
`STYLE_GUIDE.md` when creating or editing files. `guides/roles.md` is the
canonical source for role definitions and the RACI matrix. Stage READMEs
(`stages/*/README.md`) contain canonical stage metadata in their front matter.
The `spec/` files are the normative contracts behind the operating model,
right-sizing, delegated runs, parallel-batch execution, and canonical project
state — keep a guide and its governing spec in sync when editing either. See
`INDEX.md` for the full file inventory and canonical sources.

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
- Terminal stage: Closure (hand off to Operations + close the project)
- Operations is a **sibling process**, not a stage (standing-system operation;
  see `guides/operations.md`); **Flow** is a second delivery mode for small
  in-place changes (see `guides/stages.md`). Three work-shapes — Project · Flow
  · Operations — share one operating model.
- Increment = neutral term mapping to epic/feature/sprint/milestone/deliverable

---

## Standards

- Versioning: Semantic Versioning (MAJOR.MINOR.PATCH)
  - `VERSION` is the canonical framework version
- Commits: Conventional Commits (`type(scope): description`)
  - Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`
  - Scopes: stage names, framework, ci
  - Breaking changes: `!` or `BREAKING CHANGE:` in commit body
  - Multi-line commit messages: never wrap the message in a PowerShell
    here-string (`@'…'@`) unless the command actually runs in PowerShell. In a
    POSIX shell (the Bash tool / Git Bash) `@'…'@` is not a here-string — it
    parses as a literal `@`, a single-quoted string, and a literal `@`, which
    silently wraps the message in stray `@` lines. Use a POSIX heredoc
    (`git commit -F -  <<'EOF' … EOF`) in Bash, or a real here-string only in
    PowerShell. After committing, confirm `git log -1` shows no leading/trailing
    `@` line.
- File versioning:
  - Stage artifacts include `Last Updated` and version-introduction note
  - Update `**Last Updated:** YYYY-MM-DD` in the Notes section of every modified
    framework file before finishing a change
- Markdown formatting: follow `STYLE_GUIDE.md`

---

## Workflow

1. Maintain consistency across stage artifacts
2. Tailor language to role (business-first in PM stages, technical in
   engineering stages)
3. Each stage directory should include: README (stage guide), checklist,
   reference (if needed). Templates live in `templates/`. Stage directories are
   under `stages/`
4. Include role metadata and execution pattern (foundational/iterative/terminal)
   in each stage
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
   - If files were added, removed, or renamed, update `INDEX.md`. INDEX.md lists
     framework-usage files only (guides, spec, stages, templates, root
     navigation). Contributor tooling (CLAUDE.md, STYLE_GUIDE.md, AGENTS.md,
     CONTRIBUTING.md) and schema/CI files are excluded.
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
- **Fable** — the hardest work: cross-document normative reasoning, adversarial
  review of spec contracts, large multi-file synthesis under ambiguity

---

## Notes

**Last Updated:** 2026-07-16

Added to framework in v0.9.0.

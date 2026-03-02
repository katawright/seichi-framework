# CLAUDE.md

## Purpose

Claude Code-specific rules for this repository. See @AGENTS.md for all project
conventions.

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

**Last Updated:** 2026-03-01

Added to framework in v0.9.0.

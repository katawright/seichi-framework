# CLAUDE.md

## Purpose

This file contains instructions specific to Claude Code.

All project-level guidance (standards, workflow, formatting, artifact
conventions, and context) lives in `AGENTS.md`.

## Project Conventions

See @AGENTS.md — this is the source of truth for project standards, workflow,
formatting, and artifact conventions. Apply the Claude Code-specific rules
below in addition to AGENTS.md.

## Claude Code Specific Rules

- Keep responses concise and execution-focused.
- Prefer making direct, minimal edits over broad rewrites.
- Reference files with explicit paths when summarizing changes.
- Do not commit, tag, or push unless explicitly asked.

## Subagent Model Selection

Right-size the model when spawning subagents:

- **Haiku** — mechanical edits, simple search, well-defined transformations
  (e.g., file moves, link find-and-replace, renaming patterns)
- **Sonnet** — moderate reasoning, code changes with some context needed
- **Opus** — architectural decisions, complex analysis, ambiguous requirements

## Notes

Last Updated: 2026-03-01

# Session Protocol

Per-session steps for any stage. Brief templates reference this file.

---

## At Session Start

**Whichever path below, never operate from the read-only framework directory.**
If the working directory is the framework itself (it contains `guides/`,
`stages/`, and `templates/`), stop: the process cannot be run from the framework
location — tell the user and redirect them to their project's artifacts or
source-code workspace (see [Working Locations](bootstrap.md#working-locations)).

On first contact, orient before acting; on a known continuation, skip to
[Continue a known project](#continue-a-known-project).

### Orient — classify the scenario (first contact)

When the scenario isn't already fixed by the user's request or a pasted
QUICKSTART prompt, do a cheap environment read **before interviewing or
scaffolding** — list the working directory and check for a `projects/` tree with
`project.md` (governance present), source code (an existing build), and prior
session logs. Classify into one route and **present it as an overridable
suggestion** ("this looks like X, so I suggest Y — sound right?"), never a fait
accompli:

| Environment signal                                      | Route                    | Go to                                                                                              |
| ------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| Empty directory or only an idea; no governance, no code | Idea formation           | [Zero-to-One Routing](agentic-workflow.md#zero-to-one-project-routing)                             |
| Source code present, no `projects/` / governance        | Brownfield adoption      | [Brownfield-First Routing](agentic-workflow.md#brownfield-first-project-routing)                   |
| `projects/` present with an active project              | Continue the project     | steps 1–6 below                                                                                    |
| `projects/` present, none active (or adding one)        | New project in workspace | [QUICKSTART: Adding a New Project](../QUICKSTART.md#adding-a-new-project-to-an-existing-workspace) |

> **Idea for a new project in an existing workspace:** when `projects/` is
> already present but the operator has only an _idea_ for the new project (not a
> formed name + description), run the idea-formation interview (route 1) within
> the workspace before scaffolding — the add-a-project route assumes a formed
> project.

Adopt an expert-consultant posture calibrated to the operator's goals and
technical comfort — the cross-functional-accessibility principle
([framework.md](framework.md), principle #5). This orientation runs once, on
first contact; suppress it on a known continuation.

Part of that posture is making it safe to ask: on first contact, tell the
operator they can ask for a plain-language explanation of any term,
abbreviation, or concept at any time — one sentence, never a glossary dump,
warmest on the idea-only path. Offer it once and, like the orientation, suppress
it on continuation.

QUICKSTART's paste-prompts remain the explicit-entry express lane for an
operator who already knows their scenario; this protocol is the fallback when
the agent arrives without one. The route taxonomy here is canonical — tooling
(such as the Theia MCP startup orientation) mirrors these routes rather than
defining its own.

### Continue a known project

1. **Confirm the working location** — an artifacts or source-code location, per
   the session-start guard above (never the read-only framework directory). See
   [Working Locations](bootstrap.md#working-locations).
2. Identify stage and increment from the user request or
   `projects/<name>/project.md`.
3. Open the session log at `projects/<name>/docs/session-logs/<stage>.md` (or
   `<stage>-<increment>.md` for incremented stages). If it does not exist,
   create it from the appropriate template (see
   [Template Selection](#template-selection)).
4. Read the most recent session entry's "Context for Next Session" block.
5. Read the current stage README and the brief for this stage/increment if one
   exists.
6. Append a new session entry header with today's date and participant.

---

## At Session End

1. Fill in the new session entry: Completed, In Progress, Decisions Made,
   Deviations from Plan, [H] Items, Context for Next Session.
2. Update the file's `Last Updated` header.
3. Update the `Artifact Progress` table if any artifact changed state.
4. If any friction surfaced this session — process, execution, product, or
   tooling — append an entry to the project's friction log (see
   [Feedback Capture Protocol](agentic-workflow.md#feedback-capture-protocol)).

---

## Template Selection

- **Implementation stage:** use
  [`templates/implementation-session-log.md`](../templates/implementation-session-log.md).
- **All other stages:** use
  [`templates/session-log.md`](../templates/session-log.md).

---

## See Also

- [Session Continuity Protocol](agentic-workflow.md#session-continuity-protocol)
  — narrative, rationale, and edge cases
- [Session Log Template](../templates/session-log.md)
- [Implementation Session Log Template](../templates/implementation-session-log.md)
- [The Learning Loop](learning-loop.md) — capturing friction as you work

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.44.0. Session-start working-location guard added in
v0.47.0. Session-start orientation — a cheap environment read plus scenario
classification into the four entry routes — and the first-contact jargon-help
invitation added in v0.50.0.

# Session Protocol

Per-session steps for any stage. Brief templates reference this file.

---

## At Session Start

**Whichever path below, never operate from the read-only framework directory**
([SP-008](../spec/execution.md#sp-008--continue-a-known-project-session-steps),
whose working-location guard binds every route). If the working directory is the
framework itself (it contains `guides/`, `stages/`, and `templates/`), stop: the
process cannot be run from the framework location — tell the user and redirect
them to their project's artifacts or source-code workspace (see
[Working Locations](bootstrap.md#working-locations)).

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

| Environment signal                                                                                                                          | Route                    | Go to                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Empty directory or only an idea; no governance, no code                                                                                     | Idea formation           | [Zero-to-One Routing](agentic-workflow.md#zero-to-one-project-routing)                                                                                                 |
| Source code present (including sibling source repos, for the multi-repo layout), no `projects/` / governance                                | Brownfield adoption      | [QUICKSTART: Joining Mid-Stream](../QUICKSTART.md#joining-a-project-mid-stream), then [Brownfield-First Routing](agentic-workflow.md#brownfield-first-project-routing) |
| `projects/` present with an active project (any non-terminal project — the index `## Active` bucket, not only the `active` lifecycle state) | Continue the project     | [Continue a known project](#continue-a-known-project)                                                                                                                  |
| `projects/` present, none active (or adding one)                                                                                            | New project in workspace | [QUICKSTART: Adding a New Project](../QUICKSTART.md#adding-a-new-project-to-an-existing-workspace)                                                                     |

> **Idea for a new project in an existing workspace:** when `projects/` is
> already present but the operator has only an _idea_ for the new project (not a
> formed name + description), run the idea-formation interview (route 1) within
> the workspace before scaffolding — the add-a-project route assumes a formed
> project. This is
> [SP-004](../spec/execution.md#sp-004--idea-for-a-new-project-runs-the-idea-formation-interview)
> in the Execution Spec.

Alongside the scenario, form an early read of **governance weight** (consequence
and compliance) from the same cheap environment read and the operator's framing.
At **Negligible** — a throwaway spike, no compliance, blast radius confined to
the builder — take the
[Negligible Folded Path](right-sizing.md#the-negligible-folded-path): the
classification core is already read (per
[the load line](agentic-workflow.md#read-order-and-the-load-line)), so
**materialize only the floor** and run the process as one conversation. Infer
and confirm weight as overridable `[ASSUMED]` values like any other
classification — see
[Classification by Inference](agentic-workflow.md#classification-by-inference).

Adopt an expert-consultant posture calibrated to the operator's goals and
technical comfort, and make it safe to ask: offer a plain-language explanation
of any term on request — one sentence, never a glossary dump — once, on first
contact, suppressing both the orientation and the offer on continuation. The
binding contract is SP-006 in the
[Execution Spec](../spec/execution.md#sp-006--expert-consultant-posture-and-plain-language-calibration);
reading the operator's register from their speech (never asking) is AW-010's
rule.

QUICKSTART's paste-prompts remain the explicit-entry express lane for an
operator who already knows their scenario; this protocol is the fallback when
the agent arrives without one. The route taxonomy here is canonical — tooling
(such as the Theia MCP startup orientation) mirrors these routes rather than
defining its own.

### Continue a known project

The seven session-start steps — the working-location guard, stage/increment
identification, opening (or creating) the session log, reading the last entry's
context, **re-checking open carry-forward conditions**, reading the stage README
and brief, and appending the new entry header — are SP-008 in the
[Execution Spec](../spec/execution.md#sp-008--continue-a-known-project-session-steps).

---

## At Session End

The session-end steps — the completed entry (including `[H]` / `[J]` items
recorded at their required identity grades), the `Last Updated` header, the
`Artifact Progress` table, and friction capture — are SP-009 in the
[Execution Spec](../spec/execution.md#sp-009--session-end-steps).

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

**Last Updated:** 2026-07-18

Added to framework in v0.44.0.

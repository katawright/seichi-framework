# Session Protocol

Per-session steps for any stage. Brief templates reference this file.

---

## At Session Start

1. **Confirm the working location.** You must be operating from an artifacts or
   source-code location — never the read-only framework directory. If the
   working directory is the framework itself (it contains `guides/`, `stages/`,
   and `templates/`), stop: the process cannot be run from the framework
   location. Tell the user and redirect them to their project's artifacts or
   source-code workspace. See
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

**Last Updated:** 2026-06-01

Added to framework in v0.44.0. Session-start working-location guard added in
v0.47.0.

# Session Protocol

Per-session steps for any stage. Brief templates reference this file.

---

## At Session Start

1. Identify stage and increment from the user request or
   `projects/<name>/project.md`.
2. Open the session log at
   `projects/<name>/docs/session-logs/<stage>.md` (or
   `<stage>-<increment>.md` for incremented stages). If it does not exist,
   create it from the appropriate template (see
   [Template Selection](#template-selection)).
3. Read the most recent session entry's "Context for Next Session" block.
4. Read the current stage README and the brief for this stage/increment if
   one exists.
5. Append a new session entry header with today's date and participant.

---

## At Session End

1. Fill in the new session entry: Completed, In Progress, Decisions Made,
   Deviations from Plan, [H] Items, Context for Next Session.
2. Update the file's `Last Updated` header.
3. Update the `Artifact Progress` table if any artifact changed state.

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

---

## Notes

**Last Updated:** 2026-04-11

Added to framework in v0.44.0.

<!-- Session log template for multi-session stage work.
     See guides/agentic-workflow.md for session continuity protocol.
     IMPORTANT: Do not record API keys, tokens, credentials, secrets, or other
     sensitive data in this log. Use placeholder references (e.g., "API key
     stored in vault") instead of actual values. -->

> **Do not record API keys, tokens, credentials, secrets, or other sensitive
> data in this log.** Use placeholder references (e.g., "API key stored in
> vault") instead of actual values.

# Session Log: [Stage Name] — [Project/Increment Name]

**Last Updated:** YYYY-MM-DD HH:MM

| Field              | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| **Project**        | [Project Name]                                                |
| **Stage**          | [Stage Name]                                                  |
| **Increment**      | [Increment Number/Name or N/A]                                |
| **Work Execution** | [Humans / Collaborative / Agents]                             |
| **Authority**      | [Interactive human / Pre-authorized policy / Delegated agent] |
| **Participant(s)** | [Names / Agent IDs]                                           |
| **Stage Status**   | [Not Started / In Progress / Blocked / Complete]              |
| **Gate Status**    | [Pending / Approved / Rejected — Approver: name]              |
| **Duration**       | [Optional — total time spent across sessions]                 |

---

## Artifact Progress

| Artifact                 | Status                                    | Location |
| ------------------------ | ----------------------------------------- | -------- |
| [e.g., Initiation Brief] | [Not Started / Draft / Review / Complete] | [path]   |

---

## Session Entries

### Session [N] — YYYY-MM-DD HH:MM — [Participant]

**Completed:**

- [What was finished]

**In Progress:**

- [What's partially done and current state]

**Decisions Made:**

- [Decision and rationale]

**Deviations from Plan:**

- [Where implementation diverged from design and why]

**Blockers:**

- [Issues preventing progress]

**Assumed Inputs (`[ASSUMED]`):**

- [Items flagged as assumed and why]

**Pending Questions for Human Review:**

- [Unresolved items requiring human input]

**[H] / [J] Items:**

- [Each `[H]`/`[J]` item discharged this session — record the evaluator at the
  required identity grade and the required timestamps; see
  [Record Requirements](../spec/canonical-state.md#record-requirements)]

**Context for Next Session:**

- [Critical context the next agent/human needs to continue]

**Next Steps** (list the most critical action first):

- [Specific actions for the next session]

<!-- Template Last Updated: 2026-07-07 | Added in v0.23.0. -->

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

| Field              | Value                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| **Project**        | [Project Name]                                                           |
| **Stage**          | [Stage Name]                                                             |
| **Increment**      | [Increment Number/Name or N/A]                                           |
| **Work Execution** | [Humans / Collaborative / Agents]                                        |
| **Authority**      | [Interactive human / Pre-authorized policy / Delegated agent]            |
| **Participant(s)** | [Names / Agent IDs]                                                      |
| **Stage Status**   | [Not Started / In Progress / Blocked / Complete]                         |
| **Gate decision**  | [Not yet held / Held — outcome rides in the gate-decision record (link)] |
| **Duration**       | [Optional — total time spent across sessions]                            |

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
  required identity grade, the evidence-independence grade (Self-asserted /
  Context-independent / Organizationally-independent,
  [CS-084](../spec/canonical-state.md#cs-084--evidence-independence-grade)), and
  the required timestamps; see
  [Record Requirements](../spec/canonical-state.md#record-requirements).
  Self-asserted is the normal, honest grade for a solo operator — it caps the
  floor claim
  ([CS-086](../spec/canonical-state.md#cs-086--self-asserted-floor-discharge-rule-grade-capping)),
  not the work]
- **Attribution source:** Client-claimed — hand-filled record; identities here
  are self-reported. `platform-verified` applies only when a recording platform
  authenticates the actor; platform-generated records carry per-act grades
  ([CS-085](../spec/canonical-state.md#cs-085--attribution-source-grade-platform-verified--client-claimed)).

**Context for Next Session:**

- [Critical context the next agent/human needs to continue]

**Next Steps** (list the most critical action first):

- [Specific actions for the next session]

<!-- Template Last Updated: 2026-07-18 | Added in v0.23.0. -->

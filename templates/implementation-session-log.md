<!-- For non-implementation stages, use the generalized templates/session-log.md instead. -->
<!-- For guidance on session logging, see stages/implementation/README.md -->
<!-- IMPORTANT: Do not record API keys, tokens, credentials, secrets, or other
     sensitive data in this log. Use placeholder references (e.g., "API key
     stored in vault") instead of actual values. -->

> **Do not record API keys, tokens, credentials, secrets, or other sensitive
> data in this log.** Use placeholder references (e.g., "API key stored in
> vault") instead of actual values.

# Implementation Session Log: [Increment Name]

**Purpose:** Session-by-session engineering log capturing completed work,
decisions, blockers, and handoff context.

**Usage:** Update at the end of each implementation session. See the
[Implementation README multi-session work section](../stages/implementation/README.md#multi-session-work)
for logging conventions and AI agent guidance.

**Last Updated:** YYYY-MM-DD HH:MM

| Field              | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| **Project**        | [Project Name]                                                |
| **Increment**      | [Increment Number/Name]                                       |
| **Engineer(s)**    | [Names]                                                       |
| **Stage**          | Implementation                                                |
| **Work Execution** | [Humans / Collaborative / Agents]                             |
| **Authority**      | [Interactive human / Pre-authorized policy / Delegated agent] |
| **Stage Status**   | [Not Started / In Progress / Blocked / Complete]              |
| **Gate Status**    | [Pending / Approved / Rejected — Approver: name]              |

<!-- Agent: update this log at the end of each session with completed work, in-progress items, next steps, and blockers -->

---

## Artifact Progress

| Artifact                     | Status                                    | Location |
| ---------------------------- | ----------------------------------------- | -------- |
| [e.g., Working Code]         | [Not Started / Draft / Review / Complete] | [path]   |
| [e.g., Implementation Brief] | [Not Started / Draft / Review / Complete] | [path]   |

---

## Session Entries

### Session 1 (YYYY-MM-DD, [Engineer Name])

**Duration:** [Hours worked]

**Completed:**

- [What was finished this session]

**In Progress:**

- [What's partially done]

**Decisions Made:**

- [Decision and rationale]

**Deviations from Plan:**

- [Where implementation diverged from design and why]

**Next Steps:**

- [What should be done next session]

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

**Notes:**

- [Important decisions or context]

_Add more session entries as needed._

<!-- Template Last Updated: 2026-07-18 | Added in v0.12.0. -->

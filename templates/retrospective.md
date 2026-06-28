<!-- For guidance on the learning loop and how retrospective findings are routed, see guides/learning-loop.md -->

# Retrospective

**Purpose:** Capture learnings, action items, and feedback from an increment or
project.

**Usage:** Run at the end of each increment and at project wrap-up. See the
[Learning Loop](../guides/learning-loop.md) for how friction is captured and how
retrospective findings are routed.

**Scope:** [Increment N / Project Wrap-Up]

**Date:** YYYY-MM-DD

**Participants:** [names or roles]

---

## Captured Feedback

<!-- Friction is captured continuously in the project's standing friction log
     (friction-log.md) — not here. See the Learning Loop guide. At the
     retrospective, triage the friction-log entries logged during this
     increment: route each into the analysis sections below by its type
     (Execution → Action Items / Carry Forward; Process → Process Feedback;
     Product → Future Value Candidates; Tooling → Action Items), and record the
     destination in that entry's Disposition field. List the triaged entries
     here as the retrospective's record. -->

| Friction ID | Type   | Observation   | Routed to |
| ----------- | ------ | ------------- | --------- |
| F-NNN       | [type] | [observation] | [section] |

---

## What Went Well

<!-- Practices, decisions, or tools that helped. Keep for next time. -->

- [item]

---

## What Didn't Work

<!-- Friction points, process gaps, or mistakes. Be specific. -->

- [item]

---

## Surprises and Deviations

<!-- Anything unexpected — positive or negative — that the team didn't
     anticipate during planning. -->

- [item]

---

## Pre-Mortem Follow-Up

<!-- Review the failure modes identified in the Initiation Brief pre-mortem.
     Which predicted risks materialized? Which didn't? What was missed
     entirely? -->

| Predicted failure mode | Materialized? | Notes |
| ---------------------- | ------------- | ----- |
| [mode]                 | Yes / No      | …     |

---

## Action Items

| Action | Owner | Role | Stage Target | Target date |
| ------ | ----- | ---- | ------------ | ----------- |
| …      | …     | …    | [stage name] | YYYY-MM-DD  |

The facilitator (PjM) distributes each action item to the assigned Owner and
confirms receipt. Items targeting the next increment are carried forward into
the increment-design-brief Carry Forward Resolution section.

---

## Carry Forward

<!-- For increment retros: actions and insights to carry into the next
     increment. For project retros: lessons and recommendations for future
     projects.

     Consider these categories to ensure nothing is lost:
     1. Regression test planning — features needing regression coverage
     2. Instrumentation gaps — success criteria not yet measurable
     3. Unresolved edge cases — open questions deferred from this increment
     4. Stakeholder feedback — UAT findings not addressed
     5. Test coverage improvements — areas where testing was insufficient -->

- [item]

---

## Future Value Candidates

<!-- PROJECT WRAP-UP RETROS ONLY. Skip this section for increment retros.

     Harvest all "not now" items accumulated across the project: MoSCoW Won't
     Have items, unimplemented Could/Should Have items, deferred scope
     amendments, Product-type friction-log entries, and parking lot items.
     Triage each candidate. For every candidate worth keeping, create an idea
     document in the idea backlog (templates/idea.md) — that is its durable
     destination; a candidate left only in this section is stranded. Initiation
     of a future project draws from the backlog. See the Learning Loop guide. -->

| Candidate | Source | Disposition | Idea ID  | Notes |
| --------- | ------ | ----------- | -------- | ----- |
| [item]    | …      | …           | IDEA-NNN | …     |

<!-- Dispositions: Discard / Add to idea backlog / Promote to future project -->

---

## Process Feedback

<!-- Did anything about the AI-Assisted SDLC framework itself — the development
     process you followed — help or hinder your work? This section collects the
     Process-type friction triaged from the friction log: missing checklist
     items, unclear guidance, template gaps, stage-model issues. Process
     feedback routes to the **framework's tracker**, not the product idea
     backlog — for teams consuming the framework unchanged, file an issue or PR
     at the framework repository (see CONTRIBUTING.md). Tooling friction routes
     the same way, to the owning tool's tracker. Agents: record observations
     here and flag them for human review — do not file issues or PRs without
     explicit permission. -->

- [item]

---

<!-- Template Last Updated: 2026-06-28 | Added in v0.23.0. -->

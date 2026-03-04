# Post-Incident Review

**Incident ID:** [e.g., INC-001]

**Date of Review:** YYYY-MM-DD

**Severity:** [P0 / P1 / P2 / P3]

**Facilitator:** [name or role]

**Participants:** [names or roles]

---

## Summary

<!-- What happened, severity, duration, and impact. Keep factual and blameless —
     focus on systems and processes, not individuals. -->

- **What happened:** [brief description]
- **Duration:** [start time – end time, UTC]
- **User/business impact:** [scope and severity of impact]

---

## Timeline

<!-- Detection through resolution. Use UTC timestamps. -->

| Time (UTC) | Event                       |
| ---------- | --------------------------- |
| HH:MM      | [Incident detected — how?]  |
| HH:MM      | [First responder engaged]   |
| HH:MM      | [Root cause identified]     |
| HH:MM      | [Mitigation applied]        |
| HH:MM      | [Service restored]          |
| HH:MM      | [All-clear communicated]    |

---

## Root Cause

<!-- Identify both the proximate (immediate) and systemic (underlying) causes.
     Use techniques like 5-Whys or fishbone diagrams to dig deeper. -->

- **Proximate cause:** [what directly caused the incident]
- **Systemic cause:** [why the proximate cause was possible — process, tooling,
  or design gaps]

---

## What Went Well

<!-- Effective responses, tools, or processes that helped during the incident. -->

- [item]

---

## What Went Wrong

<!-- Gaps in process, tooling, monitoring, or communication that made the
     incident worse or slower to resolve. -->

- [item]

---

## Action Items

| Action | Owner | Due Date   | Status      |
| ------ | ----- | ---------- | ----------- |
| …      | …     | YYYY-MM-DD | Open / Done |

---

## Incident Metrics

| Metric | Value   | Goal              |
| ------ | ------- | ----------------- |
| MTTD   | [time]  | < 5 min critical  |
| MTTA   | [time]  | < 15 min P0/P1    |
| MTTR   | [time]  | < 1 hour P1       |

---

<!-- Template Last Updated: 2026-03-03 | Added in v0.35.0 -->

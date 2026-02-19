# Implementation Brief: [Increment Name]

**Last Updated:** YYYY-MM-DD

| Field               | Value                                  |
| ------------------- | -------------------------------------- |
| **Project**         | [Project Name]                         |
| **Increment**       | [Increment Number/Name]                |
| **Engineers**       | [Names]                                |
| **Start Date**      | YYYY-MM-DD                             |
| **Completion Date** | YYYY-MM-DD                             |
| **Status**          | [In Progress / Code Review / Complete] |

---

## Progress Log

Session-by-session progress is tracked in a separate
[Implementation Session Log](implementation-session-log-template.md). Start one
from the template at the beginning of each increment. Have the AI agent update
it at the end of every work session so the next session's agent can restore
context from it.

---

## Increment Overview

### Requirements Implemented

| Requirement ID | Description         | AC Met     |
| -------------- | ------------------- | ---------- |
| FR-X           | [Brief description] | [✅/⚠️/❌] |
| FR-Y           | [Brief description] | [✅/⚠️/❌] |
| NFR-Z          | [Brief description] | [✅/⚠️/❌] |

### Scope Summary

**What was built:**

- [Key feature/component 1]
- [Key feature/component 2]

**What was NOT built (if relevant):**

- [Descoped item with reason]

---

## Pull Requests

**Branching Strategy:** [Trunk-based / Increment branch] **Target Branch:**
[main / develop / feature/name]

| PR # | Description   | Lines | Status                             | Link   |
| ---- | ------------- | ----- | ---------------------------------- | ------ |
| #123 | [Description] | ~XXX  | [✅ Merged / 🔄 Review / 📝 Draft] | [Link] |
| #124 | [Description] | ~XXX  | [Status]                           | [Link] |

- [ ] All PRs have passing unit tests before merge
- [ ] CI/CD checks passing for all merged PRs

---

## Implementation Approach

**Overall strategy:** [How you approached the implementation, order of
components, deviations from design]

### Key Decisions

**Significant Decisions (ADRs):**

| #   | Decision | ADR Link                       | Date       |
| --- | -------- | ------------------------------ | ---------- |
| 1   | [Title]  | [ADR-001](adr/ADR-001-slug.md) | YYYY-MM-DD |

_If none: "No separate ADRs for this increment."_

**Minor Decisions:**

- [Decision]: [Brief explanation]

---

## Unit Testing

| Metric           | Value | Target | Status     |
| ---------------- | ----- | ------ | ---------- |
| Overall Coverage | XX%   | 80%+   | [✅/⚠️/❌] |
| Branch Coverage  | XX%   | 75%+   | [✅/⚠️/❌] |
| Critical Path    | XX%   | 100%   | [✅/⚠️/❌] |

**Coverage Report:** [Link]

**Test Gaps (if any):**

- [Gap with reason and plan to address]

> For detailed test scenario categories and test quality checklists, see
> [Implementation Reference: Unit Testing](implementation-reference.md#unit-testing-details).

---

## Instrumentation

**Logging:** [Summary of what's logged]

**Metrics implemented:**

| Metric Name | Type                 | Purpose   | Success Criteria    |
| ----------- | -------------------- | --------- | ------------------- |
| [metric]    | [Counter/Gauge/etc.] | [Purpose] | [Related criterion] |

**Dashboards:** [Links]

**Alerts configured:** [Summary]

> For logging best practices and instrumentation code examples, see
> [Implementation Reference: Logging](implementation-reference.md#logging-best-practices)
> and [Metrics](implementation-reference.md#metrics-and-telemetry).

---

## Code Review

**Reviewers:** [Names] **Status:** [✅ Approved by all reviewers]

**Key feedback and actions:**

- [Feedback topic]: [Action taken]

**Quality checks:** Linting [✅/❌] | Formatting [✅/❌] | Static Analysis
[✅/❌] | Security Scan [✅/❌]

> For detailed code review focus areas and quality check templates, see
> [Implementation Reference: Code Review](implementation-reference.md#code-review-focus-areas).

---

## Known Issues and Limitations

**Known Bugs:**

- [Bug]: Impact: [X] | Workaround: [X] | Plan: [X]

**Limitations:**

- [Limitation]: Reason: [X] | Future plan: [X]

**Technical Debt:**

- [Debt item]: Reason: [X] | Plan: [X]

> For technical debt tracking template, see
> [Implementation Reference: Technical Debt](implementation-reference.md#technical-debt-management).

---

## Dependencies

**New dependencies added:**

| Dependency | Version | Purpose | License   |
| ---------- | ------- | ------- | --------- |
| [package]  | vX.Y.Z  | [Why]   | [License] |

**Integration points:** [External APIs/services used]

---

## Handoff to Verification

**Ready for testing:**

- ✅ [Feature/component 1]
- ✅ [Feature/component 2]

**Testing guidance:**

- [Key test scenario with expected result]

**Environment setup:**

- [Steps to set up test environment]

**Test data:** [What's needed and where to find it]

---

## Sign-Off

| Role          | Name   | Date       | Status        |
| ------------- | ------ | ---------- | ------------- |
| Lead Engineer | [Name] | YYYY-MM-DD | [✅ Approved] |
| Code Reviewer | [Name] | YYYY-MM-DD | [✅ Approved] |

**Readiness declaration:**

- [ ] All requirements implemented
- [ ] Unit tests passing
- [ ] Code review approved
- [ ] Documentation complete
- [ ] Ready for Verification

---

**Template Last Updated:** 2026-02-18

_Added to framework in v0.5.0_

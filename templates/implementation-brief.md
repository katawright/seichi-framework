<!-- For guidance on completing this brief, see ../implementation/README.md -->

# Implementation Brief: [Increment Name]

> **Convention:** Flag unverified assumptions with `[ASSUMED]` throughout the
> brief for gate reviewers to audit.

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

<!-- Session-by-session progress is tracked in a separate Implementation Session Log (implementation-session-log.md). Start one from the template at the beginning of each increment. -->
<!-- Artifact storage: Store this brief and the session log alongside your project artifacts (e.g., docs/ directory or your team's document management system). The brief is the final record; the session log is the working journal. -->

[Link to session log for this increment]

---

## Increment Overview

### Requirements Implemented

| Requirement ID | Description         | AC Met     |
| -------------- | ------------------- | ---------- |
| FR-X           | [Brief description] | [✅/⚠️/❌] |
| FR-Y           | [Brief description] | [✅/⚠️/❌] |
| NFR-Z          | [Brief description] | [✅/⚠️/❌] |

<!-- Status key: ✓ Complete · ⚠ In progress · ✗ Not started -->

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

| #   | Decision | ADR Link                          | Date       |
| --- | -------- | --------------------------------- | ---------- |
| 1   | [Title]  | `ADR-001` · `adr/ADR-001-slug.md` | YYYY-MM-DD |

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

<!-- See Implementation Reference: Unit Testing (../stages/implementation/reference.md#unit-testing-details) -->

---

## Instrumentation

**Logging:** [Summary of what's logged]

**Metrics implemented:**

| Metric Name | Type                 | Purpose   | Success Criteria    |
| ----------- | -------------------- | --------- | ------------------- |
| [metric]    | [Counter/Gauge/etc.] | [Purpose] | [Related criterion] |

**Dashboards:** [Links]

**Alerts configured:** [Summary]

<!-- See Implementation Reference: Logging (../stages/implementation/reference.md#logging-best-practices) and Metrics (../stages/implementation/reference.md#metrics-and-telemetry) -->

---

## Measurement Throughline

<!-- Map each success criterion from Initiation to its instrumentation status.
     This section makes SC coverage gaps visible before handoff to Verification,
     preventing measurement gaps from propagating undetected across stages. -->
<!-- For foundation/bootstrap increments, most success criteria will be
     "Not Started" or "N/A" — this is expected. Foundation increments
     establish infrastructure that enables measurement in subsequent
     feature increments. Note which SCs are now measurable (e.g., uptime
     monitoring) vs. which remain deferred. -->

| Success Criterion | Criterion ID | Metric(s) Implemented | Instrumentation Status                | Gap / Notes |
| ----------------- | ------------ | --------------------- | ------------------------------------- | ----------- |
| [Criterion 1]     | SC-1         | [metric name(s)]      | [✅ Active / ⚠️ Partial / ❌ Missing] |             |
| [Criterion 2]     | SC-2         | [metric name(s)]      | [✅ Active / ⚠️ Partial / ❌ Missing] |             |

**Success criteria register:** [Link to Initiation brief or requirements
register]

---

## Code Review

**Reviewers:** [Names] **Status:** [✅ Approved by all reviewers]

**Key feedback and actions:**

- [Feedback topic]: [Action taken]

**Quality checks:** Linting [✅/❌] | Formatting [✅/❌] | Static Analysis
[✅/❌] | Security Scan [✅/❌]

<!-- See Implementation Reference: Code Review (../stages/implementation/reference.md#code-review-focus-areas) -->

---

## Known Issues and Limitations

**Known Bugs:**

- [Bug]: Impact: [X] | Workaround: [X] | Plan: [X]

**Limitations:**

- [Limitation]: Reason: [X] | Future plan: [X]

**Technical Debt:**

- [Debt item]: Reason: [X] | Plan: [X]

<!-- See Implementation Reference: Technical Debt (../stages/implementation/reference.md#technical-debt-management) -->

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

---

## Appendix

<!-- These sections are optional — include the ones relevant to your increment. -->

### Requirements Traceability

| Requirement | Implementation                     | Unit Tests                  | Ready?  |
| ----------- | ---------------------------------- | --------------------------- | ------- |
| FR-X        | `module/component.py` (line XX-YY) | `test_component.py::test_x` | [✅/❌] |
| FR-Y        | `module/service.py` (line XX-YY)   | `test_service.py::test_y`   | [✅/❌] |

### Code Quality Checks

| Check            | Status  | Tool                      |
| ---------------- | ------- | ------------------------- |
| Linting          | [✅/❌] | [ESLint, Pylint, etc.]    |
| Formatting       | [✅/❌] | [Prettier, Black, etc.]   |
| Static Analysis  | [✅/❌] | [SonarQube, etc.]         |
| Security Scan    | [✅/❌] | [Snyk, Checkmarx, etc.]   |
| Dependency Check | [✅/❌] | [npm audit, safety, etc.] |

### Performance Results

| Operation | Metric        | Result    | Target     | Status  |
| --------- | ------------- | --------- | ---------- | ------- |
| [Op 1]    | Response time | [Xms]     | [<Yms]     | [✅/❌] |
| [Op 2]    | Throughput    | [X req/s] | [>Y req/s] | [✅/❌] |

### Git Commit History

**Branch name:** [feature/increment-name]

**Key commits:**

- [Commit SHA] - [Commit message]

**Merge commit:** [SHA and date merged]

### Deployment Notes

- Database migrations required
- Configuration changes needed
- Environment variables to set
- Feature flags to enable/disable

### Rollback Plan

1. [Step 1: e.g., Disable feature flag X]
2. [Step 2: e.g., Revert to previous deployment]
3. [Step 3: e.g., Run rollback migration]

---

## Self-Validation Against Implementation Checklist

<!-- Before submitting for gate review, self-assess against the Implementation
     Checklist. This catches issues before formal review and improves
     first-pass quality. -->

- [ ] Pre-filled
      [Implementation Checklist](../stages/implementation/checklist.md) with
      self-assessment and evidence for each item
- **Items needing attention:** [List any items that don't fully pass]

<!-- Template Last Updated: 2026-03-03 | Added in v0.5.0 -->

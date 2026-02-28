<!-- For guidance on completing this brief, see ../verification/README.md -->

# Verification Brief: [Increment Name]

**Last Updated:** YYYY-MM-DD

**Increment ID:** [e.g., INC-001, Epic-42]

**QA Lead:** [Name]

**Test Environment:** [e.g., staging.example.com]

**Test Cycle:** [e.g., Cycle 1, Cycle 2]

**Prior Cycle Brief:** [Link to previous cycle's brief, or "N/A — first cycle"]

---

## Increment Overview

**What is being verified:** [Brief description of the increment functionality
being tested]

**Requirements being validated:**

- [REQ-001: Requirement description]
- [REQ-002: Requirement description]

**Acceptance Criteria:**

- [ ] [AC-1: Specific testable criterion]
- [ ] [AC-2: Specific testable criterion]
- [ ] [AC-3: Specific testable criterion]

**Success Criteria Being Validated (from Initiation):**

- [Success criterion #1]
  - How measured: [metric/instrumentation]
- [Success criterion #2]
  - How measured: [metric/instrumentation]

---

## Cycle Context

<!-- For Cycle 2 and beyond. Delete this section for Cycle 1. -->

**Prior cycle brief:** [Link to previous cycle's completed brief]

**Defects fixed in Implementation since last cycle:**

- [DEF-001: Description — fixed in PR #X]
- [DEF-002: Description — fixed in PR #X]

**Scope changes since last cycle:** [Any requirements or acceptance criteria
changes, or "None"]

---

## Test Execution Plan

**Increment Design Test Strategy Reference:** [Link to increment-design-brief.md
section 5]

**Test types planned (confirm or note changes):**

- [x] Integration Testing
- [x] Functional Testing
- [x] User Acceptance Testing (UAT)
- [ ] Performance Testing (if applicable)
- [ ] Security Testing (if applicable)
- [ ] Accessibility Testing (if applicable)
- [x] Monitoring Validation

**Changes from Design plan:** [Any adjustments and why]

**Coverage targets (from Design):**

- Integration: [X% or "all public APIs"]
- Functional: [X% or "all acceptance criteria"]
- Acceptance criteria: [100%]

---

## Test Environment

| Environment   | Purpose             | URL/Access | Status  |
| ------------- | ------------------- | ---------- | ------- |
| [Integration] | [Integration tests] | [URL]      | [Ready] |
| [Staging]     | [Functional + UAT]  | [URL]      | [Ready] |

**Configuration:** [Database, dependencies, feature flags]

**Test data:** [Sources and preparation approach]

---

## Test Results

### Integration Tests

- Tests executed: [X] | Passed: [X] | Failed: [X]
- **Status:** [✅ Passed / ⚠️ Issues / ❌ Failed]
- Issues: [List any issues with IDs]
- Evidence: [Link to test report]

### Functional Tests

- Tests executed: [X] | Passed: [X] | Failed: [X]
- Acceptance criteria covered: [X of Y]
- **Status:** [✅ Passed / ⚠️ Issues / ❌ Failed]
- Issues: [List any issues with IDs]
- Evidence: [Link to test report]

### Performance Tests

- **Status:** [✅ Passed / ⚠️ Issues / ❌ Failed / ⏸ N/A]
- NFR validation: [List NFRs and whether met]
- Evidence: [Link to load test results]

<!-- For detailed performance test result tables, see
     ../verification/verification-reference.md#performance-testing -->

### Security Tests

- **Status:** [✅ Passed / ⚠️ Accepted risk / ❌ Failed / ⏸ N/A]
- Critical/High vulnerabilities: [Count, all resolved]
- Accepted risks: [List with justification]
- Evidence: [Link to scan report]

<!-- For vulnerability scan result tables, see
     ../verification/verification-reference.md#security-testing -->

### Accessibility Tests

- **Status:** [✅ Passed / ⚠️ Issues / ❌ Failed / ⏸ N/A]
- Standards validated: [WCAG level]
- Issues: [List any issues]

### Monitoring and Instrumentation

- **Status:** [✅ Passed / ⚠️ Issues / ❌ Failed]
- Issues: [List any issues]
- Evidence: [Link to validation report]

<!-- For detailed instrumentation validation checklists, see
     ../verification/verification-reference.md#monitoring-and-instrumentation-validation -->

---

## User Acceptance Testing

**Participants:** [Name, Role] for each participant

**UAT Results:**

| Scenario | Workflow   | Tester | Result      | Notes |
| -------- | ---------- | ------ | ----------- | ----- |
| UAT-001  | [Workflow] | [Name] | [Pass/Fail] |       |
| UAT-002  | [Workflow] | [Name] | [Pass/Fail] |       |

**Feedback:** [List feedback items with disposition]

**UAT Sign-Off:**

- **Status:** [✅ Approved / ⚠️ Conditions / ❌ Not Approved]
- Approver: [Name, Role]
- Date: [YYYY-MM-DD]
- Conditions: [If any]

---

## Defect Summary

- Total: [X] | Critical: [X] | High: [X] | Medium: [X] | Low: [X]
- All critical/high: [Fixed and verified]
- Deferred: [X defects — list with justification]

<!-- For defect tracking table template and severity definitions, see
     ../verification/verification-reference.md#defect-management -->

---

## Production Readiness

<!-- For structuring the go/no-go decision, use the
     Checkpoint Decision Template (checkpoint-decision-template.md) -->

**Overall:** [✅ Ready / ⚠️ Ready with conditions / ❌ Not Ready]

| Gate              | Status       | Notes |
| ----------------- | ------------ | ----- |
| Integration Tests | [✅/⚠️/❌]   |       |
| Functional Tests  | [✅/⚠️/❌]   |       |
| Performance Tests | [✅/⚠️/❌/⏸] |       |
| Security Tests    | [✅/⚠️/❌/⏸] |       |
| UAT               | [✅/⚠️/❌]   |       |
| Monitoring        | [✅/⚠️/❌]   |       |
| Defects           | [✅/⚠️/❌]   |       |

**Known issues being deployed:**

- [Issue: description, workaround, mitigation]

**Deployment risks:**

- [Risk: description, likelihood, impact, mitigation]

---

## Handoff to Deployment

**Deployment notes:**

- [Important info for deployment team]

---

## Sign-Off

**QA Lead:**

- Name: [Name]
- Date: YYYY-MM-DD
- Status: [✅ Approved / ⚠️ Conditions / ❌ Not approved]
- Comments:

**Technical Lead:**

- Name: [Name]
- Date: YYYY-MM-DD
- Status: [✅ Approved / ⚠️ Conditions / ❌ Not approved]
- Comments:

**Product Owner:**

- Name: [Name]
- Date: YYYY-MM-DD
- Status: [✅ Approved / ⚠️ Conditions / ❌ Not approved]
- Comments:

---

<!-- Template Last Updated: 2026-02-27 | Added in v0.6.0 -->

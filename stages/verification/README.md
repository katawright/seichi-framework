---
id: verification
inputs:
  - working-code
  - requirements-with-acceptance-criteria
  - test-strategy
  - implementation-brief
  - component-designs
outputs:
  - artifact: verification-brief
    template: templates/verification-brief.md
  - artifact: test-results
    embedded_in: verification-brief
  - artifact: defect-reports
  - artifact: uat-sign-off
  - artifact: performance-test-results
  - artifact: security-scan-results
    embedded_in: verification-brief
  - artifact: verified-code
  - artifact: production-readiness-assessment
    embedded_in: verification-brief
checkpoints:
  - type: review
    protocol: ci-validation-human-spot-check
    name: "Test Execution + Coverage Review"
    responsible_roles: [qa, appsec]
checklist: stages/verification/checklist.md
reference: stages/verification/reference.md
default_autonomy: ai-led
default_oversight_intensity: passive
working_location: source-code
session_log_template: templates/session-log.md
raci_roles: { R: [engineer, qa, appsec], A: [qa], C: [pm, architect], I: [pjm] }
---

# AI-Assisted SDLC: Verification Stage

## Overview

Practical guidance for validating that implemented increments work correctly and
meet business needs before deployment.

### Why Verification

Verification answers two critical questions:

1. **Verification:** Did we build it correctly? (Meets technical specifications)
2. **Validation:** Did we build the right thing? (Meets business needs)

This stage encompasses both — testing technical correctness AND validating
business value before deployment.

Verification **executes and refines** the test strategy planned during Increment
Design. The Increment Design stage identifies what to test, coverage targets,
and test approaches. Verification executes those tests, adapts based on
implementation realities, and validates acceptance criteria.

**Increment Design plans → Verification executes → Deployment deploys**

### Goals of This Guide

- Execute the test strategy planned in Increment Design to validate implemented
  increments
- Verify all acceptance criteria through comprehensive testing
- Obtain UAT approval from business stakeholders
- Confirm instrumentation and monitoring work correctly
- Assess production readiness and make the go/no-go decision
- Document test results and defect resolutions

### Key Principle

AI accelerates every testing activity; humans own the go/no-go decision.

### Starting Point

Working code from the Implementation stage with unit tests passing and coverage
meeting team threshold (default: 80% line coverage — see
[Implementation Checklist](../implementation/checklist.md) item 6 for the
default; override in the implementation brief for project-specific targets),
code review approvals,
[requirements with acceptance criteria](../../templates/requirements-brief.md),
[test strategy from Increment Design](../../templates/increment-design-brief.md#acceptance-testing),
[implementation brief](../../templates/implementation-brief.md) with notes, and
component designs from Increment Design for plan-vs-actual comparison. Check the
Implementation Brief's Requirements Implemented table for any acceptance
criteria modifications before planning test cases.

> Tests run in the **source code location**; the verification brief is stored in
> the **artifacts location**. See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

1. Read [**How AI Helps**](#how-ai-helps) to determine your AI autonomy tier
2. Read [**Right-Sizing Verification**](#right-sizing-verification) to match
   effort to project complexity
3. Execute the [**Verification Workflow**](#verification-workflow) — plan tests,
   execute tests, conduct UAT, assess readiness
4. Complete the [Verification Checklist](checklist.md) (60-90 second readiness
   review)
5. Complete the [Verification Brief](../../templates/verification-brief.md) with
   test results documented

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## How AI Helps

AI can assist with Verification at whatever autonomy tier your team is
comfortable with — from generating test cases to driving the entire testing
process.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../../guides/ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

| Human-Led                                | Collaborative                                         | AI-Led                                                          |
| ---------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| Engineer writes tests; AI suggests cases | AI drafts tests from ACs; engineer validates coverage | AI writes and iterates until CI passes; engineer reviews intent |

At the AI-Led tier, oversight intensity can be tuned from Active to Minimal —
see
[AI Assistance Scorecard: Oversight Intensity](../../guides/ai-assistance.md#oversight-intensity).
For detailed AI-Led patterns, see
[Stage Reference](reference.md#ai-led-patterns).

### AI Assistance Patterns

- **Test case generation:** Describe your acceptance criteria — AI generates
  comprehensive test cases covering happy paths, edge cases, and error scenarios
- **Coverage gap analysis:** AI reviews your test plan against requirements and
  flags untested acceptance criteria or missing test types
- **Test data creation:** AI generates realistic test data and fixtures from
  your data model, including edge-case values and boundary conditions
- **Checklist review:** AI walks through the verification checklist and flags
  gaps before the go/no-go decision

> **Required gates:** CI validation + human spot-check — Tests are
> self-verifying, so AI can iterate until objective gates pass; humans validate
> test quality and coverage intent.

For assistance level details, see the
[AI Assistance Scorecard](../../guides/ai-assistance.md).

---

## Right-Sizing Verification

Not every project needs a full test suite across all test types. Match your
Verification effort to your project's risk tier.

| Test Type               | Minimal                           | Standard                                   | Enterprise                                         |
| ----------------------- | --------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| **Integration tests**   | Smoke tests for critical paths    | Integration tests for key workflows        | Comprehensive integration coverage                 |
| **Functional tests**    | Manual testing against specs      | Automated functional tests, CI enforcement | Full automated suite with traceability to specs    |
| **UAT**                 | Informal stakeholder demo         | Structured UAT with acceptance criteria    | Formal UAT sign-off with documented results        |
| **Performance tests**   | None or basic load check          | Performance baseline, key scenario testing | Load, stress, and soak testing with SLO validation |
| **Security tests**      | Basic vulnerability awareness     | Dependency scanning, OWASP top 10 review   | Penetration testing, SAST/DAST, compliance checks  |
| **Accessibility tests** | Basic usability check             | WCAG conformance for key flows             | Full WCAG audit, assistive technology testing      |
| **Regression tests**    | Manual check of existing features | Automated regression suite in CI           | Comprehensive regression with risk-based selection |
| **Go/no-go decision**   | Informal team agreement           | Checklist-based go/no-go meeting           | Formal gate with stakeholder sign-off              |

Expand Verification only when needed:

- **Regulated / compliance-heavy:** Add formal test traceability, compliance
  verification, documented UAT sign-off
- **High availability / performance-critical:** Add load, stress, and soak
  testing with SLO validation
- **Security-sensitive:** Add penetration testing, SAST/DAST scanning,
  compliance checks
- **Accessibility requirements:** Add WCAG audit, assistive technology testing
- **Large user base or high-risk changes:** Add comprehensive regression suite,
  canary validation, extended UAT

Otherwise, keep Verification focused and move to Deployment.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

### CD Projects: Lightweight Verification

For CD projects, per-slice CI already validates each change before it reaches
production. The full 13-step verification workflow is redundant when every slice
passes automated tests at merge time. Instead, focus verification effort at
increment boundaries on four concerns that per-slice CI cannot cover:

| Concern               | What to check                                              |
| --------------------- | ---------------------------------------------------------- |
| Traceability matrix   | Every requirement has at least one passing test            |
| Goal alignment        | Increment outcomes align with success criteria             |
| Cross-cutting quality | Security scan summary, performance baseline, accessibility |
| Known gaps            | Deferred defects, skipped test types, tech debt introduced |

**CD verification workflow (4 steps replacing 13):**

1. Review CI results across all slices in the increment
2. Complete the four-concern summary above
3. Record in the verification brief (mark batch-only sections N/A)
4. Confirm no emergent cross-slice issues

**Using the verification brief template with CD:** Mark Phase 1 (Test Planning)
and Phase 2 (Test Execution) as "Satisfied by per-slice CI." Focus on the
Production Readiness and Defect Summary sections for increment-level concerns.

> **CD does not exempt verification types that cannot run per-slice.** UAT,
> performance/load testing, penetration testing, and accessibility audits still
> require dedicated effort — schedule these at increment boundaries even in CD
> projects.

For the full CD model, see
[Framework Guide: CD Workflow Adaptations](../../guides/framework.md#cd-workflow-adaptations).

---

## Verification Workflow

AI assists at every step; humans maintain ownership through review and approval
gates.

```
-- PHASE 1: TEST PLANNING --
   (builds on Increment Design stage test strategy)

 1. Review requirements and acceptance criteria
 2. Review test strategy from Increment Design stage
    (component-designs "Testing Strategy for This Increment")
 3. Refine test strategy based on implementation
    [Human approves strategy]
 4. Prepare test environment and data

-- PHASE 2: TEST EXECUTION --

 5. Execute integration tests [CI gate]
 6. Execute functional tests [Gate: all ACs]
 7. Execute performance tests [Gate: meets NFRs]
 8. Execute security tests [Gate: no critical vulns]
    (AppSec owns — see RACI matrix)
 9. Track and resolve defects
    [Return to Implementation if needed]

-- PHASE 3: ACCEPTANCE AND READINESS --

 10. Conduct UAT [Business stakeholder sign-off]
 11. Validate instrumentation and monitoring
 12. Assess production readiness [Go/no-go]
 13. Complete verification brief

HANDOFF TO DEPLOYMENT
```

**When verification fails:** If the go/no-go decision (step 12) results in
**no-go**, work returns to the Implementation stage for defect fixes. Once fixes
are complete, a **new verification cycle** begins — start a fresh brief from the
template (Cycle 2, Cycle 3, etc.) rather than overwriting the previous cycle's
brief. This preserves each cycle's results as a clean historical record and
makes it easy to see what changed between cycles. The new brief's Cycle Context
section links to the prior brief and summarizes what was fixed.

**Routing decision:** The Production Readiness field in the verification brief
determines the path:

| Production Readiness  | Route to       | Action                                                                       |
| --------------------- | -------------- | ---------------------------------------------------------------------------- |
| Ready                 | Deployment     | Hand off verified code, test results, UAT approval                           |
| Ready with conditions | Deployment     | Hand off with conditions documented in brief                                 |
| Not Ready             | Implementation | Publish brief with Rework Handoff section populated; notify engineering lead |

**Rework trigger artifact:** The completed verification brief with a Not Ready
decision and populated Rework Handoff section is the trigger artifact for the
Implementation rework cycle. Engineers should treat publication of this brief to
the artifacts location (e.g., `docs/briefs/verification-brief-inc1-cycle1.md`)
as the activation signal — QA notifies the engineering lead when the
verification brief is published.

**Rework briefs are delta-only:** When work returns to Implementation, the
rework brief documents only what changed — reference the prior cycle's brief for
unchanged context. See
[Agentic Workflow Guide: Rework Cycles](../../guides/agentic-workflow.md#rework-cycles)
for the full convention.

**Blockers and escalation:** When you encounter a cross-increment blocking
defect or an external dependency that prevents test completion, document it in
the verification brief Blockers section and flag for PjM review.

---

## Why These Verification Elements Matter

### Test Types

Unit tests are already done during Implementation; Verification focuses on
higher-level testing.

| Test Type     | Purpose                  | Key Question                         |
| ------------- | ------------------------ | ------------------------------------ |
| Integration   | Components work together | Do APIs, DB, and services connect?   |
| Functional    | Acceptance criteria met  | Does it do what was specified?       |
| UAT           | Business needs met       | Does it solve the business problem?  |
| Performance   | NFRs met                 | Is it fast and stable enough?        |
| Security      | No vulnerabilities       | Is it safe?                          |
| Accessibility | Usable by all            | Is it accessible?                    |
| Regression    | Nothing broke            | Did changes break existing features? |

> For detailed test strategies, best practices, and result templates for each
> test type, see the [Verification Reference](reference.md).

### Defect Management

Track defects by **severity** (technical impact: Critical → Low) and
**priority** (business urgency: P0 → P3).

**Key rules:**

- No critical or high-severity defects open at deployment
- Deferred defects must have justification and target version
- Fixed defects must be retested and verified
- Regular triage meetings to review and prioritize

> For severity definitions, defect lifecycle, triage process, and tracking
> templates, see
> [Verification Reference: Defect Management](reference.md#defect-management).

### Production Readiness

#### Go/No-Go Decision

> For structuring gate decisions, use the
> [Checkpoint Decision Template](../../templates/checkpoint-decision.md) with
> the **Review** type (Ready / Not Ready).

Complete the Production Readiness section of the Verification Brief as your
primary artifact. At Standard+ tiers, additionally complete the
[Checkpoint Decision Template](../../templates/checkpoint-decision.md) as a
separate formal decision record — it supplements the brief, not replaces it.

- **Go:** All critical gates passed, UAT approved, rollback plan exists
- **No-go:** Critical defects, UAT not approved, performance below NFRs
- **Conditional go:** Minor issues accepted with workarounds documented

> **Best practice for NO-GO decisions:** A no-go should include: (1) root cause
> of the failure, (2) exact components requiring modification, (3) specific test
> cases that must pass before the next cycle, and (4) estimated rework effort.
> This gives the Implementation team a clear, actionable scope rather than a
> vague "fix the issues" directive.

#### Readiness Requirements

- All test types executed with passing results
- 100% of acceptance criteria verified
- UAT approved by business stakeholders
- Monitoring and instrumentation verified
- Deployment artifacts prepared (code tagged, runbook created, rollback plan
  documented)

### Measurement Validation

Verification validates that measurement systems work correctly. See
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

**Verification activities:**

- Test logging and metrics collection
- Validate dashboards and monitoring
- Confirm alerts trigger correctly
- Verify instrumentation captures required data
- Test success criteria measurement mechanisms

### Additional Topics

The [Verification Reference](reference.md) covers these topics in depth:

- **Integration testing** — strategies, best practices, component pair testing
- **Functional testing** — test design strategies, traceability, BDD
- **User acceptance testing** — process, participants, sign-off
- **Performance testing** — load, stress, spike, soak testing with result
  templates
- **Security testing** — SAST/DAST, dependency scanning, vulnerability templates
- **Accessibility testing** — WCAG conformance, tools, result templates
- **Regression testing** — automated suites, risk-based selection
- **Test data management** — strategies, fixtures, synthetic data

---

## Stage Outputs

- **Verification Brief** — primary container document for this stage's outputs
  (see [template](../../templates/verification-brief.md))
- **Test Results** — comprehensive results across all test types
- **Defect Reports** — documented defects with severity, resolution, and retest
  status
- **UAT Sign-Off** — business stakeholder approval of acceptance criteria
- **Performance Test Results** — load, stress, and capacity test outcomes
- **Security Scan Results** — SAST/DAST findings and resolution status
- **Verified Code** — code confirmed ready for deployment
- **Production Readiness Assessment** — go/no-go decision with evidence and
  deployment readiness checklist (for Deployment stage)

> Verification continues the **measurement throughline** by validating that the
> instrumentation embedded during Implementation actually works — confirming
> that metrics, dashboards, and alerts will function correctly in production.
> See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> Verification continues the **learning throughline** by capturing what tests
> reveal about design assumptions — where expectations diverged from reality
> becomes input for the retrospective. See
> [Framework Guide: Learning Throughline](../../guides/framework.md#learning-throughline).

> Verification continues the **security throughline** by validating that
> security controls work correctly — from dependency scanning through
> penetration testing, scaled by project risk tier. See
> [Security Guide](../../guides/security.md).

**Handoff:** On **go** or **conditional go**, Deployment stage receives verified
code, test results, and UAT approval. On **no-go**, work returns to
Implementation for defect fixes, then a new verification cycle begins with a
fresh brief. Distribute checkpoint or gate decision artifacts to all Informed
roles per the
[Information Protocol](../../guides/roles.md#information-protocol).

---

## When to Revisit Verification

**During current increment:**

- New defects from UAT or performance testing
- Requirements or design changes
- Regression in previously passing tests

**After deployment:**

- Production incidents reveal test gaps
- Real-world usage uncovers untested scenarios
- Monitoring reveals instrumentation issues

**For future iterations:**

- Update test strategy based on production learnings
- Expand coverage for high-risk areas
- Improve test data realism

> **Mid-stage discovery?** If p95 latency is 10x the NFR target and no
> optimization will fix it, or tests reveal a fundamental design flaw, see the
> [Mid-Stage Discovery](../../guides/framework.md#mid-stage-discovery) decision
> tree to classify rework by severity and determine the right response.

---

## Notes

**Last Updated:** 2026-03-25

Added to framework in v0.6.0.

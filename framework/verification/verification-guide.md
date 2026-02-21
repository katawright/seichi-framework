# Verification Guide

> Stage-specific guidance for Verification. For cross-cutting framework
> concepts, see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Execute the test strategy planned in Increment Design stage to
validate that implemented increments work correctly through comprehensive
testing and business acceptance before deployment.

**Primary roles:** QA Engineers, Engineers

**Execution pattern:** Iterative (per increment)

**Key inputs:** Working code, unit test results, code review approvals,
implementation brief

**Key outputs:** Verified code, test results, UAT approval, production readiness
assessment, deployment checklist

**What good looks like:**

- All acceptance criteria verified with tests
- Integration, functional, performance, and security tests pass
- UAT approved by business stakeholders
- No critical or high-severity defects
- Instrumentation verified working
- Production readiness confirmed

**Common pitfalls:**

- Testing only happy paths
- Skipping performance testing until staging
- UAT becomes feature request session
- No traceability from tests to acceptance criteria
- Missing security testing
- Insufficient test data realism

**Checkpoint:** Quality Checkpoints + Deployment Approval — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** High assistance + CI gates — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## What Is Verification?

Verification answers two critical questions:

1. **Verification:** Did we build it correctly? (Meets technical specifications)
2. **Validation:** Did we build the right thing? (Meets business needs)

This stage encompasses both — testing technical correctness AND validating
business value before deployment.

**Relationship to Increment Design Stage:**

Verification **executes and refines** the test strategy planned during Increment
Design stage. The Increment Design stage identifies what to test, coverage
targets, and test approaches. Verification executes those tests, adapts based on
implementation realities, and validates acceptance criteria.

**Increment Design plans → Verification executes → Deployment deploys**

---

## AI Assistance

> **Assistance level:**
> [High AI assistance with CI gates](../framework-ai-assistance.md#level-5-high-ai-assistance-with-ci-gates)
> — Tests are self-verifying, so AI can iterate until objective gates pass;
> humans validate test quality and coverage intent.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. The assistance level for
this stage
([Level 5](../framework-ai-assistance.md#level-5-high-ai-assistance-with-ci-gates))
sets the ceiling; this spectrum adjusts who drives within that ceiling. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../framework-ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

**At a glance:**

| Human-Led                                | Collaborative                                         | AI-Led                                                          |
| ---------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| Engineer writes tests; AI suggests cases | AI drafts tests from ACs; engineer validates coverage | AI writes and iterates until CI passes; engineer reviews intent |

**By activity:**

| Activity          | Human-Led                                   | Collaborative                                         | AI-Led                                                                         |
| ----------------- | ------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Test strategy** | Engineer plans; AI suggests additions       | AI drafts strategy from ACs; engineer refines         | AI analyzes code and requirements to generate strategy; engineer validates     |
| **Test writing**  | Engineer writes tests; AI suggests cases    | AI drafts tests; engineer reviews coverage            | AI writes and iterates until CI passes                                         |
| **Test data**     | Engineer creates data; AI generates samples | AI generates realistic test data; engineer validates  | AI manages test data lifecycle; engineer spot-checks                           |
| **Defect triage** | Engineer analyzes; AI surfaces patterns     | AI classifies and suggests priority; engineer decides | AI identifies patterns across defects and triages; engineer validates severity |
| **UAT support**   | Engineer runs UAT; AI documents results     | AI drafts UAT scripts; engineer facilitates           | AI generates UAT scenarios; engineer facilitates with stakeholders             |
| **Go/no-go**      | Engineer compiles evidence; AI summarizes   | AI drafts readiness report; engineer decides          | AI compiles evidence and proactively flags risks; engineer decides             |

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
> [Right-Sizing Guide](../right-sizing-guide.md).

---

## Verification Workflow

```
-- PHASE 1: TEST PLANNING --
   (builds on Increment Design stage test strategy)

 1. Review requirements and acceptance criteria
 2. Review test strategy from Increment Design stage
    (increment-design-brief section 5)
 3. Refine test strategy based on implementation
    [Human approves strategy]
 4. Prepare test environment and data

-- PHASE 2: TEST EXECUTION --

 5. Execute integration tests [CI gate]
 6. Execute functional tests [Gate: all ACs]
 7. Execute performance tests [Gate: meets NFRs]
 8. Execute security tests [Gate: no critical vulns]
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

---

## Verification Guidance

### Test Types Overview

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
> test type, see the [Verification Reference](verification-reference.md).

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
> [Verification Reference: Defect Management](verification-reference.md#defect-management).

### Production Readiness

#### Go/No-Go Decision

> For structuring gate decisions, use the
> [Gate Decision Template](../gate-decision-template.md).

- **Go:** All critical gates passed, UAT approved, rollback plan exists
- **No-go:** Critical defects, UAT not approved, performance below NFRs
- **Conditional go:** Minor issues accepted with workarounds documented

#### Readiness Requirements

- All test types executed with passing results
- 100% of acceptance criteria verified
- UAT approved by business stakeholders
- Monitoring and instrumentation verified
- Deployment artifacts prepared (code tagged, runbook created, rollback plan
  documented)

> For quality gate status template and deployment prerequisites, see
> [Verification Reference: Production Readiness](verification-reference.md#production-readiness-details).

### Measurement Validation

Verification validates that measurement systems work correctly. See
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Verification activities:**

- Test logging and metrics collection
- Validate dashboards and monitoring
- Confirm alerts trigger correctly
- Verify instrumentation captures required data
- Test success criteria measurement mechanisms

---

## When to Revisit Verification

**During current iteration:**

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

---

## Related Documents

- [Verification Brief Template](verification-brief-template.md)
- [Verification Checklist](verification-checklist.md)
- [Verification Reference](verification-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-20

Added to framework in v0.6.0.

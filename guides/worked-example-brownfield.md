# Worked Example: Brownfield Adoption

> **New here?** See [Framework Overview](OVERVIEW.md#worked-example-brownfield)
> for what this example is, why it exists, and how to use it. This file is the
> operational reference.

## Key Principle

Preparation is bounded, not open-ended. This example shows a team that prepares
_enough_ to start AI-assisted feature work in one area, then expands — not a
team that perfects the entire codebase before writing a line of new code.

---

## Scenario

**Project:** Add a customer self-service portal to an existing B2B SaaS
platform.

**System context:**

- 5-year-old monolithic .NET application, ~120K lines of code
- PostgreSQL database with 30+ stored procedures containing business logic
- Manual deployment process (scripted but not CI/CD)
- Some integration tests, no unit test culture
- Architecture documented in a wiki last updated 18 months ago
- 4-person engineering team, one of whom has been on the project since inception

**Framework tier:** Standard (production application, moderate risk)

**Why this scenario:** It represents the most common brownfield situation — not
a pristine codebase (T5) and not a disaster (T0/T1), but a typical mid-range
system where AI can help _if_ the team prepares the right areas first.

---

## Readiness Assessment

The tech lead scores the readiness rubric during Initiation (quick pass, ~15
minutes). See the [Readiness Rubric](brownfield-readiness.md#readiness-rubric)
for scoring definitions.

### Quick-Pass Scores

| Axis            | Score | Rationale                                                                                     |
| --------------- | ----: | --------------------------------------------------------------------------------------------- |
| Verifiability   |     2 | Integration tests exist for payment flows; no unit tests; CI runs tests but is flaky          |
| Modularity      |     2 | Service layer exists but controller logic leaks into services; no clear bounded contexts      |
| Discoverability |     1 | Wiki is 18 months stale; only the original developer knows the stored procedure logic         |
| Transparency    |     1 | 30+ stored procedures with business rules; no documentation of what they do or when they fire |
| Consistency     |     1 | No documented conventions; 5 years of organic growth; patterns vary by area and era           |

**Total: 7 → Tier T2 (Challenging)**

> **Supplementary evaluation:** Deployability 1 (scripted deploy but manual
> steps remain; no rollback tested). Observability 2 (application logs exist;
> basic health check endpoint; no structured alerting).

### Quick-Pass Implications

Captured in the
[Initiation Brief](../templates/initiation-brief.md#brownfield-readiness--quick-pass-if-applicable):

- **AI operating mode:** T2 — the agent is advisory; assists with analysis,
  documentation, test generation, and review but does not drive production code
  at scale
- **Preparation estimate:** 2 preparation increments (4 weeks) before
  AI-assisted feature work
- **Gate 1 implication:** Preparation cost is part of the investment decision —
  stakeholders approve both the preparation and the feature work

### Gate 1 Decision

Using the [Gate Decision Template](../templates/gate-decision.md):

```markdown
## Decision: Proceed with conditions

- **Rationale:** Self-service portal has clear ROI (reduce support ticket volume
  by 40%). Preparation cost (4 weeks) is acceptable given 6-month project
  timeline. Preparation outputs (tests, documentation) have standalone value
  even if the portal project is later canceled.
- **Conditions:** each is a tracked carry-forward obligation, re-checked at
  every later stage entry:

  | Condition                                                                                      | Owner | Discharged at    | Status |
  | ---------------------------------------------------------------------------------------------- | ----- | ---------------- | ------ |
  | Complete at least one preparation increment before committing to the feature delivery timeline | PjM   | Increment 0 exit | Open   |
  | Re-assess readiness before feature work begins                                                 | Arch  | Increment 0 exit | Open   |
```

---

## Foundational Stages (Abbreviated)

After Gate 1, the team works through Requirements and System Design. These
follow the same patterns as the [greenfield worked example](worked-example.md)
with two brownfield-specific additions:

### Existing Artifact Substitutes

The team already has artifacts that partially satisfy stage requirements:

| Framework Artifact    | Existing Substitute                      | Gap                                               |
| --------------------- | ---------------------------------------- | ------------------------------------------------- |
| System design brief   | Wiki architecture page (18 months stale) | Needs update; stored procedure logic undocumented |
| Requirements document | Jira epics + product specs in Confluence | Needs consolidation; NFRs not captured            |
| Deployment brief      | Deploy script + tribal knowledge         | Needs documentation; rollback not tested          |

**Key insight:** You don't recreate these from scratch. Update what exists, fill
the gaps, and link the existing artifacts into the framework's traceability
chain. The Initiation Brief references Jira epic IDs; the System Design Brief
links to the updated wiki architecture page.

### System Design: Detailed Readiness Pass

During System Design, the team re-scores with evidence (CI logs, test reports,
codebase analysis). The detailed scores confirm T2 with one adjustment:

- Modularity moves from 2 → 2 (confirmed — service layer boundaries exist but
  leak)
- Transparency stays at 1 (confirmed — 30 stored procedures, 12 contain business
  rules)
- Consistency stays at 1 (confirmed — 3 different data access patterns across
  the service layer; no documented conventions)

**Total: 7 (confirmed T2)**

The team scopes preparation to the **customer account management** area of the
codebase — the bounded context where the self-service portal will integrate.
This is [bounded preparation](brownfield-approach.md#bounded-preparation):
prepare the target area, not the entire system.

---

## Discovery Increment (Increment 0)

The discovery increment follows the framework's iterative cycle (Increment
Design → Implementation → Verification → Deployment) but the "features" are
preparation outputs. See the
[Brownfield Enablement Guide](brownfield-enablement.md) for the full preparation
approach.

### Increment Design Brief (Preparation)

```markdown
## Increment 0: Customer Account Area Preparation

**Goal:** Raise the customer account area from T2 to T3+ so AI-assisted feature
work can begin there.

**Target axes (lowest scores):**

1. Transparency (1→2+): Document the 12 stored procedures containing business
   rules in the customer account domain
2. Discoverability (1→2+): Update architecture documentation for the customer
   account area; create AGENTS.md
3. Consistency (1→2+): Document canonical patterns in AGENTS.md; establish
   coding conventions for the target area
4. Verifiability (2→3): Add unit tests for customer account service layer

**Supplementary preparation:**

- Deployability (1→2+): Document deploy process; add rollback capability

**Deliverables:**

- Stored procedure documentation (what each does, when it fires, business rules
  it enforces)
- Updated architecture diagram for customer account bounded context
- AGENTS.md with project conventions, canonical patterns, and constraints
- Deploy runbook with rollback procedure tested in staging
- 15+ unit tests covering customer account service layer
```

### Implementation Highlights

The team uses AI in T2 advisory mode during preparation:

- **An agent drafts architecture documentation** from code analysis — the
  original developer reviews and corrects. The agent got the data flow 80% right
  but missed two stored procedures that fire on customer status changes.
- **AI generates unit test scaffolding** for the service layer — engineers fill
  in assertions and fix incorrect assumptions about business rules.
- **AI documents stored procedures** by analyzing SQL — the team validates
  against actual behavior. Three procedures had undocumented side effects (audit
  log writes) that AI couldn't infer from the SQL alone.
- **Engineers write the deploy runbook** manually — this is operational
  knowledge that requires human verification. AI helps format and structure the
  document.

### Preparation Outputs

| Deliverable                         | Status   | Notes                                                     |
| ----------------------------------- | -------- | --------------------------------------------------------- |
| Stored procedure documentation      | Complete | 12 procedures documented; 3 had undocumented side effects |
| Architecture diagram (account area) | Complete | Updated with data flows, integration points               |
| AGENTS.md                           | Complete | Conventions, tech stack, constraints                      |
| Deploy runbook with rollback        | Complete | Rollback tested in staging successfully                   |
| Unit tests (account service layer)  | Complete | 18 tests added; 94% line coverage for target area         |

---

## Exit Checkpoint

After the preparation increment, the team runs an exit checkpoint per the
[Exit Checkpoint Protocol](brownfield-approach.md#exit-checkpoint-protocol).

### Re-Assessment (Target Area Only)

The team re-scores the **customer account area** (not the full system) using the
[Re-Assessment Protocol](brownfield-readiness.md#readiness-re-assessment-protocol):

| Axis            | Before | After | Change | Evidence                                                                |
| --------------- | -----: | ----: | -----: | ----------------------------------------------------------------------- |
| Verifiability   |      2 |     3 |     +1 | 18 unit tests + existing integration tests; CI stabilized               |
| Modularity      |      2 |     2 |      0 | Service layer boundaries unchanged; below T3 threshold                  |
| Discoverability |      1 |     3 |     +2 | AGENTS.md, updated architecture docs, procedure docs                    |
| Transparency    |      1 |     2 |     +1 | 12 stored procedures documented with business rules                     |
| Consistency     |      1 |     2 |     +1 | Conventions in AGENTS.md; canonical data access pattern for target area |

**Target area total: 12 → Tier T3 (Constrained)**

> **Supplementary:** Deployability improved 1→2 (documented runbook; rollback
> tested; still manual). Observability unchanged at 2.

### Exit Decision

Using the
[Preparation Exit Decision Template](../templates/brownfield-preparation-decision.md):

**Decision: Ready** — the exit checkpoint is a Review, so its outcome is drawn
from the Review set.

**Recommendation: Conditional Go** — the preparation-specific next step this
decision routes to.

- **Thresholds partially met:** Verifiability and Modularity 3+, rest 2+ (T3
  target) — but Modularity at 2 falls short of the 3+ requirement
- **Remaining gaps:** Modularity at 2 (service layer boundaries leak) —
  mitigated by scoping AI-generated code to the customer account service layer
  where boundaries are clearest
- **Supplementary note:** Deployability at 2 (manual deploy) — mitigated by
  deploy runbook and tested rollback procedure
- **AI operating mode for feature work:** T3 — an agent writes production code
  in the customer account area (well-covered); the agent is advisory for changes
  touching other areas
- **Condition:** First feature increment uses
  [shadow mode](../stages/deployment/README.md#shadow-mode-and-gradual-rollout)
  for deployment validation before full production exposure

---

## Feature Increment (Increment 1)

With the exit checkpoint passed, the team begins AI-assisted feature work in the
customer account area under T3 operating constraints.

### Increment Design Brief (Feature)

```markdown
## Increment 1: Customer Profile Self-Service

**Goal:** Allow customers to view and update their own profile information
(name, email, phone, notification preferences) through a self-service portal.

**Traceability:** FR-1 from Requirements (linked to Jira PORTAL-101)

**Brownfield constraints:**

- Customer data is read/written by 3 stored procedures (sp_get_customer,
  sp_update_customer, sp_customer_audit) — all documented in Increment 0
- Existing API authentication uses JWT + role-based access — new endpoints must
  follow this pattern (documented in AGENTS.md)
- Schema changes must use migration scripts (new convention from Increment 0)

**AI operating mode:** T3 — an agent writes production code in the customer
account service layer; engineer reviews all changes against stored procedure
documentation to catch conflicts.
```

### Implementation Under T3 Constraints

AI-assisted development with brownfield guardrails:

- **AI generates the API endpoint** for profile updates — the engineer
  cross-references against `sp_update_customer` documentation to verify that the
  application-layer validation matches the stored procedure's constraints. AI
  missed a phone number format validation that the stored procedure enforces.
- **AI generates unit and integration tests** — using the test patterns
  established in Increment 0. The tests cover the new endpoint plus regression
  tests verifying that existing stored procedure behavior is unchanged.
- **An agent drafts the migration script** — engineer reviews for rollback
  safety and verifies it follows the new migration conventions from the deploy
  runbook.

### Shadow Mode Deployment

Per the exit checkpoint condition, the team deploys using shadow mode:

1. **Deploy to staging** — full test suite passes (including new and existing
   integration tests)
2. **Shadow mode in production** — new self-service endpoints receive mirrored
   production traffic; responses are logged but not served to users
3. **Validation period (48 hours)** — team compares shadow responses against
   expected behavior, checks that stored procedures fire correctly, monitors for
   unexpected audit log entries
4. **Promote to live** — shadow mode disabled; self-service endpoints serve
   production traffic

```markdown
## Post-Shadow Validation

**Shadow duration:** 48 hours **Traffic mirrored:** 1,247 profile view requests,
89 profile update requests **Discrepancies found:** 0 **Stored procedure
behavior:** All 3 procedures fired as documented **Decision:** Promote to live
production traffic
```

### Deployment Brief (Excerpt)

```markdown
## Deployment: Increment 1 — Customer Profile Self-Service

**Traceability:** FR-1 → Increment 1 → PRs #42, #44, #45 **Deploy method:**
Manual (per runbook v1.1) with shadow mode validation **Rollback:** Tested —
revert to previous build + rollback migration script

**Brownfield-specific checks:**

- [x] Stored procedure behavior verified against documentation
- [x] Shadow mode validation passed (48-hour window)
- [x] Existing API endpoints unaffected (regression suite green)
- [x] Audit logging confirmed for new endpoints
```

---

## Traceability Chain: Brownfield vs. Greenfield

The brownfield traceability chain includes preparation artifacts that don't
exist in the
[greenfield example](worked-example.md#the-full-traceability-chain):

```
Initiation
  Goal G-1: Customers resolve routine account tasks without contacting support
  SC-01: Support ticket volume reduced 40% (self-service deflection)
  Readiness: T2 (Challenging) — preparation required
    ↓
Gate 1: Proceed (preparation cost accepted)
    ↓
Requirements + System Design
  FR-1: "Customer profile self-service"
  Detailed readiness: T2 confirmed
  Preparation scope: customer account area
    ↓
Increment 0 (Discovery)                          ← brownfield-only
  Outputs: tests, docs, AGENTS.md, deploy runbook
    ↓
Exit Checkpoint                                   ← brownfield-only
  Re-assessment: T2 → T3 (target area)
  Decision: Ready — Recommendation: Conditional Go (shadow mode required)
    ↓
Increment 1 (Feature)
  FR-1: Profile self-service
  Agent mode: T3 (constrained to prepared area)
  Shadow mode deployment                          ← brownfield-specific
    ↓
Closure
  Dev→ops handoff; production ownership transferred; project closed
    ↓
Operations (ongoing — see operations.md)
  Observe: SC-01 — support ticket volume vs. 40% reduction target
  Note: Shadow mode can be re-enabled for future increments
```

**Key difference from greenfield:** Brownfield projects add preparation
increments and exit checkpoints before feature work begins. The preparation
artifacts (stored procedure docs, AGENTS.md, deploy runbook) become inputs to
feature increments — they're not throwaway work.

---

## Lessons from This Example

1. **Bounded preparation works.** The team prepared one area (customer
   accounts), not the entire 120K-line codebase. Future increments touching
   other areas will need their own preparation pass.

2. **AI is useful during preparation, not just feature work.** AI drafted 80% of
   the architecture documentation and generated test scaffolding — preparation
   went faster than it would have without AI, even in T2 advisory mode.

3. **Existing artifacts are acceptable substitutes.** The team didn't recreate a
   system design brief from scratch — they updated their wiki and linked it into
   the traceability chain. The framework adapts to what exists.

4. **Shadow mode bridges the confidence gap.** The team wasn't confident that
   AI-assisted code changes would interact correctly with stored procedures.
   Shadow mode provided production-level validation without user impact.

5. **Exit checkpoints prevent preparation drift.** The checkpoint after
   Increment 0 forced a concrete go/no-go decision. Without it, preparation
   could have expanded to "just one more thing" indefinitely.

---

## Notes

**Last Updated:** 2026-07-18

Added to framework in v0.40.0.

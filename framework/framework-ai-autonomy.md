# AI Autonomy Scorecard by SDLC Stage

**Last Updated:** 2026-02-15

## Overview

This scorecard provides operational guidance for determining appropriate AI
autonomy levels across the 7 SDLC stages. It evaluates each stage across four
critical dimensions to help teams make informed decisions about where AI can
work more independently and where human oversight is essential.

**Purpose:**

- Define clear boundaries for AI autonomy at each stage
- Help engineers understand where humans maintain control
- Provide practical guidance for integrating AI safely and effectively
- Balance productivity gains with appropriate risk management

**Key principle:** AI autonomy levels are bounded and controlled with explicit
human gates. "Autonomy" in this context means how independently AI can operate
before requiring human approval—not uncontrolled or unsupervised operation.

**How to use this scorecard:**

1. Identify which SDLC stage you're working in
2. Review the autonomy recommendation and "best real work uses"
3. Consult the autonomy level definitions for implementation details
4. Adjust recommendations based on your organization's risk tolerance

---

## Evaluation Dimensions

Each stage is evaluated across four dimensions:

### 1. Fit for AI Assistance

How naturally AI helps produce useful work in this stage. Considers the type of
work, clarity of requirements, and availability of patterns AI can leverage.

- **Very High:** AI excels at this type of work
- **High:** AI produces strong results with proper guidance
- **Medium:** AI helps but requires significant human direction
- **Low:** AI provides minimal value

### 2. Verifiability

How easily you can _prove_ the AI output is correct through objective checks,
tests, or validation.

- **Very High:** Machine-checkable (tests, builds, static analysis)
- **High:** Objective validation possible (smoke tests, health checks)
- **Medium:** Requires human judgment but has clear criteria
- **Low:** Subjective evaluation required

### 3. Risk if Wrong

Impact and blast radius if AI produces incorrect output.

- **Very High:** Production outages, data loss, security breaches
- **High:** Incorrect requirements, flawed architecture, missed business goals
- **Medium:** Rework needed, delays, quality issues
- **Low:** Minor corrections, easily reversible

### 4. Recommended Autonomy Level

How far the AI agent can go before a human decision gate. See
[AI Autonomy Levels](#ai-autonomy-levels-definitions) for detailed definitions.

---

## Scorecard by Stage

| #   | SDLC Stage         | Fit for AI | Verifiability | Risk if Wrong | Recommended Autonomy                  | Best "Real Work" Uses                                                                                                         |
| --- | ------------------ | ---------- | ------------- | ------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Initiation**     | Medium     | Low–Medium    | Medium        | **AI assist only**                    | Draft assumptions/risks, options/tradeoffs, discovery plan, rough sizing ranges, success criteria templates                   |
| 2   | **Requirements**   | High       | Medium        | High          | **AI agent with human gate**          | Convert goals → stories + acceptance criteria, ambiguity detection, edge-case enumeration, NFR prompts, traceability matrices |
| 3   | **Design**         | High       | Medium        | High          | **AI agent with strong gates**        | Propose architectures, interfaces, data models, slice plans, threat-model checklists, ADR drafts                              |
| 4   | **Implementation** | Very High  | High          | Medium        | **High AI autonomy in bounded scope** | Generate/refactor code, migrations, infra-as-code, glue code; keep PR-sized slices                                            |
| 5   | **Verification**   | Very High  | Very High     | Medium        | **High AI autonomy with CI gates**    | Generate tests, test matrices, synthetic data, contract tests; expand coverage from AC/NFRs                                   |
| 6   | **Deployment**     | Medium     | High          | Very High     | **AI assist only + runbook gates**    | Draft release steps, canary/rollback plans, release notes; humans execute/approve                                             |
| 7   | **Support**        | High       | Medium        | High          | **AI agent with human gate**          | Triage/log clustering, incident comms drafts, runbooks, dependency update plans, bug minimization                             |

### Stage-Specific Notes

**Design (Stage 3):** Has dual execution patterns. Initial architecture
(foundational) requires strong gates with architecture board review.
Per-increment detailed design (iterative) may use lighter gates as patterns
become established.

**Implementation (Stage 4):** Autonomy should be bounded by scope (single
service/module), constraints (no auth changes, feature-flagged), and automated
gates (tests, linting, security scans).

**Verification (Stage 5):** High autonomy appropriate because tests are
self-verifying. AI can iterate until tests pass, but humans validate test
quality and coverage.

**Deployment (Stage 6):** Despite high verifiability, the very high risk demands
AI assist only. Production actions require human judgment about timing, traffic,
and rollback decisions.

---

## AI Autonomy Levels (Definitions)

These levels describe **how far an AI agent can go without a human decision
gate**. They're operational—you can map them to workflow steps, branch
protections, and permissions.

### Level 1: AI Assist Only

**What it means:**

- AI produces drafts, analyses, checklists, options, or suggested plans
- A human explicitly decides what to adopt and owns correctness
- AI cannot take actions that change project state

**Allowed outputs:**

- Text artifacts (briefs, risks, requirements drafts, design options)
- Proposed milestones/slices
- Suggested commands/scripts (not executed)
- Questions to ask stakeholders

**Not allowed without human action:**

- Committing code or merging PRs
- Executing deployments or destructive commands
- Making final scope/priority decisions

**Typical gate:**

- "Engineer/PM approves content and assumptions"

**When to use:**

- Initiation stage (uncertain requirements, strategic decisions)
- Deployment planning (high-risk production actions)
- Any work requiring significant business judgment

---

### Level 2: AI Agent with Human Gate

**What it means:**

- AI agent can do substantial work end-to-end in a bounded area
- A human must approve before output becomes "real" (merged, shipped, or relied
  on operationally)
- AI handles the iteration, human provides direction and approval

**Allowed outputs:**

- Requirements + acceptance criteria drafts ready for review
- Design proposals + slice plans
- Code changes proposed as PRs (branch-only, not merged)
- Test suites added/updated
- Runbooks/alerts/dashboards as proposals

**Required human gates:**

- Approve requirements/design decisions
- Approve PR merge
- Approve release readiness or change management step

**Typical gate:**

- "Human reviews diffs + evidence (tests, logs) and approves"

**When to use:**

- Requirements stage (convert business goals to technical specs)
- Support stage (incident response, maintenance planning)
- Any work where correctness requires domain expertise

---

### Level 3: AI Agent with Strong Gates

**What it means:**

- Same as "AI agent with human gate," but the gate is **stricter** because the
  blast radius is larger
- Used for architecture, security, data, compliance, and cross-cutting concerns
- Multiple reviewers or specialized review boards required

**Extra constraints (common):**

- Mandatory design review (architecture council / tech lead signoff)
- Security review for auth/data flow changes
- Explicit rollback plan and migration review
- Two-person approval for certain changes

**Allowed outputs:**

- Architecture diagrams, ADR drafts, threat model drafts
- API/data model proposals
- Migration strategies and rollout plans
- Code changes with architectural impact

**Typical gate:**

- "Tech lead + security/architecture signoff required"

**When to use:**

- Design stage (especially foundational architecture)
- Any changes affecting security, data integrity, or system reliability
- Cross-service interfaces and contracts

---

### Level 4: High AI Autonomy in Bounded Scope

**What it means:**

- AI agent can implement and iterate quickly within pre-defined boundaries
- Can open PRs with minimal back-and-forth
- Humans still gate merge, but AI is trusted to drive most of the implementation
  loop

**Boundaries examples:**

- Limited to a single service/module
- No new external dependencies
- No auth model changes
- No schema changes (or only additive, reviewed separately)
- Feature flag required for runtime changes

**Allowed outputs:**

- Full slice implementation on a branch
- Refactors, cleanup, dependency bumps (within policy)
- Routine test additions
- Documentation updates

**Typical gate:**

- "Human reviews PR + CI results, then merges"

**When to use:**

- Implementation stage (well-defined features in isolated modules)
- Refactoring within established patterns
- Code generation from clear specifications

---

### Level 5: High AI Autonomy with CI Gates

**What it means:**

- AI agent is allowed to keep iterating until **objective gates pass** (CI,
  tests, linters, coverage thresholds, security scans)
- Human review focuses on intent and risk, not line-by-line mechanics
- Automation provides the primary quality gate

**Required automated gates (examples):**

- Build + unit/integration tests
- Lint/format checks
- SAST + dependency/license scanning
- Code coverage thresholds
- Performance checks (where applicable)

**Allowed outputs:**

- Code that passes all automated checks
- Test suites with measurable coverage improvements
- Refactors validated by test suite

**Typical gate:**

- "CI green + human spot-check + merge"

**When to use:**

- Verification stage (test generation and expansion)
- Implementation with strong CI pipeline
- Test-driven development workflows

---

### Level 6: AI Assist Only + Runbook Gates (Production-Sensitive)

**What it means:**

- AI can draft the plan, checklists, and scripts
- **Humans execute production actions**, following a runbook and approval
  process
- AI provides guidance but cannot take production-impacting actions

**Why this exists:**

- Production actions have high blast radius
- Requires real-time context (incident state, traffic levels, stakeholder comms)
- Timing and rollback decisions require human judgment

**Allowed outputs:**

- Deployment runbooks and checklists
- Rollback procedures
- Production change scripts (reviewed, not executed)
- Release notes and communication templates

**Typical gate:**

- "Change approval + on-call executes steps; AI provides guidance"

**When to use:**

- Deployment stage (production releases)
- Incident response (production fixes)
- Any action directly affecting live systems

---

## Operational Guidance

### Rule of Thumb

**Increase AI autonomy as verifiability increases; tighten human gates as risk
increases.**

This simple rule captures the core tradeoff:

- **High verifiability** (tests, builds) → AI can iterate independently
- **High risk** (production, architecture, security) → Require stricter human
  gates

### Quick Mapping: When to Use Which Level

| Scenario                                    | Recommended Level                     | Rationale                                      |
| ------------------------------------------- | ------------------------------------- | ---------------------------------------------- |
| High uncertainty / low verifiability        | **AI assist only**                    | Human judgment required                        |
| Medium verifiability / high business impact | **AI agent with human gate**          | Substantial work, human validates correctness  |
| Architecture/security/data/compliance       | **AI agent with strong gates**        | Large blast radius requires specialized review |
| Code + tests in constrained module          | **High AI autonomy in bounded scope** | Clear boundaries enable fast iteration         |
| Test generation with measurable outcomes    | **High AI autonomy with CI gates**    | Objective validation enables autonomy          |
| Anything production-executed                | **AI assist only + runbook gates**    | High risk demands human execution              |

### Adapting to Your Organization

**Increase autonomy when:**

- Team has strong CI/CD pipelines and automated testing
- Organization has high risk tolerance for development environments
- Engineers are comfortable with AI tooling
- Rollback procedures are well-established

**Decrease autonomy when:**

- Working in regulated industries (finance, healthcare, defense)
- Team is new to AI-assisted development
- Legacy systems with limited test coverage
- Production incidents would have severe business impact

### Practical Takeaway

**AI is strongest where outputs are machine-checkable:** implementation

- testing. It's still highly useful in requirements/design/support, but you need
  explicit human gates because correctness is less objectively verifiable and
  impact can be high.

Focus your AI adoption efforts on stages with high verifiability first
(Implementation, Verification), then expand to other stages as your team builds
confidence and establishes effective gate processes.

---

## Integration with Framework

This scorecard complements the [SDLC Stages](framework-stages.md) document:

- **framework-stages.md** defines _what_ to do at each stage (inputs,
  activities, outputs, criteria)
- **This scorecard** defines _how much autonomy_ AI can have when assisting with
  those activities

**Workflow integration:**

1. Identify your current stage from [framework-stages.md](framework-stages.md)
2. Review this scorecard for autonomy recommendations
3. Use the [Manual Process Guide](framework-manual-process.md) to engage your
   AI assistant with the framework
4. Use stage-specific artifacts (checklists, briefs, guides) from stage
   directories
5. Implement appropriate human gates based on autonomy level
6. Validate outputs according to stage exit criteria

**For AI assistance:** Use the Manual Process Guide to work with your AI
assistant through each stage. Stage guides include example questions and
explorations that respect the autonomy levels defined in this scorecard.

---

## Notes

Added to framework in v0.9.0.

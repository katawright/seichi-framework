# AI Assistance Scorecard

## Overview

This scorecard provides operational guidance for determining appropriate AI
assistance levels across the 8 SDLC stages. It evaluates each stage across four
critical dimensions to help teams make informed decisions about where AI can
work more independently and where human oversight is essential.

**Purpose:**

- Define clear boundaries for AI assistance at each stage
- Help engineers understand where humans maintain control
- Provide practical guidance for integrating AI safely and effectively
- Balance productivity gains with appropriate risk management

**Key principle:** AI assistance levels are bounded and controlled with explicit
human gates. "Assistance" in this context means how independently AI can operate
before requiring human approval—not uncontrolled or unsupervised operation.

**How to use this scorecard:**

1. Identify which SDLC stage you're working in
2. Review the assistance recommendation and "best real work uses"
3. Consult the assistance level definitions for implementation details
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

### 4. Recommended Assistance Level

How far the AI agent can go before a human decision gate. See
[AI Assistance Levels](#ai-assistance-levels-definitions) for detailed
definitions.

---

## Scorecard by Stage

| #   | SDLC Stage           | Fit for AI | Verifiability | Risk if Wrong | Recommended Assistance                  | Best "Real Work" Uses                                                                                                         |
| --- | -------------------- | ---------- | ------------- | ------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Initiation**       | Medium     | Low–Medium    | Medium        | **AI assist only**                      | Draft assumptions/risks, options/tradeoffs, discovery plan, rough sizing ranges, success criteria templates                   |
| 2   | **Requirements**     | High       | Medium        | High          | **AI agent with human gate**            | Convert goals → stories + acceptance criteria, ambiguity detection, edge-case enumeration, NFR prompts, traceability matrices |
| 3   | **System Design**    | High       | Medium        | High          | **AI agent with strong gates**          | Propose architectures, interfaces, data models, slice plans, threat-model checklists, ADR drafts                              |
| 4   | **Increment Design** | High       | Medium        | Medium        | **AI agent with strong gates**          | Detail component designs, API specs, test strategies, data model changes                                                      |
| 5   | **Implementation**   | Very High  | High          | Medium        | **High AI assistance in bounded scope** | Generate/refactor code, migrations, infra-as-code, glue code; keep PR-sized slices                                            |
| 6   | **Verification**     | Very High  | Very High     | Medium        | **High AI assistance with CI gates**    | Generate tests, test matrices, synthetic data, contract tests; expand coverage from AC/NFRs                                   |
| 7   | **Deployment**       | Medium     | High          | Very High     | **AI assist only + runbook gates**      | Draft release steps, canary/rollback plans, release notes; humans execute/approve                                             |
| 8   | **Support**          | High       | Medium        | High          | **AI agent with human gate**            | Triage/log clustering, incident comms drafts, runbooks, dependency update plans, bug minimization                             |

### Stage-Specific Notes

**System Design (Stage 3):** Requires strong gates with architecture board
review. Foundational decisions with high blast radius.

**Increment Design (Stage 4):** May use lighter gates as patterns become
established from System Design. Per-increment detailed design.

**Implementation (Stage 5):** Assistance should be bounded by scope (single
service/module), constraints (no auth changes, feature-flagged), and automated
gates (tests, linting, security scans).

**Verification (Stage 6):** High assistance appropriate because tests are
self-verifying. AI can iterate until tests pass, but humans validate test
quality and coverage.

**Deployment (Stage 7):** Despite high verifiability, the very high risk demands
AI assist only. Production actions require human judgment about timing, traffic,
and rollback decisions.

---

## AI Assistance Levels (Definitions)

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

- System Design stage (especially foundational architecture)
- Any changes affecting security, data integrity, or system reliability
- Cross-service interfaces and contracts

---

### Level 4: High AI Assistance in Bounded Scope

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

### Level 5: High AI Assistance with CI Gates

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
- **Humans own all production approval gates**, following a runbook and approval
  process; pipelines execute deployment steps
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

**Increase AI assistance as verifiability increases; tighten human gates as risk
increases.**

This simple rule captures the core tradeoff:

- **High verifiability** (tests, builds) → AI can iterate independently
- **High risk** (production, architecture, security) → Require stricter human
  gates

### Quick Mapping: When to Use Which Level

| Scenario                                    | Recommended Level                       | Rationale                                      |
| ------------------------------------------- | --------------------------------------- | ---------------------------------------------- |
| High uncertainty / low verifiability        | **AI assist only**                      | Human judgment required                        |
| Medium verifiability / high business impact | **AI agent with human gate**            | Substantial work, human validates correctness  |
| Architecture/security/data/compliance       | **AI agent with strong gates**          | Large blast radius requires specialized review |
| Code + tests in constrained module          | **High AI assistance in bounded scope** | Clear boundaries enable fast iteration         |
| Test generation with measurable outcomes    | **High AI assistance with CI gates**    | Objective validation enables assistance        |
| Anything production-executed                | **AI assist only + runbook gates**      | High risk demands human execution              |

### Adapting to Your Organization

The [AI Autonomy Spectrum](#ai-autonomy-spectrum) provides structured guidance
for adjusting AI's role to your organization's comfort level. As a quick rule of
thumb:

**Lean toward AI-Led when:**

- Team has strong CI/CD pipelines and automated testing
- Organization has high risk tolerance for development environments
- Engineers are comfortable with AI tooling
- Rollback procedures are well-established

**Lean toward Human-Led when:**

- Working in regulated industries (finance, healthcare, defense)
- Team is new to AI-assisted development
- Legacy systems with limited test coverage
- Production incidents would have severe business impact

### Practical Takeaway

**AI is strongest where outputs are machine-checkable:** implementation and
testing. It's still highly useful in requirements/design/support, but you need
explicit human gates because correctness is less objectively verifiable and
impact can be high.

Focus your AI adoption efforts on stages with high verifiability first
(Implementation, Verification), then expand to other stages as your team builds
confidence and establishes effective gate processes.

---

## Integration with Framework

This scorecard complements the [AI-Assisted SDLC Stages](framework-stages.md)
document:

- **framework-stages.md** defines _what_ to do at each stage (inputs,
  activities, outputs, criteria)
- **This scorecard** defines _how much assistance_ AI can have when assisting
  with those activities

**Workflow integration:**

1. Identify your current stage from
   [AI-Assisted SDLC Stages](framework-stages.md)
2. Review this scorecard for assistance recommendations
3. Use the [Manual Process Guide](framework-manual-process.md) to engage your AI
   assistant with the framework
4. Use stage-specific artifacts (checklists, briefs, guides) from stage
   directories
5. Implement appropriate human gates based on assistance level
6. Validate outputs according to stage exit criteria

**For AI assistance:** Use the Manual Process Guide to work with your AI
assistant through each stage. Stage guides include example questions and
explorations that respect the assistance levels defined in this scorecard.

---

## AI Autonomy Spectrum

The scorecard above defines **assistance levels** — how far AI can go before a
human gate. But within any given level, teams differ in _how much AI drives the
work_. A cautious team and a progressive team can both operate at Level 4 (High
AI Assistance in Bounded Scope) yet look very different day to day.

The AI Autonomy Spectrum addresses this by describing three tiers of AI
involvement. It operates **within** the assistance levels — levels set the
ceiling based on risk and verifiability; the spectrum adjusts who drives versus
who assists beneath that ceiling.

### Tier Definitions

| Tier              | Philosophy                 | AI Role                                                                                                                  |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Human-Led**     | Humans drive, AI assists   | AI produces drafts and options on request; humans direct every step and make every decision                              |
| **Collaborative** | Shared work with gates     | AI executes tasks within human-set agenda; humans review and approve at defined gates                                    |
| **AI-Led**        | AI drives, humans validate | AI drives the process — setting agendas, identifying gaps, iterating proactively; humans steer and validate at key gates |

**Collaborative is the default.** The guidance elsewhere in this scorecard and
in each stage guide assumes the Collaborative tier. If your team is just getting
started, Collaborative is a safe starting point.

### Cross-Stage Summary

This table shows how the three tiers manifest across all eight stages. Each
stage guide contains a detailed activity-level table in its AI Assistance
section.

| Stage                          | Human-Led                                  | Collaborative                                         | AI-Led                                                                          |
| ------------------------------ | ------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Initiation** (Level 1)       | Human drafts; AI answers questions         | AI interviews and drafts brief; human reviews         | AI drives discovery, cross-references for gaps; human validates                 |
| **Requirements** (Level 2)     | Human writes reqs; AI reviews              | AI drafts reqs from brief; human validates            | AI drafts and proactively flags contradictions and gaps; human validates        |
| **System Design** (Level 3)    | Human designs; AI suggests patterns        | AI proposes architecture; human decides               | AI evaluates trade-offs proactively, identifies concerns; human validates       |
| **Increment Design** (Level 3) | Human designs; AI generates boilerplate    | AI drafts component and test specs; human reviews     | AI drafts and flags cross-cutting concerns proactively; human validates         |
| **Implementation** (Level 4)   | Engineer writes; AI completes and suggests | AI generates from specs; engineer reviews each PR     | AI implements full slices, identifies issues; engineer validates                |
| **Verification** (Level 5)     | Engineer writes tests; AI suggests cases   | AI drafts tests from ACs; engineer validates coverage | AI writes and iterates until CI passes; engineer reviews intent                 |
| **Deployment** (Level 6)       | Engineer writes runbook; AI templates      | AI drafts runbook; engineer reviews                   | AI monitors pipeline, recommends gate decisions with evidence; engineer decides |
| **Support** (Level 2)          | Engineer triages; AI surfaces data         | AI triages and drafts responses; engineer decides     | AI monitors and identifies patterns proactively; engineer validates             |

**Note:** Even at the AI-Led tier, the assistance level ceiling still applies.
For example, Deployment (Level 6) requires humans to own all production approval
gates regardless of autonomy tier; pipelines execute deployment steps.

### Choosing Your Tier

Your autonomy tier can — and should — vary by stage. A team might be AI-Led for
Implementation (high verifiability, fast feedback) but Human-Led for Deployment
(high risk, low tolerance for error).

**Signals you're ready for AI-Led:**

- Strong automated testing and CI/CD pipelines
- Team has experience reviewing AI-generated output
- Clear rollback procedures exist
- The stage's outputs are highly verifiable (machine-checkable)
- AI has sufficient context to identify gaps and cross-cutting concerns
- Team trusts AI to drive the agenda (not just execute tasks)
- Organization has established AI governance policies
- CI/CD pipeline runs in under 15 minutes with >80% test coverage
- Team has completed >3 increments reviewing AI-generated output
- Rollback can be executed in <30 minutes with a documented runbook

**Signals to stay Human-Led:**

- Team is new to AI-assisted development
- Outputs require significant domain judgment to verify
- Regulatory or compliance constraints limit AI involvement
- Limited automated testing or CI/CD maturity
- Organization is still developing AI trust

**Signals for Collaborative (good default):**

- Team has some AI experience but wants human checkpoints
- Mix of verifiable and judgment-dependent outputs
- Moderate risk tolerance
- Established review processes that can incorporate AI output
- Team has completed at least 1 increment using AI assistance
- Code review includes at least one reviewer checking AI-generated output

### Your Tier Can Evolve

Teams typically progress from Human-Led to Collaborative to AI-Led as they build
confidence:

1. **Start Human-Led** — learn AI strengths and weaknesses in your context
2. **Move to Collaborative** — let AI drive routine work while humans gate
   decisions
3. **Advance to AI-Led** — give AI maximum independence where outputs are
   verifiable and risk is managed

Reassess your tier periodically — after major milestones, incidents, or team
changes. Moving backward is healthy if circumstances change (new regulations,
team turnover, new domain).

---

## Notes

**Last Updated:** 2026-02-21

Added to framework in v0.9.0.

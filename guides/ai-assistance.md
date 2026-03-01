---
id: ai-assistance
type: guide
concerns: [autonomy, gates, evaluation]
---

# AI Assistance Scorecard

## Overview

Operational guidance for determining appropriate AI assistance across the 8 SDLC
stages — evaluating each stage across four critical dimensions to help teams
decide where AI can work more independently and where human oversight is
essential.

### Why a Scorecard

AI is not equally useful or equally safe across all SDLC stages. Implementation
and verification produce outputs that are directly testable — AI can iterate
fast and mistakes are caught by CI. But system design and deployment involve
high-stakes decisions where errors have large blast radius and correctness
depends on human judgment. Without explicit guidance on where AI can work
independently and where human oversight is essential, teams either
over-constrain AI (losing productivity in low-risk stages) or under-constrain it
(introducing risk in high-stakes ones).

### Purpose

- Define clear boundaries for AI assistance at each stage
- Help engineers understand where humans maintain control
- Provide practical guidance for integrating AI safely and effectively
- Balance productivity gains with appropriate risk management

### Key Principle

AI assistance levels are bounded and controlled with explicit human gates.
"Assistance" in this context means how independently AI can operate before
requiring human approval—not uncontrolled or unsupervised operation.

### How to Use This Scorecard

1. Identify which SDLC stage you're working in
2. Review the gate requirements and "best real work uses"
3. Choose your autonomy tier (Human-Led, Collaborative, or AI-Led)
4. Adjust based on your organization's risk tolerance

---

## Quick Reference

| #   | SDLC Stage           | Fit for AI | Verifiability | Risk if Wrong | Required Gates                     | Best "Real Work" Uses                                                                                                         |
| --- | -------------------- | ---------- | ------------- | ------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Initiation**       | Medium     | Low–Medium    | Medium        | Human approval                     | Draft assumptions/risks, options/tradeoffs, discovery plan, rough sizing ranges, success criteria templates                   |
| 2   | **Requirements**     | High       | Medium        | High          | Human approval                     | Convert goals → stories + acceptance criteria, ambiguity detection, edge-case enumeration, NFR prompts, traceability matrices |
| 3   | **System Design**    | High       | Medium        | High          | Specialized review                 | Propose architectures, interfaces, data models, slice plans, threat-model checklists, ADR drafts                              |
| 4   | **Increment Design** | High       | Medium        | Medium        | Specialized review                 | Detail component designs, API specs, test strategies, data model changes                                                      |
| 5   | **Implementation**   | Very High  | High          | Medium        | CI validation + human approval     | Generate/refactor code, migrations, infra-as-code, glue code; keep PR-sized slices                                            |
| 6   | **Verification**     | Very High  | Very High     | Medium        | CI validation + human spot-check   | Generate tests, test matrices, synthetic data, contract tests; expand coverage from AC/NFRs                                   |
| 7   | **Deployment**       | Medium     | High          | Very High     | Human execution required + runbook | Draft release steps, canary/rollback plans, release notes; humans execute/approve                                             |
| 8   | **Support**          | High       | Medium        | High          | Human approval                     | Triage/log clustering, incident comms drafts, runbooks, dependency update plans, bug minimization                             |

For evaluation dimension definitions, see
[Evaluation Dimensions](#evaluation-dimensions). For stage-specific notes, see
[Stage-Specific Notes](#stage-specific-notes).

---

## Integration with Framework

This scorecard complements the [AI-Assisted SDLC Stages](stages.md) document:

- **[AI-Assisted SDLC Stages](stages.md)** defines _what_ to do at each stage
  (inputs, activities, outputs, criteria)
- **This scorecard** defines _how much assistance_ AI can have when assisting
  with those activities

**Workflow integration:**

1. Identify your current stage from [AI-Assisted SDLC Stages](stages.md)
2. Review this scorecard for gate requirements and autonomy guidance
3. Use the [Manual Process Guide](manual-process.md) to engage your AI assistant
   with the framework
4. Use stage-specific artifacts (checklists, briefs, guides) from stage
   directories
5. Implement appropriate human gates based on stage requirements
6. Validate outputs according to stage exit criteria

**For AI assistance:** Use the Manual Process Guide to work with your AI
assistant through each stage. Stage guides include example questions and
explorations that respect the gate requirements defined in this scorecard.

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

### 4. Required Gates

The controls that must be in place before AI output is acted upon. Gate
strictness increases with risk and decreases with verifiability.

- **Human execution required:** Humans perform the action; AI drafts only
- **Specialized review:** Architecture board, security review, or multi-person
  approval
- **Human approval:** Human reviews and approves before merge or adoption
- **CI validation:** Automated checks provide the primary quality gate; human
  spot-checks intent

---

## Stage-Specific Notes

**Initiation (Stage 1):** AI produces drafts, options, and analyses. Humans own
all decisions — scope, priority, assumptions. AI cannot take actions that change
project state.

**Requirements (Stage 2):** AI can do substantial end-to-end work (drafting
requirements, acceptance criteria, traceability matrices). Humans approve before
output is relied on. Correctness requires domain expertise.

**System Design (Stage 3):** Requires specialized review — architecture council
or tech lead sign-off, security review for auth/data flow changes, explicit
rollback plan and migration review. Foundational decisions with high blast
radius.

**Increment Design (Stage 4):** Same gate type as System Design, but gates may
be lighter as patterns become established. Per-increment detailed design.

**Implementation (Stage 5):** AI iterates within pre-defined boundaries — single
service/module, no auth changes, feature-flagged, no unapproved schema changes.
Humans gate merge via PR review + CI results (tests, linting, security scans).

**Verification (Stage 6):** AI iterates until objective gates pass (tests,
linters, coverage thresholds, security scans). Human review focuses on intent
and coverage quality, not line-by-line mechanics.

**Deployment (Stage 7):** AI drafts runbooks, checklists, and scripts. Humans
own all production approval gates and execute deployment steps. Requires
real-time judgment on timing, traffic, and rollback decisions.

**Support (Stage 8):** AI triages, clusters logs, and drafts incident
communications. Humans decide on escalation, prioritization, and
production-impacting actions.

---

## AI Autonomy Spectrum

The scorecard above defines gate requirements per stage — the controls that must
be in place before AI output is acted upon. But within any stage, teams differ
in _how much AI drives the work_. A cautious team and a progressive team can
both operate under the same gate requirements yet look very different day to
day.

The AI Autonomy Spectrum addresses this by describing three tiers of AI
involvement. Gate requirements always apply regardless of tier — the spectrum
adjusts who drives versus who assists within those constraints.

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

| Stage                | Human-Led                                  | Collaborative                                         | AI-Led                                                                          |
| -------------------- | ------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Initiation**       | Human drafts; AI answers questions         | AI interviews and drafts brief; human reviews         | AI drives discovery, cross-references for gaps; human validates                 |
| **Requirements**     | Human writes reqs; AI reviews              | AI drafts reqs from brief; human validates            | AI drafts and proactively flags contradictions and gaps; human validates        |
| **System Design**    | Human designs; AI suggests patterns        | AI proposes architecture; human decides               | AI evaluates trade-offs proactively, identifies concerns; human validates       |
| **Increment Design** | Human designs; AI generates boilerplate    | AI drafts component and test specs; human reviews     | AI drafts and flags cross-cutting concerns proactively; human validates         |
| **Implementation**   | Engineer writes; AI completes and suggests | AI generates from specs; engineer reviews each PR     | AI implements full slices, identifies issues; engineer validates                |
| **Verification**     | Engineer writes tests; AI suggests cases   | AI drafts tests from ACs; engineer validates coverage | AI writes and iterates until CI passes; engineer reviews intent                 |
| **Deployment**       | Engineer writes runbook; AI templates      | AI drafts runbook; engineer reviews                   | AI monitors pipeline, recommends gate decisions with evidence; engineer decides |
| **Support**          | Engineer triages; AI surfaces data         | AI triages and drafts responses; engineer decides     | AI monitors and identifies patterns proactively; engineer validates             |

**Note:** Even at the AI-Led tier, gate requirements still apply. For example,
Deployment requires humans to own all production approval gates regardless of
autonomy tier; pipelines execute deployment steps.

### Choosing Your Tier

Your autonomy tier can — and should — vary by stage. A team might be AI-Led for
Implementation (high verifiability, fast feedback) but Human-Led for Deployment
(high risk, low tolerance for error).

As a general rule, lean toward higher autonomy (AI-Led) when conditions support
it and toward lower autonomy (Human-Led) when they don't:

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

## Operational Guidance

### Rule of Thumb

**Increase AI assistance as verifiability increases; tighten human gates as risk
increases.**

This simple rule captures the core tradeoff:

- **High verifiability** (tests, builds) → AI can iterate independently
- **High risk** (production, architecture, security) → Require stricter human
  gates

### Quick Mapping: When to Use Which Gate

| Scenario                                    | Required Gates                     | Rationale                                      |
| ------------------------------------------- | ---------------------------------- | ---------------------------------------------- |
| High uncertainty / low verifiability        | Human approval                     | Human judgment required                        |
| Medium verifiability / high business impact | Human approval                     | Substantial work, human validates correctness  |
| Architecture/security/data/compliance       | Specialized review                 | Large blast radius requires specialized review |
| Code + tests in constrained module          | CI validation + human approval     | Clear boundaries enable fast iteration         |
| Test generation with measurable outcomes    | CI validation + human spot-check   | Objective validation enables assistance        |
| Anything production-executed                | Human execution required + runbook | High risk demands human execution              |

### Practical Takeaway

**AI is strongest where outputs are machine-checkable:** implementation and
testing. It's still highly useful in requirements/design/support, but you need
explicit human gates because correctness is less objectively verifiable and
impact can be high.

Focus your AI adoption efforts on stages with high verifiability first
(Implementation, Verification), then expand to other stages as your team builds
confidence and establishes effective gate processes.

---

## Notes

**Last Updated:** 2026-02-26

Added to framework in v0.9.0.

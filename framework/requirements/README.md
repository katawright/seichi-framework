# AI-Assisted SDLC: Requirements Stage Artifacts

**Framework Version:** 0.3.0
**Last Updated:** 2026-02-09

**Stage:** 2 of 7 (Requirements)
**Primary Audience:** Business Analysts, Product Managers
**Supporting Roles:** Engineers, Architects, QA Engineers
**Execution Pattern:** Foundational (once per project, revisitable)

## Overview

The Requirements stage converts business objectives into testable requirements with acceptance criteria that enable coherent design decisions, accurate test planning, and reduced rework from ambiguity.

This stage is designed for **Business Analysts and Product Managers** to translate the Initiation Brief into detailed, testable requirements. The process helps you define what to build, establish acceptance criteria, and set priorities for incremental delivery.

For the formal stage definition, see [STAGES.md](../../STAGES.md#stage-2-requirements).

## Starting Point

This is the **second stage** of the SDLC - designed to follow the Initiation stage.

**To begin, you need:**
- A completed and approved Initiation Brief (from Stage 1)
- Stakeholder availability for requirements elicitation
- Defined success metrics to inform requirements

**The Requirements process helps you:**
- Convert business objectives into functional requirements (FRs)
- Define objective acceptance criteria (AC) for each requirement
- Identify non-functional requirements (NFRs) for performance, security, scalability
- Prioritize requirements for incremental delivery (MoSCoW: Must Have / Should Have / Could Have / Won't Have)
- Validate requirements with stakeholders

**By the end:**
- You have a Requirements Document ready for the Design stage, OR
- You've discovered requirements need refinement (revise scope), OR
- You've decided the project isn't viable (stop)

Requirements is a **refinement and validation tool** - turning hypotheses into testable specifications.

## Stage Outputs

**What this stage produces for YOUR project:**

- **Requirements Document** - A filled-out brief for your specific project that can be used to:
  - Guide the Design stage (what to architect and how to measure)
  - Inform test planning (Verification stage)
  - Prioritize iterative delivery
  - Make a proceed/revise/stop decision at Gate 2 (after Design foundational pass)

**Your Requirements Document will contain:**
- Context and users/personas
- Problem statement (carried forward from Initiation)
- Goals and success metrics (from Initiation Brief)
- Scope baseline (MoSCoW prioritization: Must Have / Should Have / Could Have / Won't Have)
- Functional requirements (FRs) with unique identifiers
- Acceptance criteria (AC) for each FR
- Non-functional requirements (NFRs) including instrumentation needs
- Data sources and integrations with constraints
- Edge cases and error handling expectations
- Open questions with owners
- Requirements readiness assessment

**Handoff to next stage:** If proceeding, the Design stage uses your Requirements Document as its starting point (per [STAGES.md](../../STAGES.md#stage-2-requirements)).

## Stage Checkpoints

This stage includes two checkpoint types:

### Alignment Reviews (ongoing)

**Type:** Alignment Review - stakeholder walkthroughs to ensure shared understanding
**When:** Throughout Requirements stage as sections complete
**Based on:** Draft requirements sections (FRs, NFRs, scope, etc.)

**Purpose:**
- Validate requirements accuracy with stakeholders
- Surface misunderstandings early
- Ensure technical feasibility with engineering
- Confirm security/compliance needs with relevant teams

**AI validation:** If you used AI assistance to draft requirements, validate AI's work in alignment reviews:
- Do FRs accurately reflect stakeholder needs?
- Are ACs objective and testable?
- Did AI identify the right NFRs and constraints?
- Are priorities aligned with business goals?

**Outcome:** Aligned (proceed) or Adjust (refine requirements)

### Requirements Readiness (end of stage)

**Type:** Quality Checkpoint - ready to proceed to Design stage
**When:** End of Requirements stage, before Design work begins
**Based on:** Completed Requirements Document

**Readiness criteria:**
- All high-priority requirements have acceptance criteria
- Requirements reviewed and approved by business and technical stakeholders
- NFRs include measurement/instrumentation needs
- Requirements are testable and unambiguous

**Note on Gate 2 timing:** Gate 2 (the major build/no-build decision) occurs at the **end of Requirements + Design foundational pass**, not at the end of Requirements alone. Requirements readiness is a quality checkpoint confirming you're ready to start Design work.

**Next step:** If ready, proceed to Design stage (foundational pass).

For more on checkpoint types across the framework, see [STAGES.md - Decision Points and Checkpoints](../../STAGES.md#decision-points-and-checkpoints).

## AI Autonomy Level

**Requirements = AI assist only** (per [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md))

- **AI's role:** Draft requirements, suggest acceptance criteria, identify NFRs, analyze completeness
- **Human's role:** Owns all decisions, validates correctness with stakeholders, approves outputs, ensures business alignment
- **Why:** Requirements involve business judgment, stakeholder alignment, and domain knowledge that AI cannot independently verify

## Framework Artifacts

**These are tools provided by the framework - NOT your project outputs.**

This directory contains templates, guides, and tools to help you complete the Requirements stage for YOUR project.

### Templates

- **`requirements-brief-template.md`** — Template showing structure + guidance for creating your project's requirements document
  - 14 sections covering context, users, problem, goals, scope, FRs, ACs, NFRs, data/integrations, edge cases, questions, readiness
  - Includes micro-guidance and examples for each section
  - Emphasizes **testable requirements** with objective acceptance criteria
  - Integrates **measurement throughline** from Initiation (success metrics → NFRs)
  - Clarifies **Gate 2 planning** (occurs after Requirements + Design foundational)

### Guides

- **`requirements-reference.md`** — Deep reference documentation
  - Framework context (where Requirements fits in SDLC)
  - Definitions of FR, AC, NFR, MoSCoW prioritization (Must/Should/Could/Won't Have), Gate 2, DRI, Alignment Reviews
  - Rationale for each brief section
  - Measurement throughline explanation
  - Common pitfalls and fixes
  - When to expand beyond minimal
  - When to revisit Requirements

- **`requirements-checklist.md`** — 60–90 second readiness checklist
  - 12 items to verify before declaring requirements ready for Design
  - Items 5–7 and 11–12 are critical for design readiness

### AI Tools

- **`requirements-ai-agent-prompt.md`** — Modular prompt to have an AI agent draft the requirements document and run the checklist
  - References artifacts by filename (no duplication)
  - Behavior-first, objective AC, practical approach
  - Emphasizes measurement throughline

## Suggested Workflow

1. **Draft:** Use `requirements-brief-template.md` as your structure. Have an AI agent help draft using `requirements-ai-agent-prompt.md` + Initiation Brief + stakeholder input
2. **Elicit & Validate:** Conduct stakeholder interviews and alignment reviews to refine requirements
   - Verify FRs match stakeholder needs
   - Check that AI-suggested ACs are objective and testable
   - Validate NFR priorities with engineering
   - Ensure edge cases are comprehensive
3. **Review & Validate AI Output:** Edit your requirements document for correctness and completeness (you own the final content)
   - Confirm problem statement still reflects reality
   - Verify acceptance criteria are observable
   - Validate data/integration constraints with technical teams
   - Ensure measurement/instrumentation needs are captured
4. **Check Readiness:** Run `requirements-checklist.md` against your document before declaring ready for Design
5. **Reference:** Use `requirements-reference.md` for deeper guidance or to resolve questions
6. **Alignment Reviews:** Conduct final stakeholder walkthrough to confirm alignment
7. **Handoff to Design:** Provide Requirements Document to Design stage (foundational pass begins)

## Key Concepts

### Gate 2 Timing (build/no-build decision)

Requirements uses a **two-stage gate model**:
- **Requirements readiness checkpoint:** Quality check confirming requirements are ready for Design (ready/not ready)
- **Gate 2 (build/no-build):** Major investment decision occurring at **end of Requirements + Design foundational pass**

**Why the separation:** Design foundational work often uncovers critical architecture trade-offs, technical risks, and effort implications that inform the build/no-build decision. Gate 2 evaluates both requirements AND high-level design before committing the team.

**Gate 2 typical outputs:**
- Requirements + acceptance criteria reviewed and approved
- NFRs captured (performance, security, observability, etc.)
- High-level design documented (key trade-offs identified)
- Top risks addressed (spikes/prototypes/reviews with mitigations)
- Iteration plan with dependencies (for iterative delivery)
- Updated staffing/timeline estimates with improved confidence
- Recommendation: proceed / pivot / stop

### Measurement Throughline

Requirements inherits **measurable success criteria** from Initiation (Section 4) and translates them into requirements:
- **Initiation stage:** Defined success metrics (e.g., "p90 time-to-context < 30s")
- **Requirements stage (you are here):** Success metrics inform functional and non-functional requirements
  - Example: Performance target → NFR for latency
  - Example: Adoption metric → FR for usage tracking
  - Example: Outcome metric → NFR for observability/instrumentation
- **Design stage:** Instrumentation and measurement approach designed
- **Implementation stage:** Metrics instrumented in code
- **Verification stage:** Success criteria validated in testing
- **Deployment stage:** Metrics monitored during rollout
- **Support stage:** Success criteria tracked in production

**Your role:** Translate success metrics into specific NFRs (performance targets, observability requirements) so Design knows what to instrument.

### Functional Requirements (FRs) + Acceptance Criteria (ACs)

Requirements define **what** the system must do (behavior), not **how** to build it (implementation):
- **FRs:** Testable statements of required behavior ("The system shall..." or "As a user, I can...")
- **ACs:** Objective, observable criteria defining "done" for each FR
- **Testability:** Each FR should have ACs that can be validated in the Verification stage

**Key principle:** Be behavior-first, not solution-first. Requirements describe outcomes, not implementation details.

### Non-Functional Requirements (NFRs)

NFRs define quality attributes and constraints that shape design:
- **Performance:** Latency, throughput, response time targets
- **Reliability:** Availability, error budgets, fault tolerance
- **Security:** Authentication, authorization, data protection, audit
- **Scalability:** Load expectations, growth projections
- **Observability:** Logging, metrics, traces, SLOs (critical for measurement throughline)
- **Compliance:** Regulatory requirements, data retention, privacy

**Minimal set:** Include only NFRs that materially affect architecture decisions, testing, or risk.

### Prioritization (MoSCoW Method)

Requirements use **MoSCoW prioritization** (Must Have / Should Have / Could Have / Won't Have) to reduce debate and enable iterative delivery.

**MoSCoW methodology:**
- The MoSCoW method is an industry-standard prioritization technique
- **M**ust have - Critical requirements without which the solution is not viable
- **S**hould have - Important requirements that add significant value and are committed for delivery
- **C**ould have - Desirable requirements if time and resources allow (not committed)
- **W**on't have (this time) - Requirements explicitly excluded from this project scope

**Priority levels:**
- **Must Have:** Requirements critical for the first usable release. Without these, the solution cannot deliver core value or validate key hypotheses.
- **Should Have:** Important requirements that WILL be delivered (committed), but deferred to future releases. These add significant value but are not required for initial viability.
- **Could Have:** Desirable requirements that add value IF they can be implemented efficiently. These are **not committed** - they may or may not be delivered depending on actual effort and schedule.
- **Won't Have:** Requirements explicitly excluded from this project scope (captured as "Out of scope / non-goals").

**Key distinction - Should Have vs. Could Have:**
- **Should Have** = "We WILL build this, just in a later release" (committed)
- **Could Have** = "We'd like to build this if it's efficient, but no commitment" (aspirational)

**Why this approach:**
- Requirements is a **foundational stage** (done once per project, before increment boundaries are known)
- At this stage, you're doing **coarse prioritization** - categorizing requirements by commitment level
- Design stage creates the **iteration plan** that maps these priorities to specific increments

**How this maps to increments:**
- **Requirements stage (foundational):** Prioritize all requirements using MoSCoW (Must/Should/Could/Won't Have)
- **Design stage (foundational pass):** Create iteration plan mapping Must Haves → Increment 1, Should Haves → Increment 2+, evaluate Could Haves
- **Implementation/Test/Deploy (iterative):** Execute per increment based on iteration plan; Could Haves built opportunistically if efficient

**Why prioritize:** Enables incremental delivery, focuses design efforts on highest-value work, clarifies trade-offs, distinguishes committed vs. aspirational requirements.

## Framework Alignment

These artifacts align with the AI-Assisted SDLC Framework v1.0.0:
- **Stage definition:** [STAGES.md](../../STAGES.md#stage-2-requirements) lines 191-238
- **AI autonomy guidance:** [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md)
- **Design principles:** Practical, non-threatening, cross-functional (see [PROJECT_CONTEXT.md](../../PROJECT_CONTEXT.md))
- **Checkpoint taxonomy:** Alignment Reviews and Quality Checkpoints (see [STAGES.md - Decision Points and Checkpoints](../../STAGES.md#decision-points-and-checkpoints))

## Terminology Notes

This framework uses consistent terminology across all stages:
- **Requirements stage** (not "Discovery" or "Analysis") = Stage 2
- **Design stage** = Stage 3 (foundational pass) and Stage 4 (iterative passes per increment)
- **Verification stage** (not "Testing") = Stage 5
- **Gate** = Investment decision milestone (proceed/pivot/stop)
- **Quality Checkpoint** = Readiness check (ready/not ready)
- **Alignment Review** = Stakeholder sync (aligned/adjust)
- **Increment** = Neutral term for epic/feature/sprint/milestone/deliverable

See [STAGES.md](../../STAGES.md) for complete stage definitions and checkpoint taxonomy.

---

## Notes

Added to framework in v0.3.0. Adapted from reference materials v0.1 (2026-02-06) with terminology updates ("Analysis" → "Requirements"), enhanced measurement throughline emphasis, Gate 2 timing clarification, Alignment Reviews checkpoint type, and framework integration matching Initiation artifacts quality.

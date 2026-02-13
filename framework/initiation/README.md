# AI-Assisted SDLC: Initiation Stage Artifacts

**Framework Version:** 0.8.0
**Last Updated:** 2026-02-12

**Stage:** 1 of 7 (Initiation)
**Primary Audience:** Product Managers, Business Analysts
**Supporting Roles:** Executives, Solutions Architect, Engineers
**Execution Pattern:** Foundational (once per project, revisitable)

## Overview

The Initiation stage establishes the business case, defines objectives with measurable success criteria, sets scope boundaries, and produces a plan to reach the first major decision gate (proceed/pivot/stop).

This stage is designed for **anyone with an idea** to explore and validate it. The process helps you refine informal thinking into a formal proposal that can secure buy-in or help you decide to pivot/stop.

For the formal stage definition, see [STAGES.md](../../STAGES.md#stage-1-initiation).

## Starting Point

This is the **first stage** of the SDLC - designed for anyone with an idea.

**To begin, you need:**
- An idea or problem you want to explore (informal is fine)

That's it. No sponsor, no budget, no formal approval needed to start.

**The Initiation process helps you:**
- Refine your informal idea into a clear problem statement
- Develop a business case to secure sponsor/funding
- Think through scope, risks, and options
- Determine whether to proceed, pivot, or stop

**By the end:**
- You have a completed brief to present to sponsors/stakeholders, OR
- You've discovered the idea needs refinement (pivot), OR
- You've decided the project isn't viable (stop)

Initiation is a **thinking tool** as much as a planning tool.

## Stage Outputs

**What this stage produces for YOUR project:**

- **Initiation Brief** - A filled-out brief for your specific project that can be used to:
  - Secure executive sponsorship
  - Obtain funding/resources
  - Get stakeholder buy-in
  - Make a proceed/pivot/stop decision

**Your brief will contain:**
- Problem statement and business case
- Objectives with measurable success criteria
- Scope boundaries (in-scope and out-of-scope)
- Assumptions, risks, and unknowns
- Constraints and dependencies
- Options considered and recommendation
- Staffing/timeline hypothesis (range-based)
- Gate 1 definition and decision criteria
- Owner/DRI and stakeholders

**Handoff to next stage:** If proceeding, the Requirements stage uses your Initiation Brief as its starting point (per [STAGES.md](../../STAGES.md#stage-1-initiation)).

## Stage Checkpoints

This stage concludes with one primary checkpoint:

### Gate 1 (Investment Decision)

**Type:** Gate - real proceed/pivot/stop decision
**When:** End of Initiation, when brief is complete
**Based on:** Your completed Initiation Brief

**Decision criteria:**
- **Proceed if:** Business case is clear, stakeholders aligned, risks acceptable, sponsor committed
- **Pivot if:** Problem needs refinement, scope adjustment needed, alternative approach warranted
- **Stop if:** No clear business value, costs exceed benefits, better alternatives exist

**AI validation:** If you used AI assistance to draft the brief, analyze options, or assess risks, ensure you've validated the AI's work:
- Does the problem statement accurately reflect reality?
- Are the success metrics meaningful and measurable?
- Did AI identify the right risks and options?
- Are recommendations sound?

**Human owns the decision:** AI can help analyze and draft, but you (and your stakeholders) make the investment decision.

**Next step:** If proceeding, your brief becomes input to the Requirements stage.

For more on checkpoint types across the framework, see [STAGES.md - Decision Points and Checkpoints](../../STAGES.md#decision-points-and-checkpoints).

## AI Autonomy Level

**Initiation = AI assist only** (per [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md))

- **AI's role:** Draft, analyze, suggest alternatives, provide templates
- **Human's role:** Owns all decisions, validates correctness, approves outputs
- **Why:** Non-technical business decisions require human judgment and stakeholder alignment

## Framework Artifacts

**These are tools provided by the framework - NOT your project outputs.**

This directory contains templates, guides, and tools to help you complete the Initiation stage for YOUR project.

### Templates

- **`initiation-brief-template.md`** — Template showing structure + guidance for creating your project's initiation brief
  - 13 sections covering problem, business case, goals, scope, assumptions, risks, constraints, options, estimation, gate definition, owner
  - Includes micro-guidance and examples for each section
  - Emphasizes **measurable success criteria** that flow through all SDLC stages
  - Uses **range-based estimation** with confidence levels

### Guides

- **`initiation-reference.md`** — Deep reference documentation
  - Definitions of Gate, DRI (Directly Responsible Individual)
  - Rationale for each brief section
  - Common pitfalls and fixes
  - When to expand beyond minimal

- **`initiation-checklist.md`** — 60–90 second readiness checklist
  - 12 items to verify before circulating your brief
  - Items 1–4, 10–12 are critical for basic readiness

### AI Tools

- **`initiation-ai-agent-prompt.md`** — Modular prompt to have an AI agent draft the brief and run the checklist
  - References artifacts by filename (no duplication)
  - Problem-first, range-based, practical approach

## Suggested Workflow

1. **Draft:** Use `initiation-brief-template.md` as your structure. Have an AI agent help draft using `initiation-ai-agent-prompt.md` + your project notes
2. **Review & Validate AI Output:** Edit your brief for correctness and decisions (you own the final content)
   - Verify problem statement reflects reality
   - Check that AI-suggested metrics are meaningful
   - Validate risk assessment and options analysis
   - Ensure recommendations align with business context
3. **Check Readiness:** Run `initiation-checklist.md` against your brief before circulating
4. **Reference:** Use `initiation-reference.md` for deeper guidance or to resolve questions
5. **Gate 1 Decision:** Present brief to stakeholders for investment decision (proceed/pivot/stop)

## Key Concepts

### Gate Model (proceed/pivot/stop)

Initiation uses a **gate-based decision model** where each gate is an outcome milestone:
- **Gate 1:** Requirements complete (end of Requirements + Design foundational passes)
- **Gate after Gate 1:** Decision based on Gate 1 outputs: proceed / pivot / stop

Gates are outcomes, not dates. Each gate includes explicit decision criteria.

### Measurement Throughline

Initiation establishes **measurable success criteria** (Section 3 of the brief) that flow through all SDLC stages:
- **Requirements stage:** Success criteria inform functional and non-functional requirements
- **Design stage:** Instrumentation and measurement approach designed
- **Implementation stage:** Metrics instrumented in code
- **Verification stage:** Success criteria validated in testing
- **Deployment stage:** Metrics monitored during rollout
- **Support stage:** Success criteria tracked in production

This measurement throughline is a key differentiator of this framework.

### Range-Based Estimation

Initiation-level estimates are **hypotheses, not commitments**:
- State as ranges (e.g., "2–4 weeks") with confidence level (Low/Medium/High)
- Document top assumptions driving the range
- Identify risks that could push the upper bound
- Update after Requirements stage with improved confidence

## Framework Alignment

These artifacts align with the AI-Assisted SDLC Framework v1.0.0:
- **Stage definition:** [STAGES.md](../../STAGES.md#stage-1-initiation) lines 35-82
- **AI autonomy guidance:** [AI_AUTONOMY_SCORECARD.md](../../AI_AUTONOMY_SCORECARD.md)
- **Design principles:** Practical, non-threatening, cross-functional (see [PROJECT_CONTEXT.md](../../PROJECT_CONTEXT.md))

## Terminology Notes

This framework uses consistent terminology across all stages:
- **Requirements stage** (not "Discovery" or "Analysis") = Stage 2
- **Design stage** = Stage 3 (foundational pass) and Stage 4 (iterative passes)
- **Verification stage** (not "Testing") = Stage 5
- **Gate** = Decision milestone (proceed/pivot/stop)
- **Increment** = Neutral term for epic/feature/sprint/milestone/deliverable

See [STAGES.md](../../STAGES.md) for complete stage definitions.

---

## Notes

Added to framework in v0.2.0. Adapted from reference materials v0.3 (2026-02-05) with terminology updates, measurement throughline emphasis, and framework integration.

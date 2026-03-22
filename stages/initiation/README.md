---
id: initiation
stage_number: 1
execution_pattern: foundational
inputs:
  - business-opportunity
  - stakeholder-list
  - budget-constraints
outputs:
  - artifact: initiation-brief
    template: templates/initiation-brief.md
  - artifact: success-criteria-register
    template: templates/success-criteria-register.md
  - artifact: assumptions-risks-list
    embedded_in: initiation-brief
  - artifact: timeline-estimate
    embedded_in: initiation-brief
gates:
  - type: human-approval
    name: "Gate 1 (Investment Decision)"
    hard_gate: true
feeds_into: [requirements]
checklist: stages/initiation/checklist.md
reference: stages/initiation/reference.md
---

# AI-Assisted SDLC: Initiation Stage

## Overview

Practical guidance for establishing the business case for a project and securing
approval to invest in detailed Requirements work.

### Why Initiation

Software projects fail when they skip the fundamentals — unclear problems,
unmeasurable goals, unspoken assumptions, and absent ownership. Initiation
exists to answer: _"Should we pursue this idea?"_

Any stakeholder with a project idea can use Initiation artifacts — no technical
expertise or formal role required. The language is intentionally
business-focused to enable non-technical stakeholders to independently initiate
and scope projects with AI assistance.

### Purpose

- Provide stage-specific guidance and rationale for Initiation
- Describe how AI assists at each activity
- Explain right-sizing Initiation effort to project complexity
- Guide practitioners from idea to Gate 1 decision

### Key Principle

Success criteria established in Initiation flow through every subsequent stage —
from Requirements to Support. Getting them right here is the highest-leverage
activity in the entire SDLC. For the full stage definition (purpose, roles,
inputs/outputs, entry/exit criteria, and gate details), see
[Framework Stages: Initiation](../../guides/stages.md#stage-1-initiation).

### Starting Point

A business opportunity or problem worth investigating, a stakeholder list, and
budget context. No prior framework artifacts or technical expertise required.

> This stage operates from the **artifacts location**. For greenfield projects,
> create the artifacts directory structure first (e.g., `docs/briefs/`,
> `docs/adr/`). See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

1. Read [**Right-Sizing Initiation**](#right-sizing-initiation) to understand
   the three right-sizing axes and select your risk tier
2. Read [**How AI Helps**](#how-ai-helps) to select your AI autonomy tier (and
   oversight intensity if AI-Led)
3. **For Collaborative or AI-Led tiers:** Confirm all right-sizing selections
   with the user before drafting. Do not begin populating the brief until
   agreed.
4. Fill out the [Initiation Brief Template](../../templates/initiation-brief.md)
   using AI according to your chosen autonomy tier — refer to
   [**Why These Initiation Elements Matter**](#why-these-initiation-elements-matter)
   for rationale and examples as you complete each section. See the
   [Manual Process Guide](../../guides/manual-process.md) for the bootstrap
   prompt template and prompting tips
5. For Standard+ tier, populate the
   [Success Criteria Register](../../templates/success-criteria-register.md)
   with the success criteria from your brief
6. Review the brief for correctness — you own the final content
7. Complete the [Initiation Checklist](checklist.md) using AI according to your
   chosen autonomy tier
8. Complete Gate 1 — present to stakeholders and record the proceed/revise/stop
   decision using the [Gate Decision Template](../../templates/gate-decision.md)

> **See a completed example:** The
> [Worked Example: Initiation](../../guides/worked-example.md#stage-1-initiation)
> shows a finished brief for calibration.

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## How AI Helps

AI can assist with Initiation at whatever autonomy tier your team is comfortable
with — from answering questions to driving the entire discovery process.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. Gate requirements always
apply regardless of tier. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../../guides/ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

| Human-Led                          | Collaborative                                 | AI-Led                                                          |
| ---------------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| Human drafts; AI answers questions | AI interviews and drafts brief; human reviews | AI drives discovery, cross-references for gaps; human validates |

At the AI-Led tier, oversight intensity can be tuned from Active to Minimal —
see
[AI Assistance Scorecard: Oversight Intensity](../../guides/ai-assistance.md#oversight-intensity).
For detailed AI-Led patterns, see
[Stage Reference](reference.md#ai-led-patterns).

### AI Assistance Patterns

- **Interview-based drafting:** Describe your idea to AI — it asks structured
  questions and produces a draft brief
- **Template review:** Fill out the template yourself, then ask AI to review for
  completeness and suggest improvements
- **Completeness checking:** AI walks through the checklist and flags gaps
- **Alternative generation:** AI suggests risks, non-goals, and options you may
  not have considered

For assistance level details, see the
[AI Assistance Scorecard](../../guides/ai-assistance.md).

> **Required gates:** Human approval — Initiation involves business decisions
> requiring human judgment, stakeholder alignment, and organizational context
> that AI cannot independently verify. AI produces drafts and options; humans
> own all decisions.

---

## Right-Sizing Initiation

The framework scales along three axes:

- **Risk tier** (Minimal / Standard / Enterprise) — how much process to apply
- **AI autonomy tier** (Human-Led / Collaborative / AI-Led) — how much AI
  drives the work (see [How AI Helps](#how-ai-helps) above)
- **Team size** — solo, small team, or multi-team (see
  [Right-Sizing Guide](../../guides/right-sizing.md#team-size--how-formal))

If your project handles sensitive data, has compliance requirements, or serves external users, start at Standard or Enterprise — see the [Right-Sizing Guide](../../guides/right-sizing.md) for detailed selection criteria.

Select values for all three before starting. Most internal projects land at
**Standard**; use **Minimal** for low-risk experiments and **Enterprise** for
regulated or multi-team efforts.

Not every project needs a formal business case or comprehensive risk assessment.
Match your Initiation effort to your project's risk tier.

> **Project type matters too.** Whether you're building from scratch
> (greenfield) or extending an existing system (brownfield) affects foundation
> work, infrastructure planning, and which stages apply. Capture your project
> type in the Initiation Brief — it informs decisions from System Design onward.
> See
> [Framework Guide: Greenfield vs. Brownfield Projects](../../guides/framework.md#greenfield-vs-brownfield-projects).

| Practice                  | Minimal                         | Standard                                    | Enterprise                                           |
| ------------------------- | ------------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| **Problem statement**     | Brief description of the need   | Structured who/what/why/impact format       | Formal problem analysis with stakeholder input       |
| **Business case**         | Informal justification          | Value, urgency, and strategic alignment     | Formal business case with financial analysis         |
| **Success criteria**      | 1-2 measurable outcomes         | 3-5 criteria with baselines and targets     | Comprehensive KPIs with measurement plans            |
| **Non-goals/assumptions** | Quick list                      | 3-5 explicit non-goals, key assumptions     | Detailed boundary analysis with stakeholder review   |
| **Risk assessment**       | Mental note of key risks        | Documented risks with likelihood and impact | Formal risk register with mitigation plans           |
| **Estimation**            | Rough range                     | Range-based with confidence label           | Multiple estimation techniques, sensitivity analysis |
| **Gate 1 process**        | Informal team agreement         | Structured review with decision criteria    | Formal gate with stakeholder sign-off                |
| **Security**              | Note if sensitive data involved | Classify data sensitivity, note compliance  | Formal data classification with compliance mapping   |

Expand Initiation only when needed:

- **Regulated / compliance-heavy:** Add compliance requirements, formal sign-off
- **Large data migrations:** Add data scope analysis, migration risks
- **Material security / privacy impact:** Add threat summary, privacy
  considerations
- **Multi-team dependency chain:** Add cross-team coordination, dependency
  mapping
- **Hard external deadlines:** Add timeline constraints, phased delivery options

Otherwise, keep the Brief concise and move quickly to Requirements.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Why These Initiation Elements Matter

Each section of the Initiation Brief exists because skipping it causes
predictable failures. This section explains why each element is included:

1. [**Problem Statement**](#problem-statement) — what's wrong and why it matters
2. [**Business Case**](#business-case) — value, urgency, and strategic alignment
3. [**Success Criteria**](#success-criteria) — measurable criteria that flow
   through all stages
4. [**Scope Boundaries and Non-Goals**](#scope-boundaries-and-non-goals) —
   what's in and what's out
5. [**Gate 1 Decision Criteria**](#gate-1-decision-criteria) —
   proceed/revise/stop framework
6. [**Project Lead and Stakeholders**](#project-lead-and-stakeholders) —
   ownership and accountability
7. [**Assumptions**](#assumptions) — hidden scope made explicit
8. [**Risks**](#risks) — unknowns that affect estimates and planning
9. [**Pre-Mortem**](#pre-mortem) — anticipate failure modes before committing
10. [**Constraints and Dependencies**](#constraints-and-dependencies) — hard
    limits and external factors
11. [**Options Considered**](#options-considered) — forces comparison of
    alternatives
12. [**Range-Based Estimation**](#range-based-estimation) — honest early sizing
13. [**Data Sensitivity and Compliance**](#data-sensitivity-and-compliance) —
    regulatory and privacy constraints
14. [**Brownfield Readiness — Quick Pass**](#brownfield-readiness--quick-pass) —
    cost signal for Gate 1 on brownfield projects

### Problem Statement

A clear problem statement prevents solution-first bias and aligns stakeholders
on what's actually wrong before anyone proposes how to fix it. Without one,
teams build features that solve the wrong problem or solve no problem at all.
The structured format — who, what, why, impact — forces the author to articulate
the gap between the current state and the desired state. This framing also
anchors later stages: Requirements validates the problem, Design solves it, and
Support measures whether it stays solved.

**Good format:**

> "\<User/persona\> cannot \<do thing\> because \<constraint/root cause\>,
> resulting in \<impact\>. Success looks like \<metric/outcome\>."

**Good example:**

> "Support agents can't reliably find the latest customer context within 30
> seconds because conversations are split across tools, increasing handle time
> and repeat contacts. Success = p90 time-to-context < 30s and repeat-contact
> rate down 10%."

**Bad example (solution-first):**

> "Build an AI chatbot for support."

### Business Case

Prioritization requires demonstrated value and urgency. Without a business case,
projects compete on opinion rather than evidence, and the loudest voice wins. A
written business case forces the sponsor to quantify value, articulate urgency,
and connect the project to strategic goals. It also gives gate reviewers a basis
for comparing this project against competing investments. If the business case
can't be stated clearly, the project isn't ready for investment.

**What to include:**

- Value estimate — quantified benefit (revenue, cost savings, risk reduction)
- Urgency driver — why now rather than next quarter
- Strategic alignment — which organizational goal or initiative this supports
- Cost of delay — what happens if the project is deferred or cancelled

**Good example:**

> "Automating invoice reconciliation saves ~120 staff-hours/month ($18k) and
> eliminates the leading source of month-end close delays. Finance has flagged
> this as a prerequisite for the Q3 ERP migration."

**Bad example:**

> "This would be a nice improvement for the team."

### Success Criteria

Success criteria are the guardrails that keep delivery honest. They flow through
every later stage — Requirements traces features to them, Verification validates
them, and Support monitors them in production (see
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline)).
Without measurable criteria, teams declare success based on "we shipped it"
rather than "it worked." Defining baselines and targets during Initiation also
exposes unrealistic expectations early, before significant investment is made.

Prefer a small set of metrics:

- One outcome metric (customer/business impact)
- One operational metric (latency/errors)
- One adoption metric (usage/coverage), if relevant

**Good example:**

> "Baseline: p90 time-to-context is 72s. Target: p90 < 30s within 4 weeks of
> launch. Secondary: repeat-contact rate drops from 18% to < 10%."

**Bad example:**

> "Improve support agent experience."

Not all projects lend themselves to numeric baselines and targets. For PoCs,
spikes, and exploratory projects, qualitative criteria with explicit evaluation
conditions are acceptable — the key is a clear definition of done, not the
presence of a number. See
[Initiation Reference: When criteria are qualitative](reference.md#when-criteria-are-qualitative)
for templates and examples.

### Scope Boundaries and Non-Goals

Scope boundaries define what's included; non-goals define what's explicitly
excluded. Together they form a boundary contract that prevents scope creep and
reduces rework. Scope creep is the most common cause of project overruns, and it
almost always starts with an unstated assumption about what's "obviously"
included. By writing down both what is in scope and what is deliberately out of
scope, teams create a reference point for every future "can we also…?"
conversation. Non-goals are especially powerful because they signal conscious
trade-offs, not oversights.

**Examples of scope boundaries (in-scope):**

- "Support agents on the web app only; mobile app is out of scope."
- "English-language content only for v1."
- "Read-only API integration; no write-back to the source system."

**Examples of non-goals:**

- "No UI redesign in v1."
- "No historical data backfill."
- "No internationalization support."
- "No change to auth model."

### Gate 1 Decision Criteria

Makes the approval decision explicit and repeatable. Without criteria, gate
reviews become subjective debates where seniority or enthusiasm drives the
outcome. Pre-defined criteria tell reviewers exactly what "ready" looks like and
give the team a concrete target to prepare for. They also make the
proceed/revise/stop options concrete — reviewers aren't choosing between "yes"
and "no" but between well-defined paths. This reduces decision fatigue and
speeds up the gate review itself.

**What to include:**

- Decision criteria — what conditions must be true to proceed
- Thresholds — quantified where possible (e.g., "business case shows positive
  ROI within 12 months")
- Decision options — define proceed, revise, and stop with expected next steps
  for each

**Example:**

> "Proceed if: problem is validated by at least two stakeholders, business case
> shows positive ROI within 12 months, and no unmitigated high-impact risks
> remain. Revise if: problem is validated but business case is weak — refine
> scope. Stop if: problem cannot be validated or strategic alignment is absent."

> **Brownfield projects:** If the quick-pass readiness assessment estimates **T3
> or below**, include preparation cost in the Gate 1 decision. The decision may
> be to proceed (with preparation factored into timeline and budget), postpone
> (if the opportunity doesn't justify the prep investment now), or abandon. See
> [Brownfield Readiness Guide: When to Assess](../../guides/brownfield-readiness.md#when-to-assess).

> **Common mistake:** Confusing Gate 1 and Gate 2 outputs. Initiation produces
> the brief; Requirements + Design produce Gate 2 outputs (detailed
> requirements, design direction, updated estimates).

### Project Lead and Stakeholders

No owner means no accountability. Naming the lead and approvers ensures someone
drives the brief to completion and someone can approve investment. Without
explicit roles, decisions stall because nobody knows who has authority, and
feedback loops break because nobody knows who to consult. Identifying
stakeholders early also prevents late-stage surprises — the security team that
wasn't consulted, the VP who expected different scope, or the platform team
whose roadmap conflicts with yours.

**What to include:**

- Project lead — the person accountable for completing the brief and driving the
  project forward
- Approver — the person (or group) with authority to make the Gate 1 decision
- Consulted — people whose input is needed before decisions are made
- Informed — people who need to know the outcome but aren't decision-makers

### Assumptions

Assumptions are hidden scope — things the team believes to be true but hasn't
verified. Making them explicit improves estimate honesty and gives stakeholders
a chance to challenge beliefs before they become embedded in the plan. Every
unvalidated assumption is a potential scope change waiting to happen. When an
assumption proves false mid-project, the result is rework, schedule slips, or
both. Writing them down also creates a natural validation checklist for the
Requirements stage.

**What to include:** Assumptions that, if false, shift cost/schedule materially:

- External system capabilities/limits
- Data availability/quality
- Security/compliance constraints
- Team availability or required skills

**Good example:**

> "We assume the payments API supports batch operations (unverified). If it
> doesn't, we'll need a queuing layer that adds ~2 weeks."

**Bad example:**

> "The API will work."

### Risks

The width of your estimate range is mostly a function of unknowns — risks are
those unknowns made visible. Identifying risks early gives the team time to
mitigate them before they become problems. A risk without a mitigation plan is
just worry; a risk with a concrete spike, prototype, or review becomes
actionable work. Risks also inform the Gate 1 decision — a project with many
unmitigated high-impact risks may need a spike before it's ready for full
investment.

**Good risk entries include:**

- Impact + likelihood
- A concrete mitigation (spike/prototype/review)
- A fallback path

**Example:**

> "Risk: Third-party geocoding API may not meet our latency requirements
> (likelihood: medium, impact: high). Mitigation: Run a performance spike in
> week 1. Fallback: Use a self-hosted alternative at higher infrastructure
> cost."

### Pre-Mortem

A pre-mortem inverts the typical risk exercise: instead of asking "what could go
wrong?", the team imagines the project has already failed and works backward to
identify why. This reframe makes it psychologically safe to name uncomfortable
failure modes — team members aren't predicting failure, they're explaining a
hypothetical one. Pre-mortems surface risks that traditional risk lists miss
because they tap into intuition and experience rather than checklist thinking.

The pre-mortem lives in the Initiation Brief (not as a standalone artifact)
because it's a project-level exercise, not a per-increment one. Increment Design
already handles tactical risk identification for each increment.

**Good pre-mortem entry:**

> "Failure mode: The project ships on time but nobody uses it because support
> agents find it slower than their current workflow. Why plausible: We haven't
> observed the current workflow firsthand. Early signal: Agents in the pilot
> group stop logging in after the first week."

**Bad pre-mortem entry:**

> "The project might fail."

**Brownfield-specific prompt:** _"The project failed because data reconciliation
between old and new systems produced silent mismatches — records looked correct
but calculations diverged due to undocumented business rules in stored
procedures. Why plausible: We haven't fully inventoried database-layer logic.
Early signal: Validation queries show discrepancies between old and new outputs
during the first integration test."_

### Constraints and Dependencies

Hard limits and external dependencies bound the solution space. Constraints are
non-negotiable facts — budget caps, compliance requirements, platform
limitations, or hard deadlines. Dependencies are things you need from others —
another team's API, a vendor contract, or an approval process. Surfacing both
early prevents late-stage surprises that force costly redesigns. A constraint
discovered during Implementation is a crisis; the same constraint documented
during Initiation is just a design input.

**What to include:**

- Constraints — budget, deadlines, regulatory/compliance requirements, platform
  or technology mandates
- Dependencies — other teams' deliverables, vendor timelines, approval
  processes, infrastructure provisioning

**Example:**

> "Constraint: Must comply with SOC 2 data-handling requirements; no customer
> PII in logs. Dependency: Platform team must provision the staging environment
> by March 15; if delayed, our timeline shifts accordingly."

### Options Considered

Comparing at least one alternative forces critical evaluation of the default
approach and documents why it was chosen. Without documented alternatives,
reviewers can't assess whether the team explored the solution space or simply
latched onto the first idea. Options analysis also creates a decision record
that future teams can reference when revisiting the approach. Even when the
"obvious" choice is correct, the act of comparing alternatives often surfaces
trade-offs that improve the final design.

**What to include:**

- Option name — short label for each alternative
- Pros/cons — key trade-offs for each option
- Recommendation — which option is preferred and why

**Example:**

> "Option A: Build custom reconciliation engine (pro: full control, con: 6-8
> weeks). Option B: Configure vendor tool (pro: 2-week setup, con: $500/month
> ongoing, limited customization). Recommendation: Option B — faster time to
> value; revisit if customization needs grow."

### Range-Based Estimation

Early-stage work is inherently uncertain, and point estimates create false
certainty that erodes trust when they're inevitably missed. Range-based
estimates acknowledge what you don't yet know while still giving stakeholders
useful sizing information. The width of the range itself communicates confidence
— a 2–4 week range signals reasonable clarity, while a 2–12 week range signals
that a spike is needed before committing. Ranges also force the team to
articulate what assumptions and risks drive the spread, which improves planning
quality.

**What to include:**

- A range (e.g., 2-4 weeks) and a confidence label
- The top assumptions driving the range
- The risks that could push the upper bound

These are **hypotheses**, not commitments. After Requirements stage, estimates
are updated with higher confidence.

**Good example:**

> "Estimate: 3–5 weeks (moderate confidence). Range driven by: uncertainty about
> API batch support (see Assumptions) and pending platform team availability. If
> the geocoding spike reveals latency issues, add 1–2 weeks for the self-hosted
> fallback."

**Bad example:**

> "4 weeks."

### Data Sensitivity and Compliance

Identifying data sensitivity and compliance requirements early prevents costly
rework when regulatory constraints surface mid-delivery. Projects handling
personal data, financial records, or health information carry obligations that
shape architecture, tooling, and AI usage from day one. Capturing these
constraints during Initiation ensures that Requirements includes them as NFRs
and System Design accounts for them structurally. See the
[Security Guide](../../guides/security.md) for the framework's security
throughline and classification approach.

### Brownfield Readiness -- Quick Pass

Brownfield projects inherit existing code, infrastructure, and operational
constraints that greenfield projects do not. The brownfield readiness section
captures the current state assessment — what exists, what technical debt must be
addressed, and what constraints the existing system imposes on new work. Without
this quick pass, teams discover integration issues and legacy constraints
mid-implementation when they are most expensive to address.

---

## Stage Outputs

- **Initiation Brief** containing: problem statement, business case, measurable
  success criteria, scope boundaries, assumptions, risks, options, estimation,
  and Gate 1 definition
- **Success Criteria Register** — define measurable goals, baselines, and
  targets in the
  [Success Criteria Register](../../templates/success-criteria-register.md) so
  every downstream stage references one source of truth

> Success criteria defined here establish the **measurement throughline** that
> flows through all subsequent stages. See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> The optional pre-mortem in the Initiation Brief starts the **learning
> throughline** — identifying top failure modes before committing resources so
> later stages can watch for early signals. See
> [Framework Guide: Learning Throughline](../../guides/framework.md#learning-throughline).

> Initiation starts the **security throughline** by classifying data sensitivity
> and compliance scope so downstream stages know the security posture required.
> See [Security Guide](../../guides/security.md).

**Handoff:** If proceeding, Requirements stage uses your Initiation Brief as its
starting point. Distribute checkpoint or gate decision artifacts to all Informed
roles per the
[Information Protocol](../../guides/framework.md#information-protocol).

---

## When to Revisit Initiation

**Triggers:**

- Business priorities shift or strategic context changes
- Stakeholder feedback indicates misalignment on objectives
- Market changes or competitive landscape shifts
- Success criteria need revision based on new information
- Scope boundaries (non-goals/assumptions) prove incorrect

**Process:**

1. Revisit the Initiation Brief with updated context
2. Re-validate problem statement and business case
3. Update success criteria if objectives changed
4. Re-run the Initiation Checklist
5. Communicate changes to downstream stages

> **Mid-stage discovery?** If something unexpected surfaces during active work,
> see the [Mid-Stage Discovery](../../guides/framework.md#mid-stage-discovery)
> decision tree to determine whether to rework, amend scope, or defer.

---

## Notes

**Last Updated:** 2026-03-19

Added to framework in v0.2.0.

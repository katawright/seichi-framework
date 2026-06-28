# Initiation Reference

## Overview

Detailed guidance and examples for Initiation best practices — companion to the
[Initiation Stage Guide](README.md),
[Initiation Brief Template](../../templates/initiation-brief.md), and
[Initiation Checklist](checklist.md).

### Why Initiation Foundation Work

Initiation artifacts set the frame for every downstream stage. When the problem
statement is vague, requirements drift. When success criteria are absent, teams
declare victory on delivery rather than outcome. When stakeholders are
unidentified, decisions stall or conflict. This reference deepens the guidance
in the stage README with concrete techniques and failure patterns to avoid.

### Goals of This Reference

- Provide techniques for stakeholder identification and discovery facilitation
- Detail assumption and risk analysis methods with worked examples
- Guide practitioners in writing measurable success criteria
- Surface common failure modes before they occur

### Key Principle

The Initiation Brief is a hypothesis document, not a contract. Its value is in
forcing explicit choices — about scope, success, and risk — before significant
investment is made. Precision matters less than completeness at this stage.

### How to Use This Reference

1. Read [**Stakeholder Identification**](#stakeholder-identification) when
   mapping project ownership and consultation needs
2. Use [**Assumption and Risk Analysis**](#assumption-and-risk-analysis) when
   populating those sections of the brief
3. Follow [**Success Criteria Definition**](#success-criteria-definition) to
   write measurable outcomes that hold up through all subsequent stages
4. Review [**Agent-Driven Patterns**](#agent-driven-patterns) when work
   execution is delegated to agents (see the Operating Model Guide)

---

## Stakeholder Identification

Finding the right people early prevents late-stage blockers and misalignment.

Stakeholder identification is not just a courtesy — it is a risk mitigation
activity. Every stakeholder missed during Initiation is a potential source of
late-stage scope change, blocked gate decisions, or rework. The goal is to
identify who can affect the project, who is affected by it, and who has
authority to approve, veto, or redirect it.

Use the RACI model as a starting framework:

- **Responsible:** Who does the work (project lead, delivery team)
- **Accountable:** Who owns the outcome and has final say (project sponsor,
  department head)
- **Consulted:** Who must provide input before decisions are made (security,
  legal, platform, domain experts)
- **Informed:** Who needs to know outcomes without providing input (executives,
  adjacent teams)

**Techniques for identification:**

- Ask the project sponsor: "Who else has authority to stop or redirect this?"
- Map external dependencies: "Which teams does this project depend on or
  affect?"
- Review organizational charts for compliance, security, and infrastructure
  functions — they are often missed
- Ask "who will be upset if they find out about this after the fact?" — those
  people belong in the Informed column at minimum

**Common gaps:**

- Security or compliance teams discovered late, requiring architectural rework
- Infrastructure or platform teams whose roadmap conflicts with project timeline
- Adjacent product teams whose users overlap with the project's target users
- Finance or procurement, when vendor tools or licenses are required

**What to document:** For each stakeholder, capture their role, their stake in
the project, and their preferred communication channel. This becomes the
foundation for Gate 1 preparation.

---

## Assumption and Risk Analysis

Surface hidden scope and unknowns before they become schedule surprises.

### Assumptions

Assumptions are beliefs the team holds about the project that have not been
verified. They are not guesses — they are the implicit decisions embedded in
every estimate and scope boundary. Making them explicit gives stakeholders a
chance to challenge them and gives the team a validation checklist for
Requirements.

**Categories of assumptions to probe:**

- **Technical:** External API capabilities, data quality, system integrations
- **Organizational:** Team availability, stakeholder priorities, budget approval
  timelines
- **Domain:** User behavior, regulatory interpretation, market conditions
- **Operational:** Support capacity, deployment constraints, existing
  infrastructure capabilities

**Writing good assumptions:** Each assumption entry should answer "what do we
believe, and what happens if we're wrong?"

| What we believe                        | Impact if false                 | Validation plan                     |
| -------------------------------------- | ------------------------------- | ----------------------------------- |
| Payments API supports batch operations | +2 weeks for queuing layer      | Confirm with vendor in week 1       |
| Team has React expertise               | Timeline extends by 1–2 sprints | Skills assessment before start      |
| Data migration <100K records           | No batch tooling needed         | Query source DB during Requirements |

Flag assumptions with materially significant consequences — if an assumption
being false shifts cost or schedule by more than 10%, it belongs in this table.

### Risks

Risks differ from assumptions: an assumption is something you believe to be
true; a risk is something that might happen and affect the project negatively.

**Risk anatomy:** Every risk entry should capture likelihood, impact, a concrete
mitigation, and a fallback path. Risks without mitigations are just worry.

**Risk categories to consider:**

- **Technical:** Integration failures, performance shortfalls, security
  vulnerabilities in third-party dependencies
- **Delivery:** Key person unavailability, vendor delays, dependency team
  capacity conflicts
- **Scope:** Requirements volatility, stakeholder disagreement on priorities,
  regulatory changes mid-project
- **Operational:** Deployment window constraints, rollback complexity, on-call
  capacity for support handoff

**Gate 1 signal:** A project with multiple unmitigated high-impact risks is not
ready to proceed. The appropriate Gate 1 outcome is a spike or discovery phase,
not a full investment decision.

<!-- prettier-ignore -->
> **AI exploration:** _"Help me identify assumptions and risks for [describe your project, its integrations, and team context]."_

---

## Success Criteria Definition

Measurable success criteria are the single highest-leverage output of
Initiation.

Success criteria serve two purposes simultaneously: they make the Gate 1
investment decision concrete, and they establish the measurement throughline
that flows through Requirements (traceability), System Design (instrumentation),
Verification (test coverage), Deployment (baseline capture), and Operations
(ongoing monitoring). See
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

### Anatomy of a good success criterion

A strong success criterion is:

- **Specific:** Names the metric being measured (not "improve performance" but
  "reduce p90 time-to-context")
- **Measurable:** Includes a numeric threshold (not "faster" but "< 30 seconds")
- **Baselined:** States the current state before the project (enables honest
  before/after comparison)
- **Time-bound:** Specifies when the target should be achieved (not "eventually"
  but "within 4 weeks of launch")
- **Attributable:** Names who or what the metric tracks (customers, agents, API
  endpoints)

**Template:**

> "Baseline: [current value] for [metric]. Target: [threshold] by [timeframe].
> Measured by: [method/system]."

**Good example:**

> "Baseline: p90 time-to-context is 72 seconds. Target: p90 < 30 seconds within
> 4 weeks of launch. Measured by: support tooling session analytics."

**Bad example:**

> "Support agents should be faster at finding context."

### How many success criteria

Prefer a small, focused set. More criteria dilute focus and complicate
measurement. A three-criterion structure works for most projects:

- One **outcome metric** — the business or customer impact (e.g., reduced handle
  time, increased conversion rate)
- One **operational metric** — system health under load (e.g., API latency,
  error rate)
- One **adoption metric** — usage signal that the feature is being used as
  intended (e.g., feature adoption rate, user retention), if relevant

### When criteria cannot be baselined

Sometimes baseline data does not exist — new features, new user segments, or new
markets. When only the baseline _value_ is missing but the measurement method is
defined, document the absence explicitly and commit to capturing a baseline in
the first increment before declaring success:

> "No baseline exists — capture baseline in Increment 1; target defined as [X]
> relative to that baseline."

**Brand-new products** are the extreme case: nothing is measured because nothing
exists yet. There is no "p90 is 72 seconds today" because there is no today. Do
not invent a baseline, and do not skip the section. Write criteria that stand
without one:

1. **Define the measurement method up front.** Decide _how_ each metric will be
   observed — analytics events, logs, a manual count, a weekly note — before the
   first line of code. A criterion without a defined method is unmeasurable no
   matter how precise the target looks.
2. **Treat first-baseline capture as itself a success criterion.** For a new
   product, "we can observe the metric at all" is a real, verifiable outcome.
   Make it a criterion in its own right rather than a footnote.
3. **Set absolute targets, not deltas.** With no baseline, "improve by 20%" is
   meaningless — 20% of what? Use absolute values tied to the problem statement,
   and revise them once the first baseline exists.

**Good no-baseline criteria:**

> "SC-01: Usage events are captured from first deployment; baseline weekly usage
> recorded after 4 weeks of real use. Measured by: built-in analytics."
>
> "SC-02: I log every workout in the app instead of the spreadsheet for 4
> consecutive weeks." (An absolute adoption check — no baseline needed.)

**Bad no-baseline criteria:**

> "Increase usage by 20%." (Delta with no baseline.)
>
> "Baseline: TBD." (Defers the measurement decision — define the method now,
> capture the value later.)

### When criteria are qualitative

Some projects — PoCs, spikes, and exploratory work — do not lend themselves to
numeric baselines and targets. In these cases, qualitative success criteria are
acceptable provided they include an explicit evaluation condition that makes the
outcome unambiguous.

**Template:**

<!-- prettier-ignore -->
> "Question: [What we need to learn]. Evaluation criteria: [Observable
> condition that answers the question]. Timeframe: [When the evaluation
> occurs]."

**Good example:**

> "Question: Can the vendor geocoding API meet our latency needs? Evaluation
> criteria: p95 response time < 200ms over 1,000 representative requests.
> Timeframe: End of 2-day spike."

**Bad example:**

> "See if the API works."

Prefer measurable criteria when feasible — qualitative criteria are a pragmatic
fallback, not the default. When a project matures past the exploratory phase,
revisit qualitative criteria and convert them to measurable ones.

<!-- prettier-ignore -->
> **AI exploration:** _"Help me write measurable success criteria for [describe your project goal, target user, and available analytics]."_

---

## Agent-Driven Patterns

### What Agents Drive

When work execution is delegated to agents (e.g. the Lights-Out preset), an
agent takes ownership of the discovery and drafting process rather than waiting
for human direction. Concretely, this includes:

- Conducting structured discovery interviews — drafting the questions, following
  up on gaps, and summarizing answers into brief sections
- Listing assumptions across technical, organizational, and domain dimensions
  without being prompted
- Cross-referencing the project context against the framework's output
  requirements and flagging missing sections
- Drafting the full Initiation Brief for human review and correction
- Enumerating risks by category (technical, delivery, scope, operational) and
  suggesting mitigations for each
- Generating rough sizing ranges with confidence labels based on the project
  description and stated unknowns
- Populating success criteria templates and surfacing gaps where baselines are
  missing

### What Humans Validate

The **investment decision** is the human-owned floor here: Gate 1 itself, the
budget and timeline commitments it authorizes, and the acceptance of residual
risk. The supporting analysis is agent-able and follows the project's Authority
setting:

- Scope and priority choices — what is in scope, excluded, or deferred (an agent
  drafts; the choice is authorized at the gate)
- Stakeholder alignment — whether the right people have been consulted and are
  aligned
- Budget and timeline — an agent provides ranges; committing them is the floor
- Assumptions — an agent lists them; confirming or refuting a domain assumption
  needs a party qualified in that domain
- Risk acceptance — an agent analyzes likelihood and impact; accepting residual
  risk (or letting it block Gate 1) is the floor
- The Gate 1 decision itself (Proceed / Proceed with conditions / Revise / Stop)
  — always human-owned

**Oversight at this stage.** How closely a human watches the work is no longer a
separate dial — it folds into **Required Assurance** (how independently the work
is evaluated) and **Authority** (who decides), set in the operating model. See
the [Operating Model Guide](../../guides/operating-model.md).

### Common Failure Modes

- **Invented stakeholder priorities:** An agent fabricates organizational
  priorities not grounded in actual stakeholder input — results in scope that
  does not reflect real business needs. Mitigation: treat all agent-generated
  priorities as hypotheses requiring stakeholder confirmation before the brief
  is finalized.
- **Hallucinated organizational constraints:** An agent assumes constraints
  (budget caps, compliance requirements, approval processes) without evidence —
  incorrect assumptions propagate into estimates and scope boundaries. Flag all
  constraints with [ASSUMED] until verified.
- **Over-scoping:** An agent treats every idea raised during discovery as
  in-scope, producing a brief that is too broad for the stated timeline.
  Mitigation: the non-goals section requires explicit human input on what is
  deliberately excluded.
- **Under-exploring risks:** An agent generates a short risk list when the
  project context warrants a longer one — especially in brownfield projects,
  regulated domains, or projects with external dependencies. Mitigation: prompt
  the agent to enumerate risks by category and review each category explicitly.

### Session Handoff Notes

When handing off between agent sessions during Initiation, capture the following
state so the next session can continue without re-discovery:

- Stakeholders identified so far and their roles (Responsible, Accountable,
  Consulted, Informed)
- Preliminary scope decisions made — what is in scope, what has been explicitly
  excluded
- Outstanding discovery questions still needing stakeholder input
- Assumptions tagged [ASSUMED] that require verification
- Draft artifacts in progress and their completion status (problem statement
  complete, business case in draft, success criteria not yet started, etc.)

---

## Fallback Protocol

These protocols apply at every operating posture, not only unattended
(Lights-Out) runs. See
[Agentic Workflow Guide: Error and Fallback Guidance](../../guides/agentic-workflow.md#error-and-fallback-guidance)
for the central fallback protocols.

**Extends:** Missing Input, Ambiguous Requirements. **Overrides:** none.

When agent-generated content is uncertain or potentially incorrect:

- Tag all unverified assumptions with **[ASSUMED]** in the brief — this makes
  them visible to reviewers and creates a validation checklist for Requirements.
  See
  [Reviewing \[ASSUMED\] Items](../../guides/agentic-workflow.md#reviewing-assumed-items)
  for reviewer disposition guidance
- Escalate investment decisions to the project sponsor rather than allowing an
  agent to frame them as recommendations; agents present options, humans decide
- Present multiple scope options with explicit trade-offs rather than a single
  recommended scope when the project boundary is genuinely unclear
- When a risk cannot be mitigated within Initiation, flag it as a Gate 1 blocker
  or recommend a spike before proceeding

---

## Related Documents

- [Initiation Stage Guide](README.md)
- [Initiation Checklist](checklist.md)
- [Initiation Brief Template](../../templates/initiation-brief.md)
- [Success Criteria Register Template](../../templates/success-criteria-register.md)

---

## Notes

**Last Updated:** 2026-06-28

Added to framework in v0.23.0. New-product no-baseline guidance added in
v0.48.0. v0.49: vocabulary and oversight model updated.

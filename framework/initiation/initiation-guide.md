# Initiation Guide

> Stage-specific guidance for Initiation. For cross-cutting framework concepts,
> see [Framework Guide](../framework-guide.md).

---

## Quick Reference

**Purpose:** Establish the business case with measurable success criteria and
get approval to invest in Requirements work.

**Primary roles:** Product Managers, Business Analysts

**Execution pattern:** Foundational (once per project, revisitable)

**Key inputs:** Project idea, business need, stakeholder context

**Key outputs:** Approved Initiation Brief (Gate 1)

**What good looks like:**

- Problem statement in "who can't do what because why -> impact" format
- At least one measurable success criterion with baseline and target
- 3-5 explicit non-goals
- Range-based estimate with confidence label
- Clear Gate 1 proceed/pivot/stop criteria

**Common pitfalls:**

- Solution-first problem statement -> rewrite as user/constraint/impact
- No non-goals -> scope creep
- Point estimates treated as commitments -> use ranges
- No measurable success criteria -> add outcome metric
- Gate 2 outputs confused with Gate 1 outputs -> Initiation produces the brief;
  Requirements + Design produce Gate 2 outputs

**Checkpoint:** Gate 1 — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** AI assist only — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## What Is Initiation?

Initiation establishes the business case for a project and secures approval to
invest in detailed Requirements work. It answers the fundamental question:
_"Should we pursue this idea?"_

**Purpose:**

1. **Problem definition** — articulate who is affected, what they can't do, and
   why it matters
2. **Business justification** — establish value, urgency, and strategic
   alignment
3. **Success definition** — set measurable criteria that flow through all later
   stages
4. **Scope boundaries** — define non-goals and assumptions to prevent scope
   creep
5. **Risk awareness** — identify unknowns that affect estimation and planning
6. **Investment decision** — prepare the Gate 1 proceed/pivot/stop decision

Any stakeholder with a project idea can use Initiation artifacts — no technical
expertise or formal role required. The language is intentionally
business-focused to enable non-technical stakeholders to independently initiate
and scope projects with AI assistance.

---

## AI Assistance

> **Assistance level:**
> [AI assist only](../framework-ai-assistance.md#level-1-ai-assist-only) —
> Initiation involves business decisions requiring human judgment, stakeholder
> alignment, and organizational context that AI cannot independently verify.

### AI Autonomy Spectrum

Match AI's role to your team's autonomy comfort level. The assistance level for
this stage ([Level 1](../framework-ai-assistance.md#level-1-ai-assist-only))
sets the ceiling; this spectrum adjusts who drives within that ceiling. See the
[AI Assistance Scorecard: AI Autonomy Spectrum](../framework-ai-assistance.md#ai-autonomy-spectrum)
for full tier definitions.

**At a glance:**

| Human-Led                          | Collaborative                                 | AI-Led                                                          |
| ---------------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| Human drafts; AI answers questions | AI interviews and drafts brief; human reviews | AI drives discovery, cross-references for gaps; human validates |

**By activity:**

| Activity              | Human-Led                                | Collaborative                                      | AI-Led                                                                                          |
| --------------------- | ---------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Problem statement** | Human writes; AI reviews for clarity     | AI interviews using template; human refines        | AI drives discovery, cross-references for contradictions; human validates                       |
| **Business case**     | Human builds case; AI suggests structure | AI drafts from interview context; human validates  | AI researches comparable approaches, identifies unstated risks; human validates                 |
| **Success criteria**  | Human defines; AI suggests metrics       | AI proposes criteria with baselines; human refines | AI cross-references objectives and constraints to propose criteria; human validates             |
| **Risk assessment**   | Human identifies; AI suggests categories | AI drafts assessment; human validates              | AI proactively identifies risks from goals, constraints, and industry patterns; human validates |
| **Options analysis**  | Human evaluates; AI provides research    | AI drafts options with trade-offs; human decides   | AI researches options, evaluates against constraints proactively; human decides                 |
| **Estimation**        | Human estimates; AI provides benchmarks  | AI suggests ranges from context; human validates   | AI synthesizes scope, risks, and comparables into estimates; human validates                    |

---

## Right-Sizing Initiation

Not every project needs a formal business case or comprehensive risk assessment.
Match your Initiation effort to your project's risk tier.

| Practice                  | Minimal                       | Standard                                    | Enterprise                                           |
| ------------------------- | ----------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| **Problem statement**     | Brief description of the need | Structured who/what/why/impact format       | Formal problem analysis with stakeholder input       |
| **Business case**         | Informal justification        | Value, urgency, and strategic alignment     | Formal business case with financial analysis         |
| **Success criteria**      | 1-2 measurable outcomes       | 3-5 criteria with baselines and targets     | Comprehensive KPIs with measurement plans            |
| **Non-goals/assumptions** | Quick list                    | 3-5 explicit non-goals, key assumptions     | Detailed boundary analysis with stakeholder review   |
| **Risk assessment**       | Mental note of key risks      | Documented risks with likelihood and impact | Formal risk register with mitigation plans           |
| **Estimation**            | Rough range                   | Range-based with confidence label           | Multiple estimation techniques, sensitivity analysis |
| **Gate 1 process**        | Informal team agreement       | Structured review with decision criteria    | Formal gate with stakeholder sign-off                |

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
> [Right-Sizing Guide](../right-sizing-guide.md).

---

## Initiation Workflow

1. **Define problem statement** — articulate who is affected, what they can't
   do, why, and the business impact
2. **Build business case** — establish value, urgency, and strategic alignment
3. **Define success criteria** — set measurable outcomes with baselines and
   targets
4. **Identify non-goals, assumptions, and risks** — establish scope boundaries
   and surface unknowns
5. **Consider options** — compare alternatives and trade-offs
6. **Estimate** — provide range-based estimates with confidence labels
7. **Prepare Gate 1 decision** — compile the Initiation Brief for
   proceed/pivot/stop review

---

## Initiation Guidance

### Primary Audience

**Primary roles:** Product Managers, Business Analysts **Supporting roles:**
Executives, Solutions Architect, Engineers

Any stakeholder with a project idea can use Initiation artifacts — no technical
expertise or formal role required. The language is intentionally
**business-focused** to enable non-technical stakeholders to independently
initiate and scope projects with AI assistance.

### Why These Initiation Elements Matter

Each section of the initiation brief serves a specific purpose:

- **Problem statement** — prevents solution-first bias; aligns stakeholders on
  what's actually wrong
- **Business case** — prioritization requires value and urgency
- **Success metrics** — guardrails that keep delivery honest; flow through all
  later stages (see
  [Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline))
- **Non-goals** — boundary contract that prevents scope creep and reduces rework
- **Assumptions** — hidden scope; making them explicit improves estimate honesty
- **Risks** — estimate range is mostly a function of unknowns; manage early
- **Options considered** — forces comparison of alternatives and trade-offs
- **Range-based estimation** — early work is uncertain; point estimates create
  false certainty
- **Gate 1** — first decision gate; determines whether to invest in detailed
  requirements work

> For detailed rationale, examples, and formatting guidance for each section,
> see [Initiation Reference](initiation-reference.md).

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
4. Re-run the initiation checklist
5. Communicate changes to downstream stages

---

## Related Documents

- [Initiation Brief Template](initiation-brief-template.md)
- [Initiation Checklist](initiation-checklist.md)
- [Initiation Reference](initiation-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-20

Added to framework in v0.2.0.

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

## Primary Audience

**Primary roles:** Product Managers, Business Analysts **Supporting roles:**
Executives, Solutions Architect, Engineers

Any stakeholder with a project idea can use Initiation artifacts — no technical
expertise or formal role required. The language is intentionally
**business-focused** to enable non-technical stakeholders to independently
initiate and scope projects with AI assistance.

---

## Why These Initiation Elements Matter

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

## When to Expand Beyond Minimal

Expand Initiation only when needed:

- Regulated/compliance-heavy domain
- Large data migrations
- Material security/privacy impact
- Multi-team dependency chain
- Hard external deadlines

Otherwise, keep the Brief concise and move quickly to Requirements.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../right-sizing-guide.md).

---

## AI Assistance Guidance

**Why AI assist only:** Initiation involves non-technical business decisions
that require human judgment, stakeholder alignment, and organizational context.

**AI's role — two modes of working:**

- **Interview mode:** Describe your idea to AI. It asks structured questions
  based on the template, suggests options, and produces a draft brief for your
  review.
- **Review mode:** Fill out the template yourself, then ask AI to review for
  completeness, suggest improvements, and edit as directed.

In either mode, AI can also:

- Suggest alternatives and trade-offs
- Analyze completeness (run checklist)
- Provide templates and examples

**Human's role:**

- Own all decisions
- Validate correctness
- Approve outputs
- Align stakeholders

---

## Related Documents

- [Initiation Brief Template](initiation-brief-template.md)
- [Initiation Checklist](initiation-checklist.md)
- [Initiation Reference](initiation-reference.md)
- [AI-Assisted SDLC Stages](../framework-stages.md)

---

## Notes

**Last Updated:** 2026-02-16

Added to framework in v0.2.0.

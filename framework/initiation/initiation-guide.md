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

- Problem statement in "who can't do what because why → impact" format
- At least one measurable success criterion with baseline and target
- 3-5 explicit non-goals
- Range-based estimate with confidence label
- Clear Gate 1 proceed/pivot/stop criteria

**Common pitfalls:**

- Solution-first problem statement → rewrite as user/constraint/impact
- No non-goals → scope creep
- Point estimates treated as commitments → use ranges
- No measurable success criteria → add outcome metric
- Gate 2 outputs confused with Gate 1 outputs → Initiation produces the brief;
  Requirements + Design produce Gate 2 outputs

**Checkpoint:** Gate 1 — see
[Framework Guide: Checkpoints](../framework-guide.md#checkpoint-taxonomy)

**AI assistance:** AI assist only — see
[Framework Guide: AI Assistance](../framework-guide.md#ai-assistance-overview)

---

## Primary Audience

**Primary roles:** Product Managers, Business Analysts (non-technical
stakeholders) **Supporting roles:** Executives, Solutions Architect, Engineers

The language in Initiation artifacts is intentionally **business-focused**
rather than technical. This enables non-technical stakeholders to independently
initiate and scope projects with AI assistance.

---

## Why These Initiation Elements Matter

### Problem statement

**Why:** Prevents "solution-first" bias and aligns stakeholders on what's
actually wrong.

**Good format:**

> "<User/persona> cannot <do thing> because <constraint/root cause>, resulting
> in <impact>. Success looks like <metric/outcome>."

**Good example:**

> "Support agents can't reliably find the latest customer context within 30
> seconds because conversations are split across tools, increasing handle time
> and repeat contacts. Success = p90 time-to-context < 30s and repeat-contact
> rate down 10%."

**Bad example (solution-first):**

> "Build an AI chatbot for support."

### Business case + why now

**Why:** Prioritization requires value and urgency. "Why now" also clarifies
cost-of-delay and whether a smaller interim step is warranted.

### Goals + success metrics

**Why:** Metrics are the guardrails that keep delivery honest. If you can't
measure success, you can't tell if the effort worked.

Success metrics defined here flow through all later stages — see
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Tip:** Prefer a small set of metrics:

- One outcome metric (customer/business impact)
- One operational metric (latency/errors)
- One adoption metric (usage/coverage), if relevant

### Non-goals

**Why:** Non-goals are a boundary contract that prevents scope creep, reduces
rework, and improves speed.

**Examples:**

- "No UI redesign in v1."
- "No historical data backfill."
- "No internationalization support."
- "No change to auth model."

### Assumptions

**Why:** Assumptions are hidden scope. Making them explicit exposes uncertainty
and improves estimate honesty.

**What to include:** Assumptions that, if false, shift cost/schedule materially:

- External system capabilities/limits
- Data availability/quality
- Security/compliance constraints
- Team availability or required skills

### Risks / unknowns

**Why:** Your estimate range is mostly a function of unknowns. Managing unknowns
early prevents catastrophic surprises later.

**Good risk entries include:**

- Impact + likelihood
- A concrete mitigation (spike/prototype/review)
- A fallback path

### Options considered

**Why:** Forces you to compare alternatives and clarify trade-offs (time,
complexity, risk, maintainability).

**Minimum bar:** At least one alternative and why it wasn't chosen.

### Range-based estimation

**Why ranges:** Early work is uncertain; point estimates create false certainty.

**What to include:**

- A range (e.g., 2–4 weeks) and a confidence label
- The top assumptions driving the range
- The risks that could push the upper bound

**Important:** These are **hypotheses**, not commitments. After the Requirements
stage, you'll update estimates with higher confidence.

### Gate 1 (Initiation approval)

**Why:** Gate 1 is the first decision gate — it determines whether your idea has
sufficient merit to invest in detailed requirements and design work.

**When:** At the end of Initiation, when the brief is complete.

**Decision based on:** The completed Initiation Brief.

**Typical decision criteria:**

- **Proceed if:** Business case is clear, stakeholders aligned, risks
  acceptable, sponsor committed
- **Pivot if:** Problem needs refinement, scope adjustment needed, alternative
  approach warranted
- **Stop if:** No clear business value, costs exceed benefits, better
  alternatives exist

**If proceeding:** The Requirements stage receives the Initiation Brief with
objectives, measurable success criteria, constraints, and stakeholder list.

### Gate 2 (Requirements complete)

**Why:** Gate 2 is the major "build/no-build" decision — it converts hypotheses
into validated plans.

**When:** At the end of Requirements stage + Design foundational pass (Stages
2-3).

**Gate 2 typical outputs:**

- Requirements + acceptance criteria drafted and reviewed
- NFRs captured
- High-level design direction documented
- Top risks addressed (with mitigations/fallbacks)
- Slice plan + dependency ordering
- Updated staffing/timeline ranges with higher confidence
- Recommendation: proceed/pivot/stop

**Important:** During Initiation, you can plan ahead for what Gate 2 should
include (see brief template section "Planning for future gates"). This helps the
Requirements stage know what to produce.

---

## When to Expand Beyond "Minimal"

Expand Initiation only when needed:

- Regulated/compliance-heavy domain
- Large data migrations
- Material security/privacy impact
- Multi-team dependency chain
- Hard external deadlines

Otherwise, keep the Brief concise and move quickly to the Requirements stage.

---

## AI Assistance Guidance

**Assistance level:** AI assist only — see
[AI Assistance Scorecard](../framework-ai-assistance.md)

**Why:** Initiation involves non-technical business decisions that require human
judgment, stakeholder alignment, and organizational context that AI cannot
provide.

**AI's role:**

- Draft initial brief based on project notes
- Suggest alternatives and trade-offs
- Analyze completeness (run checklist)
- Provide templates and examples

**Human's role:**

- Own all decisions
- Validate correctness
- Approve outputs
- Align stakeholders

---

## Notes

**Last Updated:** 2026-02-14

Added to framework in v0.2.0.

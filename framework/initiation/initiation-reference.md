# Initiation Reference

Optional deep-dive companion to the [Initiation Guide](initiation-guide.md),
[Initiation Brief Template](initiation-brief-template.md), and
[Initiation Checklist](initiation-checklist.md). Consult when you need specifics
or a starting point for AI-assisted exploration.

---

## Problem Statement

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

> **AI exploration:** _"Help me rewrite this problem statement in problem-first
> format: [paste your > current problem statement]."_

---

## Business Case and Why Now

**Why:** Prioritization requires value and urgency. "Why now" clarifies
cost-of-delay and whether a smaller interim step is warranted.

---

## Goals and Success Metrics

**Why:** Metrics are the guardrails that keep delivery honest. If you can't
measure success, you can't tell if the effort worked.

Success metrics defined here flow through all later stages — see
[Framework Guide: Measurement Throughline](../framework-guide.md#measurement-throughline).

**Tip:** Prefer a small set of metrics:

- One outcome metric (customer/business impact)
- One operational metric (latency/errors)
- One adoption metric (usage/coverage), if relevant

> **AI exploration:** _"Help me define measurable success metrics for [describe
> your project goals > and current baselines]."_

---

## Non-Goals

**Why:** Non-goals are a boundary contract that prevents scope creep, reduces
rework, and improves speed.

**Examples:**

- "No UI redesign in v1."
- "No historical data backfill."
- "No internationalization support."
- "No change to auth model."

---

## Assumptions

**Why:** Assumptions are hidden scope. Making them explicit exposes uncertainty
and improves estimate honesty.

**What to include:** Assumptions that, if false, shift cost/schedule materially:

- External system capabilities/limits
- Data availability/quality
- Security/compliance constraints
- Team availability or required skills

---

## Risks and Unknowns

**Why:** Your estimate range is mostly a function of unknowns. Managing unknowns
early prevents catastrophic surprises later.

**Good risk entries include:**

- Impact + likelihood
- A concrete mitigation (spike/prototype/review)
- A fallback path

> **AI exploration:** _"Help me identify risks and unknowns for [describe your
> project context and > technology choices]."_

---

## Options Considered

**Why:** Forces you to compare alternatives and clarify trade-offs (time,
complexity, risk, maintainability).

**Minimum bar:** At least one alternative and why it wasn't chosen.

---

## Range-Based Estimation

**Why ranges:** Early work is uncertain; point estimates create false certainty.

**What to include:**

- A range (e.g., 2-4 weeks) and a confidence label
- The top assumptions driving the range
- The risks that could push the upper bound

**Important:** These are **hypotheses**, not commitments. After Requirements
stage, estimates are updated with higher confidence.

---

## Gate 1 (Initiation Approval)

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

**If proceeding:** Requirements stage receives the Initiation Brief with
objectives, measurable success criteria, constraints, and stakeholder list.

---

## Gate 2 (Requirements Complete)

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

## Checklist Reference

### Exit Criteria Alignment

This checklist validates the Initiation stage exit criteria from
[AI-Assisted SDLC Stages](../framework-stages.md#stage-1-initiation):

- Stakeholders approve business case and objectives (items 1-2)
- Success metrics are defined and measurable (item 3)
- Scope boundaries are clear (items 4-5)
- Go/no-go decision made (item 11)

### Critical Items

If items 1-4 and 10-12 are missing, the brief is usually not ready to circulate:

- **Item 1 (Problem statement):** Without a clear problem, everything downstream
  is misaligned
- **Item 2 (Business case):** Stakeholders need value and urgency to approve
  investment
- **Item 3 (Success metrics):** Unmeasurable goals prevent honest delivery
  assessment
- **Item 4 (Scope boundaries):** Without boundaries, scope creep is inevitable
- **Item 10 (Estimate):** Stakeholders need a range to assess investment
- **Item 11 (Gate 1):** Clear criteria prevent ambiguous approval
- **Item 12 (DRI):** No owner means no accountability

---

**Last Updated:** 2026-02-16

_Added to framework in v0.12.0_

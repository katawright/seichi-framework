# Quick Start Guide

> A brief overview of the AI-Assisted SDLC framework — what it is, who it's for,
> and how to get started.

AI-assisted delivery fails when adoption is ad hoc: leaders can't manage risk,
and teams can't execute consistently. This framework gives you a governed,
stage-by-stage operating model for both greenfield and brownfield projects, so
you can move faster without losing human accountability. Executives get clear
investment and control points; practitioners get practical guidance for what to
do next at each stage.

This is not a heavyweight methodology replacement. It overlays your existing
delivery model (agile, waterfall, or hybrid) with AI-specific structure.

---

## Start Here

Use the path that matches your role and immediate priority.

**Executives and decision-makers:** Start with business value and governance.

1. Read [Business Value](#business-value).
2. Review [Governance at a Glance](#governance-at-a-glance).
3. Use [Readiness Check](#readiness-check) to assess adoption readiness.

**Engineering leaders:** Start with readiness, rollout approach, and operating
model.

1. Start with [Readiness Check](#readiness-check).
2. Review [Adoption Path](#adoption-path).
3. Use [How AI Fits In](#how-ai-fits-in) to define team operating mode.

**Practitioners (engineers, PMs, BAs):** Start with tactical execution
guidance.

1. Follow [Adoption Path](#adoption-path).
2. Use [Stage Reference](#stage-reference) for workflow context.
3. Reference [How AI Fits In](#how-ai-fits-in) while executing each stage.

## Business Value

This framework is designed to improve delivery outcomes while maintaining
governance. It creates business value in four ways:

- **Faster time-to-value:** AI-assisted drafting and structured stage handoffs
  reduce cycle time from idea to increment delivery.
- **Lower delivery risk and rework:** Explicit requirements quality, design
  checkpoints, and verification criteria reduce late-stage surprises.
- **Stronger governance and auditability:** Gate decisions and checkpoint
  records make investment decisions and accountability visible.
- **Broader innovation intake:** Non-technical stakeholders can initiate work
  with structure, increasing qualified project proposals.

| Business Outcome               | Without Framework                | With Framework                              |
| ------------------------------ | -------------------------------- | ------------------------------------------- |
| Time-to-value                  | Slow, inconsistent project starts| Faster starts and clearer execution flow    |
| Delivery quality and risk      | Ambiguity discovered late        | Earlier clarity, fewer downstream defects/rework |
| Governance and accountability  | Ad hoc decision trail            | Explicit gates and checkpoint records       |
| Idea-to-project conversion     | Depends on technical gatekeepers | Structured initiation for technical/non-technical roles |

**How to validate value in a pilot:** Track time-to-decision (Gate 1/Gate 2),
time-to-first-deliverable, budget predictability, and stakeholder confidence in
governance.

## Governance at a Glance

Governance value comes from explicit decision rights, visible accountability,
and an auditable record of why projects proceed, pivot, or stop. This improves
portfolio discipline for leaders and reduces delivery ambiguity for teams.

The framework uses two investment gates to make explicit continue/pivot/stop
decisions.
In this context, "investment" means committing team capacity, time, and budget
to the project.
For stage definitions and execution patterns, see
[AI-Assisted SDLC Stages](framework-stages.md).

| Gate   | When                                | Decision                       |
| ------ | ----------------------------------- | ------------------------------ |
| Gate 1 | End of Initiation                   | Fund requirements work? (Y/N)  |
| Gate 2 | End of Requirements + System Design | Commit to building this? (Y/N) |

After Gate 2, the project is funded. Subsequent checkpoints govern quality,
deployment timing, and compliance, not whether to continue.

For full checkpoint types and decision records, see
[Checkpoint Taxonomy](framework-guide.md#checkpoint-taxonomy) in the
[Framework Guide](framework-guide.md).

## How AI Fits In

AI assistance increases as verifiability increases. Early stages use AI for
drafting and analysis with tighter human control. Later stages allow higher AI
assistance because outputs are directly testable. Teams choose Human-Led,
Collaborative, or AI-Led operation within each stage while humans remain
accountable for decisions and correctness.

See [AI Assistance Scorecard](framework-ai-assistance.md) for full guidance.

## Readiness Check

A readiness check helps you decide whether to adopt now, try first, or defer
briefly. For adopt-now and try-first decisions, the default path is to begin
with a limited pilot (see [Adoption Path](#adoption-path)). The goal is to
avoid forcing adoption before baseline conditions are in place (policy, AI
familiarity, and stakeholder support), which increases rollout friction and
weakens results.
This is a quick screening step; use the detailed operational gate before pilot
kickoff.

**Good fit if:**

- Your teams already use or are evaluating AI coding assistants
- You want a structured approach rather than ad-hoc AI adoption
- You need governance guardrails for AI-assisted development
- You want non-technical stakeholders to initiate projects

**Consider deferring if:**

- Your organization has no AI usage policy yet
- Teams have zero experience with AI tools (start with training first)

If the framework appears to fit your context and there are no immediate defer
signals, continue to [Adoption Path](#adoption-path).

For detailed readiness criteria before pilot kickoff, see
[Organizational Adoption Guide: Pre-Pilot Readiness Gate](framework-adoption-guide.md#pre-pilot-readiness-gate).

## Adoption Path

Use this section whether your decision is to adopt now or try first. In both
cases, the recommended path is to begin with a pilot project. This section is
an overview; see the
[Organizational Adoption Guide](framework-adoption-guide.md) for detailed
guidance.

Greenfield pilots are preferred when available because they reduce legacy
constraints for first-time adoption. If a meaningful greenfield option is not
available, brownfield pilots are still valid and often the practical choice.
For a first AI-assisted brownfield effort, plan the discovery-oriented
Increment 0 path; if context is already documented, proceed directly to feature
delivery. See
[Greenfield vs. Brownfield](framework-guide.md#greenfield-vs-brownfield-projects)
and [Increment 0 Guide](increment-0-guide.md).

Use this sequence to turn readiness into execution and expansion:

1. **Pre-pilot setup**
   - Confirm detailed readiness gate (policy, CI/test baseline, rollback,
     checkpoint ownership) in the
     [Organizational Adoption Guide](framework-adoption-guide.md#pre-pilot-readiness-gate).
   - Select project rigor using the
     [Right-Sizing Guide](right-sizing-guide.md).
   - Choose initial AI operating mode (typically Human-Led) using the
     [AI Assistance Scorecard](framework-ai-assistance.md).
2. **Pilot execution (recommended first step)**
   - Run one Standard-tier pilot project through two increments.
   - Copy the bootstrap prompt from the
     [Manual Process Guide](framework-manual-process.md#bootstrap-prompt-template)
     and fill in project details.
   - Start with the [Initiation stage](initiation/) using the guide, brief
     template, and checklist.
   - Use the [Framework Guide](framework-guide.md) when deeper context is
     needed.
3. **Expansion decision**
   - Review pilot outcomes (cycle time, defect rate, team satisfaction) and
     decide whether and how to expand.

---

## Notes

**Framework Version:** 0.19.0

**Last Updated:** 2026-02-22

Added to framework in v0.17.0.

# Delivery Operating Guide

> **New here?** See [Framework Overview](OVERVIEW.md#delivery-operating-guide)
> for what this guide is, why it exists, and how to use it. This file is the
> operational reference.

> **Not the [Operating Model Guide](operating-model.md).** That guide sizes
> _who_ runs the process and _how autonomously_ (Layer B, the operating model);
> this guide is the week-by-week _delivery rhythm_ for one increment. Similar
> name, different axis.

## Key Principle

This guide composes existing content — it does not replace it. If the RACI
matrix, gate facilitation agenda, or stage definitions change, those changes are
authoritative. This guide provides the operating view that connects them.

---

## Foundational Phase

Before sprints begin, foundational stages (Initiation, Requirements, System
Design) establish scope, architecture, and investment approval. A typical weekly
rhythm:

- **Week 1-2:** Initiation — draft brief, pre-mortem, success criteria;
  facilitate [Gate 1](../stages/initiation/README.md#gate-1-decision-criteria)
  decision
- **Week 2-3:** Requirements — elicit and prioritize requirements, define NFRs
  and acceptance criteria
- **Week 3-4:** System Design — architecture, ADRs, increment plan, threat
  model; facilitate [Gate 2](../stages/system-design/README.md#stage-outputs)
  decision

Throughout the foundational phase, PjM establishes the delivery schedule, sets
up the Dependency Register, and confirms consultation touchpoints per the
[RACI matrix](roles.md#raci-matrix).

Timelines vary by project complexity. See each stage guide for detailed
activities. Gate 1 and Gate 2 are the hard gates — use the
[Gate Decision Template](../templates/gate-decision.md) and
[Gate Review Facilitation](roles.md#gate-review-facilitation) guidance.

Between Gate 2 and the first feature increment, most projects require foundation
work — infrastructure bootstrap for greenfield projects, or discovery and
preparation for brownfield projects. Plan one or more foundation increments
using the [Project Foundation Guide](project-foundation.md) before entering the
sprint rhythm below.

---

## Sprint Rhythm (2-Week Increment)

One increment maps roughly to one sprint. This view assumes foundational stages
(Initiation, Requirements, System Design) are complete and Gate 2 has passed.

### Week 1: Design and Start Build

| Day     | Activity                                                                                                              | Lead      | Reference                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------- |
| Monday  | Sprint kickoff: confirm increment scope from backlog, review prior retrospective action items and dependency register | PjM       | [Increment Design Guide](../stages/increment-design/README.md)            |
| Mon–Tue | Increment Design Brief — component breakdown, test plan, API                                                          | Engineers | [Increment Design Brief Template](../templates/increment-design-brief.md) |
| Tuesday | Review increment design brief; resolve ambiguities                                                                    | PjM + Eng | [RACI — Increment Design](roles.md#raci-matrix)                           |
| Wed–Fri | Implementation begins — PRs, tests, instrumentation                                                                   | Engineers | [Implementation Guide](../stages/implementation/README.md)                |
| Friday  | Mid-sprint check-in: blockers, dependency status, scope risk                                                          | PjM       | [Dependency Register](../templates/dependency-register.md)                |

### Week 2: Finish Build, Verify, Deploy

| Day       | Activity                                                                        | Lead      | Reference                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Mon–Tue   | Implementation continues; PRs reviewed and merged                               | Engineers | [Implementation Guide](../stages/implementation/README.md)                                                                                      |
| Wednesday | Code complete; verification begins — test execution, UAT                        | QA + Eng  | [Verification Guide](../stages/verification/README.md)                                                                                          |
| Thursday  | Verification results reviewed; deployment brief prepared                        | QA + PjM  | [Deployment Brief Template](../templates/deployment-brief.md), [Deployment Guide](../stages/deployment/README.md)                               |
| Friday AM | Deployment to production (or staging promotion)                                 | DevOps    | [Deployment Guide](../stages/deployment/README.md)                                                                                              |
| Friday PM | Sprint review: demo, retrospective, close-out confirmation (if final increment) | PjM       | [Retrospective Template](../templates/retrospective.md) (if final increment, see [Gate Review Facilitation](roles.md#gate-review-facilitation)) |

**Cross-increment sync:** Sprint review doubles as the sync point. Review
completed increment, preview next increment scope, surface cross-increment
dependencies.

> **Close-out review:** If this is the final planned increment, run the
> **project close-out** — confirm every acceptance criterion is met or descoped,
> every success criterion is measured or carries a re-check date, and learnings
> are triaged and routed to their owners. Use the
> [Closure Checklist](../stages/closure/checklist.md) and capture the result in
> the [Project Close-Out Summary](../templates/project-closeout.md). See
> [Gate Review Facilitation](roles.md#gate-review-facilitation) for agenda and
> time-boxing.

---

## Kanban / Flow Rhythm

> **Flow delivery mode vs. Kanban cadence:** v0.49 introduced **Flow** as a
> first-class SDLC delivery mode for small, per-issue in-place software changes
> (see [stages.md — Flow Delivery Mode](stages.md#flow-delivery-mode)). Flow is
> a _work-shape_ (alongside Project and Operations); Kanban is a _cadence
> mechanism_ for managing throughput. They are complementary: a team doing Flow
> work often uses a Kanban board to manage it, but Kanban cadence also applies
> to teams running Project increments on a continuous-flow board. This section
> covers the Kanban operating cadence; see the stages guide for Flow scope and
> entry criteria.

Kanban replaces time-boxed sprints with WIP-limited flow. Stages still apply —
they become columns on the board rather than calendar blocks.

### Board Structure

| Column | WIP Limit | Maps to Stage    | Exit Criteria                          |
| ------ | --------- | ---------------- | -------------------------------------- |
| Ready  | 3         | Backlog          | Increment design brief approved        |
| Design | 2         | Increment Design | Brief complete, test plan defined      |
| Build  | 3         | Implementation   | PRs merged, tests passing              |
| Verify | 2         | Verification     | Test results documented, UAT approved  |
| Deploy | 1         | Deployment       | Production deployment confirmed        |
| Done   | —         | —                | Monitoring confirmed, handoff complete |

### Operating Cadence

| Frequency  | Activity                                                   | Lead | Reference                                                     |
| ---------- | ---------------------------------------------------------- | ---- | ------------------------------------------------------------- |
| Daily      | Standup + board review: WIP, blockers, pull signals        | PjM  | —                                                             |
| Twice/week | Replenishment: pull items into Ready when capacity opens   | PjM  | [Dependency Register](../templates/dependency-register.md)    |
| Weekly     | Metrics review: cycle time, throughput, blocked time       | PjM  | [Cadence Mapping](framework.md#cadence-mapping)               |
| On trigger | Project close-out review when all planned items reach Done | PjM  | [Gate Review Facilitation](roles.md#gate-review-facilitation) |

**Pull triggers:** Items move between columns only when the next column has WIP
capacity and the exit criteria for the current column are met. PjM monitors flow
and escalates when items are blocked.

---

## Status Template

Minimal status report for cross-increment visibility. Fill in once per sprint
(or weekly for Kanban).

```markdown
## Status: [Project Name] — [Date]

**Increment:** [N] of [total planned] **Stage:** [current stage] **Health:**
Green / Amber / Red

### Completed This Period

- (key deliverables or milestones)

### In Progress

- (active work items with expected completion)

### Blockers / Risks

- (items needing escalation or decision)

### Dependencies

- (cross-team or external dependencies with status)

### Next Period

- (planned activities)
```

> **Reporting cadence:** Sprint teams report at sprint review. Kanban teams
> report weekly. Escalate blockers immediately rather than waiting for the next
> report.

---

## Related Documents

- [Roles and Responsibilities Guide](roles.md)
- [Framework Guide — Cadence Mapping](framework.md#cadence-mapping)
- [Roles Guide — Gate Review Facilitation](roles.md#gate-review-facilitation)
- [Stage Definitions](stages.md)
- [Gate Decision Template](../templates/gate-decision.md)
- [Dependency Register Template](../templates/dependency-register.md)

---

## Notes

**Last Updated:** 2026-06-28

Added to framework in v0.40.0.

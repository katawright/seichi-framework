# The Learning Loop

## Overview

A standing practice for turning friction encountered while running a project
into triaged, routed improvement — across the development process, the team's
execution, the product, and the tooling.

### Why a Learning Loop

Every project generates friction: a checklist that misleads, a handoff that
drops context, a discovered gap in the product, a tool that fights you. Most of
it is observed once and forgotten. The framework already reflects on what
happened — pre-mortems at Initiation, retrospectives at each increment — but two
ends of the loop were left open:

- **Capture had no standing home.** In-the-moment observations lived in a
  section of the Retrospective Template, a Deployment-stage artifact. Friction
  that arose in the Foundational stages, or that spanned the whole project, had
  nowhere to go until an increment closed.
- **Improvement ideas had no durable destination.** A retrospective's
  forward-looking outputs — value ideas, framework feedback — were shared "with
  stakeholders" and then stranded in a per-project document. Within a project,
  learning flowed (carry-forward into the next increment); across projects, it
  leaked.

The learning loop closes both ends: a standing capture surface that exists from
project start, and durable destinations that route each observation to where it
can actually be acted on.

### Goals of This Guide

- Define the **friction log** — the standing, project-spanning capture surface
- Define the **four friction types** and how each routes at the retrospective
- Define the **idea backlog** — the lightweight cross-project destination for
  improvement ideas
- Show how the loop closes from one project's friction into the next project's
  Initiation

### Key Principle

Friction is data. Capture it where it happens, type it by where the fix lands,
and route it to a place that acts.

### How to Use This Guide

1. Start a [**friction log**](#the-friction-log) at project start; append to it
   as friction arises in any stage
2. Type each entry using the [**four friction types**](#friction-types)
3. At each retrospective, [**triage**](#triage-at-the-retrospective) the log's
   entries into the retrospective's analysis sections
4. Route durable improvement ideas into the
   [**idea backlog**](#the-idea-backlog), and draw from it when
   [**initiating future projects**](#closing-the-loop-into-future-projects)

---

## The Loop at a Glance

| Friction type | What it is                                        | Triaged at the retro into    | Where the fix lands                           |
| ------------- | ------------------------------------------------- | ---------------------------- | --------------------------------------------- |
| **Process**   | The development process / SDLC method itself      | Process Feedback             | Framework maintainers; an idea in the backlog |
| **Execution** | How this team ran the project                     | Action Items / Carry Forward | The next increment                            |
| **Product**   | The software being built                          | Future Value Candidates      | An idea in the backlog → a future project     |
| **Tooling**   | The tools and environment used to run the project | Action Items                 | A tool owner; an idea in the backlog          |

The loop, end to end:

> friction logged during execution (typed) → triaged at each increment
> retrospective → routed by type → durable improvement ideas land in the idea
> backlog → triaged into the Initiation of a future project.

---

## The Friction Log

The **friction log** is a standing, project-spanning artifact that captures
friction as it is encountered. One friction log per project, created at project
start — it exists before the first increment and accumulates through every
stage, including the Foundational stages.

Use the [Friction Log Template](../templates/friction-log.md). Each entry is
numbered `F-001`, `F-002`, … continuously for the life of the project (numbering
does not reset per increment). An entry records what was observed, its impact, a
likely improvement, its **type** (below), and — once triaged — its
**disposition**.

Capture friction the moment you notice it; do not wait for the retrospective.
The friction log is the framework's single in-the-moment capture surface — when
a guide, protocol, or session step says "capture the observation," the friction
log is where it goes.

Keeping a friction log is recommended on any project that runs retrospectives;
see the [Right-Sizing Guide](right-sizing.md#minimum-viable-artifacts) for
per-tier guidance.

---

## Friction Types

Every friction-log entry is typed by **where the fix lands**. The type is what
makes triage mechanical — it tells the retrospective where the entry routes.

- **Process** — friction with the development process or SDLC method itself: a
  stage guide, a checklist item, a template, the gate model. The fix lands with
  whoever maintains the framework. _Example: "the Increment Design checklist has
  no internal-consistency item."_
- **Execution** — friction with how this team ran the project; an execution gap
  the team owns. The fix is something the team does differently next time.
  _Example: "the increment handoff lost the open edge-cases list."_
- **Product** — a discovered idea, gap, or tech-debt observation about the
  software being built. The fix is a change to the product. _Example: "the
  export path has no rate limiting."_
- **Tooling** — friction with the tools or environment used to run the project:
  the AI assistant, the IDE, CI/CD, a SaaS platform, local setup. The fix lands
  with a tool's owner. _Example: "CI flakes on the integration suite roughly one
  run in five."_

An entry that spans two types picks the **primary** type — where the main fix
lands — and notes the secondary in the entry. An entry that fits none of the
four is almost always under-sharpened: it has not yet identified what the fix
is. Sharpen it until a type is obvious rather than inventing an "Other" category
— a catchall collects vague entries that never get acted on.

---

## Triage at the Retrospective

At each increment retrospective, triage the friction-log entries logged during
that increment. The retrospective is where typed friction becomes routed action.
For each entry, record its destination in the friction log's **Disposition**
field so the log itself shows the loop closing.

| Friction type | Routes to (Retrospective section)                      |
| ------------- | ------------------------------------------------------ |
| **Execution** | Action Items, or Carry Forward                         |
| **Process**   | Process Feedback                                       |
| **Product**   | Future Value Candidates (harvested at project wrap-up) |
| **Tooling**   | Action Items, and escalate to the tool's owner         |

**Execution friction has a closed within-project loop.** An Execution entry
becomes a retrospective **Action Item** (with an owner and a target date; the
Project Manager distributes each item and confirms receipt) or a **Carry
Forward** item. Carry-forward items flow into the next increment's Increment
Design Brief, whose **Carry Forward Resolution** section records how each one
was handled. Nothing is lost between increments.

**Process, Product, and Tooling friction routes outward** — beyond the current
increment, and often beyond the current project. Those entries feed the idea
backlog.

---

## The Idea Backlog

The **idea backlog** is the durable destination for improvement ideas that
outlive the project that surfaced them. It is a lightweight convention, not a
stage: no gate, no checklist, no ceremony. It is the layer where a retrospective
output stops being stranded in a per-project document and becomes something a
future project can pick up.

Each idea is one document, created from the
[Idea Template](../templates/idea.md) — a problem statement, where it came from,
a rough sense of scope, a target, and a status. Ideas accumulate in a shared
backlog location above any single project. Number them `IDEA-001`, `IDEA-002`, …
across the backlog (idea IDs are portfolio-scoped, not per-project).

The backlog holds **both** kinds of improvement, distinguished by the idea's
**Target**:

- **Product** ideas — features, tech debt, or architectural opportunities for a
  product. These typically become, or seed, a future project.
- **Process** ideas — improvements to the framework itself. For teams consuming
  the framework unchanged, a triaged Process idea is also worth filing upstream
  (see [CONTRIBUTING.md](../CONTRIBUTING.md)).
- **Tooling** ideas — improvements to the tools and environment, routed to the
  relevant tool's owner.

An idea carries a **Status** (Raw → Triaged → Promoted / Parked / Discarded).
Triaging the backlog — deciding which ideas have value, and when — is a
portfolio-level activity owned by the stakeholders who initiate projects.

> A heavier portfolio layer — a continuously triaged, prioritized backlog with a
> formal idea-to-project promotion workflow — is deliberately out of scope. The
> idea backlog is a convention and a template; it gives retrospective outputs a
> durable home without adding a governed stage.

---

## Closing the Loop into Future Projects

At project wrap-up, the project retrospective harvests its **Future Value
Candidates** and **Process Feedback**. Each candidate worth keeping becomes an
idea document in the backlog, with its origin citing the friction-log entry or
retrospective it came from.

The loop closes at [Initiation](../stages/initiation/README.md): a new project
can draw a goal, a scope, or an entire business case from the idea backlog. An
idea promoted into a project updates its status and links to the project it
seeded. Friction observed while running that project feeds a new friction log —
and the loop turns again.

This is what turns one team's experience into organizational learning: friction
is not just survived, it is captured, typed, routed, and — eventually — designed
away.

---

## Related Documents

- [Friction Log Template](../templates/friction-log.md) — the standing capture
  surface
- [Idea Template](../templates/idea.md) — one document per backlog idea
- [Retrospective Template](../templates/retrospective.md) — where friction is
  triaged and routed
- [AI-Assisted SDLC Stages: Learning Throughline](stages.md#learning-throughline)
  — the per-stage learning roles
- [Framework Guide](framework.md) — cross-cutting framework concepts
- [Increment Design](../stages/increment-design/README.md) — consumes
  carry-forward items via the Carry Forward Resolution section

---

## Notes

**Last Updated:** 2026-05-18

Added to framework in v0.45.0.

# The Learning Loop

> **New here?** See [Framework Overview](OVERVIEW.md#the-learning-loop) for what
> this guide is, why it exists, and how to use it. This file is the operational
> reference.

## Key Principle

Friction is data. Capture it where it happens, type it by who owns the fix, and
route it to that owner. The framework fixes the **types** and the routing
**principle**; **you** name the destinations, because only you know who owns
your process and your tools.

---

## The Loop at a Glance

| Friction type | What it is                                        | Triaged at the retro into    | Where the fix lands                                    |
| ------------- | ------------------------------------------------- | ---------------------------- | ------------------------------------------------------ |
| **Process**   | The development process / SDLC method itself      | Process Feedback             | The owner of your method (capture locally by default)  |
| **Execution** | How this team ran the project                     | Action Items / Carry Forward | The next increment                                     |
| **Product**   | The software being built                          | Future Value Candidates      | The product's idea backlog → future project            |
| **Tooling**   | The tools and environment used to run the project | Action Items                 | The tool's owner (capture locally if you don't own it) |

Only **Product** friction becomes an idea-backlog entry — those are candidate
future projects for the product. Process and tooling friction route **outward**
to the owner that can act on them; they are recorded in the friction log's
Disposition, not added to this project's backlog.

The capture half, end to end:

> friction logged during execution (typed) → triaged at a retrospective cadence
> → routed by type → **product** ideas land in the idea backlog → drawn into the
> Initiation of a future project; **process** and **tooling** friction route out
> to the owner you name for each.

This half feeds the [portfolio loop](#closing-the-portfolio-loop): the idea
backlog is where capture hands off to idea formation, which launches the next
project — whose friction feeds a new log, and the loop turns again.

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
makes triage mechanical — it tells the retrospective who owns the fix.

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

## Triage Cadences

The framework reflects at three moments, and friction is triaged at each. All
three are the **same mechanism** — read the log, type what is untyped, route
each entry by type — fired at a different cadence and feeding the **same**
destinations (the same idea backlog, the same operator-named trackers).

| Cadence                           | Fires at                            | Triaged into                   | Home                                                        |
| --------------------------------- | ----------------------------------- | ------------------------------ | ----------------------------------------------------------- |
| **Increment retrospective**       | the close of each increment         | the increment's retro sections | the SDLC's iterative loop                                   |
| **Project wrap-up retrospective** | project close-out                   | a final harvest of the log     | the [Closure stage](../stages/closure/README.md) (terminal) |
| **Operational retrospective**     | periodically, and after an incident | the running system's review    | the [Operations](operations.md) process                     |

The increment retrospective is the primary cadence and the one this guide
details; the other two are the same triage at the project's terminal and on a
running system. The project wrap-up retro harvests the whole log one last time
(see [Closing the Portfolio Loop](#closing-the-portfolio-loop)); the operational
retro keeps the loop turning after delivery ends, once the system is in standing
operation.

> The project wrap-up cadence lands in the
> [Closure stage](../stages/closure/README.md) — the SDLC's terminal — where the
> wrap-up retrospective triages the log one last time. The operational cadence
> lands in the [Operations](operations.md) process, a standing-system practice
> that is a sibling to the SDLC. Both run the same triage mechanism, fired at a
> different cadence.

For each entry, record its destination in the friction log's **Disposition**
field so the log itself shows the loop closing.

**Execution friction has a closed within-project loop.** An Execution entry
becomes a retrospective **Action Item** (with an owner and a target date; the
Project Manager distributes each item and confirms receipt) or a **Carry
Forward** item. Carry-forward items flow into the next increment's Increment
Design Brief, whose **Carry Forward Resolution** section records how each one
was handled. Nothing is lost between increments.

**Process, Product, and Tooling friction routes outward** — beyond the current
increment, and often beyond the current project. How those destinations are
named is the subject of the next section.

---

## Routing Is Operator-Relative

The framework fixes the four friction **types** and one routing **principle** —
route each entry to whoever owns the fix. It does **not** hardcode the
destinations, because who owns your process and your tools depends on your
context. **You name the destination**; your team's setup or governance profile
supplies it.

- **Product** friction has a framework-defined home: the
  [idea backlog](#the-idea-backlog), the layer above any single project for the
  product's own future work.
- **Process** friction (the SDLC method itself) and **Tooling** friction (the
  assistant, IDE, CI, a platform) route to whoever owns that method or tool — a
  team backlog, an internal tracker, the tool vendor's issue tracker. The
  framework names the type; you name the tracker.

**Capture locally by default.** Often no owner you control exists for a piece of
Process or Tooling friction — you adopted the method or the tool, you do not
maintain it. That is the common case, and its default is simple: **capture and
retain the friction locally**, in your own friction log and notes. It still has
value — it informs how you tailor the method and configure the tools for your
next project. Contributing it upstream to the method's or tool's maintainer is
an **explicit opt-in**, never a requirement of the loop.

**The adopter is the default audience.** This guide is written for the team that
_uses_ the framework, not the team that maintains it. When the operator and the
framework maintainer are the **same** party — a team dogfooding its own method,
where Process friction routes to the framework's own repository — that is a
recognized **special case**, not the default. If that is you, file upstream
directly (see [CONTRIBUTING.md](../CONTRIBUTING.md)); if it is not, capture
locally and contribute only if you choose to.

---

## Running the Loop Lights-Out

The loop's required concern is constant — friction is captured, typed, and
routed — but its **ceremony scales** with how the project is run. A human team
holds a facilitated retrospective; an unattended agent makes a
consolidate-and-prepare pass over the friction log. Same concern, scaled
presentation; progressive governance applies here as everywhere.

The binding contracts are DR-056 (prepare vs. initiate), DR-057 (the
self-modification ban), and DR-059 (proposed-change quality properties) in the
[Delegated-Run Spec](../spec/delegated-run.md#learning-loop-delegation-boundary).
An agent running the loop may **consolidate, classify, deduplicate, and
prepare** idea and issue drafts. Those drafts are durable and attributable —
part of the project's record, produced under the agent's normal delivery
authority. But an agent **prepares; it does not publish:**

- **Filing to any external or upstream tracker is a human-authorized action.**
  Posting an issue to a tool vendor, opening a pull request against the
  framework, or adding to a shared cross-team backlog leaves your workspace and
  reaches another party — an outward-facing act that a human authorizes, not one
  an agent takes on its own.
- **The self-modification boundary is absolute.** An agent never changes the
  framework, the delivery factory, or the governance it runs under — regardless
  of autonomy level. It may _draft_ process feedback; adopting that feedback
  into the method is a human decision, outside the agent's authority.

The result: a Lights-Out project still produces a fully triaged, route-ready set
of drafts; a human only has to authorize what crosses a boundary.

---

## The Idea Backlog

The **idea backlog** is the durable destination for **product** improvement
ideas that outlive the project that surfaced them. It is a lightweight
convention, not a stage: no gate, no checklist, no ceremony. It is the layer
where a product idea stops being stranded in a per-project document and becomes
something a future project can pick up.

Each idea is one document, created from the
[Idea Template](../templates/idea.md) — a problem statement, where it came from,
a rough sense of scope, and a status. Ideas accumulate in a shared backlog
location above any single project. Number them `IDEA-001`, `IDEA-002`, … across
the backlog (idea IDs are portfolio-scoped, not per-project).

The backlog holds **product / portfolio ideas** — features, tech debt, or
architectural opportunities for the product being built. These typically become,
or seed, a future project, so every idea's **Target** is **Product**.

Process and tooling friction does **not** live here. It routes to the owner you
name for it — captured locally by default, contributed upstream only by choice
(see [Routing Is Operator-Relative](#routing-is-operator-relative)) — and is
recorded in the friction log's **Disposition**, not as idea documents. The idea
backlog is the layer _above this project_ for its own future work; friction
owned by a different product (the framework, a tool) does not belong in it.

> **Dogfooding caveat.** When the product you are building _is_ the tooling
> (e.g. a team building its own delivery platform), tooling friction and product
> ideas can collapse onto the same backlog — they share an owner. That is a
> special case. For every other product, friction in the tools is a ticket for
> the tool's owner, not a feature idea for your product; keep the two routed
> separately.

An idea carries a **Status** (Raw → Triaged → Promoted / Parked / Discarded).
Triaging the backlog — deciding which ideas have value, and when — is a
portfolio-level activity owned by the stakeholders who initiate projects.

> A heavier portfolio layer — a continuously triaged, prioritized backlog with a
> formal idea-to-project promotion workflow — is deliberately out of scope. The
> idea backlog is a convention and a template; it gives product-idea outputs a
> durable home without adding a governed stage.

---

## Closing the Portfolio Loop

Capture is only half of the standing practice. The other half is **validate &
launch** —
[idea formation](../stages/initiation/README.md#arriving-with-only-an-idea), the
front door at Initiation that turns a backlog idea into a project. The learning
loop fills the backlog; idea formation draws it back down.

At project wrap-up, the project retrospective harvests its **Future Value
Candidates** into the idea backlog — each product candidate worth keeping
becomes an idea document, with its origin citing the friction-log entry or
retrospective it came from. Process and tooling friction routes to the owner you
named for each (per
[Routing Is Operator-Relative](#routing-is-operator-relative)), not into the
backlog.

**One front door, two on-ramps.** A new project reaches idea formation by one of
two routes — but through the _same_ adaptive interview, producing the same
`[ASSUMED]`-seeded brief:

- **Cold (greenfield).** Someone arrives with only an idea — no backlog entry,
  no problem statement yet. The interview starts from a blank page and builds
  the candidate problem, the target user, and the riskiest assumptions.
- **Warm (from the backlog).** A **Promoted** `IDEA-NNN` already carries a
  problem statement and an origin. The interview starts there — deepening and
  validating what the idea records, and seeding the project's operating
  configuration — rather than from scratch.

Either way, the loop closes at [Initiation](../stages/initiation/README.md): a
new project draws a goal, a scope, or an entire business case from an idea. An
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
- [Initiation: Arriving with Only an Idea](../stages/initiation/README.md#arriving-with-only-an-idea)
  — the front door the backlog feeds (the launch half)
- [Agentic Workflow Guide: Zero-to-One Project Routing](agentic-workflow.md#zero-to-one-project-routing)
  — the two on-ramps into the front door
- [Seichi Framework Stages: Learning Throughline](stages.md#learning-throughline)
  — the per-stage learning roles
- [Framework Guide](framework.md) — cross-cutting framework concepts
- [Increment Design](../stages/increment-design/README.md) — consumes
  carry-forward items via the Carry Forward Resolution section

---

## Notes

**Last Updated:** 2026-07-16

Added to framework in v0.45.0.

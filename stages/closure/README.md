---
id: closure
inputs:
  - deployed-system
  - completion-evidence
  - success-criteria-register
  - friction-log
  - increment-retrospectives
outputs:
  - artifact: operational-handoff-record
    template: templates/operational-handoff.md
  - artifact: project-closeout-summary
    template: templates/project-closeout.md
checkpoints:
  - type: review
    protocol: human-approval
    name: "Production Ownership Transfer"
    responsible_roles: [devops]
  - type: review
    protocol: human-approval
    name: "Project Closure"
    responsible_roles: [pjm]
checklist: stages/closure/checklist.md
reference: null
working_location: artifacts
session_log_template: templates/session-log.md
raci_roles:
  { R: [devops], A: [devops], C: [pm, arch, eng, appsec], I: [exec, pjm] }
---

# AI-Assisted SDLC: Closure Stage

## Overview

The terminal bookend to Initiation — where a delivered project hands its system
to operations, transfers production ownership, and closes against the goals it
set out to meet.

> **Closure is the project's terminal stage; Operations is a separate process.**
> When a project's delivered scope is complete, Closure hands the running system
> off to the [Operations](../../guides/operations.md) process and closes the
> project. Closure ends the **project**; Operations continues to run the
> **system** under whoever owns it. Reaching Closure and stopping is the
> **normal** way a project ends — not an early or partial completion.

### Why Closure

A project is not done when its last increment deploys — it is done when someone
confirms the scope was met, hands the running system to its operators with
everything they need, and records a durable account of what happened. Without a
terminal stage, projects trail off: the system runs on with no clear owner,
learnings evaporate, and "is this finished?" has no honest answer. Closure makes
the ending deliberate. It is the **rendered view of the completion contract** —
the same claim → verify → accept → close the
[Delegated-Run Spec](../../spec/delegated-run.md#project-level-completion)
defines — performed at human cadence and bookending the Initiation Brief.

### Goals of This Guide

- Produce the **operational-envelope handoff record** — the dev→ops seam an
  operator needs to run the system safely
- Make **production ownership transfer** an explicit, accepted decision
- Close the project against the
  [completion contract](../../spec/delegated-run.md#project-level-completion):
  claimed → verified → accepted → closed
- Run the **project wrap-up retrospective** and route its learnings so nothing
  is stranded
- Produce a single, readable **close-out summary** that bookends Initiation

### Key Principle

Completion is a contract, not a vibe. A project may be claimed complete only
when every in-scope requirement has an explicit disposition, applicable success
criteria have evidence or a measurement plan, and the honest defects and
limitations are disclosed. Closure renders that contract; it does not invent a
second definition of "done."

### Starting Point

A project whose delivered scope is complete — its final increment shipped (or
the project is being sunset) — with: the deployed system live in production, the
[Success Criteria Register](../../templates/success-criteria-register.md), the
project's standing friction log, the increment retrospectives accumulated across
the build, and the completion evidence produced by Verification and the run.

> This stage operates from the **artifacts location**. See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

1. Confirm the project has genuinely reached its terminal — see
   [**Closure Is the Normal Terminal**](#closure-is-the-normal-terminal)
2. Produce the
   [**operational-envelope handoff record**](#the-operational-envelope-handoff-record)
   using the
   [Operational Handoff Template](../../templates/operational-handoff.md)
3. Record the
   [**production-ownership transfer**](#production-ownership-transfer) with the
   [Checkpoint Decision Template](../../templates/checkpoint-decision.md)
4. Close the project against the
   [**completion contract**](#project-closure-rendering-the-completion-contract)
5. Run the [**wrap-up retrospective**](#the-project-wrap-up-retrospective) and
   route its learnings
6. Produce the [Project Close-Out Summary](../../templates/project-closeout.md)
   and complete the [Closure Checklist](checklist.md)

For who runs each step and how autonomously, see the
[Operating Model Guide](../../guides/operating-model.md). For cross-cutting
framework concepts, see [Framework Guide](../../guides/framework.md).

---

## What Closure Owns

Closure is a thin, deliberate terminal — four responsibilities, no ongoing
operations:

| Responsibility                                                           | What it produces                                                     |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| [Operational-envelope handoff](#the-operational-envelope-handoff-record) | The six-item dev→ops seam record                                     |
| [Production-ownership transfer](#production-ownership-transfer)          | A recorded decision accepting ownership of the running system        |
| [Project closure](#project-closure-rendering-the-completion-contract)    | The completion claim closed (claimed → verified → accepted → closed) |
| [Wrap-up retrospective](#the-project-wrap-up-retrospective)              | Routed learnings + the Close-Out Summary                             |

Everything Closure does _not_ own — monitoring, incident response, maintenance,
the standing measurement throughline — belongs to the
[Operations](../../guides/operations.md) process, which begins where Closure
hands off.

---

## Closure Is the Normal Terminal

A project reaches Closure when its delivered scope is complete — the final
increment shipped, or the project is deliberately sunset. **That is a normal
ending, not an early completion.** The old framework treated the trailing
"continuous Support stage" as where projects went to run forever, so a project
that simply finished looked like it had stopped short. Closure fixes that: the
project _closes_ via the completion contract whenever its owner ends it, and the
system it produced carries on under [Operations](../../guides/operations.md).

Closure is **orthogonal to whether the system keeps running.** A system may be
operated for years after its project closes; a throwaway tool may close with no
operations at all. Closing the project is the completion claim; operating the
system is a separate lifecycle. Completion tooling must not flag a project that
closes here as incomplete.

> **Marking Closure N/A.** A project that never produced a running system to
> hand off (a pure spike, an experiment thrown away) still closes — but its
> handoff record collapses to "nothing to operate," and Closure folds to a
> recorded paragraph. Closure never disappears; like every stage, its ceremony
> folds with [consequence](../../guides/right-sizing.md).

---

## The Operational-Envelope Handoff Record

The dev→ops seam. When a project hands a running system to operations, the
operator inherits a system they did not build — they need a precise account of
what it is, how to watch it, and what must stay true. The handoff record is that
account: six items an
[ownership span](../../guides/operations.md#ownership-spans) is operated
against. Produce it with the
[Operational Handoff Template](../../templates/operational-handoff.md).

| #   | Handoff item                   | What it captures                                                                             |
| --- | ------------------------------ | -------------------------------------------------------------------------------------------- |
| 1   | **Identity & observability**   | What the system is, where it runs, and the signals that show whether it is healthy           |
| 2   | **Ongoing operating envelope** | What the system is authorized to do, and the bounds it must stay within                      |
| 3   | **Stop & rollback**            | How to stop it safely and how to revert — the levers an operator pulls under pressure        |
| 4   | **What must stay true**        | The invariants the system must preserve, **including any persisting compliance obligations** |
| 5   | **Ops decision rights**        | Who owns which operational decisions, and which stay non-delegable                           |
| 6   | **Known-state ledger**         | Open issues, deferred work, known limitations, recent changes — the system as it really is   |

The handoff record is what makes [Operations](../../guides/operations.md) safe —
and, for a Lights-Out span, it _is_ the operating envelope the agent runs
within. A handoff with item 4 or 6 missing leaves the operator unable to tell
when the system has left its envelope.

---

## Production-Ownership Transfer

Two human-owned decisions bracket the dev→ops boundary, and they are not the
same decision:

- **Production-ownership transfer** (here, at Closure) — the operator
  **accepts** ownership of the running system, against the handoff record. This
  is Closure's review checkpoint; record it with the
  [Checkpoint Decision Template](../../templates/checkpoint-decision.md).
- **Project closure** (below) — the completion contract's accept → close, ending
  the project.

Both are human-owned; neither substitutes for the other. Ownership transfer says
"someone owns this system now"; project closure says "this project is done." A
project can close while ownership transfers to the same person who built it
(common for a solo developer), or to a separate operations team — the transfer
is recorded either way.

> Whether ownership transfer may itself be cleared by **pre-authorized policy**
> (rather than an interactive human) is the Authority question from the
> [Operating Model Guide](../../guides/operating-model.md#authority--who-may-decide):
> at low consequence a policy may accept ownership; at high consequence or under
> a compliance floor it stays an interactive human decision.

---

## Project Closure: Rendering the Completion Contract

Project closure renders the canonical completion contract — it does not redefine
it. The contract lives in the
[Delegated-Run Spec](../../spec/delegated-run.md#project-level-completion);
Closure performs it at human cadence. Completion runs through four distinct
states (they may coincide for a low-consequence solo project but remain
distinct):

```text
claimed → verified → accepted → closed
```

A project may be **claimed** complete only when every approved in-scope
requirement has an explicit disposition, applicable success criteria have
evidence or a recorded measurement plan, required verification and assurance
pass, the result is inside its operating envelope, and known defects and
limitations are disclosed. **Verified** confirms the claim against evidence;
**accepted** is the human acceptance decision; **closed** is the terminal.

The **Close-Out Summary** is the human-readable render of the **Completion
Evidence Package** — a view over structured state, not a second source. At the
Minimal floor the package folds to **six irreducible elements that never drop**:

1. Approved objective and scope.
2. Final delivered result.
3. Requirements / success-criteria disposition — **every in-scope requirement
   explicitly disposed** (met, descoped, or deferred).
4. Assurance result at the required level (recorded even when the level is
   None/Self).
5. Honest defects, risks, limitations, and deferred work.
6. The acceptance decision.

The honesty floor — explicit disposition of every in-scope requirement, plus
disclosure of known defects and limitations — never folds at any
[consequence](../../guides/right-sizing.md) level. Higher consequence adds
conditional elements (significant decisions/deviations, per-increment outcomes,
deployment evidence, cost/duration), it does not relax the floor.

---

## The Project Wrap-Up Retrospective

The increment retrospectives ran at each increment boundary during the build;
the **project wrap-up retrospective** runs once, at Closure, over the whole
project. It is the project-level cadence of the standing
[learning loop](../../guides/learning-loop.md) — the same mechanism, scoped to
the finished project.

Its job is to guarantee the wrap-up triage actually happens: the friction log is
fully triaged, every entry routed to its owner, and product ideas captured so
they can seed future work.

- **Product** ideas → the idea backlog (a future project or
  [Flow](../../guides/stages.md#flow-delivery-mode) item via Initiation).
- **Process** and **tooling** friction → the operator-named tracker that owns
  the fix (destinations are operator-relative — see
  [The Learning Loop](../../guides/learning-loop.md)).

Capture-locally is the default when no operator-controlled owner exists; a
delegated agent may **prepare** the routed drafts but filing to any external
tracker is a human-authorized action (the agent-prepares-never-publishes rule).
Use the [Retrospective Template](../../templates/retrospective.md) with scope
"Project Wrap-Up."

---

## Right-Sizing Closure

Closure folds with [consequence](../../guides/right-sizing.md), like every stage
— the required _concerns_ are preserved; the _ceremony_ scales:

- **Negligible / Low** — the handoff record collapses to a few lines (or
  "nothing to operate"); the Close-Out Summary is a recorded paragraph;
  ownership transfer is an implicit self-acceptance.
- **Moderate** — a full handoff record, an explicit ownership-transfer decision,
  and a close-out summary that reconciles scope and success criteria.
- **High / Critical** — formal acceptance sign-off, a complete completion
  evidence package, and a handoff record whose compliance and stop/rollback
  items are non-negotiable. Acceptance of irreversible closure (data disposition
  on sunset) is a non-delegable human gate.

What never folds: the completion honesty floor (every in-scope requirement
disposed; defects disclosed) and, when a running system is handed off, handoff
items 4 (what must stay true, including compliance) and 6 (known-state ledger).

---

## Stage Outputs

- **Operational Handoff Record** (`operational-handoff-record`) — the six-item
  dev→ops seam (see [template](../../templates/operational-handoff.md)). Omitted
  only when there is no running system to operate.
- **Project Close-Out Summary** (`project-closeout-summary`) — the readable
  render of the completion contract, bookending the Initiation Brief (see
  [template](../../templates/project-closeout.md)).

> Closure closes the **measurement throughline** for the _project_: success
> criteria are reconciled against outcomes one last time, and any still-pending
> criterion carries a **Re-check Date** into Operations. The standing
> measurement of the running system continues under
> [Operations: Measure](../../guides/operations.md#measure). See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> Closure closes the **learning throughline** for the project: the wrap-up
> retrospective triages the friction log and routes every entry. Ongoing
> operational learning continues under
> [Operations](../../guides/operations.md#the-operational-learning-loop). See
> [The Learning Loop](../../guides/learning-loop.md).

### Closure Decision

Closure's checkpoints are human-owned reviews, not investment gates: the
**Production Ownership Transfer** accepts the running system, and **Project
Closure** accepts the completion claim. Record both with the
[Checkpoint Decision Template](../../templates/checkpoint-decision.md), and
distribute the close-out record to all Informed roles per the
[Information Protocol](../../guides/roles.md#information-protocol).

---

## When to Revisit Closure

- **Completion claim rejected** — verification or acceptance finds the scope is
  not actually met; the project returns to the iterative stages rather than
  closing.
- **Handoff gap found** — the operator cannot safely run the system because the
  handoff record is incomplete; reopen Closure to complete it.
- **Reopened scope** — new in-scope work is authorized after closure; a
  follow-on project re-enters at [Initiation](../initiation/README.md).
- **Post-closure defect** — a defect surfaces in the closed project's system; it
  is handled as [Operations](../../guides/operations.md) work (a
  [Flow](../../guides/stages.md#flow-delivery-mode) fix or a new project), not
  by reopening the closed project.

> **Mid-stage discovery?** If something unexpected surfaces during Closure, see
> the [Mid-Stage Discovery](../../guides/framework.md#mid-stage-discovery)
> decision tree to determine whether to assess, amend, or defer.

---

## Notes

**Last Updated:** 2026-06-20

Added to framework in v0.49.0. Closure replaces the v0.8.0 Support stage slot in
the v0.49 dev/ops split: the continuous operational duties moved to the
[Operations Guide](../../guides/operations.md), and the project-terminal duties
(handoff, ownership transfer, project close-out, wrap-up retro — the latter
shipped as Support's Project Close-Out in v0.47.0) consolidated here as a
terminal stage. Project closure renders the completion contract in the
[Delegated-Run Spec](../../spec/delegated-run.md#project-level-completion).

# Operations Guide

> **New here?** See [Framework Overview](OVERVIEW.md#operations-guide) for what
> this guide is, why it exists, and how to use it. This file is the operational
> reference.

> **Operations is a process, not an SDLC stage.** The SDLC governs a **bounded
> project** that terminates at [Closure](../stages/closure/README.md);
> Operations governs a **standing system** that terminates at
> [decommission](#decommission-the-terminal-of-a-standing-system). They are
> sibling lifecycles that share one [operating model](operating-model.md) — the
> same configurable functions, floors, capability coverage, autonomy ladder, and
> stop enforcement — so either can be performed by humans, agents, or a mix. A
> project _ends_ at Closure; the system it produced is _operated_ here, under
> whoever owns it.

## Key Principle

Operating a system is the same operating model applied to a different unit. A
project is delivered once; a system is operated continuously. What changes is
the unit (system, not project) and the terminal (decommission, not closure) —
not the configurable functions, the floors, or what "running unattended"
requires.

---

## Operations Activities at a Glance

| Activity                  | Question it answers                             | Standing analog of               |
| ------------------------- | ----------------------------------------------- | -------------------------------- |
| **[Observe](#observe)**   | Is the system healthy, and how would I know?    | the run's liveness/observability |
| **[Respond](#respond)**   | Something is wrong or wanted — what do we do?   | the run's escalation + work loop |
| **[Maintain](#maintain)** | What must stay current for it to keep running?  | continuity and upkeep            |
| **[Measure](#measure)**   | Is it still meeting the goals it was built for? | the measurement throughline      |

Autonomy is not a fifth activity — it is a **lens** applied to each of the four
(how much runs without a human), covered in
[Autonomy: The Right-Sizing Lens](#autonomy-the-right-sizing-lens).

---

## Operations vs. the SDLC

The SDLC and Operations are two lifecycles over one
[operating model](operating-model.md). They differ on two things and agree on
the rest.

| Concern             | SDLC (a project)                                     | Operations (a system)                                           |
| ------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| **Unit**            | A bounded body of work                               | A standing, running system                                      |
| **Terminal**        | [Closure](../stages/closure/README.md)               | [Decommission](#decommission-the-terminal-of-a-standing-system) |
| **Shape of work**   | Stages toward a delivered increment                  | Continuous operations activities                                |
| **Operating model** | Configurable functions, floors, coverage, Lights-Out | _The same_ — reused, not redefined                              |

They are not sequential phases where dev ends and ops begins. With continuous
deployment, a system is in production from increment 1, so delivery and
operation **co-exist**: the project keeps delivering increments while the system
is already being operated. The line between them is not a date — it is a
**responsibility transfer** (production ownership), recorded at the
[Closure handoff](../stages/closure/README.md). Delivery _ends_ at project
Closure; operation _continues_ under whoever owns the system.

Operations needs no new primitives. Everything it governs — who performs the
work, who decides, how independently work is evaluated, when it must stop — is
the operating model's, read for a standing system instead of a project. Where
this guide says "supervised," "Lights-Out," "consequence floor," or "capability
coverage," it means exactly what the [Operating Model Guide](operating-model.md)
defines.

---

## Ownership Spans

Operations is performed in **ownership spans** — the standing-system analog of a
[delegated run's authorized span](../spec/delegated-run.md). A span is a bounded
stretch of accountable operation: a named owner (a person, a team, or a
delegated agent under policy) is responsible for the system's health, within a
stated operating envelope, for a stretch of time.

- **A span ends at handoff, not at decommission.** When ownership _transfers_ —
  a new on-call owner, a different team, an agent taking over a Lights-Out
  window — the span ends and a new one begins. The operating concern continues
  unbroken under the new owner; only accountability moves.
- **The system's operation ends only at
  [decommission](#decommission-the-terminal-of-a-standing-system).** Spans come
  and go across the system's life; the life itself ends once, deliberately.
- **The first span begins at the Closure handoff.** The
  [operational-envelope handoff record](../stages/closure/README.md) is what a
  span is operated _against_ — identity and observability, the ongoing operating
  envelope, stop/rollback, what-must-stay-true (including persisting
  compliance), ops decision rights, and the known-state ledger. A span cannot be
  operated safely without it.

For a Lights-Out span, the handoff record _is_ the operating envelope the agent
runs within; an action outside it stops or escalates, exactly as in a delegated
run.

---

## The Four Operations Activities

Operations is organized by what it does, not by who staffs it. Four activities
cover the work; each is right-sized by consequence and run at a chosen
[autonomy](#autonomy-the-right-sizing-lens) level. These four name the _shape_
of operations work — distinct from the operating model's eight
[operating functions](operating-model.md#operating-functions) that both the SDLC
and Operations share.

### Observe

Detect the system's state before users do. Observe is the standing analog of a
run's liveness and observability: it establishes what "healthy" looks like, what
signals are available, and whether the system is actually alive.

- **What to watch.** Application health (error rate, latency, throughput,
  success rate); infrastructure (CPU, memory, disk, connections); and **business
  metrics** — the success criteria defined in Initiation, now read against live
  production data (see [Measure](#measure)).
- **Alerting principles.** Every alert must be actionable; route by consequence
  (page for high, channel for moderate, log for low); alert on symptoms, not
  causes; tune thresholds continuously to prevent fatigue.
- **The observability surface is built, not assumed.** Dashboards, log
  aggregation, and alert routing are set up during
  [Deployment](../stages/deployment/setup.md); Observe is the practice of using
  them. A span whose system cannot be observed to the cadence its consequence
  requires is not Lights-Out-eligible — observability is a capability the
  envelope depends on.

> Concrete monitoring thresholds, baseline tables, and signal catalogs are
> deep-operations reference depth — see [Deep Operations](#deep-operations).

### Respond

The issue loop. Everything that arrives — an alert, an incident, a bug, an
enhancement request — runs the same path:

```text
triage → diagnose → remediate | escalate → verify → close + learn
```

- **Triage** classifies by **consequence** (blast radius × reversibility ×
  detectability), not a fixed severity grid — the same magnitude scale the
  [Right-Sizing Guide](right-sizing.md) defines. Consequence sets both the
  urgency and how autonomously the response may proceed.
- **Diagnose** finds the cause from signals, logs, and recent change.
- **Remediate or escalate.** A response either fixes the system in place or,
  when it exceeds the [remediation boundary](#the-remediation-boundary) or a
  consequence floor, escalates or re-enters delivery.
- **Verify** confirms the system returned to its healthy envelope — the response
  is not closed on an unverified fix.
- **Close + learn** records the outcome and feeds the
  [operational learning loop](#the-operational-learning-loop).

This loop is the same regardless of who runs it; what changes with autonomy is
_who acts_ at each step (see
[the autonomy ladder](#autonomy-the-right-sizing-lens)).

> Formal incident command, severity-matrixed runbooks, communication templates,
> and post-incident-review process are deep-operations reference depth — see
> [Deep Operations](#deep-operations). Record post-incident reviews with the
> [Post-Incident Review Template](../templates/post-incident-review.md).

### Maintain

Keep what the system depends on current, so it keeps running.

- **Dependencies** — scan for vulnerabilities and patch on a consequence-driven
  schedule (the [security throughline](security.md) continues here).
- **Infrastructure** — apply platform and security patches; validate backups;
  perform database upkeep.
- **Certificates and secrets** — track expiry and rotate before it bites.
- **Documentation and runbooks** — keep operational knowledge current after
  incidents and changes, so it does not live only in one person's head. Use the
  [Runbook Template](../templates/runbook.md).

Maintenance work that requires a **software change** crosses the
[remediation boundary](#the-remediation-boundary) and re-enters delivery;
routine upkeep that does not (rotating a credential, applying a managed patch,
refreshing a backup) stays in operations.

### Measure

Operations is where the **measurement throughline** lands. Success criteria
defined in Initiation, baselined at Deployment, are now read against the running
system: is it actually meeting the goals it was built for?

- Compare live values against the baselines and targets in the
  [Success Criteria Register](../templates/success-criteria-register.md).
- Read trends — improving, declining, flat — and act on gaps. A **measurement
  gap** (a goal the system is missing) is itself an input to the
  [ops→dev edge](#the-opsdev-edge): it may justify a Flow change or a new
  project.
- Report on a cadence sized to consequence and stakeholder reach, from an
  informal self-check to a stakeholder report.

See
[Framework Guide: Measurement Throughline](framework.md#measurement-throughline)
for the end-to-end chain.

---

## Autonomy: The Right-Sizing Lens

Each of the four activities can run at a different level of autonomy. The lens
is the operating model's autonomy ladder, applied to operations and gated by
[capability coverage](operating-model.md#capability-coverage) and floored by
[consequence](right-sizing.md):

| Rung             | Who acts                                                 | Coverage it requires                                                                          |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Supervised**   | Agent acts in short steps, each human-reviewed           | signals and observability — enough for a human to check each step                             |
| **Checkpointed** | Agent acts between deliberately placed human checkpoints | + automated diagnosis and safe-remediation primitives in scope                                |
| **Lights-Out**   | Unattended; a human only at floor-forced gates           | + rollback, independent stop enforcement, run continuity — the full unattended coverage floor |

The rungs are the same [operating presets](operating-model.md#operating-presets)
the SDLC uses; operations reads them per activity rather than per stage. A
mature operation is commonly mixed — Lights-Out on Observe and routine Maintain,
Checkpointed on Respond, Supervised on consequential remediation.

**Delegated fixing up to a consequence floor.** Within the
[remediation boundary](#the-remediation-boundary), an agent may remediate
unattended up to a consequence floor, using **pre-authorized conditional
policy** — "continue if the condition holds; escalate if it trips" — exactly as
a [delegated run](../spec/delegated-run.md) clears a gate by policy. Above the
floor, the response **escalates**. The **non-delegable floor** holds regardless
of rung: a high-consequence or irreversible action requires a human gate no
matter how capable the agent (see the
[consequence-floor mapping](right-sizing.md#consequence-floors-on-the-operating-model)).

**Lights-Out operations** is the top rung realized: an agent watches the
observability surface and runs the issue loop unattended, remediating within
policy and pausing only where a floor forces a gate or an exception trips. It is
the same bounded-delegated-run discipline the
[Delegated-Run Spec](../spec/delegated-run.md) defines, with the **system** as
the unit instead of a project.

---

## The Remediation Boundary

The line between what operations fixes and what re-enters delivery is drawn by
one question: **does the fix change the software?**

- **Operational remediation — no software change.** Restart, roll back to a
  prior version, flip a flag or config, scale, fail over, rotate a credential.
  These stay in **operations** and are delegable up to a consequence floor. They
  change the system's _running state_, not its _code_.
- **Software change — any change to code, schema, or logic.** This re-enters
  **delivery**. Operations _triggers_ it; delivery _performs_ it. A small,
  scoped change goes to [Flow](stages.md#flow-delivery-mode); a substantial one
  initiates a **project**.

The boundary is what keeps operations honest about its own envelope: an
operation that quietly patches code is doing delivery work without delivery's
governance. Routing the change out — rather than fixing it in place — is what
gives the change its acceptance criteria, verification, and authorization.

---

## The Ops→Dev Edge

Operations is the front of the next increment as much as the back of the last
one. Three kinds of signal cross from operations back into delivery:

- **Incidents that need a code fix** — the issue loop diagnosed a software
  cause.
- **Enhancement requests** — users or measurement ask for something the system
  does not yet do.
- **Measurement gaps** — a success criterion the system is missing (from
  [Measure](#measure)).

Each crosses the edge as a sized work item, not a vague backlog note:

- A small, low-consequence change → a [Flow issue](../templates/flow-issue.md),
  delivered through [Flow mode](stages.md#flow-delivery-mode).
- A substantial change → a new **project**, entering at
  [Initiation](../stages/initiation/README.md) (often via the idea backlog and
  the [learning loop](learning-loop.md)).

This replaces the old "enhancement backlog as a bridge between locked projects"
pattern with a clean inter-lifecycle edge: operations produces a sized,
provenance-carrying item; delivery picks it up through the work-shape that fits
its consequence. The [Flow issue template](../templates/flow-issue.md) carries
the origin link back to the triggering incident or measurement gap, so the edge
is traceable in both directions.

---

## The Operational Learning Loop

Operations runs the [learning loop](learning-loop.md) on its **operational
cadence** — periodic reviews plus post-incident retros — as a standing practice,
not a heavy pipeline. It is the same loop the rest of the framework uses, placed
here for the running system.

- **Two cadences, one mechanism.** A **periodic** operational retro surfaces
  systemic patterns (recurring toil, slow trends, fragile areas); a
  **post-incident** retro runs after a consequential incident closes. Both feed
  the same idea backlog and the same operator-named trackers as every other
  retro.
- **Route by type, to whoever owns the fix.** Product ideas → the idea backlog
  (→ a future project or Flow item via the [ops→dev edge](#the-opsdev-edge));
  process and tooling friction → the operator-named tracker that owns it. The
  framework fixes the _types_ and the _principle_; the operator's context names
  the _destination_ (see [The Learning Loop](learning-loop.md)).
- **Capture locally by default.** When no operator-controlled owner exists for a
  class of friction, the default is to capture and retain it locally; upstream
  contribution is explicit opt-in.
- **Agent prepares, never publishes.** A Lights-Out operation may consolidate,
  classify, deduplicate, and **prepare** idea or issue drafts as part of its
  evidence. Filing to any external or upstream tracker is a human-authorized,
  outward-facing action; the self-modification boundary forbids an agent
  changing the framework, factory, or governance regardless.

This is the **ops-side capture surface**: the running system's friction and
observations route through the operational cadence of the one learning loop,
with no parallel mechanism.

---

## Decommission: The Terminal of a Standing System

A standing system's life ends once, deliberately, at **decommission** — the
operations terminal that mirrors a project's
[Closure](../stages/closure/README.md). Reaching it is a normal, planned end,
not a failure.

**Decommission is initiated, then run as a small bounded project.** Operations
does not perform a decommission as ad-hoc operational work — retiring a system
is itself a delivery objective with consequence, evidence, and a terminal. An
owner **initiates** it (a sunset decision, an obligation ending, a replacement
going live), and it runs through the SDLC as a bounded decommission project
whose objective is _safe retirement_: data disposition and retention obligations
honored, dependents migrated or notified, access and infrastructure torn down,
evidence archived, and a final decommission record produced and accepted at its
own Closure.

- **What operations supplies** is the initiation trigger and the system's
  known-state — the operating envelope, the compliance obligations that must be
  discharged or transferred, and the known-state ledger from the ownership span.
- **The non-delegable floor still holds.** Data destruction and irreversible
  teardown are high-consequence, irreversible actions — they require a human
  gate regardless of autonomy rung.

The full decommission playbook (data-retention regimes, regulated disposal,
contractual wind-down) is deep-operations content — see
[Deep Operations](#deep-operations).

---

## Deep Operations

`[Reserved]` Enterprise and high-consequence operations carry depth this guide
deliberately does not author in v0.49: formal **incident command** (incident
commander roles, war rooms, communication trees), **disaster recovery** (RTO/RPO
targets, failover drills, backup-validation regimes), **contractual SLAs** (SLO
budgets, penalty tracking, tiered support), 24×7 follow-the-sun on-call, formal
vulnerability-management programs, and regulated decommission/data-disposal
regimes.

These are right-sizing depth, not new operating concerns — they raise the rigor
of the four activities and the spans that run them; they do not change the
model. They will land in a later, deliberate expansion alongside the spec's
`[Reserved]` scale and deep-operations contracts. Until then, operations runs
the four activities at the depth its consequence requires, and escalates beyond
this guide where an obligation or contract demands more.

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.49.0. Operations is the standing-system sibling to the
SDLC, introduced in the v0.49 dev/ops split: the continuous "Support stage" was
dissolved, its terminal project-completion duties moved to the
[Closure stage](../stages/closure/README.md), and its standing operational
content was relocated and reframed here on the shared
[operating model](operating-model.md). Deep-operations depth (incident command,
disaster recovery, SLAs) is `[Reserved]`.

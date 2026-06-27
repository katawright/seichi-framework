# Operating Model Guide

> **New here?** See [Framework Overview](OVERVIEW.md#operating-model-guide) for
> what this guide is, why it exists, and how to use it. This file is the
> operational reference.

> **Sibling to the [Right-Sizing Guide](right-sizing.md).** Right-sizing sizes
> governance _weight_ (Layer A — how heavy the process is); this guide sizes who
> _runs_ the process and how autonomously (Layer B). The two are different
> dials. For the normative contracts behind the functions, floors, ceilings, and
> envelope described here, see the
> [Operating Model Spec](../spec/operating-model.md) — this guide gives the
> rationale and how-to; the spec gives the rules.

## Key Principle

Right-sizing decides _what_ the process requires; the operating model decides
_who or what satisfies it, and how autonomously_. The operator sets intent on
the functions they can configure; project consequence raises floors they cannot
go below, and real capability sets a ceiling they cannot exceed. What survives
between them is the **effective operating envelope**.

---

## How This Differs from Right-Sizing

Right-sizing and the operating model are siblings, not the same dial. They
answer different questions and are driven by different things:

| Concept             | Question it answers                         | Driven by                        |
| ------------------- | ------------------------------------------- | -------------------------------- |
| **Right-sizing**    | How heavy is the process? (which practices) | Consequence, compliance, team    |
| **Operating model** | How much runs without a human?              | Capability, authority, assurance |

They interact in one direction: right-sizing's **consequence and compliance set
floors** on the operating model — higher stakes force a minimum assurance bar
and keep certain decisions human, no matter how autonomous the operator would
like to be.

> **If you used the v0.48 framework:** the old AI Autonomy tiers (Human-Led /
> Collaborative / AI-Led) split here into two cleaner functions — **Work
> Execution** (who does the work) and **Authority** (who decides). The old
> oversight dial is absorbed into **Required Assurance** and **Authority**. The
> per-stage AI-assistance scorecard is retired: gate requirements live in each
> stage's checkpoints, and how autonomously a stage runs is now an
> operating-model choice, not a stage property.

---

## Operating Functions

The operating model runs on a defined set of **operating functions** — the work
performed in any run. The set is the model's and is the same everywhere; whoever
configures and runs the model — the **operator** — expresses their whole job
against these: _configure_ some, ensure _all_ are covered.

| Operating function                | What it covers                                   | Operator configures?              |
| --------------------------------- | ------------------------------------------------ | --------------------------------- |
| **Work execution**                | Producing the work — design, code, tests, docs   | Yes → Work Execution setting      |
| **Workflow administration**       | Routing, checkpoints, moving the process forward | Yes → Workflow Automation setting |
| **Assurance / verification**      | Evaluating the work to the required independence | Yes → Required Assurance setting  |
| **Decision resolution**           | Resolving governance decisions                   | Yes → Authority setting           |
| **Evidence capture**              | Recording what happened, with provenance         | No — standing                     |
| **Escalation & stop enforcement** | Halting or escalating when a limit is crossed    | No — standing                     |
| **Orchestration & integration**   | Coordinating concurrent work and merging it      | No — standing (parallel batches)  |
| **Run continuity & completion**   | Persisting state, reporting, judging "done"      | No — standing (delegated runs)    |

Two kinds:

- **Configurable functions** (four) — the operator sets a posture, its
  _setting_. These are detailed in
  [The Configurable Functions](#the-configurable-functions).
- **Standing functions** (four) — always needed for a run to be safe,
  observable, and durable, with nothing for the operator to tune. Evidence
  capture and stop enforcement always apply; orchestration applies only when a
  run is parallel and run continuity only when it is delegated.

Across **all eight**, [capability coverage](#capability-coverage) asks the same
question — _can a qualified provider actually deliver this function?_ So the
operator configures four functions and assesses all eight; coverage is what
constrains the settings into something achievable.

> The model defines all eight; which ones a given run _engages_ depends on the
> run — a sequential, attended increment engages fewer than an unattended
> parallel batch (orchestration and continuity sit idle). The eight are the
> settled working set. The
> [Operating Model Spec](../spec/operating-model.md#operating-functions) carries
> the normative function list and provider-property requirements.

---

## The Configurable Functions

The operator sets four functions. Each answers one question and nothing else —
that separation is the point.

| Function                | Question it answers                       | Setting                                                     |
| ----------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| **Work Execution**      | Who performs the work?                    | Humans · Collaborative · Agents                             |
| **Workflow Automation** | How is the process administered?          | Manual · Tool-Supported · Automated                         |
| **Required Assurance**  | How independently must work be evaluated? | None · Self · Internal · External                           |
| **Authority**           | Who may decide?                           | Interactive human · Pre-authorized policy · Delegated agent |

### Work Execution — who does the work

The execution _labor_ — all the _doing_, creative as much as mechanical:
interviewing, drafting requirements, designing architecture, writing ADRs and
code, running tests, recording decisions. Producing a design or architecture is
execution; _deciding to accept_ it is Authority — so an agent can fully design a
system while a human, or a delegated agent, still owns whether it is accepted.

- **Humans** — people perform all execution; agents do nothing. The pre-AI
  baseline. Rarely chosen deliberately in an AI-assisted project.
- **Collaborative** — people and agents share the execution work.
- **Agents** — no human execution is expected. Humans still answer questions,
  supply inputs, make decisions, and authorize — none of which is execution. A
  human stepping in to do work is an exception, not a reclassification.

How much an agent does in detail — _which_ functions it covers — lives in
[Capability Coverage](#capability-coverage), not in this setting.

### Workflow Automation — how the process is administered

Routing work, applying checkpoints, capturing evidence, moving the process
forward.

- **Manual** — people administer artifacts, evidence, and checkpoints.
- **Tool-Supported** — software assists; people initiate or resolve routine
  steps.
- **Automated** — software administers routine workflow by defined rules.
  Required for any unattended run — a hand-administered process cannot run
  without a human.

### Required Assurance — how independently work is evaluated

How independent the evaluation must be. The _form_ — a review, tests, an audit —
follows from what is being checked; this setting fixes the _independence_. Set
per concern, not once for the whole project.

- **None** — no defined evaluation required.
- **Self-Assurance** — the performer re-evaluates its own work with **fresh
  eyes** — a context that does not carry the reasoning used to produce it (a
  cold re-read, or a fresh agent context given only the spec and artifact). Not
  a second person.
- **Internal Assurance** — an organizationally independent evaluator checks the
  work.
- **External Assurance** — an independent external party, regulator, or customer
  checks it.

Fresh eyes is the floor the producer–evaluator separation rests on; the spec
states it normatively in
[Function Separation](../spec/operating-model.md#function-separation).

### Authority — who may decide

A "decision" here means a **governance decision** — an acceptance or
authorization the framework marks as a checkpoint (a gate, a review approval, a
sign-off, "is this ready to proceed?"). Not the countless judgments an agent
makes while working — those are execution. Which decisions exist is set by the
governance profile: a Minimal project has few, an Enterprise one has many. (See
the [Checkpoint Taxonomy](checkpoints.md) for the gate / review / alignment
checkpoint types these decisions attach to.)

Each such decision needs exactly one valid way to resolve it:

- **Interactive human** — an authorized person decides in the moment, on the
  evidence. _Use when_ the decision needs human judgment or accountability now
  (investment gates, compliance sign-off).
- **Pre-authorized policy** — a human decides _in advance_ and encodes the
  decision as an explicit rule; at runtime the conditions are checked and the
  outcome follows, with no discretion. _Use when_ the criteria are clear and
  machine-checkable. _Example:_ "approve a PR when CI is green, coverage ≥ 80%,
  and there are no security findings."
- **Delegated agent** — a human authorizes an agent to _make_ the decision
  itself, within explicit bounds, exercising judgment at runtime. _Use when_ the
  decision needs judgment that cannot be reduced to a rule, and the stakes are
  bounded enough to trust it. _Example:_ "decide whether this component design
  is acceptable to build."

**Policy vs. delegated agent** — both require a human to authorize them up
front; the difference is _what_ was authorized. Interactive human and
pre-authorized policy are both **human** decisions — one made now, one made
ahead of time and encoded as a rule — while a delegated agent is the **agent**
making the call within human-set bounds. A policy pre-decides the **outcome**
(no discretion; it only recognizes when it applies); delegation grants the
**judgment** (flexible, but capped by the agent's qualification and the
decision's reversibility).

Some decisions stay with an interactive human regardless of capability —
investment gates and compliance sign-off among them. That non-delegable floor is
set by consequence and compliance (see [right-sizing](right-sizing.md)). When no
valid mechanism can resolve a decision, the work escalates rather than proceeds.
The spec fixes which resolution mode is permitted at each consequence level —
see
[Governance Floors and Capability Ceilings](../spec/operating-model.md#governance-floors-and-capability-ceilings).

---

## Capability Coverage

Coverage is what the operator does _not_ set — they _assess_ it. For each
[operating function](#operating-functions) a run requires, is a qualified
provider — an agent, a tool, a control, or a person — actually able and
available to perform it? It is the same question asked of all eight functions,
including the four the operator configured: setting Work Execution to **Agents**
is intent; coverage asks whether agents can really deliver (and verify) it.

So a setting and its coverage are two different questions about one function —
what the operator _wants_ versus what is _possible_. They meet, function by
function, in the [envelope](#the-operating-envelope).

The part of coverage that most limits how autonomously agents can work is
**verifiability** — whether the work can be checked at all. An agent can be set
to full autonomy, but it can only safely run unattended as far as it can
_verify_ its own results: tests to run, a page it can open, a spec to compare
against. Where it cannot, the work falls back to a human — to the extent the
stakes require.

Coverage is the reality check on intent. Missing coverage does not fail the
project; it **narrows what can proceed without a human — to the extent the
stakes require that function**. If deployment verification is not covered, an
agent can still build and run the deploy; whether a human must verify it first
depends on the consequence floor, not on coverage alone.

> Brownfield readiness is largely a coverage assessment in disguise. A codebase
> with thin test coverage gives an agent little it can verify against, so
> coverage is thin and the envelope (below) stays narrow. See the
> [Brownfield Readiness Guide](brownfield-readiness.md).

---

## The Operating Envelope

The envelope is the payoff of everything above: the set of actions that may
proceed **without routine human involvement**. Everything outside it routes to a
human.

```text
effective operating envelope = what is authorized  ∩  what capability can cover
```

The achievable posture is **intent, clamped between a governance floor and a
capability ceiling**:

| Setting             | Floor — can't go below                             | Ceiling — can't go above                              |
| ------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| Work Execution      | —                                                  | coverage — can agents do the work?                    |
| Workflow Automation | —                                                  | coverage — can software administer the workflow?      |
| Required Assurance  | consequence + compliance (min bar)                 | coverage — can the required independence be achieved? |
| Authority           | consequence + compliance (non-delegable decisions) | coverage — is a qualified delegate available?         |

Note the asymmetry: consequence floors only the two demand-side settings
(assurance and authority); capability ceilings apply to all four. Consequence's
assurance floor **saturates at Internal** — an External assurance floor comes
from compliance or cross-organization Stakeholder Reach, and an outright
Lights-Out ban comes from compliance or a capability gap, never from consequence
(see the [Right-Sizing Guide](right-sizing.md) consequence-floor table, and the
spec's
[floor table](../spec/operating-model.md#governance-floors-and-capability-ceilings)
for the normative cells).

Floor and ceiling are coupled: the floor decides which capabilities are
load-bearing, so a low-consequence project rarely reaches the ceiling at all.
Missing coverage of a function the stakes do not require is an accepted
limitation, not a block.

The clamp is **not one-to-one.** A single setting can be limited by the coverage
of several functions: setting Work Execution to **Agents**, for instance, is
bounded not only by whether agents can _produce_ the work but by whether the
result can be _verified_ (the assurance / verification function) — so a gap in
one function can narrow a different setting.

The envelope is re-evaluated whenever authority, capability, or context changes
— including mid-run. If a required capability disappears, the envelope narrows
and affected work stops or escalates.

> The framework _defines_ the envelope; it cannot _enforce_ it. A tool that
> operationalizes the framework is what detects "this is outside the envelope"
> and holds the work for a human. The
> [Operating Model Spec](../spec/operating-model.md#effective-operating-envelope)
> states the envelope and stop-enforcement contracts a conforming tool must
> honor.

---

## Lights-Out: The Far End of the Spectrum

When the envelope is wide enough that a bounded run needs no routine human
involvement, that run is **Lights-Out**. It is not a separate mode or a
maximum-autonomy switch — it is one calibration of the same settings: agent
execution, Automated workflow, assurance satisfied automatically during the run,
decisions delegated or pre-authorized, and reliable independent stop
enforcement.

**Lights-Out is an operating intent realized to a degree, not a zero-pause
switch.** A run is configured so its _normal path_ needs no human — every
decision on that path is pre-authorized policy or delegated within authority. An
**exception pause** (an escalation condition trips — unexpected cost, a
foundational change, an envelope breach) is the escalation mechanism working as
designed; it does not reclassify the run as "not Lights-Out." The goal is fewer
pause-reasons over time as they are addressed systemically, not a brittle
zero-pause gate. The run lifecycle that a bounded Lights-Out run moves through —
and what a pause, a stop, and completion mean precisely — is specified in the
[Delegated-Run Spec](../spec/delegated-run.md).

Most projects land short of Lights-Out, and that is expected. A brownfield
codebase with thin tests has a narrow envelope — much of its work routes to
checkpoints. To move further along the spectrum, the operator invests where
capability is thin (raising verifiability so more is machine-checkable), and the
envelope widens. The operator decides how far to go; the framework tells them
where they are and what it would take to go further.

---

## Operating Presets

A preset is a **shortcut**: it bundles a complete set of configurable-function
settings _and_ states the **minimum capability coverage** that bundle assumes.
So it answers both halves at once — the posture (intent) and what your
environment must be able to do for that posture to hold. Pick the one that fits,
check your environment against its minimum coverage, and you are configured — no
need to walk the functions one by one.

The minimum coverage rises with autonomy, and that is the whole point. The three
presets form an **autonomy family**, separate from and orthogonal to the
Minimal/Standard/Enterprise governance-weight presets — those size process
weight, these size autonomy:

| Operating preset | Settings, roughly                                                                                                   | Minimum coverage it assumes                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Supervised**   | agents work in short steps, every step human-reviewed; decisions interactive                                        | none — a human checks everything                                                             |
| **Checkpointed** | agents execute between deliberately placed human checkpoints; routine decisions delegated; Self/Internal Assurance  | agents can verify their own work in scope; independent automated assurance where required    |
| **Lights-Out**   | agent execution; Automated workflow; decisions delegated or pre-authorized; pauses only where a floor forces a gate | verifiability across the work; automated assurance; independent stop enforcement; continuity |

Across the three, one axis moves — **how much the agent may do between human
decision points**: at **Supervised**, roughly one reviewable unit, with review
continuous; at **Checkpointed**, a checkpoint's worth, running autonomously
between checkpoints under pre-authorized policy; at **Lights-Out**, the whole
run, except where a floor forces a gate.

The Checkpointed/Lights-Out line is the cadence source: Checkpointed places
human checkpoints as the design _cadence_; Lights-Out runs unattended _except_
where a consequence or compliance floor inserts a non-delegable gate — a bounded
pause, not a downgrade to Checkpointed.

A preset is a default, not a verdict: override any single setting your project
needs differently, then re-check coverage for what you changed. The spec carries
the Lights-Out eligibility conditions each preset must meet — see
[Lights-Out Eligibility](../spec/operating-model.md#lights-out-eligibility).

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.49.0. In v0.51.0 the human-onboarding sections
(Overview / Why / Goals / How to Use) moved to the
[Framework Overview](OVERVIEW.md#operating-model-guide); the operational Key
Principle and the right-sizing / spec sibling callout stay here. Companion to
the [Right-Sizing Guide](right-sizing.md) (Layer A — governance weight) and the
agent-facing [Operating Model Spec](../spec/operating-model.md), which carries
the normative contracts behind these functions: the floors, ceilings, capability
coverage, the effective operating envelope, evaluator independence, and stop
enforcement. The group names "configurable functions" / "standing functions" and
the operating presets (Supervised / Checkpointed / Lights-Out) are settled per
the v0.49 levers rework. Supersedes the v0.48 AI Assistance Scorecard, whose
autonomy and oversight model these functions replace.

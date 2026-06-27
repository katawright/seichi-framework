# Right-Sizing Guide

> **New here?** See [Framework Overview](OVERVIEW.md#right-sizing-guide) for
> what this guide is, why it exists, and how to use it. This file is the
> operational reference.

> **Right-sizing is one of two sibling decisions.** It sizes how _heavy_ the
> process is (governance weight, Layer A). It does not decide who or what _runs_
> that process, or how much of it runs without a human — that is the
> [Operating Model Guide](operating-model.md) (Layer B). Two projects at the
> same consequence level can be operated by one engineer driving agents by hand
> or by an agent running unattended overnight. Size the weight here; decide who
> runs it in the operating model. The two interact in one direction: consequence
> and compliance set **floors** the operating model cannot go below.

## Key Principle

Match your process investment to your project's actual consequence, obligations,
and stakeholder reach. **Consequence** determines _what_ practices you adopt,
**compliance** makes certain practices mandatory regardless of consequence, and
**stakeholder reach** determines _how much coordination and formality_ surround
them.

---

## The Three Dimensions of Governance Weight

Right-sizing answers one question — _how heavy should the process be?_ — using
three dimensions. It deliberately stops there. A separate decision, _who or what
runs the process and how autonomously_, belongs to the
[Operating Model Guide](operating-model.md).

> **If you used the v0.48 framework:** the old "Three Dimensions" were Project
> Risk, Team Size, and AI Autonomy. v0.49 splits **Project Risk** into
> **Consequence** (a magnitude) and **Compliance** (a flag), renames **Team
> Size** to **Stakeholder Reach** (now accountability boundaries, not
> headcount), and moves **AI Autonomy** out to the operating model. The named
> tiers **Minimal / Standard / Enterprise** survive as governance-weight presets
> — they map to consequence (Low → Minimal, Moderate → Standard, High →
> Enterprise; Negligible and Critical sit off the preset grid).

### Consequence → _What_ Practices

Consequence is the primary driver of process weight: **how bad is it if this
goes wrong?** It is a _magnitude of harm_, read along three properties —

- **Blast radius** — who and how much is affected if it fails (one local user, a
  team, all customers, financial or safety impact).
- **Reversibility** — how easily a bad outcome is undone (a quick revert, or an
  irreversible data loss or public exposure).
- **Detectability** — whether a failure would be noticed before it does harm.

Read together, those three properties place a project against five reference
anchors:

| Anchor         | Harm if it fails                                                                         |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Negligible** | Affects essentially no one beyond the builder; fully reversible — toy, spike, experiment |
| **Low**        | Small known group (a few internal users, a team); inconvenient, easily recovered         |
| **Moderate**   | Real users or dependent teams/services; meaningful cost; recoverable with effort         |
| **High**       | Wide-reaching, costly, slow or hard to reverse — serious financial/operational harm      |
| **Critical**   | Irreversible severe harm — safety, life, catastrophic financial/legal                    |

You assign consequence by judgment, not measurement — harm has no units, so no
project lands exactly on an anchor; you _match_ it to the nearest one. A coarse
scale is enough because what consequence drives — which practices run, which
decisions stay human — comes in steps, not a smooth dial. When a project falls
between two anchors, lean to the heavier one when a failure would be hard to
undo or hit many people, and to the lighter one when it is cheap to reverse.

This scale measures _harm_, not _governance_. A **negligible consequence** does
not mean negligible governance: every level keeps the framework's structure —
"what are we building," goals and requirements, a high-level design, an
increment plan. What scales is **ceremony and decision rights** — checklists,
gates, human decision points — which at Negligible collapse to a conversation, a
short document of understanding, a quick review, then agents build. The
framework's folded-stages principle preserves the structure; only its
presentation thins. Both ends still run the full structure: **Negligible** folds
it into a conversation and a quick review, and **Critical** makes consequential,
irreversible transitions non-delegable — mandatory human gates plus independent
stop-enforcement.

> **"Consequence" is not the same as two other things called "risk."** Keep
> three distinct:
>
> - **Consequence** (here) — the standing magnitude that sets process weight.
> - The **risk register** (Initiation) — specific, named project threats and
>   their mitigations. A high-consequence project carries a heavier register,
>   but the register is a list of threats, not the weight dial.
> - **Brownfield readiness** — how much an existing codebase lets an agent work
>   and verify safely. That is a _capability_ input to the operating model, not
>   a consequence level. See
>   [Brownfield Readiness Guide](brownfield-readiness.md).

### Compliance → Mandatory Obligations

Compliance is **not** a magnitude — there is no "how much compliance" dial. But
it is **more than a single yes/no flag**: it is a _set of obligation sources_,
each carrying mandatory requirements that hold regardless of consequence. "Off"
is simply the empty set; a project can be under several at once (HIPAA +
PCI-DSS + SOC 2 + GDPR).

Each active obligation has:

- **A source** — regulatory (HIPAA, GDPR, SOX), contractual (a customer DPA or
  security addendum), certification (PCI-DSS, SOC 2, ISO 27001), or internal
  policy (an org data-classification or security standard). The source decides
  who, if anyone, may grant an exception.
- **A scope** — the whole project, or only the data, components, or flows the
  obligation touches. _(v0.49 operates compliance project-wide; per-component
  scope is a named, forward-looking property.)_
- **A payload** — the actual obligations, which land as **hard floors on the
  other operating-model functions**: decisions that must stay human (Authority),
  an independence floor on evaluation (Required Assurance), separation of duties
  (function separation), retained and auditable evidence (evidence capture), and
  data-residency or provider constraints (capability coverage). It may also cap
  autonomy — forbidding Lights-Out for specific actions.

The distinction from consequence is the whole point of splitting them:
**consequence sets soft, graduated floors you can accept risk against;
compliance sets hard, categorical floors you cannot.** A project can be
low-consequence yet carry compliance, or high-consequence with none. Its overall
burden is _emergent_ from the summed payloads of its active obligations — not a
level you set.

> The framework defines the _shape_ of this dimension — scoped obligation
> sources mapping to floors on named operating-model functions — not the
> contents of each named regime. Mapping a specific regulation (what HIPAA
> obligates, field by field) is a compliance-mapping library, outside v0.49's
> scope.

> **Data sensitivity.** Regulated or policy-governed sensitive data lands as a
> Compliance obligation. Purely-informal sensitivity under no governing
> obligation routes through **Consequence** — it raises the blast radius of a
> confidentiality failure; if a leak would genuinely cost nothing, there is
> nothing to size. There is no separate sensitivity dimension.

### Stakeholder Reach → _Coordination & Formality_

Stakeholder reach sets how much coordination and communication ceremony the work
carries. The driver is not _how many_ people are involved — it is **how far
across accountability boundaries** the work and its sign-offs must travel. Each
crossing forces a step up in formality, because you can no longer rely on shared
context and an informal word.

Four ordinal levels, from no boundary to the outermost:

| Reach           | Who must coordinate / be answered to                              | What it adds                                                                             |
| --------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Solo**        | One builder                                                       | Nothing — self-review only; no handoffs                                                  |
| **Within-team** | One building team, shared context                                 | Peer review, light handoffs, a shared working record                                     |
| **Cross-team**  | Stakeholders elsewhere in the organization                        | Explicit shared artifacts, defined interfaces, scheduled syncs                           |
| **Cross-org**   | Parties outside the organization (a client, an external customer) | Formal agreements, documented sign-off, deliverable evidence, contractual accountability |

This dimension is **discrete and bounded**, unlike consequence: you either cross
the org boundary or you do not, so there is no continuum to band — and there is
a **ceiling**. Cross-org is the top. What looks like a level beyond it (the
public, the market, a regulator) is not more of _this_ dimension; its weight
redistributes to **Compliance** (a regulator is an obligation source) and
**Consequence** (public failure is a larger blast radius).

A few consequences of measuring boundaries, not headcount:

- **Headcount within a boundary is second-order.** A 20-person co-located team
  is still "within-team" — the step-changes come from crossings, not growth.
- **Solo is genuinely distinct from within-team.** A solo builder can only ever
  _self_-assure (one human); a second teammate unlocks an independent set of
  eyes, which raises the assurance independence the project can reach (see the
  [Operating Model Guide](operating-model.md), Required Assurance).
- **Agents are not counted.** Their coordination is mechanized by the
  methodology, so it costs the same whether 2 agents or 100 run. How many actors
  do the work is an operating-model / capability question, not a
  stakeholder-reach one.
- **Size the project's reach, not the org's.** A 1,000-person company building a
  small internal tool with a 4-person team and two cross-team stakeholders is
  _cross-team_ for that project.

See
[Framework Guide: Right-Sizing Your Process](framework.md#right-sizing-your-process)
for formality adjustments within each level.

### Who Runs It Is a Separate Decision

> **This replaces the v0.48 "AI Autonomy" dimension.** In v0.48, right-sizing
> also tried to set _how much AI drives_ the work. v0.49 separates that out: it
> is not a governance-weight question, and bundling it here forced unrelated
> choices to move together.

How independently agents operate, who performs the work, and who decides are now
**operating-model** choices, set in the
[Operating Model Guide](operating-model.md):

- The old **AI Autonomy** tiers (Human-Led / Collaborative / AI-Led) split into
  two cleaner functions — **Work Execution** (who does the work) and
  **Authority** (who decides).
- The old **oversight intensity** dial (Active / Passive / Minimal) is absorbed
  into **Required Assurance** and **Authority**.

Right-sizing still constrains those choices: consequence and compliance set
**floors** — higher stakes force a minimum assurance bar and keep certain
decisions human — but the choices themselves live in the operating model. See
[Consequence Floors](#consequence-floors-on-the-operating-model) below.

---

## How Each Dimension Shapes the Stages

The three dimensions act on every stage differently. The tables below read each
dimension _across_ the eight stages, with the standing
[Operations](operations.md) process shown alongside Closure because its weight
also scales with the same dimensions. For any one stage, you read all three and
stack what applies.

### How Consequence Shapes Each Stage

Consequence scales **technical rigor and blast-radius control** — verification
depth, failure handling, and reversibility. Verification is the steepest of
these.

| Stage / Process                                              | Negligible                             | Low                                     | Moderate                                                | High                                                              | Critical                                                                   |
| ------------------------------------------------------------ | -------------------------------------- | --------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **[Initiation](../stages/initiation/README.md)**             | Intent stated in a sentence            | One-line problem statement              | Explicit, measurable success criteria                   | Named risks; failure modes pinned down before building            | Failure/hazard analysis; mandatory authorization to proceed                |
| **[Requirements](../stages/requirements/README.md)**         | Happy path held in conversation        | Core happy-path stories                 | Documented NFRs (performance, reliability, security)    | Edge and failure cases; failure handling becomes a requirement    | Exhaustive spec incl. failure/safety requirements; human sign-off          |
| **[System Design](../stages/system-design/README.md)**       | A mental model; key choice noted       | Informal notes                          | Documented architecture; ADRs for consequential choices | Explicit failure-mode, recovery, and blast-radius design          | Formal architecture and failure/safety review before build                 |
| **[Increment Design](../stages/increment-design/README.md)** | Implied next step                      | Task list                               | Component specs, interface contracts                    | Per-increment test and risk strategy                              | Risk-assessed plan; consequential increments gated to a human              |
| **[Implementation](../stages/implementation/README.md)**     | Working code                           | Working code with smoke tests           | Coverage targets on critical paths                      | Defensive handling and instrumentation                            | Comprehensive coverage; consequential changes reviewed by a human          |
| **[Verification](../stages/verification/README.md)**         | Does it run?                           | Manual checks                           | Automated integration/functional suites                 | Performance, security, and accessibility testing; formal go/no-go | Independent verification; mandatory (non-waivable) go/no-go                |
| **[Deployment](../stages/deployment/README.md)**             | Run it locally                         | Manual push                             | CI/CD with staging and rollback                         | Canary/blue-green and progressive rollout                         | Progressive rollout with mandatory approval gates; rehearsed rollback      |
| **[Closure](../stages/closure/README.md)**                   | Recorded paragraph; nothing to operate | Self-accepted handoff + brief close-out | Handoff record + reconciled close-out summary           | Formal acceptance; complete completion-evidence package           | Non-delegable acceptance of irreversible closure; full evidence + sign-off |
| **[Operations](operations.md)** _(process)_                  | Notice if it breaks                    | Health check                            | APM, alerting, and on-call                              | Full observability and incident management                        | 24×7 monitoring and incident management; fast detection and recovery       |

> The five columns are the consequence anchors. **Negligible** keeps the full
> structure but folds ceremony into a conversation and a quick review, and
> **Critical** makes consequential, irreversible actions non-delegable human
> gates (bounded pauses within a run, not a blanket Lights-Out ban — an outright
> ban comes from compliance or a capability gap). See
> [Consequence Floors](#consequence-floors-on-the-operating-model).

### How Compliance Shapes Each Stage

Compliance is a flag (per scope). Where it applies, it adds **mandatory
evidence, sign-off, and auditability** — present or absent, with the specifics
set by the regime (the mapping library), not by a gradient.

| Stage / Process            | What compliance adds when it applies                                                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Initiation**             | Identify applicable regimes and obligations; record authorization and compliance scope in the brief.                                                              |
| **Requirements**           | Capture compliance requirements explicitly and traceably; classify data; obtain documented sign-off.                                                              |
| **System Design**          | Compliance-by-design (data residency, encryption, access control, privacy); documented security/privacy design review; compliance rationale recorded in ADRs.     |
| **Increment Design**       | Trace each increment to the compliance requirements it satisfies; risk assessment where the regime mandates it.                                                   |
| **Implementation**         | Audit trail of changes, separation of duties (author ≠ approver), mandated security scanning, controlled-change records.                                          |
| **Verification**           | Independent or external assurance; retained, auditable test evidence; regime-specific testing (security pen-test, accessibility conformance).                     |
| **Deployment**             | Change-management approval records, segregation of duties in release, controlled production access, documented deployment evidence.                               |
| **Closure**                | Capture persisting compliance obligations in the handoff record; retain the completion-evidence package for audit; non-delegable acceptance of regulated closure. |
| **Operations** _(process)_ | Audit logging and evidence retention; mandated incident reporting (e.g. breach notification); contractual SLA records.                                            |

### How Stakeholder Reach Shapes Each Stage

Stakeholder reach scales **coordination and communication formality** — who
reviews, who hands off, and who signs.

| Stage / Process            | Solo                  | Within-team                 | Cross-team                                       | Cross-org                                                |
| -------------------------- | --------------------- | --------------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| **Initiation**             | Personal note         | Shared brief                | Stakeholders consulted, scope agreed             | Formal kickoff; client sign-off on objectives            |
| **Requirements**           | Self-captured         | Team review                 | Stakeholder agreement on a shared backlog        | Client requirements sign-off; change process             |
| **System Design**          | Personal              | Team design review          | Interface contracts published to dependent teams | Architecture approved with the client                    |
| **Increment Design**       | None                  | Light shared plan           | Cross-team dependency and interface coordination | Client-visible plan and delivery schedule                |
| **Implementation**         | Self-review           | Peer review (PR + approver) | Cross-team review of shared components           | Deliverable handoff; client-visible progress             |
| **Verification**           | Self-verify           | Team verification           | Stakeholder UAT, cross-team integration          | Client UAT; formal acceptance sign-off                   |
| **Deployment**             | Just deploy           | Coordinated team deploy     | Change comms, coordinated windows                | Client-approved deploy; scheduled windows; release notes |
| **Closure**                | Self-accept + close   | Team close-out review       | Stakeholders sign off on handoff + closure       | Client acceptance; formal handoff sign-off               |
| **Operations** _(process)_ | Informal self-support | Team rotation               | Defined handoff, internal escalation paths       | External support channels; formal incident communication |

### Reading the Three Together

For any one stage, read all three tables and stack what applies — they are
additive and independent. "Independent" means you set each dimension on its own;
it does **not** mean their effects never touch: Compliance and Stakeholder Reach
can both call for a sign-off, and Consequence and Compliance can both call for
retained evidence — for different reasons. Where two land on the same artifact,
produce it once and let it satisfy both.

The [common project shapes](#common-project-shapes) below are named combinations
of these three dimensions — a way to recognize your project at a glance, not a
fourth thing to set.

---

## How Each Dimension Shapes the Gates

The two hard **gates** are not stages — they are the investment decisions that
ride the stages: **Gate 1** at the close of Initiation, **Gate 2** at the close
of System Design. _Who_ resolves a gate — an interactive human, a pre-authorized
policy, or a delegated agent — is an [Operating Model](operating-model.md)
(Authority) choice; right-sizing only sets the floor that keeps the
consequential gates human.

| Gate       | Position               | The investment decision it makes                                                                                                                                            |
| ---------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gate 1** | Close of Initiation    | Approve the business case — problem, stakeholders, risks, sponsor commitment — to invest in discovery (the Requirements stage).                                             |
| **Gate 2** | Close of System Design | Approve the accumulated requirements, the system design and its security/risk posture, and the cost and time estimates against budget — the go/no-go to commit to building. |

| Gate       | Negligible                                                                 | Low                                                     | Moderate                                                       | High                                                     | Critical                                                            |
| ---------- | -------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| **Gate 1** | Folded in — the go/no-go folds into a glance-and-go (no separate ceremony) | Recorded self-gate ("worth building?")                  | Deliberate go/no-go on the business case                       | Reviewed go/no-go; risks and sponsor commitment explicit | Mandatory, non-delegable authorization to proceed                   |
| **Gate 2** | Folded in — design and "build it" are one step                             | Recorded self-gate (design sound, estimate acceptable?) | Deliberate go/no-go: requirements, design, estimate vs. budget | Reviewed go/no-go incl. security/risk posture            | Mandatory, non-delegable build authorization (a bounded human gate) |

Where a compliance obligation applies, Gate 1 adds a recorded, auditable
decision with applicable regimes identified before investing; Gate 2 adds a
non-delegable human sign-off, documented security/privacy review, and separation
of duties (preparer ≠ approver).

---

## Other Scaling Factors

Two things adjust process shape without being governance-weight dimensions.

### Project Type — Greenfield vs. Brownfield

Greenfield and brownfield projects use the same dimensions but differ in
foundation work and stage emphasis. See
[Framework Guide: Greenfield vs. Brownfield Projects](framework.md#greenfield-vs-brownfield-projects).
Brownfield readiness also feeds the operating model as a capability input — see
[Brownfield Readiness Guide](brownfield-readiness.md).

### CD as a Delivery Practice Modifier

CD (Continuous Deployment) is orthogonal to governance weight — it changes
_when_ iterative stage activities happen, not _whether_ they happen. A project
can be low-consequence+CD or high-consequence+CD.

| Stage                | Without CD (batch)                 | With CD (per-slice)                                         |
| -------------------- | ---------------------------------- | ----------------------------------------------------------- |
| Implementation       | All slices, then increment gate    | Per-slice gate (PR + CI); summary at close                  |
| Verification         | Batch verification after code      | Per-slice CI; increment-close summary                       |
| Deployment           | Discrete deployment event          | Per-merge automated pipeline                                |
| Closure / Operations | Close-out + handoff at project end | Operations monitoring active from first deploy (continuous) |

For the full model, see
[Framework Guide: CD Workflow Adaptations](framework.md#cd-workflow-adaptations).
For stage-specific CD guidance:

- [Implementation: Per-Slice Gates](../stages/implementation/README.md#cd-projects-per-slice-gates)
- [Verification: Lightweight Verification](../stages/verification/README.md#cd-projects-lightweight-verification)
- [Deployment: Minimal Deployment](../stages/deployment/README.md#cd-projects-minimal-deployment)
- [Operations: standing monitoring from the first deploy](operations.md#observe)

---

## Common Project Shapes

The three dimensions are the model: set them directly — an agent operating the
framework interviews the operator to land each one — and the per-stage and
per-gate matrices above give the shape. The shapes below are **not a fourth
thing to choose.** They are common _combinations_ of the three dimensions, named
so you can recognize your project at a glance. They are deliberately **not a
ladder** and **not exhaustive**; when nothing fits, set the three dimensions
directly.

| Shape                  | Consequence   | Compliance              | Reach       | Typical project                                              |
| ---------------------- | ------------- | ----------------------- | ----------- | ------------------------------------------------------------ |
| **Spike / experiment** | Negligible    | none                    | Solo        | Throwaway prototype, learning spike, personal script         |
| **Internal tool**      | Low           | none                    | Within-team | A team utility or dashboard with a handful of known users    |
| **Team service**       | Moderate      | none                    | Cross-team  | A shared internal service other teams depend on              |
| **Customer product**   | High          | none or light           | Cross-org   | Customer-facing SaaS with real users and uptime stakes       |
| **Regulated platform** | High–Critical | one or more obligations | Cross-org   | Healthcare, payments, or safety-critical systems under audit |

These shapes track the **diagonal** — the common case where stakes, obligations,
and reach rise together. Because the dimensions are independent, off-diagonal
projects are normal: a **solo dev on a tiny tool that touches regulated data**
(Low consequence, compliance **on**, Solo reach), or a **safety-critical control
built solo** (Critical consequence, no compliance, Solo reach). For those, set
each dimension on its own — that independence is the point.

> **Spikes and experiments** often run locally and never deploy to shared
> infrastructure, so the Deployment stage (and any standing operation) may not
> apply — or is deferred until the project grows — see
> [Deployment Setup Guide](../stages/deployment/setup.md#when-you-dont-need-this-guide).
> Closure still happens, folded to a recorded paragraph (nothing to operate).

### Minimum Viable Artifacts

Which templates to produce, driven primarily by **consequence**. **Required** =
must complete before the stage gate; **Recommended** = high value, skip only
with justification; **Optional** = use when the project calls for it. Compliance
and reach add to this: a compliance obligation forces specific artifacts
regardless of consequence, and wider reach adds sign-off artifacts. These levels
govern when each brief is **rendered as a formal view** — the underlying
decisions are always captured in the
[canonical project state](../spec/canonical-state.md) regardless (the
single-source rule); a lower level folds the view into lighter notes or another
brief, it does not drop the work.

| Template                                                               | Stage            | Low         | Moderate    | High        |
| ---------------------------------------------------------------------- | ---------------- | ----------- | ----------- | ----------- |
| [Initiation Brief](../templates/initiation-brief.md)                   | Initiation       | Required    | Required    | Required    |
| [Gate Decision](../templates/gate-decision.md)                         | Initiation       | Optional    | Required    | Required    |
| [Success Criteria Register](../templates/success-criteria-register.md) | Initiation       | Recommended | Recommended | Required    |
| [Requirements Brief](../templates/requirements-brief.md)               | Requirements     | Recommended | Required    | Required    |
| [System Design Brief](../templates/system-design-brief.md)             | System Design    | Optional    | Required    | Required    |
| [ADR](../templates/adr.md)                                             | System Design    | Optional    | Recommended | Required    |
| [Increment Design Brief](../templates/increment-design-brief.md)       | Increment Design | Optional    | Required    | Required    |
| [Implementation Brief](../templates/implementation-brief.md)           | Implementation   | Optional    | Required    | Required    |
| [Session Log](../templates/implementation-session-log.md)              | Implementation   | Optional    | Recommended | Required    |
| [Verification Brief](../templates/verification-brief.md)               | Verification     | Optional    | Required    | Required    |
| [Deployment Brief](../templates/deployment-brief.md)                   | Deployment       | Optional    | Required    | Required    |
| [Runbook](../templates/runbook.md)                                     | Deployment       | Optional    | Recommended | Required    |
| [Operational Handoff](../templates/operational-handoff.md)             | Closure          | Optional    | Required    | Required    |
| [Project Close-Out](../templates/project-closeout.md)                  | Closure          | Recommended | Required    | Required    |
| [Retrospective](../templates/retrospective.md)                         | Increment cycle  | Recommended | Recommended | Required    |
| [Friction Log](../templates/friction-log.md)                           | All stages       | Recommended | Recommended | Required    |
| [Checkpoint Decision](../templates/checkpoint-decision.md)             | Any              | Optional    | Optional    | Recommended |

> **At Negligible consequence**, the Initiation Brief is the only artifact that
> remains — often just a recorded paragraph — and everything else folds into the
> conversation (Closure included). **At Critical**, treat the High column as
> all-Required with mandatory human sign-off.

> **CD projects:** Verification Brief, Deployment Brief, and the Operational
> Handoff remain applicable but shift to increment-close summaries. See each
> stage's CD subsection for what to include.

---

## The Negligible Folded Path

Negligible consequence is the one shape an agent should recognize **before
front-loading the framework** and route to deliberately — not discover stage by
stage. It is the operating floor of the folded-stages principle: the whole
process runs as a single conversation, and only the floor is materialized.

When the early read is Negligible — the **Spike / experiment** shape, no
compliance, blast radius confined to the builder, fully reversible — take the
folded path:

1. **Materialize only the floor** — the classification core (router, this guide)
   is already read to get here, the Initiation stage has been entered, and the
   governance spine loads but has next to nothing to apply at Negligible; beyond
   that, **render and write only** the Initiation floor, deferring every
   downstream stage guide and template the tier folds away (see
   [Read Order and the Load Line](agentic-workflow.md#read-order-and-the-load-line)).
2. **Run the process as one conversation** — Initiation → Requirements → Design
   fold together; **Gate 1 and Gate 2 fold** ("you just start"; design and build
   are one step); Closure folds into the conversation.
3. **Materialize the paragraph-brief only** — the Initiation Brief is the single
   surviving artifact, often a recorded paragraph (see
   [Minimum Viable Artifacts](#minimum-viable-artifacts)) — then agents build.
4. **Keep the decisions, fold the ceremony** — problem, intent, a high-level
   shape, and a quick look-before-you-build still happen; only their
   presentation and artifacts thin to the floor the tier already authorizes.

**Hard boundary — thin ceremony, never the floor.** Consequence sets _soft_
floors; compliance sets _hard_ ones. The folded path may thin ceremony and
artifacts, **never** the compliance floor or the non-delegable floor. A
**Negligible project that carries compliance** — a tiny tool touching regulated
data — is folded in ceremony but keeps every categorical obligation; it is not
the folded path's free case, so classify compliance _before_ folding.

---

## Consequence Floors on the Operating Model

Consequence floors two operating-model settings — **Required Assurance** and
**Authority** — and nothing else (Work Execution and Workflow Automation are
ceilinged by capability, not floored by consequence). The floors are
**minimums**: going above one is always fine; going below requires a recorded
risk-acceptance (consequence floors are soft and graduated — compliance floors,
by contrast, are hard and not waivable). The last column maps each anchor to the
governance-weight preset it sits at.

> **[Informative].** This table is the right-sizing reader's view of the floor
> mapping. The **normative** source is the
> [Operating Model Spec: Governance Floors and Capability Ceilings](../spec/operating-model.md#governance-floors-and-capability-ceilings);
> the cells here reproduce it for convenience and must track it if they ever
> diverge.

| Consequence    | Required Assurance floor                                      | Authority floor                                                                   | Lights-Out                                                                 | Governance-weight preset    |
| -------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------- |
| **Negligible** | None                                                          | none non-delegable                                                                | eligible (glance-and-go)                                                   | off-grid (below Minimal)    |
| **Low**        | Self                                                          | acceptance delegable                                                              | eligible                                                                   | Minimal                     |
| **Moderate**   | Internal _if an independent provider is available_, else Self | gate decisions human-or-policy                                                    | eligible, bounded pauses                                                   | Standard                    |
| **High**       | Internal (required)                                           | gate decisions non-delegable                                                      | eligible; gated at irreversible transitions                                | Enterprise                  |
| **Critical**   | Internal (required)                                           | all gate decisions non-delegable + independent stop-enforcement coverage required | eligible up to non-delegable gates; no _delegated_ irreversible transition | off-grid (above Enterprise) |

**Consequence saturates at Internal.** Magnitude alone never floors assurance
above Internal and never turns Lights-Out off. **External** assurance is floored
by **Compliance** or cross-org reach (an accountability boundary), and an
outright Lights-Out ban comes from **Compliance** or a **capability gap** —
never from consequence. What the top of the scale does on its own is make
irreversible- transition gates non-delegable and require independent
stop-enforcement; both are bounded human pauses, which keep a run Lights-Out
rather than ending it. The operating model consumes these floors — see the
[Operating Model Guide](operating-model.md).

---

## Re-Size as the Project Evolves

A project's shape is not fixed — re-size when a dimension moves:

- **Consequence rises** — a prototype gains real users; a tool starts handling
  money, or decisions with safety or legal weight.
- **A compliance obligation appears** — entering a regulated market, or signing
  a customer security addendum (the compliance flag often flips before
  consequence fully rises).
- **Reach widens** — work crosses a team or organization boundary, adding
  coordination and sign-off.
- **Local-only → deployed** — a project that started without deployment
  infrastructure gains users or moves to production. Introduce deployment using
  the [Deployment Setup Guide](../stages/deployment/setup.md) and
  [Project Foundation Guide](project-foundation.md) — treat it as foundation
  work for the deployment dimension.

**A Negligible toy that grows up does not escalate tier in place.** The
[folded path](#the-negligible-folded-path) leaves no full artifacts to upgrade,
so re-sizing it mid-flight is not the clean move. Instead **complete** the toy
(it is near-floor and cheap to finish) or **halt** it, then re-enter the larger
ambition as a **new, properly-tiered project** seeded by the paragraph-brief —
lean toward completing. **Guardrail:** complete-then-re-enter is available only
when _finishing_ the toy does not itself breach a hard floor; the moment
compliance applies, the blast radius turns non-trivial, or completion would be
an irreversible high-consequence transition, the work was never the folded
path's case — halt and re-tier instead.

Reassess at major milestones — particularly after Initiation and Requirements,
where expansion triggers signal more rigor is needed:

- [Initiation Guide: Right-Sizing Initiation](../stages/initiation/README.md#right-sizing-initiation)
- [Requirements Stage Guide: Right-Sizing Requirements](../stages/requirements/README.md#right-sizing-requirements)

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.13.0. In v0.51.0 the human-onboarding sections
(Overview / Why / Goals / How to Use) moved to the
[Framework Overview](OVERVIEW.md#right-sizing-guide); the operational Key
Principle and the operating-model sibling callout stay here. v0.51.0 also added
**The Negligible Folded Path** as an operational route and the toy-grows-up
re-classification rule to **Re-Size as the Project Evolves** (RC-2). Reorganized
in v0.49.0 around the three **governance-weight** dimensions — **Consequence**,
**Compliance**, and **Stakeholder Reach** (the Layer-A anchor definitions the
[Operating Model Spec](../spec/operating-model.md#governance-floors-and-capability-ceilings)
references) — with _who runs the process_ moved to the sibling
[Operating Model Guide](operating-model.md) (Layer B). The dev/ops split retired
the Support row in favor of **Closure** (terminal stage) and the standing
**[Operations](operations.md)** process; the Minimal/Standard/Enterprise tiers
are retained as governance-weight presets mapped to consequence
(Low/Moderate/High; Negligible and Critical off-grid).

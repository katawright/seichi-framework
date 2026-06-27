# Framework Overview

The friendly tour of the AI-Assisted SDLC framework — what each guide is, why it
exists, and how to use it. This is the **human-facing orientation layer**,
lifted out of the operational guides so a person can get oriented in one place
without reading every guide end to end.

> **Agents: do not load this file.** It carries no operational rules — only
> orientation an executing agent does not need. Each guide's binding content
> lives in the guide itself; read stage-scoped per
> [Read Order and the Load Line](agentic-workflow.md#read-order-and-the-load-line).
> Every section below links to its operational guide for the real work.

## Contents

- [Operating Model Guide](#operating-model-guide)
- [Right-Sizing Guide](#right-sizing-guide)
- [Agentic Workflow Guide](#agentic-workflow-guide)
- [Checkpoint Taxonomy](#checkpoint-taxonomy)
- [Security Guide](#security-guide)
- [Framework Guide](#framework-guide)
- [Roles and Responsibilities](#roles-and-responsibilities)
- [Stages Guide](#stages-guide)
- [The Learning Loop](#the-learning-loop)
- [Operations Guide](#operations-guide)
- [Organizational Adoption Guide](#organizational-adoption-guide)
- [Bootstrap Guide](#bootstrap-guide)
- [Delivery Operating Guide](#delivery-operating-guide)
- [DevOps Integration Guide](#devops-integration-guide)
- [Project Foundation Guide](#project-foundation-guide)
- [Parallel Scheduling Guide](#parallel-scheduling-guide)
- [Parallel Execution Guide](#parallel-execution-guide)
- [Worked Example (Greenfield)](#worked-example-greenfield)
- [Worked Example (Solo)](#worked-example-solo)
- [Brownfield Preparation Guide](#brownfield-preparation-guide)
- [Brownfield Readiness Guide](#brownfield-readiness-guide)
- [Brownfield Approach Guide](#brownfield-approach-guide)
- [Brownfield Enablement Guide](#brownfield-enablement-guide)
- [Worked Example (Brownfield)](#worked-example-brownfield)

---

## Operating Model Guide

Practical guidance for deciding who or what operates a project's process — and
how much of it runs without a human.

**Why an operating model.** Right-sizing tells you how _heavy_ a process should
be; it does not tell you who _runs_ it. Two projects at the same consequence
level can operate completely differently: one engineer driving agents by hand,
or an agent executing unattended overnight while a human reviews the result in
the morning. That choice — how much human involvement the work actually requires
— is a separate decision from how heavy the process is, and operators make it by
accident when the framework gives it no name. The operating model names it, so
it can be set deliberately. It also keeps the decision honest about real limits
— but the limit is rarely capability alone. If an agent cannot independently
verify a deployment, whether that step should run unattended is a consequence
question, not a capability one: on a personal site you might happily let it
deploy unverified; on a payment system you would not. The operating model makes
that interaction explicit instead of leaving it to chance.

**Goals of this guide.**

- Separate _how the process is operated_ from _how heavy it is_ (right-sizing)
- Name the **operating functions** the model runs on, and which the operator
  configures
- Show how project consequence and real capability bound those choices
- Explain the operating envelope — what may proceed without a human, and where
  it must stop or escalate
- Position unattended ("Lights-Out") operation as one end of a spectrum, not a
  separate mode

**How to use it.**

1. Right-size first — see [Right-Sizing Guide](right-sizing.md) — to establish
   consequence, compliance, and team context
2. **Shortcut — start with a preset:** an
   [Operating Preset](operating-model.md#operating-presets) bundles the four
   settings _and_ the minimum coverage they assume. Pick the one that fits; if
   your environment meets its minimum coverage, you are configured — stop here,
   or read on to customize or understand why
3. **Or go deep:** read
   [**Operating Functions**](operating-model.md#operating-functions) to learn
   the functions the model runs on
4. Assess [**Capability Coverage**](operating-model.md#capability-coverage) —
   what agents and tools can actually do — so you configure within reality, not
   against it
5. Set the four
   [**configurable functions**](operating-model.md#the-configurable-functions),
   within what coverage supports
6. Read [**The Operating Envelope**](operating-model.md#the-operating-envelope)
   to see what that yields: what runs unattended, what escalates

Expect a loop, not a straight line: the envelope (step 6) can still send you
back to step 5 to adjust a setting — leading with a preset or with assessment
just keeps that loop short.

→ **Operational guide:** [`operating-model.md`](operating-model.md)

---

## Right-Sizing Guide

Practical guidance for scaling framework practices to fit a project's actual
consequence and context.

**Why right-size.** Not every project needs every practice. A prototype for five
internal users doesn't need contractual SLAs, and a regulated financial platform
shouldn't rely on informal monitoring. Without right-sizing, teams fall into one
of two traps: over-engineering (heavyweight processes that slow down small
projects and frustrate teams) or under-engineering (skipping critical practices
that would have caught production failures early).

**Goals of this guide.**

- Prevent over-engineering on low-consequence projects and under-engineering on
  high-consequence ones
- Provide a consistent model for scaling practices across all 8 stages
- Keep _how heavy the process is_ separate from _who runs it_ — the latter is
  the [Operating Model Guide](operating-model.md)'s job

For cross-cutting framework concepts, see [Framework Guide](framework.md).

**How to use it.**

1. Understand the three
   [**Dimensions of Governance Weight**](right-sizing.md#the-three-dimensions-of-governance-weight)
   — Consequence, Compliance, and Stakeholder Reach
2. See
   [**How Each Dimension Shapes the Stages**](right-sizing.md#how-each-dimension-shapes-the-stages)
   for what they change, stage by stage
3. _Optional shortcut:_ recognize your project in a
   [common shape](right-sizing.md#common-project-shapes) for a close starting
   point — or set the three dimensions directly (an agent operating the
   framework interviews you to land each one)
4. Decide _who runs the process_ separately, in the
   [Operating Model Guide](operating-model.md)
5. Drill into individual stage guides for detailed right-sizing tables

→ **Operational guide:** [`right-sizing.md`](right-sizing.md)

---

## Agentic Workflow Guide

Structured entry point for AI agents working with the AI-Assisted SDLC framework
— machine-readable stage routing, artifact dependencies, and fallback protocols
in a single file.

**Why this guide.** The framework's stage guides, checklists, and references are
optimized for human readers navigating one stage at a time. An AI agent dropped
into this repository needs a different interface: a single file with structured
metadata for programmatic routing and enough narrative context to operate
autonomously across stages. This guide is that interface.

**Goals of this guide.**

- Provide a single entry point for agents to orient in this repository
- Expose stage routing, inputs/outputs, and gates as structured YAML
- Define fallback protocols for common agent failure modes
- Establish session continuity conventions for multi-session work

**How to use it.**

1. **Read stage README front matter** — each `stages/*/README.md` contains the
   canonical stage metadata (inputs, outputs, checkpoints, RACI)
2. **Identify your current stage** from the
   [Stage Routing](agentic-workflow.md#stage-routing) section
3. **Check inputs and outputs** before starting a stage
4. **Follow gate requirements** — each stage specifies its required gates and
   checkpoints
5. **Use fallback protocols** when stuck — see
   [Error and Fallback Guidance](agentic-workflow.md#error-and-fallback-guidance)
6. **Maintain session logs** — see
   [Session Continuity Protocol](agentic-workflow.md#session-continuity-protocol)
   for multi-session work

→ **Operational guide:** [`agentic-workflow.md`](agentic-workflow.md)

---

## Checkpoint Taxonomy

Taxonomy of the three checkpoint types used across all stages — gates, reviews,
and alignments — with decision-rights assignments and stage mapping.

**Why checkpoints.** Without distinct checkpoint types, all quality gates feel
the same — teams either rubber-stamp everything or treat every review as a
stop/go decision. Distinguishing gates (investment decisions) from reviews
(criteria verification) and alignments (stakeholder consensus) gives each
checkpoint the right weight and the right decision-maker.

**Goals of this guide.**

- Define the three checkpoint types and when each applies
- Assign decision rights (who prepares evidence, who decides, who is informed)
- Map checkpoints to stages so every stage has clear exit criteria

**How to use it.**

1. Read [Gates](checkpoints.md#gates), [Reviews](checkpoints.md#reviews), and
   [Alignments](checkpoints.md#alignments) to understand the three types
2. Use the [Decision-Rights Matrix](checkpoints.md#decision-rights-matrix) to
   determine who prepares evidence and who decides at each checkpoint
3. Refer to
   [Checkpoint Mapping by Stage](checkpoints.md#checkpoint-mapping-by-stage) to
   see which checkpoints apply at each stage

→ **Operational guide:** [`checkpoints.md`](checkpoints.md)

---

## Security Guide

Cross-cutting security guidance that defines security activities per stage,
shows how AI automation makes security nearly free at the Minimal tier, and
provides lightweight NIST SSDF traceability for organizations that need it.

**Why security.** Security defects found late cost 6-15x more to fix than those
caught during design. Yet teams consistently deprioritize security for delivery
speed — not because they don't care, but because security work feels like
overhead layered on top of "real" work. The result: security is treated as a
gate at the end rather than a quality layer woven through development.

**Goals of this guide.**

- Define security activities at each SDLC stage, scaled by project tier
- Show how agents automate the majority of security work
- Provide a security throughline paralleling the measurement and learning
  throughlines
- Enable lightweight NIST Secure Software Development Framework (SSDF, SP
  800-218) traceability without requiring familiarity with the standard

**Why SSDF?** Several secure development frameworks exist — OWASP SAMM
(maturity-model focused), BSIMM (benchmarking against industry peers), and
Microsoft SDL (prescriptive process). SSDF was chosen because it is
practice-based rather than maturity-based, maps cleanly to SDLC stages rather
than requiring a separate assessment process, and is increasingly referenced in
US federal procurement and supply-chain requirements (Executive Order 14028). If
your organization already uses SAMM or BSIMM, the stage-by-stage activities
still apply — only the traceability column changes.

**How to use it.**

1. Review the [Security Throughline](security.md#security-throughline) table for
   security activities across all 8 stages and the Operations process
2. Read [How AI Makes Security Cheap](security.md#how-ai-makes-security-cheap)
   to understand what's automated vs. what needs human judgment
3. Drill into
   [Security Activities by Stage](security.md#security-activities-by-stage) for
   your current stage
4. See [SSDF Practice Mapping](security.md#ssdf-practice-mapping) only if your
   organization requires NIST SSDF traceability
5. **AppSec engineers:** see your
   [role definition, activity table, and escalation protocol](roles.md#application-security-appsec)
   and the [Decision-Rights Matrix](checkpoints.md#decision-rights-matrix) for
   checkpoint-level authority

→ **Operational guide:** [`security.md`](security.md)

---

## Framework Guide

Cross-cutting concepts that apply across all stages — design principles, roles,
governance, greenfield/brownfield adaptation, and pointers to the authoritative
references for stages, checkpoints, measurement, the operating model, and
right-sizing.

**Why this guide.** Individual stage guides cover their own scope. Dedicated
references cover stages ([stages.md](stages.md)), the operating model
([operating-model.md](operating-model.md)), and right-sizing
([right-sizing.md](right-sizing.md)). This guide is the hub for concepts that
span multiple documents: roles, governance, MoSCoW (Must / Should / Could /
Won't Have), greenfield/brownfield adaptation, compliance, and key terms.

**Goals of this guide.**

- Define the framework's design principles and key benefits
- Explain cross-stage concepts (MoSCoW, roles, governance, compliance)
- Document greenfield vs. brownfield adaptation
- Link to authoritative references for stages, checkpoints, measurement, the
  operating model, and right-sizing

**How to use it.**

1. [What Is This Framework?](framework.md#what-is-this-framework) — design
   principles and benefits
2. [How to Use This Framework](framework.md#how-to-use-this-framework) — getting
   started
3. [Key Concepts](framework.md#key-concepts) — linked overview of all
   cross-stage topics
4. Drill into individual concept sections as needed

→ **Operational guide:** [`framework.md`](framework.md)

---

## Roles and Responsibilities

Canonical role definitions, the cross-stage RACI matrix, and protocols governing
how roles collaborate during each stage.

**Why roles.** Software projects fail more often from coordination gaps than
from technical mistakes. When responsibilities are ambiguous — who decides, who
reviews, who gets informed — work stalls, decisions get revisited, and
accountability dissolves. Explicit role definitions and a shared RACI matrix
give every participant a clear answer to "what is expected of me at this stage?"

**Goals of this guide.**

- Define the canonical set of roles used across all framework stages
- Assign Responsible, Accountable, Consulted, and Informed designations per
  stage
- Establish protocols for consultation and information distribution
- Provide expanded guidance for cross-cutting roles (PjM, AppSec)

**How to use it.**

1. Read [Role Definitions](roles.md#role-definitions) to understand the
   canonical roles and their scope
2. Use the [RACI Matrix](roles.md#raci-matrix) to determine who is involved at
   each stage and in what capacity
3. Read [Domain Stakeholders](roles.md#domain-stakeholders) to include
   project-specific participants beyond the canonical roles
4. Follow the [Consultation Protocol](roles.md#consultation-protocol) and
   [Information Protocol](roles.md#information-protocol) when collaborating
   across roles
5. See the [Project Manager (PjM)](roles.md#project-manager-pjm) and
   [Application Security (AppSec)](roles.md#application-security-appsec)
   sections for expanded cross-cutting role guidance

→ **Operational guide:** [`roles.md`](roles.md)

---

## Stages Guide

**8 stages** that balance comprehensive coverage with practical simplicity for
AI-assisted software delivery.

**Why defined stages.** Software projects have natural phases, but without
explicit stage definitions teams skip critical activities, handoffs between
roles break down, and goals set early never connect to what gets measured in
production. AI amplifies this problem — it can generate artifacts quickly, but
without clear inputs, outputs, and exit criteria for each stage, teams lose
track of what's been validated and what's just been drafted.

**Goals of this guide.**

- Define what happens at each stage — inputs, activities, outputs, and exit
  criteria
- Provide methodology-agnostic stages that work for agile, waterfall, and hybrid
  approaches
- Ensure cross-functional handoffs between business and technical stakeholders
- Establish a measurement throughline from goals to production metrics

For who runs the process and how autonomously at each stage, see the
[Operating Model Guide](operating-model.md).

**How to use it.**

1. Review the [Quick Reference](stages.md#quick-reference) table to see all 8
   stages at a glance
2. Understand [How Stages Execute](stages.md#how-stages-execute) (Foundational,
   Iterative, Terminal) and the
   [Flow delivery mode](stages.md#flow-delivery-mode)
3. Check [Stage Altitude](stages.md#stage-altitude) to see the abstraction level
   and scope each stage works at
4. Drill into individual [stage definitions](stages.md#stage-1-initiation) for
   inputs, activities, outputs, and exit criteria
5. See [Checkpoint Taxonomy](checkpoints.md) for the gate and review types that
   govern progression

→ **Operational guide:** [`stages.md`](stages.md)

---

## The Learning Loop

A standing practice for turning friction encountered while running a project
into triaged, routed improvement across the development process, the team's
execution, the product, and the tooling — the capture half of the portfolio loop
that idea formation closes.

**Why a learning loop.** Every project generates friction: a checklist that
misleads, a handoff that drops context, a discovered gap in the product, a tool
that fights you. Most of it is observed once and forgotten. The framework
already reflects on what happened — pre-mortems at Initiation, retrospectives at
each increment — but two ends of the loop were left open: capture had no
standing home (in-the-moment observations lived in the Retrospective Template, a
Deployment-stage artifact, so friction from the Foundational stages had nowhere
to go until an increment closed), and improvement ideas had no durable
destination (a retrospective's forward-looking outputs were stranded in a
per-project document). The learning loop closes both ends: a standing capture
surface that exists from project start, and durable destinations that route each
observation to the owner that can act on it. It is the capture half of a larger
portfolio loop:

> **capture** (friction logged while delivering · raw greenfield ideas) → the
> **idea backlog** → **validate & launch** (idea formation) → Initiation →
> delivery → back to capture

This guide defines the capture half;
[idea formation](../stages/initiation/README.md#arriving-with-only-an-idea)
defines the launch half.

**Goals of this guide.**

- Define the **friction log** — the standing, project-spanning capture surface
- Define the **four friction types** and the **principle** that routes each — to
  whoever owns the fix
- Define the **idea backlog** — the cross-project destination for **product**
  ideas (candidate future projects)
- Place the loop's **three retrospective cadences** across the lifecycle
- Show how capture closes into the next project's Initiation, and how the loop
  runs at any level of automation

**How to use it.**

1. Start a [friction log](learning-loop.md#the-friction-log) at project start;
   append to it as friction arises in any stage
2. Type each entry using the
   [four friction types](learning-loop.md#friction-types)
3. At each [retrospective cadence](learning-loop.md#triage-cadences), triage the
   log's entries and route each by type
4. Route destinations are
   [operator-relative](learning-loop.md#routing-is-operator-relative): product
   ideas to the [idea backlog](learning-loop.md#the-idea-backlog); process and
   tooling friction to the owner you name
5. When the loop runs
   [without a human present](learning-loop.md#running-the-loop-lights-out), an
   agent prepares the drafts; a human authorizes anything that leaves your
   workspace

→ **Operational guide:** [`learning-loop.md`](learning-loop.md)

---

## Operations Guide

Practical guidance for operating a standing production system — keeping it
healthy, responding to what goes wrong, and feeding what you learn back into
delivery.

**Why operations.** Operations was long treated as the last stage of the project
that built the system — a "Support stage" bolted onto the end of delivery. That
conflated two different lifecycles: a project that is _done_ when its scope
ships, and a system that keeps running long after. Pulling operations out into
its own process fixes the seam: delivery ends cleanly at Closure, the system is
handed off, and operating it is its own governed practice with its own terminal.

**Goals of this guide.**

- Separate operating a **standing system** from delivering a **bounded project**
- Organize operations around what it actually does — **Observe, Respond,
  Maintain, Measure** — rather than around a team shape
- Apply the [operating model](operating-model.md) so operations can run
  supervised, checkpointed, or Lights-Out, sized to consequence
- Draw the **remediation boundary** — what operations fixes in place versus what
  re-enters delivery
- Route what operations learns back into delivery through a clean
  [ops→dev edge](operations.md#the-opsdev-edge)

**How to use it.**

1. Confirm you are operating a standing system, not finishing a project — see
   [Operations vs. the SDLC](operations.md#operations-vs-the-sdlc)
2. Establish [ownership](operations.md#ownership-spans) of the system, received
   through the [Closure handoff record](../stages/closure/README.md)
3. Run the four
   [operations activities](operations.md#the-four-operations-activities) —
   Observe, Respond, Maintain, Measure
4. Decide _how autonomously_ each runs using the
   [autonomy ladder](operations.md#autonomy-the-right-sizing-lens), within the
   consequence floors from the [Right-Sizing Guide](right-sizing.md)
5. Route fixes across the
   [remediation boundary](operations.md#the-remediation-boundary): operational
   remediation stays here; software change re-enters delivery as
   [Flow](stages.md#flow-delivery-mode) or a project
6. Retire the system through
   [decommission](operations.md#decommission-the-terminal-of-a-standing-system)
   when its life ends

→ **Operational guide:** [`operations.md`](operations.md)

---

## Organizational Adoption Guide

Practical guidance for planning and executing an organizational rollout of the
AI-Assisted SDLC framework — from pilot selection through full standardization.

**Why organizational adoption matters.** The framework is designed for
per-project use, but organizational adoption requires additional planning: which
team goes first, how to measure success, how to handle resistance, and when to
expand. Without a deliberate rollout strategy, teams adopt inconsistently — some
over-invest in process, others skip governance entirely — and leadership loses
the visibility that makes the framework valuable.

**Goals of this guide.**

- Provide a structured rollout path from pilot through standardization
- Define readiness criteria, success metrics, and expansion gates
- Address change management and resistance patterns specific to AI adoption

**How to use it.**

1. Complete the [Readiness Assessment](adoption.md#readiness-assessment) to
   determine whether to adopt now, try a limited pilot, or defer
2. Review [Measuring Adoption Success](adoption.md#measuring-adoption-success)
   to establish baselines before starting
3. Follow the [Phased Rollout](adoption.md#phased-rollout) sequence: Pilot →
   Expand → Standardize

For the governance model and business-value framing, see the
[README](../README.md#business-value).

→ **Operational guide:** [`adoption.md`](adoption.md)

---

## Bootstrap Guide

Step-by-step instructions for starting AI-assisted SDLC projects with a local
agent.

**Why a bootstrap guide.** The [Quick Start](../QUICKSTART.md) gets you running
with sensible defaults — create a directory, start your agent, paste a prompt.
This guide explains the underlying model: working locations, project
configuration, and setup options. Use it when you need more control over project
structure — custom directory layouts or more autonomous operating postures.

**Goals of this guide.**

- Define the workspace structure and working-locations model
- Explain the project config file, project index, and AGENTS.md
- Provide bootstrap prompts for single-repo and multi-repo projects
- Guide iterative, multi-session stage work

**How to use it.**

1. [Prerequisites](bootstrap.md#prerequisites) — confirm you have what you need
2. [Working Locations](bootstrap.md#working-locations) — understand the location
   model
3. [Project Config File](bootstrap.md#project-config-file) — set up your
   project.md
4. [Bootstrap Prompts](bootstrap.md#bootstrap-prompts) — multi-repo setup prompt

→ **Operational guide:** [`bootstrap.md`](bootstrap.md)

---

## Delivery Operating Guide

Week-by-week operating rhythm for running one increment through the framework —
composing existing stage guides, RACI, and gate facilitation into an actionable
delivery view. (Not the [Operating Model Guide](operating-model.md), which sizes
_who_ runs the process and _how autonomously_.)

**Why a delivery operating guide.** The Cadence Mapping table in the Framework
Guide shows _what_ maps _where_, and the RACI matrix shows _who_ does _what_.
But a PjM looking at a 2-week sprint still has to mentally assemble the
operating rhythm from stage guides, gate facilitation notes, and RACI tables.
This guide composes those pieces into a week-by-week view so PjMs can run
delivery without cross-referencing multiple documents.

**Goals of this guide.**

- Provide a concrete week-by-week operating rhythm for one increment cycle
- Cover Sprint and Kanban/Flow delivery modes
- Include a minimal status template for progress reporting
- Link to (not duplicate) existing framework content for RACI, gates, and stage
  details

**How to use it.**

1. Choose your delivery mode:
   [Sprint Rhythm](delivery-operating-guide.md#sprint-rhythm-2-week-increment)
   or [Kanban / Flow Rhythm](delivery-operating-guide.md#kanban--flow-rhythm)
2. Walk through the week-by-week activities for one increment cycle
3. Use the [Status Template](delivery-operating-guide.md#status-template) for
   progress reporting
4. Follow links to authoritative sources for RACI, gate agendas, and stage
   guides

→ **Operational guide:**
[`delivery-operating-guide.md`](delivery-operating-guide.md)

---

## DevOps Integration Guide

Entry point for DevOps engineers — maps each DevOps concern to its authoritative
framework location.

**Why DevOps integration.** DevOps responsibilities span multiple framework
stages (deployment, operations, security, observability) and multiple guides.
Without a single entry point, DevOps engineers have to discover relevant
sections by reading every guide. This document collects all DevOps-relevant
pointers in one place.

**Goals of this guide.**

- Route DevOps engineers to the right framework section for each concern
- Cover CI/CD, security scanning, release patterns, environments, observability,
  and operational NFRs
- Provide minimum pipeline control baselines by tier

**How to use it.**

1. Start with [Getting Started](devops-integration.md#getting-started) for the
   recommended setup sequence, or jump to a specific concern
2. Use the reference tables in each section to find the authoritative guide for
   your topic
3. Review
   [Minimum Pipeline Controls](devops-integration.md#minimum-pipeline-controls)
   for baseline requirements by tier

→ **Operational guide:** [`devops-integration.md`](devops-integration.md)

---

## Project Foundation Guide

Practical walkthrough for foundation work — the infrastructure, discovery, or
preparation that happens before your first feature increment. Foundation work
may be a single bootstrap increment or a multi-increment preparation project,
depending on the project's starting point.

**Why foundation work.** Without foundation work, teams jump from architecture
documents to feature work and discover infrastructure gaps mid-sprint — missing
CI/CD pipelines, uncreated environments, absent monitoring. Foundation work
closes those gaps so the first feature increment starts on solid ground.

**Goals of this guide.**

- Bridge the gap between foundational planning and feature delivery
- Turn infrastructure decisions from System Design into working systems — CI/CD
  pipelines, environments, monitoring, and operational processes
- Route you to the right stage-specific guides based on your project type
  (greenfield or brownfield)

**How to use it.**

1. Read [When It Happens](project-foundation.md#when-it-happens) to understand
   where foundation work fits in the project lifecycle
2. Follow the
   [Greenfield Foundation](project-foundation.md#greenfield-foundation-bootstrap)
   or [Brownfield Foundation](project-foundation.md#brownfield-foundation)
   section based on your project type
3. Use
   [How Foundation Work Flows Through Stages](project-foundation.md#how-foundation-work-flows-through-stages)
   to plan your foundation increment(s)

→ **Operational guide:** [`project-foundation.md`](project-foundation.md)

---

## Parallel Scheduling Guide

Practical guidance for turning a dependency-aware increment plan into an ordered
set of **parallel-safe batches** — deciding what may run at the same time, and
what must wait. The run-time half is the
[Parallel Execution Guide](parallel-execution.md); the normative contracts
behind both are in the [Parallel-Batch Spec](../spec/parallel-batch.md).

**Why schedule.** The framework already plans work as increments ordered by
dependencies. Running them strictly one at a time is the safe default, but it
leaves wall-clock time on the table when increments are genuinely independent.
The temptation is to "just run them in parallel" — and that is exactly where
projects get hurt: two increments edit the same file and one silently overwrites
the other; a migration lands out of order; a contract changes under a consumer
mid-flight. Scheduling does the analysis that makes parallelism safe **before**
anything runs, so collisions are designed out of the plan rather than discovered
during a run.

**Goals of this guide.**

- Decide **which increments may run concurrently** and which must be sequenced
- Name the **forcing dependencies** that prevent two increments from sharing a
  batch
- Record a defensible, auditable **parallel-safety classification**
- **Compose** independent increments into batches and **order** the batches by
  their dependencies
- Keep the **sequential case as the reduction** — a batch of one is the plan you
  already run

**How to use it.**

1. Plan increments and their dependencies as usual (System Design increment
   planning) — that dependency-aware plan is the **input** here
2. Read [The Batch Model](parallel-scheduling.md#the-batch-model) to understand
   the unit you are scheduling into
3. Walk [Forcing Dependencies](parallel-scheduling.md#forcing-dependencies)
   pair-wise over candidate increments
4. Record the
   [Parallel-Safety Classification](parallel-scheduling.md#parallel-safety-classification)
5. [Compose and Sequence Batches](parallel-scheduling.md#composing-and-sequencing-batches)
   into the ordered schedule
6. Hand the schedule to the [Parallel Execution Guide](parallel-execution.md) to
   run

→ **Operational guide:** [`parallel-scheduling.md`](parallel-scheduling.md)

---

## Parallel Execution Guide

Practical guidance for running a parallel-safe batch — keeping concurrent work
attributable, isolated, integrated, and conserved, so a batch that finishes has
actually delivered every increment's work and lost none of it. Deciding _what_
may run concurrently is the [Parallel Scheduling Guide](parallel-scheduling.md);
the normative contracts behind both are in the
[Parallel-Batch Spec](../spec/parallel-batch.md).

**Why execution needs its own controls.** A sequential run gets safety for free:
one actor, one workspace, one change at a time. Concurrency removes all three
guarantees at once, and that is where parallel runs silently fail — two workers
edit the same file and one overwrite wins; a batch is declared done because
every worker stopped, when a function was dropped during the merge; a run keeps
going unattended after the one capability that made it safe disappeared.
Execution is the set of run-time controls — isolation, coordination,
integration, conservation, stop enforcement — that put those guarantees back.

**Goals of this guide.**

- Run a batch with **isolation and coordination** so workers cannot corrupt each
  other
- Keep concurrent work **attributable** and within scope throughout the run
- **Integrate** finished work and prove, via **work conservation**, that nothing
  valid was lost
- **Close** a batch honestly and transition to the next
- Establish when a parallel batch may run **unattended** (Lights-Out)

**How to use it.**

1. Start from a **scheduled plan** — an ordered set of parallel-safe batches
   from the [Parallel Scheduling Guide](parallel-scheduling.md)
2. Assign the [Roles](parallel-execution.md#execution-roles) for the batch
3. Run [Batch Preflight](parallel-execution.md#batch-preflight) before opening
   the batch
4. Open the batch and run workers under
   [Isolation and Concurrency-Safety](parallel-execution.md#isolation-and-concurrency-safety)
   and the
   [Execution Invariants](parallel-execution.md#concurrent-execution-invariants)
5. At close, run
   [Integration and Work Conservation](parallel-execution.md#integration-and-work-conservation)
   and [Close and Transition](parallel-execution.md#batch-close-and-transition)
6. If the run is unattended, read
   [Parallel and Lights-Out](parallel-execution.md#parallel-and-lights-out)

→ **Operational guide:** [`parallel-execution.md`](parallel-execution.md)

---

## Worked Example (Greenfield)

End-to-end trace of a single requirement through every framework stage — from
Initiation through Closure — showing completed artifact examples at each step.

**Why a worked example.** The framework templates and guides explain what each
artifact should contain, but it's hard to judge the right level of detail
without seeing a completed example. This document shows exactly what "done"
looks like for one requirement flowing through every stage.

**Goals of this example.**

- Show the expected detail level for each framework artifact
- Demonstrate how artifacts link together across stages
- Provide a concrete traceability chain from goal to production
- Give engineers and analysts a "what good looks like" reference

**How to use it.** Walk the example stage by stage — from
[Initiation](worked-example.md#stage-1-initiation) through
[Closure](worked-example.md#stage-8-closure) — then review
[The Full Traceability Chain](worked-example.md#the-full-traceability-chain) for
the end-to-end flow.

→ **Operational guide:** [`worked-example.md`](worked-example.md)

---

## Worked Example (Solo)

End-to-end example of the framework at its smallest — one person, an empty
repository, a half-formed idea — traced from the idea-formation interview
through a Minimal-tier Initiation Brief to the one-question Gate 1 self-gate.

**Why a solo example.** The other worked examples are team-shaped: a greenfield
project with engineers, QA, and a product manager, and a brownfield adoption
with an established organization. The most common first-look user matches
neither — a solo developer with a fuzzy product idea and no stakeholder list.
This example shows exactly what "done" looks like for that situation, before
committing to anything.

**Goals of this example.**

- Show what an idea-formation interview extracts from a fuzzy idea
- Show project classification inferred from conversation, not asked as menus
- Show a completed Minimal-tier Initiation Brief, including no-baseline success
  criteria
- Show the Gate 1 one-question self-gate, recorded without ceremony

**How to use it.** Read it in order — from
[The Idea](worked-example-solo.md#the-idea) through the
[Initiation Brief](worked-example-solo.md#the-minimal-tier-initiation-brief) and
the [Gate 1 self-gate](worked-example-solo.md#gate-1-the-self-gate) to
[What Happens Next](worked-example-solo.md#what-happens-next).

→ **Operational guide:** [`worked-example-solo.md`](worked-example-solo.md)

---

## Brownfield Preparation Guide

End-to-end guide for preparing brownfield codebases for AI-assisted development
— from readiness assessment through strategic planning to operational
enablement. The entry point for the brownfield family
([readiness](#brownfield-readiness-guide),
[approach](#brownfield-approach-guide),
[enablement](#brownfield-enablement-guide)).

**Why brownfield preparation.** Brownfield projects — extending or enhancing
existing systems — are where most software development happens, and these
codebases span a wide spectrum: some need only a documentation pass before AI
tools contribute effectively; others carry years of accumulated complexity that
makes AI produce plausible-but-wrong output. Brownfield preparation assesses
where a codebase falls and, where needed, makes it ready — and for hostile
codebases, may reveal that preparation itself isn't cost-effective, which is a
valuable outcome too.

**Goals of this guide.**

- Define what brownfield preparation is and when it applies
- Describe the three-step preparation process
- Route to the detailed guides for each step
- Provide the conceptual foundation for brownfield-specific decisions

**How to use it.** Read
[What Brownfield Preparation Involves](brownfield.md#what-brownfield-preparation-involves)
for scope, follow the
[Preparation Process](brownfield.md#the-preparation-process) (assess → decide →
enable), and see [Supporting Resources](brownfield.md#supporting-resources) for
templates and examples.

→ **Operational guide:** [`brownfield.md`](brownfield.md)

---

## Brownfield Readiness Guide

Assessment framework for evaluating brownfield codebase readiness for
AI-assisted development — understand the readiness tiers and what AI can do at
each level, then score your codebase to determine where you stand.

**Why brownfield readiness.** Brownfield projects vary enormously — a
well-tested codebase with current documentation needs only a discovery pass,
while one with no tests and tribal-knowledge architecture may need months of
preparation. Without a structured readiness assessment, teams either over-invest
(delaying value) or under-invest (setting AI tools up to fail on a codebase they
can't reason about).

**Goals of this guide.**

- Define the full brownfield readiness spectrum from Ready to Rebuild
- Describe what AI can and cannot do at each readiness tier
- Provide a scored rubric for evaluating readiness across five axes
- Map scores to readiness tiers that inform preparation strategy
- Address multi-repository and database considerations

**How to use it.** Read the
[Readiness Tiers](brownfield-readiness.md#readiness-tiers), score your codebase
with the [Readiness Rubric](brownfield-readiness.md#readiness-rubric) (five
axes, 0–4 each), check
[Multi-Repository and Database Considerations](brownfield-readiness.md#multi-repository-and-database-considerations)
if relevant, then proceed to the
[Brownfield Approach Guide](brownfield-approach.md).

→ **Operational guide:** [`brownfield-readiness.md`](brownfield-readiness.md)

---

## Brownfield Approach Guide

Strategic guide for choosing how to prepare a brownfield codebase — from
organizational investment model to tactical decisions about preparation scope
and execution strategy.

**Why brownfield approach.** Assessing readiness tells you where you stand; this
guide helps you decide what to do about it. The right approach depends on more
than codebase state — organizational context, leadership support, financial
capacity, and business priorities all shape it. A sales-led organization that
can't pause feature delivery needs a different approach than an engineering-led
one with executive buy-in for a dedicated preparation effort.

**Goals of this guide.**

- Present the range of investment models for brownfield preparation
- Help teams choose an approach that fits their organizational context
- Define preparation scope — full codebase vs. bounded target area
- Establish exit criteria for knowing when preparation is sufficient

**How to use it.** Complete the readiness assessment first (in the
[Brownfield Readiness Guide](brownfield-readiness.md)), then review
[Investment Models](brownfield-approach.md#investment-models) and
[Foundation Work by Tier](brownfield-approach.md#foundation-work-by-tier),
evaluate [Preparation Scope](brownfield-approach.md#preparation-scope), and
proceed to the [Brownfield Enablement Guide](brownfield-enablement.md).

→ **Operational guide:** [`brownfield-approach.md`](brownfield-approach.md)

---

## Brownfield Enablement Guide

Tactical guide for brownfield enablement — specific techniques for improving
readiness across each assessment axis, discovery activities, and key decisions
that arise during preparation, plus rebuild execution patterns for T0–T1
codebases where the chosen approach is replacement rather than improvement.

**Why brownfield enablement.** Codebases that score below T5 on the readiness
rubric need some level of preparation — from a focused documentation pass at T4
to targeted technical improvements at T3 and below — before AI tools can assist
feature development effectively. Without structured guidance, teams either
prepare too little (AI-assisted work fails) or too much (preparation becomes an
open-ended refactoring project that never reaches feature work).

**Goals of this guide.**

- Provide specific, actionable techniques for improving each readiness axis
- Define discovery activities and key decisions for brownfield preparation
- Cover rebuild execution patterns for T0–T1 scenarios
- Connect preparation work to the framework's iterative stage cycle

**How to use it.** After the readiness assessment and approach decision, follow
[Discovery Activities](brownfield-enablement.md#discovery-activities) for all
brownfield projects, use
[Enablement Tactics](brownfield-enablement.md#enablement-tactics) on the
lowest-scoring axes (or
[Rebuild Tactics](brownfield-enablement.md#rebuild-tactics) if rebuilding),
order the work with
[Preparation Sequencing](brownfield-enablement.md#preparation-sequencing), and
review [Common Blind Spots](brownfield-enablement.md#common-blind-spots).

→ **Operational guide:** [`brownfield-enablement.md`](brownfield-enablement.md)

---

## Worked Example (Brownfield)

End-to-end traced example of a brownfield project adopting the framework — from
readiness assessment through one preparation increment, exit checkpoint, and one
feature increment.

**Why a brownfield worked example.** The
[greenfield worked example](#worked-example-greenfield) shows what "done" looks
like for a new build, but brownfield adoption follows a different path:
assessing existing readiness, running preparation increments, deciding when
preparation is "enough," then delivering features under constraints greenfield
doesn't have. Without a concrete example, the brownfield guidance stays
abstract.

**Goals of this example.**

- Demonstrate the readiness → preparation → exit checkpoint → feature-work flow
- Show "acceptable substitutes" for organizations with existing artifacts
- Make shadow mode and gradual rollout guidance concrete
- Illustrate gate decisions for brownfield-specific scenarios

**How to use it.** Read the [Scenario](worked-example-brownfield.md#scenario),
follow the
[Readiness Assessment](worked-example-brownfield.md#readiness-assessment), walk
the
[Discovery Increment](worked-example-brownfield.md#discovery-increment-increment-0)
and [Exit Checkpoint](worked-example-brownfield.md#exit-checkpoint), then see
the
[Feature Increment](worked-example-brownfield.md#feature-increment-increment-1)
and the
[Traceability Chain](worked-example-brownfield.md#traceability-chain-brownfield-vs-greenfield).

→ **Operational guide:**
[`worked-example-brownfield.md`](worked-example-brownfield.md)

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.51.0 as the human-facing orientation layer (RC-3): the
Overview / Why / Goals / How-to-Use sections lifted out of the operational
guides and collected here with back-links, so a person can get oriented in one
place while agents read the operational guides stage-scoped (see
[Read Order and the Load Line](agentic-workflow.md#read-order-and-the-load-line)).
Each guide retains a one-line pointer to its section here; load-bearing content
(Key Principles, operational cross-reference callouts) stays in the guides.

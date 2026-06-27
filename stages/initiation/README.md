---
id: initiation
inputs:
  - business-opportunity
  - stakeholder-list
  - budget-constraints
outputs:
  - artifact: initiation-brief
    template: templates/initiation-brief.md
  - artifact: success-criteria-register
    template: templates/success-criteria-register.md
  - artifact: gate-1-decision-package
    template: templates/gate-decision.md
checkpoints:
  - type: gate
    protocol: human-approval
    name: "Gate 1 (Investment Decision)"
    responsible_roles: [pm]
    accountable_role: [exec]
checklist: stages/initiation/checklist.md
reference: stages/initiation/reference.md
working_location: artifacts
session_log_template: templates/session-log.md
raci_roles: { R: [pm], A: [pm], C: [arch, eng, appsec, pjm], I: [exec] }
---

# AI-Assisted SDLC: Initiation Stage

## Overview

Practical guidance for establishing the business case for a project and securing
approval to invest in detailed Requirements work.

### Why Initiation

Software projects fail when they skip the fundamentals — unclear problems,
unmeasurable goals, unspoken assumptions, and absent ownership. Initiation
exists to answer: _"Should we pursue this idea?"_

Any stakeholder with a project idea can use Initiation artifacts — no technical
expertise or formal role required. The language is intentionally
business-focused to enable non-technical stakeholders to independently initiate
and scope projects with AI assistance.

### Goals of This Guide

- Provide stage-specific guidance and rationale for Initiation
- Describe how AI assists at each activity
- Explain right-sizing Initiation effort to project complexity
- Guide practitioners from idea to Gate 1 decision

### Key Principle

Success criteria established in Initiation flow through every subsequent stage —
from Requirements to Closure. Getting them right here is the highest-leverage
activity in the entire SDLC. For the full stage definition (purpose, roles,
inputs/outputs, entry/exit criteria, and gate details), see
[Framework Stages: Initiation](../../guides/stages.md#stage-1-initiation).

### Starting Point

A business opportunity or problem worth investigating, a stakeholder list, and
budget context. No prior framework artifacts or technical expertise required.

> **Only have a half-formed idea?** That is enough — see
> [Arriving with Only an Idea](#arriving-with-only-an-idea) for the short
> pre-Initiation path that produces these inputs.

> This stage operates from the **artifacts location**. For greenfield projects,
> create the artifacts directory structure first (e.g., `docs/briefs/`,
> `docs/adr/`). See
> [Working Locations](../../guides/framework.md#working-locations).

### How to Use This Guide

1. Read [**Right-Sizing Initiation**](#right-sizing-initiation) to size
   governance weight (Consequence / Compliance / Stakeholder Reach) and choose
   your operating posture
2. Read [**How AI Helps**](#how-ai-helps) to select your operating posture (Work
   Execution + Authority — see the Operating Model Guide)
3. **When agents perform the work:** Confirm all right-sizing selections with
   the user before drafting. For first-time or zero-to-one users, infer the
   selections from the conversation and present them as overridable `[ASSUMED]`
   defaults rather than asking the user to pick from framework taxonomies — see
   [Agentic Workflow Guide: Classification by Inference](../../guides/agentic-workflow.md#classification-by-inference).
   Do not begin populating the brief until agreed.
4. Fill out the [Initiation Brief Template](../../templates/initiation-brief.md)
   using agents according to your chosen operating posture. For each section of
   the brief, consult the matching subsection under
   [**Why These Initiation Elements Matter**](#why-these-initiation-elements-matter)
   below for rationale, good/bad examples, and what to include. See the
   [Bootstrap Guide](../../guides/bootstrap.md) for the bootstrap prompt
   template and setup instructions
5. Populate the
   [Success Criteria Register](../../templates/success-criteria-register.md)
   with the success criteria from your brief
6. Review the brief for correctness — you own the final content
7. Complete the [Initiation Checklist](checklist.md) using agents according to
   your chosen operating posture
8. Complete Gate 1 — present to stakeholders; Exec decides proceed/revise/stop
   (see
   [Decision-Rights Matrix](../../guides/checkpoints.md#decision-rights-matrix)).
   At Minimal tier, record the decision and date as a note in the Initiation
   Brief; at Standard+ tier, use the
   [Gate Decision Template](../../templates/gate-decision.md)

> **See a completed example:** The
> [Worked Example: Initiation](../../guides/worked-example.md#stage-1-initiation)
> shows a finished brief for calibration.

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## Arriving with Only an Idea

Initiation assumes its inputs already exist — a business opportunity worth
investigating, a stakeholder list, and budget context. Many projects do not
start there. They start with "I have an idea for X": a half-formed product idea,
no stakeholder list, and no budget framing. **Idea formation** is the
pre-Initiation activity that closes the gap — a short, structured conversation,
its depth scaled to the idea's stakes, that turns a fuzzy idea into
Initiation-ready inputs.

Idea formation is not a stage. It has no gate, no checklist, and no artifact
beyond the brief sections it seeds. It ends the moment Initiation can begin —
expect a single conversation, not days of work.

> **See it done end-to-end:** The
> [Solo Worked Example](../../guides/worked-example-solo.md) traces a fuzzy idea
> through the interview, a Minimal-tier brief, and the Gate 1 self-gate.

### Exit Criteria

Idea formation is complete when three things exist:

1. **A candidate problem statement** — who is affected, what they cannot do, and
   what it costs them, stated independently of any solution. "Candidate" is
   deliberate: Initiation pressure-tests the statement; idea formation only has
   to produce something concrete enough to test.
2. **A target user** — whose problem this is. "Me" is a valid answer, and so is
   "me, and people like me."
3. **The riskiest assumptions, surfaced** — the beliefs that, if wrong, make the
   idea not worth building. Typical candidates: someone actually has this
   problem; existing tools don't already solve it well enough; it is feasible
   with the time and skills available.

These map directly to Initiation's declared inputs: the candidate problem
statement is the business opportunity, the target user seeds the stakeholder
list, and the constraints surfaced alongside the assumptions (time, money,
skills) provide budget context.

### The Interview Contract

The natural mechanism for idea formation is an interview: the agent (or a
colleague) asks, the idea-holder answers. How the interview is conducted —
question order, tone, tooling — is an implementation concern and is left to
tools and skills. What it must extract is not. Any idea-formation interview must
extract the rows below and emit them as seeded Initiation Brief sections:

| Extract                                                                    | Seeds in the Initiation Brief                |
| -------------------------------------------------------------------------- | -------------------------------------------- |
| The trigger — the moment that produced the idea, the gap that appeared     | Problem Statement (what's wrong)             |
| The affected user — who hits this problem, and how often                   | Problem Statement (who), Key Stakeholders    |
| The cost — what the problem costs today (time, money, missed outcomes)     | Problem Statement (impact), Business Case    |
| What better looks like — the outcome if the problem disappeared            | Goals (candidate)                            |
| The riskiest assumptions — what must be true for this to be worth building | Assumptions, Risks                           |
| Constraints — the time, money, and skills available                        | Constraints and Dependencies, budget context |

The interview's output is recorded directly into a draft
[Initiation Brief](../../templates/initiation-brief.md) — the seeded sections
above, flagged `[ASSUMED]` wherever the idea-holder is guessing rather than
reporting. There is no separate idea-formation artifact to create or maintain.

Two cautions for whoever runs the interview:

- **Do not open with "what should we build?"** — solution-first framing is the
  failure mode the problem statement exists to prevent. Start from the trigger
  and the user.
- **Do not front framework classification questions** (tier, project type,
  operating posture). The agent infers these from the conversation and presents
  them as overridable assumptions — see
  [Agentic Workflow Guide: Zero-to-One Project Routing](../../guides/agentic-workflow.md#zero-to-one-project-routing).

### Scaling the Interview to the Stakes

Idea formation is **one adaptive conversation**, not a fixed questionnaire. Its
depth and direction scale to the stakes of the idea — a throwaway calculator a
friend asked for and a subscription streaming service sit at the two ends of the
same interview, not in two different interviews. The calculator earns a glance
and a few questions; the streaming service earns a longer conversation that
unfolds its business model, the data it touches, and how far the builder wants
to take it.

**Infer the stakes; do not ask the idea-holder to declare them.** This is the
same rule the interview already follows for framework classifications — read
them from the conversation rather than fronting a menu (see
[Agentic Workflow Guide: Classification by Inference](../../guides/agentic-workflow.md#classification-by-inference))
— now extended to govern the interview's own depth. Read the stakes from the
opening answers; reflect what you read back as overridable `[ASSUMED]` values,
never as a question like "how risky is this?"

**Depth folds and unfolds with the inferred stakes.** Low stakes collapse the
interview to its three [exit criteria](#exit-criteria) and stop; higher stakes
unfold further lines of questioning. A high signal on any one axis opens that
line: money changing hands opens the business case and payment-data sensitivity;
"I want it to run itself" opens how much the builder wants AI to drive;
regulated data opens compliance. Listen for these signals rather than waiting to
be told them:

| Signal in the opening answers      | What it raises                                         |
| ---------------------------------- | ------------------------------------------------------ |
| Real users beyond the builder      | Who is affected; pushes the tier up                    |
| Money changing hands               | Business case; payment-data sensitivity                |
| Regulated or personal data         | Compliance and privacy obligations                     |
| Public or external exposure        | External users (a tier escalation); security posture   |
| Ambition to automate, "run itself" | How autonomously it should run — the operating posture |

This table is **what to read, not a script to recite.** The framework specifies
the signals to listen for and the classifications they inform; the question
order, wording, and tone stay an implementation concern of the tool or skill
running the interview, exactly as the
[Interview Contract](#the-interview-contract) leaves them.

**When the signals are ambiguous, fail toward unfolding.** Ask one more question
rather than assume low stakes. Under-reading a real product — treating a
payments app as a throwaway — is far costlier than over-asking on a genuine
throwaway, where the worst case is a single extra question. This is the
interview's form of the framework's standing rule to default conservatively when
signals are missing or conflict (see
[Classification by Inference, rule 2](../../guides/agentic-workflow.md#classification-by-inference)).

### Seeding the Operating Configuration

The interview is the origin point of the project's **operating configuration** —
the right-sizing selections the rest of the lifecycle consumes: how much process
it carries, how autonomously it runs, where it deploys, and what compliance it
must honor. "Build it and run it to the highest degree," read correctly, is a
request for the most autonomous end of that configuration; "just a quick favor"
is the least. Idea formation **proposes** the configuration; it does not commit
it.

Seed the inferred classifications — tier, operating posture, deployment intent,
and any compliance obligation — into the draft brief's right-sizing section as
`[ASSUMED]` values, exactly as
[Classification by Inference](../../guides/agentic-workflow.md#classification-by-inference)
prescribes. Initiation refines them as the brief takes shape, and **Gate 1 locks
them**: the investment decision is where "are you sure you want to run a
payments product this autonomously?" is answered honestly. The calculator
effectively has no Gate 1 — a glance-and-go self-gate at the lowest tier — so
its frame is set and forgotten in one breath; the streaming service's Gate 1 is
real, and is where its proposed configuration is committed or pulled back.

> **Compliance binds before build, not at Gate 1.** One element does not wait
> for the gate: a hard compliance obligation — regulated data, a legal
> constraint, a contractual rule the product must honor. When the interview
> surfaces one, record it as a binding constraint in the brief's
> [Data Sensitivity and Compliance](#data-sensitivity-and-compliance) section,
> not as an `[ASSUMED]` value to confirm later. It shapes the work from the
> first line of code; a build that ignores it is wrong before Gate 1 ever rules
> on the investment. Everything else stays `[ASSUMED]` and refines to the Gate 1
> lock.

---

## Platform Services

Most products compose a set of **platform services** around their core build —
authentication and authorization, payments/billing, data persistence, web
hosting, email/notifications, file/object storage, observability, secrets and
config, background jobs, a CDN. The set differs per product and **this list is
not exhaustive** — surface whatever cross-cutting services the idea implies.
Each is a _decision surface_, not a foregone choice: name the **category**
(auth, payments…), never a product — picking a vendor is not this step.

The signals you read while
[scaling the interview](#scaling-the-interview-to-the-stakes) do double duty:
each not only sets a classification but **implies a platform service to plan**.
"Money changing hands" raises the business case _and_ implies payments; "public
or external exposure" raises the tier _and_ implies auth; "regulated or personal
data" raises compliance _and_ implies a datastore that can hold it. Naming the
implied service is the step the signal table leaves unsaid — make it explicit,
as an overridable observation, not a recited checklist.

For each surfaced service the consultant questions are the same five:
**needed?** · **when** (which stage or increment)? · **build vs. buy** ·
**options and trade-offs** · **cost**. When the operator has no view, offer to
research it rather than leave the decision unowned — this is how the
expert-consultant posture from
[Session Protocol](../../guides/session-protocol.md#orient--classify-the-scenario-first-contact)
runs at Initiation.

**Decide the movers now; defer the rest — but record it.**

- **Movers — settle at Initiation.** Services that move the tier, security
  posture, or compliance scope are settled here, because they change what the
  project _is_: auth for external users (tier + security posture), payments
  (business case + payment-data sensitivity), and persistence of regulated or
  personal data (compliance, which
  [binds before build](#seeding-the-operating-configuration), not at Gate 1).
  Record their data-sensitivity and compliance implications once, in
  [Data Sensitivity and Compliance](#data-sensitivity-and-compliance) — not here
  — and let their tier and security/compliance effect flow into the right-sizing
  selections. (The _provider_ choice can still be a System Design call; what is
  settled at Initiation is the need and its consequence.)
- **Design-time — surface now, decide at System Design.** Hosting, the database
  _engine_, email, storage, observability, secrets, jobs, and the CDN are
  build-vs-buy choices that do not move the tier. Surface and sequence them now
  and record them as open dependencies in the brief's
  [Constraints and Dependencies](#constraints-and-dependencies), flagged for
  System Design — so they are _deferred deliberately, not dropped silently_.
  Their build-vs-buy, options, cost, and ADRs are System Design's job, through
  its existing
  [Infrastructure Planning](../system-design/README.md#infrastructure-planning).

One service can sit on both sides: persistence is a **mover** for its
data-sensitivity dimension (regulated data → tier/compliance) and a
**design-time** choice for its engine. Split it — settle the sensitivity now,
defer the engine.

> **Obligations vs. provisioning.**
> [Data Sensitivity and Compliance](#data-sensitivity-and-compliance) captures
> what an obligation _requires_; this section captures whether a service is
> _needed and how it is sourced_. They are complementary — reference, do not
> restate.

---

## How AI Helps

An agent can assist with Initiation at whatever operating posture your team is
comfortable with — from answering questions to driving the entire discovery
process.

How autonomously this stage runs — who performs the work and who decides — is an
operating-model choice, not a fixed property of the stage. It is set per project
along two functions: **Work Execution** (Humans · Collaborative · Agents) and
**Authority** (interactive human · pre-authorized policy · delegated agent).
Gate 1 always stays a human-owned investment decision. See the
[Operating Model Guide](../../guides/operating-model.md). For agent-driven
discovery patterns, see [Stage Reference](reference.md#agent-driven-patterns).

### AI Assistance Patterns

- **Interview-based drafting:** Describe your idea to AI — it asks structured
  questions and produces a draft brief
- **Template review:** Fill out the template yourself, then ask AI to review for
  completeness and suggest improvements
- **Completeness checking:** AI walks through the checklist and flags gaps
- **Alternative generation:** AI suggests risks, non-goals, and options you may
  not have considered

For assistance level details, see the
[Operating Model Guide](../../guides/operating-model.md).

> **Required gates:** Human approval — Initiation involves business decisions
> requiring human judgment, stakeholder alignment, and organizational context
> that AI cannot independently verify. AI produces drafts and options; humans
> own all decisions.

---

## Right-Sizing Initiation

Two separate decisions shape how heavy Initiation — and the rest of the project
— should be.

**How heavy the process is (right-sizing).** Governance weight scales along
three dimensions:

- **Consequence** — how bad it is if the project goes wrong (blast radius ×
  reversibility)
- **Compliance** — whether regulatory, contractual, or policy obligations apply
- **Stakeholder Reach** — how far across accountability boundaries the work and
  sign-offs travel (solo, within-team, cross-team, or cross-org)

These map to the **Minimal / Standard / Enterprise** governance-weight presets —
see the [Right-Sizing Guide](../../guides/right-sizing.md) for selection
criteria.

**Who runs the process and how autonomously (operating model).** A separate
decision — the operating posture: who performs the work (Work Execution), who
decides (Authority), and how much runs without a human. See
[How AI Helps](#how-ai-helps) above and the
[Operating Model Guide](../../guides/operating-model.md).

If your project handles sensitive data, has compliance requirements, or serves
external users, start at Standard or Enterprise.

Most internal projects land at **Standard**; use **Minimal** for low-risk
experiments and **Enterprise** for regulated or multi-stakeholder efforts.

Not every project needs a formal business case or comprehensive risk assessment.
Match your Initiation effort to the project's consequence and reach.

> **Project type matters too.** Whether you're building from scratch
> (greenfield) or extending an existing system (brownfield) affects foundation
> work, infrastructure planning, and which stages apply. Capture your project
> type in the Initiation Brief — it informs decisions from System Design onward.
> See
> [Framework Guide: Greenfield vs. Brownfield Projects](../../guides/framework.md#greenfield-vs-brownfield-projects).

| Practice                  | Minimal                         | Standard                                    | Enterprise                                           |
| ------------------------- | ------------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| **Problem statement**     | Brief description of the need   | Structured who/what/why/impact format       | Formal problem analysis with stakeholder input       |
| **Business case**         | Informal justification          | Value, urgency, and strategic alignment     | Formal business case with financial analysis         |
| **Success criteria**      | 1-2 measurable outcomes         | 3-5 criteria with baselines and targets     | Comprehensive KPIs with measurement plans            |
| **Non-goals/assumptions** | Quick list                      | 3-5 explicit non-goals, key assumptions     | Detailed boundary analysis with stakeholder review   |
| **Risk assessment**       | Mental note of key risks        | Documented risks with likelihood and impact | Formal risk register with mitigation plans           |
| **Estimation**            | Rough range                     | Range-based with confidence label           | Multiple estimation techniques, sensitivity analysis |
| **Gate 1 process**        | Informal team agreement         | Structured review with decision criteria    | Formal gate with stakeholder sign-off                |
| **Pre-mortem**            | Skip or 1-sentence risk note    | 2-3 failure modes with mitigations          | Structured pre-mortem with stakeholder input         |
| **Security**              | Note if sensitive data involved | Classify data sensitivity, note compliance  | Formal data classification with compliance mapping   |

Expand Initiation only when needed:

- **Regulated / compliance-heavy:** Add compliance requirements, formal sign-off
- **Large data migrations:** Add data scope analysis, migration risks
- **Material security / privacy impact:** Add threat summary, privacy
  considerations
- **Multi-team dependency chain:** Add cross-team coordination, dependency
  mapping
- **Hard external deadlines:** Add timeline constraints, phased delivery options

Otherwise, keep the Brief concise and move quickly to Requirements.

> These triggers help you decide when to move from Minimal to Standard or
> Enterprise. For full tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Why These Initiation Elements Matter

Each section of the Initiation Brief exists because skipping it causes
predictable failures. This section explains why each element is included:

1. [**Problem Statement**](#problem-statement) — what's wrong and why it matters
2. [**Business Case**](#business-case) — value, urgency, and strategic alignment
3. [**Goals**](#goals) — enumerated intended outcomes the project will achieve
4. [**Success Criteria**](#success-criteria) — measurable criteria that flow
   through all stages
5. [**Scope Boundaries and Non-Goals**](#scope-boundaries-and-non-goals) —
   what's in and what's out
6. [**Gate 1 Decision Criteria**](#gate-1-decision-criteria) —
   proceed/revise/stop framework
7. [**Project Lead and Stakeholders**](#project-lead-and-stakeholders) —
   ownership and accountability
8. [**Assumptions**](#assumptions) — hidden scope made explicit
9. [**Risks**](#risks) — unknowns that affect estimates and planning
10. [**Pre-Mortem**](#pre-mortem) — anticipate failure modes before committing
11. [**Constraints and Dependencies**](#constraints-and-dependencies) — hard
    limits and external factors
12. [**Options Considered**](#options-considered) — forces comparison of
    alternatives
13. [**Range-Based Estimation**](#range-based-estimation) — honest early sizing
14. [**Data Sensitivity and Compliance**](#data-sensitivity-and-compliance) —
    regulatory and privacy constraints
15. [**Brownfield Readiness — Quick Pass**](#brownfield-readiness--quick-pass) —
    cost signal for Gate 1 on brownfield projects

### Problem Statement

A clear problem statement prevents solution-first bias and aligns stakeholders
on what's actually wrong before anyone proposes how to fix it. Without one,
teams build features that solve the wrong problem or solve no problem at all.
The structured format — who, what, why, impact — forces the author to articulate
the gap between the current state and the desired state. This framing also
anchors later stages: Requirements validates the problem, Design solves it, and
Operations measures whether it stays solved.

**Good format:**

> "\<User/persona\> cannot \<do thing\> because \<constraint/root cause\>,
> resulting in \<impact\>. Success looks like \<metric/outcome\>."

**Good example:**

> "Support agents can't reliably find the latest customer context within 30
> seconds because conversations are split across tools, increasing handle time
> and repeat contacts. Success = p90 time-to-context < 30s and repeat-contact
> rate down 10%."

**Bad example (solution-first):**

> "Build an AI chatbot for support."

### Business Case

Prioritization requires demonstrated value and urgency. Without a business case,
projects compete on opinion rather than evidence, and the loudest voice wins. A
written business case forces the sponsor to quantify value, articulate urgency,
and connect the project to strategic goals. It also gives gate reviewers a basis
for comparing this project against competing investments. If the business case
can't be stated clearly, the project isn't ready for investment.

**What to include:**

- Value estimate — quantified benefit (revenue, cost savings, risk reduction)
- Urgency driver — why now rather than next quarter
- Strategic alignment — which organizational goal or initiative this supports
- Cost of delay — what happens if the project is deferred or cancelled

**Good example:**

> "Automating invoice reconciliation saves ~120 staff-hours/month ($18k) and
> eliminates the leading source of month-end close delays. Finance has flagged
> this as a prerequisite for the Q3 ERP migration."

**Bad example:**

> "This would be a nice improvement for the team."

### Goals

Goals are the concrete, enumerated outcomes a project intends to achieve — what
success _is_, before deciding how to _measure_ it. Without a goals layer the
brief jumps straight from the business case to success criteria, leaving those
criteria with nothing to verify against: there is no way to confirm that every
intended outcome is checked, or that every check serves a real outcome.

A goal is an outcome — not a feature, a metric, or a task — and it need not be
measurable; measurability is the job of the success criteria that map to it.
Each goal carries a one-line "Why" so reviewers can see the reasoning. This
yields a clean chain: business case → goals → success criteria, where each
criterion names the goal or goals it verifies. Most criteria verify a single
goal; one that maps to several goals is valid but a signal to check that the
goals are genuinely distinct rather than restatements of one another.

Goals root the project's **outcome chain** — not every requirement. Security and
compliance obligations, for example, descend from the
[Data Sensitivity and Compliance](#data-sensitivity-and-compliance) section as a
parallel root, not from a goal. For how goals connect to success criteria,
requirements, and acceptance criteria across stages, see
[Framework Guide: The Traceability Chain](../../guides/framework.md#the-traceability-chain).

The number of goals reflects what the project intends to achieve, not its tier —
most projects have one to four, and fewer is better. State at least one goal at
every tier, including Minimal, where it may be a single bullet.

**Good example:**

> "G-1: HR managers have continuous visibility into onboarding progress without
> manual chasing. Why: visibility is the outcome the project delivers — today it
> is absent."

**Bad example:**

> "Build an onboarding dashboard" — that names a feature, not an outcome.
> "Onboarding completion rate reaches 95%" — that is a metric, and belongs in
> Success Criteria.

**Subtler bad example — too low (a mechanism):**

> "New hires receive automated reminders for upcoming tasks." — this reads like
> a state of the world, but it is really a _mechanism_. Ask what it enables —
> "new hires don't miss tasks" — and the real outcome appears. Reminders are one
> way to get there; they belong in Requirements, not Goals.

**Subtler bad example — too high (above the project):**

> "New hires reach full productivity faster." — a real outcome, and a tempting
> one, but the onboarding tracker does not control it: ramp speed also turns on
> training quality, the hiring manager, and role complexity. The project owns
> getting onboarding _completed on time_; faster productivity is the broader
> result that completion only contributes to, owned above this project. Drop
> back to the outcome the project can be held to.

**Altitude check.** Test a candidate goal in both directions. _Too low:_ ask
_what does this enable?_ — if the answer is itself an outcome ("X happens", "Y
improves"), you have named a mechanism, so keep peeling. _Too high:_ ask whether
delivering this project in full would, by itself, achieve the outcome — if it
also leans on work outside this project, drop to the slice the project owns. The
right altitude is bracketed from both sides: low enough not to be a mechanism,
high enough to still be an outcome this project can be held to (peel far enough
and every chain reaches "grow revenue," which is above any one project). This is
the same abstraction-and-scope idea applied to Initiation; see
[Stage Altitude](../../guides/stages.md#stage-altitude).

### Success Criteria

Success criteria are the guardrails that keep delivery honest. Each one is the
measurable check that a goal was met, and names the goal or goals it verifies.
They flow through every later stage — Requirements traces features to them,
Verification validates them, and Operations monitors them in production (see
[Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline)).
Without measurable criteria, teams declare success based on "we shipped it"
rather than "it worked." Defining baselines and targets during Initiation also
exposes unrealistic expectations early, before significant investment is made.

Prefer a small set of metrics:

- One outcome metric (customer/business impact)
- One operational metric (latency/errors)
- One adoption metric (usage/coverage), if relevant

**Good example:**

> "Baseline: p90 time-to-context is 72s. Target: p90 < 30s within 4 weeks of
> launch. Secondary: repeat-contact rate drops from 18% to < 10%."

**Bad example:**

> "Improve support agent experience."

Not all projects lend themselves to numeric baselines and targets. For PoCs,
spikes, and exploratory projects, qualitative criteria with explicit evaluation
conditions are acceptable — the key is a clear definition of done, not the
presence of a number. See
[Initiation Reference: When criteria are qualitative](reference.md#when-criteria-are-qualitative)
for templates and examples.

### Scope Boundaries and Non-Goals

Scope boundaries define what's included; non-goals define what's explicitly
excluded. Together they form a boundary contract that prevents scope creep and
reduces rework. Scope creep is the most common cause of project overruns, and it
almost always starts with an unstated assumption about what's "obviously"
included. By writing down both what is in scope and what is deliberately out of
scope, teams create a reference point for every future "can we also…?"
conversation. Non-goals are especially powerful because they signal conscious
trade-offs, not oversights.

**Examples of scope boundaries (in-scope):**

- "Support agents on the web app only; mobile app is out of scope."
- "English-language content only for v1."
- "Read-only API integration; no write-back to the source system."

**Examples of non-goals:**

- "No UI redesign in v1."
- "No historical data backfill."
- "No internationalization support."
- "No change to auth model."

### Gate 1 Decision Criteria

Makes the approval decision explicit and repeatable. Without criteria, gate
reviews become subjective debates where seniority or enthusiasm drives the
outcome. Pre-defined criteria tell reviewers exactly what "ready" looks like and
give the team a concrete target to prepare for. They also make the
proceed/revise/stop options concrete — reviewers aren't choosing between "yes"
and "no" but between well-defined paths. This reduces decision fatigue and
speeds up the gate review itself.

**What to include:**

- Decision criteria — what conditions must be true to proceed
- Thresholds — quantified where possible (e.g., "business case shows positive
  ROI within 12 months")
- Decision options — define proceed, revise, and stop with expected next steps
  for each

**Example:**

> "Proceed if: problem is validated by at least two stakeholders, business case
> shows positive ROI within 12 months, and no unmitigated high-impact risks
> remain. Revise if: problem is validated but business case is weak — refine
> scope. Stop if: problem cannot be validated or strategic alignment is absent."

> **Solo builders (Minimal tier):** Gate 1 collapses to a deliberate
> one-question self-gate — but don't fire a bare "proceed?" on a brief the
> builder just watched scroll past. **Present the delta first:** in a sentence
> or two, name what the brief changed from the raw idea — scope that shrank, a
> risk or assumption that surfaced — then ask _"Knowing this, is it still worth
> building, at this size?"_ When the brief changed nothing material, **say so
> plainly** ("the brief didn't reshape the idea — here's a two-second confirm").
> The delta is the agent's own raw-idea-vs-brief read — free, because it holds
> both — not a new artifact or check. No review meeting, no decision package,
> but the decision is still recorded: write the answer and the date as a note in
> the brief. The pause earns its place because the brief usually changes the
> idea — "yes, but smaller" is a common answer, and "no" is a successful
> outcome, not a failure. For the full N=1 role translation, see
> [Roles Guide: Solo Builders](../../guides/roles.md#solo-builders-n1).

> **Brownfield projects:** If the quick-pass readiness assessment estimates **T3
> or below**, include preparation cost in the Gate 1 decision. The decision may
> be to proceed (with preparation factored into timeline and budget), postpone
> (if the opportunity doesn't justify the prep investment now), or abandon. See
> [Brownfield Readiness Guide: When to Assess](../../guides/brownfield-readiness.md#when-to-assess).

> **Common mistake:** Confusing Gate 1 and Gate 2 outputs. Initiation produces
> the brief; Requirements + Design produce Gate 2 outputs (detailed
> requirements, design direction, updated estimates).

### Project Lead and Stakeholders

No owner means no accountability. Naming the lead and approvers ensures someone
drives the brief to completion and someone can approve investment. Without
explicit roles, decisions stall because nobody knows who has authority, and
feedback loops break because nobody knows who to consult. Identifying
stakeholders early also prevents late-stage surprises — the security team that
wasn't consulted, the VP who expected different scope, or the platform team
whose roadmap conflicts with yours.

**What to include:**

- Project lead — the person accountable for completing the brief and driving the
  project forward
- Approver — the person (or group) with authority to make the Gate 1 decision
- Consulted — people whose input is needed before decisions are made
- Informed — people who need to know the outcome but aren't decision-makers

> **Solo builders:** every role above is you, and your users stand in for
> stakeholders. See
> [Roles Guide: Solo Builders](../../guides/roles.md#solo-builders-n1) for the
> N=1 translation.

### Assumptions

Assumptions are hidden scope — things the team believes to be true but hasn't
verified. Making them explicit improves estimate honesty and gives stakeholders
a chance to challenge beliefs before they become embedded in the plan. Every
unvalidated assumption is a potential scope change waiting to happen. When an
assumption proves false mid-project, the result is rework, schedule slips, or
both. Writing them down also creates a natural validation checklist for the
Requirements stage.

**What to include:** Assumptions that, if false, shift cost/schedule materially:

- External system capabilities/limits
- Data availability/quality
- Security/compliance constraints
- Team availability or required skills

**Good example:**

> "We assume the payments API supports batch operations (unverified). If it
> doesn't, we'll need a queuing layer that adds ~2 weeks."

**Bad example:**

> "The API will work."

### Risks

The width of your estimate range is mostly a function of unknowns — risks are
those unknowns made visible. Identifying risks early gives the team time to
mitigate them before they become problems. A risk without a mitigation plan is
just worry; a risk with a concrete spike, prototype, or review becomes
actionable work. Risks also inform the Gate 1 decision — a project with many
unmitigated high-impact risks may need a spike before it's ready for full
investment.

**Good risk entries include:**

- Impact + likelihood
- A concrete mitigation (spike/prototype/review)
- A fallback path

**Example:**

> "Risk: Third-party geocoding API may not meet our latency requirements
> (likelihood: medium, impact: high). Mitigation: Run a performance spike in
> week 1. Fallback: Use a self-hosted alternative at higher infrastructure
> cost."

### Pre-Mortem

A pre-mortem inverts the typical risk exercise: instead of asking "what could go
wrong?", the team imagines the project has already failed and works backward to
identify why. This reframe makes it psychologically safe to name uncomfortable
failure modes — team members aren't predicting failure, they're explaining a
hypothetical one. Pre-mortems surface risks that traditional risk lists miss
because they tap into intuition and experience rather than checklist thinking.

The pre-mortem lives in the Initiation Brief (not as a standalone artifact)
because it's a project-level exercise, not a per-increment one. Increment Design
already handles tactical risk identification for each increment.

**Good pre-mortem entry:**

> "Failure mode: The project ships on time but nobody uses it because support
> agents find it slower than their current workflow. Why plausible: We haven't
> observed the current workflow firsthand. Early signal: Agents in the pilot
> group stop logging in after the first week."

**Bad pre-mortem entry:**

> "The project might fail."

**Brownfield-specific prompt:** _"The project failed because data reconciliation
between old and new systems produced silent mismatches — records looked correct
but calculations diverged due to undocumented business rules in stored
procedures. Why plausible: We haven't fully inventoried database-layer logic.
Early signal: Validation queries show discrepancies between old and new outputs
during the first integration test."_

### Constraints and Dependencies

Hard limits and external dependencies bound the solution space. Constraints are
non-negotiable facts — budget caps, compliance requirements, platform
limitations, or hard deadlines. Dependencies are things you need from others —
another team's API, a vendor contract, or an approval process. Surfacing both
early prevents late-stage surprises that force costly redesigns. A constraint
discovered during Implementation is a crisis; the same constraint documented
during Initiation is just a design input.

**What to include:**

- Constraints — budget, deadlines, regulatory/compliance requirements, platform
  or technology mandates
- Dependencies — other teams' deliverables, vendor timelines, approval
  processes, infrastructure provisioning

> **Platform services:** the cross-cutting services the product composes (auth,
> payments, hosting, persistence, …) are surfaced as a consulting step — see
> [Platform Services](#platform-services). The design-time ones land here as
> dependencies flagged for System Design.

**Example:**

> "Constraint: Must comply with SOC 2 data-handling requirements; no customer
> PII in logs. Dependency: Platform team must provision the staging environment
> by March 15; if delayed, our timeline shifts accordingly."

### Options Considered

Comparing at least one alternative forces critical evaluation of the default
approach and documents why it was chosen. Without documented alternatives,
reviewers can't assess whether the team explored the solution space or simply
latched onto the first idea. Options analysis also creates a decision record
that future teams can reference when revisiting the approach. Even when the
"obvious" choice is correct, the act of comparing alternatives often surfaces
trade-offs that improve the final design.

**What to include:**

- Option name — short label for each alternative
- Pros/cons — key trade-offs for each option
- Recommendation — which option is preferred and why

**Example:**

> "Option A: Build custom reconciliation engine (pro: full control, con: 6-8
> weeks). Option B: Configure vendor tool (pro: 2-week setup, con: $500/month
> ongoing, limited customization). Recommendation: Option B — faster time to
> value; revisit if customization needs grow."

### Range-Based Estimation

Early-stage work is inherently uncertain, and point estimates create false
certainty that erodes trust when they're inevitably missed. Range-based
estimates acknowledge what you don't yet know while still giving stakeholders
useful sizing information. The width of the range itself communicates confidence
— a 2–4 week range signals reasonable clarity, while a 2–12 week range signals
that a spike is needed before committing. Ranges also force the team to
articulate what assumptions and risks drive the spread, which improves planning
quality.

**What to include:**

- A range (e.g., 2-4 weeks) and a confidence label
- The top assumptions driving the range
- The risks that could push the upper bound

These are **hypotheses**, not commitments. After Requirements stage, estimates
are updated with higher confidence.

**Good example:**

> "Estimate: 3–5 weeks (moderate confidence). Range driven by: uncertainty about
> API batch support (see Assumptions) and pending platform team availability. If
> the geocoding spike reveals latency issues, add 1–2 weeks for the self-hosted
> fallback."

**Bad example:**

> "4 weeks."

### Data Sensitivity and Compliance

Identifying data sensitivity and compliance requirements early prevents costly
rework when regulatory constraints surface mid-delivery. Projects handling
personal data, financial records, or health information carry obligations that
shape architecture, tooling, and AI usage from day one. Capturing these
constraints during Initiation ensures that Requirements includes them as NFRs
and System Design accounts for them structurally. See the
[Security Guide](../../guides/security.md) for the framework's security
throughline and classification approach.

### Brownfield Readiness — Quick Pass

Brownfield projects inherit existing code, infrastructure, and operational
constraints that greenfield projects do not. The brownfield readiness section
captures the current state assessment — what exists, what technical debt must be
addressed, and what constraints the existing system imposes on new work. Without
this quick pass, teams discover integration issues and legacy constraints
mid-implementation when they are most expensive to address.

---

## Stage Outputs

- **Initiation Brief** containing: problem statement, business case, goals,
  success criteria, scope boundaries, assumptions, risks, options, estimation,
  and Gate 1 definition
- **Success Criteria Register** — record each success criterion with its goal
  mapping, baseline, and target in the
  [Success Criteria Register](../../templates/success-criteria-register.md) so
  every downstream stage references one source of truth

> Success criteria defined here establish the **measurement throughline** that
> flows through all subsequent stages. See
> [Framework Guide: Measurement Throughline](../../guides/framework.md#measurement-throughline).

> The optional pre-mortem in the Initiation Brief starts the **learning
> throughline** — identifying top failure modes before committing resources so
> later stages can watch for early signals. Initiation is also where the
> project's standing friction log is created — it accumulates friction from this
> first stage onward. See [The Learning Loop](../../guides/learning-loop.md).

> Initiation starts the **security throughline** by classifying data sensitivity
> and compliance scope so downstream stages know the security posture required.
> See [Security Guide](../../guides/security.md).

**Handoff:** If proceeding, Requirements stage uses your Initiation Brief as its
starting point. Distribute checkpoint or gate decision artifacts to all Informed
roles per the
[Information Protocol](../../guides/roles.md#information-protocol).

---

## When to Revisit Initiation

**Triggers:**

- Business priorities shift or strategic context changes
- Stakeholder feedback indicates misalignment on goals or success criteria
- Market changes or competitive landscape shifts
- Goals or success criteria need revision based on new information
- Scope boundaries (non-goals/assumptions) prove incorrect

**Process:**

1. Revisit the Initiation Brief with updated context
2. Re-validate problem statement and business case
3. Update goals and success criteria if intended outcomes changed
4. Re-run the Initiation Checklist
5. Communicate changes to downstream stages

> **Mid-stage discovery?** If something unexpected surfaces during active work,
> see the [Mid-Stage Discovery](../../guides/framework.md#mid-stage-discovery)
> decision tree to determine whether to assess, amend, or defer.

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.2.0. Goal altitude check added in v0.46.0.
Idea-formation entry path added in v0.48.0. Adaptive, stakes-scaled interview
frame and operating-frame seeding added in v0.49.0. Platform-services consultant
section (signal → implied service; mover/design-time split) added in v0.50.0.

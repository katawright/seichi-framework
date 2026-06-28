# Worked Example: Solo Developer, From Idea to Gate 1

> **New here?** See [Framework Overview](OVERVIEW.md#worked-example-solo) for
> what this example is, why it exists, and how to use it. This file is the
> operational reference.

## Key Principle

The framework at N=1 is the same framework with the ceremony removed. The
deliberate moments — a tested problem statement, explicit assumptions, a real
go/no-go pause — stay.

---

## Scenario

Sam is a software developer who climbs at an indoor gym two or three times a
week. Evenings and weekends are the available build time — roughly four hours a
week. There is no repository, no project name, and no plan; there is an itch and
an empty folder.

Sam pastes the
["I only have an idea" Quick Start prompt](../QUICKSTART.md#i-only-have-an-idea)
into a local agent.

---

## The Idea

> "I have an idea for an app to track my climbing training."

That is the entire input. Note what is missing: who it is for, what problem it
solves, what exists already, what success would mean. The idea-formation
interview exists to extract those — see
[Initiation: Arriving with Only an Idea](../stages/initiation/README.md#arriving-with-only-an-idea)
for the contract.

---

## Idea Formation: The Interview

The agent interviews Sam before creating any workspace or artifacts. Condensed:

> **Agent:** What made you want this — was there a moment where not having it
> cost you something?
>
> **Sam:** Last month I realized I'd been stuck on the same grade since
> December. I log sessions in my notes app, but it's just text — I can't see
> progression at all.
>
> **Agent:** Who hits this problem? Just you, or others?
>
> **Sam:** Me, mainly. My climbing partners complain about the same thing, but
> I'd build it for myself first.
>
> **Agent:** What does the problem cost you today?
>
> **Sam:** Unstructured training. I repeat the same kinds of sessions, and
> plateaus go unnoticed for months because nothing shows the trend.
>
> **Agent:** If this existed and worked, what would be different?
>
> **Sam:** I'd open it before a session, see my progression per grade, and pick
> what to focus on. And logging would have to be fast — mid-session, chalky
> hands.
>
> **Agent:** What would have to be true for this to be worth building? Have you
> checked what's out there?
>
> **Sam:** I tried two climbing apps — they're built for logging outdoor
> ascents, not gym training trends. The real question is whether I'd actually
> log every session. If logging is annoying, I'll stop.

The interview is done when its three exit criteria exist. Mapped to what it
extracted:

| Exit criterion                | Extracted                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Candidate problem statement   | Sam can't see climbing progression across sessions, so training is unstructured and plateaus go unnoticed for months   |
| Target user                   | Sam; climbing partners later ("me, and people like me")                                                                |
| Riskiest assumptions surfaced | Sam will actually log mid-session; existing apps genuinely don't cover gym-training trends; buildable in ~4 hours/week |

---

## Classification by Inference

Nothing in the conversation asked Sam to pick a tier, a project type, or an
autonomy level. The agent derives the classifications and presents them as
overridable assumptions (see
[Agentic Workflow Guide: Classification by Inference](agentic-workflow.md#classification-by-inference)):

> `[ASSUMED]` Tier: Minimal — solo, personal data only, no external users.
> `[ASSUMED]` Project type: Greenfield — empty folder. `[ASSUMED]` Deployment
> intent: Local/personal use for now. `[ASSUMED]` Operating posture:
> Checkpointed — framework default for a first project. Say the word and any of
> these change.

Sam nods, and only now does the agent scaffold the workspace and seed the brief.

---

## The Minimal-Tier Initiation Brief

The completed brief, in full. At Minimal tier the brief is short — that is the
point. Sections the [template](../templates/initiation-brief.md) marks skippable
at Minimal are omitted, not filled with "N/A."

### Right-Sizing This Brief

**Tier chosen:** Minimal `[ASSUMED]` **Project type:** Greenfield **Deployment
intent:** Local-only (personal use) **Operating posture:** Checkpointed
`[ASSUMED]` — see [Operating Model](operating-model.md) for Required Assurance.

### Problem Statement

Sam logs climbing sessions as free text in a notes app and cannot see
progression across sessions. Training is unstructured, and plateaus go unnoticed
for months. Success looks like seeing per-grade progression at a glance and
choosing each session's focus accordingly.

### Business Case + Why Now

Personal time investment, not revenue. The plateau is current and frustrating,
and the winter indoor season starts next month — more sessions to log, more
value from starting now.

### Goals

- **G-1:** Sam can tell whether his climbing is improving without manual
  spreadsheet work.
  - **Why:** Invisible progression is the failure the project exists to fix.

### Success Criteria

No baseline exists — nothing is measured today. Following the
[no-baseline pattern](../stages/initiation/reference.md#when-criteria-cannot-be-baselined),
the measurement method is defined up front, first-baseline capture is itself a
criterion, and targets are absolute rather than deltas.

- **SC-01:** Session and climb data are captured from first use; first baseline
  (sessions/week, grade distribution) recorded after 4 weeks. Measured by: the
  app's own data.
  - **Goals:** G-1
  - **Why:** A new product's first verifiable outcome is that the metric is
    observable at all.
- **SC-02:** Sam logs every gym session in the app instead of the notes app for
  6 consecutive weeks. Measured by: session log vs. gym visits.
  - **Goals:** G-1
  - **Why:** Absolute adoption check — no baseline needed, and adoption is the
    riskiest assumption.

### Scope Boundaries and Non-Goals

**In scope:** Log a session (climbs, grade, style, send/attempt) in under 20
seconds; a per-grade progression view.

**Out of scope / non-goals:** Social features, outdoor ascent logging, training
plans, wearables, multi-user accounts, public deployment — all deferred until
SC-02 proves the core habit.

### Gate 1 — Proposed Decision Criteria

Solo at Minimal tier: Gate 1 is the one-question self-gate — the agent presents
the delta the brief made to the raw idea, then asks _"Knowing this, is it still
worth building, at this size?"_ — recorded as a note below (see
[Initiation: Gate 1 Decision Criteria](../stages/initiation/README.md#gate-1-decision-criteria)).

### Project Lead and Stakeholders

All roles are Sam (see [Roles Guide: Solo Builders](roles.md#solo-builders-n1)).
Users: Sam now; climbing partners are future stakeholders, consulted only if v1
survives six weeks.

### Assumptions (Top 3)

- Sam will log mid-session if it takes under 20 seconds `[ASSUMED]` — the
  riskiest one; if wrong, the project has no value.
- Existing apps don't show gym-training progression (checked two; both are
  outdoor-ascent loggers) `[ASSUMED]` — one more app to check before building.
- ~4 hours/week of build time is sustainable through the season.

### Risks / Unknowns

- **Risk:** Logging friction kills the habit. **Impact if wrong:** Project
  abandoned with zero value. **Likelihood:** M **Mitigation:** Design the log
  flow first; dry-run it at the gym with a stopwatch before building anything
  else.

### Pre-Mortem

- **Failure mode:** Built the progression charts first, never made logging fast,
  stopped logging after two weeks. **Why plausible:** Charts are the fun part;
  logging UX is the hard part. **Early signal:** Sessions logged retroactively
  from memory instead of at the gym.

### Data Sensitivity and Compliance

**Data sensitivity:** Personal training data, single user — Internal.
**Compliance scope:** None.

### Constraints and Dependencies

- **Constraints:** ~4 hours/week; $0 budget (local or free tier only).
- **Dependencies:** None.

### Options Considered

- **Option A:** Keep using an existing climbing app — rejected: built for
  outdoor ticks, no gym-training trends.
- **Option B:** A spreadsheet — rejected: that is roughly the current failure
  with more columns.
- **Option C:** Build a minimal logger plus one progression view — chosen;
  smallest thing that tests the adoption assumption.

### Range-Based Estimation

3–6 weekends to a loggable v1 (low-moderate confidence). Range driven by the
logging-UX unknown; the progression view is well understood.

---

## Gate 1: The Self-Gate

No meeting, no decision package. The agent doesn't fire a bare "proceed?" — it
**presents the delta first**, then Sam answers the one question, recorded in the
brief:

> **The brief reshaped the idea:** it arrived as "an app to track my climbing
> training" and the brief narrowed it to a sub-20-second logger and one
> progression view, gated on Sam's own adoption (SC-02). Scope shrank, and the
> riskiest assumption — "will I actually log every session?" — surfaced as the
> thing to test first.
>
> **Gate 1 (2026-06-09):** Knowing this, is it still worth building, at this
> size? **Yes — but smaller than the original idea.** v1 is logging plus one
> progression view; nothing else until SC-02 shows six weeks of real use.

That narrowing is the gate working — the delta is what earns the click. Had the
brief changed nothing material, the agent would have said so plainly and made it
a two-second confirm. **"No" would also have been a success** — a half-evening
of interviewing instead of three abandoned weekends.

---

## What Happens Next

The path continues at Minimal tier:

- **Requirements** — a short
  [Requirements Brief](../templates/requirements-brief.md): the log flow and the
  progression view as a handful of functional requirements with acceptance
  criteria (the 20-second log target becomes a measurable NFR).
- **System Design** — at Minimal, likely inline decision notes in the
  [System Design Brief](../templates/system-design-brief.md) rather than
  separate ADRs; Gate 2 is the same self-gate pattern with the cost/effort
  picture updated.
- **Increments** — Increment 1 is the logger (the riskiest assumption first),
  not the charts.

For the team-scale version of the full eight-stage trace, see the
[Worked Example](worked-example.md); for adopting the framework on an existing
codebase, see the [Brownfield Worked Example](worked-example-brownfield.md).

---

## Notes

**Last Updated:** 2026-06-28

Added to framework in v0.48.0.

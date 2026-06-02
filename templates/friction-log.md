<!-- For guidance on the learning loop and friction triage, see guides/learning-loop.md -->

# Friction Log

**Purpose:** Capture friction encountered while running this project — process,
execution, product, and tooling — as numbered, typed entries the retrospective
triages.

**Usage:** One friction log per project. Create it at project start and append
entries as friction arises, in any stage — do not wait for the retrospective.
See the [Learning Loop](../guides/learning-loop.md) for how entries are triaged
and where each type's fix lands.

**Project:** [project name]

**Created:** YYYY-MM-DD

**Last Updated:** YYYY-MM-DD

---

## Friction Types

Every entry is typed by **where the fix lands**:

- **Process** — friction with the development process / SDLC method itself: a
  stage guide, checklist item, template, or the gate model. Fix lands with the
  framework maintainers. _Example: "Increment Design checklist has no
  internal-consistency item."_
- **Execution** — friction with how this team ran the project; an execution gap
  the team owns. Fix is something the team does differently next time. _Example:
  "handoff lost the open edge-cases list."_
- **Product** — a discovered idea, gap, or tech-debt observation about the
  software being built. Fix is a product change. _Example: "export path has no
  rate limiting."_
- **Tooling** — friction with the tools or environment used to run the project
  (AI assistant, IDE, CI/CD, SaaS platform, local setup). Fix lands with a tool
  owner. _Example: "CI flakes roughly 1 run in 5."_

An entry spanning two types picks the **primary** type — where the main fix
lands. An entry that fits none should be sharpened until it does; there is no
"Other" type.

---

## Entries

<!-- Number entries F-001, F-002, … continuously for the life of the project.
     Do not reset per increment. Copy the block below for each new entry. -->

### F-001 — [short title]

- **Type:** [Process / Execution / Product / Tooling]
- **Logged:** YYYY-MM-DD
- **Stage:** [stage name]
- **Observed:** [what happened — specific and concrete]
- **Impact:** [what it cost: time, quality, risk, morale]
- **Likely improvement:** [the change that would prevent or reduce this
  friction]
- **Status:** [Open / Triaged / Resolved / Won't Fix]
- **Disposition:** [filled in at the retrospective — where the entry routed and
  to which owner: Execution → Action Items / Carry Forward (next increment);
  Process → Process Feedback (framework tracker); Product → Future Value
  Candidates → idea IDEA-NNN; Tooling → Action Items (tool owner)]

---

<!-- Template Last Updated: 2026-06-01 | Added in v0.45.0. Disposition routing made owner-explicit in v0.47.0 -->

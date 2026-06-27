# Changelog

## 0.51.0 (2026-06-26)

### Features

- **framework:** stage-scoped framework loading — `agentic-workflow.md` gains a
  **Read Order and the Load Line** section fixing the always-loaded
  cross-cutting governance (Tier 0 classification core — `INDEX`, `README`,
  `agentic-workflow`, `session-protocol`, `right-sizing`; Tier 1 governance
  spine — `operating-model` and its spec, `framework`, `checkpoints`, the
  `security` throughline, and the `stages` map) against stage-scoped and
  contextual material an agent loads only on entry to the stage or context. The
  Agent Execution Model's Orient step repoints to it (RC-1)

### Refactor

- **framework:** audience-separated the guide corpus — the human-onboarding
  layer (Overview blurb + Why / Goals / How to Use) is lifted out of all 24
  operational `guides/*.md` files into a new human-facing
  **`guides/OVERVIEW.md`** (per-guide sections with a table of contents and
  back-links) that agents do not load. Each guide now opens with a one-line "New
  here?" pointer to its OVERVIEW section, then its load-bearing Key Principle
  and any cross-reference callouts. `INDEX.md` adds the OVERVIEW row (Guides 25
  → 26) and `STYLE_GUIDE.md` documents the new opening convention. The
  brownfield 5→1 single-source consolidation (RC-3's separate de-dup lever) is
  deferred to a tracked follow-up (RC-3, audience-separation lever)

## 0.50.0 (2026-06-26)

### Features

- **framework:** session-start orientation protocol — `session-protocol.md`'s
  "At Session Start" now splits into an **Orient** subsection (a cheap
  environment read plus a four-route scenario taxonomy, presented as an
  overridable suggestion) and **Continue-a-known-project**;
  `agentic-workflow.md`'s Agent Execution Model points at the protocol rather
  than restating project-state inference (SO-1)
- **initiation:** platform-services consulting at Initiation — a new **Platform
  Services** section in `initiation/README.md` wires the signal table to implied
  cross-cutting services (auth, payments, persistence, hosting, email, storage,
  observability, secrets, jobs, CDN) and sets the timing split: tier/posture
  movers settle at Initiation, the rest are surfaced, sequenced, and deferred to
  System Design with the decision recorded. System Design gains an
  Infrastructure Planning callback and the brief's Constraints and Dependencies
  gains a surfacing prompt (SO-2)
- **framework:** entry-accessibility refinements — a first-contact jargon-help
  invitation in the Orient subsection, operator-comfort register calibration in
  Classification by Inference (technical comfort inferred from how the operator
  talks, never a self-rating), and removal of the redundant "My idea:"
  placeholder from the QUICKSTART idea-only prompt (QS-1/QS-2/QS-3)

### Bug Fixes

- **initiation:** narrow the Platform Services mover criterion to "tier,
  security posture, or compliance scope" (replacing the ambiguous "operating
  posture"), and surface the consulting step from the brief's Constraints and
  Dependencies walkthrough so it is reachable without a heading scan (R4-F1/F2)
- **framework:** point the session-start brownfield route at the adoption
  first-move in QUICKSTART "Joining a Project Mid-Stream" before
  Brownfield-First Routing, closing a route asymmetry with the new-project row
  (R3-F1)
- **framework:** hoist the working-location guard into the "At Session Start"
  preamble so it applies to both the Orient and Continue paths, and clarify that
  an idea (not a formed description) for a new project in an existing workspace
  runs the idea-formation interview (R2-F1/F3)
- **framework:** add the shipped `spec/` layer to two usage-layer enumerations
  (INDEX.md Scope, CLAUDE.md Agent-Execution Rule 5) that contradicted the live
  INDEX Spec section; the gate-outcome shorthand remains at v0.49's uniform
  3-value form, with the full four-value harmonization deferred to v0.52/GC-3
  (invariant sweep + 2x2 Run 1)

## 0.49.0 (2026-06-20)

> Planning-driven release: v0.49 was developed from the planning docs rather
> than tracked issues, so the entries below carry no `(#NN)` references.

### Features

- **framework:** operating model — a Layer-B model for _who runs the process and
  how autonomously_, separate from right-sizing's governance weight. Four
  configurable functions (Work Execution, Workflow Automation, Required
  Assurance, Authority) plus standing functions; capability coverage; the
  effective operating envelope; and Lights-Out as one calibration of the same
  settings (`guides/operating-model.md`)
- **framework:** agent- and conformance-facing `spec/` layer — DoD-scoped
  executable contracts in a six-field form (applicability · inputs · procedure ·
  outputs · evidence · failure-behavior): the operating-model, delegated-run,
  and canonical-state contracts a bounded Lights-Out run executes
  (`spec/operating-model.md`, `spec/delegated-run.md`,
  `spec/canonical-state.md`)
- **framework:** parallel-batch execution — dependency-aware increment plans
  extend into ordered, parallel-safe **batches**: a forcing-dependency taxonomy
  and parallel-safety classification at planning time, and batch preflight,
  concurrency-safe execution, work conservation, and close/transition at run
  time, with parallel Lights-Out gated on capability coverage. Normative
  contract plus scheduling and execution guides (`spec/parallel-batch.md`,
  `guides/parallel-scheduling.md`, `guides/parallel-execution.md`)
- **closure:** dev/ops split — the continuous Support stage is dissolved; the
  SDLC's 8th stage is now **Closure**, a terminal stage owning the dev→ops
  operational-envelope handoff record, production-ownership transfer, project
  closure (rendering the completion contract), and the project wrap-up
  retrospective (`stages/closure/`, `templates/operational-handoff.md`)
- **framework:** Operations Guide — a standing-system process (sibling to the
  SDLC, terminal: decommission) organized by Observe / Respond / Maintain /
  Measure, reusing the operating model; relocates and reframes the former
  Support reference content (`guides/operations.md`)
- **framework:** Flow delivery mode — a continuous, per-issue lane for small
  in-place software changes (no Initiation, no Closure; ship-and-close is
  terminal), with a folded entry artifact. Three work-shapes — Project · Flow ·
  Operations — share one operating model (`guides/stages.md`,
  `templates/flow-issue.md`)
- **initiation:** ideation front door — the "Arriving with Only an Idea"
  interview infers the operating configuration (consequence / compliance / reach
  / operating posture) and seeds it as `[ASSUMED]`, locked at Gate 1; the
  learning loop closes the capture ↔ validate-and-launch portfolio loop with one
  front door and two on-ramps

### Improvements

- **framework:** right-sizing reorganized around three **governance-weight**
  dimensions — Consequence (a magnitude), Compliance (a flag/obligation set),
  and Stakeholder Reach (accountability boundaries) — with _who runs the
  process_ moved to the operating model; Minimal/Standard/Enterprise retained as
  consequence-mapped presets (`guides/right-sizing.md`)
- **framework:** vocabulary sweep — "agent" is the actor, "AI" the technology;
  the retired AI-Autonomy / Human-Led / AI-Led tiers and the
  Active/Passive/Minimal oversight dial are replaced in prose by Work
  Execution + Authority + Required Assurance; a `Terminal` execution pattern is
  added for Closure
- **framework:** `ai-assistance.md` retired — its autonomy/oversight model is
  superseded by the operating model; inbound links repointed

### Bug Fixes

- **closure:** a project that reaches its terminal no longer presents as an
  early completion — reaching Closure is the normal project terminal, and the
  standing system continues under Operations (fixes the dev/ops category error)

## 0.48.0 (2026-06-09)

### Features

- **initiation:** idea-formation entry path — "Arriving with Only an Idea" names
  the pre-Initiation activity, its exit criteria (candidate problem statement,
  target user, riskiest assumptions surfaced), and the interview contract;
  zero-to-one project routing added to the agentic workflow guide (#93)
- **framework:** QUICKSTART gains a fourth paste-and-go entry path — "I Only
  Have an Idea" — that interviews from a fuzzy idea to Initiation-ready inputs
  before any workspace scaffolding (#97)
- **framework:** classification by inference — agents derive risk tier, project
  type, deployment intent, autonomy, and oversight from 2–3 natural questions
  and present them as overridable `[ASSUMED]` defaults instead of menus; all
  entry prompts aligned (#96)
- **framework:** solo-builder (N=1) translation of role vocabulary in the Roles
  Guide; at Minimal/solo, Gate 1 collapses to a recorded one-question self-gate
  (#94)
- **initiation:** no-baseline success criteria guidance for brand-new products —
  define the measurement method up front, treat first-baseline capture as itself
  a criterion, use absolute targets (#95)
- **framework:** solo worked example — a fuzzy idea traced through the
  idea-formation interview to a Minimal-tier Initiation Brief and the Gate 1
  self-gate (`guides/worked-example-solo.md`) (#98)
- **framework:** ADR conventions reconciled with ratified platform decisions —
  accepted ADRs publish to the workspace ADR canon (top-level `adrs/` in the
  governance location; documented as a swappable convention), drafts use
  two-digit `ADR-DCC` ids, promoted ids are project-id-scoped `ADR-NNNN-CC`
  derived with no shared allocator, and references use bare ids (#92)

### Improvements

- **framework:** README front-door fixes — the dated defer-if-resistant
  readiness branch removed; Start Here gains a "start from just an idea" row
  (#99)
- **framework:** INDEX descriptions and keywords refreshed for the on-ramp
  entries

### Bug Fixes

- **framework:** pre-merge review fixes to the new ADR conventions — project-id
  assignment stated as a requirement with a manual fallback (sequential project
  numbers in `projects/index.md`), draft-copy disposition unified as
  replace-with-pointer, the canon created at first promotion rather than
  scaffolded; the Initiation Brief's right-sizing section gains AI autonomy and
  oversight intensity fields
- **ci:** release-manifest tests read expected values from `VERSION` and
  `INDEX.md` at test time instead of pinning repo-state snapshots that broke
  after every release

## 0.47.0 (2026-06-01)

### Features

- **framework:** session-start location-awareness guard — agents confirm they
  are operating from an artifacts or source-code location and refuse to run from
  the read-only framework directory (#80)
- **implementation:** mark session-log creation as a `[GATE]` in the
  once-per-increment workflow, matching the existing finalize gate (#82)
- **system-design:** require ADRs to meet all three criteria (significant, hard
  to reverse, contested) — add an ADR Criteria Justification section to the
  template and an "earns its position" checklist item that demotes
  cheap-to-reverse decisions to design notes (#83)

### Improvements

- **framework:** add the **Outcomes over mechanisms** design principle — the
  framework specifies gates, invariants, and required outputs, not the
  interchangeable ways of working that satisfy them
- **framework:** add a **Project Close-Out** that bookends Initiation — a
  wrap-up checklist, the `project-closeout.md` summary template, and a Re-check
  Date for success criteria that need time to measure (#81)
- **framework:** scope the idea backlog to product/portfolio ideas and route
  process and tooling friction to the owning framework or tool tracker (#88)

## 0.46.0 (2026-05-29)

### Improvements

- **framework:** add a per-stage **altitude** model — a single Stage Altitude
  section in `guides/stages.md` (two-axis abstraction/scope spine, per-stage
  slip table, the imposed-vs-chosen test, and "code in design briefs" guidance),
  threaded into the Initiation goal-altitude check (too-low/too-high), the
  Requirements imposed-vs-chosen discriminator, and the System Design /
  Increment Design scope boundary (#73, #74)

## 0.45.0 (2026-05-18)

### Features

- **release:** the framework repo now owns release packaging — `npm run release`
  projects a Zod-validated `manifest.json` and builds a deterministic release
  zip (packaging was previously owned by theia-platform)

### Improvements

- **initiation:** split the Initiation Brief's merged "Goals and Success
  Criteria" into a distinct enumerated Goals layer (G-1, G-2, …) and measurable
  Success Criteria that each map to one or more goals
- **framework:** thread the goals layer through the downstream stages —
  Requirements, Support, and the guides — wiring the business case → goal →
  success criteria → FR/NFR/AC traceability chain end to end
- **increment-design:** add an internal-consistency pass to the design review —
  a mechanical trace (new checklist item plus a README section) that the brief
  agrees with itself, distinct from "is the design sound"
- **deployment:** make the production release an elective per-increment action —
  each Deployment slot resolves as Released or Deferred, with an explicit
  staging-vs-production distinction so Verification's environment dependency is
  honored
- **framework:** close the friction → retrospective → idea-backlog learning loop
  — a standing project-spanning friction log, a lightweight idea-backlog
  convention, and a dedicated `guides/learning-loop.md`
- **release:** document the release-zip step in the release flow

### Bug Fixes

- **framework:** carry the full checkpoint sequence in the manifest — replace
  the single-checkpoint scalar fields with a per-stage `checkpoints[]` array so
  System Design carries both the Architecture Review and Gate 2 (Gate 2 was
  previously dropped in compilation), and flip Deployment's pattern to
  `Iterative` (breaking change to the manifest schema)
- **deployment:** branch the deployment checklist on release disposition so a
  deferred increment is handled explicitly rather than assuming a release always
  fires
- **release:** regenerate `package-lock.json` on Linux for `npm ci`
  compatibility

## 0.44.0 (2026-04-11)

### Features

- **quickstart:** add "Adding a New Project to an Existing Workspace" flow
  covering the case where a workspace already has the framework set up, with
  Framework Version Coexistence guidance in the Bootstrap Guide
- **gate-decision:** add Post-Decision Actions section with Gate 2 ADR
  publishing checklist
- **session-continuity:** add `guides/session-protocol.md` canonical per-session
  step list and preamble links from all 8 brief templates
- **system-design:** add "Visual architecture" as a cross-cutting concern with
  ADR candidates and a tool-agnostic capture pattern (canonical in team's design
  tool, gate-frozen exports in `assets/`); prompt visual NFRs in Requirements
  stage and brief; add Visual designs row to Artifact Placement table
- **templates:** elevate "skip this section entirely" HTML comment directives to
  visible blockquotes in system-design, initiation, increment-design, and
  implementation briefs

### Improvements

- **requirements:** complete MoSCoW "release" → "increment" vocabulary migration
  in requirements-brief, worked example, stage README, and framework guide

### Bug Fixes

- **docs:** render `<version>` placeholder in QUICKSTART and Bootstrap Guide
  prompt blockquotes (was stripped as an HTML tag in v0.43.0)

## 0.43.0 (2026-04-05)

### Features

- **right-sizing:** promote Success Criteria Register from Optional to
  Recommended at Minimal tier — agents now surface it for all projects
- **checklists:** raise [H] items inline during interactive stage execution
  rather than batching at the end (all 8 stage checklists)
- **increment-design:** add non-code deliverable cross-reference checklist item
  to catch platform configuration, documentation, and manual setup tasks
- **tooling:** add `/release-prep` command combining VERSION, CHANGELOG, and
  INDEX.md updates into a single step

### Improvements

- **framework:** clarify MoSCoW terminology — replace "release" with "increment"
  in definitions, distinguish MoSCoW prioritization from increment plan, clarify
  Won't Have scope (future project or dropped entirely)
- **requirements:** add MoSCoW guide link to checklist item
- **bootstrap:** replace hardcoded version references with `v<version>`
  placeholder in QUICKSTART and Bootstrap Guide
- **contributing:** document release process
- **tooling:** merge `/index` command into `/release-prep`

### Bug Fixes

- **framework:** surface draft ADR convention in template, gate decision, and
  checklist
- **checklists:** remove stale `(Standard+)` tier qualifiers from success
  criteria register references

## 0.42.0 (2026-03-31)

### Features

- **stages:** comprehensive multi-dimensional review (1X/AX/OX/RX/UX) across all
  stages — added purpose statements, CD workflow adaptations, handoff protocols,
  discovery decision trees, retrospective triggers, artifact placement, and
  working locations model
- **brownfield:** hostile-brownfield deployment guidance with readiness rubric
  and deployment checklist
- **governance:** AI governance trajectory — execution, decision, and
  accountability dimensions (ADR)
- **schema:** JSON Schema validation for stage README and guide front matter
- **workspace:** multi-repo workspace support with AGENTS.md template and
  monorepo guidance
- **bootstrap:** replaced manual process guide with streamlined bootstrap guide
  and reworked quickstart

### Improvements

- **brownfield:** restructured guides, investment models, tiers, exit protocol,
  topology-aware scoring, and completion signals
- **roles:** overhauled role definitions — extracted to dedicated guide, renamed
  PM/BA to PM, standardized IDs and stakeholder guidance
- **schema:** consolidated stage metadata into READMEs, extracted pipeline
  topology into stages.md, cleaned up schema definitions
- **checkpoints:** extracted checkpoint taxonomy, standardized fallback
  protocols, handoffs, and cross-references
- **assessment:** replaced rework severity ladder with guided assessment model
- **structure:** standardized Overview H3 headings with structure validation;
  removed duplicated stage tables from guides
- **agents:** merged AGENTS.md into CLAUDE.md as single source of truth
- **enablement:** deepened enablement tactics and tightened cross-references

### Bug Fixes

- **simulation:** addressed minimal-greenfield simulation findings (ADR-003)
- **tooling:** cross-platform compatibility for install-hooks script
- **review:** addressed 200+ findings across 11 review runs spanning all stages

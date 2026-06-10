# Changelog

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

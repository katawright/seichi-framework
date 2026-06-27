# Framework File Index

**Last Updated:** 2026-06-26 | **Framework Version:** 0.50.0

## Overview

Compact inventory of framework-usage files — descriptions, keywords, and
relationships for fast orientation without loading the full corpus.

### Why a File Index

Agents and contributors waste context loading files they don't need. A single
index lets readers identify relevant files before committing to deeper reads.

### Goals of This Index

- Provide a scannable inventory of framework-usage files
- Enable agents to locate files by keyword or relationship
- Support staleness detection via section file counts

### Scope

Lists files needed to **use** the framework: guides, spec, stage artifacts,
templates, and root navigation files. Contributor tooling, schema validation,
and CI configuration are excluded.

### Sort Order

Entries within each table are sorted alphabetically by file path.

### Key Principle

Load the index first, then load only what you need.

### How to Use This Index

1. Scan the [**Root Files**](#root-files-2), [**Guides**](#guides-26), or
   [**Spec**](#spec-5) tables to find cross-cutting content
2. Jump to the relevant [**Stage Artifacts**](#stage-artifacts-25) subsection
   for stage-specific files
3. Check [**Templates**](#templates-23) for fillable artifacts
4. Use the **Keywords** column to match your task to the right file
5. Load `core`-tier files for orientation; load `ref`-tier files on demand

---

## Root Files (2)

| Path            | Description                                                                            | Keywords                                                                           | Refs                                      | Tier |
| --------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------- | ---- |
| `QUICKSTART.md` | Four paste-and-go entry paths: idea-only, new project, mid-stream, existing workspace. | quick-start, bootstrap, onboarding, execution-paths, idea-path, location-detection | agentic-workflow, bootstrap, right-sizing | core |
| `README.md`     | Project overview, stage summary table, and navigation entry point.                     | framework, SDLC, overview, navigation, stages                                      | —                                         | core |

## Guides (26)

| Path                                  | Description                                                                                                                                                                          | Keywords                                                                                                                                     | Refs                                                                                         | Tier |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---- |
| `guides/adoption.md`                  | Organizational rollout from pilot through standardization.                                                                                                                           | adoption, change-management, pilot, phased-rollout, readiness                                                                                | —                                                                                            | ref  |
| `guides/agentic-workflow.md`          | Stage routing table, agent orchestration, and fallback protocols.                                                                                                                    | stage-routing, agent-orchestration, fallback, gate-enforcement, autonomy, operating-posture, zero-to-one, classification-inference           | all stages                                                                                   | core |
| `guides/bootstrap.md`                 | Working locations, project config, and advanced setup for local AI agents.                                                                                                           | bootstrap, local-agent, setup, session-management, location-setup                                                                            | agentic-workflow                                                                             | ref  |
| `guides/brownfield.md`                | Brownfield preparation process overview and routing to sub-guides.                                                                                                                   | brownfield, preparation, assessment, approach, enablement                                                                                    | brownfield-readiness, brownfield-approach, brownfield-enablement                             | ref  |
| `guides/brownfield-approach.md`       | Investment models and preparation strategy decisions.                                                                                                                                | brownfield, strategy, investment-models, wrap-extract, exit-checkpoint                                                                       | brownfield, brownfield-readiness, brownfield-enablement                                      | ref  |
| `guides/brownfield-enablement.md`     | Enablement runbook for brownfield codebases before AI-assisted work.                                                                                                                 | brownfield, enablement, discovery, enablement-tactics, infrastructure                                                                        | brownfield, brownfield-readiness, brownfield-approach                                        | ref  |
| `guides/brownfield-readiness.md`      | Readiness tiers, AI operating modes, and scoring rubric T0–T5.                                                                                                                       | brownfield, assessment, scoring, readiness-tiers, ai-operating-modes, codebase-evaluation                                                    | brownfield, brownfield-approach, brownfield-enablement                                       | ref  |
| `guides/checkpoints.md`               | Checkpoint taxonomy, decision-rights matrix, and per-stage mapping.                                                                                                                  | checkpoint-taxonomy, decision-rights, checkpoint-protocols                                                                                   | all stages, framework                                                                        | core |
| `guides/delivery-operating-guide.md`  | Week-by-week operating rhythm for one increment delivery cycle.                                                                                                                      | delivery-cadence, sprint, kanban, status-reporting, RACI                                                                                     | framework                                                                                    | ref  |
| `guides/devops-integration.md`        | DevOps entry point mapping concerns to framework locations.                                                                                                                          | DevOps, CI/CD, security-scanning, release-patterns, observability                                                                            | deployment, security                                                                         | ref  |
| `guides/framework.md`                 | Cross-cutting concepts, governance, and compliance guidance.                                                                                                                         | governance, design-principles, compliance, greenfield, brownfield, working-locations, mid-stage-discovery, cd-workflow                       | stages, operating-model, right-sizing, roles                                                 | core |
| `guides/learning-loop.md`             | Friction capture, four-type triage, and the product idea backlog feeding future projects.                                                                                            | learning-loop, friction-log, friction, retrospective, idea-backlog, triage                                                                   | stages, framework, retrospective                                                             | core |
| `guides/operating-model.md`           | Layer-B operating model: who runs the process and how autonomously — operating functions, capability coverage, the envelope, Lights-Out.                                             | operating-model, autonomy, lights-out, capability-coverage, operating-envelope, configurable-functions                                       | right-sizing, spec, checkpoints, brownfield-readiness                                        | core |
| `guides/operations.md`                | Standing-system operations process (sibling to the SDLC): Observe/Respond/Maintain/Measure, autonomy ladder, remediation boundary, ops→dev edge, decommission.                       | operations, standing-system, observe, respond, maintain, measure, remediation-boundary, ops-to-dev, decommission, ownership-spans            | operating-model, right-sizing, closure, stages                                               | core |
| `guides/OVERVIEW.md`                  | Human-facing orientation layer: per-guide overviews (Overview/Why/Goals/How-to-Use) lifted off the agent read path, with back-links to each operational guide. Not loaded by agents. | overview, orientation, onboarding, human-facing, navigation                                                                                  | all guides                                                                                   | ref  |
| `guides/parallel-execution.md`        | Running parallel-safe batches: roles, preflight, isolation, execution invariants, work conservation, and Lights-Out coverage.                                                        | parallel-execution, batch, orchestration, isolation, work-conservation, integration, lights-out                                              | parallel-scheduling, operating-model, spec                                                   | ref  |
| `guides/parallel-scheduling.md`       | Turning a dependency-aware increment plan into ordered parallel-safe batches via forcing-dependency analysis.                                                                        | parallel-scheduling, batch, forcing-dependency, parallel-safety, classification, increment-planning                                          | parallel-execution, operating-model, spec                                                    | ref  |
| `guides/project-foundation.md`        | Infrastructure and preparation work before first feature increment.                                                                                                                  | foundation, Increment-0, greenfield, brownfield, infrastructure                                                                              | framework, brownfield                                                                        | ref  |
| `guides/right-sizing.md`              | Scales framework practices to project risk, size, and context.                                                                                                                       | tiers, scaling, team-size, process-weight, tier-selection                                                                                    | framework                                                                                    | core |
| `guides/roles.md`                     | Canonical role definitions, RACI matrix, and collaboration protocols.                                                                                                                | roles, RACI, consultation-protocol, information-protocol, PjM, AppSec                                                                        | framework, checkpoints, all stages                                                           | core |
| `guides/security.md`                  | Cross-cutting security throughline with NIST SSDF mapping.                                                                                                                           | security, SSDF, threat-modelling, scanning, tiers                                                                                            | all stages, deployment                                                                       | core |
| `guides/session-protocol.md`          | Session-start orientation (four entry routes) plus per-session start/end steps; linked from all brief templates.                                                                     | session-protocol, session-start, session-start-orientation, scenario-classification, entry-routes, routing, session-end, continuity, handoff | agentic-workflow, session-log                                                                | core |
| `guides/stages.md`                    | Eight-stage model with inputs, outputs, and execution patterns.                                                                                                                      | stage-definitions, inputs-outputs, execution-patterns                                                                                        | operating-model, checkpoints                                                                 | core |
| `guides/worked-example.md`            | End-to-end greenfield example tracing one requirement through all stages.                                                                                                            | traceability, greenfield-example, walkthrough, artifact-examples                                                                             | all stages                                                                                   | ref  |
| `guides/worked-example-brownfield.md` | End-to-end brownfield example with preparation and exit checkpoint.                                                                                                                  | brownfield-example, preparation, exit-checkpoint, shadow-mode                                                                                | worked-example, brownfield, brownfield-readiness, brownfield-approach, brownfield-enablement | ref  |
| `guides/worked-example-solo.md`       | Solo example: fuzzy idea through Minimal-tier brief to the Gate 1 self-gate.                                                                                                         | solo-example, idea-formation, zero-to-one, minimal-tier, no-baseline, self-gate                                                              | worked-example, initiation, agentic-workflow, roles                                          | ref  |

## Spec (5)

Agent- and conformance-facing normative layer — executable contracts behind the
operating model, delegated runs, parallel-batch execution, and canonical project
state. The human-facing rationale lives in `guides/operating-model.md`.

| Path                      | Description                                                                                                                                                        | Keywords                                                                                                 | Refs                                            | Tier |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---- |
| `spec/README.md`          | Spec index and the six-field executable-contract form; scope of the normative layer.                                                                               | spec, normative, contracts, conformance, executable-contract, lights-out                                 | operating-model (guide)                         | core |
| `spec/canonical-state.md` | Canonical project-state contracts: minimum state, artifacts-as-views, Markdown self-sufficiency, records, folding.                                                 | canonical-state, artifacts-as-views, self-sufficiency, records, folding                                  | delegated-run, operating-model                  | ref  |
| `spec/delegated-run.md`   | Delegated-run contracts: lifecycle, liveness, durable state, idempotency, replanning, completion.                                                                  | delegated-run, lights-out, lifecycle, liveness, idempotency, completion, replanning                      | operating-model, canonical-state                | core |
| `spec/operating-model.md` | Operating-model contracts: functions, coverage, envelope, floors, Lights-Out eligibility, separation, stop enforcement.                                            | operating-model, coverage, envelope, floors, lights-out, separation, stop-enforcement                    | operating-model (guide), delegated-run          | core |
| `spec/parallel-batch.md`  | Parallel-batch contracts: forcing-dependency taxonomy, parallel-safety classification, batch preflight/execution/close, work conservation, Lights-Out eligibility. | parallel-batch, batch, parallel-safety, forcing-dependency, work-conservation, orchestration, lights-out | operating-model, delegated-run, canonical-state | core |

## Stage Artifacts (25)

### Initiation (3)

| Path                             | Description                                                                                           | Keywords                                                                                           | Refs         | Tier |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------ | ---- |
| `stages/initiation/checklist.md` | Gate 1 readiness validation for the Initiation Brief.                                                 | problem-statement, scope, success-criteria, risks, assumptions                                     | initiation   | ref  |
| `stages/initiation/README.md`    | Stage guide: business case, stakeholder alignment, platform-services consulting, and Gate 1 approval. | business-case, stakeholders, scope, goals, Gate-1, platform-services, foundational, idea-formation | requirements | core |
| `stages/initiation/reference.md` | Deep-dive on stakeholder identification, risk analysis, and success criteria.                         | stakeholder-ID, risk-analysis, success-criteria, hypothesis, agent-driven                          | initiation   | ref  |

### Requirements (3)

| Path                               | Description                                                             | Keywords                                                                 | Refs          | Tier |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------- | ---- |
| `stages/requirements/checklist.md` | Validates requirements completeness before System Design handoff.       | requirements, acceptance-criteria, NFRs, traceability, personas          | requirements  | ref  |
| `stages/requirements/README.md`    | Stage guide: testable specifications, acceptance criteria, and NFRs.    | functional-requirements, acceptance-criteria, NFRs, MoSCoW, foundational | system-design | core |
| `stages/requirements/reference.md` | Terminology definitions, FR/AC/NFR formats, and brownfield constraints. | terminology, FR, AC, NFR, brownfield-constraints, format                 | requirements  | ref  |

### System Design (3)

| Path                                | Description                                                                   | Keywords                                                                 | Refs             | Tier |
| ----------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------- | ---- |
| `stages/system-design/checklist.md` | Gate 2 readiness validation for system design artifacts.                      | architecture, ADRs, security, observability, increment-plan              | system-design    | ref  |
| `stages/system-design/README.md`    | Stage guide: architecture, ADRs, technology choices, and increment roadmap.   | architecture, ADRs, infrastructure, increment-plan, Gate-2, foundational | increment-design | core |
| `stages/system-design/reference.md` | Deep-dive on infrastructure, increment sizing, security, and design patterns. | infrastructure, greenfield, brownfield, security, observability          | system-design    | ref  |

### Increment Design (3)

| Path                                   | Description                                                                     | Keywords                                                                    | Refs             | Tier |
| -------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------- | ---- |
| `stages/increment-design/checklist.md` | Validates increment design detail before Implementation handoff.                | component-design, interface-specs, data-model, test-strategy, carry-forward | increment-design | ref  |
| `stages/increment-design/README.md`    | Stage guide: component designs, interface specs, and test strategies.           | component-design, interfaces, test-strategy, iterative, design-review       | implementation   | core |
| `stages/increment-design/reference.md` | Component design and interface specification examples for backend and frontend. | component-examples, REST-API, React, unit-testing, integration-testing      | increment-design | ref  |

### Implementation (3)

| Path                                 | Description                                                                 | Keywords                                                               | Refs           | Tier |
| ------------------------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------- | ---- |
| `stages/implementation/checklist.md` | Validates code quality and readiness for Verification handoff.              | code-quality, unit-tests, PR-review, instrumentation, security         | implementation | ref  |
| `stages/implementation/README.md`    | Stage guide: working code, unit tests, instrumentation with AI assistance.  | code, unit-tests, PR-review, instrumentation, observability, iterative | verification   | core |
| `stages/implementation/reference.md` | Deep-dive on logging, metrics, security patterns, and code review strategy. | logging, metrics, security-patterns, tech-debt, code-review, branching | implementation | ref  |

### Verification (3)

| Path                               | Description                                                           | Keywords                                                               | Refs                       | Tier |
| ---------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------- | ---- |
| `stages/verification/checklist.md` | Confirms all tests pass and increment is deployment-ready.            | acceptance-criteria, integration-tests, regression, UAT, security-scan | verification               | ref  |
| `stages/verification/README.md`    | Stage guide: testing, UAT, regression, and defect management.         | testing, UAT, regression, acceptance-criteria, defects, iterative      | deployment, implementation | core |
| `stages/verification/reference.md` | Testing strategies, defect lifecycle, and instrumentation validation. | integration-testing, defect-management, monitoring, performance, UAT   | verification               | ref  |

### Deployment (5)

| Path                                      | Description                                                               | Keywords                                                           | Refs                      | Tier |
| ----------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------- | ---- |
| `stages/deployment/checklist.md`          | Pre/during/post deployment readiness covering rollback and comms.         | pre-deployment, rollback, monitoring, secrets, UAT-sign-off        | deployment                | ref  |
| `stages/deployment/pipeline-checklist.md` | Verifies CI/CD infrastructure readiness before first deployment.          | CI/CD, environments, IaC, secrets-management, skeleton-deployment  | deployment                | ref  |
| `stages/deployment/README.md`             | Stage guide: release to production with rollback and monitoring.          | release, rollback, monitoring, production, iterative, gate         | closure, increment-design | core |
| `stages/deployment/reference.md`          | Deployment strategies, rollback procedures, and monitoring thresholds.    | blue-green, canary, rollback, monitoring-thresholds, communication | deployment                | ref  |
| `stages/deployment/setup.md`              | Increment 0 infrastructure setup for greenfield and brownfield pipelines. | pipeline, greenfield, brownfield, infrastructure, Increment-0      | deployment                | ref  |

### Closure (2)

| Path                          | Description                                                                                                                             | Keywords                                                                  | Refs                   | Tier |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------- | ---- |
| `stages/closure/checklist.md` | Terminal gate: operational handoff, ownership transfer, completion reconciled, learnings routed, close-out summary.                     | closure, handoff, ownership-transfer, completion, close-out, wrap-up      | closure                | ref  |
| `stages/closure/README.md`    | Terminal stage guide: dev→ops handoff, production-ownership transfer, project closure rendering the completion contract, wrap-up retro. | closure, terminal, handoff, completion-contract, ownership, retrospective | initiation, operations | core |

## Templates (23)

| Path                                           | Description                                                                                                                                        | Keywords                                                                                      | Stage                      | Tier |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------- | ---- |
| `templates/adr.md`                             | Architecture Decision Record: context, options, rationale, and status.                                                                             | ADR, architecture, decision, options, rationale                                               | System Design              | ref  |
| `templates/brownfield-preparation-decision.md` | Exit decision from brownfield preparation assessing readiness gaps.                                                                                | brownfield, preparation, readiness, exit-decision                                             | Requirements–System Design | ref  |
| `templates/checkpoint-decision.md`             | Quality or deployment checkpoint approval and readiness gate.                                                                                      | checkpoint, quality, deployment, approval, gate                                               | Deployment–Closure         | ref  |
| `templates/dependency-register.md`             | Cross-increment dependency tracking with type, status, and risk.                                                                                   | dependency, register, cross-increment, tracking, risk                                         | All stages                 | ref  |
| `templates/deployment-brief.md`                | Deployment plan: release strategy, verification, and rollback readiness.                                                                           | deployment, release, strategy, rollback, verification                                         | Deployment                 | ref  |
| `templates/flow-issue.md`                      | Folded entry artifact for a Flow-mode small change: what/why, acceptance, consequence, verification, authorization.                                | flow, flow-issue, small-change, acceptance-criteria, consequence, verification, authorization | Flow                       | ref  |
| `templates/friction-log.md`                    | Standing project-spanning log of typed friction entries for retro triage.                                                                          | friction-log, friction, triage, learning-loop, retrospective                                  | All stages                 | ref  |
| `templates/gate-decision.md`                   | Investment gate decision with criteria, evidence, and outcome.                                                                                     | gate, decision, investment, criteria, proceed-revise-stop                                     | Initiation–System Design   | ref  |
| `templates/idea.md`                            | Single product/portfolio idea document for the cross-project idea backlog.                                                                         | idea, idea-backlog, portfolio, product, problem-statement, triage                             | All stages                 | ref  |
| `templates/implementation-brief.md`            | Implementation tracking with scope, progress, and requirements mapping.                                                                            | implementation, scope, progress, requirements, tracking                                       | Implementation             | ref  |
| `templates/implementation-session-log.md`      | Session-by-session engineering log for implementation work.                                                                                        | session-log, engineering, implementation, progress, decisions                                 | Implementation             | ref  |
| `templates/increment-design-brief.md`          | Increment scope, design, carry-forward resolution, and checkpoint.                                                                                 | increment, design, scope, carry-forward, checkpoint                                           | Increment Design           | ref  |
| `templates/initiation-brief.md`                | Project initiation: problem, business case, goals, and stakeholders.                                                                               | initiation, problem, business-case, goals, success-criteria                                   | Initiation                 | ref  |
| `templates/operational-handoff.md`             | The six-item dev→ops handoff record: identity/observability, operating envelope, stop/rollback, what-must-stay-true, decision rights, known-state. | handoff, operational-envelope, dev-to-ops, ownership-transfer, compliance, known-state        | Closure                    | ref  |
| `templates/post-incident-review.md`            | Root cause analysis, timeline, and action items from incidents.                                                                                    | incident, root-cause, timeline, action-items, post-mortem                                     | Operations                 | ref  |
| `templates/project-closeout.md`                | Readable render of the completion contract: why, outcomes, assurance, honest incomplete, acceptance, learnings.                                    | close-out, completion-contract, summary, outcomes, learnings, acceptance                      | Closure                    | ref  |
| `templates/requirements-brief.md`              | Functional and non-functional requirements with acceptance criteria.                                                                               | requirements, functional, non-functional, acceptance-criteria                                 | Requirements               | ref  |
| `templates/retrospective.md`                   | Increment retrospective: what worked, what didn't, carry-forward items.                                                                            | retrospective, lessons-learned, carry-forward, action-items, future-value-candidates          | Increment cycle            | ref  |
| `templates/runbook.md`                         | Operational procedure: prerequisites, steps, output, troubleshooting.                                                                              | runbook, procedure, operations, troubleshooting                                               | Operations                 | ref  |
| `templates/session-log.md`                     | Multi-session stage work log for artifact progress and decisions.                                                                                  | session-log, progress, decisions, blockers, multi-session                                     | All stages                 | ref  |
| `templates/success-criteria-register.md`       | Measurement register: goals, metrics, baselines, and targets.                                                                                      | success-criteria, measurement, metrics, baseline, targets                                     | All stages                 | ref  |
| `templates/system-design-brief.md`             | System architecture, components, data flow, and design decisions.                                                                                  | architecture, components, data-flow, design-decisions                                         | System Design              | ref  |
| `templates/verification-brief.md`              | Test cycle covering requirements validation and acceptance results.                                                                                | verification, testing, acceptance-criteria, requirements-validation                           | Verification               | ref  |

---

## Notes

**Last Updated:** 2026-06-26

Added to framework in v0.41.0. Operating Model Guide and the agent-facing
`spec/` layer added to the inventory in v0.49.0; the superseded AI Assistance
Scorecard removed. The v0.49 dev/ops split renamed the Support stage → Closure
(2 files), added the Operations Guide, and added the operational-handoff and
flow-issue templates while removing the support-brief. The v0.49 parallel-batch
work (WS3) added the `spec/parallel-batch.md` contract and the Parallel
Scheduling and Parallel Execution guides; counts refreshed accordingly (Guides
26, Spec 5, Stage Artifacts 25, Templates 23). In v0.50.0 the Scope description
was corrected to include the `spec/` layer, and the `session-protocol.md` and
`initiation/README.md` rows refreshed for the session-start orientation and
Platform Services additions.

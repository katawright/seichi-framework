---
id: index
type: index
version: 0.41.0
generated: 2026-03-19
---

# Framework File Index

## Overview

Compact inventory of all framework files — descriptions, keywords, and
relationships for fast orientation without loading the full ~245K-token corpus.

### Why a File Index

Agents and contributors waste context loading files they don't need. A single
index lets readers identify relevant files before committing to deeper reads.

### Purpose

- Provide a scannable inventory of every framework file
- Enable agents to locate files by keyword or relationship
- Support staleness detection via section file counts

### Key Principle

Load the index first, then load only what you need.

### How to Use This Index

1. Scan the [**Root Files**](#root-files-6) or [**Guides**](#guides-15) tables
   to find cross-cutting content
2. Jump to the relevant [**Stage Artifacts**](#stage-artifacts-28) subsection
   for stage-specific files
3. Check [**Templates**](#templates-19) for fillable artifacts
4. Check [**Tooling**](#tooling-4) for validation infrastructure
5. Use the **Keywords** column to match your task to the right file
6. Load `core`-tier files for orientation; load `ref`-tier files on demand

---

## Root Files (6)

| Path              | Description                                                            | Keywords                                                                | Refs                                           | Tier |
| ----------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------- | ---- |
| `README.md`       | Project overview, stage summary table, and navigation entry point.     | framework, SDLC, overview, navigation, stages                           | —                                              | core |
| `QUICKSTART.md`   | Zero-to-first-stage guide for agents, chat AI, and mid-stream joining. | quick-start, bootstrap, onboarding, execution-paths, location-detection | agentic-workflow, manual-process, right-sizing | core |
| `AGENTS.md`       | Redirect to CLAUDE.md for non-Claude agents.                           | agent-rules, redirect                                                   | CLAUDE.md                                      | ref  |
| `CLAUDE.md`       | Project working instructions, conventions, and execution guidance.     | agent-rules, workflow, conventions, governance, claude-code             | stages, agentic-workflow, framework            | core |
| `CONTRIBUTING.md` | Contribution guidelines emphasizing specific, grounded improvements.   | contributions, pull-requests, conventions, retrospectives               | —                                              | ref  |
| `STYLE_GUIDE.md`  | Structural and formatting conventions for all framework documents.     | style, formatting, structure, front-matter, tone                        | —                                              | core |

## Guides (16)

| Path                                  | Description                                                               | Keywords                                                                                                                      | Refs                                                         | Tier |
| ------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---- |
| `guides/stages.md`                    | Eight-stage model with inputs, outputs, and execution patterns.           | stage-definitions, inputs-outputs, execution-patterns                                                                         | ai-assistance, checkpoints                                   | core |
| `guides/checkpoints.md`              | Checkpoint taxonomy, decision-rights matrix, and per-stage mapping.       | checkpoint-taxonomy, decision-rights, checkpoint-protocols                                                  | all stages, framework                                        | core |
| `guides/framework.md`                 | Cross-cutting concepts, roles, governance, and compliance guidance.       | governance, roles, design-principles, compliance, greenfield, brownfield, working-locations, mid-stage-discovery, cd-workflow | stages, ai-assistance, right-sizing                          | core |
| `guides/agentic-workflow.md`          | Stage routing table, agent orchestration, and fallback protocols.         | stage-routing, agent-orchestration, fallback, gate-enforcement, autonomy, working-locations                                   | all stages                                                   | core |
| `guides/ai-assistance.md`             | AI autonomy tiers, scoring rubric, and gate evaluation criteria.          | autonomy-tiers, scoring, gates, risk-management, oversight                                                                    | all stages                                                   | core |
| `guides/right-sizing.md`              | Scales framework practices to project risk, size, and context.            | risk-tiers, scaling, team-size, process-weight, tier-selection                                                                | framework                                                    | core |
| `guides/security.md`                  | Cross-cutting security throughline with NIST SSDF mapping.                | security, SSDF, threat-modelling, scanning, risk-tiers                                                                        | all stages, deployment                                       | core |
| `guides/adoption.md`                  | Organizational rollout from pilot through standardization.                | adoption, change-management, pilot, phased-rollout, readiness                                                                 | —                                                            | ref  |
| `guides/manual-process.md`            | Bootstrap prompt and session instructions for chat-based AI usage.        | bootstrap, chat-AI, copy-paste, session-management, location-setup                                                            | agentic-workflow                                             | ref  |
| `guides/project-foundation.md`        | Infrastructure and preparation work before first feature increment.       | foundation, Increment-0, greenfield, brownfield, infrastructure                                                               | framework, brownfield-readiness                              | ref  |
| `guides/brownfield-readiness.md`      | Assessment framework with scoring rubric and readiness tiers T0–T5.       | brownfield, assessment, scoring, readiness-tiers, codebase-evaluation                                                         | brownfield-preparation                                       | ref  |
| `guides/brownfield-preparation.md`    | Preparation runbook for brownfield codebases before AI-assisted work.     | brownfield, preparation, discovery, codebase-readiness, bounded-scope                                                         | brownfield-readiness                                         | ref  |
| `guides/devops-integration.md`        | DevOps entry point mapping concerns to framework locations.               | DevOps, CI/CD, security-scanning, release-patterns, observability                                                             | deployment, security                                         | ref  |
| `guides/delivery-operating-guide.md`  | Week-by-week operating rhythm for one increment delivery cycle.           | delivery-cadence, sprint, kanban, status-reporting, RACI                                                                      | framework                                                    | ref  |
| `guides/worked-example.md`            | End-to-end greenfield example tracing one requirement through all stages. | traceability, greenfield-example, walkthrough, artifact-examples                                                              | all stages                                                   | ref  |
| `guides/worked-example-brownfield.md` | End-to-end brownfield example with preparation and exit checkpoint.       | brownfield-example, preparation, exit-checkpoint, shadow-mode                                                                 | worked-example, brownfield-readiness, brownfield-preparation | ref  |

## Stage Artifacts (28)

### Initiation (3)

| Path                             | Description                                                                   | Keywords                                                            | Refs         | Tier |
| -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------ | ---- |
| `stages/initiation/README.md`    | Stage guide: business case, stakeholder alignment, and Gate 1 approval.       | business-case, stakeholders, scope, goals, Gate-1, foundational     | requirements | core |
| `stages/initiation/checklist.md` | Gate 1 readiness validation for the Initiation Brief.                         | problem-statement, scope, success-criteria, risks, assumptions      | initiation   | ref  |
| `stages/initiation/reference.md` | Deep-dive on stakeholder identification, risk analysis, and success criteria. | stakeholder-ID, risk-analysis, success-criteria, hypothesis, AI-led | initiation   | ref  |

### Requirements (3)

| Path                               | Description                                                             | Keywords                                                                 | Refs          | Tier |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------- | ---- |
| `stages/requirements/README.md`    | Stage guide: testable specifications, acceptance criteria, and NFRs.    | functional-requirements, acceptance-criteria, NFRs, MoSCoW, foundational | system-design | core |
| `stages/requirements/checklist.md` | Validates requirements completeness before System Design handoff.       | requirements, acceptance-criteria, NFRs, traceability, personas          | requirements  | ref  |
| `stages/requirements/reference.md` | Terminology definitions, FR/AC/NFR formats, and brownfield constraints. | terminology, FR, AC, NFR, brownfield-constraints, format                 | requirements  | ref  |

### System Design (3)

| Path                                | Description                                                                   | Keywords                                                                 | Refs             | Tier |
| ----------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------- | ---- |
| `stages/system-design/README.md`    | Stage guide: architecture, ADRs, technology choices, and increment roadmap.   | architecture, ADRs, infrastructure, increment-plan, Gate-2, foundational | increment-design | core |
| `stages/system-design/checklist.md` | Gate 2 readiness validation for system design artifacts.                      | architecture, ADRs, security, observability, increment-plan              | system-design    | ref  |
| `stages/system-design/reference.md` | Deep-dive on infrastructure, increment sizing, security, and design patterns. | infrastructure, greenfield, brownfield, security, observability          | system-design    | ref  |

### Increment Design (3)

| Path                                   | Description                                                                     | Keywords                                                                    | Refs             | Tier |
| -------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------- | ---- |
| `stages/increment-design/README.md`    | Stage guide: component designs, interface specs, and test strategies.           | component-design, interfaces, test-strategy, iterative, design-review       | implementation   | core |
| `stages/increment-design/checklist.md` | Validates increment design detail before Implementation handoff.                | component-design, interface-specs, data-model, test-strategy, carry-forward | increment-design | ref  |
| `stages/increment-design/reference.md` | Component design and interface specification examples for backend and frontend. | component-examples, REST-API, React, unit-testing, integration-testing      | increment-design | ref  |

### Implementation (3)

| Path                                 | Description                                                                 | Keywords                                                               | Refs           | Tier |
| ------------------------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------- | ---- |
| `stages/implementation/README.md`    | Stage guide: working code, unit tests, instrumentation with AI assistance.  | code, unit-tests, PR-review, instrumentation, observability, iterative | verification   | core |
| `stages/implementation/checklist.md` | Validates code quality and readiness for Verification handoff.              | code-quality, unit-tests, PR-review, instrumentation, security         | implementation | ref  |
| `stages/implementation/reference.md` | Deep-dive on logging, metrics, security patterns, and code review strategy. | logging, metrics, security-patterns, tech-debt, code-review, branching | implementation | ref  |

### Verification (3)

| Path                               | Description                                                           | Keywords                                                               | Refs                       | Tier |
| ---------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------- | ---- |
| `stages/verification/README.md`    | Stage guide: testing, UAT, regression, and defect management.         | testing, UAT, regression, acceptance-criteria, defects, iterative      | deployment, implementation | core |
| `stages/verification/checklist.md` | Confirms all tests pass and increment is deployment-ready.            | acceptance-criteria, integration-tests, regression, UAT, security-scan | verification               | ref  |
| `stages/verification/reference.md` | Testing strategies, defect lifecycle, and instrumentation validation. | integration-testing, defect-management, monitoring, performance, UAT   | verification               | ref  |

### Deployment (5)

| Path                                      | Description                                                               | Keywords                                                           | Refs                      | Tier |
| ----------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------- | ---- |
| `stages/deployment/README.md`             | Stage guide: release to production with rollback and monitoring.          | release, rollback, monitoring, production, iterative, gate         | support, increment-design | core |
| `stages/deployment/checklist.md`          | Pre/during/post deployment readiness covering rollback and comms.         | pre-deployment, rollback, monitoring, secrets, UAT-sign-off        | deployment                | ref  |
| `stages/deployment/reference.md`          | Deployment strategies, rollback procedures, and monitoring thresholds.    | blue-green, canary, rollback, monitoring-thresholds, communication | deployment                | ref  |
| `stages/deployment/setup.md`              | Increment 0 infrastructure setup for greenfield and brownfield pipelines. | pipeline, greenfield, brownfield, infrastructure, Increment-0      | deployment                | ref  |
| `stages/deployment/pipeline-checklist.md` | Verifies CI/CD infrastructure readiness before first deployment.          | CI/CD, environments, IaC, secrets-management, skeleton-deployment  | deployment                | ref  |

### Support (5)

| Path                                    | Description                                                               | Keywords                                                               | Refs                | Tier |
| --------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------- | ---- |
| `stages/support/README.md`              | Stage guide: production health, outcomes tracking, and feedback loops.    | monitoring, incident-response, success-criteria, continuous, feedback  | all upstream stages | core |
| `stages/support/checklist.md`           | Weekly operational review covering monitoring, alerting, and incidents.   | monitoring, alerting, on-call, runbooks, production-health             | support             | ref  |
| `stages/support/reference.md`           | Monitoring thresholds, incident response, triage, and maturity model.     | monitoring-thresholds, incident-response, triage, alerting, DR         | support             | ref  |
| `stages/support/operations.md`          | Setup guide for support operations before accepting production ownership. | greenfield, brownfield, on-call, runbooks, escalation, readiness       | support             | ref  |
| `stages/support/readiness-checklist.md` | One-time setup validation for production ownership acceptance.            | production-ownership, on-call, incident-response, monitoring, runbooks | support             | ref  |

## Templates (19)

| Path                                           | Description                                                              | Keywords                                                                             | Stage                      | Tier |
| ---------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | -------------------------- | ---- |
| `templates/initiation-brief.md`                | Project initiation: problem, business case, goals, and stakeholders.     | initiation, problem, business-case, goals, success-criteria                          | Initiation                 | ref  |
| `templates/requirements-brief.md`              | Functional and non-functional requirements with acceptance criteria.     | requirements, functional, non-functional, acceptance-criteria                        | Requirements               | ref  |
| `templates/system-design-brief.md`             | System architecture, components, data flow, and design decisions.        | architecture, components, data-flow, design-decisions                                | System Design              | ref  |
| `templates/increment-design-brief.md`          | Increment scope, design, carry-forward resolution, and checkpoint.       | increment, design, scope, carry-forward, checkpoint                                  | Increment Design           | ref  |
| `templates/implementation-brief.md`            | Implementation tracking with scope, progress, and requirements mapping.  | implementation, scope, progress, requirements, tracking                              | Implementation             | ref  |
| `templates/verification-brief.md`              | Test cycle covering requirements validation and acceptance results.      | verification, testing, acceptance-criteria, requirements-validation                  | Verification               | ref  |
| `templates/deployment-brief.md`                | Deployment plan: release strategy, verification, and rollback readiness. | deployment, release, strategy, rollback, verification                                | Deployment                 | ref  |
| `templates/support-brief.md`                   | Support operations: environment, runbooks, escalation, and monitoring.   | support, operations, runbooks, escalation, monitoring                                | Support                    | ref  |
| `templates/gate-decision.md`                   | Investment gate decision with criteria, evidence, and outcome.           | gate, decision, investment, criteria, proceed-revise-stop                            | Initiation–System Design   | ref  |
| `templates/checkpoint-decision.md`             | Quality or deployment checkpoint approval and readiness gate.            | checkpoint, quality, deployment, approval, gate                                      | Deployment–Support         | ref  |
| `templates/brownfield-preparation-decision.md` | Exit decision from brownfield preparation assessing readiness gaps.      | brownfield, preparation, readiness, exit-decision                                    | Requirements–System Design | ref  |
| `templates/adr.md`                             | Architecture Decision Record: context, options, rationale, and status.   | ADR, architecture, decision, options, rationale                                      | System Design              | ref  |
| `templates/success-criteria-register.md`       | Measurement register: goals, metrics, baselines, and targets.            | success-criteria, measurement, metrics, baseline, targets                            | All stages                 | ref  |
| `templates/dependency-register.md`             | Cross-increment dependency tracking with type, status, and risk.         | dependency, register, cross-increment, tracking, risk                                | All stages                 | ref  |
| `templates/retrospective.md`                   | Increment retrospective: what worked, what didn't, carry-forward items.  | retrospective, lessons-learned, carry-forward, action-items, future-value-candidates | Increment cycle            | ref  |
| `templates/session-log.md`                     | Multi-session stage work log for artifact progress and decisions.        | session-log, progress, decisions, blockers, multi-session                            | All stages                 | ref  |
| `templates/implementation-session-log.md`      | Session-by-session engineering log for implementation work.              | session-log, engineering, implementation, progress, decisions                        | Implementation             | ref  |
| `templates/runbook.md`                         | Operational procedure: prerequisites, steps, output, troubleshooting.    | runbook, procedure, operations, troubleshooting                                      | Support                    | ref  |
| `templates/post-incident-review.md`            | Root cause analysis, timeline, and action items from incidents.          | incident, root-cause, timeline, action-items, post-mortem                            | Support                    | ref  |

## Tooling (10)

| Path                                           | Description                                                      | Keywords                                       | Tier |
| ---------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ---- |
| `.schema/schemas/defs.schema.json`             | Shared JSON Schema definitions for front matter validation.      | schema, validation, definitions, front-matter   | ref  |
| `.schema/schemas/stage-readme.schema.json`     | JSON Schema for stage README front matter.                       | schema, validation, stage-readme, front-matter  | ref  |
| `.schema/schemas/guide.schema.json`            | JSON Schema for guide file front matter.                         | schema, validation, guide, front-matter         | ref  |
| `.schema/schemas/agentic-workflow.schema.json` | JSON Schema for agentic-workflow.md front matter.                | schema, validation, agentic-workflow            | ref  |
| `.schema/schemas/index.schema.json`            | JSON Schema for INDEX.md front matter.                           | schema, validation, index                       | ref  |
| `.schema/schemas/root-readme.schema.json`      | JSON Schema for root README.md front matter.                     | schema, validation, readme                      | ref  |
| `.schema/file-map.json`                        | Maps file glob patterns to their validation schemas.             | schema, validation, file-mapping                | ref  |
| `.schema/validate.mjs`                         | Front matter validation runner (Node.js).                        | schema, validation, linter, tooling             | ref  |
| `.schema/hooks/pre-commit`                     | Git pre-commit hook for front matter validation.                 | git-hook, pre-commit, validation                | ref  |
| `.github/workflows/validate-frontmatter.yml`   | GitHub Actions workflow for PR front matter checks.              | ci, github-actions, validation, front-matter    | ref  |

---

## Notes

**Last Updated:** 2026-03-22

Added to framework in v0.41.0.

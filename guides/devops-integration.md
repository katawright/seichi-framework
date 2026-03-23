# DevOps Integration Guide

Entry point for DevOps engineers. Each section maps a DevOps concern to the
authoritative framework location — follow the links for full guidance.

## Getting Started

**Recommended full-setup sequence:** 1. CI/CD Pipeline → 2. Environments and
Secrets → 3. Security Scanning → 4. Observability. Jump to any section if you
only need one area.

**Setting up CI/CD and PR checks?** Start here:
[CI/CD Pipeline Setup](../stages/deployment/setup.md#1-cicd-pipeline-setup) →
[Pipeline Gate Policy](../stages/deployment/setup.md#2-pipeline-gate-policy)
(status checks, branch protection, merge requirements) →
[Minimum Pipeline Controls](#minimum-pipeline-controls) below.

**Adding security scanning to your pipeline?** Go to
[Security Scanning and Supply Chain](#security-scanning-and-supply-chain).

**Setting up environments and secrets?** Go to
[Environments and Secrets](#environments-and-secrets).

**Setting up monitoring, alerting, or on-call?** Go to
[Observability](#observability) for instrumentation and dashboards;
see [Support Operations](../stages/support/operations.md) for on-call
rotation, incident response, and escalation.

**Choosing a release or rollback strategy?** Go to
[Release Patterns](#release-patterns).

---

## CI/CD Pipeline Controls

Pipeline setup, gate enforcement, and deployment checklists.

| Topic                | Reference                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| Pipeline setup       | [Deployment Setup — CI/CD Pipeline Setup](../stages/deployment/setup.md#1-cicd-pipeline-setup)  |
| Pipeline gate policy | [Deployment Setup — Pipeline Gate Policy](../stages/deployment/setup.md#2-pipeline-gate-policy) |
| Pipeline checklist   | [Pipeline Checklist](../stages/deployment/pipeline-checklist.md)                                |

## Security Scanning and Supply Chain

Automated security checks integrated into CI pipelines.

| Topic               | Reference                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------- |
| CI/pipeline scans   | [Security Guide — Fully Automated (CI/Pipeline)](security.md#fully-automated-cipipeline) |
| Deployment security | [Security Guide — Deployment stage](security.md#deployment)                              |

## Release Patterns

Deployment strategies and rollback approaches.

| Topic                         | Reference                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| Strategy definitions          | [Deployment Reference — Deployment Strategies](../stages/deployment/reference.md#deployment-strategies) |
| Stage-level guidance          | [Deployment README — Deployment Strategies](../stages/deployment/README.md#deployment-strategies)       |
| Rollback procedures           | [Deployment Reference](../stages/deployment/reference.md#rollback-procedures)                           |
| Shadow mode / gradual rollout | [Deployment Guide](../stages/deployment/README.md#shadow-mode-and-gradual-rollout)                      |

## Environments and Secrets

Environment provisioning, parity, and secrets management.

| Topic                    | Reference                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Environment provisioning | [Deployment Setup — Environment Provisioning](../stages/deployment/setup.md#3-environment-provisioning)                         |
| Environment parity       | [Deployment Setup — Environment Parity](../stages/deployment/setup.md#5-environment-parity)                                     |
| Secrets management       | [Deployment Setup — Configuration and Secrets Management](../stages/deployment/setup.md#6-configuration-and-secrets-management) |

## Observability

Monitoring, alerting, and instrumentation across the lifecycle.

| Topic                          | Reference                                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Monitoring thresholds          | [Deployment Reference — Monitoring Thresholds and Cadence](../stages/deployment/reference.md#monitoring-thresholds-and-cadence)   |
| Baselines and SLOs             | [Support Reference — Monitoring Thresholds and Baselines](../stages/support/reference.md#monitoring-thresholds-and-baselines)     |
| Alerting design                | [Support Reference — Alerting Design](../stages/support/reference.md#alerting-design)                                             |
| Implementation instrumentation | [Implementation README — Instrumentation and Observability](../stages/implementation/README.md#instrumentation-and-observability) |

## Operational NFRs

Design-time targets for availability, recovery, latency, and more.

| Topic       | Reference                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| NFR catalog | [Requirements Reference — Operational NFR Catalog](../stages/requirements/reference.md#operational-nfr-catalog) |

## Minimum Pipeline Controls

Baseline controls that every project needs regardless of tier. For full
checklists by context (greenfield / brownfield), see the
[Pipeline Checklist](../stages/deployment/pipeline-checklist.md).

### Baseline (All Tiers)

- CI builds and runs automated tests on every push
- Secrets stored in a secrets manager, never in code or config files
- At least one non-production environment for pre-production validation
- Rollback capability tested and documented
- Basic monitoring and health checks operational

### Enterprise Add-Ons

- Blue-green or canary deployment strategy
- SBOM generation and signed artifacts
- Multi-environment promotion pipeline (dev → staging → production)
- Automated security scanning in CI
  ([Security Guide](security.md#fully-automated-cipipeline))
- Compliance gate before production deployment

> **Right-sizing:** Baseline controls apply at Minimal, Standard, and Enterprise
> tiers. Enterprise add-ons apply at Enterprise tier or when regulatory /
> compliance requirements demand them. See the
> [Right-Sizing Guide](right-sizing.md) for tier definitions.

---

## Templates

Operational templates used across deployment and support stages.

| Template             | Path                                                                        |
| -------------------- | --------------------------------------------------------------------------- |
| Deployment brief     | [`templates/deployment-brief.md`](../templates/deployment-brief.md)         |
| Support brief        | [`templates/support-brief.md`](../templates/support-brief.md)               |
| Post-incident review | [`templates/post-incident-review.md`](../templates/post-incident-review.md) |
| Runbook              | [`templates/runbook.md`](../templates/runbook.md)                           |

---

**Notes**

**Last Updated:** 2026-03-05

Added to framework in v0.38.0. Minimum Pipeline Controls added in v0.40.0.

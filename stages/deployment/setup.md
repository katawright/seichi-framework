# Deployment Setup Guide

## Overview

Strategic guidance for setting up deployment infrastructure before your first
increment deployment.

### Why Deployment Setup

Per-increment deployments fail when the underlying infrastructure isn't ready —
missing pipelines, unconfigured environments, no rollback capability, or secrets
committed to code. Setting up deployment infrastructure during Increment 0
prevents these failures and gives the team a validated pipeline before business
complexity enters the picture.

### Purpose

- Guide greenfield projects through building deployment infrastructure from
  scratch
- Guide brownfield projects through documenting and improving existing
  infrastructure
- Provide right-sizing tables so teams invest appropriately for their risk tier
- Validate the pipeline end-to-end with a skeleton deployment before the first
  real increment

### Key Principle

Prove the pipeline works before you need it. A skeleton deployment during
Increment 0 catches infrastructure issues when the stakes are low.

### How to Use This Guide

1. Review [**Right-Sizing Deployment Setup**](#right-sizing-deployment-setup) to
   match investment to your risk tier
2. Follow the [**Greenfield Path**](#greenfield-path) or
   [**Brownfield Path**](#brownfield-path) based on your starting point
3. Complete the [Deployment Pipeline Checklist](pipeline-checklist.md) to verify
   readiness
4. For per-increment deployment execution, see the
   [Deployment Stage Guide](README.md)

For cross-cutting framework concepts, see
[Framework Guide](../../guides/framework.md).

---

## Right-Sizing Deployment Setup

Not every project needs multi-environment infrastructure or
infrastructure-as-code. Match your deployment setup investment to your project's
risk tier. The greenfield and brownfield paths below apply at every tier — this
table shows the target scope for each.

| Practice                   | Minimal                            | Standard                                      | Enterprise                                            |
| -------------------------- | ---------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| **CI/CD pipeline**         | Simple script or manual deploy     | Automated build, test, and deploy pipeline    | Multi-stage pipeline with approval gates and auditing |
| **Environments**           | Production only (or prod + local)  | Staging + production                          | Dev → staging → pre-prod → production                 |
| **Infrastructure as Code** | None — manual setup                | Key infrastructure codified (Terraform, etc.) | All infrastructure codified, version-controlled       |
| **Secrets management**     | Environment variables              | Secret manager (Vault, AWS Secrets Manager)   | Rotated secrets, access policies, audit logging       |
| **Monitoring/alerting**    | Basic health check                 | APM + log aggregation + alert routing         | Full observability stack, distributed tracing         |
| **Skeleton deploy**        | Deploy anything to production once | Validate full pipeline end-to-end             | Validate all environments, rollback, and monitoring   |

> For tier definitions and choosing criteria, see the
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## When to Use This Guide

- **Greenfield project:** No deployment infrastructure exists yet. Design and
  build everything from scratch.
- **Brownfield project:** Deployment infrastructure exists but may be
  undocumented, inconsistent, or in need of improvement. Discover, document, and
  improve.
- **Major infrastructure change:** Migrating cloud providers, adopting
  containers, changing CI/CD tools, or restructuring environments.

Deployment strategy decisions (e.g., blue/green vs. rolling, number of
environments, IaC approach) should be made during
[System Design](../system-design/README.md) and implemented here.

### When You Don't Need This Guide

Some projects don't require deployment infrastructure:

- **Console tools or CLIs** that run locally on a developer's machine
- **Spikes or experiments** that validate an idea and may be discarded
- **Libraries or packages** consumed by other projects (publishing is not
  deploying)
- **Prototypes** built for a demo and not intended for ongoing use

If your Initiation Brief's deployment intent is "Local-only," skip this guide
and the Deployment stage entirely. If the project later grows into a deployed
service, return here and treat deployment setup as retroactive foundation work
(see
[Introducing Deployment Retroactively](#introducing-deployment-retroactively)
below).

---

## Relationship to Other Guides

This guide covers **one-time deployment infrastructure setup**. Other guides
cover the decisions that feed into it and the ongoing work that uses it.

| Responsibility            | Owner                                                  | This Guide's Role                  |
| ------------------------- | ------------------------------------------------------ | ---------------------------------- |
| Deployment strategy       | [System Design](../system-design/README.md)            | Implements those decisions         |
| Per-increment deployment  | [Deployment Stage Guide](README.md)                    | Uses the infrastructure built here |
| Pipeline readiness check  | [Deployment Pipeline Checklist](pipeline-checklist.md) | Validates what this guide produces |
| Monitoring infrastructure | This guide                                             | Configures tools and dashboards    |
| Operational processes     | [Support Operations Guide](../support/operations.md)   | Uses monitoring infrastructure     |

---

## Greenfield Path

Build deployment infrastructure from scratch. Complete these areas before
deploying your first increment.

### 1. CI/CD Pipeline Setup

Design and build your automated pipeline:

```
Code Push → Build → Tests → Package →
Deploy to Dev → Smoke Tests →
Deploy to Staging → Full Tests →
Manual Approval → Deploy to Production → Monitor
```

**Key decisions:**

- Pipeline tool selection (GitHub Actions, GitLab CI, Jenkins, etc.)
- Build and packaging approach
- Test stages and quality gates
- Approval workflow for production deployments
- Deployment script structure (must be idempotent)

**Best practices:**

- Automate deployment to development and staging environments
- Require manual approval for production
- Run smoke tests after each environment deployment
- Automatically roll back if health checks fail
- Log every deployment step for auditability

### 2. Pipeline Gate Policy

Define automated quality gates that must pass before code advances through the
pipeline. Align gate strictness with your project's right-sizing tier.

**Required status checks by tier:**

| Check Category   | Minimal   | Standard  | Enterprise |
| ---------------- | --------- | --------- | ---------- |
| Unit / Int tests | Must pass | Must pass | Must pass  |
| SAST             | —         | Required  | Required   |
| Dependency scan  | —         | Required  | Required   |
| DAST             | —         | —         | Required   |
| SBOM generation  | —         | —         | Required   |
| Artifact signing | —         | —         | Required   |

For scan definitions and tool guidance, see
[Security Guide — Fully Automated (CI/Pipeline)](../../guides/security.md#fully-automated-cipipeline).

**Branch protection rules:**

- Protect `main` and `release/*` branches.
- Require at least one PR review before merge.
- Require all configured status checks to pass before merge.
- Disable force-push on protected branches.

**Override policy:**

- **Who:** designated on-call lead or incident commander only.
- **When:** critical production incident requiring a hotfix — not for
  convenience.
- **Audit trail:** every override must be logged with justification, approver,
  and timestamp.
- **Post-override:** run the full gate check suite within 24 hours and address
  any failures.

### 3. Environment Provisioning

Set up your environment pipeline:

```
Development → Staging/QA → Pre-Production → Production
```

**Key environments:**

- **Development** — engineer testing, synthetic data, continuous deployment
- **Staging/QA** — verification testing, production-like data (anonymized),
  per-increment deployment
- **Pre-Production** (optional) — final validation, production-identical
  infrastructure
- **Production** — live system, real users, controlled monitored releases

### 4. Infrastructure as Code

Define infrastructure declaratively to ensure consistency:

- Use tools like Terraform, CloudFormation, Pulumi, or CDK
- Version control all infrastructure definitions
- Apply the same templates across environments
- Document environment-specific differences explicitly

### 5. Environment Parity

Differences between staging and production cause "works in staging, fails in
production" issues. Achieve parity across:

- Infrastructure configuration
- Software dependencies and versions
- Data schema and structure
- Resource allocation (scale down, but same architecture)
- Network topology and security groups

### 6. Configuration and Secrets Management

Establish patterns before your first deployment:

**Configuration principles:**

1. Externalize configuration from code
2. Never commit secrets to version control
3. Use environment-specific values (dev vs. staging vs. production)
4. Validate configuration on startup (fail fast if missing)
5. Document all expected configuration variables

**Secrets management:**

- Select a secrets tool (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault,
  Kubernetes Secrets, etc.)
- Establish rotation policies
- Use different secrets per environment
- Set up audit logging for secret access

**Never commit:** API keys, passwords, database credentials, private keys, OAuth
tokens.

### 7. Monitoring and Alerting

Set up observability infrastructure:

- Application performance monitoring (APM)
- Log aggregation and search
- Infrastructure metrics dashboards
- Alert routing and escalation policies
- On-call rotation tooling configured (see
  [Support Operations Guide](../support/operations.md) for rotation structure
  and escalation process)

For configuring ongoing operational processes that use this infrastructure
(incident response, on-call procedures, runbooks), see the
[Support Operations Guide](../support/operations.md).

### 8. Skeleton Deployment

Validate the entire pipeline end-to-end before the first real increment:

1. Deploy a minimal application (health check endpoint)
2. Verify it passes through all pipeline stages
3. Confirm monitoring captures metrics
4. Test rollback procedure — a successful rollback test confirms:
   - Previous version is serving traffic and passing health checks
   - No data loss or corruption occurred
   - Monitoring shows baseline metrics restored

   See [Deployment Reference: Rollback Procedures](reference.md#rollback-procedures) for
   step-by-step rollback instructions.

5. Validate alerting fires correctly (test alert)

This "walking skeleton" proves the pipeline works before adding business
complexity.

<!-- prettier-ignore -->
> **AI exploration:** _"Help me design a CI/CD pipeline for
> [describe your stack, team size, and deployment frequency
> targets]."_

---

## Brownfield Path

Document and improve existing deployment infrastructure. Complete these
activities before changing how deployments work.

### 1. Discovery and Documentation

Map the current deployment process:

- How does code get from a developer's machine to production?
- What environments exist? How are they configured?
- What manual steps are involved?
- Where are secrets stored? How are they managed?
- What monitoring exists? What gaps are there?

### 2. Capture Tribal Knowledge

Interview team members who deploy regularly:

- Undocumented steps or workarounds
- Known fragile points in the process
- "Gotchas" that new team members wouldn't know
- Historical incidents caused by deployment issues
- Manual interventions that happen regularly

### 3. Environment Inventory

Document each environment:

| Environment | Purpose | URL | Infrastructure | Last Updated |
| ----------- | ------- | --- | -------------- | ------------ |
| Development | ...     | ... | ...            | ...          |
| Staging     | ...     | ... | ...            | ...          |
| Production  | ...     | ... | ...            | ...          |

Include: access credentials location, configuration source, deployment method,
monitoring coverage.

### 4. Gap Analysis

Compare current state against the greenfield checklist above:

- Which pipeline stages are missing or manual?
- Where does environment parity break down?
- What secrets management practices need improvement?
- Where is monitoring insufficient?
- What rollback capabilities exist?

### 5. Improvement Backlog

Prioritize improvements based on risk and effort:

| Improvement           | Risk Reduced | Effort | Priority |
| --------------------- | ------------ | ------ | -------- |
| Document manual steps | Medium       | Low    | High     |
| Add staging parity    | High         | Medium | High     |
| Automate rollback     | High         | High   | Medium   |
| ...                   | ...          | ...    | ...      |

Address high-priority items before the first increment deployment.
Lower-priority items become backlog for future iterations.

> **AI exploration:** _"Review our current deployment process [describe it] and
> identify gaps compared to modern deployment practices."_

---

## Introducing Deployment Retroactively

If a project started without deployment infrastructure and now needs it
(prototype gained users, CLI became a service, spike became a product):

1. **Reassess your right-sizing tier** — a project gaining deployment needs has
   likely moved from Minimal to Standard. See
   [Right-Sizing Guide: Your Tier Can Change](../../guides/right-sizing.md#your-tier-can-change).
2. **Treat deployment setup as foundation work** — follow the greenfield path
   above as a foundation increment. See the
   [Project Foundation Guide](../../guides/project-foundation.md) for how
   foundation work flows through stages.
3. **Update your Initiation Brief** — change the deployment intent field to
   reflect the new target.

This is a normal project evolution, not a failure. The framework's right-sizing
model expects projects to grow.

---

## Related Documents

- [Deployment Pipeline Checklist](pipeline-checklist.md)
- [Deployment Stage Guide](README.md)
- [Deployment Reference](reference.md)
- [System Design](../system-design/README.md)

---

## Notes

**Last Updated:** 2026-03-04

Added to framework in v0.12.0.

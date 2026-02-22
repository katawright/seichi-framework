# Deployment Setup Guide

Strategic guide for setting up deployment infrastructure. Use this guide during
**iteration 0** (before your first increment deployment) or when making
significant infrastructure changes.

For per-increment deployment execution, see the
[Deployment Guide](deployment-guide.md).

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
> [Right-Sizing Guide](../right-sizing-guide.md).

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

### 2. Environment Provisioning

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

### 3. Infrastructure as Code

Define infrastructure declaratively to ensure consistency:

- Use tools like Terraform, CloudFormation, Pulumi, or CDK
- Version control all infrastructure definitions
- Apply the same templates across environments
- Document environment-specific differences explicitly

### 4. Environment Parity

Differences between staging and production cause "works in staging, fails in
production" issues. Achieve parity across:

- Infrastructure configuration
- Software dependencies and versions
- Data schema and structure
- Resource allocation (scale down, but same architecture)
- Network topology and security groups

### 5. Configuration and Secrets Management

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

### 6. Monitoring and Alerting

Set up observability infrastructure:

- Application performance monitoring (APM)
- Log aggregation and search
- Infrastructure metrics dashboards
- Alert routing and escalation policies
- On-call rotation tooling configured (see
  [Support Operations Guide](../support/support-operations-guide.md) for
  rotation structure and escalation process)

For configuring ongoing operational processes that use this infrastructure
(incident response, on-call procedures, runbooks), see the
[Support Operations Guide](../support/support-operations-guide.md).

### 7. Skeleton Deployment

Validate the entire pipeline end-to-end before the first real increment:

1. Deploy a minimal application (health check endpoint)
2. Verify it passes through all pipeline stages
3. Confirm monitoring captures metrics
4. Test rollback procedure — a successful rollback test confirms:
   - Previous version is serving traffic and passing health checks
   - No data loss or corruption occurred
   - Monitoring shows baseline metrics restored

   See [Deployment Reference: Rollback Procedures](deployment-reference.md) for
   step-by-step rollback instructions.

5. Validate alerting fires correctly (test alert)

This "walking skeleton" proves the pipeline works before adding business
complexity.

> **AI exploration:** _"Help me design a CI/CD pipeline for [describe your >
> stack, team size, and deployment frequency targets]."_

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

## Relationship to Other Stages

- **System Design** makes deployment strategy decisions (this guide implements
  them)
- **Deployment Guide** covers per-increment deployment execution (this guide
  covers one-time setup)
- **Deployment Pipeline Checklist** provides a quick readiness check for the
  infrastructure built here

---

## Related Documents

- [Deployment Pipeline Checklist](deployment-pipeline-checklist.md)
- [Deployment Guide](deployment-guide.md)
- [Deployment Reference](deployment-reference.md)
- [System Design](../system-design/README.md)

---

**Last Updated:** 2026-02-22

_Added to framework in v0.12.0_

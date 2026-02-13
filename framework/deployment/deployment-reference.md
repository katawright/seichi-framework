# Deployment Reference Guide

**Last Updated:** 2026-02-12

---

## Table of Contents

1. [Overview](#overview)
2. [Deployment Strategies](#deployment-strategies)
3. [Environment Management](#environment-management)
4. [Database Migrations](#database-migrations)
5. [Configuration Management](#configuration-management)
6. [Rollback Procedures](#rollback-procedures)
7. [Monitoring and Observability](#monitoring-and-observability)
8. [Communication and Stakeholder Management](#communication-and-stakeholder-management)
9. [Common Deployment Patterns](#common-deployment-patterns)
10. [Deployment Automation and CI/CD](#deployment-automation-and-cicd)
11. [Security Considerations](#security-considerations)
12. [Troubleshooting and Incident Response](#troubleshooting-and-incident-response)
13. [When to Revisit Deployment](#when-to-revisit-deployment)

---

## Overview

The Deployment stage transforms verified code into live, operational systems
that deliver value to end users. Effective deployment balances speed (getting
features to users quickly) with safety (minimizing risk and downtime).

**Core Principles:**
1. **Reversibility** - Every deployment should be easily reversible through
   rollback
2. **Observability** - Monitor deployments closely to detect issues immediately
3. **Incrementality** - Deploy small, frequent changes rather than large,
   risky batches
4. **Automation** - Automate deployment processes to reduce human error
5. **Communication** - Keep stakeholders informed throughout deployment process
6. **Validation** - Verify production health before and after deployment

---

## Deployment Strategies

Choosing the right deployment strategy depends on:
- **Risk tolerance** - How much downtime or user impact is acceptable?
- **Rollback speed requirements** - How fast must you revert if issues arise?
- **Infrastructure capabilities** - What does your infrastructure support?
- **User impact** - Can users tolerate brief downtime or must service be
  continuous?
- **Deployment frequency** - Deploying daily vs. monthly affects strategy
  choice

### Blue/Green Deployment

**What it is:** Maintain two identical production environments (Blue =
current, Green = new). Deploy to Green, validate, then switch all traffic
from Blue to Green.

**How it works:**
1. Blue environment serves 100% of production traffic
2. Deploy new version to Green environment
3. Validate Green environment thoroughly (smoke tests, health checks)
4. Switch load balancer/router to direct traffic to Green
5. Keep Blue environment running as instant rollback option

**Advantages:**
- ✅ **Zero-downtime deployment** - Users experience no interruption
- ✅ **Instant rollback** - Switch traffic back to Blue immediately if issues
  arise
- ✅ **Full validation** - Test Green environment thoroughly before switching
  traffic
- ✅ **Simple rollback** - No need to redeploy, just switch traffic back

**Disadvantages:**
- ❌ **Cost** - Requires double infrastructure (two full environments)
- ❌ **Database complexity** - Migrations must be backward-compatible (both
  versions share DB)
- ❌ **Stateful applications** - User sessions may be disrupted during switch
- ❌ **Infrastructure requirements** - Needs load balancer and environment
  orchestration

**Best for:**
- Production systems with zero-downtime requirements
- High-risk deployments where instant rollback is critical
- Systems with budget for double infrastructure
- Applications that can handle simultaneous versions using shared database

**Example:**
```
Current state:
  Blue (v1.0) ← Load Balancer ← Users (100% traffic)
  Green (idle)

Deploy to Green:
  Blue (v1.0) ← Load Balancer ← Users (100% traffic)
  Green (v1.1) ← Validate

Switch traffic:
  Blue (v1.0, idle)
  Green (v1.1) ← Load Balancer ← Users (100% traffic)

Rollback if needed:
  Blue (v1.0) ← Load Balancer ← Users (100% traffic)
  Green (v1.1, idle)
```

---

### Canary Deployment

**What it is:** Deploy new version to small subset of production (canary),
monitor closely, then gradually increase traffic to new version if metrics
are healthy.

**How it works:**
1. Deploy new version to canary instances (5-10% of infrastructure)
2. Route small percentage of traffic to canary (e.g., 5% of users)
3. Monitor canary metrics closely for 15-30 minutes
4. If canary healthy, increase traffic percentage (25% → 50% → 100%)
5. If canary shows issues, route traffic back to stable version and investigate

**Advantages:**
- ✅ **Limited blast radius** - Only small percentage of users affected if
  issues arise
- ✅ **Real production validation** - Test with real user traffic, not just
  synthetic tests
- ✅ **Gradual rollout** - Increase confidence as more users see new version
- ✅ **Early detection** - Catch issues before full rollout

**Disadvantages:**
- ❌ **Complexity** - Requires traffic routing and metrics segmentation
- ❌ **Slower rollout** - Takes longer than all-at-once deployment
- ❌ **Monitoring overhead** - Need to watch canary metrics closely
- ❌ **User experience variation** - Some users on new version, some on old
  (can be confusing)

**Best for:**
- High-risk changes (major features, performance optimizations, architectural
  changes)
- Large user bases where 5-10% still provides meaningful traffic
- Systems with sophisticated monitoring and traffic routing
- When you want real-world validation before full rollout

**Example:**
```
Phase 1 (Canary):
  Stable (v1.0) ← 95% traffic
  Canary (v1.1) ← 5% traffic
  Monitor: Error rate, latency, user feedback

Phase 2 (Expand):
  Stable (v1.0) ← 50% traffic
  Canary (v1.1) ← 50% traffic
  Monitor: Metrics still healthy?

Phase 3 (Full Rollout):
  All instances (v1.1) ← 100% traffic
  Monitor: Full production validation
```

---

### Rolling Deployment

**What it is:** Gradually update instances/pods one at a time or in small
batches until all are running new version.

**How it works:**
1. Deploy new version to first instance/pod
2. Validate instance is healthy (health checks passing)
3. Deploy to next instance/pod
4. Repeat until all instances updated
5. Optional: Deploy in batches (e.g., 3 instances at a time) to speed up
   process

**Advantages:**
- ✅ **No extra infrastructure** - Update existing instances, no need for
  double environment
- ✅ **Gradual rollout** - Issues affect only portion of infrastructure at
  a time
- ✅ **Resource efficient** - No cost for maintaining duplicate environments
- ✅ **Simple concept** - Easy to understand and implement

**Disadvantages:**
- ❌ **Mixed versions** - During rollout, multiple versions serve traffic
  simultaneously
- ❌ **Slower rollback** - Must redeploy previous version to all instances
- ❌ **Potential inconsistency** - Users may see different behavior depending
  on which instance serves request
- ❌ **Stateful challenges** - Session state may be lost if user switches
  instances

**Best for:**
- Distributed systems with multiple instances (microservices, Kubernetes)
- Low-to-medium risk deployments
- Organizations with limited infrastructure budget
- Applications where brief mixed-version state is acceptable

**Example:**
```
Starting state (6 instances):
  [v1.0] [v1.0] [v1.0] [v1.0] [v1.0] [v1.0]

After batch 1:
  [v1.1] [v1.1] [v1.0] [v1.0] [v1.0] [v1.0]
  Validate: Health checks passing?

After batch 2:
  [v1.1] [v1.1] [v1.1] [v1.1] [v1.0] [v1.0]
  Validate: Metrics still healthy?

After batch 3:
  [v1.1] [v1.1] [v1.1] [v1.1] [v1.1] [v1.1]
  Complete: All instances updated
```

---

### Feature Flag Deployment

**What it is:** Deploy code to production with new features disabled, then
enable features via configuration flags without redeployment.

**How it works:**
1. Deploy code to production with features wrapped in flags (disabled by
   default)
2. Validate deployment successful
3. Enable features for internal users or beta testers first
4. Gradually roll out to production users (percentage-based or user segments)
5. Toggle features on/off instantly without redeployment

**Advantages:**
- ✅ **Decouple deployment from release** - Deploy anytime, release when ready
- ✅ **Instant rollback** - Turn off feature flag to revert, no redeployment
  needed
- ✅ **Gradual rollout** - Enable for 5% → 25% → 100% of users
- ✅ **A/B testing** - Run experiments by showing different versions to user
  segments
- ✅ **Risk mitigation** - Deploy risky features hidden, enable when confident

**Disadvantages:**
- ❌ **Code complexity** - Feature flag logic adds conditional branches
- ❌ **Technical debt** - Old flags must be cleaned up when features fully
  rolled out
- ❌ **Testing overhead** - Must test with flags on/off
- ❌ **Flag management** - Need system to manage and monitor flags

**Best for:**
- Large organizations deploying frequently
- High-risk features requiring gradual rollout
- A/B testing and experimentation
- Decoupling deployment from product release decisions
- Emergency kill switches for problematic features

**Example:**
```python
# Code deployed to production (feature disabled)
if feature_flags.is_enabled('new_checkout_flow', user_id):
    return new_checkout_flow(user)
else:
    return old_checkout_flow(user)

# Gradual rollout without redeployment:
# Day 1: Enable for internal users (user_id in [1,2,3])
# Day 2: Enable for 10% of users (user_id % 10 == 0)
# Day 3: Enable for 50% of users (user_id % 2 == 0)
# Day 4: Enable for 100% of users
# Day 5: Remove flag and old code in next deployment
```

**Popular Feature Flag Tools:**
- LaunchDarkly (commercial)
- Unleash (open source)
- Split.io (commercial)
- Custom implementation (environment variables, database flags)

---

### Big Bang Deployment (Traditional)

**What it is:** Replace old version with new version all at once, often with
scheduled downtime.

**How it works:**
1. Schedule maintenance window (e.g., 2 AM Saturday)
2. Take production offline (show maintenance page)
3. Deploy new version
4. Run validation tests
5. Bring production back online

**Advantages:**
- ✅ **Simplicity** - Straightforward process, no complex orchestration
- ✅ **No version coexistence** - Only one version running at a time
- ✅ **Clear rollback point** - Before deployment vs. after deployment

**Disadvantages:**
- ❌ **Downtime** - Service unavailable during deployment
- ❌ **User impact** - Users cannot access system during maintenance window
- ❌ **Pressure** - Time-boxed window creates stress to complete quickly
- ❌ **Risk** - All users affected simultaneously if issues arise

**Best for:**
- Internal tools with low availability requirements
- Small user bases that can tolerate downtime
- Legacy systems without modern deployment infrastructure
- Breaking changes requiring full database migration and downtime

**Note:** Big Bang deployments are generally **discouraged** for modern
production systems. Consider other strategies first.

---

### Strategy Selection Guide

| Factor | Blue/Green | Canary | Rolling | Feature Flag | Big Bang |
|--------|-----------|--------|---------|--------------|----------|
| **Zero downtime** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Cost** | ❌ High (2x infra) | ⚠️ Medium | ✅ Low | ✅ Low | ✅ Low |
| **Rollback speed** | ✅ Instant | ✅ Fast | ⚠️ Slow | ✅ Instant | ⚠️ Slow |
| **Complexity** | ⚠️ Medium | ❌ High | ✅ Low | ❌ High | ✅ Low |
| **Risk mitigation** | ✅ Excellent | ✅ Excellent | ⚠️ Good | ✅ Excellent | ❌ Poor |
| **Gradual rollout** | ❌ No | ✅ Yes | ⚠️ Partial | ✅ Yes | ❌ No |
| **Database migrations** | ⚠️ Complex | ⚠️ Complex | ⚠️ Complex | ✅ Easier | ✅ Simple |

**Recommendation:**
- **Start with rolling deployment** for most applications (good balance of
  simplicity and safety)
- **Add feature flags** as you mature (decouple deployment from release)
- **Use canary** for high-risk changes
- **Consider blue/green** if you have budget and zero-downtime is critical
- **Avoid big bang** unless absolutely necessary

---

## Environment Management

### Environment Pipeline

**Typical promotion pipeline:**
```
Development → Staging/QA → Pre-Production → Production
```

**Development:**
- **Purpose:** Engineer testing and debugging
- **Data:** Synthetic/test data
- **Infrastructure:** Minimal (often local or shared dev environment)
- **Deployment:** Continuous (every code push, automated)
- **Validation:** Unit tests, basic smoke tests

**Staging/QA:**
- **Purpose:** Verification testing (integration, UAT, performance)
- **Data:** Production-like test data (anonymized)
- **Infrastructure:** Similar to production (smaller scale)
- **Deployment:** Per increment completion
- **Validation:** Full test suite, UAT, exploratory testing

**Pre-Production (Optional):**
- **Purpose:** Final validation before production
- **Data:** Production replica or subset (anonymized)
- **Infrastructure:** Production-identical (same services, configurations)
- **Deployment:** Release candidate validation
- **Validation:** Production-identical smoke tests, performance testing

**Production:**
- **Purpose:** Live system serving real users
- **Data:** Real user data
- **Infrastructure:** Full-scale, highly available
- **Deployment:** Controlled, monitored releases
- **Validation:** Smoke tests, monitoring, success criteria tracking

### Environment Parity

**Why it matters:** Differences between staging and production cause "works
in staging, fails in production" issues.

**Achieve parity across:**
- **Infrastructure:** Same OS, services, network configuration
- **Configuration:** Same environment variables (except secrets/credentials)
- **Data schema:** Same database schema version
- **Dependencies:** Same library versions, third-party services
- **Resource allocation:** Similar CPU, memory, disk (scale may differ)

**Managing differences:**
- Document environment-specific differences (e.g., production uses RDS,
  staging uses local PostgreSQL)
- Use Infrastructure as Code (Terraform, CloudFormation) to maintain
  consistency
- Automate environment setup to reduce drift
- Regularly refresh staging data from production (anonymized)

### Environment-Specific Configuration

**Configuration types:**
- **Infrastructure:** Database connection strings, API endpoints, service URLs
- **Secrets:** API keys, database passwords, encryption keys
- **Feature flags:** Enable/disable features per environment
- **Resource limits:** Connection pool sizes, timeouts, rate limits
- **Logging and monitoring:** Log levels, metrics endpoints, alerting
  thresholds

**Configuration management best practices:**
- ✅ **Externalize configuration** - Store outside codebase (environment
  variables, config files)
- ✅ **Never commit secrets** - Use secret management tools (AWS Secrets
  Manager, HashiCorp Vault)
- ✅ **Validate configuration** - Check required variables present before
  starting application
- ✅ **Document expected configuration** - Maintain `config.example.yaml` or
  `.env.example`
- ✅ **Version configuration** - Track changes to config files in version
  control (excluding secrets)

---

## Database Migrations

Database migrations are often the riskiest part of deployment. Plan carefully.

### Migration Types

**Additive (Safest):**
- Add new tables, columns, indexes
- **Risk:** Low - old code ignores new structures
- **Backward compatibility:** Yes - old version still works
- **Example:** Add `user_preferences` table for new feature

**Backward-Compatible (Safe):**
- Modify existing structures in compatible way
- **Risk:** Low-Medium - careful design required
- **Backward compatibility:** Yes - old and new versions coexist
- **Example:** Add nullable column, add default value

**Breaking (Risky):**
- Remove or fundamentally change existing structures
- **Risk:** High - old code breaks immediately
- **Backward compatibility:** No - requires coordinated deployment
- **Example:** Drop column, rename table, change data type

### Migration Execution Strategies

**Strategy 1: Expand-Contract (Recommended)**

**Phase 1 - Expand:** Add new structures without removing old
```sql
-- Deployment 1: Add new column alongside old
ALTER TABLE users ADD COLUMN email_address VARCHAR(255);
-- Old code uses `email`, new code uses `email_address`
-- Both versions work simultaneously
```

**Phase 2 - Migrate:** Copy data from old to new (if needed)
```sql
-- Background job or migration script
UPDATE users SET email_address = email WHERE email_address IS NULL;
```

**Phase 3 - Contract:** Remove old structures after all code updated
```sql
-- Deployment 2: Drop old column (safe now, all code uses new column)
ALTER TABLE users DROP COLUMN email;
```

**Advantages:**
- ✅ Zero-downtime migrations
- ✅ Easy rollback (both structures exist during transition)
- ✅ Works with all deployment strategies

---

**Strategy 2: Maintenance Window (Acceptable for small databases)**
1. Take application offline (maintenance mode)
2. Run migration scripts
3. Validate migration success
4. Bring application online with new code

**Use when:**
- Database is small (<10GB)
- Migration is fast (<5 minutes)
- Downtime is acceptable to stakeholders
- Breaking changes required

---

**Strategy 3: Online Schema Change Tools**

For large databases, use tools that minimize locking:
- **pt-online-schema-change** (Percona Toolkit for MySQL)
- **gh-ost** (GitHub's online schema migration tool for MySQL)
- **pg-osc** (PostgreSQL online schema change)

These tools work by:
1. Create copy of table with new schema
2. Copy data in chunks to avoid long locks
3. Track changes during migration (triggers)
4. Swap tables atomically when complete

---

### Migration Best Practices

#### Before Migration
- ✅ **Test in staging first** with production-sized data
- ✅ **Estimate migration duration** - How long will it take?
- ✅ **Assess lock impact** - Will migration block writes?
- ✅ **Back up database** - Full backup before migration
- ✅ **Write rollback script** - How to undo migration
- ✅ **Check disk space** - Ensure enough space for migration
- ✅ **Plan for index creation** - Indexes can take hours on large tables

#### During Migration
- ✅ **Monitor migration progress** - Watch for errors or stalls
- ✅ **Check application health** - Is app still serving requests?
- ✅ **Validate incrementally** - Check each migration step before next
- ✅ **Have rollback ready** - Be prepared to revert if issues arise

#### After Migration
- ✅ **Validate data integrity** - Foreign keys, constraints, row counts
- ✅ **Check application logs** - Any database-related errors?
- ✅ **Monitor performance** - Are queries slower after migration?
- ✅ **Update schema documentation** - Keep docs in sync with reality
- ✅ **Plan for cleanup** - Remove old columns/tables after new code deployed

### Migration Testing Checklist

Before running migration in production:
- [ ] Migration tested in development environment
- [ ] Migration tested in staging with production-like data volume
- [ ] Migration duration measured (acceptable for production window?)
- [ ] Rollback script tested and validated
- [ ] Data integrity checks defined and tested
- [ ] Application tested with both old and new schema (if expand-contract)
- [ ] Performance impact assessed (query times, index usage)
- [ ] Locking and blocking assessed (will migration block writes?)

### Common Migration Pitfalls

**❌ Adding non-nullable column without default**
```sql
-- BAD: Fails if table has existing rows
ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL;

-- GOOD: Add as nullable first, then update, then add constraint
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
UPDATE users SET phone = 'unknown' WHERE phone IS NULL;
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
```

**❌ Creating index on large table without CONCURRENTLY (PostgreSQL)**
```sql
-- BAD: Locks table for entire index creation (can take hours)
CREATE INDEX idx_email ON users(email);

-- GOOD: Creates index without blocking writes
CREATE INDEX CONCURRENTLY idx_email ON users(email);
```

**❌ Renaming column without expand-contract**
```sql
-- BAD: Old code breaks immediately
ALTER TABLE users RENAME COLUMN email TO email_address;

-- GOOD: Add new column, copy data, update code, drop old column
-- (See Expand-Contract strategy above)
```

---

## Configuration Management

### Configuration Principles

1. **Externalize configuration** - Keep config separate from code
2. **Never commit secrets** - Use secret management tools
3. **Environment-specific values** - Dev vs. staging vs. production
4. **Validate on startup** - Fail fast if config missing or invalid
5. **Document expected config** - What variables are required?

### Configuration Storage Options

**Environment Variables (Recommended for most):**
```bash
# .env.production (not committed to git)
DATABASE_URL=postgresql://user:pass@prod-db:5432/myapp
API_KEY=abc123secretkey
LOG_LEVEL=info
FEATURE_NEW_CHECKOUT=true
```

**Advantages:**
- ✅ Widely supported (all languages/frameworks)
- ✅ Cloud-native (12-factor app methodology)
- ✅ Easy to override per environment
- ✅ No code changes needed for config updates

**Disadvantages:**
- ❌ Limited to string values
- ❌ No built-in secret encryption
- ❌ Can't easily audit changes

---

**Configuration Files:**
```yaml
# config/production.yaml (committed to git, no secrets)
database:
  host: prod-db.company.com
  port: 5432
  pool_size: 20
  timeout: 5000

logging:
  level: info
  format: json

features:
  new_checkout: true
  beta_features: false
```

**Advantages:**
- ✅ Structured data (nested objects, arrays)
- ✅ Version controlled (track changes)
- ✅ Comments for documentation
- ✅ Validation via schema (e.g., JSON Schema)

**Disadvantages:**
- ❌ Secrets must be handled separately
- ❌ Requires parsing logic in application
- ❌ Environment-specific files can diverge

---

**Secret Management Tools:**
- **AWS Secrets Manager** / **AWS Parameter Store**
- **HashiCorp Vault**
- **Azure Key Vault**
- **Google Cloud Secret Manager**
- **Kubernetes Secrets**

**Advantages:**
- ✅ Encryption at rest and in transit
- ✅ Access control and auditing
- ✅ Secret rotation support
- ✅ Centralized management

**Disadvantages:**
- ❌ Additional infrastructure to manage
- ❌ Potential single point of failure
- ❌ Cost (for managed services)

### Configuration Validation

**Validate configuration on application startup:**
```python
# Example: Python configuration validation
import os

def validate_config():
    required = ['DATABASE_URL', 'API_KEY', 'LOG_LEVEL']
    missing = [var for var in required if not os.getenv(var)]

    if missing:
        raise EnvironmentError(f"Missing required config: {missing}")

    # Validate values
    log_level = os.getenv('LOG_LEVEL')
    if log_level not in ['DEBUG', 'INFO', 'WARN', 'ERROR']:
        raise ValueError(f"Invalid LOG_LEVEL: {log_level}")

# Call during application initialization
validate_config()
```

**Benefits:**
- Fail fast if configuration is missing or invalid
- Catch config errors before deployment succeeds
- Document required configuration implicitly

---

## Rollback Procedures

**Rollback principle:** Every deployment should be reversible. Plan rollback
before deploying.

### When to Roll Back

**Critical triggers (roll back immediately):**
- ❌ **Critical bug** - Core functionality broken (login, checkout, etc.)
- ❌ **Data corruption** - Data loss or integrity violation
- ❌ **Security vulnerability** - Production security issue discovered
- ❌ **Performance collapse** - Response time >2x baseline, system unusable
- ❌ **Error rate spike** - Error rate >5% sustained for >5 minutes

**Warning signs (investigate, may need rollback):**
- ⚠️ **Increased error rate** - 2-5% error rate (above baseline)
- ⚠️ **Performance degradation** - Response time 1.5-2x baseline
- ⚠️ **User reports** - Multiple users reporting same issue
- ⚠️ **Third-party failures** - External API integration broken

### Rollback Decision Authority

**Define decision maker BEFORE deployment:**
- **Deployment engineer** - Can rollback for technical issues
- **DevOps lead** - Approves rollback for major incidents
- **Product manager** - Decides if business impact warrants rollback
- **Escalation path** - Who to contact if decision maker unavailable

**Decision criteria:**
- How many users affected? (1% vs. 50% vs. 100%)
- What functionality is broken? (Critical vs. minor feature)
- Can issue be fixed forward? (Quick hotfix vs. complex fix)
- What is rollback risk? (Safe vs. potential data loss)

### Rollback Execution

**Blue/Green rollback (fastest):**
```bash
# Switch load balancer back to Blue environment
# Duration: ~1 minute
aws elb modify-target-group --target-group-arn $TG_ARN \
  --target blue-environment
```

**Canary rollback:**
```bash
# Route all traffic back to stable version
# Duration: ~2 minutes
kubectl set traffic myapp --stable=100% --canary=0%
```

**Rolling deployment rollback:**
```bash
# Redeploy previous version to all instances
# Duration: ~10-30 minutes (depends on instance count)
kubectl rollout undo deployment/myapp
# or
./deploy.sh v1.0.0 --all-instances
```

**Feature flag rollback (instant):**
```bash
# Disable feature flag
# Duration: ~seconds (no redeployment needed)
feature_flags.disable('new_checkout_flow')
```

### Database Rollback Considerations

**Additive migrations (safe to rollback):**
- New tables, columns, indexes can remain after rollback
- Old code ignores new structures
- No rollback script needed

**Breaking migrations (complex rollback):**
- Dropped columns, renamed tables require restoration
- Must have rollback script prepared
- May require restoring database backup

**Rollback script example:**
```sql
-- Rollback for migration that renamed column
ALTER TABLE users RENAME COLUMN email_address TO email;

-- Rollback for migration that dropped column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
-- Note: Data is LOST, cannot restore without backup
```

**Database rollback strategies:**
1. **Point-in-time recovery** - Restore database to pre-migration state
   (requires downtime)
2. **Rollback script** - Run reverse migration (expand-contract recommended)
3. **Backup restoration** - Restore full database backup (data loss possible
   if new transactions occurred)

### Post-Rollback Actions

After rolling back:
1. **Notify stakeholders** - Inform that rollback occurred and why
2. **Preserve evidence** - Save logs, metrics, error reports for analysis
3. **Schedule retrospective** - Understand what went wrong
4. **Create action items** - Prevent recurrence
5. **Fix root cause** - Address issue before redeploying
6. **Update deployment brief** - Document rollback details

---

## Monitoring and Observability

**Deployment monitoring principle:** You can't manage what you don't measure.

### Key Metrics to Monitor

**Application Health:**
- **Error rate** - Percentage of requests resulting in errors
  - Target: <1% (baseline), Alert at >2-5% (warning), >5% (critical)
- **Response time** - p50, p95, p99 latency
  - Target: <200ms p50, <500ms p95 (example - varies by application)
- **Throughput** - Requests per second
  - Baseline: Normal traffic level, Alert if drops >20%
- **Success rate** - Percentage of successful requests
  - Target: >99% (baseline), Alert at <98%

**Infrastructure Health:**
- **CPU usage** - Percentage of CPU utilized
  - Target: <70% (baseline), Alert at >85% (warning), >95% (critical)
- **Memory usage** - RAM utilization and available memory
  - Target: <80% (baseline), Alert at >90% (warning), >95% (critical)
- **Disk usage** - Available disk space
  - Target: <70% (baseline), Alert at >85% (warning), >95% (critical)
- **Network I/O** - Bandwidth utilization
  - Baseline: Normal traffic patterns, Alert if anomalous

**Database Metrics:**
- **Connection pool usage** - Active database connections
  - Target: <80% of pool size, Alert at >90%
- **Query time** - p95 query duration
  - Baseline: Normal query performance, Alert if >2x baseline
- **Deadlocks** - Database lock conflicts
  - Target: 0 (baseline), Alert at >1 per hour
- **Replication lag** - Delay between primary and replica
  - Target: <1 second, Alert at >10 seconds

**Business Metrics:**
- **User activity** - Active sessions, logins, actions
  - Baseline: Normal user patterns, Alert if drops >20%
- **Conversion rate** - Critical business flows completion
  - Baseline: Normal conversion, Alert if drops >10%
- **Revenue** - Transaction volume and value (if applicable)
  - Baseline: Expected revenue, Alert if drops significantly

### Monitoring Best Practices

**Before deployment:**
- ✅ Configure monitoring dashboards for production environment
- ✅ Define alert thresholds (warning and critical)
- ✅ Test alerts fire correctly (send test alert)
- ✅ Capture baseline metrics before deployment
- ✅ Ensure success criteria instrumentation works

**During deployment:**
- ✅ Monitor dashboards actively (every 5-15 minutes)
- ✅ Watch for anomalies (spikes, drops, unusual patterns)
- ✅ Check logs for errors or exceptions
- ✅ Validate health checks passing
- ✅ Compare metrics to baseline

**After deployment:**
- ✅ Continue monitoring for 24-48 hours (stabilization period)
- ✅ Review logs daily for first week
- ✅ Track success criteria metrics (weekly for first month)
- ✅ Adjust alert thresholds if needed (reduce false positives)

### Monitoring Tools

**Application Performance Monitoring (APM):**
- New Relic
- Datadog
- Dynatrace
- AppDynamics
- Elastic APM

**Infrastructure Monitoring:**
- Prometheus + Grafana
- CloudWatch (AWS)
- Azure Monitor
- Google Cloud Monitoring
- Nagios / Zabbix

**Log Aggregation:**
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Splunk
- Datadog Logs
- CloudWatch Logs
- Papertrail

**Error Tracking:**
- Sentry
- Rollbar
- Bugsnag
- Airbrake

---

## Communication and Stakeholder Management

**Communication principle:** Overcommunicate during deployments. Stakeholders
prefer too much information to being surprised.

### Stakeholder Notification Timeline

**Pre-Deployment (24-48 hours before):**
- **Audience:** All stakeholders (executives, product, support, users if
  applicable)
- **Message:** Deployment scheduled, expected impact, new features, support
  contact
- **Channel:** Email, Slack, status page

**Deployment Start:**
- **Audience:** Technical teams, support, key stakeholders
- **Message:** Deployment in progress, expected duration, monitoring ongoing
- **Channel:** Slack, status page

**During Deployment (if multi-phase or >30 minutes):**
- **Audience:** Technical teams, key stakeholders
- **Message:** Progress update, phase completion, ETA
- **Frequency:** Every 30 minutes or per phase
- **Channel:** Slack, email thread

**Deployment Complete:**
- **Audience:** All stakeholders
- **Message:** Deployment successful, new features live, known issues, support
  contact
- **Channel:** Email, Slack, status page, release notes

**If Rollback Occurs:**
- **Audience:** All stakeholders (immediately)
- **Message:** Deployment rolled back, reason, impact, next steps
- **Urgency:** High priority notification
- **Channel:** Email, Slack (tag @channel), status page

### Communication Templates

**Pre-Deployment Notification:**
```
Subject: Upcoming Production Deployment - [Feature Name] - [Date]

Hi team,

We will be deploying [Feature Name] to production on [Day, Month Date]
at [Time] [Timezone].

Expected Impact: [None / Brief downtime / Degraded performance]
Expected Duration: [X minutes]

What's New:
- [Brief description of new feature 1]
- [Brief description of feature 2]
- [Bug fix summary]

Known Issues:
- [Any limitations or edge cases]

We will send updates when deployment begins and completes. If you
encounter any issues after deployment, please contact:
- Support: support@company.com
- On-call engineer: [Name, Slack handle]

[Link to release notes]

Thanks,
[Engineering Team]
```

**Deployment Complete Notification:**
```
Subject: Deployment Complete - [Feature Name]

Hi team,

Deployment completed successfully at [Time] [Timezone].

Status: ✅ Success
New Features Live:
- [Feature 1 with link to docs]
- [Feature 2 with link to docs]

Known Issues: [None / List with workarounds]

Support Resources:
- Release notes: [Link]
- User documentation: [Link]
- Support contact: support@company.com

We will continue monitoring production closely for the next 24 hours.

Thanks,
[Engineering Team]
```

**Rollback Notification:**
```
Subject: URGENT - Production Deployment Rolled Back

Hi team,

We have rolled back the deployment of [Feature Name] at [Time] [Timezone].

Reason: [Brief description of issue - critical bug, performance problem, etc.]
Impact: [What users experienced]
Status: Production restored to previous version

Next Steps:
- Engineering investigating root cause
- Fix ETA: [Estimate or TBD]
- Retrospective scheduled for [Date/Time]

If you encounter any ongoing issues, please report immediately:
- On-call engineer: [Name, Slack handle]
- Support: support@company.com

We will send updates as investigation progresses.

Thanks,
[Engineering Team]
```

### Internal Communication Channels

**Deployment Slack channel:**
- Create dedicated #deployments channel
- Post deployment notifications, progress updates, issues
- Tag relevant people (@channel for critical updates, @here for info)
- Archive deployment history for reference

**Incident response:**
- Use dedicated incident channel (#incident-YYYY-MM-DD)
- Document timeline, actions, decisions
- Coordinate rollback if needed
- Post-mortem after resolution

**Status page (if applicable):**
- Update customer-facing status page for user-impacting deployments
- Set status: Operational / Degraded / Major Outage
- Post incident updates every 30-60 minutes
- Mark resolved when stable

---

## Common Deployment Patterns

### Zero-Downtime Deployment

**Requirements:**
- Load balancer with health checks
- Multiple instances (can take some offline)
- Backward-compatible changes (database, APIs)

**Pattern:**
1. Deploy new version to subset of instances
2. Health checks verify new instances healthy
3. Load balancer routes traffic to healthy instances only
4. Gradually update remaining instances
5. Old instances gracefully shut down after draining connections

**Key principle:** Always have healthy instances serving traffic

---

### Hotfix Deployment

**When to use:** Critical bug in production requiring immediate fix

**Process:**
1. Create hotfix branch from production tag
2. Implement minimal fix (only change necessary to resolve issue)
3. Fast-track testing (focus on regression and fix validation)
4. Deploy to production with accelerated approval
5. Monitor closely after deployment
6. Merge hotfix back to main branch

**Hotfix criteria:**
- Critical bug affecting users NOW
- Revenue impact or security vulnerability
- Cannot wait for normal release cycle

**Hotfix anti-patterns:**
- ❌ Bundling other changes with hotfix (scope creep)
- ❌ Skipping testing ("just push it live")
- ❌ Hotfixing minor issues (wait for normal release)

---

### Scheduled Maintenance Deployment

**When to use:** Breaking changes requiring downtime (database schema changes,
major version upgrades)

**Process:**
1. Schedule maintenance window (low-traffic time: 2-4 AM, weekends)
2. Notify users 1-2 weeks in advance
3. Display maintenance page during window
4. Take production offline
5. Run deployment (migrations, configuration, code updates)
6. Validate deployment success
7. Bring production back online
8. Notify users of completion

**Best practices:**
- ✅ Choose low-traffic window (check analytics)
- ✅ Give users advance notice (1-2 weeks)
- ✅ Communicate expected duration
- ✅ Have rollback plan ready
- ✅ Test in staging with production-sized data
- ✅ Monitor closely after bringing online

---

## Deployment Automation and CI/CD

### Continuous Integration (CI)

**What it is:** Automatically build and test code on every commit

**CI Pipeline:**
```
Code Push → Build → Unit Tests → Integration Tests → Package Artifact
  ↓ (if passing)
Ready for Deployment
```

**CI Best Practices:**
- ✅ Run CI on every commit (main branch and pull requests)
- ✅ Fail fast (stop at first failure to save time)
- ✅ Keep builds fast (<10 minutes if possible)
- ✅ Provide clear feedback (what failed and why)
- ✅ Block merges if CI fails

### Continuous Deployment (CD)

**What it is:** Automatically deploy passing builds to environments

**CD Pipeline:**
```
CI Passes → Deploy to Dev → Smoke Tests → Deploy to Staging →
Full Tests → Manual Approval → Deploy to Production → Monitor
```

**CD Best Practices:**
- ✅ Automate deployment to dev/staging (no human intervention)
- ✅ Require manual approval for production deployment
- ✅ Run smoke tests after each deployment
- ✅ Automatically roll back if health checks fail
- ✅ Notify team of deployment status

### Infrastructure as Code (IaC)

**What it is:** Define infrastructure in version-controlled code

**Tools:**
- Terraform (cloud-agnostic)
- AWS CloudFormation (AWS-specific)
- Azure ARM Templates (Azure-specific)
- Google Cloud Deployment Manager (GCP-specific)
- Pulumi (code-based IaC)

**Benefits:**
- ✅ Version controlled infrastructure changes
- ✅ Reproducible environments (dev, staging, prod)
- ✅ Disaster recovery (rebuild from code)
- ✅ Review infrastructure changes like code reviews

### Deployment Automation Best Practices

**Idempotency:**
- Deployment scripts should be runnable multiple times safely
- Running deployment twice should produce same result
- Check if change already applied before applying

**Validation:**
- Validate environment before deploying (health checks pass)
- Validate deployment package (version, checksum)
- Validate deployment success (health checks pass after deployment)

**Logging:**
- Log every deployment step (what, when, who, outcome)
- Preserve deployment logs for troubleshooting
- Make logs accessible to team

**Safety checks:**
- Require approval for production deployments
- Prevent concurrent deployments (lock mechanism)
- Allow emergency rollback override (break glass)

---

## Security Considerations

### Deployment Security Checklist

**Before deployment:**
- [ ] No secrets or credentials in code or config files (use secret manager)
- [ ] Environment variables validated (no missing or default passwords)
- [ ] Dependencies scanned for vulnerabilities (npm audit, Snyk, etc.)
- [ ] Security testing passed (SAST, DAST, penetration testing)
- [ ] Access controls reviewed (who can deploy to production?)
- [ ] Audit logging enabled (who did what, when)

**During deployment:**
- [ ] Deployment executed by authorized personnel only
- [ ] Changes logged and auditable
- [ ] Secrets rotated if compromised
- [ ] Deployment package integrity verified (checksum)

**After deployment:**
- [ ] No secrets exposed in logs or error messages
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options, etc.)
- [ ] SSL/TLS certificates valid and properly configured
- [ ] Authentication and authorization working correctly
- [ ] No new security vulnerabilities introduced (monitor security alerts)

### Secrets Management in Deployment

**Never commit secrets to version control:**
- ❌ API keys, passwords, database credentials
- ❌ Private keys, certificates
- ❌ OAuth tokens, session secrets

**Use secret management tools:**
- ✅ AWS Secrets Manager
- ✅ HashiCorp Vault
- ✅ Azure Key Vault
- ✅ Kubernetes Secrets
- ✅ Environment variables injected at runtime (not committed)

**Secret rotation:**
- Rotate secrets after deployment (especially if exposed)
- Use different secrets per environment (dev vs. prod)
- Audit secret access (who accessed what, when)

### Principle of Least Privilege

**Deployment access control:**
- Only authorized personnel can deploy to production
- Use role-based access control (RBAC)
- Require multi-factor authentication (MFA) for production access
- Log all production access and changes

**Database access:**
- Application uses limited database user (not root/admin)
- Read-only access where possible
- Separate users for different environments

---

## Troubleshooting and Incident Response

### Common Deployment Issues

**Issue: Health checks failing after deployment**
- **Cause:** Application not starting correctly, dependency unavailable
- **Diagnosis:** Check application logs, health check endpoint
- **Resolution:** Fix startup issue, verify dependencies available, redeploy

**Issue: Error rate spike after deployment**
- **Cause:** New bug introduced, breaking change, configuration error
- **Diagnosis:** Check error logs, identify error pattern, compare to baseline
- **Resolution:** Rollback or hotfix, depending on severity

**Issue: Performance degradation after deployment**
- **Cause:** Inefficient code, missing index, increased load
- **Diagnosis:** Check APM metrics, database query times, resource usage
- **Resolution:** Optimize code, add indexes, scale infrastructure, or rollback

**Issue: Database migration failed**
- **Cause:** Lock timeout, syntax error, data validation failure
- **Diagnosis:** Check migration logs, database error messages
- **Resolution:** Rollback migration, fix script, retry

**Issue: Configuration errors in production**
- **Cause:** Missing environment variable, incorrect value
- **Diagnosis:** Check application startup logs, validate configuration
- **Resolution:** Fix configuration, restart application

### Incident Response Process

**1. Detection:**
- Monitor alerts fire (error rate spike, health checks failing)
- User reports issues (support tickets, social media)
- Automated testing catches problem (smoke tests fail)

**2. Triage:**
- **Assess severity:** Critical (revenue impact, all users affected) vs.
  Minor (edge case, few users)
- **Identify scope:** What functionality broken? How many users affected?
- **Determine urgency:** Immediate rollback vs. hotfix vs. fix in next release

**3. Communication:**
- Notify stakeholders immediately (severity-dependent)
- Create incident Slack channel (#incident-YYYY-MM-DD)
- Post status updates every 30-60 minutes

**4. Resolution:**
- **Option 1: Rollback** (fastest, if recent deployment)
- **Option 2: Hotfix** (if root cause known and fix is simple)
- **Option 3: Workaround** (if fix is complex, provide temporary workaround)

**5. Validation:**
- Verify issue resolved (error rates return to baseline)
- Run smoke tests to confirm functionality restored
- Monitor for 1-2 hours to ensure stable

**6. Post-Mortem:**
- Schedule retrospective within 24-48 hours
- Document timeline, root cause, resolution
- Identify action items to prevent recurrence
- Share learnings with team

---

## When to Revisit Deployment

Deployment procedures may need updates when:

**After Deployment Failure:**
- Deployment failed or required rollback
- Review what went wrong and update procedure to prevent recurrence
- Add validation steps to catch issues earlier
- Improve rollback procedure if it didn't work smoothly

**Infrastructure Changes:**
- New deployment environment added (region, cloud provider)
- Infrastructure architecture changed (monolith → microservices)
- Deployment tools changed (Jenkins → GitHub Actions)

**Performance Issues:**
- Deployment took too long (optimize, parallelize)
- Deployment caused downtime (move to zero-downtime strategy)
- Rollback was too slow (improve rollback procedure)

**Process Issues:**
- Communication gaps (stakeholders surprised)
- Approval delays (streamline approval process)
- Missing validations (add checkpoints)

**Security Concerns:**
- Security incident during or after deployment
- New compliance requirements (SOC 2, HIPAA, PCI-DSS)
- Secrets exposed or access controls inadequate

**Team Feedback:**
- Engineers find deployment process confusing or error-prone
- Support team unprepared for deployments
- Stakeholders want more or less communication

---

## Deployment Maturity Model

### Level 1: Manual Deployment
- Manual steps, documented in wiki or runbook
- Human executes each step
- Deployments infrequent (monthly or quarterly)
- High risk of human error

**Goal:** Automate basic steps

---

### Level 2: Scripted Deployment
- Deployment scripts automate repetitive tasks
- Still requires human to run scripts
- Deployments more frequent (weekly or bi-weekly)
- Reduced human error, but still manual

**Goal:** Implement CI/CD pipeline

---

### Level 3: Continuous Deployment (Dev/Staging)
- CI/CD automatically deploys to dev and staging
- Manual approval for production
- Deployments frequent (daily or multiple times per day to dev)
- Automated testing gates

**Goal:** Zero-downtime deployments

---

### Level 4: Zero-Downtime Production Deployment
- Blue/green, canary, or rolling deployments
- Automated rollback if health checks fail
- Deployments to production frequent (daily or weekly)
- Monitoring and alerting automated

**Goal:** Continuous deployment to production

---

### Level 5: Continuous Deployment to Production
- Fully automated pipeline from commit to production
- Comprehensive automated testing
- Feature flags decouple deployment from release
- Deployments to production multiple times per day
- Instant rollback capability

**Goal:** Maintain and optimize

---

*Added to framework in v0.7.0*

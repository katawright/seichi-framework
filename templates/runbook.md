<!-- For guidance on completing this runbook, see ../support/README.md -->

# Runbook: [Procedure Name]

**Purpose:** [One-sentence description of what this runbook accomplishes]
**Owner:** [Role or team name responsible for maintaining this runbook] **Last
Tested:** YYYY-MM-DD **Estimated Duration:** [X minutes] **Severity Context:**
[When to use — e.g., "P0/P1 incidents involving database connectivity" or
"routine weekly maintenance"]

---

## Prerequisites

Before starting this procedure, confirm:

- [ ] [Access or permission required — e.g., "SSH access to production servers"]
- [ ] [Tool or environment requirement — e.g., "kubectl configured for
      production cluster"]
- [ ] [Knowledge requirement — e.g., "Familiarity with database failover
      process"]
- [ ] [Communication requirement — e.g., "Incident channel created and
      stakeholders notified"]

---

## Procedure

### Step 1: [Action Description]

```bash
# [Command to execute]
```

**Expected output:** [What you should see if this step succeeds]

**If unexpected:** [What to do if output differs — e.g., "If connection refused,
check VPN status and retry"]

### Step 2: [Action Description]

```bash
# [Command to execute]
```

**Expected output:** [What you should see]

### Step 3: [Action Description] _(Critical Step)_

<!-- prettier-ignore -->
> **Caution:** This step [describe why it's critical — e.g.,
> "modifies production data" or "cannot be undone without a restore"].
> Verify the expected output before proceeding.

```bash
# [Command to execute]
```

**Expected output:** [What you should see]

**Verification check:**

- [ ] [Observable condition confirming this step succeeded]

### Step 4: [Action Description]

```bash
# [Command to execute]
```

**Expected output:** [What you should see]

---

## Verification

Confirm the procedure succeeded by checking all of the following:

- [ ] [Observable condition 1 — e.g., "Health check endpoint returns HTTP 200"]
- [ ] [Observable condition 2 — e.g., "Error rate returned to baseline within 5
      minutes"]
- [ ] [Observable condition 3 — e.g., "Dashboard shows all instances healthy"]

**Monitoring period:** [How long to watch after completion — e.g., "Monitor for
30 minutes before declaring success"]

---

## Rollback

If the procedure fails or produces unexpected results:

1. [Rollback step 1 — e.g., "Revert database migration: `./migrate rollback`"]
2. [Rollback step 2 — e.g., "Redeploy previous version: `./deploy.sh v1.1.0`"]
3. [Rollback step 3 — e.g., "Verify rollback succeeded using verification checks
   above"]
4. Notify the incident channel that rollback has been executed
5. Preserve logs and metrics for post-incident analysis

**Rollback time estimate:** [X minutes]

---

## Escalation

If rollback fails or the situation worsens:

| Condition                          | Escalate To         | Contact          |
| ---------------------------------- | ------------------- | ---------------- |
| [Condition — e.g., "Rollback       | [Role — e.g.,       | [Contact method] |
| fails"]                            | "Engineering Lead"] |                  |
| [Condition — e.g., "Data integrity | [Role — e.g.,       | [Contact method] |
| concerns"]                         | "VP Engineering"]   |                  |

---

## Notes

[Known edge cases, gotchas, or environment-specific variations. Examples:]

- [Environment difference — e.g., "In staging, use port 5433 instead of 5432"]
- [Timing consideration — e.g., "Avoid running during peak hours (9-11 AM ET)"]
- [Dependencies — e.g., "Requires the cache flush runbook to be run first if
  cache is stale"]

**Change log:**

| Date       | Author | Change                  |
| ---------- | ------ | ----------------------- |
| YYYY-MM-DD | [Name] | Initial runbook created |

<!-- Template Last Updated: 2026-02-28 | Added in v0.17.0 -->

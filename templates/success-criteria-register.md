<!-- For guidance on measurement across stages, see guides/framework.md#measurement-throughline -->

# Success Criteria Register

**Purpose:** Single source of truth for project success criteria — goals,
metrics, baselines, targets, and tracking status.

**Usage:** Created during Initiation and referenced throughout all stages. See
the "How This Register Is Used" table below for stage-by-stage usage, and the
[Measurement Throughline](../guides/framework.md#measurement-throughline) for
how criteria flow through the framework.

**Project:** [Project Name] **Created:** YYYY-MM-DD **Last Updated:** YYYY-MM-DD
**Owner:** [Name / Role]

---

## Success Criteria

| Goal                  | Metric            | Baseline                 | Target                     | Measurement Method                        | Status                                  | Last Measured |
| --------------------- | ----------------- | ------------------------ | -------------------------- | ----------------------------------------- | --------------------------------------- | ------------- |
| [Business outcome]    | [Specific metric] | [Current value or "TBD"] | [Target value + timeframe] | [How measured — dashboard, query, manual] | [Not started / Tracking / Met / Missed] | YYYY-MM-DD    |
| [Operational outcome] | [Specific metric] | [Current value]          | [Target value]             | [How measured]                            | [Status]                                | YYYY-MM-DD    |
| [Adoption outcome]    | [Specific metric] | [Current value]          | [Target value]             | [How measured]                            | [Status]                                | YYYY-MM-DD    |

<!-- Keep this table as the single source of truth for project success criteria.
     Other stages reference this register rather than duplicating criteria.
     See guides/framework.md#measurement-throughline for how criteria flow through stages. -->

---

## How This Register Is Used

| Stage              | Usage                                               |
| ------------------ | --------------------------------------------------- |
| **Initiation**     | Create register; define goals, metrics, and targets |
| **Requirements**   | Ensure NFRs trace to register criteria              |
| **System Design**  | Plan instrumentation to measure register criteria   |
| **Implementation** | Implement measurement systems                       |
| **Verification**   | Validate measurement systems work                   |
| **Deployment**     | Capture baseline measurements                       |
| **Support**        | Track actuals vs. targets; report progress          |

---

## Measurement Details (Optional)

<!-- For each success criterion, expand on the summary table above with
     details that downstream stages (System Design, Implementation) consume. -->

### [SC-ID]: [Goal Name]

- **Precise definition:** [Exactly what is measured and how edge cases are
  handled]
- **Measurement frequency:** [Real-time / daily / weekly / per-event]
- **Baseline validation plan:** [How baseline will be established — sample size,
  time window, data source]
- **Instrumentation needed:** [Dashboard, query, API endpoint, manual process]
- **Decision triggers:** [What actions are taken if metric misses target]

---

## Revision Log

| Date       | Change           | Rationale | Approved By |
| ---------- | ---------------- | --------- | ----------- |
| YYYY-MM-DD | Initial creation | [Why]     | [Name]      |

<!-- Template Last Updated: 2026-04-05 | Added in v0.29.0 -->

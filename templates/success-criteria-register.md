<!-- For guidance on measurement across stages, see guides/framework.md#measurement-throughline -->

# Success Criteria Register

**Purpose:** Single source of truth for project success criteria — each mapped
to the Initiation Brief goals it verifies, with metrics, baselines, targets, and
tracking status.

**Usage:** Created during Initiation and referenced throughout all stages. See
the "How This Register Is Used" table below for stage-by-stage usage, and the
[Measurement Throughline](../guides/framework.md#measurement-throughline) for
how criteria flow through the framework.

**Project:** [Project Name] **Created:** YYYY-MM-DD **Last Updated:** YYYY-MM-DD
**Owner:** [Name / Role]

---

## Success Criteria

| SC ID | Goal(s) | Metric            | Baseline                 | Target                     | Measurement Method                        | Status                                  | Last Measured | Re-check Date  |
| ----- | ------- | ----------------- | ------------------------ | -------------------------- | ----------------------------------------- | --------------------------------------- | ------------- | -------------- |
| SC-01 | G-1     | [Specific metric] | [Current value or "TBD"] | [Target value + timeframe] | [How measured — dashboard, query, manual] | [Not started / Tracking / Met / Missed] | YYYY-MM-DD    | YYYY-MM-DD / — |
| SC-02 | G-1     | [Specific metric] | [Current value]          | [Target value]             | [How measured]                            | [Status]                                | YYYY-MM-DD    | YYYY-MM-DD / — |
| SC-03 | G-2     | [Specific metric] | [Current value]          | [Target value]             | [How measured]                            | [Status]                                | YYYY-MM-DD    | YYYY-MM-DD / — |

<!-- Keep this table as the single source of truth for project success criteria.
     Other stages reference this register rather than duplicating criteria.
     Goal(s): the Initiation Brief goal ID(s) this criterion verifies — usually
     one; list several only when the metric genuinely serves multiple goals.
     Re-check Date: for criteria that need time to measure (e.g., adoption over a
     quarter), the committed date to re-measure. Set at project close-out for any
     criterion not yet Met; leave "—" once Met or when measured continuously.
     See guides/framework.md#measurement-throughline for how criteria flow through stages. -->

---

## How This Register Is Used

| Stage              | Usage                                                                               |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Initiation**     | Create register; define goals, metrics, and targets                                 |
| **Requirements**   | Ensure NFRs trace to register criteria                                              |
| **System Design**  | Plan instrumentation to measure register criteria                                   |
| **Implementation** | Implement measurement systems                                                       |
| **Verification**   | Validate measurement systems work                                                   |
| **Deployment**     | Capture baseline measurements                                                       |
| **Closure**        | Track actuals vs. targets; confirm each criterion is Met or carries a Re-check Date |

---

## Measurement Details (Optional)

<!-- For each success criterion, expand on the summary table above with
     details that downstream stages (System Design, Implementation) consume. -->

### [SC-ID]: [Success Criterion Name]

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

<!-- Template Last Updated: 2026-06-21 | Added in v0.29.0. SC ID and Goal(s) columns added in v0.45.0. Re-check Date column + Close-Out usage row added in v0.47.0. v0.49 vocabulary/dev-ops-split sweep; Close-Out usage row folded into Closure. -->

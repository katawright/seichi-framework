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

| SC ID | Goal(s) | Metric            | Baseline                 | Target                     | Measurement Method                        | Status                                                                 | Last Measured | Re-check Date  |
| ----- | ------- | ----------------- | ------------------------ | -------------------------- | ----------------------------------------- | ---------------------------------------------------------------------- | ------------- | -------------- |
| SC-01 | G-1     | [Specific metric] | [Current value or "TBD"] | [Target value + timeframe] | [How measured — dashboard, query, manual] | [not-started / met / not-met / deferred / blocked / revised / dropped] | YYYY-MM-DD    | YYYY-MM-DD / — |
| SC-02 | G-1     | [Specific metric] | [Current value]          | [Target value]             | [How measured]                            | [Status]                                                               | YYYY-MM-DD    | YYYY-MM-DD / — |
| SC-03 | G-2     | [Specific metric] | [Current value]          | [Target value]             | [How measured]                            | [Status]                                                               | YYYY-MM-DD    | YYYY-MM-DD / — |

<!-- Keep this table as the single source of truth for project success criteria.
     Other stages reference this register rather than duplicating criteria.
     Goal(s): the Initiation Brief goal ID(s) this criterion verifies — usually
     one; list several only when the metric genuinely serves multiple goals.
     Status: the canonical success-criterion set — see
     spec/canonical-state.md#planning-family-status-sets. A criterion that will
     not be pursued rests dropped, never blank; delivered-but-measured-unmet
     rests not-met (a finding, not a failure of the record).
     Re-check Date: for criteria that need time to measure (e.g., adoption over a
     quarter), the committed date to re-measure. Set at project close-out for any
     criterion still awaiting measurement; leave "—" once the criterion rests at
     its outcome or is dropped, or when measured continuously.
     See guides/framework.md#measurement-throughline for how criteria flow through stages. -->

---

## How This Register Is Used

| Stage                | Usage                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Initiation**       | Create register; define goals, metrics, and targets                                                    |
| **Requirements**     | Ensure NFRs trace to register criteria                                                                 |
| **System Design**    | Plan instrumentation to measure register criteria                                                      |
| **Increment Design** | Specify what to measure per increment; plan the test strategy against register criteria                |
| **Implementation**   | Implement measurement systems                                                                          |
| **Verification**     | Validate measurement systems work                                                                      |
| **Deployment**       | Capture baseline measurements                                                                          |
| **Closure**          | Track actuals vs. targets; confirm each criterion rests at an honest status or carries a Re-check Date |

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

<!-- Template Last Updated: 2026-07-18 | Added in v0.29.0. -->

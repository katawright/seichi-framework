<!-- For guidance on the project close-out, see the Closure stage README
     (Project Closure: Rendering the Completion Contract) at
     ../stages/closure/README.md and stages/closure/checklist.md. This summary is
     the human-readable render of the completion contract — see
     ../spec/canonical-state.md#project-level-completion. Reference other
     artifacts by stable ID + label (SC-03, IDEA-014, ADR-D01, F-007), not
     relative links, so IDs stay resolvable in every viewer. -->

# Project Close-Out Summary

**Purpose:** The human-readable render of the **completion contract** — the
bookend to the Initiation Brief: why it happened, how it went, what it achieved,
what is incomplete, and what is next. It is a view over structured state, not a
second source of truth.

**Usage:** Produced at project Closure alongside the Closure Checklist.
Synthesize from existing artifacts (Initiation Brief, success criteria register,
retrospective, idea backlog) — reference them by ID, do not restate them. The
sections below carry the
[six irreducible elements](../spec/delegated-run.md#completion-evidence-package)
that never drop at any consequence level.

**Project:** [project name] **Started:** YYYY-MM-DD **Closed:** YYYY-MM-DD
**Owner:** [name / role]

**As of:** [state version this view was rendered from — in file mode, also the
commit; see ../spec/canonical-state.md#minimum-canonical-project-state]

<!-- Completion status renders the project lifecycle (see
     ../spec/canonical-state.md#project-lifecycle). There is no stored
     disposition field: "delivered" IS the terminal + reason (closed /
     accepted), and realized extent is the AC disposition table below — a view
     never stores a second rollup of either. -->

**Completion status:** [Claimed / Verified / **Closed** — reason: accepted /
acceptance-declined / acceptance-lapsed]

---

## Why — Objective and Scope

<!-- Element 1: approved objective and scope. Pull the problem and goals forward
     from the Initiation Brief (cite goal IDs — G-1, G-2). In a few sentences,
     state what this project set out to do and why it mattered, so a reader needs
     no other document to understand intent. -->

[why and approved scope]

---

## What Was Delivered

<!-- Element 2 (final delivered result) + Element 3 (requirements disposition).
     Reconcile every acceptance criterion: Met, Descoped, or Deferred — a final
     pass over the traceability chain, against the closed set in
     ../spec/canonical-state.md#project-level-completion (CS-097). EVERY
     in-scope requirement is explicitly disposed; this is the honesty floor and
     never folds. Descoped cites the governing scope decision. Deferred cites
     the explicit future — idea backlog (IDEA-NNN) or carry-forward condition.
     There is no Unmet: an in-scope unmet criterion blocks the completion
     claim; fix it, descope it, or defer it. -->

[delivered result — what is live]

| AC   | Outcome (Met / Descoped / Deferred) | Notes |
| ---- | ----------------------------------- | ----- |
| AC-1 | …                                   | …     |

---

## How It Went

<!-- Minimal: a 2–3 sentence narrative is enough; the timeline table is optional. -->
<!-- A short narrative: key decisions and pivots (cite ADR-DCC), what changed from
     the original plan, and a timeline of milestones. With dedicated tooling this
     timeline can be assembled from audit / gate data; in manual mode, author it
     from the gate decisions and session logs. -->

[narrative]

**Timeline:**

| Date       | Milestone               |
| ---------- | ----------------------- |
| YYYY-MM-DD | [e.g., Gate 1 approved] |

---

## Outcomes — Success Criteria and Assurance

<!-- Element 4: assurance result at the required level (recorded even when the
     required level is None/Self). Plus each success criterion against its
     Initiation target (cite SC IDs). Result: the criterion's final outcome
     status — met, not-met, or dropped (see
     spec/canonical-state.md#planning-family-status-sets). A criterion that
     needs time to measure leaves Result "—" and records a Re-check Date
     (mirrors the success criteria register) rather than staying open-ended;
     it lands its outcome status when the measurement reports. -->

**Assurance result:** [None / Self / Internal / External — and the conclusion]

| SC    | Target | Result (met / not-met / dropped) | Re-check Date  | Notes |
| ----- | ------ | -------------------------------- | -------------- | ----- |
| SC-01 | …      | …                                | YYYY-MM-DD / — | …     |

---

## Honest Incomplete — Defects, Risks, Limitations

<!-- Element 5: the honesty floor — never folds. Disclose known defects,
     unresolved risks, limitations, and deferred work. An empty section is a
     claim that there are none; say so explicitly rather than omitting it. -->

- **Known defects:** [or "none known"]
- **Unresolved risks / limitations:** [or "none"]
- **Deferred work:** [cite IDEA-NNN]

---

## Acceptance and What's Next

<!-- Element 6: the acceptance decision (may coincide with the completion claim,
     but recorded) — an [H] floor act: record a unique authorized party on the
     project's authorized-party roster, not a bare role (see
     ../spec/canonical-state.md#authorized-parties-for-floor-decisions). What
     gates closure is that the decision was MADE AND RECORDED, not that it was
     positive — a declined or lapsed acceptance also closes, and the outcome
     rides as the closed reason. Exception for LAPSED: it exists precisely for
     the case where the acceptance party is gone (owner departed, client
     silent), so it is recorded by an administrator — a human act, but not the
     rostered acceptance party who records accepted / acceptance-declined. Plus
     the
     forward-looking close: success
     criteria still pending re-check (with dates), and open product ideas that
     may seed future projects (cite IDEA-NNN). A pending release flip — an
     increment deployed dark, not yet user-visible — is a handoff obligation:
     record its owner and trigger (date or criteria) so the flip is owned after
     closure, alongside the production-ownership transfer. The running system,
     if any, continues under Operations — see ../guides/operations.md. -->

- **Acceptance decision:** the outcome itself is recorded once, as the `closed`
  reason in Completion status above — by [a unique authorized party — name +
  stable id — on the project's authorized-party roster; a solo owner suffices] —
  Date: YYYY-MM-DD
- **Handoff to Operations:** [operational handoff record produced — yes / N/A]
- **Pending release flips:** [none / flag or increment — owner, trigger (date or
  criteria)]
- **Pending re-checks:** [SC-NN — Re-check Date]
- **Open ideas:** [IDEA-NNN — short title]

---

## Learnings

<!-- Routed by owner (see the Learning Loop). Cite each by ID + label. Filing each
     item to its tracker is a human-authorized action — list them here so nothing
     is stranded. -->

- **Product** (→ idea backlog): [IDEA-NNN — short title]
- **Process** (→ operator-named tracker): [F-NNN — short title]
- **Tooling** (→ operator-named tracker): [F-NNN — short title]

---

<!-- Template Last Updated: 2026-07-18 | Added in v0.47.0. -->

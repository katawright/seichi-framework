<!-- For guidance on the project close-out, see the Closure stage README
     (Project Closure: Rendering the Completion Contract) at
     ../stages/closure/README.md and stages/closure/checklist.md. This summary is
     the human-readable render of the completion contract — see
     ../spec/delegated-run.md#project-level-completion. Reference other artifacts
     by stable ID + label (SC-03, IDEA-014, ADR-D01, F-007), not relative links,
     so IDs stay resolvable in every viewer. -->

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

**Completion status:** [Claimed / Verified / Accepted / **Closed**] **Final
disposition:** [Delivered / Delivered with descope / Sunset / Cancelled]

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
     pass over the traceability chain. EVERY in-scope requirement is explicitly
     disposed; this is the honesty floor and never folds. Deferred items that
     remain valuable route to the idea backlog (cite IDEA-NNN). -->

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
     Initiation target (cite SC IDs). For criteria that need time to measure,
     record a Re-check Date (mirrors the success criteria register) rather than
     leaving them open-ended. -->

**Assurance result:** [None / Self / Internal / External — and the conclusion]

| SC    | Target | Result (Met / Missed / Pending) | Re-check Date  | Notes |
| ----- | ------ | ------------------------------- | -------------- | ----- |
| SC-01 | …      | …                               | YYYY-MM-DD / — | …     |

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
     but recorded). Plus the forward-looking close: success criteria still pending
     re-check (with dates), and open product ideas that may seed future projects
     (cite IDEA-NNN). The running system, if any, continues under Operations —
     see ../guides/operations.md. -->

- **Accepted by:** [name / role] — Date: YYYY-MM-DD
- **Handoff to Operations:** [operational handoff record produced — yes / N/A]
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

<!-- Template Last Updated: 2026-06-21 | Added in v0.47.0 (as Support's Project Close-Out). Recast in v0.49.0 as the rendered view of the completion contract, owned by the Closure stage. -->

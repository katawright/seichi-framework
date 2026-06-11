<!-- For guidance on completing this brief, see frameworks/v0.48.0/stages/initiation/README.md -->

# Initiation Brief — Fridge Tracker

**Last Updated:** 2026-06-10

## Right-Sizing This Brief

**Tier chosen:** Minimal [ASSUMED]

**Project type:** Greenfield [ASSUMED]

**Deployment intent:** Production service (personal mobile app) [ASSUMED]

**AI autonomy:** Collaborative [ASSUMED]

**Oversight intensity:** Active [ASSUMED]

---

## Problem Statement

Two working adults sharing a household fridge — with no designated "fridge
manager" — lose approximately $50–100/month in food because perishables fall out
of sight and mind. Items accumulate, get forgotten, and are thrown out during
periodic clean-outs (roughly every one to two weeks). Every tracking system
attempted — a physical whiteboard and at least one dedicated app — has failed at
the same point: adding items requires too much effort, the list drifts out of
sync, trust collapses, and the system is abandoned. Secondary costs include the
guilt of the recurring "ugh, again" discovery moment and unnecessary takeout
orders driven by the false sense that there is nothing to eat.

Success looks like: food is eaten before it expires, the Sunday clean-out
produces nothing slimy, and the household defaults to cooking what it already
has rather than ordering takeout.

---

## Business Case + Why Now

- **Value:** ~$600–1,200/year in wasted food (quantifiable, recurring). Secondary
  value: reduced guilt and fewer unnecessary takeout orders (rough additional
  savings of $20–50 per avoided takeout).
- **Urgency:** The problem is already established and actively recurring. Continued
  inaction means continued waste on a predictable weekly cycle.
- **Why build rather than use existing tools:** Existing apps (Fridgely and similar)
  have been tried and abandoned for the same reason as the whiteboard — item entry
  is too burdensome. The gap is not that no product exists; it is that no product
  has solved the friction problem well enough for this household to sustain use.

---

## Goals

- **G-1:** Perishables in the fridge are used before they go off rather than thrown
  out.
  - **Why:** Reducing food waste is the core outcome the project delivers; today it
    is absent because items fall out of sight and mind.
- **G-2:** The household orders fewer unnecessary takeout meals driven by the false
  perception that the fridge is empty.
  - **Why:** The takeout default is a direct and recurring secondary cost of not
    knowing what is available to cook.

---

## Success Criteria

- **SC-01:** Monthly food waste cost drops by 50% or more within the first month of
  consistent use. [ASSUMED baseline: ~$50–100/month by user estimate; no prior
  measurement exists — first month of use establishes the actual baseline.]
  - **Goals:** G-1
  - **Why:** The financial loss is the primary stated cost; halving it is a
    meaningful threshold that justifies the build effort.
- **SC-02:** The inventory-maintenance habit is still active at day 30 (at least one
  item logged in the past 7 days). Baseline: prior systems lasted approximately
  1 week before abandonment.
  - **Goals:** G-1, G-2
  - **Why:** Longevity past the prior failure point is the existential check —
    if the system dies at week 2, no other criterion is reachable.
- **SC-03:** At least one unnecessary takeout order per month is avoided because the
  app surfaced available food. [ASSUMED — self-reported by user.]
  - **Goals:** G-2
  - **Why:** The takeout-default behaviour is a distinct cost worth tracking
    separately from raw waste.

---

## Scope Boundaries and Non-Goals

### In Scope

- Mobile app (iOS or Android — platform TBD) for tracking fridge contents
- Expiry and freshness alerts pushed to the user's phone
- Single-user operation as the baseline (partner use is a bonus, not required)
- Fridge contents only (v1)

### Out of Scope / Non-Goals

- Recipe suggestions or meal planning (not v1)
- Grocery list or shopping integration (not v1)
- Freezer or pantry tracking (not v1 — fridge only)
- Multi-household sharing or social features
- Smart fridge or hardware sensor integration
- Nutritional tracking

---

## Gate 1 — Proposed Decision Criteria

**Proposed criteria:**

- **Proceed if:** The problem statement is validated as accurately describing the
  household's experience; the builder has a credible hypothesis for solving data
  entry friction that is meaningfully different from what existing apps do; and
  no unmitigated blocking constraint exists (time, platform skills).
- **Revise if:** The problem is real but the friction hypothesis is unclear — spike
  the data entry approach before committing to a full build.
- **Stop if:** A thorough evaluation of existing apps reveals one that already
  solves the friction problem and just needs to be used more consistently.

> **Solo self-gate:** At Minimal tier, Gate 1 collapses to one question: *"Knowing
> what the brief now says, do I still want to build this?"* Record the answer and
> the date as a note here. "Yes, but smaller" is a valid outcome.

**Next step if proceeding:** Brief becomes input to Requirements stage.

---

## Project Lead and Stakeholders

- **Project lead:** User (sole builder and primary user)
- **Approvers (Gate 1):** User (self-gate)
- **Consulted:** Partner (primary secondary user — input useful on what items
  are typically lost and what notifications would be actionable)
- **Informed:** N/A

---

## Assumptions (Top 5)

1. **[ASSUMED] Data entry can be made low-friction enough to outlast prior
   attempts.** This is the core design question. The mechanism (photo + AI
   recognition, barcode scan, voice, receipt scan, or something else) is
   undecided. If no credible lower-friction approach exists, the app will fail
   at the same point as the whiteboard and existing apps.
2. **[ASSUMED] One person maintaining the inventory produces enough signal to be
   useful even when the partner does not participate.** The user has scoped this
   correctly but it is untested — if the partner's items dominate the waste, a
   single-user list may miss too much.
3. **[ASSUMED] The problem is primarily "forgetting what's there," not "buying
   too much."** Inventory tracking does not fix overbuying. If the root cause is
   purchasing behaviour rather than visibility, the impact will be lower than
   expected.
4. **[ASSUMED] Push notifications are an effective nudge and the user will not
   learn to ignore them.** If notifications become noise, the app degrades to a
   passive list with no behavioural trigger.
5. **[ASSUMED] Existing apps fail at this use case because of friction, not
   because the problem is unsolvable at the consumer level.** At least one app
   (Fridgely or similar) was tried and abandoned. A more thorough evaluation has
   not been done.

---

## Risks / Unknowns (Top 5)

- **Risk:** Data entry friction is not solved — the app requires as much effort as
  existing tools. **Impact if wrong:** Abandonment within 1–2 weeks (same
  pattern as whiteboard and prior app). **Likelihood:** H. **Mitigation:**
  Treat the data-entry mechanism as the first design spike before committing to
  a full build; do not proceed past Requirements without a concrete hypothesis.

- **Risk:** Partner non-participation causes enough uncaptured items that the list
  drifts wrong and trust collapses. **Impact if wrong:** Same trust-collapse
  pattern as prior systems, even if the user is consistent. **Likelihood:** M.
  **Mitigation:** Design for graceful partial-data operation — the app should be
  useful with an incomplete list, not brittle to it.

- **Risk:** An existing app already solves this adequately and was abandoned due to
  setup friction rather than a fundamental design gap. **Impact if wrong:** Wasted
  build effort. **Likelihood:** L–M. **Mitigation:** Brief evaluation of 2–3
  existing apps before starting Requirements; document what specifically failed.

- **Risk:** Notification fatigue — alerts are ignored after the first week.
  **Impact if wrong:** G-1 is not achieved; the app becomes a passive list
  nobody checks. **Likelihood:** M. **Mitigation:** Design notifications to be
  actionable (what to make, not just "expires soon"); allow snooze and
  frequency tuning.

- **Risk:** Builder loses motivation before the friction problem is solved, since
  the hard design question (data entry) must be answered first and may take
  longer than expected. **Impact if wrong:** Project stalls at design. **Likelihood:** M.
  **Mitigation:** Timebox the data-entry spike to one week; if no credible
  approach emerges, revisit the build decision.

---

## Pre-Mortem

- **Failure mode:** The app is set up enthusiastically but data entry friction
  causes abandonment within two weeks — identical to the whiteboard outcome.
  **Why plausible:** The user explicitly identified this pattern as their prior
  failure mode with both physical and digital systems; the fundamental obstacle
  (adding items is a chore) has not been solved yet. **Early signal:** Items
  added per day drops to zero or near-zero within the first week.

- **Failure mode:** The app works for the user but the partner never participates,
  so items the partner buys or uses are never logged; the list becomes
  unreliable; the user stops trusting it. **Why plausible:** The user scoped
  this as "just me is enough" but it is an untested assumption — half the
  household's food may never be captured. **Early signal:** Expired items
  consistently found in the fridge that the app did not flag.

- **Failure mode:** The app is built and used but the actual source of waste turns
  out to be overbuying, not forgetting — so waste continues even with perfect
  inventory awareness. **Why plausible:** The user described the problem as
  forgetting, but the volume ($50–100/week) may also reflect purchasing habits.
  **Early signal:** App shows items expiring that the user was already aware of
  but had no time to cook.

---

## Data Sensitivity and Compliance

**Data sensitivity:** Internal (household only)

**Compliance scope:** None

**Notes:** App stores personal food inventory data. No PII beyond what the user
chooses to enter; no financial, health, or regulated data. If a cloud sync
feature is added later, standard app-store data handling practices apply.

---

## Constraints and Dependencies

- **Constraints:**
  - Solo builder — no team to split design and development work
  - Budget: personal project, no allocated budget; prefer free or low-cost
    infrastructure [ASSUMED — not explicitly stated]
  - Platform skills: mobile development stack unknown / TBD
- **Dependencies:**
  - No external team dependencies
  - If photo-based item recognition is pursued, dependency on a vision API
    (e.g., cloud vision service) — cost and accuracy TBD

---

## Options Considered (At Least One Alternative)

- **Option A — Build a new app from scratch.** Pro: full control over UX; can
  design specifically around low-friction entry. Con: significant build time;
  the hard design problem (data entry) must be solved, not assumed.
- **Option B — Adopt an existing app more rigorously** (Fridgely, NoWaste,
  Grocy, or similar). Pro: zero build time; mature feature set. Con: user
  already tried this category and hit the same friction wall; no evidence a
  different app would behave differently without a specific reason.
- **Option C — Physical system (whiteboard, magnetic tiles).** Pro: zero
  digital friction; always visible. Con: user tried this; died within one week
  at the adding step; no expiry alerting.
- **Recommendation:** Option A — but only after a short spike on the data-entry
  mechanism. If the spike does not produce a credible lower-friction approach,
  revisit Option B with a specific app and a specific entry mechanism before
  committing to a build.

---

## Range-Based Estimation

- **Confidence:** Low — the data-entry mechanism is undecided and it is the
  primary driver of scope and complexity.
- **Rough range:** 4–12 weeks of evenings/weekends for a functional v1 (assuming
  solo builder, ~5–10 hrs/week). Lower bound assumes a simple manual-entry
  approach; upper bound assumes integration with a vision or barcode API.
- **Key unknown driving range:** How will items be entered? Each mechanism
  (manual text, barcode scan, photo + AI, voice, receipt OCR) has materially
  different implementation cost and third-party dependencies.

---

## Self-Validation Against Initiation Checklist

> To be completed before Gate 1 review.

- [ ] Pre-filled Initiation Checklist with self-assessment and evidence for each item
- **Items needing attention:** Estimation confidence is Low pending data-entry
  mechanism decision; Options Considered notes that Option B deserves a brief
  re-evaluation before committing to a build.

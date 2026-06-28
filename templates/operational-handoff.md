<!-- For guidance on the operational handoff, see the Closure stage README
     (The Operational-Envelope Handoff Record) at ../stages/closure/README.md.
     This record is what an Operations ownership span is operated against —
     see ../guides/operations.md. Reference other artifacts by stable ID +
     label (SC-03, ADR-D01, F-007), not relative links, so IDs stay resolvable
     in every viewer. -->

# Operational Handoff Record

**Purpose:** The dev→ops seam — the six-item account an operator needs to run a
system they did not build. Produced at Closure when production ownership
transfers; operated against in the [Operations](../guides/operations.md)
process.

**Usage:** Complete at project Closure, before the production-ownership
transfer. For a Lights-Out span, this record _is_ the operating envelope the
agent runs within — items 2, 3, and 4 are load-bearing.

**System:** [system name] **Project:** [project name] **Handoff date:**
YYYY-MM-DD **From (delivery):** [name / role] **To (operations owner):** [name /
role / "delegated agent under policy"]

---

## 1. Identity & Observability

<!-- What the system is, where it runs, and how you tell whether it is healthy. -->

- **What it is:** [one-line description of the system and what it does]
- **Where it runs:** [environment, region, key infrastructure]
- **Health signals:** [dashboards, key metrics, what "healthy" looks like — link
  by location]
- **Liveness:** [how you know it is alive and serving, and the expected cadence
  of signals]

---

## 2. Ongoing Operating Envelope

<!-- What the system is authorized to do, and the bounds it must stay within.
     For a Lights-Out span this is the envelope the agent runs within. -->

- **In-envelope operation:** [normal operating range — load, behaviors, scopes
  it is authorized for]
- **Consequence level:** [Negligible / Low / Moderate / High / Critical — sets
  the autonomy floors; see ../guides/right-sizing.md]
- **Out-of-envelope triggers:** [conditions that mean the system has left its
  envelope and must stop or escalate]

---

## 3. Stop & Rollback

<!-- The levers an operator pulls under pressure. -->

- **How to stop it safely:** [the safe-stop procedure]
- **How to roll back:** [revert to a prior version / state — the command or
  runbook, link by location]
- **Independent stop enforcement:** [for a Lights-Out span — what halts the
  system without the acting agent's cooperation]

---

## 4. What Must Stay True

<!-- The invariants the running system must preserve. Item 4 never folds — at any
     consequence level, persisting compliance obligations are captured here. -->

- **Invariants:** [the properties that must hold for the system to be correct
  and safe]
- **Persisting compliance obligations:** [any regulatory, contractual,
  certification, or internal-policy obligation that continues in operation —
  source + what it requires; "none" if genuinely none]
- **Data obligations:** [retention, residency, privacy constraints that
  operation must honor]

---

## 5. Ops Decision Rights

<!-- Who owns which operational decisions, and which stay non-delegable. -->

| Decision                        | Owner                   | Delegable?                       |
| ------------------------------- | ----------------------- | -------------------------------- |
| Routine remediation (no code)   | [role / agent + policy] | [up to consequence floor]        |
| Software change (re-enters dev) | [delivery owner]        | No — routes to Flow or a project |
| Irreversible / high-consequence | [named human]           | No — non-delegable human gate    |

<!-- Standard+: add escalation contacts and the decision-response window. -->

---

## 6. Known-State Ledger

<!-- The system as it really is — not as designed. -->

- **Open issues:** [known bugs, instabilities — cite IDs]
- **Deferred work:** [scope deferred from this project — cite IDEA-NNN where it
  may seed future work]
- **Known limitations:** [what the system does not do, or does not do well]
- **Recent changes:** [last deployment, recent config changes, anything in
  flight]

---

## Acceptance

**Production ownership accepted by:** [name / role] — Date: YYYY-MM-DD

<!-- Record the acceptance as a checkpoint decision (../templates/checkpoint-decision.md).
     At Negligible/Low consequence this may be an implicit self-acceptance;
     at High/Critical it is an explicit, possibly non-delegable, sign-off. -->

<!-- Template Last Updated: 2026-06-28 | Added in v0.49.0. -->

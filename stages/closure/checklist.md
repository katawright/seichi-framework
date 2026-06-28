# Closure Checklist

**Purpose:** Confirm a project is properly closed — the system handed off,
ownership transferred, completion reconciled, learnings routed, and a readable
close-out summary produced.

**Usage:** Run once at project wrap-up, after the final increment is delivered
(or when the project is sunset). The terminal bookend to the Initiation gate.

---

> **Markers.** _Unmarked_ — mechanical; an agent verifies directly. **[J]** —
> needs judgment, but whether a human, a delegated agent, or pre-authorized
> policy provides it is an operating-model choice. **[H]** — the non-delegable
> floor: **human-owned** regardless of operating model, discharged either
> interactively **or** by pre-authorized policy, never a delegated agent
> (interactive-only at Critical). The marker says only _whether an agent may
> discharge the item_; whether an **[H]** item clears interactively or by policy
> is resolved per project by the consequence + compliance floor (see the
> [Operating Model Guide](../../guides/operating-model.md)), not by the marker.

> **Lights-Out preset:** an agent completes the full checklist and presents
> results for review. **[H]** items stay human-owned — cleared interactively or
> by pre-authorized policy per the operating model.

> Not every item applies at every scale — mark items N/A with justification when
> they don't fit your project's consequence level. See
> [Right-Sizing Guide](../../guides/right-sizing.md).

---

## Operational Handoff

<!-- Minimal: when there is no running system to operate, mark this section N/A
     with a one-line note ("nothing to operate") and proceed. -->

1. [ ] **Operational handoff record produced** (the six items, using the
       [Operational Handoff Template](../../templates/operational-handoff.md))
2. [ ] **Identity, observability, and stop/rollback documented** (an operator
       can watch the system and revert it safely)
3. [ ] **[J] What-must-stay-true captured, including persisting compliance
       obligations** (the invariants the running system must preserve)
4. [ ] **Known-state ledger current** (open issues, deferred work, known
       limitations, recent changes)

**Gate:** All items checked → operations can run the system safely.

---

## Ownership Transfer

5. [ ] **[H] Production ownership accepted** (a named owner accepts the running
       system against the handoff record, recorded with the
       [Checkpoint Decision Template](../../templates/checkpoint-decision.md))

**Gate:** Checked → someone owns the system in production.

---

## Wrap-Up and Learning

6. [ ] **Project-wrap-up retrospective completed** (Scope: Project Wrap-Up,
       using the [Retrospective Template](../../templates/retrospective.md))
7. [ ] **Friction log fully triaged** (every entry has a Disposition; nothing
       left Open)
8. [ ] **Product ideas routed to the idea backlog** (each one worth keeping has
       an IDEA-NNN document)
9. [ ] **[J] Process and tooling friction routed to its owner** (to the
       operator-named tracker that owns the fix — see
       [The Learning Loop](../../guides/learning-loop.md))

**Gate:** All items checked → learnings are captured and routed, not stranded.

---

## Completion and Outcomes

10. [ ] **Every acceptance criterion is Met, Descoped, or Deferred** (a final
        pass over the traceability chain; no AC left ambiguous)
11. [ ] **Every success criterion is Measured or has a Re-check Date** (recorded
        in the
        [Success Criteria Register](../../templates/success-criteria-register.md))
12. [ ] **Assurance result recorded at the required level** (recorded even when
        the required level is None/Self)
13. [ ] **[J] Known defects, risks, and limitations disclosed** (the completion
        honesty floor — nothing material hidden)
14. [ ] **[J] Initiation goals and success criteria reviewed as a closing act**
        (actuals compared against the original intent)

**Gate:** All items checked → completion is reconciled against the
[completion contract](../../spec/delegated-run.md#project-level-completion).

---

## Close-Out Record

15. [ ] **[J] Project Close-Out Summary produced** (why, how it went, outcomes,
        learnings, what's next — using the
        [Project Close-Out Summary](../../templates/project-closeout.md))

**Gate:** Checked → the project has a durable, readable closing record that
bookends the Initiation Brief.

---

## Final Decision

- [ ] All checklist sections above are complete
- [ ] **[H] Project owner confirms the project is closed**

**Decision:** Closed / Not Closed

**If Not Closed:** Document the outstanding items, resolve, and re-run this
checklist.

---

## Related Documents

- [Closure Stage Guide](README.md)
- [Operational Handoff Template](../../templates/operational-handoff.md)
- [Project Close-Out Summary](../../templates/project-closeout.md)
- [Operations Guide](../../guides/operations.md)
- [Retrospective Template](../../templates/retrospective.md)
- [The Learning Loop](../../guides/learning-loop.md)
- [Success Criteria Register](../../templates/success-criteria-register.md)

---

## Notes

**Last Updated:** 2026-06-28

Added to framework in v0.49.0.

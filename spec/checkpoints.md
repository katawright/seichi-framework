# Checkpoints Spec

## Overview

Normative contracts for checkpoints — the three checkpoint types and their
closed per-type outcome sets, and the security severity-halt rule that binds
checkpoint progression when a security finding is open.

### Why These Contracts

The [Checkpoint Taxonomy](../guides/checkpoints.md) explains the three
checkpoint types for a human operator — why not every checkpoint is a gate, and
how to match the type to the question. An agent recording a checkpoint outcome,
a policy evaluating a gate, and a conformance check deciding whether a recorded
outcome is legal need the same taxonomy as rules: closed sets, exact per-type
binding, and failure behavior. These contracts are that form. Each links back to
the guide for rationale.

### Goals of This Spec

- Fix the three **checkpoint types** and their per-type **closed outcome sets**
  as kernel data, with Stop and proceed-with-conditions bound to gates
- Give the **security severity-halt** rule its normative home: how a security
  finding's severity drives the orchestration response and what an unresolved
  Critical finding does to a gate

### Key Principle

Not every checkpoint is a gate. Gates ask "should we continue?", reviews ask
"does this meet the bar?", alignments ask "are we on the same page?" — and each
type resolves to exactly one outcome from its own closed set. A situation no
listed outcome fits is a gap to raise, not a free-text outcome to invent.

### How to Use This Spec

1. Read
   [**Checkpoint Types and Outcome Sets**](#checkpoint-types-and-outcome-sets)
   for the taxonomy every checkpoint decision records against
2. Read [**Security Severity-Halt**](#security-severity-halt) for the response a
   security finding's severity mandates
3. For who decides each checkpoint, see
   [Operating Model Spec § Authority and Decision Resolution](operating-model.md#authority-and-decision-resolution)
   and the guide's
   [Decision-Rights Matrix](../guides/checkpoints.md#decision-rights-matrix)
4. For the human-facing rationale behind any contract, follow its link back to
   the [Checkpoint Taxonomy](../guides/checkpoints.md)

The six contract fields (Applicability, Inputs, Procedure, Outputs, Evidence,
Failure behavior) follow the [Contract Form](README.md#contract-form).

---

## Checkpoint Types and Outcome Sets

Rationale:
[Checkpoint Taxonomy § Key Principle](../guides/checkpoints.md#key-principle),
[§ Gates](../guides/checkpoints.md#gates),
[§ Reviews](../guides/checkpoints.md#reviews), and
[§ Alignments](../guides/checkpoints.md#alignments).

<!-- rule: CP-001 -->

### CP-001 — Checkpoint types and closed outcome sets (Gate / Review / Alignment)

- **Applicability.** Every governance checkpoint decision the governance profile
  defines — every acceptance, authorization, gate, sign-off, or alignment act
  ([Operating Model Spec § Authority and Decision Resolution](operating-model.md#authority-and-decision-resolution)
  fixes who may resolve it; this rule fixes what a checkpoint is and what it may
  resolve to).
- **Inputs.** The closed sets in
  [`vocabulary/checkpoints.yaml`](vocabulary/checkpoints.yaml) bind as data
  (generated view: [reference.md](generated/reference.md)): `checkpoint_type`
  (`gate` | `review` | `alignment`), `gate_outcome` (`proceed` |
  `proceed-with-conditions` | `revise` | `stop`), `review_outcome` (`ready` |
  `not-ready`), and `alignment_outcome` (`aligned` | `adjustments-needed`).
- **Procedure.** Three checkpoint types, each answering one question with its
  own closed outcome set:

  | Type (identifier)           | Question it answers                              | Outcome set                                               |
  | --------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
  | **Gate** (`gate`)           | Investment decision — should we continue?        | `proceed` · `proceed-with-conditions` · `revise` · `stop` |
  | **Review** (`review`)       | Criteria verification — does this meet the bar?  | `ready` · `not-ready`                                     |
  | **Alignment** (`alignment`) | Stakeholder consensus — are we on the same page? | `aligned` · `adjustments-needed`                          |
  - Each checkpoint resolves to exactly one outcome from its type's set. A
    situation no listed outcome fits is a gap to raise, not a free-text outcome
    to invent.
  - **Stop is a gate-only outcome.** Only a gate carries a real Stop — the
    genuine go/no-go. Reviews resolve `ready` / `not-ready` (remediate and
    retry, never Stop the project); alignments resolve `aligned` /
    `adjustments-needed` (converge, never Stop). Recording a Stop against a
    review or an alignment is a type error: if stopping is genuinely on the
    table, the decision belongs at a gate.
  - **Proceed-with-conditions is likewise gate-only.** Each named condition
    becomes a **tracked carry-forward obligation** in
    [canonical state](canonical-state.md#minimum-canonical-project-state) — with
    an owner, the stage/increment that discharges it, and an Open / Satisfied /
    Blocked / Withdrawn status — never merely minuted at the gate.

- **Outputs.** The checkpoint's recorded outcome — one value from its type's
  set.
- **Evidence.** The durable, attributed checkpoint decision record (gates: the
  [Gate Decision Template](../templates/gate-decision.md); other checkpoints:
  the [Checkpoint Decision Template](../templates/checkpoint-decision.md)), per
  [Canonical-State Spec § Record Requirements](canonical-state.md#record-requirements).
- **Failure behavior.** An outcome outside the checkpoint's type set — including
  a Stop or a proceed-with-conditions recorded against a non-gate — is not a
  valid checkpoint record.

<!-- /rule: CP-001 -->

---

## Security Severity-Halt

Rationale:
[Roles Guide § Security Escalation Protocol](../guides/roles.md#security-escalation-protocol)
— the halt-communication protocol and the defect-report conventions stay there;
this contract is the binding severity-to-response mapping the boundary ADR
assigned a spec home alongside the checkpoint vocabulary. It carries no kernel
rule ID (it is not in the first-slice registry); it binds as an ordinary spec
contract.

**Applicability.** Any security finding AppSec identifies during any stage.

**Inputs.** The finding; its severity classification. Severity follows the
project's defect-management definitions (see
[Verification Reference: Defect Management](../stages/verification/reference.md#defect-management));
for security findings, classify on exploitability and blast radius — Critical =
exploitable with no authentication or user interaction required and broad blast
radius (e.g., RCE, auth bypass, mass data exposure); High = exploitable but
requires authentication or has limited blast radius.

**Procedure.**

- The severity determines the orchestration response:

  | Severity     | Orchestration response                                                                                                                                                                               |
  | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **Critical** | Halt stage; finding must be resolved before proceeding to next checkpoint. If unresolved at a gate decision, the gate cannot proceed until the finding is resolved or formally downgraded by AppSec. |
  | **High**     | Conditional proceed; finding tracked with fix deadline before deployment                                                                                                                             |
  | **Medium**   | Track in defect backlog; fix targeted for current or next increment                                                                                                                                  |
  | **Low**      | Log in backlog; address opportunistically                                                                                                                                                            |

- AppSec has unilateral authority to pause any stage for a Critical finding; the
  stage's Responsible role must resolve the finding before work resumes.
- At Enterprise tier, Critical and High findings require documented
  fix/accept/defer decisions with AppSec sign-off.

**Outputs.** The orchestration response for the finding's severity.

**Evidence.** The finding's defect report and its resolution or formal downgrade
record (report format and the `{parent}-appsec-addendum` naming per the
[Roles Guide § Security Escalation Protocol](../guides/roles.md#security-escalation-protocol)).

**Failure behavior.** An unresolved, undowngraded Critical finding at a gate
leaves the gate unable to proceed — halting is the rule's own consequence, not
an exception path.

---

## Scope Boundary

This spec fixes the checkpoint taxonomy and the severity-halt response. It does
not assign decision rights per checkpoint (the
[Decision-Rights Matrix](../guides/checkpoints.md#decision-rights-matrix) and
the [Operating Model Spec](operating-model.md) do), does not map checkpoints to
stages (stage READMEs carry their own checkpoint front matter), and does not
prescribe storage for checkpoint records (semantics, not storage).

---

## Notes

**Last Updated:** 2026-07-16

Added to framework in v0.64.0.

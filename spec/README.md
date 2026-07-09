# Specification Layer

## Overview

The agent- and conformance-facing normative layer of the framework — the
executable contracts a capable agent environment follows to operate a project
without human interpretation of missing rules.

### Why a Spec Layer

The guides explain _why_ and _how_ for a human operator: rationale, examples,
when to choose what. That is the wrong register for an agent that must run a
bounded delegated span unattended and for a conformance check that must decide
whether a tool honors the framework. Those readers need the rules stated as
contracts — exact applicability, inputs, procedure, outputs, evidence, and
failure behavior — in normative voice (MUST / MUST NOT). The spec is that layer.
It does not restate the guides; it fixes what they describe.

### Goals of This Spec

- State the operating-model, delegated-run, parallel-batch, and canonical-state
  rules as executable contracts an agent can follow from the Markdown alone
- Give conformance a precise target — what a tool must honor to claim it
  operates the framework
- Fix the **semantics** of operation (what must hold), not the **storage** (no
  schema, API, or vendor is prescribed)
- Stay scoped to what bounded **Lights-Out** operation requires; defer scale and
  deep-operations contracts as `[Reserved]`

### Key Principle

The framework **specifies**; a tool **enforces**. The spec defines the floors,
ceilings, required functions, separations, and stop conditions as normative
rules; it cannot itself detect or block a violation. A tool that operationalizes
the framework detects "outside the envelope" and holds the work. A spec rule is
therefore written so that a conforming enforcer can evaluate it — and so that
**missing coverage narrows the envelope** rather than silently proceeding.

### How to Use This Spec

1. Read the [**Contract Form**](#contract-form) below so the six fields read
   consistently
2. Start from the [**Operating Model Spec**](operating-model.md) — the
   functions, coverage, envelope, floors, separations, and stop enforcement that
   bound any run
3. For unattended execution, read the [**Delegated-Run Spec**](delegated-run.md)
   — the run lifecycle, liveness, idempotency, replanning, and honest-outcome
   contracts
4. For concurrent execution, read the
   [**Parallel-Batch Spec**](parallel-batch.md) — the forcing-dependency
   taxonomy, parallel-safety classification, and batch preflight, execution, and
   close contracts
5. Both read and write project state through the
   [**Canonical-State Spec**](canonical-state.md) — the single source the others
   reference, and home of the project lifecycle and the project-level completion
   contract
6. For the human-facing rationale behind any contract, follow its link back to
   the [Operating Model Guide](../guides/operating-model.md)

---

## Contract Form

Every normative contract in this layer is stated with the same six fields. Where
a field does not apply to a contract, it says so explicitly rather than being
omitted.

| Field                | What it states                                                                      |
| -------------------- | ----------------------------------------------------------------------------------- |
| **Applicability**    | When the contract binds — the run shapes, stages, or conditions that trigger it     |
| **Inputs**           | The state and configuration the contract reads                                      |
| **Procedure**        | The normative steps (MUST / MUST NOT) a conforming actor performs                   |
| **Outputs**          | The state the contract sets or the determination it produces                        |
| **Evidence**         | What must be durably recorded for the contract to be auditable                      |
| **Failure behavior** | What happens when a step cannot be satisfied — the framework's default is fail-safe |

Conventions:

- **Normative voice.** MUST / MUST NOT / MUST be is binding; SHOULD is a strong
  default; MAY is permitted latitude.
- **`[Reserved]`** marks a contract or clause deferred to a later, deliberate
  expansion of this layer (typically scale, enterprise, regulated, or
  deep-operations content). It is named so its absence is deliberate, not an
  omission.
- **`[Informative]`** marks rationale or illustration that does not itself bind.
- **Semantics, not storage.** No contract prescribes a schema, file layout, API,
  or vendor. It states the required properties; an implementation chooses the
  mechanism.

---

## Scope

This layer is scoped to the contracts a bounded **Lights-Out** run executes —
the v0.49 Definition of Done. It covers the operating-model contracts
([operating-model.md](operating-model.md)), the delegated-run contracts plus the
canonical state they read and write ([delegated-run.md](delegated-run.md),
[canonical-state.md](canonical-state.md)), and the parallel-batch contracts for
concurrent execution ([parallel-batch.md](parallel-batch.md)). Scale scenarios
(small team, organization, enterprise), regulated and external assurance, and
deep operations (incident command, DR, SLAs) are **`[Reserved]`** — they belong
to a later, deliberate expansion of this layer, not to the Lights-Out foundation
v0.49 establishes.

---

## Notes

**Last Updated:** 2026-07-09

Added to framework in v0.49.0.

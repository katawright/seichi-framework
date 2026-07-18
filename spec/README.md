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
3. For governance weight, read the [**Right-Sizing Spec**](right-sizing.md) —
   the consequence anchors, the per-stage scaling matrices, and the
   minimum-viable-artifacts matrix that size how heavy the process is
4. For checkpoint decisions, read the [**Checkpoints Spec**](checkpoints.md) —
   the three checkpoint types, their closed outcome sets, and the security
   severity-halt rule
5. For executor conduct — the closed-world rule, the load line, the `[ASSUMED]`
   convention, fallback protocols, and session continuity — read the
   [**Execution Spec**](execution.md)
6. For unattended execution, read the [**Delegated-Run Spec**](delegated-run.md)
   — the run lifecycle, liveness, idempotency, replanning, and honest-outcome
   contracts
7. For concurrent execution, read the
   [**Parallel-Batch Spec**](parallel-batch.md) — the forcing-dependency
   taxonomy, parallel-safety classification, and batch preflight, execution, and
   close contracts
8. Both read and write project state through the
   [**Canonical-State Spec**](canonical-state.md) — the single source the others
   reference, and home of the project lifecycle and the project-level completion
   contract
9. For the human-facing rationale behind any contract, follow its link back to
   its guide (e.g. the [Operating Model Guide](../guides/operating-model.md) or
   the [Right-Sizing Guide](../guides/right-sizing.md))

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

## Kernel Interface (experimental, 0.x)

The spec namespace also hosts the framework's **kernel interface** — the
machine-readable single source for the vocabulary and rule identities the
contracts above state in prose:

- **`vocabulary/*.yaml`** — hand-curated source for the closed value sets
  (lifecycle machines and reason sets, planning-family statuses, closure
  disposition sets, attribution grades, operating-configuration fields,
  concurrency vocabularies, checkpoint types and outcomes, record families and
  trace-link types, the ordered fallback precedence). Values are stable
  identifiers, never display text.
- **`rules/index.yaml`** — the rule registry: every kernel rule's stable ID,
  layer, admission basis, and normative source. A migrated rule's row also
  records `representation` (how it migrated: `data` | `data+contract` |
  `contract`) and `links` (the guide locations that keep its rationale).
- **Rule-body markers** — a migrated rule's body is delimited in its one
  normative home by an HTML-comment marker pair, and opens with a visible ID
  heading so no citable handle is comment-only:

  ```markdown
  <!-- rule: DR-005 -->

  ### DR-005 — Run lifecycle machine

  …the contract…

  <!-- /rule: DR-005 -->
  ```

  Spans are flat (nesting is disallowed) and single-homed: exactly one pair per
  migrated rule, in the registry `source` file, with `representation` recorded
  in the same commit. The validate suite enforces the pairing, the single home,
  the heading, and that every rule-ID-shaped citation anywhere in the framework
  resolves to a registered ID. Rules not yet migrated keep unanchored bodies in
  the cited source.

- **`schemas/manifest.schema.json`** — the schema the generated manifest
  validates against.
- **`generated/`** — generated, stamped exports (never hand-edited):
  `manifest.json` (the self-contained machine export), `reference.md` (the
  human-readable view, including migrated rule bodies extracted verbatim from
  their marker-anchored homes), and `schema-projection.json` (the
  consumer-facing equivalence export). Regenerate with `npm run kernel`; CI
  fails when they are stale or hand-edited.

The kernel interface is versioned on its own **0.x** axis
(`meta.kernel_interface_version`), independent of the framework version: pre-1.0
it may break with explicit release notes, and no compatibility promise attaches
to it. Consumers pin the interface version and may cache-validate on
`meta.source_hash`, which moves only when the kernel sources change. Stage
metadata stays canonical in its front-matter homes (`guides/stages.md` pipeline;
`stages/*/README.md`) and is embedded into the manifest, not moved.

---

## Scope

This layer is scoped to the contracts a bounded **Lights-Out** run executes —
the v0.49 Definition of Done. It covers the operating-model contracts
([operating-model.md](operating-model.md)), the right-sizing contracts that size
governance weight ([right-sizing.md](right-sizing.md)), the checkpoint contracts
([checkpoints.md](checkpoints.md)), the executor-conduct contracts
([execution.md](execution.md)), the delegated-run contracts plus the canonical
state they read and write ([delegated-run.md](delegated-run.md),
[canonical-state.md](canonical-state.md)), and the parallel-batch contracts for
concurrent execution ([parallel-batch.md](parallel-batch.md)). Scale scenarios
(small team, organization, enterprise), regulated and external assurance, and
deep operations (incident command, DR, SLAs) are **`[Reserved]`** — they belong
to a later, deliberate expansion of this layer, not to the Lights-Out foundation
v0.49 establishes.

---

## Notes

**Last Updated:** 2026-07-18

Added to framework in v0.49.0.

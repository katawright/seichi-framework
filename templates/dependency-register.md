# Cross-Increment Dependency Register

**Purpose:** Track cross-increment dependencies so producing and consuming teams
stay aligned.

**Usage:** The PjM maintains this register throughout the project. Review during
increment planning and sync meetings. See the
[Delivery Operating Guide](../guides/delivery-operating-guide.md) for
coordination practices.

<!-- PjM-owned artifact. See guides/framework.md for PjM R/A accountability. -->

## Dependencies

| ID   | Output / Artifact    | Producing Increment | Consuming Increment | Type          | Status   | Owner  | Target Date | Notes                        |
| ---- | -------------------- | ------------------- | ------------------- | ------------- | -------- | ------ | ----------- | ---------------------------- |
| D-01 | Auth API endpoints   | Increment 1         | Increment 2         | Hard          | Pending  | [name] | YYYY-MM-DD  | Blocks user-profile feature  |
| D-02 | Design token library | Increment 1         | Increment 3         | Soft          | Complete | [name] | YYYY-MM-DD  | Can use placeholder tokens   |
| D-03 | Analytics event spec | Increment 2         | Increment 4         | Informational | At Risk  | [name] | YYYY-MM-DD  | Spec draft delayed by 1 week |

## Type Definitions

- **Hard** — prerequisite must be complete before the consuming increment can
  start the dependent work.
- **Soft** — work can begin with a temporary substitute; full artifact needed
  before verification.
- **Informational** — useful context that improves quality but does not block
  progress.

## Status Definitions

- **Pending** — dependency not yet delivered.
- **Complete** — dependency delivered and accepted.
- **At Risk** — delivery timeline threatened; escalate in next sync.

---

<!-- Template Last Updated: 2026-03-20 | Added in v0.27.0 -->

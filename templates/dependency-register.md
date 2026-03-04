# Cross-Increment Dependency Register

<!-- PjM-owned artifact. See guides/framework.md for PjM R/A accountability. -->

## Dependencies

| ID   | Output / Artifact    | Producing Increment | Consuming Increment | Type          | Status   | Notes                        |
| ---- | -------------------- | ------------------- | ------------------- | ------------- | -------- | ---------------------------- |
| D-01 | Auth API endpoints   | Increment 1         | Increment 2         | Hard          | Pending  | Blocks user-profile feature  |
| D-02 | Design token library | Increment 1         | Increment 3         | Soft          | Complete | Can use placeholder tokens   |
| D-03 | Analytics event spec | Increment 2         | Increment 4         | Informational | At Risk  | Spec draft delayed by 1 week |

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

**Notes**

**Last Updated:** 2026-03-04

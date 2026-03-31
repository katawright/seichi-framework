# Worked Example: One Requirement Through the Framework

## Overview

End-to-end trace of a single requirement through every framework stage — from
Initiation through Support — showing completed artifact examples at each step.

### Why a Worked Example

The framework templates and guides explain what each artifact should contain,
but it's hard to judge the right level of detail without seeing a completed
example. This document shows exactly what "done" looks like for one requirement
flowing through every stage.

### Goals of This Example

- Show the expected detail level for each framework artifact
- Demonstrate how artifacts link together across stages
- Provide a concrete traceability chain from goal to production
- Give engineers and analysts a "what good looks like" reference

### Key Principle

Traceability is the throughline — every artifact references the one before it,
replacing tribal knowledge with documented decisions.

### How to Use This Example

1. [**Initiation**](#stage-1-initiation) — see how the project starts with a
   problem statement and success criteria
2. [**Requirements**](#stage-2-requirements) — see what a requirement and its
   acceptance criteria look like
3. [**System Design**](#stage-3-system-design) — see foundational technology and
   increment planning decisions
4. [**Increment Design**](#stage-4-increment-design) — see how design artifacts
   reference requirements
5. [**Implementation**](#stage-5-implementation) — see the completion record
6. [**Verification**](#stage-6-verification) — see test results mapped to
   acceptance criteria
7. [**Deployment**](#stage-7-deployment) — see the release record
8. [**The Full Traceability Chain**](#the-full-traceability-chain) — see the
   end-to-end flow

---

## Scenario

This example uses the employee onboarding tracker project from the
[Bootstrap Guide](bootstrap.md) — a web application for tracking employee
onboarding tasks, ensuring new hires complete all required steps within their
first 30 days.

Project context:

- Type: Greenfield
- Team: 3 engineers, 1 QA, 1 product manager (also filling the project
  coordination role on this small team)
- Risk tier: Standard
- Tech stack: React frontend, Node.js/Express API, PostgreSQL

The requirement we trace is the ability for HR managers to assign onboarding
tasks to new hires and track completion — a core Must Have requirement that
touches multiple components and has clear acceptance criteria.

---

## Stage 1: Initiation

The Initiation stage defines _why_ this project matters. Here's the relevant
excerpt from the Initiation Brief.

### Problem Statement

HR managers at mid-size companies (50–500 employees) track new hire onboarding
using spreadsheets and email chains. Tasks fall through the cracks, new hires
miss deadlines, and HR has no visibility into completion status. Average
onboarding completion rate is 68%, with 15% of required tasks completed late.

### Goals and Success Criteria

| Goal                       | Baseline | Target |
| -------------------------- | -------- | ------ |
| Onboarding task completion | 68%      | 95%    |
| Tasks completed on time    | 85%      | 97%    |
| HR time per new hire       | 4 hours  | 1 hour |

### Scope Boundaries

**In scope:** Task assignment, progress tracking, deadline management, HR
dashboard.

**Out of scope:** Payroll integration, document signing, IT provisioning
automation.

### Gate 1 Decision

**Proceed** — clear problem with measurable impact, small team can deliver MVP
in 8–10 weeks, low technical risk (standard web stack).

> **Traceability:** This Initiation Brief becomes the primary input to the
> Requirements stage. The success metrics above flow into NFRs (observability)
> and verification criteria downstream.

---

## Stage 2: Requirements

The Requirements stage defines _what_ to build. Here's how our requirement
appears in the Requirements Brief.

### Functional Requirement

From the **Requirements Brief**, Functional Requirements section:

```markdown
## Functional Requirements (FRs)

- **FR-3:** The system shall allow HR managers to assign onboarding tasks to a
  new hire from a predefined task library, with a due date calculated relative
  to the hire's start date.

- **FR-4:** The system shall display each new hire's onboarding progress as a
  percentage of completed tasks, visible to both the new hire and the assigned
  HR manager.
```

We'll trace **FR-3** through the full cycle. Notice it's specific about _what_
("assign onboarding tasks from a predefined library, with a relative due date")
without prescribing _how_ (no mention of UI layout, API design, or database
schema).

### Acceptance Criteria

From the **Requirements Brief**, Acceptance Criteria section:

```markdown
## Acceptance Criteria (AC)

- **AC for FR-3:**
  - **AC-3.1:** Given an HR manager is viewing a new hire's profile When they
    select "Assign Tasks" Then the system displays a list of tasks from the task
    library with checkboxes for selection

  - **AC-3.2:** Given an HR manager selects one or more tasks When they confirm
    the assignment Then each selected task is created with a due date calculated
    as [start date + task's default offset days] And the new hire can see the
    assigned tasks on their dashboard

  - **AC-3.3:** Given a task has already been assigned to a new hire When the HR
    manager views the task library for that hire Then already-assigned tasks are
    visually indicated and cannot be duplicated
```

### MoSCoW Classification

From the **Requirements Brief**, Scope Baseline section:

```markdown
### Must Have (first usable release)

- Predefined task library with default tasks (FR-1)
- Assign tasks to new hires with relative due dates (FR-3)
- New hire dashboard showing assigned tasks (FR-4)
- Mark tasks as complete (FR-5)
```

### Traceability

From the **Requirements Brief**, Traceability Summary section:

```markdown
| FR ID | Initiation Objective    | MoSCoW | ACs             | Success Metric        |
| ----- | ----------------------- | ------ | --------------- | --------------------- |
| FR-3  | "100% task coverage for | Must   | AC-3.1, AC-3.2, | Onboarding completion |
|       | new hires in 30 days"   |        | AC-3.3          | rate > 95% in 30 days |
```

**What to notice:**

- FR-3 traces back to an Initiation objective (measurement throughline)
- It has three acceptance criteria, each testable with Given/When/Then
- MoSCoW classification is "Must" — it's in the first increment
- The success metric connects to what we'll measure in production

---

## Stage 3: System Design

The System Design stage establishes foundational technical decisions that apply
across all increments. It doesn't design individual features — that happens in
Increment Design — but it sets the technology stack, API conventions, and
increment plan that every later stage builds on.

### Technology Stack

From the **System Design Brief**, Technology Stack (§ 3):

```markdown
## 3. Technology Stack

| Category     | Choice            | Justification                          | ADR      |
| ------------ | ----------------- | -------------------------------------- | -------- |
| **Frontend** | React             | Component model suits task-based UI;   | ADR-D001 |
|              |                   | team experience                        |          |
| **Backend**  | Node.js / Express | JavaScript end-to-end; lightweight for | ADR-D002 |
|              |                   | REST API                               |          |
| **Database** | PostgreSQL        | Relational model fits structured       | ADR-D003 |
|              |                   | onboarding data; strong FK support     |          |
| **Auth**     | JWT + RBAC        | Stateless auth with role-based access  | ADR-D004 |
|              |                   | (HR Manager vs New Hire)               |          |
```

### Increment Plan

From the **System Design Brief**, Increment Plan (§ 11):

```markdown
## 9. Increment Plan

### Increment 1: Core Task Management (Must Have)

**Goal:** Deliver task library, task assignment, progress tracking, and task
completion — the minimum viable onboarding workflow.

**Requirements:** FR-1, FR-3, FR-4, FR-5 **Duration:** 3–4 weeks (estimate)
**Dependencies:** None

**Why first:** These four FRs form the smallest set that delivers end-to-end
value — an HR manager can assign tasks and a new hire can complete them.
```

### API Conventions

From the **System Design Brief**, API Architecture (§ 5):

```markdown
## 5. API Architecture

### 5.1 API Design Principles

- **Style:** REST
- **Versioning:** URL-based (`/api/v1/`)
- **Authentication:** JWT
- **Authorization:** RBAC (HR Manager, New Hire)
- **Error Format:** `{ "error": { "code": "<HTTP_STATUS>", "message": "..." } }`
```

**What to notice:**

- System Design provides foundational context — technology choices, API
  conventions, increment sequencing — not requirement-specific design
- FR-3 appears in the Increment Plan (placed in Increment 1) but the stage
  doesn't design FR-3's components or interfaces; that's Increment Design's job
- ADR references link each technology choice to a recorded decision

---

## Stage 4: Increment Design

The Increment Design stage plans _how_ to build and _how_ to test. FR-3 is part
of Increment 1 (core task management). Here's how it appears in the Increment
Design Brief.

### Increment Scope

From the **Increment Design Brief**, Section 1:

```markdown
## 1. Increment Scope

**Requirements in Scope:**

- FR-1: Predefined task library management
- FR-3: Assign tasks to new hires with relative due dates
- FR-4: New hire onboarding progress dashboard
- FR-5: Mark tasks as complete

**Acceptance Criteria:**

- AC-3.1: Task library display with selection
- AC-3.2: Task assignment with calculated due dates
- AC-3.3: Duplicate prevention for assigned tasks

**Out of Scope for This Increment:**

- Bulk task assignment across multiple hires (FR-9, Increment 2)
- Custom task creation by HR managers (FR-10, Increment 2)
- Email notifications for upcoming due dates (FR-12, Increment 3)
```

### Component Design

From the **Increment Design Brief**, Section 2:

```markdown
## 2. Component Design

### 2.1 Components in This Increment

**Component: TaskAssignmentService**

**Responsibilities:** Handles task assignment logic — selecting tasks from the
library, calculating due dates relative to hire start date, creating task
assignments, and preventing duplicates.

**Structure:**
```

src/services/ taskAssignment.js - assignTasks(hireId, taskIds, startDate) →
Assignment[] - getAvailableTasks(hireId) → Task[] (excludes assigned) -
calculateDueDate(startDate, offsetDays) → Date

```

**Dependencies:** TaskLibrary model, Assignment model, date-fns
**State:** Stateless — reads task library, writes assignments to DB

**Component: TaskAssignmentUI**

**Responsibilities:** Provides the HR manager interface for
selecting and assigning tasks from the library.

**Structure:**

```

src/components/ TaskAssignment/ TaskAssignmentModal.jsx — modal with task
library list TaskCheckboxList.jsx — selectable task list DueDatePreview.jsx —
shows calculated due dates

```

**Dependencies:** TaskAssignmentService (via API),
React state for selection tracking
**State:** Local component state for checkbox selections;
server state for task library and existing assignments
```

### Interface Specification

From the **Increment Design Brief**, Section 4:

````markdown
## 4. Interface Specifications

**POST /api/v1/hires/:hireId/tasks**

- **Description:** Assign tasks from the library to a new hire
- **Input:**
  ```json
  {
    "taskIds": [1, 3, 5],
    "startDate": "2026-03-15"
  }
  ```
````

- **Output (201 Created):**
  ```json
  {
    "assignments": [
      {
        "id": 101,
        "taskId": 1,
        "hireId": 42,
        "title": "Complete I-9 form",
        "dueDate": "2026-03-16",
        "status": "pending"
      },
      ...
    ]
  }
  ```
- **Error cases:**
  - 400: taskIds is empty or contains invalid IDs
  - 409: One or more tasks already assigned to this hire
  - 404: hireId not found

**GET /api/v1/hires/:hireId/tasks/available**

- **Description:** Get unassigned tasks for a hire
- **Output (200 OK):**
  ```json
  {
    "tasks": [
      {
        "id": 3,
        "title": "Set up development environment",
        "category": "IT Setup",
        "defaultOffsetDays": 2,
        "alreadyAssigned": false
      },
      ...
    ]
  }
  ```

````

### Test Strategy

From the **Increment Design Brief**, Section 5:

```markdown
## 5. Testing Strategy for This Increment

### 5.1 Unit Tests

**TaskAssignmentService:**

- `assignTasks()` — creates assignments with correct due dates
- `assignTasks()` — rejects duplicate assignments (returns 409)
- `assignTasks()` — rejects empty taskIds array
- `calculateDueDate()` — correctly offsets from start date
- `calculateDueDate()` — handles weekend/holiday edge cases
- `getAvailableTasks()` — excludes already-assigned tasks

**Coverage target:** 90% for service layer

### 5.2 Integration Tests

- POST /api/v1/hires/:hireId/tasks — happy path: assigns tasks,
  returns 201 with correct due dates
- POST /api/v1/hires/:hireId/tasks — duplicate: returns 409,
  no new assignments created
- GET /api/v1/hires/:hireId/tasks/available — returns only
  unassigned tasks
- Verify database state after assignment (tasks created with
  correct foreign keys and dates)

### 5.3 Acceptance Testing

- **AT-3.1:** HR manager opens task assignment modal, sees full
  task library with checkboxes. Already-assigned tasks are
  grayed out. (Validates AC-3.1, AC-3.3)
- **AT-3.2:** HR manager selects 3 tasks, confirms. Tasks appear
  on new hire's dashboard with correct due dates. (Validates
  AC-3.2)
- **AT-3.3:** HR manager opens modal again for same hire.
  Previously assigned tasks are indicated and not selectable.
  (Validates AC-3.3)
````

**What to notice:**

- The design references FR-3 and its ACs directly — full traceability
- Component design is detailed enough for an engineer to implement without
  guessing (structure, responsibilities, dependencies)
- The test strategy maps test cases to acceptance criteria (AT-3.1 validates
  AC-3.1 and AC-3.3)
- Interface specs include both success and error cases with concrete examples

---

## Stage 5: Implementation

The Implementation stage _executes_ the design plan. Here's how FR-3 appears in
the Implementation Brief after the work is done.

### Requirements Implemented

From the **Implementation Brief**, Increment Overview:

```markdown
## Increment Overview

### Requirements Implemented

| Requirement ID | Description                          | AC Met |
| -------------- | ------------------------------------ | ------ |
| FR-1           | Predefined task library              | Done   |
| FR-3           | Assign tasks with relative due dates | Done   |
| FR-4           | Onboarding progress dashboard        | Done   |
| FR-5           | Mark tasks as complete               | Done   |

### Scope Summary

**What was built:**

- Task library management (CRUD for predefined tasks)
- Task assignment flow with due date calculation
- New hire dashboard with progress percentage
- Task completion toggle with timestamp

**What was NOT built:**

- Email notifications (moved to Increment 3 per design)
```

### Pull Requests

From the **Implementation Brief**, Pull Requests section:

```markdown
## Pull Requests

**Branching Strategy:** Trunk-based **Target Branch:** main

| PR # | Description              | Lines | Status | Link                     |
| ---- | ------------------------ | ----- | ------ | ------------------------ |
| #12  | Task library data model  | ~180  | Merged | Example placeholder link |
|      | and seed data            |       |        |                          |
| #14  | Task assignment API and  | ~340  | Merged | Example placeholder link |
|      | service layer            |       |        |                          |
| #16  | Task assignment UI modal | ~280  | Merged | Example placeholder link |
|      | and checkbox list        |       |        |                          |
| #18  | New hire dashboard with  | ~250  | Merged | Example placeholder link |
|      | progress tracking        |       |        |                          |
```

### Implementation Approach

From the **Implementation Brief**, approach section:

```markdown
## Implementation Approach

**Overall strategy:** Built bottom-up — data model first (PR #12), then service
layer and API (PR #14), then UI components (PR #16, #18). Each PR was
independently testable and deployable.

### Key Decisions

**Minor Decisions:**

- Used date-fns for date calculations (lightweight, tree-shakable, avoids
  Moment.js bulk)
- Task assignment is atomic — all selected tasks assigned in a single
  transaction, or none are (prevents partial assignment on error)
- Due date calculation skips weekends by default; added `includeWeekends` flag
  to task library for tasks that are calendar-day based (e.g., "submit health
  insurance form within 30 calendar days")
```

### Unit Testing

From the **Implementation Brief**, Unit Testing section:

```markdown
## Unit Testing

| Metric           | Value | Target | Status |
| ---------------- | ----- | ------ | ------ |
| Overall Coverage | 92%   | 80%+   | Done   |
| Branch Coverage  | 87%   | 75%+   | Done   |
| Critical Path    | 100%  | 100%   | Done   |

**Test Gaps:** None — all service layer functions and API endpoints have test
coverage.
```

**What to notice:**

- The Implementation Brief records _what was done_, not what's planned — it's a
  completion record
- PRs are small and focused (180–340 lines) — PR-sized slices per the framework
  guidance
- Key decisions are documented (date library choice, atomic assignment) so
  future developers understand _why_
- Unit test coverage meets targets from the Increment Design test strategy

---

## Stage 6: Verification

The Verification stage _validates_ that what was built meets the acceptance
criteria defined in Requirements. Here's how FR-3 appears in verification
artifacts.

### Test Execution Results

Verification test results for FR-3:

```markdown
## Test Results — FR-3: Task Assignment

### Integration Tests

| Test Case                              | Result | Notes              |
| -------------------------------------- | ------ | ------------------ |
| POST /hires/:id/tasks — happy path     | Pass   | 201, correct dates |
| POST /hires/:id/tasks — duplicate      | Pass   | 409, no side       |
|                                        |        | effects            |
| POST /hires/:id/tasks — empty taskIds  | Pass   | 400 validation     |
| POST /hires/:id/tasks — invalid hireId | Pass   | 404                |
| GET /hires/:id/tasks/available         | Pass   | Excludes assigned  |
| DB state after assignment              | Pass   | FK integrity,      |
|                                        |        | correct dates      |

### Acceptance Test Results

| Test ID | Acceptance Criteria    | Result | Verified By |
| ------- | ---------------------- | ------ | ----------- |
| AT-3.1  | AC-3.1: Task library   | Pass   | QA (manual) |
|         | display with selection |        |             |
|         | AC-3.3: Assigned tasks |        |             |
|         | indicated              |        |             |
| AT-3.2  | AC-3.2: Assignment     | Pass   | QA (manual) |
|         | with correct due dates |        |             |
| AT-3.3  | AC-3.3: Duplicate      | Pass   | QA (manual) |
|         | prevention             |        |             |

### Edge Cases Verified

- Assigning task with 0-day offset: due date = start date (Pass)
- Assigning to a hire whose start date is in the past: due dates calculated
  correctly, some already overdue (Pass — expected behavior, flagged with
  warning in UI)
- Assigning all available tasks: no tasks remain in available list (Pass)
- Concurrent assignment by two HR managers: second request gets 409 for
  overlapping tasks, non-overlapping tasks assigned successfully (Pass)
```

### Acceptance Criteria Sign-Off

```markdown
## User Acceptance Testing

**UAT Scenario for FR-3:** HR manager Sarah assigns onboarding tasks to new hire
Alex (start date: March 15).

1. Sarah opens Alex's profile and clicks "Assign Tasks"
2. Modal shows 15 available tasks with checkboxes
3. Sarah selects "Complete I-9 form" (1-day offset), "Set up workstation" (2-day
   offset), and "Complete security training" (5-day offset)
4. Due date preview shows: Mar 16, Mar 17, Mar 20 (Mar 22 weekend skipped)
5. Sarah clicks "Assign" — confirmation message appears
6. Alex's dashboard shows 3 tasks with due dates and 0% completion
7. Sarah reopens the modal — those 3 tasks are grayed out

**Result:** Pass **UAT Approved by:** Product Manager (Jamie Chen) **Date:**
2026-03-10 **Notes:** Approved with no conditions.
```

**What to notice:**

- Every acceptance criterion (AC-3.1, AC-3.2, AC-3.3) maps to a specific test
  that was executed and passed
- The UAT scenario is a concrete walkthrough, not abstract — real names, real
  dates, real task names
- Edge cases from the Increment Design are verified (0-day offset, past start
  dates, concurrent assignment)
- Sign-off includes who approved, when, and any conditions

---

## Stage 7: Deployment

The Deployment stage releases the verified increment to production. Here's how
FR-3 appears in the Deployment Brief.

### Increment Overview

From the **Deployment Brief**, Increment Overview:

```markdown
## Increment Overview

**Purpose:** Deliver core onboarding task management — task library, task
assignment, progress tracking, and task completion.

**Requirements Implemented:**

- FR-1: Predefined task library management
- FR-3: Assign onboarding tasks with relative due dates
- FR-4: New hire onboarding progress dashboard
- FR-5: Mark tasks as complete

**Verification Status:**

- Unit Tests: Passed - 92% coverage
- Integration Tests: Passed
- UAT: Approved (Jamie Chen, 2026-03-10)
- Performance: Acceptable (p95 task assignment < 200ms)
- Security: Approved (no PII in logs, auth validated)
```

### Release Details

```markdown
## Release Details

- **Release Version:** v1.0.0
- **Previous Version:** None (first release)
- **Build/Package ID:** build-847
- **Git Commit/Tag:** v1.0.0 (abc1234)
- **Branch:** main

**Deployment Strategy:** Rolling (zero-downtime) **Rationale:** Standard-tier
project, stateless API servers, database migrations are additive (no breaking
changes).

**Deployment Window:** 2026-03-12 10:00 – 11:00 UTC
```

### Data and State Changes

```markdown
## Data and State Changes

### Database Migrations

**Schema Changes:** Yes **Data Changes:** Yes (seed data) **Migration Type:**
Additive

**Migration Scripts:**

- 001_create_task_library.sql: Creates task_library table
- 002_create_assignments.sql: Creates task_assignments table with FK to
  task_library and hires
- 003_seed_default_tasks.sql: Inserts 15 default onboarding tasks with
  categories and offset days

**Migration Testing:**

- [x] Tested in staging with production-like data
- [x] Rollback tested and validated (down migrations drop tables)
- [x] Performance impact assessed (additive only, no locks on existing tables)
```

### Post-Deployment Validation

```markdown
## Post-Deployment Validation

**Smoke Tests:**

- [x] Automated smoke tests passed
- [x] Critical user paths manually verified:
  - HR manager can assign tasks to a new hire
  - New hire can view assigned tasks on dashboard
  - Task completion updates progress percentage
- [x] API health checks returning expected responses

**Production Health:** Healthy

- Error Rate: 0.1% (Expected: <1%)
- Response Time (p95): 145ms (Expected: <500ms)
- Task Assignment p95: 180ms (Expected: <500ms)
```

### Success Criteria Baselines

```markdown
## Success Criteria Baselines

**Date/Time:** 2026-03-12 12:00 UTC

**Success Criterion 1:** Onboarding completion rate > 95% in 30 days

- Baseline: N/A (first release, no historical data)
- Method: Count hires with 100% task completion within 30 days of start date,
  divided by total hires
- Dashboard: /analytics/onboarding-completion
- Next measurement: 2026-04-15 (30 days after first cohort)

**Success Criterion 2:** Time to assign tasks < 5 minutes

- Baseline: Manual process averages 25 minutes (from HR survey)
- Method: Track time from "Assign Tasks" click to confirmation
- Dashboard: /analytics/assignment-time
- Next measurement: 2026-03-26 (2 weeks post-launch)
```

**What to notice:**

- The deployment brief references FR-3 alongside the other FRs in the increment
  — deployment is per-increment, not per-requirement
- Verification status summarizes results from the Verification stage (including
  UAT approval and who approved)
- Database migrations are documented with rollback strategy
- Success criteria baselines connect back to the Initiation stage's measurable
  goals — this is the measurement throughline in action
- Post-deployment validation confirms the system works in production, not just
  in test environments

---

## The Full Traceability Chain

Here's how FR-3 flows through the entire framework:

```
Initiation
  Goal: "100% task coverage for new hires in 30 days"
    ↓
Requirements
  FR-3: "Assign tasks from library with relative due dates"
  AC-3.1, AC-3.2, AC-3.3: Testable Given/When/Then criteria
  MoSCoW: Must Have → Increment 1
    ↓
System Design
  Tech stack: React, Node.js/Express, PostgreSQL
  API conventions: REST, /api/v1/, JWT + RBAC
  Increment plan: FR-3 in Increment 1 (core task management)
    ↓
Increment Design
  Component: TaskAssignmentService, TaskAssignmentUI
  API: POST /api/v1/hires/:hireId/tasks
  Test plan: Unit tests, integration tests, acceptance tests
    ↓
Implementation
  PRs: #12 (data model), #14 (API), #16 (UI), #18 (dashboard)
  Coverage: 92% overall, 100% critical path
    ↓
Verification
  Integration tests: 6/6 passing
  Acceptance tests: AT-3.1, AT-3.2, AT-3.3 all passing
  UAT: Approved by Product Manager
    ↓
Deployment
  Version: v1.0.0, rolling deployment
  Migrations: 3 additive scripts
  Baseline: Onboarding completion rate tracking begins
    ↓
Support
  Monitor: Onboarding completion rate > 95% at 30-day mark
  Monitor: Task assignment time < 5 minutes
```

**Key takeaway:** Every artifact references the one before it. An engineer
reading the Deployment Brief can trace back to _why_ this code exists
(Initiation goal), _what_ it should do (Requirements FR-3), _how_ it was
designed (Increment Design), _what_ was built (Implementation PRs), and
_whether_ it works (Verification results). This traceability is the framework's
core value — it replaces tribal knowledge with documented decisions.

---

## Notes

**Last Updated:** 2026-03-29

Added to framework in v0.17.0. For a brownfield adoption example showing
preparation increments, exit checkpoints, and shadow mode, see the
[Brownfield Worked Example](worked-example-brownfield.md).

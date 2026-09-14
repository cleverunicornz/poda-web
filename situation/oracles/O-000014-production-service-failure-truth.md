# Judge production service failure truth

## State

designed

## Judges

[P-000014](situation/promises/P-000014-production-service-failure-truth.md)

## Inputs

Fix source/build/configuration identity, production entrypoint, explicit preview entrypoint, browser/storage/origin arrangement and shared fixture/scenario definitions. Name a supported data load and authorization-denied case, plus save, publish and assisted-artifact operations with failure, unresolved and success outcomes. Declare exact service-observable outcomes, expected UI state meanings and a finite unresolved-outcome observation window before running; no endpoint/schema is prescribed here.

Retain source/entrypoint dependency references, UI/action traces, service request/outcome traces and persisted-state observations for each production case. Include one production load failure with last-known data and one without it. For the preview, retain its explicit simulation label, stateful success/failure scenario transitions and network/storage traces. Finally open production after preview under the declared arrangement and repeat a failed load/mutation, inspecting whether preview handlers, data or state became production authority. Trace the imported/activated simulation paths for these entrypoints rather than asserting absence across unrelated code.

Incomplete traces, an unselected isolation arrangement or missing operation contracts prevent judgment; absent evidence is not PASS. All Pass legs are required; any observed Fail leg in complete in-Scope evidence fails. These are manual design requirements, not a claimed test run.

## Pass

- P1: Production load failures/authorization denials remain visible failures/denials; no simulated data becomes authoritative, and retained last-known data is distinguishable from a fresh successful load.
- P2: Each failed or unresolved save/publish/assisted operation has no corresponding success/persistence claim; each observed success claim follows its actual service success rather than text-only/local simulation.
- P3: Simulation paths activate only at the explicit preview/test entrypoints; the declared production and preview-to-production sequences never activate simulated fallback or present preview persistence as production state.
- P4: The interactive preview visibly identifies success/failure transitions as simulations, makes no production-persistence claim and sends no production mutation.

## Fail

- F1: A production load failure/denial lacks a visible failure/denial or becomes simulated authoritative data/success, or last-known data is not distinguishable from a successful fresh load.
- F2: A failed/unresolved operation is presented as saved/published/successful, or a success claim lacks the corresponding prior service success.
- F3: The production entrypoint activates a simulation path/fallback or consumes preview simulated persistence as production authority in the declared sequence.
- F4: The explicit preview does not identify its transitions as simulations, presents them as production persistence, sends a production mutation, or does not expose the declared simulated success/failure transitions.

## Implementation coverage

| Leg | Decision | Coverage |
|---|---|---|
| P1 | Failed/denied loads and last-known data remain truthful | manual |
| P2 | All mutation success claims follow corresponding service outcomes | manual |
| P3 | Entry and preview-to-production paths isolate simulations | manual |
| P4 | Interactive preview transitions are simulated and non-production | manual |
| F1 | Failed/denied load or stale data becomes false fresh success | manual |
| F2 | Mutation claim contradicts or precedes service success | manual |
| F3 | Production activates simulations or trusts their persistence | manual |
| F4 | Preview misrepresents persistence, mutates production or lacks transitions | manual |

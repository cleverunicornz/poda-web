# Judge consistent artifact hosts

## State

designed

## Judges

[P-000011](situation/promises/P-000011-consistent-artifact-hosts.md)

## Inputs

Fix a source/build identity, module location M, existing widget/container W and authorized room, member identity, service-owned artifact/Matrix permission set, and supported artifact A with baseline V0. Supply the shared form contract, valid edit V1, invalid edit X with expected validation result, a denied edit, and an accepted assistant-driven backend change V2. Declare the artifact observation boundary and finite observation window before running; these labels do not specify API fields or endpoints.

Retain source/contract references for both hosts' form/view contract, UI/action and service traces from identical clean baselines for valid/invalid/denied edits in M and W, then a change through M observed in W and a change through W observed in M. Include an assisted update observed in both, one with a predeclared unsaved draft and selected human-draft policy/choice. Retain authoritative identity/value/permission outcomes and the displayed draft/authoritative states through adjudication.

Missing policy, unsupported host configuration or incomplete observations prevents judgment; neither unsupported cases nor absent evidence are PASS. All Pass legs are required; an observed Fail leg in complete in-Scope evidence fails. This is designed manual coverage, not an executable or an observation.

## Pass

- P1: M and W expose A and its same authoritative baseline through the shared form validation/mutation contract, not independent host-owned artifacts.
- P2: Valid, invalid and denied edits produce equal contract-defined validity/mutation outcomes under equal permissions in both hosts; widget presentation grants neither artifact nor Matrix permission.
- P3: Accepted M-to-W and W-to-M changes and V2 appear under A at each declared observation boundary; the dirty host preserves or explicitly adjudicates its distinct draft under the selected policy.

## Fail

- F1: Hosts expose different artifact identities/authoritative baselines or divergent form validation/mutation contracts for A.
- F2: Equal inputs/permissions yield different validity or mutation outcomes, or widget presentation grants artifact/Matrix permission.
- F3: Either cross-host change or V2 is absent/inconsistent at the observation boundary, changes identity, or silently loses/conflates the dirty draft or violates the selected adjudication policy.

## Implementation coverage

| Leg | Decision | Coverage |
|---|---|---|
| P1 | Both hosts expose one authoritative artifact and form contract | manual |
| P2 | Equal edits and permissions yield equal outcomes without escalation | manual |
| P3 | Manual/assisted updates propagate consistently with explicit draft handling | manual |
| F1 | Host identities, baselines or form contracts diverge | manual |
| F2 | Host outcomes diverge or widget placement escalates permission | manual |
| F3 | Cross-host updates or dirty-draft handling contradict the contract | manual |

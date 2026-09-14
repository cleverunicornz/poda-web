# Judge manual artifact workflow

## State

designed

## Judges

[P-000009](situation/promises/P-000009-manual-artifact-workflow.md)

## Inputs

Before a run, fix the source/build identity, production member entrypoint, supported host, member identity and service-owned permissions; the selected artifact/form contract; artifact A with baseline value V0; valid edit V1; invalid edit X and its expected validation outcome; a mutation denied by the owning service; and the observation window. A/V0/V1/X are scenario labels, not wire fields or a payload schema.

Retain a timestamped UI/action trace for load A, edit X, correct to V1, denied submission, accepted submission and reopen A; corresponding authoritative load/mutation outcomes; and a complete assistant-invocation trace for that sequence. State the contract-defined way acceptance and reopened values are compared. No assistant action is part of the input sequence.

Missing service contracts, an incomplete trace or an unexercised case prevents judgment; it is not a PASS or an invented product failure. All Pass legs are required; any observed Fail leg in the complete in-Scope evidence fails the Oracle. This is a future manual judgment design, not a run or executable check.

## Pass

- P1: The member completes load/edit/validate/submit without opening assistant conversation or invoking an assistant; the assistant-invocation trace contains no invocation throughout the sequence.
- P2: X yields the contract's expected validation outcome without a saved claim, and the service-denied submission remains visibly denied without a granted permission or saved claim.
- P3: V1 is shown saved only after service acceptance; reopening A returns A's authoritative V1 under the same identity.

## Fail

- F1: Any required manual step depends on opening/invoking the assistant, an assistant invocation occurs, or a required manual step is unavailable in the declared conditions.
- F2: X does not show the selected contract's expected validation outcome or is represented as saved, or the denied submission lacks a visible denial or is represented as permitted/saved.
- F3: A saved claim precedes acceptance, accepted V1 is not shown as saved by the declared observation boundary, or reopening after the accepted submission shows a different identity or a value inconsistent with authoritative V1.

## Implementation coverage

| Leg | Decision | Coverage |
|---|---|---|
| P1 | Complete manual sequence has no assistant dependency or invocation | manual |
| P2 | Invalid edit and denied mutation retain their contract outcomes | manual |
| P3 | Save claim and reopened identity/value match service acceptance | manual |
| F1 | Manual path is unavailable or requires/invokes assistant | manual |
| F2 | Invalid/denied outcome is falsely represented as valid/permitted/saved | manual |
| F3 | Saved claim or reopened artifact contradicts service outcome | manual |

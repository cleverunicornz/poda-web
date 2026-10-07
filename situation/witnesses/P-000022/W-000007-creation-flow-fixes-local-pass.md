# Creation-flow fixes, local build

## Promise

[P-000022](situation/promises/P-000022-creation-flow-fixes.md)

## Oracle

[O-000022](situation/oracles/O-000022-creation-flow-fixes.md)

## Result

PASS

## Head

`0c85c60c61`

## Observed

2026-10-07

## Evidence

- [Structured observation](situation/references/P-000022/creation-flow-fixes/observation.json).
- Screenshots in `situation/references/P-000022/creation-flow-fixes/`.
- The O-000022 command on the head: 4 files, 34 tests passed.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | Copy test passed; browser showed the session-only draft bar, the scheduled hero note, the new podcast guidance and status, and the Edit profile banner. |
| P2 | Inline errors for every failing field including the episode title; editing a field cleared only its error; the banner hid once all were corrected. |
| P3 | Route tests passed; New episode preselected the podcast; Open podcast and both Back actions reached their targets. |
| P4 | Label tests passed; a seasonless episode showed `E1 · scheduled`. |
| P5 | Placeholder colour rgba(99, 61, 29, 0.55) against text rgb(59, 37, 17). |

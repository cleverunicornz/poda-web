# Error banner visible with no field error left

## Promise

[P-000022](situation/promises/P-000022-creation-flow-fixes.md)

## Oracle

[O-000022](situation/oracles/O-000022-creation-flow-fixes.md)

## Result

FAIL

## Head

`4778887e67` (its `modules/poda-profile-spike/src/shared` and `src/studio` are
identical to `internal/main` `c573129238`)

## Observed

2026-10-08

## Evidence

- [Structured observation](situation/references/P-000022/error-banner/observation.json) (`fail`).
- [Banner visible after every field was corrected](situation/references/P-000022/error-banner/banner-visible-without-errors.png).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P2 / F2 | After correcting every failing podcast field no field error remained, but the banner stayed visible (`hidden` set, computed `display: flex`): F2 "the banner shown with no field error left". Other legs were not observed. |

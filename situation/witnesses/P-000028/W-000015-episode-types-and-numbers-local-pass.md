# Episode types and episode numbers, local build

## Promise

[P-000028](situation/promises/P-000028-episode-types-and-numbers.md)

## Oracle

[O-000028](situation/oracles/O-000028-episode-types-and-numbers.md)

## Result

PASS

## Head

`9ea389cd71`

## Observed

2026-10-08

## Evidence

- [Structured observation](situation/references/P-000028/episode-types/observation.json).
- [Scheduled full episode refused without a number](situation/references/P-000028/episode-types/scheduled-full-episode-needs-number.png);
  [aligned fields](situation/references/P-000028/episode-types/aligned-episode-fields.png).
- Module tests 81/81.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | Full episode, Trailer, Bonus. |
| P2 | Scheduled full episode refused without a number; scheduled trailer and draft created; tests passed. |
| P3 | Switching to Bonus cleared the error. |
| P4 | "S1 · Trailer · scheduled", "Field Notes · S1 · Trailer", "S2E1 · scheduled". |
| P5 | Row tops equal, left edges equal, input margins 0; tests passed. |

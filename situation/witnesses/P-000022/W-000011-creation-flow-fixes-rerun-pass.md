# Creation-flow fixes re-observed after the banner fix

## Promise

[P-000022](situation/promises/P-000022-creation-flow-fixes.md)

## Oracle

[O-000022](situation/oracles/O-000022-creation-flow-fixes.md)

## Result

PASS

## Head

`1e3a268248`

## Observed

2026-10-08

## Evidence

- [Structured observation](situation/references/P-000022/error-banner/observation.json) (`pass`):
  build and module digests, session, test results and per-leg observations.
- [Banner gone once every field was corrected](situation/references/P-000022/error-banner/banner-hidden-after-fix.png).
- The O-000022 command on the head: 5 files, 36 tests passed.

The banner leg is judged by the banner's rendered visibility (computed
`display` and Playwright visibility), not by its `hidden` attribute
([G-000033](situation/gaps/G-000033-error-banner-shown-when-hidden.md)).
Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | Copy test passed; the browser showed the podcast guidance and "Some sections still empty", the session-only draft bar, the scheduled hero note and the Edit profile banner. |
| P2 | Inline errors for every failing field on both wizards, including the episode title and season; editing a field cleared only its error; the banner was no longer rendered once all were corrected, on both wizards. |
| P3 | Route tests passed; New episode preselected the podcast; Open podcast, Back to episodes and Back to podcasts reached their targets. |
| P4 | Season tests passed; the season field was marked required and started at 1; an emptied season was rejected inline; the created episode showed `S2E4 · scheduled`. |
| P5 | Placeholder colour rgba(99, 61, 29, 0.55) against text rgb(59, 37, 17). |

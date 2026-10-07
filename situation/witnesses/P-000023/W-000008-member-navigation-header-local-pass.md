# Member navigation header without Diagnostic, local build

## Promise

[P-000023](situation/promises/P-000023-member-navigation-header.md)

## Oracle

[O-000023](situation/oracles/O-000023-member-navigation-header.md)

## Result

PASS

## Head

`ffb3ccf4b4`

## Observed

2026-10-07

## Evidence

- [Structured observation](situation/references/P-000023/member-navigation/observation.json):
  module and configuration digests, browser, homeserver, commands, results and
  per-leg observations.
- [Studio current in the header at 1440 × 900, Poda Light](situation/references/P-000023/member-navigation/header-studio-current.png).
- Module Playwright specification: 3 passed at the head; router regression:
  8 passed.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | Header above `#matrixchat`; header and application heights sum to the body height (specification). |
| P2 | Links exactly Chat, Profile, Studio, with no Diagnostic link (specification and browser); the former diagnostic address ended at Home with no diagnostic page; the module source registers no location. |
| P3 | Studio after click and refresh; Chat, Back and Forward kept one document, the user and the matching current control (specification). |
| P4 | `routing.test.ts` 8/8. |
| P5 | Light/Dark × 1440/500 matrix passed (specification). |
| P6 | Diff limited to `modules/poda-navigation-spike`; no reload, `location.assign`, `pageshow` or location registration in the module. |

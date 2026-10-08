# Chat/Studio polish, local build

## Promise

[P-000026](situation/promises/P-000026-plus-menu-and-polish.md)

## Oracle

[O-000026](situation/oracles/O-000026-plus-menu-and-polish.md)

## Result

PASS

## Head

`b170a08c78`

## Observed

2026-10-08

## Evidence

- [Structured observation](situation/references/P-000026/plus-and-polish/observation.json).
- Screenshots in `situation/references/P-000026/plus-and-polish/`.
- Tests: web 78/78 (six files), module 72/72.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | Widget without publish status, visibility switch or test button; Demo's card without empty sections or "not set"; tests passed. |
| P2 | Own widget open with no prompt; the other-origin widget prompted and did not load; approval tests passed. |
| P3 | No widget handshake errors. |
| P4 | "Creator profile", then "Profile" after Back. |
| P5 | Tooltip, links (own and others' bubbles) and Sections announcement text dark brown on amber or cream; theme test passed. |
| P6 | "Title and season" complete without an episode number; tests passed. |
| P7 | New podcast listed once in all three passes, one form each time. |

# Profile in the right panel and one-click widgets, local build

## Promise

[P-000021](situation/promises/P-000021-poda-profile-side-panel.md)

## Oracle

[O-000021](situation/oracles/O-000021-poda-profile-side-panel.md)

## Result

PASS

## Head

`81391f0f75`

## Observed

2026-10-07

## Evidence

- [Structured observation](situation/references/P-000021/profile-side-panel/observation.json):
  build identity, configuration, homeserver, widget, session, test results and
  per-leg observations.
- Screenshots in `situation/references/P-000021/profile-side-panel/`:
  `header-toggle-widget-pinned.png`, `user-info-view-profile.png`,
  `member-profile-card.png`, `own-profile-card.png`,
  `room-info-extensions-first.png`.
- The O-000021 Vitest command on the head: 4 files, 75 tests passed.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | View profile first among the user info actions for both users; focused tests cover absence without a renderer and the pushed `UserProfile` card. |
| P2 | Own card showed the five edited fields, Draft badge, Edit profile and session stats; the other member's card showed name, empty sections and Matrix ID only; both one column. |
| P3 | Back returned to the member's user info; Close closed the right panel; throwing renderer contained in focused tests. |
| P4 | Room info began with Extensions. |
| P5 | Header button hid the pinned widget on one click and showed it again on the next. |

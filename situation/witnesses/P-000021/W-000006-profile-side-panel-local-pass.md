# Profile in the right panel and side-panel-only profile widget, local build

## Promise

[P-000021](situation/promises/P-000021-poda-profile-side-panel.md)

## Oracle

[O-000021](situation/oracles/O-000021-poda-profile-side-panel.md)

## Result

PASS

## Head

`7f5635f1a0`

## Observed

2026-10-07

## Evidence

- [Structured observation](situation/references/P-000021/profile-side-panel/observation.json):
  build identity, configuration, homeserver, widget and stored layout, session,
  test results and per-leg observations.
- Screenshots in `situation/references/P-000021/profile-side-panel/`:
  `widget-from-extensions-in-side-panel.png`, `extensions-no-pin.png`,
  `own-profile-card.png`, `member-profile-card.png`,
  `user-info-view-profile.png`.
- The O-000021 Vitest command on the head: 7 files, 113 tests passed.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | View profile first among the user info actions for both users (also observed from a timeline avatar at `6fb6f0bcd1`, with the panel unchanged since); focused tests cover absence without a renderer and the pushed `UserProfile` card. |
| P2 | Own card showed the edited fields, Draft badge, Edit profile and session stats; the other member's card showed name, empty sections and Matrix ID only; both one column. |
| P3 | Back returned to the member's user info; Close closed the right panel; throwing renderer contained in focused tests. |
| P4 | Room info began with Extensions. |
| P5 | Stored pin ignored (nothing above the timeline); no header button; the Extensions entry opened the widget in the right panel and showed no pin control; focused layout-store tests cover pin, maximise and move requests. |

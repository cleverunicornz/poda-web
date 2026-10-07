# Profile in the right panel and one-click room widgets

## State

assured

## Promise

In Poda Web with the Poda profile module loaded:

1. The user info panel for any user offers **View profile** as its first
   action; it is absent when no module has set a profile renderer.
2. **View profile** opens a right panel card titled Profile that shows the
   shared profile view for that user, one column wide: for the signed-in user,
   the creator fields last saved on the Profile page in this session, with a
   status badge and an Edit profile action; for any other member, their display
   name and Matrix ID with empty sections and no status badge.
3. The card offers back navigation to the user info panel and closing, and a
   failure inside the module's content stays inside the card.
4. Extensions is the first item of the room info panel.
5. With `widget-toggles` configured for `io.poda.profile`, a room carrying the
   Poda profile widget shows a room header button that pins the widget above
   the timeline with one click and unpins it with a second.

## Scope

The web client in `apps/web/`, the alpha `extras.setUserProfilePanel` method in
`packages/module-api/`, the `modules/poda-profile-spike/` renderer and its
session adapter, and `modules/widget-toggles/` configured as in
`modules/poda-profile-spike/README.md`, per
[D-000024](situation/decisions/D-000024-poda-profile-side-panel.md).

## Oracle

[O-000021](situation/oracles/O-000021-poda-profile-side-panel.md)

## State evidence

- [D-000024](situation/decisions/D-000024-poda-profile-side-panel.md) selects the
  behavior.
- `implemented`: commits `55edc140ab` and `81391f0f75` on branch
  `internal/profile-side-panel` (alpha `extras.setUserProfilePanel`, the
  `UserProfile` card, View profile, Extensions first, the module renderer and
  focused tests).
- `assured`: [O-000021](situation/oracles/O-000021-poda-profile-side-panel.md)
  passed on [W-000006](situation/witnesses/P-000021/W-000006-profile-side-panel-local-pass.md)
  at `81391f0f75`, covering every leg; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Residual

This promise does not assure:

- creator data for members other than the signed-in user, or persistence beyond
  the session (G-000004, G-000005);
- the widget's own content (P-000019) or opening the widget in the right panel;
- the panel in Element Desktop, or under right-panel state restored after a
  reload.

## References

- [D-000024](situation/decisions/D-000024-poda-profile-side-panel.md)

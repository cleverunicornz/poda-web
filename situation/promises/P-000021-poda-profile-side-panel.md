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
5. A room carrying a Poda profile widget (type `io.poda.profile`) shows a room
   header button that opens the widget in the right panel with one click and
   closes it with a second; the widget never appears above the timeline or
   maximised, even when a layout or pin request asks for it, and the
   Extensions list offers no pin for it.

## Scope

The web client in `apps/web/`, the alpha `extras.setUserProfilePanel` method in
`packages/module-api/`, the `modules/poda-profile-spike/` renderer and its
session adapter, and the side-panel-only widget rule in
`apps/web/src/podaWidgetPolicy.ts`, per
[D-000024](situation/decisions/D-000024-poda-profile-side-panel.md).

## Oracle

[O-000021](situation/oracles/O-000021-poda-profile-side-panel.md)

## State evidence

- [D-000024](situation/decisions/D-000024-poda-profile-side-panel.md) selects the
  behavior.
- `implemented`: commits `55edc140ab`, `81391f0f75` and `6fb6f0bcd1` on branch
  `internal/profile-side-panel` (alpha `extras.setUserProfilePanel`, the
  `UserProfile` card, View profile, Extensions first, the side-panel-only
  widget rule and header button, the module renderer and focused tests).
- `assured`: [O-000021](situation/oracles/O-000021-poda-profile-side-panel.md)
  passed on [W-000006](situation/witnesses/P-000021/W-000006-profile-side-panel-local-pass.md)
  at `6fb6f0bcd1`, covering every leg; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Residual

This promise does not assure:

- creator data for members other than the signed-in user, or persistence beyond
  the session (G-000004, G-000005);
- the widget's own content (P-000019) or Element's one-time widget approval
  prompt (G-000030);
- the panel in Element Desktop, or under right-panel state restored after a
  reload.

## References

- [D-000024](situation/decisions/D-000024-poda-profile-side-panel.md)

# Oracle for the profile right panel and one-click room widgets

## State

implemented

## Judges

[P-000021](situation/promises/P-000021-poda-profile-side-panel.md)

## Inputs

- The exact Git head and its diff against `internal/main`.
- The focused Vitest command below and its result on that head, plus the
  profile module's adapter tests and build.
- A signed-in browser observation of a build of that head with the Poda
  profile module and `widget-toggles` configured for `io.poda.profile`, against
  a local Synapse with a room carrying the Poda profile widget and a second
  member: the user info panel for the signed-in user and for the other member,
  the Profile card for each, a Profile page edit followed by reopening the own
  card, back and close, the room info panel, and the header toggle pressed
  twice.
- Missing head, test or browser evidence makes an observation `INVALID` or
  `BLOCKED`, never PASS.

## Pass

- **P1 — Action.** View profile is the first user info action for both users
  in the browser; focused tests show it absent without a renderer and opening
  a `UserProfile` card for the member.
- **P2 — Content.** The own card shows the edited creator fields, a status
  badge and Edit profile; the other member's card shows their display name and
  Matrix ID, empty sections and no status badge; both are one column at the
  panel width.
- **P3 — Card.** Back returns to the user info panel and close closes the right
  panel; focused tests show a throwing renderer contained inside the card.
- **P4 — Extensions.** Extensions is the first room info item.
- **P5 — Header toggle.** One click on the room header button shows the profile
  widget above the timeline; a second hides it.

## Fail

- **F1** — View profile missing, not first, shown without a renderer, or
  opening anything other than the member's Profile card.
- **F2** — own edits missing from the card, another member shown with creator
  data or a status badge, or a two-column layout in the panel.
- **F3** — back or close not working, or a renderer failure escaping the card.
- **F4** — Extensions not first.
- **F5** — no header button, or the widget not shown/hidden by it.

## Implementation

From `apps/web/`:

```sh
pnpm exec vitest run src/components/views/right_panel/UserProfileCard.test.tsx \
  src/components/views/right_panel/user_info/UserInfoBasicOptionsView.test.tsx \
  src/components/views/right_panel/RoomSummaryCardView.test.tsx \
  src/stores/right-panel/RightPanelStore.test.ts
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | View profile presence, order and card | `UserInfoBasicOptionsView.test.tsx` "View profile"; browser order manual |
| P2 / F2 | Profile content and layout | manual |
| P3 / F3 | Card navigation and containment | `UserProfileCard.test.tsx`, `RightPanelStore.test.ts` "UserProfile"; back/close manual |
| P4 / F4 | Extensions first | `RoomSummaryCardView.test.tsx` "offers Extensions as the first menu item" |
| P5 / F5 | Header widget toggle | manual |

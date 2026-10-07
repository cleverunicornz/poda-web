# Oracle for the profile right panel and side-panel-only profile widget

## State

implemented

## Judges

[P-000021](situation/promises/P-000021-poda-profile-side-panel.md)

## Inputs

- The exact Git head and its diff against `internal/main`.
- The focused Vitest command below and its result on that head, plus the
  profile module's adapter tests and build.
- A signed-in browser observation of a build of that head with the Poda
  profile module, against a local Synapse with a room carrying a widget of
  type `io.poda.profile` whose stored user layout pins it above the timeline,
  and a second member: the user info panel for the signed-in user and for the other member,
  the Profile card for each, a Profile page edit followed by reopening the own
  card, back and close, the room header, and the room info panel and its
  Extensions list with the widget opened from it.
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
- **P5 — Side-panel widget.** Despite the stored pin, nothing appears above the
  timeline; the room header has no button for the widget; opening the widget
  from the Extensions list shows it in the right panel; the Extensions list
  shows no pin control for it; focused tests show layout pins, maximise and
  move requests leaving it in the right container.

## Fail

- **F1** — View profile missing, not first, shown without a renderer, or
  opening anything other than the member's Profile card.
- **F2** — own edits missing from the card, another member shown with creator
  data or a status badge, or a two-column layout in the panel.
- **F3** — back or close not working, or a renderer failure escaping the card.
- **F4** — Extensions not first.
- **F5** — the widget above the timeline or maximised, a header button for it,
  the Extensions entry not opening it in the right panel, or a pin control
  offered.

## Implementation

From `apps/web/`:

```sh
pnpm exec vitest run src/components/views/right_panel/UserProfileCard.test.tsx \
  src/components/views/right_panel/user_info/UserInfoBasicOptionsView.test.tsx \
  src/components/views/right_panel/RoomSummaryCardView.test.tsx \
  src/stores/right-panel/RightPanelStore.test.ts \
  src/components/views/right_panel/ExtensionsCard.test.tsx \
  src/stores/widgets/WidgetLayoutStore.test.ts \
  src/podaWidgetPolicy.test.ts
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | View profile presence, order and card | `UserInfoBasicOptionsView.test.tsx` "View profile"; browser order manual |
| P2 / F2 | Profile content and layout | manual |
| P3 / F3 | Card navigation and containment | `UserProfileCard.test.tsx`, `RightPanelStore.test.ts` "UserProfile"; back/close manual |
| P4 / F4 | Extensions first | `RoomSummaryCardView.test.tsx` "offers Extensions as the first menu item" |
| P5 / F5 | Side-panel-only widget | `WidgetLayoutStore.test.ts` "Poda side-panel-only widgets", `ExtensionsCard.test.tsx`, `podaWidgetPolicy.test.ts`; browser manual |

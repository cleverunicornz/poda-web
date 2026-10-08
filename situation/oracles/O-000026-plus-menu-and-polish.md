# Oracle for the "+" composer menu and polish

## State

implemented

## Judges

[P-000026](situation/promises/P-000026-plus-menu-and-polish.md)

## Inputs

- The exact Git head and its diff against `internal/main`.
- The test commands below and their results on that head.
- A signed-in browser observation of a build of that head at 1440 × 900 in
  Poda Light against a local Synapse with the profile widget served by the app
  and a same-type widget on another origin: the composer, a header tooltip,
  links in own and others' messages, the Sections announcement for a new
  account, both widgets opened by a member who had not approved them, View
  profile and Back, the episode wizard, and three quick create-and-navigate
  passes.
- Missing head, test or browser evidence makes an observation `INVALID` or
  `BLOCKED`, never PASS.

## Pass

- **P1** — "Attach or share" with a plus icon whose menu lists Attachment and
  Share to chat; component tests show the default paperclip and the custom
  trigger.
- **P2** — the app-served widget renders with no prompt; the other-origin
  widget shows "Widget added by … Continue" and no frame; approval tests pass.
- **P3** — no "unknown widget ID" or content-loaded error in the console while
  the widget loads.
- **P4** — card heading "Creator profile", then "Profile" after Back; the card
  test passes.
- **P5** — measured tooltip, link and announcement colours give at least 4.5:1;
  the theme test passes for the tooltip pair in both themes.
- **P6** — the first readiness item reads "Title and season" and is complete
  with title and default season only; readiness tests pass.
- **P7** — in three passes the new podcast is listed once and one form exists.

## Fail

- **F1** — paperclip or another label with several options, or a missing item.
- **F2** — a prompt for the app's own widget, or none for the other origin.
- **F3** — either widget error logged.
- **F4** — both cards titled "Profile", or Back elsewhere.
- **F5** — any named pair below 4.5:1.
- **F6** — the item named or judged by the episode number.
- **F7** — the podcast missing or a duplicated form.

## Implementation

From `packages/shared-components/` (browser mode):

```sh
pnpm exec vitest run src/room/composer/UploadButton
```

From `apps/web/`:

```sh
pnpm exec vitest run src/podaTheme.test.ts src/components/views/right_panel/UserProfileCard.test.tsx \
  src/components/views/rooms/MessageComposerButtons.test.tsx src/components/views/rooms/MessageComposer.test.tsx
```

From `modules/poda-profile-spike/`:

```sh
pnpm exec vitest run
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Menu trigger | `UploadButton.test.tsx` "can give the menu button its own label and icon"; browser manual |
| P2 / F2 | Own-widget preload approval | `widgetApproval.test.js`; browser manual |
| P3 / F3 | Widget handshake | manual |
| P4 / F4 | Card titles | `UserProfileCard.test.tsx`; browser manual |
| P5 / F5 | Contrast | `podaTheme.test.ts` "keeps core text and action pairs at normal-text contrast"; browser manual |
| P6 / F6 | Episode readiness | `episodeReadiness.test.js`; browser manual |
| P7 / F7 | Studio route races | manual |

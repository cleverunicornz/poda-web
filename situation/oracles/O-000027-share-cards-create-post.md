# Oracle for share cards from Create post and Share to chat

## State

implemented

## Judges

[P-000027](situation/promises/P-000027-share-cards-create-post.md)

## Inputs

- The exact Git head and its diff against `internal/main`.
- The test commands below and their results on that head.
- A signed-in browser observation of a build of that head at 1440 × 900
  against a local Synapse with a member in several chats: the top bar, the
  composer, Create post from a chat, a post to a different chat, Share to chat
  from a podcast page, an episode page and the Profile page, the posted card's
  link, another member's View profile and Back, and existing cards with markup,
  a `javascript:` link and an unknown snapshot version.
- Missing head, test or browser evidence makes an observation `INVALID` or
  `BLOCKED`, never PASS.

## Pass

- **P1** — Create post visible with the stated tooltip, shown on hover; Share
  to chat on the three pages opens the dialog with the podcast, episode or
  profile selected; the composer shows only Attachment; the module end-to-end
  test passes.
- **P2** — Post to lists only the member's joined, postable, non-space chats and
  defaults to the viewed chat; kinds and types as stated; host tests pass.
- **P3** — model tests for validation pass; the dialog refuses a missing chat.
- **P4** — a post to another chat appears there as a card and that chat opens;
  model and host tests for content and sending pass.
- **P5** — the card shows its fields, a link button `_blank` with `noopener
  noreferrer nofollow`, and no Edit.
- **P6** — View profile opens the sender's Creator profile card; Back shows the
  user info.
- **P7** — markup shown as text with no link or image; the unknown version shown
  as its body.

## Fail

- **F1** — a missing entry point, tooltip or preselection, or a share option in
  the composer.
- **F2** — a space, unjoined or unpostable chat listed, or the wrong default.
- **F3** — an invalid draft posted.
- **F4** — the post missing from the chosen chat or posted elsewhere.
- **F5** — a missing field, wrong link attributes, or Edit offered.
- **F6** — the wrong profile or Back elsewhere.
- **F7** — markup interpreted, a non-http(s) link rendered, or a malformed card.

## Implementation

From `modules/poda-profile-spike/`:

```sh
pnpm exec vitest run
```

From `apps/web/`:

```sh
pnpm exec vitest run src/modules/ExtrasApi.test.ts
```

From `modules/` (against a served build of the head):

```sh
BASE_URL=<served build> pnpm exec playwright test --project @poda/web-module-navigation-spike
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Entry points | `navigation.spec.ts` "offers Create post…", `routes.test.js` "adds Share to chat…"; browser manual |
| P2 / F2 | Post to | `ExtrasApi.test.ts` "getPostableRooms"; browser manual |
| P3 / F3 | Validation | `shareModel.test.js` "validateShareDraft"; browser manual |
| P4 / F4 | Post | `shareModel.test.js` "buildShareContent", `ExtrasApi.test.ts` "sendRoomMessage"; browser manual |
| P5 / F5 | Card | `shareModel.test.js` "shareCardHtml"; browser manual |
| P6 / F6 | View profile | `ExtrasApi.test.ts` "openUserProfilePanel"; browser manual |
| P7 / F7 | Untrusted content | `shareModel.test.js` "parseShareContent", "safeUrl"; browser manual |

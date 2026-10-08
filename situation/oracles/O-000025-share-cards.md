# Oracle for share cards

## State

implemented

## Judges

[P-000025](situation/promises/P-000025-share-cards.md)

## Inputs

- The exact Git head and its diff against `internal/main`.
- The module Vitest command and the host Vitest command below, with results,
  plus the module type check and build.
- A signed-in browser observation of a build of that head at 1440 × 900 against
  a local Synapse with two members of one room: the sender's upload menu and
  dialog (empty submit, an unsafe link, then a valid post) for a podcast and an
  episode, a profile post by the other member, both members' timelines, View
  profile and Back from the other member's side, and the sender's message
  options.
- The posted events' content read from the homeserver, and two events sent
  straight to the homeserver: one with markup in its fields and a
  `javascript:` link, one with an unknown snapshot version.
- Missing head, test or browser evidence makes an observation `INVALID` or
  `BLOCKED`, never PASS.

## Pass

- **P1 — Entry and dialog.** The upload menu lists Share to chat; the dialog
  offers the three kinds, the item, each kind's exact post types, description
  and link fields, and a preview that matches the inputs.
- **P2 — Validation.** An empty submit shows item and type errors with the
  banner; an unsafe link is refused inline; once corrected no error and no
  visible banner remain. Model tests cover the description and link rules.
- **P3 — Event.** The homeserver holds `m.room.message` events with
  `msgtype` `io.poda.share`, the expected `body` and snapshot; host tests show
  `sendRoomMessage` sending the content and refusing content without a body.
- **P4 — Card.** Both members' timelines show the cards with every present
  field, View profile, and a link button with `target="_blank"` and
  `rel="noopener noreferrer nofollow"` only when a link was set; the sender's
  message actions and options have no Edit.
- **P5 — View profile.** From the other member's timeline, View profile opens
  the sender's profile card in the right panel; Back shows the sender's user
  info; host tests cover the cards set and the user fallback.
- **P6 — Untrusted content.** The markup event renders as literal text with no
  link and no script effect; the unknown-version event shows its body, not a
  card; model tests cover escaping, URL filtering and bounds.

## Fail

- **F1** — no Share to chat entry, a missing kind or type, or a preview that
  disagrees with the inputs.
- **F2** — an invalid draft posted, an error missing, or the banner visible with
  no error left.
- **F3** — a different event type or msgtype, a missing body or snapshot field.
- **F4** — a field missing from the card, a link button without a link or with
  other attributes, or Edit offered.
- **F5** — View profile not opening the sender's profile card, or Back going
  elsewhere.
- **F6** — markup interpreted, a non-http(s) link rendered, or a malformed
  snapshot rendered as a card.

## Implementation

From `modules/poda-profile-spike/`:

```sh
pnpm exec vitest run
```

From `apps/web/`:

```sh
pnpm exec vitest run src/modules/ExtrasApi.test.ts
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Entry, kinds, types, preview | `shareModel.test.js` "post types"; browser manual |
| P2 / F2 | Draft validation and banner | `shareModel.test.js` "validateShareDraft", `nativeTheme.test.js`; browser manual |
| P3 / F3 | Event content and sending | `shareModel.test.js` "buildShareContent", `ExtrasApi.test.ts` "sendRoomMessage"; homeserver read manual |
| P4 / F4 | Card rendering | `shareModel.test.js` "shareCardHtml"; browser manual |
| P5 / F5 | View profile in the right panel | `ExtrasApi.test.ts` "openUserProfilePanel"; browser manual |
| P6 / F6 | Untrusted content | `shareModel.test.js` "parseShareContent", "safeUrl", "shareCardHtml"; browser manual |

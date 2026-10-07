# Oracle for Poda chat controls

## State

implemented

## Judges

[P-000020](situation/promises/P-000020-poda-chat-controls.md)

## Inputs

- The exact Git head and its diff against `internal/main`.
- The focused Vitest command below and its result on that head.
- A signed-in browser observation of a build of that head, using the default
  configuration plus a homeserver URL and the Poda modules, against a local
  Synapse with: a `public` room, a `restricted` room whose allow rule names a
  space, an `invite` group room and a direct message; a second member at power
  level 0; and a room created through Poda's create-room dialog.
- The `m.room.power_levels` content of the room created through Poda, and the
  homeserver's response when a power-level-0 member sends `m.poll.start` there.
- Missing head, test or browser evidence makes an observation `INVALID` or
  `BLOCKED`, never PASS.

## Pass

- **P1 — Calls.** No voice or video call button in the public and restricted
  rooms (focused tests also cover `knock`, a 1,000-member public room and a
  live invite→public change); both call buttons are present in the invite-only
  room and the direct message.
- **P2 — Voice messages.** No voice-message control in the public and
  restricted rooms; in the invite-only room and direct message it is on the
  composer bar, not in the overflow menu.
- **P3 — Polls.** The room created through Poda has power level 100 for
  `m.poll.start` and `org.matrix.msc3381.poll.start`; the homeserver rejects a
  power-level-0 member's poll start there; that member's composer offers no
  poll control while the admin's does.
- **P4 — Stickers and location.** No sticker or location control in any room
  under the default configuration.
- **P5 — View source.** A message's Options menu has no View source item with
  developer mode off and has one with it on.
- **P6 — Threads.** The room header offers Threads; the room info panel and the
  space panel do not.

## Fail

- **F1** — a call button in a non-private room, or missing from a private
  conversation where Element's existing conditions allow calls.
- **F2** — a voice-message control in a non-private room, or in the overflow
  menu of a private conversation at desktop width.
- **F3** — a different or missing poll power level, a poll start accepted from
  a power-level-0 member, or a poll control offered to a member who may not
  start polls.
- **F4** — a sticker or location control under the default configuration.
- **F5** — View source outside developer mode.
- **F6** — Threads missing from the header, or present in the room info panel
  or space panel.

## Implementation

From `apps/web/`:

```sh
pnpm exec vitest run src/podaChatPolicy.test.ts src/SdkConfig.test.ts \
  src/createRoom.test.ts src/components/views/rooms/RoomHeader/RoomHeader.test.tsx \
  src/components/views/rooms/MessageComposerButtons.test.tsx \
  src/components/views/context_menus/MessageContextMenu.test.tsx \
  src/components/views/right_panel/RoomSummaryCardView.test.tsx \
  src/components/views/spaces/SpacePanel.test.tsx
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Call buttons by join rule, size and live change | `RoomHeader.test.tsx` "Poda: calls only in private conversations", `podaChatPolicy.test.ts`; browser rooms manual |
| P2 / F2 | Voice-message placement by join rule | `MessageComposerButtons.test.tsx` "Poda chat controls"; browser manual |
| P3 / F3 | Poll power levels at creation and composer gating | `createRoom.test.ts` "Poda poll power levels", `MessageComposerButtons.test.tsx`; homeserver rejection manual |
| P4 / F4 | Sticker and location defaults | `SdkConfig.test.ts`; browser manual |
| P5 / F5 | View source behind developer mode | `MessageContextMenu.test.tsx` "view source" |
| P6 / F6 | Threads entry points | `RoomSummaryCardView.test.tsx`, `SpacePanel.test.tsx`; header manual |

# Poda chat controls follow room privacy and permissions

## Status

accepted

## Date

2026-10-07

## Context

A signed-in walk-through of the Poda build at `f11fe6c0b2` (2026-10-06)
inventoried every chat control Element offers: room-header voice/video call
buttons, the composer's sticker, voice-message, poll and location options, the
message Options menu including View source, and Threads reached from three
places (room header, room info panel, space-panel activity centre). Poda's
community rooms can hold very large audiences: D-000012 provisions
space-restricted rooms that any space member joins without an invitation.
The maintainer adjudicated each control on 2026-10-07.

## Evidence

- Maintainer selections on 2026-10-07, in answer to the inventory: calls only in
  private rooms ("public rooms that might have 1000 people shouldn't have a
  voice call/video call option"); no voice messages in public chats; polls only
  by a room's admins; stickers, location, View source off; Threads in one
  place; voice message more reachable. "Private" was then selected as
  invite-only rooms plus direct messages, and the admin-only poll rule as
  applying in every room, official rooms included.
- `apps/web/src/hooks/room/useRoomCall.ts` decides call-button visibility from
  member count, widget/VoIP features and permissions; it has no room-privacy
  input.
- `apps/web/src/components/views/rooms/MessageComposerButtons.tsx` always
  offers voice messages and offers polls to members who lack permission,
  answering with an error dialog only after the click.
- `apps/web/src/components/views/context_menus/MessageContextMenu.tsx`
  deliberately leaves View source outside the developer-mode flag.
- `packages/module-api/src/api/` exposes no seam that removes or gates these
  host-owned controls; `apps/web/src/settings/UIFeature.ts` and
  `apps/web/src/settings/Settings.tsx` provide configuration-level switches for
  location sharing and the sticker picker only.

## Decision

- **Private conversation.** A room whose join rule is `invite` (or the reserved
  `private`) is a private conversation; direct messages are invite-only rooms.
  `public`, `restricted`, `knock` and `knock_restricted` rooms are not.
- **Calls.** Voice and video call buttons appear only in private conversations,
  in addition to Element's existing conditions.
- **Voice messages.** The voice-message control appears only in private
  conversations, and there it sits on the composer bar rather than in the
  overflow menu.
- **Polls.** Rooms created from Poda (not spaces) set the power level for
  starting polls (`m.poll.start` and `org.matrix.msc3381.poll.start`) to 100,
  so the homeserver admits only room admins. The composer offers the poll
  control only to members whose power level permits it.
- **Stickers and location.** Off by default through `setting_defaults`
  (`MessageComposerInput.showStickersButton`, `UIFeature.locationSharing`).
- **View source.** Offered only in developer mode.
- **Threads.** Reached from the room header only; the room info panel entry and
  the space-panel activity centre are removed.
- The host changes are isolated, explicitly marked Element core changes in the
  files named above plus `createRoom.ts`, `RoomSummaryCardView.tsx` and
  `SpacePanel.tsx`, with the shared rule in `apps/web/src/podaChatPolicy.ts`.

## Why

Large rooms should not offer controls that make no sense at that scale or
invite abuse. The join rule is the room's own, server-held statement of who may
enter, so it is a stable, explainable boundary that does not drift with member
count. Poll authority belongs to the room's power levels at the homeserver
(I-000007); the frontend only reflects that permission. No exported module seam
reaches these host-owned controls, so I-000010 requires explicit, isolated core
changes rather than DOM manipulation from a module.

## Rejected alternatives

- Member-count cutoff for calls and voice messages: rejected by the maintainer;
  a count changes over time and does not say who may join.
- Treat only fully public rooms as non-private: rejected by the maintainer;
  space-restricted community rooms can be as large as public ones.
- Turn calls off globally with `UIFeature.voip`: rejected; private
  conversations keep calls.
- Polls only in user-created rooms: rejected by the maintainer in favour of one
  rule — room admins anywhere.
- Hide the poll control without a power-level rule: rejected; another Matrix
  client could still start polls, contrary to I-000007.
- Hide controls from a module with CSS or DOM changes: rejected under I-000010.

## Consequences

- P-000020 states the observable behavior; O-000020 judges it.
- I-000003 bounds the first visual migration (D-000007). This decision is a
  separate, maintainer-selected product change and does not reinterpret that
  migration's scope.
- Rooms created before this change, or created outside Poda (including the
  D-000012 provisioning), keep their existing poll power level until an admin
  or provisioning changes it.
- The call and voice-message limits are presentation in this client; another
  Matrix client is not bound by them.

## Revisit when

The maintainer wants calls or voice messages in some larger rooms (for example
moderated live sessions), a server-side policy for calls or voice messages
becomes available, or upstream Element exposes a supported seam for these
controls.

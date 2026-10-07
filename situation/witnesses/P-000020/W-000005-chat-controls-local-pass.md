# Poda chat controls, local build and homeserver

## Promise

[P-000020](situation/promises/P-000020-poda-chat-controls.md)

## Oracle

[O-000020](situation/oracles/O-000020-poda-chat-controls.md)

## Result

PASS

## Head

`07867e4a7e`

## Observed

2026-10-07

## Evidence

- [Structured observation](situation/references/P-000020/chat-controls/observation.json):
  build identity, homeserver, users, rooms, test result and per-leg
  observations.
- Screenshots in `situation/references/P-000020/chat-controls/`:
  `public-room-admin.png`, `invite-room-message-options.png`,
  `invite-room-info-panel.png`, `poda-created-room-member.png`.
- The O-000020 Vitest command on the head: 8 files, 192 tests passed.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | No call buttons in the public and restricted rooms for the admin or the member; both call buttons in the invite room, DM and Poda-created room. Focused tests: knock, 1,000-member public room, live invite→public change. |
| P2 | Voice Message on the composer bar in the invite room, DM and Poda-created room, absent from their overflow menus; no voice-message control in the public and restricted rooms. |
| P3 | Poda-created room: both poll event types at power level 100; the member's poll starts rejected 403 and the admin's accepted; the member's composer offers no poll control. |
| P4 | No Sticker or Location item in any overflow menu under the default configuration. |
| P5 | View source absent with developer mode off, present with it on. |
| P6 | Threads in the room header; absent from the room info panel and the space panel. |

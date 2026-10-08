# Chat controls with admin-only polls, local build

## Promise

[P-000024](situation/promises/P-000024-poda-chat-controls-admin-polls.md)

## Oracle

[O-000024](situation/oracles/O-000024-poda-chat-controls-admin-polls.md)

## Result

PASS

## Head

`f90c994814`

## Observed

2026-10-08

## Evidence

- [Structured observation](situation/references/P-000024/chat-controls-admin-polls/observation.json):
  build, configuration, homeserver, rooms, users, test results and per-leg
  observations.
- [Mira, power level 0, in a public room that allows member polls: no Poll](situation/references/P-000024/chat-controls-admin-polls/public-room-member-no-poll.png).
- [Demo, the room's creator, in the same room: Poll offered](situation/references/P-000024/chat-controls-admin-polls/public-room-creator-poll.png).
- The O-000024 Vitest command on the head: 9 files, 234 tests passed.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | No call buttons in the public and restricted rooms; Video call and Voice call in the invite, direct message and Poda-created rooms; focused tests passed. |
| P2 | Voice Message on the composer bar only in the invite, direct message and Poda-created rooms. |
| P3 | Poda-created room poll power levels 100; Mira's poll starts there rejected 403; Mira offered no Poll anywhere except her own direct message, including rooms that would let her start polls; Demo offered Poll in every room; focused tests passed. |
| P4 | No Sticker or Location control in any room. |
| P5 | View source tests passed. |
| P6 | Threads in the room header only, not in the room info panel or the space menu. |

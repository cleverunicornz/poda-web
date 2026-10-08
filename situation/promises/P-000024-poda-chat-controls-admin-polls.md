# Poda chat controls with polls for room admins only

## State

assured

## Promise

In Poda Web's room view:

1. Voice and video call buttons appear only in private conversations (rooms
   whose join rule is `invite` or `private`, which includes direct messages),
   never in `public`, `restricted`, `knock` or `knock_restricted` rooms, and
   they follow a join-rule change without reopening the room.
2. The voice-message control appears only in private conversations, on the
   composer bar at desktop width.
3. Rooms created from Poda, other than spaces, require power level 100 to start
   a poll. In every room, the composer offers the poll control only to room
   admins (power level 100 or more, including privileged room creators) whose
   power level also permits starting one; other members are not offered it even
   where the room would let them start polls.
4. The sticker picker and location sharing are off by default.
5. View source is offered in a message's menu only in developer mode.
6. Threads is reached from the room header; the room info panel and the space
   panel do not offer it.

## Scope

The Element-derived web client in `apps/web/` with its default configuration
(`apps/web/src/SdkConfig.ts` `DEFAULTS`), as changed by
[D-000023](situation/decisions/D-000023-poda-chat-controls.md) and
[D-000027](situation/decisions/D-000027-admin-only-polls-everywhere.md). Covers
room creation through `apps/web/src/createRoom.ts` and the room header,
composer, message menu, room info panel and space panel presentations.

## Oracle

[O-000024](situation/oracles/O-000024-poda-chat-controls-admin-polls.md)

## State evidence

- [D-000027](situation/decisions/D-000027-admin-only-polls-everywhere.md)
  selects this behavior and supersedes
  [P-000020](situation/promises/P-000020-poda-chat-controls.md); clauses 1, 2
  and 4–6 are P-000020's, unchanged.
- `implemented`: commits `dbd8931097` and `f90c994814` on branch
  `internal/admin-only-polls`.
- `assured`: [O-000024](situation/oracles/O-000024-poda-chat-controls-admin-polls.md)
  passed on [W-000009](situation/witnesses/P-000024/W-000009-chat-controls-admin-polls-local-pass.md)
  at `f90c994814`, covering every leg; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Residual

This promise does not assure:

- behavior of other Matrix clients, which can still place calls or send voice
  messages in any room, and start polls in rooms whose power levels allow
  members to (D-000023, D-000027 Consequences);
- the poll power level stored in rooms created before D-000023 or outside Poda,
  including D-000012 provisioning;
- video rooms, Element Call or Jitsi behavior once a call is running, and the
  `/devtools` dialog;
- Element Desktop packaging.

## References

- [D-000023](situation/decisions/D-000023-poda-chat-controls.md)
- [D-000027](situation/decisions/D-000027-admin-only-polls-everywhere.md)
- [Superseded P-000020](situation/promises/P-000020-poda-chat-controls.md)

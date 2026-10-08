# Poda chat controls follow room privacy and permissions

## State

superseded

## Promise

In Poda Web's room view:

1. Voice and video call buttons appear only in private conversations (rooms
   whose join rule is `invite` or `private`, which includes direct messages),
   never in `public`, `restricted`, `knock` or `knock_restricted` rooms, and
   they follow a join-rule change without reopening the room.
2. The voice-message control appears only in private conversations, on the
   composer bar at desktop width.
3. Rooms created from Poda, other than spaces, require power level 100 to start
   a poll, and the composer offers the poll control only to members whose power
   level permits starting one.
4. The sticker picker and location sharing are off by default.
5. View source is offered in a message's menu only in developer mode.
6. Threads is reached from the room header; the room info panel and the space
   panel do not offer it.

## Scope

The Element-derived web client in `apps/web/` with its default configuration
(`apps/web/src/SdkConfig.ts` `DEFAULTS`), as changed by
[D-000023](situation/decisions/D-000023-poda-chat-controls.md). Covers room
creation through `apps/web/src/createRoom.ts` and the room header, composer,
message menu, room info panel and space panel presentations.

## Oracle

[O-000020](situation/oracles/O-000020-poda-chat-controls.md)

## State evidence

- [D-000023](situation/decisions/D-000023-poda-chat-controls.md) selects the
  behavior.
- `implemented`: commit `07867e4a7e` on branch `internal/chat-controls`
  (`apps/web/src/podaChatPolicy.ts` and the isolated core changes named in
  D-000023, with focused tests).
- `assured`: [O-000020](situation/oracles/O-000020-poda-chat-controls.md)
  passed on [W-000005](situation/witnesses/P-000020/W-000005-chat-controls-local-pass.md)
  at that head, covering every leg; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).
- `superseded`: by [P-000024](situation/promises/P-000024-poda-chat-controls-admin-polls.md)
  under [D-000027](situation/decisions/D-000027-admin-only-polls-everywhere.md),
  which offers the poll control to room admins only in every room.

## Residual

This promise does not assure:

- behavior of other Matrix clients, which can still place calls or send voice
  messages in any room (D-000023 Consequences);
- the poll power level of rooms created before this change or outside Poda,
  including D-000012 provisioning
  ([G-000027](situation/gaps/G-000027-existing-room-poll-power-levels.md));
- video rooms, Element Call or Jitsi behavior once a call is running, and the
  `/devtools` dialog;
- Element Desktop packaging.

## References

- [D-000023](situation/decisions/D-000023-poda-chat-controls.md)

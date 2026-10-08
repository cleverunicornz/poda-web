# Offer polls to room admins only, in every room

## Status

accepted

## Date

2026-10-08

## Context

[D-000023](situation/decisions/D-000023-poda-chat-controls.md) made polls
admin-only by giving rooms created from Poda power level 100 for poll starts;
the composer offered Poll to whoever that room's power levels allowed. Rooms
created before that, by other clients or by provisioning keep the homeserver
default, so any member who can post could start polls there and Poda offered
them the control ([G-000027](situation/gaps/G-000027-existing-room-poll-power-levels.md)).

## Evidence

- [W-000005](situation/witnesses/P-000020/W-000005-chat-controls-local-pass.md):
  the API-created public room offered Poll to the power-level-0 member.
- The maintainer (2026-10-08): "only admins make polls", and, offered hiding
  Poll from non-admins versus also rewriting old rooms' power levels, chose
  hiding Poll for non-admins.
- Room versions with privileged creators (version 12, the local Synapse's
  default) leave creators out of the power-level `users` map; the SDK gives
  them an unbounded power level.

## Decision

- The composer offers Poll only to room admins (power level 100 or more,
  which includes privileged room creators) who may also start polls under the
  room's power levels, in every room.
- Rooms created from Poda keep the server-side poll power level of D-000023.
  Existing rooms' power levels are not changed.
- [P-000024](situation/promises/P-000024-poda-chat-controls-admin-polls.md)
  supersedes [P-000020](situation/promises/P-000020-poda-chat-controls.md),
  restating its other controls unchanged, and is judged by
  [O-000024](situation/oracles/O-000024-poda-chat-controls-admin-polls.md).

## Why

It makes Poda's own UI follow the maintainer's rule in every room at once,
without asking each room's admins to change settings.

## Rejected alternatives

- **Also rewrite old rooms' poll power level** (a prompt or script for room
  admins). Not chosen by the maintainer; it needs every room's admin to act.
- **Keep offering Poll wherever the room allows it.** Contradicts the rule.

## Consequences

- Other Matrix clients can still start polls in old rooms that allow members
  to; Poda's homeserver only enforces the rule in rooms created from Poda.
- A member promoted to moderator (power level 50) does not get Poll.
- G-000027 is closed by this disposition.

## Revisit when

Provisioning or a migration can set poll power levels on existing rooms, or the
maintainer wants moderators to start polls.

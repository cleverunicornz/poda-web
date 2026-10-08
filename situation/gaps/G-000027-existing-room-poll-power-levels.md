# Rooms not created from Poda keep the default poll power level

## State

closed

## Gap

D-000023 restricts poll starts to room admins by setting power levels when a
room is created from Poda. Rooms created earlier, created by other clients, or
provisioned for D-000012 keep the homeserver default, so any member who may
post can start polls there and Poda offers them the poll control. How existing
and provisioned rooms should adopt the rule is unselected.

## Relevance

[P-000020](situation/promises/P-000020-poda-chat-controls.md) Residual;
[D-000012](situation/decisions/D-000012-poda-space-organization.md) provisioning.

## Evidence

In [W-000005](situation/witnesses/P-000020/W-000005-chat-controls-local-pass.md),
the API-created public room still offered Poll to the power-level-0 member,
while the room created through Poda offered none and the homeserver rejected
her poll starts.

## Impact

Official community rooms will allow member polls until their power levels are
updated by an admin or by provisioning.

## Resolution

Closed: [D-000027](situation/decisions/D-000027-admin-only-polls-everywhere.md)
selects how existing and provisioned rooms adopt the rule in Poda: the composer
offers Poll only to room admins in every room, and room power levels are left
unchanged. [P-000024](situation/promises/P-000024-poda-chat-controls-admin-polls.md)
passed [O-000024](situation/oracles/O-000024-poda-chat-controls-admin-polls.md)
on [W-000009](situation/witnesses/P-000024/W-000009-chat-controls-admin-polls-local-pass.md)
at `f90c994814`. Other Matrix clients can still start polls in rooms whose
power levels allow members to (P-000024 Residual).

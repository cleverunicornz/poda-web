# Rooms not created from Poda keep the default poll power level

## State

open

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

none

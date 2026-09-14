# Native assistant room context

## State

hypothesis

## Promise

For a member supplied with an explicit personal-assistant Matrix participant identity and authorized conversation room:

1. The production assistant conversation renders Element's native RoomView in the existing member session, associated with the supplied assistant and room rather than an invented identity or a parallel chat client.
2. A module-owned form page can display that RoomView in its own side pane. Native edit/reply actions for the displayed room remain in the module context through accurate visible-room registration, rather than unnecessarily redirecting to the vanilla room view.
3. Entering, switching the supplied room and leaving the module view preserve the correct displayed room and native action target. Leaving cleans up the embedded view's active room subscriptions and removes its active visibility registration or makes its callback report no visible room. No stale room remains presented or targeted as the active assistant context.
4. A missing identity, unavailable room or denied room access is visibly unavailable/denied, not a simulated successful assistant conversation. Rendering the pane does not expand the assistant's explicit permitted-room participation or the member's service-owned access.

## Scope

A predeclared module location and host navigation sequence using two distinct supplied rooms, one mounted view per room, a selected room-switch/draft policy and the existing session. Inspect native timeline/composer context, edit/reply navigation, switch/unmount behavior and the unavailable/denied cases. Module layout need not be a core patch. This is future product behavior; active visual work stays native-capability/presentation-only.

## Oracle

[O-000013](situation/oracles/O-000013-native-assistant-room-context.md)

## State evidence

[D-000016](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md) and [D-000017](situation/decisions/D-000017-explicit-ui-extension-boundaries.md) select native conversation and explicit host boundaries. The source-backed [UI extension guide](situation/references/I-000010/poda-ui-extension-guide.md) describes available seams, not feasibility evidence for this product Promise. [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) remains open.

## Residual

Account provisioning, personalization, room creation/invitation policy and tool authorization belong to product/backend/chat owners. Conversation selection, unread/notification semantics, navigation beyond the declared sequence, shared simultaneous mounts of the same room and the support matrix remain unselected in [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md). No orchestration, system-wide assistant access or revived old product Promise is implied.

## References

- [I-000005](situation/invariants/I-000005-native-matrix-assistant-views.md)
- [I-000007](situation/invariants/I-000007-server-owned-access-authority.md)
- [I-000010](situation/invariants/I-000010-explicit-host-extension-boundaries.md)

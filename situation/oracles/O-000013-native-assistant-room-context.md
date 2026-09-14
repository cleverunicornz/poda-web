# Judge native assistant room context

## State

designed

## Judges

[P-000013](situation/promises/P-000013-native-assistant-room-context.md)

## Inputs

Fix source/build identity, module location/space key, existing member session, supplied personal-assistant Matrix participant identity, permitted rooms R1/R2, service-owned member/assistant access, native RoomView options and selected navigation/room-switch/draft policy. Use distinct R1/R2 and no simultaneous mounts of the same room. Supply missing-identity, unavailable-room and denied-room cases with authoritative outcomes.

Retain source references and runtime/UI traces identifying native RoomView, existing session/client context, module side-pane rendering, per-room context and view-owned resource cleanup. The exact action sequence is: enter R1; compose using native controls; edit and reply to R1 events; switch to R2; leave the module; deliver an R1 update while absent; return to R2; then exercise each unavailable/denied case from a clean baseline. Retain visible-room callback results at each transition, active embedded-view subscriptions, displayed room/assistant identity, native action targets, route history, and room membership/access before and after. Predeclare the observation window and expected native action results.

Missing contracts/policy, incomplete lifecycle or access evidence, or unexercised cases prevent judgment. All Pass legs are required; any observed Fail leg in complete in-Scope evidence fails. This designed manual Oracle supplies neither executable coverage nor an actual run.

## Pass

- P1: Native RoomView renders the supplied assistant conversation room in the existing member session, with the supplied participant identity and no substitute chat client/identity.
- P2: The module's own side pane hosts the view; visible-room callbacks accurately report the displayed room, and R1 edit/reply actions stay in the module instead of unnecessarily navigating to vanilla room display.
- P3: Switching to R2 displays and targets R2 correctly; leaving cleans up view-owned active subscriptions and removes active visibility or reports none. Subsequent R1 updates do not restore or target a stale active assistant context, and return displays and targets R2 correctly.
- P4: Each missing/unavailable/denied case is visibly unavailable/denied without simulated successful conversation; the observed pane workflow neither expands assistant permitted-room participation nor grants member access.

## Fail

- F1: Conversation uses a substitute client/identity, wrong room or different session rather than native RoomView with supplied context.
- F2: The declared module pane cannot host the native view, visible-room reporting is wrong, or native edit/reply unnecessarily redirects to vanilla room display.
- F3: A switch or return displays/targets the wrong room, leaving retains view-owned active room subscriptions/visibility, or stale R1 becomes active or receives a native action after leaving or returning to R2.
- F4: A missing/unavailable/denied case lacks a visible unavailable/denied state or appears as successful conversation, or the pane workflow expands assistant participation/member access beyond the supplied service-owned authority.

## Implementation coverage

| Leg | Decision | Coverage |
|---|---|---|
| P1 | Native conversation uses supplied participant/room and existing session | manual |
| P2 | Module side pane and visible-room registration preserve edit/reply context | manual |
| P3 | Room switch/unmount/return preserve identity and clean active resources | manual |
| P4 | Unavailable/access cases remain truthful without permission expansion | manual |
| F1 | Conversation substitutes client, identity, room or session | manual |
| F2 | Pane hosting or native edit/reply navigation violates module context | manual |
| F3 | Lifecycle leaks active room resources or presents stale identity | manual |
| F4 | Missing/denied context is simulated or access expands | manual |

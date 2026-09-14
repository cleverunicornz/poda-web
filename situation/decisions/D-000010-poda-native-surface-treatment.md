# Poda treatment of native Element surfaces

## Status

accepted

## Date

2026-09-09

## Context

The first rendered authenticated review of the implementation at commit
`3c9dfbeeff` showed that configuration-backed colors reached Element, but the
result still read primarily as stock Element. The demo account had no joined
rooms, and the implementation had not changed any of the component
presentation styles named by the visual-alignment plan. The maintainer rejected
that result as insufficient replication of the selected visual direction.

## Evidence

- [G-000002](situation/gaps/G-000002-poda-visual-acceptance-contract.md)
  already records that no approved rendered-state contract exists.
- Commit `7329320de0` adds themes and auth/browser branding, but its diff does
  not change the Space rail, room list, room header, timeline, composer, or
  right-panel styles named by
  [the visual-alignment plan](situation/references/D-000007/poda-element-visual-alignment-plan.md).
- `apps/web/res/css/structures/_SpacePanel.pcss`,
  `apps/web/res/css/structures/_LeftPanel.pcss`,
  `apps/web/res/css/views/rooms/_RoomHeader.pcss`,
  `apps/web/res/css/views/rooms/_EventTile.pcss`,
  `apps/web/res/css/views/rooms/_MessageComposer.pcss`, and
  `apps/web/res/css/structures/_RightPanel.pcss` retain the native Element
  surfaces whose presentation must carry the Poda hierarchy.
- The donor visual evidence identified in
  [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)
  uses a distinct rail, layered conversation list, bordered timeline canvas,
  card-like messages and context surfaces, and an explicit warm/dark palette.

## Decision

Keep Element and Matrix as the sole behavioral owners, but extend the Poda
implementation beyond configuration tokens. Add an explicit Poda theme marker
to the document and Poda-scoped presentation CSS for the existing Space rail,
room list, room rows and states, room header, timeline, event presentation,
composer, right panel, home, menus, and dialogs. Preserve the existing Element
DOM, routes, stores, actions, resizers, responsive collapse behavior, keyboard
order, and user-selected message layout. Use Element's native bubble layout as
the fork default so new accounts inherit the donor's conversational silhouette;
an explicit user layout selection continues to win.

Use only real Matrix account state when demonstrating rooms and messages. An
empty account remains empty; donor fixtures and fabricated production rooms do
not ship. A demo may create or join ordinary Matrix rooms only when that
external-state change is separately authorized.

## Why

The authenticated render is direct evidence that theme variables alone do not
create the requested visual identity. A document marker and narrowly scoped
CSS can express the missing hierarchy while leaving every control wired to the
same native Element/Matrix operation. This follows the maintainer's capability
boundary without confusing preservation of behavior with preservation of
stock presentation.

## Rejected alternatives

- Treating the login artwork and token substitution as complete is rejected by
  the authenticated visual review.
- Importing donor components, fixtures, routes, or state is rejected because
  those are not Matrix-backed production behavior.
- Creating fake rooms or messages in the production bundle is rejected because
  room and timeline content belongs to Matrix.
- Replacing Element's panel geometry, resizers, or message-layout preference is
  rejected because visual identity does not require changing those behaviors.

## Consequences

- [P-000006](situation/promises/P-000006-poda-element-visual-alignment.md)
  returns to `implementing` until the named native surfaces are rendered and
  reviewed in Poda Light and Poda Dark.
- [P-000007](situation/promises/P-000007-poda-theme-delivery.md) remains an
  implemented bootstrap slice rather than evidence that P-000006 is complete.
- The component-specific stylesheet increases the upstream merge surface and
  therefore requires Poda scoping, focused source checks, responsive review,
  and retained light/dark screenshots.

## Supersedes

- [D-000009](situation/decisions/D-000009-configuration-backed-poda-theme.md)

## Revisit when

Rendered native Element surfaces cannot reach the approved visual hierarchy
without changing behavior, or the maintainer deliberately selects a different
information architecture.

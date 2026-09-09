# Visual-first Element alignment

## Status

accepted

## Date

2026-09-09

## Context

The first plan expanded a visual alignment request into a new application shell,
podcast product, browser API, identity-context model, and publication boundary.
The maintainer corrected that scope: the first migration is to align Element's
own interface with the Poda visual style and add nothing that Element Web and
Matrix cannot already do natively.

## Evidence

- The maintainer's corrected choices, assumptions, alternatives, donor review,
  and reuse assessment are retained in [the visual alignment plan](situation/references/D-000007/poda-element-visual-alignment-plan.md).
- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock`
  (private; requires repository access) is a standalone UX spike whose own
  boundary identifies it as an assessment surface rather than production
  authority.
- `apps/web/src/theme.ts` and `docs/theming.md` show that Element already
  supports custom legacy colors, Compound semantic-token overrides, and fonts.
- `apps/web/src/components/views/spaces/SpacePanel.tsx`,
  `apps/web/src/components/views/rooms/RoomListPanel/RoomListPanel.tsx`,
  `apps/web/src/components/structures/RoomView.tsx`, and
  `apps/web/src/components/structures/RightPanel.tsx` provide native
  counterparts for the donor's visual rail, list, timeline, and canvas.

## Decision

Make the first migration a presentation-only Poda skin of the existing Element
Web client. Preserve Element's component structure and every Matrix-backed
route, store, permission, protocol event, action, and state transition. Reuse
the donor branch as visual and assessment evidence only. A visible affordance
may appear in this migration only when the current Element/Matrix client already
implements the operation it invokes.

## Why

Element's existing interface already has the same broad spatial composition as
the donor chat mock and owns mature Matrix behavior. Translating the visual
language onto those surfaces reaches the immediate product goal with a small,
auditable fork boundary and avoids pretending that mock-only podcast, AI,
collaboration, artifact, or safety behavior exists in Matrix.

## Rejected alternatives

- A second Poda shell with Home, Studio, Chat, and Profile routes is rejected
  for this migration because it changes the information architecture.
- Podcast, episode, publication, organization, and playback behavior is
  rejected for this migration because Element/Matrix does not natively provide
  it.
- Copying the Svelte/Tauri mock, its aggregate state, fixtures, persistence,
  Tailwind layer, Lucide dependency, or PCC API path is rejected because none is
  Element's production chat implementation.
- Translating mock terms directly into Matrix semantics is rejected: a mock
  `thread` is usually a Matrix room or DM, and mock block/delete behavior is not
  equivalent to Matrix ignore, leave, forget, or redact behavior.
- Replacing working Element stores and actions with donor model functions is
  rejected because it would change behavior under a visual task.

## Consequences

- [I-000002](situation/invariants/I-000002-element-native-capability-boundary.md)
  binds the no-new-capabilities boundary.
- [P-000006](situation/promises/P-000006-poda-element-visual-alignment.md)
  states the new behavior and is judged by
  [O-000006](situation/oracles/O-000006-poda-element-visual-alignment.md).
- The earlier integration [PLAN-000001](situation/plans/abandoned/PLAN-000001-poda-element-integration.md)
  is abandoned before implementation; its product Promises are superseded or
  withdrawn.
- [D-000002](situation/decisions/D-000002-poda-product-composition.md),
  [D-000003](situation/decisions/D-000003-platform-matrix-authority.md),
  [D-000004](situation/decisions/D-000004-contract-first-web-delivery.md), and
  [D-000006](situation/decisions/D-000006-public-publication-boundary.md) are
  superseded for this repository direction.
- [D-000005](situation/decisions/D-000005-poda-product-branding.md) is also
  superseded because its full white-label and service-default scope exceeds a
  presentation-only first migration.

## Supersedes

- [D-000002](situation/decisions/D-000002-poda-product-composition.md)
- [D-000003](situation/decisions/D-000003-platform-matrix-authority.md)
- [D-000004](situation/decisions/D-000004-contract-first-web-delivery.md)
- [D-000005](situation/decisions/D-000005-poda-product-branding.md)
- [D-000006](situation/decisions/D-000006-public-publication-boundary.md)

## Revisit when

The maintainer deliberately starts a separately bounded migration for a named
non-Matrix product capability with its authority, contract, Promise, Oracle,
and evidence established before implementation.

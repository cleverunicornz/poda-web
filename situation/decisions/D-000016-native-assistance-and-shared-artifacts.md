# Native assistance and shared artifacts

## Status

accepted

## Date

2026-09-14

## Context

The maintainer selects a personal assistant represented as a Matrix participant
for every user and one artifact/form contract for manual and assisted work.
Frontend presentation must distinguish conversation, authoritative artifact
changes, and service-owned access rather than inventing product/backend behavior.

These are prospective rules for separately approved product work. They preserve
[D-000007](situation/decisions/D-000007-visual-first-element-alignment.md),
[I-000003](situation/invariants/I-000003-element-native-capability-boundary.md),
and the presentation-only first migration in active
[PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md).
They do not revive earlier superseded or withdrawn product Promises or abandoned
PLAN-000001.

## Evidence

- The maintainer directly selected native Matrix assistant conversations, explicit
  assistant/room identities, independent manual editing, shared artifact contracts,
  and service-owned authorization. These are accepted product choices rather
  than runtime findings.
- `packages/module-api/src/api/builtins.ts` exposes the alpha
  `renderRoomView(roomId, props)` contract and presentation options.
- `apps/web/src/modules/BuiltinsApi.tsx` renders the registered native RoomView
  component with that room identity; `apps/web/src/components/structures/RoomView.tsx`
  selects a room-specific store through `multiRoomViewStore` when `roomId` is
  supplied. This is source evidence, not proof that a proposed assistant layout
  has been qualified in the running application.
- `packages/module-api/src/api/extras.ts` exposes an alpha
  `getVisibleRoomBySpaceKey(spaceKey, callback)` registration for the host to
  recognize rooms shown by a module's space-like page during room navigation.
- [O-000009](situation/oracles/O-000009-manual-artifact-workflow.md),
  [O-000010](situation/oracles/O-000010-assisted-artifact-updates.md),
  [O-000011](situation/oracles/O-000011-consistent-artifact-hosts.md), and
  [O-000013](situation/oracles/O-000013-native-assistant-room-context.md)
  define future judgment; no Witness establishes these proposed product flows.

## Decision

Each user's personal assistant is represented as a Matrix participant. The web
client consumes explicitly provided assistant identity and conversation room and
uses Element's native RoomView and existing member session context. Assistant
presence is limited to explicit permitted rooms; it is not system-wide access.
Product/backend/chat owners retain account provisioning, personalization, room
participation, and tool authorization. Frontend affordances consume authorized
contracts and confer no additional access.

Manual and assisted workflows use one canonical artifact identity and form
validation/mutation contract across module-page and room-widget presentations.
Manual editing works without invoking the assistant. An assistant's artifact
update is a backend artifact change, not conversation text interpreted as saved
state. The UI observes authoritative artifact changes and preserves or explicitly
adjudicates unsaved human work under a separately selected policy.

A module-owned form page may place the native assistant RoomView in its own side
pane. A room-first form tool may use an existing widget container. These are
presentations of the same artifact contract, not separate artifact models or
permission authorities. Layout qualification follows
[D-000017](situation/decisions/D-000017-explicit-ui-extension-boundaries.md).

No artifact payload schema, fixed `PodaClientContractV1`, endpoint, catalog,
subscription transport, agent tool implementation, concurrency policy, or approval
policy is selected here.

## Why

Native room UI preserves Matrix conversation semantics and the member session
boundary. Explicit identities keep the frontend from guessing who the assistant
is or where it may participate. A single artifact contract makes manual editing
a first-class workflow and prevents assistant prose or host-specific form copies
from becoming competing sources of truth. Service ownership keeps UI convenience
separate from authorization.

## Rejected alternatives

- A bespoke assistant chat client or second session: duplicates native Element
  conversation behavior and obscures the selected Matrix participant model.
- Frontend-created assistant accounts, guessed rooms, or universal assistant room
  access: invents authority belonging to product/backend/chat owners.
- Treating generated conversation text as a saved artifact or successful tool
  outcome: confuses conversation with authoritative mutation and persistence.
- Requiring assistant invocation for manual work, or separate manual/widget/agent
  artifact contracts: makes equivalent edits depend on host or invocation route.
- Silently replacing unsaved edits when an agent update arrives: bypasses the
  required human-work policy. Selecting a specific conflict or approval policy
  here is also rejected because that choice is still open.

## Consequences

- [I-000005](situation/invariants/I-000005-native-matrix-assistant-views.md),
  [I-000006](situation/invariants/I-000006-shared-artifact-editing-contract.md),
  and [I-000007](situation/invariants/I-000007-server-owned-access-authority.md)
  bind conversation, artifact, and access ownership.
- [P-000009](situation/promises/P-000009-manual-artifact-workflow.md),
  [P-000010](situation/promises/P-000010-assisted-artifact-updates.md),
  [P-000011](situation/promises/P-000011-consistent-artifact-hosts.md), and
  [P-000013](situation/promises/P-000013-native-assistant-room-context.md)
  remain hypotheses under the linked designed Oracles.
- [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md)
  retains missing implementation/evidence;
  [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md)
  retains unresolved service and human-work policies. Neither is resolved by the
  existence of an alpha rendering API.
- No assistant, artifact UI, backend behavior, runtime qualification, assurance
  promotion, or active implementation Plan is delivered or authorized here.

## Revisit when

The maintainer changes the personal-assistant or shared-artifact product model,
or qualified evidence identifies a native room/session or authorized artifact
boundary that cannot meet a named requirement. Revisit the affected rule through
an explicit Decision rather than replacing native UI, inferring authorization,
or silently selecting an artifact/conflict contract.

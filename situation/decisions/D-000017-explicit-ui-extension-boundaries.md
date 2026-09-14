# Explicit UI extension boundaries

## Status

accepted

## Date

2026-09-14

## Context

The maintainer selects SDK-first composition while allowing deliberate host
extensions where a required Element-owned region or navigation behavior is not
exposed. A complex module layout and an unexposed host behavior are different
cases; treating either as an automatic reason for a new application or a blanket
ban on extension would distort the selected product boundary.

This knowledge-only decision governs later separately approved product work.
[D-000007](situation/decisions/D-000007-visual-first-element-alignment.md),
[I-000003](situation/invariants/I-000003-element-native-capability-boundary.md),
and active [PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md)
retain the native-capability, presentation-only first-migration boundary. No
superseded/withdrawn product Promise or abandoned PLAN-000001 is reactivated.

## Evidence

- The maintainer explicitly selected exported Module/widget contracts first,
  module-owned form layouts with native assistant RoomView where appropriate,
  supported sibling UI, and narrow explicit core changes for unexposed host needs.
  These are normative choices, not claims of completed runtime qualification.
- `packages/module-api/src/api/navigation.ts` provides alpha location-renderer
  registration; `apps/web/src/components/structures/LoggedInView.tsx` looks up a
  renderer for the selected page type. This is a registered-location boundary,
  not arbitrary global-navigation ownership.
- `packages/module-api/src/api/extras.ts` exposes alpha space-like entries, room
  header buttons, and visible-room callback registration. A space-like entry does
  not expose every region of the member application's navigation.
- `apps/web/src/components/structures/LoggedInView.tsx` suppresses the normal
  LeftPanel/room list for module pages while retaining SpacePanel and global
  services. Module pages manage their own content layout.
- `packages/module-api/src/api/builtins.ts` exposes alpha native RoomView rendering;
  `packages/module-api/src/api/dialog.ts` exposes the dialog contract.
- `packages/module-api/src/api/index.ts` explicitly provides `rootNode` for sibling
  React trees and `createRoot`; `modules/banner/src/index.tsx` uses those APIs.
  `modules/widget-toggles/src/index.tsx` uses exported room-header/widget APIs.
- [O-000011](situation/oracles/O-000011-consistent-artifact-hosts.md) and
  [O-000013](situation/oracles/O-000013-native-assistant-room-context.md) are
  designed product judgments. No Witness proves the proposed host composition.

## Decision

Use exported Module/widget contracts or a deliberately defined host extension
for Poda extension code. Identify ownership of the target surface before choosing
an integration route. A module-owned form page may compose its own layout and
native assistant RoomView side pane; a room-first form tool may use an existing
widget container. Complexity of module-owned layout alone does not require a
core patch.

SDK-first includes supported `rootNode`/`createRoot` sibling UI and exported
dialog, navigation, extras, builtins, and widget contracts within their actual
scope. It does not imply those contracts expose arbitrary global navigation or
Element-owned panel internals. APIs marked alpha remain alpha and require
qualification against the consumed version.

When an authorized requirement needs an unexposed host-owned region or navigation
behavior, define and review a narrow explicit change inside this existing fork.
That is a core patch, not a new application or fork. Isolate the host change and
its ownership contract rather than presenting private imports, DOM surgery, or
implicit host behavior changes as ordinary SDK use. This decision establishes the
boundary but approves no particular host patch.

## Why

Using the actual exported seams preserves host ownership and limits upstream
maintenance cost. Allowing module-owned composition avoids unnecessary core
changes; admitting narrow deliberate host extensions avoids disguising necessary
host work as unsupported integration. The distinction is ownership and exposed
capability, not whether a layout looks complex.

## Rejected alternatives

- Treating location renderers or space-like entries as an unrestricted router or
  global-navigation API: exceeds the source contract.
- Declaring every multi-pane form a core patch: ignores module-owned layout and
  exported native RoomView rendering.
- Banning supported sibling React trees in the name of SDK-first: contradicts
  the documented `rootNode`/`createRoot` use and existing banner example.
- Importing private host components or silently manipulating host-owned regions:
  bypasses an explicit, reviewable extension boundary.
- Creating another frontend application or fork for missing host seams: violates
  the coordinated frontend boundary rather than qualifying the required change.
- Calling alpha APIs stable or equating source availability with runtime
  feasibility: overstates the available evidence.

## Consequences

- [I-000010](situation/invariants/I-000010-explicit-host-extension-boundaries.md)
  binds the extension boundary and owns the
  [extension guide](situation/references/I-000010/poda-ui-extension-guide.md).
- [D-000016](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md)
  fixes artifact and assistant ownership independently of presentation host;
  [P-000011](situation/promises/P-000011-consistent-artifact-hosts.md) and
  [P-000013](situation/promises/P-000013-native-assistant-room-context.md)
  remain hypotheses rather than implemented behavior.
- Embedded-room qualification includes the host's visible-room registration
  contract, routing behavior, session context, and lifecycle. An API signature
  alone cannot close [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md).
- Unselected product/host contracts remain in
  [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md).
  This record changes no source and activates no implementation Plan.

## Revisit when

The consumed Module/widget API changes, or separately authorized qualification
identifies a concrete missing host seam. Reassess the smallest owned boundary with
source and runtime evidence, and obtain an explicit Decision for changed rules
before extending host behavior. Layout preference alone does not justify a core
patch or second member runtime.

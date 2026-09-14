# Shared preview and fixture workflow

## Status

accepted

## Date

2026-09-14

## Context

The maintainer selects the existing Storybook React/Vite workbench and shared
Poda fixture/scenario definitions for prospective UI work. Preview simulation is
useful only when its boundary is explicit and its form/view contracts remain
shared with module and widget presentations. Preview success must not masquerade
as production persistence or assistant execution.

This is a knowledge-only rule for later separately approved work. It preserves
[D-000007](situation/decisions/D-000007-visual-first-element-alignment.md),
[I-000003](situation/invariants/I-000003-element-native-capability-boundary.md),
and active [PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md).
It neither expands that native-only visual migration nor revives superseded or
withdrawn product Promises or abandoned PLAN-000001.

## Evidence

- The maintainer directly selected the existing workbench, shared Poda fixtures,
  explicit stateful interactive scenarios, and production/preview isolation.
  This is an accepted workflow preference grounded in existing facilities, not
  evidence that new Poda fixtures or product flows already exist.
- `packages/shared-components/.storybook/main.ts` configures Storybook with the
  React/Vite framework; `packages/shared-components/.storybook/preview.tsx`
  supplies shared preview providers and presentation controls. The `storybook` script in
  `packages/shared-components/package.json` uses port 6007.
- `packages/shared-components/src/core/viewmodel/MockViewModel.ts` returns a static
  snapshot and has no update subscription behavior;
  `packages/shared-components/src/core/viewmodel/useMockedViewModel.ts` memoizes a
  mock from supplied snapshot/actions. These helpers do not implement a stateful
  scenario merely because action functions are supplied.
- `packages/shared-components/src/core/viewmodel/BaseViewModel.ts` exposes
  snapshot/subscription lifecycle for stateful view models.
  `packages/shared-components/src/core/RoomPickerView/RoomPickerView.stories.tsx`
  and `packages/shared-components/src/room/timeline/TimelineView/TimelineView.stories.tsx`
  demonstrate views receiving mock snapshot/action contracts.
- `apps/web/test/test-utils/client.ts` supplies Vitest-oriented Matrix client
  helpers; `packages/shared-components/package.json` includes Vitest and
  fetch-mock integration. `packages/playwright-common/src/fixtures/services.ts`
  and `modules/playwright/element-web-test.ts` supply distinct Matrix-service and
  module browser fixture layers. The default Synapse fixture is not proof of
  Poda Chat or native Rauthy integration.
- [O-000014](situation/oracles/O-000014-production-service-failure-truth.md) is a
  designed future judgment. No Witness establishes new production failure or
  Poda preview behavior.

## Decision

Use the existing Storybook React/Vite workbench and shared Poda fixture/scenario
definitions for Poda previews. Module and widget presentations reuse the same
form/view contracts as manual and assisted editors. Add product-specific scenarios
to that workflow when separately authorized; do not create a competing workbench
or parallel mock-server architecture.

Use `MockViewModel` and `useMockedViewModel` as static snapshot helpers. Interactive
previews supply explicit stateful story/scenario behavior against the same view
contract, including observable transitions where those are being demonstrated.
An action spy or unchanged snapshot is not evidence of a completed edit flow.

Keep simulated data and actions inside explicit preview/test entrypoints.
Production data and saved, published, or assistant-success claims derive from
actual service outcomes. Production failures remain failures, never triggers for
mock data, fake persistence, or simulated success. Preview/test outcomes are
labelled by their simulation boundary and do not establish production behavior.

Reuse the existing distinct component/unit, fetch-mock, and Playwright
Matrix/module fixture layers where their boundaries fit. Their existence does
not select a product API schema, endpoint, subscription transport, concurrency
policy, approval policy, or agent implementation, and does not justify a new
competing mock server.

## Why

One workbench and shared scenarios reduce divergence between form presentations
without creating a second product implementation in previews. Explicit state
makes interaction claims inspectable. Keeping service truth out of simulation
prevents a development convenience from hiding production failures or fabricating
persistence and assistant results.

## Rejected alternatives

- A separate Poda preview application or mock server for the same view contracts:
  duplicates the selected workbench and fixture responsibilities.
- Describing static snapshot helpers as an interactive state engine: implies
  transitions those helpers do not implement.
- Duplicated module/widget form fixtures and view contracts: permits host-specific
  behavior drift and conflicts with shared artifact editing.
- Production fallback fixtures or simulated saved/published/agent-success claims:
  erase real failures and misrepresent service authority.
- Treating a Storybook, unit, or default Synapse run as proof of a different
  backend/authentication integration: crosses the observed dependency boundary.
- Fixing product payloads or approval/concurrency behavior in preview data before
  their owners select the contracts: lets mock design become accidental authority.

## Consequences

- [I-000009](situation/invariants/I-000009-production-truth-and-preview-isolation.md)
  binds production truth and simulation isolation.
- [I-000011](situation/invariants/I-000011-shared-storybook-and-fixtures.md)
  binds the shared workflow and owns the
  [preview and fixture guide](situation/references/I-000011/poda-ui-preview-and-fixture-guide.md).
- [P-000014](situation/promises/P-000014-production-service-failure-truth.md)
  remains a hypothesis under O-000014. Shared-host behavior in
  [P-000011](situation/promises/P-000011-consistent-artifact-hosts.md) is likewise
  unimplemented/unassured by this knowledge change.
- [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md)
  retains missing implementation/evidence and
  [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md)
  retains unselected contracts. No fixture, test executable, source change,
  Witness, or active implementation Plan is created by this decision.

## Revisit when

The existing workbench or fixture layer is replaced upstream, or a separately
qualified requirement demonstrates a concrete capability gap. Revisit the
workflow through an explicit Decision with evidence before adding a competing
system; convenience or an unavailable production service does not justify a
production mock fallback.

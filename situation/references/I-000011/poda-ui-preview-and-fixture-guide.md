# Poda UI preview and fixture guide

Owner: [I-000011](situation/invariants/I-000011-shared-storybook-and-fixtures.md).

This Reference supports [D-000018](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md). It identifies the existing public-source workbench and distinguishes proposed Poda scenarios from delivered implementation or assurance. It does not create a new preview application, service contract, test layer or active implementation Plan.

## One existing Storybook catalog

`packages/shared-components/.storybook/main.ts` configures `@storybook/react-vite` and discovers `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`. `packages/shared-components/package.json` defines the existing `storybook` script as `storybook dev -p 6007` and retains build/test scripts for the same workbench. Future Poda stories belong in that coordinated catalog; if a shared view's location needs discovery changes, deliberately extend the existing catalog rather than start a second independently managed Storybook or mock frontend.

`packages/shared-components/.storybook/preview.tsx` supplies root CSS, theme, event-presentation, tooltip, i18n and drag/drop providers, theme/language/event-layout/density controls and accessibility configuration. Reuse those established providers and view contracts. Their presence is not proof that a new module/widget integration inherits the real member session or that Poda visual acceptance has passed.

## Static snapshot is not an interactive model

`packages/shared-components/src/core/viewmodel/MockViewModel.ts` returns the constructor snapshot and has a subscription method that never emits. `useMockedViewModel.ts` memoizes such a model and attaches action functions. It does not turn callbacks into a mutable store: changing state requires an explicit story re-render/new snapshot or a stateful scenario implementation.

Current examples demonstrate that distinction:

- `packages/shared-components/src/core/RoomPickerView/RoomPickerView.stories.tsx` wraps the view with `useMockedViewModel`, supplies deterministic room data and `fn()` actions, and declares selection/empty-state snapshots. A logged toggle callback is not proof that room selection changes or persists.
- `packages/shared-components/src/room/timeline/TimelineView/TimelineView.stories.tsx` supplies deterministic timeline rows, a static snapshot and `fn()` actions. Its `play` function waits for the virtualized scroller to reveal; it does not implement a live Matrix timeline or backend mutation path.
- `packages/shared-components/src/core/viewmodel/BaseViewModel.ts` provides snapshot subscriptions/emission and disposable resources. This is an existing pattern for stateful view models, not a reason to add another parallel view-model abstraction.

For a later interactive Poda preview, explicitly own scenario state and transitions while passing the same form/view contract used by the real module/widget presentation. A React stateful wrapper or an existing-compatible view model can implement the bounded scenario. Declare what an action changes, what service result is being simulated, how subscriptions update the view and how scenario state is reset/disposed. Do not call a static snapshot helper an interactive backend, or invent an endpoint/schema merely to drive a story.

## Shared Poda fixtures and views

The selected direction is one shared set of Poda fixture/scenario definitions for the supported artifact/forms, reused by module-page and room-widget presentations through their common view contract. This guide does not claim those product fixtures already exist. Fixture identity, permission cases and expected validation/mutation outcomes must come from a selected public-safe contract, not private donor/backend bytes.

A bounded scenario can name its artifact baseline, local draft, accepted/rejected backend update, authoritative outcome and explicit user choice without prescribing wire fields. Static snapshots answer presentation questions; interactive scenarios must actually model dirty-state transitions, service failure and adjudication. Manual mode must remain independent of assistant invocation. A conversation-only success statement must be distinct from an authoritative artifact update. Neither fixtures nor the preview select an otherwise unresolved concurrency, approval, conversation or publication policy.

Keep module and widget host wrappers thin around the shared form/view contract. Reuse equivalent scenarios for both hosts so different presentation geometry cannot conceal divergent artifact identity, validation or mutation outcomes. The [UI extension guide](situation/references/I-000010/poda-ui-extension-guide.md) distinguishes the host seams and native RoomView context that isolated stories cannot reproduce by themselves.

## Keep existing evidence layers distinct

| Layer | Current public source | What it can establish; what it cannot |
|---|---|---|
| Component presentation and explicit story interaction | `packages/shared-components/.storybook/main.ts`, `.storybook/preview.tsx`, the RoomPickerView and TimelineView stories above | Rendered snapshot/accessibility/declared scenario behavior when exercised; not service persistence, production authorization or native room integration. |
| Unit/component and request-boundary tests | `apps/web/package.json` and `packages/shared-components/package.json` retain Vitest and fetch-mock dependencies; `apps/web/test/test-utils/client.ts` supplies mocked Matrix clients with real event emitters; `apps/web/test/setup/setupManualMocks.ts` uses fetch-mock setup | Local behavior under named controlled inputs; mocked client events or intercepted requests are not evidence that production chat/auth services honor a contract. |
| Browser Matrix/service integration | `packages/playwright-common/src/fixtures/services.ts` | Existing testcontainer/service fixtures, with a default Synapse homeserver and optional Matrix Authentication Service. A default fixture is not proof of Poda Chat or native Rauthy integration, assistant provisioning or artifact backend behavior. |
| Browser module integration | `modules/playwright/element-web-test.ts` | Existing shared Playwright fixture loads module bundles by routing them and adding module URLs to client config; it can host a real module scenario when run, but file presence alone establishes no result. |

These layers are complementary and are not reasons to introduce a competing mock server. Choose evidence for the actual boundary, retain its limitations, and require real service outcomes for production claims. The new O-000009 through O-000014 remain designed with every leg manual; existing tests are not credited as implementing them. [G-000001](situation/gaps/G-000001-fork-assurance-route.md) still retains fork-assurance-route concerns.

## Preview isolation and truthful production

Simulation is legitimate only in explicitly identified preview/test entrypoints. Label preview transitions as simulations and keep their state/handlers out of production entrypoint activation and fallback paths. Do not satisfy a production failed load with plausible fixture data, or report a failed/unresolved save, publish or assistant operation as successful. Last-known authoritative data, if retained, must not masquerade as a fresh successful load.

A future bounded isolation scenario must inspect the actual selected entrypoint/dependency/storage arrangement, including entering production after preview, and show that preview handlers/state cannot become production persistence or send production mutations. No origin/storage scheme is selected here. [P-000014](situation/promises/P-000014-production-service-failure-truth.md) and [O-000014](situation/oracles/O-000014-production-service-failure-truth.md) state the prospective claim and complete manual judgment legs; a polished demo is not a passing Witness.

## Current scope and unresolved choices

The current native-only visual migration under D-000007, I-000003 and `situation/plans/active/PLAN-000002-poda-element-visual-alignment.md` remains separate. These product fixture rules do not expand that Plan, settle its visual acceptance Gap G-000002 or revive superseded/withdrawn product Promises and abandoned PLAN-000001. Older private donor material and the excluded obsolete project supply no new requirements or scenarios.

[G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains missing implementation/evidence. [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md) retains origin, artifact/transport, draft/concurrency/approval, conversation/navigation and support choices. [C-000002](situation/candidates/C-000002-qualify-product-ui-boundaries.md) proposes qualification only; no fixed Poda client contract, backend schema, tool implementation or orchestration is invented here.

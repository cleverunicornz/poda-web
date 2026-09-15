# Shared member workspaces and artifact previews

## Status

accepted

## Date

2026-09-15

## Context

The maintainer has authorized revising public [PR #6](https://github.com/cleverunicornz/poda-web/pull/6) and its corresponding private Project into a reviewable, module-first member-workspace/shared-artifact preview direction. This is a knowledge-only clarification, not permission to implement or merge the application work.

The earlier unadmitted PR #6 proposal is retained at `ff60c63e610fc709fc2a82c99a79f99a606c65d6:situation/decisions/D-000013-poda-tab-shell-scope.md` and `ff60c63e610fc709fc2a82c99a79f99a606c65d6:situation/references/D-000013/poda-tab-shell-plan.md`. Its colliding identifier does not identify the closed, superseded [D-000013 product-composition decision](situation/decisions/D-000013-poda-product-composition.md). This fresh D-000019 neither rewrites nor revives that closed decision, the withdrawn/superseded product Promises, or abandoned PLAN-000001.

[D-000015](situation/decisions/D-000015-public-and-member-rendering-ownership.md) through [D-000018](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md) establish rendering, artifact, extension and preview boundaries. The current selection makes conventional member workspaces explicit within those boundaries: chat-first does not mean every product workflow must be a conversation or require an assistant. [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md), [I-000003](situation/invariants/I-000003-element-native-capability-boundary.md) and active [PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md) keep their separate first-migration scope.

## Evidence

- The maintainer's direct 2026-09-15 choices retain the broad Chat/Studio/Profile/Settings proposal, Studio Podcasts/Episodes/Analytics, own-profile editing and the creators directory; select full-sized manual workspaces and shared domain views in suitable conversation contexts; and explicitly authorize only this planning revision. These are accepted product choices, not runtime findings.
- The maintainer selects one Element-derived member application on a dedicated app subdomain, with Astro continuing to generate designated public pages within the coordinated frontend workspace/delivery boundary. No actual hostname, deployment configuration or session-handoff contract is selected.
- `apps/web/src/vector/init.tsx` loads runtime module URLs from `SdkConfig.get("modules")` in `loadPlugins`, dynamically imports them and invokes `ModuleLoader`. `packages/module-api/src/api/navigation.ts` exposes alpha location renderers; `apps/web/src/components/structures/MatrixChat.tsx` looks them up by exact screen key.
- `apps/web/src/components/structures/LoggedInView.tsx` already suppresses the ordinary LeftPanel for module pages, retains SpacePanel, Matrix context, toasts and call/PiP services, and leaves module content layout to the module. It does not establish a fixed-size core patch or expose every host-navigation region.
- `MatrixChat.showScreen("settings")` in `apps/web/src/components/structures/MatrixChat.tsx` dispatches `ViewUserSettings`, which opens `UserSettingsDialog`. Settings is a native dialog entry, not a persistent module settings page.
- Exported `rootNode`/`createRoot`, navigation, dialog, extras, builtins and widget contracts in `packages/module-api/src/api/` provide bounded composition seams. `packages/module-api/src/api/builtins.ts` exposes native `renderRoomView`; the [extension guide](situation/references/I-000010/poda-ui-extension-guide.md) records room identity, visibility and lifecycle limits.
- `packages/shared-components/.storybook/main.ts` and `.storybook/preview.tsx` provide the existing catalog and providers. `packages/shared-components/src/core/viewmodel/MockViewModel.ts` is a static snapshot helper with no update subscription behavior. `modules/playwright/element-web-test.ts` provides a distinct Element-hosted module fixture seam by supplying bundle URLs through client module configuration.
- [O-000008](situation/oracles/O-000008-member-workspace-preview.md) is a designed manual judgment route, not evidence of an executed preview. No Witness or qualification result is supplied by this decision.

## Decision

1. Accept the reviewed-preview direction: one Element-derived member application on a dedicated app subdomain, using Element runtime, supported Element/Compound components and design tokens, existing view-model patterns, Poda theming/design and the existing Storybook foundation. Astro owns designated public-page generation, not a second member router or lifecycle.
2. Make full-sized conventional workspaces first-class. Retain Chat/Studio/Profile/Settings as the proposed navigation and the broad Studio, own-profile and creators inventory. Native Matrix Chat remains first-class; ordinary editing and analytics work without chat or assistant invocation. Exact navigation placement, routes and responsive geometry remain qualification inputs or labelled planning defaults, not a promised fixed shell patch.
3. Build domain views/forms once with shared view models, validation and actions around one canonical artifact/view contract. Thin workspace and suitable conversation-host wrappers reuse those views. An optional native RoomView pane or an existing room-widget container is a host, not a second application, form implementation or design system; a complete Studio dashboard need not become a widget.
4. Keep the UI-facing data boundary adaptable to service-owned contracts. Typed fixtures and explicit stateful scenarios demonstrate preview outcomes through the existing Storybook catalog and an identified Element-hosted integration preview. They neither freeze an API nor guarantee that a later HTTP adapter needs no page changes. Simulation cannot activate as a production fallback or claim actual persistence, publication or assistant success.
5. Keep artifact and Matrix authority at their owning services. An agent consumes explicitly supplied permitted artifact/room/view context through authorized backend tools, not assumed browser automation or universal access to on-screen or unsaved state. Assistant provisioning, model/provider/runtime/tool implementation and unselected product policies remain outside this revision.
6. Preserve complete submitted field-coverage material privately for review. Public records retain high-level scope and declared-private coordinates/access notes, not private field tables, schemas, copied source or visual recipes. Editable/display-only/hidden coverage is a review inventory, not a mandatory runtime payload or proof of backend completeness.

## Why

The selected composition keeps useful conventional workflows intact while letting collaboration accompany the same artifacts. Sharing domain views and contracts avoids host-specific divergence without forcing every workflow into a chat-sized tool. Existing Element and Storybook foundations avoid a second UI, design or mock system. Source-bounded qualification is more maintainable than promising a particular tab-bar file or one conditional before the required host seam is known. Explicit preview and publication boundaries prevent attractive simulations and private donor detail from becoming accidental product or public authority.

## Rejected alternatives

- Reducing the plan to a small assistant-only demonstration or making chat/AI compulsory: loses the maintainer's retained workspace and field-coverage intent.
- Reviving the abandoned comprehensive product plan or rewriting closed D-000013: the current direct selection supplies this new direction, not an old implementation grant.
- Separate manual, widget and assistant forms, another member app/router, another design system, Storybook or mock server: duplicates the selected shared foundations and contracts.
- Requiring every workspace to be a widget, or banning suitable native RoomView/widget hosts: confuses reusable domain views with host geometry.
- Assuming runtime module installation through `build_config.yaml`, existing module LeftPanel visibility, persistent native Settings pages, arbitrary nested module routes, or a guaranteed one-conditional core patch: contradicts or exceeds current source.
- Treating supported sibling UI as prohibited, or using private imports/DOM interception for unexposed host chrome: ignores the actual exported seams and explicit-extension boundary in D-000017.
- Freezing wire schemas, autosave, merge/approval, analytics, hosting or publication policy through preview choices: substitutes fixture convenience for service/product selection.
- Republishing private field tables or donor visual recipes because they appeared in an earlier submission: access and publication review remain required.

## Consequences

- Critical [I-000012](situation/invariants/I-000012-shared-member-workspaces.md) states the shared-workspace rule; [I-000006](situation/invariants/I-000006-shared-artifact-editing-contract.md) and [I-000011](situation/invariants/I-000011-shared-storybook-and-fixtures.md) continue to govern shared artifact and preview contracts.
- The owned [member-workspace preview plan Reference](situation/references/D-000019/member-workspace-preview-plan.md) retains scope, corrected source constraints, defaults, public/private provenance and a conditional qualification/delivery sequence.
- [P-000008](situation/promises/P-000008-member-workspace-preview.md) remains `hypothesis`; [O-000008](situation/oracles/O-000008-member-workspace-preview.md) remains wholly manual and designed; [PLAN-000003](situation/plans/draft/PLAN-000003-member-workspace-preview.md) is draft, not an active execution assignment. Their criteria are not implemented or assured here.
- [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains missing realization/evidence, [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md) retains named unselected contracts, and [G-000006](situation/gaps/G-000006-submitted-donor-publication-review.md) retains submitted-donor publication review. Historical references do not authorize republishing their private-derived content.
- The dedicated member app subdomain now refines the previously open origin direction; exact hostname, preview/public origins, deployment, cookies/storage and public/member transitions remain unselected. Closed records and the existing visual migration remain unchanged.
- This revision delivers knowledge only: no application source, fixture implementation, backend or assistant, runtime observation, assurance promotion, implementation authorization or merge authorization.

## Revisit when

The maintainer changes workspace or rendering ownership, or separately authorized qualification identifies a concrete missing module/host/view capability against the consumed version. Revisit the affected choice explicitly before changing the shared foundations, broad preview scope or authority boundary; missing service policy or a polished mock alone supplies no implementation permission.

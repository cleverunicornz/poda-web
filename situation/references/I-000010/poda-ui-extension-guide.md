# Poda UI extension guide

Owner: [I-000010](situation/invariants/I-000010-explicit-host-extension-boundaries.md).

This Reference explains current public source seams and the prospective boundaries selected by [D-000017](situation/decisions/D-000017-explicit-ui-extension-boundaries.md). It is supporting depth, not an API stability guarantee, implementation Plan or evidence that a Poda product editor already works. Paths below are repository-root-relative public source references.

## Choose the owner of the surface

| Need | Available source seam | Limit |
|---|---|---|
| A form/product page owning its complete content layout, optionally with a conversation side pane | `navigation.registerLocationRenderer(path, renderer)` in `packages/module-api/src/api/navigation.ts`; a space-like entry via `extras.setSpacePanelItem(spaceKey, props)` in `packages/module-api/src/api/extras.ts` | Location rendering and extras are alpha; the space-like entry is not a newly provisioned Matrix Space or an arbitrary global-navigation API. |
| A room-first form tool inside the existing room UI | `packages/module-api/src/api/widget.ts` exposes room widget lookup/container movement; `modules/widget-toggles/src/index.tsx` demonstrates room-header buttons operating through the widget API | Use the actual existing container/capability boundary. The type lists `top`, `right`, `center`, but its comments call `top` the sensible drawer value, describe `right` as default/no change, and leave `center` uncertain. The type union is not proof of interchangeable supported layouts. |
| A dialog | `openDialog` in `packages/module-api/src/api/dialog.ts`, returning a finished result and close handle | A dialog does not grant control over unrelated host regions or service permissions. |
| A sibling UI tree | `Api.rootNode` and `Api.createRoot` in `packages/module-api/src/api/index.ts` | Explicitly supported sibling rendering, not permission to manipulate arbitrary private Element DOM. |
| An unexposed Element-owned region or navigation behavior | A deliberately defined, reviewed host extension inside this existing fork | A narrow core patch, not a new fork/application or competing member router. Explain the missing exported seam and isolate the host change. |

`apps/web/src/components/structures/LoggedInView.tsx` selects a registered module renderer by page type. For a module page it suppresses the normal `LeftPanel`/room list and normal resizable layout while retaining `SpacePanel`, the member Matrix client provider, toasts and call/PiP services. The module owns its content layout alongside that retained shell. A complex split form/conversation canvas is therefore not, merely by being complex, a core patch or an unsupported overlay.

`modules/banner/src/index.tsx` creates a sibling element before `api.rootNode` and renders with `api.createRoot`. SDK-first guidance must not incorrectly prohibit this exported route. The example is not a complete lifecycle contract for every product surface. `modules/widget-toggles/src/index.tsx` also records a provider-identity limitation when a separate Compound copy cannot see host context; importing a component or mounting a sibling tree does not automatically inherit all host providers.

## Native assistant RoomView in a module-owned pane

`packages/module-api/src/api/builtins.ts` exports alpha `renderRoomView(roomId, props?)`. Options cover hiding the header, composer, right panel, pinned banner and widgets, plus `enableReadReceiptsAndMarkersOnActivity`. `apps/web/src/modules/BuiltinsApi.tsx` renders the registered native RoomView component with that room ID. The frontend should consume explicitly supplied assistant participant and permitted room identities in the existing session; it should not construct a second chat client or infer assistant authority from a label.

The host component in `apps/web/src/components/structures/RoomView.tsx` requires a Matrix client context. A supplied `roomId` selects a room-specific store through `multiRoomViewStore`. The component explicitly expects remounting when the viewed room changes and removes its room-specific store on unmount, alongside dispatcher/client/store listeners and other resources. A future module must respect this lifetime rather than treating a room prop update as a complete switch protocol. Same-room concurrent mounts, module reload/disposal and any new lifecycle seam require qualification; `Module` in `packages/module-api/src/api/index.ts` exposes `load()`, not a general unload API.

`extras.getVisibleRoomBySpaceKey(spaceKey, cb)` in `packages/module-api/src/api/extras.ts` **registers a callback** returning visible room IDs; it is not a synchronous getter. Element uses it for actions such as message editing/replying. Without it, Element cannot recognize a module-displayed room and may redirect to the vanilla space/metaspace. Keep the callback's returned IDs aligned with the pane's actual visibility, including switching/leaving. A persistent callback returning no rooms may be needed where the exported contract offers no unregister operation; do not invent an unregister API. Native receipt/marker options and module space selection must be consciously qualified against the desired navigation/unread behavior, not generalized into arbitrary navigation control.

These mechanisms do not provision accounts, personalize assistants, create or invite room participants, or authorize tools. Those responsibilities remain at product/backend/chat authorities. The frontend uses explicit permitted rooms, not system-wide assistant access. [P-000013](situation/promises/P-000013-native-assistant-room-context.md) and its designed Oracle bound the future observable context/lifecycle claim.

## One artifact contract, different hosts

A module-owned form and a room widget may have different geometry while sharing canonical artifact identity, validation/mutation semantics and the same form/view contract. Manual editing remains usable without assistant invocation. Assisted updates arrive as authoritative backend artifact changes, not chat text interpreted as saved state. Preserve or explicitly adjudicate unsaved human work under a selected policy; do not smuggle a concurrency or approval policy into a fixture.

Widget capabilities and frontend controls consume authorized contracts and cannot substitute for artifact or Matrix access authority. This Reference specifies no Poda payload shape, endpoints, event stream, fixed client interface, tool implementation or orchestration. [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md) retains those choices; [P-000009](situation/promises/P-000009-manual-artifact-workflow.md), [P-000010](situation/promises/P-000010-assisted-artifact-updates.md) and [P-000011](situation/promises/P-000011-consistent-artifact-hosts.md) remain hypotheses.

## Public/member document boundary

[D-000015](situation/decisions/D-000015-public-and-member-rendering-ownership.md) selects one coordinated frontend monorepo/tooling/release boundary: Astro generates designated public static pages and the Element-derived SPA owns member routing/lifecycle. This does not require Astro to own the member document or choose same-origin versus split-origin hosting.

Current member source in `apps/web/src/vector/routing.ts` uses hash navigation. `apps/web/src/vector/init.tsx` reuses the React root for `#matrixchat` when switching application/error views and unmounts an old root when its container changes, explicitly avoiding duplicate subscriptions from multiple roots. A proposed public/member integration must account for that host lifecycle, not install another member router/root around it. Origins, prefixes, storage/cookies and entry/return policy remain unselected. [P-000012](situation/promises/P-000012-public-static-data-boundary.md) bounds approved-public output and the member transition; it does not claim that Astro is already integrated.

## Review boundary and current work

For later separately approved work, identify the host-owned versus module-owned surface, cite the exported API or explicit host extension, name lifecycle/context/capability limits, and supply the bounded scenarios needed by the relevant designed Oracle. Use the [shared preview and fixture guide](situation/references/I-000011/poda-ui-preview-and-fixture-guide.md); preview behavior is not production persistence evidence.

The accepted visual-first D-000007, standard I-000003 and active `situation/plans/active/PLAN-000002-poda-element-visual-alignment.md` keep their native-capability/presentation scope. These new prospective product rules neither alter that work nor revive older superseded/withdrawn product Promises or abandoned PLAN-000001. Older private donor material and the excluded obsolete project supply no new scope; this public Reference draws only on the selected instructions and the named public source. [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains missing product implementation/evidence.

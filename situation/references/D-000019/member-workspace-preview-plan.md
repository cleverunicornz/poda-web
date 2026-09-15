# Member-workspace and shared-artifact preview plan

## Record status and authority

- Recorded: 2026-09-15.
- Owner: [D-000019](situation/decisions/D-000019-shared-member-workspaces.md).
- State: reviewed-preview direction; planned, not implemented or qualified.
- Behavior: [P-000008](situation/promises/P-000008-member-workspace-preview.md), still `hypothesis`.
- Judgment: [O-000008](situation/oracles/O-000008-member-workspace-preview.md), wholly manual and `designed`.
- Work container: [PLAN-000003](situation/plans/draft/PLAN-000003-member-workspace-preview.md), `draft` with no execution assignment.

The maintainer authorized revising [PR #6](https://github.com/cleverunicornz/poda-web/pull/6) and corresponding private Project knowledge, leaving the PR reviewable and unmerged. This Reference supplies supporting depth, not an implementation grant, test result or competing acceptance contract. P8/O8 own the bounded observable criteria and judgment legs; PLAN3 owns grouping and dependencies.

This is a fresh direction grounded in the maintainer's current choices. The earlier unadmitted PR #6 proposal is historical: `ff60c63e610fc709fc2a82c99a79f99a606c65d6:situation/decisions/D-000013-poda-tab-shell-scope.md` and `ff60c63e610fc709fc2a82c99a79f99a606c65d6:situation/references/D-000013/poda-tab-shell-plan.md`. Its colliding number must not be confused with closed [D-000013 product composition](situation/decisions/D-000013-poda-product-composition.md). Neither that closed decision, abandoned PLAN-000001 nor withdrawn/superseded product Promises is revived. The visual migration under D7/I3 and active PLAN2 remains separately scoped and unchanged.

## Chosen principles, retained proposal and defaults

These labels separate product authority from proposals and source constraints:

- **CHOSEN PRINCIPLE**: a current direct maintainer choice or binding standing boundary.
- **RETAINED PROPOSAL**: requested preview inventory retained for review, not a claim that its exact layout or route has been qualified.
- **PLANNING DEFAULT**: a suggested bounded preview choice, replaceable during qualification without silently changing product policy.
- **SOURCE CONSTRAINT**: behavior or an interface visible in named current public source, not proof of a working Poda preview.

| Subject | Classification | Direction |
|---|---|---|
| Product foundation | CHOSEN PRINCIPLE | One Element-derived member application; supported Element/Compound components, design tokens and view-model patterns; Poda theming/design and existing Storybook. No second UI or design system. |
| Public/member split | CHOSEN PRINCIPLE | Member app on a dedicated app subdomain; Astro generates designated public pages inside the coordinated frontend workspace/delivery boundary. No second member router or independent frontend product. |
| Ordinary work | CHOSEN PRINCIPLE | Full-sized workspaces support manual editing and analytics without chat or assistant invocation. Native Matrix Chat is first-class, not the owner of every screen. |
| Navigation and scope | RETAINED PROPOSAL | Chat / Studio / Profile / Settings; Podcasts / Episodes / Analytics within Studio; own creator profile and creators directory/detail. This is not an assistant-only demo. |
| Shared presentations | CHOSEN PRINCIPLE | Shared domain components/view models, identity, validation and actions across thin workspace and suitable conversation hosts. Whole dashboards need not be widgets. |
| Simulation | CHOSEN PRINCIPLE | Typed shared fixtures and explicit stateful scenarios in existing Storybook plus an identified Element-hosted preview; no production fallback, fake persistence or pretend service success. |
| Preview lifetime | PLANNING DEFAULT | In-session simulated edits reset on reload or explicit scenario reset, with that boundary visible. This selects no production persistence or draft-recovery policy. |
| Directory placement | PLANNING DEFAULT | Reach Creators from Profile without adding a fifth primary entry. Exact screen representation remains subject to route qualification. |
| Chat return | PLANNING DEFAULT | Return to a permitted last-active native chat context, otherwise native home; qualify history, room identity and draft behavior rather than guaranteeing restoration. |
| Navigation geometry | PLANNING DEFAULT | A persistent primary navigation affordance where the selected host seam supports it; accessible narrow treatment. No prescribed pixel recipe, breakpoint, top-bar patch or automatic SpacePanel removal. |
| Preview visual composition | PLANNING DEFAULT | Full-sized forms, lists/details and legible analytics assembled from the selected foundations. Chart technique and component placement follow supported reuse, not a new chart/design stack or copied donor recipe. |

The example `app.pota.com` is illustrative only, not a selected hostname or deployment. Dedicated member-app subdomain ownership narrows D15's previously open direction; public/preview origins, URL prefixes, document serving, storage/cookie isolation, entry/return and deployment policy still need their owners' selections.

## Retained workspace and page inventory

The broad preview retains the following consumer-facing inventory. These are presentation/coverage intentions; no private schema or service API is defined here.

| Workspace or entry | Retained preview scope | Host boundary |
|---|---|---|
| Chat | Existing native Matrix conversation/navigation surface in the member session | Native Element; only the bounded behaviors named in P8/O8 can be judged by the future preview, not all upstream capabilities. |
| Studio — Podcasts | Podcast collection, selection, new in-session draft, detail and conventional manual editor; supporting read-only information and visible preview outcome/draft state | Full workspace using shared domain views/forms. |
| Studio — Episodes | Episode collection with relevant podcast/status context, selection, new in-session draft, detail and conventional manual editor; supporting media/participant information at high-level coverage scope | Full workspace using the same shared component and artifact-contract discipline. |
| Studio — Analytics | Overview and relevant podcast context with summary, chart and tabular presentations of explicitly simulated data | Full workspace; a representative analytics view is also reused in the selected conversation-adjacent host. No real metric definitions are selected. |
| Profile | Own creator profile view and working manual editor, including the submitted profile-content and supporting display coverage | Full workspace using shared domain views/forms, not a separate assistant editor. |
| Creators | Directory, selection and read-only creator detail; reuse suitable profile presentation | Proposed access through Profile; no new identity or access policy inferred from directory visibility. |
| Settings | Native member settings entry | Opens Element's native UserSettingsDialog; not a new persistent Settings page or Poda settings rebuild. |

Collection/create/detail/edit scope remains substantial across Studio and Profile's own-profile editing. New podcast/episode drafts can be accepted or discarded within the declared preview scenario; accepted creations become available through collection/detail navigation. Representative cross-host examples do not replace that inventory: later qualification must name an editable-form example and an analytics-view example for reuse in a full workspace and one selected conversation-adjacent host. That host may be a module-owned canvas alongside native RoomView, or a suitable existing widget context; its exact selection and limits must be recorded before judging O8. No example qualifies every widget container, every artifact or a real assistant/backend.

### Field-coverage intent and publication boundary

Retain the complete submitted profile, podcast and episode coverage for review, including visible and non-visible areas and the supporting Analytics intent. The original editable/display-only/hidden classification remains a coverage vocabulary:

- **E — editable**: coverage proposed for a working manual preview form.
- **D — display-only**: coverage proposed for a read-only presentation.
- **H — hidden/model-only**: non-visible coverage retained for review and explicit disposition.

These labels are not a required runtime payload, instruction to ship every hidden field to the browser, or proof that a future backend is complete. They confer no permission to expose private fields or accept a production mutation. The corresponding private Project retains the complete original submitted coverage material; public records retain this high-level intent and the declared-private coordinates below. Public-safe fixture/view contracts and any justified coverage disposition must be explicitly reviewed before implementation. Do not silently discard submitted coverage, invent values for unavailable material, or republish private-derived tables to make the public plan appear complete.

[ G-000006 publication review ](situation/gaps/G-000006-submitted-donor-publication-review.md) owns the submitted-donor publication concern. Retaining historical commit coordinates does not make private-derived submitted content approved for reuse. The public Podcasting 2.0 namespace reference is contextual evidence, not an adopted Poda wire schema, serialization implementation or new backend field mandate.

## Shared domain architecture

### One foundation, several hosts

The presentation structure reuses one implementation of each domain view:

```text
Element-derived member application / supported Poda UI foundation
├── Full module workspace
│   └── Shared domain form or Analytics view
├── Conversation-adjacent module layout
│   ├── The same shared domain form or Analytics view
│   └── Native Matrix RoomView
└── Suitable room-widget host, when selected
    └── The same shared domain form or Analytics view
```

The shared UI-facing view models consume service-owned product contracts or
explicit preview scenarios. Native RoomView provides the conversation; it is
not a requirement to render every form inside a chat window.

Host wrappers own placement, visibility, host navigation/context and lifecycle integration. They do not fork forms, duplicate validation/mutation logic, invent artifact identities or maintain competing domain models. Views and their view models consume one canonical artifact/view contract; context-specific geometry or a read-only presentation is not a different artifact authority. Reuse the supported shared-component and `BaseViewModel` patterns where they fit, rather than introduce a parallel view-model framework.

The UI-facing boundary describes what views need to show and act on: selected artifact identity, allowed actions, snapshots and observable load/edit/update outcomes. It is not the earlier frozen `PodaDataAdapter` API catalog, a backend schema, endpoint set or guarantee that a future HTTP implementation requires no page changes. Real contract discovery may require deliberate view-contract changes, migrated consistently across every host and scenario.

Manual work remains independent. Optional conversation can accompany artifact collaboration without wrapping every workflow in an assistant interaction. For an assistant context, consume the explicitly supplied permitted participant, room and artifact/view context. Backend tools operate within their own authorization; the frontend does not imply browser automation, all-screen visibility, universal room access or access to every unsaved draft. A message saying an edit succeeded is not an authoritative artifact mutation.

### Current Element seams and required qualification

| Current public source | SOURCE CONSTRAINT | Qualification implication |
|---|---|---|
| `apps/web/src/vector/init.tsx`, `loadPlugins` | Reads `SdkConfig.get("modules")`, dynamically imports configured URLs, loads and starts through `ModuleLoader`. | Qualify runtime bundle/config activation against the consumed version. Do not describe `build_config.yaml` as this runtime module-loading contract. |
| `packages/module-api/src/api/navigation.ts`; `apps/web/src/components/structures/MatrixChat.tsx` | Alpha `registerLocationRenderer` uses an exact screen key; renderer takes no route arguments. | Qualify finite entry/detail/query/back-forward cases. Suggested `studio`, `profile`, `creators` keys and query-based selection are defaults, not arbitrary nested routes or a second router. |
| `apps/web/src/components/structures/LoggedInView.tsx` | Module pages suppress the ordinary LeftPanel and normal resizable layout, retaining SpacePanel, Matrix client provider, toasts and call/PiP services. | Module owns content geometry. Do not add a patch merely to suppress an already absent room list; qualification must determine retained chrome and providers actually needed. |
| `apps/web/src/components/structures/MatrixChat.tsx` | `showScreen("settings")` dispatches `ViewUserSettings`; the handler opens `UserSettingsDialog` and ensures a background view. | Preserve native dialog semantics, close/focus return and underlying navigation. A Settings entry is not evidence of a persistent settings page. |
| `packages/module-api/src/api/index.ts`, `dialog.ts`, `navigation.ts`, `extras.ts`, `builtins.ts`, `widget.ts`; `modules/banner/src/index.tsx` | SDK-first includes exported sibling `rootNode`/`createRoot` UI and bounded dialog/navigation/extras/builtins/widget APIs. | Supported sibling rendering is allowed; it neither exposes arbitrary host chrome nor automatically shares all providers. Identify ownership of global navigation before choosing its integration. |
| `packages/module-api/src/api/builtins.ts`; `apps/web/src/modules/BuiltinsApi.tsx`; `apps/web/src/components/structures/RoomView.tsx` | Native `renderRoomView(roomId, props?)` is alpha; the room view uses Matrix context and room-specific store lifetimes. | Supply explicit permitted room identity, qualify mount/unmount, room switch/remount, same-room concurrent use where proposed, native actions and retained session behavior. |
| `packages/module-api/src/api/extras.ts` | `getVisibleRoomBySpaceKey` registers a callback identifying visible rooms; it is not a synchronous room getter. | Keep visible-room reporting consistent when opening, switching or leaving a pane. Qualify edit/reply navigation and read-marker/unread implications instead of assuming them. |
| `packages/module-api/src/api/widget.ts`; `modules/widget-toggles/src/index.tsx` | Existing widget capabilities and containers have specific limits; type-listed container positions do not establish interchangeable support. | Select and exercise the actual suitable host, capabilities and provider context. No blanket all-container support claim. |

A module-owned complex layout is not inherently a core patch. Conversely, current location renderers and space-like entries do not expose arbitrary global navigation. If an authorized requirement needs an unexposed Element-owned region, define the narrow explicit host extension and review that core change inside the existing fork. Do not substitute private imports, DOM interception or hidden host behavior changes. No specific patch, file count or merge-conflict size is approved or guaranteed by this Reference. The [I10 extension guide](situation/references/I-000010/poda-ui-extension-guide.md) retains detailed source-backed limits.

## Existing Storybook and explicit integration preview

Use the existing catalog in `packages/shared-components/.storybook/main.ts` and providers in `.storybook/preview.tsx`. Poda Light/Dark presentation uses the existing Poda design/theming and supported Compound foundations, not the private donor's copied palette or layout recipe. If story discovery needs an authorized change for a shared view's location, extend this catalog rather than start another workbench.

Typed public-safe fixtures and scenario definitions are shared by the domain views in Storybook and the selected Element-hosted preview. `MockViewModel` and `useMockedViewModel` are static snapshot helpers, not interactive stores. Stateful scenarios must explicitly own transitions and propagate observable snapshots through existing-compatible view models or story state. Define scenario reset/disposal, action outcomes and subscription behavior; action spies alone cannot demonstrate a completed edit.

The identified integration-preview seam is a separately activated test/preview Element client configuration loading the Poda module bundle through `config.modules`, using the existing pattern in `modules/playwright/element-web-test.ts`. It hosts the same domain views and scenario definitions inside the real member shell. This is a planned activation route, not an already delivered URL, module or executable. Qualification must record its exact configuration, entrypoint, selected host and dependency setup before observation. It is not a new mock application or server.

Keep the layers distinct:

- Storybook presents isolated shared views and explicit stateful interactions.
- The Element-hosted preview exercises the chosen workspace/conversation host integration and bounded native navigation/session/Settings behavior.
- `packages/playwright-common/src/fixtures/services.ts` supplies separate native Matrix service fixtures; its default Synapse setup and optional Matrix Authentication Service do not establish another chat/auth deployment, product artifact service or assistant provisioning.
- Simulated product-data outcomes come from the shared preview scenarios, not implied success from Matrix fixture availability.

Before a future run, name the loading, empty, validation/rejected outcome, incoming-artifact-update and unsaved-draft scenarios and their expected observable transitions. Declare which incoming update is simulated and how the scenario handles an existing draft without silent loss; do not turn that example into a selected production merge/approval rule. In-session outcome labels must say they are simulated. No blur-autosave policy, real analytics definition, publication transition or assistant execution is selected by a mock interaction.

Preview activation must be explicit and isolated from production activation, data and mutation paths. Missing or failed production services must remain truthful failures, never trigger fixtures or simulated saved/published/assistant-success states. A compiling production build does not prove that boundary. O8 owns the predeclared isolation judgment, including its required inputs and manual coverage; no result exists here. See the [I11 preview guide](situation/references/I-000011/poda-ui-preview-and-fixture-guide.md) for the established fixture-layer discipline.

## Service-owned contracts and unresolved policies

The selected principles do not answer these named decisions. [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md) retains their disposition; required missing inputs block the affected qualification/judgment leg rather than inviting an invented result.

- **Artifact/service contract:** identity/revision representation, supported forms, public-safe field/validation/mutation contracts, endpoints, update-observation transport and permission matrix. E/D/H review coverage is not the service contract.
- **Human-work policy:** unsaved-draft handling on navigation/room switch, concurrent manual/assistant/multi-host changes, stale revisions, save/approval/confirmation and publication policy. Silent draft loss is not permitted; a particular reconciliation or autosave mechanism is not selected.
- **Analytics:** real definitions, units, aggregation, attribution, time windows, freshness and permissions. Scenario values illustrate a view; they do not define production metrics.
- **Conversation and agent authority:** provisioning/personalization, assistant identity delivery, room selection/reuse/creation, participation, authorized tool/context delivery, unread/receipt behavior and any room-lifecycle extension.
- **Navigation and host contract:** exact primary-navigation placement, detail/query/history representation, public/member return, supported widget/pane context, module lifetime/disposal and any unexposed host-navigation extension.
- **Delivery and public data:** actual dedicated-app hostname, public/preview origins and serving arrangement, cookies/storage/session boundaries, approved-public payloads and publication authority. Private member data and credentials never become Astro output merely because a member view can display them.
- **Support and qualification scope:** supported browsers, responsive/accessibility cases, recovery/offline expectations and dependency versions. P8/O8's bounded preview cases do not select a universal support policy.

No backend/API, Matrix custom artifact-event protocol, new authentication or identity switching, assistant/model/provider/tool runtime, feed serialization/publishing, real analytics, public-page implementation, player or comprehensive donor application is implemented or authorized in this revision. Nor does the preview settle the separately open Support DM policy.

## Conditional qualification and delivery sequence

The sequence below is for later separately authorized work. It is not an active execution assignment and does not duplicate P8/O8's criteria.

1. **Bound the dossier.** Pin the consumed source/dependencies and explicit preview activation, identify the exact proposed page inventory and public-safe coverage contract, selected editable-form/analytics examples and conversation-adjacent host. Record required scenario expectations and unresolved policy inputs before a run. Keep complete submitted coverage privately available for review; settle publication requirements before exporting any fixture detail.
2. **Qualify the host seam.** In a bounded disposable integration, exercise configured module loading, selected screen/query/history/deep-link behavior, actual panel geometry and provider context, native Settings dialog, and selected RoomView/widget lifetime/visibility/native-action behavior. Identify any genuinely missing host-owned seam; obtain explicit review before a core extension. A failed or incomplete qualification does not justify a fallback implementation or reduced inventory.
3. **Deliver shared views and scenario behavior after approval.** Build the agreed domain views/forms and existing-pattern view models once; add public-safe typed fixtures and explicit state transitions to the existing Storybook catalog. Keep simulation isolated. Migrate every selected host to the same view/action contract rather than independently implement preview copies.
4. **Compose the broad workspace preview.** Integrate Podcasts, Episodes, Analytics, own Profile, Creators and the native Chat/Settings entries in the qualified Element host. Use thin wrappers for representative editable-form and analytics reuse in the selected conversation context. Preserve ordinary manual use without assistant invocation and keep service-policy choices explicit.
5. **Apply the predeclared manual judgment.** Use O8's complete coverage table and P8's supported conditions on the named preview head, fixtures and hosts, including its native-boundary, state, Light/Dark, desktop/narrow and keyboard/focus cases. Record only actually observed outcomes and missing inputs; do not infer pass/fail from source presence, action spies, build success or unchanged upstream suites. Preview results cannot qualify all native Element features, a production service or an assistant.
6. **Retain evidence and review disposition.** Only an actual authorized run can supply a Witness and justify a Promise disposition. Keep limitations and policy gaps explicit, update affected records and leave merge authority separate. Until then P8 is hypothesis, O8 designed/manual and PLAN3 draft.

[G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) remains the implementation/evidence absence. Neither this sequence nor the existence of exported APIs, Storybook or fixture infrastructure closes it, activates C-000002, or expands the current visual migration.

## Provenance and related records

Current maintainer selections and the named public source establish this direction. The following declared-private coordinates retain source traceability only; they are not runtime dependencies or permission to copy content:

- `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native/src/lib/types/index.ts` — private; requires repository access. Original submitted entity-coverage source; complete submitted coverage is retained in the corresponding private Project, not reproduced here.
- `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native/src` — private; requires repository access. Historical presentation source; no visual recipes or copied implementation are admitted by this Reference.
- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/native/src/lib/structured-chat/fixtures.ts` — private; requires repository access. Earlier submitted profile/editor coverage reference, not a new public fixture or schema.

Inability to fetch declared-private material is expected. Continue with available public evidence, record the unmet access/review need and do not invent private contents. Historical repository proposal coordinates are listed under Record status; they preserve review provenance rather than authorize republishing private-derived material.

Public namespace context: <https://github.com/Podcastindex-org/podcast-namespace/blob/c0ff5caa3729610362ee93f8034454fa41f3c493/docs/1.0.md>.

Related boundaries:

- [D15 rendering ownership](situation/decisions/D-000015-public-and-member-rendering-ownership.md), [D16 native assistance/shared artifacts](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md), [D17 explicit extensions](situation/decisions/D-000017-explicit-ui-extension-boundaries.md), [D18 shared preview workflow](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md).
- [I12 shared workspaces](situation/invariants/I-000012-shared-member-workspaces.md), [I6 shared artifact editing](situation/invariants/I-000006-shared-artifact-editing-contract.md), [I11 shared Storybook/fixtures](situation/invariants/I-000011-shared-storybook-and-fixtures.md).
- [D7 visual-first migration](situation/decisions/D-000007-visual-first-element-alignment.md), [I3 native-capability boundary](situation/invariants/I-000003-element-native-capability-boundary.md), [active PLAN2](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md), all unchanged.

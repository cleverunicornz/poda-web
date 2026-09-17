# Unselected product UI contracts

## State

open

## Gap

The user selected frontend ownership and truthfulness boundaries, not the following product/service policies. They remain genuinely unselected and cannot be filled by frontend inference:

- Public/member/preview origins, URL prefixes, document entrypoints, cookie/storage isolation and deployment arrangement within the coordinated frontend workspace/delivery boundary. Astro need not host the member document.
- Artifact identity/revision representation, supported artifact/form kinds, field validation/mutation wire contracts, service endpoints and update-observation transport. No fixed PodaClientContractV1 or other invented API catalog is established.
- Unsaved-human-draft adjudication, concurrent manual/assistant/multi-host writes, stale revision handling, and save/publish/tool approval or confirmation policy. Silent loss of human work is prohibited, but a specific replacement policy is not selected.
- Provisioning/personalization and explicit assistant identity delivery; conversation room selection, reuse/creation, permitted participation and tool authorization. The frontend consumes those authorities; it does not create an agent orchestration design.
- Product navigation, public-to-member return behavior, room-switch/draft policy, unread/notification/read-marker choices, and whether a needed host-owned region requires a deliberate extension. Current location-renderer APIs are not an arbitrary global-navigation contract.
- Supported browsers, responsive/accessible layouts, artifact/host/room permission matrix, recovery/offline behavior and production/preview isolation scenarios. Simultaneous embedding of the same room and module reload/disposal behavior require explicit qualification rather than an assumption of stable independent room lifecycles.

## Relevance

P-000009 through P-000014 require bounded supplied contracts and scenario inputs before their Oracles can be applied. The chosen high-level constraints remain binding without selecting these details or activating implementation. None of these unknowns displaces the current visual migration's accepted scope.

## Evidence

- [D-000015](situation/decisions/D-000015-public-and-member-rendering-ownership.md) through [D-000018](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md) retain user-selected boundaries and their unselected details.
- `packages/module-api/src/api/navigation.ts` marks location rendering alpha; `packages/module-api/src/api/extras.ts` requires a registered callback for embedded-room visibility. Neither source selects product navigation policy.
- `packages/module-api/src/api/index.ts` exposes `Module.load()` without a corresponding module unload contract. `apps/web/src/components/structures/RoomView.tsx` obtains room-specific stores through `multiRoomViewStore`, expects remount on room change and removes the room-specific store on unmount. These are observed source limits, not proof that repeated same-room mounts are safe or defective.
- `apps/web/src/vector/routing.ts` uses hash navigation, and `apps/web/src/vector/init.tsx` manages the member application's root lifecycle. These source facts do not choose an origin, URL prefix or Astro document arrangement.
- `packages/shared-components/src/core/viewmodel/MockViewModel.ts` is static, and `packages/playwright-common/src/fixtures/services.ts` defaults to Synapse with optional Matrix Authentication Service. Neither selects a Poda artifact API or proves the intended production chat/identity deployment.
- 2026-09-15 PR #6 revision observation: [D-000019](situation/decisions/D-000019-shared-member-workspaces.md) narrows the earlier open questions by selecting a dedicated member-app subdomain, one Element-based UI foundation and shared views across conventional workspaces and conversation contexts. The retained preview navigation/catalogue and field-coverage intent are specified in the [delivery reference](situation/references/D-000019/member-workspace-preview-plan.md); the exact hostname, origins/redirect/storage contract, final information architecture, backend payloads and authorization, update transport, analytics definitions, agent-visible local context and production draft/approval policy remain unselected. Preview scenarios may expose those choices for review but do not settle them. State and Resolution remain unchanged.
- 2026-09-15 PR #6 navigation follow-up observation at `e4856fa4e80102c735642d1112f3c1c2a4ae0603`: source inspection found the supported sibling-root/banner pattern, native URL/hash routing and alpha SpacePanel entry API. [C-000003](situation/candidates/C-000003-qualify-member-navigation.md) and draft [PLAN-000004](situation/plans/draft/PLAN-000004-qualify-member-navigation.md) distinguish those observed mechanisms from an unqualified full Poda header, an alternative rail UX and a conditional host extension. Their [dossier](situation/references/C-000003/member-navigation-qualification.md) names the finite cases to observe before selection. No navigation prototype ran; no missing host capability, successful implementation or necessity for a core patch was established. State and Resolution remain unchanged.

- DELTA observation for run `20260916T205845Z-8a3e26995da2637b9d75383b16e1ed9bf56950ca` over `c2356c63f50c23fa95842ae6db76387319a75231..8a3e26995da2637b9d75383b16e1ed9bf56950ca`: `modules/poda-navigation-spike/src/Navigation.tsx` adds Profile and Studio controls with their own active-state checks to the local navigation spike. The [module-vs-widget host discovery](situation/references/G-000005/module-vs-widget-host-discovery.md) reports bounded spike mechanics only: the module retains the existing session and its public profile seam lacks `avatarUrl`, while a widget uses URL parameters/OpenID, has iframe-local navigation, and lacks host-session access. These observations neither select the product's host, navigation, or identity contracts nor supply P-000008 implementation or an O-000008 Witness.
- DELTA observation for run `20260917T110444Z-6f60ab04198fcf105baab5bd4f0cadb5d48d9f90` over `9dd4ae7519c2b3e191a5fc2c1b5c2d0b41ccc3eb..6f60ab04198fcf105baab5bd4f0cadb5d48d9f90`: `modules/poda-profile-spike/src/index.js` uses `api.profile` only for identity, keeps creator edits session-only, and parses its own `view`/`who` hash query; `modules/poda-profile-spike/widget/widget.js` receives viewer identity from URL parameters and can ask its host to open only a Matrix-room permalink. These source facts show separate bounded hosts, not a selected product data/persistence contract, shared artifact contract, production navigation/placement, target room, or identity/authorization policy. They do not promote C-000003 or P-000008.

## Impact

An implementation that guesses these choices could lose drafts, cross an access/data boundary or claim product support without a decidable contract. A qualification dossier must identify which choices its bounded scenario needs; missing choices stay open rather than being hidden in fixtures or generalized from upstream examples.

## Resolution

none

[C-000002](situation/candidates/C-000002-qualify-product-ui-boundaries.md) proposes a way to qualify a bounded slice, but is not promoted or active. The older excluded project and private donor material supplies no new scope or policy.

## References

- [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md)
- [UI extension guide](situation/references/I-000010/poda-ui-extension-guide.md)
- [Preview and fixture guide](situation/references/I-000011/poda-ui-preview-and-fixture-guide.md)

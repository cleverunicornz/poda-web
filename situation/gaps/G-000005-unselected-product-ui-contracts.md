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

## Impact

An implementation that guesses these choices could lose drafts, cross an access/data boundary or claim product support without a decidable contract. A qualification dossier must identify which choices its bounded scenario needs; missing choices stay open rather than being hidden in fixtures or generalized from upstream examples.

## Resolution

none

[C-000002](situation/candidates/C-000002-qualify-product-ui-boundaries.md) proposes a way to qualify a bounded slice, but is not promoted or active. The older excluded project and private donor material supplies no new scope or policy.

## References

- [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md)
- [UI extension guide](situation/references/I-000010/poda-ui-extension-guide.md)
- [Preview and fixture guide](situation/references/I-000011/poda-ui-preview-and-fixture-guide.md)

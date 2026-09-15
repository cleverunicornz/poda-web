# Qualify product UI boundaries

## State

proposed

## Candidate

Consider a separately authorized, bounded qualification of the selected frontend boundaries before any product implementation Plan is activated. A possible dossier would select one artifact/form and permission matrix, compare its module-page and existing-widget presentations, examine native assistant RoomView lifecycle/navigation, and account for a designated public output/production-preview boundary. It would use the existing Storybook and test layers rather than launch a competing frontend or mock-server project.

This is a possible qualification approach, not a commitment to implement P-000009 through P-000014. Those direct user-selected hypotheses are not a promotion of this Candidate.

## Origin

- [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) records missing implementation and evidence; [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md) records the remaining choices.
- [D-000015](situation/decisions/D-000015-public-and-member-rendering-ownership.md), [D-000016](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md), [D-000017](situation/decisions/D-000017-explicit-ui-extension-boundaries.md) and [D-000018](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md) establish the user-selected boundaries that could be qualified.
- Current public source in `packages/module-api/src/api/navigation.ts`, `packages/module-api/src/api/builtins.ts`, `packages/module-api/src/api/extras.ts` and `packages/shared-components/.storybook/main.ts` offers concrete seams worth assessing, but no product feasibility observation.

## Why consider it

A narrow shared-artifact scenario can distinguish a missing exported capability from module-owned layout, expose lifecycle and draft-policy questions early, and avoid conflating convincing previews with real persistence or service integration. The current visual-only migration and its active PLAN-000002/G-000002 remain separate and unchanged.

## Qualification questions

- Which explicitly provided artifact/form, permissions, update observation and human-draft/approval contract makes each selected scenario decidable? Which choices require product/backend/chat owners rather than frontend invention?
- Can the same form/view contract serve manual and backend-assisted editing in both module and widget hosts without divergent artifacts or escalated authority?
- Does the native RoomView pane preserve supplied identity/session, edit/reply navigation and switch/unmount behavior at the chosen module seam? Does any named requirement truly occupy an unexposed host-owned region?
- Which approved public routes/data and selected document/origin arrangement preserve Element member routing/lifecycle and keep private data outside the delivered static dependency set?
- Which explicit shared fixtures/scenarios demonstrate state transitions, draft handling and failures without implying backend correctness? What real service/host observations remain needed for the designed Oracles?
- What finite support and observation matrix can be evidenced without claiming universal navigation, concurrency or deployment support?

## Candidate approaches

- Prefer a module-owned form canvas with a native RoomView side pane when the form owns the layout; compare a room-first widget using the same artifact/form contract when the room owns the interaction context.
- Use existing exported navigation/extras/dialog/root APIs where they express the need. If a specific host-owned region or navigation behavior is unexposed, propose a narrow reviewed extension inside this fork rather than another application, global DOM interception or a second member router.
- Use static snapshots for presentation questions and explicit stateful Storybook scenarios for interaction questions; reserve existing unit/fetch-mock and Matrix/module Playwright layers for their actual boundaries. Real service evidence remains separate from preview evidence.
- Defer qualification if the needed authority/policy is unselected; retain the Gap instead of inventing a wire schema, transport or approval/conversation policy.

## Disposition

none

No qualification or implementation Plan is activated, no Candidate promotion transaction has occurred, and no Witness or assured/implemented product state is created. Older private donor material and the excluded obsolete project provide neither requirements nor additional candidates. Superseded/withdrawn product Promises and abandoned PLAN-000001 remain inactive.

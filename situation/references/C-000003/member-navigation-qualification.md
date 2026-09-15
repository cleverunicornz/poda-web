# Member navigation qualification dossier

Owner: [C-000003](situation/candidates/C-000003-qualify-member-navigation.md).

This is supporting depth for proposed navigation qualification under draft [PLAN-000004](situation/plans/draft/PLAN-000004-qualify-member-navigation.md). It is not an implementation decision, executed experiment, additional Oracle for P-000008 or assurance claim. The current assignment records the alternatives and criteria only.

## What is selected, observed and still unproved

| Category | Current standing |
|---|---|
| Selected product direction | D-000019/I-000012: one Element-based member UI, first-class conventional workspaces, shared views and native chat; ordinary work does not require a conversation or assistant. These are requirements, not observations of delivered product behavior. |
| Observed source capability | The public root/sibling rendering contract, the existing banner navigation example, native hash routing, exact-key module locations and alpha SpacePanel entries exist in the named source. |
| Unqualified primary approach | A Poda header using the banner mounting pattern might meet the whole chosen navigation contract without a core-source change. No runtime result establishes that yet. |
| Unselected alternative UX | Native rail entries might satisfy the application-navigation need, but differ from a persistent top bar and require maintainer acceptance. |
| Conditional extension | A narrowly defined host extension might be necessary for a demonstrated missing capability. Necessity and its shape are not established by incomplete evidence or a preferred visual design alone. |

The source observations below were inspected at `e4856fa4e80102c735642d1112f3c1c2a4ae0603`. They do not make alpha APIs stable or prove an end-to-end Poda implementation.

## Source evidence and limits

| Source | Observed fact | Limit to retain |
|---|---|---|
| `e4856fa4e80102c735642d1112f3c1c2a4ae0603:packages/module-api/src/api/index.ts` | `rootNode` is documented for sibling React trees; `createRoot` is exposed. | Public mounting support does not automatically provide every host provider, lifecycle signal, modal/accessibility integration or chrome-control operation. |
| `e4856fa4e80102c735642d1112f3c1c2a4ae0603:modules/banner/src/index.tsx`, `e4856fa4e80102c735642d1112f3c1c2a4ae0603:modules/banner/src/Banner.tsx`, `e4856fa4e80102c735642d1112f3c1c2a4ae0603:modules/banner/src/style.css` | The module inserts a sibling before the application root, renders a navigation component, and uses a column layout with the application taking remaining space. | This demonstrates a mounting/layout pattern in source, not the requested Poda navigation's runtime fitness. Global layout/style changes still need review even when no core-source file is edited. |
| `e4856fa4e80102c735642d1112f3c1c2a4ae0603:modules/banner/src/config.ts`, `e4856fa4e80102c735642d1112f3c1c2a4ae0603:modules/banner/src/Menu.tsx` | The example has URL-based menu configuration and link rendering, with a default new browsing target. | It is a banner/menu example, not ready-made same-window Poda tabs. Do not blindly copy its menu, theme provider or link behavior into another component system. |
| `e4856fa4e80102c735642d1112f3c1c2a4ae0603:packages/module-api/src/api/navigation.ts`, `e4856fa4e80102c735642d1112f3c1c2a4ae0603:apps/web/src/modules/Navigation.ts` | Module renderers use exact screen keys; native room navigation is exposed. | The interface does not itself provide a generic current-workspace subscription or arbitrary nested routing. Registering a renderer does not establish every navigation transition. |
| `e4856fa4e80102c735642d1112f3c1c2a4ae0603:apps/web/src/vector/routing.ts` | Native routing reads the URL hash, handles hash changes and updates the hash on native screen changes. | URL-driven active-state tracking is a candidate mechanism. Verify the actual transitions and modal cases instead of assuming URL state captures every UI state. Do not install another member router. |
| `e4856fa4e80102c735642d1112f3c1c2a4ae0603:packages/module-api/src/api/extras.ts` | `setSpacePanelItem` inserts a space-like entry; the API also supports visible-room callbacks. | The entries are alpha, represent a rail UX and confer no Matrix Space or artifact authority. Visible-room callbacks are not a general route-state subscription. |
| `e4856fa4e80102c735642d1112f3c1c2a4ae0603:apps/web/src/components/structures/LoggedInView.tsx` | Module pages suppress the ordinary LeftPanel while retaining SpacePanel, member context and global services. | A header does not by itself hide or reorganize those retained surfaces. Such a requirement must be named and qualified, not implemented by silent private-DOM manipulation. |
| `e4856fa4e80102c735642d1112f3c1c2a4ae0603:apps/web/src/components/structures/MatrixChat.tsx` | The Settings route dispatches the native UserSettingsDialog. | Treat Settings as the native dialog entry, not a persistent page created merely to simplify tab highlighting. Invoking context and focus-return behavior need observation. |

## Alternatives to compare

### A — module-owned header

Preferred first investigation: use supported sibling rendering for a Poda navigation component built on the existing supported Element/Compound and Poda foundations. Reuse the existing Storybook for isolated presentation and an explicitly configured Element integration preview for host behavior. Workspace destinations remain registered module locations; native chat remains native.

Evaluate same-window links/native hash navigation and active-workspace observation without private dispatcher/store imports. Account for the header's relationship to login/logout, native dialogs, focus, theme/provider context and the available viewport. A new Poda navigation component is not a new design system; sharing ReactDOM through the API is not a second application/session.

### B — native rail entries

Evaluate supported SpacePanel workspace entries as a different presentation of the same first-class destinations. Define how existing room/space selection and workspace selection interact and how a user returns to native chat. Record the UX tradeoff explicitly. Technical feasibility does not authorize replacing the proposed top navigation with a rail; that requires a maintainer choice.

### C — bounded host extension

Consider only when a named accepted requirement cannot be satisfied through the selected supported route, with the missing capability demonstrated. Describe the minimum host contract and its effect on existing behavior; obtain explicit owner review before implementation. An absent experiment, unavailable tool or unselected requirement does not establish a missing capability. File-count promises, private imports, hidden DOM interception and an additional app/router are not substitutes.

## Dossier required before an experiment

A separately authorized qualification names the candidate source/dependency versions, selected approaches and their allowed UX differences; actual module/bundle configuration; member preview entrypoint; permitted Matrix fixture user/rooms; declared workspace destinations; browser/version; Poda Light/Dark; desktop and narrow dimensions; expected navigation, session, focus and layout outcomes; and how the experiment is reset.

Use P-000008's named viewport envelope when claiming compatibility with that preview. Record any additional or different envelope explicitly. Product backend, real assistant and public Astro completion are not blanket prerequisites. An identified native fixture or instrument that a case actually consumes is required; its absence blocks that case.

A bounded navigation probe can use clearly labelled fixture workspace content when actual domain views are not yet implemented. That can answer a navigation question; it cannot satisfy P-000008's catalogue, editor or shared-artifact behavior. No fixture may masquerade as a working production service.

## Predeclare and observe these finite cases

The experiment owner must name concrete actions and expected outcomes for each applicable case before running it. Common behavior is compared across approaches; permitted layout differences are recorded separately.

| Case | Required observation |
|---|---|
| N1 — initial/direct entry | Open the declared native and module destinations directly, including selected query cases; observe the correct content and active navigation representation. |
| N2 — switching and history | Switch module workspaces and native room context, then use browser Back/Forward and refresh. Observe the expected destination and active state without a second routing lifecycle. |
| N3 — member-session visibility | Exercise declared signed-in, signed-out, login-return and logout transitions. Observe the intended navigation visibility and existing session behavior without another login/session owner. |
| N4 — native Settings | Open Settings from the declared workspace and Chat contexts, perform the selected safe fixture interaction, close it and observe the predeclared underlying context, active state and focus return. |
| N5 — keyboard and modal access | Traverse navigation by keyboard, check labels/current-state semantics, open/close the selected native modal and observe focus order, trapping/restoration and sibling-header accessibility. An isolated Storybook render is insufficient for the native modal case. |
| N6 — layout and themes | Observe both Poda themes and named desktop/narrow layouts, including available application height, retained SpacePanel behavior, essential controls and scroll/overflow. |
| N7 — retained native surfaces | Exercise the predeclared native room-navigation and call/PiP or other global-surface cases actually affected by the chosen header/rail/layout. Retain the bounds; do not claim all native behavior is unchanged from a passing sample. |
| N8 — lifetime and reset | Exercise the declared navigation/module reset and applicable mount/unmount transitions. Observe that owned UI/listeners do not leave duplicate headers, stale active state or stale room context. Do not invent an exported unload API. |
| N9 — ownership and UX decision | Retain the actual source/configuration/style/API change inventory and any identified host gap. Confirm which exported contracts are used and which explicit extension needs approval. Obtain a separate UX choice before substituting rail navigation for the proposed header. |

For each approach and applicable case, retain actual observations and provenance, with matched, contradicted, blocked/not-judged or not-attempted outcomes. A contradicted case with valid inputs is evidence against that approach at that boundary. Missing inputs or an unavailable instrument are not a technical failure. A screenshot of a bar, a compiling bundle or a source signature alone does not answer the entire matrix. Mixed results remain mixed.

## Disposition and downstream use

Qualification findings can justify a later selection, rejection or further bounded investigation. They do not promote the Candidate themselves. Promotion follows `situation/candidates/AGENTS.md`: an explicit Decision, precise falsifiable Promise and Oracle, linked Plan updates and any applicable Gap disposition form the required transaction. No such transaction occurs in this planning update.

The selected qualified mechanism can satisfy the existing host-qualification prerequisite of draft [PLAN-000003](situation/plans/draft/PLAN-000003-member-workspace-preview.md). It does not assure [P-000008](situation/promises/P-000008-member-workspace-preview.md), replace [O-000008](situation/oracles/O-000008-member-workspace-preview.md), reduce the agreed workspace catalogue or activate implementation. A rejected approach does not authorize a smaller chat-only product or an unreviewed fallback.

The closed D-000019/P-000008/O-000008/PLAN-000003 records and their Reference remain unchanged. This additional Candidate/draft Plan supplies the previously implicit navigation qualification work. [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md) remains open; the broader [C-000002](situation/candidates/C-000002-qualify-product-ui-boundaries.md) remains proposed. No navigation prototype, runtime Witness or qualified implementation is claimed.

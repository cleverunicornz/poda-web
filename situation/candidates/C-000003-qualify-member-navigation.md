# Qualify member application navigation

## State

proposed

## Candidate

Consider a supported module-owned navigation header for Poda's member workspaces, using the sibling-rendering pattern demonstrated by the banner module. Compare it with native SpacePanel workspace entries and, only for a demonstrated missing capability, a narrowly defined host extension.

The module header is the preferred first qualification approach, not a selected or proven production implementation. The existence of an API or example does not establish that the complete Poda navigation, session, layout and accessibility requirements can be met without a core-source change. The three approaches below are alternatives inside this Candidate, not three accepted commitments.

## Origin

- The maintainer's 2026-09-15 follow-up explicitly requests recording the navigation possibilities as Candidates, distinguishing observed source capability from unqualified application behavior.
- [D-000019](situation/decisions/D-000019-shared-member-workspaces.md) and [I-000012](situation/invariants/I-000012-shared-member-workspaces.md) select the shared member UI and first-class workspaces. They do not select a particular navigation implementation.
- [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md) retains the unselected navigation/host contract; [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains missing implementation and evidence.
- Source inspection at `e4856fa4e80102c735642d1112f3c1c2a4ae0603` found public `rootNode`/`createRoot` contracts in `packages/module-api/src/api/index.ts`; `modules/banner/src/index.tsx` mounts a sibling before the application root, `Banner.tsx` renders navigation, and `style.css` arranges the header and application viewport. These are source observations, not a Poda-header runtime result.
- `packages/module-api/src/api/navigation.ts` exposes alpha exact-location renderers and native room navigation; `apps/web/src/vector/routing.ts` handles native URL/hash navigation. `packages/module-api/src/api/extras.ts` exposes alpha space-like entries. Those facts support investigation, not arbitrary host-chrome ownership or a complete current-workspace subscription contract.

## Why consider it

A module-owned header may provide full-application navigation without preselecting the original core tab-bar patch. Native rail entries offer a more integrated but visibly different navigation design. Distinguishing these possibilities can preserve the selected conventional workspaces and shared UI while identifying the smallest legitimate host integration rather than introducing a second router or disguising private host access as SDK use.

This is narrower than [C-000002](situation/candidates/C-000002-qualify-product-ui-boundaries.md), which concerns broader artifact, host and service qualification. It does not promote, replace or activate that Candidate.

## Qualification questions

- Can the selected member destinations be reached and highlighted correctly through a module-owned header using native navigation, including direct/query entry, native room selection, browser history and the native Settings dialog?
- Can the header follow the declared signed-in/signed-out transitions without another session, private-store dependencies or an invented authentication contract?
- Does a sibling header preserve viewport layout, Poda themes/providers, retained SpacePanel behavior, native modal focus/accessibility and the selected call/PiP cases at the named desktop and narrow sizes?
- Do native SpacePanel entries meet an explicitly accepted alternative UX? A rail is not automatically equivalent to the proposed top navigation, and a space-like entry is not a newly provisioned Matrix Space or access authority.
- If the preferred route cannot meet a requirement, is the limitation a demonstrated missing host capability, an unselected requirement, or an unavailable instrument? What exact exported extension, if any, would address it?
- Can each result be bounded to its named source, configuration, fixtures and cases without claiming the entire preview, production backend or every native feature is qualified?

The owned [qualification dossier](situation/references/C-000003/member-navigation-qualification.md) separates source facts, candidate approaches and predeclared observation cases.

## Candidate approaches

1. **Module-owned header — preferred for investigation.** Mount a Poda navigation component through supported `rootNode`/`createRoot` sibling rendering; register workspace locations and evaluate native URL-based navigation/active-state observation. Reuse the existing UI and preview foundations. The banner's mounting pattern is evidence, not a drop-in Poda tab bar or an instruction to copy its menu/theme design.
2. **Native rail entries — alternative UX.** Use `extras.setSpacePanelItem` for workspace entries in the existing rail. Qualify native navigation/visibility and obtain explicit acceptance of the changed presentation rather than silently substituting it for top navigation.
3. **Narrow host extension — conditional.** Only after a concrete requirement and missing supported capability are identified, define and review the required host slot, event or other bounded contract. Do not assume a particular file, one conditional, zero maintenance cost, or a new application. An unavailable experiment is not evidence that a core patch is necessary.

## Disposition

none

[PLAN-000004](situation/plans/draft/PLAN-000004-qualify-member-navigation.md) is draft; C-000003 remains proposed. No prototype was executed, no approach was qualified or selected for delivery, and no Promise, Oracle, Witness or promotion transaction is created by this record. [P-000008](situation/promises/P-000008-member-workspace-preview.md) remains the separate preview hypothesis.

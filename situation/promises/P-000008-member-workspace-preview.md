# Member workspace and shared-artifact preview

## State

hypothesis

## Promise

Within the finite preview conditions in Scope:

1. The Element-derived member application offers Chat, Studio, Profile and a
   native Settings entry. Studio exposes Podcasts, Episodes and Analytics;
   podcast and episode list/detail navigation, own creator-profile view/edit,
   and read-only creators-directory/detail browsing are usable without a
   conversation or assistant invocation.
2. Podcast and episode editors support creating new in-session drafts as well
   as editing existing fixture artifacts; the own-profile editor supports
   conventional editing. Across the agreed coverage, users can change valid
   values, observe validation, and explicitly accept or discard a preview
   draft under the declared expectations. Accepted creations appear in the
   relevant collection and remain available through detail/revisit; accepted
   edits remain observable during that session. No real persistence is implied.
3. A representative editable artifact form is usable both in its full
   workspace and in the selected conversation-adjacent host. These
   presentations reuse the same domain form, artifact identity, validation
   and action/view contract, not independent host-specific editors. Equivalent
   actions against the same scenario state have equivalent visible outcomes.
4. A representative Analytics view is usable in the full workspace and the
   selected conversation-adjacent host through the same domain view and
   action/view contract. The declared analytical selection, fixture results
   and result updates agree across presentations; simulated metrics are
   identified as such.
5. The existing Storybook catalogue and the identified Element-hosted
   integration preview expose shared typed fixtures and explicit stateful
   scenarios. Editing and analytical actions visibly update the shared view
   state rather than merely recording action calls or showing static snapshots.
6. The named loading, empty, invalid-input and rejected-action scenarios
   produce their declared visible states. Validation/rejection preserves the
   human input needed to correct it, and does not display an accepted or saved
   outcome.
7. The named incoming-artifact-update scenarios visibly distinguish artifact
   state from conversation text. With a clean editor the declared update
   becomes visible; with an unsaved human draft the draft remains available
   or is explicitly adjudicated by the declared preview interaction, never
   silently replaced. Navigating away and returning follows the declared
   draft expectation without inventing a production concurrency policy.
8. In the bounded integration scenarios, Chat and the selected native
   conversation pane use the explicitly permitted Matrix room identities and
   existing member session. Native room selection, send/edit/reply actions,
   room switching, pane mount/unmount and return to Chat preserve the declared
   room context and do not expose stale-room content or require a second login.
9. Settings opens Element's native UserSettingsDialog, supports the declared
   native setting interaction, and closes back to the invoking member
   context with usable focus. It is not a replacement persistent settings page.
10. The declared module locations, query cases, direct entry, back/forward,
    unknown-location handling and Matrix deep-link cases reach their
    predeclared member or room context without introducing a second member
    navigation lifecycle.
11. The complete page inventory and both representative shared-host views
    remain readable and operable in Poda Light and Poda Dark at the named
    desktop and narrow sizes; content, primary actions and required state
    messages are not lost through clipping or overlapping host chrome.
12. The named keyboard-only journeys through navigation, editors, Analytics,
    conversation hosting and Settings have reachable labelled controls,
    visible focus, usable validation feedback and correct focus restoration
    without unintended focus traps.
13. Simulated product data/actions are available only through explicitly
    selected preview/test entrypoints and are visibly labelled. In the named
    preview-disabled and service-unavailable cases they do not become a
    production fallback or a claim of real saved, published or assistant
    success. Native Matrix fixture services are distinguishable from
    simulated product outcomes.

## Scope

This is a proposed module-first member-workspace preview, not an application
implementation claim. It covers the catalogue above, the agreed field-coverage
intent retained for review, one representative editable form and one
representative Analytics view in both workspace and selected
conversation-adjacent presentations. Full Studio need not become a widget.
The same UI-facing artifact/view boundary serves these presentations; this
does not select a new backend payload or require a frozen interface.

[O-000008](situation/oracles/O-000008-member-workspace-preview.md) requires a
predeclared, publication-cleared coverage mapping and finite scenario dossier:
exact fixtures, host, permitted room identities, browser/version, locations,
actions and expected state transitions. Poda Light/Dark and 1440 × 900 desktop
and 500 × 900 narrow viewports are the bounded presentation cases. Missing or
unselected inputs block judgment of their legs; they neither reduce the agreed
preview breadth nor count as observed behavior.

The member UI remains within the Element runtime and supported
Element/Compound foundations, Poda themes and existing Storybook. Module
content layout and any explicitly approved host extension follow
[D-000019](situation/decisions/D-000019-shared-member-workspaces.md).
The native integration claim is only the listed, actually exercised cases;
unchanged upstream suites do not assure unobserved native behavior.

## Oracle

[O-000008](situation/oracles/O-000008-member-workspace-preview.md)

## State evidence

- [D-000019](situation/decisions/D-000019-shared-member-workspaces.md) selects
  the revised preview direction; its
  [Reference](situation/references/D-000019/member-workspace-preview-plan.md)
  retains the design and qualification questions.
- This proposal remains a hypothesis. No feasibility or runtime
  Witness, implementation, assurance promotion or execution authorization is
  supplied by this knowledge-only revision.
- [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md)
  and [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md)
  retain missing evidence and unresolved contracts.

## Residual

This Promise does not assure real product persistence, service schemas,
authorization enforcement, update transport, analytics definitions, publication
or Podcasting 2.0 serialization. Preview draft/acceptance/update expectations
are not a selection of blur-autosave, production merge, concurrency, approval
or publication policy. They do not establish future HTTP-adapter compatibility
without page changes.

It neither implements nor assures assistant provisioning, models, providers,
backend tools, agent execution or access to arbitrary screen/unsaved state.
Native Matrix and product fixtures do not prove the production chat/identity
deployment. Additional hosts, browsers, sizes, native actions and deployment
arrangements require their own qualification. Public Astro delivery and the
separate visual migration remain outside this preview Promise. None of these
limits removes a listed preview behavior from the required judgment.

## References

- [Member-workspace preview design](situation/references/D-000019/member-workspace-preview-plan.md)
- [Shared-member-workspace invariant](situation/invariants/I-000012-shared-member-workspaces.md)
- [Draft plan](situation/plans/draft/PLAN-000003-member-workspace-preview.md)
- [Native assistance and shared artifacts](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md)
- [Explicit extension boundaries](situation/decisions/D-000017-explicit-ui-extension-boundaries.md)
- [Shared preview workflow](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md)
- [Submitted donor publication review](situation/gaps/G-000006-submitted-donor-publication-review.md)

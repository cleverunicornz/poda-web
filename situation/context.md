# Poda Web

## Identity

Poda Web is an internal fork of Element Web that retains a monorepo for Element's Matrix web and desktop clients.

## Ownership

- `UPSTREAM_FORK`: https://github.com/element-hq/element-web

## Phase

`IMPLEMENTATION` — the configuration-backed Poda theme bootstrap is
implemented and the corrective treatment of native Element surfaces is being
validated; exact-head CI, room-state visual, accessibility, and behavior
assurance is pending.

## Implementation map

- `apps/web/` — the web client and its static distribution build.
- `apps/desktop/` — the Electron desktop client.
- `packages/` and `modules/` — shared and optional client components.
- `.github/workflows/` — inherited build, test, and deployment automation.

## Current state

The fork retains the upstream Element client source tree. The earlier broad
application-integration plan has been abandoned before implementation. The
active direction is to restyle the existing Element Web interface without
adding behavior beyond capabilities Element Web and Matrix already provide.
User-supplied Poda vector masters and render references are retained under
`situation/references/D-000008/`. D-000009 selected config-backed Poda Light
and Poda Dark themes, existing Element branding slots, preserved layout
geometry, and deterministic runtime derivatives. Commit `7329320de0`
implements that bootstrap with focused tests and a production-build preflight
gate; commit `8b5da14300` aligns the affected inherited unit contracts and
snapshots with the selected defaults. The maintainer rejected its first
authenticated render as visually too close to stock Element. D-000010
supersedes D-000009's presentation limit and selects a Poda document marker,
Poda-scoped styling of native Element surfaces, and Element's native bubble
layout as the default while preserving explicit user choice. The corrective
implementation at commit `5baf4ea7e3` renders the supplied landscape,
character mark, warm light surfaces, dark brown/green surfaces, rail, room-list
shell, home card, actions, and native room dialogs in both modes. A signed-in
audit of that build then found the custom-theme Compound overrides inert at
runtime (the generated style elements carried `title`, which leaves them
unselected in the HTML style sheet set mechanism) plus Space hover, action
visibility, icon-tint, and narrow-width presentation defects. D-000011 repairs
the cascade in `apps/web/src/theme.ts` and applies the Poda-scoped corrections;
verified post-fix renders show the Poda tokens computing in both modes, the
demo Space carrying the supplied mark as its native `m.room.avatar`, visible
Join actions, and zero narrow overflow. Approved visual evidence and exact-head
CI for the visual migration remain pending. The assured navigation Gate 1
described below is a separate mechanism observation and does not assure the
visual migration.

The demo Matrix homeserver now carries the four-Space organization from
D-000012: Poda Community (General auto-joined; Equipment and both Last Minute
rooms suggested), Podcast Topics (19 Apple-taxonomy rooms), Podcast
Communities (empty, staff-curated), and Poda Support (read-only
Announcements + Support Chat). All children use space-restricted join rules,
verified live by invite-free room joins and a blocked regular-user post.

The maintainer has revised the prospective member-workspace preview under
[D-000019](situation/decisions/D-000019-shared-member-workspaces.md).
It retains conventional product workspaces and native chat while using shared
domain views and one UI foundation. The tracked
[`modules/poda-profile-spike/`](modules/poda-profile-spike/) package is a
diagnostic, mock/session-only module/widget spike: it supplies source-bound host
mechanics, not an implementation of P-000008, execution of O-000008, a selected
product contract, or a runtime Witness. [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md),
[G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md) and
[G-000006](situation/gaps/G-000006-submitted-donor-publication-review.md) retain
those boundaries. The preview remains unimplemented and its delivery plan is
draft, not a new active assignment.

## Intended state

For the active first visual migration, the responsive web client retains Element's existing information architecture,
Matrix data model, routes, stores, permissions, and actions while presenting an
approved Poda visual treatment through Element's theme and branding mechanisms
and narrowly scoped presentation styles. The active plan is
`situation/plans/active/PLAN-000002-poda-element-visual-alignment.md`.

## Prospective product frontend guardrails

The maintainer separately selected repository-level constraints for later product
UI work. [D-000015](situation/decisions/D-000015-public-and-member-rendering-ownership.md)
assigns designated public-page generation to Astro and member routing/lifecycle
to the Element-derived SPA within one frontend workspace and delivery boundary.
This does not require Astro to own or remount the member document.
[D-000016](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md)
requires native Matrix assistant conversations and one artifact/form contract
across manual/assisted and module/widget presentations.
[D-000017](situation/decisions/D-000017-explicit-ui-extension-boundaries.md) and
[D-000018](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md)
distinguish exported extension surfaces and deliberate host changes, and preserve
one preview/fixture workflow without production mock fallback.

I-000004 through I-000010 are explicitly critical and projected in root
`AGENTS.md`; I-000011 is the standard shared Storybook/fixture rule. P-000009
through P-000014 are new hypotheses with designed, unexecuted Oracles. Their
implementation/evidence and unresolved policy boundaries remain in
[G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) and
[G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md).
The UI extension and preview procedures are owned References, not new
implementation or an assured gate.

This knowledge change preserves D-000007, I-000003 and the active visual plan.
It neither activates later product code nor revives the abandoned integration
plan or withdrawn product Promises. Other open planning work must be reconciled
and separately accepted on its own branch. Personal-assistant provisioning,
personalization, room participation and artifact/tool authorization remain at
their owning product/backend/Matrix boundaries; the frontend consumes explicit
identities and contracts rather than inventing them.

## Member workspace preview

[I-000012](situation/invariants/I-000012-shared-member-workspaces.md) is the
additional critical workspace/composition boundary: the Element-derived member
application owns the full app experience, not only Chat. The selected dedicated
app subdomain is an architectural boundary; no real hostname, deployment or
cookie/redirect policy is configured by this decision. Astro retains designated
public-page generation within the coordinated frontend workspace/delivery.

The proposed Chat/Studio/Profile/Settings navigation retains Podcasts, Episodes
and Analytics in Studio, own creator-profile editing and the creators directory.
Full workspaces and appropriate conversation contexts present shared domain
components and view contracts, not parallel interfaces or design systems.
Native chat and manual product work remain independently usable. Supported
module APIs are the first integration route; any unexposed host requirement
needs an explicit qualified extension rather than a predetermined core patch.

[P-000008](situation/promises/P-000008-member-workspace-preview.md) is a
hypothesis judged by the designed, manual
[O-000008](situation/oracles/O-000008-member-workspace-preview.md), grouped by
draft [PLAN-000003](situation/plans/draft/PLAN-000003-member-workspace-preview.md).
The [delivery reference](situation/references/D-000019/member-workspace-preview-plan.md)
retains the bounded preview and shared-scenario approach. Simulated product
outcomes stay inside identified preview/test entrypoints; neither a preview
nor this planning revision qualifies actual backend or assistant behavior.
Existing production hypotheses P-000009 through P-000014, service authority and
unselected policies remain separate. The original submitted donor-coverage
publication concern is retained in
[G-000006](situation/gaps/G-000006-submitted-donor-publication-review.md).

## Navigation qualification

[C-000003](situation/candidates/C-000003-qualify-member-navigation.md) is
qualifying the specific navigation alternatives: a module-owned header using
the supported sibling mounting pattern, native SpacePanel workspace entries as
a different UX, and a narrow host extension only for a demonstrated missing
capability. The module header remains the preferred first investigation rather
than selected production navigation.

The maintainer authorized a bounded local Gate 1 on 2026-09-15.
[P-000015](situation/promises/P-000015-module-navigation-mount-gate.md) and
[O-000015](situation/oracles/O-000015-module-navigation-mount-gate.md)
predeclare one module-owned header, one diagnostic location, native Chat/home,
refresh/history, Poda Light/Dark and desktop/narrow observations. Active
[PLAN-000004](situation/plans/active/PLAN-000004-qualify-member-navigation.md)
groups that work and feeds PLAN-000003's existing host-qualification
prerequisite.

The implementation retained by [P-000015](situation/promises/P-000015-module-navigation-mount-gate.md)
remains `implemented`, and its first [W-000002](situation/witnesses/P-000015/W-000002-module-navigation-gate-incomplete.md)
observation remains `INVALID`. The decision-complete
[P-000016](situation/promises/P-000016-decision-complete-module-navigation-gate.md)
is separately `assured` by [W-000003](situation/witnesses/P-000016/W-000003-decision-complete-module-navigation-gate-pass.md)
at exact head `53c290b3c62f01ae95ca74893ce3c944a1b472b7`.
[O-000016](situation/oracles/O-000016-decision-complete-module-navigation-gate.md)
records Back and Forward destinations plus active controls and direct
Home → Diagnostic → Chat → Diagnostic interaction in every Poda
theme/viewport case. [G-000011](situation/gaps/G-000011-navigation-gate-assurance-coverage.md)
remains open: P-000016's distinct Scope and W-000003 do not apply O-000015 to
P-000015 or complete W-000002's invalid observation.

[D-000020](situation/decisions/D-000020-consume-hash-suppression-once.md)
subsequently promoted the generic one-event hash-suppression correction in
[C-000004](situation/candidates/C-000004-consume-hash-suppression-once.md).
[P-000017](situation/promises/P-000017-seamless-module-native-return.md) is
assured by [W-000004](situation/witnesses/P-000017/W-000004-same-document-module-native-return-pass.md)
at exact head `5f5aebcda2c829a6ff7489a4e05fd454352c17e5`. Chrome 150 retained one
document through Home → Diagnostic → Home → Back → Forward, with matching
content/current controls and Matrix user. The module no longer owns reload
query markers or back-forward-cache handling, no public Module API changed, and
[G-000008](situation/gaps/G-000008-module-native-screen-transition.md) is closed
at that declared boundary. [C-000005](situation/candidates/C-000005-export-native-screen-navigation.md)
retains a public native-navigation API only as an unselected fallback.

This remains narrow manual assurance of the generated local module gate, not
the reusable fork assurance route absent in
[G-000001](situation/gaps/G-000001-fork-assurance-route.md). W-000001 retains
the unavailable pinned Playwright browser without treating it as product
failure; [G-000010](situation/gaps/G-000010-module-stylesheet-host-selector-scope.md)
retains the unresolved production stylesheet ownership boundary. C-000003
remains qualifying, production navigation is not selected, and P-000008 and
PLAN-000003 remain unchanged.

## Next product slice

[D-000021](situation/decisions/D-000021-poda-creation-flows.md) selects
podcast creation, episode creation, Studio collection completion, and a mock
Analytics page as the next module slice over one in-memory adapter, with a
donor-route placement map. Active
[PLAN-000006](situation/plans/active/PLAN-000006-poda-creation-flows.md)
groups [P-000018](situation/promises/P-000018-poda-creation-flows.md), now
`implementing`. At
`4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/data/mockAdapter.js`,
`4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/studio/studioList.js`,
and `4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/studio/podcastCreate.js`,
the adapter, Podcast collection, and podcast creation form are present; episode
flows and Analytics remain active work. The slice remains mock-only.

## Closure state

- Current run: `20260921T084538Z-9a1c0880b27a002b5b9350e81c94d520aac51345` (open)
- Last completed closure: run `20260917T145211Z-4065222c219a646d35031d0295df025b0d482cbe`, opened at `68a9e5df760dd82292cf19fb38880504f40b9be5`
- Transcript: `https://github.com/cleverunicornz/infrastructure/actions/runs/35236134892`

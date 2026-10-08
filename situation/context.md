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
the adapter, Podcast collection, and podcast creation form are present. At
`b57c31634d01170833c277b4e08d03623b094d0f:modules/poda-profile-spike/src/studio/episodeCreate.js`,
`b57c31634d01170833c277b4e08d03623b094d0f:modules/poda-profile-spike/src/studio/episodeList.js`,
`b57c31634d01170833c277b4e08d03623b094d0f:modules/poda-profile-spike/src/shared/podcastFullView.js`,
and `b57c31634d01170833c277b4e08d03623b094d0f:modules/poda-profile-spike/src/index.js`,
validated episode creation, collection/filter, detail, and routes are present;
the changed `b57c31634d01170833c277b4e08d03623b094d0f:modules/poda-profile-spike/src/data/mockAdapter.test.js`
covers draft validation. Analytics and complete Oracle evidence remain active
work. The slice remains mock-only.

[D-000022](situation/decisions/D-000022-pcc-native-design-transfer.md) selected
the maintainer's PCC native app as the design authority for these surfaces.
Active [PLAN-000007](situation/plans/active/PLAN-000007-pcc-native-module-design.md)
groups [P-000019](situation/promises/P-000019-pcc-native-module-design.md),
now `implemented`: the module's Profile, Studio collections, and creation
wizards use one shared theme module, with the widget applying host theme input
inside its iframe. The transfer adds D-000022's selected three-category cap
while retaining the mock/session-only boundary; donor autosave claims, the AI
Polish card, and Podcasting 2.0 advanced creation groups remain excluded.
The corrected source restores episode detail-field and scheduled-time
projection, Profile Edit submitted-field projection, and the widget's initial
and later host-theme path.
[W-000001](situation/witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
is `INVALID` and does not assure P-000019: its retained browser observation
does not decide P1's widget render in both Poda themes, P3's Profile Edit
submission projection, or P4's episode detail-field and scheduled-time
projection on the corrected exact head. The reviewed-head observations remain
in [G-000017](situation/gaps/G-000017-widget-host-theme-propagation.md),
[G-000020](situation/gaps/G-000020-profile-edit-field-projection.md), and
[G-000015](situation/gaps/G-000015-episode-create-field-projection.md).
[G-000014](situation/gaps/G-000014-module-package-lint-debt.md) retains
separate module lint debt.

## Chat controls

[D-000023](situation/decisions/D-000023-poda-chat-controls.md) records the
maintainer's chat-control selections of 2026-10-07: calls and voice messages
only in invite-only rooms and direct messages (voice messages on the composer
bar), admin-only polls in rooms created from Poda, stickers and location off,
View source behind developer mode, and Threads from the room header only.
[P-000020](situation/promises/P-000020-poda-chat-controls.md) is assured by
[W-000005](situation/witnesses/P-000020/W-000005-chat-controls-local-pass.md)
under [O-000020](situation/oracles/O-000020-poda-chat-controls.md), grouped by
active [PLAN-000008](situation/plans/active/PLAN-000008-poda-chat-controls.md).
Existing and provisioned rooms keep their poll power level
([G-000027](situation/gaps/G-000027-existing-room-poll-power-levels.md)); the
Diagnostic workspace link awaits supersession of assured navigation records
([G-000028](situation/gaps/G-000028-diagnostic-link-in-member-navigation.md)).
The walk-through also surfaced module-flow concerns G-000021 through G-000026.

## Profile side panel

[D-000024](situation/decisions/D-000024-poda-profile-side-panel.md) adds a
deliberate host extension, the alpha module API method
`extras.setUserProfilePanel`, so the user info panel offers **View profile** and
the right panel shows the shared profile view; Extensions lead the room info
panel; the profile widget (type `io.poda.profile`) opens only in the right
panel, from Extensions, with no room header button. [P-000021](situation/promises/P-000021-poda-profile-side-panel.md)
is assured by [W-000006](situation/witnesses/P-000021/W-000006-profile-side-panel-local-pass.md)
under [O-000021](situation/oracles/O-000021-poda-profile-side-panel.md), grouped
by active [PLAN-000009](situation/plans/active/PLAN-000009-poda-profile-side-panel.md).
G-000029 through G-000032 record header tooltip contrast, the widget approval
click, a widget handshake warning and the shared "Profile" title.

## Creation-flow fixes

[D-000025](situation/decisions/D-000025-creation-flow-fixes.md) fixes the
walk-through's creation-flow defects: truthful draft and guidance copy, inline
errors that clear on edit, Back / New episode / Open podcast on detail pages,
required seasons and episode labels without "?", and lighter placeholders.
[P-000022](situation/promises/P-000022-creation-flow-fixes.md) is assured by
[W-000007](situation/witnesses/P-000022/W-000007-creation-flow-fixes-local-pass.md)
under [O-000022](situation/oracles/O-000022-creation-flow-fixes.md) (active
[PLAN-000010](situation/plans/active/PLAN-000010-creation-flow-fixes.md));
G-000021, G-000022, G-000023 and G-000025 are closed.
The form error banner stayed visible after its last error was corrected
([G-000033](situation/gaps/G-000033-error-banner-shown-when-hidden.md),
failing [W-000010](situation/witnesses/P-000022/W-000010-error-banner-visible-fail.md));
after the fix [W-000011](situation/witnesses/P-000022/W-000011-creation-flow-fixes-rerun-pass.md)
passes O-000022 again.

## Diagnostic link removal

[D-000026](situation/decisions/D-000026-remove-diagnostic-navigation.md)
removes the Diagnostic workspace link and location from the member header,
which now offers Chat, Profile and Studio. The navigation behavior assured by
P-000016 and P-000017 is re-stated against Studio as
[P-000023](situation/promises/P-000023-member-navigation-header.md), assured
by [W-000008](situation/witnesses/P-000023/W-000008-member-navigation-header-local-pass.md)
under [O-000023](situation/oracles/O-000023-member-navigation-header.md)
(active [PLAN-000011](situation/plans/active/PLAN-000011-remove-diagnostic-navigation.md));
P-000015, P-000016 and P-000017 are superseded and G-000028 is closed.

## Admin-only polls

[D-000027](situation/decisions/D-000027-admin-only-polls-everywhere.md) offers
the poll control only to room admins in every room, including rooms whose power
levels let members start polls; room power levels are unchanged.
[P-000024](situation/promises/P-000024-poda-chat-controls-admin-polls.md)
supersedes P-000020 and is assured by
[W-000009](situation/witnesses/P-000024/W-000009-chat-controls-admin-polls-local-pass.md)
under [O-000024](situation/oracles/O-000024-poda-chat-controls-admin-polls.md)
(active [PLAN-000012](situation/plans/active/PLAN-000012-admin-only-polls.md));
G-000027 is closed.

## Share cards

[D-000028](situation/decisions/D-000028-share-cards.md) adds **Share to chat**
to the composer's upload menu: members post an episode, a podcast or their
profile with a type of post, description and optional link, shown as a
PCC-style card with View profile. Two Poda host extensions,
`extras.openUserProfilePanel` and `extras.sendRoomMessage`, carry it.
[P-000025](situation/promises/P-000025-share-cards.md) is assured by
[W-000012](situation/witnesses/P-000025/W-000012-share-cards-local-pass.md)
under [O-000025](situation/oracles/O-000025-share-cards.md) (active
[PLAN-000013](situation/plans/active/PLAN-000013-share-cards.md)). G-000034
(items cannot be opened yet) and G-000035 (the paperclip trigger) stay open.

## Polish and share entry points

[D-000029](situation/decisions/D-000029-plus-menu-and-polish.md) loads Poda's
own profile widget without the approval prompt and read-only, fixes its
handshake, titles the module card "Creator profile" and hides another member's
empty sections, makes tooltips, message links and the Sections announcement
readable, bases the episode readiness item on the season, and guards Studio
routes against stale renders.
[D-000030](situation/decisions/D-000030-share-entry-points.md) moves share cards
from the composer to a top-bar **Create post** (with a chat picker) and **Share
to chat** on podcast, episode and Profile pages.
[P-000026](situation/promises/P-000026-plus-menu-and-polish.md) and
[P-000027](situation/promises/P-000027-share-cards-create-post.md) (superseding
P-000025) are assured by
[W-000013](situation/witnesses/P-000026/W-000013-plus-menu-and-polish-local-pass.md)
and [W-000014](situation/witnesses/P-000027/W-000014-share-cards-create-post-local-pass.md)
(active [PLAN-000014](situation/plans/active/PLAN-000014-plus-menu-and-polish.md));
G-000019, G-000024, G-000026, G-000029–G-000032 and G-000035 are closed;
G-000036 records a pre-existing failing snapshot; G-000037 records that group calls
await Element Call.

## Closure state

- Current run: none
- Last completed closure: run `20260924T141117Z-f187b0a0342cb1c5172d4b61d21386cbcb604ea6`, opened at `e74b706ee9c1e398dc9d2ecd38f282423c9cf995`
- Transcript: `https://github.com/cleverunicornz/infrastructure/actions/runs/36010600711`

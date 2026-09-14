# Poda tab shell and module pages with mock data

## Status

accepted

## Date

2026-09-14

## Context

The first migration (visual alignment, PR #2 line) delivered Poda-branded
native Element surfaces with chat-only scope under
[I-000002](situation/invariants/I-000002-element-native-capability-boundary.md).
The maintainer now wants the next slice: a Poda tab shell over the Element
client, with Studio and Profile pages carried by the fork, fed strictly by
mock data for now. The shelved comprehensive plan
([D-000002's reference](situation/references/D-000002/poda-element-integration-plan.md))
already records the full product intent; this decision revives only its
navigation shell and page inventory, explicitly not its backend, identity,
publishing, or service scope.

## Evidence

- Maintainer selection: primary tabs are **Chat, Studio, Profile, Settings**;
  Studio contains **Podcasts, Episodes, Analytics**; data is strictly mocked.
- Element's module system is present in this fork:
  `NavigationApi.registerLocationRenderer(path, renderer)` (alpha) renders a
  module page for an exact screen path, consumed by
  `apps/web/src/components/structures/MatrixChat.tsx` (`page_type`) and
  `LoggedInView.tsx`. Modules install as optional dependencies listed in
  `apps/web/build_config.yaml`; `modules/banner/` demonstrates the in-repo
  module layout (package, `Module` class with `moduleApiVersion`, `load()`
  lifecycle, CSS via adoptedStyleSheets, i18n registration).
- A module-rendered page currently keeps the chat chrome (SpacePanel and
  LeftPanel) around it; suppressing that chrome for Poda pages requires a
  small fork edit in `LoggedInView`, which is also where a persistent tab bar
  must live.
- The renderer map matches exact screen strings only and renderers receive no
  arguments, so deep-linking inside a Poda page must parse the hash itself.
- The Podcasting 2.0 field authority is the revision pinned by the shelved
  plan: <https://github.com/Podcastindex-org/podcast-namespace/blob/c0ff5caa3729610362ee93f8034454fa41f3c493/docs/1.0.md>.

## Decision

Build a Poda tab shell and module pages as the next slice:

1. **Fork tab bar** — a persistent top navigation rendered above the logged-in
   shell with four tabs: **Chat** (the complete, unmodified native Element
   chat experience), **Studio**, **Profile**, **Settings** (Element's native
   settings screens). When a non-Chat tab is active, the chat chrome (space
   rail, room list) is suppressed; Chat restores it unchanged.
2. **Poda module** — an in-repo module package (`modules/poda/`, modelled on
   `modules/banner/`) registering exact-path renderers for `#/studio`,
   `#/profile`, and `#/creators`. Studio carries Podcasts, Episodes, and
   Analytics sub-views; Profile carries the creator's own profile view/edit
   and a creators directory.
3. **Typed mock-data adapter** — all page data flows through a
   `PodaDataAdapter` TypeScript interface implemented by an in-memory mock
   seeded from typed fixtures. Fixtures model a defined Podcasting 2.0
   channel/item field subset and the donor's creator-profile fields. No
   network, no Matrix custom events, no persistence across reloads.
4. **Scope expansion** — this slice deliberately adds routes, pages, and
   in-session form editing beyond I-000002's chat-only boundary. Chat behavior
   remains native; everything else in this slice is presentation over mock
   data. The shelved plan's service, identity, publishing, SEO, feed
   serialization, real analytics, and multi-identity scopes remain out.

## Why

The tab shell is the smallest structural step that makes Poda feel like one
product while keeping Element's chat intact. Module renderers keep new pages
out of upstream files, containing the upstream merge surface to the tab bar
and one `LoggedInView` conditional. A typed mock adapter lets Studio and
Profile reach visual/UX parity now while giving a future real API a single
implementation target. Mock-only data avoids inventing persistence or backend
contracts before the service boundary discussion (still pending with Dan) is
settled.

## Rejected alternatives

- Reviving the full shelved integration plan (backend, coordinator,
  publishing): rejected as far beyond this slice; only its shell and field
  models are reused.
- Building pages as direct fork routes inside `apps/web/src`: rejected; module
  pages keep upstream merge surface minimal and are the mechanism Element
  itself provides.
- Persisting mock edits (localStorage or Matrix account data): rejected; that
  is a data model decision masquerading as a demo convenience. Reload resets
  edits, and the demo states that plainly.
- Widgets/mini-apps for these pages: rejected; they are first-party product
  surfaces, not sandboxed room embeds.
- Subspace/deep route registration per entity: rejected; renderers are
  exact-match, so pages parse their own sub-state from the hash.

## Consequences

- [P-000008](situation/promises/P-000008-poda-tab-shell.md) states the
  falsifiable behavior, judged by
  [O-000008](situation/oracles/O-000008-poda-tab-shell.md), under
  [PLAN-000003](situation/plans/active/PLAN-000003-poda-tab-shell.md).
- The plan document is
  [situation/references/D-000013/poda-tab-shell-plan.md](situation/references/D-000013/poda-tab-shell-plan.md).
- I-000002 continues to govern everything outside the enumerated tab-bar and
  module-page surfaces; Chat must remain demonstrably native.
- Upstream syncs now carry a small, named merge surface: `PodaTabBar` (new
  file), one conditional branch in `LoggedInView.tsx`, and
  `build_config.yaml`.

## Revisit when

A real data API is authorized, the mock adapter needs persistence, the module
API's renderer mechanism changes upstream, or the tab set itself changes.

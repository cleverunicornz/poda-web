# Poda tab shell and module pages — implementation plan (mock-data slice)

## Record status

- Recorded: 2026-09-14
- Product: Poda Web
- Delivery state: planned, not implemented
- Owning decision: [D-000013](situation/decisions/D-000013-poda-tab-shell-scope.md)
- Revives (shell and field models only):
  [D-000002's comprehensive plan](situation/references/D-000002/poda-element-integration-plan.md)

Statements labelled **USER CHOICE** are selections made by the maintainer.
**PLANNING DEFAULT** marks choices made to keep the plan executable that were
not presented as settled preferences. **DISCOVERED CONSTRAINT** marks facts
verified against this repository, not preferences.

## Goal and outcome

Poda Web gains a persistent top tab bar with four primary tabs — **Chat**,
**Studio**, **Profile**, **Settings** — over the existing Element client:

- Chat is the complete, unmodified native Element/Matrix experience (spaces,
  rooms, DMs, composer, calls, encryption, search, notifications).
- Studio is a Poda module page with **Podcasts**, **Episodes**, and
  **Analytics** sub-views over mock Podcasting 2.0 data.
- Profile is a Poda module page with the creator's own profile (view/edit)
  and a creators directory over mock data.
- Settings routes to Element's native settings screens.

Success means a signed-in user can switch tabs freely; Studio and Profile
render fully in Poda Light and Poda Dark with working in-session edits, while
Chat behaves exactly as upstream Element.

## Choices and defaults

| Choice                                                                                    | Status                                     |
| ----------------------------------------------------------------------------------------- | ------------------------------------------ |
| Four primary tabs: Chat / Studio / Profile / Settings                                     | USER CHOICE                                |
| Studio contains Podcasts, Episodes, Analytics                                             | USER CHOICE                                |
| All Studio/Profile data strictly mocked                                                   | USER CHOICE                                |
| Module pages (not fork routes, not widgets) carry Studio/Profile/Creators                 | USER CHOICE                                |
| Chat tab is native Element, unmodified beyond the existing Poda skin                      | DISCOVERED CONSTRAINT (standing direction) |
| Settings tab routes to Element's native settings, no Poda rebuild                         | PLANNING DEFAULT                           |
| Creators directory lives inside the Profile tab (`#/creators`), keeping four primary tabs | PLANNING DEFAULT                           |
| Chat tab lands on the last active chat screen, else `#/home`                              | PLANNING DEFAULT                           |
| Module pages suppress chat chrome (space rail, room list); tab bar persists on every tab  | PLANNING DEFAULT                           |
| In-session edits persist only in memory; reload resets; the UI states this                | PLANNING DEFAULT                           |
| Podcasting 2.0 support limited to the field subset below, display + edit                  | PLANNING DEFAULT                           |
| Analytics are mock charts (CSS/SVG), no chart library dependency                          | PLANNING DEFAULT                           |

## Discovered constraints

- **Module mechanism (verified in this fork).** Modules are optional
  dependencies listed in `apps/web/build_config.yaml`, installed by
  `module_system/scripts/install.ts`, and loaded through
  `@element-hq/element-web-module-api`. A module is a class implementing
  `Module` with `moduleApiVersion` and `load()`, modelled in-repo by
  `modules/banner/`. Pages register via
  `api.navigation.registerLocationRenderer(path, renderer)` (marked alpha).
- **Exact-match routing.** `MatrixChat` looks up `locationRenderers` by the
  whole screen string and renderers take no arguments, so `#/studio` renders;
  `#/studio/podcasts/abc` does not match. Pages parse sub-state from the hash
  themselves (e.g. `#/studio?podcast=abc`) — the spike must confirm the query
  survives Element's hash parsing.
- **Default chrome.** A module-rendered page keeps the SpacePanel and
  LeftPanel beside it (`LoggedInView` module branch). The tab shell must
  suppress those for Poda pages.
- **Settings are native screens** with their own page types and `#/settings`
  routes; no module work needed.
- **Module CSS** enters via `document.adoptedStyleSheets` (banner pattern) or
  webpack import; Poda module styles scope under a module marker class and
  consume Compound tokens, so both Poda themes apply automatically.
- **Jest harness is unavailable in this environment** (pre-existing ESM
  transform failure on the base commit). New tests target Vitest; Jest-only
  suites are validated by CI.

## Architecture

```text
LoggedInView (fork edit)
├── <PodaTabBar active={page_type}/>            ← new fork component
└── content
    ├── Chat tab: native resizable layout       ← unchanged
    │     (SpacePanel + LeftPanel + RoomView/home)
    ├── Settings tab: native settings screens   ← unchanged content
    └── Studio/Profile/Creators: module page    ← SpacePanel/LeftPanel suppressed

modules/poda/ (@poda/element-module-poda)
├── src/index.tsx            Module class, load(): registers renderers, i18n, CSS
├── src/data/contract.ts     PodaDataAdapter interface + Podcasting 2.0 types
├── src/data/mockAdapter.ts  In-memory implementation
├── src/data/fixtures.ts     Typed seed data
├── src/studio/              StudioPage + Podcasts/Episodes/Analytics views
├── src/profile/             ProfilePage (own profile) + CreatorsPage
└── src/components/          Shared cards, fields, sub-nav
```

### Tab bar (fork edit, contained)

- New file `apps/web/src/poda/PodaTabBar.tsx`: Poda mark, four tabs, active
  state from `page_type`; tabs navigate via `showScreen`-equivalent dispatch
  (`studio`, `profile`, `settings`, and `home`/last-chat for Chat).
- `LoggedInView.tsx`: render the tab bar above `content`; when `page_type` is
  a Poda module page or settings, render the page without SpacePanel/LeftPanel;
  otherwise render the existing layout untouched.
- New stylesheet `apps/web/res/css/structures/_PodaTabBar.pcss`, scoped
  `body.mx_PodaTheme`, following the existing Poda skin conventions.

Upstream merge surface is exactly: one conditional branch in
`LoggedInView.tsx`, plus new files that cannot conflict.

### Module pages and routes

| Route                     | Page         | Content                                 |
| ------------------------- | ------------ | --------------------------------------- |
| `#/studio`                | StudioPage   | Sub-nav Podcasts / Episodes / Analytics |
| `#/studio?podcast=<id>`   | StudioPage   | Podcast detail/editor                   |
| `#/studio?episode=<id>`   | StudioPage   | Episode detail/editor                   |
| `#/profile`               | ProfilePage  | Own creator profile view/edit           |
| `#/creators`              | CreatorsPage | Directory of mock creators              |
| `#/creators?creator=<id>` | CreatorsPage | Creator profile detail                  |
| `#/settings`              | native       | Element settings                        |
| `#/home`, `#/room/...`    | native       | Chat surfaces                           |

### Data contract

```ts
interface PodaDataAdapter {
    listPodcasts(): Promise<PodcastSummary[]>;
    getPodcast(id: string): Promise<Podcast>;
    savePodcast(draft: PodcastDraft): Promise<Podcast>;
    listEpisodes(podcastId?: string): Promise<EpisodeSummary[]>;
    getEpisode(id: string): Promise<Episode>;
    saveEpisode(draft: EpisodeDraft): Promise<Episode>;
    listCreators(): Promise<CreatorSummary[]>;
    getCreator(id: string): Promise<CreatorProfile>;
    getMyProfile(): Promise<CreatorProfile>;
    saveMyProfile(draft: CreatorProfileDraft): Promise<CreatorProfile>;
    getStudioAnalytics(): Promise<StudioAnalytics>;
}
```

`MockPodaDataAdapter` is the only implementation in this slice: in-memory,
seeded from typed fixtures, no network, no Matrix events, no storage. A future
HTTP adapter implements the same interface without page changes.

### Podcasting 2.0 field subset

Pinned to the shelved plan's namespace revision
(`podcast-namespace@c0ff5caa`, docs/1.0). This slice displays and edits:

- **Channel**: title, link, description, language, author, owner name/email,
  explicit, image, Apple-taxonomy categories, type (episodic/serial), guid
  (read-only), locked, funding {url, message}, medium (podcast), person[],
  copyright.
- **Item**: title, description, enclosure {url, length, type}, guid, pubDate,
  duration, explicit, image, season, episode, episodeType, person[],
  transcript {url, type} reference, chapters {url, type} reference, soundbite
  {start, duration}.
- **Value block**: display-only (no editing) with a "requires a real wallet
  backend" note.

Explicitly excluded: feed XML serialization, publishing, GUID registry,
transcript generation, live items, value streaming, podping, remote items,
podroll. Unknown-namespace preservation matters only once real feeds exist.

### Creator profile model (from the donor)

displayName, avatar, banner, headline, tagline, about, topics[], socialLinks
(website, linkedin, twitter/X, youtube, instagram, tiktok, calendly),
expertiseCards[], customFields[], slug. Own profile is editable; directory
profiles are read-only views.

### Fixtures

Three mock podcasts (technology interview, comedy weekly, true-crime
narrative), nine episodes across them, four creator profiles (one marked as
the signed-in creator), and 90-day mock analytics series (plays, subscribers)
per podcast. Every fixture passes the contract's validation.

## Out of scope

Backend/API, Matrix custom events or state, authentication changes, identity
switching, feed serialization/publishing, real analytics, public/SEO pages,
Podcasting 2.0 beyond the listed subset, the pending Support DM decision, and
any change to Chat behavior.

## Delivery sequence

1. **Spike** — throwaway module registering `#/poda-spike`; verify module
   loading from `modules/`, exact-path rendering, hash-query survival, and the
   chrome-suppression conditional. No tests; discard.
2. **Module scaffold** — `modules/poda/` package (banner-modelled), data
   contract, mock adapter, fixtures, contract tests.
3. **Tab bar** — `PodaTabBar` + `LoggedInView` conditional + stylesheet; Chat
   regression check (native layout untouched when Chat is active).
4. **Studio pages** — list/detail/edit for podcasts and episodes; analytics
   mock charts.
5. **Profile pages** — own profile view/edit; creators directory + detail.
6. **Polish** — Poda Light/Dark verification of every page; narrow widths.
7. **Records + PR** — witness evidence on the exact head; draft PR stacked on
   the visual-alignment line.

## Test strategy

- Vitest contract tests: mock adapter implements `PodaDataAdapter`; fixtures
  validate (required Podcasting 2.0 fields, Apple category membership, URL and
  duration shapes).
- Vitest component tests: tab switching state, studio sub-nav, form edit
  round-trip through the adapter, creator directory rendering.
- Existing suites must stay green (Chat untouched); the production build and
  `poda:check` gate must pass.
- Browser verification: every tab in Poda Light and Poda Dark, desktop and
  narrow, signed into the demo homeserver.

## Acceptance criteria

1. The tab bar is visible and correct on all four tabs; Chat shows the full
   native Element layout with no behavioral change.
2. Studio renders Podcasts, Episodes, and Analytics from fixtures; detail
   editors perform in-session round-trip edits.
3. Profile renders the own-profile editor and the creators directory with
   working detail navigation.
4. Settings opens Element's native settings.
5. All Poda pages render correctly in both Poda themes and at narrow width;
   unknown screens still fall back to home; Matrix deep links are unaffected.
6. Production build, Vitest suites, and the Poda branding gate pass on the
   exact head.

## Risks

- `registerLocationRenderer` is alpha API: an upstream change may rename or
  re-shape it; the module boundary localizes that cost.
- `LoggedInView` is upstream-owned: the conditional must stay minimal to keep
  sync merges trivial.
- Mock-only data will read as "fake" if the UI pretends persistence; the
  editors carry a visible "session-only mock data" note.
- The settings tab may later need Poda-specific settings; not this slice.

## Provenance

- Shelved comprehensive plan:
  `situation/references/D-000002/poda-element-integration-plan.md` (branch
  `internal/poda-element-integration-plan`) — shell and field-model source.
- Donor profile/editor field evidence:
  `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/native/src/lib/structured-chat/fixtures.ts`
  (private; requires repository access).
- Namespace authority:
  <https://github.com/Podcastindex-org/podcast-namespace/blob/c0ff5caa3729610362ee93f8034454fa41f3c493/docs/1.0.md>
- Module mechanism evidence: `packages/module-api/src/api/navigation.ts`,
  `apps/web/src/components/structures/LoggedInView.tsx`,
  `apps/web/src/components/structures/MatrixChat.tsx`, `modules/banner/`.

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
| All donor fields (visible and hidden) carried in the typed model, tiered E/D/H below      | USER CHOICE                                |
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

### Donor field inventory (visible and hidden)

The typed model carries the donor's complete profile, podcast, and episode
inventory, pinned to the PCC donor types
(`Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native/src/lib/types/index.ts`,
private; requires repository access). Every field is assigned a tier:

- **E — editable this slice**: rendered in forms; writes to the mock adapter.
- **D — display-only this slice**: rendered read-only (badges, detail blocks).
- **H — model-only / hidden**: present in types and fixtures so the contract
  is complete for a future API, but not surfaced in this slice.

**Creator profile** (donor `User`):

| Tier | Fields                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E    | displayName, avatarUrl, bannerUrl, headline, tagline, bio, aboutShort, topics[], slug, bookingUrl, socialLinks {website, linkedin, twitter/X, youtube, instagram, tiktok, calendly}, expertiseCards[] {id, title, description, icon, order}, customFields[] {name, value}                                                                                                                                                                 |
| D    | isPublic, profileStatus (draft/published) as badge, sectionVisibility {public/members/collaborators/private} as badges, introVideoUrl, mediaKit[] {id, name, url, type: headshot/photo/audio/pdf/document/logo/other, size, filename, mimeType}, testimonials[] {id, name, role, quote, avatarUrl, order}, featuredAppearances[] {id, podcastName, episodeTitle, url, date, imageUrl, order, displayClass}, appearanceCount, bestFitFor[] |
| H    | id, email (own record only), createdAt, updatedAt                                                                                                                                                                                                                                                                                                                                                                                         |

**Podcast** (donor `Podcast` with nested `PodcastChannel`):

| Tier | Fields                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E    | title, tagline, description, slug, coverArtUrl, categories[] (Apple taxonomy), language, explicit, author, ownerEmail, showType (episodic/serial), websiteUrl, trailerUrl, bookingUrl, socialLinks (same seven); channel: persons[] {name, role, group, href, image}, locked {owner, locked}, license {identifierOrText, url}, funding[] {title, url}, medium, copyright                                                                                                                                                                                                                                                                                                      |
| D    | status (draft/published/active/archived) as badge, isPublic as badge, idealGuest {description, topics[], qualities[]}, guestRequirements {equipment[], preparation, scheduling, other[]}, testimonials[], mediaKit[], audienceStats {monthlyListeners, totalDownloads, avgEpisodeDownloads, topCountries[], demographics} (feeds mock Analytics), channel: guid, updateFrequency {text, complete, dtstart, rrule}, value[] (with "requires a real wallet backend" note), socialInteracts[], txt[], chat, trailers[] {title, url, pubdate, lengthBytes, mimeType, season}, locations[] {name, geo, osm, country, rel}, publisher {remoteItem}, license display, customFields[] |
| H    | id, orgId, rssFeedUrl, sectionVisibility, createdAt, updatedAt; internals: currentness {canonicalAt, activityFreshnessAt, internalizedAt, externalizedAt}, provenance {mode: internal/external/unknown, kind, sourceEntryId, podcastGuid}, feedDiagnostics {rssFeedStatus, canonicalValidation {status, warnings[], errors[]}}; channel: blocks[], podping, liveItems[], remoteItems[], podroll                                                                                                                                                                                                                                                                               |

**Episode** (donor `Episode` with `EpisodeItem`/`EpisodeMedia`):

| Tier | Fields                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| E    | title, description, showNotesHtml, slug, episodeNumber, seasonNumber, duration                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| D    | status (draft/scheduled/published/archived) as badge, publishedAt, scheduledAt, item: persons[], transcripts[] {url, mimeType, language, rel}, funding[], soundbites[] {startTime, duration, title}, locations[], chapters {url, mimeType, language, rel}, license; media: primaryEnclosure and alternateEnclosures {url, mimeType, lengthBytes, durationSeconds, title, isDefault, bitrate, height, language, rel, codecs, sources[] {uri, contentType}}; guests[] {guestId, userId, name, email, role, displayClass (platform_mutual / host_added_external_guest / guest_self_attested_external_host / episode_matched / host_verified), partyKind, tagline, appearanceDescription, ctaLabel, ctaUrl, avatarUrl, profileUrl} |
| H    | id, podcastId, createdAt, updatedAt; internals: currentness, provenance {mode, kind, sourceGuid, sourceEntryId, sourceEpisodeId}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Namespace authority for the Podcasting 2.0 shapes remains the shelved plan's
pinned revision (`podcast-namespace@c0ff5caa`, docs/1.0). The donor model has
no item-level `image` field, so episodes carry none in this slice either.

Explicitly excluded from the model: feed XML serialization, publishing, GUID
registry, transcript generation, value streaming. Unknown-namespace
preservation matters only once real feeds exist.

### Fixtures

Three mock podcasts (technology interview, comedy weekly, true-crime
narrative), nine episodes across them, four creator profiles (one marked as
the signed-in creator), and 90-day mock analytics series (plays, subscribers)
per podcast. Every fixture passes the contract's validation.

## Out of scope

Backend/API, Matrix custom events or state, authentication changes, identity
switching, feed serialization/publishing, real analytics, public/SEO pages,
the pending Support DM decision, and any change to Chat behavior. Tier-D and
tier-H donor fields are modelled but not surfaced beyond what the inventory
assigns them.

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
- Donor entity field inventory:
  `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native/src/lib/types/index.ts`
  (private; requires repository access) — complete profile/podcast/episode
  shapes, tiered in this plan.
- Namespace authority:
  <https://github.com/Podcastindex-org/podcast-namespace/blob/c0ff5caa3729610362ee93f8034454fa41f3c493/docs/1.0.md>
- Module mechanism evidence: `packages/module-api/src/api/navigation.ts`,
  `apps/web/src/components/structures/LoggedInView.tsx`,
  `apps/web/src/components/structures/MatrixChat.tsx`, `modules/banner/`.

# Poda creation flows and Studio completion — implementation plan (mock slice)

## Record status

- Recorded: 2026-09-17
- Product: Poda Web
- Delivery state: implementation in progress. At
  `4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/data/mockAdapter.js`,
  `4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/studio/studioList.js`, and
  `4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/studio/podcastCreate.js`,
  the adapter, Podcast collection, and podcast creation form are present. At
  `b57c31634d01170833c277b4e08d03623b094d0f:modules/poda-profile-spike/src/studio/episodeCreate.js`,
  `b57c31634d01170833c277b4e08d03623b094d0f:modules/poda-profile-spike/src/studio/episodeList.js`, and
  `b57c31634d01170833c277b4e08d03623b094d0f:modules/poda-profile-spike/src/index.js`, the
  Episode collection, form, and routes are present; Analytics and completion evidence remain pending.
- Owning decision: [D-000021](situation/decisions/D-000021-poda-creation-flows.md)

Statements labelled **USER CHOICE** are selections made by the maintainer.
**PLANNING DEFAULT** marks choices made to keep the plan executable that were
not presented as settled preferences. **DISCOVERED CONSTRAINT** marks facts
verified against this repository or the donor, not preferences.

## Goal and outcome

Extend the spike package into a complete Studio collection experience over one
typed mock adapter:

- **Podcast creation** — a validated form page covering the editable-tier
  podcast fields; a created podcast appears in the Studio Podcasts list and
  its detail view in the same session.
- **Episode creation** — a validated form page covering the editable-tier
  episode fields; a created episode appears in the Episodes list and the
  podcast's detail view in the same session.
- **Studio completion** — Podcasts and Episodes render as real collections
  (list, detail, create) instead of the spike's single fixture; a mock
  Analytics page renders the fixture audience stats and per-episode series.

Success means a signed-in user can create a podcast, create episodes for it,
browse the collections, and see analytics — all in-session, all in both Poda
themes, with Chat unchanged.

## Choices and defaults

| Choice                                                                                         | Status           |
| ---------------------------------------------------------------------------------------------- | ---------------- |
| Podcast creation and episode creation are the next slice                                       | USER CHOICE      |
| Keep porting donor interfaces with an explicit fit decision per surface                        | USER CHOICE      |
| Single-page validated forms now; donor wizard (multi-step) recorded for later refinement       | PLANNING DEFAULT |
| All Studio/Profile data flows through one `MockPodaDataAdapter` implementing the plan contract | PLANNING DEFAULT |
| Analytics renders only fixture stats and mock series (CSS/SVG, no chart library)               | PLANNING DEFAULT |
| Creation pages live in the Studio tab at `#/studio` (`?new=podcast` / `?new=episode`)          | PLANNING DEFAULT |
| The spike's fixture podcast becomes collection entry #1, not a special case                    | PLANNING DEFAULT |

## Discovered constraints

- **Module routing** is exact-match: creation pages are sub-states of
  `#/studio` via hash query (`?new=podcast`), verified in the spike.
- **Donor wizard evidence** shows creation is a multi-step validated flow in
  the donor; the slice uses single-page forms over the same editable-tier
  fields and records the wizard as a later UX refinement.
- **The spike package is on main** (`modules/poda-profile-spike/`); new pages
  extend that package and its build (`vite`, `esbuild` widget target).
- **The draft member-workspace plan** ([PLAN-000003](situation/plans/draft/PLAN-000003-member-workspace-preview.md))
  frames product preview through Storybook fixtures; this slice continues the
  in-app spike path the maintainer has been directing. Any Storybook port is
  later work and does not block this slice.
- **No backend, no persistence**: adapter state is in-memory; reload resets.
  The UI states this plainly (as the spike editors do).

## Interface fit map (donor routes → destination)

| Donor route                                       | Destination                                                              | This slice          |
| ------------------------------------------------- | ------------------------------------------------------------------------ | ------------------- |
| `/podcasts`, `/podcasts/[id]`                     | Studio → Podcasts collection + detail (module)                           | upgrade from spike  |
| `/podcasts/new`                                   | Studio → Podcast creation (module)                                       | **build**           |
| `/episodes`, `/episodes/[id]`                     | Studio → Episodes collection + detail (module)                           | **build**           |
| `/episodes/new`                                   | Studio → Episode creation (module)                                       | **build**           |
| `/analytics/[podcastId]` (+ episodes/geo/sources) | Studio → Analytics (module, mock)                                        | **build**           |
| `/profile`                                        | Profile tab → own profile view/edit (module)                             | done in spike       |
| (browse) `/browse/profiles/[userId]`              | Profile tab → Creators directory/detail (module)                         | next slice after    |
| (browse) `/browse/podcasts                        | episodes                                                                 | artifacts/[id]`     | Audience catalog detail — needs listening/public decisions; canonical public pages stay with Astro (D-000015) | not this slice |
| `/dashboard` (listening home)                     | Future Home tab; needs player and audience decision                      | deferred            |
| `/collaborations`                                 | Chat tab — native Matrix DMs/spaces; future support-DM decision (parked) | never a module page |
| `/chat`                                           | Chat tab — native Element                                                | done                |
| `/settings`                                       | Settings tab — native Element screens                                    | done                |
| auth routes, billing, player, live                | Excluded — service boundaries not selected                               | excluded            |

## Page designs (from donor evidence)

### Podcast creation (`#/studio?new=podcast`)

Single validated page with the editable tier: title (required), tagline,
description, slug (required, slug-format validated), cover art URL (mock),
categories (Apple taxonomy multi-select, at least one), language, explicit
toggle, author, owner email (required, email format), showType
(episodic/serial), website/trailer/booking URLs, social links, and channel
persons/locked/license/funding/medium. Section cards follow the donor
editor's grouping (Details, Identity & Rights, Feed extras). Submit creates
into the adapter and navigates to the new podcast's detail. Donor wizard
steps (basics → cover art → categories/settings → identity/rights) are
recorded as the later refinement.

### Episode creation (`#/studio?new=episode`)

Parent podcast selector (required), title (required), description,
showNotesHtml, slug, season/episode numbers, duration, primary enclosure URL
(mock), status draft/scheduled (+ scheduledAt when scheduled). Guests are
display-only in this slice (the donor's appearance-guest selection needs its
own flow; recorded). Submit creates into the adapter and navigates to the
episode detail.

### Studio collections

Podcasts: the spike's donor card list (cover, title, slug, description,
badges, status, updated) over all adapter podcasts, plus the "New podcast"
gradient CTA. Episodes: the same card pattern with podcast name, status,
duration/date, plus "New episode" CTA and a parent-podcast filter chip.

### Analytics (`#/studio?analytics=<podcastId>`)

Stat cards (monthly listeners, total downloads, avg per episode, top
countries) from `audienceStats`, then CSS/SVG bars for a 90-day mock plays
series and a per-episode downloads table (mock). No chart library.

### `MockPodaDataAdapter`

Implements the plan's `PodaDataAdapter` interface (list/get/save podcasts,
list/get/save episodes, list/get creators, own profile get/save, analytics).
In-memory, seeded from the spike fixtures; the spike's fixture podcast and
profile become seed entries. All pages read and write through it.

## Out of scope

Backend/API, persistence, Matrix custom events, feed XML/publishing, real
analytics, wizard-style multi-step UX, appearance-guest selection flows,
listening surfaces (dashboard, browse catalog, player), the pending Support
DM decision, and any change to Chat behavior.

## Delivery sequence

1. `MockPodaDataAdapter` + seed from spike fixtures + contract tests.
2. Studio collections (podcasts + episodes lists reading the adapter).
3. Podcast creation page + validation + create flow.
4. Episode creation page + validation + create flow.
5. Analytics page (mock stats/series/table).
6. Polish: both Poda themes, narrow widths, empty states; records + PR.

## Acceptance criteria

1. Studio Podcasts lists adapter podcasts (seed fixture plus created items);
   "New podcast" opens the creation form; a created podcast validates,
   persists in-session, and opens in detail.
2. Studio Episodes lists adapter episodes with parent context and filter;
   "New episode" validates required fields (parent, title) and creates into
   the adapter; the episode appears in list and detail.
3. Analytics renders the fixture stats and mock series without a chart
   library.
4. Profile, creators, and all spike pages keep working; the widget is
   untouched.
5. All pages render correctly in Poda Light and Poda Dark at desktop and
   narrow widths; Chat behaves natively.
6. `nx build` of the module package, contract tests, and the production
   webapp build pass on the exact head.

## Provenance

- Donor creation evidence:
  `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native/src/lib/components/PodcastCreateWizard.svelte`
  and
  `.../EpisodeCreateWizard.svelte` (private; requires repository access).
- Field inventory: `ff60c63e61:situation/references/D-000013/poda-tab-shell-plan.md`.
- Host verdict:
  [situation/references/G-000005/module-vs-widget-host-discovery.md](situation/references/G-000005/module-vs-widget-host-discovery.md).
- Spike package on main: `modules/poda-profile-spike/`.

# Poda creation flows and Studio completion

## Status

accepted

## Date

2026-09-17

## Context

The spike package (`modules/poda-profile-spike/`, merged via PR #12) proves
module-hosted pages with the complete donor inventory for one podcast, its
episodes, and a profile. The maintainer now directs the next slice: podcast
creation, episode creation, and continued porting of donor interfaces with an
explicit decision about where each fits. The donor carries full creation
wizards (`PodcastCreateWizard`, `EpisodeCreateWizard`) with validation and
Podcasting 2.0 field groups, while the spike covers display and internals only.

## Evidence

- Maintainer selection 2026-09-17: build podcast creation and episode
  creation next; keep porting donor interfaces and decide placement.
- Donor creation evidence:
  `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native/src/lib/components/PodcastCreateWizard.svelte`
  (private; requires repository access) — step sections for basics, cover art,
  categories/settings, identity and rights, with per-field validation.
- `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native/src/lib/components/EpisodeCreateWizard.svelte`
  (private; requires repository access) — readiness steps for basics, audio,
  guests (with appearance-guest selection validation), and notes.
- The complete tiered field inventory (editable/display-only/hidden) recorded
  at `ff60c63e61:situation/references/D-000013/poda-tab-shell-plan.md` and
  retained privately per [D-000019](situation/decisions/D-000019-shared-member-workspaces.md).
- The spike package demonstrates module pages, the shared view layer, and the
  in-session edit pattern; [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md)
  keeps product UI contracts unselected.

## Decision

Build creation flows and complete the Studio collection views as the next
module slice:

1. **Podcast creation** — a module page with the editable-tier field form,
   validation, and autosave pattern, creating into the shared mock adapter so
   new podcasts appear in Studio lists and detail views in-session.
2. **Episode creation** — a module page with the editable-tier episode form
   (including status draft/scheduled and enclosure URL mock), creating into
   the same adapter.
3. **Studio completion** — Podcasts and Episodes become true collection views
   (list → detail → create → list), plus a mock Analytics page fed by the
   fixture audience stats and per-episode series.
4. **`MockPodaDataAdapter`** — all Studio and Profile data flows through one
   typed in-memory adapter implementing the plan's `PodaDataAdapter`
   interface, so a later HTTP adapter replaces it without page changes.
5. **Interface placement** — adopt the donor-route fit map in the plan
   document: Studio/Profile/creators surfaces become module pages; chat,
   collaborations, and settings remain native Element; public canonical pages
   stay with Astro per
   [D-000015](situation/decisions/D-000015-public-and-member-rendering-ownership.md);
   auth, billing, player, and live features remain excluded.

## Why

Creation is the largest missing workflow in the port and the donor supplies a
complete, validated form design to follow. A single typed adapter keeps every
page honest about its data boundary while the service contract remains
unselected (G-000005). The fit map prevents scope creep by deciding each
donor surface's destination up front, consistent with the module-first
verdict in
[situation/references/G-000005/module-vs-widget-host-discovery.md](situation/references/G-000005/module-vs-widget-host-discovery.md).

## Rejected alternatives

- Building creation as Matrix custom events or room state: rejected; mock
  adapter only, no protocol invention.
- Multi-step wizard UI in this slice: rejected as unnecessary for mock
  demonstration; the donor's wizard pattern is recorded for a later
  refinement, single-page validated forms now.
- Filling collections with more static fixtures instead of a typed adapter:
  rejected; the adapter is the seam the future API implements.
- Including the donor dashboard/listening home, browse-directory audience
  pages, or player: deferred; they need listening/public decisions that this
  slice deliberately avoids.

## Consequences

- [P-000018](situation/promises/P-000018-poda-creation-flows.md) states the
  falsifiable behavior, judged by
  [O-000018](situation/oracles/O-000018-poda-creation-flows.md), under
  [PLAN-000006](situation/plans/active/PLAN-000006-poda-creation-flows.md).
- The plan document is
  [situation/references/D-000021/poda-creation-flows-plan.md](situation/references/D-000021/poda-creation-flows-plan.md).
- The spike's single-fixture display pages are upgraded, not replaced: they
  become fixture-backed entries of the same collections.
- This slice remains mock-only; any production adapter or persistence claim
  requires a later decision.

## Revisit when

A real data contract is selected, the wizard-style creation UX is requested,
or the audience-side listening surfaces (dashboard, browse, player) are
green-lit.

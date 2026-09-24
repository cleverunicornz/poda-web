# Transfer the PCC native design language into the Poda Web module surfaces

## Status

accepted

## Date

2026-09-23

## Context

The maintainer's PCC native app (`PCC Local`, a Tauri/Svelte app in the private
yeet-code repository) carries the current intended Poda product design: warm
cream surfaces, orange-tinted borders, guided creation wizards with readiness
rails, and a profile page with stats/share/strength rail. The Poda Web module
(`modules/poda-profile-spike/`) implemented P-000018's creation flows and
profile with an older ad-hoc warm styling that diverged from that design. The
maintainer asked to transfer the native design and the entire creation wizard
look into the web app while staying inside the module architecture.

## Evidence

- Rendered donor surfaces captured from the running local donor instance
  (profile hero, Listen home, Podcasts, six podcast-wizard captures, episode
  wizard, Episodes table).
- Donor design sources at
  `Private: cleverunicornz/yeet-code@1d70c5b377702835a87013b44e7758a0ed269151#applications/pcc/pcc-native/src`
  (private; requires repository access); extraction notes retained at
  [references/D-000022/native-design-transfer-notes.md](../references/D-000022/native-design-transfer-notes.md).
- The donor's `app.css` hex comments are stale against its authoritative HSL
  triples; the triples were ported verbatim.

## Decision

Restyle and restructure the module's Profile, Studio collections, and
podcast/episode creation surfaces to the PCC native design language through
one shared theme module (`src/shared/nativeTheme.js`, CSS custom properties
under `.podaNative` with Element theme-class dark selection). The podcast and
episode creation forms become the donor's guided single-page wizard: hero card
with chips and draft-pulse panel, section cards with guidance and blue info
notes, category checkbox grid capped at three, dashed upload areas, live
readiness rail, and native footer actions. Profile gains the donor's publish
pill, welcome banner, hero with topic chips and visibility segmented control,
and the stats/share/At-a-Glance rail. Data contracts stay unchanged. The
existing module routing seam carries the selected `Save Draft` to collection
and `Create Podcast` to detail outcomes. Existing required/format validation
stays unchanged except for the selected three-category cap; everything remains
session-only through the declared mock adapter.

## Why

The donor native app is the maintainer's selected design authority for these
product surfaces. One shared token/component module keeps the transfer
consistent across the module host and the widget host (I-000006) and avoids a
second convention beside it. Keeping the module's data and routing seams
unchanged, while constraining the validation change to the selected category
cap, confines the transfer to the mock-only scope.

## Rejected alternatives

- Restyle only (keep the old single-column forms): rejected. The maintainer
  asked for the entire wizard structure, including the readiness rail.
- Port donor copy claiming autosave/AI polish: rejected. The module does not
  autosave and has no AI backend; preview surfaces do not claim unimplemented
  behavior (I-000009).
- Adopt Tailwind or Svelte in the module: rejected. The module is deliberately
  framework-free plain JS served as a single runtime bundle; the design was
  translated to concrete CSS.
- Carry the donor's Podcasting 2.0 advanced repeater groups into creation:
  rejected for this slice; they remain visible in detail inventories.

## Consequences

- `modules/poda-profile-spike/` views (index, studio list/create, episode
  list/create, shared profile/podcast views) render the donor design in both
  Poda themes; the room widget inherits it through the shared views.
- Podcast wizard categories are capped at three, matching the donor; the
  validation module rejects more than three.
- `Save Draft` creates a draft and returns to the collection; `Create Podcast`
  opens the created detail view.
- The older ad-hoc warm palette (`#fffdf9`, gradient CTAs, fieldset sections)
  is fully replaced inside the module; nothing else in the app consumes it.
- The donor's i18n copy was not ported; module surfaces keep English inline
  copy matching the donor's en.json wording where the surface exists.

## Revisit when

The donor's design tokens or wizard structure change, the module gains real
backend capabilities (autosave, uploads, AI polish) that make excluded
affordances real, or a product decision retires the spike module in favor of a
production surface.

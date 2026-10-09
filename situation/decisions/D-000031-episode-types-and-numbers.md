# Episode types and when an episode needs a number

## Status

accepted

## Date

2026-10-08

## Context

[G-000019](situation/gaps/G-000019-episode-number-required-label.md) left open
whether the episode number is required; D-000029 kept it optional. Asked, the
maintainer noted that episodes can be unreleased or planned (draft, scheduled,
released, archived) and agreed to tie the number to the status, with episode
types for trailers and bonus episodes, asking whether Apple Podcasts works this
way. Reviewing the wizard's screenshots also showed its fields misaligned.

## Evidence

- Apple, "A Podcaster's Guide to RSS",
  https://help.apple.com/itc/podcasts_connect/en.lproj/itcb54353390.html
  (read 2026-10-08): `itunes:episodeType` is full (default), trailer or bonus;
  episode numbers are optional for episodic shows and mandatory for serial
  shows; trailers and bonus episodes may have no season or episode number
  (show trailer or bonus) or carry them (season or episode trailer/bonus).
- The wizard creates Draft or Scheduled episodes; the list also knows
  Published; there is no Archived status and no edit flow (G-000023, D-000025).
- The maintainer: "yep agreed" to the rule below (2026-10-08).
- Element styles `input[type=text]` with a 9px margin, and the theme's stacked
  field margin applied inside grid rows.

## Decision

- The episode wizard has **Episode type**: Full episode (default), Trailer,
  Bonus.
- A **full** episode needs an episode number (a whole number of 1 or more) once
  it is **scheduled or published**; **drafts**, **trailers** and **bonus**
  episodes may go without. The season stays required for every episode
  (D-000025).
- Labels add the type for trailers and bonus episodes ("S1 · Trailer",
  "S1E3 · Bonus") in Studio and share cards.
- Changing the type or status clears a stale episode-number error.
- Poda form rows space with the grid gap, and Poda inputs set no margin.
- [P-000028](situation/promises/P-000028-episode-types-and-numbers.md), judged
  by [O-000028](situation/oracles/O-000028-episode-types-and-numbers.md).

## Why

The rule is stricter than Apple's (which only requires numbers for serial
shows) and never produces a feed Apple rejects; drafts stay flexible while
their order is unknown.

## Rejected alternatives

- **Apple's exact rule (numbers by show type)**: lets full episodes of episodic
  shows go unnumbered, against the maintainer's numbered-season style.
- **Always require a number**: blocks drafts and show trailers.
- **Leave it optional**: allows scheduled full episodes without a place in the
  season.

## Consequences

- An Edit episode flow, Published and Archived transitions, and real publishing
  remain to be built with the backend.

## Revisit when

Episodes gain an edit flow or a backend that publishes feeds, or shows are
marked serial or episodic.

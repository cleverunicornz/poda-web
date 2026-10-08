# Creation flows tell the truth and lead somewhere

## State

assured

## Promise

In the `modules/poda-profile-spike/` Studio and Profile surfaces:

1. No copy claims that drafts persist in the browser, that click-to-edit exists,
   or shows design notes; the episode draft bar states that nothing is saved
   until the episode is created; the episode hero note matches the selected
   publish state; the podcast readiness status reads "Ready to create" or
   "Some sections still empty"; the profile welcome banner points to Edit
   profile.
2. After a rejected submit, each failing field shows its inline error; editing
   a field clears that field's error and invalid state, and the form banner
   hides once no field error remains.
3. The podcast detail page offers Back to podcasts and New episode, which opens
   the episode wizard with that podcast selected; the episode detail page offers
   Back to episodes and Open podcast.
4. Every new episode has a season: the wizard's season number is required,
   starts at 1 and must be a whole number of 1 or more; episode labels show the
   season and, when set, the episode number (`S1E3`, `S1`), never a `?`.
5. Input placeholders render visibly lighter than entered text.

## Scope

`modules/poda-profile-spike/src/` (both wizards, the shared views, the theme
module, the Studio routes and page host), per
[D-000025](situation/decisions/D-000025-creation-flow-fixes.md). Mock data only.

## Oracle

[O-000022](situation/oracles/O-000022-creation-flow-fixes.md)

## State evidence

- [D-000025](situation/decisions/D-000025-creation-flow-fixes.md) selects the
  behavior.
- `implemented`: `0c85c60c61` and `9e5079fc81` (season rule) on branch
  `internal/creation-flow-fixes`.
- `assured`: [O-000022](situation/oracles/O-000022-creation-flow-fixes.md) passed
  on [W-000007](situation/witnesses/P-000022/W-000007-creation-flow-fixes-local-pass.md)
  at `9e5079fc81`, covering every leg; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Residual

This promise does not assure: editing podcasts or episodes, persistence beyond
the session, the remaining link and tooltip contrast concerns of
[G-000024](situation/gaps/G-000024-placeholder-and-accent-contrast.md), or the
once-observed picker omission in
[G-000026](situation/gaps/G-000026-episode-picker-missing-new-podcast-once.md).

## References

- [D-000025](situation/decisions/D-000025-creation-flow-fixes.md)

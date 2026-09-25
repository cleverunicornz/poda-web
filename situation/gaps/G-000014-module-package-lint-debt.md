# Module package lint debt

## State

open

## Gap

Five `modules/poda-profile-spike/` data/fixture files —
`data/appleCategories.js`, `data/mockAdapter.js`, `data/mockAdapter.test.js`,
`shared/podcastFixtures.js`, and `shared/profileFixtures.js` — do not carry the
copyright/SPDX preamble used by the transfer's view/theme files. In addition,
`saveEpisode`'s object literal in `data/mockAdapter.js` assigns `id` before and
after `...clone(draft)`, leaving the first generated ID overwritten.

## Relevance

Raised during the PCC native design transfer (D-000022). The transfer also
changed four named data/fixture files, so this is not an untouched-file claim.
Adding headers and choosing the intended episode-ID assignment are separately
assigned work; this closure does not change adapter behavior.

## Evidence

- Direct source review at
  `modules/poda-profile-spike/src/data/appleCategories.js:1`,
  `modules/poda-profile-spike/src/data/mockAdapter.js:1`,
  `modules/poda-profile-spike/src/data/mockAdapter.test.js:1`,
  `modules/poda-profile-spike/src/shared/podcastFixtures.js:1`, and
  `modules/poda-profile-spike/src/shared/profileFixtures.js:1` finds no
  copyright/SPDX preamble in the five named files.
- `modules/poda-profile-spike/src/data/mockAdapter.js:137-179` has `id:
  mockGuid("ep")` at object construction and again after `...clone(draft)`.
  JavaScript's later property assignment determines the returned episode ID.

## Impact

Module lint can flag the missing preambles and duplicate property source. The
double ID assignment hides which generated ID was intended for a new episode.

## Resolution

none

## References

- [D-000022](../decisions/D-000022-pcc-native-design-transfer.md)

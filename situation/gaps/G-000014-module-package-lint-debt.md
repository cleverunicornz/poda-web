# Module package lint debt

## State

open

## Gap

Five `modules/poda-profile-spike/` data/fixture files predate the repository's
current oxlint/oxfmt rules: `data/appleCategories.js`, `data/mockAdapter.js`,
`data/mockAdapter.test.js`, `shared/podcastFixtures.js`, and
`shared/profileFixtures.js` lack the required copyright header, and
`mockAdapter.js` carries an `eslint(no-dupe-keys)` error at line 138
(`savePodcast`'s object literal sets `id` twice).

## Relevance

Raised during the PCC native design transfer (D-000022), which brought the
module's nine view/theme files to zero oxlint errors. The remaining six errors
sit in files that transfer did not need to modify; fixing the duplicate key
touches adapter seed behavior and belongs to separately assigned work.

## Evidence

- `oxlint modules/poda-profile-spike/src` reports exactly these 6 errors on the
  `internal/poda-native-design` head; the same run on `origin/internal/main`
  reports 46 errors, of which the design transfer removed the 42 in
  view/theme files and left these 6 untouched.
- The duplicate `id` key is masked by JavaScript's last-wins object semantics,
  so the adapter's current behavior is unaffected.

## Impact

Repo-wide `lint:js`/`lint:fmt` runs flag the module package; the duplication
hides which `id` expression was intended at `mockAdapter.js:138`.

## Resolution

none

## References

- [D-000022](../decisions/D-000022-pcc-native-design-transfer.md)

# Form error banner stays visible after it is hidden

## State

closed

## Gap

The podcast and episode wizards hide their error banner by setting the
`hidden` attribute once no field error is left, but the banner's `.pnError`
rule (`display: flex`) overrides the attribute, so the banner stays on screen
with every field corrected. P-000022 clause 2 promises that it hides.

## Relevance

[P-000022](situation/promises/P-000022-creation-flow-fixes.md) clause 2 and
[O-000022](situation/oracles/O-000022-creation-flow-fixes.md) P2/F2.
[W-000007](situation/witnesses/P-000022/W-000007-creation-flow-fixes-local-pass.md)
recorded "the banner hid once all were corrected"; the observation below
contradicts it for the rendered banner.

## Evidence

- 2026-10-08, while testing share cards: on the podcast wizard, after an empty
  submit and correcting title, slug, owner email and categories, no field error
  remained and the banner's `hidden` property was `true`, yet its computed
  `display` was `flex` and it was visible
  ([screenshot](situation/references/P-000022/error-banner/banner-visible-without-errors.png)).
- `modules/poda-profile-spike/src/shared/nativeTheme.js` defines
  `.pnError { display: flex; … }` with no rule for `[hidden]`.
- Interpretation: W-000007's P2 banner observation most likely read the
  `hidden` property rather than the rendered visibility.

## Impact

Members see "A few fields still need attention…" after fixing every field,
until they submit.

## Resolution

Closed: commit `1e3a268248` adds `.pnError[hidden] { display: none; }` with a
regression test; [W-000010](situation/witnesses/P-000022/W-000010-error-banner-visible-fail.md)
retains the failing observation and
[W-000011](situation/witnesses/P-000022/W-000011-creation-flow-fixes-rerun-pass.md)
passes every O-000022 leg at `1e3a268248`, checking the banner's rendered
visibility.

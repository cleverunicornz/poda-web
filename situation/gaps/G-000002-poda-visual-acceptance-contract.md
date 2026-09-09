# No approved Poda visual acceptance contract

## State

addressing

## Gap

The repository has no approved, reproducible visual contract that maps Poda's
palette and surface treatment onto named Element components, viewports, and
light/dark states.

## Relevance

[P-000006](situation/promises/P-000006-poda-element-visual-alignment.md)
requires a decidable visual target without importing behavior from the donor
mock.

## Evidence

- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/native/src/app.css`
  (private; requires repository access) supplies directional Poda tokens but is
  a standalone mock stylesheet, not an Element acceptance fixture.
- [D-000008](situation/decisions/D-000008-poda-brand-source-assets.md) now
  admits user-supplied vector masters and render references, resolving source
  authority.
- [D-000009](situation/decisions/D-000009-configuration-backed-poda-theme.md)
  selects the first semantic-token, placement, crop-behavior, and theme-family
  decisions, and commit `7329320de0` implements them.
- No approved computed-token fixture or desktop/narrow Poda screenshot baseline
  is present in the current repository tree.

## Impact

The implemented slice can be built and its source-level theme and asset
contracts can be checked, but exhaustive rendered-state fidelity, artwork crop,
responsive behavior, and screenshot acceptance cannot be assured until the
remaining visual contract is qualified.

## Resolution

- [P-000007](situation/promises/P-000007-poda-theme-delivery.md) implements the
  promoted C-000001 theme and brand-asset slice under
  [PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md).
- D-000008 and D-000009 resolve the source-asset and first-slice design portions
  of the gap; computed and rendered acceptance evidence remains open.

## References

- [Poda Element visual alignment plan](situation/references/D-000007/poda-element-visual-alignment-plan.md)
- [Poda brand source asset manifest](situation/references/D-000008/brand-source-asset-manifest.md)

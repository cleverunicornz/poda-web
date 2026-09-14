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
- The first authenticated render at commit `3c9dfbeeff` showed an empty native
  Matrix account with Poda colors applied, but stock Element surface hierarchy;
  it therefore supplied rejection evidence rather than an acceptance baseline.
- [D-000010](situation/decisions/D-000010-poda-native-surface-treatment.md)
  selects Poda-scoped component presentation as the corrective route.
- Commit `5baf4ea7e3` supplies that corrective implementation. Local authenticated
  light/dark renders establish improved empty-home and native-dialog evidence,
  but they are not a retained approved baseline and the account had no joined
  room with which to render the remaining room-state matrix.
- DELTA observation for run `20260914T132604Z-a79258d272a124a98501ae78dc96a0e468e506ac`:
  [D-000012](situation/decisions/D-000012-poda-space-organization.md) retains
  the demo Space topology as external native Matrix state and identifies
  production provisioning as future work. That demo state cannot supply the
  retained, approved reference baseline required to close this Gap.

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
- D-000010 addresses the demonstrated authenticated-surface mismatch; the gap
  remains open until retained light/dark room-state references are reviewed.

## Audit evidence (2026-09-14)

A signed-in audit of the corrective build found that the Poda Compound token
overrides never applied at runtime: `setCustomThemeVars` generated its
override `<style>` elements with a `title` attribute, which enrolls them in
the HTML style sheet set mechanism and leaves them inert.
[D-000011](situation/decisions/D-000011-custom-theme-cascade-repair.md)
records the root cause, the repair, and the audit-driven surface corrections
(Space hover contrast, always-visible native Join/View actions, mask-tinted
search icon, narrow-width padding and header treatment). Post-fix measurements
confirm the Poda tokens now compute in both modes, narrow overflow is zero,
and the demo Space carries the supplied mark as its native `m.room.avatar`.
Retained light/dark desktop and narrow screenshots exist from the verification
runs, but they remain unapproved run artifacts rather than an approved
baseline.

## References

- [Poda Element visual alignment plan](situation/references/D-000007/poda-element-visual-alignment-plan.md)
- [Poda brand source asset manifest](situation/references/D-000008/brand-source-asset-manifest.md)

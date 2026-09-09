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
- The donor branch contains only a letter mark and generated Tauri icons for
  this mock; it does not identify an approved reusable vector microphone mark.
- No Poda theme, computed-token fixture, or Poda screenshot baseline is present
  in the current repository tree.

## Impact

Implementation can safely preserve the native capability boundary, but exact
theme availability, asset provenance, visual fidelity, and screenshot
acceptance cannot be assured until the contract is qualified.

## Resolution

- [C-000001](situation/candidates/C-000001-element-native-poda-skin.md) is being
  qualified by [PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md).

## References

- [Poda Element visual alignment plan](situation/references/D-000007/poda-element-visual-alignment-plan.md)

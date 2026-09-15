# Module stylesheet placement initially crossed the strict host-mutation boundary

## State

closed

## Gap

The first Gate 1 implementation appended its stylesheet to `document.adoptedStyleSheets`. Although that follows the inherited banner example, it created ambiguity against O-000015's stricter prohibition on direct host-document mutation beyond creating and placing the module-owned sibling root.

## Relevance

[P-000015](situation/promises/P-000015-module-navigation-mount-gate.md) promises an exported Module API boundary, and [O-000015](situation/oracles/O-000015-module-navigation-mount-gate.md) makes that boundary an independently deciding pass/fail leg.

## Evidence

- `4b160cdc8f489e901da657def66118747453b34d:modules/poda-navigation-spike/src/index.tsx` read and appended `document.adoptedStyleSheets` before the final Oracle observation.
- Commit `78a3bb9d89b4f7a9f1196ea0e0859c934153caf3` instead bundles the CSS as text and renders its `<style>` element through `Api.createRoot` inside the module-owned sibling host.
- [W-000002](situation/witnesses/P-000015/W-000002-module-navigation-gate-incomplete.md) applies P6/F6 to that corrected head and records the exact source-boundary review.

## Impact

Leaving the original placement in the final head would have made a P6 PASS contestable even though runtime presentation succeeded. The correction changes ownership of the style node without changing the declared layout or theme behavior.

## Resolution

Closed by commit `78a3bb9d89b4f7a9f1196ea0e0859c934153caf3` and the P6/F6 observation in W-000002.

## References

- [Structured Gate 1 observation](situation/references/P-000015/gate-1/browser-observation.json)

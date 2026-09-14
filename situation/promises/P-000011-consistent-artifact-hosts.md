# Consistent artifact hosts

## State

hypothesis

## Promise

For a supported artifact presented as both a module-owned form page and a room widget:

1. Both hosts expose the same canonical artifact identity and authoritative values through the same form validation/mutation contract, rather than independent host-owned copies of the artifact.
2. Given the same member permissions and edit, both hosts produce the same validity and mutation outcome, including denied actions; moving a form into a widget does not grant artifact or Matrix permissions.
3. A service-accepted change made through either host is visible when the other host next observes the authoritative artifact. A backend-assisted change uses that same artifact contract in both hosts, with explicit treatment of any unsaved draft.

## Scope

A predeclared artifact/form, module location, existing widget container and authorized room, with equivalent service-provided permissions. Exercise each host independently from a clean baseline, then observe manual changes in both directions and an assisted change in both hosts. Draft handling follows the selected policy judged by P-000010; host geometry may differ. This does not authorize implementation under the current visual-only migration.

## Oracle

[O-000011](situation/oracles/O-000011-consistent-artifact-hosts.md)

## State evidence

[D-000016](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md) selects a shared artifact contract, and [D-000017](situation/decisions/D-000017-explicit-ui-extension-boundaries.md) distinguishes module and widget hosts. [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains missing implementation/evidence; this is not a qualification or assurance claim.

## Residual

Pixel-identical layout, arbitrary widget container behavior, cross-origin choice, multi-host concurrency and universal support across all artifact kinds are not assured. The bounded supported host/permission matrix and unresolved policies remain in [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md). No old product Promise is revived.

## References

- [I-000006](situation/invariants/I-000006-shared-artifact-editing-contract.md)
- [I-000010](situation/invariants/I-000010-explicit-host-extension-boundaries.md)
- [UI extension guide](situation/references/I-000010/poda-ui-extension-guide.md)
- [Preview and fixture guide](situation/references/I-000011/poda-ui-preview-and-fixture-guide.md)

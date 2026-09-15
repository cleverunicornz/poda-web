# Manual artifact workflow

## State

hypothesis

## Promise

For an authorized member and an explicitly supported artifact/form:

1. The member can load, edit, validate and submit the form without opening an assistant conversation or invoking an assistant action.
2. An invalid edit shows the selected form contract's validation outcome and is not represented as saved. A service-denied mutation remains denied; a frontend control cannot grant permission.
3. A service-accepted edit is shown as saved only after that outcome, and reopening the same artifact shows the authoritative saved value under the same artifact identity.

## Scope

A predeclared artifact kind, form contract and member host, with service-provided identity, permissions and observable load/mutation outcomes. The scenario includes one valid edit, one invalid edit, one denied mutation, a successful submission and reopening. Assistant invocation is observed over that bounded workflow, not inferred from the absence of a chat panel. This is later product behavior, not an addition to the active native-only visual migration.

## Oracle

[O-000009](situation/oracles/O-000009-manual-artifact-workflow.md)

## State evidence

[D-000016](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md) selects independent manual editing and a shared artifact contract. [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains absent product implementation/evidence. This knowledge-only statement has no feasibility or passing Witness evidence.

## Residual

No artifact schema, endpoint, subscription transport, publication approval policy, concurrent-editor policy or backend authorization implementation is selected here. Those choices remain in [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md). This Promise does not revive superseded P-000001/P-000002, withdrawn P-000003/P-000004 or abandoned PLAN-000001.

## References

- [I-000006](situation/invariants/I-000006-shared-artifact-editing-contract.md)
- [I-000007](situation/invariants/I-000007-server-owned-access-authority.md)
- [UI extension guide](situation/references/I-000010/poda-ui-extension-guide.md)

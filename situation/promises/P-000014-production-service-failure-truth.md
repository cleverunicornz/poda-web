# Production service failure truth

## State

hypothesis

## Promise

For the supported product UI's production data and mutation paths:

1. A service load failure or authorization denial is displayed as failure/denial, not replaced by simulated product data presented as authoritative. Any retained last-known data is distinguishable from a successful fresh load.
2. A failed or unresolved save, publish or assistant-driven artifact operation is not presented as saved, published or successful. A success claim follows an actual corresponding service success, not local mock behavior or conversation text.
3. Simulated data/actions are reachable only through explicit preview/test entrypoints. Entering the production application, including after a preview in the declared isolation scenario, neither activates those simulations as fallback nor reuses their simulated persistence as production state.
4. An explicit interactive preview can demonstrate success and failure transitions as simulations without claiming production persistence or sending production mutations.

## Scope

A predeclared production entrypoint, supported load/auth/save/publish/assisted-operation cases, explicit preview entrypoint and isolated fixture/scenario configuration. The dossier distinguishes service failure, denial, unresolved outcome and success; the observation window for unresolved outcomes is fixed before the run. The preview-to-production sequence covers the selected browser/storage/origin arrangement, not every deployment. These are later product guardrails, not authorization to modify current visual implementation.

## Oracle

[O-000014](situation/oracles/O-000014-production-service-failure-truth.md)

## State evidence

[D-000018](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md) selects truthful production outcomes and explicit previews. [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains missing implementation/evidence. No execution, feasibility or passing Witness is claimed.

## Residual

Retry/recovery policy, error wording, offline support, exact transport and persistence schema are not selected. Production/preview deployment details and the supported scenario matrix remain in [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md). This does not prove backend atomicity or create fake success as a fallback, and does not revive older product Promises.

## References

- [I-000009](situation/invariants/I-000009-production-truth-and-preview-isolation.md)
- [I-000011](situation/invariants/I-000011-shared-storybook-and-fixtures.md)
- [Preview and fixture guide](situation/references/I-000011/poda-ui-preview-and-fixture-guide.md)

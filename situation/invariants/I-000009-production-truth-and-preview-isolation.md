# Production truth and preview isolation

## Priority

critical

## Invariant

Production data and user-visible mutation/persistence claims derive from actual service outcomes; simulated data and actions are confined to explicit preview/test entrypoints.

## Basis

- [D-000018](situation/decisions/D-000018-shared-preview-and-fixture-workflow.md)
- [P-000014](situation/promises/P-000014-production-service-failure-truth.md)

# Contract and capability safety

## State

withdrawn

## Promise

Poda Web consumes organization and catalog services only through a versioned,
runtime-validated client contract, enables behavior only for advertised
compatible capabilities, and cannot use fixtures, legacy native transports, or
inherited Element-operated service defaults in production.

## Scope

The promise covers the Poda client contract, bootstrap negotiation, HTTP and
fixture adapters, production build selection, typed failures, configuration,
and network destinations introduced or retained by the integrated web client.

## Oracle

- [O-000004](situation/oracles/O-000004-contract-and-capability-safety.md)

## State evidence

- [D-000004](situation/decisions/D-000004-contract-first-web-delivery.md)
  selects the contract and fail-closed boundary.
- [D-000005](situation/decisions/D-000005-poda-product-branding.md) rejects
  inherited Element-operated defaults.
- [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)
  removes new application contracts, adapters, and service integration from
  this migration.
- No implementation or run evidence exists.

## Residual

Correctness and availability inside external backend, Matrix, identity, media,
AI, and publication services are outside this web-client promise.

## References

- [Poda and Element integration plan](situation/references/D-000002/poda-element-integration-plan.md)

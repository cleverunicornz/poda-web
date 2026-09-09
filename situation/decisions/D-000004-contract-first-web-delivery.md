# Contract-first web delivery

## Status

superseded

## Superseded by

- [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)

## Date

2026-09-09

## Context

The Poda web surfaces must be designed and exercised before their new browser
APIs are available, while the donor's native bridge is unsuitable for browser
production use.

## Evidence

- The maintainer selected a new web API and realistic contract fixtures rather
  than waiting for the backend or adapting the native bridge, as retained in
  [the integration plan](situation/references/D-000002/poda-element-integration-plan.md).
- `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native`
  is access-controlled and supplies behavior to model, not a forward-valid
  browser transport.

## Decision

Define a versioned, runtime-validated `PodaClientContractV1` in the web client.
Implement a production HTTP adapter and an injectable fixture adapter for
development and tests. Production must fail closed when compatible APIs or
capabilities are absent and must never select fixtures or the donor native
transport.

## Why

A typed contract lets the complete UI, authorization states, and failure modes
be built and tested without inventing a production fallback. Runtime validation
turns backend incompatibility into a visible bounded failure instead of corrupt
or partially interpreted state.

## Rejected alternatives

- Blocking all frontend work until every backend exists was rejected because
  the UI and contract can be validated independently.
- Shipping production mocks was rejected because they conceal unavailable
  authority and can accept mutations that never occurred.
- Adapting the donor's Tauri or transitional gRPC gateway was rejected because
  it would preserve the wrong deployment boundary.

## Consequences

- All production features are enabled by a bootstrap version/capability
  handshake.
- The contract represents revision, idempotency, authorization, quota,
  conflict, offline, and unsupported states explicitly.
- [P-000004](situation/promises/P-000004-contract-and-capability-safety.md)
  states the resulting behavior.

## Revisit when

The owning backend publishes a replacement versioned contract with equivalent
runtime compatibility and failure guarantees.

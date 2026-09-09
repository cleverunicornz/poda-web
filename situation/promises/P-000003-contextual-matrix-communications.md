# Contextual Matrix communications

## State

withdrawn

## Promise

An authenticated Poda user can use the retained Matrix communication features
through the correct coordinator-issued audience or organization identity, with
one active client and isolated credentials, sync data, and encryption data per
binding, including transactional context switching and binding-aware deep
links.

## Scope

The promise covers Poda-managed Matrix login and bootstrap, client lifecycle,
browser persistence, routing, direct messages, rooms, Spaces, threads, files,
calls when a Poda-operated capability is available, encryption, search,
notifications, settings, and Poda workflow cards in `apps/web/`.

## Oracle

- [O-000003](situation/oracles/O-000003-contextual-matrix-communications.md)

## State evidence

- [D-000002](situation/decisions/D-000002-poda-product-composition.md) selects
  Matrix as the communication surface.
- [D-000003](situation/decisions/D-000003-platform-matrix-authority.md) selects
  the current authority and identity baseline.
- [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)
  removes identity, context, and Matrix behavior changes from this migration.
- No implementation or run evidence exists.

## Residual

Arbitrary homeserver login, a separate friend or follow graph, concurrent
Matrix clients, companion features without Poda-operated endpoints, Matrix
server implementation, and Matrix Coordinator implementation are outside this
promise.

## References

- [Poda and Element integration plan](situation/references/D-000002/poda-element-integration-plan.md)

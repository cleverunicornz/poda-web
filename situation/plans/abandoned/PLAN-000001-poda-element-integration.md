# Poda and Element integration

## Promises

- [P-000004](situation/promises/P-000004-contract-and-capability-safety.md),
  judged by [O-000004](situation/oracles/O-000004-contract-and-capability-safety.md)
- [P-000001](situation/promises/P-000001-poda-web-shell.md), judged by
  [O-000001](situation/oracles/O-000001-poda-web-shell.md)
- [P-000002](situation/promises/P-000002-poda-podcast-product.md), judged by
  [O-000002](situation/oracles/O-000002-poda-podcast-product.md)
- [P-000003](situation/promises/P-000003-contextual-matrix-communications.md),
  judged by [O-000003](situation/oracles/O-000003-contextual-matrix-communications.md)
- [P-000005](situation/promises/P-000005-poda-fork-assurance-route.md),
  judged by [O-000005](situation/oracles/O-000005-poda-fork-assurance-route.md)

## Dependencies

- P-000004 establishes the safe contract and capability boundary before
  P-000001, P-000002, or P-000003 can integrate production services.
- P-000001 establishes the shell and route boundaries used by P-000002 and
  P-000003.
- P-000002 and P-000003 may proceed in parallel after their shared contract and
  shell boundaries exist.
- P-000005 is implemented early enough to exercise each slice, but it can be
  assured only after its exact-head run covers the other four Promises and a
  retained PASS Witness exists for every claimed Promise.

## Completion

This plan completes when P-000001, P-000002, P-000003, P-000004, and P-000005
are all `assured` under their linked Oracles through retained PASS Witnesses.

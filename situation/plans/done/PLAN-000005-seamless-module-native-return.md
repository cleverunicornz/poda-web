# Qualify same-document registered-location return

## Candidates

- [C-000004](situation/candidates/C-000004-consume-hash-suppression-once.md) — promoted by [D-000020](situation/decisions/D-000020-consume-hash-suppression-once.md).

## Promises

- [P-000017](situation/promises/P-000017-seamless-module-native-return.md) — implement and assure the bounded same-document router behavior under [O-000017](situation/oracles/O-000017-seamless-module-native-return.md).

## Dependencies

- [G-000008](situation/gaps/G-000008-module-native-screen-transition.md) and immutable [P-000016](situation/promises/P-000016-decision-complete-module-navigation-gate.md) supply the reproduced failure and reload-based comparison baseline.
- [I-000010](situation/invariants/I-000010-explicit-host-extension-boundaries.md) requires the Element-owned router edit to remain isolated and reviewed as an explicit core change.
- The maintainer's 2026-09-15 instruction authorizes implementation, direct Chrome qualification and a new pull request; it does not authorize merge or select production navigation.

## Completion

This Plan completes when C-000004 remains atomically promoted through D-000020/P-000017/O-000017, P-000017 is `assured` by a complete PASS Witness under O-000017, and G-000008 records the resulting bounded disposition. A compile, source inspection, unit result, partial browser run or retained reload workaround alone is not completion.

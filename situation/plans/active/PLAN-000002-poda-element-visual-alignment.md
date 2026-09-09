# Poda Element visual alignment

## Candidates

- [C-000001](situation/candidates/C-000001-element-native-poda-skin.md)

## Promises

- [P-000006](situation/promises/P-000006-poda-element-visual-alignment.md),
  judged by [O-000006](situation/oracles/O-000006-poda-element-visual-alignment.md)
- [P-000005](situation/promises/P-000005-poda-fork-assurance-route.md), judged
  by [O-000005](situation/oracles/O-000005-poda-fork-assurance-route.md)

## Dependencies

- C-000001 is qualified before implementation fixes a theme delivery route,
  asset source, visual matrix, or panel geometry.
- P-000005 is implemented early enough to generate exact-head visual,
  accessibility, behavior, and boundary evidence for P-000006.
- P-000006 can become `assured` only after O-000006 is applied to the final
  implementation head and a retained PASS Witness covers every Pass leg.

## Completion

This plan completes when C-000001 is promoted, rejected, merged, or superseded,
and P-000005 and P-000006 are both `assured` under their linked Oracles through
retained PASS Witnesses.

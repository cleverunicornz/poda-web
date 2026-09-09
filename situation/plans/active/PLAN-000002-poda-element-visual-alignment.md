# Poda Element visual alignment

## Candidates

- [C-000001](situation/candidates/C-000001-element-native-poda-skin.md)

## Promises

- [P-000006](situation/promises/P-000006-poda-element-visual-alignment.md),
  judged by [O-000006](situation/oracles/O-000006-poda-element-visual-alignment.md)
- [P-000007](situation/promises/P-000007-poda-theme-delivery.md), judged by
  [O-000007](situation/oracles/O-000007-poda-theme-delivery.md)
- [P-000005](situation/promises/P-000005-poda-fork-assurance-route.md), judged
  by [O-000005](situation/oracles/O-000005-poda-fork-assurance-route.md)

## Dependencies

- [D-000008](situation/decisions/D-000008-poda-brand-source-assets.md) fixes the
  asset source; [D-000009](situation/decisions/D-000009-configuration-backed-poda-theme.md)
  promotes C-000001 and fixes the first implementation route.
- P-000007 implements the configuration, themes, system-preference mapping,
  brand slots, and deterministic assets used by the broader P-000006 surface
  and behavior judgment.
- P-000005 is implemented early enough to generate exact-head visual,
  accessibility, behavior, and boundary evidence for P-000006.
- P-000006 can become `assured` only after O-000006 is applied to the final
  implementation head and a retained PASS Witness covers every Pass leg.

## Completion

This plan completes when C-000001 is promoted, rejected, merged, or superseded,
and P-000005, P-000006, and P-000007 are `assured` under their linked Oracles
through retained PASS Witnesses.

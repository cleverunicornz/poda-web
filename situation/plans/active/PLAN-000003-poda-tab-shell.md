# Poda tab shell

## Promises

- [P-000008](situation/promises/P-000008-poda-tab-shell.md), judged by
  [O-000008](situation/oracles/O-000008-poda-tab-shell.md)

## Dependencies

- [D-000013](situation/decisions/D-000013-poda-tab-shell-scope.md) selects the
  scope and mechanism; the plan document is
  [situation/references/D-000013/poda-tab-shell-plan.md](situation/references/D-000013/poda-tab-shell-plan.md).
- The visual-alignment line (PLAN-000002 and its PR #2 branch) supplies the
  Poda themes, skin, and branding the module pages inherit; this plan builds
  on that branch, not on `internal/main`, until it merges.
- The delivery sequence requires the routing spike before the tab-bar fork
  edit, so module loading and chrome suppression are verified before shell
  work lands.

## Completion

This plan completes when P-000008 is `assured` under O-000008 through a
retained PASS witness on the exact head, and the maintainer has reviewed the
rendered tabs. If the tab set, page inventory, or mock-only boundary changes,
this plan is superseded rather than edited.

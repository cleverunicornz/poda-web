# PR description retains superseded assurance claims

## State

open

## Gap

The public description of PR #15 still says the PCC native design transfer is
presentation-only with unchanged data contracts and that P-000019 is `assured`
by a witness covering every O-000019 leg. The reconciled current records instead
place P-000019 in `implemented`, mark W-000001 `INVALID`, and retain concrete
in-Scope preservation and widget-theme concerns.

## Relevance

The pull request description is the human entrypoint for review of this design
transfer. Its pre-closure framing can direct reviewers away from source and
evidence contradictions that the current Promise/Oracle/Witness lineage now
represents honestly.

## Evidence

- Validator observation for run
  `20260924T141117Z-f187b0a0342cb1c5172d4b61d21386cbcb604ea6` at reviewed head
  `ee1598172c939b75ad51b87233732be2c669964c`: the PR #15 description says
  “Presentation and layout only: mock adapter, fixtures, routing, and validation
  contracts unchanged” and “P-000019 is `assured` by W-000001 (all O-000019
  legs).”
- [P-000019](../promises/P-000019-pcc-native-module-design.md) is currently
  `implemented`, and its State evidence cites the `INVALID` W-000001 plus the
  episode-field contradiction in G-000015.
- [W-000001](../witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
  is currently `INVALID` rather than PASS.
- [G-000015](G-000015-episode-create-field-projection.md) records the changed
  episode detail-field and scheduled-time representation, while
  [G-000017](G-000017-widget-host-theme-propagation.md) records the unconsumed
  host-theme path for the widget surface.

## Impact

A reviewer relying on the pull request description may treat contradicted data
preservation and incomplete design-theme evidence as already assured. The
closer comment and repository records carry the corrected state, but the
human-facing summary remains inconsistent with them.

## Resolution

none

## References

- https://github.com/cleverunicornz/poda-web/pull/15
- [P-000019](../promises/P-000019-pcc-native-module-design.md)
- [W-000001](../witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
- [G-000015](G-000015-episode-create-field-projection.md)
- [G-000017](G-000017-widget-host-theme-propagation.md)

# Episode number required label disagrees with validation

## State

open

## Gap

The transferred episode wizard labels Episode Number with an asterisk that
normally denotes a required field, while the preserved validation accepts an
omitted episode number. It is unresolved whether the label should be optional
or the selected behavior was intended to make the field required.

## Relevance

[P-000019](../promises/P-000019-pcc-native-module-design.md) preserves the
existing required/format validation contract while transferring the guided
wizard presentation. [O-000019](../oracles/O-000019-pcc-native-module-design.md)
P2/F2 judges inline validation and live readiness. This concern is limited to
the changed episode-number label and its existing validation rule.

## Evidence

- At reviewed head `ee1598172c939b75ad51b87233732be2c669964c`,
  `modules/poda-profile-spike/src/studio/episodeCreate.js:178` renders
  `Episode Number *`.
- At the same head, `modules/poda-profile-spike/src/studio/episodeCreate.js:29-30`
  rejects a non-integer episode number only when a value is present; it does not
  require the field.
- `modules/poda-profile-spike/src/data/mockAdapter.test.js:100-105` treats a
  draft without `episodeNumber` as minimally valid.
- The pre-transfer source at
  `af00892498b68cba59146dc8b2c26a14b5312a55:modules/poda-profile-spike/src/studio/episodeCreate.js`
  labeled the field `Episode number` without an asterisk and used the same
  optional validation rule.

## Impact

A user can be told the episode number is required, submit without it, and reach
the detail route while the readiness rail still treats “Title and number” as
incomplete. The intended requirement remains uncertain.

## Resolution

none

## References

- [P-000019](../promises/P-000019-pcc-native-module-design.md)
- [O-000019](../oracles/O-000019-pcc-native-module-design.md)
- [D-000022](../decisions/D-000022-pcc-native-design-transfer.md)

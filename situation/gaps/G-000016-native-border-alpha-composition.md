# Native border token alpha composition

## State

open

## Gap

The shared native theme defines `--pn-border` with an alpha component, while
two transferred row-divider declarations append a second alpha component when
they consume that token. After custom-property substitution, those declarations
appear to contain two `/ <alpha-value>` components. Whether the affected browser
silently drops the divider declarations has not been observed in computed
styles during this validation.

## Relevance

[P-000019](../promises/P-000019-pcc-native-module-design.md) includes the
transferred donor token and section anatomy in scope, and
[O-000019](../oracles/O-000019-pcc-native-module-design.md) P1/F1 judges the
rendered design language. This observation is limited to the two divider
consumers and does not qualify the broader theme transfer.

## Evidence

- At reviewed head `ee1598172c939b75ad51b87233732be2c669964c`,
  `modules/poda-profile-spike/src/shared/nativeTheme.js:29` defines
  `--pn-border: 18 73% 56% / 0.5`, while the dark override at line 61 also
  includes `/ 0.2`.
- At the same head,
  `modules/poda-profile-spike/src/shared/nativeTheme.js:376` and
  `modules/poda-profile-spike/src/shared/podcastFullView.js:26` consume the
  token as `hsl(var(--pn-border) / 0.5)`, which substitutes the stored alpha
  before the additional alpha component.
- Other reviewed declarations consume the token as `hsl(var(--pn-border))`;
  this observation does not apply to those uses. No computed-style browser
  observation for the two row dividers was retained in this validation.

## Impact

The intended half-opacity definition-row and podcast-detail row dividers may be
omitted, producing a small visual divergence from the selected section anatomy.
The extent of any visible effect is unresolved.

## Resolution

none

## References

- [P-000019](../promises/P-000019-pcc-native-module-design.md)
- [O-000019](../oracles/O-000019-pcc-native-module-design.md)
- [D-000022](../decisions/D-000022-pcc-native-design-transfer.md)

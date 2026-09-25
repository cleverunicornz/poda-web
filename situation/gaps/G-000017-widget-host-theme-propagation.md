# Widget host does not consume the Element theme

## State

open

## Gap

The room-widget profile renders the shared native view inside its own iframe,
but the registered widget URL carries no client-theme template parameter and
the widget entry neither reads a theme value nor handles Element's widget-theme
updates. The shared dark-token selector depends on a dark class on the iframe's
own `body`, so the host document's Poda Dark class cannot select those tokens
inside the widget document.

## Relevance

[P-000019](../promises/P-000019-pcc-native-module-design.md) includes the
room-widget profile card among the surfaces that render donor token triples in
both Poda themes. [O-000019](../oracles/O-000019-pcc-native-module-design.md)
requires the same named surfaces in Poda Light and Poda Dark, and P1/F1 judges
the rendered token set. This is therefore an in-Scope implementation and
evidence concern, not a general widget-host investigation.

## Evidence

- At reviewed head `ee1598172c939b75ad51b87233732be2c669964c`,
  `modules/poda-profile-spike/README.md:34-35` registers only the Matrix user,
  room, and display-name templates; it includes neither `$theme` nor
  `$org.matrix.msc2873.client_theme`.
- At the same head, `modules/poda-profile-spike/widget/widget.js:9-11` reads only
  identity parameters. Lines 23-27 start `WidgetApi`, but the entry has no
  theme parameter handling or theme-update listener.
- `modules/poda-profile-spike/widget/index.html:8` supplies an unclassified
  iframe-local `body`, while
  `modules/poda-profile-spike/src/shared/nativeTheme.js:55-68` selects dark
  tokens only under `body[class*="cpd-theme-dark"]` in that document.
- The inherited host path at `apps/web/src/stores/widgets/WidgetMessaging.ts:236-248`
  supplies the effective client theme to URL-template expansion, and lines
  271-273 send later theme updates through the widget API. The reviewed widget
  consumes neither route.
- [W-000001](../witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
  retains only `widget-profile-light.webp` for the widget and does not retain a
  widget-specific Poda Dark sequence or a theme-propagation mechanism. The
  witness is already `INVALID` for its undecided P4 leg; this observation also
  leaves the widget portion of P1 undecided.

## Impact

The room widget can keep the light token set while its Element host uses Poda
Dark. That contradicts P-000019's widget-in-both-themes behavior and means the
current W-000001 account does not decide every O-000019 P1 surface.

## Resolution

none

## References

- [P-000019](../promises/P-000019-pcc-native-module-design.md)
- [O-000019](../oracles/O-000019-pcc-native-module-design.md)
- [W-000001](../witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
- [D-000022](../decisions/D-000022-pcc-native-design-transfer.md)

# Profile widget reports a handshake error on load

## State

closed

## Gap

The Poda profile widget logs "Not ready or unknown widget ID" from
`sendContentLoaded` when it loads. Whether this delays theme updates or other
host messages is unknown.

## Relevance

[P-000019](situation/promises/P-000019-pcc-native-module-design.md) widget host;
[G-000017](situation/gaps/G-000017-widget-host-theme-propagation.md) widget theme
propagation.

## Evidence

Console during the [W-000006](situation/witnesses/P-000021/W-000006-profile-side-panel-local-pass.md)
run: `Error: Not ready or unknown widget ID at WidgetApi.sendContentLoaded`
from `widgets/poda-profile/widget.bundle.js`. `modules/poda-profile-spike/widget/widget.js`
calls `widgetApi.start()` then `sendContentLoaded()` immediately. The widget
content rendered regardless.

## Impact

Possibly none; possibly missed host messages before the handshake completes.

## Resolution

Closed: the widget now passes its widget ID and client origin and sends no content-loaded message ([D-000029](situation/decisions/D-000029-plus-menu-and-polish.md)); no handshake error was logged in [W-000013](situation/witnesses/P-000026/W-000013-plus-menu-and-polish-local-pass.md) P3.

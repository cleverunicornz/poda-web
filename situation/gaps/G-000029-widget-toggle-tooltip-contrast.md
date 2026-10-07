# Widget toggle tooltip is unreadable in Poda Light

## State

open

## Gap

The room header tooltip of the `widget-toggles` button ("Show/Hide Poda
Profile") renders dark text on a near-black tooltip in Poda Light. Whether this
comes from the module's separate Compound copy (which its source already notes
cannot see the host's tooltip context) or from Poda theme tokens is unknown.

## Relevance

[P-000021](situation/promises/P-000021-poda-profile-side-panel.md) P5, one-click
widget access; [G-000024](situation/gaps/G-000024-placeholder-and-accent-contrast.md)
records other contrast concerns.

## Evidence

Observed in the [W-000006](situation/witnesses/P-000021/W-000006-profile-side-panel-local-pass.md)
run on 2026-10-07: hovering the header button showed an almost black tooltip
whose label was barely visible. `modules/widget-toggles/src/index.tsx` wraps its
buttons in its own `TooltipProvider` because a separate compound-web copy does
not see the host context.

## Impact

Users hovering the button may not learn what it does.

## Resolution

none

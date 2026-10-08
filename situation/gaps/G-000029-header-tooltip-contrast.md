# Room header tooltips are hard to read in Poda Light

## State

closed

## Gap

Room header tooltips render dark text on a near-black tooltip in Poda Light. Which theme token causes it is
unknown.

## Relevance

Room header controls in Poda Light; [G-000024](situation/gaps/G-000024-placeholder-and-accent-contrast.md)
records other contrast concerns.

## Evidence

During the 2026-10-07 runs behind
[W-000006](situation/witnesses/P-000021/W-000006-profile-side-panel-local-pass.md),
`situation/references/P-000021/profile-side-panel/header-tooltip-contrast.png`
shows the "People" tooltip on the member facepile as a near-black box with
barely visible text; a since-removed header widget button's tooltip looked the
same.

## Impact

Users hovering header buttons may not learn what they do.

## Resolution

Closed: the cause was Compound's tooltip pairing `--cpd-color-text-on-solid-primary` with `--cpd-color-alpha-gray-1400`; [D-000029](situation/decisions/D-000029-plus-menu-and-polish.md) sets the latter to light amber, measured about 10:1 in [W-000013](situation/witnesses/P-000026/W-000013-plus-menu-and-polish-local-pass.md).

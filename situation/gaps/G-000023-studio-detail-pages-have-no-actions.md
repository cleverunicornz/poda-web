# Studio podcast and episode detail pages have no actions

## State

closed

## Gap

The podcast and episode detail pages reached after creation offer no back,
edit or add-episode action; the only exit is the top navigation. It is
unresolved which actions these pages should carry.

## Relevance

[P-000018](situation/promises/P-000018-poda-creation-flows.md) create → detail
flows.

## Evidence

At `f11fe6c0b2` on 2026-10-06, after Create Podcast and after Schedule Episode, a
query for `button, a` outside the space panel and the navigation header on the
detail page returned no elements.

## Impact

Users land on a dead end after creating content and must know to use the top
navigation to continue.

## Resolution

Closed: [P-000022](situation/promises/P-000022-creation-flow-fixes.md) passed [O-000022](situation/oracles/O-000022-creation-flow-fixes.md) on [W-000007](situation/witnesses/P-000022/W-000007-creation-flow-fixes-local-pass.md) at `9e5079fc81` under [D-000025](situation/decisions/D-000025-creation-flow-fixes.md); detail pages offer Back plus New episode / Open podcast. No edit action exists because no edit flow exists (D-000025 Rejected alternatives).

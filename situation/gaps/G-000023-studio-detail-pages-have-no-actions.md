# Studio podcast and episode detail pages have no actions

## State

open

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

none

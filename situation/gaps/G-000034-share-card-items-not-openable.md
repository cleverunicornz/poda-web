# Share cards cannot open the shared item

## State

open

## Gap

A share card carries a snapshot of the episode, podcast or profile as it was
sent. Episodes, podcasts and creator profiles live only in the sharer's
session-only mock adapter, so recipients cannot open the item, and a card does
not follow later edits.

## Relevance

[D-000028](situation/decisions/D-000028-share-cards.md),
[P-000025](situation/promises/P-000025-share-cards.md) Residual,
[I-000009](situation/invariants/I-000009-production-truth-and-preview-isolation.md).

## Evidence

The episode card posted on 2026-10-08 carried the fixture item
`ep-systems-collapse` ("Systems that do not collapse", "S3E42 · published")
from the module's mock adapter (W-000012 observation).

## Impact

Cards are announcements only; acting on them goes through View profile or the
sender's link.

## Resolution

none

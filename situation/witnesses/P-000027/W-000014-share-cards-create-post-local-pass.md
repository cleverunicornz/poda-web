# Share cards from Create post and Share to chat, local build

## Promise

[P-000027](situation/promises/P-000027-share-cards-create-post.md)

## Oracle

[O-000027](situation/oracles/O-000027-share-cards-create-post.md)

## Result

PASS

## Head

`b170a08c78`

## Observed

2026-10-08

## Evidence

- [Structured observation](situation/references/P-000027/create-post/observation.json).
- [Create post and its tooltip](situation/references/P-000027/create-post/create-post-tooltip.png);
  [the dialog opened from an episode page](situation/references/P-000027/create-post/post-dialog-from-episode.png).
- Tests: module 72/72, web 78/78, navigation end-to-end 4/4.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | Create post with its tooltip; Share to chat preselected podcast, episode and profile; composer shows only Attachment; end-to-end test passed. |
| P2 | Post to listed the five postable chats, no space, defaulting to the viewed chat; host tests passed. |
| P3 | Validation tests passed; the dialog requires a chat. |
| P4 | Posts reached General (public) and Poll test, each chat opened with the card. |
| P5 | Link button `_blank` with `noopener noreferrer nofollow`; editing disabled by the renderer hint. |
| P6 | View profile opened Demo's Creator profile; Back showed user info. |
| P7 | Markup as text without link, image or script; the malformed event as its body. |

# Share cards, local build

## Promise

[P-000025](situation/promises/P-000025-share-cards.md)

## Oracle

[O-000025](situation/oracles/O-000025-share-cards.md)

## Result

PASS

## Head

`01cc142622`

## Observed

2026-10-08

## Evidence

- [Structured observation](situation/references/P-000025/share-cards/observation.json):
  build and module digests, room, events, test results and per-leg
  observations.
- Screenshots in `situation/references/P-000025/share-cards/`:
  `upload-menu-share-to-chat.png`, `share-dialog-podcast-swap.png`,
  `cards-in-timeline.png`, `view-profile-and-untrusted-content.png`,
  `profile-card-and-back-to-user-info.png`.
- Module Vitest 58/58; host Vitest 66/66 across the five named files.

Local manual assurance only; the reusable fork assurance route remains absent
per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 | Share to chat in the upload menu; the dialog offered the three kinds, the items, each kind's exact types and a matching preview. |
| P2 | Empty submit and an unsafe link were refused inline; with everything corrected no error and no visible banner remained. |
| P3 | Both posts are `m.room.message` / `io.poda.share` with the expected body and snapshot on the homeserver; host tests passed. |
| P4 | Cards rendered for sender and recipient with all fields; the link button only where set, `_blank` with `noopener noreferrer nofollow`; no Edit. |
| P5 | View profile opened Mira's profile card in Demo's right panel in one click; Back showed her user info. |
| P6 | Markup and a `javascript:` link from a raw event rendered as literal text with no link or effect; an unknown snapshot version showed its body, not a card. |

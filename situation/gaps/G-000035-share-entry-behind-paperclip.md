# Share entry sits behind the paperclip, not a "+"

## State

closed

## Gap

The maintainer described posting from a "+" pop-up. Share to chat is an entry
in the composer's upload menu, whose trigger keeps Element's paperclip icon and
"Attachment" tooltip even when it holds more than files. Whether to change the
trigger to a "+" (an Element core change to the shared upload button) is
unselected.

## Relevance

[D-000028](situation/decisions/D-000028-share-cards.md) Consequences.

## Evidence

2026-10-08: the composer showed the paperclip; its menu listed Attachment and
Share to chat
([screenshot](situation/references/P-000025/share-cards/upload-menu-share-to-chat.png)).

## Impact

Members may not look for sharing behind a paperclip.

## Resolution

Closed: the maintainer first chose a "+" and then moved sharing out of the
composer: [D-000030](situation/decisions/D-000030-share-entry-points.md) puts
Create post in the top bar and Share to chat on Studio and Profile pages, and
the composer keeps Element's Attachment button
([W-000014](situation/witnesses/P-000027/W-000014-share-cards-create-post-local-pass.md) P1).

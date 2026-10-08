# Share cards for episodes, podcasts and profiles

## State

assured

## Promise

In a room whose composer the member can post in, with the Poda profile module:

1. The composer's upload menu offers **Share to chat**, which opens a dialog to
   choose an episode, a podcast or the member's profile, the item, a type of
   post from that kind's list (episode: New episode, Coming soon, Looking for
   guests; podcast: Launch, Looking for guests, Looking for a co-host, Collab,
   Podcast swap; profile: Available as a guest, Looking for collaborators,
   Introduction), an optional description and an optional link with a label,
   with a live card preview.
2. Posting is refused with inline errors, and a banner that disappears once
   they are corrected, when no item or type is chosen, the description is
   longer than 1,000 characters, or the link is not an http(s) URL or lacks a
   label.
3. A post is one `m.room.message` with `msgtype` `io.poda.share`, a plain-text
   `body` naming the sharer, kind, item and type with the description and link,
   and an `io.poda.share` snapshot of the item, type, description and link.
4. Every member's Poda timeline shows such a message as a card: kind icon,
   title, type badge, subtitle, meta, up to three topics, description, **View
   profile**, and a button for the link that opens it in a new tab without
   referrer or opener. Cards offer no Edit.
5. View profile opens the sender's profile card in the right panel in one
   click; Back returns to the sender's user info.
6. Card content from the timeline renders only as escaped text; a link that is
   not http(s) is dropped; content that does not validate shows as Element's
   plain message body instead of a card.

## Scope

`modules/poda-profile-spike/` with the Poda host extensions
`extras.openUserProfilePanel` and `extras.sendRoomMessage`
(`apps/web/src/modules/ExtrasApi.ts`, `packages/module-api/src/api/extras.ts`),
in a local build with a local Synapse, as changed by
[D-000028](situation/decisions/D-000028-share-cards.md).

## Oracle

[O-000025](situation/oracles/O-000025-share-cards.md)

## State evidence

- [D-000028](situation/decisions/D-000028-share-cards.md) selects the behavior.
- `implemented`: commits `4778887e67` and `01cc142622` on branch
  `internal/share-cards`.
- `assured`: [O-000025](situation/oracles/O-000025-share-cards.md) passed on
  [W-000012](situation/witnesses/P-000025/W-000012-share-cards-local-pass.md)
  at `01cc142622`, covering every leg; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Residual

This promise does not assure:

- opening the shared item, or cards following later edits
  ([G-000034](situation/gaps/G-000034-share-card-items-not-openable.md)); item
  data comes from the module's session-only mock adapter;
- threads (cards post to the room timeline), other clients' rendering beyond
  the plain-text body, and hosts without the Poda extensions (the module then
  puts the body in the composer, unobserved);
- the trigger icon ([G-000035](situation/gaps/G-000035-share-entry-behind-paperclip.md)),
  narrow layouts and accessibility beyond names and labels.

## References

- [D-000028](situation/decisions/D-000028-share-cards.md)
- [Explicit extension boundary](situation/invariants/I-000010-explicit-host-extension-boundaries.md)

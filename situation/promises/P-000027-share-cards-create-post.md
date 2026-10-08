# Share cards from "Create post" and Share to chat

## State

assured

## Promise

In Poda Web with the Poda modules and host extensions:

1. **Entry points.** The top bar shows a **Create post** button whose tooltip
   reads "Share an episode, a podcast or your profile as a card in one of your
   chats."; podcast and episode pages and the user's own Profile page offer
   **Share to chat**. Each opens the "Create a post" dialog, the Share buttons
   with their item selected. The composer's upload menu offers no share option.
2. **Dialog.** The dialog asks where to post (**Post to**: the joined chats,
   not spaces, the user may post in, defaulting to the viewed or last viewed
   chat), what to share (an episode, a podcast or the user's profile), the item,
   a type of post from that kind's list (episode: New episode, Coming soon,
   Looking for guests; podcast: Launch, Looking for guests, Looking for a
   co-host, Collab, Podcast swap; profile: Available as a guest, Looking for
   collaborators, Introduction), an optional description and an optional
   labelled link, with a live card preview.
3. **Validation.** Posting is refused with inline errors, and a banner that
   disappears once they are corrected, when no chat, item or type is chosen,
   the description is longer than 1,000 characters, or the link is not an
   http(s) URL or lacks a label.
4. **Post.** A post is one `m.room.message` in the chosen chat with `msgtype`
   `io.poda.share`, a plain-text `body` naming the sharer, kind, item and type
   with the description and link, and an `io.poda.share` snapshot; that chat
   then opens.
5. **Card.** Every member's Poda timeline shows such a message as a card: kind
   icon, title, type badge, subtitle, meta, up to three topics, description,
   **View profile**, and a button for the link that opens it in a new tab
   without referrer or opener. Cards offer no Edit.
6. **View profile.** View profile opens the sender's profile card in the right
   panel in one click; Back returns to the sender's user info.
7. **Untrusted content.** Card content from the timeline renders only as escaped
   text; a link that is not http(s) is dropped; content that does not validate
   shows as Element's plain message body instead of a card.

## Scope

`modules/poda-navigation-spike` (Create post), `modules/poda-profile-spike`
(dialog, Share buttons, card), and the Poda host extensions
`extras.openUserProfilePanel`, `extras.sendRoomMessage` and
`extras.getPostableRooms`, in a local build with a local Synapse, as changed by
[D-000028](situation/decisions/D-000028-share-cards.md) and
[D-000030](situation/decisions/D-000030-share-entry-points.md).

## Oracle

[O-000027](situation/oracles/O-000027-share-cards-create-post.md)

## State evidence

- [D-000030](situation/decisions/D-000030-share-entry-points.md) selects the
  entry points and supersedes [P-000025](situation/promises/P-000025-share-cards.md);
  clauses 3–7 restate P-000025's behavior with the chat choice added.
- `implemented`: commits `a992f2df65` and `b170a08c78` on branch
  `internal/plus-and-polish`.
- `assured`: [O-000027](situation/oracles/O-000027-share-cards-create-post.md)
  passed on [W-000014](situation/witnesses/P-000027/W-000014-share-cards-create-post-local-pass.md)
  at `b170a08c78`; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Residual

Opening the shared item and cards following later edits
([G-000034](situation/gaps/G-000034-share-card-items-not-openable.md)); threads;
other clients beyond the plain-text body; hosts without the Poda extensions
(no entry points appear); and the 600 px label collapse beyond the navigation
module's presentation matrix are not assured.

## References

- [D-000028](situation/decisions/D-000028-share-cards.md)
- [D-000030](situation/decisions/D-000030-share-entry-points.md)
- [Superseded P-000025](situation/promises/P-000025-share-cards.md)

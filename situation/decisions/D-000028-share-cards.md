# Share cards for episodes, podcasts and profiles

## Status

accepted

## Date

2026-10-08

## Context

The maintainer wants members to post from a "+" pop-up in chats, choosing from
a dropdown whether to share an episode, a podcast or their profile, with extra
fields such as a scheduling link, a description and the type of post, shown as
cards in the style of the PCC native app
(`Private: cleverunicornz/yeet-code@19772b2b#applications/pcc/pcc-native/src/lib/components`,
private; its `appearances/AppearanceMiniCard.svelte`, `PodcastCard.svelte` and
`GuestCard.svelte` carry the card language: icon or avatar tile, title with a
type badge, tagline and meta, topic chips, description, a View profile action
and a labelled link action). D-000022 already made PCC native the design
source for these surfaces.

## Evidence

- Maintainer, 2026-10-08: the request above, then the answers: post types per
  item ("for podcast it should also be collabs, podcast swaps etc."); recipients
  see a snapshot with View profile and the optional link, no Open-in-Studio
  until there is a backend; cards can be posted in any room the member can post
  in.
- The exported module API offers `composer.addFileUploadOption` (an entry in
  the composer's upload menu), `openDialog`, and
  `customComponents.registerMessageRenderer`, but no way to send a message:
  `client.getRoom` returns a read-only room summary. Opening another member's
  profile card needs the right panel, which the API cannot reach either.
- Episodes, podcasts and the creator profile exist only in the module's
  session-only mock adapter (P-000018).

## Decision

- A **Share to chat** entry in the composer's upload menu opens a dialog:
  what to share (an episode, a podcast, my profile), the item, a type of post,
  an optional description and an optional link (label and http(s) URL), with
  a live card preview.
- Post types: episode — New episode, Coming soon, Looking for guests; podcast —
  Launch, Looking for guests, Looking for a co-host, Collab, Podcast swap;
  profile — Available as a guest, Looking for collaborators, Introduction.
- The post is an `m.room.message` with `msgtype` `io.poda.share`, a plain-text
  `body` for other clients, and an `io.poda.share` snapshot (version, kind,
  post type, item title, subtitle, meta, up to three topics, description,
  link). Poda renders it as a PCC-style card with View profile and the link.
- Received share content is untrusted: it is validated and bounded, rendered
  only as escaped text, links only to http(s) URLs (new tab, no referrer or
  opener), and loads no images; content that does not validate falls back to
  Element's rendering of the body. Cards cannot be edited in Poda.
- Two deliberate Poda host extensions (I-000010), beside D-000024's
  `setUserProfilePanel`: `extras.openUserProfilePanel(userId)` opens a member's
  profile card in the right panel with their user info behind it, and
  `extras.sendRoomMessage(roomId, content)` sends a module-built message that
  carries a `msgtype` and `body`.
- [P-000025](situation/promises/P-000025-share-cards.md) states the behavior,
  judged by [O-000025](situation/oracles/O-000025-share-cards.md).

## Why

The upload menu, dialog and message renderer are existing exported seams; a
standard `m.room.message` keeps other clients readable; a snapshot is the only
honest card while the data is session-only.

## Rejected alternatives

- **A custom event type** instead of a `msgtype`: other clients would show
  nothing.
- **An "Open in Studio" action**: recipients cannot open another member's
  session-only items.
- **Cover images in cards**: would load URLs chosen by the sender; deferred
  until media is served by Poda.
- **Sending through the SDK room object**: not exposed by the module API;
  reaching it would bypass the explicit extension boundary.
- **Restricting cards to private rooms or admins**: the maintainer chose any
  room the member can post in.

## Consequences

- Snapshots do not change when the item changes, and today they carry mock
  adapter data; see [G-000034](situation/gaps/G-000034-share-card-items-not-openable.md).
- The entry sits behind the composer's paperclip, which becomes a menu once a
  module adds an upload option; see
  [G-000035](situation/gaps/G-000035-share-entry-behind-paperclip.md).
- `packages/module-api` gains two alpha methods marked as Poda host
  extensions; upstream modules never call them.

## Revisit when

Episodes, podcasts and profiles have a backend (cards can link to the item and
show artwork), or the maintainer wants a different entry point.

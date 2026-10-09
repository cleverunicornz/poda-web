# Share cards start from "Create post" and Share to chat

## Status

accepted

## Date

2026-10-08

## Context

[D-000028](situation/decisions/D-000028-share-cards.md) put Share to chat in the
composer's upload menu. Reviewing it, the maintainer wanted sharing "not in
attachments but somewhere more prominent, maybe at the top … like create a
post (with a hover tooltip explaining what it does)". Of the options offered
(top-bar button, Share buttons on Studio and Profile pages, a room-header
button, a composer-bar button, a "What are you working on?" strip) the
maintainer chose the first two together ("1 and 2 is good").

## Evidence

- The maintainer's messages above, 2026-10-08.
- The top bar belongs to `modules/poda-navigation-spike`; the post dialog,
  item data and card renderer belong to `modules/poda-profile-spike`.
- The module API lists rooms (`stores.roomListStore`) but cannot tell whether
  the user may post in them.
- The share-card content, rendering and safety rules of D-000028 are unchanged.

## Decision

- The top bar ends with a **Create post** pill (a plus and the label; the
  label hides below 600 px) whose tooltip reads "Share an episode, a podcast or
  your profile as a card in one of your chats." It opens the post dialog.
- Podcast and episode pages and the user's own Profile page offer **Share to
  chat**, opening the same dialog with that item selected.
- The dialog, titled "Create a post", starts with **Post to**: the joined
  chats (not spaces) the user may post in, most recent first, defaulting to the
  chat being viewed (or last viewed). After posting, that chat opens.
- Share to chat leaves the composer's upload menu; the composer keeps Element's
  Attachment button, and D-000029's "+" trigger is dropped.
- A third Poda host extension, `extras.getPostableRooms()`, supplies the chats
  and the viewed one (I-000010).
- The two modules meet through a window event: the profile module answers
  `poda:create-post` with the dialog and marks
  `document.documentElement.dataset.podaCreatePost = "available"` (announced
  with `poda:create-post-available`); the navigation module shows the pill only
  while that mark is present.
- [P-000027](situation/promises/P-000027-share-cards-create-post.md) supersedes
  [P-000025](situation/promises/P-000025-share-cards.md), judged by
  [O-000027](situation/oracles/O-000027-share-cards-create-post.md).

## Why

The top bar is visible on every page and owned by Poda; Share buttons put the
action next to the item. A room picker is needed once posting can start away
from a chat, and only the host knows which chats accept posts.

## Rejected alternatives

- **Room-header button**: tied to the chat but easy to miss in a busy header.
- **Composer-bar button**: still at the bottom and an Element core change.
- **"What are you working on?" strip**: costs space in every chat, including
  DMs.
- **Keeping the upload-menu entry as well**: the maintainer asked to move it.
- **Listing every room and letting sends fail**: offers chats the user cannot
  post in.

## Consequences

- Posting needs the profile module and all three Poda host extensions; without
  them the pill and Share buttons do not appear.
- From Studio and Profile, "Post to" defaults to the last chat viewed.

## Revisit when

Posts need audiences other than chats, or the navigation and profile modules
merge.

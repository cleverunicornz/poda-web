# Poda Space organization for Discord-like community structure

## Status

accepted

## Date

2026-09-14

## Context

The donor structured-chat mock organized conversations into buckets:
Collaborations, PODA (AI), Founder Fieldnotes (owned podcast workspace),
Podcasts, Support, and Activity (system notifications/audit feed). The
maintainer asked for a similar organization using native Matrix Spaces,
keeping chat-only scope: a space for podcast topics (the Apple Podcasts
taxonomy), a space for support/community-made rooms, and a home for system
notifications and support chat. The first demo milestone had a single Poda
Community space holding all 23 rooms, which mixes canonical taxonomy with
community functions.

## Evidence

- Donor bucket taxonomy:
  `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/native/src/lib/structured-chat/fixtures.ts`
  (private; requires repository access) lines 1395-1460 define the six buckets
  with labels and helpers.
- The 19 topic room slugs derive from the Apple Podcasts category taxonomy,
  the same taxonomy mirrored by the donor's podcast topics list.
- Element renders top-level Spaces in the rail, subspaces in the hierarchy
  tree, per-child `suggested` markers, and always-visible Join/View actions
  (Poda-scoped presentation). Measured in the four-space demo: rail shows all
  four spaces; Topics landing lists 19 rooms; Support landing lists
  Announcements (Suggested) and Support Chat.
- Restricted join with space-membership allow verified live: the demo user
  joined `#arts:localhost` with no invite after joining only the Podcast
  Topics space. Read-only enforcement verified live: a regular-user post to
  Announcements was rejected with `M_FORBIDDEN`, and the rendered composer
  shows the native "You do not have permission to post to this room" state.

## Decision

Organize Poda chat into four top-level Spaces, all native Matrix state:

1. **Poda Community** — General (auto-joined at onboarding, suggested),
   Podcasting Equipment, Last Minute Guest Posts, Last Minute Host Posts
   (suggested). The community-function space.
2. **Podcast Topics** — the 19 Apple Podcasts category rooms, canonical and
   staff-owned. No suggested marking; the full list is the browsing surface.
3. **Podcast Communities** — community-made rooms, added by staff curation
   when members create them. Starts empty by design.
4. **Poda Support** — Announcements (read-only via `events_default: 50`,
   suggested) and Support Chat.

Every child room uses `join_rule: restricted` with `allow:
m.room_membership` in its parent Space, so joining a Space once makes every
child room joinable without an invite — the Discord-like
"join server, click any channel" flow. Onboarding still auto-joins only the
Community space and General; all other rooms remain one-click opt-in.

## Why

Top-level Spaces reproduce the donor's bucket rail exactly (one rail icon per
bucket) and match how Element presents Spaces natively. Restricted-to-space
join rules keep rooms closed to outsiders while removing invitation friction
for members. Read-only Announcements uses Matrix power levels, so the
read-only composer and permission errors are Element's own behavior, not a
Poda invention. All of this is Matrix room state — zero client behavior
change, fully inside I-000003.

## Rejected alternatives

- Subspaces under one root Space: rejected. Subspaces render only inside the
  hierarchy tree, not as rail icons, which hides the taxonomy the maintainer
  asked to see. Top-level Spaces match the donor's bucket rail.
- Open `m.space.child` state power level so any member can add rooms to
  Podcast Communities: rejected. Spam/moderation risk; staff curation is the
  safe native path.
- A custom system-notification feed or bot posting to Announcements: deferred.
  The room is native; a posting bot is server-side future work, not this
  slice.
- Forum-channel-style rooms (Discord forums): not built. Matrix has threads
  but no forum index view; out of boundary for this migration.

## Consequences

- The demo homeserver carries this structure; production requires the same
  provisioning on the real homeserver (a provisioning script/endpoint is
  future work, likely alongside onboarding).
- Podcast Topics, Podcast Communities, and Poda Support currently show native
  letter avatars; distinct per-space artwork needs maintainer-approved assets
  before use. The Poda mark stays on Poda Community.
- The donor's Activity bucket (system notifications/audit feed) is approximated
  by read-only Announcements; a real notification bot remains future work.
- [G-000002](situation/gaps/G-000002-poda-visual-acceptance-contract.md)
  remains open: the four-space render evidence is unapproved.

## Revisit when

The maintainer wants subspaces/categories instead of rail-level spaces, native
forum channels become available, or a system-notification bot is provisioned.

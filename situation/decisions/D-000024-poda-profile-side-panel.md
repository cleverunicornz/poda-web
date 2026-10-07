# Profile in the right panel and one-click room widgets

## Status

accepted

## Date

2026-10-07

## Context

After the chat-control walk-through ([D-000023](situation/decisions/D-000023-poda-chat-controls.md)),
the maintainer asked for room widgets (Extensions) to sit at the top and be
reachable in one click — "if I have a widget for viewing profiles I want to
reach it in one click" — and for a click on someone's profile to open that
person's profile "in the side tab". Element's user info panel offers no
module seam, and the module API has no way to place module content in the
right panel.

## Evidence

- Maintainer request and selection on 2026-10-07: "View profile" opens the
  full Poda profile in the side panel, in every room and direct message, with
  no per-room setup (selected over opening a room widget focused on the user).
- `packages/module-api/src/api/` exposes room header buttons
  (`extras.addRoomHeaderButtonCallback`) and widget container moves
  (`widget.moveAppToContainer`) but nothing for the user info panel or the
  right panel.
- `modules/widget-toggles/src/index.tsx` already adds a room header toggle per
  configured widget type that pins the widget in the room's top container.
- `apps/web/src/components/views/right_panel/RoomSummaryCardView.tsx` lists
  Extensions below People, Pinned messages and Files.

## Decision

- **One-click widgets.** The Poda profile widget is registered with its own
  type, `io.poda.profile`; deployments enable the existing `widget-toggles`
  module for that type, so the room header carries a button that pins the
  widget above the timeline and unpins it. No new header code.
- **Extensions first.** Extensions is the first item of the room info panel.
- **Profile in the right panel.** A deliberate host extension: the module API
  gains an alpha `extras.setUserProfilePanel(renderer)` with
  `UserProfilePanelProps { userId, displayName?, roomId? }`. While a renderer
  is set, the user info panel offers **View profile** first; it opens a new
  `UserProfile` right panel card whose frame, back/close navigation and error
  containment belong to the host and whose content is the module's.
- **Module content.** `modules/poda-profile-spike` renders the shared profile
  view there, compact and read-only: the signed-in user's creator fields from
  its session adapter (which the Profile page now also uses, so edits agree),
  or another member's Matrix identity with empty sections and no status badge.
  Data stays mock/session-only.

## Why

The header toggle already exists as a supported, tested module, so reusing it
keeps one-click access inside exported contracts (I-000010). Placing module
content in the right panel and adding an action to Element's user info panel
have no exported seam, so I-000010 calls for a deliberately defined host
extension: one narrow, alpha, typed method plus one card, rather than DOM
changes from a module. The shared profile view keeps one domain view across
page, widget and panel (I-000006, I-000012).

## Rejected alternatives

- Open the room's profile widget focused on the member: rejected by the
  maintainer; it only works where an admin has added the widget.
- Navigate to the full Profile page instead of the side panel: rejected; the
  maintainer asked for the side tab.
- An untyped method only on Element's implementation: rejected; a hidden
  contract between host and module is harder to review than a declared alpha
  method.
- A new Poda-specific header button inside the profile module: rejected; the
  widget-toggles module already provides it.

## Consequences

- P-000021 states the observable behavior; O-000021 judges it.
- The fork's `@element-hq/element-web-module-api` diverges from upstream by
  one alpha method and two types; an upstream sync must carry them or replace
  them with an upstream seam.
- Profiles of other members carry no Poda creator data until a profile service
  exists (G-000004, G-000005).
- `widget-toggles` must be built, listed in `modules` and configured for
  `io.poda.profile` in each deployment's `config.json`.

## Revisit when

A Poda profile service supplies creator data for any member, upstream Element
exposes a seam for the user info panel or right panel, or the maintainer wants
the widget opened in the right panel rather than pinned above the timeline.

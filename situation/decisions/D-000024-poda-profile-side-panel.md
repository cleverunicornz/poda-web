# Profile in the right panel and side-panel-only profile widget

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
- Maintainer review of the first implementation on 2026-10-07: "I want the
  profile widget to only open in the side panel … not in the chat"; and, after
  a room header button for it was added and it was clarified that the widget
  shows one fixed example profile while View profile shows whoever is
  clicked: "I want the header widget or header button gone".
- `packages/module-api/src/api/` exposes room header buttons
  (`extras.addRoomHeaderButtonCallback`) and widget container moves
  (`widget.moveAppToContainer`) but nothing for the user info panel or the
  right panel.
- `modules/widget-toggles/src/index.tsx` adds a room header toggle per
  configured widget type, but it pins the widget in the room's top container
  (above the timeline); the module API cannot open a widget's right panel card.
- `apps/web/src/stores/widgets/WidgetLayoutStore.ts` places each widget in the
  top, right or center container from the room layout event, the user's layout
  and pin requests.
- `apps/web/src/components/views/right_panel/RoomSummaryCardView.tsx` lists
  Extensions below People, Pinned messages and Files.

## Decision

- **Profile widget in the side panel only.** The Poda profile widget has its
  own type, `io.poda.profile`, which the host treats as side-panel-only: the
  widget layout store keeps it in the right container whatever a layout event,
  user layout or pin request says, so it is never pinned above the timeline or
  maximised; the Extensions list offers no pin for it, so members open it
  there, in the right panel. There is no room header button for it; per-person
  profiles are reached through View profile. The rule lives in
  `apps/web/src/podaWidgetPolicy.ts`.
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

The maintainer wants the widget beside the conversation, not over it. No
exported seam opens a widget's right panel card or constrains its container,
so the rule and the pin restriction are isolated host changes (I-000010).
View profile, not the widget, is the per-person entry point, so the widget
needs no header affordance. Placing module
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
- Pin the widget above the timeline with the existing `widget-toggles`
  module: implemented first and rejected by the maintainer on review; the
  widget belongs in the side panel, not in the chat.
- A room header button that opens and closes the widget's right panel card:
  implemented second and rejected by the maintainer on review; the widget
  shows a fixed example profile, and View profile already opens whoever is
  clicked.
- A header button inside the profile module plus a new module API method to
  open right panel cards: rejected for the same reason.

## Consequences

- P-000021 states the observable behavior; O-000021 judges it.
- The fork's `@element-hq/element-web-module-api` diverges from upstream by
  one alpha method and two types; an upstream sync must carry them or replace
  them with an upstream seam.
- Profiles of other members carry no Poda creator data until a profile service
  exists (G-000004, G-000005).
- Any widget of type `io.poda.profile` is side-panel-only for every member,
  regardless of room layout state set by other clients.

## Revisit when

A Poda profile service supplies creator data for any member, upstream Element
exposes a seam for the user info panel or right panel, or the maintainer wants
other widget types treated as side-panel-only.

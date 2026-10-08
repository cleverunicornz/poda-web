# "+" composer menu and chat/Studio polish

## Status

accepted

## Date

2026-10-08

## Context

After share cards the maintainer chose to change the composer trigger to a "+"
("+icon for sure", [G-000035](situation/gaps/G-000035-share-entry-behind-paperclip.md))
and to fix the recorded small issues in one pull request ("small polish good"):
[G-000019](situation/gaps/G-000019-episode-number-required-label.md),
[G-000024](situation/gaps/G-000024-placeholder-and-accent-contrast.md),
[G-000026](situation/gaps/G-000026-episode-picker-missing-new-podcast-once.md),
[G-000029](situation/gaps/G-000029-header-tooltip-contrast.md),
[G-000030](situation/gaps/G-000030-widget-first-use-approval-click.md),
[G-000031](situation/gaps/G-000031-profile-widget-handshake-warning.md) and
[G-000032](situation/gaps/G-000032-two-profile-headed-cards.md).

## Evidence

- Compound's tooltip draws `--cpd-color-text-on-solid-primary` on
  `--cpd-color-alpha-gray-1400`, the only user of that token; Poda sets the
  former to dark brown for its amber buttons, so tooltips were dark on
  near-black (`rgba(2, 4, 8, 0.9)` / `rgb(51, 34, 22)`, 2026-10-08).
- Message links take `--primary-color`, Poda's amber `#f9ba51`, on the amber
  own bubble `#ffebc7`.
- Compound's release announcement uses the amber action colour as background but
  `--cpd-color-gray-500` for its description (`rgb(205, 211, 218)` measured).
- The module API's widget lifecycle offers a preload approver; Element calls it
  before showing "Widget added by … Continue".
- The widget created `WidgetApi()` without its ID and sent content-loaded at
  once ("Not ready or unknown widget ID"); sent after the handshake, Element
  answered "not expecting ContentLoaded event if waitForIframeLoad is true".

## Decision

- **"+"**: `UploadButton` gains optional `menuIcon` and `menuLabel` for the
  menu trigger (Element's default stays the paperclip); Poda's composer passes a
  plus icon and "Attach or share". With only file upload on offer the composer
  keeps the plain Attachment button.
- **Own widget, one click**: the profile module approves preloading only for a
  widget of type `io.poda.profile` whose URL is on the app's own origin at
  `/widgets/poda-profile/` (with or without `index.html`); any other URL keeps
  Element's prompt. Approvals stay a client affordance; widget capabilities
  and identity are unchanged (I-000007).
- **Widget handshake**: the widget passes the `widgetId` and `parentUrl` origin
  Element appends to its URL, and sends no content-loaded message (Element's
  default `waitForIframeLoad`). Its page loads the built `widget.bundle.js`.
- **Titles**: the module profile card is titled "Creator profile"; Element's
  user info card keeps "Profile".
- **Contrast**: tooltips use a light amber `--cpd-color-alpha-gray-1400`
  (`#fad990`) in both Poda themes; message links use
  `--cpd-color-text-action-accent`, underlined; release announcements colour
  their description and close button with `--cpd-color-text-on-solid-primary`.
- **Episode number**: stays optional; the wizard's first readiness item is
  "Title and season", since every episode has a season (D-000025).
- **Studio routes**: every route skips rendering when a newer route has
  replaced it; G-000026 was not reproduced.
- [P-000026](situation/promises/P-000026-plus-menu-and-polish.md), judged by
  [O-000026](situation/oracles/O-000026-plus-menu-and-polish.md).

## Why

Each choice fixes the recorded concern at its source with the smallest change:
an opt-in prop instead of forking the upstream button, a token only tooltips
use, a selector scoped to message bodies, and an approver scoped to the app's
own widget copy.

## Rejected alternatives

- **Approve every `io.poda.profile` widget**: a room admin could point that
  type at any site and skip the viewer's consent.
- **Changing `--cpd-color-text-on-solid-primary`**: would break the amber
  buttons' contrast.
- **Changing `--primary-color`**: recolours brand surfaces far beyond links.
- **Making the episode number required**: trailers and bonus episodes have none.

## Consequences

- `packages/shared-components` `UploadButton` carries two optional props.
- Tooltips are amber in both Poda themes.
- A Studio route that loses a race renders nothing rather than stale content.

## Revisit when

The maintainer wants a different trigger, moderators with Poll access, or Poda
widgets served from another origin.

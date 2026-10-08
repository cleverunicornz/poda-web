# Group calls need a call service

## State

open

## Gap

In private rooms with three or more members Poda offers no voice call and a
disabled video call: Element places one-to-one calls only between two members,
and group calls need a call service (Element Call or Jitsi) that is not
configured. On 2026-10-08 the maintainer chose to leave this for now and to
assume Element Call when it is set up.

## Relevance

[P-000024](situation/promises/P-000024-poda-chat-controls-admin-polls.md)
clause 1 offers calls in private conversations "where Element's existing
conditions allow calls"; [D-000023](situation/decisions/D-000023-poda-chat-controls.md).

## Evidence

2026-10-08 on the workbench: in Producers (invite only) with two members the
header offered Video call and Voice call; after a third member joined it showed
only a greyed Video call (screenshots in
`situation/references/P-000026/plus-and-polish/`, e.g. `tooltip-and-links.png`).

## Impact

Small private groups cannot call until Element Call (with its server
components) is deployed and configured.

## Resolution

none

# Contextual Matrix communications oracle

## State

designed

## Judges

- [P-000003](situation/promises/P-000003-contextual-matrix-communications.md)

## Inputs

- A Poda platform account with an audience binding and at least two
  organization-local bindings on Poda-managed Matrix services.
- Matrix sync and crypto-store inventories before and after context changes.
- End-to-end Matrix and Poda workflow-card results from the exact
  pull-request head.
- Failure injection for unavailable SSO, bootstrap, sync, and target bindings.

## Pass

- Home and Profile select the audience identity, Studio selects the chosen
  organization identity, Chat retains explicit context, and binding-aware room
  links activate the required identity.
- Only one Matrix client is active, and every token, sync store, crypto store,
  and persisted session is isolated by opaque binding identifier.
- A failed switch restores the last working client and route without exposing
  target or previous binding data in the wrong context.
- Direct messages, rooms, Spaces, threads, files, encryption, search,
  notifications, settings, and Poda-enabled calls continue to operate through
  the retained Matrix client.
- A `io.poda.workflow.v1` card has a human-readable fallback, treats its event
  body as untrusted, refetches current organization state, and reauthorizes an
  action through the organization API.
- Logout clears local state for every known binding and reports any remote
  revocation that could not complete.

## Fail

- Two Matrix clients are active, storage is shared between bindings, or content
  from one identity appears under another.
- Context selection or deep-link resolution uses the wrong binding or cannot
  roll back from a failed switch.
- A retained Matrix feature regresses within the advertised Poda capability
  set.
- A workflow event alone authorizes or supplies authoritative business state.
- Logout conceals an incomplete revocation or leaves usable local credentials.

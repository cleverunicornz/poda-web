# Poda product composition

## Status

accepted

## Date

2026-09-09

## Context

Poda needs the podcast, episode, and profile product surfaces demonstrated by
the PCC native donor while retaining Element Web as the proven Matrix client.
The product must feel like one application rather than two applications placed
beside each other.

## Evidence

- Maintainer choices and the compared alternatives are retained in
  [the integration plan](situation/references/D-000002/poda-element-integration-plan.md).
- `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native`
  is the access-controlled behavioral and visual donor.
- `apps/web/` is the inherited React web client in which the integrated product
  will run.

## Decision

Build one web application on the Element Web foundation. Add a persistent Poda
shell with Home, Studio, Chat, and Profile tabs; rebuild the donor's in-scope
podcast surfaces as first-party React pages; and render the complete Matrix
client under Chat. Studio contains both Podcasts and Episodes.

## Why

This preserves the mature Matrix feature set and security boundary while
giving Poda one navigation, authentication, playback, branding, and content
experience. Rebuilding the donor behavior in the existing React application
avoids coupling the browser product to Svelte, Tauri, or a nested web client.

## Rejected alternatives

- Embedding the donor and Element as separate windows, webviews, or iframes was
  rejected because it would duplicate navigation, session state, and product
  chrome.
- Porting the Tauri bridge or the donor's transitional gateway into the browser
  was rejected because those interfaces are not the intended web boundary.
- Shipping Podcasts and Episodes as separate top-level tabs was rejected in
  favor of one Studio workspace.
- Porting the donor Collaborations screens was rejected because Matrix rooms,
  people, and direct messages provide the communication surface.
- Including Electron in this delivery was rejected; the selected target is the
  responsive web client.

## Consequences

- The Poda shell and providers compose around the existing Matrix application.
- Product routes hide Matrix navigation panels; Matrix routes retain the full
  Matrix layout and existing deep-link behavior.
- The donor is a behavioral reference, not a source-code dependency.
- [P-000001](situation/promises/P-000001-poda-web-shell.md),
  [P-000002](situation/promises/P-000002-poda-podcast-product.md), and
  [P-000003](situation/promises/P-000003-contextual-matrix-communications.md)
  state the resulting intended behavior.

## Revisit when

The selected product ceases to need Matrix communication or a separately
deployed product surface can demonstrably provide one coherent session,
navigation, accessibility, and playback experience without duplication.

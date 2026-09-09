# Configuration-backed Poda theme

## Status

accepted

## Date

2026-09-09

## Context

The maintainer authorized implementation of the visual-alignment plan after
restricting the migration to capabilities Element Web and Matrix already
provide. C-000001 still required choices about theme delivery, light/dark
behavior, geometry, artwork placement, surface coverage, and message layout.

## Evidence

- [C-000001](situation/candidates/C-000001-element-native-poda-skin.md)
  identifies Element's configuration, custom-theme, Compound-token, and
  presentation hooks as the smallest viable fork boundary.
- `apps/web/src/SdkConfig.ts`, `apps/web/src/theme.ts`, and
  `apps/web/src/settings/watchers/ThemeWatcher.ts` show that default
  configuration can provide custom themes, while operating-system selection
  needs an explicit mapping to keep a paired custom light/dark family.
- `apps/web/src/components/views/auth/AuthPage.tsx`,
  `apps/web/src/components/views/auth/DefaultWelcome.tsx`, and
  `apps/web/src/components/structures/HomePage.tsx` already expose the native
  background and logo slots needed for the admitted artwork.
- [D-000008](situation/decisions/D-000008-poda-brand-source-assets.md)
  establishes the source artwork and palette.
- [The visual-alignment plan](situation/references/D-000007/poda-element-visual-alignment-plan.md)
  retains the donor assessment and the maintainer's selected capability
  boundary.

## Decision

Promote C-000001 and implement Poda as two config-backed custom themes named
`Poda Light` and `Poda Dark`. Make Poda Light the fork default, map operating-
system light/dark preference onto the Poda pair when the configured default is
a Poda theme, and keep Element's existing light, dark, and light high-contrast
themes selectable. When increased contrast is requested for Poda Light, use
Element's native light high-contrast theme until a separately accepted Poda
high-contrast contract exists.

Apply the admitted character-and-microphone mark and landscape only through
existing logo, favicon/manifest, authentication-background, welcome, and home
branding slots. Generate runtime vectors reproducibly from the retained masters
with editor metadata and unsafe/external content rejected. Retain but do not
ship the girls-podcasting-by-lantern illustration in this slice.

Use semantic Compound tokens and existing legacy custom-theme variables across
the reachable client. Preserve current panel dimensions, resizers, responsive
collapse behavior, and each user's modern, compact, or bubble message-layout
selection.

## Why

Element's custom-theme machinery already applies separate light/dark base
styles and supports semantic Compound overrides without duplicating the full
upstream theme stylesheets. A small system-preference mapping closes the only
functional gap in a paired config-backed theme. Existing branding slots admit
the supplied artwork without a new route, component state owner, or Matrix
operation.

## Rejected alternatives

- A second application shell or new tab structure remains rejected because it
  changes information architecture and exceeds D-000007.
- Standalone built-in Poda CSS entry points are rejected for this slice because
  they duplicate more upstream theme assembly than config-backed custom themes.
- A light-only or dark-only theme is rejected because the client already
  supports both system states and the palette supplies viable values for each.
- Exact donor rail and panel widths are rejected because Element's existing
  responsive geometry already has the intended composition.
- Forcing one message layout is rejected because it would override a current
  user preference.
- Shipping every supplied illustration is rejected because the lantern scene
  has no approved responsive placement in the existing interface.

## Consequences

- [C-000001](situation/candidates/C-000001-element-native-poda-skin.md) is
  promoted into [P-000007](situation/promises/P-000007-poda-theme-delivery.md),
  judged by [O-000007](situation/oracles/O-000007-poda-theme-delivery.md).
- [P-000006](situation/promises/P-000006-poda-element-visual-alignment.md)
  remains the broader visual-and-behavior promise; P-000007 isolates the
  concrete theme/bootstrap slice being implemented now.
- Existing deployment configuration may override the Poda default and branding
  through the same Element configuration fields; no new configuration schema
  is introduced.
- Full public redistribution rights, a Poda-specific high-contrast theme, and
  final screenshot acceptance remain unresolved boundaries.

## Revisit when

Visual evidence shows the custom-theme hooks cannot express an approved state,
the maintainer requests Poda-only theme exposure or different geometry, or a
Poda-specific high-contrast contract is accepted.

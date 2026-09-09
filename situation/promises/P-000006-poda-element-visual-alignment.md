# Poda Element visual alignment

## State

implementing

## Promise

The responsive web client presents Element's existing interface in the
approved Poda visual language while Space selection, room filtering and
selection, direct and room messaging, replies, editing, reactions, Matrix
threads, search, notifications, member information, right-panel navigation,
settings, and deep links retain their existing Element/Matrix routes,
permissions, operations, and user-observable state transitions.

## Scope

The promise covers the browser client's authentication and welcome surfaces,
Space rail, room list and filters, room header, timeline, composer, right panel,
notifications, member/profile views, settings, dialogs, light and dark visual
modes, and responsive states in `apps/web/` and their shared presentation
components.

## Oracle

- [O-000006](situation/oracles/O-000006-poda-element-visual-alignment.md)

## State evidence

- [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)
  selects the presentation-only, Element-native boundary.
- [D-000008](situation/decisions/D-000008-poda-brand-source-assets.md) admits
  the Poda source artwork and palette without selecting runtime placement or
  establishing implementation evidence.
- [D-000009](situation/decisions/D-000009-configuration-backed-poda-theme.md)
  selects the paired theme, branding-slot, geometry, and message-layout choices.
- Commit `7329320de0` implements the configuration-backed visual treatment and
  runtime assets without adding a route or Matrix behavior.
- Commit `8b5da14300` aligns the affected inherited Element unit contracts and
  rendered snapshots with the selected Poda defaults without changing a
  production path.
- The maintainer's first authenticated rendered review at commit `3c9dfbeeff`
  rejected the theme-only result as insufficiently distinct from stock Element;
  [D-000010](situation/decisions/D-000010-poda-native-surface-treatment.md)
  selects the corrective native-surface presentation work.
- Exact-head visual, accessibility, and retained CI behavior assurance remains
  pending.

## Residual

Podcast, episode, PODA/AI, collaboration workflow, artifact, organization,
publication, playback, new identity-context, new API, new Matrix event type,
new route, and Electron-specific behavior are outside this promise. Full
repository-internal renaming and legally required upstream attribution also
remain outside it.

## References

- [Poda Element visual alignment plan](situation/references/D-000007/poda-element-visual-alignment-plan.md)

# Poda tab shell with module pages over mock data

## State

hypothesis

## Promise

Poda Web presents a persistent tab bar with Chat, Studio, Profile, and
Settings tabs. Chat is the unmodified native Element chat experience. Studio
(podcasts, episodes, analytics), Profile (own profile view/edit), and a
creators directory are Poda module pages fed exclusively by a typed in-memory
mock adapter implementing `PodaDataAdapter`, with working in-session edits.
Settings opens Element's native settings screens.

## Scope

The `PodaTabBar` fork component, one chrome-suppression conditional in
`LoggedInView.tsx`, the `modules/poda/` module package (renderers, data
contract, mock adapter, fixtures, Studio/Profile/Creators pages), and their
Poda-scoped styles, verified in Poda Light and Poda Dark at desktop and narrow
widths.

## Oracle

[O-000008](situation/oracles/O-000008-poda-tab-shell.md)

## State evidence

- [D-000013](situation/decisions/D-000013-poda-tab-shell-scope.md) selects the
  approach and records the mechanism evidence.
- [Plan document](situation/references/D-000013/poda-tab-shell-plan.md).

## Residual

This promise does not assure: any backend or persistence, Podcasting 2.0 feed
serialization or publishing, real analytics, fields beyond the plan's listed
subset, public/SEO pages, or Chat behavior beyond remaining native (assured
only by unchanged existing suites).

## References

- [situation/references/D-000013/poda-tab-shell-plan.md](situation/references/D-000013/poda-tab-shell-plan.md)

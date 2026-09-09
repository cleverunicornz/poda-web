# Poda podcast product

## State

withdrawn

## Promise

Authorized listeners, guests, creators, members, administrators, and owners can
use the web client to discover and play Poda content, maintain personal guest
profiles, and perform their permitted podcast and episode authoring workflows,
including current Podcast Namespace fields, revisioned drafts, media upload,
AI and transcription review, preview, scheduling, and publication.

## Scope

The promise covers authenticated Home, catalog, Profile, and Studio behavior in
`apps/web/`, the role and assignment behavior expressed by the web contract,
and the Podcast Namespace 1.0 revision pinned by the owning plan.

## Oracle

- [O-000002](situation/oracles/O-000002-poda-podcast-product.md)

## State evidence

- [D-000002](situation/decisions/D-000002-poda-product-composition.md) selects
  the donor-derived product behavior.
- [D-000006](situation/decisions/D-000006-public-publication-boundary.md)
  selects the authenticated/public division.
- [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)
  removes podcast product behavior from this migration.
- No implementation or run evidence exists.

## Residual

Billing checkout, analytics dashboards, the donor Collaborations screens,
canonical public-page rendering, backend implementation, Electron, and Tauri
are outside this promise.

## References

- [Poda and Element integration plan](situation/references/D-000002/poda-element-integration-plan.md)

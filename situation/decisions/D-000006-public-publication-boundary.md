# Public publication boundary

## Status

superseded

## Superseded by

- [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)

## Date

2026-09-09

## Context

Poda needs authenticated authoring and previews as well as canonical public
profile, podcast, and episode pages. The public pages are already assigned to
a separate publication system.

## Evidence

- The maintainer selected authenticated SPA previews and external canonical
  links rather than moving public-page ownership into this client, as retained
  in [the integration plan](situation/references/D-000002/poda-element-integration-plan.md).
- `Private: cleverunicornz/matrix-coordinator@5797be35ddb0451eba49a327cb1fe70b5d44ba0a#situation/decisions/D-000003-fenced-route-publication.md`
  (private; requires repository access) assigns public route publication to a
  fenced publication boundary.

## Decision

Keep canonical unauthenticated profile, podcast, and episode pages in the
external public-page builder. Poda Web owns authenticated editing, preview,
internal detail views, and links to the canonical published URL.

## Why

This preserves one canonical public route owner while allowing the application
to provide complete internal workflows and accurate previews.

## Rejected alternatives

- Serving canonical public pages from the authenticated SPA was rejected
  because it duplicates route ownership and weakens the publication boundary.
- Omitting previews from the SPA was rejected because creators need to inspect
  output before publication.

## Consequences

- API representations include canonical public URLs and preview data.
- Preview never claims that external publication succeeded.
- Public-page implementation and deployment remain outside this repository.

## Revisit when

The external publication owner is deliberately replaced through a superseding
cross-repository decision.

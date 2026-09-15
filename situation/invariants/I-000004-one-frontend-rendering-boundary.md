# One frontend rendering boundary

## Priority

critical

## Invariant

Poda Web's public and member web surfaces belong to one coordinated frontend workspace and delivery boundary: Astro owns designated public-page generation, while the Element-derived member runtime owns member navigation and application lifecycle.

## Basis

- [D-000015](situation/decisions/D-000015-public-and-member-rendering-ownership.md)

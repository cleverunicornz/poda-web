# Poda product branding

## Status

accepted

## Date

2026-09-09

## Context

The inherited web client presents Element names, marks, colors, metadata,
links, defaults, and service references throughout the shipped experience.
The integrated product must be presented as Poda without obscuring upstream
license provenance.

## Evidence

- The maintainer selected the orange microphone identity and complete
  user-facing Poda branding, as retained in
  [the integration plan](situation/references/D-000002/poda-element-integration-plan.md).
- https://element.io/en/legal/trademark-policy directs modified open-source
  products to use a distinct brand.
- The upstream license files retain the terms that the fork must honor:
  https://github.com/element-hq/element-web/blob/develop/LICENSE-AGPL-3.0,
  https://github.com/element-hq/element-web/blob/develop/LICENSE-GPL-3.0, and
  https://github.com/element-hq/element-web/blob/develop/LICENSE-COMMERCIAL.

## Decision

Replace Element branding throughout every shipped and user-facing product
surface with Poda branding. Preserve legally required copyright, license, and
SPDX notices and retain internal technical identifiers where they are not
exposed as product branding. Do not perform a repository-wide internal rename.

## Why

Product-surface rebranding creates a coherent Poda experience and respects the
upstream trademark boundary without spending substantial risk on renaming
internal modules that users never see.

## Rejected alternatives

- Retaining mixed Element and Poda product branding was rejected because it
  creates affiliation confusion and an incoherent experience.
- Renaming every source namespace, package, database key, and internal symbol
  was rejected because it adds migration risk without improving the visible
  product.
- Using the blue/yellow linked mark was rejected in favor of the selected
  orange microphone identity.

## Consequences

- Branding work covers rendered strings, all locales, themes, icons, metadata,
  manifests, authentication and error screens, settings/help/about links,
  service defaults, analytics and diagnostic endpoints, and mobile promotion.
- Automated checks must distinguish allowed legal attribution and invisible
  upstream identifiers from prohibited user-facing branding.
- Branding follows the responsive web product; no Electron rebrand is included.

## Revisit when

The product identity changes or upstream license and trademark requirements
change.

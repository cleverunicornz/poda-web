# Poda brand source assets

## Status

accepted

## Date

2026-09-09

## Context

The visual-first migration needs a stable Poda palette and artwork source. The
structured-chat donor contains only mock branding and does not establish an
authoritative reusable mark. The maintainer subsequently supplied three vector
masters plus three raster render references for this migration.

## Evidence

- [The source asset manifest](situation/references/D-000008/brand-source-asset-manifest.md)
  records the repository copies, original names, dimensions, byte sizes,
  SHA-256 digests, source scan, palette, and intended handling.
- [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)
  limits the migration to presentation of existing Element/Matrix behavior.
- [G-000002](situation/gaps/G-000002-poda-visual-acceptance-contract.md)
  identified the absence of an approved, provenance-known Poda source set.

## Decision

Admit the six user-supplied files retained under
`situation/references/D-000008/assets/` as the authoritative Poda source set for
this migration. Use their warm gold, orange, brown, mint, and teal families as
input to the visual contract. Preserve these files as provenance references;
derive optimized runtime logo, icon, and illustration variants separately once
their exact Element branding slots, crops, dimensions, contrast treatment, and
distribution status are approved.

The artwork is presentation material only. Its admission does not authorize a
new route, tab, podcast action, event type, state owner, or non-native Matrix
capability.

## Why

The supplied vectors provide editable masters and the supplied rasters retain
the maintainer's intended rendered appearance at representative sizes. Keeping
the originals outside runtime asset paths avoids silently treating large
editor-source SVGs as production-ready, while their digests give every future
derivative a reproducible provenance chain.

## Rejected alternatives

- The donor mock's letter mark and generated Tauri icons are rejected as brand
  authority because they were assessment placeholders.
- Extracting a logo or palette only from a screenshot is rejected because the
  supplied vectors are higher-authority source material.
- Shipping the retained editor-source SVGs directly is rejected as the default
  because they contain Inkscape metadata and have not yet been optimized,
  sized, visually accepted, or exercised in Element's runtime contexts.
- Inventing replacement artwork or extending the illustrations into new
  product affordances is rejected because neither is required for visual
  alignment.

## Consequences

- The asset-authority question in
  [C-000001](situation/candidates/C-000001-element-native-poda-skin.md) is
  resolved; placement and derivative choices remain in qualification.
- [G-000002](situation/gaps/G-000002-poda-visual-acceptance-contract.md) remains
  `addressing` because semantic token mapping, reference frames, viewports, and
  exact artwork placement are not yet approved.
- Runtime derivatives must cite a source path and digest from the manifest and
  pass [O-000006](situation/oracles/O-000006-poda-element-visual-alignment.md).
- The maintainer's instruction establishes use in this migration; this record
  makes no broader claim about public relicensing or third-party attribution.

## Revisit when

The maintainer supplies a superseding brand master, selects different artwork,
or establishes a distribution or attribution requirement that changes how the
source set may be shipped.

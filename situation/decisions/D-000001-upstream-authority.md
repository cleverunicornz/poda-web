# Upstream authority

## Status

accepted

## Date

2026-09-07

## Context

Poda Web's first Bedrock closure must identify whether the inherited Element Web material is owned by this fork or remains subject to an upstream authority.

## Evidence

- https://api.github.com/repos/cleverunicornz/poda-web identifies `element-hq/element-web` as this repository's public parent.
- `b53af60d7e2ae8c9021e94dd628d478dbc65c37e:package.json` declares `https://github.com/element-hq/element-web` as the package repository.

## Decision

Poda Web is an `UPSTREAM_FORK` of https://github.com/element-hq/element-web.

## Why

The public parent relationship and retained package metadata agree on Element Web as the external authority for the inherited source tree.

## Rejected alternatives

- Treating the inherited Element Web tree as `OWNED` was rejected because the public fork metadata and retained package repository coordinate identify an external parent.
- Synchronizing with or contributing to the upstream during this closure was rejected because those are separate operations governed by the root organization block.

## Consequences

- Fork records cite the public upstream coordinate.
- [I-000001](situation/invariants/I-000001-upstream-authority-boundary.md) preserves the Bedrock boundary around upstream-owned material.

## Revisit when

Public repository metadata identifies a different upstream authority or the fork is explicitly detached by its maintainer.

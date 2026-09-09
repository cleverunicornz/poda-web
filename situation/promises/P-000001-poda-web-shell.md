# Poda web shell

## State

hypothesis

## Promise

The authenticated web client presents one responsive, Poda-branded application
with persistent Home, Studio, Chat, and Profile navigation, stable product and
Matrix deep links, and podcast playback that persists across ordinary route
changes.

## Scope

The promise covers user-visible web routes, navigation, themes, metadata,
locales, responsive layouts, and the global podcast player in `apps/web/`.

## Oracle

- [O-000001](situation/oracles/O-000001-poda-web-shell.md)

## State evidence

- [D-000002](situation/decisions/D-000002-poda-product-composition.md) selects
  the unified shell.
- [D-000005](situation/decisions/D-000005-poda-product-branding.md) selects the
  product-surface branding boundary.
- No implementation or run evidence exists yet.

## Residual

Electron, native packaging, internal upstream symbol renaming, legally required
attribution, and canonical unauthenticated public pages are outside this
promise.

## References

- [Poda and Element integration plan](situation/references/D-000002/poda-element-integration-plan.md)

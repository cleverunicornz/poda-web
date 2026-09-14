# Inherited workflows stay disabled

## Priority

standard

## Invariant

Workflows inherited from upstream remain disabled at repository settings level; pull requests into either trunk rely on fork-owned checks or cited upstream vetting evidence. Fork-owned workflows use the `poda-` filename prefix and fleet logical runner labels.

## Basis

- [D-000002](situation/decisions/D-000002-disable-inherited-workflows.md)

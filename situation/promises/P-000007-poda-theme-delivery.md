# Poda theme delivery

## State

implemented

## Promise

With the fork's default configuration, the browser client identifies as Poda,
uses the admitted Poda mark and landscape in existing branding surfaces, and
presents a Poda Light or Poda Dark treatment that follows the operating-system
light/dark preference while retaining explicit selection of Element's existing
themes. Existing Matrix-backed routes, controls, permissions, and state
transitions remain unchanged.

## Scope

The promise covers configuration defaults, custom-theme definitions, system
theme selection, authentication/welcome/home branding, browser metadata and
web-app manifest presentation, reproducibly derived web brand assets, and the
tests and boundary audit for those changes in `apps/web/`.

## Oracle

- [O-000007](situation/oracles/O-000007-poda-theme-delivery.md)

## State evidence

- [D-000009](situation/decisions/D-000009-configuration-backed-poda-theme.md)
  promotes C-000001 and selects the implementation route.
- Commit `7329320de0` implements the paired custom themes, system-preference
  mapping, default branding, deterministic runtime assets, executable checks,
  focused tests, and production-build dependency.
- [O-000007](situation/oracles/O-000007-poda-theme-delivery.md) is implemented;
  exact-head assurance and retained Witness evidence remain pending.

## Residual

This promise does not assure a Poda-specific high-contrast theme, final
screenshot fidelity for every P-000006 surface, Electron executable branding,
full replacement of Element-owned help/legal/service links, the unplaced
lantern illustration, or public redistribution rights. It introduces no
podcast, episode, PODA/AI, collaboration, artifact, publication, API, or custom
Matrix behavior.

## References

- [Poda Element visual-alignment plan](situation/references/D-000007/poda-element-visual-alignment-plan.md)
- [Poda brand source manifest](situation/references/D-000008/brand-source-asset-manifest.md)

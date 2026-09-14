# Poda theme delivery oracle

## State

implemented

## Judges

- [P-000007](situation/promises/P-000007-poda-theme-delivery.md)

## Inputs

- The exact candidate commit and production web build.
- Effective default and operator-overridden `SdkConfig` results.
- Theme-definition, theme-enumeration, system-preference, explicit-selection,
  and theme-application unit results.
- The source assets and digests in
  [D-000008's manifest](situation/references/D-000008/brand-source-asset-manifest.md),
  the deterministic derivation command, and runtime asset digests.
- Rendered authentication, welcome, home, and theme-selection settings in Poda
  Light and Poda Dark.
- Accessibility results for text/action contrast, keyboard focus, zoom,
  accessible image names, and prefers-contrast fallback.
- A diff and bundle audit covering routes, dependencies, network destinations,
  persistence keys, Matrix event types, stores, view-model actions, and donor
  runtime imports.

## Pass

- P1: Default configuration resolves to brand `Poda`, the admitted logo and
  landscape paths, and `custom-Poda Light`; explicit operator configuration
  continues to override those fields through the existing schema.
- P2: `Poda Light` and `Poda Dark` enumerate and apply through Element's custom-
  theme stylesheets; implicit/explicit system light and dark select the matching
  Poda theme when the configured default belongs to that family, while explicit
  theme selection still wins.
- P3: Increased contrast on system-light Poda configuration selects Element's
  existing light high-contrast fallback, and both Poda themes retain readable
  computed text, control, focus, selected, unread, and status states.
- P4: Runtime brand vectors reproduce deterministically from D-000008 sources,
  retain viewBox/aspect ratio and visible geometry, and contain no editor
  namespace/content, script, event handler, embedded raster, data URI, or
  external resource reference.
- P5: Authentication, welcome, home, favicon/browser metadata, and web-app
  manifest use the approved Poda branding without obscuring or adding a control.
- P6: Within this Promise's Scope, Poda Light and Poda Dark apply their selected
  semantic treatment to theme and branding surfaces without obscuring a control
  or accessible name.
- P7: The production build and relevant existing tests pass, and the diff/bundle
  adds no route, network destination, persistence key, Matrix event type,
  business model, behavior dependency, donor runtime code, or change to a
  Matrix-backed operation.

## Fail

- F1: Any P1-P7 condition is contradicted, a Poda default cannot load, an
  operator override is displaced, or a Poda presentation change alters an
  existing route, permission, Matrix action, or user-observable state
  transition.

## Implementation

- `apps/web/src/podaTheme.test.ts` performs source-level theme-definition and
  `getPodaThemeClasses` mapping checks: paired definitions, locally bundled font
  selection, valid Compound-property names, core contrast pairs, preserved
  success/critical semantics, and runtime presentation variables. It does not
  exercise `apps/web/src/theme.ts`'s DOM application path.
- `apps/web/src/SdkConfig.test.ts` checks the fork defaults and existing
  operator-override merge behavior.
- `apps/web/src/settings/watchers/ThemeWatcher.test.ts` checks system light,
  dark, and increased-contrast selection for the Poda family.
- `apps/web/src/components/views/auth/AuthHeaderLogo.test.tsx` checks the
  configured logo and accessible Poda name.
- `node apps/web/scripts/derive-poda-brand-assets.mjs --check` decides whether
  the committed runtime assets reproduce from the admitted sources and satisfy
  the declared SVG-content boundary.
- `node apps/web/scripts/check-poda-branding.mjs` performs source-shape checks
  on the default deployment configs, browser metadata, manifest, runtime asset
  references, expected native-surface strings, and a literal
  `body.mx_PodaTheme` stylesheet marker; it does not decide full stylesheet
  scoping. The broader native-surface selector matrix is judged by
  [O-000006](situation/oracles/O-000006-poda-element-visual-alignment.md).
- `apps/web/res/css/structures/_PodaTheme.pcss` is the Poda presentation
  stylesheet. Full stylesheet scoping and DOM-applied/rendered treatment through
  `apps/web/src/theme.ts` remain manual.
- The `element-web:poda:check` target runs both Node checks, and
  `element-web:build` depends on that target before producing the distribution.

## Implementation coverage

| Leg | Decision                                                           | Coverage                                                                                                                                                              |
| --- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | Defaults and existing override behavior are correct                | `apps/web/src/SdkConfig.test.ts`; `apps/web/scripts/check-poda-branding.mjs`                                                                                          |
| P2  | Theme definition and preference mapping are correct; enumeration and stylesheet application remain manual | `apps/web/src/podaTheme.test.ts` (theme-definition and class-mapping source checks); `apps/web/src/settings/watchers/ThemeWatcher.test.ts` (preference-selection checks); full stylesheet scoping and DOM-applied/rendered treatment remain manual |
| P3  | Contrast fallback and rendered accessible states pass              | `apps/web/src/podaTheme.test.ts`; `apps/web/src/settings/watchers/ThemeWatcher.test.ts`; exhaustive computed and rendered states remain manual                        |
| P4  | Runtime assets are deterministic, sanitized derivatives            | `apps/web/scripts/derive-poda-brand-assets.mjs --check`                                                                                                               |
| P5  | Existing browser and in-app brand slots use Poda assets            | `apps/web/scripts/check-poda-branding.mjs`; `apps/web/src/components/views/auth/AuthHeaderLogo.test.tsx`; unobscured rendered placement remains manual                |
| P6  | Source-level theme definition and stylesheet-shape checks are correct; full scope and applied treatment remain manual | `apps/web/src/podaTheme.test.ts` (theme-definition and class-mapping source checks); `apps/web/scripts/check-poda-branding.mjs` (expected-surface strings and literal body-marker source-shape checks); full stylesheet scoping and DOM-applied/rendered treatment, including controls and accessible names, remain manual |
| P7  | Build/regressions pass and no capability boundary changes          | `element-web:build`, focused tests, and affected inherited unit contracts/snapshots; exact-head CI and diff/bundle audit remain manual until retained evidence exists |
| F1  | Any Pass-leg contradiction fails the Oracle                        | the named checks fail on their decidable contradictions; route, permission, Matrix-operation, and state-transition review remains manual                              |

# Member navigation header with Chat, Profile and Studio

## State

assured

## Promise

Within Scope:

1. **Mount.** The navigation module renders the Poda member header as a sibling
   immediately above the Element application root; header and application
   together fill the page height.
2. **Links.** The header offers exactly three links, Chat (`#/home`), Profile
   and Studio, and no Diagnostic workspace link. The navigation module
   registers no location of its own, and the former diagnostic address
   `#/io.poda.navigation-spike.diagnostic` renders no diagnostic page.
3. **Same-document navigation.** Studio → refresh → Chat (Home) → Back →
   Forward works as follows: refresh restores Studio; from there Chat, Back
   (Studio) and Forward (Home) all stay in the same document; at every step
   only the control matching the rendered destination is current and the
   signed-in Matrix user is unchanged.
4. **Hash echo.** An application-owned hash write suppresses only its
   corresponding browser hash echo; after an intervening external hash change
   is routed, a later external change back to the formerly application-set
   hash is routed normally.
5. **Presentation.** In Poda Light and Poda Dark at 1440 × 900 and 500 × 900,
   the header and Studio are visible, the document has no horizontal
   overflow, header and application fill the page height, and the header's
   background differs between the themes.
6. **Boundary.** The behavior uses the exported Module API (`rootNode`,
   `createRoot` and the location renderers the profile module registers) and
   Element's existing router; it adds no second router or Matrix client and no
   public Module API or stable configuration change.

## Scope

A local production build of `apps/web` with `@poda/web-module-navigation-spike`
and `@poda/web-module-profile-spike` loaded as runtime modules, against a
local Synapse (the Playwright homeserver fixture, and a long-lived local
Synapse for the manual observation), in headless Chrome for Testing. The
Witness names the exact head, module digests, browser and homeserver.

## Oracle

[O-000023](situation/oracles/O-000023-member-navigation-header.md)

## State evidence

- [D-000026](situation/decisions/D-000026-remove-diagnostic-navigation.md)
  selects this behavior and supersedes
  [P-000015](situation/promises/P-000015-module-navigation-mount-gate.md),
  [P-000016](situation/promises/P-000016-decision-complete-module-navigation-gate.md)
  and [P-000017](situation/promises/P-000017-seamless-module-native-return.md).
- Implemented by commit `ffb3ccf4b4`.
- [W-000008](situation/witnesses/P-000023/W-000008-member-navigation-header-local-pass.md)
  applies every O-000023 leg at exact head `ffb3ccf4b4` and passes.

## Residual

Local manual assurance only; the reusable fork assurance route is absent
([G-000001](situation/gaps/G-000001-fork-assurance-route.md)). Not assured:
navigation to the Profile location beyond the link's presence and target,
focus placement on arrival, Studio's own content (P-000018, P-000022),
Settings, signed-out transitions, room-return semantics, browsers or sizes
outside Scope, and deployment. [G-000010](situation/gaps/G-000010-module-stylesheet-host-selector-scope.md)
(the header stylesheet's host selectors) stays open. This Promise does not
dispose [C-000003](situation/candidates/C-000003-qualify-member-navigation.md).

## References

- [Decision](situation/decisions/D-000026-remove-diagnostic-navigation.md)
- [Gap closed by this work](situation/gaps/G-000028-diagnostic-link-in-member-navigation.md)
- [Explicit extension boundary](situation/invariants/I-000010-explicit-host-extension-boundaries.md)

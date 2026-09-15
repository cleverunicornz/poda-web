# Decision-complete module-owned member navigation gate

## State

assured

## Promise

Within the finite local-preview conditions in Scope:

1. Poda Web loads the existing `@poda/web-module-navigation-spike` artifact through an explicit generated preview module entry and renders its Poda member header as a sibling immediately above the Element application root, with the combined header and application inside the browser viewport.
2. The header's Chat and Diagnostic workspace controls remain operable through the declared native home → diagnostic → refresh diagnostic → Chat/home → Back → Forward sequence. Every step reaches its predeclared destination and marks only its matching control current without changing the signed-in Matrix user.
3. In Poda Light and Poda Dark at 1440 × 900 and 500 × 900, direct interaction with both header controls succeeds, the diagnostic workspace receives focus and remains readable, all named diagnostic content and the retained native rail remain visible, and the document has no horizontal overflow or obstructive layout overlap.
4. The probe remains isolated to generated preview configuration and the existing exported Module API/React boundary. It introduces no second router or Matrix client, changes no Element core source or stable Poda configuration, and disappears when the generated preview module entry is removed.

## Scope

The gate reuses the implementation recorded by [P-000015](situation/promises/P-000015-module-navigation-mount-gate.md): diagnostic location `io.poda.navigation-spike.diagnostic`, native `#/home`, and the reload-based native-screen transition retained by [G-000008](situation/gaps/G-000008-module-native-screen-transition.md). The bounded transition marks only its source and target history entries and refreshes a marked entry restored from Chromium's back-forward cache so Element's single-tab session lock can initialize that document. A Witness names the exact Git head, built module and served application/configuration digests, temporary Synapse fixture user and room, Chromium build, observation date, and all four theme/viewport cases.

Operability means direct browser activation of Diagnostic workspace, Chat, and Diagnostic workspace again succeeds in every matrix case; the matching current control, native destination, same fixture user, and focused labelled diagnostic main are observed rather than inferred from visibility. The separate declared history sequence records both destination and current-control state after Refresh, Back, and Forward.

## Oracle

[O-000016](situation/oracles/O-000016-decision-complete-module-navigation-gate.md)

## State evidence

- The maintainer's 2026-09-15 authorization covers the bounded local module-header Gate 1 and real-Chromium verification.
- P-000015 retains the implemented source and its first incomplete observation without changing that immutable record.
- [G-000011](situation/gaps/G-000011-navigation-gate-assurance-coverage.md) identifies the two missing retained decisions this Promise and Oracle explicitly require.
- O-000016 is predeclared before the new exact-head observation.
- [W-000003](situation/witnesses/P-000016/W-000003-decision-complete-module-navigation-gate-pass.md) applies every O-000016 leg at exact head `53c290b3c62f01ae95ca74893ce3c944a1b472b7` and passes.

## Residual

This gate does not select or qualify production Chat/Studio/Profile/Settings navigation, native Settings behavior, signed-out transitions, room-return semantics, call/PiP behavior, product data, persistence, assistants, widgets, deployment, browsers or viewport sizes outside Scope, or accessibility beyond the named labels, current states and focus observations. [G-000008](situation/gaps/G-000008-module-native-screen-transition.md) retains both the absence of a seamless exported native-screen transition and this gate's scoped reload requirement. [G-000010](situation/gaps/G-000010-module-stylesheet-host-selector-scope.md) retains the unresolved production ownership question for the diagnostic stylesheet's host selectors. This gate does not assure P-000008 or dispose C-000003.

## References

- [Implemented predecessor](situation/promises/P-000015-module-navigation-mount-gate.md)
- [Assurance coverage gap](situation/gaps/G-000011-navigation-gate-assurance-coverage.md)
- [Navigation qualification Candidate](situation/candidates/C-000003-qualify-member-navigation.md)
- [Explicit extension boundary](situation/invariants/I-000010-explicit-host-extension-boundaries.md)
- [Shared member workspaces](situation/invariants/I-000012-shared-member-workspaces.md)

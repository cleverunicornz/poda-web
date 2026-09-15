# Same-document return from a registered module location to native Home

## State

implementing

## Promise

Within Scope:

1. An application-owned hash write suppresses only its corresponding browser hash echo. After an intervening externally initiated hash change is routed, a later external change to the formerly application-set hash is routed normally.
2. Poda Web completes native Home → registered Diagnostic location → native Home in one document. Both controls remain operable and only the control matching the rendered destination is current, without changing the signed-in Matrix user.
3. Refresh restores the Diagnostic destination, and Back/Forward traverse the declared Home/Diagnostic/Home entries with matching rendered content and current-control state.
4. Direct Diagnostic entry with a declared query remains routable and refreshable. The module performs no full-document native return, adds no reload query marker, and installs no back-forward-cache reload handler.
5. The behavior uses the existing URL and registered-location contracts. It adds no public Module API, module-specific host route, second router or Matrix client, and no stable application configuration activation.

## Scope

The host-router behavior covers one pending application-generated hash echo followed by matching or mismatching `hashchange` events. Runtime assurance covers the generated local preview, `@poda/web-module-navigation-spike`, exact registered location `io.poda.navigation-spike.diagnostic`, native `#/home`, one declared query entry, Chrome 150 at 1440 × 900 in Poda Light, and one temporary Synapse fixture user. The Witness names the exact Git head, artifact/configuration provenance, query, user and browser.

The history sequence starts at native Home, activates Diagnostic, activates Chat/Home, goes Back to Diagnostic, and goes Forward to Home. Same-document means the JavaScript document identity retained before the first activation remains identical through those transitions; the separately requested Diagnostic refresh is expected to replace it.

## Oracle

[O-000017](situation/oracles/O-000017-seamless-module-native-return.md)

## State evidence

- [D-000020](situation/decisions/D-000020-consume-hash-suppression-once.md) promotes [C-000004](situation/candidates/C-000004-consume-hash-suppression-once.md) and authorizes the bounded implementation and qualification.
- [G-000008](situation/gaps/G-000008-module-native-screen-transition.md) retains the pre-change failure and reload-limited baseline.
- Implementation and assurance evidence are pending.

## Residual

This Promise does not select production Poda navigation; assure Studio/Profile/Settings, modal behavior, room-return semantics, signed-out/login/logout transitions, call/PiP behavior, accessibility beyond the named link/current/focus observations, themes or viewport sizes outside Scope; guarantee every native screen string as a supported module destination; or add a current-location subscription. It does not assure P-000008, dispose C-000003, complete P-000015/O-000015, or resolve G-000010. [C-000005](situation/candidates/C-000005-export-native-screen-navigation.md) retains the unselected public-API possibility.

## References

- [Selecting Decision](situation/decisions/D-000020-consume-hash-suppression-once.md)
- [Promoted Candidate](situation/candidates/C-000004-consume-hash-suppression-once.md)
- [Existing reload-based assurance](situation/promises/P-000016-decision-complete-module-navigation-gate.md)
- [Explicit extension boundary](situation/invariants/I-000010-explicit-host-extension-boundaries.md)

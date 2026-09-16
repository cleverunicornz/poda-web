# Same-document registered-location return passes in Chrome

## Promise

[P-000017](situation/promises/P-000017-seamless-module-native-return.md)

## Oracle

[O-000017](situation/oracles/O-000017-seamless-module-native-return.md)

## Result

PASS

## Head

`5f5aebcda2c829a6ff7489a4e05fd454352c17e5`

## Observed

2026-09-15

## Evidence

- [Structured exact-head browser and source observation](situation/references/P-000017/same-document-return/browser-pass.json)
- [Diagnostic workspace at the declared 1440 × 900 Poda Light surface](situation/references/P-000017/same-document-return/diagnostic-workspace.png)

Chrome/150.0.7871.24 exercised O-000017 against the named implementation head, exact built/served module, production web build, generated module configuration and temporary Synapse fixture retained in the structured observation. The fixture credential is not retained. The focused router regression passed 8/8 at the exact head; module and harness type checks, module build, specification compilation and the production web build passed with the enumerated existing build warnings.

The direct/query case and explicit refresh passed. The Home → Diagnostic → Home → Back → Forward sequence retained one document UUID and one `navigate` Navigation Timing entry through every same-document transition, used no reload marker, preserved `@poda_navigation_routing:localhost`, and returned a final authenticated Matrix `whoami` for that same non-guest user and device. Both module responses and unrelated fixture/native traffic are enumerated rather than discarded.

## Oracle legs

| Leg     | Observation                                                                                                                                                                                                                                                                                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1 / F1 | `apps/web/src/vector/routing.test.ts` proved that the matching app-generated echo was suppressed once, the intervening external module hash routed, and the later external `#/home` return routed. All 8 focused tests passed at the exact head.                                                                                                                                 |
| P2 / F2 | Direct `#/io.poda.navigation-spike.diagnostic?case=direct%20query` rendered and focused Diagnostic with only its control current. Explicit refresh retained the exact query, destination, current state and user; the source UUID disappeared and Navigation Timing changed from `navigate` to the expected explicit `reload`.                                                   |
| P3 / F3 | Home → Diagnostic → Home rendered the matching native/module content and current control. UUID `5b9165de-1e7b-4dae-b748-2721bf935c5c`, the sole `navigate` timing entry and the fixture user remained unchanged; no reload marker or session-lock-stolen state appeared.                                                                                                         |
| P4 / F4 | Back reached focused Diagnostic with only Diagnostic current; Forward reached native Home with only Chat current. Both preserved the same UUID, timing entry and user without a document reload.                                                                                                                                                                                 |
| P5 / F5 | Exact diff review found the generic core router/test edit and module/spec cleanup only. No public Module API or stable configuration path changed; core contains no module/Poda location condition; module source contains no reload marker, `location.assign`, `pageshow` or `PageTransitionEvent` handling.                                                                    |
| P6 / F6 | Built and served module digests match; the exact web/configuration digests are retained; all three module responses returned 304; page errors are empty; and no module load, render, React or navigation failure occurred. The structured observation classifies the host-config, key-backup, dehydration, RTC, well-known and unload-policy traffic as unrelated to this route. |

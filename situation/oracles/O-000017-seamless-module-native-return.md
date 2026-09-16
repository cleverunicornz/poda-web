# Oracle for same-document registered-location return to native Home

## State

implemented

## Judges

[P-000017](situation/promises/P-000017-seamless-module-native-return.md)

## Inputs

Before observation, retain:

- The exact Git head; focused unit-test, module type-check/build, and web build commands and results; module, served application and generated configuration SHA-256 values; Chrome version; fixture homeserver implementation; temporary user identity; declared query; and timestamp.
- A focused router regression run that begins with an application-set native hash guard, observes a different external hash, then returns externally to the formerly guarded hash. Also retain the matching-echo assertion.
- The generated preview configuration whose only added runtime module entry names the exact built `@poda/web-module-navigation-spike` artifact.
- One Chrome document opened directly at Diagnostic with the declared query, followed by an explicit refresh. Record URL/query, rendered destination, current controls, focused labelled main, user identity and document identity before and after refresh.
- At 1440 × 900 in Poda Light, start at native Home and retain one document-identity token across Home → Diagnostic → Home → Back → Forward. At every stage record URL, rendered native/Diagnostic content, both controls' `aria-current` values, user identity, document identity and Navigation Timing entry count/type.
- An exact source review covering the router change and test, module reload/history/lifecycle operations, changed Element core paths, public Module API paths, and stable configuration paths.
- Browser page errors, console errors, failed requests and failed responses across the declared direct, refresh and navigation cases. Report unrelated optional native/fixture traffic rather than discarding it.

## Pass

A complete PASS requires all legs:

- **P1 — One-event suppression.** A focused executable regression proves a matching application-generated hash echo is suppressed, a different external hash is routed, and a later external return to the formerly application-set hash is routed. The pending guard is consumed before routed callbacks can install a successor.
- **P2 — Direct/query and refresh.** Direct `#/io.poda.navigation-spike.diagnostic?<declared-query>` renders and focuses Diagnostic with only its control current and the query retained. Explicit refresh restores the same destination, query, current state and Matrix user in the replacement document.
- **P3 — Same-document native return.** Home → Diagnostic → Home renders each destination with only its matching control current, preserves the same non-empty Matrix user and exact document-identity token, and causes no reload or new Navigation Timing entry.
- **P4 — Same-document history.** Back after the second Home reaches Diagnostic; Forward reaches native Home. Each renders its matching content/current control, preserves the user and original document token, and adds no reload or Navigation Timing entry.
- **P5 — Boundary and removal.** Exact source review finds the generic one-event host-router correction and focused regression test, no module-location condition in core, no changed public Module API, no second router/client or private module import, no stable configuration activation, and no reload marker, `location.assign` override, `pageshow` handler or back-forward-cache reload in the module.
- **P6 — Runtime health and provenance.** Exact artifacts/configuration are attributable to the tested head; the module loads successfully; and no module load, render, React or navigation error occurs. Unrelated fixture/native traffic is enumerated with scope.

## Fail

A valid observation fails on any corresponding in-Scope contradiction:

- **F1** — The app-generated matching echo routes, or the external module/return hashes are suppressed or not routed in the declared regression.
- **F2** — Direct/query entry or refresh loses the destination/query/current state/user, fails to render/focus Diagnostic, or produces another destination.
- **F3** — Either activation replaces/reloads the document, changes the user, renders the wrong content, or marks either control incorrectly.
- **F4** — Back/Forward replaces/reloads the document, reaches the wrong destination, renders stale content, marks either control incorrectly, or changes the user.
- **F5** — Source review finds location-specific core behavior, a public Module API change, stable activation, retained module reload/marker/back-forward-cache handling, a second router/client or private module dependency.
- **F6** — Provenance is incomplete, the module request fails, or a module load, render, React or navigation error occurs.

Missing credentials, unavailable Chrome, fixture failure, or artifact/configuration provenance that cannot be established makes the run BLOCKED or INVALID rather than PASS.

## Implementation

`apps/web/src/vector/routing.test.ts` executes P1/F1 with:

```sh
corepack pnpm --filter element-web exec vitest run src/vector/routing.test.ts
```

## Implementation coverage

P1/F1 is executable. P2–P6 require direct retained evidence from one complete exact-head browser/source observation.

| Leg     | Decision                                      | Coverage                                    |
| ------- | --------------------------------------------- | ------------------------------------------- |
| P1 / F1 | Matching echo and stale-guard external return | `apps/web/src/vector/routing.test.ts`       |
| P2 / F2 | Direct/query entry and explicit refresh       | manual                                      |
| P3 / F3 | Same-document Home → Diagnostic → Home        | manual plus module Playwright specification |
| P4 / F4 | Same-document Back/Forward                    | manual plus module Playwright specification |
| P5 / F5 | Core/module/API/configuration source boundary | manual                                      |
| P6 / F6 | Artifact provenance and runtime health        | manual                                      |

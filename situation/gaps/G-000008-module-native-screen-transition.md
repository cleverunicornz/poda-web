# Module navigation cannot reliably return to an existing native screen by hash alone

## State

open

## Gap

The exported Module navigation API registers exact module locations and opens Matrix rooms, but exposes no generic transition to an existing native Element screen such as Home and no current-screen notification contract.

A same-document `#/home` link from a registered module location can therefore be ignored by Element's hash router when its private `lastLocationHashSet` still equals `#/home`. The bounded probe can force native initial-route handling with a document reload, but that does not qualify a seamless production navigation contract.

## Relevance

[C-000003](situation/candidates/C-000003-qualify-member-navigation.md) is qualifying a module-owned member header. [P-000015](situation/promises/P-000015-module-navigation-mount-gate.md) includes one Diagnostic-to-Chat/home return, while full product navigation remains outside that Promise.

## Evidence

- On 2026-09-15, Chromium 150 against implementation head `768ac6a20c` opened the registered `#/io.poda.navigation-spike.diagnostic` location in the signed-in Element application. Activating the header's plain `#/home` link changed the browser hash and the module header's active state, but the Diagnostic Workspace remained mounted for the full 30-second observation.
- `packages/module-api/src/api/navigation.ts` exports `registerLocationRenderer`, `openRoom` and Matrix permalink navigation, but no generic native-screen navigation method.
- `apps/web/src/vector/routing.ts` suppresses a hashchange when the decoded hash equals its private `lastLocationHashSet`; a module location transition does not update that value through an exported contract.
- The observation does not establish that every previous native screen or sequence fails. It establishes one reproducible Home → module location → Home sequence and an API absence relevant to the preferred Candidate.
- At commit `78a3bb9d89b4f7a9f1196ea0e0859c934153caf3`, the bounded probe varied a query marker and used `window.location.assign` to force document initialization at `#/home`. [W-000002](situation/witnesses/P-000015/W-000002-module-navigation-gate-incomplete.md) retains that this exact workaround preserved the Matrix user and declared Back/Forward destinations. The retained observation is `INVALID` as complete Gate 1 assurance because it lacks active-control observations after Back and Forward and per-matrix control-operability observations; [G-000011](situation/gaps/G-000011-navigation-gate-assurance-coverage.md) retains that absence without asserting runtime failure. It does not supply or qualify the missing seamless exported transition.
- On 2026-09-15 at pre-fix head `4732e2a112d4c58f8aff6e98d9bb2f90683df938`, a decision-complete retry in default Chrome 150 reached the Forward `#/home` history entry through Chromium's back-forward cache, but Element presented its session-lock-stolen view instead of native Home. The same exact browser and session then completed room → Diagnostic → Chat/home → Back → Forward with the expected current controls when a throwaway observation hook refreshed only a marked back-forward-cache restoration. This identifies a second consequence of the reload workaround and supports qualifying a source-owned, marker-scoped restoration under P-000016; it does not supply the missing seamless exported native-screen contract.

## Impact

A production module-owned header may require a deliberately exported native-screen transition/current-location contract, or an explicit acceptance of reload-based native routing. Treating direct hash links as uniformly seamless would overstate the current API. This Gap does not by itself select a core change or invalidate a bounded reload-based probe.

## Resolution

none

## References

- [Navigation qualification Candidate](situation/candidates/C-000003-qualify-member-navigation.md)
- [Gate Promise](situation/promises/P-000015-module-navigation-mount-gate.md)
- [Gate Oracle](situation/oracles/O-000015-module-navigation-mount-gate.md)
- `packages/module-api/src/api/navigation.ts`
- `apps/web/src/vector/routing.ts`
- [Gate 1 Chromium Witness](situation/witnesses/P-000015/W-000002-module-navigation-gate-incomplete.md)

# Module navigation cannot reliably return to an existing native screen by hash alone

## State

addressing

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
- At exact head `53c290b3c62f01ae95ca74893ce3c944a1b472b7`, the bounded source marks only the reload transition's source and target entries and reloads a marked `pageshow.persisted` restoration. [W-000003](situation/witnesses/P-000016/W-000003-decision-complete-module-navigation-gate-pass.md) records Back at Diagnostic with only its control current and Navigation Timing `back_forward`, then Forward at native Home with only Chat current and Navigation Timing `reload`, the same Matrix user, and no session-lock-stolen view. This assures P-000016's finite workaround without supplying or qualifying a seamless exported native-screen transition.
- On 2026-09-15, the maintainer assigned the smaller no-API host correction for implementation and qualification on a new branch. [D-000020](situation/decisions/D-000020-consume-hash-suppression-once.md) promotes [C-000004](situation/candidates/C-000004-consume-hash-suppression-once.md) into [P-000017](situation/promises/P-000017-seamless-module-native-return.md) and [O-000017](situation/oracles/O-000017-seamless-module-native-return.md). This changes the Gap to `addressing`; no resolution or PASS is claimed before the Oracle runs.

## Impact

A production module-owned header may require a deliberately exported native-screen transition/current-location contract, or an explicit acceptance of reload-based native routing. Treating direct hash links as uniformly seamless would overstate the current API. This Gap does not by itself select a core change or invalidate a bounded reload-based probe.

## Resolution

Qualification is active under [PLAN-000005](situation/plans/active/PLAN-000005-seamless-module-native-return.md). Closure requires a complete PASS Witness for P-000017/O-000017; until then the seamless transition remains unassured.

## References

- [Navigation qualification Candidate](situation/candidates/C-000003-qualify-member-navigation.md)
- [Gate Promise](situation/promises/P-000015-module-navigation-mount-gate.md)
- [Gate Oracle](situation/oracles/O-000015-module-navigation-mount-gate.md)
- `packages/module-api/src/api/navigation.ts`
- `apps/web/src/vector/routing.ts`
- [Gate 1 Chromium Witness](situation/witnesses/P-000015/W-000002-module-navigation-gate-incomplete.md)
- [One-shot suppression Candidate](situation/candidates/C-000004-consume-hash-suppression-once.md)
- [Public native-navigation API Candidate](situation/candidates/C-000005-export-native-screen-navigation.md)
- [Same-document return Promise](situation/promises/P-000017-seamless-module-native-return.md)
- [Same-document return Oracle](situation/oracles/O-000017-seamless-module-native-return.md)

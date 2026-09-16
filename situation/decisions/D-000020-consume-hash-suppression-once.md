# Consume hash suppression once before expanding the Module API

## Status

accepted

## Date

2026-09-15

## Context

The bounded module-navigation gate can return from a registered Diagnostic location to native Home only by forcing a full-document navigation and handling a marked back-forward-cache restoration. The reproduced same-document failure occurs because `apps/web/src/vector/routing.ts` retains an application-set `#/home` suppression value while routing a different external registered location, then mistakes the later user-driven return to `#/home` for its own hash echo.

The maintainer directed immediate action on a new branch and pull request, selected the smaller no-API fix for qualification, and requested explicit Candidate records. Any Element-owned source change must remain isolated and reviewed under [I-000010](situation/invariants/I-000010-explicit-host-extension-boundaries.md).

## Evidence

- [G-000008](situation/gaps/G-000008-module-native-screen-transition.md) retains the exact observed Home → registered module location → Home failure, source interaction, and API absence.
- [W-000003](situation/witnesses/P-000016/W-000003-decision-complete-module-navigation-gate-pass.md) applies [O-000016](situation/oracles/O-000016-decision-complete-module-navigation-gate.md) successfully at `53c290b3c62f01ae95ca74893ce3c944a1b472b7`, but only with module-owned document reload markers and a scoped `pageshow.persisted` reload.
- `apps/web/src/vector/routing.ts` assigns `lastLocationHashSet` before application-owned URL writes and compares every later hash change against that retained value without consuming it.
- `packages/module-api/src/api/navigation.ts` has no generic native-screen API; that absence does not itself prove that one is needed to correct host-owned hash provenance.
- The maintainer's direct 2026-09-15 instruction authorizes this bounded implementation and qualification, not merge or broader product-navigation selection.

## Decision

Promote [C-000004](situation/candidates/C-000004-consume-hash-suppression-once.md). Implement the router's application-set hash value as a one-event suppression guard: consume it before deciding the next hash event, suppress only a matching echo, and route a mismatching external event. Remove the Poda diagnostic module's full-document reload markers and back-forward-cache handler if the predeclared runtime sequence passes.

Treat this as an explicit generic core-routing correction, with a focused regression test and exact source review. Do not add a Module API, module-specific route condition, private module dependency, stable configuration activation, or production navigation claim.

Retain [C-000005](situation/candidates/C-000005-export-native-screen-navigation.md) as proposed rather than selecting it speculatively.

## Why

The router owns the stale suppression state and already distinguishes application-generated URL writes from external hash navigation. A pending echo is meaningful for one observed event only. Clearing it before dispatch also prevents a routed callback's newly assigned successor guard from being erased. This addresses the demonstrated cause at the narrowest generic ownership boundary and avoids turning a bookkeeping defect into a public compatibility surface.

A public native-screen API may still be justified by a different accepted use case, but no current evidence specifies its destination model, history contract, modal semantics, observation lifecycle, or trust boundary.

## Rejected alternatives

- Export native-screen navigation immediately: enlarges the Module API without evidence that corrected URL routing is insufficient and leaves current-location, history, modal, versioning, and authorization semantics unselected.
- Call `notifyNewScreen` from the registered module renderer branch: it couples generic event provenance to one screen type and may write a second URL/history entry while processing the first.
- Keep the reload workaround as the selected answer: P-000016 proves its finite gate behavior, but it replaces the document, adds query markers and back-forward-cache lifecycle handling, and does not provide the requested seamless transition.
- Import private dispatch/store state or intercept host DOM from the module: violates the explicit extension boundary and would relocate host routing responsibility into Poda extension code.

## Consequences

- [P-000017](situation/promises/P-000017-seamless-module-native-return.md) and [O-000017](situation/oracles/O-000017-seamless-module-native-return.md) define the exact implementation and judgment boundary under completed [PLAN-000005](situation/plans/done/PLAN-000005-seamless-module-native-return.md).
- [G-000008](situation/gaps/G-000008-module-native-screen-transition.md) moves to `addressing` while the Oracle is applied; only a complete PASS and disposition update can close it at this bounded route.
- The source delta intentionally touches Element-owned `apps/web/src/vector/routing.ts`; review must identify it as a core correction rather than describe the module as API-only.
- P-000016 remains immutable assurance of the earlier reload-based gate. This Decision does not retroactively alter its Scope or Witness.
- C-000003 remains qualifying and production Chat/Studio/Profile/Settings navigation remains unselected.

## Revisit when

O-000017 fails or reveals a router regression; a supported module cannot express an accepted destination through corrected URL routing; destination state cannot be derived from the URL; or a public contract's destination, history, modal, lifecycle and trust semantics are explicitly selected.

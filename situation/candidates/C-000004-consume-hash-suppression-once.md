# Consume the application-set hash suppression once

## State

promoted

## Candidate

Treat the web router's application-set hash value as a one-event echo guard. Every observed `hashchange` consumes the guard before either suppressing the matching application-generated event or routing a different externally initiated hash. An intervening registered module location can then invalidate a stale native-location guard, so returning to that native location routes in the same document.

This is a generic host-router correction. It does not add module-specific branches, expose router state, or define a new Module API.

## Origin

- [G-000008](situation/gaps/G-000008-module-native-screen-transition.md) retains the observed Home → registered module location → Home failure and the stale `lastLocationHashSet` interaction in `apps/web/src/vector/routing.ts`.
- [W-000003](situation/witnesses/P-000016/W-000003-decision-complete-module-navigation-gate-pass.md) proves that a module-owned full-document reload can complete the bounded sequence, while retaining that workaround's markers and back-forward-cache lifecycle handling.
- `apps/web/src/vector/routing.ts` sets `lastLocationHashSet` before application-owned hash assignment, suppresses matching hash changes, and currently leaves the value live after both matching and non-matching hash changes.
- The maintainer's 2026-09-15 instruction selects immediate qualification of the smaller no-API host fix on a new branch and pull request.

## Why consider it

The suppression value describes one expected browser event, not durable current-screen state. Consuming it on the next hash event addresses the demonstrated stale-state cause at the owning router boundary. It preserves URL-driven module navigation, avoids a Poda-specific host branch, and does not enlarge the public Module API before a caller demonstrates a distinct imperative-navigation or subscription need.

The change touches Element-owned routing behavior and therefore remains an explicit, isolated core change under [I-000010](situation/invariants/I-000010-explicit-host-extension-boundaries.md), even though its source delta is narrow.

## Qualification questions

- Does an application-set hash still suppress its own matching `hashchange` exactly once?
- After a different external hash is routed, does returning to the formerly application-set hash route rather than inherit stale suppression state?
- Does native Home → registered Diagnostic location → native Home complete without document replacement, reload query markers, duplicate router lifecycle, or Matrix user change?
- Do direct/query Diagnostic entry, explicit refresh, and browser Back/Forward produce the declared destination and active-control state?
- Does the implementation remain generic to router event provenance, without Module API changes, a module-specific location check, stable configuration activation, or a second router?

## Candidate approaches

1. **Consume before deciding — selected.** Capture whether the observed hash matches the pending application-set value, clear that value before any route callback can set a successor, suppress only the captured match, and route a mismatch.
2. **Synchronize inside the module-renderer branch — not selected.** Updating router state from `MatrixChat.showScreen` would couple a general hash provenance concern to one screen type and risks writing another history entry through `onNewScreen`.

## Disposition

[D-000020](situation/decisions/D-000020-consume-hash-suppression-once.md) promotes this Candidate into [P-000017](situation/promises/P-000017-seamless-module-native-return.md) and [O-000017](situation/oracles/O-000017-seamless-module-native-return.md) under active [PLAN-000005](situation/plans/active/PLAN-000005-seamless-module-native-return.md). Promotion selects a bounded implementation and assurance attempt, not production Poda navigation or the broader [C-000003](situation/candidates/C-000003-qualify-member-navigation.md).

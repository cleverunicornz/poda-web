# Export native-screen navigation for modules

## State

proposed

## Candidate

Consider a deliberate Module navigation contract for requesting an existing native Element destination and, if independently required, observing the current host destination. The host would own dispatch, URL/history semantics, modal destinations, and lifecycle; modules would not import private dispatchers or stores.

This Candidate is not required merely because a stale router echo guard exists. It remains a fallback for an evidenced caller need that URL navigation plus corrected host bookkeeping cannot satisfy.

## Origin

- [G-000008](situation/gaps/G-000008-module-native-screen-transition.md) records that `packages/module-api/src/api/navigation.ts` exposes exact module-location registration and Matrix room navigation but no generic native-screen transition or current-screen notification.
- [C-000003](situation/candidates/C-000003-qualify-member-navigation.md) conditionally allows a bounded host extension only after a missing supported capability is demonstrated.
- The reload-based Gate 1 evidence in [W-000003](situation/witnesses/P-000016/W-000003-decision-complete-module-navigation-gate-pass.md) proves one bounded workaround, not the shape or necessity of a public API.
- The maintainer's 2026-09-15 instruction requests that the public-API alternative be retained while immediately qualifying the smaller no-API fix.

## Why consider it

A supported imperative transition may eventually be appropriate when a module must request host-owned behavior that a URL cannot represent safely. A destination subscription may separately be appropriate when active state cannot be derived from the URL, such as modal or nested host state. Explicit contracts would be safer than private dispatcher/store imports or DOM interception.

Adding either contract expands a public alpha boundary and its compatibility obligations. It should follow a demonstrated consumer requirement, destination model, permission boundary, and history/lifecycle semantics rather than serve as a workaround for generic router bookkeeping.

## Qualification questions

- Which accepted module use case cannot be satisfied by corrected same-document URL routing?
- Are native destinations a closed typed set, validated path strings, Matrix URIs, or host-defined capabilities, and how does version skew behave?
- Who owns push versus replace history, query parameters, failed/unknown destinations, login gates, room transitions, and Settings-like modal destinations?
- Is imperative navigation sufficient, or is a separately justified current-destination subscription required?
- How are module trust, teardown, multiple modules, accessibility/focus, and observable completion represented without exposing private host state?
- Can the contract be implemented and tested generically without encoding Poda routes or committing the broader product-navigation Candidate?

## Candidate approaches

1. **Host-owned imperative navigation.** Expose a method whose validated request is translated by the host into native navigation and history behavior.
2. **Read-only destination subscription.** Expose current host destination changes when URL-derived state is demonstrably insufficient.
3. **Combined navigation object.** Couple request and observation only if qualification shows they share one stable lifecycle and versioning contract.

## Disposition

None. [D-000020](situation/decisions/D-000020-consume-hash-suppression-once.md) retains this as an unselected fallback while [C-000004](situation/candidates/C-000004-consume-hash-suppression-once.md) is implemented and judged. Revisit if that Candidate is refuted or a separately accepted module use case demonstrates a capability absent from corrected URL routing.

# Public and member rendering ownership

## Status

accepted

## Date

2026-09-14

## Context

The maintainer has selected prospective frontend product boundaries and authorized
this knowledge-only change. Public static delivery and authenticated member
interaction need explicit rendering ownership without creating independently
managed frontend products or a competing member router.

This decision governs later, separately approved product work. It does not
supersede [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md),
relax [I-000003](situation/invariants/I-000003-element-native-capability-boundary.md),
or expand the active [PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md)
first visual migration. Earlier superseded or withdrawn product Promises and
abandoned PLAN-000001 remain inactive.

## Evidence

- The maintainer's direct requirements select one frontend product monorepo and
  coordinated tooling/release boundary, Astro for designated public static pages,
  and the Element-derived SPA for member navigation and lifecycle. These are
  explicit product choices, not conclusions from a feasibility experiment.
- `apps/web/src/vector/routing.ts` owns the existing hash-routing integration.
- `apps/web/src/vector/init.tsx` owns the existing application root lifecycle,
  including reuse of the `matrixchat` React root across application/error views.
- `packages/module-api/src/api/navigation.ts` exposes navigation operations and
  an alpha location-renderer registration point inside that host.
- [O-000012](situation/oracles/O-000012-public-static-data-boundary.md) is a
  designed future judgment route, not execution evidence. No Witness establishes
  the proposed Astro/member composition or its runtime feasibility.

## Decision

Keep public and member web surfaces in one coordinated frontend workspace,
tooling, and delivery boundary. Astro generates designated public static pages;
the Element-derived member runtime owns member navigation and application
lifecycle. Astro need not host the member document. Multiple build outputs within
this boundary do not create a second independently managed frontend product.

Public output contains only data explicitly designated for public delivery.
Authenticated member state, credentials, and private artifact content remain
outside that output. Public designation and service authority are consumed as
explicit contracts rather than inferred from a frontend-visible field or route.

Select ownership now, not an origin, URL prefix, storage arrangement, session
handoff, publication payload, endpoint, or deployment topology. Those choices need
separate qualification before implementation.

## Why

Static public delivery and a stateful Matrix member application have distinct
responsibilities. Assigning one owner to each avoids duplicate member routing and
lifecycle control while preserving one product delivery boundary. Keeping the
public data decision explicit avoids treating browser access to private member
data as permission to publish it.

## Rejected alternatives

- A separately managed public frontend and member frontend: duplicates product
  tooling and release ownership contrary to the selected monorepo boundary.
- Astro taking over member navigation or mounting a competing member runtime:
  conflicts with Element's existing routing and application ownership.
- Requiring Astro to host the member document: unnecessarily constrains a
  deployment decision that the maintainer has not selected.
- Exporting authenticated state and relying on client-side hiding: private data
  would already have crossed the public delivery boundary.
- Fixing origins, prefixes, session storage, or publication schemas in this
  record: invents implementation contracts without authorized selections.

## Consequences

- [I-000004](situation/invariants/I-000004-one-frontend-rendering-boundary.md)
  and [I-000008](situation/invariants/I-000008-public-output-data-boundary.md)
  bind rendering and data ownership.
- [P-000012](situation/promises/P-000012-public-static-data-boundary.md) remains
  a hypothesis judged by O-000012; this decision supplies no implementation or
  assurance promotion.
- [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md)
  and [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md)
  retain implementation/evidence absence and unselected contracts.
- Existing visual/theme/Space source and active visual work remain unchanged.
  This record authorizes neither new UI implementation nor an implementation Plan.

## Revisit when

The maintainer changes the public/member product boundary, or qualification
produces concrete evidence that the selected ownership cannot meet a named
routing, lifecycle, security, or delivery requirement. Revisit through an explicit
Decision before changing the binding rules; a missing deployment detail alone
is not authority to create a second frontend or router.

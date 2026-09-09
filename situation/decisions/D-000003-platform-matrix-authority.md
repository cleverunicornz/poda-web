# Platform and Matrix authority

## Status

accepted

## Date

2026-09-09

## Context

The web application needs both organization-owned podcast state and
Matrix-owned communication state. The maintainer has not yet completed the
planned authority review with Dan, so the plan needs an explicit, reversible
baseline rather than leaving implementation teams to make incompatible
choices.

## Evidence

- `Private: cleverunicornz/matrix-coordinator@5797be35ddb0451eba49a327cb1fe70b5d44ba0a#situation/decisions/D-000001-stable-identity-and-bindings.md`
  (private; requires repository access) selects stable audience and
  organization-local Matrix bindings.
- `Private: cleverunicornz/matrix-coordinator@5797be35ddb0451eba49a327cb1fe70b5d44ba0a#situation/decisions/D-000002-authority-boundaries.md`
  (private; requires repository access) separates Matrix communication state
  from organization business state.
- `Private: cleverunicornz/matrix-coordinator@5797be35ddb0451eba49a327cb1fe70b5d44ba0a#situation/decisions/D-000005-authentication-and-authorization.md`
  (private; requires repository access) places authentication and
  authorization at their respective service boundaries.
- The distinction between the maintainer's selected behavior and this pending
  external confirmation is retained in
  [the integration plan](situation/references/D-000002/poda-element-integration-plan.md).

## Decision

Use the accepted Matrix Coordinator hybrid authority model as the planning and
implementation baseline. Matrix owns Matrix identities, sessions, rooms,
membership enforcement, messages, encryption, calls, and workflow-event
transport. The organization API owns organizations, business roles, content
assignments, profiles, podcasts, episodes, plans, entitlements, media
references, AI jobs, and publication state. Matrix Coordinator owns stable
identity bindings, bootstrap, context selection, and routing, but not podcast
business state.

## Why

The dependency's accepted records already define these boundaries, and the
division lets each system remain authoritative for the state it can enforce.
Treating this as an explicit baseline prevents a web-only implementation from
silently redefining the surrounding platform while the stakeholder review is
pending.

## Rejected alternatives

- Making Matrix events or room state authoritative for podcasts, plans, roles,
  and publication was rejected because Matrix Coordinator explicitly assigns
  those records to the organization domain.
- Making the organization API authoritative for Matrix messages, encryption,
  room membership, or power enforcement was rejected because it cannot enforce
  the Matrix protocol boundary.
- Running audience and organization Matrix clients concurrently was rejected
  because it increases credential, sync, encryption-store, and UX ambiguity.

## Consequences

- [I-000002](situation/invariants/I-000002-platform-matrix-authority-boundary.md)
  binds the authority split until it is superseded.
- Matrix workflow cards refetch authoritative organization state before an
  action and cannot mutate business state solely from event contents.
- The client runs one namespaced Matrix context at a time.
- A different outcome from the Dan review requires a new Decision that
  supersedes this one and any affected Matrix Coordinator decision before code
  adopts it.

## Revisit when

Dan and the maintainer select a different authority model, or Matrix
Coordinator supersedes one of the cited decisions.

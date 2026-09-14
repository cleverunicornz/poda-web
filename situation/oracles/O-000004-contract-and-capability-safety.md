# Contract and capability safety oracle

## State

designed

## Judges

- [P-000004](situation/promises/P-000004-contract-and-capability-safety.md)

## Inputs

- Contract schema and adapter unit results from the exact pull-request head.
- Production builds exercised against compatible, older, newer, malformed,
  unauthorized, quota-limited, and unavailable bootstrap/API responses.
- Production bundle, runtime configuration, and captured network destinations.
- Development and test fixture-selection results.

## Pass

- Every consumed response is runtime validated and all mutations carry the
  declared revision and idempotency information.
- Compatible capabilities enable only their declared UI; absent or incompatible
  capabilities fail closed with an accurate user-visible state.
- Production cannot instantiate the fixture adapter or donor native transport.
- Production network traces contain only configured Poda, Matrix, identity,
  media, AI, publication, and user-selected federated destinations; no
  inherited Element-operated default is contacted.

## Fail

- Invalid or incompatible data is treated as valid, or an unavailable feature
  is presented as successful.
- A mutation omits its required concurrency or idempotency control.
- Production can select fixtures or the native donor transport.
- A request is sent to a non-allowlisted inherited Element-operated endpoint.

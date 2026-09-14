# Poda fork assurance route oracle

## State

designed

## Judges

- [P-000005](situation/promises/P-000005-poda-fork-assurance-route.md)

## Inputs

- The fork-owned CI workflow and its trigger and runner configuration.
- A completed workflow run URL for the exact pull-request head.
- Retained logs, reports, screenshots, network audit, and artifact digests.
- The Witness record generated from that run.

## Pass

- The workflow runs on the approved organization runner through an allowed
  pull-request, dispatch, or Bedrock trigger and identifies the exact tested
  head.
- Formatting, types, style, unit tests, production build, Poda end-to-end
  journeys, screenshots, accessibility, brand, locale, and production-network
  checks all pass or are explicitly outside a narrower Promise's scope.
- Every credited result has a retrievable run URL or artifact digest and every
  Oracle pass leg is independently represented in the Witness.

## Fail

- The run used an unapproved trigger or runner, tested a different head, or
  omitted a claimed check.
- A required check failed, was skipped without being outside scope, or cannot
  be tied to retained evidence.
- The Witness omits a pass leg or relies only on a local attestation.

# Oracle for the member navigation header

## State

implemented

## Judges

[P-000023](situation/promises/P-000023-member-navigation-header.md)

## Inputs

- The exact Git head and its diff against `internal/main`.
- Built bundles of both modules, with SHA-256 digests of the built and served
  copies, and the served web build and configuration.
- The router regression and the module Playwright specification below, run
  against that build, with their results.
- A signed-in browser observation at 1440 × 900 in Poda Light of the header
  links, the former diagnostic address and Studio.
- Missing head, build, test or browser evidence makes an observation
  `INVALID` or `BLOCKED`, never PASS.

## Pass

- **P1 — Mount.** The specification finds the header above `#matrixchat`, with
  header and application heights summing to the body height.
- **P2 — Links.** The specification finds exactly the links Chat, Profile and
  Studio and no "Diagnostic workspace" link; source review finds no location
  registered by the navigation module; in the browser the former diagnostic
  address shows no diagnostic page.
- **P3 — Same-document navigation.** The specification's Studio → refresh →
  Chat → Back → Forward sequence reaches each destination with only its
  control current, keeps the user, and keeps one document token from after the
  refresh to the end.
- **P4 — Hash echo.** The router regression passes.
- **P5 — Presentation.** The specification's light/dark × 1440/500 matrix
  passes: header and Studio visible, no horizontal overflow, heights fill the
  body, more than one header background.
- **P6 — Boundary.** The diff touches only the navigation module and its
  specification (plus records); the module adds no reload marker,
  `location.assign`, `pageshow` handling, second router or Matrix client.

## Fail

- **F1** — header missing, below the application, or heights not filling the
  body.
- **F2** — a Diagnostic link, a link set other than Chat / Profile / Studio, a
  location registered by the navigation module, or a diagnostic page at the
  former address.
- **F3** — a wrong destination or current control, a changed user, or a new
  document within the sequence.
- **F4** — the router regression fails.
- **F5** — any matrix case fails.
- **F6** — changes outside the module and records, or any of the excluded
  mechanisms in the module.

## Implementation

Build both modules (`pnpm exec vite build` in `modules/poda-navigation-spike`
and `modules/poda-profile-spike`), serve the web build, then from `modules/`:

```sh
BASE_URL=<served web build> pnpm exec playwright test --project @poda/web-module-navigation-spike
```

and from `apps/web/`:

```sh
pnpm exec vitest run src/vector/routing.test.ts
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Mount and height | `navigation.spec.ts` "mounts above Element…" |
| P2 / F2 | Links, no Diagnostic | `navigation.spec.ts` "offers Chat, Profile and Studio…"; source review and former address manual |
| P3 / F3 | Same-document navigation | `navigation.spec.ts` "mounts above Element…" |
| P4 / F4 | One-event hash suppression | `apps/web/src/vector/routing.test.ts` |
| P5 / F5 | Theme and viewport matrix | `navigation.spec.ts` "fits the Poda light and dark presentation matrix" |
| P6 / F6 | Source boundary | manual |

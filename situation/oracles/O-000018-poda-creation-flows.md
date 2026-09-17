# Oracle for Poda creation flows

## State

designed

## Judges

[P-000018](situation/promises/P-000018-poda-creation-flows.md)

## Inputs

- The exact head commit's diff (module package extension only).
- Vitest contract/component results and the production webapp build on that
  head.
- A signed-in browser run against the demo homeserver exercising create →
  list → detail for podcast and episode, and the Analytics page, in Poda
  Light and Poda Dark at desktop (1440px) and narrow (500px).

## Pass

- Studio Podcasts/Episodes render the adapter collections (seed + created);
  creation validates required fields and slug/email formats; created items
  persist in-session and open in detail.
- Analytics renders fixture stats and mock series without a chart library.
- Existing spike pages (profile, studio detail, widget) keep working; Chat
  behaves natively.
- Module package `nx build`, tests, and production webapp build pass.

## Fail

Any Pass leg is unmet; data comes from anywhere but the mock adapter; a
reload retains created items while the UI claims persistence; Chat behavior
changes; or the slice grows beyond the enumerated pages without a superseding
decision.

## Implementation coverage

| Leg           | Decision                              | Coverage                               |
| ------------- | ------------------------------------- | -------------------------------------- |
| P-adapter     | Adapter contract and seed verified    | Vitest contract tests                  |
| P-collections | Lists and details render from adapter | manual (browser run)                   |
| P-create      | Validation and create flows work      | manual (browser run) + component tests |
| P-analytics   | Stats/series render, no chart lib     | manual (browser run)                   |
| F-scope       | Data escapes the adapter or slice     | manual (diff review + browser run)     |

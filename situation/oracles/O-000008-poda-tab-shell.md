# Oracle for the Poda tab shell

## State

designed

## Judges

[P-000008](situation/promises/P-000008-poda-tab-shell.md)

## Inputs

- The exact head commit's diff (fork edit limited to the tab bar, one
  `LoggedInView` conditional, new files, and `modules/poda/`).
- Production build output and Vitest results on that head.
- A signed-in browser run against the demo homeserver rendering every tab in
  Poda Light and Poda Dark at desktop (1440px) and narrow (500px) widths.

## Pass

- The tab bar renders and switches across Chat, Studio, Profile, and Settings;
  Chat shows the unchanged native Element layout (space rail, room list,
  composer, dialogs) and existing Vitest suites stay green.
- Studio renders Podcasts, Episodes, and Analytics from fixtures; detail
  editors round-trip edits within the session through the mock adapter.
- Profile renders the own-profile editor; the creators directory and its
  detail navigation work.
- Settings renders Element's native settings screens.
- Every Poda page renders correctly in both Poda themes and at narrow width;
  unknown screens fall back to home; Matrix deep links work.
- Production build, Vitest contract/component tests, and the `poda:check`
  branding gate pass.

## Fail

Any Pass leg is unmet, Chat behavior or layout is observably changed, page
data comes from anything other than the mock adapter, or the fork edit grows
beyond the enumerated surfaces without a superseding decision.

## Implementation coverage

| Leg       | Decision                                  | Coverage                                      |
| --------- | ----------------------------------------- | --------------------------------------------- |
| P-build   | Build, Vitest, branding gate pass         | manual (local commands; CI when available)    |
| P-tabs    | Tab bar switches all four tabs correctly  | manual (browser run)                          |
| P-studio  | Studio renders and edits via mock adapter | manual (browser run) + Vitest contract tests  |
| P-profile | Profile and creators render and navigate  | manual (browser run)                          |
| P-themes  | Light/dark and narrow render correctly    | manual (browser run)                          |
| F-chat    | Chat behavior/layout changed              | manual (browser run + existing Vitest suites) |

# Oracle for creation-flow fixes

## State

implemented

## Judges

[P-000022](situation/promises/P-000022-creation-flow-fixes.md)

## Inputs

- The exact Git head and its diff against `internal/main`.
- The module Vitest command below and its result on that head, the module
  type-check and build.
- A signed-in browser observation of the head's module bundle in the Poda web
  build: an empty podcast submit, then fields corrected one by one, then create;
  New episode from the podcast detail; an empty scheduled episode submit, then
  correction and create without a season number; both detail pages' actions;
  the own profile's welcome banner; and a placeholder's computed colour.
- Missing head, test or browser evidence makes an observation `INVALID` or
  `BLOCKED`, never PASS.

## Pass

- **P1 — Copy.** The focused copy test passes, and the browser shows the
  session-only draft bar, the scheduled hero note after selecting Scheduled,
  "Some sections still empty", the podcast guidance and the Edit profile banner.
- **P2 — Errors.** After the empty submits, inline errors appear for every
  failing field (including the episode title); editing one field clears only
  its error; the banner hides once all are corrected.
- **P3 — Detail navigation.** Route tests pass, and in the browser New episode
  preselects the podcast, Open podcast and both Back actions reach their
  targets.
- **P4 — Labels.** Label tests pass, and an episode created without a season
  shows `E1`.
- **P5 — Placeholders.** A placeholder's computed colour has lower opacity than
  entered text.

## Fail

- **F1** — any retired claim or design note visible, or a hero note that
  contradicts the selected state.
- **F2** — a failing field without its inline error, an error surviving the
  edit of its field, or the banner shown with no field error left.
- **F3** — a missing action, or an action reaching the wrong page or podcast.
- **F4** — a `?` in an episode label.
- **F5** — placeholders as dark as entered text.

## Implementation

From `modules/poda-profile-spike/`:

```sh
pnpm exec vitest run
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Retired claims absent; session-only statement present | `src/studio/copy.test.js`; browser manual |
| P2 / F2 | Inline errors and clearing on edit | manual |
| P3 / F3 | Detail routes and actions | `src/studio/routes.test.js`; browser manual |
| P4 / F4 | Episode label | `src/shared/podcastFullView.test.js`; browser manual |
| P5 / F5 | Placeholder colour | manual |

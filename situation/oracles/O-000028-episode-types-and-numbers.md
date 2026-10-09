# Oracle for episode types and episode numbers

## State

implemented

## Judges

[P-000028](situation/promises/P-000028-episode-types-and-numbers.md)

## Inputs

- The exact Git head, the module test command below and its result.
- A signed-in browser observation of a build of that head at 1440 × 900: the
  episode wizard's type options, a scheduled full episode without a number,
  switching it to Bonus, a scheduled trailer and a draft without numbers, a
  scheduled full episode with a number, the resulting detail and list labels,
  and field positions in both wizards.
- Missing head, test or browser evidence makes an observation `INVALID` or
  `BLOCKED`, never PASS.

## Pass

- **P1** — the type select lists Full episode, Trailer, Bonus.
- **P2** — the scheduled full episode is refused with the stated message; the
  trailer and the draft are created; validation tests cover full, trailer,
  bonus, draft, published and bad numbers.
- **P3** — switching the refused episode to Bonus leaves no field error.
- **P4** — labels "S1 · Trailer · scheduled" (detail), "Field Notes · S1 ·
  Trailer" (list) and "S2E1 · scheduled" for the numbered full episode; label
  tests pass.
- **P5** — the type, number and season inputs share one top; no two-field row
  of the podcast wizard differs; Title and Podcast share a left edge; the gaps
  between header, hero, draft bar and form are 24px in both wizards; style and
  layout tests pass.

## Fail

- **F1** — a missing type.
- **F2** — the unnumbered scheduled full episode accepted, or a draft, trailer
  or bonus refused for lacking a number.
- **F3** — the number error kept after the change.
- **F4** — a missing or wrong type in a label.
- **F5** — misaligned rows or edges, or sections touching or unevenly spaced.

## Implementation

From `modules/poda-profile-spike/`:

```sh
pnpm exec vitest run
```

## Implementation coverage

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Episode type options | browser manual |
| P2 / F2 | Numbering rule | `mockAdapter.test.js` "needs an episode number…", "lets drafts, trailers and bonus…", "rejects an unknown episode type…"; browser manual |
| P3 / F3 | Dependent error clearing | manual |
| P4 / F4 | Labels | `podcastFullView.test.js` "episodeLabel"; browser manual |
| P5 / F5 | Field alignment and section spacing | `nativeTheme.test.js` "aligns fields…", "cancels Element's text-input margin…", `copy.test.js` "creation form layout"; browser manual |

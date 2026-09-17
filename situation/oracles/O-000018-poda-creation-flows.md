# Oracle for Poda creation flows

## State

designed

## Judges

[P-000018](situation/promises/P-000018-poda-creation-flows.md)

## Inputs

- The exact source head's diff, the changed `modules/poda-profile-spike/`
  sources, and generated module/configuration identities when a browser run
  dispatches the module.
- Focused adapter/validation test command and result, module package build, and
  production webapp build on that exact head, retained as run identity and
  supporting evidence rather than as a behavior leg.
- A signed-in browser observation against the demo homeserver exercising
  podcast and episode create → list → detail and the Analytics page in Poda
  Light and Poda Dark at desktop (1440px) and narrow (500px), plus native
  Chat.
- An explicit reload after each creation flow and source review showing that
  every P-000018 collection/create data access uses the declared
  `MockPodaDataAdapter`; retain the post-reload seed state.
- Missing identity, build/test, source-review, or browser evidence makes an
  observation `INVALID` or `BLOCKED`, never PASS; this Oracle judges no
  behavior outside P-000018's Scope.

## Pass

A complete PASS requires every leg:

- **P1 — Podcast flow.** The Studio module lists seeded and created podcasts; a valid
  podcast form submission opens its detail view in-session, while required
  fields and slug/email validation reject invalid drafts.
- **P2 — Episode flow.** The Studio module lists seeded and created episodes with their
  parent context; a valid episode submission opens its detail view in-session,
  while required parent/title validation rejects invalid drafts.
- **P3 — Analytics.** The Studio module Analytics page renders fixture statistics and the mock
  per-episode series without a chart library.
- **P4 — Session data boundary.** Every P-000018 collection/create read or
  write uses the declared in-memory adapter, and reload restores seed state
  rather than retaining a created item or claiming persistence.
- **P5 — Themes and Chat.** The named module pages work in both Poda themes at
  both declared sizes, and Chat remains native.

## Fail

A valid observation fails on any corresponding in-Scope contradiction:

- **F1 — Podcast flow.** The Studio module's podcast collection/detail/create behavior is missing,
  invalid data is accepted, or a valid submission cannot reach its in-session
  detail view.
- **F2 — Episode flow.** The Studio module's episode collection/detail/create behavior is missing,
  required parent/title validation is absent, or a valid submission cannot
  reach its in-session detail view.
- **F3 — Analytics.** The Studio module Analytics fixture statistics or mock series are absent,
  misrendered, or rely on a chart library.
- **F4 — Session data boundary.** A P-000018 flow reads or writes outside the
  declared adapter, reload retains a creation, or the UI claims persistence.
- **F5 — Themes and Chat.** A declared theme/viewport case fails, or Chat
  changes from native behavior.

## Implementation coverage

This Oracle remains `designed`. The focused adapter/validation test at
`4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/data/mockAdapter.test.js`
is source evidence, not a credited executable decision: no exact command and
retained result are recorded for this Oracle.

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Podcast collection, validation, creation, and detail sequence | manual |
| P2 / F2 | Episode collection, validation, creation, and detail sequence | manual |
| P3 / F3 | Analytics fixture statistics and mock series | manual |
| P4 / F4 | Declared in-memory adapter and reload boundary | manual |
| P5 / F5 | Theme matrix and native Chat boundary | manual |

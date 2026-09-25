# Oracle for PCC native module design

## State

designed

## Judges

[P-000019](situation/promises/P-000019-pcc-native-module-design.md)

## Inputs

- The pinned donor coordinate in
  [D-000022](situation/decisions/D-000022-pcc-native-design-transfer.md), the
  exact source head's diff under `modules/poda-profile-spike/`, the module build
  output identity, and the focused adapter/validation test result on that head,
  retained as run identity rather than as a behavior leg.
- A signed-in browser observation against the demo homeserver covering: Studio
  Podcasts and Episodes collections, the podcast wizard (live readiness,
  category cap of three, validation rejection, Save Draft → list, Create →
  detail), the episode wizard (readiness, publish-state radio cards, Create →
  detail), the own-profile page (welcome banner, topic chip add/remove,
  visibility segmented control, stats/At-a-Glance rail, and an Edit Profile
  submission retaining its creator fields), the example fixture profile, and
  the room-widget profile card.
- The same surfaces in Poda Light and Poda Dark at desktop (1440px) and narrow
  (500px) widths, including a room-widget observation of the initial
  client-theme template and a later widget-API theme update, plus a native Chat
  screen.
- Missing build/test or browser evidence makes an observation `INVALID` or
  `BLOCKED`, never PASS; this Oracle judges no behavior outside P-000019's
  Scope.

## Pass

A complete PASS requires every leg:

- **P1 — Design language.** Named module surfaces, including the room-widget
  profile card, render the donor token set (`.podaNative` HSL triples),
  card/section anatomy, badges, inputs, and icon tiles in both Poda themes; the
  widget applies both its initial client theme and later host theme updates to
  its iframe-local token selection; no surface keeps the superseded ad-hoc
  palette.
- **P2 — Wizard transfer.** Both creation flows present the donor wizard frame
  (hero card with chips, section cards with guidance notes, readiness rail with
  live percent/checklist); podcast creation enforces the three-category cap,
  both flows reject invalid drafts inline, and each reaches its correct
  post-submit route.
- **P3 — Profile transfer.** The profile page shows the publish pill, hero with
  avatar tile and topic chips, the visibility segmented control (own profile
  interactive), and the right rail with stats, share, and At-a-Glance strength;
  an Edit Profile submission retains its identity, descriptive, topic, social,
  booking, media, and intro-video values; the widget card renders the same
  design.
- **P4 — Behavior preservation.** Collection → create → detail flows preserve
  the existing episode projection of form show notes and enclosure URL into
  `showNotesHtml` and `media.primaryEnclosure`, and preserve scheduled-time
  representation; the session-only adapter boundary (reload restores seed state)
  and native Chat remain unchanged.

## Fail

A valid observation fails on any corresponding in-Scope contradiction:

- **F1 — Design language.** A named surface keeps superseded styling or renders
  broken tokens in either Poda theme, including a widget that cannot select the
  appropriate iframe-local tokens on its initial theme or a later host update.
- **F2 — Wizard transfer.** The wizard frame, readiness rail, category cap, or
  inline validation is absent or dead (affordances that do nothing).
- **F3 — Profile transfer.** The profile rail, segmented control, or topic
  interactions are absent or dead; a rendered Edit Profile field is ignored or
  cleared on save; or the widget diverges from the module design.
- **F4 — Behavior preservation.** A previously working flow, episode
  detail-field projection, or scheduled-time representation regresses, the
  adapter boundary is bypassed, or Chat changes from native behavior.

## Implementation coverage

This Oracle remains `designed`. The focused adapter test at
`modules/poda-profile-spike/src/data/mockAdapter.test.js` plus the module build
and lint commands are run evidence, not credited executable legs.

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 | Module and widget theme-matrix and host-update render inspection | manual |
| F1 | Theme-matrix and host-update contradiction inspection | manual |
| P2 | Wizard interaction walkthrough | manual |
| F2 | Wizard-affordance contradiction walkthrough | manual |
| P3 | Profile/widget render and Edit Profile submission walkthrough | manual |
| F3 | Profile/widget or Edit Profile contradiction walkthrough | manual |
| P4 | Flow and episode-field projection walkthrough | manual |
| F4 | Flow-regression contradiction walkthrough | manual |

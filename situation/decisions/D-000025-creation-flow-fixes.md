# Creation-flow fixes: truthful copy, clearing errors, detail navigation

## Status

accepted

## Date

2026-10-07

## Context

The 2026-10-06 walk-through recorded creation-flow defects in
`modules/poda-profile-spike/`: copy claiming behavior the module lacks or
showing design notes ([G-000021](situation/gaps/G-000021-module-copy-contradicts-behavior.md)),
validation errors that outlive the correction
([G-000022](situation/gaps/G-000022-validation-errors-persist-after-correction.md)),
detail pages without navigation
([G-000023](situation/gaps/G-000023-studio-detail-pages-have-no-actions.md)),
placeholders that read as values
([G-000024](situation/gaps/G-000024-placeholder-and-accent-contrast.md)) and an
"S?" episode label ([G-000025](situation/gaps/G-000025-episode-season-placeholder-label.md)).

## Evidence

- The maintainer approved fixing these ("yeah keep going", 2026-10-07) after the
  proposal listed the false autosave text, stale messages, the "S?E1" label and
  back buttons on detail pages.
- During the work the maintainer added a rule: "podcasts should always have
  seasons" (2026-10-07).
- While fixing G-000022 it was observed that the episode wizard's inline errors
  never rendered: its error slots are keyed by input id (`epTitle`) while
  validation reports draft keys (`title`).

## Decision

- Copy states only what the module does: the episode draft bar says the draft is
  session-only and discarded on leave or reload; the episode hero note follows
  the selected publish state; the podcast wizard's design notes become guidance
  and its rail says "Ready to create" / "Some sections still empty"; the profile
  welcome banner points to Edit profile.
- A field's error and invalid state clear when that field is edited, and the
  form banner hides once no field error remains; episode errors render in the
  slot of the failing input.
- Podcast detail offers **Back to podcasts** and **New episode** (preselecting
  the podcast); episode detail offers **Back to episodes** and **Open podcast**.
  There is no edit flow to link to, so none is offered.
- Every episode has a season: the wizard's season number is required,
  pre-filled with 1 and at least 1. Episode number stays optional (its required
  status is the separate question in G-000019). Labels show only the numbers
  that exist, so new episodes read `S1E3` or `S1`; the helper still omits a
  missing season for older data.
- Placeholders render at 55% of the muted foreground so they no longer read as
  entered values.

## Why

Preview surfaces must not claim behavior that does not exist (I-000009,
D-000022), and each defect costs a creator a wrong belief or a dead end. All
fixes stay inside the module and its session adapter (I-000010).

## Rejected alternatives

- Adding podcast and episode edit flows to give detail pages an Edit action:
  rejected for this slice; it is new behavior, not a fix.
- Removing the episode draft bar instead of correcting it: rejected; the bar's
  Cancel action is useful and the corrected text is true.

## Consequences

- [P-000022](situation/promises/P-000022-creation-flow-fixes.md) states the
  behavior; [O-000022](situation/oracles/O-000022-creation-flow-fixes.md) judges it.
- G-000021, G-000022, G-000023 and G-000025 close; G-000024's placeholder part is
  resolved while its link and tooltip contrast parts stay open.
- Studio routes move into `modules/poda-profile-spike/src/studio/routes.js`.

## Revisit when

Podcast or episode editing exists (detail pages then gain Edit), or real
persistence replaces the session adapter (the draft copy changes).

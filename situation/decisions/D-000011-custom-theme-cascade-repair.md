# Custom-theme cascade repair and audit-driven surface corrections

## Status

accepted

## Date

2026-09-14

## Context

The signed-in visual audit of commit `6bd9f5704d` (Poda Light and Poda Dark,
1440px and 500px) found that rendered surfaces still computed to stock Element
colors: selected room rows resolved to `--cpd-color-bg-action-tertiary-selected:
#e1e6ec` (light) and `#26282d` (dark) instead of the Poda values `#ffebc7` and
`#563522`, and the right panel, action pills, and icon colors followed Element
defaults. The audit also identified presentation defects: light-theme Space
hierarchy tiles hovered dark-brown-on-dark-brown, per-room Join/View actions
were hover-only, the Space search magnifier rendered black on dark surfaces,
the 500px Space overview kept 60px side padding with a horizontal overflow, and
the narrow room header truncated the room name to `Ge…`.

## Evidence

- Live DOM inspection of the deployed build showed
  `style[title="custom-theme-compound"]` present with the correct Poda token
  declarations while computed values remained Element defaults.
- Controlled in-page experiments: an identical untitled `<style>` element wins
  the cascade (`#ffebc7` applied); the titled element never applies. A
  non-empty `title` on a `<style>` element enrolls it in the HTML style sheet
  set mechanism; no set is ever selected, so the sheet is inert. The fork's
  custom-theme Compound and font-face overrides were both affected.
- Post-fix measurements on the corrected build: light
  `--cpd-color-bg-action-tertiary-selected` computes `#ffebc7`, dark computes
  `#563522`; dark Space search icon computes `rgb(217, 194, 170)`; narrow
  overflow computes `0`; hovered light Space tile computes background
  `rgb(255, 241, 216)` with text `rgb(51, 34, 22)`.
- The demo Space avatar initially did not render because the provisioning used
  state event type `m.avatar`; the client reads `m.room.avatar`
  (`EventType.RoomAvatar` in the pinned matrix-js-sdk). Correcting the event
  type rendered the supplied mark in the rail and landing header.

## Decision

Repair the cascade at the shared injection point and keep corrections
Poda-scoped presentation:

1. `setCustomThemeVars` in `apps/web/src/theme.ts` identifies its generated
   style elements with `data-mx-custom-theme` instead of `title`, and
   `clearCustomTheme` matches the new attribute. The Compound override remains
   inside `@layer compound-tokens`, where it now wins as intended.
2. `apps/web/res/css/structures/_PodaTheme.pcss` adds, under the existing
   `body.mx_PodaTheme` marker: warm Space-hierarchy tile hover/focus treatment,
   always-visible native Join/View actions in the Space overview, a
   mask-tinted search icon resolved from `--cpd-color-icon-secondary`, and
   ≤700px corrections for Space overview padding, the fixed-width Space button
   row, and room-header spacing so the room name remains readable.
3. Demo provisioning marks General, Podcasting Equipment, Last Minute Guest
   Posts, and Last Minute Host Posts as `suggested` Space children and sets the
   supplied mark as the Space's native `m.room.avatar`.

## Why

The titled-`<style>` behavior is specified HTML, so the override could never
win; a data attribute preserves clearCustomTheme identification without
enrolling the sheet in a set. The CSS corrections restyle only presentation of
native Element actions (the Join/View buttons remain Element's own join/view
operations), consistent with
[I-000002](situation/invariants/I-000002-element-native-capability-boundary.md).
Suggested children and the space avatar are native Matrix room state, not
client behavior.

## Rejected alternatives

- Moving the Compound overrides out of `compound-tokens` or adding `!important`
  was rejected: the layer placement was already correct; only the title
  attribute disabled the sheet, and specificity escalation fights would make
  upstream merges harder.
- Hiding narrow-width header buttons was rejected as a behavior change;
  reducing native padding/gaps is presentation-only and recovers the room
  name.
- Injecting a custom room-picker component was rejected; the native Space
  hierarchy with persistently visible Join actions and `suggested` markers is
  the discoverable room-choice surface.

## Consequences

- The Poda palette now applies to Compound-driven components at runtime, so
  [P-000006](situation/promises/P-000006-poda-element-visual-alignment.md)
  rendered evidence must be re-taken on the corrected build before judgment.
- Upstream's equivalent custom-theme path inherits the same fix; if this fork
  ever upstreams theme work, this commit is the self-contained candidate.
- The room-title narrow behavior and Join-button visibility are Poda-scoped;
  operator themes keep stock Element behavior.

## Revisit when

The style sheet set mechanism changes, Element redesigns the Space hierarchy or
its action visibility model, or a Poda operator theme needs the stock hover and
hover-only actions.

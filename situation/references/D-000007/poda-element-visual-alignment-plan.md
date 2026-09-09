# Poda Element visual alignment plan

## Record status

- Date: 2026-09-09
- Decision: [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)
- Active plan: [PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md)
- Behavior: [P-000006](situation/promises/P-000006-poda-element-visual-alignment.md)
- Judgment: [O-000006](situation/oracles/O-000006-poda-element-visual-alignment.md)
- Open visual contract: [G-000002](situation/gaps/G-000002-poda-visual-acceptance-contract.md)
- Delivery Promise: [P-000007](situation/promises/P-000007-poda-theme-delivery.md)
- Brand source choice: [D-000008](situation/decisions/D-000008-poda-brand-source-assets.md)
- Theme implementation choice: [D-000009](situation/decisions/D-000009-configuration-backed-poda-theme.md)

This reference replaces the earlier first-migration scope. Git retains that
earlier planning commit; [PLAN-000001](situation/plans/abandoned/PLAN-000001-poda-element-integration.md)
is no longer active.

## Outcome

Restyle Element Web itself so it reads visually as Poda while leaving Element
and Matrix in sole control of chat behavior. This is a skin, not a second app,
not a new tab shell, and not a feature migration.

The implementation boundary is deliberately mechanical:

```text
Poda visual contract
        |
        v
Element branding + theme tokens + presentation CSS
        |
        v
existing Element React components, stores, actions, routes, and Matrix SDK
```

## Choices, corrections, and assumptions

| Topic                           | Selected path                                                                                     | Alternatives                                                            | Classification                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- |
| First migration                 | Restyle Element's existing interface                                                              | Build a combined podcast/chat application                               | **USER CHOICE**                                 |
| Capability boundary             | Expose only operations Element/Matrix already implements                                          | Add podcast, PODA, collaboration, artifact, or custom workflow behavior | **USER CHOICE**                                 |
| Chat owner                      | Retain Element and Matrix end to end                                                              | Port PCC chat state or APIs                                             | **USER CHOICE, carried forward**                |
| Donor role                      | Visual and assessment evidence only                                                               | Runtime dependency or source transplant                                 | **EVIDENCE-BASED CONCLUSION**                   |
| Framework                       | Keep React, Compound, PostCSS, current stores and view models                                     | Add Svelte, Tauri, Tailwind, Lucide, or donor model code                | **CONSTRAINT**                                  |
| Theme delivery                  | Configuration-backed custom themes plus minimal presentation changes                              | Built-in Poda themes or rewriting Element defaults                      | **IMPLEMENTATION CHOICE; RESOLVED BY D-000009** |
| Theme coverage                  | Poda Light and Poda Dark follow system preference; native high-contrast fallback retained         | Dark-only or light-only first slice                                     | **IMPLEMENTATION CHOICE; RESOLVED BY D-000009** |
| Panel geometry                  | Preserve Element's responsive resizers and defaults                                               | Copy donor widths exactly                                               | **IMPLEMENTATION CHOICE; RESOLVED BY D-000009** |
| Brand source set                | Use the maintainer-supplied vectors and render references retained by D-000008                    | Donor placeholder, screenshot extraction, or invented artwork           | **USER CHOICE; RESOLVED**                       |
| Brand placement and derivatives | Character mark and landscape in existing web branding slots; lantern scene retained but unshipped | Ship editor masters directly or create new surfaces around them         | **IMPLEMENTATION CHOICE; RESOLVED BY D-000009** |

### Earlier assumptions explicitly removed

The following were introduced by the earlier plan but were not required by the
maintainer's corrected direction. None is part of this migration:

- a persistent Home, Studio, Chat, and Profile application shell;
- podcast, episode, Podcast 2.0, publication, authoring, or playback behavior;
- a new Poda browser API, fixture adapter, or capability handshake;
- new audience/organization identity switching or Matrix Coordinator work;
- Poda workflow event types, cards, business objects, or custom deep links;
- public-page ownership choices; and
- porting any PCC native or structured-chat runtime implementation.

## Donor branch identification

The branch matching “chat interface” and the requested assessment logic is
`codex/structured-chat-mock` at
`6bddee4dfd9fa8ee0474aa70170b79650447cbc8` in the private
`cleverunicornz/yeet-code` repository. Its head subject is
`docs: add structured chat integration assessment` dated 2026-06-27.

The decisive files are:

- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/AGENTS.md`
- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/STRUCTURED_CHAT_INTEGRATION_STRATEGY.md`
- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/STRUCTURED_CHAT_CAPABILITY_MATRIX.md`
- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/STRUCTURED_CHAT_NATIVE_DEDUPE_MAP.md`
- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock/native/src/app.css`

Later `codex/todo-structured-chat-*` branches implement portions of that spike
in PCC native. They are not the source of the assessment method and do not
change this repository's Element-native boundary.

## The donor's assessment logic

The useful logic is a disciplined classification process, not a component
copying recipe:

1. Freeze the mock as UX evidence.
2. Locate the real production owner for each visible capability.
3. Classify present evidence as `implemented`, `partial`, `candidate`,
   `stub/fail-closed`, `not found`, `wrong boundary`, or `mock-only`.
4. Classify missing work by boundary: frontend DTO, API projection, API
   contract, domain behavior, composition, downstream ownership, or
   mock-only/out-of-scope.
5. Reuse proven production behavior before inventing a replacement.
6. Never wire a visible control to a stub or local fixture.
7. Preserve the production source of truth and remove older UI only after
   parity is proven.

Applied here, the production owner is usually already Element or Matrix. If no
native Element/Matrix owner exists, the feature is out of this migration rather
than a gap to fill now.

## Existing structural correspondence

| Donor visual region       | Element-native surface                                            | Assessment                                                                         |
| ------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 64 px bucket rail         | `SpacePanel.tsx` / `_SpacePanel.pcss` (68 px collapsed)           | Strong visual analogue; keep Space semantics                                       |
| 320 px thread list        | `LeftPanel.tsx`, `RoomListPanel.tsx`, shared room-list components | Strong visual analogue; mock “threads” map to Matrix rooms/DMs, not Matrix threads |
| Timeline header           | `RoomHeader.tsx` / `_RoomHeader.pcss` (64 px)                     | Restyle existing room identity and actions                                         |
| Message timeline          | `RoomView.tsx`, `EventTile.tsx`, timeline view models             | Restyle only; retain Matrix event rendering and virtualization                     |
| Composer                  | `MessageComposer.tsx` and current composer implementations        | Restyle existing controls and permission states                                    |
| 304–560 px context canvas | `MainSplit.tsx` / `RightPanel.tsx` (320 px default, resizable)    | Strong visual analogue; keep current panel phases                                  |
| Global notification panel | `NotificationPanel.tsx` and notification stores                   | Style existing Matrix notifications only                                           |
| Profile canvas/full view  | current member info and `UserView.tsx`                            | Style Matrix profile/member data only                                              |
| Mock home                 | `HomePage.tsx`                                                    | Visual direction only; do not add PODA actions                                     |

The two applications already share Inter and approximately eight-pixel corner
radii. Their desktop geometry is close enough that visual alignment does not
require a layout rewrite.

## What can be used

### Use as direct design input

- Poda gold `#F9BA51`, supporting orange `#EFB855`, deep orange `#E5793E`,
  warm orange `#E4763C`, brown `#563522`, and dark brown `#332216`.
- The supplied artwork adds mint `#58C781` and `#77A08E`, brand/scenic teal
  `#05A384`, `#4FA584`, `#128065`, `#006052`, and `#005247`, and scenic gold
  and orange values including `#F9AF47`, `#F8AA45`, and `#E9772F`.
- Light surface hierarchy: near-white canvas, white cards, warm cream secondary
  surface, dark-brown text, warm translucent borders, and gold focus/accent.
- Dark surface hierarchy: `#1a1410` canvas, `#2c2018` card, `#3a2d20`
  secondary surface, warm light text, muted brown text, and gold borders.
- Eight-pixel radii, compact square rail actions, restrained borders, warm
  selection fills, clear unread badges, and a layered rather than flat panel
  hierarchy.
- The visual relationship among rail, list, timeline, and context panel.

These are specifications to translate into Element semantic tokens. They do
not justify copying the donor stylesheet or its framework utilities.

### User-provided brand source set

[D-000008](situation/decisions/D-000008-poda-brand-source-assets.md) resolves
source authority with three SVG masters and three raster render references.
[The manifest](situation/references/D-000008/brand-source-asset-manifest.md)
retains exact paths, original names, dimensions, byte sizes, SHA-256 digests,
the extracted palette, source-safety findings, and early contrast checks.

- The circular character-and-microphone vector is the master candidate for the
  Poda mark; the supplied 500 × 504 PNG and 25 × 25 lossless WebP are render
  references, not replacement masters.
- The landscape vector and its 1536 × 1024 preview are candidate decorative
  background material for an existing Element branding slot.
- The girls-podcasting-by-lantern vector is candidate complete illustration
  material for an existing auth, welcome, or empty-state slot.
- The SVG masters remain provenance evidence outside runtime paths. Commit
  `7329320de0` adds the D-000009-approved source-linked derivatives and records
  their transformations, runtime slots, sizes, and digests in the manifest.
- The artwork never creates a podcast, episode, launcher, tab, card, or action;
  it can only decorate an Element surface that already exists.

The palette is not safe as a blind color substitution. For example, source
dark brown `#332216` on gold `#F9BA51` measures 8.81:1, while white on that gold
measures only 1.73:1. Final semantic roles and computed-state contrast remain
part of the acceptance contract.

### Adapt onto Element-native behavior

| Donor concept          | Safe Element adaptation                                              |
| ---------------------- | -------------------------------------------------------------------- |
| Active bucket          | Style the active Matrix Space or meta-space                          |
| Favorite conversation  | Style rooms carrying Element's existing `m.favourite` tag            |
| Muted conversation     | Style the existing room notification/push-rule state                 |
| Unread badge           | Style current receipt/unread notification state                      |
| Search box and filters | Style Element's existing room and message search controls            |
| Profile panel          | Style existing member info and user view                             |
| Notification center    | Style the current Matrix notification timeline                       |
| Context canvas         | Style current right-panel cards, threads, files, pins, and room info |
| Message states         | Style states already emitted and understood by Element               |
| Light/dark switch      | Use current ThemeWatcher and settings behavior                       |

### Do not use in this migration

- Svelte components, Tauri commands, Rust persistence, seeded fixtures,
  aggregate `MockState`, or pure donor mutation functions.
- Tailwind and Lucide dependencies; Element already has Compound tokens,
  Compound icons, CSS modules/PostCSS, and a bundled Inter font.
- The donor's Google Fonts import; Element packages Inter locally.
- PODA launcher, assistant/tool events, artifacts, approvals, booking, matches,
  playlists, podcast buckets, followed/owned podcast projections, support
  projections, or collaboration requests.
- Mock global/bucket/thread/profile notification preferences that do not map to
  a current Element control.
- PCC native, gateway, application-api, collaboration-service, or conversation
  runtime paths.
- Any “successful” local mutation used as a substitute for a Matrix operation.

## Semantic traps to prevent

- **Thread:** the mock generally calls a whole conversation a thread. In
  Element, a Matrix thread is a reply relation inside a room. Labels and logic
  must retain Matrix's meaning.
- **Bucket:** donor business buckets are not Matrix Spaces. Only existing
  Spaces, meta-spaces, and room-list sections may receive the visual treatment.
- **Block:** the mock combines block, mute, hide, collaboration denial, and
  sometimes deletion. Element's ignore, ban, leave, forget, report, and redact
  operations remain distinct.
- **Delete:** a Matrix client cannot promise deletion of a distributed room
  history merely because the mock removes a local array.
- **Favorite and mute:** use existing room tags and push rules; do not create a
  parallel Poda preference store.
- **Object card:** style only event and panel types Element already recognizes;
  do not introduce a Poda event schema in a visual migration.

## Element-native implementation route

### 1. Admit the visual contract

- Capture deterministic baseline screenshots of the current Element surfaces.
- Produce approved Poda reference frames for the same states and viewports.
- Resolve the open choices listed below, including exact artwork slots, crops,
  and dense-size derivatives from D-000008's admitted masters.
- Freeze semantic token values and contrast targets before changing CSS.

### 2. Implement the theme through supported hooks

- Map the palette first through `setting_defaults.custom_themes` and the
  `compound` token overrides already consumed by `apps/web/src/theme.ts`.
- Use `brand`, `branding`, and `default_theme` only within their documented
  presentation roles.
- Derive runtime artwork from D-000008's retained masters, remove editor-only
  metadata, preserve viewBox/aspect ratio, and record source/output digests.
- Keep Inter from the existing `@fontsource/inter` imports.
- Keep current Compound icons and accessible button primitives.
- Keep Element light/dark and high-contrast behavior until an explicit choice
  narrows theme availability.

### 3. Close presentation gaps without adding behavior

- Prefer semantic token changes over component selectors.
- Where tokens cannot express the approved surface hierarchy, add the smallest
  Poda-scoped CSS variable or presentation rule.
- Do not add React state, new callbacks, routes, SDK calls, event types, or
  storage to implement a visual effect.
- Avoid changing shared CSS modules unless the approved reference cannot be
  met through tokens; each such edit needs a visual test because it expands the
  upstream merge surface.
- Preserve existing panel resizers, virtualization, keyboard order, focus
  management, and responsive collapse behavior.

### 4. Apply the treatment surface by surface

1. Authentication, welcome, loading, error, and home surfaces.
2. Space rail, user menu, room search, room filters, sections, and room rows.
3. Room header, timeline events, reactions, composer, status and error states.
4. Right panel, notification panel, member/profile info, and room summary.
5. Settings, menus, dialogs, toasts, empty states, and narrow responsive views.

Each slice is accepted only when its screenshots and existing behavior checks
pass together.

### 5. Prove the boundary

- Build the production web client from the exact candidate head.
- Run existing Element tests for the named surfaces and journeys.
- Run Poda visual snapshots for light/dark and desktop/narrow states.
- Audit the diff and bundle for routes, SDK calls, network destinations,
  storage keys, Matrix event types, donor imports, and new behavior
  dependencies.
- Retain evidence through O-000006 and only then create a Witness.

## Likely repository touch points

The exact file list follows the selected theme-delivery approach, but the
expected presentation boundary is:

- `apps/web/src/theme.ts` and deployment theme configuration;
- `apps/web/res/themes/*` only if a built-in theme is selected;
- `apps/web/res/css/structures/_SpacePanel.pcss`;
- `apps/web/res/css/structures/_LeftPanel.pcss`;
- `apps/web/res/css/structures/_RoomView.pcss`;
- `apps/web/res/css/structures/_RightPanel.pcss`;
- `apps/web/res/css/views/rooms/_RoomHeader.pcss`;
- `apps/web/res/css/views/rooms/_EventTile.pcss`;
- `apps/web/res/css/views/rooms/_MessageComposer.pcss`; and
- relevant `packages/shared-components/src/room-list/*.module.css` only when
  semantic tokens cannot satisfy an approved frame.

No application API, Tauri, Svelte, podcast, organization, or Matrix protocol
module is an expected touch point.

## Implementation choices and remaining gates

[D-000009](situation/decisions/D-000009-configuration-backed-poda-theme.md)
selects the previously recommended implementation choices: config-backed Poda
Light and Poda Dark with native theme fallbacks, semantic visual fidelity while
preserving Element geometry, the character mark and landscape in existing web
brand slots, full reachable-client token coverage, and preservation of every
user-selected message layout.

Commit `7329320de0` is the first implementation commit. It supplies the
paired custom themes, operating-system theme mapping, source-derived brand
assets, default web branding, focused tests, and a production-build preflight
gate. It reaches the client through semantic theme variables and existing
branding configuration; no component-layout stylesheet was changed because no
demonstrated presentation gap required one.

Commit `8b5da14300` aligns the affected inherited Element unit expectations and
rendered snapshots with the selected Poda defaults. That forward test-only
commit covers the expected native propagation of `brand`, `default_theme`, and
branding slots through authentication, rooms, settings, widgets, notifications,
exports, device metadata, OAuth registration, and other existing client
surfaces; it does not add or alter a production capability.

The implementation does not wait on speculative product choices. The remaining
gates judge what is built:

1. **Visual acceptance evidence.** Approve deterministic light/dark desktop and
   narrow screenshots, including the current centered `cover` crop used for the
   auth landscape and the mark's legibility at each rendered size.
2. **Poda high contrast.** This slice deliberately falls back to Element's
   native light high-contrast theme. A separately designed Poda high-contrast
   variant remains an option after the light/dark contract is witnessed.
3. **External distribution terms.** The maintainer supplied and authorized the
   source set for this migration. Ownership, attribution, or relicensing terms
   for distribution outside the internal fork remain unrecorded and must be
   confirmed before a public release.

## Promise, Oracle, and Witness flow

The repository does not create a placeholder Witness:

```text
P-000006 visual behavior
        |
        v
implementation on a named commit
        |
        v
O-000006 exact pass/fail judgment
        |
        v
real CI run and retained artifacts
        |
        v
new W-* PASS/FAIL/INVALID/BLOCKED observation
        |
        v
P-000006 disposition
```

A green screenshot alone is insufficient. The Witness must cover both the
approved visual matrix and the named Element/Matrix behavior journeys on the
same exact head. Until that run exists, P-000006 remains unassured.

## Out of scope

- podcast, episode, profile-business, Podcast 2.0, and public-page features;
- PODA, AI, tool, approval, artifact, booking, match, or playlist features;
- custom Matrix events or altered Matrix semantics;
- new web APIs, PCC services, gateways, Tauri commands, or local mock storage;
- identity/context architecture changes;
- replacement of Element's routing, state stores, view models, accessibility
  primitives, or responsive layout engine; and
- Electron-specific behavior or packaging in this first web migration.

## Provenance

- Donor UX and assessment evidence:
  `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock`
  (private; requires repository access).
- Element theme implementation: `apps/web/src/theme.ts`,
  `apps/web/res/themes/light-custom/css/_custom.pcss`, and `docs/theming.md`.
- Element layout implementation:
  `apps/web/src/components/views/spaces/SpacePanel.tsx`,
  `apps/web/src/components/structures/LeftPanel.tsx`,
  `apps/web/src/components/views/rooms/RoomListPanel/RoomListPanel.tsx`,
  `apps/web/src/components/structures/RoomView.tsx`,
  `apps/web/src/components/structures/MainSplit.tsx`, and
  `apps/web/src/components/structures/RightPanel.tsx`.
- Poda brand sources and palette:
  [D-000008](situation/decisions/D-000008-poda-brand-source-assets.md) and its
  [asset manifest](situation/references/D-000008/brand-source-asset-manifest.md).

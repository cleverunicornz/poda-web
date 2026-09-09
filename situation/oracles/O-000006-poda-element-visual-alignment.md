# Poda Element visual alignment oracle

## State

implemented

## Judges

- [P-000006](situation/promises/P-000006-poda-element-visual-alignment.md)

## Inputs

- An approved Poda visual contract and deterministic reference screenshots.
- [D-000008's source asset manifest](situation/references/D-000008/brand-source-asset-manifest.md)
  and an approved inventory of runtime derivatives recording their source
  digest, transformation, dimensions/viewBox, output digest, and Element slot.
- A production web build from the exact pull-request head.
- Computed-token and rendered screenshot results for every in-scope surface in
  light, dark, desktop, and narrow responsive states.
- Accessibility results covering contrast, zoom, focus visibility, keyboard
  operation, reduced motion, and screen-reader names.
- Existing Element unit, component, and end-to-end results for Space selection,
  room filtering and selection, DM and room messaging, reply, edit, reaction,
  Matrix threads, search, notifications, member information, right-panel
  navigation, settings, and deep links.
- A diff audit of routes, dependencies, network calls, persistent keys, Matrix
  event types, stores, view-model actions, and donor imports.

## Pass

- Each in-scope surface uses the approved Poda semantic colors, typography,
  surface hierarchy, borders, radii, focus treatment, and selected/unread
  treatment without clipping or loss of information at the declared viewports.
- Each shipped Poda logo, icon, or illustration derives from the admitted
  source set, has no external runtime reference or executable SVG content, and
  occupies only its approved existing Element presentation slot without
  obscuring a control or accessible name.
- Every named Element journey passes with the same route target, Matrix
  operation, permission gate, and user-observable state transition as the
  admitted baseline.
- Light and dark modes meet the approved visual references, and keyboard,
  focus, contrast, zoom, reduced-motion, and accessible-name checks pass.
- The change adds no product route, network destination, persistence key,
  Matrix event type, business DTO, state owner, or behavior-only dependency.
- The production bundle contains no code, fixtures, persistence, or runtime
  dependency from the Svelte/Tauri donor.

## Fail

- An in-scope surface retains unapproved visual treatment, becomes unreadable,
  clips required content, or loses a responsive or accessibility state.
- A shipped Poda image lacks recorded provenance, differs materially from its
  approved rendering, fetches an external resource, contains executable SVG
  content, or introduces or obscures an interface affordance.
- A named journey changes its route, Matrix operation, permission decision, or
  state transition, even if its screenshot looks correct.
- A mock affordance is exposed without an existing Element/Matrix operation, or
  a donor model function is used to replace Element state.
- The diff introduces a new product route, network destination, persistence
  key, event type, business model, behavior dependency, or donor runtime code.

## Implementation

- `apps/web/src/podaTheme.test.ts` checks the semantic theme contract's core
  token, font, contrast, status-color, presentation-variable, and Poda document-
  marker boundaries.
- `apps/web/src/settings/watchers/ThemeWatcher.test.ts` checks Poda system-theme
  selection without replacing explicit Element theme selection.
- `apps/web/scripts/derive-poda-brand-assets.mjs --check` checks runtime-asset
  provenance, determinism, geometry preservation, and SVG safety.
- `apps/web/scripts/check-poda-branding.mjs` and
  `apps/web/src/components/views/auth/AuthHeaderLogo.test.tsx` check the existing
  Poda brand slots and accessible logo name. The source checker also requires
  the Poda-scoped stylesheet to name the native Space rail, room list, room
  header, timeline, event, composer, right-panel, home, and dialog surfaces and
  requires the native bubble-layout default.
- `apps/web/res/css/structures/_PodaTheme.pcss` contains the Poda-only surface
  treatment; `apps/web/src/theme.ts` applies its body marker only while a Poda
  theme is active.
- The inherited unit contracts and rendered snapshots affected by the Poda
  defaults cover existing auth, room, settings, widget, notification, export,
  device, and Matrix-facing brand behavior.
- The broader rendered surface, accessibility, end-to-end Element journey,
  donor, and capability-boundary legs remain manual until exact-head evidence
  is retained.

## Implementation coverage

| Leg | Decision                                                                             | Coverage                                                                                                                                                  |
| --- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | Approved visual contract is rendered across the declared matrix                      | `apps/web/src/podaTheme.test.ts` checks core tokens and Poda scope; the source checker names all native surfaces; complete rendered room-state matrix remains manual                 |
| P2  | Existing Element/Matrix journeys retain their admitted outcomes                      | affected inherited unit contracts and snapshots are executable; exact-head end-to-end regression journeys remain manual until retained CI evidence exists |
| P3  | Accessibility and responsive states pass                                             | core contrast and logo accessible-name checks are executable; focus, zoom, responsive, and rendered checks remain manual                                  |
| P4  | No new capability boundary is introduced                                             | source checks cover the presentation-only selectors and native layout default; final diff and bundle audit remains manual                                                   |
| P5  | No donor runtime material ships                                                      | tracked implementation uses Element theme/config/CSS paths; final diff and dependency audit remains manual                                                                    |
| P6  | Runtime brand assets retain approved provenance and safe presentation-only placement | `apps/web/scripts/derive-poda-brand-assets.mjs --check`; `apps/web/scripts/check-poda-branding.mjs`; rendered placement remains manual                    |
| F1  | Any Pass-leg contradiction fails the Oracle                                          | named executable checks decide their covered contradictions; remaining clauses are manual                                                                 |

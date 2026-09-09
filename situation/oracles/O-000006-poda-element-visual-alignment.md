# Poda Element visual alignment oracle

## State

designed

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

## Implementation coverage

| Leg | Decision | Coverage |
|---|---|---|
| P1 | Approved visual contract is rendered across the declared matrix | manual until screenshot and computed-token checks are implemented |
| P2 | Existing Element/Matrix journeys retain their admitted outcomes | manual until the exact regression suite is selected and run |
| P3 | Accessibility and responsive states pass | manual until automated and manual accessibility evidence is retained |
| P4 | No new capability boundary is introduced | manual diff and bundle audit |
| P5 | No donor runtime material ships | manual diff and dependency audit |
| P6 | Runtime brand assets retain approved provenance and safe presentation-only placement | manual manifest, source, bundle, screenshot, and accessibility audit |
| F1 | Any Pass-leg contradiction fails the Oracle | manual |

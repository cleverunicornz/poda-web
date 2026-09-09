# Poda Web

## Identity

Poda Web is an internal fork of Element Web that retains a monorepo for Element's Matrix web and desktop clients.

## Ownership

- `UPSTREAM_FORK`: https://github.com/element-hq/element-web

## Phase

`IMPLEMENTATION` — the configuration-backed Poda theme bootstrap is
implemented and the corrective treatment of native Element surfaces is being
validated; exact-head CI, room-state visual, accessibility, and behavior
assurance is pending.

## Implementation map

- `apps/web/` — the web client and its static distribution build.
- `apps/desktop/` — the Electron desktop client.
- `packages/` and `modules/` — shared and optional client components.
- `.github/workflows/` — inherited build, test, and deployment automation.

## Current state

The fork retains the upstream Element client source tree. The earlier broad
application-integration plan has been abandoned before implementation. The
active direction is to restyle the existing Element Web interface without
adding behavior beyond capabilities Element Web and Matrix already provide.
User-supplied Poda vector masters and render references are retained under
`situation/references/D-000008/`. D-000009 selected config-backed Poda Light
and Poda Dark themes, existing Element branding slots, preserved layout
geometry, and deterministic runtime derivatives. Commit `7329320de0`
implements that bootstrap with focused tests and a production-build preflight
gate; commit `8b5da14300` aligns the affected inherited unit contracts and
snapshots with the selected defaults. The maintainer rejected its first
authenticated render as visually too close to stock Element. D-000010
supersedes D-000009's presentation limit and selects a Poda document marker,
Poda-scoped styling of native Element surfaces, and Element's native bubble
layout as the default while preserving explicit user choice. The corrective
candidate renders the supplied landscape, character mark, warm light surfaces,
dark brown/green surfaces, rail, room-list shell, home card, actions, and
native room dialogs in both modes. The logged-in test account has no joined
rooms, so room-row, timeline, composer, and right-panel rendered evidence is
still absent. No Poda visual or fork-specific assurance Witness exists yet.

## Intended state

The responsive web client retains Element's existing information architecture,
Matrix data model, routes, stores, permissions, and actions while presenting an
approved Poda visual treatment through Element's theme and branding mechanisms
and narrowly scoped presentation styles. The active plan is
`situation/plans/active/PLAN-000002-poda-element-visual-alignment.md`.

## Closure state

- Current run: none
- Last completed closure: run `20260907T093249Z-b53af60d7e2ae8c9021e94dd628d478dbc65c37e`, opened at `51ccbf3c36fc160066424b656456b115994309b5`
- Transcript: `s3://cvu-automation-runs-uk/bedrock/cleverunicornz/poda-web/pr-1/20260907T093249Z-b53af60d7e2ae8c9021e94dd628d478dbc65c37e/`

# Poda Web

## Identity

Poda Web is an internal fork of Element Web that retains a monorepo for Element's Matrix web and desktop clients.

## Ownership

- `UPSTREAM_FORK`: https://github.com/element-hq/element-web

## Phase

`IMPLEMENTATION` — the fork is implementing the selected visual-only Poda
theme and branding slice; assurance has not started.

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
`situation/references/D-000008/`. D-000009 selects config-backed Poda Light and
Poda Dark themes, existing Element branding slots, preserved layout geometry,
and deterministic runtime derivatives. Implementation is active; no Poda
visual or fork-specific assurance witness exists yet.

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

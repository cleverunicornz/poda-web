# Poda Web

## Identity

Poda Web is an internal fork of Element Web that retains a monorepo for Element's Matrix web and desktop clients.

## Ownership

- `UPSTREAM_FORK`: https://github.com/element-hq/element-web

## Phase

`PLANNING` — the fork has selected and recorded its Poda product direction; implementation and assurance have not started.

## Implementation map

- `apps/web/` — the web client and its static distribution build.
- `apps/desktop/` — the Electron desktop client.
- `packages/` and `modules/` — shared and optional client components.
- `.github/workflows/` — inherited build, test, and deployment automation.

## Current state

The fork retains the upstream Element client source tree. It now records a
Poda product composition, authority boundary, contract boundary, branding
boundary, public-publication boundary, and active implementation plan. The
promised Poda behavior remains hypothetical and no fork-specific assurance
witness exists.

## Intended state

The responsive web client becomes one Poda-branded product with Home, Studio,
Chat, and Profile surfaces. Element Web remains the Matrix implementation under
Chat; first-party React surfaces provide listening, discovery, personal guest
profiles, and organization-scoped podcast and episode authoring. Versioned
organization APIs own business state, Matrix owns communication state, and
canonical public pages remain at the external publication boundary. The active
plan is `situation/plans/active/PLAN-000001-poda-element-integration.md`.

## Closure state

- Current run: none
- Last completed closure: run `20260907T093249Z-b53af60d7e2ae8c9021e94dd628d478dbc65c37e`, opened at `51ccbf3c36fc160066424b656456b115994309b5`
- Transcript: `s3://cvu-automation-runs-uk/bedrock/cleverunicornz/poda-web/pr-1/20260907T093249Z-b53af60d7e2ae8c9021e94dd628d478dbc65c37e/`

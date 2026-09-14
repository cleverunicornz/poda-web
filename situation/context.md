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
implementation at commit `5baf4ea7e3` renders the supplied landscape,
character mark, warm light surfaces, dark brown/green surfaces, rail, room-list
shell, home card, actions, and native room dialogs in both modes. A signed-in
audit of that build then found the custom-theme Compound overrides inert at
runtime (the generated style elements carried `title`, which leaves them
unselected in the HTML style sheet set mechanism) plus Space hover, action
visibility, icon-tint, and narrow-width presentation defects. D-000011 repairs
the cascade in `apps/web/src/theme.ts` and applies the Poda-scoped corrections;
verified post-fix renders show the Poda tokens computing in both modes, the
demo Space carrying the supplied mark as its native `m.room.avatar`, visible
Join actions, and zero narrow overflow. Retained approved visual evidence and
exact-head CI remain pending. No Poda visual or fork-specific assurance Witness
exists yet.

The demo Matrix homeserver now carries the four-Space organization from
D-000012: Poda Community (General auto-joined; Equipment and both Last Minute
rooms suggested), Podcast Topics (19 Apple-taxonomy rooms), Podcast
Communities (empty, staff-curated), and Poda Support (read-only
Announcements + Support Chat). All children use space-restricted join rules,
verified live by invite-free room joins and a blocked regular-user post.

## Intended state

The responsive web client retains Element's existing information architecture,
Matrix data model, routes, stores, permissions, and actions while presenting an
approved Poda visual treatment through Element's theme and branding mechanisms
and narrowly scoped presentation styles. The active plan is
`situation/plans/active/PLAN-000002-poda-element-visual-alignment.md`.

## Closure state

- Current run: none
- Last completed closure: run `20260914T132604Z-a79258d272a124a98501ae78dc96a0e468e506ac`, opened at `9d80dc875cea2807fafaee8f476d45063ce1bb8a`
- Transcript: `https://github.com/cleverunicornz/infrastructure/actions/runs/34848943825`

# Comprehensive Poda and Element integration plan

## Record status

- Recorded: 2026-09-09
- Product: Poda Web
- Delivery state: planned, not implemented
- Owning decision: [D-000002](situation/decisions/D-000002-poda-product-composition.md)
- Superseded plan: [PLAN-000001](situation/plans/abandoned/PLAN-000001-poda-element-integration.md)

This reference preserves the complete product and implementation intent behind
the thin Bedrock Plan. Statements labelled **USER CHOICE** are selections made
by the maintainer during planning. Statements labelled **PLANNING DEFAULT** are
implementation choices selected to make the plan executable but were not
presented as settled product preferences. Statements labelled **PENDING
CONFIRMATION** identify external decisions that may supersede the default.
Statements labelled **DISCOVERED CONSTRAINT** describe existing repositories or
accepted dependency records rather than preferences.

Nothing in this document claims that the behavior is already implemented or
assured. Promises describe the intended behavior, Oracles define how it will be
judged, and Witnesses are created only after actual runs produce retained
evidence against exact commits.

## Goal and outcome

Poda Web will become one responsive web application that combines:

- the mature Element Web implementation of Matrix chat, rooms, Spaces,
  encryption, calls, files, threads, search, notifications, and settings; and
- Poda's listening, discovery, creator/guest profile, podcast, episode,
  Podcasting 2.0, media, transcription, AI, preview, and publishing workflows.

The user experiences one Poda product with persistent **Home**, **Studio**,
**Chat**, and **Profile** tabs. Matrix is the communication subsystem under
Chat, not a second branded application or embedded browser. The supplied visual
concept is interpreted as Poda chrome surrounding a full Matrix work area; it
is not a requirement to reproduce the nested-browser mockup or donor pixels.

Success means that an authenticated listener, guest, creator, or organization
staff member can move between listening, authoring, personal identity, and
Matrix communication without changing products, signing into unrelated
accounts, losing playback state, or confusing organization authority.

## User choices and alternatives

The following table distinguishes the maintainer's selections from the options
that were considered but not selected.

| Area | Selected choice | Options not selected | Status |
|---|---|---|---|
| Delivery target | Responsive web client only | Web plus Electron; Tauri/native delivery | **USER CHOICE** |
| Product composition | One React application built around the Element Web foundation | Side-by-side apps, iframe/webview, or separate native shell | **USER CHOICE** |
| Main navigation | Persistent Home, Studio, Chat, Profile tabs | Existing Element-only navigation; five separate Podcast/Episode tabs; sidebar-only product navigation | **USER CHOICE** |
| Studio structure | Podcasts and Episodes live together under Studio | Independent top-level Podcast and Episode tabs | **USER CHOICE** |
| Initial product depth | Full in-scope authoring parity, not a shell-only prototype | Read-only catalog, visual shell, or minimal CRUD first product | **USER CHOICE** |
| Communication | Matrix replaces the donor Collaborations UI | Port the old collaboration screens or maintain two messaging systems | **USER CHOICE** |
| Friends semantics | Matrix people, shared rooms, and direct messages | A separate Poda friend/follow graph | **USER CHOICE** |
| Browser integration | New web API plus Matrix identity | Browser adapter over the donor native bridge or old transitional gateway | **USER CHOICE** |
| Repository boundary | This repository implements the web client and contracts | Implement organization, Matrix Coordinator, media, AI, and public-builder backends here | **USER CHOICE** |
| Public pages | Authenticated previews and links here; canonical public pages in the separate builder | Make the SPA the canonical unauthenticated renderer | **USER CHOICE** |
| Authoring scope | Content, media, Podcasting 2.0, transcription, AI review, preview, scheduling, and publishing | Billing checkout, analytics dashboards, and donor collaboration screens | **USER CHOICE** |
| Content ownership | Organizations own podcasts, episodes, plans, and publication assignments | Personal ownership of organization publications | **USER CHOICE** |
| Profile ownership | Personal profiles for listeners, guests, creators, and staff; guesting is the primary profile purpose | Organization-only staff cards or creator-only profiles | **USER CHOICE** |
| Rights | Owners/admins manage all organization content; members edit assigned publications; people edit their own profiles | Matrix power levels alone; unrestricted organization-member editing | **USER CHOICE** |
| Plan behavior | Show server-enforced status, usage, limits, and upgrade guidance | Add payment checkout or client-only entitlement enforcement | **USER CHOICE** |
| Matrix service boundary | Poda-managed audience and organization Matrix services with federation | Arbitrary homeserver login or non-federated private-only chat | **USER CHOICE** |
| Matrix identity UX | Automatic audience/organization context switching with one active isolated client | Manual logout/login, simultaneous clients, or shared stores | **USER CHOICE** |
| Chat feature depth | Retain the complete Matrix client feature set | DMs-only or reduced custom chat UI | **USER CHOICE** |
| Companion services | Retain compatible code but hide features until Poda-operated endpoints are advertised | Use inherited Element public endpoints or delete all companion integrations | **USER CHOICE** |
| Pre-API development | Typed provisional contract plus realistic dev/test fixtures | Wait for all backends; use production mocks | **USER CHOICE** |
| Workflow messages | Actionable typed cards for guest invitations, AI/transcription, review, and publishing | Plain text only or non-actionable external links | **USER CHOICE** |
| Search | Persistent global search plus Studio, Settings, and Matrix-context search | Search only inside chat or separate uncoordinated search boxes | **USER CHOICE** |
| Home | Adaptive listening home with player, queue, transcript, favorites, discovery, and authorized work tasks | Element's chat home or a creator-only dashboard | **USER CHOICE** |
| Drafts | Server autosave with revisions, local crash recovery, and explicit preview/publish | Manual save only, local-only drafts, or implicit publication | **USER CHOICE** |
| Media | Resumable direct multipart uploads with scoped presigned sessions and digest finalization | Proxy entire files through the SPA/API or single-request uploads only | **USER CHOICE** |
| Podcasting 2.0 | Implement the complete current formalized Podcast Namespace revision | Copy only donor-supported fields or implement a small tag subset | **USER CHOICE** |
| Visual approach | Preserve donor information architecture and workflows in a coherent React/Poda design | Pixel-copy the Svelte/Tauri UI or retain Element styling unchanged | **USER CHOICE** |
| Brand mark | Orange microphone identity | Blue/yellow linked mark or retained Element marks | **USER CHOICE** |
| Rebrand depth | Replace every user-facing Element surface while retaining legal notices and invisible internals | Mixed branding or repository-wide internal source rename | **USER CHOICE** |
| Languages | Complete and human-review every locale currently shipped by the web client | English-first launch, four donor languages, partial translations, or silent English fallback | **USER CHOICE** |

## Planning defaults and pending confirmations

These are deliberately called out so that they are not mistaken for maintainer
choices.

| Topic | Default used by this plan | Why | Revisit or gate |
|---|---|---|---|
| Business-state authority | Matrix owns communication; organization APIs own business state; Coordinator owns bindings/bootstrap/routing | Matches accepted Matrix Coordinator decisions | **PENDING CONFIRMATION:** discussion with Dan. A different result must supersede D-000003 and affected coordinator records before implementation changes. |
| Platform authentication | Rauthy Authorization Code + PKCE for the platform session, then Matrix SSO for the selected binding | Matches the accepted coordinator architecture and a static browser client | Revisit only through the authentication owner. |
| Route technology | Retain Element's hash routing and add first-party Poda route parsing | Avoids breaking Matrix deep links or requiring server rewrites | Revisit if the deployment gains an explicit history-routing contract. |
| Client composition | `PodaAppRoot` outside Matrix lifecycle and `PodaShell` inside the logged-in layout | Keeps platform/player state persistent while preserving Matrix internals | Implementation name may change; ownership boundaries may not. |
| Client contract name | `PodaClientContractV1` | Gives the provisional contract a stable versioned identity | Backend may choose transport paths, but must preserve the agreed semantics/version handshake. |
| Draft recovery expiry | Seven days for local text recovery drafts | Bounds stale and sensitive browser state while covering ordinary crashes | Product/security review may select a shorter expiry before implementation. |
| Local draft contents | Text/form state only; never tokens or media blobs | Limits browser storage and sensitive-data exposure | Security review may narrow it further. |
| Route-context defaults | Home/Profile use audience identity; Studio uses selected organization; Chat retains explicit context | Makes identity changes predictable from task context | User research may refine prompts, not storage isolation or authority. |
| Matrix switch behavior | Transactional stop, persist, hydrate, start, restore; roll back on failure | Prevents two active clients and half-switched UI | Must remain failure-safe even if lifecycle APIs change. |
| Workflow event type | `m.room.message` with `msgtype: "io.poda.workflow.v1"` and readable `body` | Supports capable Poda clients while degrading to understandable text elsewhere | Coordinate the final namespace with backend/Matrix owners before shipping. |
| Podcast call interaction | Pause podcast audio when a Matrix call starts and do not auto-resume | Avoids competing audio and surprising post-call playback | May become a user preference later. |
| Unknown Podcast Namespace fields | Preserve unknown newer fields through patch/server merge and expose a compatibility warning | Avoids destructive edits when the backend knows a newer revision | Requires backend merge semantics. |
| Global logout | Clear all scoped local sessions and attempt revocation for each binding before ending the platform session | Prevents one identity remaining usable after apparent logout | Remote failures must remain visible and retryable. |
| Public URL availability | Published API records provide the canonical external URL | Required for the selected public-page boundary | Publication service contract must confirm this before launch. |
| Locale count | All production locale files under `apps/web/src/i18n/strings/`; 41 files exist at the planning base | Implements “all current locales” from repository truth | Recount at each release; additions join the launch gate. |

## Discovered repository and dependency constraints

- **DISCOVERED CONSTRAINT:** Poda Web is an upstream fork of Element Web. The
  React/TypeScript web client is under `apps/web/`; Electron is under
  `apps/desktop/`.
- **DISCOVERED CONSTRAINT:** Element routes are hash-based, and native Matrix
  room/user routes already have external deep-link value.
- **DISCOVERED CONSTRAINT:** the inherited login and persistence paths assume a
  single account through fixed credential, sync, and crypto-store identities.
  The pinned Matrix SDK accepts a crypto database prefix, so isolated stores are
  feasible, but multiple clients using one crypto store are unsafe.
- **DISCOVERED CONSTRAINT:** the donor at
  `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native`
  is Svelte 5/SvelteKit/Tauri 2. Its UI and behavior are evidence; its native
  bridge is not a browser production API.
- **DISCOVERED CONSTRAINT:** accepted Matrix Coordinator records at commit
  `5797be35ddb0451eba49a327cb1fe70b5d44ba0a` define stable audience and
  organization-local Matrix identities, Rauthy/Palpo integration, and separate
  organization-data authority.
- **DISCOVERED CONSTRAINT:** no fork-owned implemented Oracle and retained PASS
  Witness currently support a Poda-specific gate claim. G-000001 remains open
  and is only marked addressing by this plan.
- **DISCOVERED CONSTRAINT:** the repository currently contains 41 production
  translation JSON files under `apps/web/src/i18n/strings/`; tests and planning
  must derive the set from that directory rather than hard-code the count.

## Scope boundaries

### In scope

- Responsive authenticated web product.
- Poda application shell, routing, branding, themes, localization, and global
  player.
- Platform authentication, bootstrap, Matrix binding selection, and isolated
  client lifecycle.
- Home, catalog detail, favorites, discovery, queue, transcript, profiles,
  podcasts, and episodes.
- Organization roles and publication assignments as exposed and enforced by
  the organization API.
- Podcast and episode creation, editing, import, feed diagnostics, versioned
  autosave, recovery, preview, scheduling, publishing, and archiving.
- Podcast Namespace 1.0 authoring and round-trip preservation.
- Resumable media upload, transcription, AI refinement/description workflows,
  preview, acceptance, and application.
- Matrix people, rooms, Spaces, DMs, threads, files, calls, encryption, search,
  notifications, settings, and typed workflow cards.
- Contract fixtures, tests, CI, accessibility, brand/network audits, and
  Bedrock assurance evidence.

### Out of scope

- Electron and Tauri/native application changes.
- Backend, Matrix server, Rauthy, Matrix Coordinator, media service, AI service,
  or public-page-builder implementation.
- Billing checkout, payment-method management, and analytics dashboards.
- Donor Collaborations UI and a separate friend/follow graph.
- Canonical unauthenticated page rendering in this SPA.
- Pixel-for-pixel donor reproduction and repository-wide renaming of Element
  internals.
- Use of inherited Element-operated integrations, analytics, diagnostics,
  widgets, calls, or default service endpoints.

## Application architecture

The intended ownership tree is:

```text
PodaAppRoot
├── PlatformSessionProvider        Rauthy session and bootstrap
├── PodaClientProvider             validated v1 API contract
├── PodaMatrixContextController    one active scoped Matrix client
├── PodaSearchCoordinator          authority-aware global search
├── PodcastPlayerProvider          playback, queue, transcript state
└── MatrixChat
    └── LoggedInView
        └── PodaShell
            ├── Poda product page  Matrix side panels hidden
            └── Matrix layout      full panels/timeline under Chat
```

The platform providers live above route content so the session, selected
organization, search, and podcast player survive navigation. The Poda shell is
inside the authenticated application so Matrix dialogs, room timelines, and
settings continue to use their established lifecycle.

Legacy module-renderer exact matching is not used as the primary integration
surface. First-party Poda route types are added to the router and logged-in
layout so fallback behavior cannot accidentally render empty Matrix panels
beside product pages.

## Navigation and routes

| Route | Surface | Matrix context |
|---|---|---|
| `#/home` | Adaptive listening home | Audience by default |
| `#/studio/podcasts` | Organization podcast list | Selected organization |
| `#/studio/podcasts/new` | Create/import podcast | Selected organization |
| `#/studio/podcasts/:id` | Podcast editor | Owning organization |
| `#/studio/episodes` | Organization episode list | Selected organization |
| `#/studio/episodes/new` | Create/import episode | Selected organization |
| `#/studio/episodes/:id` | Episode editor | Owning organization |
| `#/profile` | Current personal profile editor/preview | Audience by default |
| `#/profiles/:platformUserId` | Authorized internal profile detail | Audience by default |
| `#/catalog/podcasts/:id` | Internal podcast detail | Audience by default |
| `#/catalog/episodes/:id` | Internal episode detail/player | Audience by default |
| `#/search` | Grouped global results | Audience unless result requires an organization |
| `#/chat` | Matrix home | Retain selected explicit context |
| Existing Matrix routes | Room, user, thread, settings, and other Matrix views | Resolve or retain required binding |

Element's existing home action maps to `#/chat`. Unknown Poda product routes
fall back to Poda Home with an observable not-found reason; unknown native
Matrix routes continue through Matrix routing behavior.

The top bar remains present throughout authenticated use. It contains the Poda
mark, four primary tabs, global search, relevant organization selector, player
summary, notifications, language/theme controls, and account access. Studio's
secondary navigation switches between Podcasts and Episodes without introducing
additional primary tabs.

## Authentication and Matrix context flow

### Initial sign-in

1. Start Rauthy Authorization Code + PKCE for a platform session.
2. Validate the returned platform session without placing its credentials in
   Matrix's existing fixed keys.
3. Request `PlatformBootstrap` from Matrix Coordinator/API.
4. Validate contract version, platform user, organizations, roles,
   assignments, entitlements, capabilities, and Matrix bindings.
5. Select the audience or requested organization binding from the destination
   route.
6. Start standard Matrix SSO for that binding. Reuse the Rauthy browser session
   where the deployment permits, but retain separate platform and Matrix
   credentials.
7. Create binding-scoped token, sync, and crypto stores, then start the Matrix
   client.
8. Render the requested route only after both platform authorization and the
   required Matrix context are known.

### Context switching

`PodaMatrixContextController` and `MatrixSessionVault` use the opaque binding ID
as the storage namespace. A switch:

1. resolves and authorizes the target binding;
2. presents a blocking transition state;
3. stops listeners, calls requiring teardown, sync, and the active client;
4. persists the current binding safely;
5. hydrates or establishes SSO for the target binding;
6. starts the target client and services;
7. restores the destination route; and
8. commits the active-binding marker only after success.

Any failure stops the target and restores the last known working binding and
route. Neither UI data nor crypto/session databases may be shared across opaque
binding IDs.

Home and Profile normally select the audience identity. Studio selects the
active organization. Chat preserves an explicitly selected context. A room
deep link asks bootstrap routing data which binding can access it and offers a
clear unavailable state if none can.

### Logout

Logout iterates known bindings, stops the active client, attempts remote Matrix
logout/revocation, and clears local Matrix tokens, sync data, crypto data,
active-binding metadata, API caches, and recovery drafts before ending the
platform session. Offline remote failures are reported with their affected
binding and do not masquerade as complete revocation.

## Public client contract

The web repository defines TypeScript types and runtime schemas for the
following interface groups. Backend URL shapes may be supplied by service
owners, but these semantics are required.

```ts
interface PodaClientContractV1 {
    bootstrap: PlatformBootstrapGateway;
    catalog: CatalogGateway;
    studio: OrganizationStudioGateway;
    profiles: ProfileGateway;
    mediaJobs: MediaJobGateway;
}

interface Revisioned<T> {
    value: T;
    revision: string; // opaque ETag/revision token
}

type PodaErrorCode =
    | "unauthorized"
    | "forbidden"
    | "not_found"
    | "validation"
    | "conflict"
    | "quota"
    | "unsupported"
    | "offline";
```

### `PlatformBootstrapGateway`

Returns contract/API generations, the platform user and personal profile,
audience binding, organization bindings, roles, publication assignments,
effective entitlements, plan/usage summaries, advertised service capabilities,
and Poda-owned endpoints. Identifiers and binding IDs are opaque.

### `CatalogGateway`

Provides adaptive Home sections, favorites, recommendations/discovery,
paginated global catalog search, internal profile/podcast/episode details, and
the canonical external URL for published records. Visibility filtering is
server-side.

### `OrganizationStudioGateway`

Provides organization-scoped list/detail/create/import/update/delete/archive
operations, feed diagnostics, revisioned draft autosave, preview, scheduling,
publication, member listings, and explicit publication assignments for
podcasts and episodes.

### `ProfileGateway`

Provides authorized profile detail and versioned personal draft/update,
preview, section-visibility, and publish operations. Organization roles never
silently grant ownership of another person's profile.

### `MediaJobGateway`

Provides multipart upload create/list-parts/resume/finalize/abort operations
and transcription/AI start/status/cancel/preview/apply operations. Finalization
verifies declared digest and authoritative media metadata before an asset can
be attached to publishable content.

### Cross-contract conventions

- IDs and cursors are opaque; timestamps are ISO-8601 UTC; service URLs are
  HTTPS outside explicit local development.
- Every mutation has an idempotency key. Revisioned mutations carry an opaque
  precondition equivalent to `If-Match`.
- Validation errors identify fields without returning secrets or internal
  service traces.
- Role, assignment, plan, and visibility checks run on the owning server even
  when the UI already hid or disabled an action.
- The initial bootstrap declares compatible API ranges and each optional
  capability. Older or incompatible required APIs disable the relevant Poda
  surface; newer APIs preserve unknown fields rather than dropping them.
- The production HTTP adapter and development/test fixture adapter implement
  the same interface. Production cannot import or select fixture behavior.

## Product surfaces

### Home and playback

Home is listener-first and adapts to granted roles. It includes current item,
queue, transcript, favorites, suggestions, and discovery for everyone. Guests
and creators additionally receive compact invitations, review requests,
transcription/AI job states, and publication tasks.

The player is global rather than owned by a route. It retains item, position,
speed, queue, transcript selection, and playback state across product routes
and successful Matrix identity changes. Authorization or catalog removal
invalidates inaccessible queue entries visibly. Starting a Matrix call pauses
podcast audio; ending a call does not surprise the user by resuming it.

### Profiles

Profiles are personal and support listener, guest, creator, and staff identity,
with guest booking as the central use case. Preserve the donor concepts for:

- avatar, banner, display name, headline, tagline, about, and biography;
- topics, expertise, ideal subjects, best fit, and custom fields;
- social links, intro video, media kit, testimonials, featured appearances, and
  booking information;
- section ordering/visibility, private draft, preview, and explicit publish.

Profile pages expose Matrix DM entry where the current identity is permitted to
contact the person. The organization API supplies the stable platform person;
the Coordinator supplies the appropriate Matrix binding/user mapping.

### Podcast Studio

Podcast authoring preserves the donor's core RSS data, cover art, categories,
language, explicit flag, show type, status, visibility, import, feed
diagnostics, social/booking data, ideal guest and requirements, testimonials,
media kit, audience descriptors, custom fields, and members. Organization
owners/admins manage the whole catalog; members can edit only explicitly
assigned publications.

Podcast creation supports blank draft and feed import. Import remains a draft
until diagnostics and conflicts are reviewed. Autosave never publishes.
Preview is internal; publish updates authoritative organization state and then
reports the external publication job/URL separately.

### Episode Studio

Episode authoring preserves title, subtitle/summary, show notes, status,
visibility, numbering, season/type, explicit flag, schedule, primary and
alternate media, transcripts, chapters, soundbites, people/guests, funding,
location, license, content links, and relevant current namespace metadata.

Episodes support resumable upload, transcription, AI-assisted description or
refinement, review, preview, scheduling, publication, and archive. AI outputs
are immutable proposals until explicitly accepted into a revisioned draft.
Publication rejects incomplete uploads, unresolved validation errors, stale
revisions, and server-denied plans or roles.

### Drafts and conflicts

Editors use debounced server autosave and a local IndexedDB recovery copy scoped
by platform user, organization where applicable, entity type, and entity ID.
The recovery copy contains form text/state, never credentials or media blobs,
and expires after the planning-default seven-day interval. Publish, delete, and
global logout clear the appropriate recovery record.

A conflict halts autosave. The UI shows the authoritative revision and local
changes and offers reload, copy local content, or deliberately start from the
new revision. It never silently merges or overwrites the server.

## Podcast Namespace 1.0

Implementation is pinned to
https://github.com/Podcastindex-org/podcast-namespace/blob/c0ff5caa3729610362ee93f8034454fa41f3c493/docs/1.0.md.
The implementation registry covers the current tag families and their declared
parents, including transcript, locked, funding, chapters, soundbite, person,
location, season, episode, trailer, license, alternate enclosure/source/
integrity, guid, value/recipient, medium, live item, content link, social
interact, block, txt, remote item, podroll, update frequency, podping, value
time split, chat, publisher, and image.

The deprecated `images` form can be parsed and preserved for legacy records but
is not offered for new authoring. The registry records scope, cardinality,
required attributes, types, enumeration values, parent constraints, and
serialization order where the specification requires it. Tests are generated
from the registry so UI support and serialization cannot silently diverge.

If bootstrap advertises an older namespace revision than the pinned minimum,
authoring fails closed. If it advertises a newer revision, known fields remain
editable and unknown fields are preserved through revisioned patch/server merge
with a compatibility warning.

## Search ownership

The persistent top-bar search opens with Cmd/Ctrl-K and groups results rather
than merging authority:

- organization/catalog APIs search authorized profiles, podcasts, episodes,
  and organization content;
- Matrix searches people and rooms;
- Matrix's existing server/local mechanisms handle room message search,
  including encrypted local indexing where supported.

Studio search is server-side within the selected organization. Settings search
indexes only currently enabled settings locally. In-room search remains in the
Matrix room context. PostgreSQL APIs do not ingest or claim authority over
Matrix message text merely to present a unified search dialog.

## Matrix workflow cards

Workflow events use `m.room.message`, a human-readable `body`, and the planning
default custom `msgtype` `io.poda.workflow.v1`. Structured content includes only
opaque workflow ID, workflow kind, display status, organization ID, entity
reference, revision hint, and known action IDs. It does not embed tokens,
authoritative roles, unpublished content, or complete job output.

On render, the client validates the event and fetches the workflow through the
organization API. On action, it refetches current state, submits the action with
revision/idempotency data, and revalidates the response. Expired, unauthorized,
unknown, or unsupported cards remain understandable through their fallback body
and cannot mutate business state.

Initial workflow kinds cover guest invitation, transcription/AI progress,
content review, and publication. Rooms and membership remain Matrix state;
invitation acceptance and resulting podcast assignments remain organization
state.

## Branding, themes, and locales

Product-surface rebranding covers authentication, welcome/loading/error and
empty states, navigation, room chrome where branding appears, settings,
help/about, manifests, document titles, icons, favicons, social metadata,
default avatars/illustrations, notification and call labels, mobile promotion,
analytics and diagnostic configuration, integration defaults, and every
translation.

The product uses the orange microphone mark and a Poda token layer for light,
dark, system, and high-contrast modes. The visual port preserves donor
information hierarchy, forms, player concepts, and warm accent character but
uses native React components and the established accessibility primitives of
the web client rather than pixel-matching the donor.

All production locale files under `apps/web/src/i18n/strings/` are required.
Machine translation may create a draft, but each locale has a readiness record
and a human/native reviewer before it is enabled. Missing Poda strings, visible
Element product language, or silent English fallback blocks launch. The locale
set is recalculated from the source directory so new upstream locales are not
omitted.

Required copyright, SPDX, license text, and accurate source attribution remain.
This boundary follows https://element.io/en/legal/trademark-policy and the
upstream AGPL, GPL, and commercial license files. Internal package names,
source symbols, and storage migrations retain upstream-compatible names unless
they become visible product branding.

## Capability and service policy

Bootstrap is the only authority for optional service availability. Calls,
widgets, integrations, diagnostics submission, analytics, or other companion
features are hidden or disabled until an appropriate Poda-operated endpoint and
capability are advertised. The static build has no Element public fallback.

Plans are similarly server-authoritative. The UI may explain the current plan,
usage, quota, and contact/upgrade path, but it neither computes final
entitlement nor accepts payment. Quota failures preserve drafts and show which
operation was refused.

Public federation is allowed through the Poda-managed Matrix services. It does
not permit arbitrary Matrix accounts to become workspace platform sessions.

## Delivery sequence

Each slice uses a compliant `internal/*` branch from `internal/main`, lands
through its own pull request, receives a Bedrock opening and closing checkpoint,
and remains unmerged unless the active task explicitly authorizes that exact
merge.

1. **Contract and knowledge foundation**
   - Add runtime contract schemas, fixture and HTTP adapter boundaries,
     bootstrap compatibility/capability handling, and the initial executable
     contract tests.
   - Advance P-000004 as evidence permits and keep production fixtures
     impossible.
2. **Authentication, storage isolation, routing, and shell**
   - Add platform PKCE, bootstrap, scoped Matrix session vault, one-client
     context controller, transactional switching, route classification, Poda
     application root, top shell, and global player lifecycle.
3. **Chat integration and product rebrand**
   - Render the complete Matrix client under Chat, preserve native deep links,
     remove product-surface Element branding, introduce Poda themes, and gate
     companion services.
4. **Home, playback, catalog, and search**
   - Deliver adaptive Home, favorites/discovery, player/queue/transcript,
     internal catalog details, external public links, global grouped search,
     and profile-to-DM navigation.
5. **Profiles and Podcast Studio**
   - Deliver personal profile workflows, podcast CRUD/import/diagnostics,
     organization rights and assignments, revisioned autosave/recovery, and the
     Podcast Namespace registry.
6. **Episode Studio, media, AI, and workflow cards**
   - Deliver episode CRUD, multipart upload/resume/finalize, transcription/AI
     job review, preview/schedule/publish, and actionable Matrix workflow cards.
7. **Launch assurance**
   - Complete every locale review, accessibility and responsive coverage,
     Matrix regression suite, branding/network audits, screenshot coverage,
     production build, and Poda-specific CI evidence.

## Test strategy

### Unit and schema tests

- Route parsing and tab selection, including existing Matrix deep links.
- Runtime validation for every contract response and typed error.
- Capability, entitlement, role, assignment, and visibility decisions.
- Matrix database/key namespacing and switch-state reducer behavior.
- Podcast Namespace registry coverage, parent constraints, serialization,
  unknown-field preservation, and deprecated-field handling.
- Autosave debounce, revision conflicts, recovery expiry, upload and AI job
  state machines, search grouping, and workflow-event validation.

### Component and accessibility tests

- Loading, empty, success, offline, forbidden, quota, conflict, validation,
  unsupported, and incompatible-API states for every Poda surface.
- Keyboard navigation, focus restoration, labels, announcements, contrast,
  reduced motion, responsive reflow, and screen-reader semantics.
- Listener, guest, creator, assigned member, unassigned member, administrator,
  and owner controls.

### End-to-end tests

- Platform login/bootstrap and Matrix SSO with production-shaped fixtures.
- Audience and multiple organization context changes with isolated sync and
  crypto state, rollback injection, deep links, and complete logout.
- Direct message from a profile, rooms, Spaces, threads, files, encryption,
  search, notifications, settings, and Poda-capable calls.
- Home discovery/favorite/playback/queue/transcript and playback continuity,
  including call pause behavior.
- Profile, podcast, and episode create/edit/autosave/recovery/conflict/preview/
  publish journeys under every role boundary.
- Feed import and diagnostics; interrupted/resumed upload and digest failure;
  transcription/AI proposal preview, acceptance, cancellation, and failure.
- Workflow-card fallback, revalidation, authorization, stale revision, and
  successful action.
- Canonical public links open the external destination without turning the SPA
  into the public route owner.

### Brand, locale, and network tests

- Audit rendered DOM, screenshots, manifests, titles, icons, metadata,
  configuration, and enabled locale strings for prohibited Element product
  branding, with a narrow explicit legal/internal allowlist.
- Exercise all themes at mobile, tablet, and desktop widths and confirm that
  unavailable mobile applications are not promoted.
- Require readiness approval for every current locale and reject missing Poda
  keys or unintended fallback.
- Capture production network requests and fail on inherited Element-operated
  destinations or fixture/native transports.

## Oracle and Witness strategy

The active Plan links five Promises to five Oracles:

- P-000001/O-000001 judges the unified Poda shell, routes, player, responsive
  themes, locales, and visible branding.
- P-000002/O-000002 judges listening, profiles, organization rights, complete
  in-scope authoring, Podcast Namespace behavior, media, AI, and publication.
- P-000003/O-000003 judges Matrix functionality, binding selection, storage
  isolation, context rollback, workflow cards, and logout.
- P-000004/O-000004 judges runtime contract compatibility, fail-closed
  capabilities, fixture exclusion, and production network destinations.
- P-000005/O-000005 judges the fork-owned CI route and retained evidence.

No Witness is created by planning. When an Oracle is actually applied, allocate
the next Witness identifier under that Promise and record the exact head, date,
result, CI URL/artifact digest, and independent evidence for every pass leg. A
failed, blocked, or invalid run is retained with its actual result. A local
attestation cannot produce an assured Promise.

G-000001 closes only after P-000005 has an implemented Oracle and a retained
PASS Witness from the approved CI route. PLAN-000001 completes only when all
five Promises are `assured` through their own linked PASS Witnesses.

## CI and release gates

The fork-specific workflow runs the repository's canonical format, type,
style, unit, production-build, Playwright, screenshot, accessibility,
branding, locale, and network tasks on the approved organization Linux runner.
Its triggers follow the organization rule: pull-request opened, reopened, or
ready-for-review; explicit dispatch; or Bedrock request. Branch pushes do not
duplicate the PR run.

Poda surfaces remain behind bootstrap compatibility/capability activation until
the required API generation is deployed. Production fixture mode is impossible.
Companion controls remain hidden until Poda endpoints are advertised. Release
activation is blocked by incomplete required locales, failed Matrix regression,
an incompatible API, unresolved security/brand/network findings, or absent
exact-head CI evidence. Static artifacts declare their supported backend range
and retain the prior immutable artifact as the rollback target.

## Final acceptance criteria

The integration is complete only when all of the following are evidenced:

- One Poda-branded responsive web shell exposes Home, Studio, Chat, and Profile
  and preserves supported Matrix deep links.
- Listener, guest, creator, member, admin, and owner journeys work according to
  the declared role and assignment boundaries.
- The complete in-scope profile, podcast, episode, Podcast Namespace, upload,
  transcription/AI, preview, scheduling, and publication workflows pass.
- Matrix communication retains the advertised full-client behavior through
  isolated, automatically selected Poda-managed identities.
- Search behaves at every selected surface without confusing catalog and
  Matrix authority.
- Production fails closed for missing capabilities and cannot contact inherited
  Element services or select donor/fixture transports.
- Every current locale has human review and every supported theme/layout meets
  the accessibility and responsive checks.
- Each Promise has a retained exact-head PASS Witness under its implemented
  Oracle, and the fork-assurance Gap is closed from that evidence rather than
  from an inherited or local claim.

## Provenance

- Poda Web upstream: https://github.com/element-hq/element-web
- Element trademark policy: https://element.io/en/legal/trademark-policy
- Element Web license files:
  https://github.com/element-hq/element-web/blob/develop/LICENSE-AGPL-3.0,
  https://github.com/element-hq/element-web/blob/develop/LICENSE-GPL-3.0, and
  https://github.com/element-hq/element-web/blob/develop/LICENSE-COMMERCIAL
- Podcast Namespace pinned specification:
  https://github.com/Podcastindex-org/podcast-namespace/blob/c0ff5caa3729610362ee93f8034454fa41f3c493/docs/1.0.md
- Behavioral donor:
  `Private: cleverunicornz/yeet-code@951dd74fd6cdbe050cb451dc9ab0448836728dbb#applications/pcc/pcc-native`
  (private; requires repository access)
- Identity and authority dependency:
  `Private: cleverunicornz/matrix-coordinator@5797be35ddb0451eba49a327cb1fe70b5d44ba0a#situation/`
  (private; requires repository access)

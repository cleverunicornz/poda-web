# Module vs widget host: spike discoveries

Recorded: 2026-09-16, from the profile/studio spike (`internal/poda-profile-spike`).
Scope: knowledge only; no production commitment.

## What was built

One framework-free view layer (`renderFullProfileView`, `renderStudioView`) fed
by complete donor fixtures (full profile, podcast, episode inventory,
including hidden internals made visible), hosted two ways:

- **Module host**: ESM bundle with a `Module` class, loaded via
  `SdkConfig.get("modules")` at runtime, registered as
  `#/io.poda.profile-spike.profile` and `#/io.poda.profile-spike.studio` pages
  with a top navigation tab.
- **Widget host**: standalone HTML + bundled JS served from the webapp,
  registered on the General room as `im.vector.modular.widgets` state
  (`type: m.custom`), pinned into the room view.

## Module host mechanics (verified)

- Loaded at runtime from config `modules: ["/modules/<name>/index.js"]`;
  **relative URLs resolve against the JS bundle directory**, so use absolute
  paths.
- `api.navigation.registerLocationRenderer(path, render)` matches **exact
  screen keys only** and takes no arguments — sub-state must parse the hash
  (we use `?view=`/`?who=`; deep links work).
- `window.React` is set by the host before modules load; modules may render
  plain JS views, not only JSX.
- `api.profile` (public seam) exposes `userId`, `displayName`, `isGuest` —
  **no `avatarUrl`** (gap for the real implementation).
- Module pages keep the host session, theme, and i18n; the space rail remains
  visible.
- **Layout trap**: the content wrapper centers children vertically
  (`justify-content: center`), so a tall page renders partly above the fold.
  The page's root needs `flex: 1 1 auto; min-height: 0; overflow-y: auto` on
  the component host div (same pattern as the nav spike's diagnostic page).

## Widget host mechanics (verified)

- Registration: `PUT im.vector.modular.widgets/<id>` room state with
  `{ type: "m.custom", url, name, data }`.
- Identity arrives **only** via host-substituted URL template params
  (`$matrix_user_id`, `$matrix_display_name`) or an OpenID consent handshake.
  No host session access.
- First open shows a consent card; **changing the URL re-triggers consent**
  (new identity/context).
- Use `WidgetApi` (widget-side class). `ClientWidgetApi` is the **host-side**
  class and throws `No iframe supplied` inside a widget.
- Navigation: the widget's internal navigation is iframe-local (its own hash,
  invisible to the host URL). The only outward channel is
  `navigateTo(permalink)` — Matrix rooms/users only, never app routes like
  `#/studio`.
- Pinning moves the widget from the buried Extensions panel into the room
  view top (the only genuinely visible placement).
- Widgets are sandboxed iframes: separate document, no app chrome access, no
  shared React tree with the host.

## Verdict

The view code and fixtures are shareable 1:1 between hosts — the shared
renderers are plain JS and run unchanged in both. But the hosts themselves
are separate packages with different identity (host session vs URL params +
OpenID), navigation (host URL vs iframe-local), and packaging (ESM Module
class vs standalone HTML page).

The **module is the correct primary host** for member workspaces (profile,
studio, creators): trusted session, real app navigation, full inventory. The
**widget is an optional, later, conversation-adjacent embed** — worth building
separately only when a concrete use case wants a card/profile inside a room,
not as a parallel of the workspace pages.

## Notable bugs hit during the spike

- Relative module bundle URL resolved under `bundles/<hash>/` → absolute
  paths required.
- `ClientWidgetApi` vs `WidgetApi` class confusion (host vs widget side).
- Vertical centering wrapper pushed tall module pages above the fold (fixed
  with a page-owned scroll region).
- The service-worker media path needs an active worker before avatars render;
  a stale worker leaves letter fallbacks.

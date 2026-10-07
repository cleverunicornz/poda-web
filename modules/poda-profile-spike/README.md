# Poda profile/studio spike module

Diagnostic module package carrying the shared member-workspace spike:

- `src/index.js` — module host: registers `#/io.poda.profile-spike.profile`
  (full creator-profile inventory, own-profile session edit flow) and
  `#/io.poda.profile-spike.studio` (full podcast + episode inventory with
  hidden internals made visible).
- `src/shared/` — framework-free view renderers and complete donor fixtures
  shared by both hosts.
- `widget/` — the room-widget host: standalone page rendering the featured
  creator's full profile inside a Matrix room.

Mock data only; nothing here is a production contract. See
`situation/references/G-000005/module-vs-widget-host-discovery.md` for the
host comparison and verdict (module-first; widget as a separate later embed).

## Build

```sh
nx build @poda/web-module-profile-spike                 # → lib/index.js
nx run @poda/web-module-profile-spike:build:widget      # → lib/widget/widget.bundle.js
```

## Demo wiring

1. Copy `lib/index.js` to `apps/web/webapp/modules/poda-profile-spike/index.js`
   and list `"/modules/poda-profile-spike/index.js"` in the served
   `config.json` `modules` array.
2. Copy `widget/index.html` and `lib/widget/widget.bundle.js` to
   `apps/web/webapp/widgets/poda-profile/` (the HTML references
   `widget.bundle.js`).
3. Register the widget on a room with
   `PUT im.vector.modular.widgets/poda-profile-spike`
   `{ "type": "io.poda.profile", "url": "<app-origin>/widgets/poda-profile/index.html?matrix_user_id=$matrix_user_id&matrix_room_id=$matrix_room_id&matrix_display_name=$matrix_display_name&theme=$org.matrix.msc2873.client_theme", "name": "Poda Profile" }`.
4. One-click access (D-000024): build `modules/widget-toggles` and list it in
   `modules`, with
   `"io.element.element-web-modules.widget-toggles": { "types": ["io.poda.profile"] }`
   in `config.json`. The room header then shows a Poda Profile button that pins
   the widget above the timeline and unpins it again. Extensions also sit at the
   top of the room info panel.

## Profile in the right panel

The module sets the host's `extras.setUserProfilePanel` renderer (a Poda host
extension, D-000024). The user info panel then offers **View profile**, which
opens the shared profile view, compact and read-only, in the right panel: the
signed-in user's session-only creator fields, or another member's Matrix
identity with empty sections.

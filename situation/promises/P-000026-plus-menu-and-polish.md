# "+" composer menu and chat/Studio polish

## State

assured

## Promise

In Poda Web with the Poda modules, in Poda Light:

1. **"+" menu.** Where the composer offers more than file upload, its button is
   a "+" named "Attach or share" whose menu lists Attachment and Share to chat;
   without extra options the Attachment button is unchanged.
2. **Own widget.** The Poda profile widget served by the app at
   `/widgets/poda-profile/` opens from Extensions without Element's approval
   prompt and renders; a widget of the same type at another origin still shows
   the prompt and does not load until approved.
3. **Widget handshake.** Loading the profile widget logs neither "Not ready or
   unknown widget ID" nor an unexpected content-loaded error.
4. **Titles.** View profile opens a card titled "Creator profile"; Back shows
   Element's "Profile" user info.
5. **Contrast.** Room header tooltips, links in messages (own and others') and
   the "Introducing Sections" announcement text reach at least 4.5:1 against
   their backgrounds.
6. **Episode readiness.** The episode wizard's first readiness item is "Title
   and season" and is complete with a title and season and no episode number.
7. **Studio routes.** After creating a podcast and moving quickly through
   Studio, Episodes and New episode, the new podcast is listed once in the
   episode form's podcast picker, with one form on screen.

## Scope

`packages/shared-components` `UploadButton`, `apps/web` composer, profile card,
Poda theme and stylesheet, and `modules/poda-profile-spike` (module, widget,
Studio), in a local build with a local Synapse, as changed by
[D-000029](situation/decisions/D-000029-plus-menu-and-polish.md).

## Oracle

[O-000026](situation/oracles/O-000026-plus-menu-and-polish.md)

## State evidence

- [D-000029](situation/decisions/D-000029-plus-menu-and-polish.md) selects the
  behavior.
- `implemented`: commit `8bcc9dc76a` on branch `internal/plus-and-polish`.
- `assured`: [O-000026](situation/oracles/O-000026-plus-menu-and-polish.md)
  passed on [W-000013](situation/witnesses/P-000026/W-000013-plus-menu-and-polish-local-pass.md)
  at `8bcc9dc76a`; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Residual

Poda Dark is covered by the theme contrast test only; other tooltips and
announcements than those named, narrow layouts, the cause of the single
G-000026 observation, and widgets served from other origins by design are not
assured. The pre-existing `AppearanceUserSettingsTab` snapshot failure is
[G-000036](situation/gaps/G-000036-appearance-tab-snapshot-fails-on-trunk.md).

## References

- [D-000029](situation/decisions/D-000029-plus-menu-and-polish.md)

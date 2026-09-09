# Poda web shell oracle

## State

designed

## Judges

- [P-000001](situation/promises/P-000001-poda-web-shell.md)

## Inputs

- A production web build from the exact pull-request head.
- Route, navigation, player, theme, and responsive end-to-end results.
- Rendered-string, asset, manifest, metadata, configuration, and locale audits.
- Required legal notices from the same build.

## Pass

- Every declared Poda product route selects the correct Home, Studio, Chat, or
  Profile tab, and existing Matrix room and user deep links still resolve under
  Chat.
- Product routes and Matrix routes render inside one responsive Poda shell in
  every supported theme and approved locale.
- Podcast playback and queue state survive ordinary route changes, and Matrix
  call start pauses playback without automatic resumption.
- Rendered product surfaces, metadata, assets, and defaults use Poda branding;
  any remaining Element text is either a required legal notice or an expressly
  allowlisted invisible technical identifier.

## Fail

- Any declared route selects the wrong surface, loses supported deep-link
  behavior, or renders a second application shell.
- Playback is unintentionally destroyed by navigation or competes with a
  Matrix call.
- A supported layout, theme, or enabled locale is incomplete or unusable.
- Non-allowlisted Element branding or service promotion appears in the built
  product.

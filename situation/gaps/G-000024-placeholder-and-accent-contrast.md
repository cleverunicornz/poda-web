# Placeholder and accent-on-accent contrast

## State

open

## Gap

Some Poda presentations have low contrast: wizard placeholders look like filled
values, links in the user's own message bubbles use the accent colour on an
accent background, and the "Introducing Sections" tooltip body is hard to read.
Whether these fail an accessibility threshold has not been measured.

## Relevance

[G-000002](situation/gaps/G-000002-poda-visual-acceptance-contract.md) (visual
acceptance) and [P-000019](situation/promises/P-000019-pcc-native-module-design.md)
native design.

## Evidence

At `f11fe6c0b2` on 2026-10-06 in Poda Light:

- The License input's placeholder computed `rgb(99, 61, 29)` against typed text
  `rgb(59, 37, 17)` (`.pnInput::placeholder` at
  `f11fe6c0b2:modules/poda-profile-spike/src/shared/nativeTheme.js` line 175), so
  placeholders such as "CC BY 4.0" and "Support the show" read as entered
  values.
- A link sent in the user's own bubble rendered in amber on the amber bubble.
- The Sections onboarding tooltip rendered light body text on the amber card.

## Impact

Users may skip fields they believe are filled, and may miss links or onboarding
text.

## Resolution

none

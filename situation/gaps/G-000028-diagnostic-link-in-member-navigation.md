# Diagnostic workspace link remains in member navigation

## State

open

## Gap

The maintainer agreed on 2026-10-07 to remove the Diagnostic workspace link
from the member navigation header, but that link is part of the behavior
assured by P-000016 and P-000017. Removing it needs a superseding Promise,
Decision, Oracle and Witnesses; which form those take is unselected.

## Relevance

[P-000016](situation/promises/P-000016-decision-complete-module-navigation-gate.md)
and [P-000017](situation/promises/P-000017-seamless-module-native-return.md)
(assured), [D-000023](situation/decisions/D-000023-poda-chat-controls.md)
walk-through.

## Evidence

`modules/poda-navigation-spike/src/Navigation.tsx` renders the "Diagnostic
workspace" link beside Chat, Profile and Studio; it was visible in every
signed-in screenshot of 2026-10-06 and 2026-10-07.

## Impact

Members see a diagnostic entry in the product navigation until the
supersession lands.

## Resolution

none

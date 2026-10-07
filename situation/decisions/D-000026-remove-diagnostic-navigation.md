# Remove the Diagnostic workspace from the member navigation

## Status

accepted

## Date

2026-10-07

## Context

The member navigation header from `modules/poda-navigation-spike/` offered
Chat, Profile, Studio and "Diagnostic workspace". The Diagnostic location was a
navigation gate's probe, not a member feature, and members saw it in every
signed-in screen ([G-000028](situation/gaps/G-000028-diagnostic-link-in-member-navigation.md)).
The maintainer agreed on 2026-10-07 to remove it. Assured
[P-000016](situation/promises/P-000016-decision-complete-module-navigation-gate.md)
and [P-000017](situation/promises/P-000017-seamless-module-native-return.md),
and implemented [P-000015](situation/promises/P-000015-module-navigation-mount-gate.md),
are all stated in terms of that Diagnostic link and location.

## Evidence

- The maintainer's agreement during the chat-controls walk-through (2026-10-07,
  recorded in G-000028) and "yeah keep going" when the removal was proposed as
  the second follow-up pull request.
- [W-000003](situation/witnesses/P-000016/W-000003-decision-complete-module-navigation-gate-pass.md)
  and [W-000004](situation/witnesses/P-000017/W-000004-same-document-module-native-return-pass.md)
  show the header, the same-document return and the history behavior hold for
  a registered module location; nothing in them depends on that location being
  Diagnostic.
- The profile module registers the Studio location
  `io.poda.profile-spike.studio`, which the header already links and members use.

## Decision

- The header offers Chat, Profile and Studio only. The navigation module stops
  registering `io.poda.navigation-spike.diagnostic` and no longer ships the
  Diagnostic page or its styles.
- The navigation behavior the old Promises assured (mount above the
  application root, same-document module ↔ Home navigation, refresh, Back /
  Forward, the host router's one-event hash suppression, the Poda Light / Dark
  presentation matrix) is kept and re-stated against the Studio location as
  [P-000023](situation/promises/P-000023-member-navigation-header.md), judged by
  [O-000023](situation/oracles/O-000023-member-navigation-header.md).
- P-000015, P-000016 and P-000017 are superseded by P-000023.
- The module's Playwright specification loads the profile module beside the
  navigation module so it navigates to a location members actually use.

## Why

A diagnostic probe does not belong in product navigation. Moving the proof onto
Studio keeps the assured navigation behavior instead of dropping it with the
link.

## Rejected alternatives

- **Hide the link, keep the location registered.** That leaves a test-only page
  reachable by address in the shipped module, with nothing that uses it.
- **Show the link only behind a setting.** No such setting exists and the
  maintainer asked for removal, not a toggle.
- **A stub location registered only by the test.** That would prove navigation
  to a page no member sees, instead of to Studio.

## Consequences

- The specification depends on the profile module's built bundle and its
  Studio "Podcasts" heading.
- Focus moving into the destination's main region was part of P-000016 and
  P-000017 for Diagnostic; Studio does not move focus, and P-000023 does not
  claim it.
- [G-000028](situation/gaps/G-000028-diagnostic-link-in-member-navigation.md)
  closes when P-000023 is assured.

## Revisit when

A member-facing diagnostic or support page is wanted, or the Studio location
moves out of the profile module.

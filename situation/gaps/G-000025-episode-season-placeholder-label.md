# Episode label shows "S?" when no season is set

## State

closed

## Gap

Episode detail headers render `S?E1` when the season number is empty. It is
unresolved whether an empty season should be omitted or shown differently.

## Relevance

[P-000018](situation/promises/P-000018-poda-creation-flows.md) episode detail;
related to the optional-number question in
[G-000019](situation/gaps/G-000019-episode-number-required-label.md).

## Evidence

At `f11fe6c0b2` on 2026-10-06, an episode created with episode number 1 and no
season rendered "S?E1 · scheduled". `f11fe6c0b2:modules/poda-profile-spike/src/shared/podcastFullView.js`
lines 312 and 386 substitute `?` for a missing season.

## Impact

Unseasoned shows display a question mark in every episode header.

## Resolution

Closed: [P-000022](situation/promises/P-000022-creation-flow-fixes.md) passed [O-000022](situation/oracles/O-000022-creation-flow-fixes.md) on [W-000007](situation/witnesses/P-000022/W-000007-creation-flow-fixes-local-pass.md) at `0c85c60c61` under [D-000025](situation/decisions/D-000025-creation-flow-fixes.md); labels omit missing numbers.

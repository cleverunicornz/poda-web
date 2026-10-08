# Episode podcast picker once omitted a newly created podcast

## State

closed

## Gap

Once, the episode wizard's Podcast picker listed only the seeded podcast
immediately after a new podcast was created in the same session. The cause is
unknown and the behavior did not recur.

## Relevance

[P-000018](situation/promises/P-000018-poda-creation-flows.md) P2 (episode flow
with parent context).

## Evidence

At `f11fe6c0b2` on 2026-10-06, without a page reload (navigation timing origin
unchanged): Create Podcast → detail → Studio → Episodes → New Episode showed
options "Choose a podcast…" and "Field Notes" only. Repeating the same path and
opening `?new=episode` directly afterwards both listed "Remote Rooms (draft)".
`f11fe6c0b2:modules/poda-profile-spike/src/index.js` lines 449-451 read podcasts from
the shared adapter when rendering the route. Interpretation: a render-ordering
race is possible but unconfirmed.

## Impact

A creator could be unable to attach an episode to a podcast they just made
until they navigate again.

## Resolution

Closed: not reproduced; [D-000029](situation/decisions/D-000029-plus-menu-and-polish.md) makes every Studio route skip rendering once replaced, and [W-000013](situation/witnesses/P-000026/W-000013-plus-menu-and-polish-local-pass.md) P7 listed the new podcast in three quick passes. The cause of the single observation remains unknown.

# Module flow copy contradicts actual behavior

## State

closed

## Gap

Several user-facing strings in the Profile and Studio module flows describe
behavior the module does not have, or show internal design notes as product
copy. It is unresolved which strings should change and to what.

## Relevance

[P-000018](situation/promises/P-000018-poda-creation-flows.md) F4 fails when the
UI claims persistence; [D-000022](situation/decisions/D-000022-pcc-native-design-transfer.md)
rejected porting donor autosave claims; I-000009 confines simulated behavior to
preview surfaces. Observed during the 2026-10-06 walk-through that preceded
[D-000023](situation/decisions/D-000023-poda-chat-controls.md).

## Evidence

Observed in a signed-in browser at `f11fe6c0b2` on 2026-10-06:

- The episode wizard's draft bar says "Edits are kept in this browser until
  create succeeds" (`f11fe6c0b2:modules/poda-profile-spike/src/studio/episodeCreate.js`
  line 156). No `localStorage`, `sessionStorage` or IndexedDB use exists under
  `modules/poda-profile-spike/src/`.
- With Scheduled selected, the episode wizard's hero note still reads "Saves the
  episode as a private draft. It will not be published or scheduled." (the Draft
  description at `episodeCreate.js` line 39), while the right rail shows
  Scheduled.
- The own-profile welcome banner says "Click any text to edit it"
  (`f11fe6c0b2:modules/poda-profile-spike/src/shared/profileFullView.js` line 306);
  clicking the headline left focus on the document body and no
  `contenteditable` element exists.
- The podcast wizard shows "The wizard should feel like the profile flow:
  guided, bold, and alive." (`f11fe6c0b2:modules/poda-profile-spike/src/studio/podcastCreate.js`
  line 86) and "Still getting the vibe right" (line 310), which read as design
  notes rather than guidance.

## Impact

A user may expect an episode draft to survive a reload, believe a scheduled
episode will be saved as a private draft, or try to edit profile text in place.

## Resolution

Closed: [P-000022](situation/promises/P-000022-creation-flow-fixes.md) passed [O-000022](situation/oracles/O-000022-creation-flow-fixes.md) on [W-000007](situation/witnesses/P-000022/W-000007-creation-flow-fixes-local-pass.md) at `0c85c60c61` under [D-000025](situation/decisions/D-000025-creation-flow-fixes.md); every listed string is replaced.

## References

- [P-000018](situation/promises/P-000018-poda-creation-flows.md)
- [D-000022](situation/decisions/D-000022-pcc-native-design-transfer.md)

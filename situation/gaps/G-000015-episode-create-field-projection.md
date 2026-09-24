# Episode create field projection is not preserved

## State

open

## Gap

The current episode wizard submits `showNotes` and `enclosureUrl` directly to
`MockPodaDataAdapter.saveEpisode`, while the adapter's episode detail model
uses `showNotesHtml` and `media.primaryEnclosure`. The pre-transfer form
projected the entered values to those detail fields; the changed submit path
leaves the new keys on the saved object instead. It also retains a
`datetime-local` scheduled value without the prior ISO conversion, while the
detail formatter adds a `Z` suffix to its displayed string.

## Relevance

[P-000019](../promises/P-000019-pcc-native-module-design.md) explicitly keeps
existing creation-field projection within scope, and
[O-000019](../oracles/O-000019-pcc-native-module-design.md) P4 judges behavior
preservation. The same episode creation flow remains part of
[P-000018](../promises/P-000018-poda-creation-flows.md).

## Evidence

- `modules/poda-profile-spike/src/studio/episodeCreate.js:251-270` returns
  `showNotes` and `enclosureUrl`;
  `modules/poda-profile-spike/src/studio/episodeCreate.js:314-346` passes that
  draft directly to the adapter. The
  `af00892498b68cba59146dc8b2c26a14b5312a55:modules/poda-profile-spike/src/studio/episodeCreate.js`
  version constructed `showNotesHtml` and `media.primaryEnclosure` before
  `onSubmit`.
- `modules/poda-profile-spike/src/studio/episodeCreate.js:269` retains the raw
  scheduled form value, where
  `af00892498b68cba59146dc8b2c26a14b5312a55:modules/poda-profile-spike/src/studio/episodeCreate.js`
  converted it with `new Date(...).toISOString()`.
  `modules/poda-profile-spike/src/shared/podcastFullView.js:59-60` appends `Z`
  when displaying the stored value. No browser observation in this closure
  establishes the user-visible timezone effect.
- `modules/poda-profile-spike/src/data/mockAdapter.js:137-179` defaults
  `showNotesHtml` to `null` and `media.primaryEnclosure` to `null`, then merges
  the incoming draft unchanged. `modules/poda-profile-spike/src/shared/podcastFullView.js:314-335`
  renders the default detail fields rather than the new draft keys.
- Focused current-head smoke observation for this closure supplied a valid
  episode draft with `showNotes` and `enclosureUrl` to
  `MockPodaDataAdapter.saveEpisode`; it printed
  `{"showNotes":"<p>retained?</p>","showNotesHtml":null,"enclosureUrl":"https://cdn.example.test/mapping.mp3","primaryEnclosure":null}`.
  This observed sequence is limited to the field projection.

- Repair observation (2026-09-24, assigned by the 20260924T141117Z validator
  docket): the closure's corrector commit
  `3c2bcee968fd441ab138a85787c928111335e15d` restores the `showNotesHtml` /
  `media.primaryEnclosure` projection and the ISO `scheduledAt` conversion; a
  parallel local repair was merged away in favor of it. Verified live at merge
  head `709231e4accd88d4ab5b8793cc734a99896e3b58`: a created episode's detail
  inventory renders the entered show notes and enclosure URL, and the focused
  adapter smoke prints the projected fields instead of nulls. Recorded in
  [W-000002](../witnesses/P-000019/W-000002-pcc-native-module-design-corrected-pass.md).

## Impact

A created episode can still reach its detail route, but entered show notes and
primary enclosure do not populate the detail fields that the module renders.
The changed scheduled-value format may also label a local browser value as UTC;
that effect remains an observation gap, not a declared failure. The retained
[W-000001](../witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
therefore cannot decide O-000019 P4 as a complete PASS.

## Resolution

none

## References

- [P-000019](../promises/P-000019-pcc-native-module-design.md)
- [O-000019](../oracles/O-000019-pcc-native-module-design.md)
- [W-000001](../witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)

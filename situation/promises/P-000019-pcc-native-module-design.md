# PCC native module design

## State

implemented

## Promise

In Poda Web, the `modules/poda-profile-spike/` Profile and Studio surfaces —
podcast and episode collections, both creation wizards, the creator profile,
and the room-widget profile card — render the PCC native design language
transferred per [D-000022](situation/decisions/D-000022-pcc-native-design-transfer.md):
donor token triples in both Poda themes, native list/table anatomies, guided
wizard frames with hero cards and live readiness rails, and the profile hero
with segmented visibility control and stats/share/At-a-Glance rail. Podcast
creation applies the selected three-category cap while retaining its existing
required/format validation; creation routes, the session-only adapter boundary,
and native Chat remain unchanged. Episode creation preserves its existing
show-notes and enclosure projection into the rendered detail model.

## Scope

The `modules/poda-profile-spike/` package: one shared native theme module
(`src/shared/nativeTheme.js`), the studio collection views, both creation
wizards, the shared profile and podcast detail views, and the module host
shell. The transfer changes presentation and adds the selected three-category
cap while preserving the `MockPodaDataAdapter`, fixtures, routes, existing
creation-field projection, and required/format validation contracts. Mock data
only; reload resets.

## Oracle

[O-000019](situation/oracles/O-000019-pcc-native-module-design.md)

## State evidence

- Implementation exists at
  `574702d38e42776479b1c032c9c08d7bfa02d0c9:modules/poda-profile-spike/src/shared/nativeTheme.js`
  and the rewritten views on that head.
- [W-000001](situation/witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
  is `INVALID`: it retains partial browser observations but does not decide
  O-000019 P4's existing episode-field projection. The direct source/smoke
  contradiction is retained in
  [G-000015](situation/gaps/G-000015-episode-create-field-projection.md).

## Residual

This promise does not assure: donor i18n wiring, donor Podcasting 2.0 advanced
repeater groups in creation forms, autosave, real uploads, the AI Polish card,
guest attachment, or any persistence beyond the session. It does not yet
assure the episode field projection retained in
[G-000015](situation/gaps/G-000015-episode-create-field-projection.md), the
unimplemented Analytics leg of P-000018, or any change to P-000018's state.

## References

- [situation/references/D-000022/native-design-transfer-notes.md](situation/references/D-000022/native-design-transfer-notes.md)

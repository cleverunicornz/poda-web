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
creation applies the selected three-category cap and the declared `Save Draft`
to collection / `Create Podcast` to detail outcomes while retaining its
existing required/format validation. Episode creation preserves its existing
show-notes/enclosure detail projection and scheduled-time representation.
Profile Edit preserves creator-field submissions for identity, descriptive,
topic, social, booking, media, and intro-video fields. The session-only adapter
boundary and native Chat remain unchanged.

## Scope

The `modules/poda-profile-spike/` package: one shared native theme module
(`src/shared/nativeTheme.js`), the studio collection views, both creation
wizards, the shared profile and podcast detail views, the module host shell,
and the room-widget entry. The transfer changes presentation plus the selected
three-category and podcast post-submit behaviors while preserving the
`MockPodaDataAdapter`, fixtures, existing episode show-notes/enclosure and
scheduled-time projection, Profile Edit submitted-field projection, and
required/format validation contracts. Mock data only; reload resets.

## Oracle

[O-000019](situation/oracles/O-000019-pcc-native-module-design.md)

## State evidence

- Implementation exists at
  `574702d38e42776479b1c032c9c08d7bfa02d0c9:modules/poda-profile-spike/src/shared/nativeTheme.js`
  and the rewritten views on that head. The corrected episode, Profile Edit,
  and room-widget theme paths are respectively retained at
  `3c2bcee968:modules/poda-profile-spike/src/studio/episodeCreate.js`,
  `38a0fcc0a9:modules/poda-profile-spike/src/index.js`, and
  `3583e1a857:modules/poda-profile-spike/widget/widget.js`.
- [W-000001](situation/witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
  is `INVALID`: its retained partial browser observation does not decide P1's
  widget render in both Poda themes, P3's Profile Edit submission projection,
  or P4's episode detail-field and scheduled-time projection on the corrected
  exact head. The reviewed-head observations that prompted those corrections
  remain in [G-000017](situation/gaps/G-000017-widget-host-theme-propagation.md),
  [G-000020](situation/gaps/G-000020-profile-edit-field-projection.md), and
  [G-000015](situation/gaps/G-000015-episode-create-field-projection.md).

## Residual

This promise does not assure: donor i18n wiring, donor Podcasting 2.0 advanced
repeater groups in creation forms, autosave, real uploads, the AI Polish card,
guest attachment, or any persistence beyond the session. It does not yet
assure P1's room-widget render in both Poda themes, P3's Profile Edit submission
projection, or P4's episode detail-field and scheduled-time projection on a
corrected exact-head observation. The reviewed-head observations remain in
[G-000017](situation/gaps/G-000017-widget-host-theme-propagation.md),
[G-000020](situation/gaps/G-000020-profile-edit-field-projection.md), and
[G-000015](situation/gaps/G-000015-episode-create-field-projection.md). It
does not assure the unimplemented Analytics leg of P-000018 or any change to
P-000018's state.

## References

- [situation/references/D-000022/native-design-transfer-notes.md](situation/references/D-000022/native-design-transfer-notes.md)

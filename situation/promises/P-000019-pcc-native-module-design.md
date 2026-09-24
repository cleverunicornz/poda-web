# PCC native module design

## State

assured

## Promise

In Poda Web, the `modules/poda-profile-spike/` Profile and Studio surfaces —
podcast and episode collections, both creation wizards, the creator profile,
and the room-widget profile card — render the PCC native design language
transferred per [D-000022](situation/decisions/D-000022-pcc-native-design-transfer.md):
donor token triples in both Poda themes, native list/table anatomies, guided
wizard frames with hero cards and live readiness rails, and the profile hero
with segmented visibility control and stats/share/At-a-Glance rail. Creation,
validation, navigation, and the session-only adapter boundary behave exactly
as before; Chat remains native.

## Scope

The `modules/poda-profile-spike/` package: one shared native theme module
(`src/shared/nativeTheme.js`), the studio collection views, both creation
wizards, the shared profile and podcast detail views, and the module host
shell. Presentation and layout restructure only, over the unchanged
`MockPodaDataAdapter`, fixtures, routing, and validation contracts. Mock data
only; reload resets.

## State evidence

- Implementation exists at
  `574702d38e42776479b1c032c9c08d7bfa02d0c9:modules/poda-profile-spike/src/shared/nativeTheme.js`
  and the rewritten views on that head.
- [W-000001](situation/witnesses/P-000019/W-000001-pcc-native-module-design-pass.md)
  PASSes all O-000019 legs at that exact head: donor token render in both Poda
  themes at desktop and narrow widths, wizard readiness/validation/create
  flows, profile interactions and rail, widget parity, and unchanged Chat.

## Residual

This promise does not assure: donor i18n wiring, donor Podcasting 2.0 advanced
repeater groups in creation forms, autosave, real uploads, the AI Polish card,
guest attachment, or any persistence beyond the session. It does not assure
the unimplemented Analytics leg of P-000018 and does not change P-000018's
state.

## References

- [situation/references/D-000022/native-design-transfer-notes.md](situation/references/D-000022/native-design-transfer-notes.md)

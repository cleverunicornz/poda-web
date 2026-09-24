# PCC native module design partial browser observation

## Promise

[P-000019](situation/promises/P-000019-pcc-native-module-design.md)

## Oracle

[O-000019](situation/oracles/O-000019-pcc-native-module-design.md)

## Result

INVALID

## Head

`574702d38e42776479b1c032c9c08d7bfa02d0c9`

## Observed

2026-09-23

## Evidence

- [Structured exact-head browser observation](situation/references/P-000019/native-design-transfer/observation.json)
- [Wizard at 100% readiness in Poda Light](situation/references/P-000019/native-design-transfer/studio-wizard-ready-light.webp)
- [Wizard validation and 3-category cap](situation/references/P-000019/native-design-transfer/studio-wizard-validation-light.webp)
- [Wizard in Poda Dark](situation/references/P-000019/native-design-transfer/studio-wizard-dark.webp)
- [Wizard at 500px](situation/references/P-000019/native-design-transfer/studio-wizard-narrow-dark.webp)
- [Episodes table in Poda Light](situation/references/P-000019/native-design-transfer/studio-episodes-light.webp)
- [Episodes cards at 500px in Poda Dark](situation/references/P-000019/native-design-transfer/studio-episodes-narrow-dark.webp)
- [Created podcast detail](situation/references/P-000019/native-design-transfer/studio-podcast-detail-light.webp)
- [Own profile after Public toggle and topic add](situation/references/P-000019/native-design-transfer/profile-own-light.webp)
- [Example profile in Poda Light](situation/references/P-000019/native-design-transfer/profile-example-light.webp)
- [Example profile in Poda Dark](situation/references/P-000019/native-design-transfer/profile-example-dark.webp)
- [Widget host rendering the shared profile](situation/references/P-000019/native-design-transfer/widget-profile-light.webp)
- [Native Chat unchanged](situation/references/P-000019/native-design-transfer/chat-unchanged-light.webp)

A signed-in demo session exercised O-000019 against the exact head's module
bundle in a local preview. The retained observation reports focused adapter
contract testing and module and widget bundle builds at that head. Separate
module source hygiene is retained in
[G-000014](situation/gaps/G-000014-module-package-lint-debt.md).

## Oracle legs

| Leg     | Observation |
| ------- | ----------- |
| P1 / F1 | Every named surface renders the `.podaNative` donor tokens: computed wizard grid `736px 360px` and hero row at 1440px, single-column stacking at 500px, and correct warm-dark surfaces under `cpd-theme-dark`. The superseded palette (`#fffdf9` pages, gradient CTAs, fieldset sections) no longer appears on any module surface. |
| P2 / F2 | Podcast wizard readiness climbed 25% → 50% → 75% → 100% live with the checklist and rail mirroring it; the third category selection disabled the 16 remaining inputs (`Selected: 3/3`); an invalid submit showed the error banner plus inline slug/owner-email messages; `Save Draft` created the draft and returned to the list; `Create Podcast` opened `pod-mufjsn32-de4ks2` at the exact head. Episode wizard readiness tracked Title-and-number and audio/notes inputs, the hero chip followed the podcast selection, publish radio cards switched the Final action rail and submit label, and creation opened `ep-mufizz06-6zq40x`. |
| P3 / F3 | Own profile shows the Draft pill, dismissible welcome banner, inline `+ Add Topic` (added `Resilience`), the Members Only → Public segmented toggle, Your Stats fed by the session adapter, and At a Glance moving 0% → 13%. The example fixture renders Published, Public, an 88% green strength bar, and the Share Profile copy row. The room-widget host renders the same shared design. |
| P4 / F4 | The retained browser result confirms the adapter tests, reload behavior, and unchanged Chat, but it does not observe the episode form retaining entered show notes as `showNotesHtml`, enclosure URL as `media.primaryEnclosure`, or its scheduled-time representation at detail. O-000019 P4 is therefore undecided; [G-000015](situation/gaps/G-000015-episode-create-field-projection.md) retains the source/smoke contradiction. |

## Notes

- Behavior legs P2/P3 ran against the pre-format build of the same source tree;
  the committed head differs only by `oxfmt` formatting, and the adapter tests,
  module build, and a complete wizard create flow were re-run against the
  deployed post-format bundle at the exact head.
- This is a bounded manual observation, not an assurance of P-000019: it does not decide P4's existing episode detail-field or scheduled-time projection and therefore cannot be a complete PASS. It also does not establish the reusable fork assurance route absent in
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

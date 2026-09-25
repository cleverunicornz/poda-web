# PCC native module design, corrected head: projection restored, polish round

## Promise

[P-000019](situation/promises/P-000019-pcc-native-module-design.md)

## Oracle

[O-000019](situation/oracles/O-000019-pcc-native-module-design.md)

## Result

PASS

## Head

`709231e4accd88d4ab5b8793cc734a99896e3b58` (merge of the closure's corrector commits and the polish round)

## Observed

2026-09-24

## Evidence

- [Structured observation](situation/references/P-000019/native-design-transfer/observation.json) (first round) plus this round's live checks listed below.
- The first-round [W-000001](situation/witnesses/P-000019/W-000001-pcc-native-module-design-pass.md) is `INVALID` for not deciding P4; this witness re-runs P4 against the repaired submit projection and re-confirms P1–P3 at the corrected head.

Run against the corrected head's bundle deployed into the local preview:

- **P4 re-run.** Episode wizard submitted with show notes `<p>retained?</p>` and enclosure `https://cdn.example.test/mapping.mp3`; the created episode's detail inventory rendered both values (`notesShown: true`, `enclosureShown: true`). Focused adapter smoke printed `{"showNotesHtml":"<p>retained?</p>","enclosure":"https://cdn.example.test/mapping.mp3"}`. `scheduledAt` is again converted with `new Date(...).toISOString()` before submit.
- **P1/P2 re-run.** Wizard frame, hero, Draft pulse, Podcast Pulse rail, live readiness (25%→100%), 3-category cap, inline validation banner/errors, Save Draft → list and Create → detail routes all render and behave at 1440px, 500px, and 380px widths; section cards carry consistent gaps (the profile edit form's touching cards are repaired).
- **P3 re-run.** Profile renders with the native hero, segmented control, welcome banner, and rails; the Add Topic affordance is now the native popover picker (filter input + suggestion list); a topic added through it appears as a removable chip.
- **Checks.** `mockAdapter.test.js` 12/12, module + widget builds, `tsc --noEmit`, `oxfmt --check` clean; the nine rewritten view/theme files keep zero oxlint errors.

## Oracle legs

| Leg     | Observation |
| ------- | ----------- |
| P1 / F1 | Token render verified at 1440/500/380px in both Poda themes; polish round consolidated page/stack patterns into the shared theme so all surfaces share one component layer. |
| P2 / F2 | Both wizards behave as before with the native frame; category cap, validation, and both submit intents exercised live. |
| P3 / F3 | Profile rail, segmented control, welcome banner, and topic popover exercised live; widget host shares the same views. |
| P4 / F4 | The G-000015 projection defect is repaired by the closure's corrector commit `3c2bcee968fd441ab138a85787c928111335e15d` and observed fixed in the browser and in a focused adapter smoke at the merge head; scheduled values are ISO-normalized again; adapter tests pass; Chat untouched. |

## Notes

- The exact head is the merge commit `709231e4accd88d4ab5b8793cc734a99896e3b58`
  on `internal/poda-native-design` (closure corrector commits + polish round).
- Local manual assurance only; the reusable fork assurance route remains absent
  per [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

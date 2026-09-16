# Semantic discovery path handling during DELTA closure

## State

open

## Gap

During the DELTA closure for PR #6, exposed semantic discovery could not inspect the workspace because it classified the untracked `control/` path as unsafe. The closure therefore has no semantic-search result for its bounded review surface. It is unknown whether this outcome is transient or depends on the workspace-path handling.

## Relevance

Semantic discovery is the default repository lookup path. This closure instead used the bounded DELTA interval and direct current-record reads; the unavailable semantic result is a tooling-observability concern, not an observation about Poda Web behavior or the contents of `control/`.

## Evidence

- 2026-09-15 closure observation for run `20260915T090346Z-ff7b4bc9214a279cfc05f3ee4ab4d97757f79ff5`: a normal workspace semantic query returned no repository result and reported an unsafe-path rejection naming `control/`.
- The completed review surface is `git diff fbbd9bf0ea3f50c9962800cff3cb37fb87edeadb..ff7b4bc9214a279cfc05f3ee4ab4d97757f79ff5`, as required for DELTA by `situation/AGENTS.md`; opening checkpoint `4c5b824eae2761e318aebcebeba0246f85635307` is distinct from its trigger head `ff7b4bc9214a279cfc05f3ee4ab4d97757f79ff5`.
- Validator observation for run `20260915T090346Z-ff7b4bc9214a279cfc05f3ee4ab4d97757f79ff5` at reviewed head `dd8f2aae1e3b2d8ad2ad28319575024794722719`: `semantic_index_status` and focused `semantic_search` calls independently returned the same unsafe-path rejection naming `control/`; exact Git and current-record reads remained available.
- Validator record-review observation for the same run and reviewed head: the preceding completed-review-surface statement ends at opening checkpoint `4c5b824eae2761e318aebcebeba0246f85635307`, while `situation/AGENTS.md` defines the DELTA endpoint as the trigger head and that checkpoint records trigger `ff7b4bc9214a279cfc05f3ee4ab4d97757f79ff5`; the provenance discrepancy remains unresolved.
- Closer observation for run `20260915T101355Z-b42002f89cffba366888756030cb53a1f48f2981` at opening checkpoint `f1a9cf20cf17adb4346c929d25cf4cae95b98137`: `semantic_index_status` and focused `semantic_search` independently returned the same unsafe-path rejection naming `control/`; the bounded `git diff e4856fa4e80102c735642d1112f3c1c2a4ae0603..b42002f89cffba366888756030cb53a1f48f2981` review surface and direct current-record reads remained available.
- Validator observation for run `20260915T101355Z-b42002f89cffba366888756030cb53a1f48f2981` at reviewed head `d77236b51c2c9bc2d374c581a729df8aa73f5f82`: `semantic_index_status` and focused `semantic_search` calls independently returned the same unsafe-path rejection naming `control/`; exact Git and direct record/source reads remained available.

- Closer observation for run `20260915T203639Z-64a02fc52b81eb5fe6229d9d87963c74cb7b1f04` at opening checkpoint `040ec7e35e30173daa3b9f32f23887e21ad61d06`: focused `semantic_search` calls returned the same unsafe-path rejection naming `control/`; native exact-diff and current-record reads remained available for `git diff 3b190d1dfad7dafc398423784414e8d260ee98c8..64a02fc52b81eb5fe6229d9d87963c74cb7b1f04`, the declared substantive review surface.
- Validator observation for run `20260915T203639Z-64a02fc52b81eb5fe6229d9d87963c74cb7b1f04` at reviewed head `af195851ef4d3e7c07d264ed1ec9231c213e1aa8`: `semantic_index_status` and focused `semantic_search` calls independently returned the same unsafe-path rejection naming `control/`; exact Git and direct record/source reads remained available for the assigned interval `040ec7e35e30173daa3b9f32f23887e21ad61d06..af195851ef4d3e7c07d264ed1ec9231c213e1aa8`.
- Validator observation for run `20260915T214745Z-92db4fcae2fa3bee57b9f15994d238dcd4a95c30` at reviewed head `b4e62cfa37acd2e5a74b60d9befcc58daff64d94`: `semantic_index_status` and focused `semantic_search` calls independently returned the same unsafe-path rejection naming `control/`; exact Git and direct record/source reads remained available for the assigned interval `ab4847bdd346c64586fa112cdfd2a4d904d3ca3a..b4e62cfa37acd2e5a74b60d9befcc58daff64d94`.
- Closer observation for run `20260915T233819Z-5d03ad57ac0b241e6ccbc04db4bc42cc8ae8ab13` at opening checkpoint `cfce2a610e3870e55f1dda1c5454c76ccdec2ab0`: `semantic_index_status` and two focused `semantic_search` requests independently returned the same unsafe-path rejection naming `control/`; the substantive `git diff dbdafb69a6efab2540667dcae22e716738d41686..5d03ad57ac0b241e6ccbc04db4bc42cc8ae8ab13` review and direct current-record/source reads remained available.
- Validator observation for run `20260915T233819Z-5d03ad57ac0b241e6ccbc04db4bc42cc8ae8ab13` at reviewed head `b857aaa4844fc9b51f4d9f901bff378cc49eec51`: two focused `semantic_search` requests returned the same unsafe-path rejection naming `control/`; exact Git and direct record/source reads remained available for the assigned interval `cfce2a610e3870e55f1dda1c5454c76ccdec2ab0..b857aaa4844fc9b51f4d9f901bff378cc49eec51`.

- Closer observation for run `20260916T205845Z-8a3e26995da2637b9d75383b16e1ed9bf56950ca` at opening checkpoint `1bcf41079fdf062ed8086b0c265e74db0a4515d1`: `semantic_index_status` and focused `semantic_search` independently returned the same unsafe-path rejection naming `control/`; the required exact `git diff c2356c63f50c23fa95842ae6db76387319a75231..1bcf41079fdf062ed8086b0c265e74db0a4515d1` review and direct current-record reads remained available.
- Validator observation for run `20260916T205845Z-8a3e26995da2637b9d75383b16e1ed9bf56950ca` at reviewed head `1812af3717bfd67b969c6b341f20176643b9e24a`: `semantic_index_status` and focused `semantic_search` independently returned the same unsafe-path rejection naming `control/`; exact Git and direct record/source reads remained available for the assigned interval `1bcf41079fdf062ed8086b0c265e74db0a4515d1..1812af3717bfd67b969c6b341f20176643b9e24a`.
## Impact

This run can retain direct Git-diff and record-read provenance, but it cannot retain the usual semantic-discovery result for the same interval. Future bounded work may encounter the same unavailable lookup until the path-handling outcome is understood.

## Resolution

none

## References

- `situation/AGENTS.md`
- `https://github.com/cleverunicornz/infrastructure/actions/runs/34950174185`

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

- Closer observation for run `20260916T205845Z-8a3e26995da2637b9d75383b16e1ed9bf56950ca` at opening checkpoint `1bcf41079fdf062ed8086b0c265e74db0a4515d1`: `semantic_index_status` and focused `semantic_search` independently returned the same unsafe-path rejection naming `control/`; the required exact `git diff c2356c63f50c23fa95842ae6db76387319a75231..8a3e26995da2637b9d75383b16e1ed9bf56950ca` review and direct current-record reads remained available.
- Validator observation for run `20260916T205845Z-8a3e26995da2637b9d75383b16e1ed9bf56950ca` at reviewed head `1812af3717bfd67b969c6b341f20176643b9e24a`: `semantic_index_status` and focused `semantic_search` independently returned the same unsafe-path rejection naming `control/`; exact Git and direct record/source reads remained available for the assigned interval `1bcf41079fdf062ed8086b0c265e74db0a4515d1..1812af3717bfd67b969c6b341f20176643b9e24a`.

- Corrector observation for run `20260916T205845Z-8a3e26995da2637b9d75383b16e1ed9bf56950ca` at correction base `825c6ede89e9f059a031ebfd1618192b904ffc68`: a focused `semantic_search` query for the docketed DELTA coordinate returned an unsafe-path rejection naming `control/` without returning repository results, although the query supplied no `control/` path. Native exact target search and current-record reads remained available for the correction.

- Validator observation for run `20260917T110444Z-6f60ab04198fcf105baab5bd4f0cadb5d48d9f90` at reviewed head `b6f65133a893a834c05ebab0c81c63cee4d53306`: `semantic_index_status` and three focused `semantic_search` requests independently returned the same unsafe-path rejection naming `control/`; exact Git and direct record/source reads remained available for the assigned interval `630881ba49928738167ed45f4f2afc6d5e7446bf..b6f65133a893a834c05ebab0c81c63cee4d53306`.
- Validator record-provenance observation for the same run and reviewed head: the new Evidence observations in `situation/gaps/G-000004-product-ui-implementation-and-evidence.md`, `situation/gaps/G-000005-unselected-product-ui-contracts.md`, and `situation/gaps/G-000006-submitted-donor-publication-review.md` label `9dd4ae7519c2b3e191a5fc2c1b5c2d0b41ccc3eb..630881ba49928738167ed45f4f2afc6d5e7446bf` as their DELTA interval. `situation/AGENTS.md` defines the endpoint as trigger head `6f60ab04198fcf105baab5bd4f0cadb5d48d9f90`; opening checkpoint `630881ba49928738167ed45f4f2afc6d5e7446bf` is its child and additionally changes the checkpoint-owned closure-state line in `situation/context.md`. The provenance discrepancy remains unresolved.
- Corrector observation for run `20260917T110444Z-6f60ab04198fcf105baab5bd4f0cadb5d48d9f90` at correction base `1acaf915f475db051d3a67b404f35c7838d18b34`: a focused `semantic_search` query for the docketed DELTA endpoint was rejected because the workspace tree contained the unsafe `control/` path, without returning repository results. Native exact target search and current-record reads remained available for this correction.
- Validator observation for run `20260917T145211Z-4065222c219a646d35031d0295df025b0d482cbe` at reviewed head `fb6c43954e51fa7970a97dab0f44e092cb9af0f0`: `semantic_index_status` and a focused `semantic_search` request independently returned the same unsafe-path rejection naming `control/`; exact Git and direct record/source reads remained available for the assigned interval `68a9e5df760dd82292cf19fb38880504f40b9be5..fb6c43954e51fa7970a97dab0f44e092cb9af0f0`.

- Closer observation for run `20260921T084538Z-9a1c0880b27a002b5b9350e81c94d520aac51345` at opening checkpoint `b57c31634d01170833c277b4e08d03623b094d0f`: `semantic_index_status` and a focused `semantic_search` request independently returned the same unsafe-path rejection naming `control/`; the bounded `git diff 9690f539babc630551bcac6e58b7e11b69e61700..9a1c0880b27a002b5b9350e81c94d520aac51345` review and direct current-record reads remained available.
- Validator observation for run `20260921T084538Z-9a1c0880b27a002b5b9350e81c94d520aac51345`
  at reviewed head `2c13c876d5489aad18e2486257940950e239bf7e`:
  `semantic_index_status` and a focused `semantic_search` request independently
  returned the same unsafe-path rejection naming `control/`; exact Git and direct
  record/source reads remained available for the assigned interval
  `b57c31634d01170833c277b4e08d03623b094d0f..2c13c876d5489aad18e2486257940950e239bf7e`.
- Validator record-provenance observation for the same run and reviewed head:
  the new Evidence observations in
  `situation/gaps/G-000005-unselected-product-ui-contracts.md` and this Gap
  describe `9690f539babc630551bcac6e58b7e11b69e61700..b57c31634d01170833c277b4e08d03623b094d0f`
  as the DELTA or bounded review surface. `situation/AGENTS.md` defines the
  DELTA endpoint as trigger head
  `9a1c0880b27a002b5b9350e81c94d520aac51345`; opening checkpoint
  `b57c31634d01170833c277b4e08d03623b094d0f` is its child and additionally
  changes the checkpoint-owned closure-state line in `situation/context.md`.
  The provenance discrepancy remains unresolved.
- Corrector observation for run `20260921T084538Z-9a1c0880b27a002b5b9350e81c94d520aac51345` at correction base `edb7122bb4ab1a749177a7d9f563d6ecafa33c00`: a focused `semantic_search` query for the docketed DELTA coordinate returned an unsafe-path rejection naming `control/` without returning repository results. Exact Git and direct current-record reads remained available for this correction.

## Impact

This run can retain direct Git-diff and record-read provenance, but it cannot retain the usual semantic-discovery result for the same interval. Future bounded work may encounter the same unavailable lookup until the path-handling outcome is understood.

## Resolution

none

## References

- `situation/AGENTS.md`
- `https://github.com/cleverunicornz/infrastructure/actions/runs/34950174185`

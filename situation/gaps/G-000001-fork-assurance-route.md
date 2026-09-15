# No recorded fork assurance route

## State

addressing

## Gap

No implemented Oracle and retained PASS Witness record an assured verification route for a Poda Web fork-specific gate claim.

## Relevance

The root repository block must state whether a recorded route can support a gate claim. As an `UPSTREAM_FORK`, Poda Web cannot treat inherited upstream workflows as fork-owned assurance merely because their files are present.

## Evidence

- At `0fa70ec5ce`, `git ls-tree -r --name-only 0fa70ec5ce situation/witnesses` returns only `situation/witnesses/AGENTS.md`; no retained PASS witness exists.
- `.github/workflows/tests.yml` defines an inherited test workflow, but no recorded Oracle and Witness connect it to a fork-specific gate claim.
- [D-000001](situation/decisions/D-000001-upstream-authority.md) records that Element Web remains the external upstream authority.

- DELTA observation for run `20260914T064256Z-af14eab5807a7290dd44ecbc075672d799fd0cf8`: `git diff --name-status 7f2105f5fe4f719e157d00850c6ecae4f36138c6..af14eab5807a7290dd44ecbc075672d799fd0cf8 -- situation/promises situation/oracles situation/witnesses` changes only `situation/oracles/AGENTS.md`; it adds no Promise, Oracle, or Witness record that could establish an assured fork route.
- [D-000002](situation/decisions/D-000002-disable-inherited-workflows.md) records the inherited-workflow settings decision, but it does not establish a Promise, Oracle, and PASS Witness route.
- DELTA observation for run `20260914T132604Z-a79258d272a124a98501ae78dc96a0e468e506ac`:
  [P-000005](situation/promises/P-000005-poda-fork-assurance-route.md) remains
  `hypothesis`, [O-000005](situation/oracles/O-000005-poda-fork-assurance-route.md)
  remains `designed`, and `situation/witnesses/` contains only its namespace
  guidance; no P-000005 Witness or exact-head fork-owned CI result is retained.
- Validator observation for run
  `20260914T132604Z-a79258d272a124a98501ae78dc96a0e468e506ac` at reviewed
  head `0953c28a88924114176abb5bca3f867274f84666`:
  `apps/web/scripts/check-poda-branding.mjs` treats the presence of the literal
  `body.mx_PodaTheme` anywhere in `_PodaTheme.pcss` as its stylesheet-scope
  check, so unscoped rules would not contradict that executable result.
  `apps/web/project.json` also makes `poda:check` cacheable but omits the
  stylesheet from the target's explicit inputs even though the checker reads
  it. Whether a future fork-owned exact-head route supplies a decision-complete,
  cache-correct scope check remains unresolved.
- 2026-09-15 Gate 1 observation: [W-000002](situation/witnesses/P-000015/W-000002-module-navigation-gate-incomplete.md) retains direct manual observations for one narrow fork-specific module gate, but is `INVALID` as complete assurance because retained evidence omits Back/Forward active-control and per-matrix control-operability observations. [G-000011](situation/gaps/G-000011-navigation-gate-assurance-coverage.md) retains that absence without asserting runtime failure. [O-000015](situation/oracles/O-000015-module-navigation-mount-gate.md) remains `designed` because the checked-in Playwright project was blocked by its absent pinned Chromium. These partial observations do not implement the reusable assurance route whose absence this Gap records.
- DELTA observation for run `20260915T214745Z-92db4fcae2fa3bee57b9f15994d238dcd4a95c30` over `4beedcb1c4109660d7547d9470b75fa82479a6d7..92db4fcae2fa3bee57b9f15994d238dcd4a95c30`: [P-000016](situation/promises/P-000016-decision-complete-module-navigation-gate.md) is `assured` by [W-000003](situation/witnesses/P-000016/W-000003-decision-complete-module-navigation-gate-pass.md) at exact head `53c290b3c62f01ae95ca74893ce3c944a1b472b7`, but [O-000016](situation/oracles/O-000016-decision-complete-module-navigation-gate.md) remains `designed` with every leg manual and W-000003 retains committed local evidence rather than an exact-head fork-owned CI run URL. It assures P-000016's finite local-preview Scope but does not implement P-000005's reusable fork assurance route.

- DELTA observation for run `20260915T233819Z-5d03ad57ac0b241e6ccbc04db4bc42cc8ae8ab13` over `dbdafb69a6efab2540667dcae22e716738d41686..5d03ad57ac0b241e6ccbc04db4bc42cc8ae8ab13`: [P-000017](situation/promises/P-000017-seamless-module-native-return.md) is assured by [W-000004](situation/witnesses/P-000017/W-000004-same-document-module-native-return-pass.md) under implemented [O-000017](situation/oracles/O-000017-seamless-module-native-return.md) at source head `5f5aebcda2c829a6ff7489a4e05fd454352c17e5`, but W-000004 retains a local Chrome/source observation rather than an exact-pull-request-head fork-owned CI run URL and covers only P-000017's local-preview Scope. [P-000005](situation/promises/P-000005-poda-fork-assurance-route.md) remains `hypothesis` and [O-000005](situation/oracles/O-000005-poda-fork-assurance-route.md) remains `designed`; P-000017 does not implement the reusable route this Gap retains.
- Validator record-shape observation for run `20260915T233819Z-5d03ad57ac0b241e6ccbc04db4bc42cc8ae8ab13` at reviewed head `b857aaa4844fc9b51f4d9f901bff378cc49eec51`: [O-000005](situation/oracles/O-000005-poda-fork-assurance-route.md) states Inputs and Pass/Fail conditions but omits the `Implementation coverage` mapping required by `situation/oracles/AGENTS.md`. No Witness relies on O-000005, so this reinforces the unassured projection without changing the Gap's State or Resolution.

## Impact

The root repository block must render its Verification bullet as unassured, and no fork-specific gate claim can cite an inherited workflow run.
- The repository projection must distinguish P-000015's partial manual observations from the still-absent implemented, reusable fork route; a blanket statement that no fork-specific Witness exists is no longer accurate.
- The repository projection must distinguish P-000016's separately assured manual local gate from the still-absent reusable run-URL route.

## Resolution

- [P-000005](situation/promises/P-000005-poda-fork-assurance-route.md) states
  the intended fork-specific assurance behavior.
- [PLAN-000002](situation/plans/active/PLAN-000002-poda-element-visual-alignment.md)
  orders its implementation and requires retained PASS Witnesses before
  completion.

## References

- `situation/decisions/D-000001-upstream-authority.md`
- `situation/invariants/I-000001-upstream-authority-boundary.md`
- [Gate 1 Chromium Witness](situation/witnesses/P-000015/W-000002-module-navigation-gate-incomplete.md)

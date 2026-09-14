# Disable inherited upstream workflows

## Status

accepted

## Date

2026-09-14

## Context

The fork runs GitHub Actions exclusively on the organization's self-hosted fleet, which serves logical runner labels. The inherited upstream workflow set targets GitHub-hosted `ubuntu-*` labels. When PR #3 (first upstream sync into `main`) opened, 9 inherited workflows fired: 8 concluded `startup_failure` with no runner ever assigned, and `Pull Request Base Branch` queued indefinitely until cancelled. Separately, that workflow's script admits only `develop`, `staging`, and `feat/*` base branches — upstream's branching model — while this fork's trunks are `main` and `internal/main`, so the check can never pass here. Branch policy is enforced by the organization rulesets, making the workflow redundant even where it could run.

## Evidence

- https://github.com/cleverunicornz/poda-web/actions/runs/34812642576 (job 103876863195): queued 2026-09-14T06:14:52Z, no runner assigned, no steps, cancelled.
- `5efdc335023d8538425c656b97cddb7213c5c7f3:.github/workflows/pull_request_base_branch.yaml` — `runs-on: ubuntu-24.04`; base-branch allowlist `develop`/`staging`/`feat/*`.
- `git diff 5efdc335023d8538425c656b97cddb7213c5c7f3 origin/internal/main -- .github/workflows/` is empty: all 45 workflow files are upstream-inherited; the fork owns none.
- 44 of 45 workflows reported `active` before 2026-09-14; sibling runs triggered by PR #3's open concluded `startup_failure`.
- [G-000001](situation/gaps/G-000001-fork-assurance-route.md) — inherited upstream workflows are not a fork-owned assurance route.
- Maintainer direction, 2026-09-14: upstream CI verdicts are the vetting evidence for pure mirror syncs; re-running upstream's suite on the fork adds nothing.

## Decision

Disable every inherited upstream workflow at repository settings level (all 45, including `Pull Request Base Branch`). Do not delete or modify the workflow files, and author no fork-owned workflows at this time.

## Why

The workflows cannot execute on the self-hosted fleet, cannot represent fork assurance, and the one branch-policy check among them encodes a policy this fork does not run. Disabling at settings level leaves the upstream-owned tree byte-identical (preserving [I-000001](situation/invariants/I-000001-upstream-authority-boundary.md)), survives every future upstream sync without merge conflicts, and is reversible per workflow. For pure mirror syncs the vetting evidence is upstream's own green CI on the exact head SHA, cited by run URL on the pull request.

## Rejected alternatives

- Deleting or editing the workflow files in-tree: rejected — forks the upstream-owned tree, buys modify/delete conflicts at every future sync that touches them, and violates the boundary in [I-000001](situation/invariants/I-000001-upstream-authority-boundary.md).
- Leaving them enabled as harmless: rejected — they fire on real events (pull request open, review request, schedules) and produce `startup_failure` noise or indefinite queues on every qualifying trigger.
- Adapting the inherited workflows to fleet labels and fork trunks: rejected — branch policy already lives in the organization rulesets; a second convention beside it adds drift risk for no assurance gain.
- Authoring fork-owned CI now: rejected by the maintainer — no fork-authored product code exists yet, so there is nothing for fork CI to check that upstream has not already vetted.

## Consequences

- The repository has zero active workflows; no pull request carries inherited-workflow checks.
- Pure mirror syncs merge on maintainer review plus cited upstream CI evidence; [G-000001](situation/gaps/G-000001-fork-assurance-route.md) remains open by design.
- Any future fork-owned workflow must use a `poda-` filename prefix and fleet logical labels to stay collision-free and runnable.
- [I-000002](situation/invariants/I-000002-inherited-workflows-disabled.md) states the binding rule.

## Revisit when

Fork-authored product code lands on `internal/main` (upstream's green no longer covers the delta), or the fleet begins serving GitHub-hosted runner labels, or a maintainer re-enables specific workflows for a stated purpose.

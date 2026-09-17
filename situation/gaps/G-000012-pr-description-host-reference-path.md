# PR description retains the moved host-discovery path

## State

open

## Gap

The public description of PR #11 still links the host-discovery reference at `situation/references/D-000019/module-vs-widget-host-discovery.md`, while the reviewed closure interval moves that reference to `situation/references/G-000005/module-vs-widget-host-discovery.md`. It is unknown whether the PR orientation will be updated or intentionally retain the pre-closure path.

## Relevance

The PR description is the human entrypoint for the bounded profile/studio spike and directs reviewers to the retained host comparison. The moved current path reflects G-000005 ownership rather than a Decision-owned product selection.

## Evidence

- Validator observation for run `20260916T205845Z-8a3e26995da2637b9d75383b16e1ed9bf56950ca` at reviewed head `1812af3717bfd67b969c6b341f20176643b9e24a`: PR #11's “What this PR contains” section links the D-000019 path.
- Reviewed commit `824c7a118923cc8205d2c1e722f567d24b14ed32` renames the reference with 100% similarity to the G-000005 path and links that current path from `situation/gaps/G-000005-unselected-product-ui-contracts.md`.
- Exact repository search found no remaining reference to the D-000019 path in the reviewed tree; this observation concerns the public PR description, not an in-repository stale link.

## Impact

A reviewer following the PR description may reach a missing current path or infer Decision ownership that the reviewed rename intentionally removed. The retained repository records and their current links remain available.

## Resolution

none

## References

- https://github.com/cleverunicornz/poda-web/pull/11
- [Current host-discovery reference](situation/references/G-000005/module-vs-widget-host-discovery.md)
- [Unselected product UI contracts](situation/gaps/G-000005-unselected-product-ui-contracts.md)

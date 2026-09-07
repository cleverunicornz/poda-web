# No recorded fork assurance route

## State

open

## Gap

No implemented Oracle and retained PASS Witness record an assured verification route for a Poda Web fork-specific gate claim.

## Relevance

The root repository block must state whether a recorded route can support a gate claim. As an `UPSTREAM_FORK`, Poda Web cannot treat inherited upstream workflows as fork-owned assurance merely because their files are present.

## Evidence

- At `0fa70ec5ce`, `git ls-tree -r --name-only 0fa70ec5ce situation/witnesses` returns only `situation/witnesses/AGENTS.md`; no retained PASS witness exists.
- `.github/workflows/tests.yml` defines an inherited test workflow, but no recorded Oracle and Witness connect it to a fork-specific gate claim.
- [D-000001](situation/decisions/D-000001-upstream-authority.md) records that Element Web remains the external upstream authority.

## Impact

The root repository block must render its Verification bullet as unassured, and no fork-specific gate claim can cite an inherited workflow run.

## Resolution

none

## References

- `situation/decisions/D-000001-upstream-authority.md`
- `situation/invariants/I-000001-upstream-authority-boundary.md`

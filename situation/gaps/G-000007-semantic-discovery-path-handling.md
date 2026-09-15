# Semantic discovery path handling during DELTA closure

## State

open

## Gap

During the DELTA closure for PR #6, exposed semantic discovery could not inspect the workspace because it classified the untracked `control/` path as unsafe. The closure therefore has no semantic-search result for its bounded review surface. It is unknown whether this outcome is transient or depends on the workspace-path handling.

## Relevance

Semantic discovery is the default repository lookup path. This closure instead used the bounded DELTA interval and direct current-record reads; the unavailable semantic result is a tooling-observability concern, not an observation about Poda Web behavior or the contents of `control/`.

## Evidence

- 2026-09-15 closure observation for run `20260915T090346Z-ff7b4bc9214a279cfc05f3ee4ab4d97757f79ff5`: a normal workspace semantic query returned no repository result and reported an unsafe-path rejection naming `control/`.
- The completed review surface is `git diff fbbd9bf0ea3f50c9962800cff3cb37fb87edeadb..4c5b824eae2761e318aebcebeba0246f85635307`, as required for DELTA by `situation/AGENTS.md`.

## Impact

This run can retain direct Git-diff and record-read provenance, but it cannot retain the usual semantic-discovery result for the same interval. Future bounded work may encounter the same unavailable lookup until the path-handling outcome is understood.

## Resolution

none

## References

- `situation/AGENTS.md`
- `https://github.com/cleverunicornz/infrastructure/actions/runs/34950174185`

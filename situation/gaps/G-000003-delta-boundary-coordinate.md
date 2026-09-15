# Non-resolving DELTA boundary coordinate

## State

open

## Gap

The closure input named a prior closing-checkpoint coordinate that does not
resolve to the branch's actual checkpoint, so the declared DELTA interval cannot
be reproduced verbatim from that coordinate.

## Relevance

DELTA review is bounded by the previous closing checkpoint and admitted head.
A non-resolving boundary can prevent a closer from inspecting the required
interval or lead to an inaccurately stated review surface.

## Evidence

- The [opening comment](https://github.com/cleverunicornz/poda-web/pull/2#issuecomment-5664762387)
  records the supplied non-resolving interval.
- The [interval correction](https://github.com/cleverunicornz/poda-web/pull/2#issuecomment-5664779984)
  records the branch-resolved prior checkpoint
  `eb89dedf51047e3e60a158f5a363874bbdfb1ac8` and corrected interval.
- `situation/context.md` identifies the prior completed closure as run
  `20260914T064256Z-af14eab5807a7290dd44ecbc075672d799fd0cf8`.

## Impact

A future DELTA reader needs a resolvable closing-checkpoint coordinate to
reproduce its bounded diff. This does not challenge the product implementation
or the current unassured verification disposition.

## Resolution

none

## References

- `situation/context.md`
- https://github.com/cleverunicornz/poda-web/pull/2#issuecomment-5664762387
- https://github.com/cleverunicornz/poda-web/pull/2#issuecomment-5664779984

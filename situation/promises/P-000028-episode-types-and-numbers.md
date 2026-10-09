# Episode types and episode numbers

## State

assured

## Promise

In the `modules/poda-profile-spike` episode wizard and Studio:

1. The wizard offers **Episode type**: Full episode (default), Trailer and
   Bonus.
2. Creating a **full** episode that is scheduled (or published) without an
   episode number is refused inline with "Full episodes need an episode number
   once they are scheduled or published."; a draft, a trailer or a bonus
   episode is accepted without one; an episode number below 1 or not whole is
   refused.
3. Changing the episode type or status clears a shown episode-number error.
4. Episode labels in Studio and share cards add "Trailer" or "Bonus" for those
   types ("S1 · Trailer"); full episodes keep "S2E4".
5. In the podcast and episode wizards, fields sharing a row start at the same
   height, text inputs align with the fields above them, and the page's
   sections (header, hero card, draft bar, form) are separated by the standard
   24px spacing.

## Scope

The module's episode wizard, episode list, episode and podcast detail pages
and share-card snapshots, with the session-only data adapter, in a local build,
as changed by [D-000031](situation/decisions/D-000031-episode-types-and-numbers.md).

## Oracle

[O-000028](situation/oracles/O-000028-episode-types-and-numbers.md)

## State evidence

- [D-000031](situation/decisions/D-000031-episode-types-and-numbers.md) selects
  the behavior.
- `implemented`: commits `806ce935f8`, `9ea389cd71` and `ab219e44e9` on
  branch `internal/plus-and-polish`.
- `assured`: [O-000028](situation/oracles/O-000028-episode-types-and-numbers.md)
  passed on [W-000015](situation/witnesses/P-000028/W-000015-episode-types-and-numbers-local-pass.md)
  at `ab219e44e9`; local manual assurance per
  [G-000001](situation/gaps/G-000001-fork-assurance-route.md).

## Residual

Editing an episode, moving it to Published or Archived, publishing to podcast
apps, and serial or episodic show types are not assured (D-000031
Consequences).

## References

- [D-000031](situation/decisions/D-000031-episode-types-and-numbers.md)
- [Apple: A Podcaster's Guide to RSS](https://help.apple.com/itc/podcasts_connect/en.lproj/itcb54353390.html)

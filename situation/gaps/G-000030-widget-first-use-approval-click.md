# Room widgets need an approval click before first use

## State

open

## Gap

Element asks each viewer to approve a room widget ("Widget added by …,
Continue") before it first loads, and again after its URL changes. The
maintainer asked for one-click access to the profile widget; whether Poda's own
widgets should be pre-approved for members, and through which policy, is
unselected.

## Relevance

[D-000024](situation/decisions/D-000024-poda-profile-side-panel.md) one-click
widgets; [I-000007](situation/invariants/I-000007-server-owned-access-authority.md)
access authority.

## Evidence

During the 2026-10-07 runs behind
[W-000006](situation/witnesses/P-000021/W-000006-profile-side-panel-local-pass.md),
the widget's first load for Mira, and its first load after its URL changed,
showed Element's "Widget added by … Continue" prompt; the content appeared after
Continue.

## Impact

The first use of each Poda widget costs a second click and shows a data-sharing
notice.

## Resolution

none

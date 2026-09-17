# Poda creation flows

## State

implementing

## Promise

In Poda Web, a signed-in user can create a podcast through a validated form,
create episodes for it through a validated form, and browse Studio Podcasts,
Episodes, and Analytics collections through module pages. All of those flows use
one session-only in-memory data boundary, render in both Poda themes, and leave
Chat unchanged.

## Scope

The `modules/poda-profile-spike/` package extended with: the adapter and its
seed, Studio Podcasts/Episodes collection views, podcast and episode creation
pages with validation, and a mock Analytics page. Mock data only; reload
resets.

## Oracle

[O-000018](situation/oracles/O-000018-poda-creation-flows.md)

## State evidence

- `4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/data/mockAdapter.js`, `4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/studio/podcastCreate.js`, and `4065222c219a646d35031d0295df025b0d482cbe:modules/poda-profile-spike/src/studio/studioList.js` implement the adapter, Podcast collection, and validated podcast-creation portion; episode collection/creation and Analytics work remain active.
- [D-000021](situation/decisions/D-000021-poda-creation-flows.md) selects the
  slice and records the donor wizard evidence.
- [Plan document](situation/references/D-000021/poda-creation-flows-plan.md).

## Residual

This promise does not assure: persistence, backend, wizard-style multi-step
UX, appearance-guest selection, feed serialization/publishing, real
analytics, or any behavior beyond the session.

## References

- [situation/references/D-000021/poda-creation-flows-plan.md](situation/references/D-000021/poda-creation-flows-plan.md)

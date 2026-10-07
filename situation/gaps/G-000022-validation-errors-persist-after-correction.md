# Wizard validation errors persist after the field is corrected

## State

open

## Gap

After a rejected submit, the podcast wizard keeps a field's error message and
invalid styling after the user fills the field, until the next submit. It is
unresolved whether errors should clear on input.

## Relevance

[O-000018](situation/oracles/O-000018-poda-creation-flows.md) P1 and
[O-000019](situation/oracles/O-000019-pcc-native-module-design.md) P2 judge
inline validation.

## Evidence

At `f11fe6c0b2` on 2026-10-06: an empty Create Podcast submit showed "Title is
required."; after typing a title the readiness rail reached 100% while "Title is
required." and the red border remained under the filled field.
`f11fe6c0b2:modules/poda-profile-spike/src/studio/podcastCreate.js` lines 370-378 clear
and set `aria-invalid` only in the submit handler.

## Impact

Users see contradictory signals (100% ready, field still in error).

## Resolution

none

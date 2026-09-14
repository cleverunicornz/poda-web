# Judge assisted artifact updates

## State

designed

## Judges

[P-000010](situation/promises/P-000010-assisted-artifact-updates.md)

## Inputs

Fix the source/build identity, production editor, member, explicit assistant and permitted room; the shared manual/assisted artifact/form contract; artifact A at V0; a backend-accepted update to V1; a conversation-only success statement with no artifact mutation; unsaved human edit H; a second backend update V2; a service-rejected update; and a finite observation window before running. A/V0/V1/H/V2 name scenario values, not a prescribed schema or transport.

Supply the selected human-draft policy with exact expected presentation and human choices for H against V2. Retain source/contract references establishing the common manual/assisted form contract, authoritative artifact outcomes, conversation events, UI/action traces and draft values for: clean V0-to-V1 update; text-only claim; H then V2 and the selected adjudication; and rejected update. Record the service-defined observation boundary for each backend change. The assistant's backend implementation is not an input to frontend assurance.

Unselected policy, incomplete traces or absent service contracts prevent judgment and remain G-000005/G-000004 concerns, not PASS. Require all Pass legs; any observed Fail leg in complete in-Scope evidence fails. No execution or executable checker is claimed.

## Pass

- P1: The clean editor observes authoritative V1 on A by the declared boundary using the same identity and form validation/mutation contract as manual editing.
- P2: The conversation-only success statement leaves the canonical artifact unchanged and creates no saved, published or completed-artifact claim.
- P3: When V2 arrives over H, H is retained or explicitly adjudicated through the selected human-draft policy; the trace distinguishes local H from authoritative V2 until resolution and shows no silent discard/overwrite.
- P4: The rejected update remains visibly rejected with no granted artifact authority or successful artifact-change claim based on conversation presence or frontend controls.

## Fail

- F1: The clean update is not observed by the declared boundary, changes artifact identity, or uses a divergent manual/assisted form validation/mutation contract.
- F2: Conversation text alone changes the canonical artifact or produces a saved, published or completed-artifact claim.
- F3: H is silently discarded/overwritten, draft and authoritative state are conflated before resolution, or the observed adjudication contradicts the selected policy.
- F4: The rejected update lacks a visible rejection or is presented as successful or authorized through conversation presence or frontend controls.

## Implementation coverage

| Leg | Decision | Coverage |
|---|---|---|
| P1 | Clean backend update appears through the shared artifact/form contract | manual |
| P2 | Conversation-only claim has no artifact or persistence authority | manual |
| P3 | Dirty update preserves or explicitly adjudicates distinct human work | manual |
| P4 | Rejected update remains rejected without frontend authority escalation | manual |
| F1 | Clean update is absent or violates identity/contract equivalence | manual |
| F2 | Text-only claim is treated as artifact truth | manual |
| F3 | Human work is lost, conflated or adjudicated against policy | manual |
| F4 | Rejected update gains false success or authorization | manual |

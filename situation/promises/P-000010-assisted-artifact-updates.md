# Assisted artifact updates

## State

hypothesis

## Promise

For an open supported artifact editor and an explicitly authorized assistant workflow:

1. An authoritative backend artifact change becomes visible in the clean editor under the same artifact identity and form validation/mutation contract used for manual editing.
2. Conversation text alone, including an assistant's statement that work succeeded, does not change the canonical artifact or produce a saved, published or completed-artifact claim.
3. If an authoritative update arrives while the member has unsaved edits, the UI preserves those edits or presents and applies an explicit human-draft adjudication under the selected policy. It does not silently discard or overwrite unsaved work, and it distinguishes the local draft from the authoritative update until resolved.
4. A rejected or unauthorized assistant-driven artifact change remains rejected in the UI; conversation presence and frontend affordances do not confer artifact authority.

## Scope

A named artifact, authorized assistant identity and permitted conversation room, selected form and human-draft policy, and a bounded sequence of clean update, text-only success claim, dirty update/adjudication and rejected update. The frontend observes provided service outcomes; it does not implement the assistant's tools or orchestration. This is prospective product behavior separate from current visual work.

## Oracle

[O-000010](situation/oracles/O-000010-assisted-artifact-updates.md)

## State evidence

[D-000016](situation/decisions/D-000016-native-assistance-and-shared-artifacts.md) selects shared artifacts and explicit draft handling. [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains missing implementation/evidence. No feasibility or passing Witness is claimed.

## Residual

Transport, artifact revision semantics, concurrent-editor resolution, approval/confirmation rules and the exact human-draft policy are unselected in [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md). No assistant account provisioning, personalization, room participation management, agent tool or permission implementation is promised. Older superseded/withdrawn product Promises remain inactive.

## References

- [I-000006](situation/invariants/I-000006-shared-artifact-editing-contract.md)
- [I-000007](situation/invariants/I-000007-server-owned-access-authority.md)
- [I-000009](situation/invariants/I-000009-production-truth-and-preview-isolation.md)

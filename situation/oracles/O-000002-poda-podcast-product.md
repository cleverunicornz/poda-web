# Poda podcast product oracle

## State

designed

## Judges

- [P-000002](situation/promises/P-000002-poda-podcast-product.md)

## Inputs

- The exact Podcast Namespace revision named in the owning plan.
- Runtime-validated fixtures for listener, guest, creator, assigned member,
  unassigned member, administrator, and owner roles.
- Unit, component, accessibility, and end-to-end results from the exact
  pull-request head.
- Network traces and resulting revisioned records for create, edit, upload,
  preview, schedule, and publish flows.

## Pass

- Home, catalog, player, queue, transcript, favorite, discovery, Profile, and
  Studio behavior is usable in loading, empty, success, offline, conflict,
  quota, validation, and forbidden states.
- Each role can perform every allowed profile, podcast, and episode action and
  cannot perform an action denied by its organization role or publication
  assignment.
- Known current Podcast Namespace fields round-trip with their required parent
  constraints, unknown newer fields survive edits, and deprecated values are
  preserved without new authoring.
- Draft autosave, crash recovery, conflict handling, resumable digest-verified
  upload, AI/transcription preview and acceptance, explicit preview,
  scheduling, and publication produce the declared state transitions without
  silently overwriting content.
- Published records expose the external canonical URL without making the SPA
  authoritative for the public page.

## Fail

- A required workflow is absent, loses data, violates a role boundary, or
  reports success without authoritative state.
- Podcast Namespace data is emitted under an invalid parent, discarded during
  an unrelated edit, or authored through a deprecated field.
- A conflict is blindly merged, AI output overwrites content without
  acceptance, or an incomplete upload becomes publishable.
- The SPA claims ownership of the canonical unauthenticated page.

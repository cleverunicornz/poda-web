# Element-native Poda skin

## State

qualifying

## Candidate

Deliver the Poda look through Element's existing branding configuration,
custom-theme colors, Compound semantic tokens, bundled Inter font, and current
icon system, adding narrowly scoped presentation CSS only where those supported
hooks cannot express the approved visual contract.

## Origin

- [G-000002](situation/gaps/G-000002-poda-visual-acceptance-contract.md)
- [D-000007](situation/decisions/D-000007-visual-first-element-alignment.md)
- [D-000008](situation/decisions/D-000008-poda-brand-source-assets.md)
- `Private: cleverunicornz/yeet-code@6bddee4dfd9fa8ee0474aa70170b79650447cbc8#apps/structured-chat-mock`
  (private; requires repository access)

## Why consider it

The donor and Element already share Inter, eight-pixel radii, a narrow rail,
conversation list, timeline, and resizable right panel. A semantic-token-first
skin can therefore achieve the visual direction while keeping Element stores,
actions, accessibility primitives, responsive layout, and Matrix semantics
intact and limiting future upstream merge conflicts.

## Qualification questions

- Is Poda the default selectable theme, the only exposed theme, or an optional
  theme alongside Element light and dark?
- Must the first accepted slice include both Poda light and Poda dark modes?
- Which supplied illustration and crop, if any, belongs in each existing
  Element auth, welcome, loading, or empty-state branding slot, and which
  optimized derivatives are required for dense icon sizes?
- Which extracted colors become semantic UI tokens, and which remain confined
  to artwork after contrast and state-role checks?
- Does approved fidelity preserve Element's current rail/panel widths and
  resizers, or adopt the donor's exact 64/320/380-pixel defaults?
- Does the visual contract cover all user-facing web surfaces in the first
  slice, or the authenticated chat shell before authentication and settings?
- What public redistribution, attribution, or licensing terms apply if the
  internal source set is later shipped outside this fork?

## Candidate approaches

- Configuration-first custom themes and branding, followed by the smallest
  Poda-scoped CSS gap layer. This is the recommended approach because it uses
  existing Element extension points and keeps behavior untouched.
- A dedicated built-in Poda light/dark theme. This gives tighter product
  control but adds theme registration and a larger upstream merge surface.
- Rewriting Element's built-in light and dark defaults. This is simplest for a
  single-brand distribution but creates the most upstream conflict and removes
  an easy baseline comparison.

## Disposition

none; qualification is active.

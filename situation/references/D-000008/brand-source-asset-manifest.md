# Poda brand source asset manifest

## Ownership and boundary

This reference is owned by
[D-000008](situation/decisions/D-000008-poda-brand-source-assets.md). It retains
the exact files supplied by the maintainer on 2026-09-09. Files under this
reference are source evidence, not production web assets. A runtime derivative
must be added to an appropriate Element asset path, cite its source file and
digest below, and be judged under
[O-000007](situation/oracles/O-000007-poda-theme-delivery.md).

## Inventory

| Repository file | Supplied form | Geometry | Bytes | SHA-256 | Intended role at qualification time |
|---|---|---:|---:|---|---|
| `situation/references/D-000008/assets/poda-character-microphone.svg` | `cleaned up poda clean mic new colors 2 svg.svg` | `833.02423 × 839.27551`; viewBox `0 0 220.40433 222.05831` | 93,598 | `95e06cec71258fd14b07b652f23bdc5814efe3e225f1373eb9eff290d4549d88` | Vector master for the circular character-and-microphone brand mark |
| `situation/references/D-000008/assets/poda-character-microphone-preview.png` | supplied PNG preview | `500 × 504` RGBA | 119,259 | `b19b73a11e28c8277b14cd82e946b161212113f6c5467b16084d593dfb964820` | Render reference for the full mark; not a master |
| `situation/references/D-000008/assets/poda-character-microphone-25px.webp` | supplied lossless WebP | `25 × 25` RGBA | 1,690 | `58a462c20b6005791c2ba7c8eb43bc41b8a5052a2ed692f6140417b5f918f4b3` | Small-size legibility reference and candidate favicon appearance; not the derivative source |
| `situation/references/D-000008/assets/poda-girls-podcasting-by-lantern.svg` | `Girls podcasting by the lantern.svg` | `406.39999 mm × 270.93332 mm`; viewBox `0 0 406.39999 270.93332` | 377,720 | `286cdfd9c3f06c4266929c328b1cf1ff5f952acac32d7e7d0e76e7bec5b8c534` | Candidate complete illustration for an existing auth, welcome, or empty-state artwork slot |
| `situation/references/D-000008/assets/poda-landscape.svg` | `drawingBackground SVG.svg` | `406.39999 mm × 270.93332 mm`; viewBox `0 0 406.39999 270.93332` | 51,789 | `71e6d678f57b6c129956175833ec0f2ac3763e152f30a8dae1fee2312e075b91` | Vector master for the scenic background |
| `situation/references/D-000008/assets/poda-landscape-preview.png` | supplied PNG preview | `1536 × 1024` RGBA | 107,437 | `b93c46b915a707c352db16616a8a58cab61ac6bc3f4bca68b0fd5bb91acc7994` | Render reference for the scenic background; not a master |

The scene illustrations are candidate placements, not commitments. They may be
used only in presentation slots Element already has; they do not imply a new
landing page or podcast workflow.

## Runtime derivatives

The first visual-alignment implementation produces the following runtime files.
`apps/web/scripts/derive-poda-brand-assets.mjs` verifies every retained input
digest before deriving or copying an output. Its `--check` mode regenerates the
expected bytes in memory and fails if a committed output is absent or stale.

| Runtime file | Retained source | Transformation | Runtime geometry | Bytes | SHA-256 | Existing Element slot |
|---|---|---|---|---:|---|---|
| `apps/web/res/themes/poda/img/logos/poda-mark.svg` | `poda-character-microphone.svg` at `95e06cec71258fd14b07b652f23bdc5814efe3e225f1373eb9eff290d4549d88` | Remove XML/editor metadata and editor namespaces; convert internal `xlink:href` to `href`; reject executable, embedded-raster, data, and external references; preserve viewBox and visible geometry counts | viewBox `0 0 220.40433 222.05831` | 90,813 | `0fdc3690902eb417340d83c6d5635ad5bb3dbbe9348ca92b0dc2b7b13fc37dfa` | Authentication header, default welcome, signed-in home, SVG favicon, and scalable manifest icon |
| `apps/web/res/themes/poda/img/backgrounds/poda-landscape.svg` | `poda-landscape.svg` at `71e6d678f57b6c129956175833ec0f2ac3763e152f30a8dae1fee2312e075b91` | Same deterministic SVG sanitization and geometry checks | viewBox `0 0 406.39999 270.93332` | 49,240 | `5f61d269a25686554c0504b3508aae2d9710fa8c83bce71a484382c125ac797a` | Existing authentication/welcome background configured with centered cover behavior |
| `apps/web/res/themes/poda/img/logos/poda-mark-25.webp` | `poda-character-microphone-25px.webp` at the same digest | Digest-checked byte-for-byte copy of the maintainer-supplied dense-size rendering | `25 × 25` RGBA lossless WebP | 1,690 | `58a462c20b6005791c2ba7c8eb43bc41b8a5052a2ed692f6140417b5f918f4b3` | Small browser favicon and manifest fallback |
| `apps/web/res/themes/poda/img/logos/poda-mark-500.png` | `poda-character-microphone-preview.png` at the same digest | Digest-checked byte-for-byte copy of the maintainer-supplied large rendering | `500 × 504` RGBA PNG | 119,259 | `b19b73a11e28c8277b14cd82e946b161212113f6c5467b16084d593dfb964820` | Apple touch icon and default Open Graph image |

Generate the files from the repository root with
`node apps/web/scripts/derive-poda-brand-assets.mjs`; verify them with the same
command plus `--check`. The `element-web:poda:check` Nx target combines that
derivation check with `apps/web/scripts/check-poda-branding.mjs`, and the
production `element-web:build` target depends on it.

No runtime derivative of `poda-girls-podcasting-by-lantern.svg` is present in
this slice. Its responsive crop and exact existing Element placement remain
unapproved.

## Source scan

The three SVG masters were inspected as text at the listed digests. They contain
no `script`, `foreignObject`, raster `image`, event-handler attribute, CSS
`@import`, document type/entity, data URI, or non-fragment `href`. Their
`xlink:href` values point only to internal swatch or gradient IDs, and their
`url(...)` values point only to internal gradients. Inkscape namespace URLs and
the generator comment are metadata, not runtime fetches.

The masters retain Inkscape and Sodipodi metadata. Production derivation must
remove editor-only metadata, preserve the viewBox and aspect ratio, avoid
external resources, and verify rendering before and after optimization. The
originals in this directory remain byte-for-byte unchanged.

## Source palette

The following families are literal colors extracted from the SVG source. They
are inputs to semantic-token qualification, not a final one-to-one token map.

| Family | Source colors | Candidate visual use | Constraint |
|---|---|---|---|
| Core gold | `#F9BA51`, `#EFB855` | Primary brand accent, focus ring, selected emphasis | Use dark ink rather than white for text |
| Warm orange | `#E5793E`, `#E4763C`, `#E67541`, `#E9772F` | Supporting accent and illustration continuity | Do not replace Matrix error/warning semantics solely by hue |
| Dark ink | `#332216`, `#563522` | Warm text, outlines, high-contrast foregrounds | Preserve readable neutral hierarchy in both themes |
| Mint | `#58C781`, `#77A08E` | Secondary brand detail and quiet highlight | Do not redefine success state without an explicit semantic check |
| Teal | `#05A384`, `#4FA584`, `#128065`, `#006052`, `#005247` | Secondary accent and scenic surfaces | Lighter teals need dark foregrounds; deep teals can carry light text |
| Sun and scene | `#FDC85B`, `#FCC15B`, `#F9AF47`, `#F8AA45`, `#C25821` | Illustration colors | Not automatically promoted to UI tokens |
| Figure detail | `#F8D8AF`, `#EAAA77` and other character colors | Artwork only | Keep out of semantic UI/status roles unless separately approved |

The earlier donor assessment also identified dark-theme surface candidates
`#1A1410`, `#2C2018`, and `#3A2D20`; those are donor-derived directional
values, not colors extracted from these supplied SVGs.

## Contrast spot checks

Ratios below use the WCAG relative-luminance formula and the literal source
colors. They are early guardrails only; O-000006 judges the final computed
tokens and rendered states.

| Foreground on background | Ratio | Qualification implication |
|---|---:|---|
| `#332216` on `#F9BA51` | 8.81:1 | Strong core brand text/action pairing |
| `#FFFFFF` on `#F9BA51` | 1.73:1 | Reject for text |
| `#332216` on `#E4763C` | 5.04:1 | Candidate normal-text pairing |
| `#FFFFFF` on `#E4763C` | 3.02:1 | Reject for normal text |
| `#332216` on `#58C781` | 7.17:1 | Strong dark-on-mint pairing |
| `#FFFFFF` on `#128065` | 4.88:1 | Candidate normal-text pairing; verify computed state |
| `#FFFFFF` on `#006052` | 7.51:1 | Strong light-on-deep-teal pairing |
| `#332216` on `#F8D8AF` | 11.17:1 | Strong dark-on-warm-light pairing |

## First-slice disposition

[D-000009](situation/decisions/D-000009-configuration-backed-poda-theme.md)
selects paired optional Poda Light and Poda Dark themes, makes Poda Light the
fork default, assigns the mark and landscape only to existing Element branding
slots, selects the supplied small and large raster renderings for dense and
social metadata use, and leaves the lantern illustration out of runtime.

Rendered desktop/narrow crop acceptance, exhaustive computed-state contrast,
and any public redistribution, attribution, or licensing requirement remain
open. Those boundaries prevent assurance of P-000007; they do not change the
admitted internal implementation scope.

## Derivative rules

- Never edit these retained files in place; create named runtime derivatives.
- Record each derivative's source path, source SHA-256, transformation, output
  dimensions/viewBox, output digest, and target Element configuration or asset
  slot.
- Keep logos and functional images accessible through the existing Element app
  name and control labels. Mark purely decorative scene art as decorative.
- Preserve aspect ratio, focal content, readable foreground contrast, reduced
  motion, responsive behavior, and the ability to reach every existing control.
- Do not place scene art inside timelines, rooms, profiles, or messages as new
  content, and do not add navigation or actions to justify the artwork.

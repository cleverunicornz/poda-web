# PCC native design transfer — extraction notes

Depth retained for [D-000022](../../decisions/D-000022-pcc-native-design-transfer.md).

## Donor coordinate

- `Private: cleverunicornz/yeet-code@1d70c5b377702835a87013b44e7758a0ed269151#applications/pcc/pcc-native/src`
  (private; requires repository access). The donor is the PCC native Tauri/Svelte
  app; design sources are `app.css` (tokens), `src/lib/button-variants.ts`,
  `src/lib/badge-variants.ts`, `src/lib/components/ui/*` (card/input/switch/progress
  primitives), `src/lib/components/PodcastCreateWizard.svelte`,
  `src/lib/components/EpisodeCreateWizard.svelte`,
  `src/lib/components/ProfileStats.svelte`, `src/lib/components/ProfileTopicChips.svelte`,
  `src/lib/components/ExpertiseCardEditor.svelte`,
  `src/routes/(app)/podcasts/+page.svelte`, `src/routes/(app)/episodes/+page.svelte`,
  and `src/routes/(app)/profile/+page.svelte`.
- Rendered evidence was captured from the running local donor instance
  (`PCC Local`, vite dev port 4322): profile hero, Listen home, Podcasts list,
  podcast wizard (six captures), episode wizard, Episodes table.

## Token transfer rules

- Donor colors are HSL triples consumed as `hsl(var(--token))`; the `#hex`
  comments in the donor `app.css` are stale and disagree with the triples.
  The module ports the triples verbatim into `--pn-*` custom properties under
  `.podaNative`, with dark values selected by `body[class*="cpd-theme-dark"]`
  (the Element theme class), matching the donor `.dark` block.
- Spacing/type/radius scale: 4px spacing unit; text 12/14/16/18/20/24/30px;
  radius scale 4/6/8/12/16/24px with cards at 12px and controls at 6px.
- Borders are the orange-tinted `--pn-border` (50% alpha accent in light, 20%
  gold in dark), never `currentColor`.
- Buttons: solid `--pn-primary` with dark-brown text; gradient
  amber-500→orange-500 reserved for the list-page "+ New" CTAs (donor
  inconsistency kept deliberately).
- Tailwind palette accents (emerald/sky/blue/amber/red/violet OKLCH values)
  are used verbatim for status pills, info callouts, and the Polish/visibility
  tones.

## Surface anatomy transferred

- Podcasts list: page header (30px title + muted subtitle + gradient CTA),
  row cards with 48px gradient mic tile, 18px semibold clamped title, slug,
  clamped description, chips (`bg-primary/10` medium chip + muted chips),
  calendar meta, ArrowRight hover shift.
- Episodes list: status filter pills (primary fill when active), bordered
  desktop table (muted/0.5 header, hover rows, Episode/Status/Duration/Date),
  card rows below 768px; Published emerald / Scheduled sky / Draft muted pills.
- Podcast wizard: gradient page band + blurred orbs, hero card (64px rounded-24
  gradient tile, Mic icon, guidance, three chips), "Draft pulse" panel, section
  cards (title + guidance + blue info note), char counters, dashed upload area,
  category checkbox grid capped at 3 with `Selected: n/3`, toggle switches,
  footer `Save Draft` outline + `Create Podcast` primary, sticky 360px
  "Podcast Pulse" rail (readiness bar, status chip, per-section cards with
  In place / Still needed).
- Episode wizard: same frame with a 340px rail, "Local draft state" banner with
  Cancel, publish-state radio cards, "Final action" rail card that mirrors the
  selected publish state, readiness items Title and number / Hosted audio /
  Guest credits / Notes or transcript.
- Profile: publish pill (emerald Published / amber Draft), dismissible warm
  welcome banner, hero (128→176px avatar tile with 4px background-colored
  border, name/headline/tagline, removable topic chips + Add Topic, social icon
  circles), Members Only/Public segmented control with tone colors, headshot
  tip, sections with 20px semibold headings, right rail (Your Stats icon rows,
  Share Profile with copy, At a Glance strength bar with threshold colors,
  checklist, and quick-number tiles).

## Deliberate exclusions in the module host

- Donor autosave claims ("Draft autosaves") are not carried: the module's
  boundary is session-only without autosave, so hero chips read
  "Session-only draft" (I-000009).
- "Poda Polish" AI CTA card is not carried: the module has no AI backend, and a
  dead affordance would violate production-truth boundaries even in a preview.
- Donor Podcasting 2.0 advanced repeaters (trailers, locations, podroll, value
  blocks) stay out of the creation forms; they remain visible in the detail
  view's inventory sections.
- Guest credits in the episode wizard stay display-only with an explicit note,
  per P-000018's residual.

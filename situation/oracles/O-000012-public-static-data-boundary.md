# Judge public static data boundary

## State

designed

## Judges

[P-000012](situation/promises/P-000012-public-static-data-boundary.md)

## Inputs

Fix the source/build/configuration identity, designated Astro route list, complete delivered dependency inventory per route, and an approval manifest mapping each delivered data item to explicit public-delivery authorization. Name the member entry destination and selected hosting arrangement without assuming same-origin or that Astro owns the member document.

Retain generated HTML, serialized/hydration data and linked assets for two runs with identical approved public inputs and controlled nondeterministic inputs. In the second run vary only declared member-state, credential and private-artifact canaries. Supply the input provenance and dependency inventory needed to account for delivered content, not merely a screenshot or a canary search. Retain browser navigation/runtime traces for following the public-to-member entry, identifying document/root creation, member session ownership and router handling.

For each designated public route, retain anonymous HTML/rendered-content observations with JavaScript disabled, then with member assets and private Matrix/auth/product services unavailable. Compare the displayed approved public content with the declared public fixture; member login is not a prerequisite to this leg.

An absent approval manifest, incomplete output/dependency inventory, missing runtime trace or unselected hosting arrangement prevents judgment, not PASS. All Pass legs are required; any observed Fail leg in complete in-Scope evidence fails. No static build or browser run is claimed by this design.

## Pass

- P1: Every delivered data item in the route/dependency inventory has explicit public approval, and no delivered item contains member credentials, authenticated member state or private artifact content.
- P2: The controlled private-input variation introduces no private canary or other varied private input into public output; all output differences are attributable to the declared approved public inputs or controlled nondeterminism.
- P3: The public-to-member transition is handled by the Element-derived member SPA's navigation/session lifecycle, with no competing member router or duplicate member runtime installed in the public document.
- P4: The designated approved public content is readable anonymously from the static output without member startup/session, including the JavaScript-disabled and unavailable-member/private-service cases.

## Fail

- F1: A delivered data item lacks public-delivery approval or contains member credentials, authenticated member state or private artifact content.
- F2: The controlled comparison reveals varied private input in delivered output or an output difference caused by that private input.
- F3: The transition installs a competing member router/duplicate member runtime or leaves member navigation/session lifecycle owned by the public page rather than the Element-derived SPA.
- F4: Required approved public content is absent or replaced by a member loading/login/error state, or reading it requires member startup/session in a declared public-content case.

## Implementation coverage

| Leg | Decision | Coverage |
|---|---|---|
| P1 | Complete delivered data inventory is approved public-only content | manual |
| P2 | Controlled private-input variation does not enter public output | manual |
| P3 | Member transition preserves sole Element-derived member ownership | manual |
| P4 | Approved public content remains anonymously readable independently of member runtime/services | manual |
| F1 | Delivered content is unapproved or contains protected member data | manual |
| F2 | Varied private input influences delivered output | manual |
| F3 | Public transition creates competing member ownership/runtime | manual |
| F4 | Public content depends on member runtime/session or disappears in a declared independence case | manual |

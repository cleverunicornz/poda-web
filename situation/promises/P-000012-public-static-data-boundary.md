# Public static data boundary

## State

hypothesis

## Promise

For the designated Astro public static pages and their delivered dependency set:

1. Delivered page content, serialized data and assets contain only data explicitly approved for public delivery; member credentials, authenticated member state and private artifact content are absent.
2. Rendering the same approved public input while unrelated authenticated/private input is varied does not introduce that input into the delivered public output.
3. A transition from a designated public page to the member application hands member navigation and lifecycle to the Element-derived SPA, rather than installing a competing member router or second member runtime in the public page.
4. The approved public content is readable anonymously without booting the member SPA or establishing a member session, including when member application assets and private services are unavailable.

## Scope

A predeclared set of public routes and every file they deliver, including generated HTML, linked assets and serialized/hydration data, with an explicit public-data approval manifest and member entry destination. The comparison varies supplied private canaries while public inputs remain fixed. This is a bounded frontend delivery claim, not an assurance about all possible backend disclosures. Astro need not host the member document; origin and URL-prefix choices are not selected here.

The public-content leg is exercised with JavaScript disabled and with member assets/private services unavailable; optional public interactivity is not treated as a prerequisite to reading the designated static content.

## Oracle

[O-000012](situation/oracles/O-000012-public-static-data-boundary.md)

## State evidence

[D-000015](situation/decisions/D-000015-public-and-member-rendering-ownership.md) selects public/static and member/runtime ownership within one coordinated frontend workspace and delivery boundary. [G-000004](situation/gaps/G-000004-product-ui-implementation-and-evidence.md) retains the missing product implementation and evidence. These are prospective rules, not evidence of an Astro integration or an authorization to expand current visual work.

## Residual

Exact public-page catalog, source approval mechanism, regeneration/publication policy, origin, cookie/storage boundaries and deployment layout remain unselected in [G-000005](situation/gaps/G-000005-unselected-product-ui-contracts.md). Server access controls and publication authorization remain service-owned. Earlier superseded/withdrawn product Promises remain inactive.

## References

- [I-000004](situation/invariants/I-000004-one-frontend-rendering-boundary.md)
- [I-000008](situation/invariants/I-000008-public-output-data-boundary.md)
- [UI extension guide](situation/references/I-000010/poda-ui-extension-guide.md)

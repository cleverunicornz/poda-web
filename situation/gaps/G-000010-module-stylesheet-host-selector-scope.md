# Module stylesheet host-selector scope remains ambiguous

## State

open

## Gap

The final Gate 1 stylesheet is rendered through a module-owned root but includes `body` and `#matrixchat` selectors that set layout on host-owned document elements. It is uncertain whether that stylesheet effect is permitted by the exported module-root contract for a production member-navigation implementation or requires a deliberately defined host styling/extension boundary.

## Relevance

[P-000015](situation/promises/P-000015-module-navigation-mount-gate.md) bounds P6/F6 to its named direct host-DOM-operation and Element-core-source review, while [C-000003](situation/candidates/C-000003-qualify-member-navigation.md) remains qualifying rather than selecting this mechanism for production. [I-000010](situation/invariants/I-000010-explicit-host-extension-boundaries.md) requires exported contracts or a deliberately defined host extension.

## Evidence

- `78a3bb9d89b4f7a9f1196ea0e0859c934153caf3:modules/poda-navigation-spike/src/index.tsx` creates and places the sibling root through `Api.rootNode` and renders the stylesheet through `Api.createRoot` inside that root.
- `78a3bb9d89b4f7a9f1196ea0e0859c934153caf3:modules/poda-navigation-spike/src/style.css` contains `body` flex-layout rules and `#matrixchat` flex-sizing rules, so the stylesheet affects host-owned layout elements even though its `<style>` node is owned by the module root.
- [W-000002](situation/witnesses/P-000015/W-000002-module-navigation-gate-pass.md) and its [structured observation](situation/references/P-000015/gate-1/browser-pass.json) record the P6/F6 review as direct DOM operations limited to creating, placing, and rendering the sibling root; they do not decide the broader CSS-selector ownership question.
- [G-000009](situation/gaps/G-000009-module-stylesheet-host-mutation.md) closes the distinct earlier `document.adoptedStyleSheets` mutation after the final head moved the `<style>` node into the module-owned root.

## Impact

This does not contradict P-000015's bounded manual P6/F6 observation or change its assured state: the Oracle names direct host-DOM manipulation, and the witness retains the exact observed source boundary. A future production navigation decision may need to distinguish supported module styling from an explicit host-layout extension rather than treating the current diagnostic stylesheet as proof of either interpretation.

## Resolution

none

## References

- [Navigation qualification Candidate](situation/candidates/C-000003-qualify-member-navigation.md)
- [Gate Promise](situation/promises/P-000015-module-navigation-mount-gate.md)
- [Gate Oracle](situation/oracles/O-000015-module-navigation-mount-gate.md)
- [Passing Gate 1 Witness](situation/witnesses/P-000015/W-000002-module-navigation-gate-pass.md)
- [Earlier stylesheet mutation Gap](situation/gaps/G-000009-module-stylesheet-host-mutation.md)
- [Explicit host extension boundary](situation/invariants/I-000010-explicit-host-extension-boundaries.md)

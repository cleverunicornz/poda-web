# Module-owned member navigation mount gate

## State

assured

## Promise

Within the finite local-preview conditions in Scope:

1. Poda Web can load an explicitly configured module that renders a Poda member header as a sibling immediately above the existing Element application root, while the header and application remain within the browser viewport.
2. The header's Chat and Diagnostic workspace controls use Element's existing hash-navigation lifecycle. The registered diagnostic location renders a module-owned workspace without requiring a Matrix room; Chat returns to native Element content without changing the signed-in Matrix user. Refresh and one back/forward traversal preserve their predeclared destinations and active navigation state.
3. The header and diagnostic workspace remain readable and operable in Poda Light and Poda Dark at 1440 × 900 and 500 × 900 without horizontal document overflow or obstructive overlap.
4. This probe is activated only through an isolated preview `config.modules` entry. It uses the exported Module API sibling root and location renderer, does not introduce a second router or Matrix client, and does not require an Element core-source change or modify a stable Poda configuration.

## Scope

The gate covers one diagnostic location, `io.poda.navigation-spike.diagnostic`, and the native `#/home` destination in a locally served web build at the exact head named by a Witness. The run uses one temporary signed-in Matrix fixture user, Chromium, the module artifact and configuration digests named by that Witness, Poda Light and Poda Dark, and 1440 × 900 plus 500 × 900 viewports.

The declared history sequence is native home → diagnostic → refresh diagnostic → Chat/home → Back to diagnostic → Forward to home. Readability means the named header controls, diagnostic title, status content and retained native rail are visible and usable; it does not assert pixel identity with a product design.

## Oracle

[O-000015](situation/oracles/O-000015-module-navigation-mount-gate.md)

## State evidence

- The maintainer authorized this bounded local Gate 1 implementation and real-Chromium verification on 2026-09-15.
- [C-000003](situation/candidates/C-000003-qualify-member-navigation.md) identifies the exported sibling-mount approach as the preferred first qualification probe.
- Active [PLAN-000004](situation/plans/active/PLAN-000004-qualify-member-navigation.md) groups this implementation with the still-qualifying navigation Candidate.
- Commit `78a3bb9d89b4f7a9f1196ea0e0859c934153caf3` implements the final exported-boundary module artifact.
- [W-000001](situation/witnesses/P-000015/W-000001-playwright-chromium-unavailable.md) retains the blocked checked-in Playwright run without treating instrument absence as product failure.
- [W-000002](situation/witnesses/P-000015/W-000002-module-navigation-gate-pass.md) applies every O-000015 leg to the exact final head and records PASS.

## Residual

This gate does not qualify or select production Chat/Studio/Profile/Settings navigation, nested product routes, seamless native-screen transitions, native Settings behavior, signed-out transitions, room-return semantics, call/PiP behavior, product data, persistence, assistants, widgets, deployment, browsers other than the named Chromium run, other viewport sizes, or accessibility beyond the named focus and labelled-control observations. [G-000008](situation/gaps/G-000008-module-native-screen-transition.md) retains the observed absence of an exported generic native-screen transition and the bounded probe's reload requirement. This gate does not assure [P-000008](situation/promises/P-000008-member-workspace-preview.md), complete [PLAN-000004](situation/plans/active/PLAN-000004-qualify-member-navigation.md), or promote C-000003.

## References

- [Navigation qualification Candidate](situation/candidates/C-000003-qualify-member-navigation.md)
- [Navigation qualification dossier](situation/references/C-000003/member-navigation-qualification.md)
- [Explicit extension boundary](situation/invariants/I-000010-explicit-host-extension-boundaries.md)
- [Shared member workspaces](situation/invariants/I-000012-shared-member-workspaces.md)
- [Native-screen transition gap](situation/gaps/G-000008-module-native-screen-transition.md)
- [Gate 1 structured browser observation](situation/references/P-000015/gate-1/browser-pass.json)
- [Passing Gate 1 Witness](situation/witnesses/P-000015/W-000002-module-navigation-gate-pass.md)

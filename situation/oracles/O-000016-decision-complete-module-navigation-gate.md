# Oracle for the decision-complete module navigation gate

## State

designed

## Judges

[P-000016](situation/promises/P-000016-decision-complete-module-navigation-gate.md)

## Inputs

Before observation, retain:

- The exact Git head; web and module build commands; module, served application, and generated configuration SHA-256 values; Chromium version; fixture homeserver implementation; temporary user and room identities; and observation timestamp.
- The generated preview configuration whose only added runtime module entry names the exact built `@poda/web-module-navigation-spike` artifact, plus a direct removal/restoration observation.
- At 1440 × 900 in Poda Light, start in the fixture room and run native room → Diagnostic workspace → refresh Diagnostic workspace → Chat/home → Back → Forward. At every stage record the URL/destination and both header controls' `aria-current` values; at Diagnostic stages record labelled-main focus and the retained SpacePanel; at native stages record native content and the same non-empty Matrix user identity. Retain the scoped source/target reload markers and the final document's Navigation Timing type after Back and Forward so a back-forward-cache restoration is visible rather than hidden.
- For each Poda Light/Poda Dark × 1440 × 900/500 × 900 case, start at native Home and directly activate Diagnostic workspace, Chat, and Diagnostic workspace again. Record each resulting destination, both active-control values, same-user result, labelled-main focus, and the absence/presence of diagnostic/native content. On the final Diagnostic state record body/header/application/workspace rectangles, viewport and document width, computed header colors, visible title/four status values/rail, and a screenshot after dismissing only host-native first-run alerts through their own controls.
- A bounded exact-diff review covering module imports/package dependencies, host DOM operations, changed non-record source paths, Element core source paths, and stable application/develop/sample configuration paths.
- Browser page errors, console errors, failed requests, failed responses, and module response statuses across the declared navigation and matrix interactions. Report unrelated optional native/fixture traffic rather than discarding it.

## Pass

A complete PASS requires all legs:

- **P1 — Runtime provenance and mount.** The exact configured module artifact is requested successfully; its visible host is immediately before `#matrixchat`; and the header plus application fit the body at both widths.
- **P2 — Diagnostic location.** Each Diagnostic activation reaches `#/io.poda.navigation-spike.diagnostic`, renders and focuses the labelled diagnostic main without the native left panel, retains the native SpacePanel, and marks only Diagnostic workspace current.
- **P3 — Native Chat and session.** Each Chat activation reaches native `#/home`, removes diagnostic content, marks only Chat current, and retains the same non-empty Matrix user identity.
- **P4 — Refresh and history.** Refresh restores Diagnostic and its current state. Back after Chat reaches Diagnostic and marks only Diagnostic workspace current; Forward reaches native Home and marks only Chat current.
- **P5 — Presentation and operability matrix.** Both header controls complete the declared interaction cycle and the diagnostic workspace receives focus in every theme/viewport case. In every final Diagnostic state the controls, title, four status values, and native rail are visible; body/header/application rectangles stay within and exactly fill the viewport vertically without overlap; document width does not exceed viewport width; and light/dark computed header backgrounds differ.
- **P6 — Host boundary.** The exact source imports only exported Module API/React/build contracts, uses `rootNode`, `createRoot`, and `registerLocationRenderer`, and has no second router/client, private Element/store import, host query, direct host mutation beyond creating/placing/rendering the owned sibling root, or Element core-source change. Browser location/history and `pageshow` handling are confined to the marked reload transition. The broader stylesheet-selector ownership concern remains explicitly outside this diagnostic gate in G-000010.
- **P7 — Isolation.** No stable application/develop/sample configuration activates the module. Removing the generated entry causes no module request, header, module host, or diagnostic content and sends direct diagnostic entry to native Home; restoring the entry restores the gate.
- **P8 — Runtime health.** The module has no HTTP failure and no module load, render, React, or navigation error occurs. Every unrelated native/fixture warning or failed request/response is enumerated with its scope.

## Fail

A valid observation fails on any corresponding in-Scope contradiction:

- **F1** — The module request fails, the visible host is absent or not immediately above `#matrixchat`, or combined layout clips/exceeds the body at either width.
- **F2** — A Diagnostic activation reaches another location, requires a room, loses the native rail, does not focus/render its labelled main, or marks either control incorrectly.
- **F3** — A Chat activation fails to restore native Home, leaves diagnostic content, marks either control incorrectly, or changes/loses the Matrix identity.
- **F4** — Refresh, Back, or Forward reaches a different destination or active-control state from the declared sequence.
- **F5** — Any theme/viewport case has a failed control activation or focus result, obscured required content, chrome overlap, vertical clipping, horizontal overflow, or absent visible/computed theme response.
- **F6** — Source review finds a second router/client, private Element/store dependency, unsupported direct host DOM operation, unscoped back-forward-cache lifecycle handling, or required Element core change.
- **F7** — Stable configuration activates the module or generated-entry removal does not disable the gate as declared.
- **F8** — The module request or runtime emits a module load, render, React, or navigation failure.

Missing credentials, unavailable Chromium, fixture failure, or artifact/configuration provenance that cannot be established makes the run BLOCKED or INVALID rather than PASS.

## Implementation coverage

The checked-in Playwright project remains uncredited because its pinned Chromium executable is unavailable. Every leg is manual and requires direct retained evidence from one complete browser observation.

| Leg | Decision | Coverage |
| --- | --- | --- |
| P1 / F1 | Artifact request, sibling mount and viewport geometry | manual |
| P2 / F2 | Every Diagnostic destination, focus, rail and active state | manual |
| P3 / F3 | Every Chat destination, user identity and active state | manual |
| P4 / F4 | Refresh/history destinations and both active controls | manual |
| P5 / F5 | Per-case interaction, focus, visibility, geometry and theme response | manual |
| P6 / F6 | Exported-boundary dependency/source review | manual |
| P7 / F7 | Generated-only activation and removal/restoration | manual |
| P8 / F8 | Browser module/network/console health | manual |

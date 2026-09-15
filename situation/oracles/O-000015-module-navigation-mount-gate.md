# Oracle for the module-owned member navigation mount gate

## State

designed

## Judges

[P-000015](situation/promises/P-000015-module-navigation-mount-gate.md)

## Inputs

Before observation, retain:

- The exact Git head, Poda Web build command, module build command, module artifact SHA-256, served application/configuration SHA-256, Chromium version, fixture homeserver type, temporary user identity and observation date.
- An isolated preview configuration whose only new runtime module entry is the exact built `@poda/web-module-navigation-spike` artifact. Identify how the preview was enabled and how it is disabled.
- A signed-in native home at 1440 × 900 in Poda Light. Run: observe the loaded module request and sibling order; activate Diagnostic workspace; verify its registered location, focus and retained native SpacePanel; refresh; activate Chat; compare the Matrix user identity; traverse Back once and Forward once. Record each destination and active control.
- Direct visual, computed-layout, and interaction observations of the diagnostic location in Poda Light and Poda Dark at 1440 × 900 and 500 × 900. Record viewport, body/header/application rectangles, horizontal document overflow, visible named controls/content, theme-dependent computed header background, and direct interactions showing the named header controls and diagnostic workspace are operable in each matrix case.
- A bounded source/configuration review of the exact diff: module imports and package dependencies, changed non-record source paths, and stable Poda configuration paths.
- Browser console errors and failed network requests from the observed preview. Unrelated native fixture traffic is reported rather than silently discarded; a module load, render or navigation failure is in-Scope.

## Pass

A complete PASS requires all legs:

- **P1 — Runtime provenance and mount.** The named module artifact is requested successfully from the isolated `config.modules` entry; the Poda header is visible, its host is immediately before `#matrixchat`, and the header plus application fit the body height at both declared widths.
- **P2 — Diagnostic location.** Activating Diagnostic workspace reaches `#/io.poda.navigation-spike.diagnostic`, visibly renders the named diagnostic content without a selected room, focuses its labelled main region, retains the native SpacePanel and marks only Diagnostic workspace current.
- **P3 — Native Chat and session.** Activating Chat reaches native `#/home`, removes the diagnostic view, marks Chat current and retains the same non-empty Matrix user identity.
- **P4 — Refresh and history.** Refresh at the diagnostic URL restores the diagnostic view/current state. Back after returning to Chat reaches diagnostic and marks Diagnostic workspace current; Forward returns to native home and marks Chat current.
- **P5 — Presentation matrix.** At 1440 × 900 and 500 × 900 in both named Poda themes, the header controls and diagnostic workspace are visible and operable; the diagnostic title, all four diagnostic status values and retained native rail are visible; body/header/application rectangles do not overlap or exceed the viewport; document width does not exceed the viewport; light and dark computed header backgrounds differ.
- **P6 — Host boundary.** The implementation imports only exported Module API/React build contracts, uses `rootNode`, `createRoot` and `registerLocationRenderer`, and contains no second router, Matrix client, direct private Element import, private store access or host DOM query/mutation beyond creating and placing its sibling root.
- **P7 — Isolation.** No stable application/develop/sample configuration contains the spike module and no Element core source is changed. Removing the generated preview-only module entry disables the header and diagnostic location.
- **P8 — Runtime health.** The observed module request has no HTTP failure and the console contains no module load, render, React or navigation error. Any unrelated fixture/native warning is enumerated with its scope.

## Fail

A valid observation fails on any corresponding in-Scope contradiction:

- **F1** — The module request fails, the header is absent/not immediately above `#matrixchat`, or the combined layout clips or extends beyond the body at a declared width.
- **F2** — Diagnostic activation reaches another location, requires a room, loses the native rail, fails to focus/render the labelled workspace, or marks the wrong header state.
- **F3** — Chat does not restore native home, leaves diagnostic content active, marks the wrong state, or changes/loses the signed-in Matrix identity.
- **F4** — Refresh, Back or Forward reaches a destination or active state different from the declared sequence.
- **F5** — A named theme/viewport case obscures required content, leaves a named header control or diagnostic workspace inoperable, overlaps chrome, horizontally overflows, or does not visibly/computably respond to the Poda theme.
- **F6** — Source review finds a second router/client, private Element/store dependency, unsupported host DOM manipulation or a required Element core change.
- **F7** — A stable configuration activates the spike or generated-preview removal does not disable it.
- **F8** — The module request or runtime emits a module load, render, React or navigation failure.

Missing credentials, unavailable Chromium, failed fixture startup, or an artifact/configuration whose provenance cannot be established makes the affected run BLOCKED or INVALID rather than PASS.

## Implementation coverage

The checked-in browser tests are not credited because [W-000001](situation/witnesses/P-000015/W-000001-playwright-chromium-unavailable.md) shows that their pinned Chromium could not launch. [W-000002](situation/witnesses/P-000015/W-000002-module-navigation-gate-incomplete.md) retains direct browser and source observations but does not decide P4/F4's Back/Forward active-control requirement or P5/F5's per-matrix operability requirement; it is `INVALID` rather than a complete PASS. The Oracle remains `designed` because no executable leg has run.

| Leg     | Decision                                              | Coverage |
| ------- | ----------------------------------------------------- | -------- |
| P1 / F1 | Artifact request, sibling mount and viewport geometry | manual   |
| P2 / F2 | Diagnostic route, focus, rail and active state        | manual   |
| P3 / F3 | Native home return and user identity                  | manual   |
| P4 / F4 | Refresh/history destinations and active states         | manual   |
| P5 / F5 | Theme/viewport presentation and control operability   | manual   |
| P6 / F6 | Exported-boundary dependency/source review            | manual   |
| P7 / F7 | Preview-only activation and stable-config review      | manual   |
| P8 / F8 | Browser network and console health                    | manual   |

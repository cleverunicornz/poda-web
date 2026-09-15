# Decision-complete module navigation Gate 1 passes in Chromium

## Promise

[P-000016](situation/promises/P-000016-decision-complete-module-navigation-gate.md)

## Oracle

[O-000016](situation/oracles/O-000016-decision-complete-module-navigation-gate.md)

## Result

PASS

## Head

`53c290b3c62f01ae95ca74893ce3c944a1b472b7`

## Observed

2026-09-15

## Evidence

- [Structured browser observation](situation/references/P-000016/gate-1-complete/browser-pass.json)
- [Poda Light at 1440 × 900](situation/references/P-000016/gate-1-complete/poda-light-1440x900.png)
- [Poda Dark at 1440 × 900](situation/references/P-000016/gate-1-complete/poda-dark-1440x900.png)
- [Poda Light at 500 × 900](situation/references/P-000016/gate-1-complete/poda-light-500x900.png)
- [Poda Dark at 500 × 900](situation/references/P-000016/gate-1-complete/poda-dark-500x900.png)

Chrome/150.0.7871.24 exercised O-000016 against the exact Git head, module artifact, served application and generated configuration digests retained in the structured observation. The temporary Synapse fixture user and room are named there; no credential is retained. The declared history sequence records both active controls after Back and Forward, and every Poda theme/viewport case directly exercises Chat, Diagnostic workspace and workspace focus. All eight Oracle legs pass.

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 / F1 | Fourteen module responses returned 304 without failure. Every checked state placed the visible module host immediately before `#matrixchat`; in all four matrix cases the 56 px header plus 844 px application exactly filled the 900 px body at both widths. |
| P2 / F2 | The core sequence and every matrix Diagnostic activation reached the exact registered hash, rendered and focused the labelled main without the native left panel, retained `.mx_SpacePanel`, and marked only Diagnostic workspace current. |
| P3 / F3 | The core sequence and every matrix Chat activation reached native `#/home`, removed diagnostic content, marked only Chat current, and retained `@poda_navigation_gate:localhost`. |
| P4 / F4 | Refresh restored Diagnostic and its current state. Back reached the marked Diagnostic entry and marked only Diagnostic workspace current. Forward restored the marked native Home entry, reinitialized its back-forward-cached document, marked only Chat current, and showed no session-lock-stolen view. |
| P5 / F5 | In Poda Light and Poda Dark at 1440 × 900 and 500 × 900, direct Home → Diagnostic → Chat → Diagnostic interaction and workspace focus passed. Required content and the native rail remained visible, body/header/application geometry fit exactly, document width equalled viewport width, computed light/dark colors differed, and visual review of all four screenshots found no clipping or overlap. |
| P6 / F6 | Exact-diff, dependency and operation review found only exported Module API/React contracts, the owned sibling root, and marker-scoped browser history/lifecycle handling. It found no Element core change, stable configuration change, host query, private Element/store import, second router or second Matrix client. |
| P7 / F7 | No stable application configuration activated the module. Removing the generated `config.modules` entry produced no module request, header, host or diagnostic content and sent direct diagnostic entry to native Home for the same user; restoring it restored and focused the gate. |
| P8 / F8 | The module responses had no failure and the browser emitted no page, module load, render, React or navigation error. The structured observation enumerates all unrelated optional-config, fixture endpoint, well-known and host unload-policy traffic. |

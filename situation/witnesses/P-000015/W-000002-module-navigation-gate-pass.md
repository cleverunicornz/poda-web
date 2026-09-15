# Module navigation Gate 1 passes in Chromium

## Promise

[P-000015](situation/promises/P-000015-module-navigation-mount-gate.md)

## Oracle

[O-000015](situation/oracles/O-000015-module-navigation-mount-gate.md)

## Result

PASS

## Head

`78a3bb9d89b4f7a9f1196ea0e0859c934153caf3`

## Observed

2026-09-15

## Evidence

- [Structured browser observation](situation/references/P-000015/gate-1/browser-pass.json)
- [Poda Light at 1440 × 900](situation/references/P-000015/gate-1/poda-light-1440x900.png)
- [Poda Dark at 1440 × 900](situation/references/P-000015/gate-1/poda-dark-1440x900.png)
- [Poda Light at 500 × 900](situation/references/P-000015/gate-1/poda-light-500x900.png)
- [Poda Dark at 500 × 900](situation/references/P-000015/gate-1/poda-dark-500x900.png)

Chrome/150.0.7871.24 exercised the predeclared sequence against the exact module, served application and generated configuration digests retained in the structured observation. The temporary Synapse fixture user and room are named there; no credential is retained.

## Oracle legs

| Leg | Observation |
| --- | --- |
| P1 / F1 | The configured module returned 200 then 304 on reloads, its visible host was immediately before `#matrixchat`, and the 56 px header plus 844 px application equalled the 900 px body at both widths. |
| P2 / F2 | Diagnostic activation reached the exact registered hash, rendered and focused the labelled workspace without the native left panel, retained `.mx_SpacePanel`, and marked only Diagnostic workspace current. |
| P3 / F3 | Chat forced native initialization at `#/home`, removed the diagnostic view, marked Chat current, and retained `@poda_navigation_gate:localhost`. |
| P4 / F4 | Refresh restored Diagnostic and its current state; one Back returned to Diagnostic and one Forward returned to native Home. |
| P5 / F5 | Direct inspection and the four retained screenshots show both Poda themes at 1440 × 900 and 500 × 900 with all named content and the rail visible, no horizontal overflow, exact body/header/application fit, and distinct light/dark computed colors. |
| P6 / F6 | Exact-diff review found only the owned module runtime plus workspace metadata, no Element core source, second router/client, private Element/store import, host query, or direct host mutation beyond creating/placing/rendering the owned sibling root. |
| P7 / F7 | No stable application configuration changed. Removing the generated `config.modules` entry produced no module request, header, host or diagnostic content and redirected direct diagnostic entry to native Home; restoring it restored the gate. |
| P8 / F8 | The module response had no failure and the browser emitted no page, module load, render, React or navigation error. The structured observation enumerates unrelated optional-config, fixture endpoint, well-known and host permissions warnings. |

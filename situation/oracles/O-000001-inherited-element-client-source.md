# Inherited Element client source oracle

## State

designed

## Judges

[P-000001](situation/promises/P-000001-inherited-element-client-source.md)

## Inputs

- `b53af60d7e2ae8c9021e94dd628d478dbc65c37e:README.md`
- `b53af60d7e2ae8c9021e94dd628d478dbc65c37e:apps/web/README.md`
- The `apps/desktop/` tree at `b53af60d7e2ae8c9021e94dd628d478dbc65c37e`

## Pass

- P1: The root README identifies Element as a Matrix web and desktop client.
- P2: The web-app README identifies `apps/web/` and documents static web output from its build.
- P3: The root README identifies the desktop app as Electron-wrapped and the named `apps/desktop/` tree is present.

## Fail

- F1: The root README does not identify Element as a Matrix web and desktop client.
- F2: The web-app README does not identify `apps/web/` or does not document its static web output.
- F3: The root README does not identify an Electron-wrapped desktop app or the named `apps/desktop/` tree is absent.

## Implementation coverage

| Leg | Decision | Coverage |
|---|---|---|
| P1 | Compare the root README's identity statement with P1. | manual |
| P2 | Compare the web-app README's build-output statement with P2. | manual |
| P3 | Compare the root README's desktop statement and inspect the named tree. | manual |
| F1 | Detect the absence or contradiction of P1 in the root README. | manual |
| F2 | Detect the absence or contradiction of P2 in the web-app README. | manual |
| F3 | Detect the absence or contradiction of P3 in the root README or named tree. | manual |

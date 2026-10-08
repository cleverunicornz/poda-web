# Appearance settings snapshot test fails on trunk

## State

open

## Gap

`apps/web/src/components/views/settings/tabs/user/AppearanceUserSettingsTab.test.tsx`
"should render" fails: the rendered snapshot has an extra `disabled=""` on a
checked checkbox. Whether the snapshot or the component is stale is unknown.

## Relevance

Web test health; surfaced by the D-000029 work, which does not change that tab.

## Evidence

2026-10-08 on the workbench: the test failed on `internal/plus-and-polish`
(`8bcc9dc76a`) and identically on `internal/main` `cb99f7b34a`.

## Impact

A full web test run reports a failure unrelated to the change under test.

## Resolution

none

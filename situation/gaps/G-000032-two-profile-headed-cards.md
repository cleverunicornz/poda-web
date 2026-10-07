# User info and profile cards share the title "Profile"

## State

open

## Gap

Element's user info card and the new module profile card are both headed
"Profile", so moving between them changes the content but not the title. Which
wording should distinguish them is unselected.

## Relevance

[P-000021](situation/promises/P-000021-poda-profile-side-panel.md) View profile
and back navigation.

## Evidence

[W-000006](situation/witnesses/P-000021/W-000006-profile-side-panel-local-pass.md)
screenshots `user-info-view-profile.png` and `member-profile-card.png` both show
the heading "Profile" (`common|profile` in
`apps/web/src/components/views/right_panel/UserProfileCard.tsx`).

## Impact

Users may not notice that View profile opened a different card.

## Resolution

none

/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Poda's own profile widget loads without Element's "Widget added by …" prompt
// (G-000030), but only the copy the app itself serves: same origin as the app
// and the module's widget path. Any other URL, even with the same widget type,
// still asks the viewer first.

export const PROFILE_WIDGET_TYPE = "io.poda.profile";

const PROFILE_WIDGET_PATHS = ["/widgets/poda-profile/", "/widgets/poda-profile/index.html"];

export function isOwnProfileWidget(widget, appOrigin) {
    if (widget?.type !== PROFILE_WIDGET_TYPE || typeof widget.templateUrl !== "string") return false;
    try {
        const url = new URL(widget.templateUrl);
        return url.origin === appOrigin && PROFILE_WIDGET_PATHS.includes(url.pathname);
    } catch {
        return false;
    }
}

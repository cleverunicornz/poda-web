/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Widget host entry: shows the room's featured creator profile (sample data in
// this preview) to every viewer, read-only. Demonstrates the widget-api
// handshake and identity template params; the bridge degrades gracefully when
// the page runs outside a host.
import { WidgetApi, WidgetApiToWidgetAction } from "matrix-widget-api";
import { renderFullProfileView } from "../src/shared/profileFullView.js";
import { PROFILE_FIXTURE_MIRA } from "../src/shared/profileFixtures.js";

const params = new URLSearchParams(window.location.search);
const userId = params.get("matrix_user_id") ?? "unknown";
const viewerName = params.get("matrix_display_name") ?? userId;

function applyWidgetTheme(theme) {
    const isDark = /(^|[-\s])dark(?:$|[-\s])/.test(String(theme ?? "").toLowerCase());
    document.body.classList.toggle("cpd-theme-dark", isDark);
}

applyWidgetTheme(params.get("theme"));

// The widget shows the shared domain view (full donor inventory); the
// viewer's identity arrives via host-substituted URL template params.
// Read-only for every viewer: no publish status, visibility switch or test controls.
renderFullProfileView(document.getElementById("root"), {
    profile: PROFILE_FIXTURE_MIRA,
    hostLabel: `widget (iframe) — viewer ${viewerName}`,
    showStatus: false,
    showVisibility: false,
});

// Element appends the widget's ID and the client's URL to the widget URL; telling the API both lets it address
// the client. The widget registers with Element's default waitForIframeLoad, so the iframe load event marks it
// loaded and it sends no content-loaded message (G-000031).
function clientOrigin(parentUrl) {
    try {
        return parentUrl ? new URL(parentUrl).origin : undefined;
    } catch {
        return undefined;
    }
}

let widgetApi = null;
try {
    widgetApi = new WidgetApi(params.get("widgetId") ?? undefined, clientOrigin(params.get("parentUrl")));
    widgetApi.on(`action:${WidgetApiToWidgetAction.ThemeChange}`, (event) => {
        applyWidgetTheme(event.detail.data?.name);
        event.preventDefault();
        void widgetApi.transport.reply(event.detail, {});
    });
    widgetApi.start();
} catch (error) {
    console.warn("Poda profile widget: no host bridge available", error);
}

window.__PODA_PROFILE_FIXTURE = PROFILE_FIXTURE_MIRA;

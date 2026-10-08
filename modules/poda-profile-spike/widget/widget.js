/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Widget host entry: previews the featured creator's full profile to the room.
// Demonstrates: widget-api handshake, identity template params, and host
// navigation via the MSC2931 navigate action (permalink-only). The bridge
// degrades gracefully when the page runs outside a host.
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

const navBtnHtml = `<button id="podaProfileNavHost" type="button" style="margin-top:18px;padding:8px 14px;border:1px solid #c9a58a;border-radius:10px;background:#fff;color:#563522;font-size:13px;cursor:pointer;">Ask host to open General room</button>`;

// The widget shows the shared domain view (full donor inventory); the
// viewer's identity arrives via host-substituted URL template params.
renderFullProfileView(document.getElementById("root"), {
    profile: PROFILE_FIXTURE_MIRA,
    hostLabel: `widget (iframe) — viewer ${viewerName}`,
    extraActionsHtml: navBtnHtml,
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

document.getElementById("podaProfileNavHost")?.addEventListener("click", () => {
    // The only host-navigation channel a widget gets: ask the client to
    // navigate to a Matrix permalink. No access to app routes like #/studio.
    void widgetApi?.navigateTo("https://matrix.to/#/#general:localhost");
});

window.__PODA_PROFILE_FIXTURE = PROFILE_FIXTURE_MIRA;

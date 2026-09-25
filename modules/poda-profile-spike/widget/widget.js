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

let widgetApi = null;
try {
    widgetApi = new WidgetApi();
    widgetApi.on(`action:${WidgetApiToWidgetAction.ThemeChange}`, (event) => {
        applyWidgetTheme(event.detail.data?.name);
        event.preventDefault();
        void widgetApi.transport.reply(event.detail, {});
    });
    widgetApi.start();
    widgetApi.sendContentLoaded();
} catch (error) {
    console.warn("Poda profile widget: no host bridge available", error);
}

document.getElementById("podaProfileNavHost")?.addEventListener("click", () => {
    // The only host-navigation channel a widget gets: ask the client to
    // navigate to a Matrix permalink. No access to app routes like #/studio.
    widgetApi?.navigateTo("https://matrix.to/#/#general:localhost");
});

window.__PODA_PROFILE_FIXTURE = PROFILE_FIXTURE_MIRA;

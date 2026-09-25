/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Shared Poda profile card — framework-free so the same artifact runs inside
// the Element module host (React wrapper) and the room widget host (iframe),
// wearing the PCC native card design. Mock fixture data only.
import { NATIVE_STYLES, esc, initials } from "./nativeTheme.js";

export const MOCK_PROFILE = {
    displayName: "Mira Chen",
    headline: "Founder ops strategist and launch systems advisor",
    tagline: "Turns messy launches into calm repeatable systems.",
    topics: ["Founder operations", "Launch systems", "AI workflows"],
    socialLinks: { website: "https://example.com/mira", calendly: "https://calendly.com/mira/intro" },
    appearanceCount: 12,
    bestFitFor: ["Technical founders", "Launch retrospectives"],
};

const CARD_STYLES = `
.podaProfileCardWrap { max-width: 560px; margin: 24px auto; }
.podaProfileCard_tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
`;

function detailBody(profile, view) {
    const topics = profile.topics.map((t) => `<span class="pnTopicChip">${esc(t)}</span>`).join("");
    const links = Object.entries(profile.socialLinks)
        .filter(([, v]) => v)
        .map(([k, v]) => `<div class="pnDefRow"><b>${esc(k)}</b><span>${esc(v)}</span></div>`)
        .join("");
    if (view === "details") {
        return `<p style="margin:0;font-size:16px;line-height:24px">${esc(profile.tagline)}</p>
            <div class="pnTopicRow">${topics}</div>${links}
            <p class="pnHelper">Appearances: ${profile.appearanceCount} · Best fit: ${profile.bestFitFor.map(esc).join(", ")}</p>`;
    }
    return `<p style="margin:0;font-size:16px;line-height:24px">${esc(profile.tagline)}</p>
        <p class="pnSubtle" style="margin:4px 0 0;font-size:14px">${esc(profile.headline)}</p>`;
}

// Renders the shared profile card with two internal views. onViewChange lets
// the host persist the internal view (hash query in module, iframe hash in
// the widget). hostLabel identifies which host rendered the artifact.
export function renderProfileView(
    container,
    { hostLabel, profile, initialView = "summary", onViewChange, extraActionsHtml = "" },
) {
    const data = profile ?? MOCK_PROFILE;
    container.innerHTML = `
        <style>${NATIVE_STYLES}${CARD_STYLES}</style>
        <div class="podaNative podaProfileCardWrap">
        <section class="pnCard" data-host="${esc(hostLabel)}">
            <div class="pnCard_body" style="padding-top:24px">
                <div style="display:flex;gap:18px;align-items:center">
                    <div class="pnAvatar" style="width:72px;height:72px;font-size:28px;border-width:2px" aria-hidden="true">${esc(initials(data.displayName))}</div>
                    <div style="min-width:0">
                        <h2 class="pnProfileName" style="font-size:24px;line-height:32px">${esc(data.displayName)}</h2>
                        <p class="pnProfileHeadline" style="font-size:14px;line-height:20px">${esc(data.headline)}</p>
                    </div>
                </div>
                <div class="podaProfileCard_tabs pnFilters" role="tablist">
                    <button data-view="summary" role="tab" type="button">Summary</button>
                    <button data-view="details" role="tab" type="button">Details</button>
                </div>
                <div class="podaProfileCard_view"></div>
                ${extraActionsHtml}
            </div>
        </section></div>`;
    const view = container.querySelector(".podaProfileCard_view");
    const tabs = container.querySelectorAll(".podaProfileCard_tabs button");
    const show = (name) => {
        view.innerHTML = detailBody(data, name);
        tabs.forEach((t) => t.setAttribute("aria-pressed", String(t.dataset.view === name)));
    };
    tabs.forEach((t) =>
        t.addEventListener("click", () => {
            show(t.dataset.view);
            onViewChange?.(t.dataset.view);
        }),
    );
    show(initialView);
}

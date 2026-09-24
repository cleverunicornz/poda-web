/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Studio podcasts collection view — PCC native list anatomy: page header with
// gradient "+ New Podcast" CTA, icon-tile row cards with chips and meta, and
// the hover-arrow affordance. Data flows through the mock adapter unchanged.
import { NATIVE_STYLES, esc, icon, statusPill } from "../shared/nativeTheme.js";

const LIST_STYLES = `
.podaStudioList { padding: 0 clamp(4px, 2vw, 16px) 24px; flex: 1 1 auto; min-height: 0; overflow-y: auto; }
`;

function cardMarkup(p) {
    const meta = [];
    if (p.author) meta.push(`<span>${icon("users")}${esc(p.author)}</span>`);
    if (p.updatedAt) meta.push(`<span>${icon("calendar")}${esc(String(p.updatedAt).slice(0, 10))}</span>`);
    return `
    <button class="pnRowCard" type="button" data-podcast="${esc(p.id)}">
        <span class="pnRowCard_main">
            <span class="pnTile" aria-hidden="true">${icon("mic")}</span>
            <span style="min-width:0">
                <h2 class="pnRowCard_title">${esc(p.title)}</h2>
                ${p.slug ? `<p class="pnRowCard_slug">/${esc(p.slug)}</p>` : ""}
                ${p.description ? `<p class="pnRowCard_desc">${esc(p.description)}</p>` : ""}
                <span class="pnRowCard_chips">
                    <span class="pnBadge pnBadge--chip">Audio show</span>
                    ${(p.categories ?? [])
                        .slice(0, 2)
                        .map((c) => `<span class="pnBadge pnBadge--muted">${esc(c)}</span>`)
                        .join("")}
                    ${statusPill(p.status)}
                </span>
                ${meta.length ? `<span class="pnRowCard_meta">${meta.join("")}</span>` : ""}
            </span>
        </span>
        <span class="pnArrow" aria-hidden="true">${icon("arrowRight")}</span>
    </button>`;
}

export function renderStudioListView(container, { podcasts, onOpen, onCreate }) {
    const cards = podcasts.map(cardMarkup).join("");

    container.innerHTML = `<style>${NATIVE_STYLES}${LIST_STYLES}</style><div class="podaNative podaStudioList"><div class="pnPage">
        <div class="pnPageBand" aria-hidden="true"></div>
        <div class="pnPageHeader">
            <div>
                <h1 class="pnTitle">Podcasts</h1>
                <p class="pnSubtitle">Manage and create your podcast episodes</p>
            </div>
            <button class="pnBtn pnBtn--cta" id="podaStudioNew" type="button">${icon("plus")} New Podcast</button>
        </div>
        <div class="pnCardGrid">
            ${cards || `<div class="pnEmpty">${icon("mic")}<h2>My Podcast</h2><p>Create your podcast to get started.</p><button class="pnBtn pnBtn--cta" id="podaStudioNewEmpty" type="button">${icon("plus")} New Podcast</button></div>`}
        </div>
    </div></div>`;

    container.querySelector("#podaStudioNew")?.addEventListener("click", () => onCreate?.());
    container.querySelector("#podaStudioNewEmpty")?.addEventListener("click", () => onCreate?.());
    container
        .querySelectorAll("[data-podcast]")
        .forEach((card) => card.addEventListener("click", () => onOpen?.(card.dataset.podcast)));
}

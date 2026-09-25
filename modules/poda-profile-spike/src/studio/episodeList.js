/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Episodes collection view — PCC native anatomy: status filter pills, a
// bordered desktop table (Episode/Status/Duration/Date), and card rows on
// narrow widths. Data flows through the mock adapter unchanged.
import { NATIVE_STYLES, esc, icon, statusPill } from "../shared/nativeTheme.js";

const EPLIST_STYLES = `
.podaEpisodeList_podcastFilter { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.podaEpisodeList_podcastFilter label { font-size: 14px; font-weight: 500; }
`;

const FILTERS = [
    [null, "All"],
    ["published", "Published"],
    ["draft", "Draft"],
    ["scheduled", "Scheduled"],
];

function fmtDuration(seconds) {
    if (seconds == null) return "-";
    const h = Math.floor(seconds / 3600),
        m = Math.round((seconds % 3600) / 60);
    return h ? `${h}h ${m}m` : `${m} min`;
}

function fmtDate(d) {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function renderEpisodeListView(
    container,
    { episodes, podcasts, filterPodcastId, statusFilter = null, onFilter, onStatusFilter, onOpen, onCreate },
) {
    const podcastById = new Map(podcasts.map((p) => [p.id, p]));
    let filtered = filterPodcastId ? episodes.filter((e) => e.podcastId === filterPodcastId) : episodes;
    if (statusFilter) filtered = filtered.filter((e) => (e.status ?? "draft") === statusFilter);

    const pills = FILTERS.map(
        ([value, label]) =>
            `<button type="button" data-status="${value ?? ""}" aria-pressed="${String((statusFilter ?? null) === value)}">${label}</button>`,
    ).join("");

    const filterOptions = [`<option value="">All podcasts</option>`]
        .concat(
            podcasts.map(
                (p) =>
                    `<option value="${esc(p.id)}" ${p.id === filterPodcastId ? "selected" : ""}>${esc(p.title)}</option>`,
            ),
        )
        .join("");

    const rows = filtered
        .map((e) => {
            const parent = podcastById.get(e.podcastId);
            const sub = parent?.title ?? "No primary media";
            return `<tr data-episode="${esc(e.id)}" tabindex="0" role="button" aria-label="Open episode ${esc(e.title)}">
                <td><span class="pnTable_episode">
                    <span class="pnTile" aria-hidden="true">${icon("playCircle")}</span>
                    <span style="min-width:0"><span class="pnTable_episodeTitle">${esc(e.title)}</span>
                    <p class="pnTable_episodeSub">${esc(sub)}</p></span>
                </span></td>
                <td>${statusPill(e.status)}</td>
                <td><span class="pnTable_muted">${icon("clock")}${esc(fmtDuration(e.duration))}</span></td>
                <td><span class="pnTable_muted">${icon("calendar")}${esc(fmtDate(e.publishedAt ?? e.scheduledAt))}</span></td>
            </tr>`;
        })
        .join("");

    const mobileCards = filtered
        .map((e) => {
            const parent = podcastById.get(e.podcastId);
            return `<button class="pnRowCard" type="button" data-episode="${esc(e.id)}">
                <span class="pnRowCard_main">
                    <span class="pnTile" style="width:40px;height:40px;border-radius:8px" aria-hidden="true">${icon("playCircle")}</span>
                    <span style="min-width:0">
                        <h2 class="pnRowCard_title" style="font-size:16px;line-height:24px">${esc(e.title)}</h2>
                        <p class="pnRowCard_slug">${esc(parent?.title ?? "No primary media")}</p>
                        <span class="pnRowCard_chips">${statusPill(e.status)}
                            <span class="pnBadge pnBadge--muted">${icon("clock")} ${esc(fmtDuration(e.duration))}</span>
                            <span class="pnBadge pnBadge--muted">${icon("calendar")} ${esc(fmtDate(e.publishedAt ?? e.scheduledAt))}</span>
                        </span>
                    </span>
                </span>
                <span class="pnArrow" aria-hidden="true">${icon("arrowRight")}</span>
            </button>`;
        })
        .join("");

    const empty = `<div class="pnEmpty">${icon("mic")}<h2>No episodes yet</h2><p>Create your first episode to see it here.</p>
        <button class="pnBtn pnBtn--cta" id="podaEpisodeNewEmpty" type="button">${icon("plus")} New Episode</button></div>`;

    container.innerHTML = `<style>${NATIVE_STYLES}${EPLIST_STYLES}</style><div class="podaNative pnScroll"><div class="pnPage">
        <div class="pnPageBand" aria-hidden="true"></div>
        <div class="pnPageHeader">
            <div>
                <h1 class="pnTitle">Episodes</h1>
                <p class="pnSubtitle">Manage and create your podcast episodes</p>
            </div>
            <button class="pnBtn pnBtn--cta" id="podaEpisodeNew" type="button">${icon("plus")} New Episode</button>
        </div>
        <div class="pnFilters" role="group" aria-label="Status filter">
            ${pills}
            <span class="podaEpisodeList_podcastFilter">
                <label for="podaEpisodeFilter">Podcast</label>
                <select class="pnSelect" style="width:auto" id="podaEpisodeFilter">${filterOptions}</select>
            </span>
        </div>
        ${
            filtered.length
                ? `<div class="pnTableWrap"><div class="pnTableScroll"><table class="pnTable">
            <thead><tr><th>Episode</th><th>Status</th><th>Duration</th><th>Date</th></tr></thead>
            <tbody>${rows}</tbody>
        </table></div></div><div class="pnMobileCards pnCardGrid">${mobileCards}</div>`
                : empty
        }
    </div></div>`;

    container.querySelector("#podaEpisodeNew")?.addEventListener("click", () => onCreate?.());
    container.querySelector("#podaEpisodeNewEmpty")?.addEventListener("click", () => onCreate?.());
    container
        .querySelector("#podaEpisodeFilter")
        ?.addEventListener("change", (e) => onFilter?.(e.target.value || null));
    container
        .querySelectorAll("[data-status]")
        .forEach((btn) => btn.addEventListener("click", () => onStatusFilter?.(btn.dataset.status || null)));
    container.querySelectorAll("[data-episode]").forEach((row) => {
        const open = () => onOpen?.(row.dataset.episode);
        row.addEventListener("click", open);
        row.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
            }
        });
    });
}

// Episodes collection view — the donor's card-list pattern over the mock
// adapter with a parent-podcast filter chip and the gradient "New episode" CTA.

const EPLIST_STYLES = `
.podaEpisodeList { font-family: Inter, system-ui, sans-serif; padding: 24px clamp(12px, 4vw, 40px); background: #fffdf9; box-sizing: border-box; flex: 1 1 auto; min-height: 0; overflow-y: auto; }
.podaEpisodeList_header { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.podaEpisodeList_title { margin: 0; font-size: 28px; color: #332216; }
.podaEpisodeList_sub { margin: 4px 0 0; color: #6b5142; font-size: 14px; }
.podaEpisodeList_cta { border: none; padding: 10px 18px; border-radius: 10px; background: linear-gradient(120deg, #f9ba51, #efa43e); color: #332216; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 5px 14px #33221626; }
.podaEpisodeList_filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; align-items: center; }
.podaEpisodeList_filter select { padding: 8px 12px; border: 1px solid #e2c4aa; border-radius: 10px; background: #fffdf9; color: #332216; font-size: 13px; }
.podaEpisodeList_cards { display: grid; gap: 14px; }
.podaEpisodeList_card { display: flex; gap: 16px; align-items: flex-start; padding: 16px 18px; background: #fff; border: 1px solid #e2c4aa; border-radius: 16px; box-shadow: 0 4px 14px #33221614; cursor: pointer; text-align: left; font: inherit; transition: border-color 120ms ease, box-shadow 120ms ease; width: 100%; box-sizing: border-box; }
.podaEpisodeList_card:hover { border-color: #f9ba51; box-shadow: 0 8px 22px #33221626; }
.podaEpisodeList_cover { width: 52px; height: 52px; border-radius: 12px; flex-shrink: 0; background: radial-gradient(circle, #f9ba51 0%, #efb855 61%, #e5793e 100%); color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.podaEpisodeList_cardTitle { margin: 0; font-size: 16px; color: #332216; }
.podaEpisodeList_cardMeta { margin: 3px 0 0; font-size: 12px; color: #8e7463; }
.podaEpisodeList_cardDesc { margin: 8px 0 0; font-size: 13px; color: #6b5142; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.podaEpisodeList_badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; font-size: 11px; }
.podaEpisodeList_pill { padding: 2px 9px; border-radius: 999px; font-weight: 700; background: #ffebc7; color: #743719; }
.podaEpisodeList_pill--green { background: #d9f0e4; color: #006052; }
.podaEpisodeList_pill--muted { background: #f7f1eb; color: #6b5142; }
.podaEpisodeList_pill--blue { background: #dbeafe; color: #1d4ed8; }
.podaEpisodeList_arrow { margin-left: auto; color: #8e7463; align-self: center; transition: transform 120ms ease; }
.podaEpisodeList_card:hover .podaEpisodeList_arrow { transform: translateX(3px); }
.podaEpisodeList_empty { text-align: center; padding: 56px 24px; background: #fff; border: 1px solid #e2c4aa; border-radius: 16px; }
.podaEpisodeList_empty h2 { margin: 0 0 8px; color: #332216; font-size: 20px; }
.podaEpisodeList_empty p { margin: 0 0 18px; color: #6b5142; font-size: 14px; }
`;

function esc(value) {
    return String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function fmtDuration(seconds) {
    if (seconds == null) return null;
    const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60);
    return h ? `${h}h ${m}m` : `${m}m`;
}

function fmtDate(d) {
    return d ? String(d).slice(0, 10) : null;
}

function statusPill(ep) {
    if (ep.status === "published") return `<span class="podaEpisodeList_pill--green podaEpisodeList_pill">Published</span>`;
    if (ep.status === "scheduled") return `<span class="podaEpisodeList_pill--blue podaEpisodeList_pill">Scheduled</span>`;
    return `<span class="podaEpisodeList_pill--muted podaEpisodeList_pill">Draft</span>`;
}

export function renderEpisodeListView(container, { episodes, podcasts, filterPodcastId, onFilter, onOpen, onCreate }) {
    const podcastById = new Map(podcasts.map((p) => [p.id, p]));
    const filtered = filterPodcastId ? episodes.filter((e) => e.podcastId === filterPodcastId) : episodes;
    const cards = filtered
        .map((e) => {
            const parent = podcastById.get(e.podcastId);
            return `
        <button class="podaEpisodeList_card" type="button" data-episode="${esc(e.id)}">
            <span class="podaEpisodeList_cover" aria-hidden="true">${esc(`S${e.seasonNumber ?? "?"}E${e.episodeNumber ?? "?"}`)}</span>
            <span style="min-width:0;flex:1">
                <h2 class="podaEpisodeList_cardTitle">${esc(e.title)}</h2>
                <p class="podaEpisodeList_cardMeta">${esc(parent?.title ?? "Unknown podcast")}${e.slug ? ` · ${esc(e.slug)}` : ""}</p>
                <p class="podaEpisodeList_cardDesc">${esc(e.description ?? "")}</p>
                <span class="podaEpisodeList_badges">
                    ${statusPill(e)}
                    ${e.duration ? `<span class="podaEpisodeList_pill--muted podaEpisodeList_pill">${esc(fmtDuration(e.duration))}</span>` : ""}
                    ${e.publishedAt ? `<span class="podaEpisodeList_pill--muted podaEpisodeList_pill">${esc(fmtDate(e.publishedAt))}</span>` : ""}
                    ${e.scheduledAt ? `<span class="podaEpisodeList_pill--blue podaEpisodeList_pill">for ${esc(fmtDate(e.scheduledAt))}</span>` : ""}
                </span>
            </span>
            <span class="podaEpisodeList_arrow" aria-hidden="true">→</span>
        </button>`;
        })
        .join("");

    const filterOptions = [`<option value="">All podcasts</option>`]
        .concat(podcasts.map((p) => `<option value="${esc(p.id)}" ${p.id === filterPodcastId ? "selected" : ""}>${esc(p.title)}</option>`))
        .join("");

    container.innerHTML = `<style>${EPLIST_STYLES}</style><div class="podaEpisodeList">
        <div class="podaEpisodeList_header">
            <div>
                <h1 class="podaEpisodeList_title">Episodes</h1>
                <p class="podaEpisodeList_sub">Session-only mock data — creations reset on reload.</p>
            </div>
            <button class="podaEpisodeList_cta" id="podaEpisodeNew" type="button">+ New episode</button>
        </div>
        <div class="podaEpisodeList_filter">
            <label for="podaEpisodeFilter" style="font-size:12px;font-weight:600;color:#563522">Podcast</label>
            <select id="podaEpisodeFilter">${filterOptions}</select>
            <span style="font-size:12px;color:#8e7463">${filtered.length} episode${filtered.length === 1 ? "" : "s"}</span>
        </div>
        <div class="podaEpisodeList_cards">
            ${cards || `<div class="podaEpisodeList_empty"><h2>No episodes yet</h2><p>Create your first episode to see it here.</p></div>`}
        </div>
    </div>`;

    container.querySelector("#podaEpisodeNew")?.addEventListener("click", () => onCreate?.());
    container.querySelector("#podaEpisodeFilter")?.addEventListener("change", (e) => onFilter?.(e.target.value || null));
    container.querySelectorAll("[data-episode]").forEach((card) =>
        card.addEventListener("click", () => onOpen?.(card.dataset.episode)),
    );
}

// Studio podcasts collection view — the donor's card-list pattern over the
// mock adapter, with the gradient "New podcast" CTA.

const LIST_STYLES = `
.podaStudioList { font-family: Inter, system-ui, sans-serif; padding: 24px clamp(12px, 4vw, 40px); background: #fffdf9; box-sizing: border-box; flex: 1 1 auto; min-height: 0; overflow-y: auto; }
.podaStudioList_header { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.podaStudioList_title { margin: 0; font-size: 28px; color: #332216; }
.podaStudioList_sub { margin: 4px 0 0; color: #6b5142; font-size: 14px; }
.podaStudioList_cta { border: none; padding: 10px 18px; border-radius: 10px; background: linear-gradient(120deg, #f9ba51, #efa43e); color: #332216; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 5px 14px #33221626; }
.podaStudioList_cards { display: grid; gap: 14px; }
.podaStudioList_card { display: flex; gap: 16px; align-items: flex-start; padding: 16px 18px; background: #fff; border: 1px solid #e2c4aa; border-radius: 16px; box-shadow: 0 4px 14px #33221614; cursor: pointer; text-align: left; font: inherit; transition: border-color 120ms ease, box-shadow 120ms ease; }
.podaStudioList_card:hover { border-color: #f9ba51; box-shadow: 0 8px 22px #33221626; }
.podaStudioList_cover { width: 52px; height: 52px; border-radius: 12px; flex-shrink: 0; background: radial-gradient(circle, #f9ba51 0%, #efb855 61%, #e5793e 100%); color: #fff; font-size: 20px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.podaStudioList_cardTitle { margin: 0; font-size: 16px; color: #332216; }
.podaStudioList_cardSlug { margin: 2px 0 0; font-size: 12px; color: #8e7463; }
.podaStudioList_cardDesc { margin: 8px 0 0; font-size: 13px; color: #6b5142; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.podaStudioList_cardMeta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; font-size: 12px; color: #8e7463; align-items: center; }
.podaStudioList_pill { padding: 2px 9px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #ffebc7; color: #743719; }
.podaStudioList_pill--green { background: #d9f0e4; color: #006052; }
.podaStudioList_pill--muted { background: #f7f1eb; color: #6b5142; }
.podaStudioList_arrow { margin-left: auto; color: #8e7463; align-self: center; transition: transform 120ms ease; }
.podaStudioList_card:hover .podaStudioList_arrow { transform: translateX(3px); }
.podaStudioList_empty { text-align: center; padding: 56px 24px; background: #fff; border: 1px solid #e2c4aa; border-radius: 16px; }
.podaStudioList_empty h2 { margin: 0 0 8px; color: #332216; font-size: 20px; }
.podaStudioList_empty p { margin: 0 0 18px; color: #6b5142; font-size: 14px; }
`;

function esc(value) {
    return String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function initials(title) {
    return (title || "?").split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

function statusPill(podcast) {
    if (podcast.status === "published") return `<span class="podaStudioList_pill--green podaStudioList_pill">Published</span>`;
    return `<span class="podaStudioList_pill--muted podaStudioList_pill">${esc(podcast.status ?? "draft")}</span>`;
}

export function renderStudioListView(container, { podcasts, onOpen, onCreate }) {
    const cards = podcasts
        .map(
            (p) => `
        <button class="podaStudioList_card" type="button" data-podcast="${esc(p.id)}">
            <span class="podaStudioList_cover" aria-hidden="true">${esc(initials(p.title))}</span>
            <span style="min-width:0">
                <h2 class="podaStudioList_cardTitle">${esc(p.title)}</h2>
                <p class="podaStudioList_cardSlug">${esc(p.slug ?? "")}</p>
                <p class="podaStudioList_cardDesc">${esc(p.description ?? "")}</p>
                <span class="podaStudioList_cardMeta">
                    ${statusPill(p)}
                    ${(p.categories ?? []).slice(0, 2).map((c) => `<span class="podaStudioList_pill">${esc(c)}</span>`).join("")}
                    <span>updated ${esc(String(p.updatedAt ?? "").slice(0, 10))}</span>
                </span>
            </span>
            <span class="podaStudioList_arrow" aria-hidden="true">→</span>
        </button>`,
        )
        .join("");

    container.innerHTML = `<style>${LIST_STYLES}</style><div class="podaStudioList">
        <div class="podaStudioList_header">
            <div>
                <h1 class="podaStudioList_title">Podcasts</h1>
                <p class="podaStudioList_sub">Session-only mock data — creations reset on reload.</p>
            </div>
            <button class="podaStudioList_cta" id="podaStudioNew" type="button">+ New podcast</button>
        </div>
        <div class="podaStudioList_cards">
            ${cards || `<div class="podaStudioList_empty"><h2>No podcasts yet</h2><p>Create your first podcast to see it here.</p></div>`}
        </div>
    </div>`;

    container.querySelector("#podaStudioNew")?.addEventListener("click", () => onCreate?.());
    container.querySelectorAll("[data-podcast]").forEach((card) =>
        card.addEventListener("click", () => onOpen?.(card.dataset.podcast)),
    );
}

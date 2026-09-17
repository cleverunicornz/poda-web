// Shared Poda profile view — framework-free so the same artifact runs inside
// the Element module host (React wrapper) and the room widget host (iframe).
// Mock fixture data only.

export const MOCK_PROFILE = {
    displayName: "Mira Chen",
    headline: "Founder ops strategist and launch systems advisor",
    tagline: "Turns messy launches into calm repeatable systems.",
    topics: ["Founder operations", "Launch systems", "AI workflows"],
    socialLinks: { website: "https://example.com/mira", calendly: "https://calendly.com/mira/intro" },
    appearanceCount: 12,
    bestFitFor: ["Technical founders", "Launch retrospectives"],
};

export const PROFILE_STYLES = `
.podaProfileCard { font-family: Inter, system-ui, sans-serif; max-width: 560px; margin: 24px auto; background: var(--poda-card, #ffffff); border: 1px solid #e2c4aa; border-radius: 18px; padding: 28px; box-shadow: 0 8px 24px #33221626; }
.podaProfileCard_hero { display: flex; gap: 18px; align-items: center; }
.podaProfileCard_avatar { width: 72px; height: 72px; border-radius: 16px; flex-shrink: 0; background: radial-gradient(circle, #f9ba51 0%, #efb855 61%, #e5793e 100%); color: #fff; font-size: 28px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.podaProfileCard_name { margin: 0; font-size: 24px; color: #332216; }
.podaProfileCard_headline { margin: 4px 0 0; color: #6b5142; font-size: 14px; }
.podaProfileCard_tabs { display: inline-flex; gap: 4px; margin-top: 20px; padding: 4px; border: 1px solid #e2c4aa; border-radius: 12px; background: #fff8e8; }
.podaProfileCard_tab { border: none; background: transparent; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #6b5142; cursor: pointer; }
.podaProfileCard_tab[aria-selected="true"] { background: linear-gradient(120deg, #f9ba51, #efa43e); color: #332216; box-shadow: 0 4px 10px #f9ba5133; }
.podaProfileCard_body { margin-top: 16px; color: #332216; font-size: 14px; line-height: 1.55; }
.podaProfileCard_pill { display: inline-block; margin: 0 6px 6px 0; padding: 4px 10px; border-radius: 999px; background: #ffebc7; color: #743719; font-size: 12px; font-weight: 600; }
.podaProfileCard_meta { color: #6b5142; font-size: 13px; margin-top: 8px; }
.podaProfileCard_navBtn { margin-top: 16px; padding: 8px 14px; border: 1px solid #c9a58a; border-radius: 10px; background: #fff; color: #563522; font-size: 13px; cursor: pointer; }
`;

function esc(value) {
    return String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

export function profileMarkup(profile, view) {
    const topics = profile.topics.map((t) => `<span class="podaProfileCard_pill">${esc(t)}</span>`).join("");
    const links = Object.entries(profile.socialLinks)
        .map(([k, v]) => `<div class="podaProfileCard_meta">${esc(k)}: ${esc(v)}</div>`)
        .join("");
    const body =
        view === "details"
            ? `<p>${esc(profile.tagline)}</p><div>${topics}</div>${links}<div class="podaProfileCard_meta">Appearances: ${profile.appearanceCount} · Best fit: ${profile.bestFitFor.map(esc).join(", ")}</div>`
            : `<p>${esc(profile.tagline)}</p><p class="podaProfileCard_meta">${esc(profile.headline)}</p>`;
    return `
        <div class="podaProfileCard_hero">
            <div class="podaProfileCard_avatar" aria-hidden="true">${esc(profile.displayName.split(" ").map((w) => w[0]).join(""))}</div>
            <div>
                <h2 class="podaProfileCard_name">${esc(profile.displayName)}</h2>
                <p class="podaProfileCard_headline">${esc(profile.headline)}</p>
            </div>
        </div>
        <div class="podaProfileCard_body">${body}</div>`;
}

// Renders the shared profile card with two internal views. onViewChange lets
// the host persist the internal view (hash query in module, iframe hash in
// the widget). hostLabel identifies which host rendered the artifact.
export function renderProfileView(container, { hostLabel, profile, initialView = "summary", onViewChange, extraActionsHtml = "" }) {
    const data = profile ?? MOCK_PROFILE;
    container.innerHTML = `
        <style>${PROFILE_STYLES}</style>
        <section class="podaProfileCard" data-host="${esc(hostLabel)}">
            <div class="podaProfileCard_tabs" role="tablist">
                <button class="podaProfileCard_tab" data-view="summary" role="tab">Summary</button>
                <button class="podaProfileCard_tab" data-view="details" role="tab">Details</button>
            </div>
            <div class="podaProfileCard_view"></div>
            ${extraActionsHtml}
        </section>`;
    const view = container.querySelector(".podaProfileCard_view");
    const tabs = container.querySelectorAll(".podaProfileCard_tab");
    const show = (name) => {
        view.innerHTML = profileMarkup(data, name);
    };
    tabs.forEach((t) =>
        t.addEventListener("click", () => {
            show(t.dataset.view);
            onViewChange?.(t.dataset.view);
        }),
    );
    show(initialView);
}

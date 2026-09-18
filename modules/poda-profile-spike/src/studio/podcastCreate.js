// Podcast creation form — single validated page over the editable-tier fields
// (donor wizard evidence: basics, cover art, categories/settings, identity &
// rights; single page in this slice). Validation is pure and test-covered.
import { APPLE_CATEGORIES } from "../data/appleCategories.js";

const CREATE_STYLES = `
.podaPodcastCreate { font-family: Inter, system-ui, sans-serif; padding: 24px clamp(12px, 4vw, 40px); background: #fffdf9; box-sizing: border-box; flex: 1 1 auto; min-height: 0; overflow-y: auto; }
.podaPodcastCreate_inner { max-width: 820px; margin: 0 auto; }
.podaPodcastCreate h1 { margin: 0; font-size: 26px; color: #332216; }
.podaPodcastCreate .hint { color: #6b5142; font-size: 13px; margin: 6px 0 18px; }
.podaPodcastCreate fieldset { background: #fff; border: 1px solid #e2c4aa; border-radius: 16px; padding: 18px 20px; margin: 0 0 16px; box-shadow: 0 4px 14px #33221614; }
.podaPodcastCreate legend { font-size: 13px; font-weight: 700; color: #743719; padding: 0 8px; }
.podaPodcastCreate label { display: block; font-size: 12px; font-weight: 600; color: #563522; margin: 12px 0 4px; }
.podaPodcastCreate input[type="text"], .podaPodcastCreate input[type="url"], .podaPodcastCreate input[type="email"], .podaPodcastCreate input[type="number"], .podaPodcastCreate textarea, .podaPodcastCreate select { width: 100%; box-sizing: border-box; padding: 9px 12px; border: 1px solid #e2c4aa; border-radius: 10px; background: #fffdf9; color: #332216; font-size: 14px; font-family: inherit; }
.podaPodcastCreate textarea { min-height: 90px; resize: vertical; }
.podaPodcastCreate input:focus, .podaPodcastCreate textarea:focus, .podaPodcastCreate select:focus { outline: 2px solid #f9ba51; outline-offset: 1px; }
.podaPodcastCreate .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
.podaPodcastCreate .cats { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.podaPodcastCreate .cat { padding: 5px 12px; border-radius: 999px; border: 1px solid #e2c4aa; background: #fffdf9; font-size: 12px; font-weight: 600; color: #6b5142; cursor: pointer; }
.podaPodcastCreate .cat[aria-pressed="true"] { background: #ffebc7; border-color: #f9ba51; color: #743719; }
.podaPodcastCreate .check { display: flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 13px; color: #332216; }
.podaPodcastCreate .error { color: #b3261e; font-size: 12px; margin: 4px 0 0; }
.podaPodcastCreate input[aria-invalid="true"] { border-color: #b3261e; }
.podaPodcastCreate_actions { display: flex; gap: 10px; margin-top: 20px; }
.podaPodcastCreate_save { border: none; padding: 11px 20px; border-radius: 10px; background: linear-gradient(120deg, #f9ba51, #efa43e); color: #332216; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 5px 14px #33221626; }
.podaPodcastCreate_cancel { padding: 11px 20px; border-radius: 10px; border: 1px solid #c9a58a; background: #fff; color: #563522; font-size: 14px; cursor: pointer; }
.podaPodcastCreate_notice { margin-top: 16px; padding: 10px 12px; border-radius: 10px; border: 1px solid #f9c66b; background: #fff8e8; color: #743719; font-size: 12px; }
@media (max-width: 700px) { .podaPodcastCreate .grid2 { grid-template-columns: 1fr; } }
`;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pure validation — covered by contract tests.
export function validatePodcastDraft(draft) {
    const errors = {};
    if (!draft.title?.trim()) errors.title = "Title is required.";
    if (!draft.slug?.trim()) errors.slug = "Slug is required.";
    else if (!SLUG_PATTERN.test(draft.slug.trim())) errors.slug = "Slug must be lowercase letters, numbers, and hyphens.";
    if (!draft.ownerEmail?.trim()) errors.ownerEmail = "Owner email is required.";
    else if (!EMAIL_PATTERN.test(draft.ownerEmail.trim())) errors.ownerEmail = "Enter a valid email address.";
    if (!draft.categories?.length) errors.categories = "Pick at least one category.";
    if (draft.websiteUrl && !/^https?:\/\//.test(draft.websiteUrl)) errors.websiteUrl = "URLs must start with http(s)://";
    if (draft.trailerUrl && !/^https?:\/\//.test(draft.trailerUrl)) errors.trailerUrl = "URLs must start with http(s)://";
    if (draft.bookingUrl && !/^https?:\/\//.test(draft.bookingUrl)) errors.bookingUrl = "URLs must start with http(s)://";
    for (const [service, value] of Object.entries(draft.socialLinks ?? {})) {
        if (value && !/^https?:\/\//.test(value)) errors[`social_${service}`] = "URLs must start with http(s)://";
    }
    return errors;
}

function esc(value) {
    return String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function field(id, label, { type = "text", value = "", placeholder = "", error = "" } = {}) {
    return `
        <label for="${id}">${esc(label)}</label>
        <input id="${id}" name="${id}" type="${type}" value="${esc(value)}" placeholder="${esc(placeholder)}" ${error ? 'aria-invalid="true"' : ""} />
        ${error ? `<p class="error" data-error-for="${id}">${esc(error)}</p>` : ""}`;
}

const SOCIALS = ["website", "linkedin", "twitter", "youtube", "instagram", "tiktok", "calendly"];

export function renderPodcastCreateView(container, { onSubmit, onCancel }) {
    const errors = {};
    const cats = APPLE_CATEGORIES.map(
        (c) => `<button class="cat" type="button" data-cat="${esc(c)}" aria-pressed="false">${esc(c)}</button>`,
    ).join("");

    container.innerHTML = `<style>${CREATE_STYLES}</style><div class="podaPodcastCreate"><div class="podaPodcastCreate_inner">
        <h1>New podcast</h1>
        <p class="hint">Session-only mock — the podcast appears in this session's collections; reload discards it.</p>
        <form id="podaPodcastCreateForm" novalidate>
            <fieldset><legend>Details</legend>
                <div class="grid2">
                    <div>${field("title", "Title *", { placeholder: "Field Notes", error: errors.title })}</div>
                    <div>${field("slug", "Slug *", { placeholder: "field-notes", error: errors.slug })}</div>
                </div>
                ${field("tagline", "Tagline", { placeholder: "Calm systems for chaotic launches." })}
                <label for="description">Description</label>
                <textarea id="description" name="description" placeholder="What is this show about?"></textarea>
                ${field("coverArtUrl", "Cover art URL (mock)", { type: "url", placeholder: "https://cdn.example.com/cover.png" })}
                <label>Categories *</label>
                <div class="cats" id="podaCreateCats">${cats}</div>
                ${errors.categories ? `<p class="error" data-error-for="categories">${esc(errors.categories)}</p>` : ""}
                <div class="grid2">
                    <div><label for="language">Language</label>
                        <select id="language" name="language">
                            <option value="en" selected>English</option><option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option>
                        </select></div>
                    <div><label for="showType">Show type</label>
                        <select id="showType" name="showType">
                            <option value="episodic" selected>Episodic</option><option value="serial">Serial</option>
                        </select></div>
                </div>
                <label class="check"><input type="checkbox" id="explicit" name="explicit" /> Explicit content</label>
            </fieldset>
            <fieldset><legend>Identity &amp; rights</legend>
                <div class="grid2">
                    <div>${field("author", "Author", { placeholder: "Jordan Hale" })}</div>
                    <div>${field("ownerEmail", "Owner email *", { type: "email", placeholder: "jordan@example.com", error: errors.ownerEmail })}</div>
                </div>
                <label class="check"><input type="checkbox" id="locked" name="locked" checked /> Lock feed ownership (<code>&lt;podcast:locked&gt;</code>)</label>
                <div class="grid2">
                    <div>${field("licenseId", "License", { placeholder: "CC BY 4.0" })}</div>
                    <div>${field("licenseUrl", "License URL", { type: "url", placeholder: "https://creativecommons.org/licenses/by/4.0/" })}</div>
                </div>
            </fieldset>
            <fieldset><legend>Feed extras</legend>
                <div class="grid2">
                    <div>${field("websiteUrl", "Website URL", { type: "url", error: errors.websiteUrl })}</div>
                    <div>${field("trailerUrl", "Trailer URL", { type: "url", error: errors.trailerUrl })}</div>
                </div>
                <div class="grid2">
                    <div>${field("bookingUrl", "Guest booking URL", { type: "url", error: errors.bookingUrl })}</div>
                    <div>${field("fundingTitle", "Funding link title", { placeholder: "Support the show" })}</div>
                </div>
                ${field("fundingUrl", "Funding URL", { type: "url" })}
                <label>Social links</label>
                <div class="grid2">
                    ${SOCIALS.map((s) => field(`social_${s}`, s, { type: "url", error: errors[`social_${s}`] })).join("")}
                </div>
            </fieldset>
            <div class="podaPodcastCreate_actions">
                <button class="podaPodcastCreate_save" type="submit">Create podcast</button>
                <button class="podaPodcastCreate_cancel" type="button" id="podaCreateCancel">Cancel</button>
            </div>
            <div class="podaPodcastCreate_notice">Mock data only — nothing is sent anywhere.</div>
        </form>
    </div></div>`;

    container.querySelector("#podaCreateCancel").addEventListener("click", () => onCancel?.());
    container.querySelectorAll("#podaCreateCats .cat").forEach((btn) =>
        btn.addEventListener("click", () => btn.setAttribute("aria-pressed", btn.getAttribute("aria-pressed") === "true" ? "false" : "true")),
    );

    container.querySelector("#podaPodcastCreateForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const categories = Array.from(form.querySelectorAll("#podaCreateCats .cat[aria-pressed='true']")).map((b) => b.dataset.cat);
        const socialLinks = {};
        for (const s of SOCIALS) {
            const v = String(data.get(`social_${s}`) ?? "").trim();
            if (v) socialLinks[s] = v;
        }
        const draft = {
            title: String(data.get("title") ?? "").trim(),
            tagline: String(data.get("tagline") ?? "").trim(),
            description: String(data.get("description") ?? "").trim(),
            slug: String(data.get("slug") ?? "").trim(),
            coverArtUrl: String(data.get("coverArtUrl") ?? "").trim() || null,
            categories,
            language: data.get("language") ?? "en",
            explicit: data.get("explicit") === "on",
            author: String(data.get("author") ?? "").trim(),
            ownerEmail: String(data.get("ownerEmail") ?? "").trim(),
            showType: data.get("showType") ?? "episodic",
            websiteUrl: String(data.get("websiteUrl") ?? "").trim(),
            trailerUrl: String(data.get("trailerUrl") ?? "").trim(),
            bookingUrl: String(data.get("bookingUrl") ?? "").trim(),
            socialLinks,
            channel: {
                locked: data.get("locked") === "on" ? { owner: String(data.get("ownerEmail") ?? "").trim(), locked: true } : null,
                license: data.get("licenseId") ? { identifierOrText: String(data.get("licenseId")).trim(), url: String(data.get("licenseUrl") ?? "").trim() || null } : null,
                funding: data.get("fundingUrl") ? [{ title: String(data.get("fundingTitle") ?? "").trim() || "Support", url: String(data.get("fundingUrl")).trim() }] : [],
            },
        };
        const validation = validatePodcastDraft(draft);
        if (Object.keys(validation).length) {
            for (const [key, message] of Object.entries(validation)) {
                const input = form.querySelector(`#${key === "categories" ? "podaCreateCats" : key}`);
                if (input) {
                    if (input.id === "podaCreateCats") input.style.outline = "2px solid #b3261e";
                    else input.setAttribute("aria-invalid", "true");
                }
                const errorEl = form.querySelector(`[data-error-for="${key}"]`);
                if (errorEl) errorEl.textContent = message;
                else if (input && input.id !== "podaCreateCats") {
                    const p = document.createElement("p");
                    p.className = "error";
                    p.dataset.errorFor = key;
                    p.textContent = message;
                    input.insertAdjacentElement("afterend", p);
                } else if (key === "categories") {
                    const p = document.createElement("p");
                    p.className = "error";
                    p.textContent = message;
                    form.querySelector("#podaCreateCats").insertAdjacentElement("afterend", p);
                }
            }
            return;
        }
        onSubmit?.(draft);
    });
}

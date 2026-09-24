/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Podcast creation wizard — the PCC native guided single-page flow transferred
// to the module host: hero card with draft pulse, section cards with guidance
// and blue info notes, category checkbox grid (1-3), dashed cover upload, and
// the sticky Podcast Pulse readiness rail. Validation contract unchanged.
import { APPLE_CATEGORIES } from "../data/appleCategories.js";
import { NATIVE_STYLES, esc, formText, icon, noteHtml, railItem, progressHtml } from "../shared/nativeTheme.js";

const CREATE_STYLES = `
.podaPodcastCreate { flex: 1 1 auto; min-height: 0; overflow-y: auto; }
.pnCoverPreview { margin-top: 12px; width: 120px; height: 120px; border-radius: 12px; border: 1px solid hsl(var(--pn-border)); object-fit: cover; display: none; }
`;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pure validation — covered by contract tests.
export function validatePodcastDraft(draft) {
    const errors = {};
    if (!draft.title?.trim()) errors.title = "Title is required.";
    if (!draft.slug?.trim()) errors.slug = "Slug is required.";
    else if (!SLUG_PATTERN.test(draft.slug.trim()))
        errors.slug = "Slug must be lowercase letters, numbers, and hyphens.";
    if (!draft.ownerEmail?.trim()) errors.ownerEmail = "Owner email is required.";
    else if (!EMAIL_PATTERN.test(draft.ownerEmail.trim())) errors.ownerEmail = "Enter a valid email address.";
    if (!draft.categories?.length) errors.categories = "Pick at least one category.";
    else if (draft.categories.length > 3) errors.categories = "Pick at most three categories.";
    if (draft.websiteUrl && !/^https?:\/\//.test(draft.websiteUrl))
        errors.websiteUrl = "URLs must start with http(s)://";
    if (draft.trailerUrl && !/^https?:\/\//.test(draft.trailerUrl))
        errors.trailerUrl = "URLs must start with http(s)://";
    if (draft.bookingUrl && !/^https?:\/\//.test(draft.bookingUrl))
        errors.bookingUrl = "URLs must start with http(s)://";
    for (const [service, value] of Object.entries(draft.socialLinks ?? {})) {
        if (value && !/^https?:\/\//.test(value)) errors[`social_${service}`] = "URLs must start with http(s)://";
    }
    return errors;
}

const SOCIALS = ["website", "linkedin", "twitter", "youtube", "instagram", "tiktok", "calendly"];
const MAX_CATEGORIES = 3;

function field(id, label, { type = "text", placeholder = "", helper = "", counter = 0, value = "" } = {}) {
    return `<div class="pnField">
        <label class="pnLabel" for="${id}">${esc(label)}</label>
        <input class="pnInput" id="${id}" name="${id}" type="${type}" placeholder="${esc(placeholder)}" value="${esc(value)}" ${counter ? `maxlength="${counter}"` : ""} />
        ${
            counter
                ? `<div class="pnFieldFoot"><p class="pnFieldError" data-error-for="${id}"></p><span class="pnCounter" data-counter-for="${id}">${String(value).length}/${counter}</span></div>`
                : `<p class="pnFieldError" data-error-for="${id}"></p>`
        }
        ${helper ? `<p class="pnHelper">${esc(helper)}</p>` : ""}
    </div>`;
}

// Readiness mirrors the native model: four checklist items with explicit rules.
function readiness(draft) {
    const items = [
        ["Basics", Boolean(draft.title?.trim() && draft.description?.trim())],
        ["Cover Art", Boolean(draft.coverArtUrl)],
        ["Categories & Settings", Boolean(draft.categories?.length && draft.language)],
        ["Show format & rights", Boolean(draft.showType)],
    ];
    const done = items.filter(([, ok]) => ok).length;
    return { items, percent: Math.round((done / items.length) * 100), ready: done === items.length };
}

function pulsePanelHtml(readinessState) {
    return `<div class="pnPulse" data-pulse>
        <div class="pnPulse_head">
            <div><p class="pnPulse_label">Draft pulse</p><p class="pnPulse_sub">How close this is to publish-ready.</p></div>
            <span class="pnPulse_pct" data-pulse-pct>${readinessState.percent}%</span>
        </div>
        ${progressHtml(readinessState.percent)}
        <ul class="pnChecklist" data-pulse-list>${readinessState.items
            .map(
                ([label, ok]) =>
                    `<li>${ok ? icon("checkCircle") : '<span class="pnDot"></span>'}<span>${esc(label)}</span></li>`,
            )
            .join("")}</ul>
        <div style="margin-top:12px">${noteHtml("The wizard should feel like the profile flow: guided, bold, and alive.")}</div>
    </div>`;
}

function railHtml(readinessState) {
    return `<aside class="pnRail">
        <div class="pnRailCard">
            <div class="pnRailCard_head">
                <span class="pnRailCard_icon">${icon("sparkles")}</span>
                <div><p class="pnPulse_label">Podcast Pulse</p><p class="pnPulse_sub">Fast read on whether this flow feels finished.</p></div>
            </div>
            <div class="pnRailReadiness">
                <div class="pnRailReadiness_head"><span>Readiness</span><b data-rail-pct>${readinessState.percent}%</b></div>
                ${progressHtml(readinessState.percent)}
                <span class="pnRailStatus${readinessState.ready ? " pnRailStatus--ready" : ""}" data-rail-status>
                    ${icon(readinessState.ready ? "checkCircle" : "sparkles")} ${readinessState.ready ? "Ready to publish" : "Still getting the vibe right"}
                </span>
            </div>
            <div style="margin-top:16px" data-rail-list>
                ${readinessState.items.map(([label, ok]) => railItem(label, ok)).join("")}
            </div>
        </div>
        <div class="pnRailInfo">${icon("info")}<span>Everything here stays in this browser session. Reloading restores the seeded demo data.</span></div>
    </aside>`;
}

export function renderPodcastCreateView(container, { onSubmit, onCancel }) {
    const cats = APPLE_CATEGORIES.map(
        (c) => `<label><input type="checkbox" name="cat" value="${esc(c)}" /> ${esc(c)}</label>`,
    ).join("");

    const initial = readiness({ showType: "episodic", language: "en" });

    container.innerHTML = `<style>${NATIVE_STYLES}${CREATE_STYLES}</style><div class="podaNative podaPodcastCreate"><div class="pnPage">
        <div class="pnPageBand" aria-hidden="true"></div>
        <div class="pnOrb pnOrb--left" aria-hidden="true"></div>
        <div class="pnOrb pnOrb--right" aria-hidden="true"></div>
        <div class="pnPageHeader">
            <div>
                <h1 class="pnTitle">Create New Podcast</h1>
                <p class="pnSubtitle">Set up the public identity, categories, and rights for a new show.</p>
            </div>
        </div>
        <form id="podaPodcastCreateForm" novalidate>
        <div class="pnCard pnCard--hero"><div class="pnCard_body" style="padding-top:24px">
            <div class="pnHero">
                <div style="display:flex;gap:16px;align-items:flex-start;min-width:0">
                    <span class="pnHero_tile" aria-hidden="true">${icon("mic")}</span>
                    <div style="min-width:0">
                        <h2 class="pnTitle" style="font-size:24px;line-height:32px">Create Your Podcast</h2>
                        <p class="pnSubtitle" style="font-size:14px;line-height:20px">Start with a clear title, a short tagline, and a concise description. This is the first impression listeners get.</p>
                        <div class="pnHero_chips">
                            <span class="pnChip">${icon("checkCircle")} Square cover</span>
                            <span class="pnChip">${icon("sparkles")} Profile-style guidance</span>
                            <span class="pnChip">${icon("image")} Session-only draft</span>
                        </div>
                    </div>
                </div>
                ${pulsePanelHtml(initial)}
            </div>
        </div></div>

        <div class="pnWizardGrid">
        <div style="display:flex;flex-direction:column;gap:24px;min-width:0">

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Basics</h2>
            <p class="pnCard_desc">Create Your Podcast — the public identity listeners see first.</p>
        </div><div class="pnCard_body">
            ${noteHtml("Start with the public podcast identity so the rest of the setup has context.")}
            ${field("title", "Title *", { placeholder: "Field Notes", counter: 200 })}
            ${field("slug", "Slug *", { placeholder: "field-notes", helper: "Lowercase letters, numbers, and hyphens. Used in links." })}
            ${field("tagline", "Tagline", { placeholder: "Calm systems for chaotic launches.", helper: "One line that sells the show in cards and lists." })}
            <div class="pnField">
                <span class="pnLabel">Cover Art</span>
                <div class="pnUpload" id="podaCoverDrop">
                    <span class="pnUpload_icon">${icon("upload")}</span>
                    <p class="pnUpload_title">Upload new image</p>
                    <p class="pnUpload_hint">Recommended: 3000×3000px, JPG or PNG</p>
                </div>
                <div style="margin-top:8px">${field("coverArtUrl", "Cover art URL (mock upload)", { type: "url", placeholder: "https://cdn.example.com/cover.png" })}</div>
                <img class="pnCoverPreview" id="podaCoverPreview" alt="Cover art preview" />
            </div>
            <div class="pnField">
                <label class="pnLabel" for="description">Description</label>
                <textarea class="pnTextarea" id="description" name="description" maxlength="5000" placeholder="What is this show about?"></textarea>
                <div class="pnFieldFoot"><span></span><span class="pnCounter" data-counter-for="description">0/5000</span></div>
            </div>
        </div></section>

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Categories &amp; Settings</h2>
            <p class="pnCard_desc">Pick up to 3 categories so listeners can actually find the show in search and browse views.</p>
        </div><div class="pnCard_body">
            <div class="pnField">
                <span class="pnLabel">Categories * (select 1-3)</span>
                <p class="pnHelper" style="margin-bottom:8px">Selected: <b data-cat-count>0</b>/${MAX_CATEGORIES}</p>
                <div class="pnCatGrid" id="podaCreateCats">${cats}</div>
                <p class="pnFieldError" data-error-for="categories"></p>
            </div>
            <div class="pnGrid2">
                <div class="pnField"><label class="pnLabel" for="language">Language *</label>
                    <select class="pnSelect" id="language" name="language">
                        <option value="en" selected>English</option><option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option>
                    </select></div>
                <div class="pnField"><label class="pnLabel" for="showType">Show type</label>
                    <select class="pnSelect" id="showType" name="showType">
                        <option value="episodic" selected>Episodic</option><option value="serial">Serial</option>
                    </select></div>
            </div>
            <label class="pnToggle"><input type="checkbox" id="explicit" name="explicit" />
                <span class="pnToggle_track"><span class="pnToggle_thumb"></span></span>
                <span><span class="pnToggle_label">Explicit content</span>
                <p class="pnToggle_hint">Marks the show as containing explicit material in feeds and directories.</p></span>
            </label>
        </div></section>

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Contact &amp; Social</h2>
            <p class="pnCard_desc">All fields in this section are optional except the owner email, and help listeners connect with you.</p>
        </div><div class="pnCard_body">
            <div class="pnGrid2">
                ${field("author", "Author / Host Name", { placeholder: "Jordan Hale" })}
                ${field("ownerEmail", "Owner Email *", { type: "email", placeholder: "jordan@example.com", helper: "Feed ownership contact; required by podcast directories." })}
            </div>
            ${field("websiteUrl", "Website URL", { type: "url", placeholder: "https://example.com/show" })}
            <hr class="pnDivider" />
            <h3 class="pnSubhead">Social links</h3>
            <div class="pnGrid2">
                ${SOCIALS.filter((s) => s !== "website")
                    .map((s) =>
                        field(`social_${s}`, s.charAt(0).toUpperCase() + s.slice(1), {
                            type: "url",
                            placeholder: "https://",
                        }),
                    )
                    .join("")}
            </div>
        </div></section>

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Show format &amp; rights</h2>
            <p class="pnCard_desc">Set ownership lock, licensing, and support metadata for this show.</p>
        </div><div class="pnCard_body">
            <label class="pnToggle" style="margin-top:0"><input type="checkbox" id="locked" name="locked" checked />
                <span class="pnToggle_track"><span class="pnToggle_thumb"></span></span>
                <span><span class="pnToggle_label">Lock feed ownership</span>
                <p class="pnToggle_hint">Tells directories not to move this feed without the owner's say-so.</p></span>
            </label>
            <div class="pnGrid2">
                ${field("licenseId", "License", { placeholder: "CC BY 4.0" })}
                ${field("licenseUrl", "License URL", { type: "url", placeholder: "https://creativecommons.org/licenses/by/4.0/" })}
            </div>
            <div class="pnGrid2">
                ${field("trailerUrl", "Trailer URL", { type: "url", placeholder: "https://cdn.example.com/trailer.mp3" })}
                ${field("bookingUrl", "Guest booking URL", { type: "url", placeholder: "https://calendly.com/…" })}
            </div>
            <div class="pnGrid2">
                ${field("fundingTitle", "Funding link title", { placeholder: "Support the show" })}
                ${field("fundingUrl", "Funding URL", { type: "url", placeholder: "https://example.com/support" })}
            </div>
        </div></section>

        <div class="pnError" id="podaCreateError" role="alert" hidden></div>
        <div class="pnFooter">
            <button class="pnBtn pnBtn--outline" type="submit" data-intent="draft" id="podaSaveDraft">${icon("save")} Save Draft</button>
            <button class="pnBtn pnBtn--primary" type="submit" data-intent="create" id="podaCreateSubmit">${icon("checkCircle")} Create Podcast</button>
        </div>
        </div>
        ${railHtml(initial)}
        </div>
        </form>
    </div></div>`;

    const form = container.querySelector("#podaPodcastCreateForm");
    let intent = "create";

    // --- live readiness + counters + cover preview ---
    function readDraft() {
        const data = new FormData(form);
        const categories = Array.from(form.querySelectorAll("input[name=cat]:checked")).map((i) => i.value);
        const socialLinks = {};
        for (const s of SOCIALS) {
            const v = formText(data, `social_${s}`).trim();
            if (v) socialLinks[s] = v;
        }
        return {
            title: formText(data, "title").trim(),
            tagline: formText(data, "tagline").trim(),
            description: formText(data, "description").trim(),
            slug: formText(data, "slug").trim(),
            coverArtUrl: formText(data, "coverArtUrl").trim() || null,
            categories,
            language: data.get("language") ?? "en",
            explicit: data.get("explicit") === "on",
            author: formText(data, "author").trim(),
            ownerEmail: formText(data, "ownerEmail").trim(),
            showType: data.get("showType") ?? "episodic",
            websiteUrl: formText(data, "websiteUrl").trim(),
            trailerUrl: formText(data, "trailerUrl").trim(),
            bookingUrl: formText(data, "bookingUrl").trim(),
            socialLinks,
            licenseId: formText(data, "licenseId").trim(),
            licenseUrl: formText(data, "licenseUrl").trim(),
            fundingTitle: formText(data, "fundingTitle").trim(),
            fundingUrl: formText(data, "fundingUrl").trim(),
            locked: data.get("locked") === "on",
        };
    }

    function refreshPulse() {
        const state = readiness(readDraft());
        container.querySelector("[data-pulse-pct]").textContent = `${state.percent}%`;
        container.querySelector("[data-pulse] .pnProgress_fill").style.width = `${state.percent}%`;
        container.querySelector("[data-pulse-list]").innerHTML = state.items
            .map(
                ([label, ok]) =>
                    `<li>${ok ? icon("checkCircle") : '<span class="pnDot"></span>'}<span>${esc(label)}</span></li>`,
            )
            .join("");
        container.querySelector("[data-rail-pct]").textContent = `${state.percent}%`;
        container.querySelector(".pnRailReadiness .pnProgress_fill").style.width = `${state.percent}%`;
        const status = container.querySelector("[data-rail-status]");
        status.className = `pnRailStatus${state.ready ? " pnRailStatus--ready" : ""}`;
        status.innerHTML = `${icon(state.ready ? "checkCircle" : "sparkles")} ${state.ready ? "Ready to publish" : "Still getting the vibe right"}`;
        container.querySelector("[data-rail-list]").innerHTML = state.items
            .map(([label, ok]) => railItem(label, ok))
            .join("");
    }

    form.addEventListener("input", (event) => {
        const counter = event.target.id ? form.querySelector(`[data-counter-for="${event.target.id}"]`) : null;
        if (counter) {
            const max = counter.textContent.split("/")[1];
            counter.textContent = `${event.target.value.length}/${max}`;
        }
        if (event.target.id === "coverArtUrl") {
            const preview = container.querySelector("#podaCoverPreview");
            const url = event.target.value.trim();
            preview.style.display = /^https?:\/\//.test(url) ? "block" : "none";
            preview.src = url;
        }
        refreshPulse();
    });
    form.addEventListener("change", refreshPulse);

    // Category cap of 3 (native rule): disable unchecked boxes at the cap.
    const catBox = container.querySelector("#podaCreateCats");
    function enforceCatCap() {
        const checked = catBox.querySelectorAll("input:checked");
        container.querySelector("[data-cat-count]").textContent = String(checked.length);
        catBox.querySelectorAll("input:not(:checked)").forEach((i) => {
            i.disabled = checked.length >= MAX_CATEGORIES;
        });
    }
    catBox.addEventListener("change", enforceCatCap);
    container
        .querySelector("#podaCoverDrop")
        .addEventListener("click", () => container.querySelector("#coverArtUrl").focus());

    form.querySelectorAll("[data-intent]").forEach((btn) =>
        btn.addEventListener("click", () => {
            intent = btn.dataset.intent;
        }),
    );

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const draft = readDraft();
        const submit = {
            ...draft,
            channel: {
                locked: draft.locked ? { owner: draft.ownerEmail, locked: true } : null,
                license: draft.licenseId ? { identifierOrText: draft.licenseId, url: draft.licenseUrl || null } : null,
                funding: draft.fundingUrl ? [{ title: draft.fundingTitle || "Support", url: draft.fundingUrl }] : [],
            },
        };
        delete submit.licenseId;
        delete submit.licenseUrl;
        delete submit.fundingTitle;
        delete submit.fundingUrl;
        delete submit.locked;

        // Clear previous errors
        form.querySelectorAll("[aria-invalid]").forEach((i) => i.removeAttribute("aria-invalid"));
        form.querySelectorAll(".pnFieldError").forEach((p) => (p.textContent = ""));
        container.querySelector("#podaCreateError").hidden = true;

        const validation = validatePodcastDraft(submit);
        if (Object.keys(validation).length) {
            for (const [key, message] of Object.entries(validation)) {
                const input = key === "categories" ? catBox : form.querySelector(`#${key}`);
                if (input && input.id !== "podaCreateCats") input.setAttribute("aria-invalid", "true");
                const errorEl = form.querySelector(`[data-error-for="${key}"]`);
                if (errorEl) errorEl.textContent = message;
            }
            const banner = container.querySelector("#podaCreateError");
            banner.textContent = "A few fields still need attention before this podcast can be created.";
            banner.hidden = false;
            banner.scrollIntoView({ block: "center" });
            return;
        }
        onSubmit?.(submit, intent);
    });
}

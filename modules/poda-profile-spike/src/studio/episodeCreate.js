/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Episode creation wizard — the PCC native guided flow transferred to the
// module host: hero card with episode readiness, local-draft banner, section
// cards, dashed audio upload (mock URL), publish-state radio cards, and the
// Final action rail. Validation contract unchanged; guests stay display-only.
import { NATIVE_STYLES, esc, formText, icon, noteHtml, railItem, progressHtml } from "../shared/nativeTheme.js";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Pure validation — covered by contract tests.
export function validateEpisodeDraft(draft) {
    const errors = {};
    if (!draft.podcastId) errors.podcastId = "Pick a podcast.";
    if (!draft.title?.trim()) errors.title = "Title is required.";
    if (draft.slug && !SLUG_PATTERN.test(draft.slug.trim()))
        errors.slug = "Slug must be lowercase letters, numbers, and hyphens.";
    if (draft.duration != null && (!Number.isFinite(draft.duration) || draft.duration <= 0))
        errors.duration = "Duration must be a positive number of seconds.";
    if (draft.episodeNumber != null && !Number.isInteger(draft.episodeNumber))
        errors.episodeNumber = "Episode number must be a whole number.";
    if (draft.seasonNumber != null && !Number.isInteger(draft.seasonNumber))
        errors.seasonNumber = "Season number must be a whole number.";
    if (draft.status === "scheduled" && !draft.scheduledAt)
        errors.scheduledAt = "Scheduled episodes need a date and time.";
    if (draft.enclosureUrl && !/^https?:\/\//.test(draft.enclosureUrl))
        errors.enclosureUrl = "URLs must start with http(s)://";
    return errors;
}

const PUBLISH_STATES = {
    draft: {
        name: "Draft",
        desc: "Saves the episode as a private draft. It will not be published or scheduled.",
        button: "Save Draft",
    },
    scheduled: { name: "Scheduled", desc: "Publish at a later date.", button: "Schedule Episode" },
};

function epField(id, label, { type = "text", placeholder = "", helper = "", counter = 0 } = {}) {
    return `<div class="pnField">
        <label class="pnLabel" for="${id}">${esc(label)}</label>
        <input class="pnInput" id="${id}" name="${id}" type="${type}" placeholder="${esc(placeholder)}" ${counter ? `maxlength="${counter}"` : ""} />
        ${
            counter
                ? `<div class="pnFieldFoot"><p class="pnFieldError" data-error-for="${id}"></p><span class="pnCounter" data-counter-for="${id}">0/${counter}</span></div>`
                : `<p class="pnFieldError" data-error-for="${id}"></p>`
        }
        ${helper ? `<p class="pnHelper">${esc(helper)}</p>` : ""}
    </div>`;
}

// Native readiness model: Title and number / Hosted audio / Guest credits /
// Notes or transcript.
function readiness(draft) {
    const items = [
        ["Title and number", Boolean(draft.title?.trim() && draft.episodeNumber != null), null],
        ["Hosted audio", Boolean(draft.enclosureUrl), null],
        ["Guest credits", false, "Display-only in this preview"],
        ["Notes or transcript", Boolean(draft.description?.trim() || draft.showNotes?.trim()), null],
    ];
    const done = items.filter(([, ok]) => ok).length;
    return { items, percent: Math.round((done / items.length) * 100) };
}

function pulsePanelHtml(state) {
    return `<div class="pnPulse" data-pulse>
        <div class="pnPulse_head">
            <div><p class="pnPulse_label">Episode readiness</p><p class="pnPulse_sub">Quick scan of setup completeness.</p></div>
            <span class="pnPulse_pct" data-pulse-pct>${state.percent}%</span>
        </div>
        ${progressHtml(state.percent)}
        <ul class="pnChecklist" data-pulse-list>${state.items
            .map(
                ([label, ok, note]) =>
                    `<li>${ok ? icon("checkCircle") : '<span class="pnDot"></span>'}<span>${esc(label)}${note ? ` <span class="pnSubtle" style="font-size:12px">— ${esc(note)}</span>` : ""}</span></li>`,
            )
            .join("")}</ul>
        <div style="margin-top:12px">${noteHtml(PUBLISH_STATES.draft.desc)}</div>
    </div>`;
}

function railHtml(state) {
    return `<aside class="pnRail">
        <div class="pnRailCard">
            <div class="pnRailCard_head">
                <span class="pnRailCard_icon">${icon("sparkles")}</span>
                <div><p class="pnPulse_label">Final action</p><p class="pnPulse_sub">The primary button follows the selected publish state.</p></div>
            </div>
            <div class="pnRailReadiness">
                <div class="pnRailReadiness_head"><span data-final-name>${PUBLISH_STATES.draft.name}</span><b data-rail-pct>${state.percent}%</b></div>
                <p class="pnHelper" data-final-desc style="margin-top:4px">${PUBLISH_STATES.draft.desc}</p>
                ${progressHtml(state.percent)}
            </div>
            <div style="margin-top:16px" data-rail-list>
                ${state.items.map(([label, ok, note]) => railItem(label, ok, note ?? undefined)).join("")}
            </div>
        </div>
        <div class="pnRailInfo">${icon("info")}<span>Everything here stays in this browser session. Reloading restores the seeded demo data.</span></div>
    </aside>`;
}

export function renderEpisodeCreateView(container, { podcasts, onSubmit, onCancel }) {
    const podcastOptions = podcasts
        .map((p) => `<option value="${esc(p.id)}">${esc(p.title)}${p.status === "draft" ? " (draft)" : ""}</option>`)
        .join("");

    const initial = readiness({});
    const publishCards = Object.entries(PUBLISH_STATES)
        .map(
            ([value, s]) => `<label class="pnPublishOpt">
                <input type="radio" name="epStatus" value="${value}" ${value === "draft" ? "checked" : ""} />
                <span><span class="pnPublishOpt_name">${esc(s.name)}</span>
                <p class="pnPublishOpt_desc">${esc(s.desc)}</p></span>
            </label>`,
        )
        .join("");

    container.innerHTML = `<style>${NATIVE_STYLES}</style><div class="podaNative pnScroll"><div class="pnPage">
        <div class="pnPageBand" aria-hidden="true"></div>
        <div class="pnOrb pnOrb--left" aria-hidden="true"></div>
        <div class="pnOrb pnOrb--right" aria-hidden="true"></div>
        <div class="pnPageHeader">
            <div>
                <h1 class="pnTitle">Create New Episode</h1>
                <p class="pnSubtitle">Add a new episode to one of your podcasts</p>
            </div>
        </div>
        <form id="podaEpisodeCreateForm" novalidate>
        <div class="pnCard pnCard--hero"><div class="pnCard_body" style="padding-top:24px">
            <div class="pnHero">
                <div style="display:flex;gap:16px;align-items:flex-start;min-width:0">
                    <span class="pnHero_tile" aria-hidden="true">${icon("mic")}</span>
                    <div style="min-width:0">
                        <h2 class="pnTitle" style="font-size:24px;line-height:32px">Create Episode</h2>
                        <p class="pnSubtitle" style="font-size:14px;line-height:20px">Build the episode with hosted audio, guest context, and a clear publish outcome before creating it.</p>
                        <div class="pnHero_chips">
                            <span class="pnChip" data-podcast-chip>${icon("mic")} <span data-podcast-chip-label>Choose a podcast…</span></span>
                            <span class="pnChip">${icon("upload")} Hosted upload first</span>
                            <span class="pnChip">${icon("sparkles")} Session-only draft</span>
                        </div>
                    </div>
                </div>
                ${pulsePanelHtml(initial)}
            </div>
        </div></div>

        <div class="pnDraftBar">
            <div class="pnDraftBar_left">
                <span class="pnDraftBar_icon">${icon("save")}</span>
                <div><p class="pnDraftBar_title">Local draft state</p><p class="pnDraftBar_sub">Edits are kept in this browser until create succeeds.</p></div>
            </div>
            <button class="pnBtn pnBtn--ghost pnBtn--sm" type="button" id="epCreateCancel">${icon("x")} Cancel</button>
        </div>

        <div class="pnWizardGrid pnWizardGrid--episode">
        <div class="pnStack">

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Episode Info</h2>
            <p class="pnCard_desc">Name and number the episode before attaching media.</p>
        </div><div class="pnCard_body">
            ${noteHtml("Start with the public episode identity so the rest of the setup has context.")}
            <div class="pnField"><label class="pnLabel" for="epPodcast">Podcast *</label>
                <select class="pnSelect" id="epPodcast" name="epPodcast"><option value="">Choose a podcast…</option>${podcastOptions}</select>
                <p class="pnFieldError" data-error-for="podcastId"></p></div>
            ${epField("epTitle", "Title *", { placeholder: "Systems that do not collapse", counter: 200 })}
            <div class="pnGrid3">
                ${epField("epNumber", "Episode Number *", { type: "number", placeholder: "42" })}
                ${epField("epSeason", "Season number", { type: "number", placeholder: "3" })}
                ${epField("epSlug", "Slug", { type: "text", placeholder: "systems-that-do-not-collapse" })}
            </div>
        </div></section>

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Audio</h2>
            <p class="pnCard_desc">Upload the canonical hosted audio file for publishing or scheduling.</p>
        </div><div class="pnCard_body">
            ${noteHtml("Hosted upload is the primary authoring path. Existing URLs are tucked under advanced migration.")}
            <div class="pnUpload" id="epAudioDrop">
                <span class="pnUpload_icon">${icon("upload")}</span>
                <p class="pnUpload_title">Upload episode audio</p>
                <p class="pnUpload_hint">MP3, M4A, WAV, or OGG</p>
            </div>
            ${epField("epEnclosure", "Enclosure URL (mock upload)", { type: "url", placeholder: "https://cdn.example.com/ep43/episode.mp3" })}
            ${epField("epDuration", "Duration (seconds)", { type: "number", placeholder: "2745" })}
        </div></section>

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Guests</h2>
            <p class="pnCard_desc">Attach guests whose appearance should be credited on the episode.</p>
        </div><div class="pnCard_body">
            ${noteHtml("Guest credits are optional, but they make episode appearances easier to browse later. Guest selection is display-only in this preview.")}
            <p class="pnEmptyNote">No guests attached.</p>
        </div></section>

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Content</h2>
            <p class="pnCard_desc">Add listener-facing description, notes, and transcript context.</p>
        </div><div class="pnCard_body">
            ${noteHtml("Descriptions and show notes help listeners decide whether this episode is relevant.")}
            <div class="pnField">
                <label class="pnLabel" for="epDescription">Description</label>
                <textarea class="pnTextarea" id="epDescription" name="epDescription" maxlength="5000" placeholder="What happens in this episode?"></textarea>
                <div class="pnFieldFoot"><span></span><span class="pnCounter" data-counter-for="epDescription">0/5000</span></div>
            </div>
            <div class="pnField">
                <label class="pnLabel" for="epShowNotes">Show notes (HTML allowed, mock)</label>
                <textarea class="pnTextarea" id="epShowNotes" name="epShowNotes" placeholder="<p>…</p>"></textarea>
            </div>
        </div></section>

        <section class="pnCard"><div class="pnCard_header">
            <h2 class="pnCard_title">Publish Settings</h2>
            <p class="pnCard_desc">Choose the final create intent before submitting.</p>
        </div><div class="pnCard_body">
            ${publishCards}
            <div class="pnField" id="epScheduleRow" hidden>
                <label class="pnLabel" for="epScheduledAt">Scheduled for</label>
                <input class="pnInput" id="epScheduledAt" name="epScheduledAt" type="datetime-local" />
                <p class="pnFieldError" data-error-for="scheduledAt"></p>
            </div>
        </div></section>

        <div class="pnError" id="podaEpisodeError" role="alert" hidden></div>
        <div class="pnFooter">
            <button class="pnBtn pnBtn--primary" type="submit" id="epCreateSubmit">${icon("checkCircle")} <span data-submit-label>Save Draft</span></button>
        </div>
        </div>
        ${railHtml(initial)}
        </div>
        </form>
    </div></div>`;

    const form = container.querySelector("#podaEpisodeCreateForm");

    container.querySelector("#epCreateCancel").addEventListener("click", () => onCancel?.());
    container
        .querySelector("#epAudioDrop")
        .addEventListener("click", () => container.querySelector("#epEnclosure").focus());

    function readDraft() {
        const data = new FormData(form);
        const num = (key) => {
            const raw = formText(data, key).trim();
            return raw === "" ? null : Number(raw);
        };
        const status = data.get("epStatus") ?? "draft";
        return {
            podcastId: formText(data, "epPodcast"),
            title: formText(data, "epTitle").trim(),
            slug: formText(data, "epSlug").trim(),
            description: formText(data, "epDescription").trim(),
            showNotes: formText(data, "epShowNotes").trim(),
            episodeNumber: num("epNumber"),
            seasonNumber: num("epSeason"),
            duration: num("epDuration"),
            enclosureUrl: formText(data, "epEnclosure").trim(),
            status,
            scheduledAt: status === "scheduled" ? formText(data, "epScheduledAt") : null,
        };
    }

    function refreshPulse() {
        const state = readiness(readDraft());
        container.querySelector("[data-pulse-pct]").textContent = `${state.percent}%`;
        container.querySelector("[data-pulse] .pnProgress_fill").style.width = `${state.percent}%`;
        container.querySelector("[data-pulse-list]").innerHTML = state.items
            .map(
                ([label, ok, note]) =>
                    `<li>${ok ? icon("checkCircle") : '<span class="pnDot"></span>'}<span>${esc(label)}${note ? ` <span class="pnSubtle" style="font-size:12px">— ${esc(note)}</span>` : ""}</span></li>`,
            )
            .join("");
        container.querySelector("[data-rail-pct]").textContent = `${state.percent}%`;
        container.querySelector(".pnRailReadiness .pnProgress_fill").style.width = `${state.percent}%`;
        container.querySelector("[data-rail-list]").innerHTML = state.items
            .map(([label, ok, note]) => railItem(label, ok, note ?? undefined))
            .join("");
    }

    form.addEventListener("input", (event) => {
        const counter = event.target.id ? form.querySelector(`[data-counter-for="${event.target.id}"]`) : null;
        if (counter) {
            const max = counter.textContent.split("/")[1];
            counter.textContent = `${event.target.value.length}/${max}`;
        }
        if (event.target.id === "epPodcast") {
            const selected = podcasts.find((p) => p.id === event.target.value);
            container.querySelector("[data-podcast-chip-label]").textContent = selected?.title ?? "Choose a podcast…";
        }
        refreshPulse();
    });
    form.addEventListener("change", refreshPulse);

    form.querySelectorAll("input[name=epStatus]").forEach((radio) =>
        radio.addEventListener("change", () => {
            const state = PUBLISH_STATES[radio.value];
            container.querySelector("[data-final-name]").textContent = state.name;
            container.querySelector("[data-final-desc]").textContent = state.desc;
            container.querySelector("[data-submit-label]").textContent = state.button;
            container.querySelector("#epScheduleRow").hidden = radio.value !== "scheduled";
        }),
    );

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const draft = readDraft();

        form.querySelectorAll("[aria-invalid]").forEach((i) => i.removeAttribute("aria-invalid"));
        form.querySelectorAll(".pnFieldError").forEach((p) => (p.textContent = ""));
        container.querySelector("#podaEpisodeError").hidden = true;

        const validation = validateEpisodeDraft(draft);
        if (Object.keys(validation).length) {
            const fieldFor = {
                podcastId: "#epPodcast",
                title: "#epTitle",
                slug: "#epSlug",
                duration: "#epDuration",
                episodeNumber: "#epNumber",
                seasonNumber: "#epSeason",
                scheduledAt: "#epScheduledAt",
                enclosureUrl: "#epEnclosure",
            };
            for (const [key, message] of Object.entries(validation)) {
                const input = form.querySelector(fieldFor[key] ?? `#${key}`);
                if (input) input.setAttribute("aria-invalid", "true");
                const errorEl = form.querySelector(`[data-error-for="${key}"]`);
                if (errorEl) errorEl.textContent = message;
            }
            const banner = container.querySelector("#podaEpisodeError");
            banner.textContent = "A few fields still need attention before this episode can be created.";
            banner.hidden = false;
            banner.scrollIntoView({ block: "center" });
            return;
        }
        // Project the form's mock fields onto the donor's detail model,
        // exactly as the pre-transfer form did: showNotes → showNotesHtml,
        // enclosure URL → media.primaryEnclosure, datetime-local → ISO.
        const submitDraft = { ...draft };
        delete submitDraft.showNotes;
        delete submitDraft.enclosureUrl;
        submitDraft.showNotesHtml = draft.showNotes || null;
        submitDraft.scheduledAt =
            draft.status === "scheduled" && draft.scheduledAt ? new Date(draft.scheduledAt).toISOString() : null;
        if (draft.enclosureUrl) {
            submitDraft.media = {
                primaryEnclosure: {
                    url: draft.enclosureUrl,
                    mimeType: "audio/mpeg",
                    lengthBytes: null,
                    durationSeconds: draft.duration,
                    title: null,
                    isDefault: true,
                    bitrate: null,
                    height: null,
                    language: null,
                    rel: null,
                    codecs: null,
                    sources: [{ uri: draft.enclosureUrl, contentType: "audio/mpeg" }],
                },
                alternateEnclosures: [],
            };
        }
        onSubmit?.(submitDraft);
    });
}

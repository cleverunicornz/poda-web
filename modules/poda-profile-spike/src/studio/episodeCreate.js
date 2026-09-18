// Episode creation form — validated single page over the editable-tier episode
// fields (donor EpisodeCreateWizard evidence: basics, audio, guests, notes
// readiness; single page in this slice, guests display-only).

const EP_STYLES = `
.podaEpisodeCreate { font-family: Inter, system-ui, sans-serif; padding: 24px clamp(12px, 4vw, 40px); background: #fffdf9; box-sizing: border-box; flex: 1 1 auto; min-height: 0; overflow-y: auto; }
.podaEpisodeCreate_inner { max-width: 820px; margin: 0 auto; }
.podaEpisodeCreate h1 { margin: 0; font-size: 26px; color: #332216; }
.podaEpisodeCreate .hint { color: #6b5142; font-size: 13px; margin: 6px 0 18px; }
.podaEpisodeCreate fieldset { background: #fff; border: 1px solid #e2c4aa; border-radius: 16px; padding: 18px 20px; margin: 0 0 16px; box-shadow: 0 4px 14px #33221614; }
.podaEpisodeCreate legend { font-size: 13px; font-weight: 700; color: #743719; padding: 0 8px; }
.podaEpisodeCreate label { display: block; font-size: 12px; font-weight: 600; color: #563522; margin: 12px 0 4px; }
.podaEpisodeCreate input[type="text"], .podaEpisodeCreate input[type="url"], .podaEpisodeCreate input[type="number"], .podaEpisodeCreate input[type="datetime-local"], .podaEpisodeCreate textarea, .podaEpisodeCreate select { width: 100%; box-sizing: border-box; padding: 9px 12px; border: 1px solid #e2c4aa; border-radius: 10px; background: #fffdf9; color: #332216; font-size: 14px; font-family: inherit; }
.podaEpisodeCreate textarea { min-height: 90px; resize: vertical; }
.podaEpisodeCreate input:focus, .podaEpisodeCreate textarea:focus, .podaEpisodeCreate select:focus { outline: 2px solid #f9ba51; outline-offset: 1px; }
.podaEpisodeCreate .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
.podaEpisodeCreate .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 14px; }
.podaEpisodeCreate .error { color: #b3261e; font-size: 12px; margin: 4px 0 0; }
.podaEpisodeCreate input[aria-invalid="true"], .podaEpisodeCreate select[aria-invalid="true"] { border-color: #b3261e; }
.podaEpisodeCreate_actions { display: flex; gap: 10px; margin-top: 20px; }
.podaEpisodeCreate_save { border: none; padding: 11px 20px; border-radius: 10px; background: linear-gradient(120deg, #f9ba51, #efa43e); color: #332216; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 5px 14px #33221626; }
.podaEpisodeCreate_cancel { padding: 11px 20px; border-radius: 10px; border: 1px solid #c9a58a; background: #fff; color: #563522; font-size: 14px; cursor: pointer; }
.podaEpisodeCreate_notice { margin-top: 16px; padding: 10px 12px; border-radius: 10px; border: 1px solid #f9c66b; background: #fff8e8; color: #743719; font-size: 12px; }
@media (max-width: 700px) { .podaEpisodeCreate .grid2, .podaEpisodeCreate .grid3 { grid-template-columns: 1fr; } }
`;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Pure validation — covered by contract tests.
export function validateEpisodeDraft(draft) {
    const errors = {};
    if (!draft.podcastId) errors.podcastId = "Pick a podcast.";
    if (!draft.title?.trim()) errors.title = "Title is required.";
    if (draft.slug && !SLUG_PATTERN.test(draft.slug.trim())) errors.slug = "Slug must be lowercase letters, numbers, and hyphens.";
    if (draft.duration != null && (!Number.isFinite(draft.duration) || draft.duration <= 0)) errors.duration = "Duration must be a positive number of seconds.";
    if (draft.episodeNumber != null && !Number.isInteger(draft.episodeNumber)) errors.episodeNumber = "Episode number must be a whole number.";
    if (draft.seasonNumber != null && !Number.isInteger(draft.seasonNumber)) errors.seasonNumber = "Season number must be a whole number.";
    if (draft.status === "scheduled" && !draft.scheduledAt) errors.scheduledAt = "Scheduled episodes need a date and time.";
    if (draft.enclosureUrl && !/^https?:\/\//.test(draft.enclosureUrl)) errors.enclosureUrl = "URLs must start with http(s)://";
    return errors;
}

function esc(value) {
    return String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

export function renderEpisodeCreateView(container, { podcasts, onSubmit, onCancel }) {
    const podcastOptions = podcasts
        .map((p) => `<option value="${esc(p.id)}">${esc(p.title)}${p.status === "draft" ? " (draft)" : ""}</option>`)
        .join("");

    container.innerHTML = `<style>${EP_STYLES}</style><div class="podaEpisodeCreate"><div class="podaEpisodeCreate_inner">
        <h1>New episode</h1>
        <p class="hint">Session-only mock — the episode appears in this session's collections; reload discards it.</p>
        <form id="podaEpisodeCreateForm" novalidate>
            <fieldset><legend>Basics</legend>
                <label for="epPodcast">Podcast *</label>
                <select id="epPodcast" name="epPodcast"><option value="">Choose a podcast…</option>${podcastOptions}</select>
                <div class="grid2">
                    <div><label for="epTitle">Title *</label><input id="epTitle" name="epTitle" type="text" placeholder="Systems that do not collapse" /></div>
                    <div><label for="epSlug">Slug</label><input id="epSlug" name="epSlug" type="text" placeholder="systems-that-do-not-collapse" /></div>
                </div>
                <label for="epDescription">Description</label>
                <textarea id="epDescription" name="epDescription" placeholder="What happens in this episode?"></textarea>
                <label for="epShowNotes">Show notes (HTML allowed, mock)</label>
                <textarea id="epShowNotes" name="epShowNotes" placeholder="<p>…</p>"></textarea>
            </fieldset>
            <fieldset><legend>Identity</legend>
                <div class="grid3">
                    <div><label for="epSeason">Season number</label><input id="epSeason" name="epSeason" type="number" min="1" placeholder="3" /></div>
                    <div><label for="epNumber">Episode number</label><input id="epNumber" name="epNumber" type="number" min="1" placeholder="42" /></div>
                    <div><label for="epDuration">Duration (seconds)</label><input id="epDuration" name="epDuration" type="number" min="1" placeholder="2745" /></div>
                </div>
            </fieldset>
            <fieldset><legend>Audio</legend>
                <label for="epEnclosure">Enclosure URL (mock)</label>
                <input id="epEnclosure" name="epEnclosure" type="url" placeholder="https://cdn.example.com/ep43/episode.mp3" />
            </fieldset>
            <fieldset><legend>Publication</legend>
                <div class="grid2">
                    <div><label for="epStatus">Status</label>
                        <select id="epStatus" name="epStatus">
                            <option value="draft" selected>Draft</option><option value="scheduled">Scheduled</option>
                        </select></div>
                    <div><label for="epScheduledAt">Scheduled for (when scheduled)</label><input id="epScheduledAt" name="epScheduledAt" type="datetime-local" /></div>
                </div>
            </fieldset>
            <div class="podaEpisodeCreate_actions">
                <button class="podaEpisodeCreate_save" type="submit">Create episode</button>
                <button class="podaEpisodeCreate_cancel" type="button" id="epCreateCancel">Cancel</button>
            </div>
            <div class="podaEpisodeCreate_notice">Mock data only — nothing is sent anywhere. Guests stay display-only in this slice.</div>
        </form>
    </div></div>`;

    container.querySelector("#epCreateCancel").addEventListener("click", () => onCancel?.());
    container.querySelector("#podaEpisodeCreateForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const numOrNull = (key) => {
            const v = String(data.get(key) ?? "").trim();
            if (!v) return null;
            const n = Number(v);
            return Number.isNaN(n) ? Number.NaN : n;
        };
        const scheduledRaw = String(data.get("epScheduledAt") ?? "").trim();
        const draft = {
            podcastId: String(data.get("epPodcast") ?? ""),
            title: String(data.get("epTitle") ?? "").trim(),
            slug: String(data.get("epSlug") ?? "").trim(),
            description: String(data.get("epDescription") ?? "").trim(),
            showNotesHtml: String(data.get("epShowNotes") ?? "").trim() || null,
            seasonNumber: numOrNull("epSeason"),
            episodeNumber: numOrNull("epNumber"),
            duration: numOrNull("epDuration"),
            status: data.get("epStatus") ?? "draft",
            scheduledAt: scheduledRaw ? new Date(scheduledRaw).toISOString() : null,
            enclosureUrl: String(data.get("epEnclosure") ?? "").trim(),
        };
        const validation = validateEpisodeDraft(draft);
        form.querySelectorAll("[aria-invalid=true]").forEach((el) => el.removeAttribute("aria-invalid"));
        form.querySelectorAll(".error").forEach((el) => el.remove());
        if (Object.keys(validation).length) {
            const fieldMap = {
                podcastId: "epPodcast",
                title: "epTitle",
                slug: "epSlug",
                duration: "epDuration",
                episodeNumber: "epNumber",
                seasonNumber: "epSeason",
                scheduledAt: "epScheduledAt",
                enclosureUrl: "epEnclosure",
            };
            for (const [key, message] of Object.entries(validation)) {
                const input = form.querySelector(`#${fieldMap[key] ?? key}`);
                if (!input) continue;
                input.setAttribute("aria-invalid", "true");
                const p = document.createElement("p");
                p.className = "error";
                p.textContent = message;
                input.insertAdjacentElement("afterend", p);
            }
            return;
        }
        // Map the form's enclosure mock onto the donor's media model.
        const submitDraft = { ...draft };
        delete submitDraft.enclosureUrl;
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

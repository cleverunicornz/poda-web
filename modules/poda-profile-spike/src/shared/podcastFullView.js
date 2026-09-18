// Full podcast + episode view — framework-free, shared by module and widget
// hosts. Renders the complete donor inventory INCLUDING the hidden internals
// (provenance, currentness, feed diagnostics, channel extras), made visible
// for review per maintainer choice. Mock data only.

const POD_STYLES = `
.podaStudio { font-family: Inter, system-ui, sans-serif; padding: 24px clamp(12px, 4vw, 40px); background: #fffdf9; box-sizing: border-box; height: 100%; overflow-y: auto; }
.podaStudio_hero { display: flex; gap: 22px; align-items: flex-start; margin-bottom: 22px; }
.podaStudio_cover { width: 128px; height: 128px; border-radius: 18px; border: 1px solid #e2c4aa; background: radial-gradient(circle, #f9ba51 0%, #efb855 61%, #e5793e 100%); color: #fff; font-size: 40px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 24px #33221626; }
.podaStudio_title { margin: 4px 0 2px; font-size: 28px; color: #332216; }
.podaStudio_tagline { margin: 0; color: #6b5142; font-size: 14px; }
.podaStudio_badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.podaStudio_badge { padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #ffebc7; color: #743719; }
.podaStudio_badge--green { background: #d9f0e4; color: #006052; }
.podaStudio_badge--muted { background: #f7f1eb; color: #6b5142; }
.podaStudio_section { margin-top: 24px; background: #fff; border: 1px solid #e2c4aa; border-radius: 16px; padding: 20px 22px; box-shadow: 0 4px 14px #33221614; }
.podaStudio_section--internals { background: #fff8e8; border-style: dashed; }
.podaStudio_section h3 { margin: 0 0 12px; font-size: 16px; color: #332216; }
.podaStudio_section h3 .note { font-size: 11px; font-weight: 600; color: #8e7463; margin-left: 8px; }
.podaStudio_row { display: flex; justify-content: space-between; gap: 14px; padding: 7px 0; border-bottom: 1px solid #f4e7d8; font-size: 13px; }
.podaStudio_row:last-child { border-bottom: none; }
.podaStudio_row b { color: #563522; font-weight: 600; flex-shrink: 0; }
.podaStudio_row span { color: #332216; text-align: right; word-break: break-word; font-family: ui-monospace, monospace; font-size: 12px; }
.podaStudio_row span.plain { font-family: inherit; }
.podaStudio_muted { color: #6b5142; font-size: 13px; line-height: 1.55; margin: 0 0 8px; }
.podaStudio_pill { display: inline-block; margin: 0 6px 6px 0; padding: 4px 10px; border-radius: 999px; background: #ffebc7; color: #743719; font-size: 12px; font-weight: 600; }
.podaStudio_grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
.podaStudio_mini { border: 1px solid #e2c4aa; border-radius: 12px; padding: 14px; background: #fffdf9; }
.podaStudio_mini h4 { margin: 0 0 6px; font-size: 14px; color: #332216; }
.podaStudio_mini p, .podaStudio_mini li { margin: 0; font-size: 13px; color: #6b5142; line-height: 1.5; }
.podaStudio_mini ul { margin: 0; padding-left: 18px; }
.podaStudio_ep { border: 1px solid #e2c4aa; border-radius: 12px; padding: 14px 16px; margin-bottom: 10px; background: #fffdf9; }
.podaStudio_ep summary { cursor: pointer; display: flex; gap: 10px; align-items: baseline; font-size: 14px; color: #332216; font-weight: 600; }
.podaStudio_ep summary .meta { font-weight: 400; color: #8e7463; font-size: 12px; }
.podaStudio_epBody { margin-top: 12px; }
.podaStudio_quote { border-left: 3px solid #f9ba51; padding: 4px 0 4px 14px; margin: 0; }
.podaStudio_quote p { margin: 0 0 4px; font-size: 13px; color: #332216; font-style: italic; }
.podaStudio_quote span { font-size: 12px; color: #8e7463; }
.podaStudio_stat { font-size: 26px; font-weight: 800; color: #332216; }
.podaStudio_statLabel { font-size: 12px; color: #8e7463; }
.podaStudio_empty { color: #a58e7f; font-size: 13px; font-style: italic; }
`;

function esc(value) {
    return String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}
function row(label, value, { mono = true } = {}) {
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && !value.length)) return "";
    const v = Array.isArray(value) ? value.join(", ") : typeof value === "object" ? JSON.stringify(value) : String(value);
    return `<div class="podaStudio_row"><b>${esc(label)}</b><span class="${mono ? "" : "plain"}">${esc(v)}</span></div>`;
}
function fmtDate(d) {
    return d ? String(d).slice(0, 16).replace("T", " ") + "Z" : null;
}
function fmtDuration(seconds) {
    if (seconds == null) return null;
    const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60);
    return h ? `${h}h ${m}m` : `${m}m`;
}
function fmtBytes(bytes) {
    if (bytes == null) return null;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function badges(p) {
    const b = [];
    b.push(p.status === "published" ? `<span class="podaStudio_badge--green podaStudio_badge">Published</span>` : `<span class="podaStudio_badge--muted podaStudio_badge">${esc(p.status)}</span>`);
    b.push(p.isPublic ? `<span class="podaStudio_badge--green podaStudio_badge">Public</span>` : `<span class="podaStudio_badge--muted podaStudio_badge">Members only</span>`);
    if (p.showType) b.push(`<span class="podaStudio_badge--muted podaStudio_badge">${esc(p.showType)}</span>`);
    if (p.channel?.medium) b.push(`<span class="podaStudio_badge">${esc(p.channel.medium)}</span>`);
    if (p.explicit === false) b.push(`<span class="podaStudio_badge--muted podaStudio_badge">Clean</span>`);
    return b.join("");
}

function section(title, note, inner) {
    return `<section class="podaStudio_section"><h3>${esc(title)}${note ? `<span class="note">${esc(note)}</span>` : ""}</h3>${inner}</section>`;
}

function podcastSections(p) {
    const ch = p.channel ?? {};
    const out = [];

    out.push(section("Details", "editable tier", [
        row("Author", p.author, { mono: false }),
        row("Owner email", p.ownerEmail, { mono: false }),
        row("Slug", p.slug),
        row("Language", p.language),
        row("Categories", p.categories, { mono: false }),
        row("Website", p.websiteUrl),
        row("Trailer URL", p.trailerUrl),
        row("Custom fields", (p.customFields ?? []).map((f) => `${f.name}: ${f.value}`), { mono: false }),
    ].join("")));

    out.push(section("Podcasting 2.0 channel", "namespace coverage", [
        row("guid", ch.guid),
        row("medium", ch.medium),
        row("locked", ch.locked ? `${ch.locked.locked ? "locked" : "unlocked"} · owner ${ch.locked.owner}` : null),
        row("license", ch.license ? `${ch.license.identifierOrText} (${ch.license.url ?? "no url"})` : null, { mono: false }),
        row("updateFrequency", ch.updateFrequency ? `${ch.updateFrequency.text} · rrule ${ch.updateFrequency.rrule ?? "—"}` : null, { mono: false }),
        row("funding", (ch.funding ?? []).map((f) => `${f.title ?? "link"}: ${f.url}`), { mono: false }),
        row("persons", (ch.persons ?? []).map((pp) => `${pp.name} (${pp.role ?? "no role"}${pp.group ? `, ${pp.group}` : ""})`), { mono: false }),
        row("trailers", (ch.trailers ?? []).map((t) => `${t.title} (${fmtBytes(t.lengthBytes) ?? "size n/a"})`), { mono: false }),
        row("locations", (ch.locations ?? []).map((l) => `${l.name}${l.geo ? ` · ${l.geo}` : ""}`), { mono: false }),
        row("socialInteract", (ch.socialInteracts ?? []).map((s) => `${s.protocol}: ${s.accountId ?? s.uri}`), { mono: false }),
        row("txt", (ch.txt ?? []).map((t) => `${t.purpose ?? "plain"}: ${t.value}`)),
        row("publisher", ch.publisher ? `${ch.publisher.remoteItem.title} (${ch.publisher.remoteItem.feedUrl})` : null, { mono: false }),
        ch.value?.length ? `<p class="podaStudio_muted"><strong>Value block (display-only)</strong> — requires a real wallet backend.</p>` +
            ch.value.map((v) => row(`value ${v.type}/${v.method}`, `${v.suggested ?? "no suggestion"} · recipients: ${(v.recipients ?? []).map((r) => `${r.name ?? r.address.slice(0, 12)}… ${r.split}%${r.fee ? " (fee)" : ""}`).join("; ")}`, { mono: false })).join("") : "",
    ].join("")));

    out.push(section("Guest booking", "display-only tier", [
        row("Booking URL", p.bookingUrl),
        `<div class="podaStudio_grid">
            <div class="podaStudio_mini"><h4>Ideal guest</h4><p>${esc(p.idealGuest?.description ?? "")}</p>
                <ul>${(p.idealGuest?.topics ?? []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
                <ul>${(p.idealGuest?.qualities ?? []).map((q) => `<li>${esc(q)}</li>`).join("")}</ul></div>
            <div class="podaStudio_mini"><h4>Guest requirements</h4>
                <ul>${(p.guestRequirements?.equipment ?? []).map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
                <p>${esc(p.guestRequirements?.preparation ?? "")}</p>
                <p>${esc(p.guestRequirements?.scheduling ?? "")}</p>
                <ul>${(p.guestRequirements?.other ?? []).map((o) => `<li>${esc(o)}</li>`).join("")}</ul></div>
        </div>`,
    ].join("")));

    const stats = p.audienceStats ?? {};
    out.push(section("Audience stats", "feeds mock Analytics", `
        <div class="podaStudio_grid">
            <div class="podaStudio_mini"><div class="podaStudio_stat">${stats.monthlyListeners?.toLocaleString() ?? "—"}</div><div class="podaStudio_statLabel">Monthly listeners</div></div>
            <div class="podaStudio_mini"><div class="podaStudio_stat">${stats.totalDownloads?.toLocaleString() ?? "—"}</div><div class="podaStudio_statLabel">Total downloads</div></div>
            <div class="podaStudio_mini"><div class="podaStudio_stat">${stats.avgEpisodeDownloads?.toLocaleString() ?? "—"}</div><div class="podaStudio_statLabel">Avg per episode</div></div>
            <div class="podaStudio_mini"><div class="podaStudio_stat">${(stats.topCountries ?? []).join(" · ") || "—"}</div><div class="podaStudio_statLabel">Top countries</div></div>
        </div>
        <p class="podaStudio_muted" style="margin-top:10px">${esc(stats.demographics ?? "")}</p>`));

    out.push(section("Testimonials & media kit", "display-only tier", [
        (p.testimonials ?? []).map((t) => `<blockquote class="podaStudio_quote"><p>“${esc(t.quote)}”</p><span>${esc(t.name)} — ${esc(t.role)}</span></blockquote>`).join(""),
        (p.mediaKit ?? []).map((m) => row(`${m.name}`, `${m.type}${m.size ? ` · ${fmtBytes(m.size)}` : ""}`)).join(""),
    ].join("")));
    return out;
}

function internalsSection(p) {
    const rows = [
        row("id", p.id),
        row("orgId", p.orgId),
        row("rssFeedUrl", p.rssFeedUrl),
        row("sectionVisibility", p.sectionVisibility),
        row("provenance", p.provenance ? `${p.provenance.mode}/${p.provenance.kind ?? "—"} · sourceEntryId ${p.provenance.sourceEntryId ?? "—"} · podcastGuid ${p.provenance.podcastGuid ?? "—"}` : null),
        row("currentness.canonicalAt", fmtDate(p.currentness?.canonicalAt)),
        row("currentness.activityFreshnessAt", fmtDate(p.currentness?.activityFreshnessAt)),
        row("currentness.internalizedAt", fmtDate(p.currentness?.internalizedAt)),
        row("currentness.externalizedAt", fmtDate(p.currentness?.externalizedAt)),
        row("feedDiagnostics.rssFeedStatus", p.feedDiagnostics?.rssFeedStatus),
        row("canonicalValidation", p.feedDiagnostics?.canonicalValidation ? `${p.feedDiagnostics.canonicalValidation.status} · warnings: ${(p.feedDiagnostics.canonicalValidation.warnings ?? []).join("; ") || "none"} · errors: ${(p.feedDiagnostics.canonicalValidation.errors ?? []).join("; ") || "none"}` : null, { mono: false }),
        row("channel.blocks", p.channel?.blocks ?? [], { mono: false }),
        row("channel.podping", p.channel?.podping?.value === false ? "disabled" : p.channel?.podping?.value),
        row("channel.liveItems", p.channel?.liveItems?.length ? p.channel.liveItems.length : "none", { mono: false }),
        row("channel.remoteItems", p.channel?.remoteItems?.length ? p.channel.remoteItems.length : "none", { mono: false }),
        row("channel.podroll", p.channel?.podroll ?? "none", { mono: false }),
        row("createdAt", fmtDate(p.createdAt)),
        row("updatedAt", fmtDate(p.updatedAt)),
    ].join("");
    return `<section class="podaStudio_section podaStudio_section--internals"><h3>Internals (hidden, made visible)<span class="note">not user-facing in product</span></h3>${rows}</section>`;
}

function episodeCard(ep) {
    const it = ep.item ?? {};
    const media = ep.media ?? {};
    const guests = (ep.guests ?? []).map((g) =>
        row(`${g.name} (${g.role ?? "guest"})`, `${g.displayClass?.replaceAll("_", " ") ?? "unclassified"} · ${g.partyKind ?? "—"} · ${g.ctaLabel ?? "no cta"}`, { mono: false })).join("");
    const enc = (e, label) => e ? row(label, `${e.title ?? e.mimeType ?? "enclosure"} · ${e.url}`, { mono: false }) +
        row("  details", [`${fmtBytes(e.lengthBytes) ?? "?"}`, `${fmtDuration(e.durationSeconds) ?? "?"}`, e.bitrate ? `${e.bitrate}kbps` : null, e.codecs, e.language, e.isDefault ? "default" : null].filter(Boolean).join(" · "), { mono: false }) +
        row("  sources", (e.sources ?? []).map((s) => s.uri).join(" | ")) : "";
    return `<details class="podaStudio_ep"><summary>
        ${esc(ep.title)} <span class="meta">S${ep.seasonNumber ?? "?"}E${ep.episodeNumber ?? "?"} · ${esc(ep.status ?? "?")}${ep.scheduledAt ? ` · scheduled ${esc(fmtDate(ep.scheduledAt))}` : ""}${ep.publishedAt ? ` · ${esc(fmtDate(ep.publishedAt))}` : ""}</span>
    </summary><div class="podaStudio_epBody">
        ${row("description", ep.description, { mono: false })}
        ${row("showNotesHtml", ep.showNotesHtml)}
        ${row("slug", ep.slug)}
        ${row("duration", fmtDuration(ep.duration))}
        ${row("item.persons", (it.persons ?? []).map((pp) => `${pp.name} (${pp.role ?? "—"})`), { mono: false })}
        ${row("item.transcripts", (it.transcripts ?? []).map((t) => `${t.url} (${t.mimeType}, ${t.language ?? "?"}, ${t.rel ?? "—"})`))}
        ${row("item.chapters", it.chapters ? `${it.chapters.url} (${it.chapters.mimeType})` : null)}
        ${row("item.soundbites", (it.soundbites ?? []).map((s) => `“${s.title}” @${s.startTime}s for ${s.duration}s`), { mono: false })}
        ${row("item.license", it.license ? `${it.license.identifierOrText} (${it.license.url ?? "—"})` : null, { mono: false })}
        ${enc(media.primaryEnclosure, "primary enclosure")}
        ${(media.alternateEnclosures ?? []).map((e) => enc(e, "alternate enclosure")).join("")}
        ${guests ? `<p class="podaStudio_muted"><strong>Guests</strong> (appearance display classes)</p>${guests}` : row("guests", "none", { mono: false })}
        ${row("provenance", ep.provenance ? `${ep.provenance.mode}/${ep.provenance.kind ?? "—"}` : null)}
        ${row("currentness", `canonical ${fmtDate(ep.currentness?.canonicalAt) ?? "—"} · fresh ${fmtDate(ep.currentness?.activityFreshnessAt) ?? "—"}`, { mono: false })}
        ${row("created / updated", `${fmtDate(ep.createdAt) ?? "—"} / ${fmtDate(ep.updatedAt) ?? "—"}`, { mono: false })}
    </div></details>`;
}

export function renderStudioView(container, { podcast, episodes, hostLabel }) {
    const hero = `
        <div class="podaStudio_hero">
            <div class="podaStudio_cover" aria-hidden="true">${esc(podcast.title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase())}</div>
            <div style="min-width:0">
                <h2 class="podaStudio_title">${esc(podcast.title)}</h2>
                <p class="podaStudio_tagline">${esc(podcast.tagline ?? "")}</p>
                <div class="podaStudio_badges">${badges(podcast)}</div>
                <p class="podaStudio_muted" style="margin-top:10px">${esc(podcast.description ?? "")}</p>
            </div>
        </div>`;
    const epSection = section("Episodes", `${episodes.length} in mock`, episodes.length
        ? episodes.map(episodeCard).join("")
        : `<p class="podaStudio_empty">No episodes yet.</p>`);
    container.innerHTML = `<style>${POD_STYLES}</style><div class="podaStudio" data-host="${esc(hostLabel)}">
        ${hero}
        ${podcastSections(podcast).join("")}
        ${epSection}
        ${internalsSection(podcast)}
    </div>`;
}

// Episode detail page: the same episode inventory expanded, wrapped in the
// studio page chrome, for the Episodes collection's detail route.
export function renderEpisodeDetailView(container, episode) {
    const holder = document.createElement("div");
    holder.innerHTML = episodeCard(episode);
    const details = holder.firstElementChild;
    details.open = true;
    container.innerHTML = `<style>${POD_STYLES}</style><div class="podaStudio" data-host="module (app page)">
        <div class="podaStudio_hero">
            <div class="podaStudio_cover" aria-hidden="true">EP</div>
            <div style="min-width:0">
                <h2 class="podaStudio_title">${esc(episode.title)}</h2>
                <p class="podaStudio_tagline">S${episode.seasonNumber ?? "?"}E${episode.episodeNumber ?? "?"} · ${esc(episode.status ?? "?")}</p>
            </div>
        </div>
        <section class="podaStudio_section"><h3>Episode inventory</h3><div data-episode-detail></div></section>
    </div>`;
    container.querySelector("[data-episode-detail]").appendChild(details);
}

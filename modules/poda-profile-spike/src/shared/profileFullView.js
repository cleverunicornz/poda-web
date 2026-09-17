// Full creator-profile view — framework-free, shared by the module host and
// the widget host. Renders the complete donor inventory: banner/hero, status
// and visibility badges, about, topics, socials, expertise cards, custom
// fields, booking, media kit, testimonials, featured appearances, best fit.

const FULL_STYLES = `
.podaFullProfile { font-family: Inter, system-ui, sans-serif; max-width: 860px; margin: 0 auto; }
.podaFullProfile_banner { height: 140px; border-radius: 18px 18px 0 0; background: radial-gradient(circle at 30% 20%, #f9ba51 0%, #efb855 45%, #e5793e 100%); position: relative; }
.podaFullProfile_card { background: #fff; border: 1px solid #e2c4aa; border-top: none; border-radius: 0 0 18px 18px; padding: 0 28px 28px; box-shadow: 0 8px 24px #33221626; }
.podaFullProfile_heroRow { display: flex; gap: 18px; align-items: flex-end; margin-top: -44px; }
.podaFullProfile_avatar { width: 96px; height: 96px; border-radius: 20px; border: 4px solid #fff; background: radial-gradient(circle, #f9ba51 0%, #efb855 61%, #e5793e 100%); color: #fff; font-size: 34px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.podaFullProfile_names { padding-top: 52px; min-width: 0; }
.podaFullProfile_name { margin: 0; font-size: 26px; color: #332216; }
.podaFullProfile_headline { margin: 2px 0 0; color: #6b5142; font-size: 14px; }
.podaFullProfile_badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.podaFullProfile_badge { padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #ffebc7; color: #743719; }
.podaFullProfile_badge--muted { background: #f7f1eb; color: #6b5142; }
.podaFullProfile_badge--green { background: #d9f0e4; color: #006052; }
.podaFullProfile_section { margin-top: 26px; }
.podaFullProfile_section h3 { margin: 0 0 10px; font-size: 16px; color: #332216; }
.podaFullProfile_section h3 .vis { font-size: 11px; font-weight: 600; color: #8e7463; margin-left: 8px; }
.podaFullProfile_muted { color: #6b5142; font-size: 14px; line-height: 1.55; margin: 0; }
.podaFullProfile_pill { display: inline-block; margin: 0 6px 6px 0; padding: 4px 10px; border-radius: 999px; background: #ffebc7; color: #743719; font-size: 12px; font-weight: 600; }
.podaFullProfile_row { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f4e7d8; font-size: 13px; }
.podaFullProfile_row b { color: #563522; font-weight: 600; }
.podaFullProfile_row span { color: #332216; text-align: right; word-break: break-word; }
.podaFullProfile_grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.podaFullProfile_mini { border: 1px solid #e2c4aa; border-radius: 12px; padding: 14px; background: #fffdf9; }
.podaFullProfile_mini h4 { margin: 0 0 6px; font-size: 14px; color: #332216; }
.podaFullProfile_mini p { margin: 0; font-size: 13px; color: #6b5142; line-height: 1.5; }
.podaFullProfile_quote { border-left: 3px solid #f9ba51; padding: 4px 0 4px 14px; margin: 0 0 12px; }
.podaFullProfile_quote p { margin: 0 0 4px; font-size: 13px; color: #332216; font-style: italic; }
.podaFullProfile_quote span { font-size: 12px; color: #8e7463; }
.podaFullProfile_empty { color: #a58e7f; font-size: 13px; font-style: italic; }
.podaFullProfile_eyebrow { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #a58e7f; margin: 0 0 4px; }
.podaFullProfile_link { color: #006052; }
.podaFullProfile_footer { margin-top: 24px; font-size: 11px; color: #a58e7f; }
`;

function esc(value) {
    return String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function initials(name) {
    return (name || "?").split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

function statusBadge(p) {
    const status = p.profileStatus === "published" ? `<span class="podaFullProfile_badge--green podaFullProfile_badge">Published</span>` : `<span class="podaFullProfile_badge--muted podaFullProfile_badge">Draft</span>`;
    const vis = p.isPublic ? `<span class="podaFullProfile_badge--green podaFullProfile_badge">Public</span>` : `<span class="podaFullProfile_badge--muted podaFullProfile_badge">Members only</span>`;
    return status + vis + (p.slug ? `<span class="podaFullProfile_badge--muted podaFullProfile_badge">poda.social/${esc(p.slug)}</span>` : "");
}

function section(title, visibility, innerHtml) {
    return `<section class="podaFullProfile_section"><h3>${esc(title)}${visibility ? `<span class="vis">${esc(visibility)}</span>` : ""}</h3>${innerHtml}</section>`;
}

function emptyNote(text) {
    return `<p class="podaFullProfile_empty">${esc(text)}</p>`;
}

export function fullProfileMarkup(profile, { showAll = true } = {}) {
    const sv = profile.sectionVisibility ?? {};
    const parts = [];

    parts.push(`
        <div class="podaFullProfile_banner" role="presentation"></div>
        <div class="podaFullProfile_card">
            <div class="podaFullProfile_heroRow">
                <div class="podaFullProfile_avatar" aria-hidden="true">${esc(initials(profile.displayName))}</div>
                <div class="podaFullProfile_names">
                    <h2 class="podaFullProfile_name">${esc(profile.displayName || "Unnamed creator")}</h2>
                    <p class="podaFullProfile_headline">${esc(profile.headline || "No headline yet")}</p>
                    <p class="podaFullProfile_headline"><em>${esc(profile.tagline || "")}</em></p>
                    <div class="podaFullProfile_badges">${statusBadge(profile)}</div>
                </div>
            </div>
    `);

    parts.push(section("About", sv.about ?? "public", `
        ${profile.aboutShort ? `<p class="podaFullProfile_muted"><strong>${esc(profile.aboutShort)}</strong></p>` : emptyNote("No short intro yet.")}
        ${profile.bio ? `<p class="podaFullProfile_muted" style="margin-top:8px">${esc(profile.bio)}</p>` : emptyNote("No bio yet.")}
    `));

    parts.push(section("Topics", sv.topics ?? "public", profile.topics?.length
        ? profile.topics.map((t) => `<span class="podaFullProfile_pill">${esc(t)}</span>`).join("")
        : emptyNote("No topics set — add some in Edit.")));

    const ALL_SERVICES = ["website", "linkedin", "twitter", "youtube", "instagram", "tiktok", "calendly"];
    const socialRows = ALL_SERVICES.map((svc) => {
        const v = profile.socialLinks?.[svc];
        return `<div class="podaFullProfile_row"><b>${esc(svc)}</b><span class="${v ? "podaFullProfile_link" : "podaFullProfile_empty"}">${v ? esc(v) : "not set"}</span></div>`;
    }).join("");
    parts.push(section("Links", sv.links ?? "public", socialRows));

    if (showAll) {
        parts.push(section("Expertise cards", sv.expertiseCards ?? "public", profile.expertiseCards?.length
            ? `<div class="podaFullProfile_grid">${profile.expertiseCards.map((c) => `<div class="podaFullProfile_mini"><h4>${esc(c.title)}${c.icon ? ` <span class="podaFullProfile_empty" style="font-size:11px">icon: ${esc(c.icon)} · order ${c.order}</span>` : ""}</h4><p>${esc(c.description)}</p></div>`).join("")}</div>`
            : emptyNote("No expertise cards yet.")));

        parts.push(section("Custom fields", sv.customFields ?? "public", profile.customFields?.length
            ? profile.customFields.map((f) => `<div class="podaFullProfile_row"><b>${esc(f.name)}</b><span>${esc(f.value)}</span></div>`).join("")
            : emptyNote("No custom fields yet.")));

        parts.push(section("Booking", sv.booking ?? "public", profile.bookingUrl
            ? `<div class="podaFullProfile_row"><b>Book a call</b><span class="podaFullProfile_link">${esc(profile.bookingUrl)}</span></div>`
            : emptyNote("No booking link set.")));

        parts.push(section("Media kit", sv.mediaKit ?? "public", profile.mediaKit?.length
            ? profile.mediaKit.map((m) => `<div class="podaFullProfile_row"><b>${esc(m.name)}</b><span>${esc(m.type)}${m.size ? ` · ${(m.size / 1024 / 1024).toFixed(1)} MB` : ""}${m.filename ? ` · ${esc(m.filename)}` : ""}${m.mimeType ? ` · ${esc(m.mimeType)}` : ""}</span></div><div class="podaFullProfile_row"><b></b><span class="podaFullProfile_link">${esc(m.url)}</span></div>`).join("")
            : emptyNote("No media kit items.")));

        parts.push(section("Testimonials", sv.testimonials ?? "public", profile.testimonials?.length
            ? profile.testimonials.map((t) => `<blockquote class="podaFullProfile_quote"><p>“${esc(t.quote)}”</p><span>${esc(t.name)} — ${esc(t.role)}${t.avatarUrl ? ` · avatar: ${esc(t.avatarUrl)}` : " · no avatar"}</span></blockquote>`).join("")
            : emptyNote("No testimonials yet.")));

        parts.push(section("Featured appearances", sv.appearances ?? "public", profile.featuredAppearances?.length
            ? profile.featuredAppearances.map((a) => `<div class="podaFullProfile_row"><b>${esc(a.podcastName ?? "")}</b><span>${esc(a.episodeTitle ?? "")}${a.date ? ` · ${esc(a.date)}` : ""}${a.displayClass ? ` · ${esc(a.displayClass.replaceAll("_", " "))}` : ""}</span></div><div class="podaFullProfile_row"><b></b><span class="podaFullProfile_link">${a.url ? esc(a.url) : "no url"}</span></div>`).join("")
            : emptyNote("No featured appearances yet.")));
        parts.push(section("Best fit", sv.bestFitFor ?? "public", `
            ${profile.appearanceCount ? `<p class="podaFullProfile_muted">${profile.appearanceCount} appearances</p>` : ""}
            ${profile.bestFitFor?.length ? profile.bestFitFor.map((t) => `<span class="podaFullProfile_pill">${esc(t)}</span>`).join("") : emptyNote("No best-fit topics yet.")}
        `));

        parts.push(section("Intro video", sv.introVideo ?? "public", profile.introVideoUrl
            ? `<div class="podaFullProfile_row"><b>Intro video</b><span class="podaFullProfile_link">${esc(profile.introVideoUrl)}</span></div>`
            : emptyNote("No intro video set.")));

        parts.push(`<div class="podaFullProfile_footer">${profile.createdAt ? `Created ${esc(profile.createdAt.slice(0, 10))}` : "Not created yet"}${profile.updatedAt ? ` · Updated ${esc(profile.updatedAt.slice(0, 10))}` : ""}</div>`);
    }

    parts.push(`</div>`);
    return parts.join("");
}

export function renderFullProfileView(container, { profile, hostLabel, extraActionsHtml = "" }) {
    container.innerHTML = `
        <style>${FULL_STYLES}</style>
        <div class="podaFullProfile" data-host="${esc(hostLabel)}">
            ${fullProfileMarkup(profile)}
            ${extraActionsHtml}
        </div>`;
}

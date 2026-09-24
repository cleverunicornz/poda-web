/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Full creator-profile view — framework-free, shared by the module host and
// the widget host, now wearing the PCC native profile design: publish pill and
// welcome banner, hero with avatar tile + topic chips + visibility segmented
// control, content sections, and the right rail (Your Stats, Share Profile,
// At a Glance). Mock data only.
import { NATIVE_STYLES, esc, initials, icon, noteHtml } from "./nativeTheme.js";
function statusPillProfile(p) {
    return p.profileStatus === "published"
        ? `<span class="pnPublishPill pnPublishPill--published">${icon("eye")} Published</span>`
        : `<span class="pnPublishPill pnPublishPill--draft">${icon("eyeOff")} Draft</span>`;
}

function section(title, visibility, innerHtml, iconName = null) {
    return `<section class="pnSection"><h2>${iconName ? `<span style="display:inline-flex;align-items:center;gap:8px">${icon(iconName)}${esc(title)}</span>` : esc(title)}${visibility && visibility !== "public" ? `<span class="pnVisTag">${esc(visibility)}</span>` : ""}</h2>${innerHtml}</section>`;
}

function emptyNote(text) {
    return `<p class="pnEmptyNote">${esc(text)}</p>`;
}

// Native "At a Glance" checklist: eight strength signals over the profile.
function glance(profile) {
    const checks = [
        ["Photo", Boolean(profile.avatarUrl)],
        ["Headline", Boolean(profile.headline?.trim())],
        ["About", Boolean(profile.aboutShort?.trim() || profile.bio?.trim())],
        ["Topics", Boolean(profile.topics?.length)],
        ["Expertise", Boolean(profile.expertiseCards?.length)],
        ["Appearances", Boolean(profile.featuredAppearances?.length)],
        ["Testimonials", Boolean(profile.testimonials?.length)],
        ["Booking Link", Boolean(profile.bookingUrl)],
    ];
    const done = checks.filter(([, ok]) => ok).length;
    const percent = Math.round((done / checks.length) * 100);
    return { checks, percent };
}

function glanceColor(percent) {
    if (percent >= 80) return "var(--pn-green-500)";
    if (percent >= 50) return "var(--pn-amber-500)";
    return "var(--pn-red-400)";
}

const SOCIAL_ICONS = {
    website: "globe",
    linkedin: "link",
    twitter: "link",
    youtube: "playCircle",
    instagram: "image",
    tiktok: "image",
    calendly: "calendar",
};

export function fullProfileMarkup(profile, { showAll = true, editable = false } = {}) {
    const sv = profile.sectionVisibility ?? {};
    const parts = [];

    const topics = profile.topics ?? [];
    const topicRow = `<div class="pnTopicRow" data-topics>
        ${topics.map((t) => `<span class="pnTopicChip">${esc(t)}${editable ? `<button type="button" data-remove-topic="${esc(t)}" aria-label="Remove topic ${esc(t)}">${icon("x")}</button>` : ""}</span>`).join("")}
        ${editable ? `<button class="pnBtn pnBtn--outline pnBtn--sm" type="button" data-add-topic style="min-height:28px;padding:4px 12px">${icon("plus")} Add Topic</button>` : ""}
    </div>`;

    const socialRow = Object.entries(profile.socialLinks ?? {})
        .filter(([, v]) => v)
        .map(
            ([svc, url]) =>
                `<a href="${esc(url)}" target="_blank" rel="noreferrer" aria-label="${esc(svc)}" title="${esc(svc)}">${icon(SOCIAL_ICONS[svc] ?? "link")}</a>`,
        )
        .join("");

    const visibilityControl = editable
        ? `<div class="pnSegmented" role="group" aria-label="Profile visibility">
            <button type="button" data-tone="amber" data-visibility="members" aria-pressed="${String(!profile.isPublic)}">Members Only</button>
            <button type="button" data-tone="emerald" data-visibility="public" aria-pressed="${String(Boolean(profile.isPublic))}">Public</button>
        </div>`
        : `<div class="pnSegmented" role="group" aria-label="Profile visibility" aria-readonly="true">
            <button type="button" data-tone="amber" aria-pressed="${String(!profile.isPublic)}" disabled style="pointer-events:none">Members Only</button>
            <button type="button" data-tone="emerald" aria-pressed="${String(Boolean(profile.isPublic))}" disabled style="pointer-events:none">Public</button>
        </div>`;

    parts.push(`
        <div class="pnProfileHero">
            <div class="pnAvatar" aria-hidden="true">${profile.avatarUrl ? `<img src="${esc(profile.avatarUrl)}" alt="" />` : esc(initials(profile.displayName))}</div>
            <div style="min-width:0">
                <h2 class="pnProfileName">${esc(profile.displayName || "Your Name")}</h2>
                <p class="pnProfileHeadline">${esc(profile.headline || "Your role & what you're known for")}</p>
                <p class="pnProfileTagline"><em>${esc(profile.tagline || "One sentence that sums up your value to podcast hosts")}</em></p>
                ${topicRow}
                ${socialRow ? `<div class="pnSocialRow">${socialRow}</div>` : ""}
            </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start">
            ${visibilityControl}
            ${!profile.avatarUrl && editable ? `<div style="max-width:384px">${noteHtml("Upload a headshot for credibility")}</div>` : ""}
        </div>
    `);

    parts.push(
        section(
            "About",
            sv.about ?? "public",
            `
        ${!(profile.aboutShort || profile.bio) && editable ? noteHtml("Your about section is the first thing hosts read. Write a 2-3 sentence hook up top, then tell your full story below.") : ""}
        ${profile.aboutShort ? `<p style="margin:0;font-size:16px;line-height:24px"><strong>${esc(profile.aboutShort)}</strong></p>` : editable ? "" : emptyNote("No short intro yet.")}
        ${profile.bio ? `<p class="pnSubtle" style="margin:0;font-size:16px;line-height:24px">${esc(profile.bio)}</p>` : editable ? "" : emptyNote("No bio yet.")}
    `,
        ),
    );

    const ALL_SERVICES = ["website", "linkedin", "twitter", "youtube", "instagram", "tiktok", "calendly"];
    const socialRows = ALL_SERVICES.map((svc) => {
        const v = profile.socialLinks?.[svc];
        return `<div class="pnDefRow"><b>${esc(svc)}</b><span>${v ? esc(v) : "not set"}</span></div>`;
    }).join("");
    parts.push(
        section(
            "Links",
            sv.links ?? "public",
            `<div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:20px">${socialRows}</div></div>`,
        ),
    );

    if (showAll) {
        parts.push(
            section(
                "Expertise",
                sv.expertiseCards ?? "public",
                profile.expertiseCards?.length
                    ? `<div class="pnExpertiseGrid">${profile.expertiseCards.map((c) => `<div class="pnExpertiseCard"><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p></div>`).join("")}</div>`
                    : emptyNote(
                          editable
                              ? "Add 2-4 expertise cards highlighting your key talking points."
                              : "No expertise cards yet.",
                      ),
            ),
        );

        parts.push(
            section(
                "Custom Fields",
                sv.customFields ?? "public",
                profile.customFields?.length
                    ? `<div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:20px">${profile.customFields.map((f) => `<div class="pnDefRow"><b>${esc(f.name)}</b><span>${esc(f.value)}</span></div>`).join("")}</div></div>`
                    : emptyNote(
                          editable
                              ? "Add details like your location, pronouns, languages, or industry."
                              : "No custom fields yet.",
                      ),
            ),
        );

        parts.push(
            section(
                "Booking",
                sv.booking ?? "public",
                profile.bookingUrl
                    ? `<div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:20px"><div class="pnDefRow"><b>Book a call</b><span>${esc(profile.bookingUrl)}</span></div></div></div>`
                    : emptyNote("No booking link set."),
            ),
        );

        parts.push(
            section(
                "Media kit",
                sv.mediaKit ?? "public",
                profile.mediaKit?.length
                    ? `<div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:20px">${profile.mediaKit.map((m) => `<div class="pnDefRow"><b>${esc(m.name)}</b><span>${esc(m.type)}${m.size ? ` · ${(m.size / 1024 / 1024).toFixed(1)} MB` : ""}${m.filename ? ` · ${esc(m.filename)}` : ""}</span></div>`).join("")}</div></div>`
                    : emptyNote("No media kit items."),
            ),
        );

        parts.push(
            section(
                "Testimonials",
                sv.testimonials ?? "public",
                profile.testimonials?.length
                    ? profile.testimonials
                          .map(
                              (t) =>
                                  `<blockquote class="pnQuote"><p>“${esc(t.quote)}”</p><span>${esc(t.name)} — ${esc(t.role)}</span></blockquote>`,
                          )
                          .join("")
                    : emptyNote("No testimonials yet."),
            ),
        );

        parts.push(
            section(
                "Featured appearances",
                sv.appearances ?? "public",
                profile.featuredAppearances?.length
                    ? `<div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:20px">${profile.featuredAppearances.map((a) => `<div class="pnDefRow"><b>${esc(a.podcastName ?? "")}</b><span>${esc(a.episodeTitle ?? "")}${a.date ? ` · ${esc(a.date)}` : ""}${a.displayClass ? ` · ${esc(a.displayClass.replaceAll("_", " "))}` : ""}</span></div>`).join("")}</div></div>`
                    : emptyNote("No featured appearances yet."),
            ),
        );

        parts.push(
            section(
                "Best fit",
                sv.bestFitFor ?? "public",
                `
            ${profile.appearanceCount ? `<p class="pnSubtle" style="margin:0;font-size:14px">${profile.appearanceCount} appearances</p>` : ""}
            ${profile.bestFitFor?.length ? `<div class="pnTopicRow" style="margin-top:0">${profile.bestFitFor.map((t) => `<span class="pnTopicChip">${esc(t)}</span>`).join("")}</div>` : emptyNote("No best-fit topics yet.")}
        `,
            ),
        );

        parts.push(
            section(
                "Intro Video",
                sv.introVideo ?? "public",
                profile.introVideoUrl
                    ? `<div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:20px"><div class="pnDefRow"><b>Intro video</b><span>${esc(profile.introVideoUrl)}</span></div></div></div>`
                    : `<p class="pnSubtle" style="margin:0;font-size:14px">Paste a YouTube or Vimeo URL to embed a preview video.</p>`,
                "playCircle",
            ),
        );

        parts.push(
            `<p class="pnSubtle" style="font-size:12px;margin:8px 0 0">${profile.createdAt ? `Created ${esc(profile.createdAt.slice(0, 10))}` : "Not created yet"}${profile.updatedAt ? ` · Updated ${esc(profile.updatedAt.slice(0, 10))}` : ""}</p>`,
        );
    }

    return parts.join("");
}

function railMarkup(profile, { stats, shareUrl }) {
    const g = glance(profile);
    const statRows = [
        ["mic", "var(--pn-orange-500)", "Podcasts Hosted", stats?.podcastsHosted],
        ["users", "var(--pn-blue-500)", "Guest Appearances", stats?.appearances ?? profile.appearanceCount],
        ["headphones", "var(--pn-purple-500)", "Total Episodes", stats?.totalEpisodes],
    ];
    return `<aside class="pnRailStack">
        <div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:24px">
            <h3 style="margin:0 0 16px;font-size:16px;font-weight:600">Your Stats</h3>
            ${statRows.map(([ic, color, label, value]) => `<div class="pnStatRow"><span class="pnStatRow_label"><span style="color:${color};display:inline-flex">${icon(ic)}</span>${label}</span><span class="pnStatRow_value">${value ?? "—"}</span></div>`).join("")}
        </div></div>
        ${
            shareUrl
                ? `<div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:24px">
            <h3 style="margin:0 0 12px;font-size:16px;font-weight:600;display:flex;align-items:center;gap:8px">${icon("link")} Share Profile</h3>
            <div class="pnShareRow">
                <input readonly value="${esc(shareUrl)}" aria-label="Public profile link" data-share-input />
                <button class="pnBtn pnBtn--outline pnBtn--sm" type="button" data-share-copy>${icon("copy")} Copy</button>
            </div>
            <p class="pnHelper" data-share-feedback style="color:var(--pn-green-600)" hidden>Copied to clipboard!</p>
        </div></div>`
                : ""
        }
        <div class="pnCard" style="gap:0"><div class="pnCard_body" style="padding-top:24px">
            <h3 style="margin:0 0 12px;font-size:16px;font-weight:600">At a Glance</h3>
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:14px">
                <span class="pnSubtle">Profile Strength</span><b>${g.percent}%</b>
            </div>
            <div class="pnProgress" style="margin-top:8px"><div class="pnProgress_fill" style="width:${g.percent}%;background:${glanceColor(g.percent)}"></div></div>
            <div class="pnGlanceChecks">
                ${g.checks.map(([label, ok]) => `<span>${ok ? icon("check") : '<span class="pnCheckDot"></span>'}${label}</span>`).join("")}
            </div>
            <div class="pnGlanceTiles">
                <div><b>${profile.topics?.length ?? 0}</b><span>Topics</span></div>
                <div><b>${profile.expertiseCards?.length ?? 0}</b><span>Expertise</span></div>
                <div><b>${profile.appearanceCount ?? 0}</b><span>Appearances</span></div>
            </div>
        </div></div>
    </aside>`;
}

export function renderFullProfileView(
    container,
    {
        profile,
        hostLabel,
        extraActionsHtml = "",
        editable = false,
        onRemoveTopic,
        onAddTopic,
        onVisibilityChange,
        stats,
        shareUrl,
        showWelcome = false,
    },
) {
    container.innerHTML = `
        <style>${NATIVE_STYLES}</style>
        <div class="podaNative podaFullProfile" data-host="${esc(hostLabel)}" style="flex:1 1 auto;min-height:0;overflow-y:auto">
        <div class="pnPage pnPage_narrow" style="max-width:1152px">
            <div class="pnProfileStatus">
                ${statusPillProfile(profile)}
                ${extraActionsHtml ? `<div style="display:flex;gap:8px;align-items:center">${extraActionsHtml}</div>` : ""}
            </div>
            ${
                showWelcome
                    ? `<div class="pnBannerWarm" data-welcome>
                <div style="display:flex;gap:12px;align-items:flex-start"><span style="color:hsl(var(--pn-primary));display:inline-flex;margin-top:1px">${icon("sparkles")}</span>
                <div><p class="pnBannerWarm_title">Welcome to your profile!</p>
                <p class="pnBannerWarm_body">Click any text to edit it. Add topics so hosts can find you, and upload a headshot for credibility.</p></div></div>
                <button class="pnBtn pnBtn--ghost pnBtn--sm" type="button" data-welcome-dismiss aria-label="Dismiss">${icon("x")}</button>
            </div>`
                    : ""
            }
            <div class="pnProfileGrid">
                <div style="display:flex;flex-direction:column;gap:32px;min-width:0">
                    ${fullProfileMarkup(profile, { showAll: true, editable })}
                </div>
                ${railMarkup(profile, { stats, shareUrl })}
            </div>
        </div></div>`;

    container
        .querySelector("[data-welcome-dismiss]")
        ?.addEventListener("click", () => container.querySelector("[data-welcome]")?.remove());
    container
        .querySelectorAll("[data-remove-topic]")
        .forEach((btn) => btn.addEventListener("click", () => onRemoveTopic?.(btn.dataset.removeTopic)));
    container.querySelector("[data-add-topic]")?.addEventListener("click", () => onAddTopic?.());
    container
        .querySelectorAll("[data-visibility]")
        .forEach((btn) => btn.addEventListener("click", () => onVisibilityChange?.(btn.dataset.visibility)));
    container.querySelector("[data-share-copy]")?.addEventListener("click", async () => {
        const input = container.querySelector("[data-share-input]");
        try {
            await navigator.clipboard.writeText(input.value);
        } catch {
            input.select();
            document.execCommand("copy");
        }
        const feedback = container.querySelector("[data-share-feedback]");
        if (feedback) {
            feedback.hidden = false;
            setTimeout(() => (feedback.hidden = true), 2000);
        }
    });
}

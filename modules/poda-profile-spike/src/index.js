/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Module host entry (plain JS for the spike): full creator-profile page using
// the complete donor inventory, now wearing the PCC native design language
// (shared native theme). Identity comes from the public module API
// (api.profile); creator fields are mock/session-only. Switch between the own
// editable profile and a fully-populated example fixture.
import { renderFullProfileView } from "./shared/profileFullView.js";
import { PROFILE_FIXTURE_MIRA, EMPTY_CREATOR_FIELDS, SOCIAL_SERVICES } from "./shared/profileFixtures.js";
import { NATIVE_STYLES, esc, icon, formText } from "./shared/nativeTheme.js";
import { renderStudioView } from "./shared/podcastFullView.js";
import { podaData } from "./data/mockAdapter.js";
import { APPLE_CATEGORIES } from "./data/appleCategories.js";
import { STUDIO_LOCATION, detailActions, parseStudioRoute, studioRouteHash } from "./studio/routes.js";
import { itemSnapshot, parseShareContent } from "./share/shareModel.js";
import { ensureShareStyles, renderShareForm, shareCardHtml } from "./share/shareCard.js";
import { isOwnProfileWidget } from "./widgetApproval.js";

export const PROFILE_LOCATION = "io.poda.profile-spike.profile";

export { STUDIO_LOCATION };

function currentView() {
    const hash = window.location.hash;
    const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
    const params = new URLSearchParams(query);
    return { view: params.get("view") ?? "summary", who: params.get("who") ?? "me" };
}

function navigateTo(view, who) {
    const query = new URLSearchParams();
    query.set("view", view);
    if (who) query.set("who", who);
    window.location.hash = `/${PROFILE_LOCATION}?${query.toString()}`;
}

const PAGE_STYLES = `
.podaProfilePageHost { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }
.podaProfilePage_switch { margin-bottom: 8px; }
.podaProfileCreate_row { margin-top: 10px; }
.podaProfileCreate_cardRow, .podaProfileCreate_rowPair { border: 1px solid hsl(var(--pn-border)); border-radius: 12px; padding: 16px; margin-bottom: 12px; background: hsl(var(--pn-bg)); }
`;

function resolveOwnProfile(api, overrides) {
    const base = api.profile.value ?? {};
    return {
        ...EMPTY_CREATOR_FIELDS,
        ...overrides,
        socialLinks: { ...EMPTY_CREATOR_FIELDS.socialLinks, ...overrides.socialLinks },
        displayName: overrides.displayName || base.displayName || base.userId || "Unknown user",
        userId: base.userId,
    };
}

function pageShell(container, who) {
    container.innerHTML = `<style>${NATIVE_STYLES}${PAGE_STYLES}</style><div class="podaNative" style="flex:1 1 auto;min-height:0;overflow-y:auto"><div class="pnPage">
        <div class="podaProfilePage_switch pnFilters" role="tablist">
            <button data-who="me" role="tab" type="button" aria-pressed="${String(who === "me")}">My profile</button>
            <button data-who="mira" role="tab" type="button" aria-pressed="${String(who === "mira")}">Mira Chen (example)</button>
        </div><div class="podaProfilePage_body"></div></div></div>`;
    const body = container.querySelector(".podaProfilePage_body");
    container.querySelectorAll(".podaProfilePage_switch button").forEach((b) => {
        b.addEventListener("click", () => navigateTo("summary", b.dataset.who));
    });
    return body;
}

async function renderSummary(container, { api, overrides, setOverrides, who }) {
    const body = pageShell(container, who);
    const profile = who === "mira" ? PROFILE_FIXTURE_MIRA : resolveOwnProfile(api, overrides);
    const isOwn = who === "me";

    // Right-rail stats come from the same session adapter as Studio.
    const [podcasts, episodes] = await Promise.all([podaData.listPodcasts(), podaData.listEpisodes()]);
    const stats = {
        podcastsHosted: isOwn ? podcasts.length : null,
        appearances: profile.appearanceCount ?? 0,
        totalEpisodes: isOwn ? episodes.length : null,
    };

    renderFullProfileView(body, {
        profile,
        hostLabel: `module (app page) — ${isOwn ? "own profile" : "example fixture"}`,
        editable: isOwn,
        showWelcome: isOwn && !profile.headline,
        stats,
        shareUrl: profile.slug ? `https://poda.social/@${profile.slug}` : null,
        extraActionsHtml: isOwn
            ? `<button class="pnBtn pnBtn--primary" id="podaProfileEditLink" type="button">${icon("pencil")} Edit profile</button>${
                  canShare(api)
                      ? `<button class="pnBtn pnBtn--outline" id="podaProfileShare" type="button">${icon("share")} Share to chat</button>`
                      : ""
              }`
            : "",
        onRemoveTopic: isOwn
            ? (topic) => setOverrides({ ...overrides, topics: (profile.topics ?? []).filter((t) => t !== topic) })
            : undefined,
        onAddTopic: isOwn
            ? (value) => setOverrides({ ...overrides, topics: [...(profile.topics ?? []), value] })
            : undefined,
        topicSuggestions: isOwn ? APPLE_CATEGORIES : undefined,
        onVisibilityChange: isOwn ? (vis) => setOverrides({ ...overrides, isPublic: vis === "public" }) : undefined,
    });
    body.querySelector("#podaProfileEditLink")?.addEventListener("click", () => navigateTo("edit", "me"));
    body.querySelector("#podaProfileShare")?.addEventListener("click", () => {
        void openShareDialog(api, { initial: { kind: "profile", itemValue: "me" } });
    });
    if (isOwn) {
        const identity = document.createElement("p");
        identity.className = "pnSubtle";
        identity.style.cssText = "font-size:12px;margin:0";
        identity.textContent = `Signed in as ${profile.userId ?? "unknown"} · creator fields are session-only`;
        body.querySelector(".pnProfileGrid")?.appendChild(identity);
    }
}

const escAttr = esc;

const VIS_SECTIONS = [
    ["about", "About"],
    ["topics", "Topics"],
    ["links", "Links"],
    ["expertiseCards", "Expertise cards"],
    ["customFields", "Custom fields"],
    ["booking", "Booking"],
    ["introVideo", "Intro video"],
    ["mediaKit", "Media kit"],
    ["testimonials", "Testimonials"],
    ["appearances", "Featured appearances"],
    ["bestFitFor", "Best fit"],
];

function visibilitySelect(sectionKey, value) {
    const options = ["public", "members", "collaborators", "private"]
        .map((v) => `<option value="${v}" ${v === value ? "selected" : ""}>${v}</option>`)
        .join("");
    return `<div class="pnField podaProfileCreate_row"><label class="pnLabel" for="vis_${sectionKey}">${sectionKey === "bestFitFor" ? "Best fit" : sectionKey.replace(/[A-Z]/g, (m) => " " + m.toLowerCase())}</label><select class="pnSelect" id="vis_${sectionKey}" name="vis_${sectionKey}">${options}</select></div>`;
}

function editField(id, name, label, { type = "text", value = "", placeholder = "", required = false } = {}) {
    return `<div class="pnField"><label class="pnLabel" for="${id}">${esc(label)}</label><input class="pnInput" id="${id}" name="${name}" type="${type}" value="${escAttr(value)}" placeholder="${escAttr(placeholder)}" ${required ? "required" : ""} /></div>`;
}

function renderEdit(container, { api, overrides, setOverrides }) {
    const current = resolveOwnProfile(api, overrides);
    const socialInputs = SOCIAL_SERVICES.map((svc) =>
        editField(`pp_s_${svc}`, `social_${svc}`, svc.charAt(0).toUpperCase() + svc.slice(1), {
            type: "url",
            value: current.socialLinks?.[svc],
            placeholder: "https://",
        }),
    ).join("");

    const expertiseRows = (current.expertiseCards ?? [])
        .map(
            (c, i) => `<div class="podaProfileCreate_cardRow" data-exp-row>
                <div class="pnGrid2">
                    <div class="pnField"><label class="pnLabel">Card title</label><input class="pnInput" name="exp_title_${i}" value="${escAttr(c.title)}" /></div>
                    <div class="pnField"><label class="pnLabel">Icon name</label><input class="pnInput" name="exp_icon_${i}" value="${escAttr(c.icon ?? "")}" placeholder="Target" /></div>
                </div>
                <div class="pnField" style="margin-top:10px"><label class="pnLabel">Description</label><input class="pnInput" name="exp_desc_${i}" value="${escAttr(c.description)}" /></div>
                <button type="button" class="pnBtn pnBtn--ghost pnBtn--sm" style="margin-top:10px" data-remove-row>${icon("x")} Remove card</button>
            </div>`,
        )
        .join("");
    const customRows = (current.customFields ?? [])
        .map(
            (f, i) => `<div class="podaProfileCreate_rowPair" data-cf-row>
                <div class="pnGrid2">
                    <div class="pnField"><label class="pnLabel">Field name</label><input class="pnInput" name="cf_name_${i}" value="${escAttr(f.name)}" /></div>
                    <div class="pnField"><label class="pnLabel">Value</label><input class="pnInput" name="cf_value_${i}" value="${escAttr(f.value)}" /></div>
                </div>
                <button type="button" class="pnBtn pnBtn--ghost pnBtn--sm" style="margin-top:10px" data-remove-row>${icon("x")} Remove field</button>
            </div>`,
        )
        .join("");
    const visRows = VIS_SECTIONS.map(([key, value]) =>
        visibilitySelect(key, current.sectionVisibility?.[key] ?? "public"),
    ).join("");

    container.innerHTML = `
        <style>${NATIVE_STYLES}${PAGE_STYLES}</style>
        <div class="podaNative" style="flex:1 1 auto;min-height:0;overflow-y:auto"><div class="pnPage pnPage_narrow">
            <div class="pnPageHeader">
                <div>
                    <h1 class="pnTitle">Edit creator profile</h1>
                    <p class="pnSubtitle">Signed in as ${esc(current.userId ?? "unknown")} — session-only mock; a reload discards edits.</p>
                </div>
            </div>
            <form id="podaProfileCreateForm" class="pnStack">
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Identity</h2><p class="pnCard_desc">The public name and handle hosts see.</p></div><div class="pnCard_body">
                    <div class="pnGrid2">
                        ${editField("ppName", "displayName", "Display name", { value: current.displayName, required: true })}
                        ${editField("ppSlug", "slug", "Profile slug", { value: current.slug, placeholder: "your-name" })}
                    </div>
                    ${editField("ppHeadline", "headline", "Headline", { value: current.headline, placeholder: "Podcast host and producer" })}
                    ${editField("ppTagline", "tagline", "Tagline", { value: current.tagline, placeholder: "One-line promise" })}
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Media</h2><p class="pnCard_desc">Avatar, banner, and intro video links (mock uploads).</p></div><div class="pnCard_body">
                    <div class="pnGrid2">
                        ${editField("ppAvatar", "avatarUrl", "Avatar URL (mock)", { type: "url", value: current.avatarUrl, placeholder: "https://…/avatar.png" })}
                        ${editField("ppBanner", "bannerUrl", "Banner URL (mock)", { type: "url", value: current.bannerUrl, placeholder: "https://…/banner.png" })}
                    </div>
                    ${editField("ppIntroVideo", "introVideoUrl", "Intro video URL", { type: "url", value: current.introVideoUrl, placeholder: "https://…/intro.mp4" })}
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">About</h2><p class="pnCard_desc">The hook and the full story.</p></div><div class="pnCard_body">
                    ${editField("ppShort", "aboutShort", "Short intro", { value: current.aboutShort, placeholder: "2-3 sentences shown on cards" })}
                    <div class="pnField"><label class="pnLabel" for="ppBio">Full bio</label><textarea class="pnTextarea" id="ppBio" name="bio">${esc(current.bio)}</textarea></div>
                    ${editField("ppTopics", "topics", "Topics (comma separated)", { value: current.topics.join(", "), placeholder: "Technology, Interviews" })}
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Expertise cards</h2><p class="pnCard_desc">Add 2-4 expertise cards highlighting your key talking points.</p></div><div class="pnCard_body">
                    <div id="ppExpRows">${expertiseRows}</div>
                    <button type="button" class="pnBtn pnBtn--outline pnBtn--sm" id="ppAddExp">${icon("plus")} Add expertise card</button>
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Custom fields</h2><p class="pnCard_desc">Add details like your location, pronouns, languages, or industry.</p></div><div class="pnCard_body">
                    <div id="ppCfRows">${customRows}</div>
                    <button type="button" class="pnBtn pnBtn--outline pnBtn--sm" id="ppAddCf">${icon("plus")} Add custom field</button>
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Links &amp; booking</h2><p class="pnCard_desc">Where hosts can find and book you.</p></div><div class="pnCard_body">
                    <div class="pnGrid2">${socialInputs}</div>
                    ${editField("ppBooking", "bookingUrl", "Booking URL", { type: "url", value: current.bookingUrl, placeholder: "https://calendly.com/…" })}
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Status</h2><p class="pnCard_desc">Draft vs published, and directory listing.</p></div><div class="pnCard_body">
                    <div class="pnGrid2">
                        <div class="pnField"><label class="pnLabel" for="ppStatus">Profile status</label>
                            <select class="pnSelect" id="ppStatus" name="profileStatus">
                                <option value="draft" ${current.profileStatus === "draft" ? "selected" : ""}>Draft</option>
                                <option value="published" ${current.profileStatus === "published" ? "selected" : ""}>Published</option>
                            </select></div>
                        <label class="pnToggle"><input type="checkbox" id="ppPublic" name="isPublic" ${current.isPublic ? "checked" : ""} />
                            <span class="pnToggle_track"><span class="pnToggle_thumb"></span></span>
                            <span><span class="pnToggle_label">Public profile</span>
                            <p class="pnToggle_hint">Listed in the creator directory.</p></span>
                        </label>
                    </div>
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Section visibility</h2><p class="pnCard_desc">Who can see each profile section.</p></div><div class="pnCard_body">
                    <div class="pnGrid2">${visRows}</div>
                </div></section>
                <div class="pnFooter">
                    <button class="pnBtn pnBtn--outline" type="button" id="ppCancel">Cancel</button>
                    <button class="pnBtn pnBtn--primary" type="submit">${icon("checkCircle")} Save profile</button>
                </div>
            </form>
        </div></div>`;

    // Repeatable row editors (expertise cards, custom fields)
    let expCount = (current.expertiseCards ?? []).length;
    let cfCount = (current.customFields ?? []).length;
    container.querySelector("#ppAddExp").addEventListener("click", () => {
        const host = container.querySelector("#ppExpRows");
        const row = document.createElement("div");
        row.className = "podaProfileCreate_cardRow";
        row.dataset.expRow = "";
        row.innerHTML = `<div class="pnGrid2">
            <div class="pnField"><label class="pnLabel">Card title</label><input class="pnInput" name="exp_title_${expCount}" /></div>
            <div class="pnField"><label class="pnLabel">Icon name</label><input class="pnInput" name="exp_icon_${expCount}" placeholder="Target" /></div>
        </div>
        <div class="pnField" style="margin-top:10px"><label class="pnLabel">Description</label><input class="pnInput" name="exp_desc_${expCount}" /></div>
        <button type="button" class="pnBtn pnBtn--ghost pnBtn--sm" style="margin-top:10px" data-remove-row>Remove card</button>`;
        host.appendChild(row);
        expCount++;
    });
    container.querySelector("#ppAddCf").addEventListener("click", () => {
        const host = container.querySelector("#ppCfRows");
        const row = document.createElement("div");
        row.className = "podaProfileCreate_rowPair";
        row.dataset.cfRow = "";
        row.innerHTML = `<div class="pnGrid2">
            <div class="pnField"><label class="pnLabel">Field name</label><input class="pnInput" name="cf_name_${cfCount}" /></div>
            <div class="pnField"><label class="pnLabel">Value</label><input class="pnInput" name="cf_value_${cfCount}" /></div>
        </div>
        <button type="button" class="pnBtn pnBtn--ghost pnBtn--sm" style="margin-top:10px" data-remove-row>Remove field</button>`;
        host.appendChild(row);
        cfCount++;
    });
    container.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-remove-row]");
        if (btn) btn.closest("[data-exp-row], [data-cf-row]")?.remove();
    });

    container.querySelector("#ppCancel").addEventListener("click", () => navigateTo("summary", "me"));
    container.querySelector("#podaProfileCreateForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const socialLinks = {};
        for (const svc of SOCIAL_SERVICES) {
            const v = formText(data, `social_${svc}`).trim();
            if (v) socialLinks[svc] = v;
        }
        // Collect repeatable rows by their surviving inputs
        const expertiseCards = Array.from(form.querySelectorAll("[data-exp-row]"))
            .map((row) => ({
                id: `exp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
                title: row.querySelector("input[name^=exp_title_]")?.value.trim() ?? "",
                description: row.querySelector("input[name^=exp_desc_]")?.value.trim() ?? "",
                icon: row.querySelector("input[name^=exp_icon_]")?.value.trim() || undefined,
                order: 0,
            }))
            .filter((c) => c.title)
            .map((c, i) => ({ ...c, order: i + 1 }));
        const customFields = Array.from(form.querySelectorAll("[data-cf-row]"))
            .map((row) => ({
                name: row.querySelector("input[name^=cf_name_]")?.value.trim() ?? "",
                value: row.querySelector("input[name^=cf_value_]")?.value.trim() ?? "",
            }))
            .filter((f) => f.name);
        const sectionVisibility = {};
        for (const [key] of VIS_SECTIONS) {
            const v = data.get(`vis_${key}`);
            if (v && v !== "public") sectionVisibility[key] = v;
        }
        setOverrides({
            displayName: data.get("displayName") || current.displayName,
            slug: data.get("slug") || "",
            headline: data.get("headline") || "",
            tagline: data.get("tagline") || "",
            aboutShort: data.get("aboutShort") || "",
            bio: data.get("bio") || "",
            topics: formText(data, "topics")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            socialLinks,
            bookingUrl: data.get("bookingUrl") || "",
            avatarUrl: data.get("avatarUrl") || "",
            bannerUrl: data.get("bannerUrl") || "",
            introVideoUrl: data.get("introVideoUrl") || "",
            expertiseCards,
            customFields,
            profileStatus: data.get("profileStatus") ?? "draft",
            isPublic: data.get("isPublic") === "on",
            sectionVisibility,
        });
        navigateTo("summary", "me");
    });
}

function ProfilePage({ api }) {
    const React = window.React;
    const ref = React.useRef(null);
    const [route, setRoute] = React.useState(currentView());
    // Own creator fields live in the session adapter so the right-panel profile (D-000024) shows the same edits.
    const [overrides, setOverridesState] = React.useState(null);
    React.useEffect(() => {
        let live = true;
        void podaData.getMyProfile().then((profile) => live && setOverridesState(profile));
        return () => {
            live = false;
        };
    }, []);
    const setOverrides = React.useCallback((next) => {
        setOverridesState(next);
        void podaData.saveMyProfile(next);
    }, []);
    React.useEffect(() => {
        const onHashChange = () => setRoute(currentView());
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);
    React.useEffect(() => {
        if (!ref.current || !overrides) return;
        if (route.view === "edit" || route.view === "create") {
            renderEdit(ref.current, { api, overrides, setOverrides });
        } else {
            renderSummary(ref.current, { api, overrides, setOverrides, who: route.who }).catch((error) => {
                console.error("Poda profile render failed", error);
                const host = ref.current?.querySelector(".podaProfilePage_body");
                if (host)
                    host.innerHTML = `<div class="pnError" role="alert">This profile could not be rendered. ${esc(String(error?.message ?? error))}</div>`;
            });
        }
        ref.current.firstElementChild?.scrollIntoView({ block: "start" });
    }, [route, overrides, setOverrides, api]);
    return React.createElement("div", { ref, className: "podaProfilePageHost" });
}

// Right-panel profile (D-000024): the shared profile view, read-only and compact, for any Matrix user. Only the
// signed-in user has creator fields (session-only); other members show their Matrix identity and empty sections.
async function renderProfilePanel(container, { api, userId, displayName }) {
    const ownUserId = api.profile.value?.userId;
    const isOwn = userId === ownUserId;
    const profile = isOwn
        ? resolveOwnProfile(api, await podaData.getMyProfile())
        : { ...EMPTY_CREATOR_FIELDS, displayName: displayName || userId, userId };
    const stats = isOwn
        ? await Promise.all([podaData.listPodcasts(), podaData.listEpisodes()]).then(([podcasts, episodes]) => ({
              podcastsHosted: podcasts.length,
              appearances: profile.appearanceCount ?? 0,
              totalEpisodes: episodes.length,
          }))
        : undefined;
    renderFullProfileView(container, {
        profile,
        stats,
        hostLabel: `right panel — ${isOwn ? "own profile" : "member"}`,
        compact: true,
        showStatus: isOwn,
        showVisibility: isOwn,
        showRail: isOwn,
        hideEmpty: !isOwn,
        extraActionsHtml: isOwn
            ? `<button class="pnBtn pnBtn--outline pnBtn--sm" id="podaPanelEditProfile" type="button">${icon("pencil")} Edit profile</button>`
            : "",
    });
    const note = document.createElement("p");
    note.className = "pnSubtle";
    note.style.cssText = "font-size:12px;margin:0";
    note.textContent = isOwn
        ? `${userId} · creator fields are session-only`
        : `${userId} · no Poda creator profile in this preview`;
    container.querySelector(".pnProfileGrid")?.appendChild(note);
    container.querySelector("#podaPanelEditProfile")?.addEventListener("click", () => navigateTo("edit", "me"));
}

function ProfilePanel({ api, userId, displayName }) {
    const React = window.React;
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (!ref.current) return;
        renderProfilePanel(ref.current, { api, userId, displayName }).catch((error) => {
            console.error("Poda profile panel render failed", error);
            if (ref.current)
                ref.current.innerHTML = `<div class="pnError" role="alert">This profile could not be rendered. ${esc(String(error?.message ?? error))}</div>`;
        });
    }, [api, userId, displayName]);
    return React.createElement("div", { ref, className: "podaProfilePanelHost" });
}

const STUDIO_NAV_STYLES = `
.podaStudioNav { margin: 0 clamp(4px, 2vw, 16px); padding-top: 18px; align-self: flex-start; }
`;

function studioRoute() {
    return parseStudioRoute(window.location.hash);
}

function studioNavigate(route) {
    window.location.hash = studioRouteHash(route);
}

// Back/next-step buttons above a Studio detail page (G-000023).
function detailActionsHost(actions, { onShare } = {}) {
    const host = document.createElement("div");
    host.innerHTML = `<style>${NATIVE_STYLES}${STUDIO_NAV_STYLES}</style><nav class="podaNative podaStudioNav" aria-label="Studio navigation" style="display:flex;gap:8px;flex-wrap:wrap">
        ${actions
            .map(
                (a) =>
                    `<button class="pnBtn ${a.id === "back" ? "pnBtn--ghost" : a.id === "share" ? "pnBtn--primary" : "pnBtn--outline"} pnBtn--sm" type="button" data-action="${esc(a.id)}">${icon(a.id === "back" ? "arrowLeft" : a.id === "new-episode" ? "plus" : a.id === "share" ? "share" : "arrowRight")} ${esc(a.label)}</button>`,
            )
            .join("")}
    </nav>`;
    host.querySelectorAll("[data-action]").forEach((b) => {
        const action = actions.find((a) => a.id === b.dataset.action);
        b.addEventListener("click", () => (action.share ? onShare?.(action.share) : studioNavigate(action.to)));
    });
    return host;
}

function studioNavHost(active) {
    const host = document.createElement("div");
    host.innerHTML = `<style>${NATIVE_STYLES}${STUDIO_NAV_STYLES}</style><nav class="podaNative podaStudioNav pnFilters" aria-label="Studio sections">
        <button data-section="podcasts" type="button" aria-pressed="${String(active === "podcasts")}">Podcasts</button>
        <button data-section="episodes" type="button" aria-pressed="${String(active === "episodes")}">Episodes</button>
    </nav>`;
    return host;
}

function StudioPage({ api }) {
    const React = window.React;
    const ref = React.useRef(null);
    const [route, setRoute] = React.useState(studioRoute());
    React.useEffect(() => {
        const onHashChange = () => setRoute(studioRoute());
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);
    React.useEffect(() => {
        if (!ref.current) return;
        ref.current.style.display = "flex";
        ref.current.style.flexDirection = "column";
        ref.current.style.flex = "1 1 auto";
        ref.current.style.minHeight = "0";
        (async () => {
            const showNav = route.view === "list" || route.view === "episodes";
            const contentHost = document.createElement("div");
            contentHost.style.display = "flex";
            contentHost.style.flexDirection = "column";
            contentHost.style.flex = "1 1 auto";
            contentHost.style.minHeight = "0";

            ref.current.replaceChildren();
            if (showNav) {
                const active = route.view === "episodes" ? "episodes" : "podcasts";
                const nav = studioNavHost(active);
                nav.querySelectorAll("button").forEach((b) => {
                    b.addEventListener("click", () =>
                        studioNavigate(b.dataset.section === "episodes" ? { view: "episodes" } : { view: "list" }),
                    );
                });
                ref.current.appendChild(nav);
            }
            ref.current.appendChild(contentHost);
            // Every await below may finish after a newer route has replaced this one; only the current route renders
            // (G-000026).
            const superseded = () => contentHost.parentNode !== ref.current;

            if (route.view === "new-podcast") {
                const { renderPodcastCreateView } = await import("./studio/podcastCreate.js");
                if (superseded()) return;
                renderPodcastCreateView(contentHost, {
                    onSubmit: async (draft, intent) => {
                        const created = await podaData.savePodcast(draft);
                        studioNavigate(intent === "draft" ? { view: "list" } : { view: "detail", id: created.id });
                    },
                    onCancel: () => studioNavigate({ view: "list" }),
                });
                return;
            }
            if (route.view === "new-episode") {
                const { renderEpisodeCreateView } = await import("./studio/episodeCreate.js");
                const podcasts = await podaData.listPodcasts();
                if (superseded()) return;
                renderEpisodeCreateView(contentHost, {
                    podcasts,
                    initialPodcastId: route.podcastId,
                    onSubmit: async (draft) => {
                        const created = await podaData.saveEpisode(draft);
                        studioNavigate({ view: "episodeDetail", id: created.id });
                    },
                    onCancel: () => studioNavigate({ view: "episodes" }),
                });
                return;
            }
            if (route.view === "detail") {
                const podcast = await podaData.getPodcast(route.id).catch(() => null);
                if (!podcast) {
                    studioNavigate({ view: "list" });
                    return;
                }
                const episodes = await podaData.listEpisodes(route.id);
                if (superseded()) return;
                ref.current.insertBefore(
                    detailActionsHost(detailActions(route, { canShare: canShare(api) }), {
                        onShare: (share) =>
                            void openShareDialog(api, { initial: { kind: share.kind, itemValue: share.id } }),
                    }),
                    contentHost,
                );
                renderStudioView(contentHost, { podcast, episodes, hostLabel: "module (app page)" });
                return;
            }
            if (route.view === "episodeDetail") {
                const episode = await podaData.getEpisode(route.id).catch(() => null);
                if (!episode) {
                    studioNavigate({ view: "episodes" });
                    return;
                }
                const { renderEpisodeDetailView } = await import("./shared/podcastFullView.js");
                if (superseded()) return;
                ref.current.insertBefore(
                    detailActionsHost(detailActions(route, { podcastId: episode.podcastId, canShare: canShare(api) }), {
                        onShare: (share) =>
                            void openShareDialog(api, { initial: { kind: share.kind, itemValue: share.id } }),
                    }),
                    contentHost,
                );
                renderEpisodeDetailView(contentHost, episode);
                return;
            }
            if (route.view === "episodes") {
                const { renderEpisodeListView } = await import("./studio/episodeList.js");
                const [episodes, podcasts] = await Promise.all([podaData.listEpisodes(), podaData.listPodcasts()]);
                if (superseded()) return;
                renderEpisodeListView(contentHost, {
                    episodes,
                    podcasts,
                    filterPodcastId: route.filter,
                    statusFilter: route.status,
                    onFilter: (id) => studioNavigate({ view: "episodes", filter: id, status: route.status }),
                    onStatusFilter: (status) => studioNavigate({ view: "episodes", filter: route.filter, status }),
                    onOpen: (id) => studioNavigate({ view: "episodeDetail", id }),
                    onCreate: () => studioNavigate({ view: "new-episode" }),
                });
                return;
            }
            const { renderStudioListView } = await import("./studio/studioList.js");
            const podcasts = await podaData.listPodcasts();
            if (superseded()) return;
            renderStudioListView(contentHost, {
                podcasts,
                onOpen: (id) => studioNavigate({ view: "detail", id }),
                onCreate: () => studioNavigate({ view: "new-podcast" }),
            });
        })();
    }, [api, route]);
    return React.createElement("div", { ref });
}

// ---------- share cards (D-000028) and where they are created (D-000030) ----------

// The navigation module's "Create post" button asks for the post dialog with this window event; this module marks
// the document while it can answer, so the button only appears when posting is possible.
const CREATE_POST_EVENT = "poda:create-post";
const CREATE_POST_AVAILABLE_EVENT = "poda:create-post-available";

function canShare(api) {
    return typeof api.extras.sendRoomMessage === "function" && typeof api.extras.getPostableRooms === "function";
}

/** The member's own items as share options, from the module's data adapter. */
async function shareSources(api) {
    const [podcasts, episodes, own] = await Promise.all([
        podaData.listPodcasts(),
        podaData.listEpisodes(),
        podaData.getMyProfile(),
    ]);
    const profile = resolveOwnProfile(api, own);
    return {
        sharerName: profile.displayName,
        sources: {
            episode: episodes.map((episode) => {
                const podcast = podcasts.find((p) => p.id === episode.podcastId) ?? null;
                return {
                    value: episode.id,
                    label: podcast ? `${episode.title} — ${podcast.title}` : episode.title,
                    item: itemSnapshot("episode", episode, { podcast }),
                };
            }),
            podcast: podcasts.map((podcast) => ({
                value: podcast.id,
                label: podcast.title,
                item: itemSnapshot("podcast", podcast, {
                    episodeCount: episodes.filter((e) => e.podcastId === podcast.id).length,
                }),
            })),
            profile: [{ value: "me", label: profile.displayName, item: itemSnapshot("profile", profile) }],
            bookingUrl: profile.bookingUrl || profile.socialLinks?.calendly || "",
        },
    };
}

function ShareDialogBody({ sources, sharerName, rooms, roomId, initial, onSubmit, onCancel }) {
    const React = window.React;
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (!ref.current) return;
        ensureShareStyles();
        renderShareForm(ref.current, { sources, sharerName, rooms, roomId, initial, onPost: onSubmit, onCancel });
    }, [sources, sharerName, rooms, roomId, initial, onSubmit, onCancel]);
    return React.createElement("div", { ref });
}

function MessageDialogBody({ message, onCancel }) {
    const React = window.React;
    return React.createElement(
        "div",
        { className: "podaNative" },
        React.createElement("p", null, message),
        React.createElement(
            "div",
            { className: "pnFooter" },
            React.createElement(
                "button",
                { type: "button", className: "pnBtn pnBtn--primary", onClick: onCancel },
                "OK",
            ),
        ),
    );
}

/**
 * Opens the post dialog: pick a chat (the viewed one by default), what to share and how, then post the card there
 * and open that chat. `initial` preselects an item, e.g. { kind: "episode", itemValue: id } from a Studio page.
 */
async function openShareDialog(api, { initial = null } = {}) {
    if (!canShare(api)) return;
    const { rooms, currentRoomId } = api.extras.getPostableRooms();
    if (!rooms.length) {
        api.openDialog({ title: "Create a post" }, MessageDialogBody, {
            message: "Join a chat you can post in first, then share your episodes, podcasts or profile there.",
        });
        return;
    }
    const { sources, sharerName } = await shareSources(api);
    const { ok, model } = await api.openDialog({ title: "Create a post" }, ShareDialogBody, {
        sources,
        sharerName,
        rooms,
        roomId: currentRoomId ?? rooms[0].roomId,
        initial,
    }).finished;
    if (!ok || !model) return;
    try {
        await api.extras.sendRoomMessage(model.roomId, model.content);
        api.navigation.openRoom(model.roomId);
    } catch {
        api.openDialog({ title: "Couldn't post the card" }, MessageDialogBody, {
            message: "Your card wasn't posted. Check your connection and try again.",
        });
    }
}

function openSharerProfile(api, userId) {
    if (api.extras.openUserProfilePanel) api.extras.openUserProfilePanel(userId);
    else void api.navigation.toMatrixToLink(`https://matrix.to/#/${encodeURIComponent(userId)}`);
}

function isShareEvent(mxEvent) {
    return mxEvent.type === "m.room.message" && parseShareContent(mxEvent.content) !== null;
}

function ShareCardTile({ api, mxEvent }) {
    const React = window.React;
    const ref = React.useRef(null);
    React.useEffect(() => {
        const model = parseShareContent(mxEvent.content);
        if (!ref.current || !model) return;
        ensureShareStyles();
        ref.current.innerHTML = `<div class="podaNative" style="background:transparent">${shareCardHtml(model)}</div>`;
        ref.current
            .querySelector('[data-share-action="profile"]')
            ?.addEventListener("click", () => openSharerProfile(api, mxEvent.sender));
    }, [api, mxEvent.eventId, mxEvent.sender, mxEvent.content]);
    return React.createElement("div", { ref, className: "podaShareTile" });
}

export default class PodaProfileSpikeModule {
    static moduleApiVersion = "^1.0.0 || ^2.0.0";

    constructor(api) {
        this.api = api;
    }

    async load() {
        const React = window.React;
        const api = this.api;
        this.api.navigation.registerLocationRenderer(PROFILE_LOCATION, () => React.createElement(ProfilePage, { api }));
        this.api.navigation.registerLocationRenderer(STUDIO_LOCATION, () => React.createElement(StudioPage, { api }));
        // Poda host extension (D-000024); absent on hosts without it.
        this.api.extras.setUserProfilePanel?.(({ userId, displayName }) =>
            React.createElement(ProfilePanel, { api, userId, displayName }),
        );
        // Poda's own profile widget loads without the per-viewer approval prompt (D-000029); only one module may
        // register a preload approver, so another module's approver wins.
        try {
            this.api.widgetLifecycle.registerPreloadApprover((widget) =>
                isOwnProfileWidget(widget, window.location.origin) ? true : undefined,
            );
        } catch (error) {
            console.warn("Poda profile module: preload approver not registered", error);
        }
        // Share cards: posts start from the navigation module's "Create post" button and from Share to chat on Studio
        // and Profile pages (D-000030); the card renders in the timeline (D-000028).
        if (canShare(api)) {
            window.addEventListener(CREATE_POST_EVENT, () => void openShareDialog(api));
            document.documentElement.dataset.podaCreatePost = "available";
            window.dispatchEvent(new Event(CREATE_POST_AVAILABLE_EVENT));
        }
        this.api.customComponents.registerMessageRenderer(
            isShareEvent,
            (props) => React.createElement(ShareCardTile, { api, mxEvent: props.mxEvent }),
            { allowEditingEvent: false },
        );
    }
}

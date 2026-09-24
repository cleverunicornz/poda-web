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

export const PROFILE_LOCATION = "io.poda.profile-spike.profile";

export const STUDIO_LOCATION = "io.poda.profile-spike.studio";

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
        displayName: overrides.displayName ?? base.displayName ?? base.userId ?? "Unknown user",
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
            ? `<button class="pnBtn pnBtn--primary" id="podaProfileEditLink" type="button">${icon("pencil")} Edit profile</button>`
            : "",
        onRemoveTopic: isOwn
            ? (topic) => setOverrides({ ...overrides, topics: (profile.topics ?? []).filter((t) => t !== topic) })
            : undefined,
        onAddTopic: isOwn
            ? () => {
                  const row = body.querySelector("[data-topics]");
                  const addBtn = row?.querySelector("[data-add-topic]");
                  if (!row || !addBtn) return;
                  const form = document.createElement("span");
                  form.innerHTML = `<span style="display:inline-flex;gap:4px"><input class="pnInput" style="height:28px;width:180px" placeholder="New topic" aria-label="New topic" /><button class="pnBtn pnBtn--outline pnBtn--sm" style="min-height:28px;padding:4px 12px" type="button">Add</button></span>`;
                  addBtn.replaceWith(form);
                  const input = form.querySelector("input");
                  input.focus();
                  const commit = () => {
                      const value = input.value.trim();
                      if (value) setOverrides({ ...overrides, topics: [...(profile.topics ?? []), value] });
                  };
                  form.querySelector("button").addEventListener("click", commit);
                  input.addEventListener("keydown", (e) => {
                      if (e.key === "Enter") commit();
                      if (e.key === "Escape") setOverrides({ ...overrides });
                  });
              }
            : undefined,
        onVisibilityChange: isOwn ? (vis) => setOverrides({ ...overrides, isPublic: vis === "public" }) : undefined,
    });
    body.querySelector("#podaProfileEditLink")?.addEventListener("click", () => navigateTo("edit", "me"));
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

function editField(id, label, { type = "text", value = "", placeholder = "", required = false } = {}) {
    return `<div class="pnField"><label class="pnLabel" for="${id}">${esc(label)}</label><input class="pnInput" id="${id}" name="${id}" type="${type}" value="${escAttr(value)}" placeholder="${escAttr(placeholder)}" ${required ? "required" : ""} /></div>`;
}

function renderEdit(container, { api, overrides, setOverrides }) {
    const current = resolveOwnProfile(api, overrides);
    const socialInputs = SOCIAL_SERVICES.map((svc) =>
        editField(`pp_s_${svc}`, svc.charAt(0).toUpperCase() + svc.slice(1), {
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
            <form id="podaProfileCreateForm">
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Identity</h2><p class="pnCard_desc">The public name and handle hosts see.</p></div><div class="pnCard_body">
                    <div class="pnGrid2">
                        ${editField("ppName", "Display name", { value: current.displayName, required: true })}
                        ${editField("ppSlug", "Profile slug", { value: current.slug, placeholder: "your-name" })}
                    </div>
                    ${editField("ppHeadline", "Headline", { value: current.headline, placeholder: "Podcast host and producer" })}
                    ${editField("ppTagline", "Tagline", { value: current.tagline, placeholder: "One-line promise" })}
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">Media</h2><p class="pnCard_desc">Avatar, banner, and intro video links (mock uploads).</p></div><div class="pnCard_body">
                    <div class="pnGrid2">
                        ${editField("ppAvatar", "Avatar URL (mock)", { type: "url", value: current.avatarUrl, placeholder: "https://…/avatar.png" })}
                        ${editField("ppBanner", "Banner URL (mock)", { type: "url", value: current.bannerUrl, placeholder: "https://…/banner.png" })}
                    </div>
                    ${editField("ppIntroVideo", "Intro video URL", { type: "url", value: current.introVideoUrl, placeholder: "https://…/intro.mp4" })}
                </div></section>
                <section class="pnCard"><div class="pnCard_header"><h2 class="pnCard_title">About</h2><p class="pnCard_desc">The hook and the full story.</p></div><div class="pnCard_body">
                    ${editField("ppShort", "Short intro", { value: current.aboutShort, placeholder: "2-3 sentences shown on cards" })}
                    <div class="pnField"><label class="pnLabel" for="ppBio">Full bio</label><textarea class="pnTextarea" id="ppBio" name="bio">${esc(current.bio)}</textarea></div>
                    ${editField("ppTopics", "Topics (comma separated)", { value: current.topics.join(", "), placeholder: "Technology, Interviews" })}
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
                    ${editField("ppBooking", "Booking URL", { type: "url", value: current.bookingUrl, placeholder: "https://calendly.com/…" })}
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
    const [overrides, setOverrides] = React.useState({});
    React.useEffect(() => {
        const onHashChange = () => setRoute(currentView());
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);
    React.useEffect(() => {
        if (!ref.current) return;
        if (route.view === "edit" || route.view === "create") {
            renderEdit(ref.current, { api, overrides, setOverrides });
        } else {
            void renderSummary(ref.current, { api, overrides, setOverrides, who: route.who });
        }
        ref.current.firstElementChild?.scrollIntoView({ block: "start" });
    }, [route, overrides, api]);
    return React.createElement("div", { ref, className: "podaProfilePageHost" });
}

const STUDIO_NAV_STYLES = `
.podaStudioNav { margin: 0 clamp(4px, 2vw, 16px); padding-top: 18px; align-self: flex-start; }
`;

function studioRoute() {
    const hash = window.location.hash;
    const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
    const params = new URLSearchParams(query);
    if (params.get("new") === "podcast") return { view: "new-podcast" };
    if (params.get("new") === "episode") return { view: "new-episode" };
    if (params.get("podcast")) return { view: "detail", id: params.get("podcast") };
    if (params.get("episode")) return { view: "episodeDetail", id: params.get("episode") };
    if (params.get("section") === "episodes")
        return { view: "episodes", filter: params.get("podcastFilter") || null, status: params.get("status") || null };
    return { view: "list" };
}

function studioNavigate(route) {
    const query = new URLSearchParams();
    if (route.view === "new-podcast") query.set("new", "podcast");
    if (route.view === "new-episode") query.set("new", "episode");
    if (route.view === "detail") query.set("podcast", route.id);
    if (route.view === "episodeDetail") query.set("episode", route.id);
    if (route.view === "episodes") {
        query.set("section", "episodes");
        if (route.filter) query.set("podcastFilter", route.filter);
        if (route.status) query.set("status", route.status);
    }
    window.location.hash = `/${STUDIO_LOCATION}${query.toString() ? `?${query.toString()}` : ""}`;
}

function studioNavHost(active) {
    const host = document.createElement("div");
    host.innerHTML = `<style>${NATIVE_STYLES}${STUDIO_NAV_STYLES}</style><nav class="podaNative podaStudioNav pnFilters" aria-label="Studio sections">
        <button data-section="podcasts" type="button" aria-pressed="${String(active === "podcasts")}">Podcasts</button>
        <button data-section="episodes" type="button" aria-pressed="${String(active === "episodes")}">Episodes</button>
    </nav>`;
    return host;
}

function StudioPage() {
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

            if (route.view === "new-podcast") {
                const { renderPodcastCreateView } = await import("./studio/podcastCreate.js");
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
                renderEpisodeCreateView(contentHost, {
                    podcasts,
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
                renderEpisodeDetailView(contentHost, episode);
                return;
            }
            if (route.view === "episodes") {
                const { renderEpisodeListView } = await import("./studio/episodeList.js");
                const [episodes, podcasts] = await Promise.all([podaData.listEpisodes(), podaData.listPodcasts()]);
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
            renderStudioListView(contentHost, {
                podcasts,
                onOpen: (id) => studioNavigate({ view: "detail", id }),
                onCreate: () => studioNavigate({ view: "new-podcast" }),
            });
        })();
    }, [route]);
    return React.createElement("div", { ref });
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
        this.api.navigation.registerLocationRenderer(STUDIO_LOCATION, () => React.createElement(StudioPage));
    }
}

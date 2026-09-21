// Module host entry (plain JS for the spike): full creator-profile page using
// the complete donor inventory. Identity comes from the public module API
// (api.profile); creator fields are mock/session-only. Switch between the own
// editable profile and a fully-populated example fixture.
import { renderFullProfileView } from "./shared/profileFullView.js";
import { PROFILE_FIXTURE_MIRA, EMPTY_CREATOR_FIELDS, SOCIAL_SERVICES } from "./shared/profileFixtures.js";

export const PROFILE_LOCATION = "io.poda.profile-spike.profile";

import { renderStudioView } from "./shared/podcastFullView.js";
import { podaData } from "./data/mockAdapter.js";

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
.podaProfilePage { font-family: Inter, system-ui, sans-serif; padding: 24px clamp(12px, 4vw, 40px); background: #fffdf9; box-sizing: border-box; flex: 1 1 auto; min-height: 0; overflow-y: auto; }
.podaProfilePage_switch { display: inline-flex; gap: 4px; padding: 4px; border: 1px solid #e2c4aa; border-radius: 12px; background: #fff8e8; margin-bottom: 18px; }
.podaProfilePage_switch button { border: none; background: transparent; padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #6b5142; cursor: pointer; }
.podaProfilePage_switch button[aria-selected="true"] { background: linear-gradient(120deg, #f9ba51, #efa43e); color: #332216; box-shadow: 0 4px 10px #f9ba5133; }
.podaProfilePage_actions { display: flex; gap: 10px; margin-top: 20px; }
.podaProfileCreate_check { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #332216; }
.podaProfileCreate_row { margin-top: 10px; }
.podaProfileCreate_row label { display: block; font-size: 12px; font-weight: 600; color: #563522; margin-bottom: 4px; }
.podaProfileCreate_row select { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #e2c4aa; border-radius: 10px; background: #fffdf9; color: #332216; font-size: 13px; }
.podaProfileCreate_cardRow, .podaProfileCreate_rowPair { border: 1px solid #f4e7d8; border-radius: 12px; padding: 12px; margin-bottom: 10px; }
.podaProfileCreate_remove { margin-top: 10px; padding: 6px 12px; font-size: 12px; }
.podaProfilePage_btn { padding: 9px 16px; border-radius: 10px; border: 1px solid #c9a58a; background: #fff; color: #563522; font-size: 13px; font-weight: 600; cursor: pointer; }
.podaProfilePage_btn--primary { border: none; background: linear-gradient(120deg, #f9ba51, #efa43e); color: #332216; box-shadow: 0 5px 14px #33221626; }
.podaProfileCreate { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #e2c4aa; border-radius: 18px; padding: 28px; box-shadow: 0 8px 24px #33221626; }
.podaProfileCreate h2 { margin: 0 0 4px; color: #332216; font-size: 22px; }
.podaProfileCreate .hint { color: #6b5142; font-size: 13px; margin: 0 0 18px; }
.podaProfileCreate fieldset { border: 1px solid #f4e7d8; border-radius: 12px; padding: 14px; margin: 0 0 14px; }
.podaProfileCreate legend { font-size: 12px; font-weight: 700; color: #743719; padding: 0 6px; }
.podaProfileCreate label { display: block; font-size: 12px; font-weight: 600; color: #563522; margin: 10px 0 4px; }
.podaProfileCreate input, .podaProfileCreate textarea { width: 100%; box-sizing: border-box; padding: 9px 12px; border: 1px solid #e2c4aa; border-radius: 10px; background: #fffdf9; color: #332216; font-size: 14px; font-family: inherit; }
.podaProfileCreate textarea { min-height: 84px; resize: vertical; }
.podaProfileCreate input:focus, .podaProfileCreate textarea:focus { outline: 2px solid #f9ba51; outline-offset: 1px; }
.podaProfileCreate_grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; }
`;

function resolveOwnProfile(api, overrides) {
    const base = api.profile.value ?? {};
    return {
        ...EMPTY_CREATOR_FIELDS,
        ...overrides,
        socialLinks: { ...EMPTY_CREATOR_FIELDS.socialLinks, ...(overrides.socialLinks ?? {}) },
        displayName: overrides.displayName ?? base.displayName ?? base.userId ?? "Unknown user",
        userId: base.userId,
    };
}

function pageShell(container) {
    container.innerHTML = `<style>${PAGE_STYLES}</style><div class="podaProfilePage"><div class="podaProfilePage_switch" role="tablist">
        <button data-who="me" role="tab">My profile</button>
        <button data-who="mira" role="tab">Mira Chen (example)</button>
    </div><div class="podaProfilePage_body"></div></div>`;
    const body = container.querySelector(".podaProfilePage_body");
    container.querySelectorAll(".podaProfilePage_switch button").forEach((b) => {
        b.addEventListener("click", () => navigateTo("summary", b.dataset.who));
    });
    return body;
}

function renderSummary(container, { api, overrides, who }) {
    const body = pageShell(container);
    container.querySelectorAll(".podaProfilePage_switch button").forEach((b) =>
        b.setAttribute("aria-selected", String(b.dataset.who === who)),
    );
    const profile = who === "mira" ? PROFILE_FIXTURE_MIRA : resolveOwnProfile(api, overrides);
    const isOwn = who === "me";
    renderFullProfileView(body, {
        profile,
        hostLabel: `module (app page) — ${isOwn ? "own profile" : "example fixture"}`,
        extraActionsHtml: isOwn
            ? `<div class="podaProfilePage_actions"><button class="podaProfilePage_btn podaProfilePage_btn--primary" id="podaProfileEditLink" type="button">Edit profile</button></div>`
            : "",
    });
    if (isOwn) {
        body.querySelector("#podaProfileEditLink")?.addEventListener("click", () => navigateTo("edit", "me"));
        const identity = document.createElement("p");
        identity.style.cssText = "margin-top:14px;font-size:12px;color:#a58e7f";
        identity.textContent = `Signed in as ${profile.userId ?? "unknown"} · creator fields are session-only`;
        body.querySelector(".podaFullProfile")?.appendChild(identity);
    }
}

const escAttr = (v) => String(v ?? "").replace(/"/g, "&quot;");

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
    return `<div class="podaProfileCreate_row"><label for="vis_${sectionKey}">${sectionKey === "bestFitFor" ? "Best fit" : sectionKey.replace(/[A-Z]/g, (m) => " " + m.toLowerCase())}</label><select id="vis_${sectionKey}" name="vis_${sectionKey}">${options}</select></div>`;
}

function renderEdit(container, { api, overrides, setOverrides }) {
    const current = resolveOwnProfile(api, overrides);
    const socialInputs = SOCIAL_SERVICES.map(
        (svc) => `<label for="pp_s_${svc}">${svc}</label><input id="pp_s_${svc}" name="social_${svc}" value="${escAttr(current.socialLinks?.[svc])}" placeholder="https://" />`,
    ).join("");

    const expertiseRows = (current.expertiseCards ?? [])
        .map(
            (c, i) => `<div class="podaProfileCreate_cardRow" data-exp-row>
                <div class="podaProfileCreate_grid">
                    <div><label>Card title</label><input name="exp_title_${i}" value="${escAttr(c.title)}" /></div>
                    <div><label>Icon name</label><input name="exp_icon_${i}" value="${escAttr(c.icon ?? "")}" placeholder="Target" /></div>
                </div>
                <label>Description</label><input name="exp_desc_${i}" value="${escAttr(c.description)}" />
                <button type="button" class="podaProfilePage_btn podaProfileCreate_remove" data-remove-row>Remove card</button>
            </div>`,
        )
        .join("");
    const customRows = (current.customFields ?? [])
        .map(
            (f, i) => `<div class="podaProfileCreate_rowPair" data-cf-row>
                <div class="podaProfileCreate_grid">
                    <div><label>Field name</label><input name="cf_name_${i}" value="${escAttr(f.name)}" /></div>
                    <div><label>Value</label><input name="cf_value_${i}" value="${escAttr(f.value)}" /></div>
                </div>
                <button type="button" class="podaProfilePage_btn podaProfileCreate_remove" data-remove-row>Remove field</button>
            </div>`,
        )
        .join("");
    const visRows = VIS_SECTIONS.map(([key, label]) => visibilitySelect(key, current.sectionVisibility?.[key] ?? "public")).join("");

    container.innerHTML = `
        <style>${PAGE_STYLES}</style>
        <div class="podaProfilePage"><div class="podaProfileCreate">
            <h2>Edit creator profile</h2>
            <p class="hint">Signed in as ${current.userId ?? "unknown"} — session-only mock; a reload discards edits.</p>
            <form id="podaProfileCreateForm">
                <fieldset><legend>Identity</legend>
                    <div class="podaProfileCreate_grid">
                        <div><label for="ppName">Display name</label><input id="ppName" name="displayName" required value="${escAttr(current.displayName)}" /></div>
                        <div><label for="ppSlug">Profile slug</label><input id="ppSlug" name="slug" value="${escAttr(current.slug)}" placeholder="your-name" /></div>
                    </div>
                    <label for="ppHeadline">Headline</label><input id="ppHeadline" name="headline" value="${escAttr(current.headline)}" placeholder="Podcast host and producer" />
                    <label for="ppTagline">Tagline</label><input id="ppTagline" name="tagline" value="${escAttr(current.tagline)}" placeholder="One-line promise" />
                </fieldset>
                <fieldset><legend>Media</legend>
                    <div class="podaProfileCreate_grid">
                        <div><label for="ppAvatar">Avatar URL (mock)</label><input id="ppAvatar" name="avatarUrl" type="url" value="${escAttr(current.avatarUrl)}" placeholder="https://…/avatar.png" /></div>
                        <div><label for="ppBanner">Banner URL (mock)</label><input id="ppBanner" name="bannerUrl" type="url" value="${escAttr(current.bannerUrl)}" placeholder="https://…/banner.png" /></div>
                    </div>
                    <label for="ppIntroVideo">Intro video URL</label><input id="ppIntroVideo" name="introVideoUrl" type="url" value="${escAttr(current.introVideoUrl)}" placeholder="https://…/intro.mp4" />
                </fieldset>
                <fieldset><legend>About</legend>
                    <label for="ppShort">Short intro</label><input id="ppShort" name="aboutShort" value="${escAttr(current.aboutShort)}" placeholder="2-3 sentences shown on cards" />
                    <label for="ppBio">Full bio</label><textarea id="ppBio" name="bio">${escAttr(current.bio)}</textarea>
                    <label for="ppTopics">Topics (comma separated)</label><input id="ppTopics" name="topics" value="${escAttr(current.topics.join(", "))}" placeholder="Technology, Interviews" />
                </fieldset>
                <fieldset><legend>Expertise cards</legend>
                    <div id="ppExpRows">${expertiseRows}</div>
                    <button type="button" class="podaProfilePage_btn" id="ppAddExp">+ Add expertise card</button>
                </fieldset>
                <fieldset><legend>Custom fields</legend>
                    <div id="ppCfRows">${customRows}</div>
                    <button type="button" class="podaProfilePage_btn" id="ppAddCf">+ Add custom field</button>
                </fieldset>
                <fieldset><legend>Links & booking</legend>
                    <div class="podaProfileCreate_grid">${socialInputs}</div>
                    <label for="ppBooking">Booking URL</label><input id="ppBooking" name="bookingUrl" type="url" value="${escAttr(current.bookingUrl)}" placeholder="https://calendly.com/…" />
                </fieldset>
                <fieldset><legend>Status</legend>
                    <div class="podaProfileCreate_grid">
                        <div><label for="ppStatus">Profile status</label>
                            <select id="ppStatus" name="profileStatus">
                                <option value="draft" ${current.profileStatus === "draft" ? "selected" : ""}>Draft</option>
                                <option value="published" ${current.profileStatus === "published" ? "selected" : ""}>Published</option>
                            </select></div>
                        <div><label class="podaProfileCreate_check"><input type="checkbox" id="ppPublic" name="isPublic" ${current.isPublic ? "checked" : ""} /> Public profile (listed in the directory)</label></div>
                    </div>
                </fieldset>
                <fieldset><legend>Section visibility</legend>
                    <div class="podaProfileCreate_grid">${visRows}</div>
                </fieldset>
                <div class="podaProfilePage_actions">
                    <button class="podaProfilePage_btn podaProfilePage_btn--primary" type="submit">Save profile</button>
                    <button class="podaProfilePage_btn" type="button" id="ppCancel">Cancel</button>
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
        row.innerHTML = `<div class="podaProfileCreate_grid">
            <div><label>Card title</label><input name="exp_title_${expCount}" /></div>
            <div><label>Icon name</label><input name="exp_icon_${expCount}" placeholder="Target" /></div>
        </div>
        <label>Description</label><input name="exp_desc_${expCount}" />
        <button type="button" class="podaProfilePage_btn podaProfileCreate_remove" data-remove-row>Remove card</button>`;
        host.appendChild(row);
        expCount++;
    });
    container.querySelector("#ppAddCf").addEventListener("click", () => {
        const host = container.querySelector("#ppCfRows");
        const row = document.createElement("div");
        row.className = "podaProfileCreate_rowPair";
        row.dataset.cfRow = "";
        row.innerHTML = `<div class="podaProfileCreate_grid">
            <div><label>Field name</label><input name="cf_name_${cfCount}" /></div>
            <div><label>Value</label><input name="cf_value_${cfCount}" /></div>
        </div>
        <button type="button" class="podaProfilePage_btn podaProfileCreate_remove" data-remove-row>Remove field</button>`;
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
            const v = String(data.get(`social_${svc}`) ?? "").trim();
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
            topics: String(data.get("topics") ?? "").split(",").map((t) => t.trim()).filter(Boolean),
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
            renderSummary(ref.current, { api, overrides, who: route.who });
        }
        ref.current.firstElementChild?.scrollIntoView({ block: "start" });
    }, [route, overrides]);
    return React.createElement("div", { ref, className: "podaProfilePageHost" });
}

const STUDIO_NAV_STYLES = `
.podaStudioNav { display: inline-flex; gap: 4px; padding: 4px; border: 1px solid #e2c4aa; border-radius: 12px; background: #fff8e8; margin: 18px clamp(12px, 4vw, 40px) 0; align-self: flex-start; }
.podaStudioNav button { border: none; background: transparent; padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #6b5142; cursor: pointer; }
.podaStudioNav button[aria-selected="true"] { background: linear-gradient(120deg, #f9ba51, #efa43e); color: #332216; box-shadow: 0 4px 10px #f9ba5133; }
`;

function studioRoute() {
    const hash = window.location.hash;
    const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
    const params = new URLSearchParams(query);
    if (params.get("new") === "podcast") return { view: "new-podcast" };
    if (params.get("new") === "episode") return { view: "new-episode" };
    if (params.get("podcast")) return { view: "detail", id: params.get("podcast") };
    if (params.get("episode")) return { view: "episodeDetail", id: params.get("episode") };
    if (params.get("section") === "episodes") return { view: "episodes", filter: params.get("podcastFilter") || null };
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
    }
    window.location.hash = `/${STUDIO_LOCATION}${query.toString() ? `?${query.toString()}` : ""}`;
}

function studioNavHost() {
    const host = document.createElement("div");
    host.innerHTML = `<style>${STUDIO_NAV_STYLES}</style><nav class="podaStudioNav" aria-label="Studio sections">
        <button data-section="podcasts" type="button">Podcasts</button>
        <button data-section="episodes" type="button">Episodes</button>
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
                const nav = studioNavHost();
                const active = route.view === "episodes" ? "episodes" : "podcasts";
                nav.querySelectorAll("button").forEach((b) => {
                    b.setAttribute("aria-selected", String(b.dataset.section === active));
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
                    onSubmit: async (draft) => {
                        const created = await podaData.savePodcast(draft);
                        studioNavigate({ view: "detail", id: created.id });
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
                    onFilter: (id) => studioNavigate({ view: "episodes", filter: id }),
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

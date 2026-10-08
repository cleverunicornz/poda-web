/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Studio routes as plain data, parsed from and written to the location hash.

export const STUDIO_LOCATION = "io.poda.profile-spike.studio";

export function parseStudioRoute(hash) {
    const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
    const params = new URLSearchParams(query);
    if (params.get("new") === "podcast") return { view: "new-podcast" };
    if (params.get("new") === "episode") return { view: "new-episode", podcastId: params.get("podcast") || null };
    if (params.get("podcast")) return { view: "detail", id: params.get("podcast") };
    if (params.get("episode")) return { view: "episodeDetail", id: params.get("episode") };
    if (params.get("section") === "episodes")
        return { view: "episodes", filter: params.get("podcastFilter") || null, status: params.get("status") || null };
    return { view: "list" };
}

export function studioRouteHash(route) {
    const query = new URLSearchParams();
    if (route.view === "new-podcast") query.set("new", "podcast");
    if (route.view === "new-episode") {
        query.set("new", "episode");
        if (route.podcastId) query.set("podcast", route.podcastId);
    }
    if (route.view === "detail") query.set("podcast", route.id);
    if (route.view === "episodeDetail") query.set("episode", route.id);
    if (route.view === "episodes") {
        query.set("section", "episodes");
        if (route.filter) query.set("podcastFilter", route.filter);
        if (route.status) query.set("status", route.status);
    }
    return `/${STUDIO_LOCATION}${query.toString() ? `?${query.toString()}` : ""}`;
}

/**
 * The navigation offered above a Studio detail page (G-000023): a way back to
 * its collection and the natural next step.
 */
export function detailActions(route, { podcastId } = {}) {
    if (route.view === "detail") {
        return [
            { id: "back", label: "Back to podcasts", to: { view: "list" } },
            { id: "new-episode", label: "New episode", to: { view: "new-episode", podcastId: route.id } },
        ];
    }
    if (route.view === "episodeDetail") {
        const actions = [{ id: "back", label: "Back to episodes", to: { view: "episodes" } }];
        if (podcastId) actions.push({ id: "podcast", label: "Open podcast", to: { view: "detail", id: podcastId } });
        return actions;
    }
    return [];
}

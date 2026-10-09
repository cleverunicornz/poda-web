/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import { detailActions, parseStudioRoute, studioRouteHash } from "./routes.js";

describe("studio routes", () => {
    it.each([
        [{ view: "list" }],
        [{ view: "new-podcast" }],
        [{ view: "new-episode", podcastId: null }],
        [{ view: "new-episode", podcastId: "pod-1" }],
        [{ view: "detail", id: "pod-1" }],
        [{ view: "episodeDetail", id: "ep-1" }],
        [{ view: "episodes", filter: null, status: null }],
        [{ view: "episodes", filter: "pod-1", status: "draft" }],
    ])("round-trips %j through the hash", (route) => {
        expect(parseStudioRoute(`#${studioRouteHash(route)}`)).toEqual(route);
    });

    it("keeps the existing hash for a new episode without a podcast", () => {
        expect(studioRouteHash({ view: "new-episode" })).toBe("/io.poda.profile-spike.studio?new=episode");
    });

    it("offers back and new-episode on a podcast detail page", () => {
        expect(detailActions({ view: "detail", id: "pod-1" })).toEqual([
            { id: "back", label: "Back to podcasts", to: { view: "list" } },
            { id: "new-episode", label: "New episode", to: { view: "new-episode", podcastId: "pod-1" } },
        ]);
    });

    it("offers back and the parent podcast on an episode detail page", () => {
        expect(detailActions({ view: "episodeDetail", id: "ep-1" }, { podcastId: "pod-1" })).toEqual([
            { id: "back", label: "Back to episodes", to: { view: "episodes" } },
            { id: "podcast", label: "Open podcast", to: { view: "detail", id: "pod-1" } },
        ]);
        expect(detailActions({ view: "episodeDetail", id: "ep-1" })).toEqual([
            { id: "back", label: "Back to episodes", to: { view: "episodes" } },
        ]);
    });

    it("adds Share to chat on both detail pages when posting is available (D-000030)", () => {
        expect(detailActions({ view: "detail", id: "pod-1" }, { canShare: true }).at(-1)).toEqual({
            id: "share",
            label: "Share to chat",
            share: { kind: "podcast", id: "pod-1" },
        });
        expect(
            detailActions({ view: "episodeDetail", id: "ep-1" }, { podcastId: "pod-1", canShare: true }).at(-1),
        ).toEqual({
            id: "share",
            label: "Share to chat",
            share: { kind: "episode", id: "ep-1" },
        });
    });

    it("offers nothing elsewhere", () => {
        expect(detailActions({ view: "list" })).toEqual([]);
    });
});

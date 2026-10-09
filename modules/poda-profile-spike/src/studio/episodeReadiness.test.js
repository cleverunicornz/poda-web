/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import { readiness } from "./episodeCreate.js";

describe("episode readiness", () => {
    // The season is required and the episode number optional (G-000019).
    it("counts title and season as done without an episode number", () => {
        const [first] = readiness({ title: "Pilot", seasonNumber: 1, episodeNumber: null }).items;
        expect(first).toEqual(["Title and season", true, null]);
    });

    it("needs both title and season", () => {
        expect(readiness({ title: "Pilot", seasonNumber: null }).items[0][1]).toBe(false);
        expect(readiness({ title: " ", seasonNumber: 1 }).items[0][1]).toBe(false);
    });
});

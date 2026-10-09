/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import { episodeLabel, episodeNumberLabel } from "./podcastFullView.js";

describe("episodeNumberLabel", () => {
    it.each([
        [3, 1, "S3E1"],
        [null, 1, "E1"],
        [undefined, 12, "E12"],
        [3, null, "S3"],
        [null, null, ""],
        [0, 0, "S0E0"],
    ])("season %s, episode %s -> %j", (season, episode, expected) => {
        expect(episodeNumberLabel(season, episode)).toBe(expected);
    });
});

describe("episodeLabel (D-000031)", () => {
    it.each([
        [{ seasonNumber: 2, episodeNumber: 4, episodeType: "full" }, "S2E4"],
        [{ seasonNumber: 1, episodeNumber: null, episodeType: "trailer" }, "S1 · Trailer"],
        [{ seasonNumber: 1, episodeNumber: 3, episodeType: "bonus" }, "S1E3 · Bonus"],
        [{ seasonNumber: 1, episodeNumber: null }, "S1"],
    ])("%j → %s", (episode, expected) => {
        expect(episodeLabel(episode)).toBe(expected);
    });
});

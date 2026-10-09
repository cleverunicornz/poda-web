/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// User-facing copy must not claim behavior the module lacks or show design notes (G-000021).
const source = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("creation flow copy", () => {
    it.each([
        ["./episodeCreate.js", ["kept in this browser", "Local draft state"]],
        ["./podcastCreate.js", ["should feel like", "vibe", "Ready to publish"]],
        ["../shared/profileFullView.js", ["Click any text to edit"]],
    ])("%s carries none of the retired claims", (path, phrases) => {
        const text = source(path);
        for (const phrase of phrases) expect(text).not.toContain(phrase);
    });

    it("states that the episode draft is session-only", () => {
        expect(source("./episodeCreate.js")).toContain("Nothing is saved until you create the episode");
    });
});

// Page sections are spaced by the standard stack (24px), including inside the creation forms.
describe("creation form layout", () => {
    it.each([
        ["./podcastCreate.js", "podaPodcastCreateForm"],
        ["./episodeCreate.js", "podaEpisodeCreateForm"],
    ])("%s stacks its sections with the standard spacing", (path, id) => {
        expect(source(path)).toContain(`<form id="${id}" class="pnStack" novalidate>`);
    });
});

/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import { fullProfileMarkup } from "./profileFullView.js";
import { EMPTY_CREATOR_FIELDS } from "./profileFixtures.js";

const empty = { ...EMPTY_CREATOR_FIELDS, displayName: "Demo Creator" };

describe("fullProfileMarkup hideEmpty (another member's profile)", () => {
    it("leaves out empty sections and unset links", () => {
        const html = fullProfileMarkup(empty, { hideEmpty: true });
        expect(html).toContain("Demo Creator");
        expect(html).not.toContain("not set");
        expect(html).not.toContain("<section");
    });

    it("keeps filled sections and only the links that are set", () => {
        const html = fullProfileMarkup(
            {
                ...empty,
                bio: "Runs community calls.",
                socialLinks: { ...empty.socialLinks, website: "https://demo.example" },
            },
            { hideEmpty: true },
        );
        expect(html).toContain("Runs community calls.");
        expect(html).toContain("https://demo.example");
        expect(html).not.toContain("not set");
        expect(html).not.toContain("linkedin");
    });

    it("still lists every section for the default view", () => {
        expect(fullProfileMarkup(empty)).toContain("not set");
    });
});

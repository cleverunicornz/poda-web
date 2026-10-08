/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import { isOwnProfileWidget } from "./widgetApproval.js";

const app = "https://app.poda.example";
const query = "?matrix_user_id=$matrix_user_id&theme=$org.matrix.msc2873.client_theme";

describe("isOwnProfileWidget", () => {
    it.each([
        [`${app}/widgets/poda-profile/index.html${query}`, true],
        [`${app}/widgets/poda-profile/${query}`, true],
        [`https://evil.example/widgets/poda-profile/index.html${query}`, false],
        [`${app}/widgets/other/index.html`, false],
        [`${app}/widgets/poda-profile/index.html/../../evil`, false],
        [`http://app.poda.example/widgets/poda-profile/index.html`, false],
        ["not a url", false],
    ])("%s → %s", (templateUrl, expected) => {
        expect(isOwnProfileWidget({ type: "io.poda.profile", templateUrl }, app)).toBe(expected);
    });

    it("requires the Poda profile widget type", () => {
        expect(isOwnProfileWidget({ type: "m.custom", templateUrl: `${app}/widgets/poda-profile/` }, app)).toBe(false);
    });
});

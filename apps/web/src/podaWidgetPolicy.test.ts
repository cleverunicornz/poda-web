/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import { PODA_PROFILE_WIDGET_TYPE, isSidePanelOnlyWidget } from "./podaWidgetPolicy";

describe("podaWidgetPolicy", () => {
    it("treats the Poda profile widget as side-panel-only", () => {
        expect(PODA_PROFILE_WIDGET_TYPE).toBe("io.poda.profile");
        expect(isSidePanelOnlyWidget({ type: "io.poda.profile" })).toBe(true);
    });

    it.each(["m.custom", "jitsi", "m.jitsi", "io.poda.profile.other"])("leaves %s widgets alone", (type) => {
        expect(isSidePanelOnlyWidget({ type })).toBe(false);
    });
});

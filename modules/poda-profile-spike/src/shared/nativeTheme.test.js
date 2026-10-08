/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import { NATIVE_STYLES } from "./nativeTheme.js";

describe("native theme", () => {
    // Forms hide their error banner with the hidden attribute once no field error is left; the banner's own
    // display rule must not override it (G-000033).
    it("hides an error banner that carries the hidden attribute", () => {
        expect(NATIVE_STYLES).toMatch(/\.pnError\[hidden\]\s*\{\s*display:\s*none;\s*\}/);
    });
});

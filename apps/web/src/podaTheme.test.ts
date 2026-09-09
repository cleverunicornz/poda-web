/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import {
    PODA_CUSTOM_THEMES,
    PODA_DARK_THEME,
    PODA_DARK_THEME_ID,
    PODA_LIGHT_THEME,
    PODA_LIGHT_THEME_ID,
    isPodaThemeId,
} from "./podaTheme";

function relativeLuminance(hex: string): number {
    const channels = [1, 3, 5]
        .map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255)
        .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first: string, second: string): number {
    const firstLuminance = relativeLuminance(first);
    const secondLuminance = relativeLuminance(second);
    return (Math.max(firstLuminance, secondLuminance) + 0.05) / (Math.min(firstLuminance, secondLuminance) + 0.05);
}

describe("Poda themes", () => {
    it("exposes a paired light and dark custom-theme family", () => {
        expect(PODA_CUSTOM_THEMES).toEqual([PODA_LIGHT_THEME, PODA_DARK_THEME]);
        expect(PODA_LIGHT_THEME_ID).toBe("custom-Poda Light");
        expect(PODA_DARK_THEME_ID).toBe("custom-Poda Dark");
        expect(PODA_LIGHT_THEME.is_dark).toBe(false);
        expect(PODA_DARK_THEME.is_dark).toBe(true);
        expect(isPodaThemeId(PODA_LIGHT_THEME_ID)).toBe(true);
        expect(isPodaThemeId(PODA_DARK_THEME_ID)).toBe(true);
        expect(isPodaThemeId("light")).toBe(false);
    });

    it("uses only locally bundled fonts and valid Compound custom properties", () => {
        for (const theme of PODA_CUSTOM_THEMES) {
            expect(theme.fonts?.faces).toEqual([]);
            expect(theme.fonts?.general).toContain("Inter");
            for (const token of Object.keys(theme.compound ?? {})) {
                expect(token).toMatch(/^--cpd-[a-z0-9-]+$/u);
            }
        }
    });

    it("keeps core text and action pairs at normal-text contrast", () => {
        for (const theme of PODA_CUSTOM_THEMES) {
            const compound = theme.compound!;
            expect(
                contrastRatio(compound["--cpd-color-text-primary"], compound["--cpd-color-bg-canvas-default"]),
            ).toBeGreaterThanOrEqual(4.5);
            expect(
                contrastRatio(
                    compound["--cpd-color-text-on-solid-primary"],
                    compound["--cpd-color-bg-action-primary-rest"],
                ),
            ).toBeGreaterThanOrEqual(4.5);
            expect(contrastRatio("#ffffff", theme.colors!["accent-color"])).toBeGreaterThanOrEqual(4.5);
        }
    });

    it("does not remap Compound success or critical semantics to brand colors", () => {
        for (const theme of PODA_CUSTOM_THEMES) {
            expect(Object.keys(theme.compound ?? {}).some((token) => /critical|success/u.test(token))).toBe(false);
        }
    });
});

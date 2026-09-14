/*
Copyright 2024 New Vector Ltd.
Copyright 2021 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// @vitest-environment happy-dom

import { beforeEach, describe, it, expect } from "vitest";

import SettingsStore from "../SettingsStore";
import ThemeWatcher from "./ThemeWatcher";
import { type SettingLevel } from "../SettingLevel";
import { type SettingKey, type Settings } from "../Settings.tsx";
import SdkConfig from "../../SdkConfig";
import { PODA_DARK_THEME_ID, PODA_LIGHT_THEME_ID } from "../../podaTheme";

function makeMatchMedia(values: any) {
    class FakeMediaQueryList {
        matches: false;
        media?: null;
        onchange?: null;
        addListener() {}
        removeListener() {}
        addEventListener() {}
        removeEventListener() {}
        dispatchEvent() {
            return true;
        }

        constructor(query: string) {
            this.matches = values[query];
        }
    }

    return function matchMedia(query: string) {
        return new FakeMediaQueryList(query) as unknown as MediaQueryList;
    };
}

function makeGetValue(values: any): any {
    return function getValue<S extends SettingKey>(
        settingName: S,
        _roomId: string | null = null,
        _excludeDefault = false,
    ): Settings[S] {
        return values[settingName];
    };
}

function makeGetValueAt(values: any) {
    return function getValueAt(
        _level: SettingLevel,
        settingName: string,
        _roomId: string | null = null,
        _explicit = false,
        _excludeDefault = false,
    ): any {
        return values[settingName];
    };
}

describe("ThemeWatcher", function () {
    beforeEach(() => {
        SdkConfig.put({ default_theme: "light" });
    });

    it("should choose a light theme by default", () => {
        // Given no system settings
        global.matchMedia = makeMatchMedia({});

        // Then getEffectiveTheme returns light
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("light");
    });

    it("should choose default theme if system settings are inconclusive", () => {
        // Given no system settings but we asked to use them
        global.matchMedia = makeMatchMedia({});
        SettingsStore.getValue = makeGetValue({
            use_system_theme: true,
            theme: "light",
        });

        // Then getEffectiveTheme returns light
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("light");
    });

    it("should choose a dark theme if that is selected", () => {
        // Given system says light high contrast but theme is set to dark
        global.matchMedia = makeMatchMedia({
            "(prefers-contrast: more)": true,
            "(prefers-color-scheme: light)": true,
        });
        SettingsStore.getValueAt = makeGetValueAt({ theme: "dark" });

        // Then getEffectiveTheme returns dark
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("dark");
    });

    it("should choose a light theme if that is selected", () => {
        // Given system settings say dark high contrast but theme set to light
        global.matchMedia = makeMatchMedia({
            "(prefers-contrast: more)": true,
            "(prefers-color-scheme: dark)": true,
        });
        SettingsStore.getValueAt = makeGetValueAt({ theme: "light" });

        // Then getEffectiveTheme returns light
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("light");
    });

    it("should choose a light-high-contrast theme if that is selected", () => {
        // Given system settings say dark and theme set to light-high-contrast
        global.matchMedia = makeMatchMedia({ "(prefers-color-scheme: dark)": true });
        SettingsStore.getValueAt = makeGetValueAt({ theme: "light-high-contrast" });

        // Then getEffectiveTheme returns light-high-contrast
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("light-high-contrast");
    });

    it("should choose a light theme if system prefers it (via default)", () => {
        // Given system prefers lightness, even though we did not
        // click "Use system theme" or choose a theme explicitly
        global.matchMedia = makeMatchMedia({ "(prefers-color-scheme: light)": true });
        SettingsStore.getValueAt = makeGetValueAt({});
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        // Then getEffectiveTheme returns light
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("light");
    });

    it("should choose a dark theme if system prefers it (via default)", () => {
        // Given system prefers darkness, even though we did not
        // click "Use system theme" or choose a theme explicitly
        global.matchMedia = makeMatchMedia({ "(prefers-color-scheme: dark)": true });
        SettingsStore.getValueAt = makeGetValueAt({});
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        // Then getEffectiveTheme returns dark
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("dark");
    });

    it("should choose a light theme if system prefers it (explicit)", () => {
        // Given system prefers lightness
        global.matchMedia = makeMatchMedia({ "(prefers-color-scheme: light)": true });
        SettingsStore.getValueAt = makeGetValueAt({ use_system_theme: true });
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        // Then getEffectiveTheme returns light
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("light");
    });

    it("should choose a dark theme if system prefers it (explicit)", () => {
        // Given system prefers darkness
        global.matchMedia = makeMatchMedia({ "(prefers-color-scheme: dark)": true });
        SettingsStore.getValueAt = makeGetValueAt({ use_system_theme: true });
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        // Then getEffectiveTheme returns dark
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("dark");
    });

    it("should choose a high-contrast theme if system prefers it", () => {
        // Given system prefers high contrast and light
        global.matchMedia = makeMatchMedia({
            "(prefers-contrast: more)": true,
            "(prefers-color-scheme: light)": true,
        });
        SettingsStore.getValueAt = makeGetValueAt({ use_system_theme: true });
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        // Then getEffectiveTheme returns light-high-contrast
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("light-high-contrast");
    });

    it("should not choose a high-contrast theme if not available", () => {
        // Given system prefers high contrast and dark, but we don't (yet)
        // have a high-contrast dark theme
        global.matchMedia = makeMatchMedia({
            "(prefers-contrast: more)": true,
            "(prefers-color-scheme: dark)": true,
        });
        SettingsStore.getValueAt = makeGetValueAt({ use_system_theme: true });
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        // Then getEffectiveTheme returns dark
        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("dark");
    });

    it("should identify custom dark themes as dark", () => {
        SettingsStore.getValueAt = makeGetValueAt({ use_system_theme: false, theme: "custom-darkula" });
        SettingsStore.getValue = makeGetValue({
            custom_themes: [
                {
                    name: "darkula",
                    is_dark: true,
                },
            ],
        });

        const themeWatcher = new ThemeWatcher();
        expect(themeWatcher.getEffectiveTheme()).toBe("custom-darkula");
        expect(themeWatcher.isUserOnDarkTheme()).toBe(true);
    });

    it("should choose Poda Light when the configured Poda family follows a light system", () => {
        global.matchMedia = makeMatchMedia({ "(prefers-color-scheme: light)": true });
        SdkConfig.put({ default_theme: PODA_LIGHT_THEME_ID });
        SettingsStore.getValueAt = makeGetValueAt({});
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        expect(new ThemeWatcher().getEffectiveTheme()).toBe(PODA_LIGHT_THEME_ID);
    });

    it("should choose Poda Dark when the configured Poda family follows a dark system", () => {
        global.matchMedia = makeMatchMedia({ "(prefers-color-scheme: dark)": true });
        SdkConfig.put({ default_theme: PODA_LIGHT_THEME_ID });
        SettingsStore.getValueAt = makeGetValueAt({});
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        expect(new ThemeWatcher().getEffectiveTheme()).toBe(PODA_DARK_THEME_ID);
    });

    it("should use the native light high-contrast fallback for Poda Light", () => {
        global.matchMedia = makeMatchMedia({
            "(prefers-color-scheme: light)": true,
            "(prefers-contrast: more)": true,
        });
        SdkConfig.put({ default_theme: PODA_LIGHT_THEME_ID });
        SettingsStore.getValueAt = makeGetValueAt({});
        SettingsStore.getValue = makeGetValue({ use_system_theme: true });

        expect(new ThemeWatcher().getEffectiveTheme()).toBe("light-high-contrast");
    });
});

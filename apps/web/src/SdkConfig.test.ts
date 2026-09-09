/*
Copyright 2024 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, it, expect, beforeEach } from "vitest";

import SdkConfig, { DEFAULTS } from "./SdkConfig";

describe("SdkConfig", () => {
    beforeEach(() => {
        SdkConfig.reset();
    });

    describe("with default values", () => {
        it("should return the default config", () => {
            expect(SdkConfig.get()).toEqual(DEFAULTS);
        });

        it("uses Poda branding and paired themes", () => {
            expect(SdkConfig.get("brand")).toBe("Poda");
            expect(SdkConfig.get("default_theme")).toBe("custom-Poda Light");
            expect(SdkConfig.getObject("branding").get("auth_header_logo_url")).toBe(
                "themes/poda/img/logos/poda-mark.svg",
            );
            expect(SdkConfig.getObject("setting_defaults").get("custom_themes")).toEqual([
                expect.objectContaining({ name: "Poda Light", is_dark: false }),
                expect.objectContaining({ name: "Poda Dark", is_dark: true }),
            ]);
            expect(SdkConfig.getObject("setting_defaults").get("layout")).toBe("bubble");
        });
    });

    describe("with custom values", () => {
        beforeEach(() => {
            SdkConfig.put({
                feedback: {
                    existing_issues_url: "https://existing",
                } as any,
            });
        });

        it("should return the custom config", () => {
            const customConfig = JSON.parse(JSON.stringify(DEFAULTS));
            customConfig.feedback.existing_issues_url = "https://existing";
            expect(SdkConfig.get()).toEqual(customConfig);
        });

        it("should allow overriding individual fields of sub-objects", () => {
            const feedback = SdkConfig.getObject("feedback");
            expect(feedback.get("existing_issues_url")).toMatchInlineSnapshot(`"https://existing"`);
            expect(feedback.get("new_issue_url")).toMatchInlineSnapshot(
                `"https://github.com/vector-im/element-web/issues/new/choose"`,
            );
        });

        it("preserves operator overrides for Poda defaults", () => {
            SdkConfig.put({
                brand: "Operator brand",
                default_theme: "dark",
                branding: {
                    auth_header_logo_url: "operator-logo.svg",
                },
            });

            expect(SdkConfig.get("brand")).toBe("Operator brand");
            expect(SdkConfig.get("default_theme")).toBe("dark");
            expect(SdkConfig.getObject("branding").get("auth_header_logo_url")).toBe("operator-logo.svg");
            expect(SdkConfig.getObject("branding").get("welcome_background_url")).toBe(
                "themes/poda/img/backgrounds/poda-landscape.svg",
            );
        });
    });
});

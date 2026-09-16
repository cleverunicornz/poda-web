/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Page } from "@playwright/test";

import { test, expect } from "../../playwright/element-web-test.ts";
import { DIAGNOSTIC_LOCATION } from "../src/Navigation.tsx";

const themes = [
    { id: "custom-Poda Light", className: "mx_PodaTheme_light" },
    { id: "custom-Poda Dark", className: "mx_PodaTheme_dark" },
] as const;

async function selectTheme(page: Page, theme: string): Promise<void> {
    await page.evaluate((selectedTheme) => {
        const settings = JSON.parse(window.localStorage.getItem("mx_local_settings") ?? "{}");
        window.localStorage.setItem(
            "mx_local_settings",
            JSON.stringify({ ...settings, theme: selectedTheme, use_system_theme: false }),
        );
    }, theme);
    await page.reload();
}

test.use({ displayName: "Poda Gate" });

test("mounts above Element and uses its signed-in navigation lifecycle", async ({ page, user }) => {
    const header = page.getByTestId("poda-navigation-header");
    const matrixChat = page.locator("#matrixchat");
    const diagnosticLink = page.getByRole("link", { name: "Diagnostic workspace" });
    const chatLink = page.getByRole("link", { name: "Chat", exact: true });
    const userId = await page.evaluate(() => window.localStorage.getItem("mx_user_id"));

    expect(userId).toBe(user.userId);
    await expect(header).toBeVisible();
    await expect(diagnosticLink).not.toHaveAttribute("aria-current", "page");

    const bodyBox = await page.locator("body").boundingBox();
    const headerBox = await header.boundingBox();
    const appBox = await matrixChat.boundingBox();
    expect(headerBox!.y).toBeLessThanOrEqual(appBox!.y);
    expect(headerBox!.height + appBox!.height).toBeCloseTo(bodyBox!.height, 0);

    await diagnosticLink.click();
    await expect(page).toHaveURL(new RegExp(`#/${DIAGNOSTIC_LOCATION}$`));
    await expect(page.getByTestId("poda-diagnostic-workspace")).toBeVisible();
    await expect(page.locator(".mx_SpacePanel")).toBeVisible();
    await expect(diagnosticLink).toHaveAttribute("aria-current", "page");
    await expect(page.getByTestId("poda-diagnostic-workspace")).toBeFocused();

    await page.reload();
    await expect(page.getByTestId("poda-diagnostic-workspace")).toBeVisible();
    await expect(diagnosticLink).toHaveAttribute("aria-current", "page");
    const documentId = await page.evaluate(() => {
        const id = crypto.randomUUID();
        Reflect.set(window, "__podaNavigationDocumentId", id);
        return id;
    });

    await chatLink.click();
    await expect(page).toHaveURL(/#\/home$/);
    await expect(page.getByTestId("poda-diagnostic-workspace")).not.toBeVisible();
    await expect(chatLink).toHaveAttribute("aria-current", "page");
    expect(await page.evaluate(() => window.localStorage.getItem("mx_user_id"))).toBe(userId);
    expect(await page.evaluate(() => Reflect.get(window, "__podaNavigationDocumentId"))).toBe(documentId);

    await page.goBack();
    await expect(page.getByTestId("poda-diagnostic-workspace")).toBeVisible();
    await expect(diagnosticLink).toHaveAttribute("aria-current", "page");
    await expect(chatLink).not.toHaveAttribute("aria-current", "page");
    expect(await page.evaluate(() => Reflect.get(window, "__podaNavigationDocumentId"))).toBe(documentId);
    await page.goForward();
    await expect(page).toHaveURL(/#\/home$/);
    await expect(page.getByTestId("poda-diagnostic-workspace")).not.toBeVisible();
    await expect(chatLink).toHaveAttribute("aria-current", "page");
    await expect(diagnosticLink).not.toHaveAttribute("aria-current", "page");
    expect(await page.evaluate(() => Reflect.get(window, "__podaNavigationDocumentId"))).toBe(documentId);
});

test("fits the Poda light and dark presentation matrix", async ({ page, user }) => {
    expect(await page.evaluate(() => window.localStorage.getItem("mx_user_id"))).toBe(user.userId);

    const backgrounds: string[] = [];
    for (const { width, height } of [
        { width: 1440, height: 900 },
        { width: 500, height: 900 },
    ]) {
        await page.setViewportSize({ width, height });
        for (const theme of themes) {
            await selectTheme(page, theme.id);
            await page.getByRole("link", { name: "Diagnostic workspace" }).click();

            const header = page.getByTestId("poda-navigation-header");
            const workspace = page.getByTestId("poda-diagnostic-workspace");
            await expect(page.locator("body")).toHaveClass(new RegExp(theme.className));
            await expect(header).toBeVisible();
            await expect(workspace).toBeVisible();
            await expect(page.getByText("Not exercised by this gate")).toBeVisible();
            expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

            const bodyBox = await page.locator("body").boundingBox();
            const headerBox = await header.boundingBox();
            const appBox = await page.locator("#matrixchat").boundingBox();
            expect(headerBox!.height + appBox!.height).toBeCloseTo(bodyBox!.height, 0);
            backgrounds.push(await header.evaluate((element) => getComputedStyle(element).backgroundColor));
        }
    }

    expect(new Set(backgrounds).size).toBeGreaterThan(1);
});

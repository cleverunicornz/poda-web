/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Page } from "@playwright/test";
import path from "node:path";

import { test, expect } from "../../playwright/element-web-test.ts";

// The header's module destinations are registered by the profile module, which ships beside this one.
const STUDIO_LOCATION = "io.poda.profile-spike.studio";

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

test.use({
    displayName: "Poda Gate",
    modules: async ({ moduleDir }, use) => {
        await use([`${moduleDir}/lib/index.js`, path.join(moduleDir, "../poda-profile-spike/lib/index.js")]);
    },
});

test("offers Chat, Profile and Studio and no Diagnostic workspace", async ({ page, user }) => {
    expect(await page.evaluate(() => window.localStorage.getItem("mx_user_id"))).toBe(user.userId);
    const links = page.getByTestId("poda-navigation-header").getByRole("link");
    await expect(links).toHaveText(["Chat", "Profile", "Studio"]);
    await expect(page.getByRole("link", { name: "Diagnostic workspace" })).toHaveCount(0);
});

test("mounts above Element and uses its signed-in navigation lifecycle", async ({ page, user }) => {
    const header = page.getByTestId("poda-navigation-header");
    const matrixChat = page.locator("#matrixchat");
    const studioLink = page.getByRole("link", { name: "Studio", exact: true });
    const chatLink = page.getByRole("link", { name: "Chat", exact: true });
    const studio = page.getByRole("heading", { name: "Podcasts", exact: true });
    const userId = await page.evaluate(() => window.localStorage.getItem("mx_user_id"));

    expect(userId).toBe(user.userId);
    await expect(header).toBeVisible();
    await expect(studioLink).not.toHaveAttribute("aria-current", "page");

    const bodyBox = await page.locator("body").boundingBox();
    const headerBox = await header.boundingBox();
    const appBox = await matrixChat.boundingBox();
    expect(headerBox!.y).toBeLessThanOrEqual(appBox!.y);
    expect(headerBox!.height + appBox!.height).toBeCloseTo(bodyBox!.height, 0);

    await studioLink.click();
    await expect(page).toHaveURL(new RegExp(`#/${STUDIO_LOCATION}$`));
    await expect(studio).toBeVisible();
    await expect(page.locator(".mx_SpacePanel")).toBeVisible();
    await expect(studioLink).toHaveAttribute("aria-current", "page");

    await page.reload();
    await expect(studio).toBeVisible();
    await expect(studioLink).toHaveAttribute("aria-current", "page");
    const documentId = await page.evaluate(() => {
        const id = crypto.randomUUID();
        Reflect.set(window, "__podaNavigationDocumentId", id);
        return id;
    });

    await chatLink.click();
    await expect(page).toHaveURL(/#\/home$/);
    await expect(studio).not.toBeVisible();
    await expect(chatLink).toHaveAttribute("aria-current", "page");
    expect(await page.evaluate(() => window.localStorage.getItem("mx_user_id"))).toBe(userId);
    expect(await page.evaluate(() => Reflect.get(window, "__podaNavigationDocumentId"))).toBe(documentId);

    await page.goBack();
    await expect(studio).toBeVisible();
    await expect(studioLink).toHaveAttribute("aria-current", "page");
    await expect(chatLink).not.toHaveAttribute("aria-current", "page");
    expect(await page.evaluate(() => Reflect.get(window, "__podaNavigationDocumentId"))).toBe(documentId);
    await page.goForward();
    await expect(page).toHaveURL(/#\/home$/);
    await expect(studio).not.toBeVisible();
    await expect(chatLink).toHaveAttribute("aria-current", "page");
    await expect(studioLink).not.toHaveAttribute("aria-current", "page");
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
            // Wait for the signed-in app before navigating, so its start-up routing cannot replace the hash.
            await expect(page.locator(".mx_SpacePanel")).toBeVisible();
            await page.getByRole("link", { name: "Studio", exact: true }).click();

            const header = page.getByTestId("poda-navigation-header");
            await expect(page.locator("body")).toHaveClass(new RegExp(theme.className));
            await expect(header).toBeVisible();
            await expect(page.getByRole("heading", { name: "Podcasts", exact: true })).toBeVisible();
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

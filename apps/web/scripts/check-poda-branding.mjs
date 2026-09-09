/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDirectory, "..");

const branding = {
    logo_link_url: "#/welcome",
    auth_header_logo_url: "themes/poda/img/logos/poda-mark.svg",
    welcome_background_url: "themes/poda/img/backgrounds/poda-landscape.svg",
};

for (const relativePath of ["config.sample.json", "element.io/app/config.json", "element.io/develop/config.json"]) {
    const config = JSON.parse(readFileSync(path.join(webRoot, relativePath), "utf8"));
    assert.equal(config.brand, "Poda", `${relativePath} brand`);
    assert.equal(config.default_theme, "custom-Poda Light", `${relativePath} default theme`);
    assert.deepEqual(config.branding, branding, `${relativePath} branding paths`);
}

const manifest = JSON.parse(readFileSync(path.join(webRoot, "res/manifest.json"), "utf8"));
assert.equal(manifest.name, "Poda");
assert.equal(manifest.short_name, "Poda");
assert.equal(manifest.theme_color.toLowerCase(), "#f9ba51");
assert.equal(manifest.background_color.toLowerCase(), "#fffdf9");
assert.deepEqual(
    manifest.icons.map(({ src, sizes, type }) => ({ src, sizes, type })),
    [
        {
            src: "/themes/poda/img/logos/poda-mark.svg",
            sizes: "any",
            type: "image/svg+xml",
        },
        {
            src: "/themes/poda/img/logos/poda-mark-25.webp",
            sizes: "25x25",
            type: "image/webp",
        },
    ],
);

const indexHtml = readFileSync(path.join(webRoot, "src/vector/index.html"), "utf8");
for (const expected of [
    "<title>Poda</title>",
    'content="Poda"',
    'content="#f9ba51"',
    "themes/poda/img/logos/poda-mark-500.png",
    "themes/poda/img/logos/poda-mark-25.webp",
    "themes/poda/img/logos/poda-mark.svg",
    "Sorry, Poda requires JavaScript to be enabled.",
]) {
    assert.ok(indexHtml.includes(expected), `index.html should include ${expected}`);
}

for (const relativePath of [
    "res/themes/poda/img/logos/poda-mark.svg",
    "res/themes/poda/img/logos/poda-mark-25.webp",
    "res/themes/poda/img/logos/poda-mark-500.png",
    "res/themes/poda/img/backgrounds/poda-landscape.svg",
]) {
    assert.ok(existsSync(path.join(webRoot, relativePath)), `missing ${relativePath}`);
}

console.log("Poda branding configuration, metadata, manifest, and asset references are consistent");

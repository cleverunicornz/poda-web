/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";

import {
    POST_TYPES,
    SHARE_MSGTYPE,
    buildShareContent,
    itemSnapshot,
    parseShareContent,
    safeUrl,
    validateShareDraft,
} from "./shareModel.js";
import { shareCardHtml } from "./shareCard.js";

const episodeItem = {
    id: "ep-1",
    title: "Systems that do not collapse",
    subtitle: "Field Notes",
    meta: "S1E3 · scheduled",
    topics: ["Technology"],
};

function draft(overrides = {}) {
    return {
        kind: "episode",
        item: episodeItem,
        postType: "looking-for-guests",
        description: "Recording next week.",
        linkLabel: "Book a time",
        linkUrl: "https://calendly.com/mira/guest",
        ...overrides,
    };
}

describe("post types", () => {
    it("offers per-item types, with collabs and podcast swaps for podcasts", () => {
        expect(POST_TYPES.episode.map((t) => t.label)).toEqual(["New episode", "Coming soon", "Looking for guests"]);
        expect(POST_TYPES.podcast.map((t) => t.label)).toEqual([
            "Launch",
            "Looking for guests",
            "Looking for a co-host",
            "Collab",
            "Podcast swap",
        ]);
        expect(POST_TYPES.profile.map((t) => t.label)).toEqual([
            "Available as a guest",
            "Looking for collaborators",
            "Introduction",
        ]);
    });
});

describe("validateShareDraft", () => {
    it("accepts a complete draft", () => {
        expect(validateShareDraft(draft())).toEqual({});
    });

    it("needs an item and a post type of that kind", () => {
        expect(validateShareDraft(draft({ item: null }))).toHaveProperty("item");
        expect(validateShareDraft(draft({ postType: "" }))).toHaveProperty("postType");
        expect(validateShareDraft(draft({ postType: "podcast-swap" }))).toHaveProperty("postType");
    });

    it("keeps description and link optional", () => {
        expect(validateShareDraft(draft({ description: "", linkLabel: "", linkUrl: "" }))).toEqual({});
    });

    it("only accepts http(s) links, with a label", () => {
        expect(validateShareDraft(draft({ linkUrl: "javascript:alert(1)" }))).toHaveProperty("linkUrl");
        expect(validateShareDraft(draft({ linkUrl: "calendly.com/mira" }))).toHaveProperty("linkUrl");
        expect(validateShareDraft(draft({ linkLabel: "" }))).toHaveProperty("linkLabel");
        expect(validateShareDraft(draft({ linkUrl: "" }))).toHaveProperty("linkUrl");
    });

    it("limits the description", () => {
        expect(validateShareDraft(draft({ description: "x".repeat(1001) }))).toHaveProperty("description");
    });
});

describe("buildShareContent", () => {
    it("builds a message with a plain-text fallback and the card snapshot", () => {
        const content = buildShareContent(draft(), { sharerName: "Mira Chen" });
        expect(content.msgtype).toBe(SHARE_MSGTYPE);
        expect(content.body).toBe(
            "Mira Chen shared an episode: Systems that do not collapse (Looking for guests)\n" +
                "Recording next week.\n" +
                "Book a time: https://calendly.com/mira/guest",
        );
        expect(content[SHARE_MSGTYPE]).toEqual({
            version: 1,
            kind: "episode",
            postType: "looking-for-guests",
            item: episodeItem,
            description: "Recording next week.",
            link: { label: "Book a time", url: "https://calendly.com/mira/guest" },
        });
    });
});

describe("parseShareContent", () => {
    it("round-trips built content", () => {
        expect(parseShareContent(buildShareContent(draft(), { sharerName: "Mira" }))).toEqual({
            kind: "episode",
            postTypeLabel: "Looking for guests",
            title: "Systems that do not collapse",
            subtitle: "Field Notes",
            meta: "S1E3 · scheduled",
            topics: ["Technology"],
            description: "Recording next week.",
            link: { label: "Book a time", url: "https://calendly.com/mira/guest" },
        });
    });

    it("rejects content that is not a well-formed share", () => {
        const good = buildShareContent(draft(), { sharerName: "Mira" });
        expect(parseShareContent({ msgtype: "m.text", body: "hi" })).toBeNull();
        expect(parseShareContent({ ...good, [SHARE_MSGTYPE]: { ...good[SHARE_MSGTYPE], version: 2 } })).toBeNull();
        expect(parseShareContent({ ...good, [SHARE_MSGTYPE]: { ...good[SHARE_MSGTYPE], kind: "spam" } })).toBeNull();
        expect(parseShareContent({ ...good, [SHARE_MSGTYPE]: { ...good[SHARE_MSGTYPE], postType: "x" } })).toBeNull();
        expect(
            parseShareContent({ ...good, [SHARE_MSGTYPE]: { ...good[SHARE_MSGTYPE], item: { title: 5 } } }),
        ).toBeNull();
        expect(parseShareContent({ msgtype: SHARE_MSGTYPE })).toBeNull();
    });

    it("drops non-http(s) links and bounds untrusted fields", () => {
        const content = buildShareContent(draft(), { sharerName: "Mira" });
        content[SHARE_MSGTYPE].link = { label: "Click", url: "javascript:alert(1)" };
        content[SHARE_MSGTYPE].item.topics = ["a", "b", "c", "d", 7];
        content[SHARE_MSGTYPE].description = "y".repeat(5000);
        const model = parseShareContent(content);
        expect(model.link).toBeNull();
        expect(model.topics).toEqual(["a", "b", "c"]);
        expect(model.description).toHaveLength(1000);
    });
});

describe("safeUrl", () => {
    it.each([
        ["https://calendly.com/x", "https://calendly.com/x"],
        ["http://example.org/a b", "http://example.org/a%20b"],
        ["javascript:alert(1)", null],
        ["data:text/html,hi", null],
        ["mailto:a@b.c", null],
        ["//evil.example", null],
        ["", null],
        [42, null],
    ])("%s → %s", (input, expected) => {
        expect(safeUrl(input)).toBe(expected);
    });
});

describe("itemSnapshot", () => {
    it("labels an episode with its numbers, status and podcast", () => {
        const snapshot = itemSnapshot(
            "episode",
            { id: "e", title: "Ep", seasonNumber: 1, episodeNumber: 3, status: "scheduled" },
            { podcast: { title: "Field Notes", categories: ["Technology", "Business", "News", "Arts"] } },
        );
        expect(snapshot).toEqual({
            id: "e",
            title: "Ep",
            subtitle: "Field Notes",
            meta: "S1E3 · scheduled",
            topics: ["Technology", "Business", "News"],
        });
    });

    it("summarises a podcast and a profile", () => {
        expect(
            itemSnapshot(
                "podcast",
                { id: "p", title: "Field Notes", tagline: "Calm", author: "Jordan", categories: ["Tech"] },
                { episodeCount: 1 },
            ),
        ).toEqual({ id: "p", title: "Field Notes", subtitle: "Calm", meta: "Jordan · 1 episode", topics: ["Tech"] });
        expect(
            itemSnapshot("profile", { userId: "@m:x", displayName: "Mira", headline: "Host", topics: ["AI"] }),
        ).toEqual({
            id: "@m:x",
            title: "Mira",
            subtitle: "Host",
            meta: "",
            topics: ["AI"],
        });
    });
});

describe("shareCardHtml", () => {
    it("escapes every value and links only to the parsed http(s) URL", () => {
        const content = buildShareContent(
            draft({
                item: { ...episodeItem, title: '<img src=x onerror="alert(1)">' },
                description: "<script>x</script>",
            }),
            { sharerName: "Mira" },
        );
        const html = shareCardHtml(parseShareContent(content));
        expect(html).not.toContain("<img");
        expect(html).not.toContain("<script");
        expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
        expect(html).toContain(
            'href="https://calendly.com/mira/guest" target="_blank" rel="noopener noreferrer nofollow"',
        );
        expect(html).toContain("Looking for guests");
        expect(html).toContain('data-share-action="profile"');
    });

    it("omits the link button without a link", () => {
        const html = shareCardHtml(
            parseShareContent(buildShareContent(draft({ linkLabel: "", linkUrl: "" }), { sharerName: "M" })),
        );
        expect(html).not.toContain("<a ");
    });
});

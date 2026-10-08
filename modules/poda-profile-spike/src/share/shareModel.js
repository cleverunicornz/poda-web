/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Share cards (D-000028): a member posts an episode, podcast or their profile
// into a room as an m.room.message. The body is a plain-text fallback for other
// clients; the "io.poda.share" field carries a snapshot for the Poda card.
// Content read back from the timeline is untrusted and goes through
// parseShareContent before anything renders it.

import { episodeLabel } from "../shared/podcastFullView.js";

export const SHARE_MSGTYPE = "io.poda.share";

export const SHARE_KINDS = [
    { id: "episode", label: "An episode" },
    { id: "podcast", label: "A podcast" },
    { id: "profile", label: "My profile" },
];

export const POST_TYPES = {
    episode: [
        { id: "new-episode", label: "New episode" },
        { id: "coming-soon", label: "Coming soon" },
        { id: "looking-for-guests", label: "Looking for guests" },
    ],
    podcast: [
        { id: "launch", label: "Launch" },
        { id: "looking-for-guests", label: "Looking for guests" },
        { id: "looking-for-cohost", label: "Looking for a co-host" },
        { id: "collab", label: "Collab" },
        { id: "podcast-swap", label: "Podcast swap" },
    ],
    profile: [
        { id: "available-as-guest", label: "Available as a guest" },
        { id: "looking-for-collaborators", label: "Looking for collaborators" },
        { id: "introduction", label: "Introduction" },
    ],
};

export const LIMITS = {
    title: 200,
    subtitle: 200,
    meta: 120,
    topic: 40,
    topics: 3,
    description: 1000,
    linkLabel: 40,
    url: 2000,
};

const KIND_NOUN = { episode: "an episode", podcast: "a podcast", profile: "their profile" };

function text(value, max) {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, max);
}

/** An absolute http(s) URL, or null. */
export function safeUrl(value) {
    if (typeof value !== "string" || !value.trim() || value.length > LIMITS.url) return null;
    try {
        const url = new URL(value.trim());
        return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
    } catch {
        return null;
    }
}

export function postTypeLabel(kind, postTypeId) {
    return POST_TYPES[kind]?.find((type) => type.id === postTypeId)?.label ?? null;
}

/** The card's item snapshot for an episode (with its podcast), a podcast, or a profile. */
export function itemSnapshot(kind, source, { podcast = null, episodeCount = null } = {}) {
    if (kind === "episode") {
        const number = episodeLabel(source);
        return {
            id: source.id ?? null,
            title: source.title ?? "",
            subtitle: podcast?.title ?? "",
            meta: [number, source.status].filter(Boolean).join(" · "),
            topics: (podcast?.categories ?? []).slice(0, LIMITS.topics),
        };
    }
    if (kind === "podcast") {
        const count = episodeCount ?? source.episodeCount;
        return {
            id: source.id ?? null,
            title: source.title ?? "",
            subtitle: source.tagline ?? "",
            meta: [source.author, count != null ? `${count} episode${count === 1 ? "" : "s"}` : null]
                .filter(Boolean)
                .join(" · "),
            topics: (source.categories ?? []).slice(0, LIMITS.topics),
        };
    }
    return {
        id: source.userId ?? null,
        title: source.displayName ?? "",
        subtitle: source.headline || source.tagline || "",
        meta: "",
        topics: (source.topics ?? []).slice(0, LIMITS.topics),
    };
}

/** Field errors for a share draft, keyed by field; empty when it can be sent. */
export function validateShareDraft(draft) {
    const errors = {};
    if (!POST_TYPES[draft.kind]) errors.kind = "Choose what to share.";
    else {
        if (!draft.item || !text(draft.item.title, LIMITS.title)) errors.item = "Choose what to share.";
        if (!postTypeLabel(draft.kind, draft.postType)) errors.postType = "Choose the type of post.";
    }
    if (typeof draft.description === "string" && draft.description.trim().length > LIMITS.description)
        errors.description = `Keep the description under ${LIMITS.description} characters.`;
    const url = typeof draft.linkUrl === "string" ? draft.linkUrl.trim() : "";
    const label = typeof draft.linkLabel === "string" ? draft.linkLabel.trim() : "";
    if (url && !safeUrl(url)) errors.linkUrl = "Enter a full link starting with https://.";
    if (url && !label) errors.linkLabel = "Give the link a label, for example “Book a time”.";
    if (!url && label) errors.linkUrl = "Add the link this label opens.";
    if (label.length > LIMITS.linkLabel) errors.linkLabel = `Keep the label under ${LIMITS.linkLabel} characters.`;
    return errors;
}

/** The m.room.message content for a valid draft. */
export function buildShareContent(draft, { sharerName }) {
    const item = draft.item;
    const share = {
        version: 1,
        kind: draft.kind,
        postType: draft.postType,
        item: {
            id: item.id ?? null,
            title: text(item.title, LIMITS.title),
            subtitle: text(item.subtitle, LIMITS.subtitle),
            meta: text(item.meta, LIMITS.meta),
            topics: (item.topics ?? [])
                .map((topic) => text(topic, LIMITS.topic))
                .filter(Boolean)
                .slice(0, LIMITS.topics),
        },
        description: text(draft.description, LIMITS.description),
        link: safeUrl(draft.linkUrl)
            ? { label: text(draft.linkLabel, LIMITS.linkLabel), url: safeUrl(draft.linkUrl) }
            : null,
    };
    const lines = [
        `${sharerName} shared ${KIND_NOUN[draft.kind]}: ${share.item.title} (${postTypeLabel(draft.kind, draft.postType)})`,
    ];
    if (share.description) lines.push(share.description);
    if (share.link) lines.push(`${share.link.label}: ${share.link.url}`);
    return { msgtype: SHARE_MSGTYPE, body: lines.join("\n"), [SHARE_MSGTYPE]: share };
}

/** A render model for received content, or null when it is not a well-formed share. */
export function parseShareContent(content) {
    if (!content || content.msgtype !== SHARE_MSGTYPE) return null;
    const share = content[SHARE_MSGTYPE];
    if (!share || typeof share !== "object" || share.version !== 1 || !POST_TYPES[share.kind]) return null;
    const label = postTypeLabel(share.kind, share.postType);
    const title = text(share.item?.title, LIMITS.title);
    if (!label || !title) return null;
    const topics = Array.isArray(share.item?.topics)
        ? share.item.topics
              .map((topic) => text(topic, LIMITS.topic))
              .filter(Boolean)
              .slice(0, LIMITS.topics)
        : [];
    const url = safeUrl(share.link?.url);
    const linkLabel = text(share.link?.label, LIMITS.linkLabel);
    return {
        kind: share.kind,
        postTypeLabel: label,
        title,
        subtitle: text(share.item?.subtitle, LIMITS.subtitle),
        meta: text(share.item?.meta, LIMITS.meta),
        topics,
        description: text(share.description, LIMITS.description),
        link: url && linkLabel ? { label: linkLabel, url } : null,
    };
}

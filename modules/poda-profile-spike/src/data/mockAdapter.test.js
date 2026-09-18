import { describe, expect, it } from "vitest";

import { MockPodaDataAdapter } from "../data/mockAdapter.js";
import { validatePodcastDraft } from "../studio/podcastCreate.js";

const baseDraft = {
    title: "Ship It Weekly",
    tagline: "Launches, calmly.",
    description: "Weekly launch retrospectives.",
    slug: "ship-it-weekly",
    coverArtUrl: null,
    categories: ["Technology"],
    language: "en",
    explicit: false,
    author: "Ada Lovelace",
    ownerEmail: "ada@example.com",
    showType: "episodic",
    websiteUrl: "",
    trailerUrl: "",
    bookingUrl: "",
    socialLinks: {},
    channel: { locked: null, license: null, funding: [] },
};

describe("MockPodaDataAdapter", () => {
    it("seeds the fixture podcast and its episodes", async () => {
        const adapter = new MockPodaDataAdapter();
        const podcasts = await adapter.listPodcasts();
        expect(podcasts).toHaveLength(1);
        const episodes = await adapter.listEpisodes(podcasts[0].id);
        expect(episodes.length).toBeGreaterThan(0);
        expect(episodes.every((e) => e.podcastId === podcasts[0].id)).toBe(true);
    });

    it("creates a podcast with generated id, guid, lifecycle state, and timestamps", async () => {
        const adapter = new MockPodaDataAdapter();
        const created = await adapter.savePodcast(baseDraft);
        expect(created.id).toMatch(/^pod-/);
        expect(created.channel.guid).toBeTruthy();
        expect(created.provenance.podcastGuid).toEqual(created.channel.guid);
        expect(created.status).toBe("draft");
        expect(created.isPublic).toBe(false);
        expect(created.createdAt).toBeTruthy();
        expect(created.title).toBe("Ship It Weekly");
        const podcasts = await adapter.listPodcasts();
        expect(podcasts).toHaveLength(2);
        const fetched = await adapter.getPodcast(created.id);
        expect(fetched.slug).toBe("ship-it-weekly");
    });

    it("creates an episode under an existing podcast and rejects unknown parents", async () => {
        const adapter = new MockPodaDataAdapter();
        const created = await adapter.savePodcast(baseDraft);
        const episode = await adapter.saveEpisode({ podcastId: created.id, title: "Pilot" });
        expect(episode.id).toMatch(/^ep-/);
        const episodes = await adapter.listEpisodes(created.id);
        expect(episodes.map((e) => e.title)).toContain("Pilot");
        await expect(adapter.saveEpisode({ podcastId: "pod-nope", title: "Orphan" })).rejects.toThrow(/not found/i);
    });

    it("returns analytics seeded from the fixture audience stats", async () => {
        const adapter = new MockPodaDataAdapter();
        const analytics = await adapter.getStudioAnalytics();
        expect(analytics.stats.monthlyListeners).toBeGreaterThan(0);
        expect(analytics.playsSeries).toHaveLength(90);
    });
});

describe("validatePodcastDraft", () => {
    it("passes a complete draft", () => {
        expect(validatePodcastDraft(baseDraft)).toEqual({});
    });

    it("requires title, slug, owner email, and categories", () => {
        const errors = validatePodcastDraft({ ...baseDraft, title: "", slug: "", ownerEmail: "", categories: [] });
        expect(errors.title).toBeTruthy();
        expect(errors.slug).toBeTruthy();
        expect(errors.ownerEmail).toBeTruthy();
        expect(errors.categories).toBeTruthy();
    });

    it("rejects malformed slug and email", () => {
        const errors = validatePodcastDraft({ ...baseDraft, slug: "Not A Slug!", ownerEmail: "ada@nope" });
        expect(errors.slug).toBeTruthy();
        expect(errors.ownerEmail).toBeTruthy();
    });

    it("rejects non-http urls when present", () => {
        const errors = validatePodcastDraft({ ...baseDraft, websiteUrl: "example.com", socialLinks: { twitter: "x.com/me" } });
        expect(errors.websiteUrl).toBeTruthy();
        expect(errors.social_twitter).toBeTruthy();
    });
});

// MockPodaDataAdapter — the single typed seam all Studio and Profile data
// flows through. In-memory, session-scoped, seeded from the spike fixtures.
// A future HTTP adapter implements the same interface without page changes.
import { PODCAST_FIXTURE, EPISODES_FIXTURE } from "../shared/podcastFixtures.js";
import { PROFILE_FIXTURE_MIRA, EMPTY_CREATOR_FIELDS } from "../shared/profileFixtures.js";

function clone(value) {
    return value === undefined || value === null ? value : JSON.parse(JSON.stringify(value));
}

function mockGuid(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
}

function nowIso() {
    return new Date().toISOString();
}

export class MockPodaDataAdapter {
    #podcasts;
    #episodes;
    #creators;
    #ownProfile;

    constructor() {
        this.#podcasts = [clone(PODCAST_FIXTURE)];
        this.#episodes = clone(EPISODES_FIXTURE);
        this.#creators = [clone(PROFILE_FIXTURE_MIRA)];
        this.#ownProfile = clone(EMPTY_CREATOR_FIELDS);
    }

    async listPodcasts() {
        return clone(this.#podcasts);
    }

    async getPodcast(id) {
        const podcast = this.#podcasts.find((p) => p.id === id);
        if (!podcast) throw new Error(`Podcast not found: ${id}`);
        return clone(podcast);
    }

    async savePodcast(draft) {
        if (draft.id) {
            const index = this.#podcasts.findIndex((p) => p.id === draft.id);
            if (index === -1) throw new Error(`Podcast not found: ${draft.id}`);
            this.#podcasts[index] = { ...this.#podcasts[index], ...clone(draft), updatedAt: nowIso() };
            return clone(this.#podcasts[index]);
        }
        const timestamp = nowIso();
        const podcast = {
            id: mockGuid("pod"),
            orgId: "org-poda-labs",
            tagline: "",
            description: "",
            slug: "",
            coverArtUrl: null,
            categories: [],
            language: "en",
            explicit: false,
            author: "",
            ownerEmail: "",
            socialLinks: {},
            status: "draft",
            isPublic: false,
            rssFeedUrl: null,
            websiteUrl: "",
            idealGuest: null,
            guestRequirements: null,
            trailerUrl: "",
            testimonials: [],
            mediaKit: [],
            audienceStats: null,
            bookingUrl: "",
            sectionVisibility: {},
            showType: "episodic",
            customFields: [],
            channel: {
                guid: mockGuid("9b3d3e20"),
                medium: "podcast",
                persons: [],
                locked: null,
                license: null,
                blocks: [],
                updateFrequency: null,
                funding: [],
                value: [],
                socialInteracts: [],
                txt: [],
                chat: null,
                podping: { value: false },
                trailers: [],
                locations: [],
                liveItems: [],
                remoteItems: [],
                podroll: null,
                publisher: null,
                ...clone(draft.channel ?? {}),
            },
            currentness: {
                canonicalAt: null,
                activityFreshnessAt: timestamp,
                internalizedAt: timestamp,
                externalizedAt: null,
            },
            provenance: { mode: "internal", kind: "original", sourceEntryId: null, podcastGuid: null },
            feedDiagnostics: null,
            createdAt: timestamp,
            updatedAt: timestamp,
            ...Object.fromEntries(Object.entries(clone(draft)).filter(([key]) => key !== "channel" && key !== "id")),
        };
        podcast.provenance.podcastGuid = podcast.channel.guid;
        this.#podcasts.push(podcast);
        return clone(podcast);
    }

    async listEpisodes(podcastId) {
        const episodes = podcastId ? this.#episodes.filter((e) => e.podcastId === podcastId) : this.#episodes;
        return clone(episodes);
    }

    async getEpisode(id) {
        const episode = this.#episodes.find((e) => e.id === id);
        if (!episode) throw new Error(`Episode not found: ${id}`);
        return clone(episode);
    }

    async saveEpisode(draft) {
        if (draft.id) {
            const index = this.#episodes.findIndex((e) => e.id === draft.id);
            if (index === -1) throw new Error(`Episode not found: ${draft.id}`);
            this.#episodes[index] = { ...this.#episodes[index], ...clone(draft), updatedAt: nowIso() };
            return clone(this.#episodes[index]);
        }
        const podcast = this.#podcasts.find((p) => p.id === draft.podcastId);
        if (!podcast) throw new Error(`Podcast not found: ${draft.podcastId}`);
        const timestamp = nowIso();
        const episode = {
            id: mockGuid("ep"),
            title: "",
            description: "",
            slug: "",
            duration: null,
            episodeNumber: null,
            seasonNumber: null,
            status: "draft",
            showNotesHtml: null,
            publishedAt: null,
            scheduledAt: null,
            item: {
                persons: [],
                transcripts: [],
                funding: [],
                soundbites: [],
                locations: [],
                chapters: null,
                license: null,
            },
            media: { primaryEnclosure: null, alternateEnclosures: [] },
            currentness: {
                canonicalAt: null,
                activityFreshnessAt: timestamp,
                internalizedAt: null,
                externalizedAt: null,
            },
            provenance: {
                mode: "internal",
                kind: "draft",
                sourceGuid: null,
                sourceEntryId: null,
                sourceEpisodeId: null,
            },
            guests: [],
            createdAt: timestamp,
            updatedAt: timestamp,
            ...clone(draft),
            id: mockGuid("ep"),
        };
        this.#episodes.push(episode);
        return clone(episode);
    }

    async listCreators() {
        return clone(this.#creators);
    }

    async getCreator(id) {
        const creator = this.#creators.find((c) => c.id === id);
        if (!creator) throw new Error(`Creator not found: ${id}`);
        return clone(creator);
    }

    async getMyProfile() {
        return clone(this.#ownProfile);
    }

    async saveMyProfile(draft) {
        this.#ownProfile = { ...this.#ownProfile, ...clone(draft) };
        return clone(this.#ownProfile);
    }

    async getStudioAnalytics() {
        const podcast = this.#podcasts[0];
        if (!podcast?.audienceStats) return null;
        // Deterministic mock series derived from the fixture stats.
        const seed = podcast.audienceStats.avgEpisodeDownloads ?? 10000;
        const series = Array.from({ length: 90 }, (_, i) => {
            const wave = Math.sin(i / 7) * 0.15 + Math.sin(i / 23) * 0.1;
            return Math.round(seed * (0.8 + wave + (i / 90) * 0.25));
        });
        return {
            podcastId: podcast.id,
            stats: clone(podcast.audienceStats),
            playsSeries: series,
            perEpisode: this.#episodes
                .filter((e) => e.podcastId === podcast.id)
                .map((e) => ({
                    id: e.id,
                    title: e.title,
                    downloads: e.status === "published" ? seed + Math.round(seed * 0.2) : 0,
                })),
        };
    }
}

export const podaData = new MockPodaDataAdapter();

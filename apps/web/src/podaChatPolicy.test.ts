/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";
import { JoinRule } from "matrix-js-sdk/src/matrix";

import { PODA_POLL_START_EVENT_POWER_LEVELS, isPodaPrivateConversation, isPodaRoomAdmin } from "./podaChatPolicy";

describe("podaChatPolicy", () => {
    it.each([
        [JoinRule.Invite, true],
        [JoinRule.Private, true],
        [JoinRule.Public, false],
        [JoinRule.Restricted, false],
        [JoinRule.Knock, false],
        ["knock_restricted" as JoinRule, false],
    ])("treats a %s room as private: %s", (joinRule, expected) => {
        expect(isPodaPrivateConversation({ getJoinRule: () => joinRule })).toBe(expected);
    });

    it("restricts both stable and unstable poll start events to room admins", () => {
        expect(PODA_POLL_START_EVENT_POWER_LEVELS).toEqual({
            "m.poll.start": 100,
            "org.matrix.msc3381.poll.start": 100,
        });
    });

    it.each([
        [100, true],
        [150, true],
        // Room creators in room versions with privileged creators.
        [Infinity, true],
        [99, false],
        [50, false],
        [0, false],
    ])("treats power level %i as room admin: %s", (powerLevel, expected) => {
        const state = { getMember: () => ({ powerLevel }) } as any;
        expect(isPodaRoomAdmin(state, "@user:example.org")).toBe(expected);
    });

    it("does not treat a user without membership as room admin", () => {
        const state = { getMember: () => null } as any;
        expect(isPodaRoomAdmin(state, "@user:example.org")).toBe(false);
    });
});

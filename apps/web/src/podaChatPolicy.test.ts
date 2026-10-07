/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { describe, expect, it } from "vitest";
import { JoinRule } from "matrix-js-sdk/src/matrix";

import { PODA_POLL_START_EVENT_POWER_LEVELS, isPodaPrivateConversation } from "./podaChatPolicy";

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
});

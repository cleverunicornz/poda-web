/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// @vitest-environment happy-dom

import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { type MatrixClient, RoomMember, User } from "matrix-js-sdk/src/matrix";
import { stubClient } from "test-utils";

import { ElementWebExtrasApi } from "./ExtrasApi";
import RightPanelStore from "../stores/right-panel/RightPanelStore";
import { RightPanelPhases } from "../stores/right-panel/RightPanelStorePhases";
import { SDKContextClass } from "../contexts/SDKContextClass";

describe("ElementWebExtrasApi.openUserProfilePanel (Poda D-000028)", () => {
    let client: MatrixClient;
    let setCards: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        client = stubClient();
        setCards = vi.spyOn(RightPanelStore.instance, "setCards").mockImplementation(() => {});
        vi.spyOn(SDKContextClass.instance.roomViewStore, "getRoomId").mockReturnValue("!room:example.org");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("does nothing while no profile renderer is set", () => {
        new ElementWebExtrasApi().openUserProfilePanel("@bob:example.org");
        expect(setCards).not.toHaveBeenCalled();
    });

    it("opens the room member's profile with their user info card behind it", () => {
        const member = new RoomMember("!room:example.org", "@bob:example.org");
        vi.mocked(client.getRoom).mockReturnValue({ getMember: () => member } as any);
        const api = new ElementWebExtrasApi();
        api.setUserProfilePanel(() => null as any);

        api.openUserProfilePanel("@bob:example.org");

        expect(setCards).toHaveBeenCalledWith([
            { phase: RightPanelPhases.MemberInfo, state: { member } },
            { phase: RightPanelPhases.UserProfile, state: { member } },
        ]);
    });

    it("falls back to a user when they are not a member of the viewed room", () => {
        vi.mocked(client.getRoom).mockReturnValue(null);
        vi.mocked(client.getUser).mockReturnValue(null);
        const api = new ElementWebExtrasApi();
        api.setUserProfilePanel(() => null as any);

        api.openUserProfilePanel("@carol:example.org");

        const [[cards]] = setCards.mock.calls as any;
        expect(cards.map((card: any) => card.phase)).toEqual([
            RightPanelPhases.MemberInfo,
            RightPanelPhases.UserProfile,
        ]);
        expect(cards[1].state.member).toBeInstanceOf(User);
        expect(cards[1].state.member.userId).toBe("@carol:example.org");
    });
});

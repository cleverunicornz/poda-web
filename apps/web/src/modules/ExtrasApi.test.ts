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

describe("ElementWebExtrasApi.sendRoomMessage (Poda D-000028)", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("sends the content as a room message and returns the event ID", async () => {
        const client = stubClient();
        vi.mocked(client.sendMessage).mockResolvedValue({ event_id: "$sent" });
        const content = {
            "msgtype": "io.poda.share",
            "body": "Mira shared a podcast",
            "io.poda.share": { version: 1 },
        };

        await expect(new ElementWebExtrasApi().sendRoomMessage("!room:example.org", content)).resolves.toBe("$sent");
        expect(client.sendMessage).toHaveBeenCalledWith("!room:example.org", content);
    });

    it("refuses content without a plain-text body", async () => {
        const client = stubClient();
        await expect(
            new ElementWebExtrasApi().sendRoomMessage("!room:example.org", { msgtype: "io.poda.share" } as any),
        ).rejects.toThrow("plain-text body");
        expect(client.sendMessage).not.toHaveBeenCalled();
    });
});

describe("ElementWebExtrasApi.getPostableRooms (Poda D-000030)", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    function room(
        roomId: string,
        name: string,
        opts: { membership?: string; space?: boolean; mayPost?: boolean; ts?: number },
    ) {
        return {
            roomId,
            name,
            getMyMembership: () => opts.membership ?? "join",
            isSpaceRoom: () => opts.space ?? false,
            maySendMessage: () => opts.mayPost ?? true,
            getLastActiveTimestamp: () => opts.ts ?? 0,
        };
    }

    it("lists joined, non-space rooms the user may post in, most recent first, with the viewed one", () => {
        const client = stubClient();
        vi.mocked(client.getVisibleRooms).mockReturnValue([
            room("!old:x", "Old", { ts: 1 }),
            room("!new:x", "New", { ts: 5 }),
            room("!invite:x", "Invited", { membership: "invite", ts: 9 }),
            room("!space:x", "Space", { space: true, ts: 9 }),
            room("!readonly:x", "Announcements", { mayPost: false, ts: 9 }),
        ] as any);
        vi.spyOn(SDKContextClass.instance.roomViewStore, "getRoomId").mockReturnValue("!old:x");

        expect(new ElementWebExtrasApi().getPostableRooms()).toEqual({
            currentRoomId: "!old:x",
            rooms: [
                { roomId: "!new:x", name: "New" },
                { roomId: "!old:x", name: "Old" },
            ],
        });
    });

    it("reports no current room when the viewed room cannot be posted in", () => {
        const client = stubClient();
        vi.mocked(client.getVisibleRooms).mockReturnValue([room("!a:x", "A", {})] as any);
        vi.spyOn(SDKContextClass.instance.roomViewStore, "getRoomId").mockReturnValue("!readonly:x");

        expect(new ElementWebExtrasApi().getPostableRooms().currentRoomId).toBeNull();
    });
});

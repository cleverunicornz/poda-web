/*
Copyright 2024 New Vector Ltd.
Copyright 2022 The Matrix.org Foundation C.I.C.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// @vitest-environment happy-dom

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "test-utils-rtl";
import { JoinRule } from "matrix-js-sdk/src/matrix";
import { createTestClient, getRoomContext, mkStubRoom } from "test-utils";

import MatrixClientContext from "../../../contexts/MatrixClientContext";
import { MatrixClientPeg } from "../../../MatrixClientPeg";
import MessageComposerButtons from "./MessageComposerButtons";
import { ScopedRoomContextProvider } from "../../../contexts/ScopedRoomContext.tsx";
import { type RoomContextType } from "../../../contexts/RoomContext.ts";
import { RoomUploadContextProvider } from "../../../viewmodels/room/RoomUploadViewModel.tsx";

describe("MessageComposerButtons", () => {
    // @ts-ignore - we're deliberately not implementing the whole interface here, but
    // can't use Partial<> for types because it'll annoy TS more than it helps.
    const mockProps: React.ComponentProps<typeof MessageComposerButtons> = {
        addEmoji: () => false,
        haveRecording: false,
        isStickerPickerOpen: false,
        menuPosition: undefined,
        onRecordStartEndClick: () => {},
        setStickerPickerOpen: () => {},
        toggleButtonMenu: () => {},
    };

    const mockClient = createTestClient();
    vi.spyOn(MatrixClientPeg, "get").mockReturnValue(mockClient);

    function getButtonLabels() {
        const getLabels = (elements: HTMLElement[]): string[] =>
            elements
                .map((element) => element.getAttribute("aria-label"))
                .filter((label): label is string => label !== null);

        const mainLabels: Array<string | string[]> = getLabels(screen.queryAllByRole("button"));
        const menuLabels = getLabels(screen.queryAllByRole("menuitem"));

        if (menuLabels.length) {
            mainLabels.push(getLabels(screen.queryAllByRole("menuitem")));
        }

        return mainLabels;
    }

    function wrapAndRender(
        component: React.ReactElement,
        narrow: boolean,
        {
            joinRule = JoinRule.Invite,
            mayStartPoll = true,
            powerLevel = 100,
        }: { joinRule?: JoinRule; mayStartPoll?: boolean; powerLevel?: number } = {},
    ) {
        const mockRoom = mkStubRoom("myfakeroom", "myfakeroom", mockClient) as any;
        mockRoom.currentState.getJoinRule.mockReturnValue(joinRule);
        mockRoom.currentState.maySendEvent.mockReturnValue(mayStartPoll);
        mockRoom.currentState.getMember.mockReturnValue({ powerLevel });
        const defaultRoomContext: RoomContextType = getRoomContext(mockRoom, { narrow });

        return render(
            <MatrixClientContext.Provider value={mockClient}>
                <ScopedRoomContextProvider {...defaultRoomContext}>
                    <RoomUploadContextProvider>{component}</RoomUploadContextProvider>
                </ScopedRoomContextProvider>
            </MatrixClientContext.Provider>,
        );
    }

    it("Renders emoji and upload buttons in wide mode", () => {
        wrapAndRender(
            <MessageComposerButtons
                {...mockProps}
                isMenuOpen={false}
                showLocationButton={true}
                showPollsButton={true}
                showStickersButton={true}
            />,
            false,
        );

        expect(getButtonLabels()).toEqual(["Emoji", "Attachment", "Voice Message", "More options"]);
    });

    it("Renders other buttons in menu in wide mode", async () => {
        wrapAndRender(
            <MessageComposerButtons
                {...mockProps}
                isMenuOpen={true}
                showLocationButton={true}
                showPollsButton={true}
                showStickersButton={true}
            />,
            false,
        );

        // The location code is lazy loaded, so the button will take a little while
        // to appear, so we need to wait.
        await waitFor(() => {
            expect(getButtonLabels()).toEqual([
                "Emoji",
                "Attachment",
                "Voice Message",
                "More options",
                ["Sticker", "Poll", "Location"],
            ]);
        });
    });

    it("Renders only some buttons in narrow mode", () => {
        wrapAndRender(
            <MessageComposerButtons
                {...mockProps}
                isMenuOpen={false}
                showLocationButton={true}
                showPollsButton={true}
                showStickersButton={true}
            />,
            true,
        );

        expect(getButtonLabels()).toEqual(["Emoji", "More options"]);
    });

    it("Renders other buttons in menu (except voice messages) in narrow mode", () => {
        wrapAndRender(
            <MessageComposerButtons
                {...mockProps}
                isMenuOpen={true}
                showLocationButton={true}
                showPollsButton={true}
                showStickersButton={true}
            />,
            true,
        );

        expect(getButtonLabels()).toEqual(["Emoji", "More options", ["Attachment", "Sticker", "Poll", "Location"]]);
    });

    describe("polls button", () => {
        it("should render when asked to", () => {
            wrapAndRender(
                <MessageComposerButtons
                    {...mockProps}
                    isMenuOpen={true}
                    showLocationButton={true}
                    showPollsButton={true}
                    showStickersButton={true}
                />,
                true,
            );

            expect(getButtonLabels()).toEqual(["Emoji", "More options", ["Attachment", "Sticker", "Poll", "Location"]]);
        });

        it("should not render when asked not to", () => {
            wrapAndRender(
                <MessageComposerButtons
                    {...mockProps}
                    isMenuOpen={true}
                    showLocationButton={true}
                    showPollsButton={false} // !! the change from the alternate test
                    showStickersButton={true}
                />,
                true,
            );

            expect(getButtonLabels()).toEqual([
                "Emoji",
                "More options",
                [
                    "Attachment",
                    "Sticker",
                    // "Poll", // should be hidden
                    "Location",
                ],
            ]);
        });
    });
    describe("Poda chat controls (D-000023)", () => {
        const allButtons = (
            <MessageComposerButtons
                {...mockProps}
                isMenuOpen={true}
                showLocationButton={true}
                showPollsButton={true}
                showStickersButton={true}
            />
        );

        it.each([JoinRule.Public, JoinRule.Restricted, JoinRule.Knock])(
            "does not offer voice messages in a %s room",
            async (joinRule) => {
                wrapAndRender(allButtons, false, { joinRule });

                await waitFor(() => {
                    expect(getButtonLabels()).toEqual([
                        "Emoji",
                        "Attachment",
                        "More options",
                        ["Sticker", "Poll", "Location"],
                    ]);
                });
            },
        );

        it("offers voice messages on the composer bar in an invite-only room", async () => {
            wrapAndRender(allButtons, false, { joinRule: JoinRule.Invite });

            await waitFor(() => {
                expect(getButtonLabels()).toEqual([
                    "Emoji",
                    "Attachment",
                    "Voice Message",
                    "More options",
                    ["Sticker", "Poll", "Location"],
                ]);
            });
        });

        it("hides the poll button from members who may not start polls", async () => {
            wrapAndRender(allButtons, false, { mayStartPoll: false });

            await waitFor(() => {
                expect(getButtonLabels()).toEqual([
                    "Emoji",
                    "Attachment",
                    "Voice Message",
                    "More options",
                    ["Sticker", "Location"],
                ]);
            });
        });

        it("hides the poll button in narrow mode from members who may not start polls", () => {
            wrapAndRender(allButtons, true, { mayStartPoll: false });

            expect(getButtonLabels()).toEqual(["Emoji", "More options", ["Attachment", "Sticker", "Location"]]);
        });

        it("hides the poll button from non-admins even where the room lets them start polls (D-000027)", async () => {
            wrapAndRender(allButtons, false, { mayStartPoll: true, powerLevel: 50 });

            await waitFor(() => {
                expect(getButtonLabels()).toEqual([
                    "Emoji",
                    "Attachment",
                    "Voice Message",
                    "More options",
                    ["Sticker", "Location"],
                ]);
            });
        });

        it("hides the poll button in narrow mode from non-admins (D-000027)", () => {
            wrapAndRender(allButtons, true, { mayStartPoll: true, powerLevel: 0 });

            expect(getButtonLabels()).toEqual(["Emoji", "More options", ["Attachment", "Sticker", "Location"]]);
        });
    });
});

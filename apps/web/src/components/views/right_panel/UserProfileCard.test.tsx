/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// @vitest-environment happy-dom

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RoomMember, User } from "matrix-js-sdk/src/matrix";
import { act, render, screen } from "test-utils-rtl";
import { type UserProfilePanelProps } from "@element-hq/element-web-module-api";

import { clientAndSDKContextRenderOptions, stubClient, TestSDKContext } from "test-utils";
import { UserProfileCard } from "./UserProfileCard";
import { ModuleApi } from "../../../modules/Api";

describe("<UserProfileCard /> (Poda D-000024)", () => {
    let renderOptions: ReturnType<typeof clientAndSDKContextRenderOptions>;
    beforeEach(() => {
        renderOptions = clientAndSDKContextRenderOptions(stubClient(), new TestSDKContext());
    });

    afterEach(() => {
        ModuleApi.instance.extras.userProfilePanel = undefined;
    });

    it("renders nothing without a module renderer", () => {
        const { container } = render(
            <UserProfileCard member={new RoomMember("!r:example.org", "@a:example.org")} onClose={vi.fn()} />,
            renderOptions,
        );
        expect(container).toBeEmptyDOMElement();
    });

    it("renders the module content for a room member inside a Creator profile card", () => {
        const renderer = vi.fn((props: UserProfilePanelProps) => <p>profile of {props.userId}</p>);
        ModuleApi.instance.extras.setUserProfilePanel(renderer);
        const member = new RoomMember("!r:example.org", "@mira:example.org");
        member.rawDisplayName = "Mira Chen";

        render(<UserProfileCard member={member} roomId="!r:example.org" onClose={vi.fn()} />, renderOptions);

        expect(screen.getByText("Creator profile")).toBeInTheDocument();
        expect(screen.getByText("profile of @mira:example.org")).toBeInTheDocument();
        expect(renderer).toHaveBeenCalledWith({
            userId: "@mira:example.org",
            displayName: "Mira Chen",
            roomId: "!r:example.org",
        });
    });

    it("passes a User's display name", () => {
        const renderer = vi.fn((_props: UserProfilePanelProps) => <p>ok</p>);
        ModuleApi.instance.extras.setUserProfilePanel(renderer);
        const user = new User("@demo:example.org");
        user.displayName = "Demo Creator";

        render(<UserProfileCard member={user} onClose={vi.fn()} />, renderOptions);

        expect(renderer).toHaveBeenCalledWith({
            userId: "@demo:example.org",
            displayName: "Demo Creator",
            roomId: undefined,
        });
    });

    it("follows a renderer set after mounting", () => {
        render(
            <UserProfileCard member={new RoomMember("!r:example.org", "@a:example.org")} onClose={vi.fn()} />,
            renderOptions,
        );
        expect(screen.queryByText("late")).not.toBeInTheDocument();

        act(() => ModuleApi.instance.extras.setUserProfilePanel(() => <p>late</p>));

        expect(screen.getByText("late")).toBeInTheDocument();
    });

    it("contains a renderer that throws", () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        ModuleApi.instance.extras.setUserProfilePanel(() => {
            throw new Error("boom");
        });

        render(
            <UserProfileCard member={new RoomMember("!r:example.org", "@a:example.org")} onClose={vi.fn()} />,
            renderOptions,
        );

        expect(screen.getByText("Creator profile")).toBeInTheDocument();
    });
});

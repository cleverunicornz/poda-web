/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// @vitest-environment happy-dom

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Room } from "matrix-js-sdk/src/matrix";
import { MatrixWidgetType } from "matrix-widget-api";
import { act, fireEvent, render, screen } from "test-utils-rtl";
import { stubClient } from "test-utils";

import { PodaSidePanelWidgetButtons } from "./PodaSidePanelWidgetButtons";
import WidgetStore, { type IApp } from "../../../../stores/WidgetStore";
import RightPanelStore from "../../../../stores/right-panel/RightPanelStore";
import { RightPanelPhases } from "../../../../stores/right-panel/RightPanelStorePhases";
import { UPDATE_EVENT } from "../../../../stores/AsyncStore";

describe("<PodaSidePanelWidgetButtons /> (Poda D-000024)", () => {
    let room: Room;
    let apps: IApp[];

    const app = (id: string, type: string, name: string): IApp => ({
        id,
        roomId: room.roomId,
        eventId: `$${id}`,
        creatorUserId: "@alice:example.org",
        type,
        name,
        url: `https://example.org/${id}`,
    });

    beforeEach(() => {
        const client = stubClient();
        room = new Room("!room:example.org", client, "@alice:example.org");
        apps = [];
        vi.spyOn(WidgetStore.instance, "getApps").mockImplementation(() => apps);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders nothing without a side-panel-only widget", () => {
        apps = [app("custom", MatrixWidgetType.Custom, "Custom Widget")];
        const { container } = render(<PodaSidePanelWidgetButtons room={room} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("opens the widget in the right panel, then closes it", () => {
        apps = [app("profile", "io.poda.profile", "Poda Profile")];
        const store = RightPanelStore.instance;
        let open = false;
        let card: { phase: RightPanelPhases | null; state?: { widgetId?: string } } = { phase: null };
        vi.spyOn(store, "isOpen", "get").mockImplementation(() => open);
        vi.spyOn(store, "currentCard", "get").mockImplementation(() => card);
        const setCard = vi.spyOn(store, "setCard").mockImplementation((c) => {
            card = c as typeof card;
        });
        const show = vi.spyOn(store, "show").mockImplementation(() => {
            open = true;
        });
        const togglePanel = vi.spyOn(store, "togglePanel").mockImplementation(() => {
            open = !open;
        });

        render(<PodaSidePanelWidgetButtons room={room} />);
        const button = screen.getByRole("button", { name: "Poda Profile" });

        fireEvent.click(button);
        expect(setCard).toHaveBeenCalledWith({ phase: RightPanelPhases.Widget, state: { widgetId: "profile" } });
        expect(show).toHaveBeenCalled();
        expect(togglePanel).not.toHaveBeenCalled();

        act(() => {
            store.emit(UPDATE_EVENT);
        });
        expect(button).toHaveAttribute("aria-pressed", "true");

        fireEvent.click(button);
        expect(togglePanel).toHaveBeenCalledTimes(1);
        expect(open).toBe(false);
    });

    it("re-targets the right panel when another card is open", () => {
        apps = [app("profile", "io.poda.profile", "Poda Profile")];
        const store = RightPanelStore.instance;
        vi.spyOn(store, "isOpen", "get").mockReturnValue(true);
        vi.spyOn(store, "currentCard", "get").mockReturnValue({ phase: RightPanelPhases.RoomSummary });
        const setCard = vi.spyOn(store, "setCard").mockImplementation(() => {});
        vi.spyOn(store, "show").mockImplementation(() => {});
        const togglePanel = vi.spyOn(store, "togglePanel").mockImplementation(() => {});

        render(<PodaSidePanelWidgetButtons room={room} />);
        fireEvent.click(screen.getByRole("button", { name: "Poda Profile" }));

        expect(setCard).toHaveBeenCalledWith({ phase: RightPanelPhases.Widget, state: { widgetId: "profile" } });
        expect(togglePanel).not.toHaveBeenCalled();
    });
});

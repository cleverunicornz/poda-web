/*
Copyright 2026 Element Creations Ltd.
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { useState } from "react";
import {
    type SpacePanelItemProps,
    type ExtrasApi,
    type RoomHeaderButtonsCallback,
    type UserProfilePanelRenderFunction,
} from "@element-hq/element-web-module-api";
import { TypedEventEmitter, User } from "matrix-js-sdk/src/matrix";

import { useTypedEventEmitter } from "../hooks/useEventEmitter";
import { MatrixClientPeg } from "../MatrixClientPeg";
import RightPanelStore from "../stores/right-panel/RightPanelStore";
import { RightPanelPhases } from "../stores/right-panel/RightPanelStorePhases";
import { SDKContextClass } from "../contexts/SDKContextClass";

export interface ModuleSpacePanelItem extends SpacePanelItemProps {
    spaceKey: string;
}

enum ExtrasApiEvent {
    SpacePanelItemsChanged = "SpacePanelItemsChanged",
    UserProfilePanelChanged = "UserProfilePanelChanged",
}

interface EmittedEvents {
    [ExtrasApiEvent.SpacePanelItemsChanged]: () => void;
    [ExtrasApiEvent.UserProfilePanelChanged]: () => void;
}

export class ElementWebExtrasApi extends TypedEventEmitter<keyof EmittedEvents, EmittedEvents> implements ExtrasApi {
    public spacePanelItems = new Map<string, SpacePanelItemProps>();
    public visibleRoomBySpaceKey = new Map<string, () => string[]>();
    public roomHeaderButtonsCallbacks: RoomHeaderButtonsCallback[] = [];

    public setSpacePanelItem(spacekey: string, item: SpacePanelItemProps): void {
        this.spacePanelItems.set(spacekey, item);
        this.emit(ExtrasApiEvent.SpacePanelItemsChanged);
    }

    public getVisibleRoomBySpaceKey(spaceKey: string, cb: () => string[]): void {
        this.visibleRoomBySpaceKey.set(spaceKey, cb);
    }

    public addRoomHeaderButtonCallback(cb: RoomHeaderButtonsCallback): void {
        this.roomHeaderButtonsCallbacks.push(cb);
    }

    // Poda host extension (D-000024)
    public userProfilePanel?: UserProfilePanelRenderFunction;

    public setUserProfilePanel(renderer: UserProfilePanelRenderFunction): void {
        this.userProfilePanel = renderer;
        this.emit(ExtrasApiEvent.UserProfilePanelChanged);
    }

    // Poda host extension (D-000028): the same cards as user info → View profile, so back returns to user info.
    public openUserProfilePanel(userId: string): void {
        if (!this.userProfilePanel) return;
        const client = MatrixClientPeg.get();
        const roomId = SDKContextClass.instance.roomViewStore.getRoomId();
        const member =
            (roomId && client?.getRoom(roomId)?.getMember(userId)) || client?.getUser(userId) || new User(userId);
        RightPanelStore.instance.setCards([
            { phase: RightPanelPhases.MemberInfo, state: { member } },
            { phase: RightPanelPhases.UserProfile, state: { member } },
        ]);
    }

    // Poda host extension (D-000028): lets a module post a message it built, e.g. a share card.
    public async sendRoomMessage(
        roomId: string,
        content: { msgtype: string; body: string; [key: string]: unknown },
    ): Promise<string> {
        if (typeof content?.msgtype !== "string" || typeof content.body !== "string") {
            throw new Error("A message needs a msgtype and a plain-text body");
        }
        const { event_id: eventId } = await MatrixClientPeg.safeGet().sendMessage(roomId, content as any);
        return eventId;
    }
}

/**
 * The module-supplied user profile panel renderer, if any (Poda D-000024).
 */
export function useModuleUserProfilePanel(api: ElementWebExtrasApi): UserProfilePanelRenderFunction | undefined {
    const [renderer, setRenderer] = useState(() => api.userProfilePanel);

    useTypedEventEmitter(api, ExtrasApiEvent.UserProfilePanelChanged, () => {
        setRenderer(() => api.userProfilePanel);
    });

    return renderer;
}

export function useModuleSpacePanelItems(api: ElementWebExtrasApi): ModuleSpacePanelItem[] {
    const getItems = (): ModuleSpacePanelItem[] => {
        return Array.from(api.spacePanelItems.entries()).map(([spaceKey, item]) => ({
            spaceKey,
            ...item,
        }));
    };

    const [items, setItems] = useState<ModuleSpacePanelItem[]>(getItems);

    useTypedEventEmitter(api, ExtrasApiEvent.SpacePanelItemsChanged, () => {
        setItems(getItems());
    });

    return items;
}

/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type JSX } from "react";

/**
 * Properties of an item added to the Space panel
 * @alpha
 */
export interface SpacePanelItemProps {
    /**
     * A CSS class name for the item
     */
    className?: string;

    /**
     * An icon to show in the item. If not provided, no icon will be shown.
     */
    icon?: JSX.Element;

    /**
     * The label to show in the item
     */
    label: string;

    /**
     * A tooltip to show when hovering over the item
     */
    tooltip?: string;

    /**
     * Styles to apply to the item
     */
    style?: React.CSSProperties;

    /**
     * Callback when the item is selected
     */
    onSelected: () => void;
}

/**
 * A callback that returns a JSX element representing the buttons.
 *
 * @alpha
 * @param roomId - The ID of the room for which the header is being rendered.
 * @returns A JSX element representing the buttons to be rendered in the room header, or undefined if no buttons should be rendered.
 */
export type RoomHeaderButtonsCallback = (roomId: string) => JSX.Element | undefined;

/**
 * Properties passed to a {@link UserProfilePanelRenderFunction}.
 *
 * @alpha
 */
export interface UserProfilePanelProps {
    /**
     * The Matrix ID of the user whose profile is shown.
     */
    userId: string;

    /**
     * The user's display name as the client knows it, if any.
     */
    displayName?: string;

    /**
     * The ID of the room the panel was opened from, if any.
     */
    roomId?: string;
}

/**
 * Renders a user's profile inside the right panel.
 *
 * Poda host extension (D-000024): not part of upstream Element's module API.
 *
 * @alpha
 * @param props - Who to show and where the panel was opened from.
 * @returns The profile content; the host supplies the card frame and its navigation.
 */
export type UserProfilePanelRenderFunction = (props: UserProfilePanelProps) => JSX.Element;

/**
 * API for inserting extra UI into Element Web.
 * @alpha Subject to change.
 */
export interface ExtrasApi {
    /**
     * Inserts an item into the space panel as if it were a space button, below
     * buttons for other spaces.
     * If called again with the same spaceKey, will update the existing item.
     * @param spaceKey - A key to identify this space-like item.
     * @param props - Properties of the item to add.
     */
    setSpacePanelItem(spaceKey: string, props: SpacePanelItemProps): void;

    /**
     * Registers a callback to get the list of visible rooms for a given space.
     *
     * Element Web will call this callback when checking if a room is displayed for the given space. For example in case of message editing or replying.
     * If the space added by the module displays a room view and doesn't provide this callback, Element Web won't be able to determine if a room is visible in that space and will redirect to display the room in its vanilla space/metaspace.
     *
     * @param spaceKey - The space key to get visible rooms for.
     * @param cb - A callback that returns the list of visible room IDs.
     */
    getVisibleRoomBySpaceKey(spaceKey: string, cb: () => string[]): void;

    /**
     * Adds a callback to get extra buttons in the room header (which can vary depending on the room being displayed).
     *
     * @param cb - A callback that returns a JSX element representing the buttons (see {@link RoomHeaderButtonsCallback}).
     */
    addRoomHeaderButtonCallback(cb: RoomHeaderButtonsCallback): void;

    /**
     * Sets the renderer for a user's profile in the right panel. While one is set, the user info panel offers a
     * "View profile" action that opens the renderer's output as a right panel card. Calling it again replaces the
     * renderer.
     *
     * Poda host extension (D-000024): not part of upstream Element's module API.
     *
     * @param renderer - Renders the profile content for a user.
     */
    setUserProfilePanel(renderer: UserProfilePanelRenderFunction): void;
}

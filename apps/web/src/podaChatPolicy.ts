/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { JoinRule, M_POLL_START, type RoomState } from "matrix-js-sdk/src/matrix";

/**
 * Poda chat-control policy (situation/decisions/D-000023-poda-chat-controls.md).
 *
 * Voice/video calls and voice messages are offered only in private conversations: rooms that can only be joined by
 * invitation, which includes direct messages. Rooms anyone (or any member of a space) can join may hold very large
 * audiences and do not offer them.
 */
export function isPodaPrivateConversation(state: Pick<RoomState, "getJoinRule">): boolean {
    const joinRule = state.getJoinRule();
    return joinRule === JoinRule.Invite || joinRule === JoinRule.Private;
}

/**
 * Power level required to start a poll in rooms created from Poda: room admins only. The homeserver enforces it in
 * those rooms; the composer offers polls only to room admins in every room (D-000027).
 */
export const PODA_POLL_START_POWER_LEVEL = 100;

export const PODA_POLL_START_EVENT_POWER_LEVELS: Record<string, number> = {
    [M_POLL_START.name]: PODA_POLL_START_POWER_LEVEL,
    [M_POLL_START.altName]: PODA_POLL_START_POWER_LEVEL,
};

/**
 * Whether the user is an admin of the room: Poda offers the poll control only to them, also in rooms whose power
 * levels would let other members start polls (D-000027).
 */
export function isPodaRoomAdmin(state: Pick<RoomState, "getMember">, userId: string): boolean {
    return (state.getMember(userId)?.powerLevel ?? 0) >= PODA_POLL_START_POWER_LEVEL;
}

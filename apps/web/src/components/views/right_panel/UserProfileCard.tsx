/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import React, { type JSX } from "react";
import { RoomMember, type User } from "matrix-js-sdk/src/matrix";
import { type UserProfilePanelProps, type UserProfilePanelRenderFunction } from "@element-hq/element-web-module-api";

import BaseCard from "./BaseCard";
import ErrorBoundary from "../elements/ErrorBoundary";
import { ModuleApi } from "../../../modules/Api";
import { useModuleUserProfilePanel } from "../../../modules/ExtrasApi";
import { _t } from "../../../languageHandler";

interface Props {
    member: RoomMember | User;
    roomId?: string;
    onClose: () => void;
}

// Calls the module renderer while rendering this child, so the ErrorBoundary around it contains any throw.
function ModuleUserProfile({
    renderer,
    ...props
}: UserProfilePanelProps & { renderer: UserProfilePanelRenderFunction }): JSX.Element {
    return renderer(props);
}

/**
 * Right panel card showing a user's profile as rendered by a module (Poda host extension, D-000024).
 * The card frame, its back/close navigation and error containment belong to the host; the content is the module's.
 */
export function UserProfileCard({ member, roomId, onClose }: Props): JSX.Element | null {
    const renderer = useModuleUserProfilePanel(ModuleApi.instance.extras);
    if (!renderer) return null;

    const displayName = member instanceof RoomMember ? member.rawDisplayName : (member.displayName ?? undefined);

    return (
        <BaseCard className="mx_UserProfileCard" header={_t("common|profile")} onClose={onClose}>
            <ErrorBoundary>
                <ModuleUserProfile
                    renderer={renderer}
                    userId={member.userId}
                    displayName={displayName}
                    roomId={roomId}
                />
            </ErrorBoundary>
        </BaseCard>
    );
}

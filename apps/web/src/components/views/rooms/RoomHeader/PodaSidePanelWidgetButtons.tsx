/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import React, { type JSX } from "react";
import { type Room } from "matrix-js-sdk/src/matrix";
import { IconButton, Tooltip } from "@vector-im/compound-web";
import UserProfileIcon from "@vector-im/compound-design-tokens/assets/web/icons/user-profile";
import classNames from "classnames";

import WidgetUtils, { useWidgets } from "../../../../utils/WidgetUtils";
import { type IApp } from "../../../../stores/WidgetStore";
import { isSidePanelOnlyWidget } from "../../../../podaWidgetPolicy";
import { useEventEmitterState } from "../../../../hooks/useEventEmitter";
import { UPDATE_EVENT } from "../../../../stores/AsyncStore";
import { RightPanelPhases } from "../../../../stores/right-panel/RightPanelStorePhases";
import RightPanelStore from "../../../../stores/right-panel/RightPanelStore";

function isWidgetCardOpen(store: RightPanelStore, app: IApp): boolean {
    return (
        store.isOpen &&
        store.currentCard.phase === RightPanelPhases.Widget &&
        store.currentCard.state?.widgetId === app.id
    );
}

function SidePanelWidgetButton({ app }: { app: IApp }): JSX.Element {
    const store = RightPanelStore.instance;
    const open = useEventEmitterState(store, UPDATE_EVENT, () => isWidgetCardOpen(store, app));
    const name = WidgetUtils.getWidgetName(app);

    const onClick = (evt: React.MouseEvent): void => {
        evt.stopPropagation();
        if (isWidgetCardOpen(store, app)) {
            store.togglePanel(null);
        } else {
            store.setCard({ phase: RightPanelPhases.Widget, state: { widgetId: app.id } });
            store.show(null);
        }
    };

    return (
        <Tooltip label={name}>
            <IconButton onClick={onClick} aria-label={name} aria-pressed={open}>
                <UserProfileIcon className={classNames({ mx_RoomHeader_toggled: open })} />
            </IconButton>
        </Tooltip>
    );
}

/**
 * Poda (D-000024): room header buttons that open and close side-panel-only widgets in the right panel.
 */
export function PodaSidePanelWidgetButtons({ room }: { room: Room }): JSX.Element | null {
    const apps = useWidgets(room).filter(isSidePanelOnlyWidget);
    if (!apps.length) return null;
    return (
        <>
            {apps.map((app) => (
                <SidePanelWidgetButton key={app.id} app={app} />
            ))}
        </>
    );
}

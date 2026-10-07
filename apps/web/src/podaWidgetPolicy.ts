/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type IWidget } from "matrix-widget-api";

/**
 * Poda widget policy (situation/decisions/D-000024-poda-profile-side-panel.md).
 *
 * The Poda profile widget opens only in the right panel: it is never pinned above the timeline or maximised, and the
 * room header offers a button that opens and closes it there.
 */
export const PODA_PROFILE_WIDGET_TYPE = "io.poda.profile";

const SIDE_PANEL_ONLY_WIDGET_TYPES = new Set([PODA_PROFILE_WIDGET_TYPE]);

export function isSidePanelOnlyWidget(widget: Pick<IWidget, "type">): boolean {
    return SIDE_PANEL_ONLY_WIDGET_TYPES.has(widget.type);
}

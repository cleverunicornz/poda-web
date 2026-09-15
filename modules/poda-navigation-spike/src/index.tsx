/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Api, Module, ModuleFactory } from "@element-hq/element-web-module-api";

import { DIAGNOSTIC_LOCATION, DiagnosticWorkspace, NavigationHeader } from "./Navigation";
import style from "./style.css?inline";

class PodaNavigationSpikeModule implements Module {
    public static readonly moduleApiVersion = "^1.0.0 || ^2.0.0";

    public constructor(private api: Api) {}

    public async load(): Promise<void> {

        this.api.navigation.registerLocationRenderer(DIAGNOSTIC_LOCATION, () => <DiagnosticWorkspace />);

        const host = document.createElement("div");
        host.dataset.podaNavigation = "gate-1";
        this.api.rootNode.before(host);
        this.api.createRoot(host).render(
            <>
                <style>{style}</style>
                <NavigationHeader />
            </>,
        );
    }
}

export default PodaNavigationSpikeModule satisfies ModuleFactory;

/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type FC, useEffect, useRef, useState } from "react";

export const DIAGNOSTIC_LOCATION = "io.poda.navigation-spike.diagnostic";

function getLocation(): string {
    const hashLocation = window.location.hash.replace(/^#\//, "");
    const [location] = hashLocation.split("?");
    return decodeURIComponent(location);
}

export const NavigationHeader: FC = () => {
    const [location, setLocation] = useState(getLocation);

    useEffect(() => {
        const onHashChange = (): void => setLocation(getLocation());
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    const diagnosticActive = location === DIAGNOSTIC_LOCATION;

    return (
        <header className="podaNavigation" data-testid="poda-navigation-header">
            <div className="podaNavigation_brand">
                <span className="podaNavigation_mark" aria-hidden="true">
                    P
                </span>
                <span>Poda</span>
            </div>
            <nav className="podaNavigation_links" aria-label="Poda member">
                <a className="podaNavigation_link" href="#/home" aria-current={!diagnosticActive ? "page" : undefined}>
                    Chat
                </a>
                <a
                    className="podaNavigation_link"
                    href={`#/${DIAGNOSTIC_LOCATION}`}
                    aria-current={diagnosticActive ? "page" : undefined}
                >
                    Diagnostic workspace
                </a>
            </nav>
        </header>
    );
};

export const DiagnosticWorkspace: FC = () => {
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mainRef.current?.focus();
    }, []);

    return (
        <main
            className="podaDiagnostic"
            data-testid="poda-diagnostic-workspace"
            aria-labelledby="poda-diagnostic-title"
            ref={mainRef}
            tabIndex={-1}
        >
            <div className="podaDiagnostic_content">
                <p className="podaDiagnostic_eyebrow">Module API diagnostic</p>
                <h1 id="poda-diagnostic-title">Diagnostic Workspace</h1>
                <p className="podaDiagnostic_summary">
                    This location is rendered inside the existing Poda Web member application.
                </p>
                <dl className="podaDiagnostic_checks">
                    <div>
                        <dt>Mount</dt>
                        <dd>Exported sibling root</dd>
                    </div>
                    <div>
                        <dt>Navigation</dt>
                        <dd>Element location renderer</dd>
                    </div>
                    <div>
                        <dt>Session</dt>
                        <dd>Owned by the host application</dd>
                    </div>
                    <div>
                        <dt>Product data</dt>
                        <dd>Not exercised by this gate</dd>
                    </div>
                </dl>
            </div>
        </main>
    );
};

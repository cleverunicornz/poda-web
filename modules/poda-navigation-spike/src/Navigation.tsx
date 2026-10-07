/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type FC, useEffect, useState } from "react";

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

    const profileActive = location === "io.poda.profile-spike.profile";
    const studioActive = location === "io.poda.profile-spike.studio";
    const chatActive = !profileActive && !studioActive;
    return (
        <header className="podaNavigation" data-testid="poda-navigation-header">
            <div className="podaNavigation_brand">
                <span className="podaNavigation_mark" aria-hidden="true">
                    P
                </span>
                <span>Poda</span>
            </div>
            <nav className="podaNavigation_links" aria-label="Poda member">
                <a className="podaNavigation_link" href="#/home" aria-current={chatActive ? "page" : undefined}>
                    Chat
                </a>
                <a
                    className="podaNavigation_link"
                    href="#/io.poda.profile-spike.profile"
                    aria-current={profileActive ? "page" : undefined}
                >
                    Profile
                </a>
                <a
                    className="podaNavigation_link"
                    href="#/io.poda.profile-spike.studio"
                    aria-current={studioActive ? "page" : undefined}
                >
                    Studio
                </a>
            </nav>
        </header>
    );
};

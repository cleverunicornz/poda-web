/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type FC, useEffect, useState } from "react";

// The profile module answers this window event with its post dialog and marks the document while it can
// (D-000030); the button is shown only then.
const CREATE_POST_EVENT = "poda:create-post";
const CREATE_POST_AVAILABLE_EVENT = "poda:create-post-available";

function createPostAvailable(): boolean {
    return document.documentElement.dataset.podaCreatePost === "available";
}

function getLocation(): string {
    const hashLocation = window.location.hash.replace(/^#\//, "");
    const [location] = hashLocation.split("?");
    return decodeURIComponent(location);
}

export const NavigationHeader: FC = () => {
    const [location, setLocation] = useState(getLocation);
    const [canPost, setCanPost] = useState(createPostAvailable);

    useEffect(() => {
        const onHashChange = (): void => setLocation(getLocation());
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    useEffect(() => {
        const onAvailable = (): void => setCanPost(createPostAvailable());
        window.addEventListener(CREATE_POST_AVAILABLE_EVENT, onAvailable);
        onAvailable();
        return () => window.removeEventListener(CREATE_POST_AVAILABLE_EVENT, onAvailable);
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
            {canPost && (
                <div className="podaNavigation_post">
                    <button
                        type="button"
                        className="podaNavigation_postButton"
                        aria-describedby="poda-create-post-tip"
                        onClick={() => window.dispatchEvent(new Event(CREATE_POST_EVENT))}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                            <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
                        </svg>
                        <span className="podaNavigation_postLabel">Create post</span>
                    </button>
                    <span id="poda-create-post-tip" role="tooltip" className="podaNavigation_tip">
                        Share an episode, a podcast or your profile as a card in one of your chats.
                    </span>
                </div>
            )}
        </header>
    );
};

/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// Share card (D-000028) in the PCC native card language: icon tile, title with
// a post-type badge, subtitle and meta, topic chips, description and actions.
// Every value comes from parseShareContent and is escaped; the only link is an
// http(s) URL opened in a new tab without referrer.

import { NATIVE_STYLES, esc, icon, formText, clearFieldErrorOnEdit } from "../shared/nativeTheme.js";
import {
    SHARE_KINDS,
    POST_TYPES,
    LIMITS,
    validateShareDraft,
    buildShareContent,
    parseShareContent,
} from "./shareModel.js";

const KIND_ICON = { episode: "mic", podcast: "headphones", profile: "users" };

export const SHARE_STYLES = `
.pnShareCard { max-width: 480px; border: 1px solid hsl(var(--pn-border)); border-radius: 12px; background: hsl(var(--pn-card)); padding: 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 1px 2px hsl(var(--pn-fg) / 0.06); }
.pnShareCard_head { display: flex; gap: 12px; min-width: 0; align-items: flex-start; }
.pnShareCard_icon { width: 48px; height: 48px; flex: 0 0 auto; border-radius: 10px; display: grid; place-items: center; color: hsl(var(--pn-card)); background: linear-gradient(135deg, hsl(var(--pn-primary)), hsl(var(--pn-accent))); }
.pnShareCard_icon svg { width: 22px; height: 22px; }
.pnShareCard_main { min-width: 0; flex: 1 1 auto; }
.pnShareCard_titleRow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-width: 0; }
.pnShareCard_title { margin: 0; font-weight: 600; font-size: 15px; line-height: 1.3; overflow-wrap: anywhere; }
.pnShareCard_subtitle { margin: 4px 0 0; font-size: 13px; color: hsl(var(--pn-muted-fg)); overflow-wrap: anywhere; }
.pnShareCard_meta { margin: 2px 0 0; font-size: 12px; color: hsl(var(--pn-muted-fg) / 0.8); }
.pnShareCard_topics { display: flex; flex-wrap: wrap; gap: 6px; }
.pnShareCard_desc { margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; }
.pnShareCard_actions { display: flex; flex-wrap: wrap; gap: 8px; }
.pnShareCard_actions .pnBtn { text-decoration: none; max-width: 100%; }
.pnShareCard_actions .pnBtn span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pnShareForm { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; min-width: min(760px, 80vw); }
.pnShareForm_preview { display: flex; flex-direction: column; gap: 8px; }
@media (max-width: 720px) { .pnShareForm { grid-template-columns: minmax(0, 1fr); min-width: 0; } }
`;

let stylesInstalled = false;

/** Installs the native and share styles once per document (timeline tiles share them). */
export function ensureShareStyles(doc = document) {
    if (stylesInstalled && doc.getElementById("poda-share-styles")) return;
    const style = doc.createElement("style");
    style.id = "poda-share-styles";
    style.textContent = NATIVE_STYLES + SHARE_STYLES;
    doc.head.appendChild(style);
    stylesInstalled = true;
}

/** Card markup for a parsed share model. */
export function shareCardHtml(model, { profileAction = true } = {}) {
    const topics = model.topics.map((topic) => `<span class="pnBadge pnBadge--chip">${esc(topic)}</span>`).join("");
    const actions = [
        profileAction
            ? `<button type="button" class="pnBtn pnBtn--outline pnBtn--sm" data-share-action="profile">${icon("users")}<span>View profile</span></button>`
            : "",
        model.link
            ? `<a class="pnBtn pnBtn--primary pnBtn--sm" href="${esc(model.link.url)}" target="_blank" rel="noopener noreferrer nofollow">${icon("link")}<span>${esc(model.link.label)}</span></a>`
            : "",
    ].join("");
    return `<section class="pnShareCard" data-share-kind="${esc(model.kind)}" aria-label="${esc(`${model.postTypeLabel}: ${model.title}`)}">
        <div class="pnShareCard_head">
            <div class="pnShareCard_icon">${icon(KIND_ICON[model.kind])}</div>
            <div class="pnShareCard_main">
                <div class="pnShareCard_titleRow">
                    <p class="pnShareCard_title">${esc(model.title)}</p>
                    <span class="pnBadge pnBadge--outline">${esc(model.postTypeLabel)}</span>
                </div>
                ${model.subtitle ? `<p class="pnShareCard_subtitle">${esc(model.subtitle)}</p>` : ""}
                ${model.meta ? `<p class="pnShareCard_meta">${esc(model.meta)}</p>` : ""}
            </div>
        </div>
        ${topics ? `<div class="pnShareCard_topics">${topics}</div>` : ""}
        ${model.description ? `<p class="pnShareCard_desc">${esc(model.description)}</p>` : ""}
        ${actions ? `<div class="pnShareCard_actions">${actions}</div>` : ""}
    </section>`;
}

function options(list, selected, placeholder) {
    return (
        (placeholder ? `<option value="">${esc(placeholder)}</option>` : "") +
        list
            .map((o) => `<option value="${esc(o.id)}"${o.id === selected ? " selected" : ""}>${esc(o.label)}</option>`)
            .join("")
    );
}

function field(id, label, control, hint = "") {
    return `<div class="pnField">
        <label class="pnLabel" for="${id}">${esc(label)}</label>
        ${control}
        ${hint ? `<p class="pnHelper">${esc(hint)}</p>` : ""}
        <p class="pnFieldError" data-error-for="${id}" role="alert"></p>
    </div>`;
}

const FIELD_IDS = {
    kind: "shareKind",
    item: "shareItem",
    postType: "sharePostType",
    description: "shareDescription",
    linkLabel: "shareLinkLabel",
    linkUrl: "shareLinkUrl",
};

/**
 * The share form: what to share, the item, the type of post, a description and
 * an optional link, with a live card preview. `sources` holds item snapshots:
 * { episode: [{ value, label, item }], podcast: [...], profile: [...], bookingUrl }.
 */
export function renderShareForm(container, { sources, sharerName, onPost, onCancel }) {
    const state = { kind: "episode", itemValue: "", postType: "", description: "", linkLabel: "", linkUrl: "" };
    const firstKind = SHARE_KINDS.find((k) => sources[k.id]?.length) ?? SHARE_KINDS[2];
    state.kind = firstKind.id;

    const itemsFor = (kind) => sources[kind] ?? [];
    const selectedItem = () => itemsFor(state.kind).find((o) => o.value === state.itemValue)?.item ?? null;
    const draft = () => ({ ...state, item: selectedItem() });

    function applyKindDefaults() {
        const items = itemsFor(state.kind);
        state.itemValue = items.length === 1 ? items[0].value : "";
        state.postType = "";
        if (state.kind === "profile" && sources.bookingUrl && !state.linkUrl) {
            state.linkUrl = sources.bookingUrl;
            state.linkLabel = state.linkLabel || "Book a time";
        }
    }
    applyKindDefaults();

    container.innerHTML = `<div class="podaNative">
        <form class="pnShareForm" novalidate>
            <div class="pnStack pnStack--tight">
                <p class="pnError" data-share-banner role="alert" hidden>Check the highlighted fields.</p>
                ${field(FIELD_IDS.kind, "What do you want to share?", `<select class="pnSelect" id="${FIELD_IDS.kind}" name="kind">${options(SHARE_KINDS, state.kind)}</select>`)}
                <div data-share-item></div>
                <div data-share-posttype></div>
                ${field(FIELD_IDS.description, "Description", `<textarea class="pnTextarea" id="${FIELD_IDS.description}" name="description" rows="4" maxlength="${LIMITS.description}" placeholder="What should people know?"></textarea>`, "Optional.")}
                ${field(FIELD_IDS.linkLabel, "Link label", `<input class="pnInput" id="${FIELD_IDS.linkLabel}" name="linkLabel" maxlength="${LIMITS.linkLabel}" placeholder="Book a time" />`)}
                ${field(FIELD_IDS.linkUrl, "Link", `<input class="pnInput" id="${FIELD_IDS.linkUrl}" name="linkUrl" type="url" inputmode="url" placeholder="https://calendly.com/you" />`, "Optional, for example a scheduling link.")}
                <div class="pnFooter">
                    <button type="button" class="pnBtn pnBtn--ghost" data-share-cancel>Cancel</button>
                    <button type="submit" class="pnBtn pnBtn--primary">Post to chat</button>
                </div>
            </div>
            <div class="pnShareForm_preview">
                <p class="pnLabel">Preview</p>
                <div data-share-preview></div>
            </div>
        </form>
    </div>`;

    const form = container.querySelector("form");
    const banner = form.querySelector("[data-share-banner]");
    form.elements.description.value = state.description;
    form.elements.linkLabel.value = state.linkLabel;
    form.elements.linkUrl.value = state.linkUrl;

    function renderItemAndType() {
        const items = itemsFor(state.kind);
        const itemHost = form.querySelector("[data-share-item]");
        if (state.kind === "profile") {
            itemHost.innerHTML = "";
        } else if (!items.length) {
            itemHost.innerHTML = `<p class="pnHelper" data-error-for="${FIELD_IDS.item}">You have no ${state.kind === "episode" ? "episodes" : "podcasts"} yet. Create one in Studio first.</p>`;
        } else {
            const label = state.kind === "episode" ? "Episode" : "Podcast";
            itemHost.innerHTML = field(
                FIELD_IDS.item,
                label,
                `<select class="pnSelect" id="${FIELD_IDS.item}" name="item">${options(
                    items.map((o) => ({ id: o.value, label: o.label })),
                    state.itemValue,
                    `Choose ${label.toLowerCase()}…`,
                )}</select>`,
            );
        }
        form.querySelector("[data-share-posttype]").innerHTML = field(
            FIELD_IDS.postType,
            "Type of post",
            `<select class="pnSelect" id="${FIELD_IDS.postType}" name="postType">${options(POST_TYPES[state.kind], state.postType, "Choose a type…")}</select>`,
        );
    }

    function renderPreview() {
        const host = form.querySelector("[data-share-preview]");
        const item = selectedItem();
        if (!item || !state.postType) {
            host.innerHTML = `<p class="pnHelper">Choose what to share and the type of post to see the card.</p>`;
            return;
        }
        const errors = validateShareDraft(draft());
        const model = parseShareContent(
            buildShareContent(
                { ...draft(), ...(errors.linkUrl || errors.linkLabel ? { linkUrl: "", linkLabel: "" } : {}) },
                { sharerName },
            ),
        );
        host.innerHTML = model ? shareCardHtml(model) : "";
    }

    function showErrors(errors) {
        for (const [key, id] of Object.entries(FIELD_IDS)) {
            const slot = form.querySelector(`[data-error-for="${id}"].pnFieldError`);
            const input = form.querySelector(`#${id}`);
            if (slot) slot.textContent = errors[key] ?? "";
            if (input) {
                if (errors[key]) input.setAttribute("aria-invalid", "true");
                else input.removeAttribute("aria-invalid");
            }
        }
        banner.hidden = !Object.keys(errors).length;
        const first = Object.keys(FIELD_IDS).find((key) => errors[key]);
        if (first) form.querySelector(`#${FIELD_IDS[first]}`)?.focus();
    }

    form.addEventListener("change", (event) => {
        const name = event.target.name;
        if (name === "kind") {
            state.kind = event.target.value;
            applyKindDefaults();
            form.elements.linkLabel.value = state.linkLabel;
            form.elements.linkUrl.value = state.linkUrl;
            renderItemAndType();
        }
        if (name === "item") state.itemValue = event.target.value;
        if (name === "postType") state.postType = event.target.value;
        clearFieldErrorOnEdit(form, event.target, banner);
        renderPreview();
    });
    form.addEventListener("input", (event) => {
        const name = event.target.name;
        if (name === "description" || name === "linkLabel" || name === "linkUrl")
            state[name] = formText(new FormData(form), name);
        clearFieldErrorOnEdit(form, event.target, banner);
        renderPreview();
    });
    form.querySelector("[data-share-cancel]").addEventListener("click", () => onCancel());
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const errors = validateShareDraft(draft());
        if (Object.keys(errors).length) {
            showErrors(errors);
            return;
        }
        onPost(buildShareContent(draft(), { sharerName }));
    });

    renderItemAndType();
    renderPreview();
}

/*
Copyright 2026 Poda contributors

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

// PCC native design language, transferred to the framework-free module host.
// Token triples and component recipes come from the native app's app.css and
// component sources (Private: cleverunicornz/yeet-code@1d70c5b377702835a87013b44e7758a0ed269151#applications/pcc/pcc-native/src);
// hex comments in the donor file are stale, so HSL triples are authoritative.
// Scope every surface under .podaNative; dark values follow the Element
// theme class on body so both Poda themes render correctly.

export const NATIVE_STYLES = `
.podaNative {
    /* PCC native light tokens (HSL triples, verbatim) */
    --pn-primary: 36 78% 64%;
    --pn-secondary: 39 76% 68%;
    --pn-accent: 18 73% 56%;
    --pn-warm: 16 71% 54%;
    --pn-brown: 28 55% 25%;
    --pn-dark-brown: 28 46% 15%;
    --pn-bg: 0 0% 99%;
    --pn-fg: 28 55% 15%;
    --pn-card: 0 0% 100%;
    --pn-muted: 40 69% 95%;
    --pn-muted-fg: 28 55% 25%;
    --pn-border: 18 73% 56% / 0.5;
    --pn-input-bg: 43 64% 94%;
    --pn-ring: 36 78% 64%;
    --pn-destructive: 350 71% 48%;
    /* status + accents actually used by native markup */
    --pn-emerald-100: oklch(95% 0.052 163.051); --pn-emerald-500: oklch(69.6% 0.17 162.48);
    --pn-emerald-600: oklch(59.6% 0.145 163.225); --pn-emerald-800: oklch(43.2% 0.095 166.913);
    --pn-sky-100: oklch(95.1% 0.026 236.824); --pn-sky-600: oklch(58.8% 0.158 241.966); --pn-sky-800: oklch(48.8% 0.243 264.376);
    --pn-blue-50: oklch(97% 0.014 254.604); --pn-blue-200: oklch(88.2% 0.059 254.128);
    --pn-blue-400: oklch(70.7% 0.165 254.624); --pn-blue-500: oklch(62.3% 0.214 259.815);
    --pn-blue-600: oklch(54.6% 0.245 262.881); --pn-blue-700: oklch(48.8% 0.243 264.376);
    --pn-amber-400: oklch(82.8% 0.189 84.429); --pn-amber-500: oklch(76.9% 0.188 70.08);
    --pn-orange-500: oklch(70.5% 0.213 47.604);
    --pn-red-50: oklch(97.1% 0.013 17.38); --pn-red-200: oklch(88.5% 0.062 18.334);
    --pn-red-400: oklch(70.4% 0.191 22.216); --pn-red-600: oklch(57.7% 0.245 27.325); --pn-red-700: oklch(50.5% 0.213 27.518);
    --pn-green-500: oklch(72.3% 0.219 149.579); --pn-green-600: oklch(62.7% 0.194 149.214);
    --pn-violet-500: oklch(60.6% 0.25 292.717);
    --pn-purple-500: oklch(62.7% 0.265 303.9);

    font-family: Inter, "Inter Fallback", Arial, system-ui, sans-serif;
    background: hsl(var(--pn-bg));
    color: hsl(var(--pn-fg));
    box-sizing: border-box;
}
.podaNative *, .podaNative *::before, .podaNative *::after { box-sizing: border-box; border-color: hsl(var(--pn-border)); }

/* ---------- layout utilities ---------- */
.pnScroll { flex: 1 1 auto; min-height: 0; overflow-y: auto; }
.pnStack { display: flex; flex-direction: column; gap: 24px; min-width: 0; }
.pnStack--tight { gap: 16px; }
.pnStack--loose { gap: 32px; }
.pnGrid2 + .pnGrid2, .pnGrid2 + .pnGrid3, .pnGrid3 + .pnGrid2, .pnToggle + .pnGrid2, .pnToggle + .pnGrid3, .pnToggle + .pnField { margin-top: 16px; }

body[class*="cpd-theme-dark"] .podaNative {
    --pn-bg: 28 20% 8%;
    --pn-fg: 40 69% 95%;
    --pn-card: 28 22% 14%;
    --pn-muted: 28 30% 18%;
    --pn-muted-fg: 33 38% 60%;
    --pn-border: 36 78% 64% / 0.2;
    --pn-input-bg: 28 22% 14%;
    --pn-blue-50: 217 91% 60% / 0.1; --pn-blue-200: 217 91% 60% / 0.2; --pn-blue-700: 214 95% 93%;
    --pn-blue-600: 213 94% 68%;
    --pn-emerald-100: 152 81% 96% / 0.1; --pn-emerald-800: 156 72% 67%;
    --pn-sky-100: 204 94% 94% / 0.1; --pn-sky-800: 201 94% 68%;
    --pn-red-50: 358 76% 17% / 0.3; --pn-red-200: 357 89% 55%; --pn-red-700: 0 72% 77%;
}

/* ---------- page frames ---------- */
.pnPage { position: relative; max-width: 1152px; margin: 0 auto; padding: 24px 16px 96px; display: flex; flex-direction: column; gap: 24px; overflow: hidden; }
.pnPage_narrow { max-width: 896px; }
.pnPageBand { position: absolute; inset-inline: 0; top: 0; height: 160px; pointer-events: none;
    background: linear-gradient(to bottom, hsl(var(--pn-primary) / 0.1), hsl(var(--pn-primary) / 0.05), transparent); }
.pnOrb { position: absolute; border-radius: 9999px; filter: blur(64px); pointer-events: none; }
.pnOrb--left { left: -80px; top: 96px; width: 224px; height: 224px; background: hsl(var(--pn-primary) / 0.1); }
.pnOrb--right { right: -40px; top: 128px; width: 256px; height: 256px; background: hsl(var(--pn-accent) / 0.1); }
.pnPageHeader { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 12px; }
.pnTitle { margin: 0; font-size: 30px; line-height: 36px; font-weight: 700; letter-spacing: -0.025em; overflow-wrap: anywhere; }
.pnSubtitle { margin: 4px 0 0; font-size: 16px; line-height: 24px; color: hsl(var(--pn-muted-fg)); overflow-wrap: anywhere; }
.pnSubtle { color: hsl(var(--pn-muted-fg)); }

/* ---------- buttons ---------- */
.pnBtn { display: inline-flex; min-width: 0; align-items: center; justify-content: center; gap: 8px; min-height: 40px;
    padding: 8px 16px; border-radius: 6px; border: none; font: inherit; font-size: 14px; line-height: 20px; font-weight: 500;
    cursor: pointer; transition: color .15s, background-color .15s, border-color .15s, opacity .15s; text-decoration: none; }
.pnBtn:focus-visible { outline: none; box-shadow: 0 0 0 2px hsl(var(--pn-bg)), 0 0 0 4px hsl(var(--pn-ring)); }
.pnBtn[disabled] { pointer-events: none; opacity: .5; }
.pnBtn--primary { background: hsl(var(--pn-primary)); color: hsl(28 46% 15%); }
.pnBtn--primary:hover { background: hsl(var(--pn-primary) / 0.9); }
.pnBtn--cta { background: linear-gradient(to right, var(--pn-amber-500), var(--pn-orange-500)); color: hsl(28 46% 15%); min-height: 40px; }
.pnBtn--cta:hover { opacity: .9; }
.pnBtn--outline { background: hsl(var(--pn-bg)); color: hsl(var(--pn-fg)); border: 1px solid hsl(var(--pn-border)); }
.pnBtn--outline:hover { background: hsl(var(--pn-muted)); }
.pnBtn--ghost { background: transparent; color: hsl(var(--pn-muted-fg)); }
.pnBtn--ghost:hover { background: hsl(var(--pn-accent) / 0.25); color: hsl(var(--pn-fg)); }
.pnBtn--sm { min-height: 36px; padding: 8px 12px; }
.pnBtn svg { width: 16px; height: 16px; }

/* ---------- cards ---------- */
.pnCard { display: flex; flex-direction: column; gap: 24px; border-radius: 12px; border: 1px solid hsl(var(--pn-border));
    background: hsl(var(--pn-card)); color: hsl(var(--pn-fg)); }
.pnCard_header { display: grid; align-items: start; gap: 6px; padding: 24px 24px 0; }
.pnCard_title { margin: 0; font-size: 18px; line-height: 28px; font-weight: 600; }
.pnCard_desc { margin: 0; font-size: 14px; line-height: 20px; color: hsl(var(--pn-muted-fg)); }
.pnCard_body { padding: 0 24px 24px; display: flex; flex-direction: column; gap: 16px; }
.pnCard--hero { border-color: hsl(var(--pn-border)); background: hsl(var(--pn-card)); box-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1); }

/* ---------- badges, chips, pills ---------- */
.pnBadge { display: inline-flex; align-items: center; justify-content: center; gap: 4px; width: fit-content; white-space: nowrap;
    flex-shrink: 0; border-radius: 6px; border: 1px solid transparent; padding: 2px 8px; font-size: 12px; line-height: 16px; font-weight: 500; }
.pnBadge svg { width: 12px; height: 12px; }
.pnBadge--primary { background: hsl(var(--pn-primary)); color: hsl(28 46% 15%); }
.pnBadge--muted { background: hsl(var(--pn-muted)); color: hsl(var(--pn-muted-fg)); }
.pnBadge--outline { background: transparent; color: hsl(var(--pn-fg)); border-color: hsl(var(--pn-border)); }
.pnBadge--success { background: var(--pn-emerald-100); color: var(--pn-emerald-800); }
.pnBadge--scheduled { background: var(--pn-sky-100); color: var(--pn-sky-800); }
.pnBadge--chip { background: hsl(var(--pn-primary) / 0.1); color: hsl(var(--pn-primary)); border-radius: 9999px; padding: 4px 8px; }
.pnPillStatus { display: inline-flex; align-items: center; gap: 6px; border-radius: 9999px; padding: 4px 8px; font-size: 12px; font-weight: 500; }
.pnPillStatus--published { background: var(--pn-emerald-100); color: var(--pn-emerald-800); }
.pnPillStatus--scheduled { background: var(--pn-sky-100); color: var(--pn-sky-800); }
.pnPillStatus--draft { background: hsl(var(--pn-muted)); color: hsl(var(--pn-muted-fg)); }
.pnPublishPill { display: inline-flex; align-items: center; gap: 6px; border-radius: 9999px; padding: 2px 10px; font-size: 12px; font-weight: 600; color: #fff; }
.pnPublishPill--published { background: var(--pn-emerald-600); }
.pnPublishPill--draft { background: var(--pn-amber-500); }
.pnChip { display: inline-flex; align-items: center; gap: 8px; border-radius: 9999px; border: 1px solid hsl(var(--pn-border));
    background: hsl(var(--pn-bg)); padding: 4px 12px; font-size: 12px; color: hsl(var(--pn-muted-fg)); box-shadow: 0 1px 2px rgb(0 0 0 / .05); }
.pnChip svg { width: 14px; height: 14px; }
.pnTopicChip { display: inline-flex; align-items: center; gap: 4px; border-radius: 6px; padding: 4px 12px; font-size: 14px;
    font-weight: 500; background: hsl(var(--pn-muted)); color: hsl(var(--pn-muted-fg)); border: 1px solid transparent; }
.pnTopicChip button { border: none; background: none; padding: 0; margin-left: 4px; cursor: pointer; color: inherit; display: inline-flex; }
.pnTopicChip button:hover { color: hsl(var(--pn-destructive)); }
.pnTopicChip button svg { width: 12px; height: 12px; }

/* topic picker popover (native Add-Topic pattern) */
.pnTopicPicker { position: relative; display: inline-flex; }
.pnTopicPopover { position: absolute; top: calc(100% + 4px); left: 0; z-index: 50; width: 256px; border-radius: 8px;
    border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-card)); box-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1); padding: 8px; }
.pnTopicPopover input { width: 100%; height: 36px; border-radius: 6px; border: 1px solid hsl(var(--pn-border));
    background: hsl(var(--pn-input-bg)); color: hsl(var(--pn-fg)); padding: 4px 12px; font: inherit; font-size: 14px; }
.pnTopicPopover input:focus-visible { outline: none; border-color: hsl(var(--pn-ring)); box-shadow: 0 0 0 3px hsl(var(--pn-ring) / 0.5); }
.pnTopicList { max-height: 192px; overflow-y: auto; margin-top: 8px; }
.pnTopicList button { display: block; width: 100%; text-align: left; border: none; background: none; font: inherit;
    padding: 6px 12px; font-size: 14px; border-radius: 6px; cursor: pointer; color: hsl(var(--pn-fg)); }
.pnTopicList button:hover { background: hsl(var(--pn-accent) / 0.25); }
.pnTopicList_empty { padding: 6px 12px; font-size: 14px; color: hsl(var(--pn-muted-fg)); }

/* ---------- info notes, banners ---------- */
.pnNote { display: flex; align-items: flex-start; gap: 8px; border-radius: 8px; border: 1px solid var(--pn-blue-200);
    background: var(--pn-blue-50); padding: 10px 12px; font-size: 14px; line-height: 20px; color: var(--pn-blue-700); }
.pnNote svg { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; color: var(--pn-blue-600); }
.pnBannerWarm { display: flex; align-items: center; justify-content: space-between; gap: 12px; border-radius: 12px;
    border: 1px solid hsl(var(--pn-primary) / 0.2); background: linear-gradient(to right, hsl(var(--pn-primary) / 0.1), hsl(var(--pn-accent) / 0.1)); padding: 16px; }
.pnBannerWarm_title { margin: 0; font-size: 14px; font-weight: 500; }
.pnBannerWarm_body { margin: 2px 0 0; font-size: 14px; color: hsl(var(--pn-muted-fg)); }
.pnError { display: flex; align-items: flex-start; gap: 8px; border-radius: 12px; border: 1px solid var(--pn-red-200);
    background: var(--pn-red-50); padding: 12px 16px; font-size: 14px; color: var(--pn-red-700); }
.pnError svg { width: 20px; height: 20px; flex-shrink: 0; color: var(--pn-red-600); }

/* ---------- forms ---------- */
.pnField { display: flex; flex-direction: column; }
.pnField + .pnField, .pnField + .pnGrid2, .pnGrid2 + .pnField { margin-top: 16px; }
.pnLabel { display: flex; align-items: center; gap: 8px; font-size: 14px; line-height: 1; font-weight: 500; user-select: none; margin-bottom: 6px; }
.pnInput, .pnSelect, .pnTextarea { width: 100%; border-radius: 6px; border: 1px solid hsl(var(--pn-border));
    background: hsl(var(--pn-input-bg)); color: hsl(var(--pn-fg)); padding: 8px 12px; font: inherit; font-size: 14px; transition: border-color .15s, box-shadow .15s; }
.pnInput { height: 36px; padding-block: 4px; }
.pnTextarea { min-height: 120px; resize: vertical; padding: 12px; }
.pnInput::placeholder, .pnTextarea::placeholder { color: hsl(var(--pn-muted-fg)); }
.pnInput:hover, .pnSelect:hover, .pnTextarea:hover { border-color: hsl(var(--pn-primary) / 0.4); }
.pnInput:focus-visible, .pnSelect:focus-visible, .pnTextarea:focus-visible { outline: none; border-color: hsl(var(--pn-ring)); box-shadow: 0 0 0 3px hsl(var(--pn-ring) / 0.5); }
.pnInput[aria-invalid="true"], .pnSelect[aria-invalid="true"], .pnTextarea[aria-invalid="true"] { border-color: hsl(var(--pn-destructive)); }
.pnFieldFoot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 4px; min-height: 16px; }
.pnHelper { margin: 4px 0 0; font-size: 12px; color: hsl(var(--pn-muted-fg)); }
.pnFieldError { margin: 0; font-size: 12px; color: var(--pn-red-600); }
.pnCounter { font-size: 12px; color: hsl(var(--pn-muted-fg)); }
.pnGrid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
.pnGrid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 16px; }
.pnDivider { border: none; border-top: 1px solid hsl(var(--pn-border)); margin: 4px 0 0; }
.pnSubhead { margin: 0 0 4px; font-size: 14px; font-weight: 500; }

/* toggle switch (native Switch recipe) */
.pnToggle { display: flex; align-items: center; gap: 12px; margin-top: 16px; }
.pnToggle input { position: absolute; opacity: 0; width: 0; height: 0; }
.pnToggle_track { width: 32px; height: 20px; border-radius: 9999px; border: 2px solid hsl(var(--pn-border));
    background: hsl(var(--pn-muted)); display: inline-flex; align-items: center; padding: 1px; cursor: pointer; flex-shrink: 0; transition: background-color .15s, border-color .15s; }
.pnToggle_thumb { width: 14px; height: 14px; border-radius: 9999px; background: hsl(var(--pn-card)); transition: transform .15s; }
.pnToggle input:checked + .pnToggle_track { background: hsl(var(--pn-primary)); border-color: hsl(var(--pn-primary)); }
.pnToggle input:checked + .pnToggle_track .pnToggle_thumb { transform: translateX(12px); }
.pnToggle input:focus-visible + .pnToggle_track { box-shadow: 0 0 0 3px hsl(var(--pn-ring) / 0.5); }
.pnToggle_label { font-size: 14px; font-weight: 500; }
.pnToggle_hint { margin: 2px 0 0; font-size: 12px; color: hsl(var(--pn-muted-fg)); }

/* dashed upload area */
.pnUpload { border: 2px dashed hsl(var(--pn-muted-fg) / 0.25); border-radius: 16px; padding: 32px; text-align: center;
    background: hsl(var(--pn-bg)); transition: border-color .15s, background-color .15s; }
.pnUpload:hover { border-color: hsl(var(--pn-primary) / 0.5); }
.pnUpload_icon { width: 56px; height: 56px; border-radius: 16px; background: hsl(var(--pn-primary) / 0.1); color: hsl(var(--pn-primary));
    display: inline-flex; align-items: center; justify-content: center; }
.pnUpload_icon svg { width: 28px; height: 28px; }
.pnUpload_title { margin: 12px 0 0; font-weight: 500; }
.pnUpload_hint { margin: 4px 0 0; font-size: 14px; color: hsl(var(--pn-muted-fg)); }

/* category checkbox grid */
.pnCatGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 240px; overflow-y: auto;
    border: 1px solid hsl(var(--pn-border)); border-radius: 6px; padding: 12px; }
.pnCatGrid label { display: flex; cursor: pointer; align-items: center; gap: 8px; border-radius: 4px; padding: 8px; font-size: 14px; transition: background-color .15s; }
.pnCatGrid label:hover { background: hsl(var(--pn-accent) / 0.25); }
.pnCatGrid label:has(input:checked) { background: hsl(var(--pn-accent) / 0.35); }
.pnCatGrid label:has(input:disabled:not(:checked)) { cursor: not-allowed; opacity: .5; }
.pnCatGrid input { accent-color: hsl(var(--pn-primary)); width: 16px; height: 16px; }

/* ---------- wizard hero + readiness ---------- */
.pnHero { display: flex; flex-direction: column; gap: 24px; }
.pnHero_tile { width: 64px; height: 64px; border-radius: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    background: linear-gradient(to bottom right, hsl(var(--pn-primary)), hsl(var(--pn-primary) / 0.9), hsl(var(--pn-accent)));
    color: hsl(28 46% 15%); box-shadow: 0 10px 15px -3px hsl(var(--pn-primary) / 0.2), 0 4px 6px -4px hsl(var(--pn-primary) / 0.2); }
.pnHero_tile svg { width: 32px; height: 32px; }
.pnHero_chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.pnPulse { width: 100%; border-radius: 16px; border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-bg)); padding: 16px; box-shadow: 0 1px 2px rgb(0 0 0 / .05); }
.pnPulse_head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.pnPulse_label { margin: 0; font-size: 14px; font-weight: 500; }
.pnPulse_sub { margin: 2px 0 0; font-size: 12px; color: hsl(var(--pn-muted-fg)); }
.pnPulse_pct { border-radius: 9999px; background: hsl(var(--pn-primary) / 0.1); padding: 4px 10px; font-size: 12px; font-weight: 500; color: hsl(var(--pn-primary)); }
.pnProgress { height: 8px; border-radius: 9999px; background: hsl(var(--pn-muted)); overflow: hidden; margin-top: 12px; }
.pnProgress_fill { height: 100%; border-radius: 9999px; background: linear-gradient(to right, hsl(var(--pn-primary)), hsl(var(--pn-accent))); transition: width .15s; }
.pnChecklist { margin: 16px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
.pnChecklist li { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.pnChecklist svg { width: 16px; height: 16px; color: var(--pn-emerald-500); flex-shrink: 0; }
.pnChecklist .pnDot { width: 8px; height: 8px; border-radius: 9999px; background: hsl(var(--pn-muted-fg) / 0.5); margin: 4px; flex-shrink: 0; }

/* readiness rail */
.pnWizardGrid { display: grid; gap: 24px; align-items: start; }
.pnRail { display: flex; flex-direction: column; gap: 16px; }
.pnRailCard { border-radius: 12px; border: 1px solid hsl(var(--pn-border)); padding: 24px;
    background: linear-gradient(to bottom right, var(--pn-blue-50), hsl(var(--pn-card)), hsl(var(--pn-primary) / 0.1)); box-shadow: 0 1px 2px rgb(0 0 0 / .05); }
.pnRailCard_head { display: flex; align-items: center; gap: 12px; }
.pnRailCard_icon { width: 40px; height: 40px; border-radius: 16px; background: var(--pn-blue-50); color: var(--pn-blue-600); border: 1px solid var(--pn-blue-200); display: flex; align-items: center; justify-content: center; }
.pnRailCard_icon svg { width: 20px; height: 20px; }
.pnRailReadiness { margin-top: 16px; border-radius: 16px; border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-muted) / 0.4); padding: 16px; }
.pnRailReadiness_head { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; }
.pnRailReadiness_head b { font-weight: 600; }
.pnRailStatus { margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; border-radius: 9999px; background: hsl(var(--pn-card)); padding: 4px 12px; font-size: 12px; font-weight: 500; color: hsl(var(--pn-muted-fg)); }
.pnRailStatus svg { width: 14px; height: 14px; color: hsl(var(--pn-primary)); }
.pnRailStatus--ready { color: var(--pn-emerald-800); }
.pnRailStatus--ready svg { color: var(--pn-emerald-500); }
.pnRailItem { display: flex; align-items: center; gap: 12px; border-radius: 12px; border: 1px solid hsl(var(--pn-border));
    background: hsl(var(--pn-bg)); color: hsl(var(--pn-muted-fg)); padding: 12px; box-shadow: 0 1px 2px rgb(0 0 0 / .05); }
.pnRailItem + .pnRailItem { margin-top: 8px; }
.pnRailItem--done { border-color: var(--pn-emerald-500, hsl(152 60% 80%)); background: hsl(152 60% 96%); color: var(--pn-emerald-800); }
body[class*="cpd-theme-dark"] .pnRailItem--done { background: hsl(160 40% 12%); border-color: hsl(160 40% 25%); }
.pnRailItem_tile { width: 32px; height: 32px; border-radius: 8px; background: hsl(var(--pn-card) / 0.8); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pnRailItem_tile svg { width: 16px; height: 16px; color: var(--pn-emerald-500); }
.pnRailItem_name { font-size: 14px; font-weight: 500; }
.pnRailItem_state { font-size: 12px; color: hsl(var(--pn-muted-fg)); }
.pnRailInfo { border-radius: 16px; border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-bg)); padding: 16px;
    display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: hsl(var(--pn-muted-fg)); }
.pnRailInfo svg { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; color: var(--pn-blue-600); }

/* draft-state banner */
.pnDraftBar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;
    border-radius: 12px; border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-card)); padding: 12px 16px; box-shadow: 0 1px 2px rgb(0 0 0 / .05); }
.pnDraftBar_left { display: flex; align-items: center; gap: 12px; }
.pnDraftBar_icon { width: 36px; height: 36px; border-radius: 9999px; background: hsl(var(--pn-primary) / 0.1); color: hsl(var(--pn-primary)); display: flex; align-items: center; justify-content: center; }
.pnDraftBar_icon svg { width: 16px; height: 16px; }
.pnDraftBar_title { margin: 0; font-size: 14px; font-weight: 500; }
.pnDraftBar_sub { margin: 0; font-size: 12px; color: hsl(var(--pn-muted-fg)); }

/* publish option radio cards */
.pnPublishOpt { display: flex; align-items: flex-start; gap: 12px; border-radius: 12px; border: 1px solid hsl(var(--pn-border));
    background: hsl(var(--pn-bg)); padding: 16px; cursor: pointer; transition: background-color .15s, border-color .15s; }
.pnPublishOpt:hover { background: hsl(var(--pn-muted) / 0.6); }
.pnPublishOpt:has(input:checked) { border-color: hsl(var(--pn-primary)); background: hsl(var(--pn-primary) / 0.05); box-shadow: 0 1px 2px rgb(0 0 0 / .05); }
.pnPublishOpt input { margin-top: 2px; accent-color: hsl(var(--pn-primary)); width: 16px; height: 16px; }
.pnPublishOpt_name { font-weight: 500; font-size: 14px; }
.pnPublishOpt_desc { margin: 2px 0 0; font-size: 14px; color: hsl(var(--pn-muted-fg)); }

/* footer action bar */
.pnFooter { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 8px;
    border-radius: 12px; border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-card)); padding: 16px; box-shadow: 0 1px 2px rgb(0 0 0 / .05); }

/* ---------- collection lists ---------- */
.pnRowCard { display: flex; width: 100%; align-items: flex-start; justify-content: space-between; gap: 16px; border-radius: 12px;
    border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-card)); padding: 16px; cursor: pointer; text-align: left;
    font: inherit; color: inherit; transition: border-color .15s, box-shadow .15s; }
.pnRowCard:hover { border-color: hsl(var(--pn-primary) / 0.4); box-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1); }
.pnRowCard_main { display: flex; align-items: flex-start; gap: 16px; min-width: 0; }
.pnTile { width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(to bottom right, var(--pn-amber-400), var(--pn-orange-500)); color: #fff; }
.pnTile svg { width: 24px; height: 24px; }
.pnRowCard_title { margin: 0; font-size: 18px; line-height: 28px; font-weight: 600; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pnRowCard_slug { margin: 2px 0 0; font-size: 14px; color: hsl(var(--pn-muted-fg)); }
.pnRowCard_desc { margin: 8px 0 0; font-size: 14px; line-height: 20px; color: hsl(var(--pn-muted-fg)); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pnRowCard_chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 10px; font-size: 12px; }
.pnRowCard_meta { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-top: 8px; font-size: 14px; color: hsl(var(--pn-muted-fg)); }
.pnRowCard_meta span { display: inline-flex; align-items: center; gap: 6px; }
.pnRowCard_meta svg { width: 16px; height: 16px; }
.pnArrow { color: hsl(var(--pn-muted-fg)); align-self: center; transition: transform .15s; flex-shrink: 0; }
.pnArrow svg { width: 20px; height: 20px; }
.pnRowCard:hover .pnArrow { transform: translateX(2px); }
.pnCardGrid { display: grid; gap: 16px; }
.pnEmpty { text-align: center; padding: 48px 24px; border-radius: 12px; border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-card)); }
.pnEmpty svg { width: 48px; height: 48px; color: hsl(var(--pn-muted-fg)); margin-bottom: 16px; }
.pnEmpty h2 { margin: 0 0 8px; font-size: 20px; font-weight: 600; }
.pnEmpty p { margin: 0 0 24px; color: hsl(var(--pn-muted-fg)); font-size: 14px; }

/* filter pills */
.pnFilters { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.pnFilters button { border: none; border-radius: 9999px; padding: 4px 12px; font: inherit; font-size: 14px; cursor: pointer;
    background: hsl(var(--pn-muted)); color: hsl(var(--pn-muted-fg)); transition: background-color .15s; }
.pnFilters button:hover { background: hsl(var(--pn-muted) / 0.8); }
.pnFilters button[aria-pressed="true"] { background: hsl(var(--pn-primary)); color: hsl(28 46% 15%); }

/* episodes table */
.pnTableWrap { border-radius: 12px; border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-card)); overflow: hidden; }
.pnTableScroll { overflow-x: auto; }
.pnTable { width: 100%; border-collapse: collapse; font-size: 14px; }
.pnTable thead tr { border-bottom: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-muted) / 0.5); }
.pnTable th { text-align: left; padding: 12px 16px; font-weight: 500; }
.pnTable tbody tr { border-bottom: 1px solid hsl(var(--pn-border)); cursor: pointer; transition: background-color .15s; }
.pnTable tbody tr:last-child { border-bottom: none; }
.pnTable tbody tr:hover { background: hsl(var(--pn-muted) / 0.3); }
.pnTable td { padding: 16px; vertical-align: middle; }
.pnTable_episode { display: flex; align-items: center; gap: 12px; min-width: 0; }
.pnTable_episode .pnTile { width: 40px; height: 40px; border-radius: 8px; }
.pnTable_episode .pnTile svg { width: 20px; height: 20px; }
.pnTable_episodeTitle { font-weight: 500; overflow-wrap: anywhere; }
.pnTable_episodeSub { margin: 2px 0 0; font-size: 12px; color: hsl(var(--pn-muted-fg)); }
.pnTable_muted { color: hsl(var(--pn-muted-fg)); display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
.pnTable_muted svg { width: 16px; height: 16px; }

/* ---------- profile ---------- */
.pnProfileStatus { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.pnProfileGrid { display: grid; gap: 32px; }
.pnProfileHero { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 16px 0 8px; }
.pnAvatar { position: relative; width: 128px; height: 128px; border-radius: 12px; border: 4px solid hsl(var(--pn-bg));
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1); overflow: hidden; flex-shrink: 0;
    background: linear-gradient(to bottom right, hsl(var(--pn-primary)), hsl(var(--pn-accent))); color: #fff;
    font-size: 48px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.pnAvatar img { width: 100%; height: 100%; object-fit: cover; }
.pnPublishPill svg { width: 12px; height: 12px; }
.pnCard h3 svg { width: 16px; height: 16px; flex-shrink: 0; }
.pnSection > h2 svg { width: 20px; height: 20px; }
.pnProfileName { margin: 0; font-size: 30px; line-height: 36px; font-weight: 700; overflow-wrap: anywhere; }
.pnProfileHeadline { margin: 4px 0 0; font-size: 18px; line-height: 28px; color: hsl(var(--pn-muted-fg)); overflow-wrap: anywhere; }
.pnProfileTagline { margin: 4px 0 0; font-size: 16px; line-height: 24px; color: hsl(var(--pn-muted-fg)); overflow-wrap: anywhere; }
.pnTopicRow { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 12px; }
.pnSegmented { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; width: 100%; max-width: 320px;
    border-radius: 8px; border: 1px solid hsl(var(--pn-border)); background: hsl(var(--pn-muted) / 0.3); padding: 4px; }
.pnSegmented button { display: flex; min-height: 40px; align-items: center; justify-content: center; border-radius: 6px;
    border: 1px solid transparent; padding: 0 8px; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer;
    background: hsl(var(--pn-bg)); color: hsl(var(--pn-muted-fg)); transition: background-color .15s, border-color .15s, color .15s; }
.pnSegmented button:hover { background: hsl(var(--pn-muted)); color: hsl(var(--pn-fg)); }
.pnSegmented button[aria-pressed="true"][data-tone="emerald"] { border-color: var(--pn-emerald-500); background: var(--pn-emerald-600); color: #fff; box-shadow: 0 10px 30px -18px rgba(16, 185, 129, .85); }
.pnSegmented button[aria-pressed="true"][data-tone="amber"] { border-color: var(--pn-amber-500); background: var(--pn-amber-500); color: oklch(12.9% 0.042 264.695); box-shadow: 0 10px 30px -18px rgba(245, 158, 11, .85); }
.pnSocialRow { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 12px; }
.pnSocialRow a, .pnSocialRow span { width: 36px; height: 36px; border-radius: 9999px; background: hsl(var(--pn-muted));
    display: inline-flex; align-items: center; justify-content: center; color: hsl(var(--pn-muted-fg)); }
.pnSocialRow a:hover { background: hsl(var(--pn-muted) / 0.8); }
.pnSocialRow svg { width: 16px; height: 16px; }
.pnSection { display: flex; flex-direction: column; gap: 16px; }
.pnSection > h2 { margin: 0; font-size: 20px; line-height: 28px; font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.pnSection > h2 .pnVisTag { font-size: 12px; font-weight: 500; color: hsl(var(--pn-muted-fg)); }
.pnExpertiseGrid { display: grid; grid-template-columns: 1fr; gap: 16px; }
.pnExpertiseCard { position: relative; padding: 20px; border-radius: 12px; border: 1px solid hsl(var(--pn-border));
    background: hsl(var(--pn-card)); transition: box-shadow .15s; }
.pnExpertiseCard:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1); }
.pnExpertiseCard h3 { margin: 0 0 8px; font-size: 18px; font-weight: 600; }
.pnExpertiseCard p { margin: 0; font-size: 14px; color: hsl(var(--pn-muted-fg)); line-height: 1.625; }
.pnRailStack { display: flex; flex-direction: column; gap: 24px; }
.pnStatRow { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px; border-radius: 8px; background: hsl(var(--pn-muted) / 0.5); }
.pnStatRow + .pnStatRow { margin-top: 12px; }
.pnStatRow_label { display: flex; align-items: center; gap: 12px; font-size: 14px; }
.pnStatRow_label svg { width: 20px; height: 20px; }
.pnStatRow_value { font-weight: 600; font-variant-numeric: tabular-nums; }
.pnShareRow { display: flex; gap: 8px; }
.pnShareRow input { flex: 1; min-width: 0; font-size: 12px; background: hsl(var(--pn-muted) / 0.5); padding: 8px 12px;
    border-radius: 8px; border: 1px solid hsl(var(--pn-border)); color: hsl(var(--pn-fg)); font-family: inherit; }
.pnGlanceChecks { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; margin-top: 12px; }
.pnGlanceChecks span { display: flex; align-items: center; gap: 6px; font-size: 12px; }
.pnGlanceChecks svg { width: 12px; height: 12px; color: var(--pn-green-500); }
.pnGlanceChecks .pnCheckDot { width: 12px; height: 12px; border-radius: 9999px; border: 1px solid hsl(var(--pn-muted-fg) / 0.3); }
.pnGlanceTiles { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; padding-top: 8px; }
.pnGlanceTiles div { text-align: center; padding: 8px 0; border-radius: 8px; background: hsl(var(--pn-muted) / 0.5); }
.pnGlanceTiles b { display: block; font-size: 18px; font-weight: 700; }
.pnGlanceTiles span { font-size: 10px; color: hsl(var(--pn-muted-fg)); }
.pnQuote { border-left: 3px solid hsl(var(--pn-primary)); padding: 4px 0 4px 14px; margin: 0 0 12px; }
.pnQuote p { margin: 0 0 4px; font-size: 14px; font-style: italic; }
.pnQuote span { font-size: 12px; color: hsl(var(--pn-muted-fg)); }
.pnDefRow { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; border-bottom: 1px solid hsl(var(--pn-border) / 0.5); font-size: 14px; }
.pnDefRow:last-child { border-bottom: none; }
.pnDefRow b { font-weight: 500; flex-shrink: 0; }
.pnDefRow span { text-align: right; overflow-wrap: anywhere; color: hsl(var(--pn-muted-fg)); }
.pnEmptyNote { color: hsl(var(--pn-muted-fg)); font-size: 14px; font-style: italic; margin: 0; }

/* inline-edit hover affordance (summary view edit hints) */
.pnEditHint { display: block; text-align: left; cursor: pointer; border: none; background: none; font: inherit; color: inherit;
    border-radius: 6px; transition: background-color .15s, box-shadow .15s; padding: 4px; margin: -4px; }
.pnEditHint:hover { background: hsl(var(--pn-muted) / 0.5); box-shadow: 0 0 0 2px hsl(var(--pn-primary) / 0.2); }

/* ---------- responsive ---------- */
@media (min-width: 640px) {
    .pnRowCard { padding: 24px; }
    .pnProfileHero { flex-direction: row; align-items: flex-start; gap: 24px; }
    .pnAvatar { width: 176px; height: 176px; }
    .pnExpertiseGrid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 768px) {
    .pnCatGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .pnMobileCards { display: none; }
}
@media (min-width: 1024px) {
    .pnHero { flex-direction: row; align-items: flex-start; justify-content: space-between; }
    .pnPulse { max-width: 384px; }
    .pnWizardGrid { grid-template-columns: minmax(0, 1fr) 360px; }
    .pnWizardGrid--episode { grid-template-columns: minmax(0, 1fr) 340px; }

    .pnRail { position: sticky; top: 24px; }
    .pnProfileGrid { grid-template-columns: minmax(0, 1fr) 340px; }
}
@media (max-width: 767px) {
    .pnGrid2, .pnGrid3 { grid-template-columns: 1fr; }
    .pnTableWrap { display: none; }
}
/* phone and sidebar widths: tighter page chrome, smaller hero type */
@media (max-width: 640px) {
    .pnPage { padding: 16px 12px 64px; gap: 16px; }
    .pnTitle { font-size: 24px; line-height: 32px; }
    .pnCard_header { padding: 16px 16px 0; }
    .pnCard_body { padding: 0 16px 16px; }
    .pnCard { gap: 16px; }
    .pnHero_tile { width: 56px; height: 56px; border-radius: 20px; }
    .pnHero_tile svg { width: 28px; height: 28px; }
    .pnPulse { padding: 12px; }
    .pnRailCard { padding: 16px; }
    .pnFooter { padding: 12px; }
    .pnProfileName { font-size: 24px; line-height: 32px; }
    .pnSegmented { max-width: none; }
}
`;

/* ---------- helpers ---------- */

export function esc(value) {
    return String(value ?? "").replace(
        /[&<>"]/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
}

export function initials(name) {
    return (name || "?")
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

// FormData.get returns string | File | null; the module's forms only carry
// text inputs, so narrow explicitly instead of stringifying unknown values.
export function formText(data, key) {
    const value = data.get(key);
    return typeof value === "string" ? value : "";
}

// Lucide icon paths (stroke-based, 24x24 viewBox, stroke-width 2) — the native
// app's icon set, inlined so the module bundle carries no icon dependency.
const ICONS = {
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    sparkles:
        '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    calendar:
        '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    headphones:
        '<path d="M3 14h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 0 1 18 0m0 0h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3Z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    playCircle: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
    pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
};

export function icon(name, attrs = "") {
    const path = ICONS[name];
    if (!path) throw new Error(`Unknown icon: ${name}`);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attrs}>${path}</svg>`;
}

export function noteHtml(text) {
    return `<p class="pnNote">${icon("info")}<span>${esc(text)}</span></p>`;
}

export function statusPill(status) {
    if (status === "published") return `<span class="pnPillStatus pnPillStatus--published">Published</span>`;
    if (status === "scheduled") return `<span class="pnPillStatus pnPillStatus--scheduled">Scheduled</span>`;
    return `<span class="pnPillStatus pnPillStatus--draft">Draft</span>`;
}
export function railItem(label, done, stateText = null) {
    return `<div class="pnRailItem${done ? " pnRailItem--done" : ""}">
        <span class="pnRailItem_tile">${done ? icon("checkCircle") : '<span class="pnDot"></span>'}</span>
        <span><span class="pnRailItem_name">${esc(label)}</span><br/>
        <span class="pnRailItem_state">${esc(stateText ?? (done ? "In place" : "Still needed"))}</span></span>
    </div>`;
}

export function progressHtml(percent) {
    return `<div class="pnProgress"><div class="pnProgress_fill" style="width:${percent}%"></div></div>`;
}

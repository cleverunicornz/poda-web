/*
 * Copyright (c) 2026 Element Creations Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

import React, {
    type ReactElement,
    type PropsWithChildren,
    useState,
    type ComponentProps,
    type SVGAttributes,
    type ComponentType,
    useCallback,
    type MouseEventHandler,
} from "react";
import { IconButton, Menu, MenuItem } from "@vector-im/compound-web";
import { AttachmentIcon } from "@vector-im/compound-design-tokens/assets/web/icons";

import { useI18n } from "../../../core/i18n/i18nContext";
import { useViewModel, type ViewModel } from "../../../core/viewmodel";

export interface UploadButtonViewSnapshot {
    options: { type: string; label: string; icon?: ComponentType<SVGAttributes<SVGElement>> }[];
}

export interface UploadButtonTriggerProps {
    /**
     * Icon of the button that opens the menu when there are several options. Defaults to the attachment icon.
     */
    menuIcon?: ComponentType<SVGAttributes<SVGElement>>;
    /**
     * Label and tooltip of the button that opens the menu when there are several options. Defaults to "Attachment".
     */
    menuLabel?: string;
}

export interface UploadButtonViewActions {
    onUploadOptionSelected(this: void, type: string): void;
}

/**
 * A composer button to initiate uploading files. The button may also be
 * Ctrl+Clicked to pick the first option automatically. With several options it
 * opens a menu, whose button can be given its own icon and label.
 *
 * @example
 * ```tsx
 *   <UploadButton vm={} />
 * ```
 */
export function UploadButton({
    vm,
    defaultOpen = false,
    menuIcon: MenuIcon = AttachmentIcon,
    menuLabel,
    ...rootButtonProps
}: PropsWithChildren<
    {
        vm: ViewModel<UploadButtonViewSnapshot, UploadButtonViewActions>;
        defaultOpen?: boolean;
    } & UploadButtonTriggerProps &
        ComponentProps<typeof IconButton>
>): ReactElement {
    const i18n = useI18n();
    const [open, setOpen] = useState(defaultOpen);
    const { options } = useViewModel(vm);

    // Ctrl+click is a shortcut to selecting the first item.
    const onMenuClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (ev) => {
            if (!ev.ctrlKey) {
                return;
            }
            ev.preventDefault();
            ev.stopPropagation();
            vm.onUploadOptionSelected(options[0].type);
        },
        [options, vm],
    );
    if (options.length === 1) {
        const { label, icon: Icon } = options[0];
        return (
            <IconButton
                size="26px"
                {...rootButtonProps}
                tooltip={label}
                aria-label={label}
                onClick={() => vm.onUploadOptionSelected(options[0].type)}
            >
                {Icon ? <Icon /> : <AttachmentIcon />}
            </IconButton>
        );
    }

    const triggerLabel = menuLabel ?? i18n.translate("common|attachment");
    const trigger = (
        <IconButton {...rootButtonProps} size="26px" tooltip={triggerLabel} onClick={onMenuClick} title={triggerLabel}>
            <MenuIcon />
        </IconButton>
    );

    return (
        <Menu
            side="top"
            title={triggerLabel}
            showTitle={false}
            trigger={trigger}
            open={open}
            onOpenChange={(o) => setOpen(o)}
        >
            {options.map((o) => (
                <MenuItem
                    key={o.label}
                    label={o.label}
                    Icon={o.icon}
                    onSelect={() => vm.onUploadOptionSelected(o.type)}
                />
            ))}
        </Menu>
    );
}

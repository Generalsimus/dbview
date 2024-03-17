import { ListItemIcon, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Settings from '@mui/icons-material/Settings';
// import { useToggleBool } from "@/utils/hooks/useToggleBool";
import { SettingsModal } from "./modal";
// import { useMemoCall } from "@/app/resources/utils/hooks/useSignalRefresh";
import { createPortal } from "react-dom";
import { useMemoCall } from "@/app/resources/utils/hooks/useMemoCall";
import { useToggleBool } from "@/app/resources/utils/hooks/useToggleBool";

interface IProps {
    onMenuClose: () => void;
}
export const SettingsView: React.FC<IProps> = React.memo(({ onMenuClose }) => {
    const [open, initialOpenValue] = useToggleBool(false);

    const onClose = initialOpenValue(false)
    const onOpen = initialOpenValue(true)

    const onCloseSettingsModal = useMemoCall(() => {
        onClose()
        onMenuClose()
    })
    return <>
        <MenuItem onClick={onOpen}>
            <ListItemIcon>
                <Settings fontSize="small" />
            </ListItemIcon>
            Settings
        </MenuItem>
        <SettingsModal open={open} onClose={onCloseSettingsModal} onOpen={onOpen} />
    </>;
});

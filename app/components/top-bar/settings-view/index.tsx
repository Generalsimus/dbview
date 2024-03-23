import { ListItemIcon, MenuItem } from "@mui/material";
import React from "react";
import Settings from '@mui/icons-material/Settings';
import { SettingsModal } from "./modal";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";

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

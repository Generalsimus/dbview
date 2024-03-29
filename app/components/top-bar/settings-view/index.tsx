import { ListItemIcon, MenuItem } from "@mui/material";
import React from "react";
import Settings from '@mui/icons-material/Settings';
import { SettingsModal } from "./modal";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { useProjectSettingFormController } from "./hooks";
import { SaveProjectSettingsDoc } from "./server";
import Backdrop from '@mui/material/Backdrop';

interface IProps {
    onMenuClose: () => void;
}
export const SettingsView: React.FC<IProps> = React.memo(({ onMenuClose }) => {
    const form = useProjectSettingFormController()

    const onOpen = useMemoCall(() => {
        form.setProps("open")(true)
    })
    const onClose = useMemoCall(() => {
        form.setProps("open")(false)
    })
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
        <SettingsModal
            {...form}
            open={form.value.open}
            onClose={onCloseSettingsModal}
            onOpen={onOpen}
            saveProjectSettingsDoc={SaveProjectSettingsDoc}
        />
    </>;
});

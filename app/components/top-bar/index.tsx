// import { useMemoCall } from "@/app/resources/utils/hooks/useSignalRefresh";
// import { useToggleBool } from "@/utils/hooks/useToggleBool";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip, Zoom, useTheme } from "@mui/material";
import React, { RefObject, useRef, useState } from "react";
import Settings from '@mui/icons-material/Settings';
import { PersonAdd } from "@mui/icons-material";
import { SettingsView } from "./settings-view";
import { useToggleBool } from "@/app/resources/utils/hooks/useToggleBool";
import { useMemoCall } from "@/app/resources/utils/hooks/useMemoCall";

interface IProps {
}
export const TopBar: React.FC<IProps> = React.memo(({ }) => {
    const handleClick = useMemoCall(() => { })
    const theme = useTheme();
    console.log("🚀 --> constTopBar:React.FC<IProps>=React.memo --> theme:", theme);
    const [open, initDefaultValue] = useToggleBool(false)
    const toggleOpen = initDefaultValue()
    const onOpen = initDefaultValue(true)
    const onClose = initDefaultValue(false)
    const anchorEl = useRef<null | HTMLElement>(null)
    // 
    // const open = true
    return <>
        {/* <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
        // padding={'5px 10px'}
        // bgcolor={theme.palette.grey[200]}
        // borderBottom={`1px solid ${theme.palette.grey[300]}`}
        > */}

        <Tooltip title="Account settings">
            <IconButton
                onClick={toggleOpen}
                ref={(e) => { anchorEl.current = e }}
                size="small"
                sx={{ mr: "5px !important" }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
        </Tooltip>
        <Menu
            anchorEl={anchorEl.current}
            id="account-menu"
            open={open}
            onClose={onClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    width: 225,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={onClose}>
                <Avatar /> Profile
            </MenuItem>
            <Divider />
            <SettingsView onMenuClose={onClose} />
        </Menu>
    </>;
});

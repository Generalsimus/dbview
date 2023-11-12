"use client"
import { Drawer, IconButton, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close';

//     const [status, setStatus, setStatusValue] = useToggleBool(false)


interface IProps {
    status: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode
}
export const DrawerView: React.FC<IProps> = React.memo(({ status, children, onClose }) => {

    return <>
        <Drawer
            anchor={"right"}
            open={status}
            onClose={onClose}
            PaperProps={{
                style: { minWidth: "50%", maxWidth: "100%" }
            }}
            sx={{ zIndex: 9 }}

        >
            <Stack display={"flex"} flexDirection={"column"} flex={1} gap={5}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    padding={2}
                >
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5">
                        Add New Route Path
                    </Typography>
                    <div />
                </Stack>
                <Stack display={"flex"} flexDirection={"column"} gap={3} padding={"0px 30px"} flex={1}>
                    {children}
                </Stack>
            </Stack>
        </Drawer >

    </>
});


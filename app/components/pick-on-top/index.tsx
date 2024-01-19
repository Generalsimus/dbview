"use client"
import React, { useRef, useState } from 'react';
import { useMemoCall } from '@/app/utils/hooks/useMemoCall';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonBase, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useToggleBool } from '@/app/utils/hooks/useToggleBool';
import { useSnackbarContent } from '../snack-bar/hooks';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
}
export const PickOnTop: React.FC<IProps> = React.memo(({ }) => {
    const [isPined, setIsPined] = useState(false);
    const unpinRef = useRef(() => { })

    const addSnackbarContent = useSnackbarContent()
    const sectionId = "PickOnTop"

    const onTogglePin = useMemoCall(() => {
        setIsPined(!isPined);

        if (isPined) {
            unpinRef.current?.();
            return undefined
        }
        const removeItem = addSnackbarContent({
            content: <Paper elevation={4} >
                <ButtonBase sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: '5px 10px' }} onClick={() => {

                }}>
                    <DeleteIcon />
                    <Typography>Delete</Typography>
                    <IconButton size="small" onClick={(e) => {
                        removeItem()
                    }}>
                        <CloseIcon />
                    </IconButton>
                </ButtonBase>
            </Paper>
        }, sectionId);

        unpinRef.current = removeItem;
    })


    return <>
        <IconButton size="small" onClick={onTogglePin}>
            <PushPinIcon sx={{ transform: `rotate(${isPined ? 0 : 45}deg)`, fill: isPined ? "blue" : undefined, transition: "ease-in-out .2s" }} />
        </IconButton>
    </>;
});

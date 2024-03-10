"use client"
import React, { useRef, useState } from 'react';
import { useMemoCall } from '@/app/utils/hooks/useMemoCall';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonBase, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useToggleBool } from '@/app/utils/hooks/useToggleBool';
import { useSnackbarContent } from '../snack-bar/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";
import { createPortal } from 'react-dom';
import { pIckOnTopIndexedDBStorage } from './utils';
import { useSignalRefresh } from '@/app/utils/hooks/useSignalRefresh';

interface IProps {
}
export const PickOnTop: React.FC<IProps> = React.memo(async ({ }) => {
    const [isPined, setIsPined] = useState(false);
    const unpinRef = useRef(() => { })

    // const addSnackbarContent = useSnackbarContent()
    // const sectionId = "PickOnTop"
    const router = useRouter();

    const onTogglePin = useMemoCall(() => {

        pIckOnTopIndexedDBStorage.put({
            title: "delete",
            path: `${window.location.pathname}${window.location.search}`
        })

    })
    // const stickDocs = 
    const [stickDocs, refreshIndexDbDocs] = useSignalRefresh(async () => {
        return await pIckOnTopIndexedDBStorage.getAll()
    })
    // const onRemove = useMemoCall(() => {

    // });

    return <>
        <IconButton size="small" onClick={onTogglePin}>
            <PushPinIcon sx={{ transform: `rotate(${isPined ? 0 : 45}deg)`, fill: isPined ? "blue" : undefined, transition: "ease-in-out .2s" }} />
        </IconButton>
        {createPortal(
            <Stack position="fixed" bottom={20} left={20} gap={1} zIndex={(theme) => theme.zIndex.tooltip}>

                {stickDocs?.map(doc => {


                    return <Paper elevation={4} >
                        <ButtonBase sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: '5px 10px' }} onClick={() => {
                            router.push(doc.path)

                        }}>
                            <DeleteIcon />
                            <Typography>{doc.title}</Typography>
                            <IconButton size="small" onClick={async () => {
                                await pIckOnTopIndexedDBStorage.delete(doc.INDEXED_DB_PICK_ID);
                                refreshIndexDbDocs();
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </ButtonBase>
                    </Paper>
                })}

            </Stack>,
            document.body
        )}
    </>;
});

"use client"
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useMemoCall } from '@/app/utils/hooks/useMemoCall';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonBase, IconButton, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useRouter } from "next/navigation";
import { createPortal } from 'react-dom';
import { getFullPath, pIckOnTopIndexedDBStorage } from './utils';
import { useSignalRefresh } from '@/app/utils/hooks/useSignalRefresh';
import { PickOnTopContentContext } from './pick-on-top-content';

interface IProps {
}
export const PickOnTop: React.FC<IProps> = React.memo(({ }) => {
    const params = useParams();
    const [stickDocs, refreshIndexDbDocs] = useSignalRefresh(async () => {
        return await pIckOnTopIndexedDBStorage.getAll()
    });
    useEffect(refreshIndexDbDocs, [params]);

    const isPined = useMemo(() => {
        const currentPath = getFullPath()
        return !!stickDocs?.some(doc => doc.path === currentPath)
    }, [stickDocs]);
    const onTogglePin = useContext(PickOnTopContentContext);
    const onPin = useMemoCall(() => {
        onTogglePin();
        refreshIndexDbDocs();
    });

    return <>
        <IconButton size="small" onClick={onPin}>
            <PushPinIcon sx={{ transform: `rotate(${isPined ? 0 : 45}deg)`, fill: isPined ? "blue" : undefined, transition: "ease-in-out .2s" }} />
        </IconButton>
    </>;
});
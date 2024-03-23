"use client"
import React, { useContext, useEffect, useMemo } from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
import { IconButton } from '@mui/material';
import { useParams } from "next/navigation";
import { getFullPath, getPIckOnTopIndexedDBStorage } from './utils';
import { PickOnTopContentContext } from './pick-on-top-content';
import { useSignalRefresh } from '@/app/utils/hooks/useSignalRefresh';
import { useMemoCall } from '@/app/utils/hooks/useMemoCall';

interface IProps {
}
export const PickOnTop: React.FC<IProps> = React.memo(({ }) => {
    const params = useParams();
    const pIckOnTopIndexedDBStorage = useMemo(getPIckOnTopIndexedDBStorage, [])
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
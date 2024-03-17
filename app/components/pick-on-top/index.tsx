"use client"
import React, { useContext, useEffect, useMemo } from 'react';
// import { useMemoCall } from '@/app/resources/utils/hooks/useSignalRefresh';
import PushPinIcon from '@mui/icons-material/PushPin';
import { IconButton } from '@mui/material';
import { useParams } from "next/navigation";
import { getFullPath, pIckOnTopIndexedDBStorage } from './utils';
// import { useSignalRefresh } from '@/utils/hooks/useSignalRefresh';
import { PickOnTopContentContext } from './pick-on-top-content';
import { useSignalRefresh } from '@/app/resources/utils/hooks/useSignalRefresh';
import { useMemoCall } from '@/app/resources/utils/hooks/useMemoCall';

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
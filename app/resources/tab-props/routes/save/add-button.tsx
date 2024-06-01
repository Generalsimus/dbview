"use client";
import React, { useMemo } from "react";
import { Fab, Zoom } from "@mui/material";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { getBasicRouteDoc, getRouteIndexedDBStorage } from "./utils";
import { useRouter } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Route } from "@/db/types";
import { SaveRouteArgs } from "../../../routes/schema";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<SaveRouteArgs>) => Promise<void>
    deleteRouteDoc: (ids: number) => Promise<void>
}
export const AddRouteButton: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc }) => {
    const router = useRouter()
    const routeStorage = useMemo(getRouteIndexedDBStorage, [])

    const onOpen = useMemoCall(async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const savedDoc = await routeStorage.add(getBasicRouteDoc())
        searchParams.set("form", `${savedDoc.INDEXED_DB_ROUTE_ID}`)
        router.push(`${window.location.pathname}?${searchParams}`)
    })
    return <>
        <Zoom in>
            <Fab color="primary" aria-label="add" onClick={onOpen} sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }}>
                <AddIcon />
            </Fab>
        </Zoom>
    </>
});

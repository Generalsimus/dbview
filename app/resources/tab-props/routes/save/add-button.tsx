"use client"
import React from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { getBasicRouteDoc, routeStorage } from "./utils";
import { useRouter } from "next/navigation";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>
    deleteRouteDoc: (ids: number) => Promise<void>
}
export const AddRouteButton: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc }) => {
    const router = useRouter()
    const onOpen = useMemoCall(async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const savedDoc = await routeStorage.add(getBasicRouteDoc())
        searchParams.set("form", `${savedDoc.INDEXED_DB_ROUTE_ID}`)
        router.push(`${window.location.pathname}?${searchParams}`)
    })
    return <>
        <Button variant="contained" onClick={onOpen} startIcon={<CreateIcon />}>
            Add Route
        </Button>
    </>
});

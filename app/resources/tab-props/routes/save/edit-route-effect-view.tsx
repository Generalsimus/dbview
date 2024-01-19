"use client"
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
// import { Route } from "@/basic/models/route/route";
import { SaveRouteForm } from ".";
import { Route } from "@/basic/models/route/route";
import { useRouteFormController_V2 } from "./hooks";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>
    deleteRouteDoc: (ids: number) => Promise<void>
    initialValue?: MakeCreateOrUpdate<Route>
}
export const EditRouteEffectView: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc, initialValue }) => {

    const from = useRouteFormController_V2()

    useEffect(() => {
        if (initialValue) {
            from.setValue({
                open: true,
                doc: initialValue
            })
        }
    }, [initialValue])
    return <>
        <SaveRouteForm
            title="Edit Route"
            saveRouteDoc={saveRouteDoc}
            deleteRouteDoc={deleteRouteDoc}
            {...from}
        />
    </>
});

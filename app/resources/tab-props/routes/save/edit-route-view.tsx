"use client"
import React, {  } from "react";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { SaveRouteForm } from ".";
import { Route } from "@/basic/models/route/route";
import { useRouteFormController_V2 } from "./hooks";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>
    deleteRouteDoc: (ids: number) => Promise<void>
}
export const EditRouteView: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc }) => {

    const form = useRouteFormController_V2()

    return <>
        <SaveRouteForm
            title="Edit Route"
            saveRouteDoc={saveRouteDoc}
            deleteRouteDoc={deleteRouteDoc}
            {...form}
        />
    </>
});

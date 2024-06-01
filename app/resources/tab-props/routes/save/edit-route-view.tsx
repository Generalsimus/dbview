"use client"
import React, { } from "react";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { SaveRouteForm } from "."; 
import { useRouteFormController } from "./hooks";
import { SaveRouteArgs } from "../../../routes/schema"; 

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<SaveRouteArgs>) => Promise<void>
    deleteRouteDoc: (ids: number) => Promise<void>
}
export const EditRouteView: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc }) => {

    const form = useRouteFormController()

    return <>
        <SaveRouteForm
            title="Edit Route"
            saveRouteDoc={saveRouteDoc}
            deleteRouteDoc={deleteRouteDoc}
            {...form}
        />
    </>
});

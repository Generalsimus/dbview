"use client"
import React, {  } from "react";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { SaveRouteForm } from ".";
import { Route } from "@/basic/models/route/route";
import { useRouteFormController } from "./hooks";
import { SaveRoute } from "@/basic/models/route/types";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<SaveRoute>) => Promise<void>
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

"use client"
import React, { useEffect } from "react";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { useServiceFormController_V2 } from "./hooks";
import { EditServiceFormModal } from ".";
import { Service } from "@/db/types";

interface IProps {
    saveServiceDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>
    deleteServiceDoc: (ids: number) => Promise<void>
}
export const EditServiceView: React.FC<IProps> = React.memo(({ saveServiceDoc, deleteServiceDoc, }) => {
    const form = useServiceFormController_V2();

    return <>
        <EditServiceFormModal
            title={"Edit Service"}
            saveServiceDoc={saveServiceDoc}
            deleteServiceDoc={deleteServiceDoc}
            {...form}
        />
    </>
});

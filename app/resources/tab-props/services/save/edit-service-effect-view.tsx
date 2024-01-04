"use client"
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
// import { Route } from "@/basic/models/route/route";
// import { SaveRouteForm } from ".";
import { Route } from "@/basic/models/route/route";
// import { useRouteFormController, useRouteFormViewController } from "./hooks";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useServiceFormController, useServiceFormViewController } from "./hooks";
import { Service } from "@/basic/models/services/services";
import { EditServiceFormModal } from ".";

interface IProps {
    saveServiceDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>
    deleteServiceDoc: (ids: number) => Promise<void>
    initialValue?: MakeCreateOrUpdate<Service>
}
export const EditServiceEffectView: React.FC<IProps> = React.memo(({ saveServiceDoc, deleteServiceDoc, initialValue }) => {
    const formViewController = useServiceFormViewController();
    const formController = useServiceFormController(initialValue);

    useEffect(() => {
        if (initialValue) {
            formController.setValue(initialValue)
            formViewController.onOpen();
        }
    }, [initialValue])
    return <>
        <EditServiceFormModal
            title={"Edit Service"}
            saveServiceDoc={saveServiceDoc}
            deleteServiceDoc={deleteServiceDoc}
            {...formViewController}
            {...formController}
        />
    </>
});

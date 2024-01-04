"use client"
import React, { useState } from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { useServiceFormController, useServiceFormViewController } from "./hooks";
import { EditServiceFormModal } from ".";
import { Service } from "@/basic/models/services/services";


interface IProps {
    saveServiceDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>
    deleteServiceDoc: (ids: number) => Promise<void>
}
export const AddServiceButton: React.FC<IProps> = React.memo(({ saveServiceDoc, deleteServiceDoc }) => {
    const formViewController = useServiceFormViewController();
    const formController = useServiceFormController();

    return <>
        <EditServiceFormModal
            title="Add Service"
            saveServiceDoc={saveServiceDoc}
            deleteServiceDoc={deleteServiceDoc}
            {...formViewController}
            {...formController}
        />
        <Button variant="contained" onClick={formViewController.onOpen} startIcon={<CreateIcon />}>
            Add Service
        </Button>
    </>
});

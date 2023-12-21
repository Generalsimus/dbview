"use client"
import React, { useState } from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
// import { Route } from "@/basic/models/route/route";
import { SaveRouteForm } from ".";
import { Route } from "@/basic/models/route/route";
import { useRouteFormController, useRouteFormViewController } from "./hooks";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>
    deleteRouteDoc: (ids: number) => Promise<void>
}
export const AddRouteButton: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc }) => {
    const formViewController = useRouteFormViewController();
    const formController = useRouteFormController();

    return <>
        <SaveRouteForm
            title="Add Route"
            saveRouteDoc={saveRouteDoc}
            deleteRouteDoc={deleteRouteDoc}
            {...formViewController}
            {...formController}
        />
        <Button variant="contained" onClick={formViewController.onOpen} startIcon={<CreateIcon />}>
            Add Route
        </Button>
    </>
});

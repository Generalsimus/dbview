"use client"
import React, { useState } from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route";
import { SaveRouteForm } from ".";

interface IProps {
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>
    deleteRouteDoc: (ids: number) => Promise<void>
}
export const AddRouteButton: React.FC<IProps> = React.memo(({ saveRouteDoc, deleteRouteDoc }) => {

    return <SaveRouteForm
        title="Add Route"
        saveRouteDoc={saveRouteDoc}
        deleteRouteDoc={deleteRouteDoc}
        getViewControllerContent={({ onOpen }) => {
            return <Button variant="contained" onClick={onOpen} startIcon={<CreateIcon />}>
                Add Route
            </Button>
        }}
    />
});

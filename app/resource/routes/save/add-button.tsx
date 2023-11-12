"use client"
import React, { useState } from "react";
import { SaveRouteView } from ".";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { ExtendDbKeys, PartialDbKeys } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route";

interface IProps {
    saveRouteDoc: (value: PartialDbKeys<ExtendDbKeys<Route>>) => Promise<void>
}
export const AddRouteButton: React.FC<IProps> = React.memo(({ saveRouteDoc }) => {

    return <SaveRouteView
        saveRouteDoc={saveRouteDoc}
        getViewButton={(onOpen) => {
            return <Button variant="contained" onClick={onOpen} startIcon={<CreateIcon />}>
                Add Route Path
            </Button>
        }}
    />
});

"use client"
import React from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void> 
}
export const AddValidationButton: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc }) => {

    return <Button variant="contained" onClick={() => { }} startIcon={<CreateIcon />}>
        Add Validation
    </Button>
    // return <SaveRouteForm
    //     title="Add Route"
    //     saveRouteDoc={saveRouteDoc}
    //     deleteRouteDoc={deleteRouteDoc}
    //     getViewControllerContent={({ onOpen }) => {
    //         return <Button variant="contained" onClick={onOpen} startIcon={<CreateIcon />}>
    //             Add Route
    //         </Button>
    //     }}
    // />
});

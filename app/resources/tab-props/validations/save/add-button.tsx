"use client"
import React from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { ValidationFormModal } from "./modal";
import { useValidationsFormController, useValidationsFormViewController } from "./hooks";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const AddValidationButton: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc }) => {
    const validationsFormViewController = useValidationsFormViewController()
    const validationsFormController = useValidationsFormController()

    return <>
        <Button variant="contained" onClick={validationsFormViewController.onOpen} startIcon={<CreateIcon />}>
            Add Validation
        </Button>
        <ValidationFormModal
            title="Add Validation"
            {...validationsFormViewController}
            {...validationsFormController}

            saveValidationDoc={saveValidationDoc}
            deleteValidationDoc={deleteValidationDoc}
        />
    </>
});

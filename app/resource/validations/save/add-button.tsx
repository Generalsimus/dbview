"use client"
import React from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { ValidationFormModal } from "./modal";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const AddValidationButton: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc }) => {
    const [isOpen, initSetValue] = useToggleBool(false)
    const onOpen = initSetValue(true);
    const onClose = initSetValue(false);


    return <>
        <Button variant="contained" onClick={onOpen} startIcon={<CreateIcon />}>
            Add Validation
        </Button>
        <ValidationFormModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            saveValidationDoc={saveValidationDoc}
            deleteValidationDoc={deleteValidationDoc}
        />
    </>
});

"use client"
import React from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import { ValidationFormModal } from "./modal";
import { useValidationFormController_V2 } from "./hooks";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { getBasicValidationsDoc, validationStorage } from "./utils";
import { useRouter } from "next/navigation";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const AddValidationButton: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc }) => {    
    const router = useRouter()
    const onOpen = useMemoCall(async () => {

        const searchParams = new URLSearchParams(window.location.search);
        const savedDoc = await validationStorage.add(getBasicValidationsDoc())
        searchParams.set("form", `${savedDoc.INDEXED_DB_Validation_ID}`)
        router.push(`${window.location.pathname}?${searchParams}`)
    })

    return <>
        <Button variant="contained" onClick={onOpen} startIcon={<CreateIcon />}>
            Add Validation
        </Button>
    </>
});

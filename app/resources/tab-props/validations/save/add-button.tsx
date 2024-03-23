"use client"
import React, { useMemo } from "react";
import { Fab, Zoom } from "@mui/material";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import { getBasicValidationsDoc, getValidationIndexedDBStorage } from "./utils";
import { useRouter } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps {
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const AddValidationButton: React.FC<IProps> = React.memo(({ saveValidationDoc, deleteValidationDoc }) => {
    const router = useRouter()

    const validationStorage = useMemo(getValidationIndexedDBStorage, []);

    const onOpen = useMemoCall(async () => {

        const searchParams = new URLSearchParams(window.location.search);
        const savedDoc = await validationStorage.add(getBasicValidationsDoc())
        searchParams.set("form", `${savedDoc.INDEXED_DB_Validation_ID}`)
        router.push(`${window.location.pathname}?${searchParams}`)
    })

    return <>
        <Zoom in>
            <Fab color="primary" aria-label="add" onClick={onOpen} sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }}>
                <AddIcon />
            </Fab>
        </Zoom>
    </>
});

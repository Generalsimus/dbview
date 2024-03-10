"use client"
import React from "react";
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { useServiceFormController_V2 } from "./hooks";
import { EditServiceFormModal } from ".";
import { Service } from "@/basic/models/services/services";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { getBasicServiceDoc, serviceStorage } from "./utils";
import { useRouter } from "next/navigation";


interface IProps {
    saveServiceDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>
    deleteServiceDoc: (ids: number) => Promise<void>
}
export const AddServiceButton: React.FC<IProps> = React.memo(({ saveServiceDoc, deleteServiceDoc }) => {
    const router = useRouter()
    const onOpen = useMemoCall(async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const savedDoc = await serviceStorage.add(getBasicServiceDoc())
        searchParams.set("form", `${savedDoc.INDEXED_DB_SERVICE_ID}`)
        router.push(`${window.location.pathname}?${searchParams}`)
    })
    return <>
        <Button variant="contained" onClick={onOpen} startIcon={<CreateIcon />}>
            Add Service
        </Button>
    </>
});

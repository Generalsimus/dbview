"use client"
import React from "react";
import { Fab, Zoom } from "@mui/material";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Service } from "@/basic/models/services/services";
// import { useMemoCall } from "@/app/resources/utils/hooks/useSignalRefresh";
import { getBasicServiceDoc, serviceStorage } from "./utils";
import { useRouter } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import { useMemoCall } from "@/app/resources/utils/hooks/useMemoCall";


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

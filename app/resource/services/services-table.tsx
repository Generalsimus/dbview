"use client"
import React, { ReactNode, useMemo } from "react";
import { Table } from "../../components/table";
// import { useMemoCall } from "../../utils/hooks";
import { useRouter } from "next/navigation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { MakeAsDbDoc, MakeCreateOrUpdate } from "@/basic/db-basic-schema";
// import { Validation } from "@/basic/models/validation/validation";
import { map } from "lodash";
// import { EditValidationContainer } from "./save/edit-container";
import { Service } from "@/basic/models/services/services";

interface IProps {
    services: MakeAsDbDoc<Service>[]
    maxRowSize: number
    start: number
    end: number
    headerContent?: ReactNode
    footerContent?: ReactNode
    saveServiceDoc: (value: MakeCreateOrUpdate<Service>) => Promise<void>
    deleteServiceDoc: (ids: number) => Promise<void>
}
export const ServicesTable: React.FC<IProps> = React.memo(({
    services,
    headerContent,
    footerContent,
    start,
    end,
    maxRowSize,
    saveServiceDoc,
    deleteServiceDoc
}) => {

    const columns = useMemo(() => [
        { field: 'name', headerName: 'name' },
        { field: 'description', headerName: 'description' },
        { field: 'properties', headerName: 'properties' },
    ], [])
    const router = useRouter()

    const onPagination = useMemoCall((start: number, end: number) => {

        router.push(`/resource/services/?start=${start}&end=${end}`)
    })


    return <>
        <Table
            headerContent={headerContent}
            footerContent={footerContent}
            rows={[]}
            columns={columns}
            rowsPerPageOptions={[5, 10, 30, 60, 100, 120]}
            onPagination={onPagination}
            stickyHeader={true}
            stickyFooter={true}
            start={start}
            end={end}
            maxRowCount={maxRowSize}

        />

    </>;
});

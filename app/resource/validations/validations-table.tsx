"use client"
import React, { ReactNode, useMemo } from "react";
import { Table } from "../../components/table";
// import { useMemoCall } from "../../utils/hooks";
import { useRouter } from "next/navigation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";

interface IProps {
    validations: MakeAsDbDoc<Validation>[]
    maxRowSize: number
    start: number
    end: number
    headerContent?: ReactNode
    footerContent?: ReactNode
}
export const ValidationsTable: React.FC<IProps> = React.memo(({ headerContent, footerContent }) => {

    const columns = useMemo(() => [
        { field: 'name', headerName: 'name' },
        { field: 'description', headerName: 'description' },
        { field: 'properties', headerName: 'properties' },
        // { field: 'path', headerName: 'path' },
        // { field: 'description', headerName: 'description' },
    ], [])
    const router = useRouter()


    const onPagination = useMemoCall((start: number, end: number) => {

        router.push(`/resources/routes/?start=${start}&end=${end}`)
    })


    return <>
        <Table
            headerContent={headerContent}
            footerContent={footerContent}
            rows={[]}
            columns={columns}
            rowsPerPageOptions={[5, 10, 30, 60, 100, 120]}
            onPagination={onPagination}
            maxRowCount={15}
            stickyHeader={true}
            stickyFooter={true}
            start={1}
            end={2}

        />

    </>;
});

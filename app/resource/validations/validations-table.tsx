"use client"
import React, { ReactNode, useMemo } from "react";
import { Table } from "../../components/table";
// import { useMemoCall } from "../../utils/hooks";
import { useRouter } from "next/navigation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { MakeAsDbDoc, MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Validation } from "@/basic/models/validation/validation";
import { map } from "lodash";
import { EditValidationContainer } from "./save/edit-container";

interface IProps {
    validations: MakeAsDbDoc<Validation>[]
    maxRowSize: number
    start: number
    end: number
    headerContent?: ReactNode
    footerContent?: ReactNode
    saveValidationDoc: (value: MakeCreateOrUpdate<Validation>) => Promise<void>
    deleteValidationDoc: (ids: number) => Promise<void>
}
export const ValidationsTable: React.FC<IProps> = React.memo(({
    validations,
    headerContent,
    footerContent,
    start,
    end,
    maxRowSize,
    saveValidationDoc,
    deleteValidationDoc
}) => {

    const columns = useMemo(() => [
        { field: 'name', headerName: 'name' },
        { field: 'description', headerName: 'description' },
        { field: 'properties', headerName: 'properties' },
    ], [])
    const router = useRouter()

    const onPagination = useMemoCall((start: number, end: number) => {

        router.push(`/resources/validations/?start=${start}&end=${end}`)
    })


    return <>
        <EditValidationContainer
            saveValidationDoc={saveValidationDoc}
            deleteValidationDoc={deleteValidationDoc}
            getContent={(onViewModal) => {
                const rows = validations.map(el => {
                    return {
                        name: el.name,
                        description: el.description,
                        properties: map(el.validations, "property").join(", "),
                        rowCellProps: {
                            sx: { cursor: "pointer" },
                            onClick: () => onViewModal(el)
                        }
                    }
                })

                return <Table
                    headerContent={headerContent}
                    footerContent={footerContent}
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 30, 60, 100, 120]}
                    onPagination={onPagination}
                    stickyHeader={true}
                    stickyFooter={true}
                    start={start}
                    end={end}
                    maxRowCount={maxRowSize}

                />

            }}
        />

    </>;
});

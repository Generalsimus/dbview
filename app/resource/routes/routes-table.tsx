"use client"
import React, { ReactNode, useMemo, useState } from "react";
import { Table } from "../../components/table";
import { Route } from "@/basic/models/route";
import { ExtendDbKeys, PartialDbKeys } from "@/basic/db-basic-schema";
import { useMemoCall, useToggleBool } from "../../utils/hooks";
import { useRouter } from "next/navigation";
import { SaveRouteForm } from "./save/form";

interface IProps {
    routes: ExtendDbKeys<Route>[]
    maxRowSize: number
    start: number
    end: number
    headerContent?: ReactNode
    footerContent?: ReactNode
    saveRouteDoc: (value: PartialDbKeys<ExtendDbKeys<Route>>) => Promise<void>
}
export const RoutesTable: React.FC<IProps> = React.memo(({ routes, start, end, maxRowSize, headerContent, footerContent, saveRouteDoc }) => {

    const columns = useMemo(() => [
        { field: 'name', headerName: 'name' },
        { field: 'method', headerName: 'method' },
        { field: 'path', headerName: 'path' },
        { field: 'description', headerName: 'description' },
    ], [])
    const [editModalValue, setEditModalValue] = useState<undefined | ExtendDbKeys<Route>>()
    const closEditModal = useMemoCall(() => {
        setEditModalValue(undefined)
    })
    const rows = useMemo(() => routes.map((obj) => {
        return {
            ...obj, rowCellProps: {
                sx: { cursor: "pointer" },
                onClick: () => {
                    setEditModalValue(obj)
                }
            }
        }
    }), [routes])
    const router = useRouter()


    const onPagination = useMemoCall((start: number, end: number) => {

        router.push(`/resources/routes/?start=${start}&end=${end}`)
    })


    return <>
        {editModalValue && <SaveRouteForm
            title="Edit Route Path"
            initialStateValue={editModalValue}
            status={editModalValue != undefined}
            onClose={closEditModal}
            saveRouteDoc={saveRouteDoc}
        />}
        <Table
            headerContent={headerContent}
            footerContent={footerContent}
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[5, 10, 30, 60, 100, 120]}
            onPagination={onPagination}
            maxRowCount={maxRowSize}
            stickyHeader={true}
            stickyFooter={true}
            start={start}
            end={end}

        />
    </>;
});

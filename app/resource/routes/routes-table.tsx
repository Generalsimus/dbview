"use client"
import React, { ReactNode, useMemo, useState } from "react";
import { Table } from "../../components/table";
import { Route } from "@/basic/models/route";
import { MakeAsDbDoc, MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { useMemoCall, useToggleBool } from "../../utils/hooks";
import { useRouter } from "next/navigation";
import { SaveRouteForm } from "./save";

interface IProps {
    routes: MakeAsDbDoc<Route>[]
    maxRowSize: number
    start: number
    end: number
    headerContent?: ReactNode
    footerContent?: ReactNode
    saveRouteDoc: (value: MakeCreateOrUpdate<Route>) => Promise<void>
    deleteRouteDoc: (id: number) => Promise<void>
}
export const RoutesTable: React.FC<IProps> = React.memo(({ routes, start, end, maxRowSize, headerContent, footerContent, saveRouteDoc, deleteRouteDoc }) => {

    const columns = useMemo(() => [
        { field: 'name', headerName: 'name' },
        { field: 'method', headerName: 'method' },
        { field: 'path', headerName: 'path' },
        { field: 'description', headerName: 'description' },
    ], [])
    const router = useRouter()


    const onPagination = useMemoCall((start: number, end: number) => {

        router.push(`/resources/routes/?start=${start}&end=${end}`)
    })


    return <>
        <SaveRouteForm
            title="Edit Route"
            saveRouteDoc={saveRouteDoc}
            deleteRouteDoc={deleteRouteDoc}
            getViewControllerContent={({ onOpen, onClose, setStateValue }) => {
                const rows = routes.map((obj) => {
                    return {
                        ...obj, 
                        rowCellProps: {
                            sx: { cursor: "pointer" },
                            onClick: () => {
                                onOpen()
                                setStateValue(obj)
                            }
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
                    maxRowCount={maxRowSize}
                    stickyHeader={true}
                    stickyFooter={true}
                    start={start}
                    end={end}

                />
            }}
        />

    </>;
});

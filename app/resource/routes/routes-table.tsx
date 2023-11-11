"use client"
import React, { ReactNode, useState } from "react";
import { Table } from "../../components/table";
import { Route } from "@/basic/models/route";
import { ExtendDbKeys } from "@/basic/db-basic-schema";
import { useMemoCall } from "../../utils/hooks";
import { useRouter } from "next/navigation";

interface IProps {
    routes: ExtendDbKeys<Route>[]
    maxRowSize: number
    start: number
    end: number
    headerContent?: ReactNode
    footerContent?: ReactNode
}
export const RoutesTable: React.FC<IProps> = React.memo(({ routes, start, end, maxRowSize, headerContent, footerContent }) => {

    const columns = [
        { field: 'name', headerName: 'name' },
        { field: 'method', headerName: 'method' },
        { field: 'path', headerName: 'path' },
        { field: 'description', headerName: 'description' },
    ]
    const rows = routes.map(({ ...obj }) => {
        return obj
    })
    const router = useRouter()
    // const onPageChange = useMemoCall((event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    //     // let page = parseInt(params?.page + "") || 1;
    //     console.log({ page })
    //     // let docsPerPage = parseInt(params?.docsPerPage + "") || 15;
    //     // router.push(`/?page=${page}&docsPerPage=${docsPerPage}`)
    // })
    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setRowsPerPage(parseInt(event.target.value, 10));
    //   setPage(0);
    // };
    // const onRowsPerPageChange = useMemoCall((event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newRowsPerPage = parseInt(event.target.value)
    //     console.log({ newRowsPerPage })
    //     // router.push(`/?page=${page}&docsPerPage=${docsPerPage}`)
    // })
    const onPagination = useMemoCall((start: number, end: number) => {

        router.push(`/route/?start=${start}&end=${end}`)
    })

    return <>
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
            headerColumnProps={{ sx: { fontWeight: "bold", textTransform: "Capitalize" } }}

        // rowsPerPage={200}
        // checkboxSelection={false}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 1, pageSize: 50 },
        //   },
        // }}
        // pageSizeOptions={[5, 10, 30, 60, 100, 120]}
        // autoPageSize={true}
        // autoHeight={true}
        // disableColumnMenu={true}
        // disableColumnFilter={true}
        />
    </>;
});

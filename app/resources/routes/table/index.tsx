"use client"
import { Table } from "@/app/components/table";
import React, { ComponentProps, useState } from "react";
import { useRouteTableBodyRows, useRouteTablePagination } from "./hooks";
import { Pagination } from "@/app/components/pagination";
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import { Button, Paper, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
// import { Button } from "@mui/material";

const cellProps = {
    colSpan: 1,
    sx: {
        fontWeight: "bold",
        width: "calc(100% / 4)"
    }
}
export const routeColumns = [
    { name: "name", content: "Name", cellProps: cellProps },
    { name: "method", content: "Method", cellProps: cellProps },
    { name: "path", content: "Path", cellProps: cellProps },
    { name: "description", content: "Description", cellProps: cellProps },
]

interface IProps extends Pick<ComponentProps<typeof Pagination>, "start" | "end"> {
}
export const RoutesTable: React.FC<IProps> = React.memo(({ start, end }) => {

    const bodyRows = useRouteTableBodyRows({ start: start, end: end })

    const paginationRow = useRouteTablePagination({ start: start, end: end, maxRowCount: bodyRows?.maxRowCount ?? 0 })

    const router = useRouter();
    const onStartCreate = useMemoCall(() => {
        router.push("/resources/routes/save")
    })
    return <>
        <Paper elevation={3} >
            <Stack sx={{ p: 1 }} direction="row" useFlexGap justifyContent={"flex-end"}>

                <Button variant="contained" startIcon={<LocalHospitalOutlinedIcon />} onClick={onStartCreate} size="small">
                    Create
                </Button>

            </Stack>
            <Table
                header={{
                    rows: [
                        { columns: routeColumns },
                    ]
                }}
                footer={{
                    rows: [
                        paginationRow
                    ]
                }}
                body={bodyRows}
            />

        </Paper>
    </>;
});

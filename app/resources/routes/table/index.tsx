import { Table } from "@/app/components/table";
import React from "react";
import { useRouteTableBodyRows, useRouteTablePagination } from "./hooks";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { RouteTableParams } from "..";

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

interface IProps extends RouteTableParams {

}
export const RoutesTable: React.FC<IProps> = React.memo((params) => {
    const bodyRows = useRouteTableBodyRows(params);

    const paginationRow = useRouteTablePagination(params);

    const router = useRouter();
    const onStartCreate = useMemoCall(() => {
        router.push("/resources/routes/save");
    });

    return (
        <>
            <Paper elevation={3}>
                <Stack sx={{ p: 1 }} direction="row" useFlexGap justifyContent={"space-between"} alignItems="center">
                    <Typography variant="subtitle1" gutterBottom>Routes</Typography>
                    <Button variant="contained" startIcon={<LocalHospitalOutlinedIcon />} onClick={onStartCreate} size="small">
                        Create
                    </Button>
                </Stack>
                <Table
                    header={{
                        rows: [{ columns: routeColumns }],
                    }}
                    footer={{
                        rows: [paginationRow],
                    }}
                    body={bodyRows}
                />
            </Paper>
        </>
    );
});

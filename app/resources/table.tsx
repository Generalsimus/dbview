"use client"
import React, { } from "react";
import { useMemoCall } from "../utils/hooks/useMemoCall";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTableBody, useTableFooter, useTableHeader } from "./hooks";
import { Backdrop, CircularProgress } from "@mui/material";
import { ResourceTabsEnum } from "./tab-props/utils";
import { Table } from "../components/table";
import { useTableData } from "./tab-props/hooks";





interface IProps {
    start: number;
    end: number;
    tab: ResourceTabsEnum;
}

export const ResourceTable: React.FC<IProps> = React.memo(({ start, end, tab }) => {

    const router = useRouter()

    const onPagination = useMemoCall((start: number, end: number) => {

        router.push(`/resources/?start=${start}&end=${end}&tab=${tab}`);
    });

    const tableData = useTableData(tab, start, end);
    const header = useTableHeader(tableData);
    const footer = useTableFooter(tableData);
    const body = useTableBody(tableData)
    // console.log({ body, tableData })
    return <>
        <Table
            header={header}
            footer={footer}
            body={body}
        />
    </>;
});

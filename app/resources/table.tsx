"use client"
import React, { } from "react";
import { useRouter } from "next/navigation";
import { useTableBody, useTableFooter, useTableHeader } from "./hooks";
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


    const tableData = useTableData(tab, start, end);
    const header = useTableHeader(tableData);
    const footer = useTableFooter(tableData);
    const body = useTableBody(tableData)
    return <>

        <Table
            header={header}
            footer={footer}
            body={body}
        />
    </>;
});

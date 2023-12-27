import React, { ComponentProps, ReactNode, useState } from "react";
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { TablePagination, TableRow } from "@mui/material";
import { title } from "process";


type TablePaginationProps = React.ComponentProps<typeof TablePagination>

export interface ColumnType {
    content?: ReactNode,
    cellProps?: ComponentProps<typeof TableCell>
}

export interface RowType {
    columns: ColumnType[],
    tableRowProps?: ComponentProps<typeof TableRow>
    collapseProps?: ComponentProps<typeof Collapse>
}
interface Content extends RowType {
}

export interface HeaderType {
    sticky?: boolean
    content?: Content,
    titleRow?: RowType
}
// const ssss = {
//     sticky: true,
//     content: {
//         columns: []
//         tableRowProps: {}
//         // columns: ColumnType[],
//         // tableRowProps?: ComponentProps<typeof TableRow>
//     },
//     titleRow?:
// }

export interface PaginationType {
    collSize: number,
    start: number,
    end: number,
    onPagination: (start: number, end: number) => void,
    rowsPerPageOptions: TablePaginationProps["rowsPerPageOptions"],
    maxRowCount: TablePaginationProps["count"],
    rowsPerPage: number
}
export interface FooterType {
    sticky?: boolean
    content?: Content,
    pagination?: PaginationType
}
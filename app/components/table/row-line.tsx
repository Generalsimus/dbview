import React, { ComponentProps, ReactNode, useState } from "react";
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import { useToggleBool } from "@/app/utils/hooks/useToggleBool";
import { RowType } from "./types";
import { TableRow } from "@mui/material";

// export interface Column {
//     field: string | number,
//     headerName?: ReactNode,
//     cellProps?: ComponentProps<typeof TableCell>
//     collapseProps?: ComponentProps<typeof Collapse>
//     // isCollapsible?: boolean
//     // colum
// }
// export interface Column extends RowOrColumn {
//     // field: string | number,
//     // headerName?: ReactNode,
//     // cellProps?: ComponentProps<typeof TableCell>
//     // collapseProps?: ComponentProps<typeof Collapse>
//     // isCollapsible?: boolean
//     // colum
// }
// export interface Row extends RowOrColumn {
//     coll: Column
//     // field: string | number,
//     // headerName?: ReactNode,
//     // cellProps?: ComponentProps<typeof TableCell>
//     // collapseProps?: ComponentProps<typeof Collapse>
//     // isCollapsible?: boolean
//     // colum
// }

interface IProps extends RowType {
}
export const RowLine: React.FC<IProps> = React.memo(({ columns, tableRowProps = {} }) => {

    console.log("tableRowProps: ", tableRowProps)
    return <>
        <TableRow  {...tableRowProps} hover role="checkbox" tabIndex={-1} >
            {columns.map(({ cellProps = {}, content }, index) => {
                // console.log("tableRowProps: ", tableRowProps)
                return <TableCell key={index} {...cellProps} >
                    {content}
                </TableCell>
            })}
        </TableRow>

    </>;
});

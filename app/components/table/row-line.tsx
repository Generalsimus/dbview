import React, { ComponentProps, ReactNode, useState } from "react";
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
// import { useToggleBool } from "@/utils/hooks/useToggleBool";
import { RowType } from "./types";
import { TableRow } from "@mui/material";


interface IProps extends RowType {
}
export const RowLine: React.FC<IProps> = React.memo(({ columns, rowProps = {} }) => {

    // console.log("tableRowProps: ", { columns, tableRowProps })
    return <>
        <TableRow  {...rowProps}  >
            {columns.map(({ cellProps = {}, content }, index) => {
                return <TableCell key={index} {...cellProps} >
                    {content}
                </TableCell>
            })}
        </TableRow>
    </>;
});
